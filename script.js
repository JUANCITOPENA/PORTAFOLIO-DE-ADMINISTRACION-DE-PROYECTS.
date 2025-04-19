// === Global Variables ===
let portfolioData = null; // Holds the raw data from JSON
let allProjects = []; // Holds the processed project data, used as the master list
// Chart instances
let projectStatusChart, pmLoadChart, priorityChart, employeeWorkloadChart, hoursCompletedChart, historicalHoursChart, criticalProjectsChart;
let dateRangePicker = null; // Instance for the Litepicker date range filter

// === Chart.js Setup ===
// Register necessary plugins globally
Chart.register(ChartDataLabels); // Make sure this line exists and the plugin is loaded in HTML

// === Color & Theme Management ===
function getChartColors(isDarkMode) {
    // Define base colors
    const colors = {
        blue: '#0d6efd', green: '#198754', red: '#dc3545', yellow: '#ffc107',
        cyan: '#0dcaf0', gray: '#6c757d', indigo: '#6610f2', teal: '#20c997',
        orange: '#fd7e14', pink: '#d63384', purple: '#6f42c1'
    };

    // Define theme-specific color variations using CSS Variables where possible
    const rootStyle = getComputedStyle(document.documentElement);
    const themeColors = {
        light: {
            text: rootStyle.getPropertyValue('--body-color-light').trim() || '#343a40',
            border: rootStyle.getPropertyValue('--card-border-light').trim() || '#e9ecef',
            cardBg: rootStyle.getPropertyValue('--card-bg-light').trim() || '#ffffff',
            pieBorder: '#ffffff',
            barCompleted: 'rgba(25, 135, 84, 0.7)', barEstimated: 'rgba(108, 117, 125, 0.55)',
            line: colors.blue, lineFill: 'rgba(13, 110, 253, 0.15)',
            criticalRisk: colors.red, criticalDelay: colors.orange, criticalCost: colors.purple
        },
        dark: {
            text: rootStyle.getPropertyValue('--body-color-dark').trim() || '#c9d1d9',
            border: rootStyle.getPropertyValue('--card-border-dark').trim() || '#30363d',
            cardBg: rootStyle.getPropertyValue('--card-bg-dark').trim() || '#1c2128',
            pieBorder: rootStyle.getPropertyValue('--card-bg-dark').trim() || '#1c2128', // Match card bg
            barCompleted: 'rgba(25, 135, 84, 0.8)', barEstimated: 'rgba(108, 117, 125, 0.6)',
            line: '#79c0ff', // Use the KPI blue for dark mode line
            lineFill: 'rgba(121, 192, 255, 0.2)',
            criticalRisk: '#ff7b7b', criticalDelay: '#ffc078', criticalCost: '#c4aeff' // Brighter critical
        }
    };
    const currentTheme = isDarkMode ? themeColors.dark : themeColors.light;

    // Update Chart.js defaults dynamically to reflect theme changes
    Chart.defaults.color = currentTheme.text;
    Chart.defaults.borderColor = currentTheme.border;
    Chart.defaults.plugins.legend.labels.color = currentTheme.text;
    Chart.defaults.plugins.title.color = currentTheme.text;

    return {
        pieStatus: { 'in-progress': colors.cyan, 'completed': colors.green, 'delayed': colors.red },
        // NOTE: Using priority_category from JSON (High/Medium/Low)
        priorityPalette: { 'High': colors.orange, 'Medium': colors.yellow, 'Low': colors.gray, 'Critical': colors.red }, // 'Critical' key kept just in case
        piePalette: [ colors.blue, colors.teal, colors.indigo, colors.yellow, colors.pink, colors.orange, colors.purple, colors.gray, colors.green, colors.red, colors.cyan ],
        barCompleted: currentTheme.barCompleted, barEstimated: currentTheme.barEstimated,
        lineHistorical: currentTheme.line, lineHistoricalFill: currentTheme.lineFill,
        criticalChart: { risk: currentTheme.criticalRisk, delay: currentTheme.criticalDelay, cost: currentTheme.criticalCost },
        defaultColor: currentTheme.text, borderColor: currentTheme.border, pieBorderColor: currentTheme.pieBorder
    };
}


function updateThemeToggleButton(isDarkMode) {
    const button = document.getElementById('theme-toggle');
    if (!button) return;
    const iconMoon = button.querySelector('.icon-moon');
    const iconSun = button.querySelector('.icon-sun');
    const themeText = button.querySelector('.theme-text');

    if (isDarkMode) {
        iconMoon?.classList.add('d-none');
        iconSun?.classList.remove('d-none');
        if (themeText) themeText.textContent = 'Light Mode';
    } else {
        iconMoon?.classList.remove('d-none');
        iconSun?.classList.add('d-none');
        if (themeText) themeText.textContent = 'Dark Mode';
    }
}

// === Helper Functions ===
const safeNumber = (val, defaultVal = 0) => {
    const num = Number(val);
    return isNaN(num) ? defaultVal : num;
};
const calculatePercentage = (completed, estimated) => safeNumber(estimated) > 0 ? Math.round((safeNumber(completed) / safeNumber(estimated)) * 100) : 0;

function calculateScheduleDelay(project) {
    if (project.schedule_delay_days !== null && !isNaN(Number(project.schedule_delay_days))) {
         return safeNumber(project.schedule_delay_days);
    }
    if (project.end_date_actual && project.end_date_planned) {
        const actual = moment(project.end_date_actual);
        const planned = moment(project.end_date_planned);
        return actual.isValid() && planned.isValid() ? actual.diff(planned, 'days') : 0;
    }
    return 0;
}

const formatDate = (dateString) => {
    if (!dateString) return '–';
    const date = moment(dateString);
    return date.isValid() ? date.format('MMM DD, YYYY') : '–';
};

const formatCurrency = (value) => {
    if (value == null || isNaN(Number(value))) return '–';
    return Number(value).toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 });
};

const formatPercentage = (value) => {
     if (value == null || isNaN(Number(value))) return '–';
    const num = Number(value);
    // If the number is already a percentage (e.g., 85), format it directly.
    // If it's a decimal (like ROI from JSON 0.25), convert it first.
    const percentageValue = (Math.abs(num) > 0 && Math.abs(num) < 2 && !Number.isInteger(num)) ? num * 100 : num;
    return `${percentageValue % 1 === 0 ? percentageValue.toFixed(0) : percentageValue.toFixed(1)}%`;
};

function isColorDark(hexColor) {
    if (!hexColor || typeof hexColor !== 'string' || hexColor.length < 4) return false;
    let color = hexColor.startsWith('#') ? hexColor.substring(1) : hexColor;
    if (color.length === 3) color = color[0] + color[0] + color[1] + color[1] + color[2] + color[2];
    if (color.length !== 6) return false;
    try {
        const rgb = parseInt(color, 16);
        const r = (rgb >> 16) & 0xff; const g = (rgb >> 8) & 0xff; const b = (rgb >> 0) & 0xff;
        const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;
        return luma < 140;
    } catch (e) { return false; }
}


// === Data Loading and Processing ===
async function loadData() {
    try {
        const response = await fetch('data.json');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        portfolioData = await response.json();

        if (!portfolioData || !portfolioData.projects || !portfolioData.portfolio_summary) {
            throw new Error("Invalid data structure: Missing 'projects' or 'portfolio_summary'.");
        }

        allProjects = portfolioData.projects.map(p => {
            // --- Data Sanitization & Defaults ---
            p.financial_data = p.financial_data || {};
            // Use the top-level prediction fields directly if they exist
            p.ai_predictions = {
                prediction_confidence: p.prediction_confidence != null ? safeNumber(p.prediction_confidence) : null, // Already percentage
                predicted_completion_date: p.predicted_completion_date || null
            };
            p.employee_workload = Array.isArray(p.employee_workload) ? p.employee_workload : [];
            p.progress_history = Array.isArray(p.progress_history) ? p.progress_history : [];

            // Process employee workload data correctly
            p.employee_workload = p.employee_workload.map(member => ({
                employee: member?.employee?.trim() || 'Unassigned',
                assigned_hours: safeNumber(member?.assigned_hours),
                completed_hours: safeNumber(member?.completed_hours)
            })).filter(member => member.employee !== 'Unassigned');

            // --- Core Metrics ---
            p.estimated_hours = safeNumber(p.estimated_hours);
            p.hours_completed = safeNumber(p.hours_completed);
            p.percentage_advance = calculatePercentage(p.hours_completed, p.estimated_hours);
            p.schedule_delay_days = calculateScheduleDelay(p);
            p.risk_score = safeNumber(p.risk_score);
            p.priority_level = p.priority_category || 'Medium'; // Use priority_category as priority_level
            p.priority_score = safeNumber(p.priority_score);

            // --- Financial Metrics ---
            p.financial_data.budget = safeNumber(p.financial_data.budget);
            p.financial_data.spent = safeNumber(p.financial_data.spent);
            p.financial_data.cost_variance = p.financial_data.cost_variance !== null && !isNaN(Number(p.financial_data.cost_variance))
                 ? safeNumber(p.financial_data.cost_variance)
                 : p.financial_data.budget - p.financial_data.spent;
            p.financial_data.cost_variance_percentage = p.financial_data.budget > 0 ? ((p.financial_data.cost_variance / p.financial_data.budget) * 100) : 0;
            // Use projected_roi/actual_roi (decimals) and convert to percentage
            p.financial_data.estimated_roi_percentage = p.financial_data.projected_roi != null ? safeNumber(p.financial_data.projected_roi * 100) : null;
            p.financial_data.actual_roi_percentage = p.financial_data.actual_roi != null ? safeNumber(p.financial_data.actual_roi * 100) : null;

            // --- Customer Metrics ---
            p.customer_satisfaction_score = p.customer_satisfaction_score != null ? safeNumber(p.customer_satisfaction_score) : null;

            // --- Status & Risk Level ---
            p.status = String(p.status || 'unknown').toLowerCase().trim().replace(/\s+/g, '-');
            if (p.status === 'inprogress') p.status = 'in-progress';
            p.risk_level = p.risk_score >= 80 ? 'high' : p.risk_score >= 50 ? 'medium' : 'low';

            // --- Pre-parsed Date for Filtering ---
            p.moment_end_planned = p.end_date_planned ? moment(p.end_date_planned) : null;

            return p;
        });

        initializeUI();

    } catch (error) {
        console.error('Error loading/processing portfolio data:', error);
        document.body.innerHTML = `<div class="alert alert-danger m-5" role="alert"><strong>Error:</strong> Failed to load dashboard data. ${error.message}. Check data.json & console.</div>`;
    }
}

// === UI Initialization ===
function initializeUI() {
    if (!allProjects || allProjects.length === 0) {
        console.warn("No project data loaded to initialize UI.");
        return;
    }
    populateFilters(allProjects);
    initializeDateRangePicker();
    setupEventListeners();
    filterAndRender(); // Initial render
    updateThemeToggleButton(document.body.classList.contains('dark-mode'));
}

function setupEventListeners() {
    document.getElementById('theme-toggle')?.addEventListener('click', toggleTheme);
    document.getElementById('filter-status')?.addEventListener('change', filterAndRender);
    document.getElementById('filter-type')?.addEventListener('change', filterAndRender);
    document.getElementById('filter-pm')?.addEventListener('change', filterAndRender);
    document.getElementById('filter-priority')?.addEventListener('change', filterAndRender);
    document.getElementById('filter-risk')?.addEventListener('change', filterAndRender);
}

function toggleTheme() {
    const isDarkMode = document.body.classList.toggle('dark-mode');
    updateThemeToggleButton(isDarkMode);
    const currentlyFilteredProjects = filterProjects();
    const currentCritical = filterCriticalProjects(currentlyFilteredProjects);
    const chartColors = getChartColors(isDarkMode);

    renderCharts(currentlyFilteredProjects);
    renderCriticalProjectsChart(currentCritical, chartColors);
}

// === UI Update Functions ===
function updateKPIs(summaryData, projectData) {
     if (!summaryData) { console.error("Missing summary data for KPIs."); return; }

    const totalHoursInvested = projectData.reduce((sum, p) => sum + p.estimated_hours, 0);
    const hoursCompleted = projectData.reduce((sum, p) => sum + p.hours_completed, 0);

    const completedProjectsWithROI = projectData.filter(p => p.status === 'completed' && p.financial_data.actual_roi_percentage !== null);
    const averageRoiActuals = completedProjectsWithROI.length > 0 ? (completedProjectsWithROI.reduce((sum, p) => sum + p.financial_data.actual_roi_percentage, 0) / completedProjectsWithROI.length) : null;

    const projectsWithSatisfaction = projectData.filter(p => p.customer_satisfaction_score !== null);
    const averageCustomerSatisfaction = projectsWithSatisfaction.length > 0 ? (projectsWithSatisfaction.reduce((sum, p) => sum + p.customer_satisfaction_score, 0) / projectsWithSatisfaction.length) : null;

    const averageEmployeeWorkload = summaryData.average_employee_workload_hours != null && !isNaN(Number(summaryData.average_employee_workload_hours))
        ? safeNumber(summaryData.average_employee_workload_hours)
        : 0;

    const setKPI = (id, value) => {
        const el = document.getElementById(id);
        if (el) el.innerText = value ?? 'N/A';
    };

    setKPI('kpi-total-projects', projectData.length);
    setKPI('kpi-hours-invested', totalHoursInvested.toLocaleString());
    setKPI('kpi-hours-completed', hoursCompleted.toLocaleString());
    setKPI('kpi-total-budget', formatCurrency(summaryData.total_budget));
    setKPI('kpi-total-spent', formatCurrency(summaryData.total_spent));
    // Use summary average_roi (decimal) if present, else calculated actual %
    const displayROI = summaryData.average_roi != null ? safeNumber(summaryData.average_roi * 100) : averageRoiActuals;
    setKPI('kpi-average-roi', formatPercentage(displayROI));
    const displaySatisfaction = summaryData.average_customer_satisfaction != null ? summaryData.average_customer_satisfaction : averageCustomerSatisfaction;
    setKPI('kpi-average-customer-satisfaction', displaySatisfaction !== null ? displaySatisfaction.toFixed(1) + '/5' : 'N/A');
    setKPI('kpi-average-employee-workload', `${averageEmployeeWorkload.toLocaleString()} hrs`);
}

function renderCharts(projects) {
    const isDarkMode = document.body.classList.contains('dark-mode');
    const chartColors = getChartColors(isDarkMode);

    // --- Status Chart ---
    const statusCounts = projects.reduce((acc, p) => { acc[p.status] = (acc[p.status] || 0) + 1; return acc; }, {});
    const statusOrder = ['in-progress', 'completed', 'delayed'];
    const statusData = statusOrder.map(s => statusCounts[s] || 0);
    const statusColors = statusOrder.map(s => chartColors.pieStatus[s] || chartColors.gray);
    projectStatusChart = renderPieChart('projectStatusChart', projectStatusChart, statusOrder.map(s => s === 'in-progress' ? 'En Progreso' : s.charAt(0).toUpperCase() + s.slice(1)), statusData, statusColors, chartColors.pieBorderColor);

    // --- PM Load Chart ---
    const pmCounts = projects.reduce((acc, p) => { acc[p.project_manager || 'Unassigned'] = (acc[p.project_manager || 'Unassigned'] || 0) + 1; return acc; }, {});
    const pmLabels = Object.keys(pmCounts);
    const pmData = Object.values(pmCounts);
    pmLoadChart = renderPieChart('pmLoadChart', pmLoadChart, pmLabels, pmData, chartColors.piePalette, chartColors.pieBorderColor);

    // --- Priority Chart (Using priority_level which comes from priority_category) ---
    const priorityCounts = projects.reduce((acc, p) => { acc[p.priority_level] = (acc[p.priority_level] || 0) + 1; return acc; }, {});
    const priorityOrder = ['High', 'Medium', 'Low']; // Match data
    const priorityLabels = priorityOrder.filter(l => priorityCounts[l]);
    const priorityData = priorityLabels.map(l => priorityCounts[l]);
    const priorityColors = priorityLabels.map(l => chartColors.priorityPalette[l] || chartColors.gray);
    priorityChart = renderPieChart('priorityChart', priorityChart, priorityLabels, priorityData, priorityColors, chartColors.pieBorderColor);

    // --- Employee Workload Chart ---
    employeeWorkloadChart = renderEmployeeWorkloadChart(projects, chartColors);

    // --- Hours Comparison Chart ---
    hoursCompletedChart = renderHoursComparisonChart(projects, chartColors);

    // --- Historical Hours Chart ---
    historicalHoursChart = renderHistoricalHoursChart(projects, chartColors);
}

// --- Reusable Chart Rendering Functions ---
function renderPieChart(canvasId, chartInstance, labels, data, backgroundColors, borderColor) {
    const ctx = document.getElementById(canvasId)?.getContext('2d');
    if (!ctx) { console.error(`Canvas context missing for ${canvasId}`); return null; }
    if (chartInstance) chartInstance.destroy();

    const currentDefaultColor = Chart.defaults.color;

    const chart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{ data: data, backgroundColor: backgroundColors, borderColor: borderColor, borderWidth: 2 }]
        },
        options: {
            responsive: true, maintainAspectRatio: false,
            plugins: {
                legend: { position: 'bottom', labels: { boxWidth: 12, padding: 15, color: currentDefaultColor } },
                tooltip: { bodyFont: { size: 11 }, titleFont: { size: 12 } },
                datalabels: {
                    formatter: (value, ctx) => {
                        const sum = ctx.chart.data.datasets[0].data.reduce((a, b) => a + b, 0);
                        const percentage = sum > 0 ? (value * 100 / sum) : 0;
                        return percentage > 5 ? percentage.toFixed(0) + "%" : '';
                    },
                    color: (context) => isColorDark(context.dataset.backgroundColor[context.dataIndex]) ? '#fff' : '#333',
                    font: { weight: 'bold', size: 11 },
                    display: (context) => context.dataset.data[context.dataIndex] > 0
                }
            }
        }
    });
    return chart;
}

// CORRECTED to use employee_workload array
function renderEmployeeWorkloadChart(projects, chartColors) {
    const ctx = document.getElementById('employeeWorkloadChart')?.getContext('2d');
    if (!ctx) { console.error("Canvas context for employeeWorkloadChart not found!"); return null; }
    if (employeeWorkloadChart) employeeWorkloadChart.destroy();

    // console.log("[renderEmployeeWorkloadChart] Processing projects:", projects.length);

    // Aggregate hours using employee_workload array and assigned_hours field
    const employeeWorkload = projects.reduce((acc, project) => {
        if (Array.isArray(project.employee_workload)) {
            project.employee_workload.forEach(member => {
                if (member && member.employee) { // Use 'employee' key
                    const name = member.employee;
                    const hours = safeNumber(member.assigned_hours); // Use 'assigned_hours' key
                    if (hours > 0) {
                        acc[name] = (acc[name] || 0) + hours;
                    }
                }
            });
        }
        return acc;
    }, {});

    // console.log('[renderEmployeeWorkloadChart] Aggregated Workload:', employeeWorkload);

    const sortedEmployees = Object.entries(employeeWorkload)
                                .filter(([, hours]) => hours > 0)
                                .sort(([, a], [, b]) => a - b); // Sort Ascending

    const employeeLabels = sortedEmployees.map(([name]) => name);
    const employeeData = sortedEmployees.map(([, hours]) => hours);

    // console.log('[renderEmployeeWorkloadChart] Chart Labels:', employeeLabels);
    // console.log('[renderEmployeeWorkloadChart] Chart Data:', employeeData);

    if (employeeLabels.length === 0) {
        console.warn("[renderEmployeeWorkloadChart] No valid employee workload data to display.");
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.textAlign = 'center'; ctx.fillStyle = chartColors.defaultColor || '#888';
        ctx.font = '14px "Segoe UI", sans-serif';
        ctx.fillText("No hay datos de carga de empleados.", ctx.canvas.width / 2, 50);
        return null;
    }

    const chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: employeeLabels,
            datasets: [{
                label: 'Horas Asignadas', data: employeeData,
                backgroundColor: chartColors.lineHistorical, borderColor: chartColors.lineHistorical,
                borderWidth: 1, barPercentage: 0.7, categoryPercentage: 0.8
            }]
        },
        options: {
            indexAxis: 'y', responsive: true, maintainAspectRatio: false,
            scales: {
                x: { beginAtZero: true, title: { display: true, text: 'Total Horas Asignadas', color: chartColors.defaultColor }, grid: { color: chartColors.borderColor + '80' }, ticks: { color: chartColors.defaultColor } },
                y: { ticks: { font: { size: 10 }, color: chartColors.defaultColor }, grid: { display: false } }
            },
            plugins: {
                legend: { display: false },
                tooltip: { callbacks: { label: (c) => `Horas: ${c.raw.toLocaleString()}` } },
                datalabels: {
                    anchor: 'end', align: 'right',
                    formatter: (value) => value > 0 ? value.toLocaleString() : '',
                    color: chartColors.defaultColor,
                    font: { size: 9, weight: '500' },
                    padding: { left: 4 }
                }
            }
        }
    });
    return chart;
}


function renderHoursComparisonChart(projects, chartColors) {
    const ctx = document.getElementById('hoursCompletedChart')?.getContext('2d');
    if (!ctx) { console.error("Canvas context missing for hoursCompletedChart"); return null; }
    if (hoursCompletedChart) hoursCompletedChart.destroy();

    const sortedProjects = [...projects].sort((a, b) => b.estimated_hours - a.estimated_hours).slice(0, 15);
    const labels = sortedProjects.map(p => p.name);
    const completedData = sortedProjects.map(p => p.hours_completed);
    const estimatedData = sortedProjects.map(p => p.estimated_hours);

    if (labels.length === 0) { console.warn("No data for hours comparison chart."); return null; }

    const chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [
                { label: 'Estimadas', data: estimatedData, backgroundColor: chartColors.barEstimated, stack: 'Stack 0', barPercentage: 0.6, categoryPercentage: 0.7 },
                { label: 'Completadas', data: completedData, backgroundColor: chartColors.barCompleted, stack: 'Stack 0', barPercentage: 0.6, categoryPercentage: 0.7 }
            ]
        },
        options: {
            indexAxis: 'y', responsive: true, maintainAspectRatio: false,
            scales: {
                x: { stacked: true, beginAtZero: true, grid: { color: chartColors.borderColor + '80' }, ticks: { color: chartColors.defaultColor } },
                y: { stacked: true, ticks: { font: { size: 10 }, color: chartColors.defaultColor }, grid: { display: false } }
            },
            plugins: {
                legend: { position: 'top', labels: { color: chartColors.defaultColor } },
                tooltip: { mode: 'index', intersect: false },
                datalabels: { display: false }
            }
        }
    });
    return chart;
}

function renderHistoricalHoursChart(projects, chartColors) {
    const ctx = document.getElementById('historicalHoursChart')?.getContext('2d');
    if (!ctx) { console.error("Canvas context missing for historicalHoursChart"); return null; }
    if (historicalHoursChart) historicalHoursChart.destroy();

    const allDates = new Set();
    projects.forEach(p => (p.progress_history || []).forEach(h => { if (h.date) allDates.add(h.date); }));
    const sortedDates = Array.from(allDates).map(d => moment(d)).filter(m => m.isValid()).sort((a, b) => a - b).map(m => m.format('YYYY-MM-DD'));

    if (sortedDates.length === 0) { console.warn("No valid dates for historical chart."); return null; }

    const cumulativeHours = sortedDates.map(date => {
        let total = 0;
        const currentMoment = moment(date);
        projects.forEach(p => {
            const latestEntry = (p.progress_history || [])
                .map(h => ({ date: moment(h.date), hours: safeNumber(h.hours_completed_on_date) })) // Use correct field
                .filter(h => h.date.isValid() && h.date.isSameOrBefore(currentMoment))
                .sort((a, b) => b.date - a.date)[0];
            if (latestEntry) total += latestEntry.hours;
        });
        return total;
    });

    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: sortedDates,
            datasets: [{
                label: 'Horas Acumuladas', data: cumulativeHours, fill: true,
                borderColor: chartColors.lineHistorical, backgroundColor: chartColors.lineHistoricalFill,
                tension: 0.1, pointRadius: 2, pointHoverRadius: 4, borderWidth: 1.5
            }]
        },
        options: {
            responsive: true, maintainAspectRatio: false,
            scales: {
                x: { type: 'time', time: { unit: 'month' }, title: { display: true, text: 'Fecha', color: chartColors.defaultColor }, grid: { color: chartColors.borderColor + '80' }, ticks: { color: chartColors.defaultColor } },
                y: { beginAtZero: true, title: { display: true, text: 'Horas Totales Completadas', color: chartColors.defaultColor }, grid: { color: chartColors.borderColor + '80' }, ticks: { color: chartColors.defaultColor } }
            },
            plugins: { legend: { display: false }, tooltip: { mode: 'index', intersect: false }, datalabels: { display: false } }
        }
    });
    return chart;
}


// --- Critical Projects Section ---
function filterCriticalProjects(projects) {
     return projects.filter(p =>
        p.status !== 'completed' &&
        (p.risk_score >= 80 ||
         p.schedule_delay_days > 20 ||
         p.financial_data.cost_variance_percentage < -15 ||
         (p.ai_predictions?.prediction_confidence !== null && p.ai_predictions.prediction_confidence < 65)
        )
    ).sort((a, b) => b.risk_score - a.risk_score);
}

function renderCriticalProjectsList(criticalProjects) {
    const listContainer = document.getElementById('critical-projects-list');
    if (!listContainer) return;
    listContainer.innerHTML = '';

    if (criticalProjects.length === 0) {
        listContainer.innerHTML = '<div class="list-group-item text-muted text-center p-4">No hay proyectos críticos actualmente.</div>';
        return;
    }

    criticalProjects.forEach(project => {
        const riskClass = project.risk_score >= 80 ? 'critical-high-risk' : 'critical-medium-risk';
        const riskBadge = `badge-risk-${project.risk_level}`;
        const delayBadge = project.schedule_delay_days > 20 ? 'badge-delay-high' : project.schedule_delay_days > 5 ? 'badge-delay-medium' : 'badge-delay-low';
        const costVariance = project.financial_data.cost_variance;
        const costBadge = costVariance < 0 ? 'badge-cost-negative' : 'badge-cost-positive';
        const confidence = project.ai_predictions?.prediction_confidence;
        const confidenceBadge = confidence === null ? '' : confidence < 65 ? 'badge-confidence-low' : confidence <= 80 ? 'badge-confidence-medium' : 'badge-confidence-high';

        const item = document.createElement('div');
        item.className = `list-group-item list-group-item-action critical-project ${riskClass}`;
        item.innerHTML = `
            <div class="d-flex w-100 justify-content-between mb-1 align-items-center">
                <h6 class="mb-0 fw-bold text-truncate me-2" title="${project.name}">${project.name}</h6>
                <small class="text-muted flex-shrink-0">${project.project_manager}</small>
            </div>
            <div class="d-flex flex-wrap gap-1 mt-1 critical-badges">
                <span class="badge rounded-pill ${riskBadge}"><i class="bi bi-shield-exclamation me-1"></i>R: ${project.risk_score}</span>
                ${project.schedule_delay_days > 0 ? `<span class="badge rounded-pill ${delayBadge}"><i class="bi bi-alarm me-1"></i>D: ${project.schedule_delay_days}d</span>` : ''}
                ${costVariance !== 0 ? `<span class="badge rounded-pill ${costBadge}"><i class="bi bi-currency-dollar me-1"></i>C: ${formatCurrency(costVariance)}</span>` : ''}
                ${confidence !== null ? `<span class="badge rounded-pill ${confidenceBadge}"><i class="bi bi-bullseye me-1"></i>P: ${formatPercentage(confidence)}</span>` : ''}
            </div>
        `;
        listContainer.appendChild(item);
    });
}

function renderCriticalProjectsChart(criticalProjects, chartColors) {
    const ctx = document.getElementById('criticalProjectsChart')?.getContext('2d');
    if (!ctx) { console.error("Canvas context missing for criticalProjectsChart"); return null; }
    if (criticalProjectsChart) criticalProjectsChart.destroy();

    if (criticalProjects.length === 0) {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.textAlign = 'center'; ctx.fillStyle = chartColors.defaultColor || '#888';
        ctx.font = '14px "Segoe UI", sans-serif';
        ctx.fillText("No hay datos de proyectos críticos.", ctx.canvas.width / 2, ctx.canvas.height / 2);
        return null;
    }

    const projectsForChart = criticalProjects.slice(0, 10);
    const labels = projectsForChart.map(p => p.name);
    const riskData = projectsForChart.map(p => p.risk_score);
    const delayData = projectsForChart.map(p => Math.max(0, p.schedule_delay_days));
    const costOverrunData = projectsForChart.map(p => Math.max(0, -p.financial_data.cost_variance));

    const chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [
                { label: 'Riesgo', data: riskData, backgroundColor: chartColors.criticalChart.risk, yAxisID: 'yRisk', barPercentage: 0.5, categoryPercentage: 0.7 },
                { label: 'Retraso (días)', data: delayData, backgroundColor: chartColors.criticalChart.delay, yAxisID: 'yDelay', barPercentage: 0.5, categoryPercentage: 0.7 },
                { label: 'Sobre Costo ($)', data: costOverrunData, backgroundColor: chartColors.criticalChart.cost, yAxisID: 'yCost', barPercentage: 0.5, categoryPercentage: 0.7 }
            ]
        },
        options: {
            indexAxis: 'y', responsive: true, maintainAspectRatio: false,
            scales: {
                x: { display: true, beginAtZero: true, ticks: { color: chartColors.defaultColor, font: { size: 10 } }, grid: { color: chartColors.borderColor + '80' } },
                y: { ticks: { font: { size: 10 }, color: chartColors.defaultColor }, grid: { display: false } },
                yRisk: { display: false, max: 100, min: 0 },
                yDelay: { display: false, beginAtZero: true },
                yCost: { display: false, beginAtZero: true }
            },
            plugins: {
                legend: { position: 'top', labels: { color: chartColors.defaultColor, boxWidth: 12 } },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) label += ': ';
                            let value = context.raw;
                            if (context.dataset.label.includes('Retraso')) label += `${value.toLocaleString()} días`;
                            else if (context.dataset.label.includes('Sobre Costo')) label += formatCurrency(value);
                            else label += value;
                            return label;
                        }
                    }
                },
                datalabels: { display: false }
            }
        }
    });
    return chart;
}

// --- Table Rendering ---
// CORRECTED renderProjectsTable function
function renderProjectsTable(data) {
    const tbody = document.getElementById('projects-table-body');
    if (!tbody) { console.error("Table body element not found!"); return; }
    tbody.innerHTML = ''; // Clear existing rows

    if (!data || data.length === 0) {
        tbody.innerHTML = '<tr><td colspan="17" class="text-center text-muted py-4">No hay proyectos que coincidan con los filtros seleccionados.</td></tr>';
        return;
    }

    data.forEach(project => {
        // --- Determine Classes ---
        const statusClass = `status-${project.status}`;
        const delayClass = project.schedule_delay_days > 5 ? 'delay-positive' : project.schedule_delay_days < -5 ? 'delay-negative' : 'delay-zero';
        const riskClass = `risk-${project.risk_level}`;
        const priorityClass = `priority-${project.priority_level?.toLowerCase()}`; // Use priority_level
        const costVarianceClass = project.financial_data.cost_variance < 0 ? 'cost-variance-negative' : project.financial_data.cost_variance > 0 ? 'cost-variance-positive' : '';
        const roiValue = project.status === 'completed' ? project.financial_data.actual_roi_percentage : project.financial_data.estimated_roi_percentage;
        const roiClass = roiValue == null ? '' : roiValue >= 100 ? 'roi-high' : roiValue >= 30 ? 'roi-medium' : 'roi-low';
        const satisfactionClass = project.customer_satisfaction_score == null ? '' : project.customer_satisfaction_score >= 4 ? 'satisfaction-high' : project.customer_satisfaction_score >= 3 ? 'satisfaction-medium' : 'satisfaction-low';

        // --- Format Text ---
        const statusText = project.status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
        const priorityText = project.priority_level || '–'; // Use priority_level for display
        const delayText = project.schedule_delay_days !== 0 ? `${project.schedule_delay_days}` : '–';
        const roiText = formatPercentage(roiValue); // Format the correct ROI percentage
        const predictedEndDateText = formatDate(project.ai_predictions?.predicted_completion_date); // Use correct object
        const satisfactionText = project.customer_satisfaction_score !== null ? project.customer_satisfaction_score.toFixed(1) : '–';

        // --- Create Row ---
        const row = document.createElement('tr');
        // REMOVED comments from inside the template literal
        row.innerHTML = `
            <td class="fw-medium text-truncate" style="max-width: 200px;" title="${project.name || ''}">${project.name || '–'}</td>
            <td>${project.project_manager || '–'}</td>
            <td>${project.type || '–'}</td>
            <td class="${statusClass}">${statusText}</td>
            <td class="${priorityClass}">${priorityText}</td>
            <td>${formatDate(project.start_date)}</td>
            <td>${formatDate(project.end_date_planned)}</td>
            <td>${formatDate(project.end_date_actual)}</td>
            <td class="text-end">${project.estimated_hours.toLocaleString()}</td>
            <td class="text-end">${project.hours_completed.toLocaleString()}</td>
            <td class="text-center fw-medium">${project.percentage_advance}%</td>
            <td class="${delayClass} text-center">${delayText}</td>
            <td class="${riskClass} text-center">${project.risk_score}</td>
            <td class="${costVarianceClass} text-end">${formatCurrency(project.financial_data.cost_variance)}</td>
            <td class="${roiClass} text-end">${roiText}</td>
            <td>${predictedEndDateText}</td>
            <td class="${satisfactionClass} text-center">${satisfactionText}</td>
        `;
        tbody.appendChild(row);
    });
}


// --- Filters Logic ---
function populateFilters(data) {
    const statusSelect = document.getElementById('filter-status');
    const typeSelect = document.getElementById('filter-type');
    const pmSelect = document.getElementById('filter-pm');
    const prioritySelect = document.getElementById('filter-priority');

    const statuses = [...new Set(data.map(p => p.status).filter(Boolean))].sort();
    const types = [...new Set(data.map(p => p.type).filter(Boolean))].sort();
    const pms = [...new Set(data.map(p => p.project_manager).filter(Boolean))].sort();
    // Use priority_level for filter options
    const priorities = [...new Set(data.map(p => p.priority_level).filter(Boolean))].sort((a,b) => {
        const order = { 'Critical': 0, 'High': 1, 'Medium': 2, 'Low': 3 }; // Define sort order
        return (order[a] || 99) - (order[b] || 99);
    });

    statusSelect.innerHTML = '<option value="">Todos Estados</option>' + statuses.map(s => `<option value="${s}">${s.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</option>`).join('');
    typeSelect.innerHTML = '<option value="">Todos Tipos</option>' + types.map(t => `<option value="${t}">${t}</option>`).join('');
    pmSelect.innerHTML = '<option value="">Todos Gerentes</option>' + pms.map(pm => `<option value="${pm}">${pm}</option>`).join('');
    // Populate using priority_level values
    prioritySelect.innerHTML = '<option value="">Todas Prioridades</option>' + priorities.map(p => `<option value="${p}">${p}</option>`).join('');
}


function initializeDateRangePicker() {
    const element = document.getElementById('filter-date-range');
    if (!element || typeof Litepicker === 'undefined') {
        console.warn("Litepicker element or library not found.");
        return;
    }
    if (dateRangePicker) dateRangePicker.destroy();
    dateRangePicker = new Litepicker({
        element: element,
        singleMode: false, format: 'MMM DD, YYYY', numberOfMonths: 2,
        tooltipText: { one: 'day', other: 'days' },
        buttonText: { previousMonth: `<i class="bi bi-chevron-left"></i>`, nextMonth: `<i class="bi bi-chevron-right"></i>`, reset: `<i class="bi bi-x"></i>`, apply: 'Aplicar' },
        resetButton: true, autoApply: false,
        setup: (picker) => {
            picker.on('selected', (date1, date2) => filterAndRender());
            picker.on('clear:selection', () => filterAndRender());
        }
    });
}

function filterProjects() {
    const statusFilter = document.getElementById('filter-status')?.value || "";
    const typeFilter = document.getElementById('filter-type')?.value || "";
    const pmFilter = document.getElementById('filter-pm')?.value || "";
    const priorityFilter = document.getElementById('filter-priority')?.value || ""; // Filter by priority_level
    const riskFilter = document.getElementById('filter-risk')?.value || "";
    const dateRange = dateRangePicker?.getStartDate() && dateRangePicker?.getEndDate() ?
        [moment(dateRangePicker.getStartDate().dateInstance), moment(dateRangePicker.getEndDate().dateInstance)] : null;

    let filtered = allProjects.filter(p => {
        if (statusFilter && p.status !== statusFilter) return false;
        if (typeFilter && p.type !== typeFilter) return false;
        if (pmFilter && p.project_manager !== pmFilter) return false;
        if (priorityFilter && p.priority_level !== priorityFilter) return false; // Compare with priority_level
        if (riskFilter && p.risk_level !== riskFilter) return false;
        if (dateRange && dateRange[0].isValid() && dateRange[1].isValid()) {
            if (!p.moment_end_planned || !p.moment_end_planned.isBetween(dateRange[0], dateRange[1], 'day', '[]')) {
                return false;
            }
        }
        return true;
    });

    return filtered;
}


// --- Combined Update and Filter/Render Function ---
function filterAndRender() {
    if (!portfolioData || !allProjects) {
         console.warn("Attempted to filter/render before data is ready.");
         return;
    }

    const filteredProjects = filterProjects();
    const criticalProjects = filterCriticalProjects(filteredProjects);
    const isDarkMode = document.body.classList.contains('dark-mode');
    const chartColors = getChartColors(isDarkMode);

    updateKPIs(portfolioData.portfolio_summary, filteredProjects);
    renderCharts(filteredProjects);
    renderCriticalProjectsList(criticalProjects);
    renderCriticalProjectsChart(criticalProjects, chartColors);
    renderProjectsTable(filteredProjects);
}

// --- Initial Load ---
document.addEventListener('DOMContentLoaded', loadData);
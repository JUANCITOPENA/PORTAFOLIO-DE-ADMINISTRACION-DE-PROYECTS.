// === Global Variables ===
let portfolioData = null; // Holds the raw data from JSON
let allProjects = []; // Holds the processed project data, used as the master list
// Chart instances
let projectStatusChart, pmLoadChart, priorityChart, employeeWorkloadChart, hoursCompletedChart, historicalHoursChart, criticalProjectsChart;
let budgetActualChart, financialScatterChart, riskDistributionChart, completionTrendChart; // New charts
let dateRangePicker = null; // Instance for the Litepicker date range filter

// === Chart.js Setup ===
Chart.register(ChartDataLabels);

// === Color & Theme Management ===
function getChartColors(isDarkMode) {
    const rootStyle = getComputedStyle(document.documentElement);
    const themeColors = {
        light: {
            text: rootStyle.getPropertyValue('--body-color-light').trim() || '#343a40',
            border: rootStyle.getPropertyValue('--card-border-light').trim() || '#e9ecef',
            pieBorder: '#ffffff',
            barCompleted: 'rgba(25, 135, 84, 0.7)', barEstimated: 'rgba(108, 117, 125, 0.55)',
            barBudget: 'rgba(13, 110, 253, 0.6)', barActual: 'rgba(220, 53, 69, 0.7)',
            line: rootStyle.getPropertyValue('--color-primary').trim() || '#0d6efd',
            lineFill: 'rgba(13, 110, 253, 0.15)',
            criticalRisk: rootStyle.getPropertyValue('--color-danger').trim(),
            criticalDelay: rootStyle.getPropertyValue('--color-orange').trim(),
            criticalCost: rootStyle.getPropertyValue('--color-purple').trim(),
            scatterPoint: 'rgba(13, 110, 253, 0.65)',
            riskLow: rootStyle.getPropertyValue('--color-success').trim(),
            riskMedium: rootStyle.getPropertyValue('--color-warning').trim(),
            riskHigh: rootStyle.getPropertyValue('--color-danger').trim(),
        },
        dark: {
            text: rootStyle.getPropertyValue('--body-color-dark').trim() || '#c9d1d9',
            border: rootStyle.getPropertyValue('--card-border-dark').trim() || '#30363d',
            pieBorder: rootStyle.getPropertyValue('--card-bg-dark').trim() || '#1c2128',
            barCompleted: 'rgba(40, 167, 69, 0.8)', barEstimated: 'rgba(134, 142, 150, 0.6)',
            barBudget: 'rgba(121, 192, 255, 0.7)', barActual: 'rgba(255, 123, 123, 0.75)',
            line: rootStyle.getPropertyValue('--link-color-dark').trim() || '#79c0ff',
            lineFill: 'rgba(121, 192, 255, 0.2)',
            criticalRisk: '#ff7b7b', criticalDelay: '#ffc078', criticalCost: '#c4aeff',
            scatterPoint: 'rgba(121, 192, 255, 0.7)',
            riskLow: '#66bb6a',
            riskMedium: '#ffa726',
            riskHigh: '#ef5350',
        }
    };
    const currentTheme = isDarkMode ? themeColors.dark : themeColors.light;

    Chart.defaults.color = currentTheme.text;
    Chart.defaults.borderColor = currentTheme.border;
    Chart.defaults.plugins.legend.labels.color = currentTheme.text;
    Chart.defaults.plugins.title.color = currentTheme.text;

    return {
        pieStatus: { 'in-progress': rootStyle.getPropertyValue('--color-info').trim(), 'completed': rootStyle.getPropertyValue('--color-success').trim(), 'delayed': rootStyle.getPropertyValue('--color-danger').trim(), 'on-hold': rootStyle.getPropertyValue('--color-secondary').trim(), 'planned': rootStyle.getPropertyValue('--color-purple').trim() },
        priorityPalette: { 'High': rootStyle.getPropertyValue('--color-orange').trim(), 'Medium': rootStyle.getPropertyValue('--color-warning').trim(), 'Low': rootStyle.getPropertyValue('--color-secondary').trim(), 'Critical': rootStyle.getPropertyValue('--color-danger').trim() },
        piePalette: [ rootStyle.getPropertyValue('--color-primary').trim(), rootStyle.getPropertyValue('--color-teal').trim(), rootStyle.getPropertyValue('--color-indigo').trim(), rootStyle.getPropertyValue('--color-yellow').trim(), rootStyle.getPropertyValue('--color-pink').trim(), rootStyle.getPropertyValue('--color-orange').trim(), rootStyle.getPropertyValue('--color-purple').trim(), rootStyle.getPropertyValue('--color-secondary').trim() ],
        barCompleted: currentTheme.barCompleted, barEstimated: currentTheme.barEstimated,
        barBudget: currentTheme.barBudget, barActual: currentTheme.barActual,
        lineHistorical: currentTheme.line, lineHistoricalFill: currentTheme.lineFill,
        criticalChart: { risk: currentTheme.criticalRisk, delay: currentTheme.criticalDelay, cost: currentTheme.criticalCost },
        scatterPoint: currentTheme.scatterPoint,
        riskDistribution: { low: currentTheme.riskLow, medium: currentTheme.riskMedium, high: currentTheme.riskHigh },
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
const safeNumber = (val, defaultVal = 0) => { const num = Number(val); return isNaN(num) ? defaultVal : num; };
const calculatePercentage = (completed, estimated) => safeNumber(estimated) > 0 ? Math.round((safeNumber(completed) / safeNumber(estimated)) * 100) : 0;
function calculateScheduleDelay(project) {
    if (project.schedule_delay_days !== null && !isNaN(Number(project.schedule_delay_days))) return safeNumber(project.schedule_delay_days);
    if (project.end_date_actual && project.end_date_planned) {
        const actual = moment(project.end_date_actual);
        const planned = moment(project.end_date_planned);
        return actual.isValid() && planned.isValid() ? actual.diff(planned, 'days') : 0;
    }
    return 0;
}
const formatDate = (dateString) => dateString ? (moment(dateString).isValid() ? moment(dateString).format('MMM DD, YYYY') : '–') : '–';
const formatCurrency = (value) => (value == null || isNaN(Number(value))) ? '–' : Number(value).toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 });
const formatPercentage = (value, decimals = 0) => {
    if (value == null || isNaN(Number(value))) return '–';
    const num = Number(value);
    const percentageValue = (Math.abs(num) > 0 && Math.abs(num) < 2 && !Number.isInteger(num) && ![1,2,3,4,5].includes(Math.abs(num))) ? num * 100 : num;
    return `${percentageValue.toFixed(decimals)}%`;
};
function isColorDark(hexColor) {
    if (!hexColor || typeof hexColor !== 'string' || hexColor.length < 4) return false;
    let color = hexColor.startsWith('#') ? hexColor.substring(1) : hexColor;
    if (color.length === 3) color = color[0]+color[0]+color[1]+color[1]+color[2]+color[2];
    if (color.length !== 6) return false;
    try {
        const rgb = parseInt(color, 16);
        const r = (rgb >> 16) & 0xff; const g = (rgb >> 8) & 0xff; const b = (rgb >> 0) & 0xff;
        const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;
        return luma < 140;
    } catch(e) { return false; }
}

// === Data Loading and Processing ===
async function loadData() {
    try {
        const response = await fetch('data.json');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        portfolioData = await response.json(); // This holds the original, unfiltered data and summary
        if (!portfolioData || !portfolioData.projects || !portfolioData.portfolio_summary) throw new Error("Invalid data structure.");

        allProjects = portfolioData.projects.map(p => { // Processed once
            p.financial_data = p.financial_data || {};
            p.ai_predictions = { prediction_confidence: p.prediction_confidence != null ? safeNumber(p.prediction_confidence) : null, predicted_completion_date: p.predicted_completion_date || null };
            p.employee_workload = (Array.isArray(p.employee_workload) ? p.employee_workload : []).map(m => ({ employee: m?.employee?.trim() || 'Unassigned', assigned_hours: safeNumber(m?.assigned_hours), completed_hours: safeNumber(m?.completed_hours) })).filter(m => m.employee !== 'Unassigned');
            p.progress_history = Array.isArray(p.progress_history) ? p.progress_history : [];
            p.estimated_hours = safeNumber(p.estimated_hours);
            p.hours_completed = safeNumber(p.hours_completed);
            p.percentage_advance = calculatePercentage(p.hours_completed, p.estimated_hours);
            p.schedule_delay_days = calculateScheduleDelay(p);
            p.risk_score = safeNumber(p.risk_score);
            p.priority_level = p.priority_category || 'Medium';
            p.priority_score = safeNumber(p.priority_score);
            p.financial_data.budget = safeNumber(p.financial_data.budget);
            p.financial_data.spent = safeNumber(p.financial_data.spent);
            p.financial_data.cost_variance = p.financial_data.cost_variance !== null && !isNaN(Number(p.financial_data.cost_variance)) ? safeNumber(p.financial_data.cost_variance) : p.financial_data.budget - p.financial_data.spent;
            p.financial_data.cost_variance_percentage = p.financial_data.budget > 0 ? ((p.financial_data.cost_variance / p.financial_data.budget) * 100) : 0;
            p.financial_data.estimated_roi_percentage = p.financial_data.projected_roi != null ? safeNumber(p.financial_data.projected_roi * 100) : null;
            p.financial_data.actual_roi_percentage = p.financial_data.actual_roi != null ? safeNumber(p.financial_data.actual_roi * 100) : null;
            p.customer_satisfaction_score = p.customer_satisfaction_score != null ? safeNumber(p.customer_satisfaction_score) : null;
            p.status = String(p.status || 'unknown').toLowerCase().trim().replace(/\s+/g, '-');
            if (p.status === 'inprogress') p.status = 'in-progress';
            p.risk_level = p.risk_score >= 80 ? 'high' : p.risk_score >= 50 ? 'medium' : 'low';
            p.moment_end_planned = p.end_date_planned ? moment(p.end_date_planned) : null;
            p.moment_end_actual = p.end_date_actual ? moment(p.end_date_actual) : null;
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
    if (!allProjects || allProjects.length === 0) return;
    populateFilters(allProjects);
    initializeDateRangePicker();
    setupEventListeners();
    filterAndRender(); // Initial render with all data (no filters active by default)
    updateThemeToggleButton(document.body.classList.contains('dark-mode'));
}

function setupEventListeners() {
    document.getElementById('theme-toggle')?.addEventListener('click', toggleTheme);
    ['filter-status', 'filter-type', 'filter-pm', 'filter-priority', 'filter-risk'].forEach(id => {
        document.getElementById(id)?.addEventListener('change', filterAndRender);
    });
}

function toggleTheme() {
    const isDarkMode = document.body.classList.toggle('dark-mode');
    localStorage.setItem('dashboardTheme', isDarkMode ? 'dark' : 'light');
    updateThemeToggleButton(isDarkMode);
    filterAndRender();
}

// === UI Update Functions ===
// All KPIs are calculated based on filteredProjectData
function updateKPIs(filteredProjectData) {
    const setKPI = (id, value, formatter = (v => v?.toLocaleString() ?? 'N/A')) => {
        const el = document.getElementById(id);
        if (el) el.innerText = formatter(value);
    };

    const totalFilteredProjects = filteredProjectData.length;
    const totalEstimatedHoursFiltered = filteredProjectData.reduce((sum, p) => sum + p.estimated_hours, 0);
    const totalCompletedHoursFiltered = filteredProjectData.reduce((sum, p) => sum + p.hours_completed, 0);
    const totalBudgetFiltered = filteredProjectData.reduce((sum, p) => sum + p.financial_data.budget, 0);
    const totalSpentFiltered = filteredProjectData.reduce((sum, p) => sum + p.financial_data.spent, 0);

    const completedFiltered = filteredProjectData.filter(p => p.status === 'completed' && p.end_date_actual && p.end_date_planned);
    const onTimeCountFiltered = completedFiltered.filter(p => moment(p.end_date_actual).isSameOrBefore(moment(p.end_date_planned), 'day')).length;
    const onTimeRateFiltered = completedFiltered.length > 0 ? (onTimeCountFiltered / completedFiltered.length) * 100 : null;

    const onBudgetCountFiltered = completedFiltered.filter(p => p.financial_data.spent <= p.financial_data.budget).length;
    const budgetAdherenceRateFiltered = completedFiltered.length > 0 ? (onBudgetCountFiltered / completedFiltered.length) * 100 : null;
    
    let weightedRoiSumFiltered = 0;
    let totalProjectBudgetForAvgRoi = 0;
    filteredProjectData.forEach(p => {
        const roiToConsider = p.status === 'completed' ? p.financial_data.actual_roi_percentage : p.financial_data.estimated_roi_percentage;
        if (roiToConsider !== null && p.financial_data.budget > 0) {
            weightedRoiSumFiltered += roiToConsider * p.financial_data.budget;
            totalProjectBudgetForAvgRoi += p.financial_data.budget;
        }
    });
    const averageRoiFiltered = totalProjectBudgetForAvgRoi > 0 ? weightedRoiSumFiltered / totalProjectBudgetForAvgRoi : null;
    
    let achievedWeightedRoiSumFiltered = 0;
    let achievedTotalBudgetForRoi = 0;
    completedFiltered.forEach(p => {
        if (p.financial_data.actual_roi_percentage !== null && p.financial_data.budget > 0) {
            achievedWeightedRoiSumFiltered += p.financial_data.actual_roi_percentage * p.financial_data.budget;
            achievedTotalBudgetForRoi += p.financial_data.budget;
        }
    });
    const portfolioRoiAchievedFiltered = achievedTotalBudgetForRoi > 0 ? achievedWeightedRoiSumFiltered / achievedTotalBudgetForRoi : null;

    const activeProjectsFiltered = filteredProjectData.filter(p => p.status !== 'completed');
    const avgRiskActiveFiltered = activeProjectsFiltered.length > 0 ? activeProjectsFiltered.reduce((sum, p) => sum + p.risk_score, 0) / activeProjectsFiltered.length : null;

    const projectsWithSatisfactionFiltered = filteredProjectData.filter(p => p.customer_satisfaction_score !== null);
    const avgCustSatFiltered = projectsWithSatisfactionFiltered.length > 0 ?
        projectsWithSatisfactionFiltered.reduce((sum,p) => sum + (p.customer_satisfaction_score || 0), 0) / projectsWithSatisfactionFiltered.length : null;

    let totalAssignedHoursFiltered = 0;
    const uniqueEmployeesInFiltered = new Set();
    filteredProjectData.forEach(p => {
        (p.employee_workload || []).forEach(emp => {
            totalAssignedHoursFiltered += emp.assigned_hours;
            uniqueEmployeesInFiltered.add(emp.employee);
        });
    });
    const avgEmployeeWorkloadFiltered = uniqueEmployeesInFiltered.size > 0 ? totalAssignedHoursFiltered / uniqueEmployeesInFiltered.size : 0;

    setKPI('kpi-total-projects', totalFilteredProjects);
    setKPI('kpi-hours-invested', totalEstimatedHoursFiltered);
    setKPI('kpi-hours-completed', totalCompletedHoursFiltered);
    setKPI('kpi-total-budget', totalBudgetFiltered, formatCurrency); 
    setKPI('kpi-total-spent', totalSpentFiltered, formatCurrency); 
    setKPI('kpi-average-roi', averageRoiFiltered, v => formatPercentage(v, 1));
    setKPI('kpi-average-customer-satisfaction', avgCustSatFiltered, v => v !== null ? `${Number(v).toFixed(1)}/5` : 'N/A');
    setKPI('kpi-average-employee-workload', avgEmployeeWorkloadFiltered, v => `${v?.toLocaleString(undefined, {maximumFractionDigits: 0}) ?? 0} hrs`);
    setKPI('kpi-on-time-completion-rate', onTimeRateFiltered, v => formatPercentage(v, 0));
    setKPI('kpi-budget-adherence-rate', budgetAdherenceRateFiltered, v => formatPercentage(v, 0));
    setKPI('kpi-portfolio-roi-achieved', portfolioRoiAchievedFiltered, v => formatPercentage(v, 1));
    setKPI('kpi-active-projects-risk-exposure', avgRiskActiveFiltered, v => v !== null ? v.toFixed(1) : 'N/A');
}

// --- Chart Rendering (no changes needed here for filter logic, charts receive filtered data) ---
function renderCharts(projects) {
    const isDarkMode = document.body.classList.contains('dark-mode');
    const chartColors = getChartColors(isDarkMode); // Ensures defaults are set for current theme

    const statusCounts = projects.reduce((acc, p) => { acc[p.status] = (acc[p.status] || 0) + 1; return acc; }, {});
    const statusOrder = ['in-progress', 'completed', 'delayed', 'on-hold', 'planned'].filter(s => statusCounts[s]);
    const statusData = statusOrder.map(s => statusCounts[s] || 0);
    const statusColors = statusOrder.map(s => chartColors.pieStatus[s] || chartColors.piePalette[Math.floor(Math.random() * chartColors.piePalette.length)]);
    projectStatusChart = renderPieChart('projectStatusChart', projectStatusChart, statusOrder.map(s => s.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())), statusData, statusColors, chartColors.pieBorderColor);

    const pmCounts = projects.reduce((acc, p) => { acc[p.project_manager || 'Unassigned'] = (acc[p.project_manager || 'Unassigned'] || 0) + 1; return acc; }, {});
    pmLoadChart = renderPieChart('pmLoadChart', pmLoadChart, Object.keys(pmCounts), Object.values(pmCounts), chartColors.piePalette, chartColors.pieBorderColor);

    const priorityCounts = projects.reduce((acc, p) => { acc[p.priority_level] = (acc[p.priority_level] || 0) + 1; return acc; }, {});
    const priorityOrder = ['Critical', 'High', 'Medium', 'Low'].filter(p => priorityCounts[p]);
    priorityChart = renderPieChart('priorityChart', priorityChart, priorityOrder, priorityOrder.map(p => priorityCounts[p]), priorityOrder.map(p => chartColors.priorityPalette[p]), chartColors.pieBorderColor);

    employeeWorkloadChart = renderEmployeeWorkloadChart(projects, chartColors);
    hoursCompletedChart = renderHoursComparisonChart(projects, chartColors);
    historicalHoursChart = renderHistoricalHoursChart(projects, chartColors);
    budgetActualChart = renderBudgetActualChart(projects, chartColors);
    financialScatterChart = renderFinancialScatterChart(projects, chartColors);
    riskDistributionChart = renderRiskDistributionChart(projects, chartColors);
    completionTrendChart = renderCompletionTrendChart(projects, chartColors);
}

function renderPieChart(canvasId, chartInstance, labels, data, backgroundColors, borderColor) {
    const ctx = document.getElementById(canvasId)?.getContext('2d');
    if (!ctx) return null;
    if (chartInstance) chartInstance.destroy();
    return new Chart(ctx, {
        type: 'pie',
        data: { labels, datasets: [{ data, backgroundColor: backgroundColors, borderColor, borderWidth: 2 }] },
        options: {
            responsive: true, maintainAspectRatio: false,
            plugins: {
                legend: { position: 'bottom', labels: { boxWidth: 12, padding: 15 } },
                tooltip: { bodyFont: { size: 11 }, titleFont: { size: 12 } },
                datalabels: {
                    formatter: (value, context) => {
                        const sum = context.chart.data.datasets[0].data.reduce((a, b) => a + b, 0);
                        const percentage = sum > 0 ? (value * 100 / sum) : 0;
                        return percentage > 5 ? percentage.toFixed(0) + "%" : '';
                    },
                    color: (context) => isColorDark(context.dataset.backgroundColor[context.dataIndex]) ? '#fff' : '#333',
                    font: { weight: 'bold', size: 10 }, display: (ctx) => ctx.dataset.data[ctx.dataIndex] > 0
                }
            }
        }
    });
}

function renderEmployeeWorkloadChart(projects, chartColors) {
    const ctx = document.getElementById('employeeWorkloadChart')?.getContext('2d');
    if (!ctx) return null;
    if (employeeWorkloadChart) employeeWorkloadChart.destroy();
    const employeeDataAgg = projects.reduce((acc, project) => {
        (project.employee_workload || []).forEach(member => {
            if (member && member.employee && safeNumber(member.assigned_hours) > 0) {
                acc[member.employee] = (acc[member.employee] || 0) + safeNumber(member.assigned_hours);
            }
        });
        return acc;
    }, {});
    const sortedEmployees = Object.entries(employeeDataAgg).sort(([, a], [, b]) => a - b);
    if (sortedEmployees.length === 0) { ctx.clearRect(0,0,ctx.canvas.width, ctx.canvas.height); ctx.textAlign="center"; ctx.font = `14px ${Chart.defaults.font.family}`; ctx.fillStyle = chartColors.defaultColor; ctx.fillText("No hay datos de carga de empleados.", ctx.canvas.width/2, 50); return null; }
    return new Chart(ctx, {
        type: 'bar',
        data: { labels: sortedEmployees.map(([name]) => name), datasets: [{ label: 'Horas Asignadas', data: sortedEmployees.map(([, hours]) => hours), backgroundColor: chartColors.lineHistorical, borderWidth: 1, barPercentage: 0.7, categoryPercentage: 0.8 }] },
        options: {
            indexAxis: 'y', responsive: true, maintainAspectRatio: false,
            scales: { x: { beginAtZero: true, title: { display: true, text: 'Total Horas Asignadas' } }, y: { ticks: { font: { size: 10 } } } },
            plugins: { legend: { display: false }, tooltip: { callbacks: { label: (c) => `Horas: ${c.raw.toLocaleString()}` } }, datalabels: { anchor: 'end', align: 'right', formatter: (v) => v > 0 ? v.toLocaleString() : '', font: { size: 9, weight: '500' }, padding: { left: 4 } } }
        }
    });
}

function renderHoursComparisonChart(projects, chartColors) {
    const ctx = document.getElementById('hoursCompletedChart')?.getContext('2d');
    if (!ctx) return null;
    if (hoursCompletedChart) hoursCompletedChart.destroy();
    const sortedProjects = [...projects].sort((a, b) => b.estimated_hours - a.estimated_hours).slice(0, 15);
    if (sortedProjects.length === 0) { ctx.clearRect(0,0,ctx.canvas.width, ctx.canvas.height); ctx.textAlign="center"; ctx.font = `14px ${Chart.defaults.font.family}`; ctx.fillStyle = chartColors.defaultColor; ctx.fillText("No hay datos de horas.", ctx.canvas.width/2, 50); return null; }
    return new Chart(ctx, {
        type: 'bar',
        data: { labels: sortedProjects.map(p => p.name), datasets: [ { label: 'Estimadas', data: sortedProjects.map(p => p.estimated_hours), backgroundColor: chartColors.barEstimated, stack: 'Stack 0' }, { label: 'Completadas', data: sortedProjects.map(p => p.hours_completed), backgroundColor: chartColors.barCompleted, stack: 'Stack 0' } ] },
        options: {
            indexAxis: 'y', responsive: true, maintainAspectRatio: false,
            scales: { x: { stacked: true, beginAtZero: true }, y: { stacked: true, ticks: { font: { size: 10 } } } },
            plugins: { legend: { position: 'top' }, tooltip: { mode: 'index', intersect: false }, datalabels: { display: false } }
        }
    });
}

function renderHistoricalHoursChart(projects, chartColors) {
    const ctx = document.getElementById('historicalHoursChart')?.getContext('2d');
    if (!ctx) return null;
    if (historicalHoursChart) historicalHoursChart.destroy();
    const allDates = new Set();
    projects.forEach(p => (p.progress_history || []).forEach(h => { if (h.date) allDates.add(h.date); }));
    const sortedDates = Array.from(allDates).map(d => moment(d)).filter(m => m.isValid()).sort((a,b) => a - b).map(m => m.format('YYYY-MM-DD'));
    if (sortedDates.length === 0) { ctx.clearRect(0,0,ctx.canvas.width, ctx.canvas.height); ctx.textAlign="center"; ctx.font = `14px ${Chart.defaults.font.family}`; ctx.fillStyle = chartColors.defaultColor; ctx.fillText("No hay datos históricos.", ctx.canvas.width/2, 50); return null; }
    const cumulativeHours = sortedDates.map(date => {
        let total = 0; const currentMoment = moment(date);
        projects.forEach(p => {
            const latestEntry = (p.progress_history || []).map(h => ({ date: moment(h.date), hours: safeNumber(h.hours_completed_on_date) })).filter(h => h.date.isValid() && h.date.isSameOrBefore(currentMoment)).sort((a,b) => b.date - a.date)[0];
            if (latestEntry) total += latestEntry.hours;
        });
        return total;
    });
    return new Chart(ctx, {
        type: 'line',
        data: { labels: sortedDates, datasets: [{ label: 'Horas Acumuladas', data: cumulativeHours, fill: true, borderColor: chartColors.lineHistorical, backgroundColor: chartColors.lineHistoricalFill, tension: 0.1, pointRadius: 2, borderWidth: 1.5 }] },
        options: {
            responsive: true, maintainAspectRatio: false,
            scales: { x: { type: 'time', time: { unit: 'month' }, title: { display: true, text: 'Fecha' } }, y: { beginAtZero: true, title: { display: true, text: 'Horas Totales Completadas' } } },
            plugins: { legend: { display: false }, tooltip: { mode: 'index', intersect: false }, datalabels: { display: false } }
        }
    });
}

function renderBudgetActualChart(projects, chartColors) {
    const ctx = document.getElementById('budgetActualChart')?.getContext('2d');
    if (!ctx) return null;
    if (budgetActualChart) budgetActualChart.destroy();
    const topProjects = [...projects].sort((a, b) => b.financial_data.budget - a.financial_data.budget).slice(0, 10);
    if (topProjects.length === 0) { ctx.clearRect(0,0,ctx.canvas.width, ctx.canvas.height); ctx.textAlign="center"; ctx.font = `14px ${Chart.defaults.font.family}`; ctx.fillStyle = chartColors.defaultColor; ctx.fillText("No hay datos financieros.", ctx.canvas.width/2, 50); return null; }
    return new Chart(ctx, {
        type: 'bar',
        data: { labels: topProjects.map(p => p.name), datasets: [ { label: 'Presupuesto', data: topProjects.map(p => p.financial_data.budget), backgroundColor: chartColors.barBudget, stack: 'Presupuesto' }, { label: 'Gasto Actual', data: topProjects.map(p => p.financial_data.spent), backgroundColor: chartColors.barActual, stack: 'Gasto' } ] },
        options: {
            indexAxis: 'y', responsive: true, maintainAspectRatio: false,
            scales: { x: { beginAtZero: true, title: { display: true, text: 'Monto ($)' }, ticks: { callback: value => formatCurrency(value) } }, y: { ticks: { font: { size: 10 } } } },
            plugins: { legend: { position: 'top' }, tooltip: { callbacks: { label: (c) => `${c.dataset.label}: ${formatCurrency(c.raw)}` } }, datalabels: { display: false } }
        }
    });
}

function renderFinancialScatterChart(projects, chartColors) {
    const ctx = document.getElementById('financialScatterChart')?.getContext('2d');
    if (!ctx) return null;
    if (financialScatterChart) financialScatterChart.destroy();
    const chartData = projects.filter(p => p.financial_data.budget > 0 && (p.financial_data.estimated_roi_percentage !== null || p.financial_data.actual_roi_percentage !== null))
        .map(p => ({ x: p.financial_data.cost_variance_percentage, y: p.status === 'completed' ? p.financial_data.actual_roi_percentage : p.financial_data.estimated_roi_percentage, projectName: p.name }));
    if (chartData.length === 0) { ctx.clearRect(0,0,ctx.canvas.width, ctx.canvas.height); ctx.textAlign="center"; ctx.font = `14px ${Chart.defaults.font.family}`; ctx.fillStyle = chartColors.defaultColor; ctx.fillText("No hay datos para este gráfico.", ctx.canvas.width/2, 50); return null; }
    return new Chart(ctx, {
        type: 'scatter',
        data: { datasets: [{ label: 'Proyectos', data: chartData, backgroundColor: chartColors.scatterPoint }] },
        options: {
            responsive: true, maintainAspectRatio: false,
            scales: { x: { title: { display: true, text: 'Variación de Costo (%)' }, ticks: { callback: v => `${v.toFixed(0)}%` } }, y: { title: { display: true, text: 'ROI Estimado/Real (%)' }, ticks: { callback: v => `${v.toFixed(0)}%` } } },
            plugins: { legend: { display: false }, tooltip: { callbacks: { label: (c) => `${c.raw.projectName}: CostVar ${c.raw.x.toFixed(1)}%, ROI ${c.raw.y.toFixed(1)}%` } }, datalabels: { display: false } }
        }
    });
}

function renderRiskDistributionChart(projects, chartColors) {
    const ctx = document.getElementById('riskDistributionChart')?.getContext('2d');
    if (!ctx) return null;
    if (riskDistributionChart) riskDistributionChart.destroy();
    const riskCounts = projects.reduce((acc, p) => { acc[p.risk_level] = (acc[p.risk_level] || 0) + 1; return acc; }, {});
    const riskLabels = ['low', 'medium', 'high'];
    const riskData = riskLabels.map(level => riskCounts[level] || 0);
    const riskBGColors = riskLabels.map(level => chartColors.riskDistribution[level] || chartColors.defaultColor);
    if (projects.length === 0) { ctx.clearRect(0,0,ctx.canvas.width, ctx.canvas.height); ctx.textAlign="center"; ctx.font = `14px ${Chart.defaults.font.family}`; ctx.fillStyle = chartColors.defaultColor; ctx.fillText("No hay datos de riesgo.", ctx.canvas.width/2, 50); return null; }
    return new Chart(ctx, {
        type: 'bar',
        data: { labels: riskLabels.map(l => l.charAt(0).toUpperCase() + l.slice(1)), datasets: [{ label: 'Número de Proyectos', data: riskData, backgroundColor: riskBGColors }] },
        options: {
            responsive: true, maintainAspectRatio: false,
            scales: { y: { beginAtZero: true, title: { display: true, text: 'Nº Proyectos' } } },
            plugins: { legend: { display: false }, datalabels: { anchor: 'end', align: 'top', formatter: (v) => v > 0 ? v : '' } }
        }
    });
}

function renderCompletionTrendChart(projects, chartColors) {
    const ctx = document.getElementById('completionTrendChart')?.getContext('2d');
    if (!ctx) return null;
    if (completionTrendChart) completionTrendChart.destroy();
    const completionsByMonth = projects.filter(p => p.status === 'completed' && p.moment_end_actual && p.moment_end_actual.isValid())
        .reduce((acc, p) => { const monthYear = p.moment_end_actual.format('YYYY-MM'); acc[monthYear] = (acc[monthYear] || 0) + 1; return acc; }, {});
    const sortedMonths = Object.keys(completionsByMonth).sort();
    if (sortedMonths.length === 0) { ctx.clearRect(0,0,ctx.canvas.width, ctx.canvas.height); ctx.textAlign="center"; ctx.font = `14px ${Chart.defaults.font.family}`; ctx.fillStyle = chartColors.defaultColor; ctx.fillText("No hay tendencias de completación.", ctx.canvas.width/2, 50); return null; }
    const trendData = sortedMonths.map(month => completionsByMonth[month]);
    return new Chart(ctx, {
        type: 'line',
        data: { labels: sortedMonths, datasets: [{ label: 'Proyectos Completados', data: trendData, borderColor: chartColors.lineHistorical, backgroundColor: chartColors.lineHistoricalFill, fill: true, tension: 0.1 }] },
        options: {
            responsive: true, maintainAspectRatio: false,
            scales: { x: { type: 'time', time: { unit: 'month', displayFormats: { month: 'MMM YYYY' } }, title: { display: true, text: 'Mes de Completación' } }, y: { beginAtZero: true, title: { display: true, text: 'Nº Proyectos Completados' }, ticks: { stepSize: 1 } } },
            plugins: { legend: { display: false }, datalabels: { display: false } }
        }
    });
}

// --- Critical Projects Section ---
function filterCriticalProjects(projects) {
     return projects.filter(p => p.status !== 'completed' && (p.risk_score >= 80 || p.schedule_delay_days > 20 || p.financial_data.cost_variance_percentage < -15 || (p.ai_predictions?.prediction_confidence !== null && p.ai_predictions.prediction_confidence < 65)))
        .sort((a,b) => b.risk_score - a.risk_score);
}

function renderCriticalProjectsList(criticalProjects) {
    const listContainer = document.getElementById('critical-projects-list');
    if (!listContainer) return;
    listContainer.innerHTML = '';
    if (criticalProjects.length === 0) { listContainer.innerHTML = '<div class="list-group-item text-muted text-center p-4">No hay proyectos críticos actualmente.</div>'; return; }
    criticalProjects.forEach(project => {
        const riskClass = project.risk_score >= 80 ? 'critical-high-risk' : 'critical-medium-risk';
        const riskBadge = `badge-risk-${project.risk_level}`;
        const delayBadge = project.schedule_delay_days > 20 ? 'badge-delay-high' : project.schedule_delay_days > 5 ? 'badge-delay-medium' : 'badge-delay-low';
        const costVariance = project.financial_data.cost_variance;
        const costBadge = costVariance < 0 ? 'badge-cost-negative' : costVariance > 0 ? 'badge-cost-positive' : 'badge-cost-zero';
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
            </div>`;
        listContainer.appendChild(item);
    });
}

function renderCriticalProjectsChart(criticalProjects, chartColors) {
    const ctx = document.getElementById('criticalProjectsChart')?.getContext('2d');
    if (!ctx) return null;
    if (criticalProjectsChart) criticalProjectsChart.destroy();
    if (criticalProjects.length === 0) { ctx.clearRect(0,0,ctx.canvas.width, ctx.canvas.height); ctx.textAlign="center"; ctx.font = `14px ${Chart.defaults.font.family}`; ctx.fillStyle = chartColors.defaultColor; ctx.fillText("No hay proyectos críticos para graficar.", ctx.canvas.width/2, ctx.canvas.height/2); return null; }
    const projectsForChart = criticalProjects.slice(0, 10);
    return new Chart(ctx, {
        type: 'bar',
        data: {
            labels: projectsForChart.map(p => p.name),
            datasets: [
                { label: 'Riesgo', data: projectsForChart.map(p => p.risk_score), backgroundColor: chartColors.criticalChart.risk, yAxisID: 'yRisk' },
                { label: 'Retraso (días)', data: projectsForChart.map(p => Math.max(0, p.schedule_delay_days)), backgroundColor: chartColors.criticalChart.delay, yAxisID: 'yDelay' },
                { label: 'Sobre Costo ($)', data: projectsForChart.map(p => Math.max(0, -p.financial_data.cost_variance)), backgroundColor: chartColors.criticalChart.cost, yAxisID: 'yCost' }
            ]
        },
        options: {
            indexAxis: 'y', responsive: true, maintainAspectRatio: false,
            scales: {
                x: { display: true, beginAtZero: true }, y: { ticks: { font: { size: 10 } } },
                yRisk: { display: false, max: 100, min: 0 }, yDelay: { display: false, beginAtZero: true }, yCost: { display: false, beginAtZero: true }
            },
            plugins: {
                legend: { position: 'top', labels: { boxWidth: 12 } },
                tooltip: { callbacks: { label: (c) => `${c.dataset.label || ''}: ${c.dataset.label.includes('Sobre Costo') ? formatCurrency(c.raw) : c.raw.toLocaleString()}${c.dataset.label.includes('Retraso') ? ' días' : ''}` } },
                datalabels: { display: false }
            }
        }
    });
}

// --- Table Rendering ---
function renderProjectsTable(data) {
    const tbody = document.getElementById('projects-table-body');
    if (!tbody) return;
    tbody.innerHTML = '';
    if (!data || data.length === 0) { tbody.innerHTML = '<tr><td colspan="17" class="text-center text-muted py-4">No hay proyectos que coincidan con los filtros.</td></tr>'; return; }
    data.forEach(project => {
        const statusClass = `status-${project.status}`;
        const delayClass = project.schedule_delay_days > 5 ? 'delay-positive' : project.schedule_delay_days < -5 ? 'delay-negative' : 'delay-zero';
        const riskClass = `risk-${project.risk_level}`;
        const priorityClass = `priority-${project.priority_level?.toLowerCase()}`;
        const costVarianceClass = project.financial_data.cost_variance < 0 ? 'cost-variance-negative' : project.financial_data.cost_variance > 0 ? 'cost-variance-positive' : '';
        const roiValue = project.status === 'completed' ? project.financial_data.actual_roi_percentage : project.financial_data.estimated_roi_percentage;
        const roiClass = roiValue == null ? '' : roiValue >= 100 ? 'roi-high' : roiValue >= 30 ? 'roi-medium' : 'roi-low';
        const satisfactionClass = project.customer_satisfaction_score == null ? '' : project.customer_satisfaction_score >= 4 ? 'satisfaction-high' : project.customer_satisfaction_score >= 3 ? 'satisfaction-medium' : 'satisfaction-low';
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="fw-medium text-truncate" style="max-width: 180px;" title="${project.name || ''}">${project.name || '–'}</td>
            <td>${project.project_manager || '–'}</td>
            <td>${project.type || '–'}</td>
            <td class="${statusClass}">${project.status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</td>
            <td class="${priorityClass}">${project.priority_level || '–'}</td>
            <td>${formatDate(project.start_date)}</td>
            <td>${formatDate(project.end_date_planned)}</td>
            <td>${formatDate(project.end_date_actual)}</td>
            <td class="text-end">${project.estimated_hours.toLocaleString()}</td>
            <td class="text-end">${project.hours_completed.toLocaleString()}</td>
            <td class="text-center fw-medium">${project.percentage_advance}%</td>
            <td class="${delayClass} text-center">${project.schedule_delay_days !== 0 ? project.schedule_delay_days : '–'}</td>
            <td class="${riskClass} text-center">${project.risk_score}</td>
            <td class="${costVarianceClass} text-end">${formatCurrency(project.financial_data.cost_variance)}</td>
            <td class="${roiClass} text-end">${formatPercentage(roiValue,1)}</td>
            <td>${formatDate(project.ai_predictions?.predicted_completion_date)}</td>
            <td class="${satisfactionClass} text-center">${project.customer_satisfaction_score !== null ? project.customer_satisfaction_score.toFixed(1) : '–'}</td>
        `;
        tbody.appendChild(row);
    });
}

// --- Filters Logic ---
function populateFilters(data) {
    const createOptions = (selectId, values, defaultText) => {
        const select = document.getElementById(selectId);
        if(!select) return;
        const uniqueSortedValues = [...new Set(values.filter(Boolean))].sort((a,b) => {
            if (selectId === 'filter-priority') {
                const order = { 'Critical': 0, 'High': 1, 'Medium': 2, 'Low': 3 };
                return (order[a] || 99) - (order[b] || 99);
            }
            return String(a).localeCompare(String(b));
        });
        select.innerHTML = `<option value="">${defaultText}</option>` + uniqueSortedValues.map(v => `<option value="${v}">${v.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</option>`).join('');
    };
    createOptions('filter-status', data.map(p => p.status), 'Todos Estados');
    createOptions('filter-type', data.map(p => p.type), 'Todos Tipos');
    createOptions('filter-pm', data.map(p => p.project_manager), 'Todos Gerentes');
    createOptions('filter-priority', data.map(p => p.priority_level), 'Todas Prioridades');
}

function initializeDateRangePicker() {
    const element = document.getElementById('filter-date-range');
    if (!element || typeof Litepicker === 'undefined') return;
    if (dateRangePicker) dateRangePicker.destroy();
    dateRangePicker = new Litepicker({
        element, singleMode: false, format: 'MMM DD, YYYY', numberOfMonths: 2,
        buttonText: { previousMonth: `<i class="bi bi-chevron-left"></i>`, nextMonth: `<i class="bi bi-chevron-right"></i>`, reset: `<i class="bi bi-x"></i>`, apply: 'Aplicar' },
        resetButton: true, autoApply: false,
        setup: (picker) => {
            picker.on('selected', () => filterAndRender());
            picker.on('clear:selection', () => filterAndRender());
        }
    });
}

function filterProjects() {
    const filters = {
        status: document.getElementById('filter-status')?.value || "",
        type: document.getElementById('filter-type')?.value || "",
        pm: document.getElementById('filter-pm')?.value || "",
        priority: document.getElementById('filter-priority')?.value || "",
        risk: document.getElementById('filter-risk')?.value || "",
        dateRange: dateRangePicker?.getStartDate() && dateRangePicker?.getEndDate() ?
            [moment(dateRangePicker.getStartDate().dateInstance), moment(dateRangePicker.getEndDate().dateInstance)] : null
    };
    return allProjects.filter(p =>
        (!filters.status || p.status === filters.status) &&
        (!filters.type || p.type === filters.type) &&
        (!filters.pm || p.project_manager === filters.pm) &&
        (!filters.priority || p.priority_level === filters.priority) &&
        (!filters.risk || p.risk_level === filters.risk) &&
        (!filters.dateRange || (p.moment_end_planned && p.moment_end_planned.isBetween(filters.dateRange[0], filters.dateRange[1], 'day', '[]')))
    );
}

// --- Executive Summary Generation ---
function generateExecutiveSummary(filteredProjects) {
    const container = document.getElementById('executive-summary-content');
    if (!container) {
        console.error("Executive summary container not found.");
        return;
    }
    
    const totalFilteredProjects = filteredProjects.length;
    const completedFiltered = filteredProjects.filter(p => p.status === 'completed');
    const inProgressFiltered = filteredProjects.filter(p => p.status === 'in-progress');
    const delayedFiltered = filteredProjects.filter(p => p.status === 'delayed');
    const criticalFiltered = filterCriticalProjects(filteredProjects); 

    const onTimeCompletedFiltered = completedFiltered.filter(p => p.end_date_actual && p.end_date_planned && moment(p.end_date_actual).isSameOrBefore(moment(p.end_date_planned), 'day')).length;
    const onTimeRateFiltered = completedFiltered.length > 0 ? (onTimeCompletedFiltered / completedFiltered.length) * 100 : 0;

    const onBudgetCompletedFiltered = completedFiltered.filter(p => p.financial_data.spent <= p.financial_data.budget).length;
    const budgetAdherenceRateFiltered = completedFiltered.length > 0 ? (onBudgetCompletedFiltered / completedFiltered.length) * 100 : 0;

    let totalBudgetFiltered = 0, totalSpentFiltered = 0, totalCostVarianceFiltered = 0;
    let weightedActualRoiSumFiltered = 0, totalBudgetForRoiCalcFiltered = 0;

    filteredProjects.forEach(p => {
        totalBudgetFiltered += p.financial_data.budget;
        totalSpentFiltered += p.financial_data.spent;
        totalCostVarianceFiltered += p.financial_data.cost_variance;
        if (p.status === 'completed' && p.financial_data.actual_roi_percentage !== null && p.financial_data.budget > 0) {
            weightedActualRoiSumFiltered += p.financial_data.actual_roi_percentage * p.financial_data.budget;
            totalBudgetForRoiCalcFiltered += p.financial_data.budget;
        }
    });
    const portfolioActualRoiFiltered = totalBudgetForRoiCalcFiltered > 0 ? weightedActualRoiSumFiltered / totalBudgetForRoiCalcFiltered : null;
    const avgRiskScoreFiltered = totalFilteredProjects > 0 ? filteredProjects.reduce((sum, p) => sum + p.risk_score, 0) / totalFilteredProjects : 0;

    const styleNum = (val, target, isPercent = false, higherIsBetter = true) => {
        let numStr = isPercent ? formatPercentage(val, 1) : (typeof val === 'number' ? val.toLocaleString() : val);
        if (val === null || val === undefined || isNaN(val)) return "<span class='summary-neutral'>N/A</span>";
        if (val > target) return higherIsBetter ? `<span class='summary-positive'>${numStr}</span>` : `<span class='summary-negative'>${numStr}</span>`;
        if (val < target) return higherIsBetter ? `<span class='summary-negative'>${numStr}</span>` : `<span class='summary-positive'>${numStr}</span>`;
        return `<span class='summary-neutral'>${numStr}</span>`;
    };

     const getOverallStatus = () => {
        if (totalFilteredProjects === 0) return "<span class='summary-neutral fw-bold'>ℹ️ No hay proyectos que coincidan con los filtros actuales.</span>";
        if (criticalFiltered.length > totalFilteredProjects * 0.2 && criticalFiltered.length > 0) return "<span class='summary-negative fw-bold'>⚠️ Atención Requerida</span> (Alto # Proyectos Críticos)";
        if ((onTimeRateFiltered < 70 || budgetAdherenceRateFiltered < 70) && completedFiltered.length > 0) return "<span class='summary-warning fw-bold'>🔍 Monitoreo Necesario</span> (Desempeño bajo en tiempo/costo)";
        if (inProgressFiltered.length === 0 && totalFilteredProjects > 0 && completedFiltered.length < totalFilteredProjects) return "<span class='summary-neutral fw-bold'>🏁 No hay proyectos en progreso con los filtros actuales.</span>";
        return "<span class='summary-positive fw-bold'>✅ En Buen Camino</span> (Mayoría de métricas positivas para la selección)";
    };

    let html = `<h5>📊 Visión General (${totalFilteredProjects} Proyectos Filtrados)</h5>`;
    html += `<p><strong>Estado General (Selección Actual):</strong> ${getOverallStatus()}</p>`;
    
    if (totalFilteredProjects > 0) {
        html += `<p>De la selección actual, hay <span class='summary-metric'>${inProgressFiltered.length}</span> proyectos en progreso, <span class='summary-metric'>${completedFiltered.length}</span> completados, y <span class='summary-metric summary-negative'>${delayedFiltered.length}</span> retrasados. Se identifican <strong class='summary-metric ${criticalFiltered.length > 0 ? 'summary-negative' : 'summary-positive'}'>${criticalFiltered.length}</strong> proyectos críticos en esta selección.</p>`;

        html += `<h5>⏱️ Desempeño y Entrega (Selección Actual)</h5>`;
        html += `<ul>`;
        html += `<li><strong>Tasa de Completación a Tiempo:</strong> ${styleNum(onTimeRateFiltered, 80, true, true)} (Objetivo: >80%)</li>`;
        html += `<li><strong>Adherencia al Presupuesto (Completados):</strong> ${styleNum(budgetAdherenceRateFiltered, 85, true, true)} (Objetivo: >85%)</li>`;
        html += `</ul>`;

        html += `<h5>💰 Desempeño Financiero (Selección Actual)</h5>`;
        html += `<ul>`;
        html += `<li><strong>Presupuesto Total:</strong> <span class='summary-metric'>${formatCurrency(totalBudgetFiltered)}</span></li>`;
        html += `<li><strong>Gasto Total:</strong> <span class='summary-metric'>${formatCurrency(totalSpentFiltered)}</span></li>`;
        html += `<li><strong>Variación de Costo Total:</strong> ${totalCostVarianceFiltered >= 0 ? `<span class='summary-positive'>${formatCurrency(totalCostVarianceFiltered)}</span> (Bajo Presupuesto)` : `<span class='summary-negative'>${formatCurrency(totalCostVarianceFiltered)}</span> (Sobre Presupuesto)`}</li>`;
        if (portfolioActualRoiFiltered !== null) {
            html += `<li><strong>ROI Realizado (Completados en Selección):</strong> ${styleNum(portfolioActualRoiFiltered, 20, true, true)} (Objetivo: >20%)</li>`;
        } else {
            html += `<li><strong>ROI Realizado (Completados en Selección):</strong> <span class='summary-neutral'>N/A</span></li>`;
        }
        html += `</ul>`;

        html += `<h5>🛡️ Gestión de Riesgos (Selección Actual)</h5>`;
        html += `<p>El <span class='summary-highlight'>nivel de riesgo promedio</span> es <strong class='${avgRiskScoreFiltered > 70 ? 'summary-negative' : avgRiskScoreFiltered > 50 ? 'summary-warning' : 'summary-positive'}'>${avgRiskScoreFiltered.toFixed(1)}/100</strong>. ${criticalFiltered.length > 0 ? `Se requiere atención especial a los <strong class='summary-negative'>${criticalFiltered.length} proyectos críticos</strong>.` : "<span class='summary-positive'>No hay proyectos críticos en la selección actual.</span>"} </p>`;
    }
    html += `<p class='mt-3 fst-italic summary-neutral'><small>📅 Resumen generado: ${moment().format('DD MMM YYYY, h:mm a')}. Basado en los filtros activos.</small></p>`;

    container.innerHTML = html;
}


// --- Combined Update and Filter/Render Function ---
function filterAndRender() {
    if (!portfolioData || !allProjects) { return; }

    const filteredProjects = filterProjects(); // This is the single source of truth for filtered data
    const criticalProjects = filterCriticalProjects(filteredProjects);
    const isDarkMode = document.body.classList.contains('dark-mode');
    
    const currentChartColors = getChartColors(isDarkMode); 

    updateKPIs(filteredProjects); // KPIs based entirely on filteredProjects
    renderCharts(filteredProjects); 
    renderCriticalProjectsList(criticalProjects);
    renderCriticalProjectsChart(criticalProjects, currentChartColors);
    renderProjectsTable(filteredProjects);
    generateExecutiveSummary(filteredProjects); // Summary based entirely on filteredProjects
}

// --- Initial Load & Theme Persistence ---
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('dashboardTheme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }
    loadData();
});
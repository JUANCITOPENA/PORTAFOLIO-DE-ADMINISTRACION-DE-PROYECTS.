// === Global Variables ===
let portfolioData = null; 
let allProjects = []; 
let projectStatusChart, pmLoadChart, priorityChart, employeeWorkloadChart, hoursCompletedChart, historicalHoursChart, criticalProjectsChart;
let budgetActualChart, financialScatterChart, riskDistributionChart, completionTrendChart;
let dateRangePicker = null;
// let ganttChartInstance = null; // Ya no es una instancia de Frappe Gantt
let projectGanttChartJSInstance = null; // Nueva variable para la instancia de Chart.js Gantt
let selectedProjectIdForGantt = null; 

// === Chart.js Setup ===
Chart.register(ChartDataLabels);

// === Color & Theme Management ===
function getChartColors(isDarkMode) { /* ... (sin cambios) ... */ 
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
        piePalette: [ rootStyle.getPropertyValue('--color-primary').trim(), rootStyle.getPropertyValue('--color-teal').trim(), rootStyle.getPropertyValue('--color-indigo').trim(), rootStyle.getPropertyValue('--color-warning').trim(), rootStyle.getPropertyValue('--color-pink').trim(), rootStyle.getPropertyValue('--color-orange').trim(), rootStyle.getPropertyValue('--color-purple').trim(), rootStyle.getPropertyValue('--color-secondary').trim() ],
        barCompleted: currentTheme.barCompleted, barEstimated: currentTheme.barEstimated, barBudget: currentTheme.barBudget, barActual: currentTheme.barActual, lineHistorical: currentTheme.line, lineHistoricalFill: currentTheme.lineFill, criticalChart: { risk: currentTheme.criticalRisk, delay: currentTheme.criticalDelay, cost: currentTheme.criticalCost }, scatterPoint: currentTheme.scatterPoint, riskDistribution: { low: currentTheme.riskLow, medium: currentTheme.riskMedium, high: currentTheme.riskHigh }, defaultColor: currentTheme.text, borderColor: currentTheme.border, pieBorderColor: currentTheme.pieBorder
    };
}

// === Helper Functions ===
// ... (updateThemeToggleButton y otras funciones helper como antes) ...
function updateThemeToggleButton(isDarkMode) { /* ... (como antes) ... */ 
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
// ... (igual que antes, asegurando que p.activities = Array.isArray(p.activities) ? p.activities : []; esté presente) ...
async function loadData() {
    try {
        // console.log("loadData: Starting to fetch data.json...");
        const response = await fetch('data.json');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        portfolioData = await response.json();
        // console.log("loadData: data.json fetched successfully.");
        if (!portfolioData || !portfolioData.projects || !portfolioData.portfolio_summary) throw new Error("Invalid data structure in data.json.");

        allProjects = portfolioData.projects.map(p => {
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
            p.activities = Array.isArray(p.activities) ? p.activities : [];
            return p;
        });
        // console.log(`loadData: Processed ${allProjects.length} projects.`);
        initializeUI();
    } catch (error) {
        console.error('Error loading/processing portfolio data:', error);
        document.body.innerHTML = `<div class="alert alert-danger m-5" role="alert"><strong>Error:</strong> Failed to load dashboard data. ${error.message}. Check data.json & console.</div>`;
    }
}


// === UI Initialization ===
function initializeUI() {
    // console.log("initializeUI: Starting UI initialization.");
    if (!allProjects || allProjects.length === 0) {
        console.warn("initializeUI: No projects data available to initialize UI.");
        return;
    }
    populateFilters(allProjects);
    initializeDateRangePicker();
    
    const initialProjectsForGanttSelector = allProjects; 
    populateGanttProjectSelector(initialProjectsForGanttSelector); 
    
    const ganttSelector = document.getElementById('gantt-project-selector');
    if (ganttSelector && ganttSelector.options.length > 1 && !selectedProjectIdForGantt) {
        // Si hay proyectos en el selector (después de "Seleccionar..."), y ninguno está seleccionado globalmente, selecciona el primero.
        if (ganttSelector.options[1]) { // Asegurarse que la opción [1] exista
            selectedProjectIdForGantt = ganttSelector.options[1].value; 
            ganttSelector.value = selectedProjectIdForGantt;
            console.log("initializeUI: Defaulting Gantt to first available project ID:", selectedProjectIdForGantt);
        }
    }
    
    setupEventListeners();
    // console.log("initializeUI: Calling initial filterAndRender.");
    filterAndRender(); 
    updateThemeToggleButton(document.body.classList.contains('dark-mode'));
    // console.log("initializeUI: UI initialization complete.");
}

// === Event Listeners ===
// ... (setupEventListeners y toggleTheme como en la última versión que te di, sin cambios necesarios aquí) ...
function setupEventListeners() {
    // console.log("setupEventListeners: Setting up event listeners...");
    document.getElementById('theme-toggle')?.addEventListener('click', () => {
        // console.log("Event: Theme toggle CLICKED");
        toggleTheme();
    });
    ['filter-status', 'filter-type', 'filter-pm', 'filter-priority', 'filter-risk'].forEach(id => {
        const filterElement = document.getElementById(id);
        if (filterElement) {
            filterElement.addEventListener('change', (event) => {
                // console.log(`Event: Main Filter '${id}' CHANGED. New value: '${event.target.value}'`);
                filterAndRender();
            });
        } else {
            // console.warn(`setupEventListeners: Filter element with ID '${id}' not found.`);
        }
    });
    const ganttSelector = document.getElementById('gantt-project-selector');
    if (ganttSelector) {
        ganttSelector.addEventListener('change', (event) => {
            selectedProjectIdForGantt = event.target.value;
            // console.log(`Event: Gantt project selector CHANGED. New project ID: '${selectedProjectIdForGantt}'`);
            renderGanttAndActivitiesForSelectedProject();
        });
    } else {
        // console.warn("setupEventListeners: Gantt project selector not found.");
    }
    // console.log("setupEventListeners: Event listeners setup complete.");
}

function toggleTheme() {
    const isDarkMode = document.body.classList.toggle('dark-mode');
    localStorage.setItem('dashboardTheme', isDarkMode ? 'dark' : 'light');
    updateThemeToggleButton(isDarkMode);
    // console.log("toggleTheme: Theme changed, calling filterAndRender.");
    filterAndRender();
    if(selectedProjectIdForGantt) { // Si hay un proyecto seleccionado para Gantt, re-renderizarlo
        // console.log("toggleTheme: Re-rendering Gantt for theme change.");
        renderGanttAndActivitiesForSelectedProject();
    }
}

// === UI Update Functions (KPIs, Charts (except Gantt), Tables, Summary) ===
// ... (Todas las funciones de renderizado de Chart.js como antes, con el patrón de destroy/null/new)
// ... (renderProjectsTable y generateExecutiveSummary como antes) ...
function updateKPIs(filteredProjectData) { /* ... (sin cambios) ... */ 
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

function renderCharts(projects) {
    const isDarkMode = document.body.classList.contains('dark-mode');
    const chartColors = getChartColors(isDarkMode);
    const statusCounts = projects.reduce((acc, p) => { acc[p.status] = (acc[p.status] || 0) + 1; return acc; }, {});
    projectStatusChart = renderPieChart('projectStatusChart', projectStatusChart, statusCounts, chartColors, 'status');
    const pmCounts = projects.reduce((acc, p) => { acc[p.project_manager || 'Unassigned'] = (acc[p.project_manager || 'Unassigned'] || 0) + 1; return acc; }, {});
    pmLoadChart = renderPieChart('pmLoadChart', pmLoadChart, pmCounts, chartColors, 'pm');
    const priorityCounts = projects.reduce((acc, p) => { acc[p.priority_level] = (acc[p.priority_level] || 0) + 1; return acc; }, {});
    priorityChart = renderPieChart('priorityChart', priorityChart, priorityCounts, chartColors, 'priority');
    employeeWorkloadChart = renderEmployeeWorkloadChart(projects, employeeWorkloadChart, chartColors);
    hoursCompletedChart = renderHoursComparisonChart(projects, hoursCompletedChart, chartColors);
    historicalHoursChart = renderHistoricalHoursChart(projects, historicalHoursChart, chartColors);
    budgetActualChart = renderBudgetActualChart(projects, budgetActualChart, chartColors);
    financialScatterChart = renderFinancialScatterChart(projects, financialScatterChart, chartColors);
    riskDistributionChart = renderRiskDistributionChart(projects, riskDistributionChart, chartColors);
    completionTrendChart = renderCompletionTrendChart(projects, completionTrendChart, chartColors);
}

function renderPieChart(canvasId, currentChartInstance, countsData, chartColors, type) { 
    const ctx = document.getElementById(canvasId)?.getContext('2d');
    if (!ctx) return null;
    if (currentChartInstance instanceof Chart) { currentChartInstance.destroy(); }
    let labels, data, backgroundColors;
    if (type === 'status') { 
        const statusOrder = ['in-progress', 'completed', 'delayed', 'on-hold', 'planned'].filter(s => countsData[s]);
        labels = statusOrder.map(s => s.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()));
        data = statusOrder.map(s => countsData[s] || 0);
        backgroundColors = statusOrder.map(s => chartColors.pieStatus[s] || chartColors.piePalette[Math.floor(Math.random() * chartColors.piePalette.length)]);
    } else if (type === 'pm') { 
        labels = Object.keys(countsData);
        data = Object.values(countsData);
        backgroundColors = chartColors.piePalette;
    } else if (type === 'priority') { 
        const priorityOrder = ['Critical', 'High', 'Medium', 'Low'].filter(p => countsData[p]);
        labels = priorityOrder;
        data = priorityOrder.map(p => countsData[p]);
        backgroundColors = priorityOrder.map(p => chartColors.priorityPalette[p]);
    } else { return null; }
    if (labels.length === 0 || data.every(d => d === 0)) { 
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.textAlign = "center"; ctx.font = `14px ${Chart.defaults.font.family}`;
        ctx.fillStyle = chartColors.defaultColor; ctx.fillText("No hay datos para mostrar.", ctx.canvas.width / 2, ctx.canvas.height / 2);
        return null;
    }
    try { return new Chart(ctx, { 
            type: 'pie',
            data: { labels, datasets: [{ data, backgroundColor: backgroundColors, borderColor: chartColors.pieBorderColor, borderWidth: 2 }] },
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
    }); } catch (e) { console.error(`Error creating pie chart for ${canvasId}:`, e); return null; }
}
function renderEmployeeWorkloadChart(projects, currentChartInstance, chartColors) { 
    const ctx = document.getElementById('employeeWorkloadChart')?.getContext('2d');
    if (!ctx) return null;
    if (currentChartInstance instanceof Chart) { currentChartInstance.destroy(); }
    const employeeDataAgg = projects.reduce((acc, project) => { 
        (project.employee_workload || []).forEach(member => {
            if (member && member.employee && safeNumber(member.assigned_hours) > 0) {
                acc[member.employee] = (acc[member.employee] || 0) + safeNumber(member.assigned_hours);
            }
        });
        return acc;
    }, {});
    const sortedEmployees = Object.entries(employeeDataAgg).sort(([, a], [, b]) => a - b);
    if (sortedEmployees.length === 0) { 
        ctx.clearRect(0,0,ctx.canvas.width, ctx.canvas.height);
        ctx.textAlign="center"; ctx.font = `14px ${Chart.defaults.font.family}`;
        ctx.fillStyle = chartColors.defaultColor; ctx.fillText("No hay datos de carga de empleados.", ctx.canvas.width/2, 50);
        return null;
    }
    try { return new Chart(ctx, { 
        type: 'bar',
        data: { labels: sortedEmployees.map(([name]) => name), datasets: [{ label: 'Horas Asignadas', data: sortedEmployees.map(([, hours]) => hours), backgroundColor: chartColors.lineHistorical, borderWidth: 1, barPercentage: 0.7, categoryPercentage: 0.8 }] },
        options: {
            indexAxis: 'y', responsive: true, maintainAspectRatio: false,
            scales: { x: { beginAtZero: true, title: { display: true, text: 'Total Horas Asignadas' } }, y: { ticks: { font: { size: 10 } } } },
            plugins: { legend: { display: false }, tooltip: { callbacks: { label: (c) => `Horas: ${c.raw.toLocaleString()}` } }, datalabels: { anchor: 'end', align: 'right', formatter: (v) => v > 0 ? v.toLocaleString() : '', font: { size: 9, weight: '500' }, padding: { left: 4 } } }
        }
    }); } catch(e) { console.error("Error creating EmployeeWorkloadChart:", e); return null; }
}
function renderHoursComparisonChart(projects, currentChartInstance, chartColors) { 
    const ctx = document.getElementById('hoursCompletedChart')?.getContext('2d');
    if (!ctx) return null;
    if (currentChartInstance instanceof Chart) { currentChartInstance.destroy(); }
    const sortedProjects = [...projects].sort((a, b) => b.estimated_hours - a.estimated_hours).slice(0, 15);
    if (sortedProjects.length === 0) {  
        ctx.clearRect(0,0,ctx.canvas.width, ctx.canvas.height); ctx.textAlign="center"; ctx.font = `14px ${Chart.defaults.font.family}`; ctx.fillStyle = chartColors.defaultColor; ctx.fillText("No hay datos de horas.", ctx.canvas.width/2, 50); return null;
    }
    try { return new Chart(ctx, { 
        type: 'bar',
        data: { labels: sortedProjects.map(p => p.name), datasets: [ { label: 'Estimadas', data: sortedProjects.map(p => p.estimated_hours), backgroundColor: chartColors.barEstimated, stack: 'Stack 0' }, { label: 'Completadas', data: sortedProjects.map(p => p.hours_completed), backgroundColor: chartColors.barCompleted, stack: 'Stack 0' } ] },
        options: {
            indexAxis: 'y', responsive: true, maintainAspectRatio: false,
            scales: { x: { stacked: true, beginAtZero: true }, y: { stacked: true, ticks: { font: { size: 10 } } } },
            plugins: { legend: { position: 'top' }, tooltip: { mode: 'index', intersect: false }, datalabels: { display: false } }
        }
    }); } catch(e) { console.error("Error creating HoursComparisonChart:", e); return null; }
}
function renderHistoricalHoursChart(projects, currentChartInstance, chartColors) { 
    const ctx = document.getElementById('historicalHoursChart')?.getContext('2d');
    if (!ctx) return null;
    if (currentChartInstance instanceof Chart) { currentChartInstance.destroy(); }
    const allDates = new Set();
    projects.forEach(p => (p.progress_history || []).forEach(h => { if (h.date) allDates.add(h.date); }));
    const sortedDates = Array.from(allDates).map(d => moment(d)).filter(m => m.isValid()).sort((a,b) => a - b).map(m => m.format('YYYY-MM-DD'));
    if (sortedDates.length === 0) { 
        ctx.clearRect(0,0,ctx.canvas.width, ctx.canvas.height); ctx.textAlign="center"; ctx.font = `14px ${Chart.defaults.font.family}`; ctx.fillStyle = chartColors.defaultColor; ctx.fillText("No hay datos históricos.", ctx.canvas.width/2, 50); return null;
    }
    const cumulativeHours = sortedDates.map(date => { 
        let total = 0; const currentMoment = moment(date);
        projects.forEach(p => {
            const latestEntry = (p.progress_history || []).map(h => ({ date: moment(h.date), hours: safeNumber(h.hours_completed_on_date) })).filter(h => h.date.isValid() && h.date.isSameOrBefore(currentMoment)).sort((a,b) => b.date - a.date)[0];
            if (latestEntry) total += latestEntry.hours;
        });
        return total;
    });
    try { return new Chart(ctx, { 
        type: 'line',
        data: { labels: sortedDates, datasets: [{ label: 'Horas Acumuladas', data: cumulativeHours, fill: true, borderColor: chartColors.lineHistorical, backgroundColor: chartColors.lineHistoricalFill, tension: 0.1, pointRadius: 2, borderWidth: 1.5 }] },
        options: {
            responsive: true, maintainAspectRatio: false,
            scales: { x: { type: 'time', time: { unit: 'month' }, title: { display: true, text: 'Fecha' } }, y: { beginAtZero: true, title: { display: true, text: 'Horas Totales Completadas' } } },
            plugins: { legend: { display: false }, tooltip: { mode: 'index', intersect: false }, datalabels: { display: false } }
        }
    }); } catch(e) { console.error("Error creating HistoricalHoursChart:", e); return null; }
}
function renderBudgetActualChart(projects, currentChartInstance, chartColors) { 
    const ctx = document.getElementById('budgetActualChart')?.getContext('2d');
    if (!ctx) return null;
    if (currentChartInstance instanceof Chart) { currentChartInstance.destroy(); }
    const topProjects = [...projects].sort((a, b) => b.financial_data.budget - a.financial_data.budget).slice(0, 10);
    if (topProjects.length === 0) { 
        ctx.clearRect(0,0,ctx.canvas.width, ctx.canvas.height); ctx.textAlign="center"; ctx.font = `14px ${Chart.defaults.font.family}`; ctx.fillStyle = chartColors.defaultColor; ctx.fillText("No hay datos financieros.", ctx.canvas.width/2, 50); return null;
    }
    try { return new Chart(ctx, { 
        type: 'bar',
        data: { labels: topProjects.map(p => p.name), datasets: [ { label: 'Presupuesto', data: topProjects.map(p => p.financial_data.budget), backgroundColor: chartColors.barBudget, stack: 'Presupuesto' }, { label: 'Gasto Actual', data: topProjects.map(p => p.financial_data.spent), backgroundColor: chartColors.barActual, stack: 'Gasto' } ] },
        options: {
            indexAxis: 'y', responsive: true, maintainAspectRatio: false,
            scales: { x: { beginAtZero: true, title: { display: true, text: 'Monto ($)' }, ticks: { callback: value => formatCurrency(value) } }, y: { ticks: { font: { size: 10 } } } },
            plugins: { legend: { position: 'top' }, tooltip: { callbacks: { label: (c) => `${c.dataset.label}: ${formatCurrency(c.raw)}` } }, datalabels: { display: false } }
        }
    }); } catch(e) { console.error("Error creating BudgetActualChart:", e); return null; }
}
function renderFinancialScatterChart(projects, currentChartInstance, chartColors) { 
    const ctx = document.getElementById('financialScatterChart')?.getContext('2d');
    if (!ctx) return null;
    if (currentChartInstance instanceof Chart) { currentChartInstance.destroy(); }
    const chartData = projects.filter(p => p.financial_data.budget > 0 && (p.financial_data.estimated_roi_percentage !== null || p.financial_data.actual_roi_percentage !== null))
        .map(p => ({ x: p.financial_data.cost_variance_percentage, y: p.status === 'completed' ? p.financial_data.actual_roi_percentage : p.financial_data.estimated_roi_percentage, projectName: p.name }));
    if (chartData.length === 0) { 
        ctx.clearRect(0,0,ctx.canvas.width, ctx.canvas.height); ctx.textAlign="center"; ctx.font = `14px ${Chart.defaults.font.family}`; ctx.fillStyle = chartColors.defaultColor; ctx.fillText("No hay datos para este gráfico.", ctx.canvas.width/2, 50); return null;
    }
    try { return new Chart(ctx, { 
        type: 'scatter',
        data: { datasets: [{ label: 'Proyectos', data: chartData, backgroundColor: chartColors.scatterPoint }] },
        options: {
            responsive: true, maintainAspectRatio: false,
            scales: { x: { title: { display: true, text: 'Variación de Costo (%)' }, ticks: { callback: v => `${v.toFixed(0)}%` } }, y: { title: { display: true, text: 'ROI Estimado/Real (%)' }, ticks: { callback: v => `${v.toFixed(0)}%` } } },
            plugins: { legend: { display: false }, tooltip: { callbacks: { label: (c) => `${c.raw.projectName}: CostVar ${c.raw.x.toFixed(1)}%, ROI ${c.raw.y.toFixed(1)}%` } }, datalabels: { display: false } }
        }
    }); } catch(e) { console.error("Error creating FinancialScatterChart:", e); return null; }
}
function renderRiskDistributionChart(projects, currentChartInstance, chartColors) { 
    const ctx = document.getElementById('riskDistributionChart')?.getContext('2d');
    if (!ctx) return null;
    if (currentChartInstance instanceof Chart) { currentChartInstance.destroy(); }
    const riskCounts = projects.reduce((acc, p) => { acc[p.risk_level] = (acc[p.risk_level] || 0) + 1; return acc; }, {});
    const riskLabels = ['low', 'medium', 'high'];
    const riskData = riskLabels.map(level => riskCounts[level] || 0);
    const riskBGColors = riskLabels.map(level => chartColors.riskDistribution[level] || chartColors.defaultColor);
    if (projects.length === 0) { 
        ctx.clearRect(0,0,ctx.canvas.width, ctx.canvas.height); ctx.textAlign="center"; ctx.font = `14px ${Chart.defaults.font.family}`; ctx.fillStyle = chartColors.defaultColor; ctx.fillText("No hay datos de riesgo.", ctx.canvas.width/2, 50); return null;
    }
    try { return new Chart(ctx, { 
        type: 'bar',
        data: { labels: riskLabels.map(l => l.charAt(0).toUpperCase() + l.slice(1)), datasets: [{ label: 'Número de Proyectos', data: riskData, backgroundColor: riskBGColors }] },
        options: {
            responsive: true, maintainAspectRatio: false,
            scales: { y: { beginAtZero: true, title: { display: true, text: 'Nº Proyectos' } } },
            plugins: { legend: { display: false }, datalabels: { anchor: 'end', align: 'top', formatter: (v) => v > 0 ? v : '' } }
        }
    }); } catch(e) { console.error("Error creating RiskDistributionChart:", e); return null; }
}
function renderCompletionTrendChart(projects, currentChartInstance, chartColors) { 
    const ctx = document.getElementById('completionTrendChart')?.getContext('2d');
    if (!ctx) return null;
    if (currentChartInstance instanceof Chart) { currentChartInstance.destroy(); }
    const completionsByMonth = projects.filter(p => p.status === 'completed' && p.moment_end_actual && p.moment_end_actual.isValid())
        .reduce((acc, p) => { const monthYear = p.moment_end_actual.format('YYYY-MM'); acc[monthYear] = (acc[monthYear] || 0) + 1; return acc; }, {});
    const sortedMonths = Object.keys(completionsByMonth).sort();
    if (sortedMonths.length === 0) { 
        ctx.clearRect(0,0,ctx.canvas.width, ctx.canvas.height); ctx.textAlign="center"; ctx.font = `14px ${Chart.defaults.font.family}`; ctx.fillStyle = chartColors.defaultColor; ctx.fillText("No hay tendencias de completación.", ctx.canvas.width/2, 50); return null;
    }
    const trendData = sortedMonths.map(month => completionsByMonth[month]);
    try { return new Chart(ctx, { 
        type: 'line',
        data: { labels: sortedMonths, datasets: [{ label: 'Proyectos Completados', data: trendData, borderColor: chartColors.lineHistorical, backgroundColor: chartColors.lineHistoricalFill, fill: true, tension: 0.1 }] },
        options: {
            responsive: true, maintainAspectRatio: false,
            scales: { x: { type: 'time', time: { unit: 'month', displayFormats: { month: 'MMM YYYY' } }, title: { display: true, text: 'Mes de Completación' } }, y: { beginAtZero: true, title: { display: true, text: 'Nº Proyectos Completados' }, ticks: { stepSize: 1 } } },
            plugins: { legend: { display: false }, datalabels: { display: false } }
        }
    }); } catch(e) { console.error("Error creating CompletionTrendChart:", e); return null; }
}


// --- Critical Projects Section ---
// ... (filterCriticalProjects y renderCriticalProjectsList sin cambios) ...
// ... (renderCriticalProjectsChart como en la respuesta anterior) ...
function filterCriticalProjects(projectsToEvaluate) { /* ... (como antes) ... */ 
    const critical = projectsToEvaluate.filter(p =>
        p.status !== 'completed' &&
        (p.risk_score >= 80 ||
         p.schedule_delay_days > 20 ||
         (p.financial_data && p.financial_data.cost_variance_percentage < -15) || 
         (p.ai_predictions?.prediction_confidence !== null && p.ai_predictions.prediction_confidence < 65)
        )
    )
    .sort((a,b) => b.risk_score - a.risk_score);
    return critical;
}
function renderCriticalProjectsList(criticalProjects) { /* ... (como antes) ... */ 
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
function renderCriticalProjectsChart(criticalProjectsData, chartColors) { 
    const ctx = document.getElementById('criticalProjectsChart')?.getContext('2d');
    if (!ctx) return null;
    if (criticalProjectsChart instanceof Chart) { criticalProjectsChart.destroy(); criticalProjectsChart = null; }
    if (!criticalProjectsData || criticalProjectsData.length === 0) { 
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.textAlign = "center"; ctx.font = `14px ${Chart.defaults.font.family}`;
        ctx.fillStyle = chartColors.defaultColor; 
        ctx.fillText("No hay proyectos críticos para graficar.", ctx.canvas.width / 2, ctx.canvas.height / 2);
        return null;
    }
    const projectsForChart = criticalProjectsData.slice(0, 10);
    try {
        return new Chart(ctx, { 
            type: 'bar',
            data: {
                labels: projectsForChart.map(p => p.name),
                datasets: [
                    { label: 'Riesgo', data: projectsForChart.map(p => p.risk_score), backgroundColor: chartColors.criticalChart.risk, yAxisID: 'yRisk' },
                    { label: 'Retraso (días)', data: projectsForChart.map(p => Math.max(0, p.schedule_delay_days)), backgroundColor: chartColors.criticalChart.delay, yAxisID: 'yDelay' },
                    { label: 'Sobre Costo ($)', data: projectsForChart.map(p => Math.max(0, -(p.financial_data?.cost_variance || 0))), backgroundColor: chartColors.criticalChart.cost, yAxisID: 'yCost' }
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
    } catch (e) { console.error("Error creating new criticalProjectsChart:", e); return null; }
}

// === Table Rendering ===
// ... (renderProjectsTable sin cambios) ...
function renderProjectsTable(data) { /* ... (como antes) ... */ 
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

// === Filters Logic ===
// ... (sin cambios) ...
function populateFilters(data) { /* ... (como antes) ... */ 
    const createOptions = (selectId, values, defaultText) => {
        const select = document.getElementById(selectId);
        if(!select) { return; }
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
function initializeDateRangePicker() { /* ... (como antes) ... */ 
    const element = document.getElementById('filter-date-range');
    if (!element || typeof Litepicker === 'undefined') { return; }
    if (dateRangePicker) dateRangePicker.destroy();
    dateRangePicker = new Litepicker({
        element, singleMode: false, format: 'MMM DD, YYYY', numberOfMonths: 2,
        buttonText: { previousMonth: `<i class="bi bi-chevron-left"></i>`, nextMonth: `<i class="bi bi-chevron-right"></i>`, reset: `<i class="bi bi-x"></i>`, apply: 'Aplicar' },
        resetButton: true, autoApply: false,
        setup: (picker) => {
            picker.on('selected', () => { filterAndRender(); });
            picker.on('clear:selection', () => { filterAndRender(); });
        }
    });
}
function filterProjects() { /* ... (como antes) ... */ 
    const statusVal = document.getElementById('filter-status')?.value;
    const typeVal = document.getElementById('filter-type')?.value;
    const pmVal = document.getElementById('filter-pm')?.value;
    const priorityVal = document.getElementById('filter-priority')?.value;
    const riskVal = document.getElementById('filter-risk')?.value;
    let dateRangeStart = null;
    let dateRangeEnd = null;
    if (dateRangePicker?.getStartDate() && dateRangePicker?.getEndDate()) {
        dateRangeStart = moment(dateRangePicker.getStartDate().dateInstance); 
        dateRangeEnd = moment(dateRangePicker.getEndDate().dateInstance);   
    }
    const filters = {
        status: statusVal || "", type: typeVal || "", pm: pmVal || "",
        priority: priorityVal || "", risk: riskVal || "",
        dateRange: (dateRangeStart && dateRangeEnd) ? [dateRangeStart, dateRangeEnd] : null
    };
    const filtered = allProjects.filter(p =>
        (!filters.status || p.status === filters.status) &&
        (!filters.type || p.type === filters.type) &&
        (!filters.pm || p.project_manager === filters.pm) &&
        (!filters.priority || p.priority_level === filters.priority) &&
        (!filters.risk || p.risk_level === filters.risk) &&
        (!filters.dateRange || (p.moment_end_planned && p.moment_end_planned.isBetween(filters.dateRange[0], filters.dateRange[1], 'day', '[]')))
    );
    return filtered;
}

// === Executive Summary Generation ===
// ... (sin cambios) ...
function generateExecutiveSummary(filteredProjectData) { /* ... (como antes) ... */ 
    const container = document.getElementById('executive-summary-content');
    if (!container) { return; }
    const totalFilteredProjects = filteredProjectData.length;
    const completedFiltered = filteredProjectData.filter(p => p.status === 'completed');
    const inProgressFiltered = filteredProjectData.filter(p => p.status === 'in-progress');
    const delayedFiltered = filteredProjectData.filter(p => p.status === 'delayed');
    const criticalFiltered = filterCriticalProjects(filteredProjectData); 
    const onTimeCompletedFiltered = completedFiltered.filter(p => p.end_date_actual && p.end_date_planned && moment(p.end_date_actual).isSameOrBefore(moment(p.end_date_planned), 'day')).length;
    const onTimeRateFiltered = completedFiltered.length > 0 ? (onTimeCompletedFiltered / completedFiltered.length) * 100 : 0;
    const onBudgetCompletedFiltered = completedFiltered.filter(p => p.financial_data.spent <= p.financial_data.budget).length;
    const budgetAdherenceRateFiltered = completedFiltered.length > 0 ? (onBudgetCompletedFiltered / completedFiltered.length) * 100 : 0;
    let totalBudgetFiltered = 0, totalSpentFiltered = 0, totalCostVarianceFiltered = 0;
    let weightedActualRoiSumFiltered = 0, totalBudgetForRoiCalcFiltered = 0;
    filteredProjectData.forEach(p => { 
        totalBudgetFiltered += p.financial_data.budget;
        totalSpentFiltered += p.financial_data.spent;
        totalCostVarianceFiltered += p.financial_data.cost_variance;
        if (p.status === 'completed' && p.financial_data.actual_roi_percentage !== null && p.financial_data.budget > 0) {
            weightedActualRoiSumFiltered += p.financial_data.actual_roi_percentage * p.financial_data.budget;
            totalBudgetForRoiCalcFiltered += p.financial_data.budget;
        }
    });
    const portfolioActualRoiFiltered = totalBudgetForRoiCalcFiltered > 0 ? weightedActualRoiSumFiltered / totalBudgetForRoiCalcFiltered : null;
    const avgRiskScoreFiltered = totalFilteredProjects > 0 ? filteredProjectData.reduce((sum, p) => sum + p.risk_score, 0) / totalFilteredProjects : 0;
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

// --- Gantt Chart and Activities Section ---
function populateGanttProjectSelector(projects) {
    const selector = document.getElementById('gantt-project-selector');
    if (!selector) {
        // console.warn("populateGanttProjectSelector: Selector 'gantt-project-selector' not found.");
        return;
    }
    const currentVisualSelectedValue = selector.value; // Lo que el usuario ve actualmente seleccionado
    // console.log("populateGanttProjectSelector - Projects received for dropdown:", projects.length, "Current visual selection:", currentVisualSelectedValue, "Global selectedProjectIdForGantt:", selectedProjectIdForGantt);

    while (selector.options.length > 1) {
        selector.remove(1);
    }
    
    let addedToSelectorCount = 0;
    projects.sort((a, b) => a.name.localeCompare(b.name)).forEach(project => {
        if (project.activities && project.activities.length > 0) {
            const option = document.createElement('option');
            option.value = project.id;
            option.textContent = project.name;
            selector.appendChild(option);
            addedToSelectorCount++;
        }
    });
    // console.log(`populateGanttProjectSelector - Added ${addedToSelectorCount} projects with activities to selector.`);

    // Intentar restaurar la selección global (selectedProjectIdForGantt) si todavía es válida
    if (selectedProjectIdForGantt && selector.querySelector(`option[value="${selectedProjectIdForGantt}"]`)) {
        selector.value = selectedProjectIdForGantt;
    } else if (addedToSelectorCount > 0 && selector.options.length > 1) {
        // Si la selección global no es válida (o era null) Y hay proyectos para seleccionar,
        // NO seleccionamos uno por defecto aquí. Dejamos que initializeUI maneje el default inicial.
        // Si esto se llama DESPUÉS de la inicialización (ej. por un filtro principal),
        // y el proyecto que estaba seleccionado ya no está, selectedProjectIdForGantt se pondrá a null
        // y la tabla mostrará "todas las actividades"
        if(selectedProjectIdForGantt) { // Si había uno seleccionado y ya no está en la lista
             selectedProjectIdForGantt = null;
             selector.value = ""; // Reset visual del dropdown
        }
    } else { // No hay proyectos con actividades en la lista filtrada actual
        selectedProjectIdForGantt = null;
        selector.value = "";
    }
    // console.log("populateGanttProjectSelector: Gantt project selector populated. Final selected ID for Gantt:", selectedProjectIdForGantt);
}


function renderGanttAndActivitiesForSelectedProject() {
    const ganttPlaceholder = document.getElementById('gantt-placeholder');
    const ganttContainer = document.getElementById('gantt-chart-container');
    const activitiesTbody = document.getElementById('project-activities-tbody');
    // const svgGantt = document.getElementById('gantt'); // No necesitamos referenciar el svg directamente si usamos el canvas

    if (!ganttPlaceholder || !ganttContainer || !activitiesTbody ) { // Removido svgGantt de aquí
        console.error("renderGanttAndActivitiesForSelectedProject: Missing one or more Gantt/Activities DOM elements.");
        return;
    }
    
    let activitiesToShow = [];
    let projectForGantt = null;

    if (selectedProjectIdForGantt) {
        projectForGantt = allProjects.find(p => p.id === selectedProjectIdForGantt);
        if (projectForGantt && projectForGantt.activities && projectForGantt.activities.length > 0) {
            activitiesToShow = projectForGantt.activities;
            ganttPlaceholder.style.display = 'none';
            ganttContainer.style.display = 'block'; // Mostrar contenedor del canvas
            renderProjectActivitiesTable(activitiesToShow, false);
            renderProjectGanttChartJS(projectForGantt, activitiesToShow); // Cambiado a Chart.js
        } else {
            ganttPlaceholder.textContent = `No hay actividades para el proyecto seleccionado${projectForGantt ? ` (${projectForGantt.name})` : ''}.`;
            ganttPlaceholder.style.display = 'block';
            ganttContainer.style.display = 'none';
            activitiesTbody.innerHTML = `<tr><td colspan="5" class="text-center text-muted p-4">No hay actividades para el proyecto seleccionado.</td></tr>`;
            if (projectGanttChartJSInstance) { projectGanttChartJSInstance.destroy(); projectGanttChartJSInstance = null;}
        }
    } else {
        const currentlyFilteredProjects = filterProjects(); 
        currentlyFilteredProjects.forEach(proj => {
            if (proj.activities && proj.activities.length > 0) {
                activitiesToShow.push(...proj.activities.map(act => ({...act, projectName: proj.name, projectId: proj.id })));
            }
        });
        renderProjectActivitiesTable(activitiesToShow, true); 

        ganttPlaceholder.textContent = 'Selecciona un proyecto específico para ver su diagrama de Gantt.';
        ganttPlaceholder.style.display = 'block';
        ganttContainer.style.display = 'none';
        if (projectGanttChartJSInstance) { projectGanttChartJSInstance.destroy(); projectGanttChartJSInstance = null;}
    }
}

function renderProjectActivitiesTable(activitiesData, showProjectNameCol = false) {
    const tbody = document.getElementById('project-activities-tbody');
    const thead = tbody.parentElement.tHead.rows[0];
    if (!tbody || !thead) {
        console.warn("renderProjectActivitiesTable: tbody or thead not found.");
        return;
    }
    tbody.innerHTML = '';

    // Gestión dinámica del encabezado de la columna "Proyecto"
    const projectHeaderCell = Array.from(thead.cells).find(cell => cell.id === 'gantt-project-column-header');
    if (showProjectNameCol) {
        if (!projectHeaderCell) {
            const th = document.createElement('th');
            th.id = 'gantt-project-column-header'; // Darle un ID para encontrarla/quitarla
            th.textContent = 'Proyecto';
            thead.insertBefore(th, thead.cells[1]); 
        }
    } else {
        if (projectHeaderCell) {
            thead.deleteCell(projectHeaderCell.cellIndex);
        }
    }

    if (!activitiesData || activitiesData.length === 0) {
        const colspan = thead.cells.length;
        tbody.innerHTML = `<tr><td colspan="${colspan}" class="text-center text-muted p-4">No hay actividades para mostrar.</td></tr>`;
        return;
    }

    activitiesData.forEach(activity => {
        const row = tbody.insertRow();
        let cellIndex = 0;
        row.insertCell(cellIndex++).textContent = activity.id;
        if (showProjectNameCol) {
            row.insertCell(cellIndex++).textContent = activity.projectName || 'N/A';
        }
        row.insertCell(cellIndex++).textContent = activity.name;
        row.insertCell(cellIndex++).textContent = formatDate(activity.start);
        row.insertCell(cellIndex++).textContent = formatDate(activity.end);
        const progressCell = row.insertCell(cellIndex++);
        progressCell.textContent = activity.progress !== undefined ? `${activity.progress}%` : 'N/A';
        progressCell.className = 'text-center'; 

        if (typeof activity.progress === 'number') {
            progressCell.classList.remove('text-danger', 'text-warning', 'text-primary', 'text-success', 'fw-bold'); // Limpiar clases previas
            if (activity.progress === 100) {
                progressCell.classList.add('text-success', 'fw-bold');
            } else if (activity.progress >= 70) {
                progressCell.classList.add('text-primary');
            } else if (activity.progress >= 40) {
                progressCell.classList.add('text-warning');
            } else if (activity.progress >= 0) { // Mostrar rojo si es > 0 pero < 40
                progressCell.classList.add('text-danger');
            }
        }
    });
}

// NUEVA FUNCIÓN para renderizar Gantt con Chart.js
function renderProjectGanttChartJS(project, activities) {
    console.log("renderProjectGanttChartJS: Rendering Gantt for project:", project.name);
    const ctx = document.getElementById('projectGanttChartCanvas')?.getContext('2d');
    const ganttContainer = document.getElementById('gantt-chart-container');
    const ganttPlaceholder = document.getElementById('gantt-placeholder');

    if (!ctx || !ganttContainer || !ganttPlaceholder) {
        console.error("renderProjectGanttChartJS: Canvas or container/placeholder not found.");
        return;
    }

    if (projectGanttChartJSInstance instanceof Chart) {
        projectGanttChartJSInstance.destroy();
        projectGanttChartJSInstance = null;
    }

    if (!activities || activities.length === 0) {
        ganttContainer.style.display = 'none';
        ganttPlaceholder.textContent = 'No hay actividades para mostrar en el diagrama de Gantt para este proyecto.';
        ganttPlaceholder.style.display = 'block';
        return;
    }

    ganttContainer.style.display = 'block';
    ganttPlaceholder.style.display = 'none';

    const isDarkMode = document.body.classList.contains('dark-mode');
    const chartColors = getChartColors(isDarkMode);

    // Preparar datos para Chart.js (barras flotantes)
    // El eje Y serán los nombres de las tareas.
    // El eje X serán las fechas.
    // Cada tarea tendrá dos datasets: uno para la parte "vacía" hasta el inicio, y otro para la duración.
    // O, más simple, usar el formato [startDate, endDate] para las barras.

    const datasets = activities.map((activity, index) => {
        const startDate = moment(activity.start);
        const endDate = moment(activity.end);
        const duration = endDate.diff(startDate, 'days');
        const progressWidth = duration * (activity.progress / 100);

        return {
            label: activity.name, // Se usará en el tooltip
            data: [{
                x: [startDate.valueOf(), endDate.valueOf()], // Rango de la barra completa
                y: activity.name // Etiqueta del eje Y
            }],
            backgroundColor: isDarkMode ? 'rgba(121, 192, 255, 0.6)' : 'rgba(13, 110, 253, 0.6)', // Color de la barra de tarea
            borderColor: isDarkMode ? 'rgba(121, 192, 255, 1)' : 'rgba(13, 110, 253, 1)',
            borderWidth: 1,
            borderSkipped: false,
            // Para simular progreso, podríamos añadir otro dataset superpuesto o usar un plugin.
            // Por simplicidad, empezamos con la barra completa.
            // Podríamos usar un plugin de datalabels para mostrar el progreso % en la barra.
        };
    });
    
    // Encontrar la fecha mínima y máxima para los ejes
    let minDate = null;
    let maxDate = null;
    activities.forEach(act => {
        const start = moment(act.start);
        const end = moment(act.end);
        if (start.isValid()) {
            if (minDate === null || start.isBefore(minDate)) {
                minDate = start;
            }
        }
        if (end.isValid()) {
            if (maxDate === null || end.isAfter(maxDate)) {
                maxDate = end;
            }
        }
    });

    if (!minDate || !maxDate) { // Si no hay fechas válidas
        console.warn("renderProjectGanttChartJS: No valid dates found in activities.");
        ganttContainer.style.display = 'none';
        ganttPlaceholder.textContent = 'Datos de fecha inválidos para las actividades.';
        ganttPlaceholder.style.display = 'block';
        return;
    }


    try {
        projectGanttChartJSInstance = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: activities.map(act => act.name), // Nombres de tareas en el eje Y
                datasets: datasets
            },
            options: {
                indexAxis: 'y', // Barras horizontales
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        type: 'time',
                        time: {
                            unit: 'day', // O 'week', 'month'
                            tooltipFormat: 'DD MMM YYYY',
                             displayFormats: {
                                day: 'DD MMM'
                            }
                        },
                        min: minDate.valueOf(),
                        max: maxDate.valueOf(),
                        title: {
                            display: true,
                            text: 'Fecha'
                        },
                        grid: {
                            color: chartColors.borderColor
                        },
                        ticks: {
                            color: chartColors.defaultColor,
                        }
                    },
                    y: {
                        stacked: true, // Importante para que las barras se superpongan correctamente si usamos progreso
                        grid: {
                            display: false // Opcional: quitar líneas de cuadrícula del eje Y
                        },
                        ticks: {
                            color: chartColors.defaultColor,
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false // No necesitamos leyenda por cada tarea
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const activity = activities[context.dataIndex];
                                return `${activity.name}: ${formatDate(activity.start)} - ${formatDate(activity.end)} (${activity.progress}%)`;
                            }
                        }
                    },
                    datalabels: { // Ocultar datalabels por defecto para este tipo de gráfico
                        display: false
                    }
                }
            }
        });
    } catch (e) {
        console.error("Error creating Chart.js Gantt:", e);
        ganttContainer.style.display = 'none';
        ganttPlaceholder.textContent = 'Error al generar el diagrama de Gantt.';
        ganttPlaceholder.style.display = 'block';
    }
}


// --- Combined Update and Filter/Render Function ---
function filterAndRender() {
    if (!portfolioData || !allProjects || allProjects.length === 0) { return; }

    const baseFilteredProjects = filterProjects();
    populateGanttProjectSelector(baseFilteredProjects); 
    renderGanttAndActivitiesForSelectedProject(); // Esta función ahora maneja la lógica dual

    const projectsForKPIs = [...baseFilteredProjects];
    const projectsForCharts = [...baseFilteredProjects];
    const criticalProjectsInput = [...baseFilteredProjects];
    const projectsForTable = [...baseFilteredProjects];
    const projectsForSummary = [...baseFilteredProjects];

    const criticalProjects = filterCriticalProjects(criticalProjectsInput);
    const isDarkMode = document.body.classList.contains('dark-mode');
    const currentChartColors = getChartColors(isDarkMode);

    updateKPIs(projectsForKPIs);
    renderCharts(projectsForCharts); // Renderiza todos los gráficos excepto el Gantt
    renderCriticalProjectsList(criticalProjects);
    criticalProjectsChart = renderCriticalProjectsChart(criticalProjects, currentChartColors); 
    renderProjectsTable(projectsForTable);
    generateExecutiveSummary(projectsForSummary);
}

// --- Initial Load & Theme Persistence ---
window.onload = () => { // Cambiado de DOMContentLoaded a window.onload
    console.log("Window fully loaded (including all resources).");
    const savedTheme = localStorage.getItem('dashboardTheme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        // console.log("Theme: Dark mode loaded from localStorage.");
    } else {
        document.body.classList.remove('dark-mode');
        // console.log("Theme: Light mode (or no preference) loaded.");
    }
    loadData(); 
};
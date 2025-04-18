# 📊 Proyecto Completo: Portfolio Dashboard Interactivo ✨

Este archivo contiene toda la documentación y el código fuente (HTML, CSS, JavaScript) para el dashboard interactivo de portafolio de proyectos.

---

## 📖 README

### 🎯 Propósito y Valor Empresarial

En entornos empresariales complejos, gestionar múltiples proyectos simultáneamente presenta desafíos significativos:

*   🤯 **Falta de Visibilidad Centralizada:** Dificultad para obtener una visión general del estado de todos los proyectos.
*   📉 **Seguimiento Ineficiente:** Monitorizar manualmente el progreso, presupuesto, riesgos y carga de trabajo consume tiempo y es propenso a errores.
*   🤔 **Toma de Decisiones Lenta:** La información dispersa dificulta la toma de decisiones informadas y oportunas sobre priorización, asignación de recursos y gestión de riesgos.
*   ⚠️ **Identificación Tardía de Riesgos:** Los problemas críticos pueden pasar desapercibidos hasta que sea demasiado tarde.

**Este dashboard busca solucionar estos problemas al proporcionar:**

*   ✅ **Visión Unificada:** Una interfaz centralizada para monitorizar todo el portafolio.
*   💡 **Insights Accionables:** KPIs claros y visualizaciones interactivas que facilitan la comprensión del rendimiento y la identificación de tendencias.
*   ⏱️ **Eficiencia Mejorada:** Acceso rápido a métricas clave como avance, desviación de costos, ROI, carga de trabajo y satisfacción del cliente.
*   🚨 **Identificación Proactiva:** Resalta proyectos críticos basados en riesgo, retraso, costos y predicciones, permitiendo una intervención temprana.
*   💪 **Optimización de Recursos:** Visualización de la carga de trabajo por gerente y empleado para una mejor asignación.

---
# 🚀 Proyecto de Visualización de Datos

## ✨ Características Principales

🔹 **KPIs Clave** ✅  
- [x] 📊 Número total de proyectos  
- [x] ⏳ Horas totales invertidas y completadas  
- [x] 💰 Presupuesto total vs. Gasto total  
- [x] 📈 ROI promedio (real o estimado)  
- [x] ⭐ Satisfacción promedio del cliente  
- [x] 👨‍💼 Carga de trabajo promedio por empleado  

🔹 **Filtros Dinámicos** 🎛️  
- [x] 🔄 Estado (En Progreso, Completado, Retrasado)  
- [x] 🏗️ Tipo de Proyecto (Estratégico, Tecnológico, Operativo)  
- [x] 👨‍💼 Gerente de Proyecto  
- [x] ⚡ Prioridad (Alta, Media, Baja)  
- [x] 🚨 Riesgo (Alto, Medio, Bajo)  
- [x] 📅 Rango de Fechas (Litepicker)  

🔹 **Visualizaciones Interactivas 📊 (Chart.js)**  
- [x] 📡 Estado de Proyectos (Gráfico circular)  
- [x] 👨‍💼 Carga por Gerente (Gráfico circular)  
- [x] 🔥 Distribución de Prioridad (Gráfico circular)  
- [x] ⏱️ Carga de Trabajo por Empleado (Barras horizontales)  
- [x] ⚖️ Comparativa de Horas (Barras horizontales)  
- [x] 🏆 Evolución Histórica (Gráfico de línea)  
- [x] 🔎 Métricas de Proyectos Críticos (Barras comparativas)  

🔹 **Interfaz de Usuario 🖥️**  
- [x] 🌞🌙 Modo Claro / Oscuro (Botón de cambio)  
- [x] 💾 Persistencia del Tema (`localStorage`)  
- [x] 📱 Diseño Responsivo (Bootstrap 5)  
- [x] 🎨 UI/UX Mejorada (iconos, espaciado y jerarquía visual)  

## 🛠️ Tecnologías Utilizadas  
🔸 **Frontend:** HTML5, CSS3, JavaScript (ES6+)  
🔸 **Frameworks y Librerías:** Bootstrap 5, Chart.js, Moment.js, Litepicker  
🔸 **Datos:** JSON (`data.json`)  

## 🚀 Configuración y Puesta en Marcha  
1️⃣ **Crear Archivos:** `index.html`, `style.css`, `script.js`, `data.json`  
2️⃣ **Copiar Código:** Copia cada sección en su archivo correspondiente  
3️⃣ **Abrir `index.html`:**  


## ⚙️ Uso  
🔹 **Vista General:** KPIs superiores  
🔹 **Explorar Gráficos:** Distribuciones y tendencias  
🔹 **Filtrar:** Aplicar filtros dinámicos  
🔹 **Proyectos Críticos:** Identificar problemas  
🔹 **Detalle en Tabla:** Datos específicos por proyecto  
🔹 **Cambiar Tema:** Botón de alternancia claro/oscuro  

## 📚 Valor Educativo y Aprendizaje  
✅ **Visualización de Datos**  
✅ **Desarrollo Frontend**  
✅ **Manejo de Eventos y DOM**  
✅ **Manipulación de JSON y Fetch API**  
✅ **Diseño Responsivo y UX/UI**  

## 🔮 Futuras Mejoras (TODO)  
- [ ] 🌐 Integración con Backend/API  
- [ ] 🔑 Autenticación de Usuarios  
- [ ] 🧠 Mejoras en Predicciones IA  
- [ ] ✍️ Edición de Datos en la Interfaz  
- [ ] 📥 Funcionalidad de Exportación  
- [ ] 🔔 Sistema de Notificaciones  

---
## 📄 Código Fuente

### `index.html`

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Portfolio Dashboard - Enhanced UI/UX</title>
  <!-- Bootstrap CSS -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
  <!-- Bootstrap Icons -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css">
  <!-- Litepicker CSS (Date Range Picker) -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/litepicker/dist/css/litepicker.css"/>
  <!-- Custom CSS -->
  <link rel="stylesheet" href="style.css">
</head>
<body class="body-padding"> {/* Added padding to body */}

  <div class="container-fluid">
    <!-- Header -->
    <header class="d-flex justify-content-between align-items-center mb-4 pb-3 border-bottom">
      <h1 class="h2 dashboard-title"><i class="bi bi-briefcase-fill me-2"></i>Portfolio Dashboard</h1>
      <button id="theme-toggle" class="btn btn-outline-secondary btn-sm theme-toggle-button" title="Cambiar Tema">
        <i class="bi bi-moon-stars-fill icon-moon"></i>
        <i class="bi bi-sun-fill icon-sun d-none"></i>
        <span class="theme-text ms-1">Dark Mode</span>
      </button>
    </header>

    <!-- KPIs Section (2 Rows of 4) -->
    <section class="kpi-section mb-4">
      <div class="row g-3">
        <!-- Row 1 -->
        <div class="col-6 col-md-3">
          <div class="card kpi-card h-100">
            <div class="card-body d-flex flex-column justify-content-center align-items-center">
              <i class="bi bi-stack kpi-icon text-primary mb-2"></i>
              <h6 class="kpi-title">Proyectos Totales</h6>
              <p id="kpi-total-projects" class="kpi-value">0</p>
            </div>
          </div>
        </div>
        <div class="col-6 col-md-3">
          <div class="card kpi-card h-100">
            <div class="card-body d-flex flex-column justify-content-center align-items-center">
              <i class="bi bi-clock-history kpi-icon text-info mb-2"></i>
              <h6 class="kpi-title">Horas Invertidas</h6>
              <p id="kpi-hours-invested" class="kpi-value">0</p>
            </div>
          </div>
        </div>
        <div class="col-6 col-md-3">
          <div class="card kpi-card h-100">
            <div class="card-body d-flex flex-column justify-content-center align-items-center">
              <i class="bi bi-check2-circle kpi-icon text-success mb-2"></i>
              <h6 class="kpi-title">Horas Completadas</h6>
              <p id="kpi-hours-completed" class="kpi-value">0</p>
            </div>
          </div>
        </div>
         <div class="col-6 col-md-3">
           <div class="card kpi-card h-100">
             <div class="card-body d-flex flex-column justify-content-center align-items-center">
              <i class="bi bi-piggy-bank kpi-icon text-warning mb-2"></i>
              <h6 class="kpi-title">Presupuesto Total</h6>
              <p id="kpi-total-budget" class="kpi-value">$0</p>
            </div>
          </div>
        </div>
        <!-- Row 2 -->
        <div class="col-6 col-md-3">
          <div class="card kpi-card h-100">
            <div class="card-body d-flex flex-column justify-content-center align-items-center">
              <i class="bi bi-credit-card kpi-icon text-danger mb-2"></i>
              <h6 class="kpi-title">Gasto Total</h6>
              <p id="kpi-total-spent" class="kpi-value">$0</p>
            </div>
          </div>
        </div>
        <div class="col-6 col-md-3">
            <div class="card kpi-card h-100">
                <div class="card-body d-flex flex-column justify-content-center align-items-center">
                    <i class="bi bi-graph-up-arrow kpi-icon text-success mb-2"></i>
                    <h6 class="kpi-title">ROI Promedio</h6>
                    <p id="kpi-average-roi" class="kpi-value">N/A</p>
                </div>
            </div>
        </div>
        <div class="col-6 col-md-3">
          <div class="card kpi-card h-100">
            <div class="card-body d-flex flex-column justify-content-center align-items-center">
              <i class="bi bi-emoji-smile kpi-icon text-info mb-2"></i>
              <h6 class="kpi-title">Satisfacción Cliente</h6>
              <p id="kpi-average-customer-satisfaction" class="kpi-value">N/A</p>
            </div>
          </div>
        </div>
        <div class="col-6 col-md-3">
          <div class="card kpi-card h-100">
            <div class="card-body d-flex flex-column justify-content-center align-items-center">
              <i class="bi bi-person-gear kpi-icon text-secondary mb-2"></i>
              <h6 class="kpi-title">Carga Promedio Empleado</h6>
              <p id="kpi-average-employee-workload" class="kpi-value">0 hrs</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Filters Section -->
    <section class="filters-section card mb-4">
      <div class="card-body">
        <div class="row g-3 align-items-end">
          <div class="col-md-6 col-lg-2">
            <label for="filter-status" class="form-label filter-label"><i class="bi bi-toggles2 me-1"></i>Estado</label>
            <select id="filter-status" class="form-select form-select-sm">
              <option value="">Todos</option>
            </select>
          </div>
          <div class="col-md-6 col-lg-2">
            <label for="filter-type" class="form-label filter-label"><i class="bi bi-tag-fill me-1"></i>Tipo</label>
            <select id="filter-type" class="form-select form-select-sm">
              <option value="">Todos</option>
            </select>
          </div>
          <div class="col-md-6 col-lg-2">
            <label for="filter-pm" class="form-label filter-label"><i class="bi bi-person-badge-fill me-1"></i>Gerente</label>
            <select id="filter-pm" class="form-select form-select-sm">
              <option value="">Todos</option>
            </select>
          </div>
          <div class="col-md-6 col-lg-2">
            <label for="filter-priority" class="form-label filter-label"><i class="bi bi-exclamation-diamond-fill me-1"></i>Prioridad</label>
            <select id="filter-priority" class="form-select form-select-sm">
              <option value="">Todas</option>
            </select>
          </div>
           <div class="col-md-6 col-lg-2">
            <label for="filter-risk" class="form-label filter-label"><i class="bi bi-shield-exclamation me-1"></i>Nivel Riesgo</label>
            <select id="filter-risk" class="form-select form-select-sm">
              <option value="">Todos</option>
              <option value="high">Alto (80+)</option>
              <option value="medium">Medio (50-79)</option>
              <option value="low">Bajo (<50)</option>
            </select>
          </div>
          <div class="col-md-6 col-lg-2">
             <label for="filter-date-range" class="form-label filter-label"><i class="bi bi-calendar-range-fill me-1"></i>Rango Fechas (Fin Plan.)</label>
             <input type="text" id="filter-date-range" class="form-control form-control-sm" placeholder="Seleccionar rango...">
          </div>
        </div>
      </div>
    </section>

    <!-- Pie Charts Section -->
    <section class="pie-charts-section mb-4">
      <div class="row g-3">
        <div class="col-md-4">
          <div class="card chart-card h-100">
            <div class="card-header"><i class="bi bi-pie-chart-fill me-2"></i>Estado de Proyectos</div>
            <div class="card-body">
              <div class="chart-container chart-container-pie">
                <canvas id="projectStatusChart"></canvas>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card chart-card h-100">
            <div class="card-header"><i class="bi bi-person-lines-fill me-2"></i>Carga por Gerente</div>
            <div class="card-body">
              <div class="chart-container chart-container-pie">
                <canvas id="pmLoadChart"></canvas>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card chart-card h-100">
            <div class="card-header"><i class="bi bi-bar-chart-steps me-2"></i>Prioridad de Proyectos</div>
            <div class="card-body">
              <div class="chart-container chart-container-pie">
                <canvas id="priorityChart"></canvas>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Employee Workload Section -->
    <section class="employee-workload-section mb-4">
        <div class="row">
            <div class="col-12">
                <div class="card chart-card h-100">
                    <div class="card-header"><i class="bi bi-people-fill me-2"></i>Horas Asignadas por Empleado</div>
                    <div class="card-body">
                        <div class="chart-container" style="height: 450px;"> {/* Increased height */}
                            <canvas id="employeeWorkloadChart"></canvas>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Hours Charts Section -->
    <section class="hours-charts-section mb-4">
      <div class="row g-3">
        <div class="col-lg-6">
          <div class="card chart-card h-100">
            <div class="card-header"><i class="bi bi-bar-chart-line-fill me-2"></i>Horas por Proyecto (Completadas vs Estimadas)</div>
            <div class="card-body">
              <div class="chart-container" style="height: 400px;"> {/* Increased height */}
                <canvas id="hoursCompletedChart"></canvas>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="card chart-card h-100">
            <div class="card-header"><i class="bi bi-graph-up me-2"></i>Evolución Histórica de Horas Completadas</div>
            <div class="card-body">
              <div class="chart-container" style="height: 400px;"> {/* Increased height */}
                <canvas id="historicalHoursChart"></canvas>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Critical Projects Section -->
    <section class="critical-projects-section mb-4">
       <div class="row g-3">
            <div class="col-lg-7">
                <div class="card h-100">
                    <div class="card-header"><i class="bi bi-exclamation-triangle-fill me-2 text-danger"></i>Proyectos Críticos (Lista)</div>
                    <div class="card-body">
                        <div id="critical-projects-list" class="list-group critical-list-container">
                            {/* Placeholder while loading */}
                            <div class="list-group-item text-muted text-center p-4">Cargando proyectos críticos...</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-5">
                <div class="card h-100">
                     <div class="card-header"><i class="bi bi-clipboard-data-fill me-2"></i>Métricas Clave de Proyectos Críticos</div>
                     <div class="card-body">
                        <div class="chart-container" style="height: 375px;"> {/* Match list height */}
                             <canvas id="criticalProjectsChart"></canvas>
                         </div>
                     </div>
                 </div>
            </div>
        </div>
    </section>


    <!-- Projects Table Section -->
    <section class="projects-table-section">
      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-header"><i class="bi bi-table me-2"></i>Lista Detallada de Proyectos</div>
            <div class="card-body">
              <div class="table-responsive">
                <table class="table table-striped table-hover table-sm project-table">
                  <thead class="table-light">
                    <tr>
                      <th>Nombre</th>
                      <th>Gerente</th>
                      <th>Tipo</th>
                      <th>Estado</th>
                      <th>Prioridad</th>
                      <th><i class="bi bi-calendar-check"></i> Inicio</th>
                      <th><i class="bi bi-calendar-x"></i> Fin Plan.</th>
                      <th><i class="bi bi-calendar-event"></i> Fin Real</th>
                      <th><i class="bi bi-hourglass-split"></i> Hrs Est.</th>
                      <th><i class="bi bi-hourglass-bottom"></i> Hrs Comp.</th>
                      <th><i class="bi bi-percent"></i> Avance</th>
                      <th><i class="bi bi-alarm"></i> Retraso</th>
                      <th><i class="bi bi-shield-exclamation"></i> Riesgo</th>
                      <th><i class="bi bi-currency-dollar"></i> Var. Costo</th>
                      <th><i class="bi bi-graph-up-arrow"></i> ROI Est.</th>
                      <th><i class="bi bi-bullseye"></i> Fin Pred. (IA)</th>
                      <th><i class="bi bi-star-fill"></i> Satisf.</th>
                    </tr>
                  </thead>
                  <tbody id="projects-table-body">
                    {/* Rows generated by JS */}
                    <tr><td colspan="17" class="text-center p-5"><div class="spinner-border spinner-border-sm" role="status"><span class="visually-hidden">Loading...</span></div> Cargando datos...</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

  </div> {/* End container-fluid */}

  {/* Required JS Libraries */}
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
  <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/chartjs-plugin-datalabels@2.2.0/dist/chartjs-plugin-datalabels.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/moment@2.29.4/moment.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/chartjs-adapter-moment@1.0.1/dist/chartjs-adapter-moment.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/litepicker/dist/litepicker.js"></script>

  {/* Your Custom Script */}
  <script src="script.js"></script>
</body>
</html>





/* ============================ */
/* --- Theme Variables --- */
/* ============================ */
:root {
    /* Light Theme Variables */
    --body-bg-light: #f4f7fc;               /* Background for the main body */
    --body-color-light: #343a40;            /* Default text color */
    --card-bg-light: #ffffff;               /* Card background */
    --card-header-bg-light: #f8f9fa;        /* Card header background */
    --card-header-color-light: #495057;     /* Card header text color */
    --card-border-light: #e9ecef;           /* Card border color */
    --text-muted-light: #6c757d;            /* Muted text color (e.g., for subtitles) */
    --kpi-title-color-light: #6c757d;       /* Explicit KPI title color (muted) */
    --kpi-value-color-light: #0d6efd;       /* KPI value color (primary blue) */
    --icon-color-light: #6c757d;            /* KPI and other icon colors */
    --table-color-light: #343a40;           /* Table text color */
    --table-bg-light: #ffffff;              /* Table background */
    --table-border-light: #dee2e6;          /* Table border color */
    --table-striped-bg-light: #f8f9fa;      /* Table striped row background */
    --table-hover-bg-light: #eef2f7;        /* Table row hover background */
    --form-select-color-light: #495057;     /* Form select text color */
    --form-select-bg-light: #ffffff;        /* Form select background */
    --form-select-border-light: #ced4da;    /* Form select border */
    --form-select-focus-border-light: #86b7fe; /* Form select focus border */
    --badge-text-color: #ffffff;            /* Default text color for most badges */
    --badge-yellow-text-color: #333;       /* Dark text needed for yellow/orange badges */
    --link-color-light: #0d6efd;            /* Link color */

    /* Dark Theme Variables (GitHub Dark Dimmed Inspired) */
    --body-bg-dark: #161b22;                /* Dark background */
    --body-color-dark: #c9d1d9;             /* Default light text */
    --card-bg-dark: #1c2128;                /* Dark card background */
    --card-header-bg-dark: #22272e;         /* Dark card header background */
    --card-header-color-dark: #adbac7;      /* Dark card header text */
    --card-border-dark: #30363d;            /* Dark card border */
    --text-muted-dark: #8b949e;             /* Dark muted text */
    --kpi-title-color-dark: #8b949e;        /* Dark KPI title color */
    --kpi-value-color-dark: #79c0ff;        /* Dark KPI value color (bright blue) */
    --icon-color-dark: #8b949e;             /* Dark icon color */
    --table-color-dark: #c9d1d9;            /* Dark table text color */
    --table-bg-dark: #1c2128;               /* Dark table background */
    --table-border-dark: #30363d;           /* Dark table border */
    --table-striped-bg-dark: #22272e;       /* Dark table striped row background */
    --table-hover-bg-dark: #2d333b;         /* Dark table row hover background */
    --form-select-color-dark: #c9d1d9;      /* Dark form select text */
    --form-select-bg-dark: #22272e;         /* Dark form select background */
    --form-select-border-dark: #444c56;     /* Dark form select border */
    --form-select-focus-border-dark: #58a6ff; /* Dark form select focus border */
    --link-color-dark: #79c0ff;             /* Dark link color */

    /* Semantic Colors (Consistent names for easier use) */
    --color-success: #198754;
    --color-danger: #dc3545;
    --color-warning: #ffc107; /* Yellow */
    --color-orange: #fd7e14; /* Orange */
    --color-info: #0dcaf0;   /* Cyan */
    --color-teal: #20c997;
    --color-primary: #0d6efd;
    --color-secondary: #6c757d;
    --color-purple: #6f42c1;
}

/* ============================ */
/* --- General Styles --- */
/* ============================ */
body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    background-color: var(--body-bg-light);
    color: var(--body-color-light);
    transition: background-color 0.2s ease-out, color 0.2s ease-out;
    font-size: 14px;
    line-height: 1.5;
}
.body-padding { padding: 1rem 1.5rem; } /* Padding around the main content */

/* Dashboard Title */
.dashboard-title {
    color: var(--body-color-light);
    font-weight: 600;
    font-size: 1.6rem;
    transition: color 0.2s ease-out;
}
.dashboard-title i {
    color: var(--color-primary);
    opacity: 0.9;
    transition: color 0.2s ease-out;
}

/* Theme Toggle Button */
.theme-toggle-button {
    display: flex;
    align-items: center;
    font-size: 0.75rem;
    padding: 0.25rem 0.6rem;
    border-width: 1px;
}
.theme-toggle-button .icon-moon,
.theme-toggle-button .icon-sun {
    font-size: 0.9rem;
    margin-right: 0.25rem;
}

/* ============================ */
/* --- Card Styles --- */
/* ============================ */
.card {
    border: 1px solid var(--card-border-light);
    border-radius: 6px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
    background-color: var(--card-bg-light);
    transition: background-color 0.2s ease-out, border-color 0.2s ease-out, box-shadow 0.15s ease-in-out;
    overflow: hidden; /* Prevent content breaking layout */
}
.card:hover {
     box-shadow: 0 4px 10px rgba(0, 0, 0, 0.06); /* Subtle lift effect */
}
.card-header {
    background-color: var(--card-header-bg-light);
    border-bottom: 1px solid var(--card-border-light);
    font-weight: 600;
    font-size: 0.9rem;
    padding: 0.6rem 1.1rem;
    color: var(--card-header-color-light); /* Use specific var */
    transition: background-color 0.2s ease-out, border-color 0.2s ease-out, color 0.2s ease-out;
    display: flex;
    align-items: center;
}
.card-header i {
    font-size: 0.95rem;
    margin-right: 0.5rem;
    color: var(--text-muted-light); /* Muted icon */
    transition: color 0.2s ease-out;
}
.card-body {
    padding: 1.1rem;
}

/* ============================ */
/* --- KPI Card Styles --- */
/* ============================ */
.kpi-card {
    transition: transform 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    border: 1px solid var(--card-border-light);
    box-shadow: none;
}
.kpi-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.05);
}
.kpi-icon {
    font-size: 1.6rem;
    opacity: 0.85;
    margin-bottom: 0.4rem !important;
    color: var(--icon-color-light); /* Use specific var */
    transition: color 0.2s ease-out;
}
.kpi-title {
    font-size: 0.7rem;
    text-transform: uppercase;
    letter-spacing: 0.6px;
    margin-bottom: 0.15rem;
    color: var(--kpi-title-color-light); /* Use specific var */
    font-weight: 500;
    transition: color 0.2s ease-out;
}
.kpi-value {
    font-size: 1.65rem;
    font-weight: 600;
    margin: 0;
    color: var(--kpi-value-color-light); /* Use specific var */
    transition: color 0.2s ease-out;
    line-height: 1.1;
}

/* ============================ */
/* --- Filter Section Styles --- */
/* ============================ */
.filters-section .card-body { padding: 0.75rem 1rem; }
.filter-label {
    font-size: 0.75rem;
    font-weight: 500;
    margin-bottom: 0.2rem;
    color: var(--text-muted-light);
    display: flex;
    align-items: center;
    white-space: nowrap;
}
.filter-label i { font-size: 0.85rem; margin-right: 0.3rem; opacity: 0.8; }
.form-select-sm, .form-control-sm { font-size: 0.8rem; padding: 0.25rem 0.5rem; }

/* Date Range Picker Styles */
.litepicker { font-size: 0.8rem !important; box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1) !important; border: 1px solid var(--form-select-border-light) !important; background-color: var(--form-select-bg-light) !important; color: var(--form-select-color-light) !important; }

/* ============================ */
/* --- Chart Styles --- */
/* ============================ */
.chart-card .card-body { min-height: 280px; display: flex; justify-content: center; align-items: center;}
.chart-container { position: relative; width: 100%; height: 100%; }
.chart-container-pie { max-width: 260px; max-height: 260px; margin-top: -10px; }

/* ============================ */
/* --- Critical Projects Section Styles --- */
/* ============================ */
.critical-list-container { max-height: 375px; overflow-y: auto; padding-right: 8px; }
/* Optional: Style scrollbar */
.critical-list-container::-webkit-scrollbar { width: 6px; }
.critical-list-container::-webkit-scrollbar-track { background: transparent; }
.critical-list-container::-webkit-scrollbar-thumb { background-color: var(--card-border-light); border-radius: 10px; }

.list-group-item.critical-project { border: 1px solid var(--card-border-light); border-left-width: 4px; border-radius: 5px; margin-bottom: 0.5rem; padding: 0.7rem 0.9rem; background-color: var(--card-bg-light); color: var(--body-color-light); transition: background-color 0.15s ease-out, border-color 0.15s ease-out; box-shadow: none; }
.list-group-item.critical-project:hover { background-color: var(--table-hover-bg-light); transform: none; }
.critical-project h6 { font-size: 0.85rem; font-weight: 600; margin-bottom: 0.3rem !important; color: var(--body-color-light); transition: color 0.2s ease-out; }
.critical-project .text-muted { color: var(--text-muted-light); transition: color 0.2s ease-out; }
.critical-project .badge { font-size: 0.68rem; font-weight: 500; padding: 0.25em 0.55em; color: var(--badge-text-color); vertical-align: middle; }
.critical-project .badge i { font-size: 0.85em; margin-right: 2px; vertical-align: text-top; }

/* Badge backgrounds and text colors */
.badge-risk-high, .badge-delay-high, .badge-cost-negative, .badge-confidence-low { background-color: var(--color-danger); color: var(--badge-text-color) !important; }
.badge-risk-medium, .badge-delay-medium, .badge-confidence-medium { background-color: var(--color-orange); color: var(--badge-yellow-text-color) !important; }
.badge-risk-low, .badge-delay-low, .badge-cost-positive, .badge-confidence-high { background-color: var(--color-success); color: var(--badge-text-color) !important; }
.badge-cost-zero { background-color: var(--color-warning); color: var(--badge-yellow-text-color) !important; }


/* ============================ */
/* --- Table Styles --- */
/* ============================ */
.project-table thead th { font-size: 0.7rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.6px; background-color: var(--card-header-bg-light); color: var(--text-muted-light); white-space: nowrap; vertical-align: middle; border-bottom: 1px solid var(--table-border-light); border-top: none; padding: 0.6rem 0.65rem; transition: background-color 0.2s ease-out, color 0.2s ease-out, border-color 0.2s ease-out; }
.project-table thead th i { margin-right: 0.3rem; font-size: 0.9em; opacity: 0.8;}
.project-table tbody td { font-size: 0.85rem; vertical-align: middle; padding: 0.45rem 0.65rem; border-top: 1px solid var(--table-border-light); color: var(--body-color-light); transition: color 0.2s ease-out, background-color 0.1s ease-in, border-color 0.2s ease-out; }
.table-striped > tbody > tr:nth-of-type(odd) > * { background-color: var(--table-striped-bg-light); transition: background-color 0.2s ease-out; }
.table-hover > tbody > tr:hover > * { background-color: var(--table-hover-bg-light); transition: background-color 0.1s ease-in; }
.table-responsive { overflow-x: auto; }

/* ============================ */
/* --- Conditional Formatting (Table Text Colors) --- */
/* ============================ */
.status-in-progress { color: var(--color-info); font-weight: 500; }
.status-completed { color: var(--color-success); font-weight: 500; }
.status-delayed { color: var(--color-danger); font-weight: 600; }
.risk-high { color: var(--color-danger) !important; font-weight: 600; }
.risk-medium { color: var(--color-orange) !important; font-weight: 500; }
.risk-low { color: var(--color-success) !important; font-weight: 500; }
.delay-positive { color: var(--color-danger) !important; font-weight: 600; }
.delay-negative { color: var(--color-teal) !important; font-weight: 500; }
.delay-zero { color: var(--text-muted-light); transition: color 0.2s ease-out; }
.priority-critical { color: var(--color-danger) !important; font-weight: 700; }
.priority-high { color: var(--color-orange) !important; font-weight: 600; }
.priority-medium { font-weight: 500; color: var(--body-color-light); transition: color 0.2s ease-out; }
.priority-low { color: var(--text-muted-light); font-weight: 400; transition: color 0.2s ease-out; }
.cost-variance-negative { color: var(--color-danger) !important; font-weight: 600; }
.cost-variance-positive { color: var(--color-success) !important; font-weight: 500; }
.roi-high { color: var(--color-success) !important; font-weight: 600; }
.roi-medium { color: var(--color-info) !important; font-weight: 500; }
.roi-low { color: var(--text-muted-light); transition: color 0.2s ease-out; }
.satisfaction-high { color: var(--color-success) !important; font-weight: 600; }
.satisfaction-medium { color: var(--color-orange) !important; font-weight: 500; }
.satisfaction-low { color: var(--color-danger) !important; font-weight: 600; }

/* ============================ */
/* --- Dark Mode Overrides --- */
/* ============================ */
body.dark-mode { background-color: var(--body-bg-dark); color: var(--body-color-dark); }
body.dark-mode .dashboard-title { color: var(--body-color-dark); }
body.dark-mode .dashboard-title i { color: var(--kpi-value-color-dark); }
body.dark-mode .card { background-color: var(--card-bg-dark); border-color: var(--card-border-dark); }

/* Card Header Dark Mode - Ensure text color is applied */
body.dark-mode .card-header { background-color: var(--card-header-bg-dark); border-bottom-color: var(--card-border-dark); color: var(--card-header-color-dark); } /* Removed !important, should inherit */
body.dark-mode .card-header i { color: var(--text-muted-dark); }

/* KPI Dark Mode - Ensure title color is applied */
body.dark-mode .kpi-title { color: var(--kpi-title-color-dark); } /* Removed !important, specificity should work */
body.dark-mode .kpi-icon { color: var(--icon-color-dark); }
body.dark-mode .kpi-value { color: var(--kpi-value-color-dark); }

/* Filters Dark Mode */
body.dark-mode .filter-label { color: var(--text-muted-dark); }
body.dark-mode .form-select, body.dark-mode .form-control { color: var(--form-select-color-dark); background-color: var(--form-select-bg-dark); border-color: var(--form-select-border-dark); }
body.dark-mode .form-select option { background-color: var(--form-select-bg-dark); color: var(--form-select-color-dark); }
body.dark-mode .form-select:focus, body.dark-mode .form-control:focus { border-color: var(--form-select-focus-border-dark); box-shadow: 0 0 0 0.2rem rgba(88, 166, 255, 0.25); }

/* Table Dark Mode */
body.dark-mode .table { --bs-table-color: var(--table-color-dark); --bs-table-bg: var(--table-bg-dark); --bs-table-border-color: var(--table-border-dark); --bs-table-striped-bg: var(--table-striped-bg-dark); --bs-table-hover-bg: var(--table-hover-bg-dark); }
body.dark-mode .project-table thead th { background-color: var(--card-header-bg-dark); color: var(--text-muted-dark); border-bottom-color: var(--card-border-dark); }
body.dark-mode .project-table tbody td { border-top-color: var(--table-border-dark); color: var(--body-color-dark); }
body.dark-mode .table-striped > tbody > tr:nth-of-type(odd) > * { background-color: var(--table-striped-bg-dark); }
body.dark-mode .table-hover > tbody > tr:hover > * { background-color: var(--table-hover-bg-dark); }

/* Conditional Text Dark Mode */
body.dark-mode .delay-zero { color: var(--text-muted-dark); }
body.dark-mode .priority-medium { color: var(--body-color-dark); } /* Default text color */
body.dark-mode .priority-low { color: var(--text-muted-dark); }
body.dark-mode .roi-low { color: var(--text-muted-dark); }

/* Critical List Dark Mode - Ensure text colors */
body.dark-mode .list-group-item.critical-project { background-color: var(--card-bg-dark); border-color: var(--card-border-dark); color: var(--body-color-dark); }
body.dark-mode .list-group-item.critical-project h6 { color: var(--body-color-dark); } /* Use main text color for heading */
body.dark-mode .list-group-item.critical-project .text-muted { color: var(--text-muted-dark) !important; } /* Use dark muted color, !important for specificity if needed */
body.dark-mode .critical-high-risk { border-left-color: #ff7b7b !important; } /* Brighter red border */
body.dark-mode .critical-medium-risk { border-left-color: #ffc078 !important; } /* Brighter orange border */
body.dark-mode .list-group-item.critical-project:hover { background-color: var(--table-hover-bg-dark); }
body.dark-mode .critical-list-container::-webkit-scrollbar-thumb { background-color: var(--card-border-dark); }

/* Badge Text Dark Mode */
body.dark-mode .badge-risk-medium, body.dark-mode .badge-delay-medium, body.dark-mode .badge-cost-zero, body.dark-mode .badge-confidence-medium,
body.dark-mode .badge[style*="background-color: var(--color-warning)"],
body.dark-mode .badge[style*="background-color: var(--color-orange)"] {
    color: #111 !important; /* Dark text on light badges */
}

/* Litepicker Dark Mode */
body.dark-mode .litepicker { border-color: var(--form-select-border-dark) !important; background-color: var(--form-select-bg-dark) !important; color: var(--form-select-color-dark) !important; box-shadow: 0 5px 15px rgba(0, 0, 0, 0.25) !important; }
body.dark-mode .litepicker .container__months .month-item-header, body.dark-mode .litepicker .container__tooltip, body.dark-mode .litepicker button:not(.is-disabled) { color: var(--form-select-color-dark) !important; background-color: var(--form-select-bg-dark) !important; }
body.dark-mode .litepicker .day-item:not(.is-disabled):hover { background-color: var(--table-hover-bg-dark) !important; }
body.dark-mode .litepicker .day-item.is-selected { background-color: var(--kpi-value-color-dark) !important; color: #111 !important; }
body.dark-mode .litepicker button.button-reset { color: var(--text-muted-dark) !important; }


/* ============================ */
/* --- Responsive Adjustments --- */
/* ============================ */
@media (max-width: 1199.98px) {
    .kpi-value { font-size: 1.4rem; }
    .kpi-icon { font-size: 1.4rem; }
}
@media (max-width: 991.98px) {
    .chart-container-pie { max-width: 230px; max-height: 230px; }
    .card-header { font-size: 0.85rem; padding: 0.55rem 0.9rem; }
    .project-table td, .project-table th { font-size: 0.8rem; padding: 0.5rem 0.6rem; }
    .critical-list-container { max-height: 340px; }
}
@media (max-width: 767.98px) {
    .body-padding { padding: 0.75rem 1rem; }
    .kpi-value { font-size: 1.3rem; }
    .chart-container { min-height: 240px; }
    .chart-container-pie { max-width: 210px; max-height: 210px; }
    .filters-section .col-md-6 { width: 50%; }
    .critical-projects-section .col-lg-7, .critical-projects-section .col-lg-5 { width: 100%; }
    .critical-projects-section .col-lg-5 .card { margin-top: 1rem; }
}
@media (max-width: 575.98px) {
    .kpi-card .card-body { padding: 0.6rem; }
    .kpi-value { font-size: 1.1rem; }
    .kpi-icon { font-size: 1.2rem; }
    .kpi-title { font-size: 0.65rem; }
    .dashboard-title { font-size: 1.15rem; }
    .filters-section .col-md-6 { width: 100%; }
    .pie-charts-section .col-md-4, .hours-charts-section .col-lg-6 { width: 100%; }
    .hours-charts-section .col-lg-6:last-child .card { margin-top: 1rem; }
    .project-table td, .project-table th { font-size: 0.75rem; padding: 0.4rem 0.5rem; }
    .critical-project .badge { font-size: 0.65rem; padding: 0.2em 0.45em; }
}



{
  "portfolio_summary": {
    "total_projects": 25,
    "total_hours_invested": 22500,
    "hours_completed_total": 8296,
    "hours_remaining_total": 14204,
    "total_budget": 2250000,
    "total_spent": 1351000,
    "average_roi": 0.15,
    "average_customer_satisfaction": 4.5,
    "total_employees": 20,
    "average_employee_workload_hours": 1125
  },
  "projects": [
    {
      "id": "proj001",
      "name": "Implementación ERP Cloud",
      "status": "In progress",
      "type": "Tecnológico",
      "project_manager": "Alice Johnson",
      "estimated_hours": 2500,
      "hours_completed": 1800,
      "start_date": "2024-03-01",
      "end_date_planned": "2025-06-30",
      "end_date_actual": null,
      "schedule_delay_days": 15,
      "risk_score": 85,
      "priority_category": "High",
      "financial_data": {
        "budget": 150000,
        "spent": 110000,
        "cost_variance": -40000,
        "projected_roi": 0.25,
        "actual_roi": null
      },
      "employee_workload": [
        {"employee": "Bob Williams", "assigned_hours": 1250},
        {"employee": "Charlie Brown", "assigned_hours": 1250}
      ],
      "progress_history": [
        {"date": "2024-10-31", "hours_completed_on_date": 1800}
      ],
      "predicted_completion_date": "2025-08-15",
      "prediction_confidence": 85,
      "customer_satisfaction_score": null
    },
    // ... más proyectos con la misma estructura ...
  ]
}

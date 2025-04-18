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


## 📄 Código Fuente

### `style.csss`
```

```css

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
---

```
---
## 📄 Código Fuente

### `javascript`

```js



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
                completed_hours: safeNumber(member?.completed_hours) // Keep completed if needed
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

        initializeUI(); // Setup filters, listeners, and initial render

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
    // Apply initial theme based on localStorage or system preference
    applyInitialTheme(); // <-- ADD THIS CALL

    populateFilters(allProjects);
    initializeDateRangePicker();
    setupEventListeners();
    filterAndRender(); // Initial render
    updateThemeToggleButton(document.body.classList.contains('dark-mode'));
}

// === Theme Persistence ===
function applyInitialTheme() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode'); // Ensure light mode if not dark
    }
}

function toggleTheme() {
    const isDarkMode = document.body.classList.toggle('dark-mode');
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light'); // Save preference
    updateThemeToggleButton(isDarkMode);
    // Re-render all charts as defaults change
    const currentlyFilteredProjects = filterProjects();
    const currentCritical = filterCriticalProjects(currentlyFilteredProjects);
    const chartColors = getChartColors(isDarkMode); // Get updated colors *after* toggle

    renderCharts(currentlyFilteredProjects);
    renderCriticalProjectsChart(currentCritical, chartColors);
}


function setupEventListeners() {
    document.getElementById('theme-toggle')?.addEventListener('click', toggleTheme);
    document.getElementById('filter-status')?.addEventListener('change', filterAndRender);
    document.getElementById('filter-type')?.addEventListener('change', filterAndRender);
    document.getElementById('filter-pm')?.addEventListener('change', filterAndRender);
    document.getElementById('filter-priority')?.addEventListener('change', filterAndRender);
    document.getElementById('filter-risk')?.addEventListener('change', filterAndRender);
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

    // --- Priority Chart ---
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

function renderEmployeeWorkloadChart(projects, chartColors) {
    const ctx = document.getElementById('employeeWorkloadChart')?.getContext('2d');
    if (!ctx) { console.error("Canvas context for employeeWorkloadChart not found!"); return null; }
    if (employeeWorkloadChart) employeeWorkloadChart.destroy();

    // console.log("[renderEmployeeWorkloadChart] Processing projects:", projects.length);

    const employeeWorkload = projects.reduce((acc, project) => {
        if (Array.isArray(project.employee_workload)) {
            project.employee_workload.forEach(member => {
                if (member && member.employee) {
                    const name = member.employee;
                    const hours = safeNumber(member.assigned_hours);
                    if (hours > 0) { acc[name] = (acc[name] || 0) + hours; }
                }
            });
        }
        return acc;
    }, {});

    // console.log('[renderEmployeeWorkloadChart] Aggregated Workload:', employeeWorkload);

    const sortedEmployees = Object.entries(employeeWorkload)
                                .filter(([, hours]) => hours > 0)
                                .sort(([, a], [, b]) => a - b);

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
                .map(h => ({ date: moment(h.date), hours: safeNumber(h.hours_completed_on_date) }))
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
                y: { ticks: { font: { size: 10 }, color: chartColors.defaultColor }, grid: { display: false } }, // Main Y for labels
                // Hide individual axes for simplicity
                yRisk: { display: false, max: 100, min: 0 },
                yDelay: { display: false, beginAtZero: true },
                yCost: { display: false, beginAtZero: true }
            },
            plugins: {
                legend: { position: 'top', labels: { color: chartColors.defaultColor, boxWidth: 12 } }, // Ensure legend text color adapts
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
function renderProjectsTable(data) {
    const tbody = document.getElementById('projects-table-body');
    if (!tbody) { console.error("Table body element not found!"); return; }
    tbody.innerHTML = '';

    if (!data || data.length === 0) {
        tbody.innerHTML = '<tr><td colspan="17" class="text-center text-muted py-4">No hay proyectos que coincidan con los filtros seleccionados.</td></tr>';
        return;
    }

    data.forEach(project => {
        // --- Determine Classes ---
        const statusClass = `status-${project.status}`;
        const delayClass = project.schedule_delay_days > 5 ? 'delay-positive' : project.schedule_delay_days < -5 ? 'delay-negative' : 'delay-zero';
        const riskClass = `risk-${project.risk_level}`;
        const priorityClass = `priority-${project.priority_level?.toLowerCase()}`;
        const costVarianceClass = project.financial_data.cost_variance < 0 ? 'cost-variance-negative' : project.financial_data.cost_variance > 0 ? 'cost-variance-positive' : '';
        const roiValue = project.status === 'completed' ? project.financial_data.actual_roi_percentage : project.financial_data.estimated_roi_percentage;
        const roiClass = roiValue == null ? '' : roiValue >= 100 ? 'roi-high' : roiValue >= 30 ? 'roi-medium' : 'roi-low';
        const satisfactionClass = project.customer_satisfaction_score == null ? '' : project.customer_satisfaction_score >= 4 ? 'satisfaction-high' : project.customer_satisfaction_score >= 3 ? 'satisfaction-medium' : 'satisfaction-low';

        // --- Format Text ---
        const statusText = project.status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
        const priorityText = project.priority_level || '–';
        const delayText = project.schedule_delay_days !== 0 ? `${project.schedule_delay_days}` : '–';
        const roiText = formatPercentage(roiValue); // Format the correct ROI percentage
        const predictedEndDateText = formatDate(project.ai_predictions?.predicted_completion_date);
        const satisfactionText = project.customer_satisfaction_score !== null ? project.customer_satisfaction_score.toFixed(1) : '–';

        // --- Create Row ---
        const row = document.createElement('tr');
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
document.addEventListener('DOMContentLoaded', loadData); // Wait for DOM before loading data

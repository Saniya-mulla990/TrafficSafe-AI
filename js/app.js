/* =========================================
   TRAFFICSAFE AI
   MAIN JAVASCRIPT
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       ELEMENTS
    ========================================= */

    const loginPage = document.getElementById("loginPage");
    const appPage = document.getElementById("appPage");

    const loginForm = document.getElementById("loginForm");
    const demoLogin = document.getElementById("demoLogin");

    const togglePassword =
        document.getElementById("togglePassword");

    const password =
        document.getElementById("password");

    const logoutButton =
        document.getElementById("logoutButton");

    const forgotPassword =
        document.getElementById("forgotPassword");

    const createAccount =
        document.getElementById("createAccount");

    const toast =
        document.getElementById("toast");

    const toastMessage =
        document.getElementById("toastMessage");


    /* =========================================
       TOAST MESSAGE
    ========================================= */

    function showToast(message) {

        if (!toast || !toastMessage) return;

        toastMessage.textContent = message;

        toast.classList.add("show");

        setTimeout(() => {
            toast.classList.remove("show");
        }, 2500);
    }


    /* =========================================
       LOGIN
    ========================================= */

    function openDashboard() {

        loginPage.classList.add("hidden");

        appPage.classList.remove("hidden");

        showToast("Welcome to TrafficSafe AI 🚦");

        initializeCharts();
    }


    if (loginForm) {

        loginForm.addEventListener("submit", (event) => {

            event.preventDefault();

            const email =
                document.getElementById("email").value.trim();

            const passwordValue =
                document.getElementById("password").value.trim();


            if (!email || !passwordValue) {

                showToast(
                    "Please enter your email and password."
                );

                return;
            }


            if (!email.includes("@")) {

                showToast(
                    "Please enter a valid email address."
                );

                return;
            }


            /*
             * Frontend demo authentication.
             *
             * This is NOT real authentication.
             * A real version will use a backend API,
             * password hashing and a database.
             */

            localStorage.setItem(
                "trafficSafeLoggedIn",
                "true"
            );

            openDashboard();

        });

    }


    /* =========================================
       DEMO LOGIN
    ========================================= */

    if (demoLogin) {

        demoLogin.addEventListener("click", () => {

            localStorage.setItem(
                "trafficSafeLoggedIn",
                "true"
            );

            openDashboard();

        });

    }


    /* =========================================
       PASSWORD SHOW / HIDE
    ========================================= */

    if (togglePassword && password) {

        togglePassword.addEventListener(
            "click",
            () => {

                if (password.type === "password") {

                    password.type = "text";

                    togglePassword.textContent = "🙈";

                } else {

                    password.type = "password";

                    togglePassword.textContent = "👁";

                }

            }
        );

    }


    /* =========================================
       FORGOT PASSWORD
    ========================================= */

    if (forgotPassword) {

        forgotPassword.addEventListener(
            "click",
            () => {

                showToast(
                    "Password recovery will be connected to the backend."
                );

            }
        );

    }


    /* =========================================
       CREATE ACCOUNT
    ========================================= */

    if (createAccount) {

        createAccount.addEventListener(
            "click",
            () => {

                showToast(
                    "Account registration will be added with the backend."
                );

            }
        );

    }


    /* =========================================
       LOGOUT
    ========================================= */

    if (logoutButton) {

        logoutButton.addEventListener(
            "click",
            () => {

                localStorage.removeItem(
                    "trafficSafeLoggedIn"
                );

                appPage.classList.add("hidden");

                loginPage.classList.remove("hidden");

                showToast(
                    "You have been logged out."
                );

            }
        );

    }


    /* =========================================
       SIDEBAR NAVIGATION
    ========================================= */

    const navItems =
        document.querySelectorAll(".nav-item");

    const sections =
        document.querySelectorAll(".content-section");

    const pageTitle =
        document.getElementById("pageTitle");

    const pageSubtitle =
        document.getElementById("pageSubtitle");


    const sectionInfo = {

        dashboard: {
            title: "Traffic Safety Dashboard",
            subtitle: "AI-powered road safety monitoring"
        },

        prediction: {
            title: "Accident Risk Prediction",
            subtitle: "Analyze road conditions and estimate accident risk"
        },

        hotspots: {
            title: "High-Risk Hotspots",
            subtitle: "Monitor locations requiring increased safety attention"
        },

        traffic: {
            title: "Traffic Analysis",
            subtitle: "Analyze traffic density and accident risk"
        },

        weather: {
            title: "Weather & Safety",
            subtitle: "Understand environmental safety conditions"
        },

        history: {
            title: "Prediction History",
            subtitle: "Review previous risk assessments"
        },

        model: {
            title: "AI Model Performance",
            subtitle: "Machine learning model metrics and explanations"
        }

    };


    function openSection(sectionId) {

        sections.forEach(section => {

            section.classList.remove(
                "active-section"
            );

        });


        const target =
            document.getElementById(sectionId);


        if (target) {

            target.classList.add(
                "active-section"
            );

        }


        navItems.forEach(item => {

            item.classList.remove("active");

            if (
                item.dataset.section === sectionId
            ) {

                item.classList.add("active");

            }

        });


        if (sectionInfo[sectionId]) {

            pageTitle.textContent =
                sectionInfo[sectionId].title;

            pageSubtitle.textContent =
                sectionInfo[sectionId].subtitle;

        }


        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }


    navItems.forEach(item => {

        item.addEventListener("click", () => {

            const section =
                item.dataset.section;

            openSection(section);

        });

    });


    /* =========================================
       "VIEW ALL" BUTTONS
    ========================================= */

    const sectionTargetButtons =
        document.querySelectorAll(
            "[data-section-target]"
        );


    sectionTargetButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                openSection(
                    button.dataset.sectionTarget
                );

            }
        );

    });


    /* =========================================
       MOBILE MENU
    ========================================= */

    const mobileMenu =
        document.getElementById("mobileMenu");

    const sidebar =
        document.querySelector(".sidebar");


    if (mobileMenu && sidebar) {

        mobileMenu.addEventListener(
            "click",
            () => {

                sidebar.classList.toggle(
                    "mobile-open"
                );

            }
        );


        navItems.forEach(item => {

            item.addEventListener(
                "click",
                () => {

                    sidebar.classList.remove(
                        "mobile-open"
                    );

                }
            );

        });

    }


    /* =========================================
       ACCIDENT RISK PREDICTION
    ========================================= */

    const predictionForm =
        document.getElementById(
            "predictionForm"
        );


    if (predictionForm) {

        predictionForm.addEventListener(
            "submit",
            (event) => {

                event.preventDefault();


                const traffic =
                    Number(
                        document.getElementById(
                            "trafficDensity"
                        ).value
                    );


                const weather =
                    Number(
                        document.getElementById(
                            "weatherCondition"
                        ).value
                    );


                const road =
                    Number(
                        document.getElementById(
                            "roadCondition"
                        ).value
                    );


                const visibility =
                    Number(
                        document.getElementById(
                            "visibility"
                        ).value
                    );


                const time =
                    Number(
                        document.getElementById(
                            "timeOfDay"
                        ).value
                    );


                const roadType =
                    Number(
                        document.getElementById(
                            "roadType"
                        ).value
                    );


                /*
                 * Demo risk calculation.
                 *
                 * This is a rule-based frontend simulation.
                 * Later we can replace this with a trained
                 * machine-learning model through an API.
                 */

                let risk = (

                    traffic * 0.30 +

                    weather * 0.20 +

                    road * 0.18 +

                    visibility * 0.15 +

                    time * 0.10 +

                    roadType * 0.07

                );


                risk = Math.round(risk);


                risk = Math.max(
                    1,
                    Math.min(99, risk)
                );


                let level;

                let message;


                if (risk >= 70) {

                    level = "High Risk";

                    message =
                        "Current conditions indicate a high accident risk. Extra caution is recommended.";

                }

                else if (risk >= 40) {

                    level = "Moderate Risk";

                    message =
                        "Current conditions indicate a moderate accident risk.";

                }

                else {

                    level = "Low Risk";

                    message =
                        "Current conditions indicate relatively low accident risk.";

                }


                const riskPercentage =
                    document.getElementById(
                        "riskPercentage"
                    );


                const riskLevel =
                    document.getElementById(
                        "riskLevel"
                    );


                const riskMessage =
                    document.getElementById(
                        "riskMessage"
                    );


                if (riskPercentage) {

                    riskPercentage.textContent =
                        `${risk}%`;

                }


                if (riskLevel) {

                    riskLevel.textContent =
                        level;

                }


                if (riskMessage) {

                    riskMessage.textContent =
                        message;

                }


                updateRiskFactors(
                    traffic,
                    weather,
                    road,
                    visibility
                );


                savePrediction(
                    risk,
                    traffic,
                    weather
                );


                showToast(
                    "Risk analysis completed successfully."
                );

            }
        );

    }


    /* =========================================
       RISK FACTOR UPDATE
    ========================================= */

    function updateRiskFactors(
        traffic,
        weather,
        road,
        visibility
    ) {

        const factorBars =
            document.querySelectorAll(
                ".factor-bar i"
            );

        const factorValues =
            document.querySelectorAll(
                ".factor strong"
            );


        const factors = [

            traffic,

            weather,

            road,

            visibility

        ];


        factorBars.forEach(
            (bar, index) => {

                if (factors[index] !== undefined) {

                    const value =
                        Math.min(
                            100,
                            Math.max(
                                5,
                                factors[index]
                            )
                        );

                    bar.style.width =
                        `${value}%`;

                }

            }
        );


        factorValues.forEach(
            (valueElement, index) => {

                if (factors[index] !== undefined) {

                    valueElement.textContent =
                        `${Math.round(
                            factors[index]
                        )}%`;

                }

            }
        );

    }


    /* =========================================
       TRAFFIC SLIDER
    ========================================= */

    const trafficSlider =
        document.getElementById(
            "trafficSlider"
        );


    const trafficValue =
        document.getElementById(
            "trafficValue"
        );


    const simulationRisk =
        document.getElementById(
            "simulationRisk"
        );


    function updateTrafficSimulation() {

        if (!trafficSlider) return;


        const value =
            Number(trafficSlider.value);


        if (trafficValue) {

            trafficValue.textContent =
                `${value}%`;

        }


        /*
         * Simple demonstration formula.
         *
         * Later this can be replaced with
         * an actual ML model prediction.
         */

        let risk =
            Math.round(
                8 + (value * 0.72)
            );


        risk =
            Math.min(
                95,
                Math.max(5, risk)
            );


        if (simulationRisk) {

            simulationRisk.textContent =
                `${risk}%`;

        }

    }


    if (trafficSlider) {

        trafficSlider.addEventListener(
            "input",
            updateTrafficSimulation
        );

        updateTrafficSimulation();

    }


    /* =========================================
       PREDICTION HISTORY
    ========================================= */

    function savePrediction(
        risk,
        traffic,
        weather
    ) {

        const predictions =
            JSON.parse(
                localStorage.getItem(
                    "trafficSafePredictions"
                ) || "[]"
            );


        const trafficLabel =
            getTrafficLabel(traffic);


        const weatherLabel =
            getWeatherLabel(weather);


        const record = {

            date:
                new Date().toLocaleString(),

            risk,

            traffic:
                trafficLabel,

            weather:
                weatherLabel

        };


        predictions.unshift(record);


        /*
         * Keep the latest 20 predictions.
         */

        const limited =
            predictions.slice(0, 20);


        localStorage.setItem(
            "trafficSafePredictions",
            JSON.stringify(limited)
        );


        renderPredictionHistory();

    }


    function getTrafficLabel(value) {

        if (value >= 80) {
            return "High";
        }

        if (value >= 40) {
            return "Medium";
        }

        return "Low";

    }


    function getWeatherLabel(value) {

        if (value >= 65) {
            return "Heavy/Fog";
        }

        if (value >= 45) {
            return "Rain";
        }

        if (value >= 25) {
            return "Cloudy";
        }

        return "Clear";

    }


    function getRiskStatus(risk) {

        if (risk >= 70) {

            return {
                text: "High",
                className: "high"
            };

        }


        if (risk >= 40) {

            return {
                text: "Moderate",
                className: "medium"
            };

        }


        return {
            text: "Low",
            className: "low"
        };

    }


    function renderPredictionHistory() {

        const table =
            document.getElementById(
                "historyTable"
            );


        if (!table) return;


        const tbody =
            table.querySelector("tbody");


        if (!tbody) return;


        const predictions =
            JSON.parse(
                localStorage.getItem(
                    "trafficSafePredictions"
                ) || "[]"
            );


        if (predictions.length === 0) {

            tbody.innerHTML = `

                <tr>

                    <td colspan="5">

                        No predictions yet.

                    </td>

                </tr>

            `;

            return;

        }


        tbody.innerHTML =
            predictions.map(
                prediction => {

                    const status =
                        getRiskStatus(
                            prediction.risk
                        );


                    return `

                        <tr>

                            <td>
                                ${prediction.date}
                            </td>

                            <td>
                                ${prediction.risk}%
                            </td>

                            <td>
                                ${prediction.traffic}
                            </td>

                            <td>
                                ${prediction.weather}
                            </td>

                            <td>

                                <span
                                    class="badge ${status.className}"
                                >
                                    ${status.text}
                                </span>

                            </td>

                        </tr>

                    `;

                }
            ).join("");

    }


    /* =========================================
       CHARTS
    ========================================= */

    let riskChartCreated = false;

    let trafficChartCreated = false;


    function initializeCharts() {

        if (
            typeof Chart === "undefined"
        ) {

            console.warn(
                "Chart.js has not loaded yet."
            );

            return;

        }


        createRiskChart();

        createTrafficChart();

    }


    function createRiskChart() {

        const canvas =
            document.getElementById(
                "riskChart"
            );


        if (!canvas || riskChartCreated) {
            return;
        }


        new Chart(
            canvas,
            {

                type: "line",

                data: {

                    labels: [
                        "Mon",
                        "Tue",
                        "Wed",
                        "Thu",
                        "Fri",
                        "Sat",
                        "Sun"
                    ],

                    datasets: [

                        {
                            label:
                                "Accident Risk",

                            data: [
                                28,
                                35,
                                31,
                                47,
                                42,
                                56,
                                32
                            ],

                            borderWidth: 2,

                            tension: 0.35,

                            fill: true,

                            borderColor:
                                "#39b9ff",

                            backgroundColor:
                                "rgba(57,185,255,0.08)",

                            pointBackgroundColor:
                                "#39b9ff"

                        }

                    ]

                },

                options: {

                    responsive: true,

                    maintainAspectRatio: false,

                    plugins: {

                        legend: {
                            display: false
                        }

                    },

                    scales: {

                        x: {

                            grid: {
                                display: false
                            },

                            ticks: {
                                color: "#71869d"
                            }

                        },

                        y: {

                            beginAtZero: true,

                            max: 100,

                            grid: {
                                color:
                                    "rgba(255,255,255,0.05)"
                            },

                            ticks: {
                                color: "#71869d",
                                callback:
                                    value =>
                                        `${value}%`
                            }

                        }

                    }

                }

            }
        );


        riskChartCreated = true;

    }


    function createTrafficChart() {

        const canvas =
            document.getElementById(
                "trafficChart"
            );


        if (!canvas || trafficChartCreated) {
            return;
        }


        new Chart(
            canvas,
            {

                type: "bar",

                data: {

                    labels: [
                        "Mon",
                        "Tue",
                        "Wed",
                        "Thu",
                        "Fri",
                        "Sat",
                        "Sun"
                    ],

                    datasets: [

                        {
                            label:
                                "Traffic Density",

                            data: [
                                42,
                                58,
                                51,
                                72,
                                81,
                                65,
                                48
                            ],

                            borderRadius: 7,

                            backgroundColor:
                                "rgba(53,212,154,0.65)"

                        }

                    ]

                },

                options: {

                    responsive: true,

                    maintainAspectRatio: false,

                    plugins: {

                        legend: {
                            display: false
                        }

                    },

                    scales: {

                        x: {

                            grid: {
                                display: false
                            },

                            ticks: {
                                color: "#71869d"
                            }

                        },

                        y: {

                            beginAtZero: true,

                            max: 100,

                            ticks: {
                                color: "#71869d",
                                callback:
                                    value =>
                                        `${value}%`
                            },

                            grid: {
                                color:
                                    "rgba(255,255,255,0.05)"
                            }

                        }

                    }

                }

            }
        );


        trafficChartCreated = true;

    }


    /* =========================================
       REMEMBER LOGIN
    ========================================= */

    function checkLoginState() {

        const loggedIn =
            localStorage.getItem(
                "trafficSafeLoggedIn"
            );


        if (loggedIn === "true") {

            loginPage.classList.add("hidden");

            appPage.classList.remove("hidden");

            initializeCharts();

        }

    }


    /* =========================================
       INITIALIZATION
    ========================================= */

    renderPredictionHistory();

    checkLoginState();


});
function renderDashboard(user) {
    let renderTarget = document.getElementById("renderContainer");
    renderTarget.innerHTML = '';

    // Calendar Rendering
        // Calendar Heading
    let calHeader = document.createElement("h3");
    calHeader.classList.add("calendarHeading");
    calHeader.innerHTML = '<span class="highlight">project</span> calendar';
    renderTarget.appendChild(calHeader);
        // Calendar contents
    let calWrap = document.createElement("div");
    calWrap.classList.add("calendarWrap");
    let calContainer = document.createElement("div");
    calContainer.classList.add("calendar");
    calContainer.id = "calendarContainer";
    calWrap.appendChild(calContainer);
    renderTarget.appendChild(calWrap);

    // Priority Tasks rendering
        // Priority Tasks Heading
    let priHeader = document.createElement("h3");
    priHeader.classList.add("dashboardTaskHeading");
    priHeader.innerHTML = 'recommended <span class="highlight">tasks</span>';
    renderTarget.appendChild(priHeader);
        // Priority Tasks Container
    let priContainer = document.createElement("section");
    priContainer.id = "dashboardTaskContainer";
    renderTarget.appendChild(priContainer);

    // Projects Rendering
        // Projects Heading
    let proHeader = document.createElement("h3");
    proHeader.classList.add("dashboardProjectHeading");
    proHeader.innerHTML = 'your <span class="highlight">projects</span>';
    renderTarget.appendChild(proHeader);
        // Projects Container
    let proContainer = document.createElement("section");
    proContainer.id = "dashboardProjectContainer";
    renderTarget.appendChild(proContainer);

    renderDashboardCalendar(user.getTasks());
    renderDashboardTasks(user.getTasks());
    renderDashboardProjects(user.getProjects());
}
function renderDashboard(user) {
    let renderTarget = document.getElementById("renderContainer");
    renderTarget.innerHTML = '';

    // Scroll to top
    window.scrollTo(0, 0);

    // Calendar Rendering
        // Calendar Heading
    let calHeader = document.createElement("h3");
    calHeader.classList.add("calendarHeading");
    calHeader.innerHTML = '<span class="highlight">task</span> calendar';
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

    //New project
    let newProjectDiv = document.createElement("div");
    let newProjectButton = document.createElement("button");
    newProjectButton.innerText = "Create a new project";

    let newProjectInput = document.createElement("input");
    newProjectInput.setAttribute("type", "text");
    newProjectDiv.appendChild(newProjectInput);
    newProjectDiv.appendChild(newProjectButton);

    newProjectButton.addEventListener("click", () => {
        if (newProjectInput.value != "") {
            new Project(newProjectInput.value)
            renderProjectView(Project.array[Project.array.length - 1]);
        }

        newProjectInput.addEventListener("keyup", function (event) {
            if (event.keyCode === 13) {
                new Project(newProjectInput.value)
                renderProjectView(Project.array[Project.array.length - 1]);
            }
        });
    });
    renderTarget.appendChild(newProjectDiv);

    renderDashboardCalendar(user.getTasks());
    renderDashboardTasks(user.getTasks());
    renderDashboardProjects(user.getProjects());

    // Add TASK and PROJECT to HEADER
    let headerDashboardButton = document.getElementById("headerButtonDashboard");
    headerDashboardButton.classList.add("active");
    let headerProjectButton = document.getElementById("headerButtonProject");
    headerProjectButton.classList.add("invisible");
    headerProjectButton.classList.remove("active");
    let headerTaskButton = document.getElementById("headerButtonTask");
    headerTaskButton.classList.add("invisible");
    headerTaskButton.classList.add("active");
    let slash1 = document.getElementById("slash1");
    slash1.classList.add("invisible");
    let slash2 = document.getElementById("slash2");
    slash2.classList.add("invisible");
}
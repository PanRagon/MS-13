function renderDashboardProjects(projectArray) {
    let projectContainerDiv = document.getElementById("dashboardProjectContainer");

    projectArray.forEach(project => {

        // Wrap for inline-block-positioning
        let projectWrapDiv = document.createElement("div");
        projectWrapDiv.classList.add("dashboardProjectWrap");
        projectWrapDiv.classList.add("pointer");
        projectWrapDiv.setAttribute("projectID", project.ID);
        projectWrapDiv.addEventListener("click", () => {
            renderProjectView(Project.array.find(project => project.ID == projectWrapDiv.getAttribute("projectid")));
        });

        let projectDiv = document.createElement("div");
        projectDiv.classList.add("dashboardProject");

        // Top bar:
        let topBarDiv = document.createElement("div");
        topBarDiv.classList.add("dashboardProjectTopBar");
            // Start date:
        let startDateDiv = document.createElement("div");
        startDateDiv.classList.add("dashboardProjectDate");
        startDateDiv.classList.add("dashboardProjectStartDate");
        startDateDiv.innerText = dayMonthDateFormatter(project.startDate);
        topBarDiv.appendChild(startDateDiv);

            // Title:
        let titleDiv = document.createElement("div");
        titleDiv.classList.add("dashboardProjectTitle");
        titleDiv.innerText = project.title;
        topBarDiv.appendChild(titleDiv);

            // End date:
        let endDateDiv = document.createElement("div");
        endDateDiv.classList.add("dashboardProjectDate");
        endDateDiv.classList.add("dashboardProjectEndDate");
        endDateDiv.innerText = dayMonthDateFormatter(project.endDate);
        topBarDiv.appendChild(endDateDiv);
        // Compose:
        projectDiv.appendChild(topBarDiv);

        // Description:
        let descriptionDiv = document.createElement("div");
        descriptionDiv.classList.add("dashboardProjectDescription");
        descriptionDiv.innerText = project.description;
        projectDiv.appendChild(descriptionDiv);

        // USER GENERATION:
        let usersDiv = document.createElement("div");
        usersDiv.classList.add("dashboardProjectUserWrap");
        // Owners:
        project.owners.forEach(owner => {
            let ownerDiv = document.createElement("div");
            ownerDiv.classList.add("dashboardProjectUser");
            ownerDiv.classList.add("dashboardProjectOwner");
            ownerDiv.innerText = owner.shortName;
            usersDiv.appendChild(ownerDiv);
        });
        // Members:
        project.members.forEach(member => {
            let memberDiv = document.createElement("div");
            memberDiv.classList.add("dashboardProjectUser");
            memberDiv.classList.add("dashboardProjectMember");
            memberDiv.innerText = member.shortName;
            usersDiv.appendChild(memberDiv);
        });
        // Compose:
        projectDiv.appendChild(usersDiv);

        // TASK BAR:
        let taskDiv = document.createElement("div");
        taskDiv.classList.add("dashboardProjectTaskWrap");
        // To-Do:
        let toDoDiv = document.createElement("div");
        toDoDiv.classList.add("dashboardProjectTask");
        toDoDiv.classList.add("dashboardProjectTaskToDo");
        toDoDiv.innerText = project.tasks.filter(task => task.status.toLowerCase() === "todo").length.toString();
        taskDiv.appendChild(toDoDiv);
        // InProgress:
        let inProgressDiv = document.createElement("div");
        inProgressDiv.classList.add("dashboardProjectTask");
        inProgressDiv.classList.add("dashboardProjectTaskInProgress");
        inProgressDiv.innerText = project.tasks.filter(task => task.status.toLowerCase() === "inprogress").length.toString();
        taskDiv.appendChild(inProgressDiv);
        // Done:
        let doneDiv = document.createElement("div");
        doneDiv.classList.add("dashboardProjectTask");
        doneDiv.classList.add("dashboardProjectTaskDone");
        doneDiv.innerText = project.tasks.filter(task => task.status.toLowerCase() === "done").length.toString();
        taskDiv.appendChild(doneDiv);
        // Compose:
        projectDiv.appendChild(taskDiv);

        projectWrapDiv.appendChild(projectDiv);
        // Render project to container
        projectContainerDiv.appendChild(projectWrapDiv);
    });
}
function dayMonthDateFormatter(date) {
    let months = ["JAN", "FEB", "MAR","APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    return appendLeadingZeroes(date.getDay()) + " " + months[date.getMonth()];
}

function renderDashboardProjects(projectArray) {
    let projectContainerDiv = document.getElementById("dashboardProjectContainer");

    projectArray.forEach(project => {
        let projectDiv = document.createElement("div");
        projectDiv.classList.add("dashboardProject");

        // TOP BAR GENERATION:
        let topBarDiv = document.createElement("div");
        topBarDiv.classList.add("dashboardProjectTopBar");
        // Start date:
        let startDateDiv = document.createElement("div");
        startDateDiv.classList.add("dashboardProjectStartDate");
        startDateDiv.innerText = dayMonthDateFormatter(project.startDate);
        // Title:
        let titleDiv = document.createElement("div");
        titleDiv.classList.add("dashboardProjectTitle");
        titleDiv.innerText = project.title;
        // End date:
        let endDateDiv = document.createElement("div");
        endDateDiv.classList.add("dashboardProjectEndDate");
        endDateDiv.innerText = dayMonthDateFormatter(project.endDate);

        // Compose:
        topBarDiv.appendChild(startDateDiv);
        topBarDiv.appendChild(titleDiv);
        topBarDiv.appendChild(endDateDiv);
        projectDiv.appendChild(topBarDiv);

        // DESCRIPTION:
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

        // TASK GENERATION:
        let taskDiv = document.createElement("div");
        taskDiv.classList.add("dashboardProjectTaskWrap");
        // To-Do:
        let toDoDiv = document.createElement("div");
        toDoDiv.classList.add("dashboardProjectTask");
        toDoDiv.classList.add("dashboardProjectTaskToDo");
        toDoDiv.innerText = project.tasks.filter(task => task.status.toLowerCase() === "todo").length;
        // InProgress:
        let inProgressDiv = document.createElement("div");
        inProgressDiv.classList.add("dashboardProjectTask");
        inProgressDiv.classList.add("dashboardProjectTaskInProgress");
        inProgressDiv.innerText = project.tasks.filter(task => task.status.toLowerCase() === "inprogress").length;
        // Done:
        let doneDiv = document.createElement("div");
        doneDiv.classList.add("dashboardProjectTask");
        doneDiv.classList.add("dashboardProjectTaskDone");
        doneDiv.innerText = project.tasks.filter(task => task.status.toLowerCase() === "done").length;

        // Compose:
        taskDiv.appendChild(toDoDiv);
        taskDiv.appendChild(inProgressDiv);
        taskDiv.appendChild(doneDiv);
        projectDiv.appendChild(taskDiv);

        // Render project to container
        projectContainerDiv.appendChild(projectDiv);
    });
}

renderDashboardProjects(Project.array);
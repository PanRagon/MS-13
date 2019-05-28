function dayMonthDateFormatter(date) {
    let months = ["JAN", "FEB", "MAR","APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    return date.getDate() + " " + months[date.getMonth()];
}

function renderDashboardProjects(projectArray) {
    let projectContainerDiv = document.getElementById("projectContainer");

    projectArray.forEach(project => {
        let projectDiv = document.createElement("div");
        projectDiv.classList.add("project");

        // TOP BAR GENERATION:
        let topBarDiv = document.createElement("div");
        topBarDiv.classList.add("topBarDiv");
        // Start date:
        let startDateDiv = document.createElement("div");
        startDateDiv.classList.add("projectStartDate");
        startDateDiv.innerText = dayMonthDateFormatter(project.startDate);
        // Title:
        let titleDiv = document.createElement("div");
        titleDiv.classList.add("projectTitle");
        titleDiv.innerText = project.title;
        // End date:
        let endDateDiv = document.createElement("div");
        endDateDiv.classList.add("projectEndDate");
        endDateDiv.innerText = dayMonthDateFormatter(project.endDate);

        // Compose:
        topBarDiv.appendChild(startDateDiv);
        topBarDiv.appendChild(titleDiv);
        topBarDiv.appendChild(endDateDiv);
        projectDiv.appendChild(topBarDiv);

        // DESCRIPTION:
        let descriptionDiv = document.createElement("div");
        descriptionDiv.classList.add("projectDescription");
        descriptionDiv.innerText = project.description;
        projectDiv.appendChild(descriptionDiv);

        // USER GENERATION:
        let usersDiv = document.createElement("div");
        usersDiv.classList.add("projectUserWrap");
        // Owners:
        project.owners.forEach(owner => {
            let ownerDiv = document.createElement("div");
            ownerDiv.classList.add("taskUser");
            ownerDiv.classList.add("taskOwner");
            ownerDiv.innerText = owner.shortName;
            usersDiv.appendChild(ownerDiv);
        });
        // Members:
        project.members.forEach(member => {
            let memberDiv = document.createElement("div");
            memberDiv.classList.add("taskUser");
            memberDiv.classList.add("taskMember");
            memberDiv.innerText = member.shortName;
            usersDiv.appendChild(memberDiv);
        });

        // Compose:
        projectDiv.appendChild(usersDiv);

        // TASK GENERATION:
        let taskDiv = document.createElement("div");
        taskDiv.classList.add("projectTaskWrap");
        // To-Do:
        let toDoDiv = document.createElement("div");
        toDoDiv.classList.add("projectTask");
        toDoDiv.classList.add("projectTaskToDo");
        toDoDiv.innerText = project.tasks.filter(task => task.status.toLowerCase() === "todo").length;
        // InProgress:
        let inProgressDiv = document.createElement("div");
        inProgressDiv.classList.add("projectTask");
        inProgressDiv.classList.add("projectTaskInProgress");
        inProgressDiv.innerText = project.tasks.filter(task => task.status.toLowerCase() === "inprogress").length;
        // Done:
        let doneDiv = document.createElement("div");
        doneDiv.classList.add("projectTask");
        doneDiv.classList.add("projectTaskDone");
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
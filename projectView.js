function renderProjectView(project) {
    let projectContainerDiv = document.getElementById("projectViewContainer");

    let projectDiv = document.createElement("div");
    projectDiv.classList.add("projectViewProject");

    // TopBar:
    let topBarDiv = document.createElement("div");
    topBarDiv.classList.add("projectViewTopBar");
        // Start date:
    let startDateDiv = document.createElement("div");
    startDateDiv.classList.add("projectViewDate");
    startDateDiv.classList.add("projectViewStartDate");
    startDateDiv.innerText = dayMonthDateFormatter(project.startDate);
    topBarDiv.appendChild(startDateDiv);
        // Title:
    let titleDiv = document.createElement("div");
    titleDiv.classList.add("projectViewTitle");
    titleDiv.innerText = project.title;
    topBarDiv.appendChild(titleDiv);
        // End date:
    let endDateDiv = document.createElement("div");
    endDateDiv.classList.add("projectViewDate");
    endDateDiv.classList.add("projectViewEndDate");
    endDateDiv.innerText = dayMonthDateFormatter(project.endDate);
    topBarDiv.appendChild(endDateDiv);
    projectDiv.appendChild(topBarDiv);

    // DropDown
    let dropDownDiv = document.createElement("div");
    dropDownDiv.classList.add("projectViewDropDown");
        // Description:
    let descriptionDiv = document.createElement("div");
    descriptionDiv.classList.add("projectViewDescription");
    descriptionDiv.innerText = project.description;
    dropDownDiv.appendChild(descriptionDiv);
        // USER GENERATION:
    let usersDiv = document.createElement("div");
    usersDiv.classList.add("projectViewUserWrap");
        // Owners:
    project.owners.forEach(owner => {
        let userDiv = document.createElement("div");
        userDiv.classList.add("projectViewUser");
        let ownerDiv = document.createElement("div");
        ownerDiv.classList.add("projectViewUserIcon");
        ownerDiv.classList.add("projectViewOwner");
        ownerDiv.innerText = owner.shortName;
        let ownerNameDiv = document.createElement("div");
        ownerNameDiv.classList.add("projectViewUserName");
        ownerNameDiv.innerText = owner.fullName;
        userDiv.appendChild(ownerDiv);
        userDiv.appendChild(ownerNameDiv);
        usersDiv.appendChild(userDiv);
    });
        // Members:
    project.members.forEach(member => {
        let userDiv = document.createElement("div");
        userDiv.classList.add("projectViewUser");
        let memberDiv = document.createElement("div");
        memberDiv.classList.add("projectViewUserIcon");
        memberDiv.classList.add("projectViewMember");
        memberDiv.innerText = member.shortName;
        let memberNameDiv = document.createElement("div");
        memberNameDiv.classList.add("projectViewUserName");
        memberNameDiv.innerText = member.fullName;
        userDiv.appendChild(memberDiv);
        userDiv.appendChild(memberNameDiv);
        usersDiv.appendChild(userDiv);
    });
    // Compose:
    dropDownDiv.appendChild(usersDiv);
    projectDiv.appendChild(dropDownDiv);

    // TASKS:
    let taskWrapDiv = document.createElement("div");
    taskWrapDiv.classList.add("projectViewTaskWrap");

    // To-Do:
    let toDoDiv = document.createElement("div");
    toDoDiv.classList.add("projectViewToDoWrap");
    toDoDiv.classList.add("projectViewStatusWrap");
        // Header / Title
    let toDoHeaderDiv = document.createElement("div");
    toDoHeaderDiv.classList.add("projectViewStatusTitle");
    toDoHeaderDiv.classList.add("projectViewStatusTitleToDo");
    toDoHeaderDiv.innerText = project.tasks.filter(task => task.status.toLowerCase() === "todo").length.toString() + " To do";
    toDoDiv.appendChild(toDoHeaderDiv);

        // Render to do tasks
    project.tasks.forEach(task => {
        if(task.status.toLowerCase() === "todo"){
            let taskDiv = document.createElement("div");
            taskDiv.classList.add("projectViewTask");
            taskDiv.classList.add("projectViewTaskToDo");
            // Status
            let statusDiv = document.createElement("div");
            statusDiv.classList.add("projectViewTaskStatus");
            statusDiv.classList.add("projectViewTaskStatusToDo");
            statusDiv.innerText = task.status;
            taskDiv.appendChild(statusDiv);
            // Category
            let categoryDiv = document.createElement("div");
            categoryDiv.classList.add("projectViewTaskCategory");
            categoryDiv.classList.add("projectViewTaskCategory" + task.category.name);
            categoryDiv.setAttribute("taskID", task.ID);
            categoryDiv.innerText = task.category.name;
            taskDiv.appendChild(categoryDiv);
            // Title
            let titleDiv = document.createElement("div");
            titleDiv.classList.add("projectViewTaskTitle");
            titleDiv.setAttribute("taskID", task.ID);
            titleDiv.innerText = task.title;
            taskDiv.appendChild(titleDiv);
            // Users
            let usersDiv = document.createElement("div");
            usersDiv.classList.add("projectViewTaskUserWrap");
            usersDiv.setAttribute("taskID", task.ID);
            // Owners:
            task.owners.forEach(owner => {
                let ownerDiv = document.createElement("div");
                ownerDiv.classList.add("projectViewTaskUser");
                ownerDiv.classList.add("projectViewTaskOwner");
                ownerDiv.setAttribute("taskID", task.ID);
                ownerDiv.innerText = owner.shortName;
                usersDiv.appendChild(ownerDiv);
            });
            // Members:
            task.members.forEach(member => {
                let memberDiv = document.createElement("div");
                memberDiv.classList.add("projectViewTaskUser");
                memberDiv.classList.add("projectViewTaskMember");
                memberDiv.setAttribute("taskID", task.ID);
                memberDiv.innerText = member.shortName;
                usersDiv.appendChild(memberDiv);
            });
            taskDiv.appendChild(usersDiv);
            // Project
            let projectDiv = document.createElement("div");
            projectDiv.classList.add("projectViewTaskProject");
            projectDiv.setAttribute("taskID", task.ID);
            projectDiv.innerText = task.getProject().title;
            taskDiv.appendChild(projectDiv);
            // End date
            let endDateDiv = document.createElement("div");
            endDateDiv.classList.add("projectViewTaskEndDate");
            endDateDiv.setAttribute("taskID", task.ID);
            endDateDiv.innerText = dayMonthDateFormatter(task.endDate);
            taskDiv.appendChild(endDateDiv);

            toDoDiv.appendChild(taskDiv);
        }
    });
    taskWrapDiv.appendChild(toDoDiv);
    // In progress:
    let inProgressDiv = document.createElement("div");
    inProgressDiv.classList.add("projectViewInProgressWrap");
    inProgressDiv.classList.add("projectViewStatusWrap");
        // Header / Title
    let inProgressHeaderDiv = document.createElement("div");
    inProgressHeaderDiv.classList.add("projectViewStatusTitle");
    inProgressHeaderDiv.classList.add("projectViewStatusTitleInProgress");
    inProgressHeaderDiv.innerText = project.tasks.filter(task => task.status.toLowerCase() === "inprogress").length.toString() + " In progress";
    inProgressDiv.appendChild(inProgressHeaderDiv);
        // Render in progress tasks
    project.tasks.forEach(task => {
        if(task.status.toLowerCase() === "inprogress"){
            let taskDiv = document.createElement("div");
            taskDiv.classList.add("projectViewTask");
            taskDiv.classList.add("projectViewTaskInProgress");
            // Status
            let statusDiv = document.createElement("div");
            statusDiv.classList.add("projectViewTaskStatus");
            statusDiv.classList.add("projectViewTaskStatusInProgress");
            statusDiv.innerText = task.status;
            taskDiv.appendChild(statusDiv);
            // Category
            let categoryDiv = document.createElement("div");
            categoryDiv.classList.add("projectViewTaskCategory");
            categoryDiv.classList.add("projectViewTaskCategory" + task.category.name);
            categoryDiv.setAttribute("taskID", task.ID);
            categoryDiv.innerText = task.category.name;
            taskDiv.appendChild(categoryDiv);
            // Title
            let titleDiv = document.createElement("div");
            titleDiv.classList.add("projectViewTaskTitle");
            titleDiv.setAttribute("taskID", task.ID);
            titleDiv.innerText = task.title;
            taskDiv.appendChild(titleDiv);
            // Users
            let usersDiv = document.createElement("div");
            usersDiv.classList.add("projectViewTaskUserWrap");
            usersDiv.setAttribute("taskID", task.ID);
            // Owners:
            task.owners.forEach(owner => {
                let ownerDiv = document.createElement("div");
                ownerDiv.classList.add("projectViewTaskUser");
                ownerDiv.classList.add("projectViewTaskOwner");
                ownerDiv.setAttribute("taskID", task.ID);
                ownerDiv.innerText = owner.shortName;
                usersDiv.appendChild(ownerDiv);
            });
            // Members:
            task.members.forEach(member => {
                let memberDiv = document.createElement("div");
                memberDiv.classList.add("projectViewTaskUser");
                memberDiv.classList.add("projectViewTaskMember");
                memberDiv.setAttribute("taskID", task.ID);
                memberDiv.innerText = member.shortName;
                usersDiv.appendChild(memberDiv);
            });
            taskDiv.appendChild(usersDiv);
            // Project
            let projectDiv = document.createElement("div");
            projectDiv.classList.add("projectViewTaskProject");
            projectDiv.setAttribute("taskID", task.ID);
            projectDiv.innerText = task.getProject().title;
            taskDiv.appendChild(projectDiv);
            // End date
            let endDateDiv = document.createElement("div");
            endDateDiv.classList.add("projectViewTaskEndDate");
            endDateDiv.setAttribute("taskID", task.ID);
            endDateDiv.innerText = dayMonthDateFormatter(task.endDate);
            taskDiv.appendChild(endDateDiv);

            inProgressDiv.appendChild(taskDiv);
        }
    });
    taskWrapDiv.appendChild(inProgressDiv);
    // Done
    let doneDiv = document.createElement("div");
    doneDiv.classList.add("projectViewDoneWrap");
    doneDiv.classList.add("projectViewStatusWrap");
        // Header / Title
    let doneHeaderDiv = document.createElement("div");
    doneHeaderDiv.classList.add("projectViewStatusTitle");
    doneHeaderDiv.classList.add("projectViewStatusTitleDone");
    doneHeaderDiv.innerText = project.tasks.filter(task => task.status.toLowerCase() === "done").length.toString() + " Done";
    doneDiv.appendChild(doneHeaderDiv);
        // Render done tasks
    project.tasks.forEach(task => {
        if(task.status.toLowerCase() === "done"){
            let taskDiv = document.createElement("div");
            taskDiv.classList.add("projectViewTask");
            taskDiv.classList.add("projectViewTaskDone");
            // Status
            let statusDiv = document.createElement("div");
            statusDiv.classList.add("projectViewTaskStatus");
            statusDiv.classList.add("projectViewTaskStatusDone");
            statusDiv.innerText = task.status;
            taskDiv.appendChild(statusDiv);
            // Category
            let categoryDiv = document.createElement("div");
            categoryDiv.classList.add("projectViewTaskCategory");
            categoryDiv.classList.add("projectViewTaskCategory" + task.category.name);
            categoryDiv.setAttribute("taskID", task.ID);
            categoryDiv.innerText = task.category.name;
            taskDiv.appendChild(categoryDiv);
            // Title
            let titleDiv = document.createElement("div");
            titleDiv.classList.add("projectViewTaskTitle");
            titleDiv.setAttribute("taskID", task.ID);
            titleDiv.innerText = task.title;
            taskDiv.appendChild(titleDiv);
            // Users
            let usersDiv = document.createElement("div");
            usersDiv.classList.add("projectViewTaskUserWrap");
            usersDiv.setAttribute("taskID", task.ID);
            // Owners:
            task.owners.forEach(owner => {
                let ownerDiv = document.createElement("div");
                ownerDiv.classList.add("projectViewTaskUser");
                ownerDiv.classList.add("projectViewTaskOwner");
                ownerDiv.setAttribute("taskID", task.ID);
                ownerDiv.innerText = owner.shortName;
                usersDiv.appendChild(ownerDiv);
            });
            // Members:
            task.members.forEach(member => {
                let memberDiv = document.createElement("div");
                memberDiv.classList.add("projectViewTaskUser");
                memberDiv.classList.add("projectViewTaskMember");
                memberDiv.setAttribute("taskID", task.ID);
                memberDiv.innerText = member.shortName;
                usersDiv.appendChild(memberDiv);
            });
            taskDiv.appendChild(usersDiv);
            // Project
            let projectDiv = document.createElement("div");
            projectDiv.classList.add("projectViewTaskProject");
            projectDiv.setAttribute("taskID", task.ID);
            projectDiv.innerText = task.getProject().title;
            taskDiv.appendChild(projectDiv);
            // End date
            let endDateDiv = document.createElement("div");
            endDateDiv.classList.add("projectViewTaskEndDate");
            endDateDiv.setAttribute("taskID", task.ID);
            endDateDiv.innerText = dayMonthDateFormatter(task.endDate);
            taskDiv.appendChild(endDateDiv);

            doneDiv.appendChild(taskDiv);
        }
    });
    taskWrapDiv.appendChild(doneDiv);
    // Compose:
    projectDiv.appendChild(taskWrapDiv);

    // Render project to container
    projectContainerDiv.appendChild(projectDiv);
}

renderProjectView(Project.array[0]);
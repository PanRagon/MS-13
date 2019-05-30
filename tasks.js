
function renderDashboardTasks(taskArray) {

    // Remove tasks with status "done"
    taskArray = taskArray.filter(task => task.status.toLowerCase() !== "done");

    let taskContainerDiv = document.getElementById("dashboardTaskContainer");
    taskContainerDiv.innerHTML = "";

    taskArray.forEach(task => {
        let taskDivWrap = document.createElement("div");
        taskDivWrap.classList.add("dashboardTaskWrap");
        taskDivWrap.setAttribute("taskID", task.ID);
        taskDivWrap.setAttribute("taskStatus", task.status.toLowerCase());

        let taskDiv = document.createElement("div");
        taskDiv.classList.add("dashboardTask");

        // Status:
        let statusDiv = document.createElement("div");
        statusDiv.classList.add("dashboardTaskStatus");
        if (task.status.toLowerCase() === "todo") {
            statusDiv.classList.add("dashboardTaskStatusToDo");
        } else if (task.status.toLowerCase() === "inprogress") {
            statusDiv.classList.add("cdashboardTaskStatusInProgress");
        } else if (task.status.toLowerCase() === "done") {
            statusDiv.classList.add("dashboardTaskStatusDone");
        } else {
            statusDiv.classList.add("dashboardTaskStatusUnknown");
        }
        statusDiv.innerText = task.status;
        taskDiv.appendChild(statusDiv);

        // Category:
        let categoryDiv = document.createElement("div");
        categoryDiv.classList.add("dashboardTaskCategory");
        categoryDiv.classList.add("dashboardTaskCategory" + task.category.name);
        categoryDiv.innerText = task.category.name;
        taskDiv.appendChild(categoryDiv);

        // Title:
        let titleDiv = document.createElement("div");
        titleDiv.classList.add("dashboardTaskTitle");
        titleDiv.innerText = task.title;
        taskDiv.appendChild(titleDiv);

        // Description:
        let descriptionDiv = document.createElement("div");
        descriptionDiv.classList.add("dashboardTaskDescription");
        descriptionDiv.innerText = task.description;
        taskDiv.appendChild(descriptionDiv);

        // Users:
        let usersDiv = document.createElement("div");
        usersDiv.classList.add("dashboardTaskUserWrap");
            // Owners:
        task.owners.forEach(owner => {
            let ownerDiv = document.createElement("div");
            ownerDiv.classList.add("dashboardTaskUser");
            ownerDiv.classList.add("dashboardTaskOwner");
            ownerDiv.innerText = owner.shortName;
            usersDiv.appendChild(ownerDiv);
        });
            // Members:
        task.members.forEach(member => {
            let ownerDiv = document.createElement("div");
            ownerDiv.classList.add("dashboardTaskUser");
            ownerDiv.classList.add("dashboardTaskMember");
            ownerDiv.innerText = member.shortName;
            usersDiv.appendChild(ownerDiv);
        });
        // Compose:
        taskDiv.appendChild(usersDiv);

        // Countdown:
        let countdownDiv = document.createElement("div");
        countdownDiv.classList.add("dashboardTaskCountdown");
        // TODO: DAY / DAYS
        countdownDiv.innerText = appendLeadingZeroes(task.daysToDeadline()) + "\nDAYS";
        taskDiv.appendChild(countdownDiv);

        // Wrap it up
        taskDivWrap.appendChild(taskDiv)

        // Render task to container
        taskContainerDiv.appendChild(taskDivWrap);
    })
}

renderDashboardTasks(Task.array);
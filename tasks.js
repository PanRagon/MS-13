
function renderDashboardTasks(taskArray) {
    let taskContainerDiv = document.getElementById("dashboardTaskContainer");

    taskArray.forEach(task => {
        let taskDiv = document.createElement("div");
        taskDiv.classList.add("dashboardTask");

        // TOP BAR GENERATION:
        let topBarDiv = document.createElement("div");
        topBarDiv.classList.add("dashboardTaskTopBar");
        // Status:
        let statusDiv = document.createElement("div");
        statusDiv.classList.add("dashboardTaskStatus");
        statusDiv.innerText = task.status;
        // Category:
        let categoryDiv = document.createElement("div");
        categoryDiv.classList.add("dashboardTaskCategory");
        categoryDiv.innerText = task.category.name;
        // Compose top bar:
        topBarDiv.appendChild(statusDiv);
        topBarDiv.appendChild(categoryDiv);
        taskDiv.appendChild(topBarDiv);

        // LEFT BAR GENERATION:
        let leftBarDiv = document.createElement("div");
        leftBarDiv.classList.add("dashboardTaskLeftBar");
        // Title:
        let titleDiv = document.createElement("div");
        titleDiv.classList.add("dashboardTaskTitle");
        titleDiv.innerText = task.title;
        // Description:
        let descriptionDiv = document.createElement("div");
        descriptionDiv.classList.add("dashboardTaskDescription");
        descriptionDiv.innerText = task.description;
        // Compose left bar:
        leftBarDiv.appendChild(titleDiv);
        leftBarDiv.appendChild(descriptionDiv);
        taskDiv.appendChild(leftBarDiv);

        // RIGHT BAR GENERATION:
        let rightBarDiv = document.createElement("div");
        rightBarDiv.classList.add("dashboardTaskRightBar");
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
        // Countdown:
        let countdownDiv = document.createElement("div");
        countdownDiv.classList.add("dashboardTaskCountdown");
        // TODO: DAY / DAYS
        countdownDiv.innerText = appendLeadingZeroes(task.daysToDeadline()) + "\nDAYS";

        // Compose:
        rightBarDiv.appendChild(usersDiv);
        rightBarDiv.appendChild(countdownDiv);
        taskDiv.appendChild(rightBarDiv);

        // Render task to container
        taskContainerDiv.appendChild(taskDiv);
    })
}

renderDashboardTasks(Task.array);
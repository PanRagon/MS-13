
function renderDashboardTasks(taskArray) {

    // Remove tasks with status "Done" from array
    taskArray = Array.from(taskArray);
    taskArray = taskArray.filter(task => task.status.toLowerCase() !== "done");

    // Sort taskArray by priority
    for(let task of taskArray) {
        task.rating = findPriorityRating(task)
    }

    taskArray.sort(function (a, b) {
        return a.rating - b.rating;
    });


    let taskContainerDiv = document.getElementById("dashboardTaskContainer");
    taskContainerDiv.innerHTML = "";

    taskArray.forEach(task => {
        let taskDivWrap = document.createElement("div");
        taskDivWrap.classList.add("dashboardTaskWrap");
        taskDivWrap.classList.add("pointer");
        taskDivWrap.setAttribute("taskID", task.ID);
        taskDivWrap.setAttribute("taskStatus", task.status.toLowerCase());
        taskDivWrap.addEventListener("click", () => {
            renderBigTask(Task.array.find(task => task.ID == taskDivWrap.getAttribute("taskid")));
        });

        let taskDiv = document.createElement("div");
        taskDiv.classList.add("dashboardTask");

        // Status:
        let statusDiv = document.createElement("div");
        statusDiv.classList.add("dashboardTaskStatus");
        if (task.status.toLowerCase() === "todo") {
            statusDiv.classList.add("dashboardTaskStatusToDo");
            statusDiv.innerText = "TODO";
        } else if (task.status.toLowerCase() === "inprogress") {
            statusDiv.classList.add("dashboardTaskStatusInProgress");
            statusDiv.innerText = "In progress";
        } else if (task.status.toLowerCase() === "done") {
            statusDiv.classList.add("dashboardTaskStatusDone");
            statusDiv.innerText = "Done";
        } else {
            statusDiv.classList.add("dashboardTaskStatusUnknown");
        }
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
        let countdownDaysDiv = document.createElement("div");
        countdownDaysDiv.classList.add("dashboardTaskCountdownDaysUnit");

        let dayUnit = "DAYS"
        if(task.daysToDeadline() === 1) {dayUnit = "DAY"}
        let dayUnitDiv = document.createElement("div");
        dayUnitDiv.classList.add("dashboardTaskCountdownUnit");
        dayUnitDiv.innerText = dayUnit;

        let days = appendLeadingZeroes(task.daysToDeadline());
        let daysDiv = document.createElement("div")
        daysDiv.classList.add("dashboardTaskCountdownDays")
        daysDiv.innerText = days;

        countdownDaysDiv.appendChild(daysDiv);
        countdownDaysDiv.appendChild(dayUnitDiv);
        countdownDiv.appendChild(countdownDaysDiv);
        taskDiv.appendChild(countdownDiv);

        // Wrap it up
        taskDivWrap.appendChild(taskDiv)

        // Render task to container
        taskContainerDiv.appendChild(taskDivWrap);

        //Build the countdown chart
        let chartDiv = document.createElement("div");
        chartDiv.classList.add("dashboardTaskCountdownChart");
        countdownDiv.appendChild(chartDiv);
        buildChart(task, chartDiv);
        
    })
}

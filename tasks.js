let taskContainerDiv = document.getElementById("taskContainer");

function renderTasks(taskArray) {
    taskArray.forEach(task => {
        let taskDiv = document.createElement("div");
        taskDiv.classList.add("task");

        // TOP BAR GENERATION:
        let topBarDiv = document.createElement("div");
        topBarDiv.classList.add("taskTopBar");
        // Status:
        let statusDiv = document.createElement("div");
        statusDiv.classList.add("taskStatus");
        statusDiv.innerText = task.status;
        // Category:
        let categoryDiv = document.createElement("div");
        categoryDiv.classList.add("taskCategory");
        categoryDiv.innerText = task.category.name;
        // Compose top bar:
        topBarDiv.appendChild(statusDiv);
        topBarDiv.appendChild(categoryDiv);
        taskDiv.appendChild(topBarDiv);

        // LEFT BAR GENERATION:
        let leftBarDiv = document.createElement("div");
        leftBarDiv.classList.add("taskLeftBar");
        // Title:
        let titleDiv = document.createElement("div");
        titleDiv.classList.add("taskTitle");
        titleDiv.innerText = task.title;
        // Description:
        let descriptionDiv = document.createElement("div");
        descriptionDiv.classList.add("taskDescription");
        descriptionDiv.innerText = task.description;
        // Compose left bar:
        leftBarDiv.appendChild(titleDiv);
        leftBarDiv.appendChild(descriptionDiv);
        taskDiv.appendChild(leftBarDiv);

        // RIGHT BAR GENERATION:
        let rightBarDiv = document.createElement("div");
        rightBarDiv.classList.add("taskRightBar");
        // Users:
        let usersDiv = document.createElement("div");
        usersDiv.classList.add("taskUsers");
            // Owners:
        task.owners.forEach(owner => {
            let ownerDiv = document.createElement("div");
            ownerDiv.classList.add("taskUser");
            ownerDiv.classList.add("taskOwner");
            ownerDiv.innerText = owner.shortName;
            usersDiv.appendChild(ownerDiv);
        });
            // Members:
        task.members.forEach(member => {
            let ownerDiv = document.createElement("div");
            ownerDiv.classList.add("taskUser");
            ownerDiv.classList.add("taskMember");
            ownerDiv.innerText = member.shortName;
            usersDiv.appendChild(ownerDiv);
        });
        // Countdown:
        // TODO: Make calulateCountdown-function
        let countdownDiv = document.createElement("div");
        countdownDiv.classList.add("taskCountdown");
        countdownDiv.innerText = calendarDateFormatter(task.endDate);

        // Compose:
        rightBarDiv.appendChild(usersDiv);
        rightBarDiv.appendChild(countdownDiv);
        taskDiv.appendChild(rightBarDiv);

        // Render task to container
        taskContainerDiv.appendChild(taskDiv);
    })
}

renderTasks(Task.array);
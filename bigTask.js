// UTILITY FUNCTIONS:
function bigTaskDateRender(date) {
    return appendLeadingZeroes(date.getDate()) + "." + appendLeadingZeroes(date.getMonth() + 1) + "." + date.getFullYear();
}

function renderBigTask(task) {

    // Scroll to top
    window.scrollTo(0, 0);

    let bigTaskWrapper = document.getElementById("renderContainer");
    bigTaskWrapper.innerHTML = "";

    let taskDiv = document.createElement("div");
    taskDiv.classList.add("bigTask");
    taskDiv.setAttribute("taskID", task.ID);
    bigTaskWrapper.appendChild(taskDiv);

    // Status:
    let statusDiv = document.createElement("select");
    statusDiv.classList.add("bigTaskStatus");
    statusDiv.setAttribute("taskID", task.ID);
    // Add status-options to select-element
    let toDoOption = document.createElement("option");
    toDoOption.setAttribute("value", "toDo");
    toDoOption.innerText = "To do";
    let inProgressOption = document.createElement("option");
    inProgressOption.setAttribute("value", "inProgress");
    inProgressOption.innerText = "In progress";
    let doneOption = document.createElement("option");
    doneOption.setAttribute("value", "done");
    doneOption.innerText = "Done";
    if (task.status.toLowerCase() === "todo") {
        toDoOption.setAttribute("selected", "");
        statusDiv.classList.add("bigTaskStatusToDo");
    } else if (task.status.toLowerCase() === "inprogress") {
        inProgressOption.setAttribute("selected", "");
        statusDiv.classList.add("bigTaskStatusInProgress");
    } else if (task.status.toLowerCase() === "done") {
        doneOption.setAttribute("selected", "");
        statusDiv.classList.add("bigTaskStatusDone");
    } else {
        statusDiv.classList.add("bigTaskStatusUnknown");
    }
    statusDiv.addEventListener("change", () => {
        task.status = statusDiv.value;
        // Update status-class on element
        if (task.status.toLowerCase() === "todo") {
            statusDiv.classList.remove('bigTaskStatusInProgress');
            statusDiv.classList.remove('bigTaskStatusDone');
            statusDiv.classList.add("bigTaskStatusToDo");
        } else if (task.status.toLowerCase() === "inprogress") {
            statusDiv.classList.remove("bigTaskStatusToDo");
            statusDiv.classList.remove('bigTaskStatusDone');
            statusDiv.classList.add("bigTaskStatusInProgress");
        } else if (task.status.toLowerCase() === "done") {
            statusDiv.classList.remove("bigTaskStatusToDo");
            statusDiv.classList.remove('bigTaskStatusInProgress');
            statusDiv.classList.add("bigTaskStatusDone");
            confetti.start();
            setTimeout(function () {
                confetti.stop()
            }, 2000);

        } else {
            statusDiv.classList.remove("bigTaskStatusToDo");
            statusDiv.classList.remove('bigTaskStatusInProgress');
            statusDiv.classList.remove('bigTaskStatusDone');
            statusDiv.classList.add("bigTaskStatusUnknown");
        }
    });

    // Compose
    statusDiv.appendChild(toDoOption);
    statusDiv.appendChild(inProgressOption);
    statusDiv.appendChild(doneOption);
    taskDiv.appendChild(statusDiv);

    // Priority:
    let priorityDiv = document.createElement("select");
    priorityDiv.classList.add("bigTaskPriority");
    priorityDiv.setAttribute("taskID", task.ID);
        // Create priority options
    let lowOption = document.createElement("option");
    lowOption.setAttribute("value", "1");
    lowOption.innerText = "Low priority";
    priorityDiv.appendChild(lowOption);
    let mediumOption = document.createElement("option");
    mediumOption.setAttribute("value", "2");
    mediumOption.innerText = "Medium priority";
    priorityDiv.appendChild(mediumOption);
    let highOption = document.createElement("option");
    highOption.setAttribute("value", "3");
    highOption.innerText = "High priority";
    priorityDiv.appendChild(highOption);
    if (task.priority === 1) {
        priorityDiv.classList.add("bigTaskPriorityLow");
        lowOption.setAttribute("selected", "");
    } else if (task.priority === 2) {
        priorityDiv.classList.add("bigTaskPriorityMedium");
        mediumOption.setAttribute("selected", "");
    } else if (task.priority === 3) {
        priorityDiv.classList.add("bigTaskPriorityHigh");
        highOption.setAttribute("selected", "");
    }
        // Update priority based on select
    priorityDiv.addEventListener("change", () => {
        if (priorityDiv.value === "1") {
            task.priority = 1;
            priorityDiv.classList.remove("bigTaskPriorityMedium", "bigTaskPriorityHigh");
            priorityDiv.classList.add("bigTaskPriorityLow");
        } else if (priorityDiv.value === "2") {
            task.priority = 2;
            priorityDiv.classList.remove("bigTaskPriorityLow", "bigTaskPriorityHigh");
            priorityDiv.classList.add("bigTaskPriorityMedium");
        } else if (priorityDiv.value === "3") {
            task.priority = 3;
            priorityDiv.classList.remove("bigTaskPriorityLow", "bigTaskPriorityMedium");
            priorityDiv.classList.add("bigTaskPriorityHigh");
        }
    });


    taskDiv.appendChild(priorityDiv);

    // Category:
    let categorySelect = document.createElement("select");
    categorySelect.classList.add("bigTaskCategory");
    categorySelect.classList.add("bigTaskCategory" + task.category.name);
    categorySelect.setAttribute("taskID", task.ID);
    // categoryDiv.innerText = task.category.name;

    TaskCategory.array.forEach(category => {
        let categoryOption = document.createElement("option");
        categoryOption.setAttribute("value", category.ID);
        categoryOption.innerText = category.name;
        categorySelect.appendChild(categoryOption);
    });
    categorySelect.addEventListener("change", () => {
        task.category = TaskCategory.array.find(category => category.ID === Number(categorySelect.value));
        categorySelect.className = "";
        categorySelect.classList.add("bigTaskCategory", "bigTaskCategory" + task.category.name);
    });

    taskDiv.appendChild(categorySelect);


    // Left bar:
    let leftBarDiv = document.createElement("div");
    leftBarDiv.classList.add("bigTaskLeftBar");
    // Title:
    let titleDiv = document.createElement("input");
    titleDiv.classList.add("bigTaskTitle");
    titleDiv.setAttribute("taskID", task.ID);
    titleDiv.setAttribute("type", "text");
    titleDiv.setAttribute("value", task.title);
    titleDiv.addEventListener("keyup", () => {
        task.title = titleDiv.value;
    });
    leftBarDiv.appendChild(titleDiv);

    // Description:
    let descriptionDiv = document.createElement("textarea");
    descriptionDiv.classList.add("bigTaskDescription");
    descriptionDiv.setAttribute("placeholder", "Enter task description");
    descriptionDiv.innerText = task.description;
    descriptionDiv.addEventListener("keyup", () => {
        task.description = descriptionDiv.value;
    });
    leftBarDiv.appendChild(descriptionDiv);
    taskDiv.appendChild(leftBarDiv);

    // Right bar:
    let rightBarDiv = document.createElement("div");
    rightBarDiv.classList.add("bigTaskRightBar");
    // Users:
    let usersDiv = document.createElement("div");
    usersDiv.classList.add("bigTaskUserWrap");
    usersDiv.setAttribute("taskID", task.ID);
    // Owners:
    let ownersDiv = document.createElement("div");
    ownersDiv.classList.add("bigTaskOwnersWrap");
    usersDiv.appendChild(ownersDiv);
    task.owners.forEach(owner => {
        let userDiv = document.createElement("div");
        userDiv.classList.add("bigTaskUser");
        let ownerDiv = document.createElement("div");
        ownerDiv.classList.add("bigTaskUserIcon");
        ownerDiv.classList.add("bigTaskOwner");
        ownerDiv.innerText = owner.shortName;
        let ownerNameDiv = document.createElement("div");
        ownerNameDiv.classList.add("bigTaskUserName");
        ownerNameDiv.innerText = owner.fullName;
        userDiv.appendChild(ownerDiv);
        userDiv.appendChild(ownerNameDiv);
        ownersDiv.appendChild(userDiv);
        // Remove owner event
        ownerDiv.addEventListener("click", () => {
            task.removeOwner(owner.ID);
            userDiv.parentElement.removeChild(userDiv);
        });
    });
    // Members:
    let membersDiv = document.createElement("div");
    membersDiv.classList.add("bigTaskMembersWrap");
    usersDiv.appendChild(membersDiv);
    task.members.forEach(member => {
        let userDiv = document.createElement("div");
        userDiv.classList.add("bigTaskUser");
        let memberDiv = document.createElement("div");
        memberDiv.classList.add("bigTaskUserIcon");
        memberDiv.classList.add("bigTaskMember");
        memberDiv.innerText = member.shortName;
        let memberNameDiv = document.createElement("div");
        memberNameDiv.classList.add("bigTaskUserName");
        memberNameDiv.innerText = member.fullName;
        userDiv.appendChild(memberDiv);
        userDiv.appendChild(memberNameDiv);
        membersDiv.appendChild(userDiv);
        // Remove member event
        memberDiv.addEventListener("click", () => {
            task.removeMember(member.ID);
            userDiv.parentElement.removeChild(userDiv);
        });
    });

    // Add users:
    let addUserButtonsDiv = document.createElement("div");
    addUserButtonsDiv.classList.add("bigTaskAddUserButtonsWrap");
    usersDiv.appendChild(addUserButtonsDiv);
    // Add new owner:
    let newOwnerButton = document.createElement("button");
    newOwnerButton.classList.add("bigTaskAddUserButton");
    newOwnerButton.classList.add("bigTaskOwner");
    newOwnerButton.classList.add("bigTaskUserIcon");
    newOwnerButton.innerText = "+";
    let addUserDiv = document.createElement("div");
    addUserDiv.classList.add("bigTaskNewUserWrap");
    newOwnerButton.onclick = function() {
        addUserDiv.innerHTML = "";

        // Filter out existing owners and members
        let newUsersArray = Array.from(User.array);
        newUsersArray = newUsersArray.filter(user => !task.members.some(member => member.ID == user.ID));
        newUsersArray = newUsersArray.filter(user => !task.owners.some(member => member.ID == user.ID));

        // Make list of users
        newUsersArray.forEach(user => {
            let userDiv = document.createElement("div");
            userDiv.classList.add("bigTaskNewUser");
            let memberDiv = document.createElement("div");
            memberDiv.classList.add("bigTaskUserIcon");
            memberDiv.classList.add("bigTaskOwner");
            memberDiv.innerText = user.shortName;
            let memberNameDiv = document.createElement("div");
            memberNameDiv.classList.add("bigTaskUserName");
            memberNameDiv.innerText = user.fullName;
            userDiv.appendChild(memberDiv);
            userDiv.appendChild(memberNameDiv);
            addUserDiv.appendChild(userDiv);
            memberDiv.onclick = function() {
                addUserDiv.innerHTML = '';
                task.addOwner(user.ID);
                memberDiv.onclick = null;
                memberDiv.addEventListener("click", () => {
                    task.removeOwner(user.ID);
                    userDiv.parentElement.removeChild(userDiv);
                });
                userDiv.classList.remove("bigTaskNewUser");
                userDiv.classList.add("bigTaskUser");
                ownersDiv.appendChild(userDiv);
            }
        })
    };
    addUserButtonsDiv.appendChild(newOwnerButton);
    // Add new member:
    let newMemberButton = document.createElement("button");
    newMemberButton.classList.add("bigTaskAddUserButton");
    newMemberButton.classList.add("bigTaskMember");
    newMemberButton.classList.add("bigTaskUserIcon");
    newMemberButton.innerText = "+";
    newMemberButton.onclick = function() {
        addUserDiv.innerHTML = "";

        // Filter out existing owners and  members
        let newUsersArray = Array.from(User.array);
        newUsersArray = newUsersArray.filter(user => !task.members.some(member => member.ID == user.ID));
        newUsersArray = newUsersArray.filter(user => !task.owners.some(member => member.ID == user.ID));

        // Make list of users
        newUsersArray.forEach(user => {
            let userDiv = document.createElement("div");
            userDiv.classList.add("bigTaskNewUser");
            let memberDiv = document.createElement("div");
            memberDiv.classList.add("bigTaskUserIcon");
            memberDiv.classList.add("bigTaskMember");
            memberDiv.innerText = user.shortName;
            let memberNameDiv = document.createElement("div");
            memberNameDiv.classList.add("bigTaskUserName");
            memberNameDiv.innerText = user.fullName;
            userDiv.appendChild(memberDiv);
            userDiv.appendChild(memberNameDiv);
            addUserDiv.appendChild(userDiv);
            memberDiv.onclick = function() {
                addUserDiv.innerHTML = '';
                task.addMember(user.ID);
                memberDiv.onclick = null;
                memberDiv.addEventListener("click", () => {
                    task.removeMember(user.ID);
                    userDiv.parentElement.removeChild(userDiv);
                });
                userDiv.classList.remove("bigTaskNewUser");
                userDiv.classList.add("bigTaskUser");
                membersDiv.appendChild(userDiv);
            }
        })
    };
    addUserButtonsDiv.appendChild(newMemberButton);

    usersDiv.appendChild(addUserDiv);
    rightBarDiv.appendChild(usersDiv);

    // Countdown:
    let countdownDiv = document.createElement("div");
    countdownDiv.classList.add("bigTaskCountdown");
    let countdownDaysDiv = document.createElement("div");
    countdownDaysDiv.classList.add("bigTaskCountdownDaysUnit");

    let dayUnit = "DAYS";
    if (task.daysToDeadline() === 1) {dayUnit = "DAY"}
    let dayUnitDiv = document.createElement("div");
    dayUnitDiv.classList.add("bigTaskCountdownUnit");
    dayUnitDiv.innerText = dayUnit;

    let days = appendLeadingZeroes(task.daysToDeadline());
    let daysDiv = document.createElement("div");
    daysDiv.classList.add("bigTaskCountdownDays");
    daysDiv.innerText = days;

    countdownDaysDiv.appendChild(daysDiv);
    countdownDaysDiv.appendChild(dayUnitDiv);
    countdownDiv.appendChild(countdownDaysDiv);
    rightBarDiv.appendChild(countdownDiv);
    // Compose
    taskDiv.appendChild(rightBarDiv);

    let chartDiv = document.createElement("div");
    chartDiv.classList.add("bigTaskCountdownChart");
    countdownDiv.appendChild(chartDiv);
    buildChart(task, chartDiv);


    // Project:
    let project = Project.array.find(project => project.tasks.find(projectTask => projectTask.ID == task.ID));
    let projectDiv = document.createElement("div");
    projectDiv.classList.add("bigTaskProject");
    projectDiv.classList.add("pointer");
    projectDiv.setAttribute("taskID", task.ID);
    projectDiv.setAttribute("projectID", project.ID);
    let projectText = document.createElement("div");
    projectText.classList.add("bigTaskProjectText");
    projectText.innerText = "Project:";
    projectDiv.appendChild(projectText);
    let projectName = document.createElement("div");
    projectName.classList.add("bigTaskProjectName");
    projectName.innerText = task.getProject().title;
    projectDiv.appendChild(projectName);
    projectDiv.addEventListener("click", () => {
        renderProjectView(project);
    });
    taskDiv.appendChild(projectDiv);

    // Start date:
    let startDateDiv = document.createElement("div");
    startDateDiv.classList.add("bigTaskDate");
    startDateDiv.classList.add("bigTaskStartDate");
    let startDateInput = document.createElement("input");
    startDateInput.setAttribute("type", "date");
    startDateInput.style.fontSize = "98%";
    startDateInput.setAttribute("value", task.startDate.toISOString().substr(0, 10));
    startDateInput.addEventListener("change", () => {
        task.startDate = new Date(startDateInput.value);
    });
    startDateInput.addEventListener("blur", () => {
        renderBigTask(task);
    })
    startDateDiv.innerHTML = "Start: ";
    startDateDiv.appendChild(startDateInput);
    taskDiv.appendChild(startDateDiv);

    // End date:
    let endDateDiv = document.createElement("div");
    endDateDiv.classList.add("bigTaskDate");
    endDateDiv.classList.add("bigTaskEndDate");
    let endDateInput = document.createElement("input");
    endDateInput.setAttribute("type", "date");
    endDateInput.style.fontSize = "98%";
    endDateInput.setAttribute("value", task.endDate.toISOString().substr(0, 10));
    endDateInput.addEventListener("change", () => {
        task.endDate = new Date(endDateInput.value);
    });
    endDateInput.addEventListener("blur", () => {
        renderBigTask(task);
    })
    endDateDiv.innerHTML = "End: ";
    endDateDiv.appendChild(endDateInput);
    taskDiv.appendChild(endDateDiv);

    // Add TASK and PROJECT to HEADER
    let headerDashboardButton = document.getElementById("headerButtonDashboard");
    headerDashboardButton.classList.remove("active");
    let headerProjectButton = document.getElementById("headerButtonProject");
    headerProjectButton.classList.remove("active");
    headerProjectButton.classList.remove("invisible");
    headerProjectButton.onclick = function() {
        renderProjectView(project);
    };
    headerProjectButton.innerText = project.title;
    let headerTaskButton = document.getElementById("headerButtonTask");
    headerTaskButton.classList.add("active");
    headerTaskButton.classList.remove("invisible");
    headerTaskButton.onclick = function() {
        renderBigTask(task);
    };
    headerTaskButton.innerText = task.title;
    let slash1 = document.getElementById("slash1");
    slash1.classList.remove("invisible");
    let slash2 = document.getElementById("slash2");
    slash2.classList.remove("invisible");
}

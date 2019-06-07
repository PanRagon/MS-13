function renderProjectView(project) {
    let projectContainerDiv = document.getElementById("renderContainer");
    projectContainerDiv.innerHTML = '';

    // Scroll to top
    window.scrollTo(0, 0);

    let projectDiv = document.createElement("div");
    projectDiv.classList.add("projectViewProject");

    // TopBar:
    let topBarDiv = document.createElement("div");
    topBarDiv.classList.add("projectViewTopBar");
        // Start date:
    let startDateDiv = document.createElement("input");
    startDateDiv.classList.add("projectViewDate");
    startDateDiv.classList.add("projectViewStartDate");
    startDateDiv.setAttribute("type", "date");
    startDateDiv.setAttribute("value", project.startDate.toISOString().substr(0, 10));
    startDateDiv.addEventListener("change", () => {
        project.startDate = new Date(startDateDiv.value);
    });
    topBarDiv.appendChild(startDateDiv);
        // Title:
    let titleDiv = document.createElement("input");
    titleDiv.classList.add("projectViewTitle");
    titleDiv.setAttribute("projectID", project.ID);
    titleDiv.setAttribute("type", "text");
    titleDiv.setAttribute("value", project.title);
    titleDiv.addEventListener("keyup", () => {
        project.title = titleDiv.value;
    });
    topBarDiv.appendChild(titleDiv);
        // End date:
    let endDateDiv = document.createElement("input");
    endDateDiv.classList.add("projectViewDate");
    endDateDiv.classList.add("projectViewEndDate");
    endDateDiv.setAttribute("type", "date");
    endDateDiv.setAttribute("value", project.endDate.toISOString().substr(0, 10));
    endDateDiv.addEventListener("change", () => {
        project.endDate = new Date(endDateDiv.value);
    });
    topBarDiv.appendChild(endDateDiv);
    projectDiv.appendChild(topBarDiv);

    // DropDown
    let dropDownDiv = document.createElement("div");
    dropDownDiv.classList.add("projectViewDropDown");
        // Description:
    let descriptionDiv = document.createElement("textarea");
    descriptionDiv.classList.add("projectViewDescription");
    descriptionDiv.innerText = project.description;
    dropDownDiv.appendChild(descriptionDiv);
    descriptionDiv.addEventListener("keyup", () => {
        project.description = descriptionDiv.value;
    })
        // USER GENERATION:
    let usersDiv = document.createElement("div");
    usersDiv.classList.add("projectViewUserWrap");
        // Owners:
    let ownersDiv = document.createElement("div");
    ownersDiv.classList.add("bigTaskOwnersWrap");
    usersDiv.appendChild(ownersDiv);
    project.owners.forEach(owner => {
        let userDiv = document.createElement("div");
        userDiv.classList.add("projectViewUser");
        userDiv.setAttribute("projectID", project.ID);
        let ownerDiv = document.createElement("div");
        ownerDiv.classList.add("projectViewUserIcon");
        ownerDiv.classList.add("projectViewOwner");
        ownerDiv.innerText = owner.shortName;
        let ownerNameDiv = document.createElement("div");
        ownerNameDiv.classList.add("projectViewUserName");
        ownerNameDiv.innerText = owner.fullName;
        userDiv.appendChild(ownerDiv);
        userDiv.appendChild(ownerNameDiv);
        ownerDiv.addEventListener("click", () => {
            project.removeOwner(owner.ID);
            userDiv.parentElement.removeChild(userDiv);
        });
        ownersDiv.appendChild(userDiv);
    });
        // Members:
    let membersDiv = document.createElement("div");
    membersDiv.classList.add("bigTaskMembersWrap");
    usersDiv.appendChild(membersDiv);
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
        memberDiv.addEventListener("click", () => {
            project.removeMember(member.ID);
            userDiv.parentElement.removeChild(userDiv);
        });
        membersDiv.appendChild(userDiv);
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
    newOwnerButton.onclick = function() {
        addUserDiv.innerHTML = "";

        // Filter out existing owners and members
        let newUsersArray = Array.from(User.array);
        newUsersArray = newUsersArray.filter(user => !project.members.some(member => member.ID == user.ID));
        newUsersArray = newUsersArray.filter(user => !project.owners.some(member => member.ID == user.ID));

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
                project.addOwner(user.ID);
                memberDiv.onclick = null;
                memberDiv.addEventListener("click", () => {
                    project.removeOwner(user.ID);
                    userDiv.parentElement.removeChild(userDiv);
                });
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

        // Filter out existing owners and members
        let newUsersArray = Array.from(User.array);
        newUsersArray = newUsersArray.filter(user => !project.members.some(member => member.ID == user.ID));
        newUsersArray = newUsersArray.filter(user => !project.owners.some(member => member.ID == user.ID));

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
                project.addMember(user.ID);
                memberDiv.onclick = null;
                memberDiv.addEventListener("click", () => {
                    project.removeMember(user.ID);
                    userDiv.parentElement.removeChild(userDiv);
                });
                ownersDiv.appendChild(userDiv);
            }
        })
    };
    addUserButtonsDiv.appendChild(newMemberButton);

    usersDiv.appendChild(addUserDiv);

    // Compose:
    dropDownDiv.appendChild(usersDiv);
    projectDiv.appendChild(dropDownDiv);

    // TASKS:
    let taskWrapDiv = document.createElement("div");
    taskWrapDiv.classList.add("projectViewTaskWrap");

    // To-Do:
    let toDoDiv = document.createElement("div");
    toDoDiv.setAttribute("status", "ToDo");
    toDoDiv.classList.add("projectViewToDoWrap");
    toDoDiv.classList.add("projectViewStatusWrap");
        // Header / Title
    let toDoHeaderDiv = document.createElement("div");
    toDoHeaderDiv.classList.add("projectViewStatusTitle");
    toDoHeaderDiv.classList.add("projectViewStatusTitleToDo");
    toDoHeaderDiv.innerText = project.tasks.filter(task => task.status.toLowerCase() === "todo").length.toString() + " To do";
    toDoDiv.appendChild(toDoHeaderDiv);

    // In progress:
    let inProgressDiv = document.createElement("div");
    inProgressDiv.setAttribute("status", "InProgress");
    inProgressDiv.classList.add("projectViewInProgressWrap");
    inProgressDiv.classList.add("projectViewStatusWrap");
    // Header / Title
    let inProgressHeaderDiv = document.createElement("div");
    inProgressHeaderDiv.classList.add("projectViewStatusTitle");
    inProgressHeaderDiv.classList.add("projectViewStatusTitleInProgress");
    inProgressHeaderDiv.innerText = project.tasks.filter(task => task.status.toLowerCase() === "inprogress").length.toString() 
    + " In progress";
    inProgressDiv.appendChild(inProgressHeaderDiv);

    // Done
    let doneDiv = document.createElement("div");
    doneDiv.setAttribute("status", "Done");
    doneDiv.classList.add("projectViewDoneWrap");
    doneDiv.classList.add("projectViewStatusWrap");
    // Header / Title
    let doneHeaderDiv = document.createElement("div");
    doneHeaderDiv.classList.add("projectViewStatusTitle");
    doneHeaderDiv.classList.add("projectViewStatusTitleDone");
    doneHeaderDiv.innerText = project.tasks.filter(task => task.status.toLowerCase() === "done").length.toString() + " Done";
    doneDiv.appendChild(doneHeaderDiv);

    // Render tasks
    project.tasks.forEach(task => {
        let taskDiv = document.createElement("div");
        taskDiv.classList.add("projectViewTask");
        taskDiv.setAttribute("taskID", task.ID);
        taskDiv.setAttribute("draggable", true);
        taskDiv.addEventListener("click", () => {
            renderBigTask(Task.array.find(task => task.ID == taskDiv.getAttribute("taskid")));
        });
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
        // End date
        let endDateDiv = document.createElement("div");
        endDateDiv.classList.add("projectViewTaskEndDate");
        endDateDiv.setAttribute("taskID", task.ID);
        endDateDiv.innerText = dayMonthDateFormatter(task.endDate);
        taskDiv.appendChild(endDateDiv);

        // Render to correct column:
        if (task.status.toLowerCase() === "todo") {
            taskDiv.classList.add("projectViewTaskToDo");
            toDoDiv.appendChild(taskDiv);
        } else if (task.status.toLowerCase() === "inprogress") {
            taskDiv.classList.add("projectViewTaskInProgress");
            inProgressDiv.appendChild(taskDiv);
        } else if (task.status.toLowerCase() === "done") {
            taskDiv.classList.add("projectViewTaskDone");
            doneDiv.appendChild(taskDiv);
        }
    });
    taskWrapDiv.appendChild(toDoDiv);
    taskWrapDiv.appendChild(inProgressDiv);
    taskWrapDiv.appendChild(doneDiv);
    // Compose:
    projectDiv.appendChild(taskWrapDiv);

    // Render project to container
    projectContainerDiv.appendChild(projectDiv);

    let newTaskDiv = document.createElement("div");

    let newTaskButton = document.createElement("button");
    newTaskButton.innerText = "Create a new task";

    let newTaskInput = document.createElement("input");
    newTaskInput.setAttribute("type", "text");
    newTaskDiv.appendChild(newTaskInput);
    newTaskDiv.appendChild(newTaskButton);

    newTaskButton.addEventListener("click", () => {
        if(newTaskInput.value != "") {
            new Task(project.ID, newTaskInput.value);
            renderBigTask(Task.array[Task.array.length-1]);
        }
    })

    newTaskInput.addEventListener("keyup", function(event) {
        if(event.keyCode === 13) {
            new Task(project.ID, newTaskInput.value);
            renderBigTask(Task.array[Task.array.length-1]);
        }
    })

    projectDiv.appendChild(newTaskDiv);

    // Initialize Drag&Drop
    DragDrop.init();

    // Add TASK and PROJECT to HEADER
    let headerDashboardButton = document.getElementById("headerButtonDashboard");
    headerDashboardButton.classList.remove("active");
    let headerProjectButton = document.getElementById("headerButtonProject");
    headerProjectButton.classList.add("active");
    headerProjectButton.classList.remove("invisible");
    headerProjectButton.onclick = function() {
        renderProjectView(project);
    };
    headerProjectButton.innerText = project.title;
    let headerTaskButton = document.getElementById("headerButtonTask");
    headerTaskButton.classList.add("invisible");
    headerTaskButton.classList.remove("active");
    let slash1 = document.getElementById("slash1");
    slash1.classList.remove("invisible");
    let slash2 = document.getElementById("slash2");
    slash2.classList.add("invisible");
}

function updateProjectViewCounters() {
    let toDoCounter = document.querySelector('.projectViewStatusTitleToDo');
    toDoCounter.innerHTML = document.getElementsByClassName("projectViewTaskToDo").length.toString() + " To do";
    let inProgressCounter = document.querySelector('.projectViewStatusTitleInProgress');
    inProgressCounter.innerHTML = document.getElementsByClassName("projectViewTaskInProgress").length.toString() + " In progress";
    let doneCounter = document.querySelector('.projectViewStatusTitleDone');
    doneCounter.innerHTML = document.getElementsByClassName("projectViewTaskDone").length.toString() + " Done";
}
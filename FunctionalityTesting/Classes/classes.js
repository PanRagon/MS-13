/*
----------------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------------
	USER & ADDRESS CLASS
----------------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------------
*/


//Nested function used to define unique ID in User constructor
var countIDUser = (function() {
	var id = 1;
	return function() { 
   		return id++; 
	};
})();

var countIDAddress = (function() {
	var id = 1;
	return function() { 
   		return id++; 
	};
})();

//Array of users
var users = [];

//Declare output divs
var outputDiv = document.getElementById("div1")

//var userElement = document.getElementById("div1");

//User constructor
function User(firstName, middleName, lastName, email) {
	this.ID = countIDUser();
	this.firstName = firstName;
	this.lastName = lastName;
	this.middleName = middleName;
		//Remove middle name if user has none
		if(this.middleName === undefined || this.middleName === null || this.middleName === "") {
			delete this.middleName;
			this.fullName = this.firstName + " " + this.lastName;
		} else {
			this.fullName = this.firstName + " " + this.middleName + " " + this.lastName + " ";
		}
	this.email = email;
	this.log = [];
		
  //Create the user in HTML
		var el = document.createElement("p");
		el.innerHTML = "This is user " + this.ID + 
		"<br> name: " + this.fullName +
		"<br> email: " + email;
		outputDiv.appendChild(el);

	//Push this user into array
	users.push(this);
}

//Array of addresses
var addresses = [];

//Nested function used to create ID in Address constructor
var countIDAddress = (function() {
	var id = 1;
	return function() { 
		return id++; 
	};
})();

//Address constructor
function Address(street, postcode, city, state, country) {
	this.ID = countIDAddress();
	this.street = street;
	this.postcode = postcode;
	this.city = city;
	this.state = state;
	this.country = country;

	addresses.push(this);
}

//Creation of users
var user1 = new User("Christian", "N.", "Iversen", "christian.nicolai.iversen@gmail.com");
var user2 = new User("Erik", "Magnus Eriksen", "Olseng", "eolseng@gmail.com");
var user3 = new User("Gyda", "Lovise", "Hjemaas", "gyda.hjemaas@gmail.com");
var user4 = new User("Morten", "Lervik", "Sandvold", "morten.sandvold@gmail.com");
var user5 = new User("Ludvik", "", "Blunck", "ludvik.blunck@gmail.com");

//Address setter
function setAddress(user, street, postcode, city, state, country) {
	Object.defineProperty(user, "address", {
		value : address = new Address(street, postcode, city, state, country),
		writable: true
	});
}

setAddress(user1, "Street 2", 0070, "City", "Oslo", "Norway");
setAddress(user2, "Street 44", 0070, "City", "Oslo", "Norway");


console.log(users);
console.log(addresses);


/*
----------------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------------
	PROJECT CLASS
----------------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------------
*/


//Nested function used to create ID in constructor
var countIDProject = (function() {
   	var id = 1;
   	return function() { 
   		return id++; 
   	};
})();

//Array of projects
var projects = [];

//Project constructor
function Project(title) {
	this.ID = countIDProject();
	this.title = title;
	this.log = [];
  
	//Push this project into array
	projects.push(this);
}

//Setters
function setProjectDescription(project, description) {
	Object.defineProperty(project, "description", {
		value: description,
		writable: true
	})
}

function setProjectStartDate(project, date) {
	Object.defineProperty(project, "startDate", {
		value: date,
		writable: true
	})
}

function setProjectEndDate(project, date) {
	Object.defineProperty(project, "endDate", {
		value: date,
		writable: true
	})
}

function setProjectOwners(project, owners) {
	Object.defineProperty(project, "owners", {
		value: owners,
		writable: true
	})
}

function setProjectMembers(project, members) {
	Object.defineProperty(project, "members", {
		value: members,
		writable: true
	})
}

function setTask(project, task) {
	Object.defineProperty(project, "task", {
		value: task,
		writable: true
	})
}

function getUserProjects(userID) {
	return projects.filter(project => project.members.find(member => member.ID === userID) || project.owners.find(owner => owner.ID === userID));
}


/*
----------------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------------
	ROLE CLASS
----------------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------------
*/


//Nested function used to define unique ID in Role constructor
var countIDRole = (function() {
	var id = 1;
	return function() { 
   		return id++; 
	};
})();

var roles = [];

function Role(name, level, type) {
	this.ID = countIDRole();
	this.name = name;
	this.level = level;
	this.type = type;

		if(level < 0) {
			console.log("The access level is too low, use a value between 0 and 10");
			delete this;
		} else if(level > 10) {
			console.log("The access level is too high, use a value between 0 and 10");
			delete this;
		}

	roles.push(this);
}

new Role("Project admin", 10, "Administrator");

new Role("Head of Design", 8, "Designer");

new Role("Code Monkey", 2, "Developer");

new Role("Pixel Pusher", 2, "Designer");

console.log(roles);


/*
----------------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------------
	TASK CLASS
----------------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------------
*/


//Nested function used to create ID in constructor of task
var countIDTask = (function() {
   	var id = 1;
	return function() { 
		return id++; 
   	};
})();

//Array of tasks
var tasks = []

//Task constructor
function Task(title) {
	this.ID = countIDTask();
	this.title = title;
	this.status = "TODO";
	this.log = [];
	//Push this task into array
  tasks.push(this);
}

//Nested function used to create ID in constructor of category
var countIDCategory = (function() {
	var id = 1;
	return function() { 
		return id++; 
	};
});

//Category constructor
function Category(name) {
	this.name = name;
	this.ID = countIDCategory();
}

//Setters
function setTaskDescription(task, description) {
	Object.defineProperty(task, "description", {
		value: description,
		writable: true
	})
}

function setTaskStartDate(task, date) {
	Object.defineProperty(task, "startDate", {
		value: date,
		writable: true
	})
}

function setTaskEndDate(task, date) {
	Object.defineProperty(task, "endDate", {
		value: date,
		writable: true
	})
}

function setTaskOwners(task, owners) {
	Object.defineProperty(task, "owners", {
		value: owners,
		writable: true
	})
}

function setTaskMembers(task, members) {
	Object.defineProperty(task, "members", {
		value: members,
		writable: true
	})
}

// Find all tasks assigned to a user (both owner and member).
function getUserTasks(userID) {
	return tasks.filter(task => task.members.find(member => member.ID === userID) || task.owners.find(owner => owner.ID === userID));
}

//Building tasks
var task1 = new Task("Make graphics");

var task2 = new Task("Build an engine");

var task3 = new Task("Eat pie");

setTaskDescription(task1, "Make it look nice");

setTaskStartDate(task1, "24.05.2019");

setTaskEndDate(task1, "30.06.2019");

setTaskOwners(task1, [user2, user5]);

setTaskMembers(task1, [user4]);

setTaskDescription(task2, "Make it run without any bullshit lag, please!");

setTaskStartDate(task2, "10.05.2019");

setTaskEndDate(task2, "11.01.2020");

setTaskOwners(task2, [user1, user3]);

setTaskMembers(task2, [user4, user5]);

setTaskDescription(task3, "Must make the best pie and eat it");

setTaskStartDate(task3, "12.10.2019");

setTaskEndDate(task3, "13.10.2010");

setTaskOwners(task3, [user1, user3]);

setTaskMembers(task3, [user4, user5]);

// console.log(tasks);


/*
----------------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------------
	LOG CLASS
----------------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------------
*/

// Temp. log array for unhandled types
var logArray = [];

// Counter for log IDs
let countIDLog = (function () {
	var id = 0;
	return function () { return id++;}
})();

// Appends a leading zero if input ≤ 9
function appendLeadingZeroes(n){
	if(n <= 9){
		return "0" + n;
	}
	return n
}
// Formats Date-object into "YYYY-MM-DD HH:MM:SS" string
function dateFormatter(date){
	return date.getFullYear() + "-" + appendLeadingZeroes(date.getMonth() + 1) + "-" + appendLeadingZeroes(date.getDate()) + " " + appendLeadingZeroes(date.getHours()) + ":" + appendLeadingZeroes(date.getMinutes()) + ":" + appendLeadingZeroes(date.getSeconds())
}

// Types must be "User", "Project" or "Task". Else
class Log {
	constructor(loggerID, type, typeID, action) {
		this.ID = countIDLog();
		this.loggerID = loggerID;
		this.date = dateFormatter(new Date());
		this.type = type;
		this.typeID = typeID;
		this.action = action;

		// Find target-array for log
		let target = this.type === "User" ? users : this.type === "Project" ? projects : this.type === "Task" ? tasks : logArray;
		// Push Log to target log array
		if (target === logArray) {
			alert("Error: Wrong input type for log ID " + this.ID + ". " + this.type + " is not a valid log type.");
		}
		else {
			// Push to target array and logArray (for easier data extraction)
			target.find(element => element.ID === this.typeID).log.push(this);
			logArray.push(this);
		}
	}
}

function getUserLogs(userID) {
	return logArray.filter(log => log.loggerID === userID);
}

/*
----------------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------------
	CREATING PROJECTS
----------------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------------
*/


var project1 = new Project("Make a game");

setProjectDescription(project1, "We are going to make a new Fortnite and get rich!");

setProjectOwners(project1, [user1, user2]);

setProjectMembers(project1, [user3, user4, user5]);
setTask(project1, [task1, task2]);

// Creates a log to user with ID and prints to console
new Log(1, "User", 5, "Spist plomme");
console.table(users.find(e => e.ID === 5).log);
new Log(3, "Project", 1, "Laget kake");
console.table(projects.find(e => e.ID === 1).log);
new Log(3, "Task", 2, "Laget kake");
console.table(tasks.find(e => e.ID === 2).log);

console.table(project1);
/*
var project1Element = document.createElement("p")

//var checkOwnerProject1 = project1.owners.indexOf(this.ID = 1);
//console.log(checkOwnerProject1);
if (project1.owners.indexOf(user1) >= 0) {
	for(i=0; i <= project1.task.length; i++);
		if (project1.task[i].owners.indexOf(user1) >= 0) {
			console.log("got here");
			var myTasks = task1.title;
			console.log(myTasks)
	}
		project1Element.innerHTML = "<br> Welcome " + user1.firstName +
			"<br> This is your current project: <br>" + 
			project1.title + 
			"<br> Your tasks today are the following " +
			myTasks;

		outputDiv.appendChild(project1Element);
}
//	project1Element.innerhtml = ""
*/
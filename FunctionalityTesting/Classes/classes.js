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
	var ID = countIDUser();
	this.firstName = firstName;
	this.middleName = middleName;
		//Remove middle name if user has none
		if(this.middleName === undefined || this.middleName === null || this.middleName === "") {
			delete this.middleName;
		}
	this.lastName = lastName;
	this.fullName = this.firstName + " " + this.middleName + " " + this.lastName + " ";
	this.email = email;
	this.ID = ID;
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
	var ID = countIDAddress();
	this.street = street;
	this.postcode = postcode;
	this.city = city;
	this.state = state;
	this.country = country;
	this.ID = ID;

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

setAddress(user1, "Kunnskapsveien 10", 2007, "Kjeller", "Akershus", "Norway");
setAddress(user2, "oslo", 2007, "oslo", "debug", "oslo");


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
	var ID = countIDProject();
	this.title = title;
	this.ID = ID;
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
	var ID = countIDTask();
  	this.title = title;
  	this.status = "TODO";
  	this.ID = ID;
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

//Building tasks
var task1 = new Task("Make graphics");

var task2 = new Task("Build an engine");

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


console.log(tasks);



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


console.log(project1);

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
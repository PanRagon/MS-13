//Nested function used to create ID in constructor
var countID = (function() {
   var id = 1;
   return function() { return id++; };
})();

//Array of projects
var projects = [];

//Constructor for project class
function Project(title) {
	this.title = title;
	this.ID = countID();
	//Push this project into array
	projects.push(this);
}

var project1 = new Project("Make a game");

var project2 = new Project("Wake up mom");

console.log(projects);
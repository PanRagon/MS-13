//Nested function used to create ID in constructor
var countID = (function() {
   var id = 1;
   return function() { return id++; };
})();

//Array of taskts
var tasks = []

//Constructor for task class
function Task(title) {
  this.title = title;
  this.status = "TODO";
  this.ID = countID();
  //Push this task into array
  tasks.push(this);
}

var arrayOwners1 = ["John", "Michael"];

var arrayWorkers1 = ["Grete", "Stefan", "Louise"];

var task1 = new Task("Fortnite");

console.log(task1);

var task2 = new Task("Tørke støv");

console.log(task2);

var task3 = new Task("meh");

console.log(task3);

console.log(tasks);
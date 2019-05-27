//Creation of users
var user1 = new User("Christian", "N.", "Iversen", "christian.nicolai.iversen@gmail.com");
var user2 = new User("Erik", "Magnus Eriksen", "Olseng", "eolseng@gmail.com");
var user3 = new User("Gyda", "Lovise", "Hjemaas", "gyda.hjemaas@gmail.com");
var user4 = new User("Morten", "Lervik", "Sandvold", "morten.sandvold@gmail.com");
var user5 = new User("Ludvik", "", "Blunck", "ludvik.blunck@gmail.com");

setAddress(user1, "Street 2", 0070, "City", "Oslo", "Norway");
setAddress(user2, "Street 44", 0070, "City", "Oslo", "Norway");


console.log(users);
console.log(addresses);

//Creation of roles
new Role("Project admin", 10, "Administrator");
new Role("Head of Design", 8, "Designer");
new Role("Code Monkey", 2, "Developer");
new Role("Pixel Pusher", 2, "Designer");

console.log(roles);

//Creation of tasks

var task1 = new Task("Make graphics");
setTaskDescription(task1, "Make it look nice");
setTaskStartDate(task1, "24.05.2019");
setTaskEndDate(task1, "30.06.2019");
setTaskOwners(task1, [user2, user5]);
setTaskMembers(task1, [user4]);

var task2 = new Task("Build an engine");
setTaskDescription(task2, "Make it run without any bullshit lag, please!");
setTaskStartDate(task2, "10.05.2019");
setTaskEndDate(task2, "11.01.2020");
setTaskOwners(task2, [user1, user3]);
setTaskMembers(task2, [user4, user5]);

var task3 = new Task("Eat pie");
setTaskDescription(task3, "Must make the best pie and eat it");
setTaskStartDate(task3, "12.10.2019");
setTaskEndDate(task3, "13.10.2010");
setTaskOwners(task3, [user1, user3]);
setTaskMembers(task3, [user4, user5]);

console.log(tasks);


//Creation of projects
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
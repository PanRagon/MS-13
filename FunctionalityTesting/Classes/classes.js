/* ----------------------------------------------------------------------------------------------------
§
§   * CLASS FILE 2.0:
$
§   * All classes has a Class.setup method for testing
§   * Must be called in this order:
§   -   User.setup(); Project.setup(); TaskCategory.setup(); Task.setup(), Log.setup();
§
§
§   * Only use Date()-objects for startDate and endDate
$   * Input of month must be 1 lower than expected (0 = January, 1 = February etc.)
§   -   new Date(2019, 4, 31); results in the date 31.05.2019
§
§   * addOwner- and addMember-methods accept userID-number.
§
§   * Log must have STRING of value "user", "project" og "task" as type-input!
§   -   new Log(1, "task", 0, "Called Dog.bark();");
§
---------------------------------------------------------------------------------------------------- */

class User {

	static array = [];
	static idCounter = 0;

	constructor (firstName, middleName, lastName, email, location) {
		this.ID = User.idCounter++;
		this.log = [];
		this.firstName = firstName;
		this.middleName = middleName;
		this.lastName = lastName;
		this.setFullName();
		this.email = email;
		this.location = location;

		// Push to global User-array
		User.array.push(this)
	}

	// SETTERS:
	setFirstName(firstName) {
		this.firstName = firstName;
		this.setFullName();
	}

	setMiddleName(middleName) {
		this.middleName = middleName;
		this.setFullName();
	}

	setLastName(lastName) {
		this.lastName = lastName;
		this.setFullName();
	}

	setFullName(){
		if(this.middleName === undefined || this.middleName === null || this.middleName === "") {
			this.fullName = this.firstName + " " + this.lastName;
		} else {
			this.fullName = this.firstName + " " + this.middleName + " " + this.lastName ;
		}
	}

	setEmail(email) {
		this.email = email;
	}

	setLocation(location) {
		this.location = location;
	}

	// GETTERS:
	getProjects() {
		return Project.array.filter(project => project.members.find(member => member.ID === this.ID) || project.owners.find(owner => owner.ID === this.ID));
	}

	getTasks() {
		return Task.array.filter(task => task.members.find(member => member.ID === this.ID) || task.owners.find(owner => owner.ID === this.ID));
	}

	getLogs() {
		return Log.array.filter(log => log.loggerID === this.ID);
	}

	static setup() {
		new User("Erik", "Magnus Eriksen", "Olseng", "e.olseng@gmail.com", "Oslo, Norway");
		new User("Christian", "N.", "Iversen", "christian.nicolai.iversen@gmail.com"), "Oslo, Norway";
		new User("Gyda", "Lovise", "Hjemaas", "gyda.hjemaas@gmail.com", "Oslo Norway");
		new User("Morten", "Lervik", "Sandvold", "morten.sandvold@gmail.com", "Bardufoss, Norway");
		new User("Ludvik", "", "Blunck", "ludvik.blunck@gmail.com", "Stange, Norway");
	}
}

class Project {

	static array = [];
	static idCounter = 0;

	constructor(title) {
		this.ID = Project.idCounter++;
		this.log = [];
		this.title = title;
		this.description = null;
		this.startDate = null;
		this.endDate = null;
		this.owners = [];
		this.members = [];
		this.tasks =[];

		//Push to global Project-array
		Project.array.push(this);
	}

	// Setters
	setTitle(title) {
		this.title = title;
	}

	setDescription(description) {
		this.description = description;
	}

	setStartDate(startDate) {
		this.startDate = startDate;
	}

	setEndDate(endDate) {
		this.endDate = endDate;
	}

	// Adders
	addOwner(ownerID) {
		this.owners.push(User.array.find(user => user.ID === ownerID));
	}

	addMember(memberID) {
		this.members.push(User.array.find(user => user.ID === memberID));
	}

	addTask(task) {
		this.tasks.push(task);
	}

	// Removers
	removeOwner(ownerID) {
		this.owners = this.owners.filter(owner => owner.ID !== ownerID);
	}

	removeMember(memberID) {
		this.members = this.members.filter(member => member.ID !== memberID);
	}

	delete() {
		// Delete all logs on this Project
		this.log.forEach(log => log.delete());

		// Delete all logs on tasks on this Project
		this.tasks.forEach(task => task.log.forEach(log => log.delete()));

		// Delete all tasks on this Project
		this.tasks.forEach(task => task.delete());

		// Delete this Project
		Project.array = Project.array.filter(project => project.ID !== this.ID);
	}

	static setup() {
		new Project("Test løsningen");
		let testProject = Project.array.find(e => e.ID === 0);

		testProject.setTitle("Kose seg");
		testProject.setDescription("Vi må teste at prosjektet fungerer godt.");
		testProject.setStartDate(new Date());
		testProject.setEndDate(new Date(2019, 5, 7));
		//testProject.addOwner(User.array.find(user => user.firstName === "Erik"));
		testProject.addOwner(User.array.find(user => user.firstName === "Erik").ID);
		testProject.addMember(User.array.find(user => user.firstName === "Morten").ID);
	}
}

class Task {

	static array = [];
	static idCounter = 0;

	constructor(projectID, title) {
		this.ID = Task.idCounter++;
		this.log = [];
		this.status = "TODO";
		this.category = null;
		this.title = title;
		this.description = null;
		this.startDate = null;
		this.endDate = null;
		this.owners = [];
		this.members = [];

		// Push to target project Task-array
		Project.array.find(project => project.ID === projectID).tasks.push(this);
		// Push to gobal Task-array
		Task.array.push(this);
	}

	// Setters
	setStatus(status) {
		this.status = status;
	}

	setCategory(category) {
		this.category = category;
	}

	setTitle(title) {
		this.title = title;
	}

	setDescription(description) {
		this.description = description;
	}

	setStartDate(startDate) {
		this.startDate = startDate;
	}

	setEndDate(endDate) {
		this.endDate = endDate;
	}

	// Adders
	addOwner(ownerID) {
		this.owners.push(User.array.find(user => user.ID === ownerID));
	}

	addMember(memberID) {
		this.members.push(User.array.find(user => user.ID === memberID));
	}

	// Removers
	removeOwner(ownerID) {
		this.owners = this.owners.filter(owner => owner.ID !== ownerID);
	}

	removeMember(memberID) {
		this.members = this.members.filter(member => member.ID !== memberID);
	}

	delete() {
		Task.array = Task.array.filter(e => e.ID !== this.ID);
		Project.array.forEach(project => project.tasks = project.tasks.filter(task => task.ID !== this.ID));
	}

	static setup() {
		new Task(0, "Teste task");
		let testTask = Task.array.find(e => e.ID === 0);

		testTask.setStatus("InProgress");
		testTask.setCategory(TaskCategory.array.find(e => e.ID === 0));
		testTask.setTitle("Testing Tasks");
		testTask.setDescription("We need to test the Task class");
		testTask.setStartDate(new Date(2019, 4, 31));
		testTask.setEndDate(new Date(2019, 5, 30));
		testTask.addOwner(User.array.find(e => e.firstName === "Erik").ID);
		testTask.addMember(User.array.find(e => e.firstName === "Morten").ID);
	}
}

class TaskCategory {

	static array = [];
	static idCounter = 0;

	constructor(name) {
		this.ID = TaskCategory.idCounter++;
		this.name = name;

		// Push to global TaskCategory-array
		TaskCategory.array.push(this);
	}

	delete() {
		// Delete category from all tasks
		// Hjelp og trøste, denne ble syk
		// Gå igjennom hvert prosjekt. For hvert prosjekt gå igjennom alle tasks. For hver task se på kategorien sin ID. Er denne IDen samme verdi som this.ID - i så fall sett verdi til null, ellers la verdien stå.
		Project.array.forEach(project => project.tasks.forEach(task => task.category = task.category.ID === this.ID ? null : task.category));

		TaskCategory.array = TaskCategory.array.filter(e => e.ID !== this.ID);
	}

	static setup() {
		new TaskCategory("Development");
		new TaskCategory("UX");
	}
}

class Log {

	static array = [];
	static idCounter = 0;

	constructor(loggerID, type, typeID, action) {
		this.ID = Log.idCounter++;
		this.loggerID = loggerID;
		this.date = new Date();
		this.type = type.toLowerCase();;
		this.typeID = typeID;
		this.action = action;

		// Push to global Log-array
		Log.array.push(this);
		// Push to target array
		let target = this.type === "user" ? User.array : this.type === "project" ? Project.array : this.type === "task" ? Task.array : Log.array;
		if (target === Log.array){
			console.log("Error! Log ID " + this.ID + " has invalid type.");
		} else {
			target.find(element => element.ID === this.typeID).log.push(this);
		}
	}

	delete() {
		Log.array = Log.array.filter(log => log.ID !== this.ID);
		Task.array.forEach(task => task.log = task.log.filter(log => log.ID !== this.ID));
		Project.array.forEach(project => project.log = project.log.filter(log => log.ID !== this.ID));
		User.array.forEach(user => user.log = user.log.filter(log => log.ID !== this.ID));
	}

	static setup() {
		new Log(0, "user", 0, "Tested test task");
		new Log(2, "project", 0, "Tested test task");
		new Log(3, "task", 0, "Tested test task");
	}
}

User.setup();
Project.setup();
TaskCategory.setup();
Task.setup();
Log.setup();
console.log(Project.array);
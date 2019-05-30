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
		this.setShortName();
		this.setFullName();
		this.email = email;
		this.location = location;
		this.role = null;

		// Push to global User-array
		User.array.push(this)
	}

	// SETTERS:
	setFirstName(firstName) {
		this.firstName = firstName;
		this.setShortName();
		this.setFullName();
	}

	setMiddleName(middleName) {
		this.middleName = middleName;
		this.setShortName();
		this.setFullName();
	}

	setLastName(lastName) {
		this.lastName = lastName;
		this.setShortName();
		this.setFullName();
	}

	setShortName() {
		this.shortName = this.firstName.toString()[0] + this.lastName.toString()[0];
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

	setRole(role) {
		this.role = role;
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
		new User("Christian", "N.", "Iversen", "christian.nicolai.iversen@gmail.com", "Oslo, Norway");
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
		let testProject1 = Project.array.find(e => e.ID === 0);

		testProject1.setTitle("Kose seg");
		testProject1.setDescription("Vi må teste at prosjektet fungerer godt.");
		testProject1.setStartDate(new Date());
		testProject1.setEndDate(new Date(2019, 5, 7));
		testProject1.addOwner(User.array.find(user => user.firstName === "Erik").ID);
		testProject1.addMember(User.array.find(user => user.firstName === "Morten").ID);

		new Project("Org.ie Development");
		let testProject2 = Project.array.find(e => e.ID === 1);
		testProject2.setDescription("Create the best oranization solution ever - Org.ie");
		testProject2.setStartDate(new Date(2019, 5, 1));
		testProject2.setEndDate(new Date(2019, 6, 1));
		testProject2.addOwner(User.array.find(user => user.firstName === "Erik").ID);
		testProject2.addMember(User.array.find(user => user.firstName === "Gyda").ID);
		testProject2.addMember(User.array.find(user => user.firstName === "Christian").ID);
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
		this.priority = null;
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

	setPriority(priority) {
		this.priority = priority;
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

	// Methods:
	daysToDeadline() {
		let currentDate = getStartOfDate(new Date());
		let deadlineDate = getStartOfDate(this.endDate);
		return calculateDaysBetween(currentDate, deadlineDate);
	}

	getProject() {
		return Project.array.find(project => project.tasks.find(task => task.ID === this.ID));
	}

	delete() {
		Task.array = Task.array.filter(e => e.ID !== this.ID);
		Project.array.forEach(project => project.tasks = project.tasks.filter(task => task.ID !== this.ID));
	}

	static setup() {
		new Task(0, "Lage kalenderoversikt");
		let testTask = Task.array.find(e => e.ID === 0);
		testTask.setStatus("InProgress");
		testTask.setCategory(TaskCategory.array.find(e => e.ID === 0));
		testTask.setDescription("We need to test the Task class");
		testTask.setStartDate(new Date(2019, 4, 26, 12));
		testTask.setEndDate(new Date(2019, 5, 5));
		testTask.setPriority(1);
		testTask.addOwner(User.array.find(e => e.firstName === "Erik").ID);
		testTask.addMember(User.array.find(e => e.firstName === "Morten").ID);

		new Task(1, "Spise plommer");
		let testTask2 = Task.array.find(e => e.ID === 1);
		testTask2.setStatus("Done");
		testTask2.setCategory(TaskCategory.array.find(e => e.ID === 1));
		testTask2.setDescription("Det er et stort behov for oss å spise nok plommer");
		testTask2.setStartDate(new Date(2019, 5, 1));
		testTask2.setEndDate(new Date(2019, 5, 6));
		testTask2.setPriority(3);
		testTask2.addOwner(User.array.find(e => e.firstName === "Gyda").ID);
		testTask2.addOwner(User.array.find(e => e.firstName === "Christian").ID);
		testTask2.addMember(User.array.find(e => e.firstName === "Ludvik").ID);

		new Task(0, "Kjøpe egg");
		let testTask3 = Task.array.find(e => e.ID === 2);
		testTask3.setStatus("ToDo");
		testTask3.setCategory(TaskCategory.array.find(e => e.ID === 0));
		testTask3.setDescription("Vi må lage egg så vi kan lage en kake");
		testTask3.setStartDate(new Date(2019, 5, 8));
		testTask3.setEndDate(new Date(2019, 5, 18, 12));
		testTask3.setPriority(2);
		testTask3.addOwner(User.array.find(e => e.firstName === "Morten").ID);
		testTask3.addMember(User.array.find(e => e.firstName === "Erik").ID);

		new Task(0, "Egge på seg Kongen");
		let testTask4 = Task.array.find(e => e.ID === 3);
		testTask4.setStatus("ToDo");
		testTask4.setCategory(TaskCategory.array.find(e => e.ID === 0));
		testTask4.setDescription("Vi må lage egg så vi kan lage en kake");
		testTask4.setStartDate(new Date(2019, 5, 2));
		testTask4.setEndDate(new Date(2019, 5, 14));
		testTask4.setPriority(1);
		testTask4.addOwner(User.array.find(e => e.firstName === "Erik").ID);
		testTask4.addMember(User.array.find(e => e.firstName === "Morten").ID);

		new Task(0, "Redde svanen");
		let testTask5 = Task.array.find(e => e.ID === 4);
		testTask5.setStatus("ToDo");
		testTask5.setCategory(TaskCategory.array.find(e => e.ID === 1));
		testTask5.setDescription("Det er en svane vi må redde");
		testTask5.setStartDate(new Date(2019, 4, 31));
		testTask5.setEndDate(new Date(2019, 5, 8));
		testTask5.setPriority(3);
		testTask5.addOwner(User.array.find(e => e.firstName === "Erik").ID);
		testTask5.addMember(User.array.find(e => e.firstName === "Morten").ID);
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
		// Delete category from all tasks in Projects
		Project.array.forEach(project => project.tasks.forEach(task => task.category = task.category.ID === this.ID ? null : task.category));

		// Delete category from global Category-array
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
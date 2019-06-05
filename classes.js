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
		this.comments = [];

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
		return Project.array.filter(project => project.members.find(member => member.ID === this.ID) ||
		project.owners.find(owner => owner.ID === this.ID));
	}

	getTasks() {
		return Task.array.filter(task => task.members.find(member => member.ID === this.ID) ||
		task.owners.find(owner => owner.ID === this.ID));
	}

	getLogs() {
		return Log.array.filter(log => log.loggerID === this.ID);
	}

	static setup() {
		new User("Emil", "Fra", "Bygda", "ærmenikærmen@gmail.com", "Alta, Norway");
		new User("Linda", "Haga", "Andersen", "linda.h.andersen@gmail.com", "Kristiansand, Norway");
		new User("Turid", "Lover", "Deg", "Turidldeg@gmail.com", "Oslo, Norway");
		new User("Bjørn", "Svart", "Megastor", "bjørnenmega@gmail.com", "Bardufoss, Norway");
		new User("Nina", "Berg", "Foss", "ninafossefall@gmail.com", "Stange, Norway");
        new User("Arne", "Sør", "Arntsen", "arne.arntsen@gmail.com", "Oslo, Norway");
        new User("Lil", "Big", "Pimp", "Lil.b.pimp@gmail.com", "Trondheim, Norway");
        new User("Sigvart", "Heja", "Dagsland", "sig.dags@gmail.com", "Stavanger, Norway");
        new User("Big", "Boy", "Benny", "big.boy.b@gmail.com", "Bergen, Norway");
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
		this.comments = [];

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
		new Project("Teste løsningen");
		let testProject1 = Project.array.find(e => e.ID === 0);

		testProject1.setDescription("Vi må teste at prosjektet fungerer godt.");
		testProject1.setStartDate(new Date());
		testProject1.setEndDate(new Date(2019, 5, 31));
		testProject1.addOwner(User.array.find(user => user.firstName === "Emil").ID);
		testProject1.addMember(User.array.find(user => user.firstName === "Linda").ID);

		new Project("Development");
		let testProject2 = Project.array.find(e => e.ID === 1);
		
        testProject2.setDescription("Create the best oranization solution ever");
		testProject2.setStartDate(new Date(2019, 5, 1));
		testProject2.setEndDate(new Date(2019, 6, 1));
		testProject2.addOwner(User.array.find(user => user.firstName === "Turid").ID);
		testProject2.addMember(User.array.find(user => user.firstName === "Bjørn").ID);
        testProject2.addMember(User.array.find(user => user.firstName === "Emil").ID);
        
        new Project("Backe løsningen");
		let testProject3 = Project.array.find(e => e.ID === 2);
		
        testProject3.setDescription("Beskytte løsningen før levering");
		testProject3.setStartDate(new Date(2019, 5, 1));
		testProject3.setEndDate(new Date(2019, 5, 24));
		testProject3.addOwner(User.array.find(user => user.firstName === "Nina").ID);
		testProject3.addMember(User.array.find(user => user.firstName === "Arne").ID);
		testProject3.addMember(User.array.find(user => user.firstName === "Lil").ID);
        testProject3.addMember(User.array.find(user => user.firstName === "Emil").ID);
        
        new Project("Levere oppgaven");
		let testProject4 = Project.array.find(e => e.ID === 3);
		
        testProject4.setDescription("Finne en måte å levere oppgaven på");
		testProject4.setStartDate(new Date(2019, 5, 7));
		testProject4.setEndDate(new Date(2019, 6, 1));
		testProject4.addOwner(User.array.find(user => user.firstName === "Sigvart").ID);
		testProject4.addMember(User.array.find(user => user.firstName === "Big").ID);
        testProject4.addMember(User.array.find(user => user.firstName === "Emil").ID);
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
		this.comments = [];

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
		testTask.addOwner(User.array.find(e => e.firstName === "Emil").ID);
		testTask.addMember(User.array.find(e => e.firstName === "Linda").ID);

		new Task(0, "Kjøpe egg");
		let testTask2 = Task.array.find(e => e.ID === 1);
		testTask2.setStatus("ToDo");
		testTask2.setCategory(TaskCategory.array.find(e => e.ID === 2));
		testTask2.setDescription("Vi må lage egg så vi kan lage en kake");
		testTask2.setStartDate(new Date(2019, 5, 8));
		testTask2.setEndDate(new Date(2019, 5, 18, 12));
		testTask2.setPriority(2);
		testTask2.addOwner(User.array.find(e => e.firstName === "Linda").ID);

		new Task(0, "Egge på seg Kongen");
		let testTask3 = Task.array.find(e => e.ID === 2);
		testTask3.setStatus("ToDo");
		testTask3.setCategory(TaskCategory.array.find(e => e.ID === 0));
		testTask3.setDescription("Vi må lage egg så vi kan lage en kake");
		testTask3.setStartDate(new Date(2019, 5, 2));
		testTask3.setEndDate(new Date(2019, 5, 14));
		testTask3.setPriority(1);
		testTask3.addMember(User.array.find(e => e.firstName === "Linda").ID);

		new Task(0, "Redde svanen");
		let testTask4 = Task.array.find(e => e.ID === 3);
		testTask4.setStatus("ToDo");
		testTask4.setCategory(TaskCategory.array.find(e => e.ID === 3));
		testTask4.setDescription("Det er en svane vi må redde");
		testTask4.setStartDate(new Date(2019, 4, 31));
		testTask4.setEndDate(new Date(2019, 5, 8));
		testTask4.setPriority(3);
		testTask4.addOwner(User.array.find(e => e.firstName === "Linda").ID);
        
        new Task(0, "Finne kyllingen");
		let testTask5 = Task.array.find(e => e.ID === 4);
		testTask5.setStatus("InProgress");
		testTask5.setCategory(TaskCategory.array.find(e => e.ID === 1));
		testTask5.setDescription("Hvor har det blitt av kyllingen?");
		testTask5.setStartDate(new Date(2019, 4, 28));
		testTask5.setEndDate(new Date(2019, 5, 7));
		testTask5.setPriority(3);
		testTask5.addOwner(User.array.find(e => e.firstName === "Linda").ID);
        
        new Task(0, "Støpe skulpturen");
		let testTask6 = Task.array.find(e => e.ID === 5);
		testTask6.setStatus("InProgress");
		testTask6.setCategory(TaskCategory.array.find(e => e.ID === 2));
		testTask6.setDescription("En majestetisk skulptur i gull");
		testTask6.setStartDate(new Date(2019, 5, 2));
		testTask6.setEndDate(new Date(2019, 5, 20));
		testTask6.setPriority(3);
		testTask6.addOwner(User.array.find(e => e.firstName === "Emil").ID);
		testTask6.addMember(User.array.find(e => e.firstName === "Linda").ID);
        
        new Task(0, "Male trappa");
		let testTask7 = Task.array.find(e => e.ID === 6);
		testTask7.setStatus("ToDo");
		testTask7.setCategory(TaskCategory.array.find(e => e.ID === 3));
		testTask7.setDescription("Finn frem malekosten");
		testTask7.setStartDate(new Date(2019, 5, 14));
		testTask7.setEndDate(new Date(2019, 5, 26));
		testTask7.setPriority(3);
		testTask7.addOwner(User.array.find(e => e.firstName === "Linda").ID);
		testTask7.addMember(User.array.find(e => e.firstName === "Emil").ID);
        
        new Task(0, "Lage en mugge saft");
		let testTask8 = Task.array.find(e => e.ID === 7);
		testTask8.setStatus("ToDo");
		testTask8.setCategory(TaskCategory.array.find(e => e.ID === 1));
		testTask8.setDescription("Hva er blandingsforholdet igjen?");
		testTask8.setStartDate(new Date(2019, 5, 5));
		testTask8.setEndDate(new Date(2019, 5, 15));
		testTask8.setPriority(3);
		testTask8.addOwner(User.array.find(e => e.firstName === "Linda").ID);
        
        new Task(1, "Kverne kjøttet");
		let testTask9 = Task.array.find(e => e.ID === 8);
		testTask9.setStatus("InProgress");
		testTask9.setCategory(TaskCategory.array.find(e => e.ID === 1));
		testTask9.setDescription("Kjøttet må kvernes før det forsvinner");
		testTask9.setStartDate(new Date(2019, 5, 1));
		testTask9.setEndDate(new Date(2019, 5, 7));
		testTask9.setPriority(3);
		testTask9.addOwner(User.array.find(e => e.firstName === "Turid").ID);
		testTask9.addMember(User.array.find(e => e.firstName === "Bjørn").ID);
        
        new Task(1, "Pusse sølvtøyet");
		let testTask10 = Task.array.find(e => e.ID === 9);
		testTask10.setStatus("InProgress");
		testTask10.setCategory(TaskCategory.array.find(e => e.ID === 2));
		testTask10.setDescription("Det skal skinne sterkere enn sola");
		testTask10.setStartDate(new Date(2019, 5, 5));
		testTask10.setEndDate(new Date(2019, 5, 15));
		testTask10.setPriority(3);
		testTask10.addOwner(User.array.find(e => e.firstName === "Turid").ID);
		testTask10.addMember(User.array.find(e => e.firstName === "Bjørn").ID);
        
        new Task(1, "Lade mobiltelefonen");
		let testTask11 = Task.array.find(e => e.ID === 10);
		testTask11.setStatus("ToDo");
		testTask11.setCategory(TaskCategory.array.find(e => e.ID === 3));
		testTask11.setDescription("Vi nærmer oss 5%");
		testTask11.setStartDate(new Date(2019, 5, 7));
		testTask11.setEndDate(new Date(2019, 5, 13));
		testTask11.setPriority(3);
		testTask11.addOwner(User.array.find(e => e.firstName === "Bjørn").ID);
		testTask11.addMember(User.array.find(e => e.firstName === "Turid").ID);
        testTask11.addMember(User.array.find(e => e.firstName === "Emil").ID);
        
        new Task(1, "Smake på saften");
		let testTask12 = Task.array.find(e => e.ID === 11);
		testTask12.setStatus("InProgress");
		testTask12.setCategory(TaskCategory.array.find(e => e.ID === 1));
		testTask12.setDescription("Saften er laget, men er ikke smakstestet");
		testTask12.setStartDate(new Date(2019, 5, 14));
		testTask12.setEndDate(new Date(2019, 5, 20));
		testTask12.setPriority(3);
		testTask12.addOwner(User.array.find(e => e.firstName === "Bjørn").ID);
		testTask12.addMember(User.array.find(e => e.firstName === "Turid").ID);
        
        new Task(1, "Røre i gryta");
		let testTask13 = Task.array.find(e => e.ID === 12);
		testTask13.setStatus("ToDo");
		testTask13.setCategory(TaskCategory.array.find(e => e.ID === 3));
		testTask13.setDescription("Risen vil brenne seg, det må røres!");
		testTask13.setStartDate(new Date(2019, 5, 20));
		testTask13.setEndDate(new Date(2019, 5, 29));
		testTask13.setPriority(3);
		testTask13.addOwner(User.array.find(e => e.firstName === "Turid").ID);
		testTask13.addMember(User.array.find(e => e.firstName === "Bjørn").ID);
        
        new Task(1, "Møte med kongen");
		let testTask14 = Task.array.find(e => e.ID === 13);
		testTask14.setStatus("ToDo");
		testTask14.setCategory(TaskCategory.array.find(e => e.ID === 2));
		testTask14.setDescription("Husk å rense dressen");
		testTask14.setStartDate(new Date(2019, 5, 24));
		testTask14.setEndDate(new Date(2019, 6, 1));
		testTask14.setPriority(3);
		testTask14.addOwner(User.array.find(e => e.firstName === "Bjørn").ID);
		testTask14.addMember(User.array.find(e => e.firstName === "Turid").ID);
        testTask14.addMember(User.array.find(e => e.firstName === "Emil").ID);
        
        new Task(1, "Harrytur til Sverige");
		let testTask15 = Task.array.find(e => e.ID === 14);
		testTask15.setStatus("ToDo");
		testTask15.setCategory(TaskCategory.array.find(e => e.ID === 2));
		testTask15.setDescription("Vi må laste bilen med bacon");
		testTask15.setStartDate(new Date(2019, 5, 13));
		testTask15.setEndDate(new Date(2019, 5, 22));
		testTask15.setPriority(3);
		testTask15.addOwner(User.array.find(e => e.firstName === "Turid").ID);
		testTask15.addMember(User.array.find(e => e.firstName === "Bjørn").ID);
        
        new Task(1, "Filosofere med Sokrates");
		let testTask16 = Task.array.find(e => e.ID === 15);
		testTask16.setStatus("Done");
		testTask16.setCategory(TaskCategory.array.find(e => e.ID === 0));
		testTask16.setDescription("Hva er egentlig meningen med livet?");
		testTask16.setStartDate(new Date(2019, 5, 1));
		testTask16.setEndDate(new Date(2019, 5, 8));
		testTask16.setPriority(3);
		testTask16.addOwner(User.array.find(e => e.firstName === "Emil").ID);
		testTask16.addMember(User.array.find(e => e.firstName === "Bjørn").ID);
        testTask16.addMember(User.array.find(e => e.firstName === "Turid").ID);
        
        new Task(2, "Ikke miste løsningen");
		let testTask17 = Task.array.find(e => e.ID === 16);
		testTask17.setStatus("ToDo");
		testTask17.setCategory(TaskCategory.array.find(e => e.ID === 2));
		testTask17.setDescription("Løsningen er godt plassert under armen");
		testTask17.setStartDate(new Date(2019, 5, 1));
		testTask17.setEndDate(new Date(2019, 5, 13));
		testTask17.setPriority(2);
		testTask17.addOwner(User.array.find(e => e.firstName === "Nina").ID);
		testTask17.addMember(User.array.find(e => e.firstName === "Arne").ID);
        testTask17.addMember(User.array.find(e => e.firstName === "Lil").ID);
        testTask17.addMember(User.array.find(e => e.firstName === "Emil").ID);
        
        new Task(2, "Backup på harddisk");
		let testTask18 = Task.array.find(e => e.ID === 17);
		testTask18.setStatus("Done");
		testTask18.setCategory(TaskCategory.array.find(e => e.ID === 3));
		testTask18.setDescription("Vi må lagre det vi har gjort på et sikkert sted");
		testTask18.setStartDate(new Date(2019, 5, 3));
		testTask18.setEndDate(new Date(2019, 5, 12));
		testTask18.setPriority(2);
		testTask18.addOwner(User.array.find(e => e.firstName === "Nina").ID);
		testTask18.addMember(User.array.find(e => e.firstName === "Lil").ID);
        testTask18.addMember(User.array.find(e => e.firstName === "Arne").ID);
        
        new Task(2, "Passe på leaks");
		let testTask19 = Task.array.find(e => e.ID === 18);
		testTask19.setStatus("ToDo");
		testTask19.setCategory(TaskCategory.array.find(e => e.ID === 2));
		testTask19.setDescription("Det er mange med lange øyne rundt oss");
		testTask19.setStartDate(new Date(2019, 5, 14));
		testTask19.setEndDate(new Date(2019, 5, 20));
		testTask19.setPriority(2);
		testTask19.addOwner(User.array.find(e => e.firstName === "Arne").ID);
		testTask19.addMember(User.array.find(e => e.firstName === "Lil").ID);
        testTask19.addMember(User.array.find(e => e.firstName === "Nina").ID);
        
        new Task(2, "Ta kontakt med PSS");
		let testTask20 = Task.array.find(e => e.ID === 19);
		testTask20.setStatus("ToDo");
		testTask20.setCategory(TaskCategory.array.find(e => e.ID === 3));
		testTask20.setDescription("Vi trenger ekstra sikkerhet");
		testTask20.setStartDate(new Date(2019, 5, 6));
		testTask20.setEndDate(new Date(2019, 5, 13));
		testTask20.setPriority(2);
		testTask20.addOwner(User.array.find(e => e.firstName === "Lil").ID);
		testTask20.addMember(User.array.find(e => e.firstName === "Nina").ID);
        testTask20.addMember(User.array.find(e => e.firstName === "Arne").ID);
        
        new Task(2, "Kryptering av innhold");
		let testTask21 = Task.array.find(e => e.ID === 20);
		testTask21.setStatus("ToDo");
		testTask21.setCategory(TaskCategory.array.find(e => e.ID === 0));
		testTask21.setDescription("Løsningen skal være uleselig for andre");
		testTask21.setStartDate(new Date(2019, 5, 9));
		testTask21.setEndDate(new Date(2019, 5, 24));
		testTask21.setPriority(2);
		testTask21.addOwner(User.array.find(e => e.firstName === "Arne").ID);
		testTask21.addMember(User.array.find(e => e.firstName === "Lil").ID);
        testTask21.addMember(User.array.find(e => e.firstName === "Nina").ID);
        
        new Task(2, "Endre passord");
		let testTask22 = Task.array.find(e => e.ID === 21);
		testTask22.setStatus("Done");
		testTask22.setCategory(TaskCategory.array.find(e => e.ID === 1));
		testTask22.setDescription("Vi har hatt det samme passordet for lenge");
		testTask22.setStartDate(new Date(2019, 5, 10));
		testTask22.setEndDate(new Date(2019, 5, 16));
		testTask22.setPriority(2);
		testTask22.addOwner(User.array.find(e => e.firstName === "Nina").ID);
		testTask22.addMember(User.array.find(e => e.firstName === "Arne").ID);
        testTask22.addMember(User.array.find(e => e.firstName === "Lil").ID);
        
        new Task(2, "Låse sykkelen");
		let testTask23 = Task.array.find(e => e.ID === 22);
		testTask23.setStatus("Done");
		testTask23.setCategory(TaskCategory.array.find(e => e.ID === 2));
		testTask23.setDescription("Putt nøkkelen i låsen");
		testTask23.setStartDate(new Date(2019, 5, 4));
		testTask23.setEndDate(new Date(2019, 5, 13));
		testTask23.setPriority(2);
		testTask23.addOwner(User.array.find(e => e.firstName === "Emil").ID);
		testTask23.addMember(User.array.find(e => e.firstName === "Arne").ID);
        testTask23.addMember(User.array.find(e => e.firstName === "Nina").ID);
        
        new Task(2, "Følg med på naboen");
		let testTask24 = Task.array.find(e => e.ID === 23);
		testTask24.setStatus("InProgress");
		testTask24.setCategory(TaskCategory.array.find(e => e.ID === 2));
		testTask24.setDescription("Naboen oppfører seg merkelig. Tror han har kjøpt seg katt?");
		testTask24.setStartDate(new Date(2019, 5, 4));
		testTask24.setEndDate(new Date(2019, 5, 17));
		testTask24.setPriority(2);
		testTask24.addOwner(User.array.find(e => e.firstName === "Arne").ID);
		testTask24.addMember(User.array.find(e => e.firstName === "Nina").ID);
        testTask24.addMember(User.array.find(e => e.firstName === "Lil").ID);
        
        new Task(3, "Åpne resturant");
		let testTask25 = Task.array.find(e => e.ID === 24);
		testTask25.setStatus("Done");
		testTask25.setCategory(TaskCategory.array.find(e => e.ID === 1));
		testTask25.setDescription("Kinesisk eller italiensk?");
		testTask25.setStartDate(new Date(2019, 5, 1));
		testTask25.setEndDate(new Date(2019, 5, 8));
		testTask25.setPriority(2);
		testTask25.addOwner(User.array.find(e => e.firstName === "Sigvart").ID);
		testTask25.addMember(User.array.find(e => e.firstName === "Big").ID);
        testTask25.addMember(User.array.find(e => e.firstName === "Emil").ID);
        
        new Task(3, "Kjøpe bord");
		let testTask26 = Task.array.find(e => e.ID === 25);
		testTask26.setStatus("ToDo");
		testTask26.setCategory(TaskCategory.array.find(e => e.ID === 3));
		testTask26.setDescription("Kundene trenger et sted å sette fra seg maten");
		testTask26.setStartDate(new Date(2019, 5, 6));
		testTask26.setEndDate(new Date(2019, 5, 13));
		testTask26.setPriority(2);
		testTask26.addOwner(User.array.find(e => e.firstName === "Big").ID);
		testTask26.addMember(User.array.find(e => e.firstName === "Sigvart").ID);
        
        new Task(3, "Skru på ovnen");
		let testTask27 = Task.array.find(e => e.ID === 26);
		testTask27.setStatus("InProgress");
		testTask27.setCategory(TaskCategory.array.find(e => e.ID === 0));
		testTask27.setDescription("Ovnen skal ha en varme på 225grader");
		testTask27.setStartDate(new Date(2019, 5, 8));
		testTask27.setEndDate(new Date(2019, 5, 16));
		testTask27.setPriority(2);
		testTask27.addOwner(User.array.find(e => e.firstName === "Sigvart").ID);
		testTask27.addMember(User.array.find(e => e.firstName === "Big").ID);
        
        new Task(3, "Kok vann");
		let testTask28 = Task.array.find(e => e.ID === 27);
		testTask28.setStatus("ToDo");
		testTask28.setCategory(TaskCategory.array.find(e => e.ID === 2));
		testTask28.setDescription("Husk salt i vannet for bedre smak");
		testTask28.setStartDate(new Date(2019, 5, 19));
		testTask28.setEndDate(new Date(2019, 5, 28));
		testTask28.setPriority(2);
		testTask28.addOwner(User.array.find(e => e.firstName === "Sigvart").ID);
		testTask28.addMember(User.array.find(e => e.firstName === "Big").ID);
        
        new Task(3, "Brett servietter");
		let testTask29 = Task.array.find(e => e.ID === 28);
		testTask29.setStatus("Done");
		testTask29.setCategory(TaskCategory.array.find(e => e.ID === 2));
		testTask29.setDescription("Skal jeg brette blomster eller svaner?");
		testTask29.setStartDate(new Date(2019, 5, 17));
		testTask29.setEndDate(new Date(2019, 5, 24));
		testTask29.setPriority(2);
		testTask29.addOwner(User.array.find(e => e.firstName === "Big").ID);
		testTask29.addMember(User.array.find(e => e.firstName === "Sigvart").ID);
        
        new Task(3, "Partner med Foodora");
		let testTask30 = Task.array.find(e => e.ID === 29);
		testTask30.setStatus("InProgress");
		testTask30.setCategory(TaskCategory.array.find(e => e.ID === 1));
		testTask30.setDescription("Vi trenger noen som kan levere oppgaven");
		testTask30.setStartDate(new Date(2019, 5, 15));
		testTask30.setEndDate(new Date(2019, 5, 23));
		testTask30.setPriority(2);
		testTask30.addOwner(User.array.find(e => e.firstName === "Big").ID);
		testTask30.addMember(User.array.find(e => e.firstName === "Sigvart").ID);
        
        new Task(3, "Ta en sigg");
		let testTask31 = Task.array.find(e => e.ID === 30);
		testTask31.setStatus("ToDo");
		testTask31.setCategory(TaskCategory.array.find(e => e.ID === 0));
		testTask31.setDescription("Roe nervene før levering");
		testTask31.setStartDate(new Date(2019, 5, 20));
		testTask31.setEndDate(new Date(2019, 5, 28));
		testTask31.setPriority(2);
		testTask31.addOwner(User.array.find(e => e.firstName === "Emil").ID);
		testTask31.addMember(User.array.find(e => e.firstName === "Big").ID);
        testTask31.addMember(User.array.find(e => e.firstName === "Sigvart").ID);
        
        new Task(3, "Lever med Foodora");
		let testTask32 = Task.array.find(e => e.ID === 31);
		testTask32.setStatus("ToDo");
		testTask32.setCategory(TaskCategory.array.find(e => e.ID === 3));
		testTask32.setDescription("Leveres via Voi");
		testTask32.setStartDate(new Date(2019, 5, 25));
		testTask32.setEndDate(new Date(2019, 6, 1));
		testTask32.setPriority(2);
		testTask32.addOwner(User.array.find(e => e.firstName === "Emil").ID);
		testTask32.addMember(User.array.find(e => e.firstName === "Sigvart").ID);
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
		Project.array.forEach(project => project.tasks.forEach(task => task.category = task.category.ID === this.ID ?
		null : task.category));

		// Delete category from global Category-array
		TaskCategory.array = TaskCategory.array.filter(e => e.ID !== this.ID);
	}

	static setup() {
		new TaskCategory("Design");
		new TaskCategory("UX");
        new TaskCategory("Back-end");
        new TaskCategory("Front-end");
	}
}

class Comment {
	static array = [];
	static idCounter = 0;

	constructor(commenterID, type, typeID, comment) {
		this.ID = Comment.idCounter++;
		this.commenterID = commenterID;
		this.date = new Date();
		this.type = type.toLowerCase();
		this.typeID = typeID;
		this.comment = comment;

		// Push to global comment array
		Comment.array.push(this);
		// Push to target array
		let target = this.type === "user" ? User.array : this.type === "project" ? Project.array : this.type === "task" ?
		Task.array : Comment.array;
		if (target === Comment.array){
			console.log("Error! Log ID " + this.ID + " has invalid type.");
		} else {
			target.find(element => element.ID === this.typeID).comments.push(this);
		}
	}
}

class Log {

	static array = [];
	static idCounter = 0;

	constructor(loggerID, type, typeID, action) {
		this.ID = Log.idCounter++;
		this.loggerID = loggerID;
		this.date = new Date();
		this.type = type.toLowerCase();
		this.typeID = typeID;
		this.action = action;

		// Push to global Log-array
		Log.array.push(this);
		// Push to target array
		let target = this.type === "user" ? User.array : this.type === "project" ? Project.array : this.type === 
		"task" ? Task.array : Log.array;
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
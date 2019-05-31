function findPriorityRating(task) {
	let ttd = task.endDate - task.startDate;
	let priority = 0;
	if(task.priority == 1) {
		priority = 0.5;
	} else if(task.priority == 2) {
		priority = 1;
	} else if(task.priority == 3) {
		priority = 1.5; 
	}
	return ttd * priority;
}
	//Run all functions to complete the priority list

console.log(findPriorityRating(Task.array[0]));
console.log(findPriorityRating(Task.array[1]));
console.log(findPriorityRating(Task.array[2]));
console.log(findPriorityRating(Task.array[3]));
console.log(findPriorityRating(Task.array[4]));


console.log(Task.array[0].priority);
console.log(User.array);



class Category {

	static array = [];
	static IDCounter = 0;

	constructor(category, role) {
		this.category = category;
		this.role = role;

		Category.array.push(this);
	}

	setCategory(category) {
		this.category = category;
	}

	setRole(role) {
		this.role = role;
	}

	//Method

	static setup() {
		new Category("Design", "Designer");
		new Category("UX", "Interaction Designer");
		new Category("Frontend", "Frontend Developer");
		new Category("Backend", "Backend Developer");
	}
}
/* This variable must be set in the task
static recommendedUsers = [];

//Import this method to the Task class

static getRecommendedUsers(task, category) {
	for(const user in User.array) {
		if(category.role == user.role) {
			task recommendedUsers.push(user)
		}
} */
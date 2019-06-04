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
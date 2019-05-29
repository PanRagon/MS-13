class Priority {
	static findTTD(task) {
			let ttd = task.endDate - task.startDate;
			return ttd;
		}
	//Calculate the priority rating of all tasks
	//Then push and sort into array
	static findPriorityRating(task) {
			let priority = 0;
			if(task.priority == 1) {
				priority = 0.5;
			} else if(task.priority == 2) {
				priority = 1;
			} else if(task.priority == 3) {
				priority = 1.5; 
			}
			return Priority.findTTD(task) * priority;
	}
	//Run all functions to complete the priority list
}
console.log(Priority.findTTD(Task.array[0]));
console.log(Priority.findPriorityRating(Task.array[0]));

console.log(Task.array[0].priority);
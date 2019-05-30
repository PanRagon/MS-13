function colorCircle(task) {
	let taskLength = calculateDaysBetween(task.startDate, task.endDate);
	let ttd = calculateDaysBetween(new Date(), task.endDate);
	let circleColor = ttd / taskLength;
}

console.log(colorCircle(Task.array[0]));
console.log(new Date());

console.log(1 === "1");

function createTaskHTML(task) {
	let main = document.getElementById("main");
	let taskDiv = document.createElement("div");
	taskDiv.style.width = "100px";
	taskDiv.style.height = "100px";
	main.appendChild(taskDiv);

	let br = document.createElement("br");
	
	let title = document.createTextNode(task.title);
	taskDiv.appendChild(title);
	taskDiv.appendChild(br);

	let description = document.createTextNode(task.description);
	taskDiv.appendChild(description);
	taskDiv.appendChild(br);

	let introOwners = document.createTextNode("Det finnes ingen eiere til denne oppgaven... pussig");
	if(task.owners == 1) {
   		introOwners = document.createTextNode("Dette er eieren til oppgaven:")
	} else {
		introOwners = document.createTextNode("Dette er eierene til oppgaven:")
	}
	let owners = document.createTextNode(task.owners.fullName)
	taskDiv.appendChild(introOwners);
	taskDiv.appendChild(br);
	taskDiv.appendChild(owners);
	taskDiv.appendChild(br);
}

createTaskHTML(Task.array[1]);

//Dependancies - Chartist.js

//Get the percentage of days remaining
function getPercentageLeft(task) {
	let totalDays = calculateDaysBetween(task.startDate, task.endDate);
	let daysLeft = task.daysToDeadline();
	let daysLeftPercent = (totalDays / daysLeft) * 100;
	return daysLeftPercent;
}
for(task of Task.array) {
	let chartID = "chart" + task.ID;
	console.log(chartID);
	let chartDiv = document.createElement("div");
	chartDiv.className = "ct-chart ct-golden-section";
	chartDiv.id = chartID;
	console.log(chartDiv);
	document.body.appendChild(chartDiv);
}
function buildChart(task) {
	let chartID = "chart" + task.ID;
	console.log(chartID);
	let chartDiv = document.createElement("div");
	chartDiv.className = "ct-chart ct-golden-section";
	chartDiv.id = chartID;
	console.log(chartDiv);
	document.body.appendChild(chartDiv);

	let daysLeftPercent = getPercentageLeft(task);
	let totalDaysPercent = 100 - daysLeftPercent;
	new Chartist.Pie("#" + chartID, {
  	series: [daysLeftPercent, totalDaysPercent],
	}, {
	  donut: true,
	  donutWidth: 60,
	  donutSolid: true,
	  startAngle: 0,
	  showLabel: false
	});
}
/*
let chartID = "chart" + Task.array[3].ID;
console.log(chartID);

let chartDiv = document.createElement("div");
console.log(chartDiv);

chartDiv.className = "ct-chart ct-golden-section";
chartDiv.id = chartID;

let chartText = document.createTextNode("Hello, I am a chart!");

chartDiv.appendChild(chartText); */
for(task of Task.array) {
	buildChart(task);
}
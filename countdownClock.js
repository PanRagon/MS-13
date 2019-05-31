//Dependancies - Chartist.js

//Get the percentage of days remaining
function getPercentageLeft(task) {
	let totalDays = calculateDaysBetween(task.startDate, task.endDate);
	let daysLeft = task.daysToDeadline();
	let daysLeftPercent = (totalDays / daysLeft) * 100;
	return daysLeftPercent;
}

function buildChart(task) {
	let chartID = "chart" + task.ID;
	let chartDiv = document.createElement("div");
	chartDiv.className = "ct-chart ct-golden-section";
	chartDiv.id = chartID;
	chartDiv.style.width = "115px";
	document.body.appendChild(chartDiv);

	let daysLeftPercent = getPercentageLeft(task);
	let totalDaysPercent = 100 - daysLeftPercent;
	new Chartist.Pie("#" + chartID, {
  	series: [daysLeftPercent, totalDaysPercent],
    },
	{
		width: "115px",
		donut: true,
		donutWidth: 10,
		donutSolid: true,
		startAngle: 0,
		showLabel: false
	});
}

for(task of Task.array) {
	buildChart(task);
}
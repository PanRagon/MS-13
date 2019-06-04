function appendLeadingZeroes(n){
    if(n <= 9){
        return "0" + n;
    }
    return n
}

// Sets time to YYYY.MM.DD 00:00
function getStartOfDate(date) {
    return new Date(date.getFullYear() + "-" + Number(date.getMonth() + 1) + "-" + date.getDate());
}

function calculateDaysBetween(firstDate, secondDate) {
    let msToDays = 1000 * 60 * 60 * 24;
    firstDate = getStartOfDate(firstDate);
    secondDate = getStartOfDate(secondDate);

    return (secondDate.getTime() - firstDate.getTime())/msToDays;
}

// Formats a date as DD.MM for visual output
function calendarDateFormatter(date){
    return appendLeadingZeroes(date.getDate()) + "." + appendLeadingZeroes(date.getMonth() +1);
}
// Formats a date as DD MMM
function dayMonthDateFormatter(date) {
    let months = ["JAN", "FEB", "MAR","APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    return appendLeadingZeroes(date.getDay()) + " " + months[date.getMonth()];
}

//Dependancies - Chartist.js
//Import following in to HTML
//<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/chartist/0.11.1/chartist.min.css">
//<script src="https://cdnjs.cloudflare.com/ajax/libs/chartist/0.11.1/chartist.js"></script>

//Get the percentage of days remaining
function getPercentageLeft(task) {
    let totalDays = calculateDaysBetween(task.startDate, task.endDate);
    let daysLeft = task.daysToDeadline();
    let daysLeftPercent = (daysLeft / totalDays) * 100;
    if(daysLeftPercent <= 0) {
        daysLeftPercent = 0;
    } else if(daysLeftPercent >= 100) {
        daysLeftPercent = 100;
    }
    return daysLeftPercent;
}

function buildChart(task, div) {
    let chartID = "chart" + task.ID;
    let chartDiv = document.createElement("div");
    chartDiv.className = "ct-chart ct-golden-section";
    chartDiv.id = chartID;
    chartDiv.style.width = "190px";
    div.appendChild(chartDiv);

    let daysLeftPercent = getPercentageLeft(task);
    let totalDaysPercent = 100 - daysLeftPercent;
    console.log(task.title + " has this percentage left " + daysLeftPercent)
    console.log(totalDaysPercent);
    let chart = new Chartist.Pie("#" + chartID, {
    series: [{value: totalDaysPercent, className: "chartistColor1"},
    {value: daysLeftPercent, className: "chartistColor2"}],
    },
    {
        donut: true,
        donutWidth: 19,
        donutSolid: false,
        startAngle: 0,
        showLabel: false,
    })
}

function findPriorityRating(task) {
    let ttd = task.endDate - new Date();
    let priority = 0;
    if(task.priority == 1) {
        priority = 0.75;
    } else if(task.priority == 2) {
        priority = 1;
    } else if(task.priority == 3) {
        priority = 1.25; 
    }
    return (ttd * priority) / 10000000;
}
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
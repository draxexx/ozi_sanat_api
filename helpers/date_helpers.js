const firstAndLastDayOfTheWeek = () => {
  var curr = new Date(); // get current date
  var first = curr.getDate() - curr.getDay() + 1; // First day is the day of the month - the day of the week
  var last = first + 6; // last day is the first day + 6

  var firstday = new Date(curr.setDate(first));
  var lastday = new Date(curr.setDate(last));

  firstday.setMinutes(firstday.getMinutes() - firstday.getTimezoneOffset());
  lastday.setMinutes(lastday.getMinutes() - lastday.getTimezoneOffset());

  return [firstday, lastday];
};

const compareDates = (d1, d2) => {
  let date1 = new Date(d1).getTime();
  let date2 = new Date(d2).getTime();

  if (date1 < date2) {
    console.log(`${d1} is less than ${d2}`);
  } else if (date1 > date2) {
    console.log(`${d1} is greater than ${d2}`);
  } else {
    console.log(`Both dates are equal`);
  }
};

const findTheDateInTheWeek = (d1, d2, d3) => {
  let date1 = new Date(d1).getTime();
  let date2 = new Date(d2).getTime();
  let date3 = new Date(d3).getTime();

  if (date1 <= date2 && date2 <= date3) {
    return true;
  } else {
    return false;
  }
};

module.exports = {
  firstAndLastDayOfTheWeek,
  compareDates,
  findTheDateInTheWeek,
};

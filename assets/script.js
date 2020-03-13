$(document).ready(function() {
  // test constant
  const test = false;

  // get times from moment
  const now = moment().format("MMMM Do YYYY");

  let nowHour24 = moment().format("H");
  let nowHour12 = moment().format("h");

  let $dateHeading = $("#dateH");
  $dateHeading.text(now);

  // using font awesome icon https://fontawesome.com/license
  const saveIcon = "./images/save-regular.svg";

  // Parsing the JSON string to an object
  let storedPlans = JSON.parse(localStorage.getItem("storedPlans"));

  if (storedPlans !== null) {
    planTextArr = storedPlans;
  } else {
    planTextArr = new Array(9);
    planTextArr[4] = " ";
  }

  // set variable referencing planner element
  let $plannerDiv = $("#plannerContainer");
  $plannerDiv.empty();

  // build calendar by row for fix set of hours
  for (let hour = 9; hour <= 17; hour++) {
    let index = hour - 9;

    // build row components
    let $rowDiv = $("<div>");
    $rowDiv.addClass("row");
    $rowDiv.addClass("plannerRow");
    $rowDiv.attr("hour-index", hour);

    // Time box portion of row
    let $col2TimeDiv = $("<div>");
    $col2TimeDiv.addClass("col-md-2");
    const $timeBoxSpn = $("<span>");
    $timeBoxSpn.attr("class", "timeBox");
    //format hours
    let displayHour = 0;
    let ampm = "";
    if (hour > 12) {
      displayHour = hour - 12;
      ampm = "pm";
    } else {
      displayHour = hour;
      ampm = "am";
    }

    // display time
    $timeBoxSpn.text(`${displayHour} ${ampm}`);
    $rowDiv.append($col2TimeDiv);
    $col2TimeDiv.append($timeBoxSpn);

    // input portion of row
    let $dailyPlanSpn = $("<input>");

    $dailyPlanSpn.attr("id", `input-${index}`);
    $dailyPlanSpn.attr("hour-index", index);
    $dailyPlanSpn.attr("type", "text");
    $dailyPlanSpn.attr("class", "dailyPlan");

    // access index for hour
    $dailyPlanSpn.val(planTextArr[index]);

    // width control
    let $col9IptDiv = $("<div>");
    $col9IptDiv.addClass("col-md-9");

    $rowDiv.append($col9IptDiv);
    $col9IptDiv.append($dailyPlanSpn);

    // save portion of row
    let $col1SaveDiv = $("<div>");
    $col1SaveDiv.addClass("col-md-1");

    let $saveBtn = $("<i>");
    $saveBtn.attr("id", `saveid-${index}`);
    $saveBtn.attr("save-id", index);
    $saveBtn.attr("class", "far fa-save saveIcon");

    // more width control
    $rowDiv.append($col1SaveDiv);
    $col1SaveDiv.append($saveBtn);

    // set row color based on time
    updateRowColor($rowDiv, hour);

    // add row to planner 
    $plannerDiv.append($rowDiv);
  }

});

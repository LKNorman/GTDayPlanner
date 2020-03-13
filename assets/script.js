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

  // row color function
  function updateRowColor($hourRow, hour) {
    if (test) {
      console.log("rowColor ", nowHour24, hour);
    }

    if (hour < nowHour24) {
      if (test) {
        console.log("lessThan");
      }
      $hourRow.css("background-color", "lightgrey");
    } else if (hour > nowHour24) {
      if (test) {
        console.log("greaterthan");
      }
      $hourRow.css("background-color", "lightgreen");
    } else {
      if (test) {
        console.log("eqaul");
      }
      $hourRow.css("background-color", "tomato");
    }
  }

  // saves to local storage
  $(document).on("click", "i", function(event) {
    event.preventDefault();

    if (test) {
      console.log("click pta before " + planTextArr);
    }

    let $index = $(this).attr("save-id");

    let inputId = "#input-" + $index;
    let $value = $(inputId).val();

    planTextArr[$index] = $value;

    if (test) {
      console.log("value ", $value);
    }
    if (test) {
      console.log("index ", $index);
    }
    if (test) {
      console.log("click pta after " + planTextArr);
    }

    // shawdow pulse
    $(`#saveid-${$index}`).removeClass("shadowPulse");
    localStorage.setItem("storedPlans", JSON.stringify(planTextArr));
  });

  // function to color save button on change of input
  $(document).on("change", "input", function(event) {
    event.preventDefault();
    if (test) {
      console.log("onChange");
    }
    if (test) {
      console.log("id", $(this).attr("hour-index"));
    }

    // neeed to check for save button

    let i = $(this).attr("hour-index");

    // more shawdow pulse
    $(`#saveid-${i}`).addClass("shadowPulse");
  });
});

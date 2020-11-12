$(document).ready(function () {
  section2();
});

function section2() {
  let submited = false;
  let section2IntervalTimer;
  let summaryTimer = 0;
  const timeLimited = 300;
  const $summaryTimer = $("#section2__summaryTimer");

  section2IntervalTimer = setInterval(() => {
    if (summaryTimer < timeLimited) {
      ++summaryTimer;
      $summaryTimer.text(summaryTimer);
      $("#section2__summaryTimeeee").val(summaryTimer);
    } else {
      clearInterval(section2IntervalTimer);
      if (!submited) {
        submited = true;
        document.forms["exams_section2"].submit();
      }
    }
  }, 1000);

  $(".section2__question__submit").on("click", function (e) {
    e.preventDefault();
    if (!submited) {
      submited = true;
      document.forms["exams_section2"].submit();
    }
  });
}

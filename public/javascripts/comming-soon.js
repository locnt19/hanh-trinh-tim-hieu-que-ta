$(document).ready(function () {
  timeAvailable();
  comingSoon();
});

function timeAvailable() {
  var comingSoon = {
    end: $('#index__thoigianconlai').val()
      ? new Date($('#index__thoigianconlai').val())
      : 0,
    day: $('#index__thoigianconlai__dd'),
    hr: $('#index__thoigianconlai__hr'),
    min: $('#index__thoigianconlai__min'),
    sec: $('#index__thoigianconlai__sec'),
  };

  comingSoon.end = Math.floor(comingSoon.end / 1000); // Convert UNIX timestamp + calculate remaining time
  comingSoon.remain = comingSoon.end - Math.floor(Date.now() / 1000);

  if (comingSoon.remain > 0) {
    comingSoon.ticker = setInterval(function () {
      comingSoon.remain--;
      if (comingSoon.remain <= 0) {
        clearInterval(comingSoon.ticker);
        comingSoon.remain = 0;
      }
      var secs = comingSoon.remain;
      var days = Math.floor(secs / 86400); // 1 day = 60 secs * 60 mins * 24 hrs
      secs -= days * 86400;
      var hours = Math.floor(secs / 3600); // 1 hr = 60 secs * 60 mins
      secs -= hours * 3600;
      var mins = Math.floor(secs / 60); // 1 min = 60 secs
      secs -= mins * 60;
      // Update HTML
      comingSoon.day.text(days);
      comingSoon.hr.text(hours);
      comingSoon.min.text(mins);
      comingSoon.sec.text(secs);
    }, 1000);
  }
  //#endregion
}

function comingSoon() {
  //#region COMING SOON PAGE
  var comingSoon = {
    end: $('#comingsoon_ok').val() ? new Date($('#comingsoon_ok').val()) : 0,
    day: $('#comingsoon_day'),
    hr: $('#comingsoon_hr'),
    min: $('#comingsoon_min'),
    sec: $('#comingsoon_sec'),
  };

  comingSoon.end = Math.floor(comingSoon.end / 1000); // Convert UNIX timestamp + calculate remaining time
  comingSoon.remain = comingSoon.end - Math.floor(Date.now() / 1000);

  if (comingSoon.remain > 0) {
    comingSoon.ticker = setInterval(function () {
      comingSoon.remain--;
      if (comingSoon.remain <= 0) {
        clearInterval(comingSoon.ticker);
        comingSoon.remain = 0;
        window.location.assign('/exams');
      }
      var secs = comingSoon.remain;
      var days = Math.floor(secs / 86400); // 1 day = 60 secs * 60 mins * 24 hrs
      secs -= days * 86400;
      var hours = Math.floor(secs / 3600); // 1 hr = 60 secs * 60 mins
      secs -= hours * 3600;
      var mins = Math.floor(secs / 60); // 1 min = 60 secs
      secs -= mins * 60;
      // Update HTML
      comingSoon.day.text(days);
      comingSoon.hr.text(hours);
      comingSoon.min.text(mins);
      comingSoon.sec.text(secs);
    }, 1000);
  }
  //#endregion
}

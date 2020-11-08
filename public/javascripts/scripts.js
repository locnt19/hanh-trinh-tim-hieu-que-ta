$(document).ready(function () {
  toatify();
  fakeSelectElement();
  timeAvailable();
  comingSoon();
});

function toatify() {
  //#region Toatify
  var message = document.getElementById('server-message')
    ? document.getElementById('server-message').textContent
    : null;
  if (message) {
    // console.log('message: ', message);
    Toastify({
      text: message,
      gravity: 'top',
      position: 'right',
      duration: 2000,
      callback: function () {
        message = null;
        // console.log('callback: %s', message)
      },
    }).showToast();
  }
  //#endregion
}

function fakeSelectElement() {
  //#region FAKE SELECT IN REGISTER, USER/ME PAGE
  const $fakeSelectItem = $('.fake__select .dropdown-item');
  $fakeSelectItem.on('click', function () {
    const text = $(this).text();
    $(this).parents('.fake__select').find('input').val(text);
  });
  $('#users_me input').attr('readonly', true);
  $('#users_me button').attr('readonly', true);
  $('#users_me .fake__select .dropdown-menu').addClass('d-none');
  $('#users_me_update').click(function () {
    $(this).addClass('d-none');
    $('#users_me_update_yes').removeClass('d-none');
    $('#users_me_update_no').removeClass('d-none');
    $('#users_me .fake__select .dropdown-menu').removeClass('d-none');
    $('#users_me input').removeAttr('readonly');
    $('#users_me button').removeAttr('readonly');
  });
  $('#users_me_update_no').click(function () {
    $(this).addClass('d-none');
    $('#users_me .fake__select .dropdown-menu').addClass('d-none');
    $('#users_me_update_yes').addClass('d-none');
    $('#users_me_update').removeClass('d-none');
    $('#users_me input').attr('readonly', true);
    $('#users_me button').attr('readonly', true);
  });
  $('#re_password').keyup(function () {
    if ($('#new_password').val() === $(this).val()) {
      $(this).removeClass('is-invalid').addClass('is-valid');
      $('#btn_change_password').removeAttr('disabled');
    } else {
      $(this).addClass('is-invalid');
    }
  });
  //#endregion
}

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

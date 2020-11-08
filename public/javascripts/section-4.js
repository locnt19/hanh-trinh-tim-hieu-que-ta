$(document).ready(function () {
  section4();
});

function section4() {
  var submited = false;
  //#region Dragula plugin
  const dragulaContainer = new dragula({
    isContainer: function (el) {
      return el.classList.contains('dragula-container');
    },
  })
    .on('drag', function (el) {
      el.className = el.className.replace('ex-moved', '');
    })
    .on('drop', function (el) {
      el.className += ' ex-moved';
    })
    .on('over', function (el, container) {
      container.className += ' ex-over';
    })
    .on('out', function (el, container) {
      container.className = container.className.replace('ex-over', '');
    });
  $('.no-dragdrop').on('mousedown', function (e) {
    e.preventDefault();
  });
  //#endregion

  // Change value every 1 seconds
  $('.dragula-container.left').each((index, item) => {
    setInterval(() => {
      if ($(item).children().length > 1) {
        const secondChildren = $(item).children()[1];
        $(item).find('input').val($(secondChildren).data('anwser'));
        $(item).parents('.border.rounded').addClass('border-primary shadow-sm');
      } else {
        $(item).find('input').val(null);
        $(item)
          .parents('.border.rounded')
          .removeClass('border-primary shadow-sm');
      }
    }, 1000);
  });

  // Timer
  const timeLimited = 180;
  let currentTime = 0;
  let stopTimer = false;

  const intervalTimer = setInterval(() => {
    if (stopTimer || currentTime === timeLimited) {
      stopTimer = true;
      clearInterval(intervalTimer);
      dragulaContainer.destroy();
      if ($(document).has('form[name=exams_section4]').length > 0) {
        // document.forms['exams_section4'].submit();
        if (!submited) {
          submited = true;
          document.forms['exams_section4'].submit();
        }
      }
    } else {
      currentTime++;
      $('#timer').text(currentTime);
      $('.round__4 #submit_time_summary').val(currentTime);
    }
  }, 1000);

  $('#submitSection4').on('click', function (e) {
    e.preventDefault();
    stopTimer = true;
    clearInterval(intervalTimer);
    dragulaContainer.destroy();
    if (!submited) {
      submited = true;
      document.forms['exams_section4'].submit();
    }
  });
}

$(document).ready(function () {
  section2();
});

function section2() {
  let submited = false;
  let doneSection2 = false;
  let firstQuestion = true;
  let score = 0;
  let showQuestions = false;
  let summaryCorrectAnwsered = 0;
  let summaryWrongAnwsered = 0;
  let questionPending = 0;
  let trueAnwserPending = '';
  let section2IntervalTimer;
  let section2IntervalPendingTimer;
  let summaryTimer = 0;
  let questionPendingTimer = 30;
  let anwserBackGroundIsCorrect = false;
  const timeLimited = 270;
  const $summaryTimer = $('#section2__summaryTimer');
  const $questionPendingTimer = $('#section2__questionPendingTimer');

  section2IntervalTimer = setInterval(() => {
    if (summaryTimer < timeLimited) {
      ++summaryTimer;
      $summaryTimer.text(summaryTimer);
    } else {
      clearInterval(section2IntervalTimer);
      clearInterval(section2IntervalPendingTimer);
      doneSection2 = true;
      hideListQuestion();
      chamDiemThi();
    }
  }, 1000);

  $('.section2__question__card__item').on('click', function () {
    if (!showQuestions && !doneSection2) {
      showQuestions = true;
      if (firstQuestion) {
        firstQuestion = false;
      }
      $(this).addClass('pending'); // add class pending css.
      questionPending = $(this).data('item');
      trueAnwserPending = $(this).data('value');
      $('.section2__question__list').removeClass('d-none');
      $(`.section2__question__item[data-item=${questionPending}]`).removeClass(
        'd-none'
      );
      section2IntervalPendingTimer = setInterval(() => {
        if (questionPendingTimer > 0) {
          --questionPendingTimer;
          $questionPendingTimer.text(questionPendingTimer);
        } else {
          showToast('Time out');
          hideListQuestion();
          checkAnwser(questionPending, false);
          clearIntervalAndResetQuestionPendingTimer();
        }
      }, 1000);
    }
  });

  $('.section2__question__check__result').on('click', function () {
    let anwser = $(
      `input[name=section2__answer${questionPending}]:checked`
    ).val();
    if (anwser === trueAnwserPending) {
      if (questionPending === 9) {
        checkAnwserBackground(true);
      } else {
        checkAnwser(questionPending, true);
      }
      clearIntervalAndResetQuestionPendingTimer();
    } else {
      if (questionPending === 9) {
        checkAnwserBackground(false);
      } else {
        checkAnwser(questionPending, false);
      }
      clearIntervalAndResetQuestionPendingTimer();
    }
    hideListQuestion();
  });

  $('.section2__question__background').on('click', function () {
    if (!firstQuestion && !showQuestions && !doneSection2) {
      showQuestions = true;
      doneSection2 = true;
      questionPending = 9;
      trueAnwserPending = $(this).data('value');
      $('.section2__question__list').removeClass('d-none');
      $(`.section2__question__item[data-item=${questionPending}]`).removeClass(
        'd-none'
      );
      section2IntervalPendingTimer = setInterval(() => {
        if (questionPendingTimer > 0) {
          --questionPendingTimer;
          $questionPendingTimer.text(questionPendingTimer);
        } else {
          showToast('Time out');
          hideListQuestion();
          checkAnwserBackground(false);
          clearIntervalAndResetQuestionPendingTimer();
        }
      }, 1000);
    }
  });

  function showToast(text) {
    Toastify({
      text: text,
      gravity: 'top',
      position: 'right',
      duration: 3000,
    }).showToast();
  }

  function clearIntervalAndResetQuestionPendingTimer() {
    clearInterval(section2IntervalPendingTimer);
    questionPendingTimer = 30;
    $questionPendingTimer.text(questionPendingTimer);
  }

  function checkAnwser(questionPending, isCorrect) {
    if (isCorrect) {
      summaryCorrectAnwsered++;
      showToast('Yeah Awesome!');
      $(`.section2__question__card__item[data-item=${questionPending}]`)
        .removeClass('pending')
        .addClass('correct')
        .off();
    } else {
      summaryWrongAnwsered++;
      showToast('Oh nooo!');
      $(`.section2__question__card__item[data-item=${questionPending}]`)
        .removeClass('pending')
        .addClass('wrong')
        .off();
    }
  }

  function checkAnwserBackground(isCorrect) {
    clearInterval(section2IntervalTimer);
    if (isCorrect) {
      anwserBackGroundIsCorrect = true;
      chamDiemThi(anwserBackGroundIsCorrect);
      $('.section2__question__card__item')
        .css('border', 'none')
        .removeClass('pending wrong')
        .addClass('correct')
        .off();
    } else {
      chamDiemThi();
      $('.section2__question__card__item')
        // .css('border', 'none')
        .removeClass('pending')
        // .addClass('wrong')
        .off();
    }
  }

  function chamDiemThi(anwserBackGroundIsCorrect = false) {
    if (anwserBackGroundIsCorrect) {
      score = 120 - 10 * summaryWrongAnwsered; // => 120 là tổng số điểm của Round 2.
    } else {
      score = 10 * summaryCorrectAnwsered;
    }
    $('#section2__score').val(score);
    $('#section2__summaryTimeeee').val(summaryTimer);
    Toastify({
      text: 'Go to next round after 3 seconds.',
      gravity: 'top',
      position: 'right',
      duration: 2000,
      callback: function () {
        message = null;
      },
    }).showToast();
    setTimeout(() => {
      if(!submited) {
        submited = true;
        document.forms['exams_section2'].submit();
      }
    }, 3000);
  }

  function hideListQuestion() {
    showQuestions = false;
    $('.section2__question__list').addClass('d-none');
    $('.section2__question__item').addClass('d-none');
  }
}

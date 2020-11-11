$(document).ready(function () {
  section1();
});

function section1() {
  var submited = false;
  //#region Section 1
  var listTabs = [];
  $('.question__wrapper .tabs').each(function () {
    listTabs.push(this.id);
  });

  // console.log(listTabs)

  $(`#${listTabs[0]}`).show(); // Hiển thị câu hỏi đầu tiên

  var nextQuestion = 1;

  var counter = {
    maximun: listTabs.length * 20, // Maximum time for round 1
    summary: 0, // Tổng thời gian  trả lời câu hỏi
    end: 20, // Thời gian trả lời mỗi câu hỏi
    action_next: $('#time_action_next'),
    innerHTML_end: $('#time_countdown'),
    innerHTML_summary: $('#time_summary'),
    input_summary: $('#submit_time_summary'),
  };

  // console.log(counter)

  $('#time_action_next').click(function () {
    if (nextQuestion < listTabs.length) {
      // console.log(nextQuestion)
      counter.end = 20; // reset thời gian trả lời 1 câu hỏi
      counter.innerHTML_end.text(counter.end);
      $(`#${listTabs[nextQuestion - 1]}`).hide();
      $(`#${listTabs[nextQuestion]}`).show();
      nextQuestion++;
      $('#current_question').text(nextQuestion);
    }
    if (nextQuestion === listTabs.length) {
      // console.log(nextQuestion)
      $(this).hide();
      $('#time_action_submit').removeClass('d-none');
    }
  });

  if (counter.end > 0) {
    counter.ticker = setInterval(function () {
      counter.end--;
      counter.summary++;
      if (counter.end === 0) {
        if (nextQuestion < listTabs.length) {
          counter.end = 20; // reset thời gian trả lời 1 câu hỏi
          $(`#${listTabs[nextQuestion - 1]}`).hide();
          $(`#${listTabs[nextQuestion]}`).show();
          nextQuestion++;
          $('#current_question').text(nextQuestion);
          if (nextQuestion === listTabs.length) {
            // console.log(nextQuestion)
            $('#time_action_next').hide();
            $('#time_action_submit').removeClass('d-none');
          }
        } else {
          clearInterval(counter.ticker);
          if ($(document).has('form[name=exams_section1]').length > 0) {
            if (!submited) {
              submited = true;
              document.forms['exams_section1'].submit();
            }
          }
        }
      }
      if (counter.summary === counter.maximun) {
        clearInterval(counter.ticker);
        counter.end = 0;
      }
      counter.innerHTML_summary.text(counter.summary);
      counter.input_summary.val(counter.summary);
      counter.innerHTML_end.text(counter.end);
    }, 1000);
  }

  $('#time_action_submit').on('click', function (e) {
    e.preventDefault();
    if (!submited) {
      submited = true;
      document.forms['exams_section1'].submit();
    }
  })
  //#endregion
}

$(document).ready(function () {
  // console.log(window.innerWidth);
  if (window.innerWidth <= 768) {
    $('.round_3_is_pc').remove();
  } else {
    $('.round_3_is_mobile').remove();
  }
  section3();
});

function section3() {
  var submited = false;
  //#region Section 3
  var counter = {
    end: 30, // Thời gian trả lời mỗi câu hỏi
    sumaryCounter: 0,
    maximumCounter: 240,
    selector_cowndown: $('.time_countdown'),
    selector_summary: $('.time_summary'),
    selector_submit_summary: $('#submit_time_summary'),
  };

  var couterRandom = 4;

  var listLocations = [];

  var groupQuestionLocation = [];
  var questionCurrent = 0;

  //#region
  const locations = [
    'Đất Đỏ',
    'Long Điền',
    'Bà Rịa',
    'Vũng Tàu',
    'Côn Đảo',
    'Phú Mỹ',
    'Châu Đức',
    'Xuyên Mộc',
  ];

  const modal = [
    'datdo',
    'longdien',
    'baria',
    'vungtau',
    'condao',
    'tanthanh',
    'chauduc',
    'xuyenmoc',
  ];

  tabCauHoi('datdo');
  tabCauHoi('longdien');
  tabCauHoi('baria');
  tabCauHoi('vungtau');
  tabCauHoi('condao');
  tabCauHoi('tanthanh');
  tabCauHoi('chauduc');
  tabCauHoi('xuyenmoc');

  var done = 0;

  //#region Count timer
  $('.s3_start').click(function () {
    counter.end = 30;
    counter.selector_cowndown.text(counter.end);
    clearInterval(counter.ticker);
    startCounter(counter);
  });

  $('.s3_stop').click(function () {
    done++;
    questionCurrent = 0;
    var listCheck = $('.star_checkbox:checked');
    if (listCheck.length >= 2) {
      $('.star_checkbox').parents('.custom-checkbox').hide();
      $('#star_conlai').parent().hide();
      // console.log($('.star_checkbox'))
    }
    // console.log(counter.sumaryCounter)
    clearInterval(counter.ticker);
    $(this).parents('.modal_chucnang__wrapper').removeClass('show');
    $('body').removeClass('overflow-hidden');
    // console.log($(this).parents('.modal_chucnang__wrapper').data('modal'));
    removeClassInMap($(this).parents('.modal_chucnang__wrapper').data('modal'));
    // console.log('done: ', done);
    if (done >= 4) {
      $('#luubai').show();
    }
  });
  //#endregion

  //#region random location
  $('.s3_random').click(function () {
    if (couterRandom > 0) {
      var random = randomRange(8);
      listLocations = [];
      for (var i = 0; i < random.length; i++) {
        listLocations.push({
          modal: modal[random[i]],
          name: locations[random[i]],
        });
      }
      $('#result_random').text('');
      $('area').click(function (e) {
        e.preventDefault();
      });
      $('area').removeClass('active');
      listLocations.map(i => {
        $('#result_random').append(
          `<strong class='text-danger mx-2'>${i.name}</strong>`
        );
        $(`area[data-modal=${i.modal}]`).addClass('active');
      });
      couterRandom--;
      $('#random_conlai').text(couterRandom);
      if (couterRandom === 0) {
        $('#star_conlai').parent().show();
        $('#random_conlai').parent().hide();
        $('.s3_random').hide();
        $('.s3_ok').hide();
        $('#start_text').show();
        $('area:not(.active)').each(function () {
          $(`.modal_chucnang__wrapper[data-modal=${this.dataset.modal}]`).remove();
        });
        $('area:not(.active)').remove();
        $('area.active').click(function (e) {
          e.preventDefault();
          $(`.modal_chucnang__wrapper[data-modal=${this.dataset.modal}]`).addClass(
            'show'
          );
          $('body').addClass('overflow-hidden');
          // start couter
          counter.end = 30;
          counter.selector_cowndown.text(counter.end);
          clearInterval(counter.ticker);
          startCounter(counter);
          // end couter
        });
      }
      if (couterRandom < 4) {
        $('.s3_ok').removeClass('d-none');
      }
    }
  });

  $('.s3_ok').click(function () {
    $(this).hide();
    $('#random_conlai').parent().hide();
    $('.s3_random').hide();
    $('#start_text').show();
    $('#star_conlai').parent().show();
    $('area:not(.active)').each(function () {
      $(`.modal_chucnang__wrapper[data-modal=${this.dataset.modal}]`).remove();
    });
    $('area:not(.active)').remove();
    $('area.active').click(function (e) {
      e.preventDefault();
      $(`.modal_chucnang__wrapper[data-modal=${this.dataset.modal}]`).addClass(
        'show'
      );
      $('body').addClass('overflow-hidden');
      // start couter
      counter.end = 30;
      counter.selector_cowndown.text(counter.end);
      clearInterval(counter.ticker);
      startCounter(counter);
      // end couter
    });
  });

  $('area').click(function (e) {
    e.preventDefault();
  });
  //#endregion

  //#region Checkbox
  var star_conlai = 2;
  $('#star_conlai').text(star_conlai);

  // console.log($('.star_checkbox'))
  $('.star_checkbox').change(function () {
    if ($(this).is(':checked')) {
      star_conlai -= 1;
      $('#star_conlai').text(star_conlai);
    } else {
      star_conlai += 1;
      $('#star_conlai').text(star_conlai);
    }
    // console.log(star_conlai)
  });
  //#endregion

  const randomRange = length => {
    const results = [];
    const possibleValues = Array.from({ length }, (value, i) => i);
    for (let i = 0; i < 4; i += 1) {
      const possibleValuesRange = length - (length - possibleValues.length);
      const randomNumber = Math.floor(Math.random() * possibleValuesRange);
      const normalizedRandomNumber =
        randomNumber !== possibleValuesRange
          ? randomNumber
          : possibleValuesRange;
      const [nextNumber] = possibleValues.splice(normalizedRandomNumber, 1);
      results.push(nextNumber);
    }
    return results;
  };
  //#endregion

  function tabCauHoi(name) {
    var listTab = [];
    var curentTab = 0;
    questionCurrent = curentTab;
    const temp = {
      name: name,
      id: [],
    };
    $(`.tabs.${name}`).each(function () {
      listTab.push(this.id);
      temp.id.push(this.id);
    });
    groupQuestionLocation.push(temp);
    $(`#${listTab[questionCurrent]}`).show(); // Hiển thị câu hỏi đầu tiên
    $(`.next_question.${name}`).click(function () {
      // start couter
      counter.end = 30;
      counter.selector_cowndown.text(counter.end);
      clearInterval(counter.ticker);
      startCounter(counter);
      // end couter
      var listCheck = $('.star_checkbox:checked');
      if (listCheck.length >= 2) {
        $('.star_checkbox').parents('.custom-checkbox').hide();
        // console.log($('.star_checkbox'))
      }
      ++questionCurrent;
      if (questionCurrent < listTab.length) {
        $(`#${listTab[questionCurrent - 1]}`).hide();
        $(`#${listTab[questionCurrent]}`).show();
        $(`.current_question.${name}`).text(questionCurrent + 1);
      }
      if (questionCurrent + 1 == listTab.length) {
        $(`.next_question.${name}`).hide();
        $(`.s3_stop.${name}`).show();
      }
      // console.log(questionCurrent);
    });
  }
  // console.log(groupQuestionLocation);
  function startCounter(counter) {
    counter.ticker = setInterval(function () {
      counter.end--;
      counter.sumaryCounter++;
      if (counter.end === 0) {
        // if ($('.modal_chucnang__wrapper').hasClass('show')) {
        //   const name = $('.modal_chucnang__wrapper.show').data('modal');
        //   for (const item of groupQuestionLocation) {
        //     console.log(item);
        //     if (item.name === name) {
        //       $(`#${item.id[questionCurrent - 1]}`).hide();
        //       $(`#${item.id[questionCurrent]}`).show();
        //       $(`.current_question.${name}`).text(questionCurrent + 1);
        //       break;
        //     }
        //   }
        // }
        counter.end = 30;
        // clearInterval(counter.ticker);
      }
      if (counter.sumaryCounter === counter.maximumCounter) {
        clearInterval(counter.ticker);
        counter.end = 0;
        if ($(document).has('form[name=exams_section3]').length > 0) {
          if (!submited) {
            submited = true;
            document.forms['exams_section3'].submit();
          }
        }
      }
      counter.selector_summary.text(counter.sumaryCounter);
      counter.selector_submit_summary.val(counter.sumaryCounter);
      counter.selector_cowndown.text(counter.end);
    }, 1000);
  }

  function removeClassInMap(name) {
    $(`area[data-modal=${name}]`)
      .unbind('click')
      .click(function (e) {
        e.preventDefault();
      });
  }

  $('#luubai').on('click', function (e) {
    e.preventDefault();
    if (!submited) {
      submited = true;
      document.forms['exams_section3'].submit();
    }
  })
  //#endregion
}

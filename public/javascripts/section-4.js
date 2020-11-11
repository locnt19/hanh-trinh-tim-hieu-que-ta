$(document).ready(function () {
  section4();
});

function section4() {
  var submited = false;
  //#region Dragula plugin
  const dragulaContainer = new dragula({
    isContainer: function (el) {
      return el.classList.contains("dragula-container");
    },
  })
    .on("drag", function (el) {
      el.className = el.className.replace("ex-moved", "");
    })
    .on("drop", function (el) {
      el.className += " ex-moved";
    })
    .on("over", function (el, container) {
      container.className += " ex-over";
    })
    .on("out", function (el, container) {
      container.className = container.className.replace("ex-over", "");
    });
  $(".no-dragdrop").on("mousedown", function (e) {
    e.preventDefault();
  });
  //#endregion

  $("#submitSection4").on("click", function (e) {
    e.preventDefault();
    var awnserList = "[";
    $(".dragula-container.left").each((index, element) => {
      const question = {
        question: $(element).data("question"),
        anwser: [],
      };
      $(element)
        .find("input")
        .each((i, item) => {
          question.anwser.push($(item).val());
        });
      if (index === 0) {
        awnserList += JSON.stringify(question);
      } else {
        awnserList += "," + JSON.stringify(question);
      }
    });
    awnserList += "]";
    $("#section4_answerList").val(awnserList);
    dragulaContainer.destroy();
    if (!submited) {
      submited = true;
      document.forms["exams_section4"].submit();
    }
  });
}

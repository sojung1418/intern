
$(document).ready(function () {

  //initialize swiper when document ready
  var swiper = new Swiper ('.swiper-container');

  console.log("readyjs");
  var image = [
    "q1", "q2", "q102",
  ]
  var int = [
    "q8","q9","q39", "q40", "q41","q95-1","q95-2","q95-3","q97-1","q97-2","q97-3","q98-1","q98-2","q98-3","q104","q107","q108","q109",
  ]

  var int2 = [
  "q112","q113","q114",
  ]
  var text = [
    "q12"
  ];

  var s_buttons = [
   "q4","q5","q6","q7", "q14", "q15", "q23", "q28","q29","q30","q31", "q32", "q33", "q34", "q35", "q36", "q37", "q38", "q42", "q43", 
    "q44", "q45",  "q48", "q49", "q50", "q51", "q52", "q53", "q54", "q55", "q56", "q57", 
    "q58", "q59", "q60", "q61", "q62", "q63", "q64", "q65", "q66","q67","q68","q69","q70",
    "q71","q72","q73","q74","q75","q76","q77","q78","q79","q80","q81","q82","q83","q84",
    "q85","q86","q87","q88","q89","q90","q93","q94","q96","q100","q101","q103","q105","q106","q111"
  ];
  var m_buttons = [
    "q13", "q11", "q10", "q16", "q17","q18", "q19","q20", "q21", "q22","q24","q25","q26","q27",
   "q46", "q47","q91","q92","q99","q110"
  ];

  var csids =[
    "cs1",  "cs2", "cs3",  "cs4",  "cs5",  "cs6",  "cs7",  "cs8",  "cs9",  "cs10",  "cs11",  "cs12",
    "cs13",  "cs14",  "cs15",  "cs6",  "cs17",  "cs18",  "cs19",
  ]

  var survey = {
    userid: "",
    cid: "",
    csid: "",
    qid: "",
    answerType: "",
    answer: "", 
  };

  var answered = {
    qid: "",
    answerType: "",
    answer: "",
  };

  //초기데이터 불러오기
  $.each(answers, function (index, answer) {
    answered = answer;
   
    

    //text 형식일때
    $.each(text, function (index, qid) {

      if (answered.qid == qid) {
        var q = $('#' + qid + '_text');
        q.val(answered.answer);
      }
    });


    /// 버튼 형식일
    /// 중복선택형식일때
    $.each(m_buttons, function (index, qid) {
      if (answered.qid == qid) {
        var q = $('#' + qid + " button");

        var list = getAnswerIds(answered.answer);
        $.each(list, function (index, aid) {

          q.each(function () {
            if ($(this).val() == aid) {
              $(this).attr('class', 'button_test_normal button_test_normal_checked');
              $(this).data("data-checked", "check");
            }

          });
        });
      }
    });
    // 이미지버튼 형식일
    /// 중복선택형식일때
    $.each(image, function (index, qid) {
      if (answered.qid == qid) {
        var q = $('#' + qid + " input[type='image']");

        var list = getAnswerIds(answered.answer);
        $.each(list, function (index, aid) {

          q.each(function () {
            if ($(this).val() == aid) {

              $(this).attr('class', 'button_brand_normal button_brand_cosmetic_normal_checked');
              $(this).data("data-checked", "check");
            }

          });
        });
      }
    });

    //button
    //단일선택형식일때
    $.each(s_buttons, function (index, qid) {
      if (answered.qid == qid) {
        var q = $('#' + qid + " button");

        q.each(function () {
          var btn = this;
          if ($(btn).val() == answered.answer) {
            $(this).attr('class', 'button_test_normal button_test_normal_checked');
          }
        });
      }
    });

    //숫자값버튼 
    $.each(int, function (index, qid) {
      if (answered.qid == qid) {
        var q = $('#' + qid + ' input[type="button"]');

        q.each(function () {
          var btn = this;
          if ($(btn).val() == answered.answer) {
            $(this).attr('class', 'button_normal button_normal_checked');
          
          }
        });
      }
    });
    $.each(int2, function (index, qid) {
      if (answered.qid == qid) {
        var q = $('#' + qid + ' input[type="button"]');

        q.each(function () {
          var btn = this;
          if ($(btn).val() == answered.answer) {
            $(this).attr('class', 'button_normal2 button_normal_checked');
          
          }
        });
      }
    });




  });


  $.each(text, function (index, qid) {

    var q = $("#" + qid + "_text");
    q.focusout(function () {

      survey.userid = q.data("userid");
      survey.cid = q.data("cid");
      survey.csid = q.data("csid");
      survey.qid = qid;
      survey.answerType = "at_str_s";
      survey.answer = $(this).val();

      setSurvey(survey);
    });
  });


  $.each(int, function (index, qid) {

    var q = $("#" + qid + " input[type='button']");

    q.on("click", function (event) {
      console.log("click");
      q.attr('class', 'button_normal');
      $(this).attr('class', 'button_normal button_normal_checked');
      survey.userid = q.data("userid");
      survey.cid = q.data("cid");
      survey.csid = q.data("csid");
      survey.qid = qid;
      survey.answerType = "at_int";
      survey.answer = $(this).val();

      setSurvey(survey);

    });
  });

  $.each(int2, function (index, qid) {

    var q = $("#" + qid + " input[type='button']");

    q.on("click", function (event) {
      console.log("click");
      q.attr('class', 'button_normal2');
      $(this).attr('class', 'button_normal2 button_normal_checked');
      survey.userid = q.data("userid");
      survey.cid = q.data("cid");
      survey.csid = q.data("csid");
      survey.qid = qid;
      survey.answerType = "at_int";
      survey.answer = $(this).val();

      setSurvey(survey);

    });
  });


  $.each(s_buttons, function (index, qid) {

    var q = $("#" + qid + " button");

    q.on("click", function (event) {
      console.log("click");
      q.attr('class', 'button_test_normal');
      $(this).attr('class', 'button_test_normal button_test_normal_checked');
      survey.userid = q.data("userid");
      survey.cid = q.data("cid");
      survey.csid = q.data("csid");
      survey.qid = qid;
      survey.answerType = "at_aid_s";
      survey.answer = $(this).val();

      setSurvey(survey);

    });
  });

  /// checkbox 값 입력 이벤트
  /// data-checked="check"  data-answerType="at_aid_m" 인 컨트롤 공용 사용
  /// 변수명 및 survey.qid = "qxx"; 변경해서 사용

  $.each(m_buttons, function (index, qid) {

    var q = $("#" + qid + " button");

    q.on("click", function (event) {
      console.log("click");
      $(this).toggleClass('button_test_normal_checked');
      if ($(this).data("data-checked") == "check") {
        $(this).data("data-checked", "checked");
      } else {
        $(this).data("data-checked", "check");
      }
      var strval = "";
      q.each(function () {
        if ($(this).data("data-checked") == "check") {

          strval += $(this).val();
          strval += "/";
        } else {
          strval = strval.replace($(this).val() + '/', "");
        }
       });
      survey.userid = q.data("userid");
      survey.cid = q.data("cid");
      survey.csid = q.data("csid");
      survey.qid = qid;
      survey.answerType = "at_aid_m";
      survey.answer = strval;
      setSurvey(survey);
  
    });
  });

  $.each(image, function (index, qid) {

    var q = $("#" + qid + " input[type='image']");

    q.on("click", function (event) {
      console.log("click");
      $(this).toggleClass('button_brand_cosmetic_normal_checked');
      if ($(this).data("data-checked") == "check") {
        $(this).data("data-checked", "checked");
      } else {
        $(this).data("data-checked", "check");
      }
      var strval = "";
      survey.userid = q.data("userid");
      survey.cid = q.data("cid");
      survey.csid = q.data("csid");
      survey.qid = qid;
      survey.answerType = "";
      survey.answer = strval;
      setSurvey(survey);
    });


});







  function getAnswerIds(str) {

    var list = str.split("/");
    return list;
  }

  /// 공용
  /// 입력된 질문의 값을 firebase에 입력
  function setSurvey(survey) {


    $.ajax({

      url: "/survey/setSurvey",
      dataType: 'json',
      type: 'POST',
      data: survey,
      success: function (result) {
        console.log(result);

      },
      error: function (request, status, error) {
        alert("code:" + request.status + "\n" + "message:" + request.responseText + "\n" + "error:" + error);
      }


    });
  }

});
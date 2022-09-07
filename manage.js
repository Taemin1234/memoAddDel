$(function () {
  takeInfoClick(); // 왼쪽 테이블 클릭 시 오른쪽 테이블로 정보 가져오기

  //영업점관리
  showYesOrNo(); //리뷰관리 - 세부 평점 항목 중 아니오에 체크되어있으면 표시

  //주문관리
  yearFormat(); // 주문현황 - 날짜선택에서 선택되는 날짜 포맷 설정
  selectBtnDay(); // 주문현황 - 기간선택 시 활성화 버튼
  openPopup(); // 주문현황,결제관리,미리보기 - 팝업창 열기
  closePopup(); // 주문현황,결제관리, 미리보기 - 팝업창 닫기
  memoUpload(); // 주문현황 - 메모 등록
  memoDel(); // 주문현황 - 메모 삭제
});

//회원 관리
// 클릭시 정보를 오른쪽 창으로 가져온다.

function takeInfoClick() {
  var idx;
  $(".manage-info").on("click", function () {
    idx = $(this).index();

    for (let i = 0; i < $(".manage-info").eq(idx).children().length; i++) {
      let content = $(".manage-info").eq(idx).children().eq(i);
      let line = $(".table_line").find(".ad_table").eq(i);

      if (content.hasClass("img-line") == true) {
        line.children("img").attr("src", content.children("img").attr("src"));
      } else if (content.hasClass("element-line") == true) {
        line.html(content.html());
      } else if (content.children().hasClass("memo-line")) {
        line.find(".memo-list").html(content.find(".memo-line").html());
      } else {
        line.text(content.text());
      }
    }

    $(this).addClass("clk-bg");
    $(".manage-info").not(this).removeClass("clk-bg");
  });
}

// 영업점관리 - 리뷰관리

// 세부 평점 항목 중 아니오에 체크 되어있으면 표시
function showYesOrNo() {
  if ($(".ga_detailRating").length) {
    for (let j = 0; j < $(".manage-info").length; j++) {
      let mnagInfoNum = $(".manage-info").eq(j);
      let yesOrno = mnagInfoNum.find(".ga_detailRating").text();

      let noLeng = yesOrno.match(/N/g).length;
      let yesLeng = yesOrno.match(/Y/g).length;

      mnagInfoNum.find(".chkYes").text(yesLeng);
      mnagInfoNum.find(".chkNo").text(noLeng);
    }
  }
}

// 주문현황 날짜선택

function yearFormat() {
  if ($(".datepick").length) {
    $.datepicker.setDefaults({
      dateFormat: "yy-mm-dd",
      prevText: "이전 달",
      nextText: "다음 달",
      monthNames: [
        "1월",
        "2월",
        "3월",
        "4월",
        "5월",
        "6월",
        "7월",
        "8월",
        "9월",
        "10월",
        "11월",
        "12월",
      ],
      monthNamesShort: [
        "1월",
        "2월",
        "3월",
        "4월",
        "5월",
        "6월",
        "7월",
        "8월",
        "9월",
        "10월",
        "11월",
        "12월",
      ],
      dayNames: ["일", "월", "화", "수", "목", "금", "토"],
      dayNamesShort: ["일", "월", "화", "수", "목", "금", "토"],
      dayNamesMin: ["일", "월", "화", "수", "목", "금", "토"],
      showMonthAfterYear: true,
      yearSuffix: "년",
      changeYear: true,
      changeMonth: true,
    });
  }
}

function selectBtnDay() {
  $(".btn-date").on("click", function () {
    $(this).addClass("btn-clk");
    $(".btn-date").not(this).removeClass("btn-clk");
  });
}

// 주문관리 - 주문현황, 주문내역
// 주문 내역 클릭시 팝업창

function openPopup() {
  let docu = $(document);

  docu.on("click", ".receipt-chk", function () {
    $(".popup-receipt").show();
  });

  docu.on("click", ".chklist-chk", function () {
    $(".popup-chklist").show();
  });

  docu.on("click", ".preview-chk", function () {
    $(".popup-preview").show();
  });
}

function closePopup() {
  let popup = $(".popup-bg");

  $(".x-icon-wrap").on("click", function () {
    popup.hide();
  });

  popup.mouseup(function (e) {
    if (popup.has(e.target).length === 0) {
      popup.hide();
    }
  });
}

//주문현황 메모
// function 만들때 명칭 => 앞에 동사+형용사 + 명사
function makeBtnRemove() {
  let inputVal = $("#memo").val();
  let currentList = $(".clk-bg").find(".memo-line");

  $(".memo-list").append(
    '<li> <div class="memo-cont">' +
      inputVal +
      '</div><span class="memo-remove">삭제</span></li>'
  );

  currentList.append(
    '<li> <div class="memo-cont">' +
      inputVal +
      '</div><span class="memo-remove">삭제</span></li>'
  );

  $("#memo").val("");
}

//주문 현황 메모 입력하기
function memoUpload() {
  // 등록 버튼을 누르면 등록
  $(".btn-regi").on("click", function () {
    if ($("#memo").val().trim().length) {
      makeBtnRemove();
    }
  });

  //엔터키를 누르면 등록
  $("#memo").keypress(function (e) {
    if (e.keyCode == 13) makeBtnRemove();
  });
}

function memoDel() {
  $(document).on("click", ".memo-remove", function () {
    let rightMemo = $(this).parent("li");
    let leftMemo = $(".clk-bg").find(".memo-line").children("li");

    rightMemo.remove();

    for (let i = 0; i < leftMemo.length; i++) {
      if (rightMemo.html() == leftMemo.eq(i).html()) {
        leftMemo.eq(i).remove();
      }
    }
  });
}

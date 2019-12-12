$.ajax({
  url: "/studios/getStudios",
  type: "GET",
  dataType: "json",
  success: data => {
    //console.log(data)
    var studioChat = "";
    for (let i = data.length - 1; i >= 0; i--) {
      studioChat += `
            <div class="chat_list active_chat" value="${data[i]._id}">
                    <div class="chat_people" >
                        <div class="chat_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil">
                        </div>
                        <div class="chat_ib">
                            <h5> ${data[i].studioName} <span class="chat_date">Dec 25</span></h5>
                            <p>Test, which is a new approach to have all solutions
                                astrology under one roof.</p>
                        </div>
                    </div>
                </div>
            `;
    }
    $("#chatStudioList").append(studioChat);
  }
});

var stdPhNum;
var studioID;
$(document).on("click", ".chat_list", function() {
  studioID = $(this).attr("value");
  //alert(studioID)
  $.ajax({
    url: "/chat/getWhatsappMsgByStudioId?id=" + studioID,
    type: "GET",
    dataType: "json",
    async: false,
    success: data => {
      stdPhNum = data[0].contactNumber;
      $(".msg_history").empty();
      var outputMsg = "";
      for (let i = 0; i < data[0].msgData.length; i++) {
        outputMsg += `
                    <div class="outgoing_msg">
                    <div class="sent_msg">
                    <p>${data[0].msgData[i].msg}</p>
                    <span class="time_date"> ${new Date(
                      data[0].msgData[i].dateCreated
                    )
                      .toString()
                      .substr(3, 18)}  </span>
                    </div>
                    </div>
                    `;
      }
      $(".msg_history").append(outputMsg);
      //console.log(data[0].msgData[0])
    }
  });
});

$(document).on("click", ".msg_send_btn", function() {
  var wpMsgCredentials = {
    custmizedWpMsg: $("#custmizedWpMsg").val(),
    phoneNumber: stdPhNum
  };
  $.ajax({
    url: "/chat/sendCustmizedWpMsg",
    type: "POST",
    dataType: "json",
    data: wpMsgCredentials,
    success: data => {
      console.log(data);
      var whatsappMsgData = {
        stdId: studioID,
        msg: data.body,
        dateCreated: data.dateCreated,
        from: data.from,
        to: data.to,
        direction: data.direction,
        accountSid: data.accountSid
      };
      $.ajax({
        url: "/chat/saveWhatsappMsgToDb",
        type: "POST",
        data: whatsappMsgData,
        success: data => {
          location.reload();
        }
      });
    }
  });
});

// var ajaxCall = $.ajax({
//     url: "/projects/getProjectByStudioId?" + "5d84c26e9bf0ae28a4e2c70a",
//     type: "GET",
//     dataType: "json",
//     success: data => {
//         console.log(data);
//     },
//     error: err => {
//         console.log(err);
//     }
// })

$("#genrateBill").on("click", function() {
  stdIdFromClick = $(this).attr("value");
  console.log(stdIdFromClick);
  $.ajax({
    url: "/allProjects/getProjectByLoockup",
    type: "GET",
    dataType: "json",
    success: data => {
      var filtredData = data.filter(
        item =>
          item.studioId == stdIdFromClick &&
          item.projectStatus !== "Pending" &&
          (item.totalPayment - item.paymentReceived !== 0 ||
            item.paymentReceived === "0")
      );
      var tP = filtredData
        .map(item => parseInt(item.totalPayment))
        .reduce((acc, val) => acc + val);
      var dP =
        tP -
        filtredData
          .map(item => parseInt(item.paymentReceived))
          .reduce((acc, val) => acc + val);
      console.log(tP);
      console.log(dP);
      console.log(filtredData);
      var [
        { partyName, paymentReceived, serialNumber, ...others }
      ] = filtredData;
      console.log(partyName);
      console.log(paymentReceived);
      console.log(serialNumber);
      console.log(others);
    }
  });
});

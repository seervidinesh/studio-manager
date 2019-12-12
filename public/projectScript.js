function formatDate(date) {
  var monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec"
  ];
  var day = date.getDate();
  var monthIndex = date.getMonth();
  var year = date.getFullYear();
  return day + " " + monthNames[monthIndex] + " " + year;
}
$.ajax({
  url: "/studios/getStudios",
  type: "GET",
  dataType: "json",
  success: data => {
    var studioList = "";
    for (let i = 0; i < data.length; i++) {
      studioList += `<option value="${data[i]._id}">${data[i].studioName}</option>`;
    }
    $("#projectStudio").append(studioList);
    $("#updateProjectStudio").append(studioList);
    $("#inputGroupSelect04").append(studioList);
  }
});
$("#addNewProject").on("click", e => {
  e.preventDefault();
  var projectSerial;
  $.ajax({
    url: "/adminConfig/uniqueCounter",
    type: "PUT",
    dataType: "json",
    success: countValue => {
      projectSerial = countValue.value.COUNT;
    },
    async: false
  });
  var projectData = {
    studioId: $("option:selected").val(),
    partyName: $("#partyName").val(),
    jobType: $(".jobType:selected").val(),
    projectStatus: $(".projectStatus:selected").val(),
    totalDvD: $("#totalDvD").val(),
    serialNumber: projectSerial,
    projectReceivedOn: formatDate(new Date()),
    projectComplitedOn: $("#projectComplitionDate").val(),
    projectDelivredOn: $("#projectDelivryDate").val(),
    totalPayment: $("#totalPayment").val(),
    paymentReceived: $("#paymentReceived").val(),
    remark: $("#remark").val(),
    editorsPayment: $("#editorsPayment").val()
  };
  $.ajax({
    url: "/projects/addProject",
    type: "POST",
    dataType: "json",
    data: projectData,
    success: data => {
      alert("Project Added");
      $.ajax({
        url: "/allProjects/getSingleProjectByIdLookup?id=" + data.insertedId,
        type: "GET",
        dataType: "json",
        success: output => {
          var msgData = {
            phoneNumber: output[0].stdData[0].contactNumber,
            studioName: output[0].stdData[0].studioName,
            projectSerialNumber: output[0].serialNumber,
            partyName: output[0].partyName,
            projectStatus: output[0].projectStatus
          };
          $.ajax({
            url: "/chat/sentWhatsappMessages",
            type: "POST",
            dataType: "json",
            data: msgData,
            success: data => {
              var whatsappMsgData = {
                stdId: projectData.studioId,
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
        }
      });
    }
  });
});
$(document).on("click", "#inputGroupSelectBtn", function () {
  var stdData = {
    stdId: $("#inputGroupSelect04 option:selected").attr("value"),
    stdName: $("#inputGroupSelect04 option:selected").text()
  };
  $.ajax({
    url: "/allProjects/getProjectByLoockup",
    type: "GET",
    dataType: "json",
    success: data => {
      $("#tbody").empty();
      var tableData = "";
      var tPayment = [];
      var rPayment = [];
      for (let i = data.length - 1; i >= 0; i--) {
        if (data[i].studioId == stdData.stdId) {
          tPayment.push(parseInt(data[i].totalPayment));
          rPayment.push(parseInt(data[i].paymentReceived));
          tableData += `<tr class="mb-5">
                    <td>${data[i].serialNumber}</td>
                    <td value="${data[i].studioId}"> ${stdData.stdName}</td>
                    <td>${data[i].partyName}</td>
                    <td>${data[i].jobType}</td>
                    <td>${data[i].projectStatus}</td>
                    <td>${data[i].totalDvD}</td>
                    <td>${data[i].totalPayment}</td>
                    <td>${data[i].paymentReceived}</td>
                    <td>${data[i].totalPayment - data[i].paymentReceived} </td>
                    <td><input type="checkbox"></td>
                    <td class="editBtn" data-toggle="modal" data-target="#updateProject" value="${
                      data[i]._id
                    }"><i class="fas fa-pencil-alt"></i></td>
                    <td class="deleteBtn" value="${
                      data[i]._id
                    }"><i class="fas fa-trash-alt"></i></i></td>
                    </tr>`;
        }
      }
      var Tp = tPayment.reduce(function (acc, val) {
        return acc + val;
      }, 0);
      var Rp = rPayment.reduce(function (acc, val) {
        return acc + val;
      }, 0);
      var Dp = Tp - Rp;
      var paymentRow = `<tr> <td colspan="2"> Total Payment : ${Tp} </td> 
            <td colspan="3"> Payment Submitted : ${Rp} </td>
            <td colspan="3"> Payment Due : ${Dp} </td>
            <td colspan="4" class="generateBill"><button>Generate Bill</button></td>
            </tr>
            `;
      $("#tbody").append(tableData);
      $("#tbody").append(paymentRow);
    }
  });
});
var projectId;
$(document).on("click", ".editBtn", function () {
  projectId = $(this).attr("value");
  $.ajax({
    url: "/projects/getprojectById?id=" + projectId,
    type: "GET",
    dataType: "json",
    success: data => {
      $("#updateProjectStudio").val(data.studioId);
      $("#updatePartyName").val(data.partyName);
      $("#updateJobType").val(data.jobType);
      $("#updateProjectStatus").val(data.projectStatus);
      $("#updatePotalDvD").val(data.totalDvD);
      $("#updateProjectComplitionDate").val(data.projectComplitedOn);
      $("#updateProjectDelivryDate").val(data.projectDelivredOn);
      $("#updateTotalPayment").val(data.totalPayment);
      $("#updatePaymentReceived").val(data.paymentReceived);
      $("#updateRemark").val(data.remark);
    }
  });
});
$("#updateProjectBtn").on("click", () => {
  var updateProjectData = {
    studioId: $("#updateProjectStudio").val(),
    partyName: $("#updatePartyName").val(),
    jobType: $(".updateJobType:selected").val(),
    projectStatus: $(".updateProjectStatus:selected").val(),
    totalDvD: $("#updatePotalDvD").val(),
    projectComplitedOn: $("#updateProjectComplitionDate").val(),
    projectDelivredOn: $("#updateProjectDelivryDate").val(),
    totalPayment: $("#updateTotalPayment").val(),
    paymentReceived: $("#updatePaymentReceived").val(),
    remark: $("#updateRemark").val()
  };
  $.ajax({
    url: "/projects/updateProject?id=" + projectId,
    type: "PUT",
    dataType: "json",
    data: updateProjectData,
    success: data => {
      alert(data);
      $("#updateProject").modal("hide");
      $.ajax({
        url: "/allProjects/getSingleProjectByIdLookup?id=" + projectId,
        type: "GET",
        dataType: "json",
        success: output => {
          var whatsappMsgData = {
            phoneNumber: output[0].stdData[0].contactNumber,
            studioName: output[0].stdData[0].studioName,
            projectSerialNumber: output[0].serialNumber,
            partyName: output[0].partyName,
            projectStatus: output[0].projectStatus
          };
          $.ajax({
            url: "/chat/sentWhatsappMessages",
            type: "POST",
            data: whatsappMsgData,
            success: data => {
              var msgData = {
                stdId: updateProjectData.studioId,
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
                dataType: "json",
                data: msgData,
                success: data => {
                  location.reload();
                }
              });
            }
          });
        }
      });
    }
  });
});

$(document).on("click", ".deleteBtn", function () {
  if (confirm("Are you sure to delete this project")) {
    var deleteBtnId = $(this).attr("value");
    $.ajax({
      url: "/projects/deleteProjects?id=" + deleteBtnId,
      type: "DELETE",
      success: data => {
        alert(data);
        location.reload();
      }
    });
  }
});

$(document).ready(function () {
  $("#projectSearch").on("keyup", function () {
    var value = $(this)
      .val()
      .toLowerCase();
    $("#projectsByStudio tr").filter(function () {
      $(this).toggle(
        $(this)
        .text()
        .toLowerCase()
        .indexOf(value) > -1
      );
    });
  });
});

$(document).on("click", ".generateBill", function () {
  alert("generateBill Buttion Clicked");
  var billData = $("#projectsByStudio")
    .find('input[type="checkbox"]:checked')
    .parent();
  var billStdList = "";
  for (let i = 0; i < billData.length; i++) {
    billStdList += `
        
        `;
  }
});
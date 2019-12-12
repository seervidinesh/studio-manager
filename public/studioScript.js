$.ajax({
  url: "/studios/getStudios",
  type: "GET",
  dataType: "json",
  success: data => {
    var tableData = "";
    for (let i = data.length - 1; i >= 0; i--) {
      var ID = i + 1;
      tableData += `<tr>
                <td>${ID}</td>
                <td>${data[i].studioName}</td>
                <td>${data[i].ownerName}</td>
                <td>${data[i].contactNumber}</td>
                <td>${data[i].cityName}</td>
                <td>${data[i].emailAddress}</td>
                <td class="editBtn" data-toggle="modal" data-target="#updateStudio" value="${data[i]._id}"><i class="fas fa-pencil-alt"></i></td>
                <td class="deleteBtn" value="${data[i]._id}"><i class="fas fa-trash-alt"></i></i></td>
                </tr>`;
    }
    $("#tbody").append(tableData);
  }
});

$("#addNewStudio").on("click", () => {
  var studioData = {
    studioName: $("#studioName").val(),
    ownerName: $("#ownerName").val(),
    cityName: $("#cityName").val(),
    contactNumber: $("#contactNumber").val(),
    alternateNumber: $("#alternateNumber").val(),
    emailAddress: $("#emailAddress").val()
  };
  console.log(studioData);
  $.ajax({
    url: "/studios/addStudio",
    type: "POST",
    dataType: "json",
    data: studioData,
    success: data => {
      alert(data);
      $("#addStudioModal").modal("hide");
      location.reload();
    }
  });
});

var editId;
$(document).on("click", ".editBtn", function() {
  editId = $(this).attr("value");
  // console.log(editId)
  $.ajax({
    url: "/studios/getStudioById?id=" + editId,
    type: "GET",
    dataType: "json",
    success: data => {
      $("#updateStudioName").val(data.studioName);
      $("#updateOwnerName").val(data.ownerName);
      $("#updateCityName").val(data.cityName);
      $("#updateContactNumber").val(data.contactNumber);
      $("#updateAlternateNumber").val(data.alternateNumber);
      $("#updateEmailAddress").val(data.emailAddress);
    }
  });
});

$("#updateStudioBtn").on("click", () => {
  //var editId = $(this).attr("value")
  var updateStudioData = {
    studioName: $("#updateStudioName").val(),
    ownerName: $("#updateOwnerName").val(),
    cityName: $("#updateCityName").val(),
    contactNumber: $("#updateContactNumber").val(),
    alternateNumber: $("#updateAlternateNumber").val(),
    emailAddress: $("#updateEmailAddress").val()
  };
  console.log(updateStudioData);
  $.ajax({
    url: "/studios/updateStudio?id=" + editId,
    type: "PUT",
    dataType: "json",
    data: updateStudioData,
    success: data => {
      alert(data);
      $("#updateStudio").modal("hide");
      location.reload();
    }
  });
});

$(document).on("click", ".deleteBtn", function() {
  if (
    confirm(
      "Are you sure to delete this studio as it will delete all the projects related to this studio."
    )
  ) {
    var deleteBtnId = $(this).attr("value");
    console.log(deleteBtnId);
    $.ajax({
      url: "/studios/deleteStudio?id=" + deleteBtnId,
      type: "delete",
      success: data => {
        alert(data);
        location.reload();
      }
    });
  }
});

$(document).ready(function() {
  $("#studioInput").on("keyup", function() {
    var value = $(this)
      .val()
      .toLowerCase();
    $("#studioSearch tr").filter(function() {
      $(this).toggle(
        $(this)
          .text()
          .toLowerCase()
          .indexOf(value) > -1
      );
    });
  });
});

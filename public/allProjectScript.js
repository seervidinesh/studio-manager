var stdId;
var stdName;
var pageNo = 1;
$(document).ready(function() {
  var page;
  $.ajax({
    url: `/allProjects/myAllProjectsWithPagination?pageNo= + ${pageNo}`,
    type: "GET",
    dataType: "json",
    async: true,
    success: data => {
      page = {
        firstPage: data.paginationInfo.firstPage,
        lastPage: data.paginationInfo.lastPage,
        currPage: data.paginationInfo.currentPage,
        prevPage: data.paginationInfo.prevPage,
        nextPage: data.paginationInfo.nextPage,
        totalPage: data.paginationInfo.lastPage,
        recordPerPage: data.paginationInfo.recordPerPage,
        totalRecd: data.paginationInfo.totalRecord
      };

      var disablePrevPage = `<button class="btn btn-dark btn-sm mr-1 paginationButton" value="${page.prevPage}">Prev</button>`;
      var disableNextPage = `<button class="btn btn-dark btn-sm mr-1 paginationButton" value="${page.nextPage}">Next</button>`;
      var disableFirstPage = `<button class="btn btn-dark btn-sm mr-1 paginationButton" value="${page.firstPage}">First</button>`;
      var disableLastPage = `<button class="btn btn-dark btn-sm mr-1 paginationButton" value="${page.lastPage}">Last</button>`;
      if (page.prevPage === undefined) {
        disablePrevPage = "";
      }
      if (page.nextPage === undefined) {
        disableNextPage = "";
      }
      if (
        page.firstPage === page.currPage ||
        page.firstPage === page.prevPage
      ) {
        disableFirstPage = "";
      }
      if (page.lastPage === page.currPage || page.lastPage === page.nextPage) {
        disableLastPage = "";
      }
      var pageInfo = `
      ${disableFirstPage}
      ${disablePrevPage}
      <button class="btn btn-primary btn-sm mr-1 paginationButton" value="${page.currPage}">${page.currPage}</button>
      ${disableNextPage}
      ${disableLastPage}`;

      $(".pagination").append(pageInfo);
      var appendBadge = `
        <span class="badge badge-info">Total Projects : ${page.totalRecd}</span>
        <span class="badge badge-info">Page ${page.currPage} of ${page.lastPage}</span>
        <span class="badge badge-info">Projects per page ${page.recordPerPage}</span>
      `;
      $(".appendAbdge").append(appendBadge);
      var tableData = "";
      var tPayment = [];
      var rPayment = [];
      for (let i = data.result.length - 1; i >= 0; i--) {
        tPayment.push(parseInt(data.result[i].totalPayment));
        rPayment.push(parseInt(data.result[i].paymentReceived));
        tableData += `<tr>
            <td>${data.result[i].serialNumber}</td>
            <td>${data.result[i].stdData[0].studioName}</td>
            <td value="">${data.result[i].partyName}</td>
            <td>${data.result[i].jobType}</td>
            <td>${data.result[i].projectStatus}</td>
            <td>${data.result[i].totalDvD}</td>
            <td>${data.result[i].projectReceivedOn}</td>
            <td>${data.result[i].projectDelivredOn}</td>
            <td>${data.result[i].totalPayment}</td>
            <td>${data.result[i].paymentReceived}</td>
            <td>${data.result[i].totalPayment -
              data.result[i].paymentReceived} </td>
            <td class="deleteProjectId" value="${
              data.result[i]._id
            }"><i class="fas fa-trash-alt"></i></i></td>
            </tr>`;
      }
      var Tp = tPayment.reduce(function(acc, val) {
        return acc + val;
      }, 0);
      var Rp = rPayment.reduce(function(acc, val) {
        return acc + val;
      }, 0);
      var Dp = Tp - Rp;
      var paymentRow = `<tr class="bg-dark"> <td colspan="3"> Total Payment : ${Tp} </td> 
            <td colspan="5"> Payment Submitted : ${Rp} </td>
            <td colspan="4"> Payment Due : ${Dp} </td>
            </tr>`;
      $("#tbody").append(tableData);
      $("#tbody").append(paymentRow);
    }
  });
});

$(document).on("click", ".paginationButton", function() {
  pageNo = $(this).attr("value");
  console.log(pageNo);
  $.ajax({
    url: `/allProjects/myAllProjectsWithPagination?pageNo= + ${pageNo}`,
    type: "GET",
    dataType: "json",
    async: true,
    success: data => {
      $(".pagination").empty();
      $("#tbody").empty();
      $(".appendAbdge").empty();
      page = {
        firstPage: data.paginationInfo.firstPage,
        lastPage: data.paginationInfo.lastPage,
        currPage: data.paginationInfo.currentPage,
        prevPage: data.paginationInfo.prevPage,
        nextPage: data.paginationInfo.nextPage,
        totalPage: data.paginationInfo.lastPage,
        recordPerPage: data.paginationInfo.recordPerPage,
        totalRecd: data.paginationInfo.totalRecord
      };
      var disablePrevPage = `<button class="btn btn-dark btn-sm mr-1 paginationButton" value="${page.prevPage}">Prev</button>`;
      var disableNextPage = `<button class="btn btn-dark btn-sm mr-1 paginationButton" value="${page.nextPage}">Next</button>`;
      var disableFirstPage = `<button class="btn btn-dark btn-sm mr-1 paginationButton" value="${page.firstPage}">First</button>`;
      var disableLastPage = `<button class="btn btn-dark btn-sm mr-1 paginationButton" value="${page.lastPage}">Last</button>`;
      if (page.prevPage === undefined) {
        disablePrevPage = "";
      }
      if (page.nextPage === undefined) {
        disableNextPage = "";
      }
      if (
        page.firstPage === page.currPage ||
        page.firstPage === page.prevPage
      ) {
        disableFirstPage = "";
      }
      if (page.lastPage === page.currPage || page.lastPage === page.nextPage) {
        disableLastPage = "";
      }
      var pageInfo = `
      ${disableFirstPage}
      ${disablePrevPage}
      <button class="btn btn-primary btn-sm mr-1 paginationButton" value="${page.currPage}">${page.currPage}</button>
      ${disableNextPage}
      ${disableLastPage}`;

      $(".pagination").append(pageInfo);
      var appendBadge = `
        <span class="badge badge-info">Total Projects : ${page.totalRecd}</span>
        <span class="badge badge-info">Page ${page.currPage} of ${page.lastPage}</span>
        <span class="badge badge-info">Projects per page ${page.recordPerPage}</span>
      `;
      $(".appendAbdge").append(appendBadge);
      var tableData = "";
      var tPayment = [];
      var rPayment = [];
      for (let i = data.result.length - 1; i >= 0; i--) {
        tPayment.push(parseInt(data.result[i].totalPayment));
        rPayment.push(parseInt(data.result[i].paymentReceived));
        tableData += `<tr>
            <td>${data.result[i].serialNumber}</td>
            <td>${data.result[i].stdData[0].studioName}</td>
            <td value="">${data.result[i].partyName}</td>
            <td>${data.result[i].jobType}</td>
            <td>${data.result[i].projectStatus}</td>
            <td>${data.result[i].totalDvD}</td>
            <td>${data.result[i].projectReceivedOn}</td>
            <td>${data.result[i].projectDelivredOn}</td>
            <td>${data.result[i].totalPayment}</td>
            <td>${data.result[i].paymentReceived}</td>
            <td>${data.result[i].totalPayment -
              data.result[i].paymentReceived} </td>
            <td class="deleteProjectId" value="${
              data.result[i]._id
            }"><i class="fas fa-trash-alt"></i></i></td>
            </tr>`;
      }
      var Tp = tPayment.reduce(function(acc, val) {
        return acc + val;
      }, 0);
      var Rp = rPayment.reduce(function(acc, val) {
        return acc + val;
      }, 0);
      var Dp = Tp - Rp;
      var paymentRow = `<tr class="bg-dark"> <td colspan="3"> Total Payment : ${Tp} </td> 
            <td colspan="5"> Payment Submitted : ${Rp} </td>
            <td colspan="4"> Payment Due : ${Dp} </td>
            </tr>`;
      $("#tbody").append(tableData);
      $("#tbody").append(paymentRow);
    }
  });
});

$(document).on("click", "#goToPage", function() {
  pageNo = $("#goToPageNum").val();
  console.log(pageNo);
  $.ajax({
    url: `/allProjects/myAllProjectsWithPagination?pageNo= + ${pageNo}`,
    type: "GET",
    dataType: "json",
    async: true,
    success: data => {
      $(".pagination").empty();
      $("#tbody").empty();
      $(".appendAbdge").empty();
      page = {
        firstPage: data.paginationInfo.firstPage,
        lastPage: data.paginationInfo.lastPage,
        currPage: data.paginationInfo.currentPage,
        prevPage: data.paginationInfo.prevPage,
        nextPage: data.paginationInfo.nextPage,
        totalPage: data.paginationInfo.lastPage,
        recordPerPage: data.paginationInfo.recordPerPage,
        totalRecd: data.paginationInfo.totalRecord
      };
      var disablePrevPage = `<button class="btn btn-dark btn-sm mr-1 paginationButton" value="${page.prevPage}">Prev</button>`;
      var disableNextPage = `<button class="btn btn-dark btn-sm mr-1 paginationButton" value="${page.nextPage}">Next</button>`;
      var disableFirstPage = `<button class="btn btn-dark btn-sm mr-1 paginationButton" value="${page.firstPage}">First</button>`;
      var disableLastPage = `<button class="btn btn-dark btn-sm mr-1 paginationButton" value="${page.lastPage}">Last</button>`;
      if (page.prevPage === undefined) {
        disablePrevPage = "";
      }
      if (page.nextPage === undefined) {
        disableNextPage = "";
      }
      if (
        page.firstPage === page.currPage ||
        page.firstPage === page.prevPage
      ) {
        disableFirstPage = "";
      }
      if (page.lastPage === page.currPage || page.lastPage === page.nextPage) {
        disableLastPage = "";
      }
      var pageInfo = `
      ${disableFirstPage}
      ${disablePrevPage}
      <button class="btn btn-primary btn-sm mr-1 paginationButton" value="${page.currPage}">${page.currPage}</button>
      ${disableNextPage}
      ${disableLastPage}`;

      $(".pagination").append(pageInfo);
      var appendBadge = `
        <span class="badge badge-info">Total Projects : ${page.totalRecd}</span>
        <span class="badge badge-info">Page ${page.currPage} of ${page.lastPage}</span>
        <span class="badge badge-info">Projects per page ${page.recordPerPage}</span>
      `;
      $(".appendAbdge").append(appendBadge);
      var tableData = "";
      var tPayment = [];
      var rPayment = [];
      for (let i = data.result.length - 1; i >= 0; i--) {
        tPayment.push(parseInt(data.result[i].totalPayment));
        rPayment.push(parseInt(data.result[i].paymentReceived));
        tableData += `<tr>
            <td>${data.result[i].serialNumber}</td>
            <td>${data.result[i].stdData[0].studioName}</td>
            <td value="">${data.result[i].partyName}</td>
            <td>${data.result[i].jobType}</td>
            <td>${data.result[i].projectStatus}</td>
            <td>${data.result[i].totalDvD}</td>
            <td>${data.result[i].projectReceivedOn}</td>
            <td>${data.result[i].projectDelivredOn}</td>
            <td>${data.result[i].totalPayment}</td>
            <td>${data.result[i].paymentReceived}</td>
            <td>${data.result[i].totalPayment -
              data.result[i].paymentReceived} </td>
            <td class="deleteProjectId" value="${
              data.result[i]._id
            }"><i class="fas fa-trash-alt"></i></i></td>
            </tr>`;
      }
      var Tp = tPayment.reduce(function(acc, val) {
        return acc + val;
      }, 0);
      var Rp = rPayment.reduce(function(acc, val) {
        return acc + val;
      }, 0);
      var Dp = Tp - Rp;
      var paymentRow = `<tr class="bg-dark"> <td colspan="3"> Total Payment : ${Tp} </td>
            <td colspan="5"> Payment Submitted : ${Rp} </td>
            <td colspan="4"> Payment Due : ${Dp} </td>
            </tr>`;
      $("#tbody").append(tableData);
      $("#tbody").append(paymentRow);
    }
  });
});

$(document).on("click", ".deleteProjectId", function() {
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
$(document).ready(function() {
  $("#myInput").on("keyup", function() {
    var value = $(this)
      .val()
      .toLowerCase();
    $("#allProjectTable tr").filter(function() {
      $(this).toggle(
        $(this)
          .text()
          .toLowerCase()
          .indexOf(value) > -1
      );
    });
  });
});

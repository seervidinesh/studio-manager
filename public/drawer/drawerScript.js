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
$(document).on("click", "#addToDrawerBtn", e => {
    e.preventDefault();
    var drawerId;
    $.ajax({
        url: "/adminConfig/centralDrawerId",
        type: "PUT",
        dataType: "json",
        success: countValue => {
            drawerId = countValue.value.centralDrawerId;
        },
        async: false
    });
    var userData = {
        addBalance: $("#addAmount").val(),
        receivedRef: $("#receivedFrom").val(),
        balDscription: $("#balanceDescription").val(),
        drawerId: drawerId,
        addedOnDate: formatDate(new Date())
    }
    console.log(userData)
    $.ajax({
        url: "/drawer/addToDrawer",
        type: "POST",
        dataType: "json",
        data: userData,
        success: drawer => {
            alert("Balance Added")
        }
    })
})


$(document).on("click", "#openDrawerButton", e => {
    $.ajax({
        url: "/drawer/getDrawerTotal",
        type: "GET",
        dataType: "json",
        success: out => {
            $("#drawerBalance").empty()
            $("#drawerBalance").append(`<h4>Drawer Balance: <strong>${out[0].drawerTotal} ₹</strong></h4>`)
        }
    })
})
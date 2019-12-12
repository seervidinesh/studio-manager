$.ajax({
    url: "/allProjects/getProjects",
    type: "GET",
    dataType: "json",
    success: data => {
        var totalProject;
        var complitedArray = [];
        var pendingArray = [];
        var delivredArray = [];
        for (let i = 0; i < data.length; i++) {
            totalProject = i + 1;
            if (data[i].projectStatus == "Complited") {
                complitedArray.push(data[i].serialNumber);
            }
            if (data[i].projectStatus == "Pending") {
                pendingArray.push(data[i].serialNumber);
            }
            if (data[i].projectStatus == "Delivred") {
                delivredArray.push(data[i].serialNumber);
            }
        }
        for (let j = 0; j < complitedArray.length; j++) {
            if (j == undefined) {
                var complited = 0;
            } else {
                complited = j + 1;
            }
        }
        for (let r = 0; r < pendingArray.length; r++) {
            if (r == undefined) {
                var pending = 0;
            } else {
                pending = r + 1;
            }
        }
        for (let d = 0; d < delivredArray.length; d++) {
            if (d == undefined) {
                var delivred = 0;
            } else {
                delivred = d + 1;
            }
        }
        $("#complitedProject").append(
            `<h4 class="card-text"> ${complited} / ${totalProject} </h4>`
        );
        $("#receivedProject").append(
            `<h4 class="card-text"> ${pending} / ${totalProject} </h4>`
        );
        $("#delivredProject").append(
            `<h4 class="card-text"> ${delivred} / ${totalProject} </h4>`
        );
    }
});
var dates = [];
var toP = [];
var reP = [];
var duP = [];
$(document).ready(function() {
    $.ajax({
        url: "/allProjects/getProjectByLoockup",
        type: "GET",
        dataType: "json",
        async: false,
        success: data => {
            var dateArray = [];

            function getDates() {
                for (let val in data) {
                    if (!dateArray.includes(data[val].projectReceivedOn)) {
                        dateArray.push(data[val].projectReceivedOn);
                    }
                }
                return dateArray;
            }
            getDates()
            class Payment {
                constructor(date) {
                    this.date = date;
                    this.totalPayment = data
                        .filter(item => item.projectReceivedOn == date)
                        .map(
                            item =>
                            parseInt(item.totalPayment)
                        ).reduce((acc, val) => acc = acc + val);
                    this.paymentReceived = data
                        .filter(item => item.projectReceivedOn == date)
                        .map(item => parseInt(item.paymentReceived))
                        .reduce((acc, val) => acc = acc + val);
                    this.duePayment = this.totalPayment - this.paymentReceived
                }
            }
            dateArray.forEach(date => {
                var payment = new Payment(date);
                dates.push(payment.date)
                toP.push(payment.totalPayment)
                reP.push(payment.paymentReceived)
                duP.push(payment.duePayment)
            });

        }
    });
});

// var reverseArry = (arr) => {
//     var ret = new Array;
//     for (var i = arr.length - 1; i >= 0; i--) {
//         ret.push(arr[i]);
//     }
//     return ret;
// }
// var arr1 = ["20 Sept 2019", "22 Sept 2019", "2 Oct 2019", "4 Oct 2019", "5 Oct 2019"]
// console.log(reverseArry(arr1));
// console.log(dates);

$(document).ready(function() {
    var ctx = document.getElementById("myChart").getContext("2d");
    var chart = new Chart(ctx, {
        type: "line",
        data: {
            labels: _.reverse(dates),
            datasets: [{
                    label: "Total Payment",
                    showXLabels: 10,
                    borderWidth: 2,
                    backgroundColor: "rgba(6, 167, 125, 0.1)",
                    borderColor: "rgba(6, 167, 125, 1)",
                    pointBackgroundColor: "rgba(225, 225, 225, 1)",
                    pointBorderColor: "rgba(6, 167, 125, 1)",
                    pointHoverBackgroundColor: "rgba(6, 167, 125, 1)",
                    pointHoverBorderColor: "#fff",
                    data: _.reverse(toP)
                },
                {
                    label: "Received Payment",
                    borderWidth: 2,
                    showXLabels: 10,
                    backgroundColor: "rgba(26, 143, 227, 0.1)",
                    borderColor: "rgba(26, 143, 227, 1)",
                    pointBackgroundColor: "rgba(225, 225, 225, 1)",
                    pointBorderColor: "rgba(26, 143, 227, 1)",
                    pointHoverBackgroundColor: "rgba(26, 143, 227, 1)",
                    pointHoverBorderColor: "#fff",
                    data: _.reverse(reP),
                },
                {
                    label: "Due Payment",
                    borderWidth: 2,
                    showXLabels: 10,
                    backgroundColor: "rgba(246, 71, 64, 0.1)",
                    borderColor: "rgba(246, 71, 64, 1)",
                    pointBackgroundColor: "rgba(225, 225, 225, 1)",
                    pointBorderColor: "rgba(246, 71, 64, 1)",
                    pointHoverBackgroundColor: "rgba(246, 71, 64, 1)",
                    pointHoverBorderColor: "#fff",
                    data: _.reverse(duP)
                }
            ]
        },
        options: {}
    });
})
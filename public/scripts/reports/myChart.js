function getChartData(param) {
    var url;
    
    if (param == 'weight')
        url = $('#apiurl').val() + '/reports/weightlist';
    else if (param == "bloodsugar")
        url = $('#apiurl').val() + '/reports/bslist';
    else if (param == "bloodpressure")
        url = $('#apiurl').val() + '/reports/bplist';

    var request = $.ajax({
        url: url,
        type: "POST",
        headers: {
            "Bearer": $('#sessiontoken').val(),
            "contentType": 'application/json; charset=utf-8'
        }
    });
    request.done(function (data) {
        $('.loader').hide();
        //  console.log(data);
        var reportdata = [];
        var reportLabels = [];
        for (i = 0; i < data.length; i++) {
            reportdata.push(data[i].weight);
            reportLabels.push(data[i].date);
        }
        // data.push(result.thisWeek);
        // data.push(result.lastWeek);
        //var labels = result.labels;
        renderChart(reportdata, reportLabels);
    });
    request.fail(function (jqXHR, textStatus) {
        $('.loader').hide();
        console.log(jqXHR.responseText);
    });
}

function renderChart(data, labels) {
    var ctx = document.getElementById("myChart").getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'This week',
                data: data,
            }]
        },
    });
}
// $("#renderBtn").click(
//     function () {
//         data = [20000, 14000, 12000, 15000, 18000, 19000, 22000];
//         labels =  ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
//         renderChart(data, labels);
//     }
// );
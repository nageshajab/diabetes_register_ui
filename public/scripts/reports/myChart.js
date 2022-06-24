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
            var DataFromDataRow = readDataFromDataRow(data[i]);
            reportdata.push(DataFromDataRow);
            reportLabels.push(data[i].date);
        }
        renderChart(reportdata, reportLabels);
    });
    request.fail(function (jqXHR, textStatus) {
        $('.loader').hide();
        console.log(jqXHR.responseText);
    });
}

function readDataFromDataRow(data) {
    var param = $('#reportType').val();
    if (param == 'weight')
        return data.weight;
    else if (param == "bloodsugar")
        return data.bslf;
    else if (param == "bloodpressure")
        return data.bloodpressurepre;
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
$(document).ready(function () {
    getChartData($('#reportType').val());
});
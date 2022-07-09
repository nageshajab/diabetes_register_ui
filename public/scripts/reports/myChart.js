function getDate(d) {
    var d1 = new Date(d);
    var dd = d1.getDate();
    var mm = d1.getMonth() + 1;
    var yy = d1.getFullYear();

    return dd + '/' + mm + '/' + yy;
}

function GetUrl() {
    var url
    var param = $('#reportType').val();
    if (param == 'weight')
        url = $('#apiurl').val() + '/reports/weightlist';
    else if (param == "bloodsugar")
        url = $('#apiurl').val() + '/reports/bslist';
    else if (param == "bloodpressure")
        url = $('#apiurl').val() + '/reports/bplist';

    return url;
}

function getChartData(param) {
    var url = GetUrl();

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

        var reportdata1 = [];
        var reportdata2 = [];
        var reportLabels = [];

        var param = $('#reportType').val();
        for (i = 0; i < data.length; i++) {
            var DataFromDataRow = readDataFromDataRow(data[i]);
            if (param == 'weight') {
                reportdata1.push(DataFromDataRow);
            } else {
                reportdata1.push(DataFromDataRow[0]);
                reportdata2.push(DataFromDataRow[1]);
            }

            reportLabels.push(getDate(data[i].date));
        }

        if (param == 'weight') {
            renderChart(reportdata1, reportLabels);
        } else {
            renderChart1(reportdata1, reportdata2, reportLabels);
        }
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

    else if (param == "bloodsugar") {
        return [data.bslf, data.bslpp];
    } else if (param == "bloodpressure") {
        return [data.bloodpressurepre, data.bloodpressurepost];
    }
}

function renderChart(data, labels) {
    var ctx = document.getElementById("myChart");
    Chart.register(ChartDataLabels);
    Chart.defaults.set('plugins.datalabels', {
        color: 'black'
    });
    var myChart = new Chart(ctx, {
        type: 'bar',
        plugins: [ChartDataLabels],
        data: {
            labels: labels,
            datasets: [{
                label: 'This week',
                data: data,
                backgroundColor: "#FF8C00",
                fill: true
            }]
        },
        options: {
            responsive: true,
            plugins: {
                datalabels: {
                    anchor: 'end',
                    align: 'end',
                    labels: {
                        value: {
                            color: 'blue'
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: false
                }
            }
        }
    });
}

function renderChart1(data1, data2, labels) {

    var ctx = document.getElementById("myChart");
    Chart.register(ChartDataLabels);
    Chart.defaults.set('plugins.datalabels', {
        color: 'black'
    });
    var myChart = new Chart(ctx, {
        type: 'bar',
        plugins: [ChartDataLabels],
        data: {
            labels: labels,
            datasets: [{
                label: 'Pre',
                backgroundColor: "red",
                data: data1,
                fill: true
            }, {
                label: 'Post',
                backgroundColor: "green",
                data: data2,
                fill: true
            }]
        },
        options: {
            responsive: true,
            plugins: {
                datalabels: {
                    anchor: 'end',
                    align: 'end',
                    labels: {
                        value: {
                            color: 'blue'
                        }
                    }
                }
            }
        }
    });
}
$(document).ready(function () {
    getChartData($('#reportType').val());
});
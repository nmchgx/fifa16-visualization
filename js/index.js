$(document).ready(function ($) {
    for (var i = 0; i < fifa16.columns.length - 1; i++) {
        $("#xAxis").append("<option value=" + i + ">" + fifa16.columns[i] + "</option>");
        $("#yAxis").append("<option value=" + i + ">" + fifa16.columns[i] + "</option>");
    }

    var x = 0
    var y = 1
    $("#xAxis").val(x);
    $("#yAxis").val(y);

    $("#xAxis").change(function () {
        x = $(this).val();
        y = $("#yAxis").val();
        showECharts(fifa16.columns[x], fifa16.columns[y], convertData(x, y));
    });

    $("#yAxis").change(function () {
        x = $("#xAxis").val();
        y = $(this).val();
        showECharts(fifa16.columns[x], fifa16.columns[y], convertData(x, y));
    });

    showECharts(fifa16.columns[x], fifa16.columns[y], convertData(x, y));
});

var myChart = echarts.init(document.getElementById('fifa-box'), 'dark');
myChart.setOption({
    brush: {
        brushStyle: {
            borderWidth: 2,
            color: 'rgba(0,0,0,0.2)',
            borderColor: 'rgba(0,0,0,0.5)',
        }
    }
});


var convertData = function (x, y) {
    var res = [];
    var data = fifa16.data;
    data.sort(function (a, b) {
        return a[x] - b[x]
    });
    for (var i = 0, lastx = -1, lasty = -1; i < data.length; i++) {
        if (data[i][x] == lastx && data[i][y] == lasty) {
            res[res.length - 1].name += ', ' + data[i][29];
        } else {
            res.push({
                name: data[i][29],
                value: [data[i][x], data[i][y]]
            });
        }
        lastx = data[i][x];
        lasty = data[i][y];
    }
    return res;
};

function showECharts(x_label, y_label, data) {
    var option = {
        xAxis: {
            type: 'value',
            name: x_label
        },
        yAxis: {
            type: 'value',
            name: y_label
        },
        tooltip: {
            trigger: 'item',
            formatter: function (params) {
                return params.name + ' : ' + params.value;
            }
        },
        series: [{
            // large: true,
            // largeThreshold: 100,
            animationThreshold: 2000,
            symbolSize: 5,
            data: data,
            type: 'scatter',
            markPoint: {
                data: [{
                        type: 'max',
                        name: x_label + '最大值',
                        valueIndex: 0
                    },
                    {
                        type: 'min',
                        name: x_label + '最小值',
                        valueIndex: 0
                    },
                    {
                        type: 'max',
                        name: y_label + '最大值',
                        valueIndex: 1
                    },
                    {
                        type: 'min',
                        name: y_label + '最小值',
                        valueIndex: 1
                    }
                ]
            },
            markLine: {
                data: [{
                        type: 'average',
                        name: x_label + '平均值',
                        valueIndex: 0
                    },
                    {
                        type: 'average',
                        name: y_label + '平均值',
                        valueIndex: 1
                    }
                ]
            }
        }]
    };
    myChart.setOption(option);
};
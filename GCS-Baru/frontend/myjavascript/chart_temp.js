Chart.defaults.global.defaultFontFamily = "Roboto";
Chart.defaults.global.defaultFontSize = 18;
Chart.defaults.global.defaultFontColor = "white";
Chart.defaults.global.tooltips.enabled = false;
Chart.defaults.global.legend.display = false;
Chart.defaults.global.animation = false;
Chart.defaults.global.title.fontFamily = 'Roboto';
Chart.defaults.global.title.fontStyle = 'normal';
Chart.defaults.global.title.fontSize = 20;
Chart.plugins.register({
    afterRender: function(c) {
        console.log("afterRender called");
        var ctx = c.chart.ctx;
        ctx.save();
        ctx.globalCompositeOperation = 'destination-over';
        ctx.fillStyle = "rgba(47,79,79, 1)";
        ctx.fillRect(0, 0, c.chart.width, c.chart.height);
        ctx.restore();
    }
});


var tempCanvas = document.getElementById("tempChart");

var dataTemp = {
    data: [],
    lineTension: 0,
    fill: false,
    borderColor: 'rgb(255,127,80)'
};

var tempData = {
datasets: [dataTemp]
};

var tempOptions = { 
    title: {
        display: true,
        text: 'Grafik Parameter Temperatur',
        padding: 18,
    },  
    scales: {
        xAxes: [{
            type: 'linear',
            position: 'bottom',
            ticks: {
                min: -100,
                max: 50,
                stepSize: 50,
                callback: function(label, index, labels) {
                    return label.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                },
            },
            gridLines: {
                zeroLineColor: "white",
                color: "white",
                zeroLineWidth: 2,
                lineWidth: 2,
            },
            scaleLabel:{
                display: true,
                labelString: "Temperatur (°C)",
            }
        }],
        yAxes: [{
            ticks: {
                min: 0,
                max: 20000,
                stepSize: 2000,
                callback: function(label, index, labels) {
                    return label.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                },
            },
            gridLines: {
                zeroLineColor: "white",
                color: "white",
                zeroLineWidth: 2,
                lineWidth: 2,
            },
            scaleLabel: {
                display: true,
                labelString: "Ketinggian (m)",
            }
        }]
    },
    responsive: false,
};

var tempChart = new Chart(tempCanvas, {
    type: 'line',
    data: tempData,
    options: tempOptions
});

function addData(chart, x, y) {
    chart.data.datasets[0].data.push({
            x: x,
            y: y
    });
    chart.update();
}

var windDirCanvas = document.getElementById("windDirChart");

var datawindDir = {
    data: [],
    lineTension: 0,
    fill: false,
    borderColor: 'rgb(161, 222, 147)'
};

var windDirData = {
datasets: [datawindDir]
};

var windDirOptions = { 
    title: {
        display: true,
        text: 'Grafik Parameter Arah Angin',
        padding: 18,
    },  
    scales: {
        xAxes: [{
            type: 'linear',
            position: 'bottom',
            ticks: {
                min: 0,
                max: 400,
                stepSize: 200,
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
                labelString: "Arah Angin (°)",
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

var windDirChart = new Chart(windDirCanvas, {
    type: 'line',
    data: windDirData,
    options: windDirOptions
});


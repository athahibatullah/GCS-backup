
var pressureCanvas = document.getElementById("pressureChart");

var datapressure = {
    data: [],
    lineTension: 0,
    fill: false,
    borderColor: 'rgb(249, 102, 94)'
};

var pressureData = {
datasets: [datapressure]
};

var pressureOptions = { 
    title: {
        display: true,
        text: 'Grafik Parameter Tekanan',
        padding: 18,
    },  
    scales: {
        xAxes: [{
            type: 'linear',
            position: 'bottom',
            ticks: {
                min: 0,
                max: 1000,
                stepSize: 500,
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
                labelString: "Tekanan (mbar)",
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

var pressureChart = new Chart(pressureCanvas, {
    type: 'line',
    data: pressureData,
    options: pressureOptions
});


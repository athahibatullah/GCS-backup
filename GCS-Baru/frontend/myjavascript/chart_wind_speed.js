
var windSpeedCanvas = document.getElementById("windSpeedChart");

var datawindSpeed = {
    data: [],
    lineTension: 0,
    fill: false,
    borderColor: 'rgb(255, 165, 0)'
};

var windSpeedData = {
datasets: [datawindSpeed]
};

var windSpeedOptions = { 
    title: {
        display: true,
        text: 'Grafik Parameter Kecepatan Angin',
        padding: 18,
    },  
    scales: {
        xAxes: [{
            type: 'linear',
            position: 'bottom',
            ticks: {
                min: 0,
                max: 30,
                stepSize: 10,
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
                labelString: "Kecepatan Angin (m/s)",
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

var windSpeedChart = new Chart(windSpeedCanvas, {
    type: 'line',
    data: windSpeedData,
    options: windSpeedOptions
});



var humidCanvas = document.getElementById("humidChart");

var datahumid = {
    data: [],
    lineTension: 0,
    fill: false,
    borderColor: 'rgb(247, 244, 139)',
};

var humidData = {
datasets: [datahumid]
};

var humidOptions = { 
    title: {
        display: true,
        text: 'Grafik Parameter Kelembapan',
        padding: 18,
    },  
    scales: {
        xAxes: [{
            type: 'linear',
            position: 'bottom',
            ticks: {
                min: 0,
                max: 100,
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
                labelString: "Kelembapan (%)",
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

var humidChart = new Chart(humidCanvas, {
    type: 'line',
    data: humidData,
    options: humidOptions
});


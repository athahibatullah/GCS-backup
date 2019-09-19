Papa.parse("http://localhost:5000/csv_filter.csv", {
    download: true,
    header: true,
	complete: function(results) {
        results['data'].forEach(element => {
            if ( element['Id'] != "") {	
				if (i == 0){
					var d = new Date();
					var months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
					$('#init_tanggal').html('Tanggal Peluncuran : ' + d.getDate() + " " + months[d.getMonth()] + " " + d.getFullYear())
					$('#init_time').html('Waktu Peluncuran : ' + element['Waktu']);
					$('#init_latitude').html('Latitude : ' + parseFloat(element['Lintang']).toFixed(5));
					$('#init_longitude').html('Longitude : ' + parseFloat(element['Bujur']).toFixed(5));	
				}	
				addData(tempChart, parseFloat(element["Temperatur"]), parseFloat(element["Ketinggian"]));
				addData(humidChart, parseFloat(element["Kelembapan Relatif"]), parseFloat(element["Ketinggian"]));
				addData(pressureChart, parseFloat(element["Tekanan"]), parseFloat(element["Ketinggian"]));
				addData(windDirChart, parseFloat(element["Arah Angin"]), parseFloat(element["Ketinggian"]));
				addData(windSpeedChart, parseFloat(element["Kecepatan Angin"]), parseFloat(element["Ketinggian"]));
				updateText(element);
                updateMap(element);
                terminal_update(element)
            }
        });
	}
});
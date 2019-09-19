from flask import Flask, jsonify, Response
from flask_socketio import SocketIO, emit
from threading import Thread
from flask_cors import CORS

import serial
import dataset
import koneksi

app = Flask(__name__)
socket_io = SocketIO(app)
socket_io.init_app(app, cors_allowed_origins="*")
thread = None

cors = CORS(app)

db_path = 'sqlite:///databases.db?check_same_thread=False'
databases = dataset.connect(db_path)
table = databases['data']

muatan_port = 'COM10'
muatan_baudrate = 57600
muatan = serial.Serial(muatan_port, baudrate=muatan_baudrate)
ats_port = 'COM4'
ats_baudrate = 57600
# ats = serial.Serial(ats_port, baudrate=ats_baudrate)
ats = None
origin_latitude = -7.643765
origin_longitude = 107.685616

@app.route('/', methods = ['GET'])
def index():
    query = databases['data'].all()
    results = []
    for data in query:
        data_dict= {'ID_Peserta':data["ID_Peserta"],
                        'Waktu':data["Waktu"],
                        'Ketinggian':float(data["Ketinggian"]),
                        'Temperatur':float(data["Temperatur"]),
                        'Kelembapan_Relatif':float(data["Kelembapan_Relatif"]),
                        'Tekanan':float(data["Tekanan"]),
                        'Arah_Angin':float(data["Arah_Angin"]),
                        'Kecepatan_Angin':float(data["Kecepatan_Angin"]),
                        'Lintang':float(data["Lintang"]),
                        'Bujur':float(data["Bujur"]) }
        results.append(data_dict)
    return jsonify(results)

@app.route('/first')
def getFirstData():
    query = databases.query('''SELECT * FROM data ORDER BY strftime('%H:%M:%S',Waktu) limit 1;''')
    csv_header = "Id,Waktu,Ketinggian,Temperatur,Kelembapan Relatif,Tekanan,Arah Angin,Kecepatan Angin,Lintang,Bujur\n" 
    csv_string = csv_header 
    for row in query: 
        csv_string += (str(row['ID_Peserta']) + "," + str(row['Waktu']) + "," + str(row['Ketinggian']) + "," + str(row['Temperatur']) + "," + str(row['Kelembapan_Relatif']) + "," + str(row['Tekanan']) + "," + str(row['Arah_Angin']) + "," + str(row['Kecepatan_Angin']) + "," + str(row['Lintang']) + "," +str(row['Bujur']) + "\n") 
    return Response(csv_string, mimetype='text/csv')

@app.route("/csv_filter.csv") 
def csvData(): 
    csv_header = "Id,Waktu,Ketinggian,Temperatur,Kelembapan Relatif,Tekanan,Arah Angin,Kecepatan Angin,Lintang,Bujur\n" 
    query = databases['data'].all()
    csv_string = csv_header 
    for row in query: 
        csv_string += (str(row['ID_Peserta']) + "," + str(row['Waktu']) + "," + str(row['Ketinggian']) + "," + str(row['Temperatur']) + "," + str(row['Kelembapan_Relatif']) + "," + str(row['Tekanan']) + "," + str(row['Arah_Angin']) + "," + str(row['Kecepatan_Angin']) + "," + str(row['Lintang']) + "," +str(row['Bujur']) + "\n") 
    return Response(csv_string, mimetype='text/csv')

@socket_io.on('change connection')
def changer(data):
    global thread, socket_io
    if data["Connection"] == "Connected":
        muatan.close()
        # ats.close()
        muatan.open()
        # ats.open()
        print("Connect")
        if thread is None :
            thread = Thread(target=koneksi.background_thread, args=(muatan, ats, table, socket_io, origin_latitude, origin_longitude))
            thread.start()
    else:
        muatan.close()
        # ats.close()
        thread.join()

@socket_io.on("setting")
def setting(data):
    global muatan, muatan_port, muatan_baudrate
    global ats, ats_port, ats_baudrate
    global origin_latitude, origin_longitude
    # muatan_port = data["muatan_port"]
    # muatan_baudrate = data["muatan_baudrate"]
    # ats_port = data["ats_port"]
    # ats_baudrate = data["ats_baudrate"]
    # origin_latitude = data["origin_latitude"]
    # origin_longitude = data["origin_longitude"]
    # print(data)
    # muatan = serial.Serial(muatan_port, baudrate=muatan_baudrate)
    # ats = serial.Serial(ats_port, baudrate=ats_baudrate)
    # muatan.close()
    # ats.close()


if __name__ == '__main__':
    import csv
    with open('data.csv', mode='w') as csv_file :
        data_write = csv.writer(csv_file, delimiter=',', quoting=csv.QUOTE_NONE)
        data_write.writerow(['ID Peserta', 'Ketinggian', 'Temperatur', 'Kelembapan Relatif', 'Tekanan', 'Arah Angin', 'Kecepatan Angin', 'Lintang', 'Bujur'])
    socket_io.run(app)

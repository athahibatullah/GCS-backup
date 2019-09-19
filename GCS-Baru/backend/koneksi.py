import geo_calculator
import datetime
import time
import serial
import csv
from threading import Thread
from flask_socketio import SocketIO, emit
def background_thread(muatan, ats, table, socket_io, origin_latitude, origin_longitude):
    while True:
        print("Awal")
        raw_data = muatan.readline()
        decoded_data = (raw_data[0:len(raw_data)-2].decode("utf-8"))
        data = decoded_data.split(' ')
        # ats.reset_output_buffer()
        # ats.reset_input_buffer()
        print("data masuk")
        print(data)
        #import random
        #data = [random.uniform(0,1000),datetime.datetime.now().strftime("%H:%M:%S"),random.uniform(0,20000),random.uniform(-100,50),random.uniform(0,100),random.uniform(0,1000),random.uniform(0,400),random.uniform(0,30),random.uniform(0,0.1)-8.0,random.uniform(0,0.1)+110]
        with open('data.csv', mode='a') as csv_file :
            data_write = csv.writer(csv_file, delimiter=',', quoting=csv.QUOTE_NONE)
            data_write.writerow(data)
        # if len(data) == 3 :
        #     bearing = geo_calculator.calculate_compass_bearing(float(data[1]), float(data[2]), origin_latitude, origin_longitude)
        #     vertical = geo_calculator.calculate_vertical_angle(geo_calculator.calculate_distance(float(data[1]), float(data[2]), origin_latitude, origin_longitude), float(data[0]))
        #     bearing_plus_vertical = str(int(bearing)) + " " + str(int(vertical))
        #     ats.write(bytes(bearing_plus_vertical, 'utf-8'))
        #     ats_data = ats.readline()
        #     print((ats_data[0:len(ats_data)-2].decode("utf-8")))
        if len(data) == 10 :
            data_dict= {'ID_Peserta':data[0],
                            'Waktu':data[1],
                            'Ketinggian':float(data[2]),
                            'Temperatur':float(data[3]),
                            'Kelembapan_Relatif':float(data[4]),
                            'Tekanan':float(data[5]),
                            'Arah_Angin':float(data[6]),
                            'Kecepatan_Angin':float(data[7]),
                            'Lintang':float(data[8]),
                            'Bujur':float(data[9]) }
            print(data_dict)
            table.insert(data_dict)
            socket_io.emit("data enter", data_dict)
            bearing = geo_calculator.calculate_compass_bearing(data_dict['Lintang'], data_dict['Bujur'], origin_latitude, origin_longitude)
            vertical = geo_calculator.calculate_vertical_angle(geo_calculator.calculate_distance(data_dict['Lintang'], data_dict['Bujur'], origin_latitude, origin_longitude), data_dict['Ketinggian'])
            bearing_plus_vertical = str(int(bearing)) + " " + str(int(vertical))
            # ats.write(bytes(bearing_plus_vertical, 'utf-8'))
            # ats_data = ats.readline()
            # print((ats_data[0:len(ats_data)-2].decode("utf-8")))
            print(bearing_plus_vertical)
            print(origin_latitude)
            print(origin_longitude)
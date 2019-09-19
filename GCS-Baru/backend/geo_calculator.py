import math

def calculate_compass_bearing(target_latitude, target_longitude, origin_latitude, origin_longitude):
    diff_longitude = math.radians(target_longitude - origin_longitude)
    x = math.sin(diff_longitude) * math.cos(math.radians(target_latitude))
    y = math.cos(math.radians(origin_latitude)) * math.sin(math.radians(target_latitude)) - (math.sin(math.radians(origin_latitude)) * math.cos(math.radians(target_latitude)) * math.cos(diff_longitude))
    bearing = math.atan2(x, y)
    bearing = math.degrees(bearing)
    compass_bearing = (bearing+360) % 360
    
    return compass_bearing

def calculate_distance(target_latitude, target_longitude, origin_latitude, origin_longitude):
    earth_radius = 6373000
    diff_latitude = math.radians(target_latitude - origin_latitude)
    diff_longitude = math.radians(target_longitude - origin_longitude)
    a = math.sin(diff_latitude/2) * math.sin(diff_latitude/2) + math.cos(math.radians(origin_latitude)) \
    * math.cos(math.radians(target_latitude)) * math.sin(diff_longitude/2) * math.sin(diff_longitude/2)
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1-a))
    distance = earth_radius * c
    return distance

def calculate_vertical_angle(distance, height):
    radians = math.atan2(height, distance)
    angle = radians * (180 / math.pi)
    return angle

from redis import Redis
import requests
import os
import json

api_key = os.environ["OPENWEATHER_API_KEY"]
redis_cli = Redis(host="redis", port=6379) 

def populate_db():
    input_locations = get_locations()

    for i in range(len(input_locations)):
        latitude = input_locations[i]["coord"]["lat"]
        longitude = input_locations[i]["coord"]["lon"]
        current_weather = fetch_weather_data(latitude, longitude)

        weather_data = json.dumps({"location": input_locations[i]["city"]+ ", " + input_locations[i]["country"], "currentWeather": current_weather})

        redis_cli.set(i, weather_data)
    

def fetch_weather_data(latitude, longitude):

    response = requests.get(f"http://api.openweathermap.org/data/2.5/weather?lat={latitude}&lon={longitude}&appid={api_key}").json()
    current_weather = response["weather"][0]["main"]
    current_temp = response["main"]["temp"]

    current_data = {"weather": current_weather, "temperature": current_temp}

    return current_data

def get_locations():
    response = requests.get("http://city-gen-service:3000").json()

    location_array = response["coordinates"]
    connection = redis_cli.ping()
    print(connection, "Connection to Redis")

    return location_array

def get_db_size():
    return redis_cli.dbsize()

def get_location_batch():  

    db_size = get_db_size()   

    query_list = [str(x) for x in range(db_size-1, db_size-5, -1)]

    location_batch = redis_cli.mget(query_list)
    parsed_data = []
    for item in location_batch:
        json_str = item.decode('utf-8')
        parsed_data.append(json.loads(json_str))
    
    for i in query_list:
        redis_cli.delete(str(i))

    return parsed_data

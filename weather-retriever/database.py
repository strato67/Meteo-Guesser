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
        current_weather = "t" #fetch_weather_data(latitude, longitude)

        weather_data = json.dumps({"location": input_locations[i], "currentWeather": current_weather})

        redis_cli.set(i, weather_data)
    

def fetch_weather_data(latitude, longitude):

    response = requests.get(f"http://api.openweathermap.org/data/2.5/weather?lat={latitude}&lon={longitude}&appid={api_key}").json()
    return response

def get_locations():
    response = requests.get("http://city-gen-service:3000").json()

    location_array = response["coordinates"]
    connection = redis_cli.ping()
    print(connection, "Connection to Redis")

    return location_array

def get_db_size():
    return redis_cli.dbsize()
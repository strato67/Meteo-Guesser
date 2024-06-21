from redis import Redis
import requests
import os
import json
import time
import random
from mem_store import backup_db

api_key = os.environ["OPENWEATHER_API_KEY"]
city_gen_url = os.environ["CITY_GEN_URL"]
city_gen_port = os.environ["CITY_GEN_PORT"]

redis_host = os.environ["REDIS_HOST"]
redis_port = os.environ["REDIS_PORT"]

redis_cli = Redis(host=redis_host, port=int(redis_port)) 

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
    response = requests.get(f"http://{city_gen_url}:{city_gen_port}").json()

    location_array = response["coordinates"]
    connection = redis_cli.ping()
    print(connection, "Connection to Redis")

    return location_array

def get_db_size():
    return redis_cli.dbsize()

def get_location_batch(retries=3, delay=1):
    db_size = get_db_size()

    if db_size == 0:
        populate_db()
        db_size = get_db_size()
        print(f"Database repopulated. New size: {db_size}")

    query_list = [str(x) for x in range(max(0, db_size-5), db_size)]
    print(f"Query list: {query_list}")

    for attempt in range(retries):
        location_batch = redis_cli.mget(query_list)
        print(f"Attempt {attempt + 1}: Location batch: {location_batch}")
        parsed_data = []
        all_items_valid = True

        for item in location_batch:
            if item is not None:
                try:
                    json_str = item
                    parsed_data.append(json.loads(json_str))
                except json.JSONDecodeError as e:
                    print(f"Error decoding JSON for item: {item} - {e}")
                    parsed_data.append(random.choice(backup_db))
            else:
                print("Warning: Retrieved None for an item in the query list")
                all_items_valid = False
                break

        if all_items_valid:

            for i in query_list:
                redis_cli.delete(str(i))
            return parsed_data

        time.sleep(delay)

    print(f"Failed to retrieve valid data after {retries} retries. Returning fallback data.")
    return [random.choice(backup_db) for _ in query_list]

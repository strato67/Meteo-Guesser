from redis import Redis
import requests
import os

api_key = os.environ["OPENWEATHER_API_KEY"] 

def populate_db():
    print("Not implemented yet")

def fetch_weather_data(location_list):

    print("Not implemented yet")

def get_locations():
    response = requests.get("http://city-gen-service:3000").json()

    location_array = response["coordinates"]

    return location_array
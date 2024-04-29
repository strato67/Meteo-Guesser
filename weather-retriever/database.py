from redis import Redis
import requests

def populate_db():
    print("Not implemented yet")

def fetch_weather_data(city):
    print("Not implemented yet")

def get_locations():
    location_list = requests.get("http://city-gen-service:3000")
    return location_list.json()
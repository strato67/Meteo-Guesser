from flask import Flask
from redis import Redis
from database import fetch_weather_data, populate_db, get_locations

app = Flask(__name__)

@app.route('/')
def get_weather():
    location = get_locations()
    test = {"message": location}
    return test

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=4200, debug=True)
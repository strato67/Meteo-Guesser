from flask import Flask
from redis import Redis
from database import fetch_weather_data, populate_db, get_locations, get_db_size

app = Flask(__name__)

@app.route('/')
def get_weather():

    db_size = get_db_size()

    if db_size == 0:
        # location = get_locations()
        populate_db()
        print("Cache database populated", flush=True)
    test = {"message": db_size}
    print("Sending weather locations...", flush=True)
    return test

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=4200, debug=True)
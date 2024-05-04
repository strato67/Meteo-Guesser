from flask import Flask
from database import populate_db, get_db_size, get_location_batch

app = Flask(__name__)

@app.route('/')
def get_weather():

    db_size = get_db_size()
    # get_locations()
    if db_size == 0:
        # location = get_locations()
        populate_db()
        print("Cache database populated", flush=True)
    location_payload = get_location_batch()
    response = {"queue": location_payload}
    print("Sending weather locations...", flush=True)
    return response

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=4200, debug=True)
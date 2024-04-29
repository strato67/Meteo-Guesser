from flask import Flask
from redis import Redis

app = Flask(__name__)

@app.route('/')
def get_weather():
    test = {"message": "Hello world"}

    return test

if __name__ == '__main__':
    app.run(host="localhost", port=4200, debug=True)
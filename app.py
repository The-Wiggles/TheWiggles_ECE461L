from flask import Flask, jsonify, request
from flask.helpers import send_from_directory

import mongo

app = Flask(__name__, static_folder='./fruit-salad/build', static_url_path='/')

# to run locally, install gunicorn and:
# gunicorn app:app

# gunicorn doesn't work on windows:
# pip install waitress
# waitress-serve app:app
# can access via localhost:8080

# POST: adding
# PUT: updating
# GET: retrieving
# DELETE: removing


@app.route('/')
def serve():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/test')
def test():
    return 'Hello, World'

@app.route('/add_user', methods=['POST'])
def add_user():
    request_data = request.get_json(); # request must have application/json content type
    user = request_data['user']
    password = request_data['password']
    result = mongo.addNewUser(user,password)
    return result

if __name__ == '__main__':
    app.run()
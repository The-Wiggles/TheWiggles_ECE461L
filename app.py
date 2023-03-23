from flask import Flask, jsonify, request, make_response
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

@app.errorhandler(404)
def page_not_found(e):
    pass
    # TODO: DO STUFF, SERVE 404 PAGE, OR REDIRECTOTO INDEX?

@app.route('/test')
def test():
    return 'Hello, World'

@app.route('/users', methods=['POST', 'GET'])
def user():
    if request.method == 'POST':
        return add_user()
    elif request.method == 'GET':
        return login()
    else:
        return "uhhh" #TODO: CHANGE THIS TO PROPER ERROR RESPONSE
    

def add_user():
    request_data = request.get_json() # request must have application/json content type
    userid = request_data['userid']
    password = request_data['password']
    result = mongo.addNewUser(userid,password)
    
    data = {"status": "success"}
    status_code = 201
    if result != 0:
        data['status'] = "failure"
        status_code = 400
    resp = make_response(jsonify(data), status_code)
    return resp

def login():
    request_data = request.get_json()
    userid = request_data['userid']
    password = request_data['password']
    result = mongo.login(userid,password)

    data = {"status": "success"}
    status_code = 200

    if result == 0:
        data.update({"userid": userid})
    else:
        data = {"status": "failure"}
        status_code = 400

    resp = make_response(jsonify(data), status_code)
    return resp

@app.route('/projects', methods=['POST'])
def add_project():
    request_data = request.get_json() # request must have application/json content type
    name = request_data['name']
    description = request_data['description']
    pid = request_data['pid']
    result = mongo.addNewProject(name, description, pid)
    
    data = {"status": "success"}
    status_code = 201
    if(result != 0):
        data['status'] = "failure"
        status_code = 400
    resp = make_response(jsonify(data), status_code)
    
    return resp

if __name__ == '__main__':
    app.run()

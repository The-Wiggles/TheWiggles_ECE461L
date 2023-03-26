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

@app.route('/users', methods=['POST'])
def user():

    if 'Login' in request.headers:
        if request.headers['Login'] == "true":
            return user_login()

    return user_add()
    

def user_add():
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

def user_login():
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
        status_code = 401

    resp = make_response(jsonify(data), status_code)
    return resp

@app.route('/projects', methods=['POST'])
def add_project():
    request_data = request.get_json()
    name = request_data['name']
    description = request_data['description']
    pid = request_data['pid']
    authlist = request_data['authlist']

    result = mongo.addNewProject(name, description, pid, authlist)
    
    data = {"status": "success"}
    status_code = 201
    if(result != 0):
        data['status'] = "failure"
        status_code = 400
    resp = make_response(jsonify(data), status_code)
    
    if status_code == 201:
        add_authorized_result = mongo.project_add_authorized_user(pid, authlist[0])
        if add_authorized_result == None:
            data['status'] = "failure"
            status_code = 400

    return resp

@app.route('/projects', methods=['GET'])
def get_projects():

    pid = request.args.get("pid")
    if pid != None:
        return query_project(pid)
    
    userid = request.args.get("userid")

    if userid == None:
        return make_response(jsonify({"status": "failure"}),400)
    
    projects = mongo.getProjects(userid)

    if projects == None:
        return make_response(jsonify({"status": "failure"}),400)
    
    return make_response(jsonify(projects), 200)


def query_project(pid):
    project = mongo.queryProject(pid)
    if project == None:
        return make_response(jsonify({"status": "failure"}),400)
    return make_response(jsonify(project), 200)

@app.route('/hardwaresets', methods=['GET'])
def hwset_query():
    hwset_name = request.args.get("name")

    if hwset_name == None:
        return make_response(jsonify({"status": "failure"}), 400)
    
    hwset = mongo.hwset_getstats(hwset_name)

    if hwset == None:
        return make_response(jsonify({"status": "failure"}), 400)
    
    return make_response(jsonify(hwset), 200)


@app.route('/hardwaresets/checkin', methods=['POST'])
def hwset_checkin():
    request_data = request.get_json()
    hwset_name = request_data['name']
    qty = request_data['qty']
    pid = request_data['pid']
    result = mongo.hwset_checkin(hwset_name,qty,pid)
    if result == None:
        return make_response(jsonify({"status": "failure"}), 400)
    return make_response(jsonify({"status": "success"}),200)

@app.route('/hardwaresets/checkout', methods=['POST'])
def hwset_checkout():
    request_data = request.get_json()
    hwset_name = request_data['name']
    qty = request_data['qty']
    pid = request_data['pid']
    checked_out = mongo.hwset_checkout(hwset_name,qty,pid)
    if checked_out == None:
        return make_response(jsonify({"status": "failure"}), 400)
    
    return make_response(jsonify({"checked_out": checked_out}), 200)

if __name__ == '__main__':
    app.run()

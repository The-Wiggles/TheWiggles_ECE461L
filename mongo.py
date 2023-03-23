import pymongo
import cipher

# TODO: how to hide this connection string during deployment? is it even possible?
db_connection_string = "mongodb+srv://admin:ECE461L_TheWiggles@cluster0.ypsn3um.mongodb.net/?retryWrites=true&w=majority"

def addNewUser(userid, password):
    #TODO: projects this user can access?
    client = pymongo.MongoClient(db_connection_string)
    db = client["fruit-salad"]
    users = db["users"] # users collection under fruit-salad database

    ret = 0

    if users.find_one({"userid" : userid}):
        ret = 1
    else:
        new_user_doc = {"userid": userid, "password": cipher.encrypt(password, 2, 1)}
        user_inserted_id = users.insert_one(new_user_doc).inserted_id


    client.close()
    return ret

# Check if userid is valid, then if password is valid.
def login(userid, password):
    client = pymongo.MongoClient(db_connection_string)
    db = client["fruit-salad"]
    users = db["users"]

    user = users.find_one({"userid" : userid})

    if user == None:
        return 'userid not found'
    
    login_pass_encrypted = cipher.encrypt(password, 2, 1)
    db_pass_encrypted = user['password']

    if login_pass_encrypted == db_pass_encrypted:
        return 'login success'
    else:
        return 'login fail'


def addNewProject(name, description, pid):
    #TODO: authlist???
    client = pymongo.MongoClient(db_connection_string)
    db = client["fruit-salad"]
    projects = db["projects"] # users collection under fruit-salad database

    ret = 0

    if projects.find_one({"pid" : pid}):
        ret = 1
    else:
        new_projects_doc = {"name": name, "description": description, "pid": pid, "HWSet1_qty": 0, "HWSet2_qty": 0}
        projects.insert_one(new_projects_doc)


    client.close()
    return ret

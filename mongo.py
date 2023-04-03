import pymongo
import cipher

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
        new_user_doc = {"userid": userid, "password": cipher.encrypt(password, 2, 1), "projectlist": []}
        users.insert_one(new_user_doc)

    client.close()
    return ret

# Check if userid is valid, then if password is valid.
def login(userid, password):
    client = pymongo.MongoClient(db_connection_string)
    db = client["fruit-salad"]
    users = db["users"]

    user = users.find_one({"userid" : userid})

    ret = 0

    if user == None:
        ret = 1
        client.close()
        return ret
    
    login_pass_encrypted = cipher.encrypt(password, 2, 1)
    db_pass_encrypted = user['password']

    if login_pass_encrypted == db_pass_encrypted:
        ret = 0
    else:
        ret = 1
    
    client.close()
    return ret


def addNewProject(name, description, pid, authlist):
    client = pymongo.MongoClient(db_connection_string)
    db = client["fruit-salad"]
    projects = db["projects"] # users collection under fruit-salad database

    ret = 0

    if projects.find_one({"pid" : pid}):
        ret = 1
    else:
        new_project_doc = { "name": name, 
                            "description": description, 
                            "pid": pid,
                            "authlist": authlist, 
                            "hwsets": {
                                "HWSet1": 0,
                                "HWSet2": 0
                            }
                        }
        projects.insert_one(new_project_doc)


    client.close()
    return ret

def queryProject(pid):
    client = pymongo.MongoClient(db_connection_string)
    db = client["fruit-salad"]
    projects = db["projects"]

    project = projects.find_one({"pid": pid})
    del project['_id']
    client.close()
    return project
    
def project_add_authorized_user(pid, userid):
    client = pymongo.MongoClient(db_connection_string)
    db = client["fruit-salad"]
    projects = db["projects"]
    users = db["users"]

    project = projects.find_one({'pid': pid})
    user = users.find_one({'userid': userid})
    if project == None or user == None:
        client.close()
        return
    
    user_projectlist = user['projectlist']
    if pid not in user_projectlist:
        user_projectlist.append(pid)
    users.update_one({'userid': userid}, {'$set': {"projectlist": user_projectlist}})
    
    project_authlist = project['authlist']
    if userid not in project_authlist:
        project_authlist.append(userid)
    projects.update_one({'pid':pid}, {'$set': {'authlist': project_authlist}})

    client.close()
    return 0

def getProjects(userid):
    client = pymongo.MongoClient(db_connection_string)
    db = client["fruit-salad"]
    projects = db["projects"]
    users = db["users"]
    user = users.find_one({"userid" : userid})
    if user == None:
        return None
    
    user_projects = []

    for pid in user['projectlist']:
        project = projects.find_one({"pid": pid})
        project_no_id = project
        del project_no_id['_id']
        user_projects.append(project_no_id)

    client.close()
    return user_projects

def project_leave(pid, userid):
    client = pymongo.MongoClient(db_connection_string)
    db = client["fruit-salad"]
    projects = db["projects"]
    users = db["users"]

    project = projects.find_one({'pid': pid})
    user = users.find_one({'userid': userid})
    if project == None or user == None:
        client.close()
        return
    

    user_projectlist = user['projectlist']
    project_authlist = project['authlist']
    if pid not in user_projectlist:
        client.close()
        return
    if userid not in project_authlist:
        client.close()
        return
    
    user_projectlist.remove(pid)
    project_authlist.remove(userid)
    users.update_one({'userid': userid}, {'$set': {"projectlist": user_projectlist}})
    projects.update_one({'pid':pid}, {'$set': {'authlist': project_authlist}})

    if(len(project_authlist) == 0):
        project_hwsets = project['hwsets']
        HWSet1 = project_hwsets['HWSet1']
        HWSet2 = project_hwsets['HWSet2']
        hwset_checkin("HWSet1", HWSet1, pid)
        hwset_checkin("HWSet2", HWSet2, pid)
        projects.delete_one({'pid': pid})

    client.close()
    return 0

def hwset_getstats(name):
    client = pymongo.MongoClient(db_connection_string)
    db = client["fruit-salad"]
    hardware_sets = db["hardware_sets"]
    hwset = hardware_sets.find_one({"name": name})
    if hwset == None:
        client.close()
        return None
    
    del hwset['_id']

    client.close()
    return hwset

def hwset_checkin(hwset_name,qty,pid):
    client = pymongo.MongoClient(db_connection_string)
    db = client["fruit-salad"]
    hardware_sets = db["hardware_sets"]
    projects = db["projects"]

    hwset = hardware_sets.find_one({"name": hwset_name})
    project = projects.find_one({"pid": pid})

    if hwset == None or project == None:
        client.close()
        return

    # remove from project
    checked_in_qty = qty
    project_hwsets = project['hwsets']
    project_hwset_qty = project_hwsets[hwset_name]

    if checked_in_qty > project_hwset_qty:
        checked_in_qty = project_hwset_qty
        project_hwset_qty = 0
    else:
        project_hwset_qty -= checked_in_qty
    
    project_hwsets[hwset_name] = project_hwset_qty
    projects.update_one({'pid':pid}, {"$set": {'hwsets': project_hwsets}})

    # add to hwset
    hwset_capacity = hwset['capacity']
    hwset_available = hwset['available']
    hwset_available += checked_in_qty
    if hwset_available > hwset_capacity:
        hwset_available = hwset_capacity
    
    hardware_sets.update_one({'name':hwset_name}, {"$set":{'available':hwset_available}})

    client.close()
    return 0

def hwset_checkout(hwset_name,qty,pid):
    client = pymongo.MongoClient(db_connection_string)
    db = client["fruit-salad"]
    hardware_sets = db["hardware_sets"]
    projects = db["projects"]

    hwset = hardware_sets.find_one({"name": hwset_name})
    project = projects.find_one({"pid": pid})

    if hwset == None or project == None:
        client.close()
        return

    # remove from hwset
    hwset_available = hwset['available']
    checked_out = qty
    if qty > hwset_available:
        checked_out = hwset_available
        hwset_available = 0
    else:
        hwset_available -= checked_out
    
    hardware_sets.update_one({'name':hwset_name}, {"$set":{'available':hwset_available}})

    # add to pid (read, modify, write)
    project_hwsets = project['hwsets']
    project_hwset_qty = project_hwsets[hwset_name]

    project_hwset_qty += checked_out

    project_hwsets[hwset_name] = project_hwset_qty
    projects.update_one({'pid':pid}, {"$set": {'hwsets': project_hwsets}})

    client.close()
    return checked_out

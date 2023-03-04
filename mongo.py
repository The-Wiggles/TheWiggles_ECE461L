import pymongo
import cipher

db_connection_string = "mongodb+srv://admin:ECE461L_TheWiggles@cluster0.ypsn3um.mongodb.net/?retryWrites=true&w=majority"

def addNewUser(userid, password):
    client = pymongo.MongoClient(db_connection_string)
    db = client["fruit-salad"]
    users = db["users"] # users collection under fruit-salad database

    if users.find_one({"userid" : userid}):
        print("User already exists") # can replace this with different return value later
        return

    new_user_doc = {"userid": userid, "password": cipher.encrypt(password, 2, 1)}
    users.insert_one(new_user_doc)
    client.close()
    return

# Check if userid is valid, then if password is valid.
def login(userid, password):
    pass



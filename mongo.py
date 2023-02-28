import pymongo
import cipher
def addNewUser(userid, password):
    client = pymongo.MongoClient("mongodb+srv://asamant:EE461LSp23@cluster0.oovet.mongodb.net/?retryWrites=true&w=majority")
    db = client.Users

    user = db[userid]

    if user.find_one({"userid" : userid}):
        print("User already exists") # can replace this with different return value later
        return

    myname = {"userid": userid,
        "password": cipher.encrypt(password, 2, 1)}

    myname_id = user.insert_one(myname).inserted_id
    client.close()
    return

# Check if userid is valid, then if password is valid.
def login(userid, password):




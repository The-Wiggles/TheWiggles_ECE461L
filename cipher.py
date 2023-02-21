# Zahid Hossain
# ECE 461L Software lab HW2

import os

# valid ascii values from 34 to 126 | 93 values
# map [0, 92] onto [34, 126]
# 127 should loop back to 34
# 33 should loop back to 126
# wrapped value = 34 + [(ascii - 34) % 93]
# same code would not work in C because of how python handles % operator

def encrypt(inputText:str, N:int, D:int):

    if((D != -1) and (D != 1)):
        print("Direction error | input 1 or -1")
        return -1
    
    if(N < 1):
        print("Shift amount must be >= 1")
        return -1

    reversedText = inputText[::-1] # reverse input using slice
    cipherText = ""
    for i in range(len(reversedText)):
        char = reversedText[i]
        ascii_value = ord(char)
        
        if((ascii_value < 34) or (ascii_value > 126)):
            print("string contains invalid characters")
            return -1
        
        ascii_value += N*D # shift
        ascii_value = 34 + ((ascii_value - 34) % 93) # wrap values outside [34, 126]
        cipherText += chr(ascii_value)

    return cipherText

def decrypt(inputText:str, N:int, D:int):
    
    if((D != -1) and (D != 1)):
        print("Invalid shift direction | input 1 or -1")
        return -1

    if(N < 1):
        print("Shift amount must be >= 1")
        return -1

    reversedText = inputText[::-1]
    decryptedText = ""
    for i in range(len(reversedText)):
        char = reversedText[i]
        ascii_value = ord(char)
        
        if((ascii_value < 32) or (ascii_value > 126)):
            print("string contains non-printable characters")
            return -1
        
        ascii_value -= N*D # reverse shift
        ascii_value = 34 + ((ascii_value - 34) % 93) # wrap values outside [34, 126]
        decryptedText += chr(ascii_value)

    return decryptedText

# function to test encrypt and decrypt with various shift parameters for robustness
def cipher_testmain():
    strings = ["TSET", "water", "\"#$%&'", "yz{|}~"]
    shifts = [1, 2, 300, 3000]
    directions = [1, -1]

    for D in directions:
        print("Direction = " + str(D))
        print()
        for N in shifts:
            print("Shift = " + str(N))
            for string in strings:
                string_enc = encrypt(string,N,D)
                string_dec = decrypt(string_enc,N,D)
                if(string == string_dec):
                    print("PASS: ", end="")
                else:
                    print("FAIL: ", end="")
                print(string + " -> ", end="")
                print(string_enc + " -> ", end="")
                print(string_dec)
            print()
        print()

    return

def decryptDatabase(db_path:str, N:int, D:int):

    if os.path.exists(db_path) == False:
        print("File [" + db_path + "] does not exist")
        return

    db_file = open(db_path)
    db_entries = []
    for line in db_file:
        line_array = line.split()
        userid = line_array[0]
        password = line_array[1]
        db_entries.append({"userid": userid, "password": password})
    db_file.close()

    for entry in db_entries:
        userid_dec = decrypt(entry["userid"], N, D)
        password_dec = decrypt(entry["password"], N, D)
        print(userid_dec + "\t", end="")
        print(password_dec)

    return

## DECRYPTED DATABASE OUTPUT: 
# asamant Temp123
# aissa   Light%^&
# bjha    $72Hello
# skharel Life15$
# Ally    God$12

# 1) Which of the userid and password combination(s) in the table above are present in the database?
#    {asamant, Temp123} | {skharel, Life15$}

# 2) Which userid(s) is/are present in the database, but the password does not match the password(s) in the table above?
#    {aissa, Light%^&} | {bjha, $72Hello}

# 3) Which userid(s) do/does not meet the requirements of a userid?
#    Ally!

# -- coding: utf-8 --

from cryptography.fernet import Fernet
import serial
import math
import time

key = Fernet.generate_key()
cipher_suite = Fernet('bQuRLTddkYP8-HTPIwk5G_jIPoflVjttCBBllpoNk0I=')
print(key)
cipher_text = cipher_suite.encrypt(b"5시간전")
plain_text = cipher_suite.decrypt(cipher_text)
print("encrypt_text : ", cipher_text)
print("decrypt_text : ", plain_text)

ser =serial.Serial('/dev/ttyUSB0',9600)
div_30=int(math.ceil(float(len(cipher_text))/float(30)))
            
ser.write(bytes(str(div_30)+'~'))
print('div_30:',div_30)
try:
    for i in range(0,div_30):
        str1=cipher_text[:30]+'~'
        ser.write(bytes((str1.encode())))
        time.sleep(1)
        print('str1:'+str1)       
        cipher_text=cipher_text[30:]

except:
    pass
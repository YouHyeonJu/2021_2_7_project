# -- coding: utf-8 --
import base64
import math
import serial
import time
from Crypto import Random
from Crypto.Cipher import AES
import pymysql

connection = pymysql.connect(
    user='root',
    passwd='',
    host='127.0.0.1',
    db='mydb',
    charset='utf8'
)
cursor = connection.cursor(pymysql.cursors.DictCursor)
sql = 'SELECT * FROM notice'
while True:
    try:
        cursor.execute(sql)
        result = cursor.fetchall()
        print(result[0]['text'])
        message = resut[0]['text']
        sql = 'DELETE * FROM notice'
        cursor.execute(sql)

        BS = 16
        pad = lambda s: s+(BS -len(s) % BS) * chr(BS - len(s) % BS)
        unpad = lambda s: s[0:-ord(s[-1])]

        class AESCipher:
            def __init__(self, key):
                self.key = key
            def encrypt(self, raw):
                raw = pad(raw)
                iv = Random.new().read(AES.block_size)
                cipher = AES.new(self.key, AES.MODE_CBC, iv)
                return base64.b64encode(iv + cipher.encrypt(raw))
            def decrypt(self, enc):
                enc = base64.b64decode(enc)
                iv = enc[:16]
                cipher = AES.new(self.key, AES.MODE_CBC, iv)
                return unpad(cipher.decrypt(enc[16:]))

        if __name__ == '__main__':
            key = '!01234!5678998765!43210!'
            json_str = message
            cipher = AESCipher(key)
            encrypted = cipher.encrypt(json_str)
            decrypted = cipher.decrypt(encrypted)
            print('Key:'+key)
            print('Enc:'+encrypted)
            print('Dec:'+decrypted)

            ser =serial.Serial('/dev/ttyUSB0',9600)
            div_30=int(math.ceil(float(len(encrypted))/float(30)))
            
            ser.write(bytes(str(div_30)+'~'))
            print('div_30:',div_30)
            try:
                for i in range(0,div_30):
                    str1=encrypted[:30]+'~'
                    ser.write(bytes((str1.encode())))
                    time.sleep(1)
                    print('str1:'+str1)       
                    encrypted=encrypted[30:]

            except:
                pass
    except:
        pass

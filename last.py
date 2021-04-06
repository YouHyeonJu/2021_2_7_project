import serial
import pymysql
ser = serial.Serial('/dev/ttyUSB0', 9600)
str = 'this is raspberry'
#ser.write(bytes(str.encode()))
connection = pymysql.connect(
    user='root',
    passwd='',
    host='127.0.0.1',
    db='mydb',
    charset='utf8'
)
cursor = connection.cursor(pymysql.cursors.DictCursor)
while True:
    while True:
        number = ''
        while True:
            
            res = ser.read(1)
            if res == '~':
                break
            number+=res
        if number == 'p':
            result = ''
            while True:
                res = ser.read(1)
                if res == '~':
                    break
                result += res
            
            print(result)
            break
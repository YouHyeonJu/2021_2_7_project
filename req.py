
# -*- coding: utf-8 -*-
import serial
ser = serial.Serial('/dev/ttyUSB0', 9600)
str = 'this is raspberry'
#ser.write(bytes(str.encode()))

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
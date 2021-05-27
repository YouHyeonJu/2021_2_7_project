import serial


port='/dev/ttyACM0'
serialFromArduino=serial.Serial(port,9600)
ser =serial.Serial('/dev/ttyUSB0',9600)

while True:
             
    try:
        f=open('test.txt', 'r')
        line = int(f.readline())
        print(line, type(line))
        f.close()
        f=open('test.txt', 'a')
        f.write('~')
        
        print(line)
        serialFromArduino.write(str(line))
        print(""" write seccess """)

        if str(line)=='2':
            while True:
                input_s=0
                try:
                    input_s=serialFromArduino.readline()
                except:
                    print(""" error """)
                    input_s=-1
                    break
                if input_s:
                    break
            
            if input_s==-1:# first error / data read error
                input_s=0
                print(""" error """)
                f.close()
                f=open('error.txt', 'w')
                f.write('error')
                continue
            
            if input_s:
                try:
                    inputA=int(input_s)
                    strs1 = 'p'+'~'+input_s.decode()[:len(input_s)-1]+'~'
                    print(inputA)
                    ser.write(bytes((strs1.encode())))
                    f.close()
                    f=open('error.txt', 'w')
                    f.write('success')
                    #victory
                    
                except:#second error / finger print error
                    print(""" error finger print """)
                    f.close()
                    f=open('error.txt', 'w')
                    f.write('error')
        elif str(line)=='1':
            try:
                print("""first""")
                f.close()
                f=open('request.txt','w')
                f.write('request')
                f.close()

                f=open('class.txt','r')
                class_num=f.readline()
                f.close()

                #request write for js
                f=open('grade.txt','r')
                while True:
                    number=f.readline()
                    if number.split(' ')[0] == class_num:
                        break
                
                str2= number.split(' ')[1]
                serialFromArduino.write(str(str2))
                print(""" write seccess """)

                f=open('end.txt','w')
                f.write('end')
                f.close()
            except:
                print("""register error""")
                f.close()
                f=open('r_error.txt','w')
                f.write('error')
                f.close()
    except:
        pass
    finally:
        f.close()
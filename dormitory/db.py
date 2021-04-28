import pymysql

conn = pymysql.connect(host='localhost', user='root', password='', db='mydb', charset='utf8')
try:
    curs = conn.cursor()
    sql = 'show databases'
    curs.execute(sql)
    rows = curs.fetchall()

    for row in rows:
        print(row)
except:
    pass
finally:
    conn.close()
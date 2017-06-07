#coding=utf-8
#导入pymysql的包
import  pymysql
import  pymysql.cursors

#获取一个数据库连接，注意如果是UTF-8类型的，需要制定数据库
#port 必须是数字不能为字符串
connection=pymysql.connect(host='localhost',
                           user='www',
                           password='www',
                           db='test',
                           port=3306,
                           charset='utf8')
try:
    #获取一个游标
   with connection.cursor() as cursor:
       sql='select * from products'
       cout=cursor.execute(sql)
       print("数量： "+str(cout))

       for row in cursor.fetchall():
           #print('%s\t%s\t%s' %row)

            #注意int类型需要使用str函数转义
           print("ID: "+str(row[0])+'  名字： '+str(row[1])+"  价格："+str(row[3]))
       #cursor.execute("INSERT INTO products (id, name, manufacturer, price, createdAt, updatedAt, version ) VALUES(concat('g-',uuid()),'xiaomi','xiaomi',55.55,now(),now(),0)")
       #cursor.execute("select * from products")
       connection.commit()

finally:
    connection.close()

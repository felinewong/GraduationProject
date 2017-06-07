#encoding=utf-8
from bs4 import BeautifulSoup
import requests
import os
import  pymysql
import  pymysql.cursors

base_url = 'https://www.aqistudy.cn/historydata/daydata.php?city='
str_city = '长春'

#获取一个数据库连接，注意如果是UTF-8类型的，需要制定数据库
#port 必须是数字不能为字符串
connection=pymysql.connect(host='localhost',
                           user='www',
                           password='www',
                           db='test',
                           port=3306,
                           charset='utf8')

def get_month_list():
	months_list = list()
	for i in range(1,10):
		months_list.append(('2015-0%s' % i))
	for i in range(10,13):
		months_list.append(('2015-%s' % i))
	return months_list;
	
def get_city_list():
	str_file = r'city.txt'
	f = open(str_file, 'rb')
	city_list = list()
	for line in f.readlines():
		city_list.append(str(line.strip(),encoding='utf-8'))
	return city_list
	
month_list = get_month_list()
city_list = get_city_list()

try:
    #获取一个游标
	with connection.cursor() as cursor:
		
		for city in city_list:
			for i in range(len(month_list)):
				str_month = month_list[i]
				weburl = ('%s%s&month=%s' % (base_url,city,str_month))
				response = requests.get(weburl).content
				soup = BeautifulSoup(response,'html.parser',from_encoding='utf-8')
				num = len(soup.find_all('th',attrs={'align':'center'},recursive=True))
				result = soup.find_all('td',attrs={'align':'center'},recursive=True)
				print(weburl)
				if  num == 10:
					for j in range(0,len(result)-10,10):
						record_day = result[j].get_text().strip()
						record_aqi = result[j+1].get_text().strip()
						record_pm25 = result[j+3].get_text().strip()
						record_pm10 = result[j+4].get_text().strip()
						record_so2 = result[j+5].get_text().strip()
						record_co = result[j+6].get_text().strip()
						record_no2 = result[j+7].get_text().strip()
						record_o3 = result[j+8].get_text().strip()
						query = "INSERT INTO airquality (id, city, aqi, pm25, pm10, so2, co, no2, o3, date, createdAt, updatedAt, version ) VALUES(concat('g-',uuid()),'" + city +"'," + record_aqi +"," + record_pm25 +"," + record_pm10 +"," + record_so2 +"," + record_co +"," + record_no2+"," + record_o3 +",'" +record_day + "',now(),now(),0)"
						cursor.execute(query)
						connection.commit()
				elif  num == 11:
					for j in range(0,len(result)-11,11):
						record_day = result[j].get_text().strip()
						record_aqi = result[j+1].get_text().strip()
						record_pm25 = result[j+4].get_text().strip()
						record_pm10 = result[j+5].get_text().strip()
						record_so2 = result[j+6].get_text().strip()
						record_co = result[j+7].get_text().strip()
						record_no2 = result[j+8].get_text().strip()
						record_o3 = result[j+9].get_text().strip()
						query = "INSERT INTO airquality (id, city, aqi, pm25, pm10, so2, co, no2, o3, date, createdAt, updatedAt, version ) VALUES(concat('g-',uuid()),'" + city +"'," + record_aqi +"," + record_pm25 +"," + record_pm10 +"," + record_so2 +"," + record_co +"," + record_no2+"," + record_o3 +",'" +record_day + "',now(),now(),0)"
						cursor.execute(query)
						connection.commit()
				else:
					print("error:无法套用解析模板！")
				print('%d---%s,%s---DONE' % (city_list.index(city),city,str_month)) 
finally:
    connection.close()

print('all city done!')
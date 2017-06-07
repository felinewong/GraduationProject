#encoding=utf-8
from bs4 import BeautifulSoup
import requests
import os

base_url = 'https://www.aqistudy.cn/historydata/daydata.php?city='
str_city = '长春'

def get_month_list():
	months_list = list()
	for i in range(1,5):
		months_list.append(('2017-0%s' % i))
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

for city in city_list:
	file_name = city + '.csv'
	f = open('aqi/' + file_name, 'w')
	for i in range(len(month_list)):
		str_month = month_list[i]
		weburl = ('%s%s&mouth=%s' % (base_url,city,str_month))
		response = requests.get(weburl).content
		soup = BeautifulSoup(response,'html.parser',from_encoding='utf-8')
		result = soup.find_all('td',attrs={'align':'center'},recursive=True)
		
		for j in range(0,len(result)-11,11):
			tag_data = result[j]
			tag_aqi = result[j+1]
			record_day = tag_data.get_text().strip()
			record_aqi = tag_aqi.get_text().strip()
			f.write(('%s,%s\n' % (record_day,record_aqi)))
			
		print('%d---%s,%s---DONE' % (city_list.index(city),city,str_month))
	f.close()
print('all city done!')


	

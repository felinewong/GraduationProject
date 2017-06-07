#encoding=utf-8
import os

def get_city_list():
	str_file = r'city.txt'
	f = open(str_file, 'rb')
	city_list = list()
	for line in f.readlines():
		city_list.append(str(line.strip(),encoding='utf-8'))
	return city_list
	
city_list = get_city_list()

f1 = open('result.csv', 'w')
for city in city_list:
	file_name = city + '.csv'
	f = open('aqi/' + file_name, 'rb')
	line = list()
	f1.write(('%s' % (f.readlines()[0])))		
	print('%d---%s---DONE' % (city_list.index(city),city))
	f.close()
f1.close()
print('all city done!')

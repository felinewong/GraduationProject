# -*- coding: utf-8 -*-

# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: http://doc.scrapy.org/en/latest/topics/item-pipeline.html
import  pymysql
import  pymysql.cursors

class FangjiaPipeline(object):
    def process_item(self, item, spider):
        connection=pymysql.connect(host='localhost',
                           user='www',
                           password='www',
                           db='test',
                           port=3306,
                           charset='utf8')
        try:
            with connection.cursor() as cursor:	 
                cursor.execute("INSERT INTO houserent (id, city, name, price, area, housetype, floor, orientation, underground, address, longitude, latitude, url, createdAt, updatedAt, version ) VALUES(concat('g-',uuid()),'北京','" + item["FANGJIA_NAME"] +"'," + item["FANGJIA_PRICE"] +"," + item["FANGJIA_AREA"] +",'" + item["FANGJIA_HOUSETYPE"] +"','" + item["FANGJIA_FLOOR"] +"','" + item["FANGJIA_ORIENTATION"]+"','" + item["FANGJIA_UNDERGROUND"] + "','" +item["FANGJIA_ADDRESS"] + "'," + item["FANGJIA_LONGITUDE"] + "," + item["FANGJIA_LATITUDE"] +",'" + item["FANGJIA_URL"]  + "',now(),now(),0)")
                connection.commit()
                print("数据库存储成功！")
        finally:
            connection.close()
        return item

# -*- coding: utf-8 -*-

# Define here the models for your scraped items
#
# See documentation in:
# http://doc.scrapy.org/en/latest/topics/items.html

import scrapy


class FangjiaItem(scrapy.Item):
    # define the fields for your item here like:
    FANGJIA_NAME = scrapy.Field()        # 名称
    FANGJIA_PRICE = scrapy.Field()       # 价格
    FANGJIA_AREA = scrapy.Field()        # 面积
    FANGJIA_HOUSETYPE = scrapy.Field()   # 户型
    FANGJIA_FLOOR = scrapy.Field()       # 楼层
    FANGJIA_ORIENTATION = scrapy.Field() # 朝向
    FANGJIA_UNDERGROUND = scrapy.Field() # 地铁
    FANGJIA_ADDRESS = scrapy.Field()     # 地址
    FANGJIA_LONGITUDE = scrapy.Field()   # 经度
    FANGJIA_LATITUDE = scrapy.Field()    # 纬度
    FANGJIA_URL = scrapy.Field()         # 链接


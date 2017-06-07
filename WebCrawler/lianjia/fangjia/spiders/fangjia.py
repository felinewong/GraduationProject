# -*- coding: utf-8 -*-
import scrapy
import time
import re
from fangjia.items import FangjiaItem
import os
import pymysql
import pymysql.cursors

headers = {
    "Accept":"text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
    "Accept-Encoding":"gzip, deflate, sdch, br",
    "Accept-Language":"zh-CN,zh;q=0.8,en;q=0.6",
    "Connection":"keep-alive",
    "Host": "bj.lianjia.com",
    "User-Agent":'Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36' 
}
# 用来保持登录状态，可把chrome上拷贝下来的字符串形式cookie转化成字典形式，粘贴到此处
cookies = {
    'lianjia_uuid': '0b03c573-7b43-43f9-ad22-2788fb387bb1', 
    'UM_distinctid':'15c6399a14c25b-0514e25005fc0d-6a11167a-1fa400-15c6399a14d19f', 
    'gr_user_id':'a59a2648-5ba1-42ec-bffb-a7bb647374ee',
    'select_city':'110000; all-lj=1e9f8fe64a0d8d4cd8642eafcff9cfff', 
    'select_nation':'1',
    'sample_traffic_test':'controlled_68', 
    '_jzqx':'1.1496319738.1496407106.4.jzqsr=cd%2Efang%2Elianjia%2Ecom|jzqct=/loupan/pg33/.jzqsr=bj%2Elianjia%2Ecom|jzqct=/zufang/',
    '_jzqckmp':'1',
    'CNZZDATA1253477573':'1557298728-1496318570-https%253A%252F%252Fcd.lianjia.com%252F%7C1496406696', 
    'CNZZDATA1254525948':'308881223-1496318790-https%253A%252F%252Fcd.lianjia.com%252F%7C1496408482', 
    '_smt_uid':'593006f9.566d2209', 
    '_qzja':'1.271636530.1496319755753.1496390009984.1496407106406.1496410619514.1496411028007.0.0.0.69.5', 
    '_qzjb':'1.1496407106405.23.0.0.0',
    '_qzjc':'1', 
    '_qzjto':'59.2.0',
	'_jzqa':'1.1056037085698353000.1496319738.1496390010.1496407106.5', 
    '_jzqc':'1', 
    '_jzqb':'1.23.10.1496407106.1',
    'CNZZDATA1255633284':'433657498-1496315759-https%253A%252F%252Fcd.lianjia.com%252F%7C1496410936',
    'CNZZDATA1255604082':'1985674184-1496315524-https%253A%252F%252Fcd.lianjia.com%252F%7C1496407707', 
    '_gat':'1', 
    '_gat_past':'1',
    '_gat_global':'1', 
    '_gat_new_global':'1', 
    '_ga':'GA1.2.1380861181.1496319633', 
    '_gid':'GA1.2.1623672693.1496336782', 
    '_gat_dianpu_agent':'1', 
    'lianjia_ssid':'de16994f-3714-45fe-9362-43d52b501aae'
}





cookies2 = {
    'lianjia_uuid': '0b03c573-7b43-43f9-ad22-2788fb387bb1', 
    'UM_distinctid':'15c6399a14c25b-0514e25005fc0d-6a11167a-1fa400-15c6399a14d19f', 
    'gr_user_id':'a59a2648-5ba1-42ec-bffb-a7bb647374ee',
    'select_city':'110000',
    'all-lj':'5ce010dbdb86da2c0bba3b0cda32eb3e', 
    'select_nation':'1',
    'sample_traffic_test':'controlled_68', 
    '_jzqx':'1.1496319738.1496407106.4.jzqsr=cd%2Efang%2Elianjia%2Ecom|jzqct=/loupan/pg33/.jzqsr=bj%2Elianjia%2Ecom|jzqct=/zufang/',
    '_jzqckmp':'1',
    'CNZZDATA1253477573':'1557298728-1496318570-https%253A%252F%252Fcd.lianjia.com%252F%7C1496588848', 
    'CNZZDATA1254525948':'308881223-1496318790-https%253A%252F%252Fcd.lianjia.com%252F%7C1496591069', 
    '_smt_uid':'593006f9.566d2209', 
    '_qzja':'1.271636530.1496319755753.1496413862414.1496591612136.1496592867010.1496592979569.0.0.0.82.7', 
    '_qzjb':'1.1496591612136.8.0.0.0',
    '_qzjc':'1', 
    '_qzjto':'5.0.0',
	'_jzqa':'1.1056037085698353000.1496319738.1496413862.1496591612.7', 
    '_jzqc':'1', 
    '_jzqb':'1.8.10.1496591612.1',
    'CNZZDATA1255633284':'433657498-1496315759-https%253A%252F%252Fcd.lianjia.com%252F%7C1496592055',
    'CNZZDATA1255604082':'1985674184-1496315524-https%253A%252F%252Fcd.lianjia.com%252F%7C1496592381', 
    '_gat':'1', 
    '_gat_past':'1',
    '_gat_global':'1', 
    '_gat_new_global':'1', 
    '_ga':'GA1.2.1380861181.1496319633', 
    '_gid':'GA1.2.839558438.1496591615', 
    '_gat_dianpu_agent':'1', 
    'lianjia_ssid':'2f059e13-7d4b-4063-a662-e0331200e472'
}

# 对请求的返回进行处理的配置
meta = {
    'dont_redirect': True,  # 禁止网页重定向
    'handle_httpstatus_list': [301, 302]  # 对哪些异常返回进行处理
}


class fangjiaSpider(scrapy.Spider):
    name = "fangjia"
    allowed_domins = ["http://bj.lianjia.com/"]
    start_urls = []

    def start_requests(self):
        global headers
        #urlhead = 'http://cd.fang.lianjia.com/loupan/'
        urlhead = 'http://bj.lianjia.com/zufang/'
        for i in range(95,101):
            url = urlhead+'pg%s/' % i
            self.start_urls.append(url)
        for url in self.start_urls:
            print ("当前正在爬取总页面：" + url)
            time.sleep(5)
            yield scrapy.Request(url, headers=headers, cookies=cookies, callback=self.parse)

    def parse(self, response):
        global headers
        fang_links = response.xpath('//div[@class="list-wrap"]/ul[@id="house-lst"]/li/div[@class="pic-panel"]/a/@href').extract()
        if fang_links:
            for fang_link in fang_links:
                #url = 'http://bj.lianjia.com'+fang_link
                url = fang_link
                print ("当前正在爬取：" + url)
                time.sleep(4)
                yield scrapy.Request(url, headers=headers, cookies=cookies2, meta=meta, callback=self.parse_fangjia)
    		

    def parse_fangjia(self, response):   # /是在根节点找(只找根节点下面一层,绝对) //是在根节点下面的所有节点找,相对
        item = FangjiaItem()
        name = response.xpath('//div[@class="title-wrapper"]/div[@class="content"]/div[@class="title"]/h1[@class="main"]/text()').extract()[0]
        price = response.xpath('/html/body/div[4]/div[2]/div[2]/div[1]/span[1]/text()').extract()[0]
        area = response.xpath('//div[@class="zf-room"]/p/text()').extract()[0].split('平')[0]
        housetype = response.xpath('//div[@class="zf-room"]/p/text()').extract()[1]
        floor = response.xpath('//div[@class="zf-room"]/p/text()').extract()[2]
        orientation = response.xpath('//div[@class="zf-room"]/p/text()').extract()[3]
        underground = response.xpath('//div[@class="zf-room"]/p/text()').extract()[4]
        xiaoqu = response.xpath('//div[@class="zf-room"]/p/a/text()').extract()[0]
        weizhi = response.xpath('//div[@class="zf-room"]/p/a/text()').extract()[3]
        url = response.xpath('/html/head/link[1]/@href').extract()[0]
        
        latitude = response.xpath('/html/body/script[12]/text()').extract()[0]
        regex = "resblockPosition:'(.+)'"
        items = re.search(regex, latitude)
        content = items.group(1)  # 经纬度
        longitude = content.split(',')[0]
        latitude = content.split(',')[1]
		
        item['FANGJIA_NAME'] = name
        item['FANGJIA_PRICE'] = price
        item['FANGJIA_AREA'] = area
        item['FANGJIA_HOUSETYPE'] = housetype
        item['FANGJIA_FLOOR'] = floor
        item['FANGJIA_ORIENTATION'] = orientation
        item['FANGJIA_UNDERGROUND'] = underground
        item['FANGJIA_ADDRESS'] =  weizhi + "," + xiaoqu 
        item['FANGJIA_URL'] = url
        item['FANGJIA_LONGITUDE'] = longitude
        item['FANGJIA_LATITUDE'] = latitude
        #print ("捕获:" + item['FANGJIA_NAME'] + item['FANGJIA_COORD'] )
        #print (item['FANGJIA_ADDRESS'])
        #print (item['FANGJIA_PRICE'])
        #print (item['FANGJIA_URL'])
        yield item


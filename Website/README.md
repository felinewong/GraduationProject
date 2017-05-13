#mysql创建表
空气质量表
城市 AQI PM2.5 PM10 SO2 CO NO2 O3
use test;//使用某表
create table airquality (
    id varchar(50) not null,
    city varchar(100) not null,
    aqi double not null,
    pm25 double not null,
    pm10 double not null,
    so2 double not null,
    co double not null,
    no2 double not null,
    o3 double not null,
    date date not null,
    createdAt bigint not null,
    updatedAt bigint not null,
    version bigint not null,
    primary key (id)
) engine=innodb;

desc table_name  //查看表结构
insert into airquality(id,name,age)values(1,"bb",13);
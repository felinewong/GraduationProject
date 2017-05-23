/**
 *该模块提供地球坐标系(WGS84)，国测局坐标(火星坐标，GCJ-02)和百度坐标系(BD-09)之间的互相转化
 */
  var request = require('request');

  //定义一些常量
  var x_PI = 3.14159265358979324 * 3000.0 / 180.0;
  var PI = 3.1415926535897932384626;
  var a = 6378245.0;
  var ee = 0.00669342162296594323;
  var ak = 'loKQZRb1OUnhZlOk732Y6D285WaT0pwb'; //百度访问应用秘钥 
  var url_geocoder = 'http://api.map.baidu.com/geocoder/v2/'


  /**
   * 百度坐标系 (BD-09) 与 火星坐标系 (GCJ-02)的转换
   * 即 百度 转 谷歌、高德
   * @param bd_lon
   * @param bd_lat
   * @returns {*[]}
   */
  var bd09_to_gcj02 = function bd09togcj02(bd_lon, bd_lat) {
    var bd_lon = +bd_lon;
    var bd_lat = +bd_lat;
    var x = bd_lon - 0.0065;
    var y = bd_lat - 0.006;
    var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * x_PI);
    var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * x_PI);
    var gcj_lng = z * Math.cos(theta);
    var gcj_lat = z * Math.sin(theta);
    return [gcj_lng, gcj_lat]
  };

  /**
   * 火星坐标系 (GCJ-02) -> 百度坐标系 (BD-09) 
   * 即  谷歌、高德  转 百度 
   * @param lon
   * @param lat
   * @returns {*[]}
   */
  var gcj02_to_bd09 = function(lon, lat) {
    var lat = +lat;
    var lon = +lon;
    var z = Math.sqrt(lon * lon + lat * lat) + 0.00002 * Math.sin(lat * x_PI);
    var theta = Math.atan2(lat, lon) + 0.000003 * Math.cos(lon * x_PI);
    var bd_lon = z * Math.cos(theta) + 0.0065;
    var bd_lat = z * Math.sin(theta) + 0.006;
    return [bd_lon, bd_lat]
  };

  /**
   * 地球坐标系（WGS84）-> 火星坐标系 (GCJ-02)
   * 即  谷歌、高德  转 百度 
   * @param lon
   * @param lat
   * @returns {*[]}
   */
  var wgs84_to_gcj02 = function(lng, lat) {
    var lat = +lat;
    var lng = +lng;
    if (out_of_china(lng, lat)) {
      return [lng, lat]
    } else {
      var dlat = transformlat(lng - 105.0, lat - 35.0);
      var dlng = transformlng(lng - 105.0, lat - 35.0);
      var radlat = lat / 180.0 * PI;
      var magic = Math.sin(radlat);
      magic = 1 - ee * magic * magic;
      var sqrtmagic = Math.sqrt(magic);
      dlat = (dlat * 180.0) / ((a * (1 - ee)) / (magic * sqrtmagic) * PI);
      dlng = (dlng * 180.0) / (a / sqrtmagic * Math.cos(radlat) * PI);
      var mglat = lat + dlat;
      var mglng = lng + dlng;
      return [mglng, mglat]
    }
  };

  var transformlat = function(lng, lat) {
    var lat = +lat;
    var lng = +lng;
    var ret = -100.0 + 2.0 * lng + 3.0 * lat + 0.2 * lat * lat + 0.1 * lng * lat + 0.2 * Math.sqrt(Math.abs(lng));
    ret += (20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) * 2.0 / 3.0;
    ret += (20.0 * Math.sin(lat * PI) + 40.0 * Math.sin(lat / 3.0 * PI)) * 2.0 / 3.0;
    ret += (160.0 * Math.sin(lat / 12.0 * PI) + 320 * Math.sin(lat * PI / 30.0)) * 2.0 / 3.0;
    return ret
  };

  var transformlng = function transformlng(lng, lat) {
    var lat = +lat;
    var lng = +lng;
    var ret = 300.0 + lng + 2.0 * lat + 0.1 * lng * lng + 0.1 * lng * lat + 0.1 * Math.sqrt(Math.abs(lng));
    ret += (20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) * 2.0 / 3.0;
    ret += (20.0 * Math.sin(lng * PI) + 40.0 * Math.sin(lng / 3.0 * PI)) * 2.0 / 3.0;
    ret += (150.0 * Math.sin(lng / 12.0 * PI) + 300.0 * Math.sin(lng / 30.0 * PI)) * 2.0 / 3.0;
    return ret
  };

  /**
   * 判断是否在国内，不在国内则不做偏移
   * @param lng
   * @param lat
   * @returns {boolean}
   */
  var out_of_china = function out_of_china(lng, lat) {
    var lat = +lat;
    var lng = +lng;
    // 纬度3.86~53.55,经度73.66~135.05 
    return !(lng > 73.66 && lng < 135.05 && lat > 3.86 && lat < 53.55);
  };

  /**
   * 调用地理编码服务
   * @param 
   * @returns {boolean}
   */
  var geocoder = function geocoder(address){

    var cur_url = `${url_geocoder}?address=${address}&output=json&ak=${ak}`;
    console.log(cur_url);
    request({
        url: cur_url,
        method: "GET",
        json: true,
        headers: {
            "content-type": "application/json",
        }
    }, function(error, response, body) {
        console.log(response.statusCode);
        if (!error && response.statusCode == 200) {
          
        }
    });
  }

  module.exports = {
    bd09_to_gcj02: bd09_to_gcj02,
    gcj02_to_bd09: gcj02_to_bd09,
    wgs84_to_gcj02: wgs84_to_gcj02,
    geocoder: geocoder 
  }



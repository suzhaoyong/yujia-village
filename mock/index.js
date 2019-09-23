const Mock = require('mockjs');//mockjs 导入依赖模块
const util = require('./util');//自定义工具模块
//返回一个函数
module.exports = function(app){
    //监听http请求
    app.get('/user/userinfo', function (rep, res) {
        //每次响应请求时读取mock data的json文件
        //util.getJsonFile方法定义了如何读取json文件并解析成数据对象
        var json = util.getJsonFile('./userInfo.json');
        //将json传入 Mock.mock 方法中，生成的数据返回给浏览器
        res.json(Mock.mock(json));
    });
    // 商场新品
    app.get('/market/news', function(req, res) {
      var json = util.getJsonFile('./market/news.json');
      res.json(Mock.mock(json))
    })

    // 限时优惠 
    app.get('/market/discounts', function(req, res) {
      var json = util.getJsonFile('./market/discounts.json');
      res.json(Mock.mock(json))
    })

    // 常用推荐
    app.get('/market/recommend/suit', function(req, res) {
      var json = util.getJsonFile('./market/recommend-suit.json');
      res.json(Mock.mock(json))
    })
    // 常用推荐
    app.get('/market/recommend/equipment', function(req, res) {
      var json = util.getJsonFile('./market/recommend-equipment.json');
      res.json(Mock.mock(json))
    })
    // 常用推荐
    app.get('/market/recommend/books', function(req, res) {
      var json = util.getJsonFile('./market/recommend-books.json');
      res.json(Mock.mock(json))
    })
    // 常用推荐列表
    app.get('/market/recommend/lists', function(req, res) {
      var json = util.getJsonFile('./market/recommend-lists.json');
      res.json(Mock.mock(json))
    })
    

    app.get('/market/detail/tags', function(req, res) {
      var json = util.getJsonFile('./market/market_detail_tag.json');
      res.json(Mock.mock(json))
    })
    app.get('/market/detail/lists', function(req, res) {
      var json = util.getJsonFile('./market/market_detail_result.json');
      res.json(Mock.mock(json))
    })

    app.get('/goods/detail/1', function(req, res) {
      var json = util.getJsonFile('./goods/goods_detail.json');
      res.json(Mock.mock(json))
    })
    app.get('/goods/order/1', function(req, res) {
      var json = util.getJsonFile('./goods/goods_order.json');
      res.json(Mock.mock(json))
    })
    app.get('/goods/car/1', function(req, res) {
      var json = util.getJsonFile('./goods/goods_car.json');
      res.json(Mock.mock(json))
    })
    app.get('/goods/collect/1', function(req, res) {
      var json = util.getJsonFile('./goods/goods_car.json');
      res.json(Mock.mock(json))
    })

    app.get('/center/buy', function(req, res) {
      var json = util.getJsonFile('./center/buy.json');
      res.json(Mock.mock(json))
    })
    app.get('/center/collect', function(req, res) {
      var json = util.getJsonFile('./center/collect.json');
      res.json(Mock.mock(json))
    })
    app.get('/center/cash-coupon', function(req, res) {
      var json = util.getJsonFile('./center/cash_coupon.json');
      res.json(Mock.mock(json))
    })
    app.get('/center/discounts-coupon', function(req, res) {
      var json = util.getJsonFile('./center/discounts_coupon.json');
      res.json(Mock.mock(json))
    })

}
// pages/home/home.js
Page({
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadCity(this.loadData);
    wx.db.toastError('获取热映失败');
  },
  loadData: function (city) {
    wx.request({
      url: 'https://douban-api.uieee.com/v2/movie/in_theaters',
      data: { city: city },
      header: {'content-type':'json'},
      success: (res) => {
        console.log(res);
      },
      fail: () => {
        wx.db.toastError('获取热映失败');
      }
    });
  },
  loadCity: function (success) {
    // 获取经纬度
    wx.getLocation({
      type: 'wgs84',
      success: (res) => {
        console.log(res);
        var reqTask = wx.request({
          url: 'https://api.map.baidu.com/reverse_geocoding/v3',
          data: {
            ak: '77fhV1udNmmGLVwtRmh163g6I5PdURE8',
            output: 'json',
            coordtype: 'wgs84ll',
            location: `${res.latitude},${res.longitude}`
          },
          success: (res) => {
            let city = res.data.result.addressComponent.city;
            city = city.substring(0, city.length - 1);
            success && success(city);
          },
          fail: () => { 
            wx.db.toastError('获取城市失败');
          }
        });
      },
      fail: () => {
        wx.db.toastError('获取位置失败');
      },
    });
  }
})
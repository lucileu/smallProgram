// pages/home/home.js
Page({
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getLocation({
      type: 'wgs84',
      success: (res) => {
        console.log(res.latitude, res.longitude);
        wx.request({
          url: 'https://api.map.baidu.com/reverse_geocoding/v3',
          
          data: {
          ak: '77fhV1udNmmGLVwtRmh163g6I5PdURE8',
          output: 'json',
          coordtype: 'wgs84ll',
          location: res.latitude + ',' + res.longitude
          },
          success: (res) => {
            console.log(res)
          },
          fail: () => {}
        });
          
      },
      fail: () => {
        console.log('获取位置失败');
      },
    });
      
    

  },
})
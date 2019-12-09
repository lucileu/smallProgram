// pages/home/home.js
Page({
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getLocation({
      type: 'wgs84',
      success: (res) => {
        console.log(res);
      },
      fail: () => {
        console.log('获取位置失败');
      },
    });
      
    

  },
})
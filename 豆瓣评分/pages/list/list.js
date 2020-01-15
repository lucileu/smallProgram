// pages/list/list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movies: [],
    title: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    wx.getStorage({
      key: options.title,
      success: (result) => {
        this.setData({
          movies: result.data,
          title: options.title
        })
      },
      fail: () => {}
    });
  },

  back: function(evt) {
    console.log(evt);
  },

  home: function(evt) {
    console.log(evt);
  }
})
// pages/login/login.js
Page({

  wechatLogin: function() {
    console.log('微信登陆');
  },

  doubanLogin: function() {
    console.log('豆瓣登陆');
  },

  openAgreement: function() {
    wx.navigateTo({
      url: '/pages/agreement/agreement',
    });
      
  }
})
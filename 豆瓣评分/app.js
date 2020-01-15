//app.js
App({
  onLaunch: function () {
    wx.db = {};
    wx.db.url = (url) => {
      return `https://douban-api.uieee.com/${url}`
    }
    this.initToast();

    const systemInfo = wx.getSystemInfoSync();
    console.log(systemInfo);
    wx.db.statusBarHeight = systemInfo.statusBarHeight;
    if (systemInfo.platform == 'android') {
      wx.db.navBarHeight = 48;
    } else {
      wx.db.navBarHeight = 44;
    }
  },

  initToast: function () {
    const ToastTypeTitle = 0;
    const ToastTypeSuccess = 1;
    const ToastTypeError = 2;
    let commonToast = (title, toastType, duration = 1500) => {
      let options = {
      title: title,
      icon: 'none',
      duration: duration,
    };
      if (toastType == ToastTypeSuccess) {
        options.icon = 'success';
      } else if (toastType == ToastTypeError) {
        options.image = '/assets/imgs/upsdk_cancel_normal.png'
      }
      wx.showToast(options);
    };

    wx.db.toastTitle = (title, duration) => {
      commonToast(title, ToastTypeTitle, duration)
    };
    wx.db.toastSuccess = (title, duration) => {
      commonToast(title, ToastTypeSuccess, duration)
    };
    wx.db.toastError = (title, duration) => {
      commonToast(title, ToastTypeError, duration)
    };
  }
})
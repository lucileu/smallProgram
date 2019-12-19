// pages/home/home.js
Page({

  data: {
    movies: []
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadCity(this.loadData);
  },
  loadData: function (city) {
    wx.request({
      url: 'https://douban-api.uieee.com/v2/movie/in_theaters',
      data: { city: city },
      header: {'content-type':'json'},
      success: (res) => {
        let movies = res.data.subjects
        for (let index = 0; index < movies.length; index++) {
          this.updataMovie(movies[index]);
        }
        this.setData({ movies: movies });
        console.log(this.data);
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
  },
  updataMovie: function(movie) {
    let stars = parseInt(movie.rating.stars);
    // movie.stars = [1, 1, 1, 0.5, 0];
    if (stars == 0) return;
    movie.stars = {};
    movie.stars.on = parseInt(stars / 10);
    movie.stars.half = stars - (movie.stars.on * 10);
    movie.stars.off = parseInt((50 - stars) / 10);
  }
})
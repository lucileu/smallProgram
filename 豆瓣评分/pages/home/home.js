// pages/home/home.js
Page({

  data: {
    allMovies: [
      {
        title: '影院热映',
        url: 'v2/movie/in_theaters',
        movies: []
      },
      {
        title: '新片榜',
        url: 'v2/movie/new_movies',
        movies: []
      },
      {
        title: '口碑榜',
        url: 'v2/movie/weekly',
        movies: []
      },
      {
        title: '北美票房榜',
        url: 'v2/movie/us_box',
        movies: []
      },
      {
        title: 'Top250',
        url: 'v2/movie/top250',
        movies: []
      },
    ]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#43bd55'
    });
      

    // 加载本地数据
    this.loadLocalData();
    // 请求网络数据
    this.loadCity((city) => {
      this.loadNewData(0, {city: city});
    });
    this.loadNewData(1);
    this.loadNewData(2);
    this.loadNewData(3);
    this.loadNewData(4);
  },
  loadLocalData: function() {
    for (let index = 0; index < this.data.allMovies.length; index++) {
      let obj = this.data.allMovies[index];
      obj.movies = wx.getStorageSync(obj.title);
    }
    this.setData(this.data);
  },
  loadNewData: function(idx, parms) {
    wx.request({
      url: wx.db.url(this.data.allMovies[idx].url),
      header: {'content-type':'json'},
      data: parms,
      success: (res) => {
        const obj = this.data.allMovies[idx];
        let movies = res.data.subjects
        obj.movies = [];
        for (let index = 0; index < movies.length; index++) {
          let movie = movies[index].subject || movies[index];
          this.updataMovie(movie);
          obj.movies.push(movie);
        }
        this.setData(this.data);
        // 数据存储，缓存到本地
        wx.setStorage({
          key: obj.title,
          data: obj.movies,
        });
      },
      fail: () => {
        wx.db.toast(`获取${this.data.allMovies[idx].title}失败`);
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
  },
  viewMore: function(evt) {
    const idx = evt.currentTarget.dataset.index;
    const obj = this.data.allMovies[idx];
    wx.navigateTo({
      url: `/pages/list/list?title=${obj.title}&url=${obj.url}`,
    });
  }
})
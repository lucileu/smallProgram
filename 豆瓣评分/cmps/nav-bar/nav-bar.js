// cmps/nav-bar/nav-bar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String,
      value: ''
    },
    statusBarColor: {
      type: String,
      value: '#fff'
    },
    navBarColor: {
      type: String,
      value: '#fff'
    },
    textColor: {
      type: String,
      value: '#000'
    },
    back: {
      type: String,
      value: 'true'
    },
    home: {
      type: String,
      value: 'true'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    statusBarStyle: '',
    navBarStyle: ''
  },

  lifetimes: {
    attached: function() {
      const statusBarStyle = `
      height: ${ wx.db.statusBarHeight }px;
      background-color: ${ this.data.statusBarColor }
      `;
      const navBarStyle = `
      height: ${ wx.db.navBarHeight }px;
      background-color: ${ this.data.navBarColor };
      color: ${this.data.textColor}
      `;
      this.setData({ statusBarStyle, navBarStyle });
    },
    detached: function() {
      // 在组件实例被从页面节点树移除时执行
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    back: function() {
      this.triggerEvent('backTap', {name: 'yj'});
      wx.navigateBack();

    },
    home: function() {
      this.triggerEvent('homeTap', {age: 18});
      wx.navigateBack({
        delta: 999
      });
        
    }
  }
})

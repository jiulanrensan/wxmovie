//index.js
//获取应用实例
const app = getApp()
const util = require('../../utils/util.js')
Page({
  data: {
    inTheaterList: [],
    boxWidth: app.globalData.boxWidth,
    boxHeight: app.globalData.boxHeight
  },
  onLoad: function(event){
    const inTheaterUrl = app.globalData.doubanUrl + "/v2/movie/in_theaters" + "?start=0&count=16";
    console.log(inTheaterUrl);
    this.getMovieList(inTheaterUrl,'inTheaters','正在热映');
    //console.log(this.data.inTheaterList);
  },

  openDetail: function(event){
    let movieId = event.currentTarget.dataset.movieid;
    //console.log(movieId);
    wx.navigateTo({
      //在pages目录下，直接写detail/detial，？后面接需要传递的数据，&隔开
      url: '../detail/detail?id=' + movieId
    })
  },

  //事件处理函数
  getMovieList: function(url,key,category){
    wx.showNavigationBarLoading();
    const _this = this;
    wx.request({
      url: url,
      method: 'GET',
      header: {
        "Content-Type": "json"
      },
      success(res) {
        _this.dealData(res.data.subjects, key, category);
        console.log(res.data);
      },
      fail(error) {
        console.log(error);
      }
    })
  },
  dealData: function(subjects,key,category){
    let movieList = this.data.inTheaterList;
    movieList = util.dealFn(subjects,key,category,movieList);
    console.log(movieList);
    //inTheaterList必须加上
    this.setData({
      inTheaterList : movieList,
    });
    console.log(this.data.inTheaterList);
    wx.hideNavigationBarLoading();
  },
  
})

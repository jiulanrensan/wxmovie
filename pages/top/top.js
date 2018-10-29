// pages/top/top.js
const app = getApp()
const util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    topList: [],
    boxWidth: app.globalData.boxWidth,
    boxHeight: app.globalData.boxHeight
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const topUrl = app.globalData.doubanUrl + "/v2/movie/top250" + "?start=0&count=20";
    console.log(topUrl);
    this.getMovieList(topUrl, 'top250', '豆瓣Top250');
  },

  //事件处理函数
  getMovieList: function (url, key, category) {
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

  dealData: function (subjects, key, category) {
    let movieList = this.data.topList;
    movieList = util.dealFn(subjects, key, category, movieList);

    //topList必须加上
    this.setData({
      topList: movieList,
    });
    wx.hideNavigationBarLoading();
  },

  openDetail: function (event) {
    let movieId = event.currentTarget.dataset.movieid;
    //console.log(movieId);
    wx.navigateTo({
      //在pages目录下，直接写detail/detial，？后面接需要传递的数据，&隔开
      url: '../detail/detail?id=' + movieId
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
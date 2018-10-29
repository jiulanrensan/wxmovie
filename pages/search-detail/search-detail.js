// pages/search-detail/search-detail.js
const app = getApp()
const util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchList: [],
    visible: '',
    boxWidth: app.globalData.boxWidth,
    boxHeight: app.globalData.boxHeight
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let query = options.query;
    let url = app.globalData.doubanUrl + "/v2/movie/search?q=" + query;
    console.log(url);
    this.getMovieList(url, 'searchResult', '');
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
        console.log(res.data.subjects);
      },
      fail(error) {
        console.log(error);
      }
    })
  },
  dealData: function (subjects, key, category) {
    let movieList = this.data.searchList;
    movieList = util.dealFn(subjects, key, category, movieList);
    console.log(movieList);
    //searchList必须加上
    this.setData({
      searchList: movieList,
      visible: true
    });
    console.log(this.data.searchList);
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

  onShareAppMessage: function () {
    return {
      title: '豆瓣电影',
    }
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
// pages/detail/detail.js
const app = getApp();
const util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    boxWidth: app.globalData.boxWidth,
    boxHeight: app.globalData.boxHeight,
    detailList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //index.js传入id,此处用options.id获取
    let movieId = options.id;
    let movieUrl = app.globalData.doubanUrl + '/v2/movie/subject/' + movieId;
    console.log(movieUrl);
    this.getMovieList(movieUrl);
  },

  //监听页面滚动
  /*onPageScroll: function(res){
    let scrTop = res.scrollTop;
    console.log(scrTop);
    this.setData({
      imgTop: scrTop
    })
  },*/

  getMovieList: function (url) {
    wx.showNavigationBarLoading();
    const _this = this;
    wx.request({
      url: url,
      method: 'GET',
      header: {
        "Content-Type": "json"
      },
      success(res) {
        _this.dealData(res.data);
        console.log(res);
      },
      fail(error) {
        console.log(error);
      }
    })
  },

  dealData: function (res) {
    let movieList = this.data.detailList;
    let temp ={};
    let castInfo = [];
    for(let index in res.casts){
      let castTem = res.casts[index];
      let infoTemp = {
        castName: castTem.name,
        castImg: castTem.avatars.large
      }
      castInfo.push(infoTemp);
    }
    
    
    temp = {
      score: res.rating.average,
      title: res.original_title,
      image: res.images.large,
      coutry: res.countries,
      director: res.directors[0].name,
      genres: res.genres,
      summary: res.summary,
      castInfo: castInfo,
      //movieId: subject.id,
    }
    movieList.push(temp);
    
    console.log(movieList);
    //inTheaterList必须加上
    this.setData({
      detailList: movieList,
    });
    console.log(this.data.detailList);
    wx.hideNavigationBarLoading();
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
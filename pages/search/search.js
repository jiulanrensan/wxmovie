// pages/search/search.js
//获取应用实例
const app = getApp()
const util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    visible: '',
    inputValue: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },
  
  //点击搜索
  searchMovie: function(event){
    let query = this.data.inputValue;
    if(query != ''){
      wx.navigateTo({
        url: '../search-detail/search-detail?query=' + query,
      })
      this.setData({
        inputValue: ''
      })
    }
    else{
      /*wx.showToast({
        title: '请输入内容',
      })*/
      wx.showModal({
        title: '请输入内容',
        content: '',
        showCancel: false,
        
      })
    }
  },
  //bindinput监听input的值
  getValue: function(event){
    let val = event.detail.value;
    let v = val ? 1 : 0;
    this.setData({
      inputValue: val,
      visible: v
    });
  },

  //表单重置
  clearInput: function(){
    console.log('发生了reset事件');
  },

  //清除输入框内容
  clearCon: function(){
    //wxml页面的Input的value绑定了data的inputValue
    this.setData({
      inputValue: ''
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
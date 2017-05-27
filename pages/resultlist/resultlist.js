var util = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    //本金
    principal: '',
    //利息
    interest: '',
    // 年化率 
    year_interest: '',
    //奖励
    investment: '',
    // 期数
    timeLimit: '',
    //时间
    date: '',
    //总收益
    totalEarning: '',
    mode: 0,
    list: [],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData(options);
    // 只有一期
    // util.compareDate(this.data.date, intervalDays)
    var dateArr = this.data.date.split('-');
    var maxDay = this.data.date.split('-')[2];
    console.log(options);
    var intervalDays = options.intervalDays;
    if(this.data.mode==0){
      var count = (Number.parseInt(this.data.mode)) ? this.data.timeLimit : 1;
      for (var i = 0; i < count; i++) {
        this.data.list[i] = {
          principal: (this.data.principal / count + ((i == count) ? this.data.principal % count : 0)).toFixed(2),
          interest: (this.data.interest / count + ((i == count) ? this.data.interest % count : 0)).toFixed(2),
          date: util.compareDate(this.data.date, intervalDays) ,
        }
      }
      this.data.date = util.compareDate(this.data.date, intervalDays);

    }else if (this.data.mode ==1) {
      var count = (Number.parseInt(this.data.mode)) ? this.data.timeLimit : 1;
      for (var i = 0; i < count; i++) {
        var maxDay = new Date(this.data.date).getDate();

        var count = this.data.timeLimit;
        var tmplist = this.data.list;

        this.data.list[i] = {
          principal: count ==i+1?this.data.principal:0,
          interest: (this.data.interest / count + ((i == count) ? this.data.interest % count : 0)).toFixed(2),
          date: this.getNextDate(maxDay, i == 0 ? this.data.date : tmplist[i - 1].date),
        }
      }
      this.data.endDate = this.data.list[this.data.list.length - 1].date;
    } else {
      //等额本息 
     var maxDay =  new Date(this.data.date).getDate();

      var count = this.data.timeLimit;
     var  tmplist = this.data.list;
      
      for (var i = 0; i < count; i++) {
        this.data.list[i] = {
          principal: (this.base(this.data.principal, this.data.year_interest * 0.01, count, i + 1)),
          interest: (this.interest(this.data.principal, this.data.year_interest * 0.01, count, i + 1)),
          date: this.getNextDate(maxDay, i == 0 ? this.data.date : tmplist[i-1].date),
        }

      }
      this.data.endDate= this.data.list[this.data.list.length-1].date;
    }

    this.setData(this.data);

  },


  // base 本金  rate 年化利率  month 投资期限  cur 当前
  //求每月本息总和
  all: function (base, rate, month) {
    rate = rate / 12;
    return (base * rate * Math.pow((1 + rate), month)) / (Math.pow((1 + rate), month) - 1);
  },

  //求第cur月的本金
  base: function (base, rate, month, cur) {
    rate = rate / 12;
    return ((base * rate * Math.pow((1 + rate), (cur - 1))) / (Math.pow((1 + rate), month) - 1)).toFixed(2);
  },

  //求第cur月的利息
  interest: function (base, rate, month, cur) {
    // rate = rate/12;
    return (this.all(base, rate, month) - this.base(base, rate, month, cur)).toFixed(2);
  },
  getNextDate: function(maxDay, lastDate) {

    var maxDay = Number.parseInt(maxDay);

    var arr = lastDate.split('-');
    var curYear = Number.parseInt(arr[0]);
    var curMonth = Number.parseInt(arr[1]);
    var curDay = Number.parseInt(arr[2]);

    var dateInstance = new Date(curYear, curMonth, curDay);
    var newInstance = new Date(curYear, curMonth + 1, 0);
    var resultDay = (maxDay > Number.parseInt(dateInstance.getDate())) ? newInstance.getDate() : maxDay;
    var returnInstance = new Date(curYear, curMonth, resultDay);

    return returnInstance.getFullYear() + '-' + (returnInstance.getMonth() + 1) + '-' + returnInstance.getDate();
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

  },


  getNextMonth: function (date) {
    var arr = date.split('-');
    var year = arr[0]; //获取当前日期的年份  
    var month = arr[1]; //获取当前日期的月份  
    var day = arr[2]; //获取当前日期的日  
    var days = new Date(year, month, 0);
    days = days.getDate(); //获取当前日期中的月的天数  
    var year2 = year;
    var month2 = parseInt(month) + 1;
    if (month2 == 13) {
      year2 = parseInt(year2) + 1;
      month2 = 1;
    }
    var day2 = day;
    var days2 = new Date(year2, month2, 0);
    days2 = days2.getDate();
    if (day2 > days2) {
      day2 = days2;
    }
    if (month2 < 10) {
      month2 = '0' + month2;
    }

    var t2 = year2 + '-' + month2 + '-' + day2;
    return t2;
  },



})
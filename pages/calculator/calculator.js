var util = require('../../utils/util.js');

Page({
  data: {
    //投资金额
    principal: '10000',
    // 利率
    interest: '10',
    //期限
    timeLimit: "12",
    year: true,
    month: true,
    mode: 0,
    array: ['一次性还本息', '按月付息到期还本', '等额本息'],
    //返现奖励
    investment: '',
    //抵扣奖励
    deduction: '',
    // 投资奖励
    investmentDeduction: '',
    //管理费
    // administrativeFee: '',

    result: {
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
      //到期时间
      date: '',
      //总收益
      totalEarning: '',
      mode: 0,

    }
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.setData({
      date: util.formatTime2(new Date()),

    });
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },

  bindDateChange: function (e) {
    this.data[e.target.id] = e.detail.value;
    this.setData(this.data);


  },

  inputChange: function (e) {
    this.data[e.target.id] = e.detail.value;
  },
  switch2Change: function (e) {
    this.data[e.target.id] = !this.data[e.target.id];
    if (!this.data[e.target.id]) {
      this.data.mode = 0;
    }

    this.setData(this.data);


  },
  onClick: function (e) {



    if (e.target.id != 'confirm') {
      this.setData({
        principal: '',
        interest: '',
        timeLimit: '',
        year: true,
        month: true,
        investment: '',
        deduction: '',
        investmentDeduction: '',
        // administrativeFee: '',
        mode: 0,
        date: util.formatTime2(new Date()),
      });
    } else {

      if (!this.data.principal || !this.data.interest || !this.data.timeLimit) {
        wx.showToast({
          title: '信息填写不完整',
        });
      } else {
        this.data.result.mode = this.data.mode;
        //本金    
        this.data.result.principal = Number.parseFloat(this.data.principal) ? Number.parseFloat(this.data.principal) : 10000;
        // 期数
        this.data.result.timeLimit = Number.parseFloat(this.data.timeLimit) ? Number.parseFloat(this.data.timeLimit) : 12;

        //到期时间
        var intervalDays = this.getIntervalDays();
        this.data.result.date = this.data.date;

        //奖励
        this.data.result.investment = (Number.parseFloat(this.data.investment) ? Number.parseFloat(this.data.investment) : 0)
          + (Number.parseFloat(this.data.deduction) ? Number.parseFloat(this.data.deduction) : 0)
          + (Number.parseFloat(this.data.investmentDeduction) ? Number.parseFloat(this.data.investmentDeduction) / 100 * this.data.principal : 0);

        //利息  
        this.data.result.interest = this.getInterest();

        // 年化率 
        this.data.result.year_interest = this.data.mode == 2 ? this.getYearInterestByMode2()
          : (this.getYearInterest() * 100).toFixed(2);

        if (this.data.mode == 2) {
          console.log('<>>>>>' + this.data.interest);
          // 总奖励
          var investment = this.data.result.investment;
          // 总投资天数
          var intervalDays = this.getIntervalDays();
          // 日利率
          var dayPrincipal = 0.01 * Number.parseFloat(this.data.interest) * 1.0 / (this.data.year ? 365 : 30.4166666667) * 1.0;

          // var realInterest = (Number.parseFloat(this.data.administrativeFee) ? (1.0 - 0.01 * Number.parseFloat(this.data.administrativeFee)) : 1.0)
          var totalMoney = this.data.result.principal + (Number.parseFloat(this.data.deduction) ? Number.parseFloat(this.data.deduction) : 0);
          // 总利息

          var interest = (intervalDays * dayPrincipal * totalMoney).toFixed(2);
          // 真实本金   
          var realPrincipal = (this.data.result.principal);

          this.data.result.realYearInterest = ((((Number.parseFloat(investment) + Number.parseFloat(interest)) * 365 / this.getIntervalDays()) / realPrincipal) *100).toFixed(2);

        }



        this.data.result.totalEarning = (Number.parseFloat(this.data.result.investment)
          + Number.parseFloat(this.data.result.interest)).toFixed(2);

        for (var key in this.data.result) {
          result = result + key + '=' + this.data.result[key] + '&';
        }
        result += "intervalDays=" + this.getIntervalDays();

        wx.navigateTo({
          url: '../resultlist/resultlist?' + result,
        });
      }
    }
  },

  getYearInterestByMode2: function () {


    return (this.data.interest * 1.0 + 1.0 * this.data.investmentDeduction);
  },

  getInterest: function () {


    if (this.data.mode == 2) {
      // 等额本息方式
      var dayPrincipal = 0.01 * (Number.parseFloat(this.data.interest) * 1.0 / ((this.data.year ? 365 : 30.4166666667) * 1.0));
      var monthPricipal = 30.4166666667 * dayPrincipal;
      var tmpInterest = [((this.data.principal * 1.0 + this.data.deduction * 1.0) * monthPricipal) * Math.pow((1 + monthPricipal), Number.parseFloat(this.data.timeLimit))]
        / [Math.pow((1 + monthPricipal), Number.parseFloat(this.data.timeLimit)) - 1];

      console.log((tmpInterest * Number.parseFloat(this.data.timeLimit)))
      return ((tmpInterest * Number.parseFloat(this.data.timeLimit)) - (this.data.principal * 1.0 + this.data.deduction * 1.0)).toFixed(2);

    } else {

      // 总投资天数
      var intervalDays = this.getIntervalDays();
      // 日利率
      var dayPrincipal = 0.01 * Number.parseFloat(this.data.interest) * 1.0 / (this.data.year ? 365 : 30.4166666667) * 1.0;

      // var realInterest = (Number.parseFloat(this.data.administrativeFee) ? (1.0 - 0.01 * Number.parseFloat(this.data.administrativeFee)) : 1.0)
      var totalMoney = this.data.result.principal + (Number.parseFloat(this.data.deduction) ? Number.parseFloat(this.data.deduction) : 0);

      return (intervalDays * dayPrincipal * totalMoney).toFixed(2);
    }
  },

  getYearInterest: function () {
    // 总奖励
    var investment = this.data.result.investment;
    // 总利息
    var interest = this.getInterest();
    // 真实本金   
    var realPrincipal = (this.data.result.principal);

    return ((Number.parseFloat(investment) + Number.parseFloat(interest)) * 365 / this.getIntervalDays()) / realPrincipal;


  },





  getIntervalDays: function () {
    return Number.parseFloat(this.data.timeLimit) ? (Number.parseFloat(this.data.timeLimit) * (this.data.month * 29.416666667 + 1)) : 365;
  },

  trim: function (str) {
    return str.replace(/\s+/g, "");
  }
})


var util = require('../../utils/util.js');

Page({
  data: {
    //投资金额
    principal:'',
    // 利率
    interest: '',
    //期限
    timeLimit: "",
    year: true,
    month: true,
    mode: 0,
    array: ['一次性还本息', '满标付息到期还本', '等额本息'],
    //投资奖励
    investment: '',
    //抵扣奖励
    deduction: '',
    // 投标奖励
    investmentDeduction: '',
    //管理费
    administrativeFee: '',
    result:{
      //本金
      principal:'',
      //利息
      interest:'',
  // 年化率 
     year_interest:'',
     //奖励
      investment:'',
      // 期数
      nper:'',
      //到期时间
      date:'',

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
    console.log(this.data);
    this.data[e.target.id] = e.detail.value;
    console.log(this.data);
    this.setData(this.data);

    console.log(this.data);

  },
  inputChange: function (e) {
    console.log(e.target.id);

    console.log(e.detail.value);
    this.data[e.target.id] = e.detail.value;
    console.log(this.data);
  },
  switch2Change: function (e) {
    this.data[e.target.id] = !this.data[e.target.id];
    this.setData(this.data);
  },
  onClick: function (e) {
    if (e.target.id != 'confirm') {
      console.log(this.data);

      this.setData({
        principal: '',
        interest: '',
        timeLimit: "",
        year: true,
        month: true,
        investment: '',
        deduction: '',
        investmentDeduction: '',
        administrativeFee: '',
        mode: 0,
        date: util.formatTime2(new Date()),
      });
      console.log(this.data);
    } else {
      console.log(this.data);
      console.log(!this.data.principal);
      console.log(!this.data.interest);
      console.log(!this.data.timeLimit);
      if (!this.data.principal || !this.data.interest || !this.timeLimit) {
        wx.showToast({
          title: '信息填写不完整',
        });
        return;
      }
      this.data.result.principal = this.data.principal;
      this.data.result.interest = getInterest(this.data.mode);







    }
  },

  getInterest:function(mode){
    //收入
    var earnings = (this.data.principal * this.data.interest * this.timeLimit)/(this.data.month?1:12)
    + this.data.investment + this.data.deduction 
    + this.data.investmentDeduction - this.data.administrativeFee;
      console.log(earnings);
      if(mode ==0){

      }


  }


})


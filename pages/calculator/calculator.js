var util = require('../../utils/util.js');

Page({
  data: {
    //投资金额
    principal: '1000',
    // 利率
    interest: '10',
    //期限
    timeLimit: "12",
    year: true,
    month: true,
    mode: 0,
    array: ['一次性还本息', '按月付息到期还本', '等额本息'],
    //投资奖励
    investment: '',
    //抵扣奖励
    deduction: '',
    // 投标奖励
    investmentDeduction: '',
    //管理费
    administrativeFee: '',

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
      totalEarning:'',
      mode:0,

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
      this.setData({
        principal: '',
        interest: '',
        timeLimit: '',
        year: true,
        month: true,
        investment: '',
        deduction: '',
        investmentDeduction: '',
        administrativeFee: '',
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
        this.data.result.investment =( Number.parseFloat(this.data.investment) ? Number.parseFloat(this.data.investment) : 0)
          + (Number.parseFloat(this.data.deduction) ? Number.parseFloat(this.data.deduction) : 0)
            + (Number.parseFloat(this.data.investmentDeduction) ? Number.parseFloat(this.data.investmentDeduction) : 0);
          
        //利息  
        this.data.result.interest = this.getInterest();

        // 年化率 
        this.data.result.year_interest =( this.getYearInterest()*100).toFixed(2);

        console.log(this.data.result);

        this.data.result.totalEarning =(Number.parseFloat( this.data.result.investment )
            + Number.parseFloat(this.data.result.interest)).toFixed(2);



        var result =""; 
        for (var key in this.data.result){
            result  = result+key+'='+this.data.result[key]+'&';
        }
        

        wx.navigateTo({
          url: '../resultlist/resultlist?'+result,
        });


      }




    }
  },

  getInterest: function () {
    // 总投资天数
    var intervalDays = this.getIntervalDays();
    // 日利率
    var dayPrincipal = 0.01* Number.parseFloat(this.data.interest)*1.0 / (this.data.year?365:30.4166666667)*1.0;
    console.log(intervalDays);
    console.log(dayPrincipal);
 
    var realInterest = (Number.parseFloat(this.data.administrativeFee) ? (1.0 - 0.01*Number.parseFloat(this.data.administrativeFee)):1.0)
    var totalMoney =   this.data.result.principal  +( Number.parseFloat(this.data.deduction) ? Number.parseFloat(this.data.deduction) : 0);

    return (intervalDays * dayPrincipal * totalMoney* realInterest).toFixed(2);
  },

  getYearInterest: function () {
    // 总奖励
    var investment = this.data.result.investment;
    console.log(' ---->> invertment: '+investment);
    // 总利息
    var interest = this.getInterest() ;
    console.log(' ---->> interest: ' + interest);
   // 真实本金   
    var realPrincipal= (this.data.result.principal);
    console.log( ' real '+investment + '   '+interest);

    return ((Number.parseFloat(investment) + Number.parseFloat(interest)) * 365 / this.getIntervalDays())/realPrincipal;
  },






  getIntervalDays :function(){
   return Number.parseFloat(this.data.timeLimit) ? (Number.parseFloat(this.data.timeLimit) * (this.data.month * 29.416666667 + 1)) : 365;
  },

  trim: function (str) {
    return str.replace(/\s+/g, "");
  }
})


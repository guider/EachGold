var util = require('../../utils/util.js');

Page({
  data: {
    principal: '',
    interest:'',
    timeLimit:"",
    mode: '一次性还本息',
    array: ['满标付息到期还本', '利息复投', '一次性还本息', '按月付息到期还本', '等额本息', '等额本金', '固定付息日', ''],
    investment:'',
    deduction:'',
    investmentDeduction:'',
    administrativeFee:'',
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

  bindDateChange:function(e){
    this.setData({
      date:e.detail.value,
    });
  },
  inputChange:function(e){
    console.log(e.target.id);
    console.log(e.detail.value);
    this.data[e.target.id]=e.detail.value;
    console.log(this.data);
  },
  onClick:function(e){
     if(e.target.id=='confirm'){

     }else{
       console.log(this.data);
       
        this.setData({
          principal: '',
          interest: '',
          timeLimit: "",
          investment: '',
          deduction: '',
          investmentDeduction: '',
          administrativeFee: '',
        
        });
        console.log(this.data);
     }
  },
})
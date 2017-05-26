// resultlist.js
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
    mode:0,
    list: [],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('options :  ' + options);
    this.setData(options);

    // 只有一期
    // util.compareDate(this.data.date, intervalDays)

   var dateArr=  this.data.date.split('-');
  //  this.setData({
  //     date:dateArr[0]+'-'+(Number.parseInt(dateArr[1])-1)+'-'+dateArr[2]
  //  });


    var maxDay = this.data.date.split('-')[2];

    if(count<2){
    var count = (this.data.mode)?this.data.timeLimit:1;

    for (var i = 0; i < count; i++) {
      this.data.list[i] = {
        principal: (this.data.principal / count + ((i == count) ? this.data.principal % count : 0)).toFixed(2),
        interest: (this.data.interest / count + ((i == count) ? this.data.interest % count : 0)).toFixed(2),
        //  date: (i == 0) ? this.data.date : (this.getNextDate(maxDay, this.data.list[i - 1].date)),
      }
    }

    }else{




      return;



    }



    this.setData(this.data);
    console.log(this.data);

  },

  // var year = date.getFullYear()
  // var month = date.getMonth() + 1
  // var day = date.getDate()
  getNextDate: function (maxDay, lastDate) {

    var dataArray = lastDate.split('-');
    var dateInstance = new Date(dataArray[0], Number.parseInt(dataArray[1]), 0);

    console.log(dateInstance.getFullYear() + '  ' + dateInstance.getMonth() + '   ');

    var newDateInstance = new Date(dateInstance.getFullYear(), dateInstance.getMonth(), 0);

    var resultDay = (Number.parseInt(maxDay) > dateInstance.getDate()) ? newDateInstance.getDate() : maxDay;

    console.log('max ' + maxDay + '   '+dateInstance.getDate() + '   ' + newDateInstance.getDate() );
    console.log('last '+dateInstance.getMonth());
    console.log('new ' + newDateInstance.getMonth());

    return dateInstance.getFullYear() + '-' +( Number.parseInt(dateInstance.getMonth())+1)+ '-' + resultDay;
  },

  getLastDay: function (year, month) {
    var new_year = year;    //取当前的年份          
    var new_month = month++;//取下一个月的第一天，方便计算（最后一天不固定）          
    if (month > 12) {
      new_month -= 12;        //月份减          
      new_year++;            //年份增          
    }
    var new_date = new Date(new_year, new_month, 1);                //取当年当月中的第一天          
    return (new Date(new_date.getTime() - 1000 * 60 * 60 * 24)).getDate();//获取当月最后一天日期          
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
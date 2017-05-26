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

    var maxDay = this.data.date.split('-')[2];
    if(this.data.mode<2){
        var count = (Number.parseInt(this.data.mode))?this.data.timeLimit:1;
    for (var i = 0; i < count; i++) {
      this.data.list[i] = {
        principal: (this.data.principal / count + ((i == count) ? this.data.principal % count : 0)).toFixed(2),
        interest: (this.data.interest / count + ((i == count) ? this.data.interest % count : 0)).toFixed(2),
         date: (i == 0) ? this.data.date :"1111",
      }
    }
    // (this.getNextDate(maxDay, this.data.list[i - 1].date)
    }else{







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

  },


  getNextMonth: function(date) {  
    var arr = date.split('-');  
    var year = arr[0]; //获取当前日期的年份  
    var month = arr[1]; //获取当前日期的月份  
    var day = arr[2]; //获取当前日期的日  
    var days = new Date(year, month, 0);  
    days = days.getDate(); //获取当前日期中的月的天数  
    var year2 = year;  
    var month2 = parseInt(month) + 1;  
    if(month2 == 13) {
      year2 = parseInt(year2) + 1;
      month2 = 1;
    }  
   var day2 = day;  
    var days2 = new Date(year2, month2, 0);  
    days2 = days2.getDate();  
    if(day2 > days2) {
      day2 = days2;
    }  
            if (month2 < 10) {
      month2 = '0' + month2;
    }  
          
            var t2 = year2 + '-' + month2 + '-' + day2;  
    return t2;  
  }
})
function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds();


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}


function formatTime2(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds();


  return [year, month, day].map(formatNumber).join('-');
}

function compareDate(start, intervalDays) {
  if (start == null || start.length == 0 || intervalDays == null || intervalDays.length == 0) {
    return 0;
  }
  var arr = start.split("-");
  var starttime = new Date(arr[0], parseInt(arr[1] - 1), arr[2]);
  var resultTimes = starttime.getTime() + intervalDays * 86400000;

  var resultDate=  new Date(resultTimes);

  return formatTime2(resultDate);
} 



module.exports = {
  formatTime: formatTime,
  formatTime2:formatTime2,
  compareDate: compareDate,
}

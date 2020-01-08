//获得本周的开始日期
export function getWeekStartDate() {
  let now = new Date() //当前日期
  let nowDayOfWeek = now.getDay()== 0 ? 6 : now.getDay() - 1; //今天本周的第几天 星期天获取回来的是0  
  let nowDay = now.getDate() //当前日
  let nowMonth = now.getMonth() //当前月
  let nowYear = now.getFullYear() //当前年
  let weekStartDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek)
  return formatDate(weekStartDate)
}

//获得本周的结束日期
export function getWeekEndDate() {
  let now = new Date() //当前日期
  let nowDayOfWeek = now.getDay() //今天本周的第几天
  let nowDay = now.getDate() //当前日
  let nowMonth = now.getMonth() //当前月
  let nowYear = now.getFullYear() //当前年
  nowYear += (nowYear < 2000) ? 1900 : 0 //
  let weekEndDate = new Date(nowYear, nowMonth, nowDay + (6 - nowDayOfWeek))
  return formatDate(weekEndDate)
}

//本月开始时间
export function getnowMonth() {
  let now = new Date() //当前日期
  let nowMonth = now.getMonth() //当前月
  let nowYear = now.getFullYear() //当前年
  nowYear += (nowYear < 2000) ? 1900 : 0 //
  let dayofmonth = new Date(nowYear, nowMonth, 1)
  return formatDate(dayofmonth)
}

//格式化日期：yyyy-MM-dd
export function formatDate(date) {
  let myyear = date.getFullYear()
  let mymonth = date.getMonth() + 1
  let myweekday = date.getDate()

  if (mymonth < 10) {
    mymonth = '0' + mymonth
  }
  if (myweekday < 10) {
    myweekday = '0' + myweekday
  }
  return (myyear + '-' + mymonth + '-' + myweekday)
}

//是否跨年
export function isGoYear(startval, endval) {
  let val = false
  let syear = new Date(startval), eyear = new Date(endval)
  if (syear.getFullYear() != eyear.getFullYear()) {
    val = true
  } else {
    val = false
  }
  return val
}

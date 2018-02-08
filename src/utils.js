!function () {
  /**
   * 日期的加减
   * @param dateType 1天 2月 3年 4时 5分 6秒
   * @param num 加减的量
   */
  Date.prototype.calendar = function (dateType, num) {
    switch (dateType) {
      case 1:
        let d = this.getDate();
        this.setDate(d + num);
        return this;
      case 2:
        let m = this.getMonth();
        this.setMonth(m + num);
        return this;
      case 3:
        let y = this.getFullYear();
        this.setFullYear(y + num);
        return this;
      case 4:
        let h = this.getHours();
        this.setHours(h + num);
        return this;
      case 5:
        let M = this.getMinutes();
        this.setMinutes(M + num);
        return this;
      case 6:
        let s = this.getSeconds();
        this.setSeconds(s + num);
        return this;
    }
  };

  Date.format = formatDate
}();

/**
 * 日期格式化
 * @param {*} date
 * @param {*} format  yyyy-MM-dd HH:mm:ss 默认
 */
function formatDate(date, format) {
  let o = {
    "M+": date.getMonth() + 1, //月份
    "d+": date.getDate(), //日
    "H+": date.getHours(), //小时
    "m+": date.getMinutes(), //分
    "s+": date.getSeconds(), //秒
    "q+": Math.floor((date.getMonth() + 3) / 3), //季度
    "w": formatNum(date.getDay()), //星期
    "S": date.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(format)) format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (let k in o)
    if (new RegExp("(" + k + ")").test(format)) format = format.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return format;
}

const formatNum = function (num) {
  let cnum = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
  let n = (num + '').split("");
  let s = '';
  n.forEach((m) => {
    s += cnum[m];
  })
  return s;
}

const moneyNum = function (value, suffix) {
  if (!value) return 0;
  let negative = false;
  if (String(value).indexOf("-") === 0) {
    value = value.substr(1);
    negative = true;
  }
  let number = parseInt(value).toFixed(2).split(".");
  let s = number[1];
  let n = number[0].split("").reverse();
  ;
  let str = '';
  let arr = [];
  let l = n.length;
  let numft = ''
  if (l >= 3) {
    n.forEach((b, i) => {
      str = b + str;
      if ((i + 1) % 3 === 0) {
        arr.push(str);
        str = '';
      }
      if (l - 1 === i && str !== '') {
        arr.push(str);
      }
    })
    numft = arr.reverse().join(',')
  } else {
    numft = number[0] + '';
  }
  return (negative ? "-" : "") + numft + "." + s + (suffix || "")
}

/**
 * 按指定份数分割数组
 * @param {*} array
 * @param {*} num
 */
const arrayslice = function (array, num) {
  let ar = [];
  let _ar = null;
  let _num = num;
  while (_ar = array.slice(0 - _num + num, num), _ar.length > 0 && ar.push(_ar), _ar.length === _num) {
    num += _num;
  }
  return ar;
}

const jiecheng = function jiecheng(m) { //求阶乘
  if (m <= 1) return 1;
  else return m * (jiecheng(m - 1)); //递归算:法n!=n*(n-1)!
}

function toQueryPair(key, value) {
  if (typeof value === 'undefined') {
    return key;
  }
  return key + '=' + encodeURIComponent(value === null ? '' : String(value));
}

const toBodyString = function (obj) {
  let ret = [];
  for (let key in obj) {
    let values = obj[key];
    if (values && values.constructor === Array) { //数组
      let queryValues = [];
      for (let i = 0, len = values.length, value; i < len; i++) {
        value = values[i];
        queryValues.push(toQueryPair(key, value));
      }
      ret = ret.concat(queryValues);
    } else { //字符串
      ret.push(toQueryPair(key, values));
    }
  }
  return ret.join('&');
}

const maxArr = function (arr,attr){
  var max = arr[0][attr];
  for(var i=1;i<arr.length;i++){
    if(max<arr[i][attr])max=arr[i][attr];
  }
  return max
}

const unique=function (array) {
  var n = [];
  for(var i = 0; i < array.length; i++){
    if (n.indexOf(array[i]) == -1) n.push(array[i]);
  }
  return n;
}

//获取前几天的日期
const getBeforeDate = function (n){
      var n = n;
      var d = new Date();
      var year = d.getFullYear();
      var mon=d.getMonth()+1;
      var day=d.getDate();
      if(day <= n){
              if(mon>1) {
                 mon=mon-1;
               }
             else {
                year = year-1;
                mon = 12;
                 }
               }
            d.setDate(d.getDate()-n);
           year = d.getFullYear();
           mon=d.getMonth()+1;
           day=d.getDate();
      var s = year+"-"+(mon<10?('0'+mon):mon)+"-"+(day<10?('0'+day):day);
      return s;
  }

  //根据数据里某个字段排序小到大
const comparearr = function (property){
    return function(a,b){
      var value1 = a[property];
      var value2 = b[property];
      return value1 - value2;
    }
  }
  //大到小
const comparearrdes = function (property){
  return function(a,b){
    var value1 = a[property];
    var value2 = b[property];
    return value2 - value1;
  }
}


let Cookie = {
  getItem: function (e) {
    return e ? decodeURIComponent(document.cookie.replace(new RegExp(
      "(?:(?:^|.*;)\\s*" + encodeURIComponent(e).replace(
      /[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"),
      "$1")) || null : null
  },
  setItem: function (e, t, r, n, o, i) {
    if (!e || /^(?:expires|max\-age|path|domain|secure)$/i.test(e)) return !1;
    let a = "";
    if (r) switch (r.constructor) {
      case Number:
        a = r === 1 / 0 ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" :
          "; max-age=" + r;
        break;
      case String:
        a = "; expires=" + r;
        break;
      case Date:
        a = "; expires=" + r.toUTCString()
    }
    return document.cookie = encodeURIComponent(e) + "=" + encodeURIComponent(t) +
      a + (o ? "; domain=" + o : "") + (n ? "; path=" + n : "") + (i ? "; secure" :
        ""), !0
  },
  removeItem: function (e, t, r) {
    return !!this.hasItem(e) && (document.cookie = encodeURIComponent(e) +
      "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (r ? "; domain=" + r : "") +
      (t ? "; path=" + t : ""), !0)
  },
  hasItem: function (e) {
    return !!e && new RegExp("(?:^|;\\s*)" + encodeURIComponent(e).replace(
      /[\-\.\+\*]/g, "\\$&") + "\\s*\\=").test(document.cookie)
  },
  keys: function () {
    for (let e = document.cookie.replace(
      /((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(
      /\s*(?:\=[^;]*)?;\s*/), t = e.length, r = 0; r < t; r++) e[r] =
      decodeURIComponent(e[r]);
    return e
  }
};

function autoCookie(key,expires = 1 / 0, ...values) {
  let value = Array.from(values);
  if(value.length !== 0){
    let b = true;
    value.forEach((a) => {
      b = typeof a === 'object'
    });
    if(!b && value.length > 1) throw '超过1个参数时必须都是对象';
    if(b){
      if(value.length === 1){
        Cookie.setItem(key,JSON.stringify(value[0]),expires)
      }else{
        let f = value.shift();
        Object.assign(f,...value);
        Cookie.setItem(key,JSON.stringify(f),expires)
      }
    }else{
      Cookie.setItem(key,...value, expires)
    }
  }else{
    let v = Cookie.getItem(key);
    try{
      return JSON.parse(v) || {};
    }catch (e){
      return v;
    }
  }
}

function removeCookie(key) {
  Cookie.removeItem(key);
}

const isRepeat = function (arr){

  var hash = {};

  for(var i in arr) {

    if(hash[arr[i].value])

      return true;

    hash[arr[i].value] = true;

  }

  return false;

}

const  isEmptyObject = function (obj) {
  for (var key in obj){
    return false;//返回false，不为空对象
  }
  return true;//返回true，为空对象
}

function loadingScript(url,fn) {
  return new Promise((resolve,reject) => {
    let script = document.createElement('script');
    script.src = url;
    script.onload = function () {
      fn && fn();
      resolve();
    };
    document.body.appendChild(script);
  });
}


export {
  formatDate,
  formatNum,
  moneyNum,
  arrayslice,
  jiecheng,
  toBodyString,
  maxArr,
  unique,
  getBeforeDate,
  comparearr,
  comparearrdes,
  autoCookie,
  removeCookie,
  isRepeat,
  isEmptyObject,
  loadingScript
}

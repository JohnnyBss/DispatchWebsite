let common = {};

common.setCookie = function (name,value,days) {
  if(days === undefined){
    days = 7;
  }
  let exp = new Date();
  exp.setTime(exp.getTime() + days*24*60*60*1000);
  document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
};

common.getCookie = function (cname) {
  let name = cname + "=";
  let ca = document.cookie.split(';');
  for(let i=0; i<ca.length; i++) {
    let c = ca[i].trim();
    if (c.indexOf(name) === 0) {
      return unescape(c.substring(name.length,c.length));
    }
  }
  return "";
};

common.delCookie = function (name) {
  // let date = new Date();
  // date.setTime(date.getTime() - 1);
  // let delValue = common.getCookie(key);
  // if (!!delValue) {
  //   document.cookie = key+'='+delValue+';expires=Thu, 01 Jan 1900 00:00:01 GMT;';
  // }

  let exp = new Date();
  exp.setTime(exp.getTime() - 1);
  let cookie_value = common.getCookie(name);
  if(cookie_value!=null)
  document.cookie = name + "=" + cookie_value + ";expires=" + exp.toGMTString() + "; path=/";
};
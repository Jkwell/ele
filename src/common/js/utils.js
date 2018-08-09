/**
 * 解析url参数
 * @example ?id=12345&a=b
 * @return Object {id:12345,a:b}
 */

 export function urlParse() {
   let url = window.location.search;
   let obj = {}
   // 以问号开头或者不是问号开头等于不是问号开头的
   let reg = /[?&][^?&]+=[^?&]+/g;
   let arr = url.match(reg);
   // ['?id=12345,&a=b]
  if (arr) {
    arr.forEach((item) => {
      let temArr = item.substring(1).split('=');
      let key = decodeURIComponent(tempArr[0]);
      let value = decodeURIComponent(temArr[1])
      obj[key] = value
    })
  }
  return obj
 }


'use strict'

/**
 * Array过滤
 * @date 2021-04-20
 * @param {Array} sourcesArray
 * @param {Array} keyArray
 * @returns {Array} 过滤后的数组
 */
export function getArrByKey(sourcesArray, keyArray) {
  return sourcesArray.filter(function (item) {
    if (keyArray.indexOf(item.label) != -1) {
      return true;
    }
    return false;
  });
}


/**
 * 调用父组件的方法
 * @date 2021-04-20
 * @param {Object} curentGrade 当前组件 一般是 this
 * @param {String} methodName 方法名称
 * @returns {Function} 返回父组件中的方法
 */
export function findMethod(curentGrade, methodName) {
  if (typeof curentGrade.$parent[methodName] === "function") {
    return curentGrade.$parent[methodName];
  } else {
    return findMethod(curentGrade.$parent, methodName);
  }
}




/**
 * 将一个对象中的属性复制给另外一个
 * @date 2021-04-21
 * @param {Object} sourceObj 源对象
 * @param {Object} targetObj  目标对象
 * @returns {null} 没有返回值
 */
export function copePropToObj(sourceObj, targetObj) {
  sourceObj.forEach(element => {
    targetObj[element.model] = "11111"
  });
}



/**
 * 生成随机字符串
 * @date 2021-05-07
 * @param {any} len
 * @returns {any}
 */
export function randomString(len) {
  len = len || 32;
  let $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'; /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
  let maxPos = $chars.length;
  let pwd = '';
  for (let i = 0; i < len; i++) {
    pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return pwd;
}


/**
 * 日期格式化
 * @date 2021-05-21
 * @param {any} fmt 日期格式 YYYY-mm-dd HH:MM:SS
 * @param {any} date 日期
 * @returns {any}
 */
export function dateFormat(fmt, date) {
  const opt = {
    "Y+": date.getFullYear().toString(), // 年
    "m+": (date.getMonth() + 1).toString(), // 月
    "d+": date.getDate().toString(), // 日
    "H+": date.getHours().toString(), // 时
    "M+": date.getMinutes().toString(), // 分
    "S+": date.getSeconds().toString() // 秒
    // 有其他格式化字符需求可以继续添加，必须转化成字符串
  };
  for (let k in opt) {
    let ret = new RegExp("(" + k + ")").exec(fmt);
    if (ret) {
      fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
    };
  };
  return fmt;
}

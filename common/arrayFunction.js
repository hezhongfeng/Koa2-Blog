'use strict';

/**
 * 去掉数组中的重复元素
 * @param array
 * @returns {Array}
 */
exports.unique = (array)=> {
  let res = [];
  let json = {};
  for (let ele of array) {
    if (!json[ele]) {
      res.push(ele);
      json[ele] = 1;
    }
  }
  return res;
}
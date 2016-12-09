"use strict";

/**
 * 公用 dataCache 处理逻辑
 *
 * @class dataCache
 * @constructor
 */
var set = function(key, value) {
	localStorage.setItem(key, value);
}	

var get = function(key) {
	return localStorage.getItem(key);
}

module.exports = {
	set: set,
	get: get
}
"use strict";

var restFul = require("../../utils/restful.js");

/**
 * 组件列表组件数据层
 *
 * @class comListModel
 * @constructor
 */
module.exports = {
	/**
	 * 获取页面信息
	 *
	 * @param params 请求参数
	 * @param succFunc 成功回调
	 * @param errFunc 失败回调
	 * @method getPageInfo
	 */
	getPageInfo: function(params, succFunc, errFunc) {
		restFul({
			operate: "GET",
			res: "pageInfo",
			data: params,
			successFn: succFunc,
			errorFn: errFunc
		});
	},

	/**
	 * 获取所有页面信息
	 *
	 * @param params 请求参数
	 * @param succFunc 成功回调
	 * @param errFunc 失败回调
	 * @method getPages
	 */
	getPages: function(params, succFunc, errFunc) {
		restFul({
			operate: "GET",
			res: "pages",
			data: params,
			successFn: succFunc,
			errorFn: errFunc
		});
	}
}
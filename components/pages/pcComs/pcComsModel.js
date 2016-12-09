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
	 * 预览页面
	 *
	 * @param params 请求数据
	 * @param succFunc 成功回调
	 * @param errFunc 失败回调
	 * @method getPrePage
	 */
	getPrePage: function(params, succFunc, errFunc) {
		restFul({
			operate: "GET",
			res: "prePage",
			data: params,
			successFn: succFunc,
			errorFn: errFunc
		});
	},


	/**
	 * 保存页面
	 *
	 * @param params 请求数据
	 * @param succFunc 成功回调
	 * @param errFunc 失败回调
	 * @method getPage
	 */
	getPage: function(params, succFunc, errFunc) {
		restFul({
			operate: "GET",
			res: "page",
			data: params,
			successFn: succFunc,
			errorFn: errFunc
		});
	},

	/**
	 * 发布单个页面
	 *
	 * @param params 请求数据
	 * @param succFunc 成功回调
	 * @param errFunc 失败回调
	 * @method postPage
	 */
	postPage: function(params, succFunc, errFunc) {
		restFul({
			operate: "POST",
			res: "onlinePage",
			data: params,
			successFn: succFunc,
			errorFn: errFunc
		});
	}
}
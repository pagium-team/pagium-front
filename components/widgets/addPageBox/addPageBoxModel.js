"use strict";

var restFul = require("../../utils/restful.js");

/**
 * 新增页面 model 层
 *
 * @class addPageBoxModule
 * @constructor
 */
module.exports = {
	/**
	 * 添加页面
	 *
	 * @param params 提交数据
	 * @param succFunc 成功回调
	 * @param errFunc 失败回调
	 * @method addPage
	 */
	addPage: function(params, succFunc, errFunc) {
		restFul({
			operate: "POST",
			res: "page",
			data: params,
			successFn: succFunc,
			errorFn: errFunc
		});
	},

	/**
	 * 更新页面
	 *
	 * @param params 提交数据
	 * @param succFunc 成功回调
	 * @param errFunc 失败回调
	 * @method addPage
	 */
	updatePage: function(params, succFunc, errFunc) {
		restFul({
			operate: "PUT",
			res: "page",
			data: params,
			successFn: succFunc,
			errorFn: errFunc
		});
	},

	/**
	 * 复制页面
	 *
	 * @param params 请求参数
	 * @param succFunc 成功回调
	 * @param errFunc 失败回调
	 * @method copyPage
	 */
	copyPage: function(params, succFunc, errFunc) {
		restFul({
			operate: "POST",
			res: "copyPage",
			data: params,
			successFn: succFunc,
			errorFn: errFunc
		});
	}
}
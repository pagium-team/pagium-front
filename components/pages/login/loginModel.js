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
	 * 请求登录
	 *
	 * @param params 参数
	 * @param succFunc 成功回调
	 * @param errFunc 失败回调
	 * @method login
	 */
	login: function(params, succFunc, errFunc) {
		restFul({
			operate: "POST",
			res: "login",
			data: params,
			successFn: succFunc,
			errorFn: errFunc
		});

	}
}
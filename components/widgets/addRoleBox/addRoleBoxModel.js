"use strict";

var restFul = require("../../utils/restful.js");

/**
 * 发布页面确认框
 *
 * @class pulishBoxModel
 * @constructor
 */
module.exports = {
	/**
	 * 新增角色
	 *
	 * @param params 提交数据
	 * @param succFunc 成功回调
	 * @param errFunc 失败回调
	 * @method addUser
	 */
	addRole: function(params, succFunc, errFunc) {
		restFul({
			operate: "POST",
			res: "role",
			data: params,
			successFn: succFunc,
			errorFn: errFunc
		});
	}
}
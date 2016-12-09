"use strict";

var restFul = require("../../utils/restful.js");

/**
 * 用户模块数据层
 *
 * @class userListModel
 * @constructor
 */
module.exports = {
	/**
	 * 获取用户列表
	 *
     * @param params 请求参数
	 * @param succFunc 成功回调
	 * @param errFunc 失败回调
	 * @method getUserList
	 */
	getUserList: function(params, succFunc, errFunc) {
		restFul({
			operate: "GET",
			res: "userList",
			data: params,
			successFn: succFunc,
			errorFn: errFunc
		});
	},
	/**
	 * 删除用户
	 *
     * @param params 请求参数
	 * @param succFunc 成功回调
	 * @param errFunc 失败回调
	 * @method deleteUser
	 */
	deleteUser: function(params, succFunc, errFunc) {
		restFul({
			operate: "DELETE",
			res: "user",
			data: params,
			successFn: succFunc,
			errorFn: errFunc
		});
	}
}
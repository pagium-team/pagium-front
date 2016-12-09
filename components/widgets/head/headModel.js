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
	 * 请求登出
	 *
	 * @param params 参数
	 * @param succFunc 成功回调
	 * @param errFunc 失败回调
	 * @method login
	 */
	logout: function(params, succFunc, errFunc) {
		restFul({
			operate: "POST",
			res: "logout",
			data: params,
			successFn: succFunc,
			errorFn: errFunc
		});
	},
	/**
	 * 获取菜单列表
	 *
	 * @param params 参数
	 * @param succFunc 成功回调
	 * @param errFunc 失败回调
	 * @method login
	 */
	getMenuList: function(params, succFunc, errFunc) {
		restFul({
			operate: "GET",
			res: "menuList",
			data: params,
			successFn: succFunc,
			errorFn: errFunc
		});
	}
}
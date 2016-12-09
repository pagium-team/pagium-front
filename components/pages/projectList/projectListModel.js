"use strict";

var restFul = require("../../utils/restful.js");

/**
 * 项目模块数据层
 *
 * @class projectListModel
 * @constructor
 */
module.exports = {
	/**
	 * 获取项目列表
	 *
     * @param params 请求参数
	 * @param succFunc 成功回调
	 * @param errFunc 失败回调
	 * @method getProjectList
	 */
	getProjectList: function(params, succFunc, errFunc) {
		restFul({
			operate: "GET",
			res: "projectList",
			data: params,
			successFn: succFunc,
			errorFn: errFunc
		});
	}
}
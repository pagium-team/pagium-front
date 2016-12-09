"use strict";

var restFul = require("../../utils/restful.js");

/**
 * 添加项目 model 层
 *
 * @class addProjectBoxModel
 * @constructor
 */
module.exports = {
	/**
	 * 新增项目
	 *
	 * @param params 提交数据
	 * @param succFunc 成功回调
	 * @param errFunc 失败回调
	 * @method addProject
	 */
	addProject: function(params, succFunc, errFunc) {
		restFul({
			operate: "POST",
			res: "project",
			data: params,
			successFn: succFunc,
			errorFn: errFunc
		});
	}
}
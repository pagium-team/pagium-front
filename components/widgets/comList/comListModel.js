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
	 * 获取所有组件信息
	 *
	 * @param projectId 项目id
	 * @param succFunc 成功回调
	 * @param errFunc 失败回调
	 * @method getComs
	 */
	getComs: function(projectId, succFunc, errFunc) {
		restFul({
			operate: "GET",
			res: "allComs",
			data: {projectId: projectId},
			successFn: succFunc,
			errorFn: errFunc
		});
	},

	/**
	 * 获取页面组件
	 *
	 * @param projectId 项目id
	 * @param pageId 页面id
	 * @param succFunc 成功回调
	 * @param errFunc 失败回调
	 * @method getComs
	 */
	getComsByPage: function(projectId, pageId, succFunc, errFunc) {
		restFul({
			operate: "GET",
			res: "coms",
			data: {
				projectId: projectId,
				pageId: pageId
			},
			successFn: succFunc,
			errorFn: errFunc
		});
	},

	/**
	 * 获取组件数据内容
	 *
	 * @param dataKey 数据键值
	 * @param succFunc 成功回调
	 * @param errFunc 失败回调
	 * @method getComDataByDatakey
	 */
	getComDataByDatakey: function(dataKey, succFunc, errFunc) {
		restFul({
			operate: "GET",
			res: "comData/" + dataKey,
			data: {},
			successFn: succFunc,
			errorFn: errFunc
		});
	},

	/**
	 * 添加一个组件
	 *
	 * @param data 请求数据
	 * @param succFunc 成功回调
	 * @param errFunc 失败回调
	 * @method postCom
	 */
	postCom: function(data, succFunc, errFunc) {
		restFul({
			operate: "POST",
			res: "com",
			data: data,
			successFn: succFunc,
			errorFn: errFunc
		});
	},

	/**
	 * 删除一个组件
	 *
	 * @param data 请求数据
	 * @param succFunc 成功回调
	 * @param errFunc 失败回调
	 * @method deleteCom
	 */
	deleteCom: function(data, succFunc, errFunc) {
		restFul({
			operate: "DELETE",
			res: "com",
			data: data,
			successFn: succFunc,
			errorFn: errFunc
		});
	},

	/**
	 * 更换组件
	 *
	 * @param data 请求数据
	 * @param succFunc 成功回调
	 * @param errFunc 失败回调
	 * @method putCom
	 */
	putCom: function(data, succFunc, errFunc) {
		restFul({
			operate: "PUT",
			res: "com",
			data: data,
			successFn: succFunc,
			errorFn: errFunc
		});
	},

	/**
	 * 更改组件数据
	 *
	 * @param data 请求数据
	 * @param succFunc 成功回调
	 * @param errFunc 失败回调
	 * @method putComData
	 */
	putComData: function(data, succFunc, errFunc) {
		restFul({
			operate: "PUT",
			res: "comData",
			data: data,
			successFn: succFunc,
			errorFn: errFunc
		});
	},

	/**
	 * 更改组件位置
	 *
	 * @param data 请求数据
	 * @param succFunc 成功回调
	 * @param errFunc 失败回调
	 * @method putComPos
	 */
	putComPos: function(data, succFunc, errFunc) {
		restFul({
			operate: "PUT",
			res: "comPosition",
			data: data,
			successFn: succFunc,
			errorFn: errFunc
		});
	}
}
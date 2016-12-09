"use strict";

var netConf = require("../../config/net-config.js");
var dataCache = require("../../utils/dataCache");

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
	uploadProjectFile: function(projectId, succFunc, errFunc) {
		$("#addProjectFileForm").ajaxSubmit({
            type: "POST",//提交类型
            dataType: "json",//返回结果格式
            url: netConf.host + ":" + netConf.dataPort + "/projectFile",//请求地址
            data: {
                sid: dataCache.get("sid"),
            	projectId: projectId
            },
            success: function (resp) {//请求成功后的函数
                if (resp.code == netConf.res.success.code) {
                	succFunc && succFunc();
                } else {
                	errFunc && errFunc();
                    console.log(resp);
                    if (resp.code == 4002) {
                        setTimeout(function () {
                            location.href = "http://"+location.host+"/#!/login";
                        }, 500);
                    }
                }
            },
            error: function (err) {
                errFunc && errFunc();
                console.log(err);
            },
            async: true
        });
	}
}
"use strict";

var netConf = require("config/net-config");
var dataCache = require("utils/dataCache");

/**
 * 公用 resful 处理逻辑
 * params {
 *      @operate {String} 处理方式
 *      @res {String} 处理资源 
 *      @data {Object} 请求参数
 *      @successFn {Function} 成功回调 
 *      @errorFn {Function} 失败回调
 *      @async {boolean} 是否异步，默认为true
 * }
 * @class resful
 * @constructor
 */
module.exports = function(params) {
    params.data.sid = dataCache.get("sid");
    $.ajax({
        type: params.operate || "get",
        url: netConf.host + ":" + netConf.dataPort + "/" + params.res || "",
        data: params.data || {},
        dataType: "json",
        async: params.async || true,
        cache: false,
        success: function(resp) {
            if (resp && parseInt(resp.code) == netConf.res.success.code) {
                if (typeof params.successFn === "function") {
                    params.successFn(resp);
                } else {
                    console.log("successFn undefine");
                }
            } else {
                console.log("code: " + resp.code + "msg: " + resp.msg);
                if (typeof params.errorFn === "function") {
                    params.errorFn(resp);
                }
                if (resp.code == 4002) {
                    setTimeout(function () {
                        location.href = "http://"+location.host+"/#!/login";
                    }, 500);
                }
            }
        },
        error: function(xhr, type) {
            if (typeof params.errorFn === "function") {
                params.errorFn();
            } else {
                console.log("error", type);
            }
        }
    });
}
"use strict";

var tpl = __inline("projectDetail.tpl");

var pageList = require("widgets/pageList"); // 页面列表
var loading = require("widgets/dLoading"); // loading 组件
var projectDetailModel = require("./projectDetailModel");
var dataCache = require("utils/dataCache");

/**
 * 运营操作模块
 *
 * @class ProjectDetail
 * @constructor
 */
var ProjectDetail = Vue.extend({
    template: tpl,

    data: function() {
        return {
            /**
             * 项目id
             * @property projectId 
             * @type Number
             */
            projectId: 1,
        }
    },

    ready: function() {
        this.projectId = dataCache.get("pl-projectId");
        this.$broadcast("showPages", this.projectId);
        Vue.nextTick(function() {
            materialize();
        });
    },

    components: {
        /**
         * 自定义页面列表
         * @property c-pages 
         * @type Object
         */
        "c-pages": pageList
    },

    methods: {
        /**
         * 返回
         *
         * @method goBack
         */
        goBack: function() {
            window.history.go(-1);
        },

        /**
         * 上传工程包
         *
         * @param {String} pageName 页面名称
         * @param {Array} editComs 编辑组件集合
         * @method uploadProjectFile
         */
        uploadProjectFile: function() {
            var self = this;
            loading.show("chart-dashboard");
            projectDetailModel.uploadProjectFile(this.projectId, function(resp) {
                Materialize.toast("上传项目成功!", 3000, "rounded");
                loading.hide();
                self.$broadcast("showPages", self.projectId);
            }, function(err) {
                Materialize.toast("上传项目失败!", 3000, "rounded");
                loading.hide();
            });
        }
    },

    events: {
        editPage: function(mode, pageId, pageName) {
            dataCache.set("pd-pageId", pageId);
            dataCache.set("pd-pageName", pageName);
            if (mode == "pc") {
                window.location.href = "?show=line#!/dash/pagemanage/pcComs";
            } else {
                window.location.href = "?show=line#!/dash/pagemanage/wapComs";
            }
        }
    }
});

var init = function() {
    return new ProjectDetail({
        el: "#dash-content",
        replace: false
    });
}

module.exports = {
    init: init
}
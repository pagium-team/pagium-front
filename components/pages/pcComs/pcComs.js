"use strict";

var tpl = __inline("pcComs.tpl");

var pageList = require("widgets/pageList"); // 页面列表
var comList = require("widgets/comList"); // 组件列表
var loading = require("widgets/loading"); // loading 组件
var netConf = require("config/net-config"); // 网络配置
var dataCache = require("utils/dataCache"); // 数据缓存
var pcComsModel = require("./pcComsModel"); // 数据层

/**
 * 运营操作模块
 *
 * @class pcComs
 * @constructor
 */
var pcComs = Vue.extend({
    template: tpl,

    data: function() {
        return {
            /**
             * 项目id
             * @property projectId 
             * @type Number
             */
            projectId: 1,

            /**
             * 页面id
             * @property pageId 
             * @type Number
             */
            pageId: null,

            /**
             * 页面名称
             * @property pageName 
             * @type String
             */
            pageName: null,

            /**
             * 预览页面url
             * @property pageUrl 
             * @type String
             */
            pageUrl: ""
        }
    },

    ready: function() {
        materialize();
        this.projectId = dataCache.get("pl-projectId");
        this.pageId = dataCache.get("pd-pageId");
        this.pageName = dataCache.get("pd-pageName");
        this.pageUrl = netConf.host + ":" + netConf.previewPort + "/" + this.pageName + ".html"
        this.$broadcast("editPage", this.projectId, this.pageId);
        this.$dispatch("preview");
    },

    components: {
        /**
         * 自定义组件列表
         * @property c-coms 
         * @type Object
         */
        "c-coms": comList
    },

    methods: {
        /**
         * 返回
         *
         * @method goBack
         */
        goBack: function() {
            $('.material-tooltip').hide();
            window.history.go(-1);
        },

        /**
         * 保存页面
         *
         * @method savePage
         */
        savePage: function() {
            $('.material-tooltip').hide();
            loading.show("chart-dashboard");
            var self = this;
            pcComsModel.getPage({
                projectId: this.projectId,
                pageId: this.pageId
            }, function(resp) {
                loading.hide();
                self.$dispatch("savePage", {
                    url: netConf.host + ":" + netConf.onLineViewPort + "/" + self.pageName + ".html"
                });
            }, function(resp) {
                loading.hide();
                Materialize.toast("保存失败!", 3000, "rounded");
            });
        },

        /**
         * 推送页面
         *
         * @method pulishToFTP
         */
        pulishToFTP: function() {
            $('.material-tooltip').hide();
            loading.show("chart-dashboard");
            var self = this;
            pcComsModel.postPage({
                projectId: this.projectId,
                pageId: this.pageId
            }, function(resp) {
                loading.hide();
                Materialize.toast("发布成功!", 3000, "rounded");
                window.open("https://collection.vipme.com/" + self.projectId + "/" + self.pageName + ".html");
            }, function(resp) {
                loading.hide();
                Materialize.toast("发布失败!", 3000, "rounded");
            });
        }
    },

    events: {
        /**
         * 保存页面事件
         *
         * @event savePage
         */
        savePage: function(resp) {
            window.open(resp.url);
        },

        /**
         * 预览页面事件
         *
         * @event previewPage
         */
        previewPage: function(resp) {
            this.pageUrl = "";
            var self = this;
            Vue.nextTick(function() {
                self.pageUrl = resp.url;
            });
        },

        /**
         * 预览页面
         *
         * @event preView
         */
        preview: function() {
            $('.material-tooltip').hide();
            var self = this;
            pcComsModel.getPrePage({
                projectId: this.projectId,
                pageId: this.pageId
            }, function(resp) {
                self.$dispatch("previewPage", {
                    url: netConf.host + ":" + netConf.previewPort + "/" + self.pageName + ".html"
                });
            }, function(resp) {
                Materialize.toast("预览失败!", 3000, "rounded");
            });
        }
    }
});

var init = function() {
    return new pcComs({
        el: "#dash-content",
        replace: false
    });
}

module.exports = {
    init: init
}
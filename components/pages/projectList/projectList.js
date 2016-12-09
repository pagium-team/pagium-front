"use strict";

var tpl = __inline("projectList.tpl");

var pageList = require("widgets/pageList"); // 页面列表
var projectListModel = require("./projectListModel");
var addProjectBox = require("widgets/addProjectBox");
var dataCache = require("utils/dataCache");

/**
 * 项目列表
 *
 * @class ProjectList
 * @constructor
 */
var ProjectList = Vue.extend({
    template: tpl,

    data: function() {
        return {
            projectList:[]
        }
    },

    ready: function() {
        this._initCards();
        materialize();
    },

    methods: {
        /**
         * 添加项目
         *
         * @method addProject
         */
        addProject: function() {
            $('.material-tooltip').hide();
            var self = this;
            addProjectBox.show("chart-dashboard", function() {
                self._initCards();
            });
        },

        /**
         * 点击项目事件
         *
         * @param projecctId 项目 id
         * @method _initCards
         */
        onProject: function(projectId) {
            dataCache.set("pl-projectId", projectId);
            location.href = '#!/dash/pagemanage/projectDetail';
        },

        /**
         * 初始化列表
         *
         * @method _initCards
         */
        _initCards: function(callback){
            var self = this;
            projectListModel.getProjectList({
                pageIndex: 1,
                pageSize: 100
            }, function(resp) {
                self.projectList = resp.data.projectList;
            }, function() {
                console.log("get project list error");
            });
        },
    }
});

var init = function() {
    return new ProjectList({
        el: "#dash-content",
        replace: false
    });
}

module.exports = {
    init: init
}
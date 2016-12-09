"use strict";

var pageTpl = __inline("pageList.tpl");

var loading = require("widgets/dLoading"); // loading 组件
var pageListModel = require("./pageListModel"); // 组件列表数据层
var addPageBox = require("widgets/addPageBox"); // 添加页面弹窗
var dataCache = require("utils/dataCache"); // 数据缓存

/**
 * 页面列表组件
 *
 * @class pageList
 * @constructor
 */
module.exports = Vue.extend({
	template: pageTpl,

	data: function() {
		return {
			/**
		     * 页面分类
		     * @property mode 
		     * @type String
		     */
			mode: null,

			/**
		     * 页面列表
		     * @property pages 
		     * @type Object
		     */
			pages: null
		}
	},

	ready: function() {
		
	},

	methods: {
		/**
		 * 弹出添加页面窗口
		 *
		 * @method shoAddPageDialog
		 */
		shoAddPageDialog: function() {
			$('.material-tooltip').hide();
			var self = this;
            addPageBox.show("chart-dashboard", {
            	data: {
            		operation: "add"
            	},
            	callback: function() {
                	self._showPage(dataCache.get("pl-projectId"));
            	}
            });
		},

		/**
		 * 弹出修改页面信息窗口
		 *
		 * @param {Number} pageId 页面id
		 * @method shoEditPageDialog
		 */
		shoEditPageDialog: function(pageId) {
			$('.material-tooltip').hide();

			loading.show("chart-dashboard");
	        var self = this;
	        pageListModel.getPageInfo({
	        	pageId: pageId
	        }, function(resp) {
	            loading.hide();
	        	if (resp && resp.data && resp.data[0]) {
	        		var obj = resp.data[0];
	        		obj.pageId = pageId;
	        		obj.operation = "update";
	        		addPageBox.show("chart-dashboard", {
		            	data: obj,
		            	callback: function() {
		                	self._showPage(dataCache.get("pl-projectId"));
		            	}
		            });
	        	} else {
	        		Materialize.toast("获取页面信息失败!", 3000, "rounded");
	        	}
	        }, function(resp) {
	            loading.hide();
	            Materialize.toast("获取页面信息失败!", 3000, "rounded");
	        });
		},

		/**
		 * 弹出复制页面信息窗口
		 *
		 * @param {Number} pageId 页面id
		 * @method showCopyPageDialog
		 */
		showCopyPageDialog: function(pageId) {
			$('.material-tooltip').hide();

			loading.show("chart-dashboard");
	        var self = this;
	        pageListModel.getPageInfo({
	        	pageId: pageId
	        }, function(resp) {
	            loading.hide();
	        	if (resp && resp.data && resp.data[0]) {
	        		var obj = resp.data[0];
	        		obj.pageId = pageId;
	        		obj.operation = "copy";
	        		addPageBox.show("chart-dashboard", {
		            	data: obj,
		            	callback: function() {
		                	self._showPage(dataCache.get("pl-projectId"));
		            	}
		            });
	        	} else {
	        		Materialize.toast("获取页面信息失败!", 3000, "rounded");
	        	}
	        }, function(resp) {
	            loading.hide();
	            Materialize.toast("获取页面信息失败!", 3000, "rounded");
	        });
		},

		/**
		 * 进入页面
		 *
		 * @param {String} mode 页面分类
		 * @param {Number} pageId 页面id
		 * @param {String} pageName 页面名称
		 * @method enterPage
		 */
		enterPage: function(mode, pageId, pageName) {
			if (!this.pages) return ;
			this.$dispatch("editPage", mode, pageId, pageName);
		},

		/**
		 * 修改 B2C 标记
		 *
		 * @param {String} mode B2C 端 标记
		 * @method changeMode
		 */
		changeMode: function(mode) {
			this.mode = mode;
			Vue.nextTick(materialize);
		},

		/**
		 * 加载页面模块列表
		 *
		 * @param {Number} projectId 项目id
		 * @method _showPage
		 */
		_showPage: function(projectId) {
			// 获取所有组件
	        loading.show("chart-dashboard");
	        var self = this;
	        pageListModel.getPages({
	        	projectId: projectId
	        }, function(resp) {
	            loading.hide();
	            self.pages = resp.data.pageList;
	            self.changeMode("wap");
	        }, function(resp) {
	            loading.hide();
	            Materialize.toast("获取页面列表信息失败!", 3000, "rounded");
	        });
		}
	},

	events: {
        /**
         * 加载页面模块列表
         *
         * @param {Number} projectId 项目id
         * @event showPages
         */
        showPages: function(projectId) {
        	this._showPage(projectId);
        }
    }
});
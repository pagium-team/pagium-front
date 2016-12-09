"use strict";

var addPageBoxTpl = __inline("addPageBox.tpl");

var addPageBoxModel = require("./addPageBoxModel");
var loading = require("widgets/dLoading"); // dLoading 组件
var editor = require("widgets/editor"); // 编辑器
var dataCache = require("utils/dataCache"); // 数据缓存

var boxEl = null;

/**
 * addPageBox 组件
 *
 * @class addPageBox
 * @constructor
 */
var addPageBox = Vue.extend({
	template: addPageBoxTpl,

	ready: function() {
		var self = this;
		Vue.nextTick(function() {
			$("#pageType").bind("change", function() {
				self.pageType = $("#pageType").val();
			});
			materialize();
			plugins();
		});
	},

	destroyed: function() {

	},

	data: function() {
		return {
			/**
		     * 操作模式
		     * @property operation 
		     * @type String update/add/copy
		     */
			operation: null,

			/**
		     * 页面名称
		     * @property pageName 
		     * @type String
		     */
			pageName: null,

			/**
		     * 页面描述
		     * @property pageDesc 
		     * @type String
		     */
			pageDesc: null,

			/**
		     * 页面 Title
		     * @property pageTitle 
		     * @type String
		     */
			pageTitle: null,

			/**
		     * 编辑器
		     * @property metaEditor 
		     * @type String
		     */
			metaEditor: null,

			/**
		     * 页面类型
		     * @property pageType 
		     * @type String
		     */
			pageType: null,

			/**
		     * 回调方法
		     * @property callback 
		     * @type String
		     */
			callback: null
		}
	},

	methods: {
		/**
		 * 确定
		 *
		 * @method confirm
		 */
		confirm: function() {
			if (this.operation == "add") {
				this._addPage();
			} else if (this.operation == "update") {
				this._updatePage();
			} else if (this.operation == "copy") {
				this._copyPage();
			}
		},

		/**
		 * 取消
		 *
		 * @method cancle
		 */
		cancle: function() {
			$('#addPageBox').closeModal({
				complete: function() {
					if (boxEl) {
						boxEl.$destroy(true);
						boxEl = null;
					}
				}
			});
		},

		/**
		 * 添加页面
		 *
		 * @method _addPage
		 */
		_addPage: function() {
			var self = this;
			var params = {
				projectId: dataCache.get("pl-projectId"),
				pageName: this.pageName,
				pageDesc: this.pageDesc,
				pageTitle: this.pageTitle,
				pageMeta: this.metaEditor.getValue(),
				pageType: this.pageType
			};
			loading.show("addPageBox");
			addPageBoxModel.addPage(params, function(resp) {
				loading.hide();
				Materialize.toast("添加成功!", 3000, "rounded");
				self.callback && self.callback();
				$('#addPageBox').closeModal({
					complete: function() {
						if (boxEl) {
							boxEl.$destroy(true);
							boxEl = null;
						}
					}
				});
			}, function(err) {
				console.log(err);
				loading.hide();
				Materialize.toast("添加失败!", 3000, "rounded");
			});
		},

		/**
		 * 修改页面
		 *
		 * @method _updatePage
		 */
		_updatePage: function() {
			var self = this;
			var params = {
				pageId: this.pageId,
				pageName: this.pageName,
				pageDesc: this.pageDesc,
				pageTitle: this.pageTitle,
				pageMeta: this.metaEditor.getValue(),
				pageType: this.pageType
			};
			loading.show("addPageBox");
			addPageBoxModel.updatePage(params, function(resp) {
				loading.hide();
				Materialize.toast("更新成功!", 3000, "rounded");
				self.callback && self.callback();
				$('#addPageBox').closeModal({
					complete: function() {
						if (boxEl) {
							boxEl.$destroy(true);
							boxEl = null;
						}
					}
				});
			}, function(err) {
				console.log(err);
				loading.hide();
				Materialize.toast("更新失败!", 3000, "rounded");
			});
		},

		_copyPage: function() {
			var self = this;
			addPageBoxModel.copyPage({
				projectId: dataCache.get("pl-projectId"),
	        	pageId: this.pageId,
				pageName: this.pageName,
				pageDesc: this.pageDesc,
				pageTitle: this.pageTitle,
				pageMeta: this.metaEditor.getValue(),
				pageType: this.pageType
	        }, function(resp) {
	            loading.hide();
	            Materialize.toast("复制页面成功!", 2000, "rounded");
	            self.callback && self.callback();
				$('#addPageBox').closeModal({
					complete: function() {
						if (boxEl) {
							boxEl.$destroy(true);
							boxEl = null;
						}
					}
				});
	        }, function(resp) {
	            loading.hide();
	            Materialize.toast("复制页面失败!", 3000, "rounded");
	        });
		}
	}
});

module.exports = {
	/**
	 * 显示 addPageBox
	 *
	 * @param id 需要展示到的容器id
	 * @param params 数据
	 * @method show
	 */
	show: function(id, params) {
		var callback = params.callback;
		var data = params.data;
		if (!boxEl) {
			boxEl = new addPageBox().$mount().$appendTo("#" + id);
			boxEl.callback = callback;
			$('#addPageBox').openModal({
				ready: function() {
					Vue.nextTick(function() {
						boxEl.operation = data.operation;
						boxEl.pageId = data.pageId;

						boxEl.pageName = data.name;
						boxEl.pageDesc = data.desc;
						boxEl.pageTitle = data.title;
						
						boxEl.metaEditor = new editor().$mount().$appendTo("#metaPannel");
						boxEl.metaEditor.setValue(data.meta);

						boxEl.pageType = data.type;
						$("#pageType").val(boxEl.pageType);
						materialize();
						plugins();
					});
				},
				complete: function() {
					if (boxEl) {
						boxEl.$destroy(true);
						boxEl = null;
					}
				}
			});
		}
	}
}
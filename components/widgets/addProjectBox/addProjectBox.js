"use strict";

var addProjectBoxTpl = __inline("addProjectBox.tpl");

var addProjectBoxModel = require("./addProjectBoxModel");
var loading = require("widgets/dLoading"); // loading 组件

var boxEl = null;

/**
 * addProjectBox 组件
 *
 * @class addProjectBox
 * @constructor
 */
var addProjectBox = Vue.extend({
	template: addProjectBoxTpl,

	ready: function() {
		Vue.nextTick(function() {
			materialize();
			plugins();
		});
	},

	destroyed: function() {

	},

	data: function() {
		return {
			/**
		     * 项目名称
		     * @property projectName 
		     * @type String
		     */
			projectName: null,

			/**
		     * 项目描述
		     * @property projectDesc 
		     * @type String
		     */
			projectDesc: null,

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
			var self = this;
			var params = {
				projectName: this.projectName,
				projectDesc: this.projectDesc
			};
			loading.show("addProjectBox");
			addProjectBoxModel.addProject(params, function(resp) {
				loading.hide();
				Materialize.toast("添加成功!", 3000, "rounded");
				self.callback && self.callback();
				$('#addProjectBox').closeModal({
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
				Materialize.toast("发布失败!", 3000, "rounded");
			});
		},

		/**
		 * 取消
		 *
		 * @method cancle
		 */
		cancle: function() {
			$('#addProjectBox').closeModal({
				complete: function() {
					if (boxEl) {
						boxEl.$destroy(true);
						boxEl = null;
					}
				}
			});
			
		}	
	}
});

module.exports = {
	/**
	 * 显示 addProjectBox
	 *
	 * @param id 需要展示到的容器id
	 * @param callback 回调方法
	 * @method show
	 */
	show: function(id, callback) {
		if (!boxEl) {
			boxEl = new addProjectBox().$mount().$appendTo("#" + id);
			boxEl.callback = callback;
			$('#addProjectBox').openModal({
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
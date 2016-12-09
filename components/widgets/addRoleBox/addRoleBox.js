"use strict";

var addRoleBoxTpl = __inline("addRoleBox.tpl");

var addRoleBoxModel = require("./addRoleBoxModel");
var loading = require("widgets/loading"); // loading 组件

var boxEl = null;

/**
 * addRoleBox 组件
 *
 * @class addRoleBox
 * @constructor
 */
var addRoleBox = Vue.extend({
	template: addRoleBoxTpl,

	ready: function() {

	},

	destroyed: function() {

	},

	data: function() {
		return {
			/**
		     * 角色名
		     * @property name 
		     * @type String
		     */
			name: null,

			/**
		     * 描述
		     * @property commom 
		     * @type String
		     */
			commom: null,

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
				name: this.name,
				commom: this.commom
			};
			loading.show("addRoleBox");
			addRoleBoxModel.addRole(params, function(resp) {
				loading.hide();
				Materialize.toast("添加成功!", 3000, "rounded");
				self.callback && self.callback();
				$('#addRoleBox').closeModal({
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
			$('#addRoleBox').closeModal({
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
	 * 显示 addRoleBox
	 *
	 * @param id 需要展示到的容器id
	 * @param callback 回调方法
	 * @method show
	 */
	show: function(params) {
		if (!boxEl) {
			boxEl = new addRoleBox().$mount().$appendTo("#" + params.id);
			boxEl.callback = params.callback;
			boxEl.name = ''
			boxEl.commom = ''
			$('#addRoleBox').openModal({
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
"use strict";

var addUserBoxTpl = __inline("addUserBox.tpl");

var addUserBoxModel = require("./addUserBoxModel");
var loading = require("widgets/loading"); // loading 组件

var boxEl = null;

/**
 * addUserBox 组件
 *
 * @class addUserBox
 * @constructor
 */
var addUserBox = Vue.extend({
	template: addUserBoxTpl,

	ready: function() {
		var self = this;

		addUserBoxModel.getRoleList({}, function(resp) {
			self.roleList = resp.data.roleList.length > 0 ? resp.data.roleList : [];
			Vue.nextTick(function() {
				materialize();
				plugins();
			});
		}, function(err) {
			console.log(err);
			Materialize.toast("获取角色列表失败!", 3000, "rounded");
		});
		$("#role").change(function() {
			var choice = $("#role").val();
			self.roles = choice;
		});
	},

	destroyed: function() {

	},

	data: function() {
		return {
			/**
		     * 用户名
		     * @property projectName 
		     * @type String
		     */
			username: null,

			/**
		     * 密码
		     * @property projectDesc 
		     * @type String
		     */
			password1: null,

			/**
		     * 密码确认
		     * @property projectDesc 
		     * @type String
		     */
			password2: null,

			/**
		     * 描述
		     * @property projectDesc 
		     * @type String
		     */
			desc: null,

			/**
		     * 角色列表
		     * @property roleList 
		     * @type List
		     */
			roleList: [],

			/**
		     * 选中的角色
		     * @property roles 
		     * @type List
		     */
			roles: null,

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
				username: this.username,
				password1: this.password1,
				password2: this.password2,
				remark: this.remark,
				roles: JSON.stringify(this.roles)
			};
			loading.show("addUserBox");
			addUserBoxModel.addUser(params, function(resp) {
				loading.hide();
				Materialize.toast("添加成功!", 3000, "rounded");
				self.callback && self.callback();
				$('#addUserBox').closeModal({
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
			$('#addUserBox').closeModal({
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
	 * 显示 addUserBox
	 *
	 * @param id 需要展示到的容器id
	 * @param callback 回调方法
	 * @method show
	 */
	show: function(params) {
		if (!boxEl) {
			boxEl = new addUserBox().$mount().$appendTo("#" + params.id);
			boxEl.callback = params.callback;
			boxEl.username = '';
			boxEl.remark = '';
			boxEl.roles = null;
			$('#addUserBox').openModal({
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
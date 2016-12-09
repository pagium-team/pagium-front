"use strict";

var loadingTpl = __inline("loading.tpl");

var loadingEl = null;

/**
 * loading 组件
 *
 * @class loading
 * @constructor
 */
var loading = Vue.extend({
	template: loadingTpl,

	ready: function() {
        prefixfree();
	},

	methods: {
		
	}
});

module.exports = {
	/**
	 * 显示loading
	 *
	 * @param id 需要展示到的容器id
	 * @method show
	 */
	show: function(id) {
		if (!loadingEl) {
			loadingEl = new loading().$mount().$appendTo("#" + id);
		}
	},

	/**
	 * 关闭loading
	 *
	 * @method hide
	 */
	hide: function() {
		if (loadingEl) {
			loadingEl.$destroy(true);
			loadingEl = null;
		}
	}
}
"use strict";

var tpl = __inline("dLoading.tpl");

var dLoadingEl = null;

var dLoading = Vue.extend({
	template: tpl,

	ready: function() {
		
	},

	methods: {
		
	}
});

module.exports = {
	show: function(id) {
		if (!dLoadingEl) {
			dLoadingEl = new dLoading().$mount().$appendTo("#" + id);
		}
	},

	hide: function() {
		if (dLoadingEl) {
			dLoadingEl.$destroy(true);
			dLoadingEl = null;
		}
	}
}
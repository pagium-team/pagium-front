"use strict";

var editorTpl = __inline("editor.tpl");

/**
 * 编辑器列表组件
 *
 * @class pageList
 * @constructor
 */
module.exports = Vue.extend({
	template: editorTpl,
	
	data: function() {
		return {
			/**
		     * 编辑器构造参数
		     * @property editorParams 
		     * @type Object
		     */
			editorParams: null,

			/**
		     * 编辑器实例
		     * @property editor 
		     * @type Object
		     */
			editor: ""
		}
	},	

	ready: function() {
		var obj = {
			lineNumbers: true,
            mode: "javascript"
		}

		if (this.editorParams) {
			for (var key in this.editorParams) {
				obj[key] = this.editorParams[key];
			}
		}

		// 初始化编辑器
		var editor = CodeMirror.fromTextArea(document.getElementById("comEditor"), obj);
        editor.setSize("100%", "100%");
        editor.setOption("theme", "blackboard");
        this.editor = editor;
	},

	methods: {
		/**
		 * 设置编辑器值 
		 *
		 * @method setValue
		 */
		setValue: function(value) {
			this.editor.doc.setValue(value);
		},

		/**
		 * 获取编辑器值 
		 *
		 * @method getValue
		 */
		getValue: function() {
			return this.editor.doc.getValue();
		},

		/**
		 * 检查代码错误
		 *
		 * @method hint
		 */
		hint: function() {
			return JSHINT(this.editor.doc.getValue());
		}
	}
});
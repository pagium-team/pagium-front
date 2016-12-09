"use strict";

var comTpl = __inline("comList.tpl");

var editor = require("widgets/editor"); // 编辑器
var loading = require("widgets/dLoading"); // loading 组件
var comListModel = require("./comListModel"); // 组件列表数据层
var netConf = require("config/net-config"); // 网络配置

/**
 * 组件列表组件
 *
 * @class comList
 * @constructor
 */
module.exports = Vue.extend({
	template: comTpl,

	data: function() {
		return {
			/**
		     * 项目id
		     * @property projectId 
		     * @type Number
		     */
			projectId: 1,
			
			/**
		     * 正在编辑的组件索引
		     * @property currentComIndex 
		     * @type Number
		     */
			currentComIndex: -1,

			/**
		     * 所有组件集合
		     * @property allComs 
		     * @type Array
		     */
			allComs: null,

			/**
		     * 要编辑的列表集合
		     * @property editComs 
		     * @type Array
		     */
			editComs: null,

			/**
		     * 正在编辑的页面id
		     * @property currentPageId 
		     * @type Number
		     */
			currentPageId: null,

			/**
		     * 编辑器
		     * @property editor 
		     * @type Object(Vue 对象)
		     */
			editor: null
		}
	},

	ready: function() {
		
	},

	watch: {
		"editComs": function() {
			var self = this;
			for (var i = 0, len = this.editComs.length; i < len; ++i) {
				(function(index) {
					$("#select" + index).unbind("change");
					$("#select" + index).bind("change", function() {
						self._onChange(index);
					});

					$("#posInput" + index).unbind("change");
					$("#posInput" + index).bind("change", function() {
						var fromPos = self.editComs[index].pos;
						var toPos = $("#posInput" + index).val();
						self.updatePos(index, fromPos, toPos);
					});
				})(i);
			}
		}
	},

	methods: {
		/**
		 * 增加组件
		 *
		 * @method add
		 */
		add: function() {
			if (this.currentComIndex > -1) { // 正在编辑某组件
				Materialize.toast("请先完成当前组件编辑!", 3000, "rounded");
				return ;
			}
			var self = this;
			comListModel.postCom({
				projectId: this.projectId,
				pageId: this.currentPageId,
                comCode: this.allComs[0].code
            }, function(resp) {
        		self._loadEditComs(self.currentPageId, function() {
            		self.edit(self.editComs.length - 1);
            		document.body.scrollTop = document.body.scrollHeight;
            	});
            }, function(resp) {
                Materialize.toast("添加失败!", 3000, "rounded");
            });
		},

		/**
		 * 编辑组件
		 *
		 * @param {Number} index 组件标记
		 * @method edit
		 */
		edit: function(index) {
			if (this.currentComIndex > -1) { // 正在编辑某组件
				Materialize.toast("请先完成当前组件编辑!", 3000, "rounded");
				return ;
			}

			// 缓存数据到内存
			this.currentComIndex = index;

			// 更新组件数据
			this.editComs[index].disabled = "false";
			var obj = new Object();
			$.extend(true, obj, this.editComs[index]);
			this.editComs.$set(index, obj);

			Vue.nextTick(function() {
				materialize();
				plugins();
			});
			
			// 打开编辑器
			var self = this;
			loading.show("chart-dashboard");
			comListModel.getComDataByDatakey(this.editComs[index].dataKey, function(resp) {
				loading.hide();
				self._createEditor(resp.data.content);
			}, function(resp) {
				loading.hide();
            	Materialize.toast("获取组件数据失败!", 3000, "rounded");
            });
		},

		/**
		 * 保存编辑
		 *
		 * @param {Number} index 组件索引
		 * @method save
		 */
		save: function(index) {
			if (!this.editor.hint()) {
				Materialize.toast("配置信息填写错误，请检查!", 3000, "rounded");
				return ;
			}
			if (this.editComs[this.currentComIndex].name === undefined) { // 当没有数据键值，表明是更换了组件
				this._change(this.editComs[index].id, this.editComs[index].code);
			} else {
				this._update(this.editComs[index].dataKey, this.editor.getValue());
			}
		}, 

		/**
		 * 放弃编辑
		 *
		 * @method cancle
		 */
		cancle: function() {
			var scrollTop = document.body.scrollTop;
			this._loadEditComs(this.currentPageId, function() {
				document.body.scrollTop = scrollTop;
			});
		},

		/**
		 * 预备删除组件
		 *
		 * @param {Number} index 组件索引
		 * @method remove
		 */
		remove: function(index) {
			if (this.currentComIndex > -1) { // 正在编辑某组件
				Materialize.toast("请先完成当前组件编辑!", 3000, "rounded");
				return ;
			}
			var self = this;
			swal({
                title: "删除组件",
                text: "确认永久删除  " + this.editComs[index].cName + "  吗?",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: '#DD6B55',
                confirmButtonText: '确认删除',
                cancelButtonText: '取消',
                closeOnConfirm: true
            },  function(){
                self._confirmRemove(index);
            });
		},

		/**
		 * 更新位置
		 *
		 * @param {Number} index 组件索引
		 * @param {Number} fromPos 起始位置
		 * @param {Number} toPos 目标位置
		 * @method updatePos
		 */
		updatePos: function(index, fromPos, toPos) {
			if (this.currentComIndex > -1) { // 正在编辑某组件
				Materialize.toast("请先完成当前组件编辑!", 3000, "rounded");
				$("#posInput" + index).val(fromPos);
				return ;
			}
			var self = this;
			loading.show("chart-dashboard");
			comListModel.putComPos({
				pageId: this.currentPageId,
				comId: this.editComs[index].id,
                toPos: toPos
            }, function(resp) {
            	loading.hide();
            	self.$dispatch("preview");   // 预览
            	var scrollTop = document.body.scrollTop;
            	self._loadEditComs(self.currentPageId, function() {
            		document.body.scrollTop = scrollTop;
            	});
            }, function(resp) {
            	console.log(resp);
            	loading.hide();
            	$("#posInput" + index).val(fromPos);
            	if (resp.code == 500021) {
            		Materialize.toast("位置已被占用!", 3000, "rounded");
            	} else {
            		Materialize.toast("位置调整失败!", 3000, "rounded");
            	}
            });
		},

		/**
		 * 更新组件
		 *
		 * @param {String} dataKey 组件数据键值
		 * @param {String} content 数据内容
		 * @method _update
		 */
		_update: function(dataKey, content) {
			var self = this;
			loading.show("chart-dashboard");
			comListModel.putComData({
                dataKey: dataKey,
                content: content
            }, function(resp) {
            	loading.hide();
        		self._loadEditComs(self.currentPageId, function() {
        			Materialize.toast("保存成功!", 3000, "rounded");
        			document.body.scrollTop = document.body.scrollHeight;
        		});
        		self.$dispatch("preview");   // 预览
            }, function(resp) {
            	loading.hide();
            	Materialize.toast("保存失败!", 3000, "rounded");
            });
		},

		/**
		 * 换新组件
		 *
		 * @param {Number} comId 组件id
		 * @param {String} comCode 组件名称
		 * @method _change
		 */
		_change: function(comId, comCode) {
			var self = this;
			loading.show("chart-dashboard");
			comListModel.putCom({
				projectId: this.projectId,
            	comId: comId,
                comCode: comCode,
                content: this.editor.getValue()
            }, function(resp) {
            	loading.hide();
            	self._loadEditComs(self.currentPageId, function() {
        			Materialize.toast("保存成功!", 3000, "rounded");
        			document.body.scrollTop = document.body.scrollHeight;
        		});
        		self.$dispatch("preview");   // 预览
            }, function(resp) {
            	loading.hide();
            	Materialize.toast("保存失败!", 3000, "rounded");
            });
		},

		/**
		 * 确认删除组件
		 *
		 * @param {Number} index 组件索引
		 * @method _confirmRemove
		 */
		_confirmRemove: function(index) {
			var self = this;
			loading.show("chart-dashboard");
			comListModel.deleteCom({
            	comId: this.editComs[index].id
            }, function(resp) {
            	loading.hide();
            	var scrollTop = document.body.scrollTop;
	            self._loadEditComs(self.currentPageId, function() {
        			Materialize.toast("删除成功!", 3000, "rounded");
        			document.body.scrollTop = scrollTop;
        		});
            }, function(resp) {
            	loading.hide();
            	Materialize.toast("删除失败!", 3000, "rounded");
            });
		},

		/**
		 * 创建编辑器
		 *
		 * @param {String} content 
		 * @method _createEditor
		 */
		_createEditor: function(content) {
			if (this.editor) this.editor.$destroy(true);
			this.editor = new editor();
			this.editor.editorParams = {
				gutters: ["CodeMirror-lint-markers"],
            	lint: true
			};
			this.editor.$mount().$appendTo("#editPannel-" + this.currentComIndex);
			this.editor.setValue(content);
		},

		/**
		 * 重置组件列表编辑状态
		 *
		 * @method _resetEditComs
		 */
		_resetEditComs: function() {
			if (this.editor) this.editor.$destroy(true); // 关闭编辑器
			this.currentComIndex = -1; // 重置当前组件索引

			// 重置组件状态
			for (var i = 0; i < this.editComs.length; ++i) {
            	this.editComs[i].disabled = "true";
				var obj = new Object();
				$.extend(true, obj, this.editComs[i]);
				this.editComs.$set(i, obj);
            }
		},

		/**
		 * 加载组件列表
		 *
		 * @method _loadAllComs
		 */
		_loadAllComs: function() {
			var self = this;
	        loading.show("chart-dashboard");
	        comListModel.getComs(this.projectId, function(resp) {
	        	loading.hide();
	            self.allComs = resp.data.comList;
	            materialize();
	        	plugins();
	        }, function(resp) {
	            loading.hide();
	            Materialize.toast("获取组件信息失败!", 3000, "rounded");
	        });
		},

		/**
		 * 加载页面组件
		 *
		 * @param {String} pageId 页面id
		 * @param {Function} callback 回调方法
		 * @method _loadEditComs
		 */
		_loadEditComs: function(pageId, callback) {
			var self = this;
        	loading.show("chart-dashboard");
	        comListModel.getComsByPage(this.projectId, pageId, function(resp) {
	        	loading.hide();
				self.editComs = resp.data;
	            self._resetEditComs();
	            Vue.nextTick(function() {
	            	materialize()
            		plugins();
            		callback && callback();
	            });
	        }, function(resp) {
	        	console.log(resp);
	            loading.hide();
	            Materialize.toast("获取组件信息失败!", 3000, "rounded");
	        });
		},

		/**
		 * 改变组件
		 *
		 * @param {Number} index 组件索引
		 * @method _onChange
		 */
		_onChange: function(index) {
			var comCode = $("#select" + index).val();
			if (comCode == this.editComs[index].code) return ;
			
			// 修改组件数据
			var eCom = new Object();
			eCom.id = this.editComs[index].id;
			eCom.code = comCode;
			this.editComs[this.currentComIndex] = eCom;

			// 打开编辑器
			for (var i = 0, len = this.allComs.length; i < len; ++i) {
				var gCom = this.allComs[i];
				if (gCom.code == comCode) {
					var content = !$.isEmptyObject(gCom["dataContent"])? gCom["dataContent"] : "";
					this._createEditor(content);
					break ;
				}
			}
		}
	},

	events: {
		/**
		 * 编辑页面事件
		 *
		 * @param {Number} projectId 项目id
		 * @param {Number} pageId 页面ID
		 * @event editPage
		 */
        editPage: function(projectId, pageId) {
        	this.projectId = projectId;
        	this.currentPageId = pageId;
			this._loadAllComs();
        	this._loadEditComs(pageId);
        }
    }
});
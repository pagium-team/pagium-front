'use strict';

/**
 * 角色列表页面
 *
 * @class userlist
 * @constructor
 */
var tpl = __inline('rolelist.tpl');
var roleListModel = require("./roleListModel");
var addRoleBox = require("widgets/addRoleBox");
var loading = require("widgets/loading"); // loading 组件

var dash = Vue.extend({
    template: tpl,
    data: function() {
        return {
            roleList: []
        }
    },
    ready: function () {
        this._initList();
        setTimeout(function() {
            $('.tooltipped').tooltip();
        }, 100);
    },
    methods: {
        /**
         * 添加角色
         *
         * @method addUser
         */
        addRole: function() {
            var self = this;
            $('.material-tooltip').hide();
            addRoleBox.show({
                id: "chart-dashboard", 
                callback: function() {
                    self._initList();
                }
            });
        },

        /**
         * 删除角色
         *
         * @method delRole
         */
        delRole: function(index) {
            var self = this;
            $('.material-tooltip').hide();
            swal({
                title: "删除角色",
                text: "确认永久删除  " + self.roleList[index].name + "  吗?",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: '#DD6B55',
                confirmButtonText: '确认删除',
                cancelButtonText: '取消',
                closeOnConfirm: true
            },  function(){
                self._confirmDelUser(self.roleList[index].id);
            });
        },

        /**
         * 确认删除角色
         *
         * @method _confirmDelUser
         */
        _confirmDelUser: function(roleId) {
            var self = this;
            loading.show("chart-dashboard");
            roleListModel.deleteUser({
                roleId: roleId
            }, function(resp) {
                self._initList();
                loading.hide();
                Materialize.toast("删除角色成功!", 2000, "rounded");
            }, function(resp) {
                loading.hide();
                Materialize.toast("删除失败!", 3000, "rounded");
            });
        },

        /**
         * 初始化角色列表
         *
         * @method _initCards
         */
        _initList: function(callback){
            var self = this;
            roleListModel.getUserList({
                pageIndex: 1,
                pageSize: 100
            }, function(resp) {
                self.roleList = resp.data.roleList;
            }, function() {
                console.log("get project list error");
            });
        },
    }
});

var init = function () {
    return new dash({
        el: "#dash-content",
        replace: false
    })
}

module.exports = {
    init: init
}
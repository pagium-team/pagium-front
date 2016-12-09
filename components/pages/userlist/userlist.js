'use strict';

/**
 * 用户列表页面
 *
 * @class userlist
 * @constructor
 */
var tpl = __inline('userlist.tpl');
var userListModel = require("./userListModel");
var addUserBox = require("widgets/addUserBox");
var loading = require("widgets/loading"); // loading 组件

var dash = Vue.extend({
    template: tpl,
    data: function() {
        return {
            userList: []
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
         * 添加用户
         *
         * @method addUser
         */
        addUser: function() {
            var self = this;
            $('.material-tooltip').hide();
            addUserBox.show({
                id: "chart-dashboard", 
                callback: function() {
                    self._initList();
                }
            });
        },

        /**
         * 删除用户
         *
         * @method delUser
         */
        delUser: function(index) {
            var self = this;
            $('.material-tooltip').hide();
            swal({
                title: "删除用户",
                text: "确认永久删除  " + self.userList[index].username + "  吗?",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: '#DD6B55',
                confirmButtonText: '确认删除',
                cancelButtonText: '取消',
                closeOnConfirm: true
            },  function(){
                self._confirmDelUser(self.userList[index].id);
            });
        },

        /**
         * 确认删除用户
         *
         * @method _confirmDelUser
         */
        _confirmDelUser: function(userId) {
            var self = this;
            loading.show("chart-dashboard");
            userListModel.deleteUser({
                userId: userId
            }, function(resp) {
                self._initList();
                loading.hide();
                Materialize.toast("删除用户成功!", 2000, "rounded");
            }, function(resp) {
                loading.hide();
                Materialize.toast("删除失败!", 3000, "rounded");
            });
        },

        /**
         * 初始化用户列表
         *
         * @method _initCards
         */
        _initList: function(callback){
            var self = this;
            userListModel.getUserList({
                pageIndex: 1,
                pageSize: 100
            }, function(resp) {
                self.userList = resp.data.userList;
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
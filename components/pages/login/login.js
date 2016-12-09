"use strict";

/**
 * 登录模块
 *
 * @class login
 * @constructor
 */
var tpl = __inline("login.tpl");

var head = require("widgets/head");
var loading = require("widgets/dLoading"); // loading 组件
var dataCache = require("utils/dataCache");
var loginModel = require("./loginModel");

var login = Vue.extend({
    template: tpl,

    components:{
        "c-head":head()
    },

    ready: function () {

    },

    data: function() {
        return {
            /**
             * 用户名
             * @property userName 
             * @type String
             */
            userName: null,

            /**
             * 密码
             * @property password 
             * @type String
             */
            password: null
        }
    },

    methods:{
        login: function() {
            loading.show("loginPanel");
            loginModel.login({
                userName: this.userName,
                password: this.password
            }, function(resp) {
                loading.hide();
                Materialize.toast("登录成功", 3000, "rounded");
                dataCache.set("sid", resp.data.sid);
                location.href='#!/index';
            }, function(err) {
                loading.hide();
                Materialize.toast("登录失败 账号或密码错误", 3000, "rounded");
            });
        }
    }
});

var init = function () {
    return new login({
        el: "#page-main",
        replace: false
    })
}

module.exports = {
    init: init
}
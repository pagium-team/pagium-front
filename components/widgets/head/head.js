'use strict';

/**
 * 头部组件
 *
 * @class head
 * @constructor
 */
var tpl = __inline('head.tpl');
var nconfig = require('config/n-config');

var loading = require("widgets/dLoading"); // loading 组件
var dataCache = require("utils/dataCache");
var headModel = require("./headModel");

var head = Vue.extend({
    template: tpl,
    data: function () {
        return {
            nconfig: nconfig,
            activeMenu: activeMenu,
            defaultClass: ""
        }
    },
    ready: function () {
        Vue.nextTick(materialize);
    },
    props: ['page'],
    methods: {
        onDash: function () {
            $('.material-tooltip').hide();
            setTimeout(function () {
                location.href = '?show=line#!/dash/support/contact';
            }, 200);
        },
        onFull: function () {
            $('.material-tooltip').hide();
            document.fullScreenElement && null !== document.fullScreenElement || !document.mozFullScreen && !document.webkitIsFullScreen ?
                document.documentElement.requestFullScreen ? document.documentElement.requestFullScreen() : document.documentElement
                    .mozRequestFullScreen ? document.documentElement.mozRequestFullScreen() : document.documentElement.webkitRequestFullScreen &&
                document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT) : document.cancelFullScreen ?
                document.cancelFullScreen() : document.mozCancelFullScreen ? document.mozCancelFullScreen() : document.webkitCancelFullScreen &&
            document.webkitCancelFullScreen();
        },
        onMenu:function(){
            $('.material-tooltip').hide();
            var navi = $('#slide-out');
            var showMenu = localStorage.getItem('showMenu');
            if (showMenu !== "show") {
                navi.addClass("nav-show");
                navi.removeClass('fadeOutLeft');
                navi.addClass('fadeInLeft');
                navi.addClass('animated');
                localStorage.setItem('showMenu','show');
            } else {
                navi.removeClass('fadeInLeft');
                navi.addClass('fadeOutLeft');
                navi.addClass('animated');
                localStorage.setItem('showMenu','hide');
            }
        },
        onHome:function(){
            $('.material-tooltip').hide();
            setTimeout(function () {
                location.href = "http://"+location.host+"/#!/index";
            }, 200);
        },
        logout: function() {
            loading.show("page-main");
            headModel.logout({
                sid: dataCache.get("sid")
            }, function(resp) {
                loading.hide();
                Materialize.toast("登出成功", 3000, "rounded");
                dataCache.set("sid", "");
                setTimeout(function () {
                    location.href = "http://"+location.host+"/#!/login";
                }, 500);
            }, function(err) {
                loading.hide();
                Materialize.toast("登出失败", 3000, "rounded");
            });
        },
        onMenuBar:function(e){
            $('.material-tooltip').hide();
            var url = $(e.srcElement).attr('data-url');
            setTimeout(function () {
                location.href = url;
            }, 200);
        }
    },
    replace: false
});

/**
 *
 * @param page
 * @param router
 * @returns {Object}
 */
var activeMenu = function(nconfig, page, router){
    var menuData = nconfig;

    var menus = menuData.menus;
    for (var i = 0; i < menus.length; i++) {
        if (menus[i].id === router) {
            menus[i].isAct = "active"
            if (menus[i].hasChild === "true") {
                for (var j = 0; j < menus[i].children.length; j++) {
                    if (menus[i].children[j].id === page) {
                        menus[i].children[j].isAct = "active";
                    } else {
                        menus[i].children[j].isAct = "";
                    }
                }
            }
        } else {
            menus[i].isAct = "";
            if (menus[i].hasChild === "true") {
                for (var j = 0; j < menus[i].children.length; j++) {
                    menus[i].children[j].isAct = "";
                }
            }
        }
    }
    menuData.menus = menus;

    return menuData;
}

var init = function () {
    headModel.getMenuList({
        sid: dataCache.get("sid")
    }, function(resp) {
        loading.hide();
        nconfig.menus = resp.data.menuList;
    }, function(err) {
        loading.hide();
        Materialize.toast("获取菜单失败", 3000, "rounded");
    });
    return head;
}

module.exports = init;
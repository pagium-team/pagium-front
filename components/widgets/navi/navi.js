'use strict';

/**
 * 菜单栏组件
 *
 * @class navi
 * @constructor
 */
var tpl = __inline('navi.tpl');

var nconfig = require('config/n-config');

var navi = Vue.extend({
    data: function () {
        return {
            nconfig: nconfig,
            activeMenu: activeMenu,
            defaultClass: ""
        }
    },
    template: tpl,
    ready: function () {
        var showMenu = localStorage.getItem('showMenu');
        if (showMenu === "show") {
            this.defaultClass = "nav-show";
        }
        Vue.nextTick(materialize);
    },
    events: {
        'navi-update': function (page, router) {
            this.nconfig = this.activeMenu(nconfig, page, router);
            Vue.nextTick(materialize);
        }
    },
    props: ['page'],
    methods: {},
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
    return navi;
}

module.exports = init;
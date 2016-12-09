"use strict";

/**
 * 控制台模块
 *
 * @class index
 * @constructor
 */
var tpl = __inline("dash.tpl");

var head = require("widgets/head");

var dash = Vue.extend({
    template: tpl,
    components:{
        "c-head":head()
    },
    ready: function () {
        //var showMenu = localStorage.getItem('showMenu');
        //if (showMenu === "show") {
        //    $("#dash-content").css("left", "250px");
        //    var wPercent = (window.innerWidth - 250) / window.innerWidth;
        //    $("#dash-content").css("width", Math.floor(wPercent * 100) + "%");
        //} else {
        //    $("#dash-content").css("left", "0");
        //}
    },
    method: function () {

    }
});

var init = function () {
    return new dash({
        el: "#page-main",
        replace: false
    })
}

module.exports = {
    init: init
}
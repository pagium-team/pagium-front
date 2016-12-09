"use strict";

/**
 * 首页模块
 *
 * @class index
 * @constructor
 */
var tpl = __inline("index.tpl");

var head = require("widgets/head");

var index = Vue.extend({
    template: tpl,
    components:{
        "c-head":head()
    },
    ready: function () {

    }
});

var init = function () {
    return new index({
        el: "#page-main",
        replace: false
    })
}

module.exports = {
    init: init
}
'use strict';

/**
 * 联系我们页面
 *
 * @class contact
 * @constructor
 */
var tpl = __inline('contact.tpl');

var contact = Vue.extend({
    template: tpl,
    ready: function () {
        
    },
    method: function () {

    }
});

var init = function (ctx) {
    return new contact({
        el: "#dash-content",
        replace: false
    });
}

module.exports = {
    init: init
}
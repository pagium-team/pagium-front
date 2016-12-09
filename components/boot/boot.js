'use strict';

var each = require('each');
var router = require('router');
var storage = require('store');

var config = require('config/n-config');
var pages = require('config/p-config');
var dataCache = require("utils/dataCache");

//----- 路由中间件 -----
// 初始化用户状态
function initSys(ctx, next) {
    if (location.search.indexOf('show=line') > -1) {
        showLoadingLine()
    } else {
        showLoadingPage();
    }
    next();
}

function showLoadingPage() {
    $("body").removeClass("loaded");
}

function hideLoadingPage() {
    $("body").addClass("loaded");
}

function showLoadingLine() {
    $("body").append("<div id='loadingbar'></div>");
    $("#loadingbar").addClass("waiting").append($("<dt/><dd/>"));
    setTimeout(function () {
        $("#loadingbar").width((50 + Math.random() * 30) + "%");
    }, 50);
}

function hideLoadingLine() {
    $("#loadingbar").width("300%").delay(100).fadeOut(500, function () {
        $(this).remove();
    });
}

var currentRootPage;
function loadPage(ctx, next) {
    var rootPage;
    var page = ctx.params.page;
    if ('/' + ctx.params.page !== ctx.path) {
        rootPage = ctx.path.split('/' + page)[0].split('/')[1];
    }
    var prectx = ctx;
    if (rootPage) {
        require.async(pages[rootPage], function (p) {
            if (currentRootPage && currentRootPage.$destroy) currentRootPage.$destroy();
            if (p.init) {
                currentRootPage = p.init(ctx);
            }
            var resultRoute = prectx.params.router;
            if (!resultRoute) {
                resultRoute = prectx.params.page;
            }
            currentRootPage.$broadcast('navi-update', page, resultRoute);
            runPage(prectx, next, page);
        });
    } else {
        runPage(ctx, next, page)
    }
}

var currentPage
function runPage(ctx, next, page) {
    if (location.search.indexOf('show=line') > -1) {
        hideLoadingLine()
        if (!$("body").hasClass("loaded")) {
            hideLoadingPage();
        }
    } else {
        hideLoadingPage();
    }
    if (pages.hasOwnProperty(page)) {
        require.async(pages[page], function (p) {
            if (currentPage && currentPage.$destroy) currentPage.$destroy();
            if (p.init) currentPage = p.init(ctx);
        });
    } else {
        next();
    }
}
router('*', function (ctx, next) {
    if (location.href.indexOf('login') < 0 && !dataCache.get("sid")) {
        setTimeout(function () {
            location.href = '#!/login';
        }, 300)
        return;
    }
    next();
});

//----- 页面路由 -----
router('/:page', function (ctx, next) {
    sessionStorage.setItem('excess', 'page');
    next()
}, initSys, loadPage);

router('/dash/:page', function (ctx, next) {
    next()
}, initSys, loadPage);

router('/dash/:router/:page', function (ctx, next) {
    next()
}, initSys, loadPage);

router('/', function (ctx, next) {
    ctx.params.page = 'index';
    next();
}, initSys, loadPage);

router('*', function (ctx) {
    router.replace('/' + config.default);
});

module.exports = function () {
    router.start();
}
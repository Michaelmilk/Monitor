/// <reference path="_all_ts_ref.ts"/>
/**
 * The main app module
 *
 * @type { angular.Module }
 */
var App;
(function (App) {
    'use strict';
    var app = angular.module('MonitorApp', ['ngResource', 'ngSanitize', 'ngAnimate', 'angularBootstrapNavTree',
        'ui.bootstrap.contextMenu', 'angular-loading-bar', 'angularSpinner'])
        .config(function (cfpLoadingBarProvider) {
        cfpLoadingBarProvider.parentSelector = '#lad';
        cfpLoadingBarProvider.includeSpinner = false;
        cfpLoadingBarProvider.includeBar = true;
        //cfpLoadingBarProvider.loadingBarTemplate = '<div id="loading-bar"><div class="bar"><div class="peg">tttt</div></div></div>';
        //cfpLoadingBarProvider.spinnerTemplate = '<div><span class="fa fa-spinner">Custom Loading Message...</div>';
    })
        .constant("Constants", App.Constants.Default)
        .service('NetResourceService', App.NetResourceService)
        .controller('HomeCtrl', App.HomeCtrl);
})(App || (App = {}));
//# sourceMappingURL=app.js.map
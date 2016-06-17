/// <reference path="_all_ts_ref.ts"/>
/**
 * The main app module
 *
 * @type { angular.Module }
 */
var App;
(function (App) {
    'use strict';
    var app = angular.module('MonitorApp', ['ngResource', 'angularBootstrapNavTree', 'ui.bootstrap.contextMenu'])
        .service('NetResourceService', App.NetResourceService)
        .controller('HomeCtrl', App.HomeCtrl);
})(App || (App = {}));
//# sourceMappingURL=app.js.map
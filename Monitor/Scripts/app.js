/// <reference path="_all_ts_ref.ts"/>
/**
 * The main app module
 *
 * @type { angular.Module }
 */
var App;
(function (App) {
    'use strict';
    var app = angular.module('MonitorApp', ['angularBootstrapNavTree', 'ui.bootstrap.contextMenu'])
        .controller('HomeCtrl', App.HomeCtrl);
})(App || (App = {}));
//# sourceMappingURL=app.js.map
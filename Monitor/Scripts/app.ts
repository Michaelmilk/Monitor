/// <reference path="_all_ts_ref.ts"/>

/**
 * The main app module
 * 
 * @type { angular.Module }
 */

module App {
    'use strict';
    var app = angular.module('MonitorApp', ['ngResource', 'angularBootstrapNavTree', 'ui.bootstrap.contextMenu'])
        // Services
        .service('NetResourceService', NetResourceService)

        // Directives


        // Controllers
        .controller('HomeCtrl', HomeCtrl)
        ;

} 
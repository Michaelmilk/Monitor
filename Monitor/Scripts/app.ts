/// <reference path="_all_ts_ref.ts"/>

/**
 * The main app module
 * 
 * @type { angular.Module }
 */

module App {
    'use strict';
    var app = angular.module('MonitorApp', ['angularBootstrapNavTree', 'ui.bootstrap.contextMenu'])
        // Services


        // Directives


        // Controllers
        .controller('HomeCtrl', HomeCtrl)
        ;

} 
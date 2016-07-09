﻿/// <reference path="_all_ts_ref.ts"/>

/**
 * The main app module
 * 
 * @type { angular.Module }
 */

module App {
    'use strict';
    var app = angular.module('MonitorApp', ['ngResource', 'ngAnimate', 'angularBootstrapNavTree',
        'ui.bootstrap.contextMenu', 'angular-loading-bar', 'angularSpinner'])

        //config spinner
        .config((cfpLoadingBarProvider) => {
            cfpLoadingBarProvider.parentSelector = '#lad';
            cfpLoadingBarProvider.includeSpinner = false;
            cfpLoadingBarProvider.includeBar = true;
            //cfpLoadingBarProvider.loadingBarTemplate = '<div id="loading-bar"><div class="bar"><div class="peg">tttt</div></div></div>';
            //cfpLoadingBarProvider.spinnerTemplate = '<div><span class="fa fa-spinner">Custom Loading Message...</div>';
        })

        // Constants
        .constant("Constants", Constants.Default)

        // Services
        .service('NetResourceService', NetResourceService)

        // Directives


        // Controllers
        .controller('HomeCtrl', HomeCtrl)
        ;

} 
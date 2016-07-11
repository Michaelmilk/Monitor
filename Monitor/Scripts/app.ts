/// <reference path="_all_ts_ref.ts"/>

/**
 * The main app module
 * 
 * @type { angular.Module }
 */

module App {
    'use strict';


    interface IAttrs extends ng.IAttributes {
        content: string;
    }

    var app = angular.module('MonitorApp', ['ngResource', 'ngSanitize', 'ngAnimate', 'angularBootstrapNavTree',
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
        //.directive('angularCompile', AngularCompile.factory())
        .directive('dir', ($compile, $parse) => {
            return {
                restrict: 'E',
                link: (scope, element, attr: IAttrs) => {
                    scope.$watch(attr.content, () => {
                        element.html($parse(attr.content)(scope));
                        $compile(element.contents())(scope);
                        console.log("compile");
                    }, true);
                }
            }
        })

        // Controllers
        .controller('HomeCtrl', HomeCtrl)
        ;

} 
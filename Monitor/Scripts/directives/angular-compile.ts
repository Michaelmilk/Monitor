/// <reference path="../_all_ts_ref.ts"/>

module App {
    'use strict';

    export class AngularCompile implements ng.IDirective {
        // directive config
        restrict = "E";

        // variables
        constructor(private $compile: ng.ICompileService, private $parse: ng.IParseService) {}

        static factory(): ng.IDirectiveFactory {
            const directive = ($compile, $parse) => {
                return new AngularCompile($compile, $parse);
            };
            directive.$inject = ['$compile', '$parse'];
            return directive;
        }

        link = ($scope: any, element: any, attr: any) => {
            $scope.$watch(attr.content, () => {
                element.html(this.$parse(attr.content)($scope));
                this.$compile(element.contents())($scope);
            }, true);
        }
    }
}  
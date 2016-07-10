/// <reference path="../_all_ts_ref.ts"/>
var App;
(function (App) {
    'use strict';
    var AngularCompile = (function () {
        // variables
        function AngularCompile($compile, $parse) {
            var _this = this;
            this.$compile = $compile;
            this.$parse = $parse;
            // directive config
            this.restrict = "E";
            this.link = function ($scope, element, attr) {
                $scope.$watch(attr.content, function () {
                    element.html(_this.$parse(attr.content)($scope));
                    _this.$compile(element.contents())($scope);
                }, true);
            };
        }
        AngularCompile.factory = function () {
            var directive = function ($compile, $parse) {
                return new AngularCompile($compile, $parse);
            };
            directive.$inject = ['$compile', '$parse'];
            return directive;
        };
        return AngularCompile;
    }());
    App.AngularCompile = AngularCompile;
})(App || (App = {}));
//# sourceMappingURL=angular-compile.js.map
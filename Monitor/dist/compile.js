var app = angular.module("MonitorApp", []);
app.directive('cp', function ($compile, $parse) {
    return {
        restrict: 'E',
        link: function (scope, element, attr) {
            scope.$watch(attr.content, function () {
                element.html($parse(attr.content)(scope));
                $compile(element.contents())(scope);
                console.log("compile");
            }, true);
        }
    }
});
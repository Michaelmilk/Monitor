/// <reference path="../_all_ts_ref.ts"/>
var App;
(function (App) {
    'use strict';
    var HomeCtrl = (function () {
        function HomeCtrl($scope, NetResourceService, $timeout) {
            var _this = this;
            this.$scope = $scope;
            this.NetResourceService = NetResourceService;
            this.$timeout = $timeout;
            //the $resource in angular to derive the map tree node info
            this.mapResourceService = NetResourceService.getMapTreeResource();
            // 'vm' stands for 'view model'. We're adding a reference to the controller to the scope
            // for its methods to be accessible from view / HTML
            $scope.vm = this;
            $scope.appleSelected = function (branch) {
                return _this.$scope.output = "APPLE! : " + branch.label;
            };
            //context menu
            $scope.otherMenuOptions = [
                ['Favorite Color', function ($itemScope, $event, color) {
                        alert(color);
                    }]
            ];
            this.getMapTree();
            //this.$scope.mapTreeData = null;
            this.$scope.mapTreeData = []; //must assign [], or error to load tree control
            //this.tryAsyncLoad();
            $scope.mapTree = this.mapTree = {};
            $scope.output = "dsfsdfss";
            console.log("constructor");
        }
        HomeCtrl.prototype.showSelectedTreeNodeInfo = function (branch) {
            var ref;
            this.$scope.output = "You selected: " + branch.label;
            if (branch.label === "Dog")
                this.$scope.src = branch.data.src;
            if ((ref = branch.data) != null ? ref.description : void 0) {
                return this.$scope.output += '(' + branch.data.description + ')';
            }
            console.log("myhandler");
        };
        HomeCtrl.prototype.tryAsyncLoad = function () {
            var _this = this;
            //this.$scope.mapTreeData = [];
            this.$scope.doing_async = true;
            return this.$timeout(function () {
                _this.$scope.mapTreeData = _this.mapTreeData;
                _this.$scope.doing_async = false;
                return _this.mapTree.expand_all();
            }, 1000);
        };
        HomeCtrl.prototype.getMapTree = function () {
            var _this = this;
            this.mapResourceService.getMapTree()
                .$promise.then(function (mapTreeData) {
                var array = [];
                array.push(angular.fromJson(angular.toJson(mapTreeData)));
                //this.mapTreeData = array;
                _this.$scope.mapTreeData = array;
                //this.$scope.$apply();
                console.log("treeData", _this.mapTreeData);
            });
        };
        HomeCtrl.$inject = [
            '$scope',
            'NetResourceService',
            '$timeout'
        ];
        return HomeCtrl;
    })();
    App.HomeCtrl = HomeCtrl;
})(App || (App = {}));
//# sourceMappingURL=homeCtrl.js.map
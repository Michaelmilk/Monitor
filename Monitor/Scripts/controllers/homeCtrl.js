/// <reference path="../_all_ts_ref.ts"/>
var App;
(function (App) {
    'use strict';
    var HomeCtrl = (function () {
        function HomeCtrl($scope, NetResourceService, $timeout, cfpLoadingBar, usSpinnerService) {
            var _this = this;
            this.$scope = $scope;
            this.NetResourceService = NetResourceService;
            this.$timeout = $timeout;
            this.cfpLoadingBar = cfpLoadingBar;
            this.usSpinnerService = usSpinnerService;
            //the $resource in angular to derive the map tree node info
            this.mapResourceService = NetResourceService.getMapTreeResource();
            // 'vm' stands for 'view model'. We're adding a reference to the controller to the scope
            // for its methods to be accessible from view / HTML
            $scope.vm = this;
            $scope.currentMapPicLink = null;
            $scope.currentMapConfig = null;
            $scope.currentIconList = null;
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
            $scope.currentIconList = [
                { name: "first", shape: "circle", location: { X: 100, Y: 100 }, coords: "100, 100, 8", iconUrl: "icon/green.png" },
                { name: "second", shape: "circle", location: { X: 190, Y: 290 }, coords: "200, 300, 8", iconUrl: "icon/green.png" }
            ];
            console.log("constructor");
        }
        HomeCtrl.prototype.showSelectedTreeNodeInfo = function (branch) {
            //var ref;
            //this.$scope.output = "You selected: " + branch.label;
            //if (branch.label === "Dog")
            //    this.$scope.src = branch.data.src;
            //if ((ref = branch.data) != null ? ref.description : void 0) {
            //    return this.$scope.output += '(' + branch.data.description + ')';
            //}
            this.$scope.currentMapPicLink = branch.picturePath;
            console.log("$scope.currentMapPicLink", this.$scope.currentMapPicLink);
        };
        HomeCtrl.prototype.getMapTree = function () {
            var _this = this;
            this.mapResourceService.getMapTree()
                .$promise.then(function (mapTreeData) {
                var array = [];
                array.push(angular.fromJson(angular.toJson(mapTreeData)));
                _this.$scope.mapTreeData = array;
                //this.usSpinnerService.spin('spinner-my');//show spinner
                console.log("treeData", _this.$scope.mapTreeData);
            });
        };
        //tryAsyncLoad() {
        //    //this.$scope.mapTreeData = [];
        //    this.$scope.doing_async = true;
        //    return this.$timeout(() => {
        //        this.$scope.mapTreeData = this.mapTreeData;
        //        this.$scope.doing_async = false;
        //        return this.mapTree.expand_all();
        //    }, 1000);
        //}
        //appleSelected(branch) {
        //    return this.$scope.output = "APPLE! : " + branch.label;
        //}
        //tryChangingTheTreeData() {
        //    console.log("mapTree", this.$scope.mapTree);
        //    if (this.$scope.mapTree === this.treeData) {
        //        return this.$scope.mapTree = this.treedataGeography;
        //    } else {
        //        return this.$scope.mapTree = this.treedataAvm;
        //    }
        //}
        //tryAddingABranch() {
        //    var b = this.tree.get_selected_branch();
        //    return this.tree.add_branch(b, {
        //        label: 'New Branch',
        //        data: {
        //            something: 42,
        //            "else": 43
        //        }
        //    });
        //}
        HomeCtrl.prototype.test = function () {
            alert("abcdefg");
        };
        HomeCtrl.$inject = [
            '$scope',
            'NetResourceService',
            '$timeout',
            'cfpLoadingBar',
            'usSpinnerService'
        ];
        return HomeCtrl;
    })();
    App.HomeCtrl = HomeCtrl;
})(App || (App = {}));
//# sourceMappingURL=homeCtrl.js.map
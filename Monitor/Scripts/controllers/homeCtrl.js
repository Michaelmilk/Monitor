/// <reference path="../_all_ts_ref.ts"/>
var App;
(function (App) {
    'use strict';
    var HomeCtrl = (function () {
        function HomeCtrl($scope, NetResourceService, $timeout, cfpLoadingBar, usSpinnerService, Constants) {
            var _this = this;
            this.$scope = $scope;
            this.NetResourceService = NetResourceService;
            this.$timeout = $timeout;
            this.cfpLoadingBar = cfpLoadingBar;
            this.usSpinnerService = usSpinnerService;
            this.Constants = Constants;
            //the $resource in angular to derive the map tree node info
            this.mapResourceService = NetResourceService.getMapTreeResource();
            // 'vm' stands for 'view model'. We're adding a reference to the controller to the scope
            // for its methods to be accessible from view / HTML
            $scope.vm = this;
            $scope.currentMapNode = {};
            //$scope.currentIconList = null;
            $scope.mode = "normal";
            $scope.mapHtmlVar = "";
            $scope.currentMapIcon = [];
            $scope.iconRadius = this.Constants.iconRadius;
            $scope.settingLocationIconList = [];
            $scope.menuLabel = {
                label1: "",
                label2: "",
                label3: "Dispose",
                label4: "",
                label5: "",
                label6: "",
                label7: "",
                label8: ""
            };
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
            //$scope.currentMapNode.locationIconList = [
            //    {id: 1, "name": "first", "shape": "circle", "locationCoordinate": { X: 100, Y: 100 }, "iconUrl": "icon/green.png"},
            //    {id: 2, "name": "second", "shape": "circle", "locationCoordinate": { X: 190, Y: 290 }, "iconUrl": "icon/green.png"}
            //];
            if (!!$scope.currentMapNode.locationIconList)
                $scope.settingLocationIconList = $scope.currentMapNode.locationIconList;
            console.log("constructor");
        }
        //#region map
        HomeCtrl.prototype.showSelectedTreeNodeInfo = function (branch) {
            this.$scope.currentMapNode = branch;
            console.log("branch, currentMapNode", branch, this.$scope.currentMapNode);
        };
        HomeCtrl.prototype.getMapTree = function () {
            var _this = this;
            this.mapResourceService.getMapTree()
                .$promise.then(function (mapTreeData) {
                var array = [];
                array.push(angular.fromJson(angular.toJson(mapTreeData)));
                _this.$scope.mapTreeData = array;
                //this.$scope.currentSettingIconList = this.$scope.currentMapIcon;
                //this.usSpinnerService.spin('spinner-my');//show spinner
                console.log("treeData", _this.$scope.mapTreeData);
            });
        };
        //#endregion
        //#region icon
        HomeCtrl.prototype.locateIcon = function ($event) {
            var x = $event.x;
            var y = $event.y;
            var offsetX = $event.offsetX;
            var offsetY = $event.offsetY;
            // you have lots of things to try here, not sure what you want to calculate
            console.log($event, x, y, offsetX, offsetY);
        };
        HomeCtrl.prototype.changeMode = function () {
            if (this.$scope.mode === "setting") {
                console.log("currentMapNode.locationIconList", this.$scope.currentMapNode.locationIconList);
                this.$scope.mode = "normal";
                this.$scope.currentMapNode.locationIconList = this.$scope.settingLocationIconList;
                this.$scope.menuLabel.label3 = "Dispose";
                this.saveIconDisposition(this.$scope.settingLocationIconList);
            }
            else if (this.$scope.mode === "normal") {
                this.$scope.mode = "setting";
                this.$scope.menuLabel.label3 = "Save";
                if (!!this.$scope.currentMapNode.locationIconList)
                    this.$scope.settingLocationIconList = this.$scope.currentMapNode.locationIconList;
            }
        };
        HomeCtrl.prototype.saveIconDisposition = function (settingLocationIconList) {
            var _this = this;
            this.mapResourceService.saveIconDisposition({
                id: this.$scope.currentMapNode.id
            }, {
                "iconList": settingLocationIconList
            }).$promise.then(function (iconList) {
                _this.$scope.currentMapNode.locationIconList = iconList;
            });
        };
        HomeCtrl.prototype.isInsideExistIconScale = function (xCoord, yCoord) {
            if (this.$scope.currentMapIcon.filter(function (t) {
                var squared = Math.pow(10 / 2, 2);
                var point = Math.pow(t.locationCoordinate.X - xCoord, 2) + Math.pow(t.locationCoordinate.Y - yCoord, 2);
                if (point <= squared)
                    return true;
            }).length > 0)
                return true;
            return false;
        };
        HomeCtrl.prototype.disposeIcon = function ($event) {
            if (this.$scope.mode === "setting") {
                var x = $event.x;
                var y = $event.y;
                this.$scope.offsetX = $event.offsetX;
                this.$scope.offsetY = $event.offsetY;
                //if (this.$scope.currentMapIcon && this.isInsideExistIconScale(this.$scope.offsetX, this.$scope.offsetX)) {
                //    alert("This position has exist icon!");
                //}
                var locationIcon = {
                    id: this.$scope.currentMapNode.iconCount++,
                    name: "first",
                    locationCoordinate: { X: this.$scope.offsetX - this.$scope.iconRadius, Y: this.$scope.offsetY - this.$scope.iconRadius },
                    iconUrl: "icon/green.png"
                };
                console.log("settingLocationIconList", this.$scope.settingLocationIconList);
                this.$scope.settingLocationIconList.push(locationIcon);
                console.log(this.$scope.settingLocationIconList);
                console.log($event, x, y, this.$scope.offsetX, this.$scope.offsetY, this.Constants.iconRadius);
            }
        };
        HomeCtrl.prototype.selectIcon = function (icon) {
            icon.selected = !icon.selected;
        };
        HomeCtrl.prototype.clickMap = function ($event) {
            //if (this.$scope.mode === "normal") {
            //    this.selectIcon($event);
            //} else if (this.$scope.mode === "setting") {
            //    this.disposeIcon($event);
            //}
            if (this.$scope.mode === "setting") {
                this.disposeIcon($event);
            }
        };
        HomeCtrl.prototype.clickIcon = function () {
        };
        HomeCtrl.prototype.pressKey = function ($event) {
            var key = $event.keyCode || $event.which;
            console.log("key", key);
            if (key === this.Constants.keyCodes.Delete) {
                this.$scope.settingLocationIconList = this.$scope.settingLocationIconList.filter(function (t) { return !t.selected; });
            }
            console.log('settingLocationIconList', this.$scope.settingLocationIconList);
        };
        //#endregion
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
            'usSpinnerService',
            'Constants'
        ];
        return HomeCtrl;
    }());
    App.HomeCtrl = HomeCtrl;
})(App || (App = {}));
//# sourceMappingURL=homeCtrl.js.map
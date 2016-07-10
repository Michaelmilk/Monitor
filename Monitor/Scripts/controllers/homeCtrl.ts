/// <reference path="../_all_ts_ref.ts"/>

module App {
    'use strict';

    export class HomeCtrl {
        public static $inject = [
            '$scope',
            'NetResourceService',
            '$timeout',
            'cfpLoadingBar',
            'usSpinnerService',
            '$sce',
            '$interpolate',
            'Constants'
        ];
        
        private mapResourceService;
        //private mapTreeData;
        private mapTree;

        constructor(private $scope,
            private NetResourceService,
            private $timeout,
            private cfpLoadingBar,
            private usSpinnerService,
            private $sce,
            private $interpolate,
            private Constants
        ) {
            //the $resource in angular to derive the map tree node info
            this.mapResourceService = NetResourceService.getMapTreeResource();

            // 'vm' stands for 'view model'. We're adding a reference to the controller to the scope
            // for its methods to be accessible from view / HTML
            $scope.vm = this;

            $scope.currentMapPicLink = null;
            $scope.currentMapConfig = null;
            $scope.currentIconList = null;
            $scope.mode = "normal";
            $scope.mapHtmlVar = "";
            $scope.currentMapIcon = [];
            $scope.iconDiameter = this.Constants.iconDiameter;
            //$scope.mapHtmlVar = "<img class='_map' src='{{currentMapPicLink}}'/>";
            //this.$scope.mapHtmlVar = this.$interpolate(this.$scope.mapHtmlVar)(this.$scope);
            //this.$scope.mapHtml = this.$sce.trustAsHtml(this.$scope.mapHtmlVar);

            $scope.appleSelected = (branch) => {
                return this.$scope.output = "APPLE! : " + branch.label;
            }

            //context menu
            $scope.otherMenuOptions = [
                ['Favorite Color', ($itemScope, $event, color) => {
                    alert(color);
                }]
            ];
            
            this.getMapTree();

            //this.$scope.mapTreeData = null;
            this.$scope.mapTreeData = [];//must assign [], or error to load tree control
            //this.tryAsyncLoad();

            $scope.mapTree = this.mapTree = {};
            $scope.output = "dsfsdfss";
            $scope.currentIconList = [
                {name:"first", shape: "circle", location: { X: 100, Y: 100 }, iconUrl: "icon/green.png"},
                {name:"second", shape: "circle", location: { X: 190, Y: 290 }, iconUrl: "icon/green.png" }
            ];
            console.log("constructor");
        }


        //#region map

        showSelectedTreeNodeInfo(branch) {
            //var ref;
            //this.$scope.output = "You selected: " + branch.label;
            //if (branch.label === "Dog")
            //    this.$scope.src = branch.data.src;
            //if ((ref = branch.data) != null ? ref.description : void 0) {
            //    return this.$scope.output += '(' + branch.data.description + ')';
            //}
            this.$scope.currentMapPicLink = branch.picturePath;
            console.log("$scope.currentMapPicLink", this.$scope.currentMapPicLink);
        }

        getMapTree() {
            this.mapResourceService.getMapTree()
                .$promise.then((mapTreeData) => {
                    var array = [];
                    array.push(angular.fromJson(angular.toJson(mapTreeData)));
                    this.$scope.mapTreeData = array;
                    //this.usSpinnerService.spin('spinner-my');//show spinner
                    console.log("treeData", this.$scope.mapTreeData);
                });
        }

        //#endregion


        //region icon

        locateIcon($event) {
            var x = $event.x;
            var y = $event.y;
            var offsetX = $event.offsetX;
            var offsetY = $event.offsetY;

            // you have lots of things to try here, not sure what you want to calculate
            console.log($event, x, y, offsetX, offsetY);
        }

        changeMode() {
            if (this.$scope.mode === "setting")
                this.$scope.mode = "normal";
            else if (this.$scope.mode === "normal")
                this.$scope.mode = "setting";
        }

        isInsideExistIconScale(xCoord: number, yCoord: number): boolean {
            if (this.$scope.currentMapIcon.filter(t => {
                var squared = Math.pow(10 / 2, 2);
                var point = Math.pow(t.locationCoordinate.X - xCoord, 2) + Math.pow(t.locationCoordinate.Y - yCoord, 2);
                if (point <= squared)
                    return true;
            }).length > 0)
                return true;
            return false;
        }

        disposeIcon($event) {
            if (this.$scope.mode === "setting") {
                var x = $event.x;
                var y = $event.y;
                this.$scope.offsetX = $event.offsetX;
                this.$scope.offsetY = $event.offsetY;
                //if (this.$scope.currentMapIcon && this.isInsideExistIconScale(this.$scope.offsetX, this.$scope.offsetX)) {
                //    alert("This position has exist icon!");
                //}

                var locationIcon = { locationCoordinate: { X: this.$scope.offsetX, Y: this.$scope.offsetY } };
                this.$scope.currentMapIcon.push(locationIcon);
                console.log($event, x, y, this.$scope.offsetX, this.$scope.offsetY, this.Constants.iconDiameter);

                this.$scope.mapHtmlVar = this.$scope.mapHtmlVar +
                    '<img class="_icon img-circle _cursor-pointer" ' +
                    'style="left: {{offsetX - iconDiameter}}px; top: {{offsetY - iconDiameter}}px;" ' +
                    'src="http://www.runoob.com/images/pulpit.jpg" ' +
                    'ng-class="{"_icon-selected": newAddedIcon.selected}" ' +
                    'ng-model="newAddedIcon" ' +
                    'ng-init="currentMapIcon.push(newAddedIcon)" ' +
                    'ng-click="vm.test()" >';

                this.$scope.mapHtmlVar = this.$interpolate(this.$scope.mapHtmlVar)(this.$scope);
                this.$scope.mapHtml = this.$sce.trustAsHtml(this.$scope.mapHtmlVar);
            }
        }

        //selectIcon($event) {
            
        //}

        clickMap($event) {
            //if (this.$scope.mode === "normal") {
            //    this.selectIcon($event);
            //} else if (this.$scope.mode === "setting") {
            //    this.disposeIcon($event);
            //}
            if (this.$scope.mode === "setting") {
                this.disposeIcon($event);
            }
        }

        clickIcon(icon) {
            if (icon)
                icon.selected = !icon.selected;
            console.log('currentMapIcon', this.$scope.currentMapIcon);
        }

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

        test() {
            alert("abcdefg");
        }
    }
}
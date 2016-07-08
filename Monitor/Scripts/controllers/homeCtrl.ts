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
            '$interpolate'
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
            private $interpolate
        ) {
            //the $resource in angular to derive the map tree node info
            this.mapResourceService = NetResourceService.getMapTreeResource();

            // 'vm' stands for 'view model'. We're adding a reference to the controller to the scope
            // for its methods to be accessible from view / HTML
            $scope.vm = this;

            $scope.currentMapPicLink = null;
            $scope.currentMapConfig = null;
            $scope.currentIconList = null;
            this.$scope.mode = "normal";
            $scope.mapHtmlVar = "<img class='_map' src='{{currentMapPicLink}}'/>";
            this.$scope.mapHtmlVar = this.$interpolate(this.$scope.mapHtmlVar)(this.$scope);
            this.$scope.mapHtml = this.$sce.trustAsHtml(this.$scope.mapHtmlVar);

            $scope.appleSelected = (branch) => {
                return this.$scope.output = "APPLE! : " + branch.label;
            }

            //context menu
            $scope.otherMenuOptions = [
                ['Favorite Color', ($itemScope, $event, color) => {
                    alert(color);
                }]
            ];


            //$scope.locateIcon = ($event) => {
            //    var x = $event.x;
            //    var y = $event.y;
            //    var offsetX = $event.offsetX;
            //    var offsetY = $event.offsetY;

            //    // you have lots of things to try here, not sure what you want to calculate
            //    console.log($event, x, y, offsetX, offsetY);
            //}

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

        disposeIcon($event) {
            var x = $event.x;
            var y = $event.y;
            this.$scope.offsetX = $event.offsetX;
            this.$scope.offsetY = $event.offsetY;

            console.log($event, x, y, this.$scope.offsetX, this.$scope.offsetY);
            this.$scope.mapHtmlVar = this.$scope.mapHtmlVar +
                '<img class="_icon img-circle" style="left: {{offsetX - 20}}px; top: {{offsetY - 20}}px;" src="http://www.runoob.com/images/pulpit.jpg">';
            this.$scope.mapHtmlVar = this.$interpolate(this.$scope.mapHtmlVar)(this.$scope);
            this.$scope.mapHtml = this.$sce.trustAsHtml(this.$scope.mapHtmlVar);
        }
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
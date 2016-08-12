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
            'Constants'
        ];
        
        private mapResourceService;
        //private mapTreeData;
        private mapTree; //use for tryAsyncLoad(maybe useless)

        constructor(private $scope,
            private NetResourceService,
            private $timeout,
            private cfpLoadingBar,
            private usSpinnerService,
            private Constants
        ) {
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
            }

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
            //{
            //        label: 'Animal',
            //        children: [
            //            {
            //                label: 'Dog',
            //                data: {
            //                    description: "man's best friend",
            //                    src: "http://localhost:7782/pic/1.jpg"
            //                }
            //            }, {
            //                label: 'America',
            //                data: {
            //                    description: "Felis catus"
            //                }
            //            }, {
            //                label: 'Hippopotamus',
            //                data: {
            //                    description: "hungry, hungry"
            //                }
            //            }, {
            //                label: 'Chicken',
            //                children: ['White Leghorn', 'Rhode Island Red', 'Jersey Giant']
            //            }
            //        ]
            //}];

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

        showSelectedTreeNodeInfo(branch) {
            this.$scope.currentMapNode = branch;
            console.log("branch, currentMapNode", branch, this.$scope.currentMapNode );
        }

        getMapTree() {
            this.mapResourceService.getMapTree()
                .$promise.then((mapTreeData) => {
                    var array = [];
                    array.push(angular.fromJson(angular.toJson(mapTreeData)));
                    this.$scope.mapTreeData = array;

                    ///delete
                    //this.$scope.currentSettingIconList = this.$scope.currentMapIcon;
                    //this.$scope.mapTree.expand_all();
                    //console.log("cur", this.mapTree.get_selected_branch());



                    //reuse
                    //this.usSpinnerService.spin('spinner-my');//show spinner
                    //use timeout to expand, or write onclick in html, need time to sync treectl with mapTree object
                    //this.$timeout(() => {
                    //    this.get_selected_branch();
                    //    return this.mapTree.expand_all();
                    //}, 1);

                    console.log("treeData", this.$scope.mapTreeData);
                });
        }

        //#endregion


        //#region icon

        locateIcon($event) {
            var x = $event.x;
            var y = $event.y;
            var offsetX = $event.offsetX;
            var offsetY = $event.offsetY;

            // you have lots of things to try here, not sure what you want to calculate
            console.log($event, x, y, offsetX, offsetY);
        }

        changeMode() {
            if (this.$scope.mode === "setting") {
                console.log("currentMapNode.locationIconList", this.$scope.currentMapNode.locationIconList);
                this.$scope.mode = "normal";
                this.$scope.currentMapNode.locationIconList = this.$scope.settingLocationIconList;
                this.$scope.menuLabel.label3 = "Dispose";
                this.saveIconDisposition(this.$scope.settingLocationIconList);
                //this.$scope.currentIconList = this.$scope.currentIconList.map(t => t.selected = false);
            } else if (this.$scope.mode === "normal") {
                this.$scope.mode = "setting";
                this.$scope.menuLabel.label3 = "Save";
                if (!!this.$scope.currentMapNode.locationIconList)
                    this.$scope.settingLocationIconList = this.$scope.currentMapNode.locationIconList;
            }
        }

        saveIconDisposition(settingLocationIconList) {
            this.mapResourceService.saveIconDisposition(
            {
                id: this.$scope.currentMapNode.id
            },
            {
                "iconList": settingLocationIconList
            }).$promise.then((iconList) => {
                this.$scope.currentMapNode.locationIconList = iconList;
            });
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
        }

        selectIcon(icon) {
            icon.selected = !icon.selected;
        }

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

        clickIcon() {
            
        }

        pressKey($event) {
            var key = $event.keyCode || $event.which;
            console.log("key", key);
            if (key === this.Constants.keyCodes.Delete) {
                this.$scope.settingLocationIconList = this.$scope.settingLocationIconList.filter(t => !t.selected);
            }
            console.log('settingLocationIconList', this.$scope.settingLocationIconList);
        }

        //#endregion

        
        //tryAsyncLoad() {
        //    //this.$scope.mapTreeData = [];
        //    this.$scope.doing_async = true;
        //    return this.$timeout(() => {
        //        this.$scope.mapTreeData = this.$scope.tt;
        //        //this.$scope.doing_async = false;
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

        //test
        test() {
            alert("abcdefg");
        }

        get_selected_branch() {
            var b;
            b = this.mapTree.get_selected_branch();
            console.log("cur", b);
        }
    }
}
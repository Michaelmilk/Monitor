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
            this.treedataAvm = [
                {
                    label: 'Animal',
                    children: [
                        {
                            label: 'Dog',
                            data: {
                                description: "man's best friend",
                                src: "http://localhost:7782/pic/1.jpg"
                            }
                        }, {
                            label: 'Cat',
                            data: {
                                description: "Felis catus"
                            }
                        }, {
                            label: 'Hippopotamus',
                            data: {
                                description: "hungry, hungry"
                            }
                        }, {
                            label: 'Chicken',
                            children: ['White Leghorn', 'Rhode Island Red', 'Jersey Giant']
                        }
                    ]
                }, {
                    label: 'Vegetable',
                    data: {
                        definition: "A plant or part of a plant used as food, typically as accompaniment to meat or fish, such as a cabbage, potato, carrot, or bean.",
                        data_can_contain_anything: true
                    },
                    onSelect: function (branch) {
                        return _this.$scope.output = "Vegetable: " + branch.data.definition;
                    },
                    children: [
                        {
                            label: 'Oranges'
                        }, {
                            label: 'Apples',
                            children: [
                                {
                                    label: 'Granny Smith',
                                    onSelect: $scope.appleSelected
                                }, {
                                    label: 'Red Delicous',
                                    onSelect: $scope.appleSelected
                                }, {
                                    label: 'Fuji',
                                    onSelect: $scope.appleSelected
                                }
                            ]
                        }
                    ]
                }, {
                    label: 'Mineral',
                    children: [
                        {
                            label: 'Rock',
                            children: ['Igneous', 'Sedimentary', 'Metamorphic']
                        }, {
                            label: 'Metal',
                            children: ['Aluminum', 'Steel', 'Copper']
                        }, {
                            label: 'Plastic',
                            children: [
                                {
                                    label: 'Thermoplastic',
                                    children: ['polyethylene', 'polypropylene', 'polystyrene', ' polyvinyl chloride']
                                }, {
                                    label: 'Thermosetting Polymer',
                                    children: ['polyester', 'polyurethane', 'vulcanized rubber', 'bakelite', 'urea-formaldehyde']
                                }
                            ]
                        }
                    ]
                }
            ];
            this.treedataGeography = [
                {
                    label: 'North America',
                    children: [
                        {
                            label: 'Canada',
                            children: ['Toronto', 'Vancouver']
                        }, {
                            label: 'USA',
                            children: ['New York', 'Los Angeles']
                        }, {
                            label: 'Mexico',
                            children: ['Mexico City', 'Guadalajara']
                        }
                    ]
                }
            ];
            console.log(this.treedataGeography);
            this.getMapTree();
            this.$scope.my_data = this.treedataAvm;
            this.tryAsyncLoad();
            $scope.my_tree = this.tree = {};
            $scope.output = "dsfsdfss";
            //this.getMapTree();
            console.log("constructor");
        }
        HomeCtrl.prototype.myTreeHandler = function (branch) {
            var ref;
            this.$scope.output = "You selected: " + branch.label;
            if (branch.label === "Dog")
                this.$scope.src = branch.data.src;
            if ((ref = branch.data) != null ? ref.description : void 0) {
                return this.$scope.output += '(' + branch.data.description + ')';
            }
            console.log("myhandler");
        };
        HomeCtrl.prototype.getMapTree = function () {
            var _this = this;
            console.log("getMapTree");
            this.mapResourceService.getMapTree()
                .$promise.then(function (mapTree) {
                _this.$scope.mapTree = mapTree;
                var array = [];
                array.push(angular.fromJson(angular.toJson(mapTree)));
                //this.$scope.my_data = array;
                _this.treedataAvm = array;
                //console.log("$scope.mapTree", mapTree);
                //console.log("treedataAvm", this.treedataAvm);
                //console.log(angular.toJson(mapTree));
                //console.log(angular.fromJson(angular.toJson(mapTree)));
                //var array = [];
                //array.push(angular.fromJson(angular.toJson(mapTree)));
                //this.$scope.my_data = array;
                //console.log("my_data", this.$scope.my_data);
                //this.$timeout(() => {
                //    this.$scope.my_data = array;
                //}, 1);
            });
        };
        //appleSelected(branch) {
        //    return this.$scope.output = "APPLE! : " + branch.label;
        //}
        HomeCtrl.prototype.tryChangingTheTreeData = function () {
            console.log("my_data", this.$scope.my_data);
            if (this.$scope.my_data === this.treedataAvm) {
                return this.$scope.my_data = this.treedataGeography;
            }
            else {
                return this.$scope.my_data = this.treedataAvm;
            }
        };
        HomeCtrl.prototype.tryAsyncLoad = function () {
            var _this = this;
            this.$scope.my_data = [];
            this.$scope.doing_async = true;
            return this.$timeout(function () {
                //if (Math.random() + 10 < 0.5) {
                //    this.$scope.my_data = this.treedataAvm;
                //} else {
                //    this.$scope.my_data = this.treedataGeography;
                //}
                _this.$scope.my_data = _this.treedataAvm;
                _this.$scope.doing_async = false;
                return _this.tree.expand_all();
            }, 1000);
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
/// <reference path="../_all_ts_ref.ts"/>

module App {
    'use strict';

    export class HomeCtrl {
        public static $inject = [
            '$scope',
            '$timeout'
        ];
        
        
        private treedataAvm;
        private treedataGeography;
        
        private tree;
        constructor(private $scope, private $timeout) {

            // 'vm' stands for 'view model'. We're adding a reference to the controller to the scope
            // for its methods to be accessible from view / HTML
            $scope.vm = this;
            $scope.appleSelected = (branch) => {
                return this.$scope.output = "APPLE! : " + branch.label;
            }
            //context menu
            $scope.otherMenuOptions = [
                ['Favorite Color', ($itemScope, $event, color) => {
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
                    onSelect: (branch) => {
                        return this.$scope.output = "Vegetable: " + branch.data.definition;
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
                }, {
                    label: 'South America',
                    children: [
                        {
                            label: 'Venezuela',
                            children: ['Caracas', 'Maracaibo']
                        }, {
                            label: 'Brazil',
                            children: ['Sao Paulo', 'Rio de Janeiro']
                        }, {
                            label: 'Argentina',
                            children: ['Buenos Aires', 'Cordoba']
                        }
                    ]
                }
            ];
            $scope.my_data = this.treedataAvm;
            $scope.my_tree = this.tree = {};
            $scope.output = "dsfsdfss";


            console.log("constructor");
        }

        myTreeHandler(branch) {
            console.log("myhandler");
            var ref;
            this.$scope.output = "You selected: " + branch.label;
            if (branch.label === "Dog")
                this.$scope.src = branch.data.src;
            if ((ref = branch.data) != null ? ref.description : void 0) {
                return this.$scope.output += '(' + branch.data.description + ')';
            }
        }

        //appleSelected(branch) {
        //    return this.$scope.output = "APPLE! : " + branch.label;
        //}

        //tryChangingTheTreeData() {
        //    if (this.$scope.my_data === this.treedataAvm) {
        //        return this.$scope.my_data = this.treedataGeography;
        //    } else {
        //        return this.$scope.my_data = this.treedataAvm;
        //    }
        //}

        //tryAsyncLoad() {
        //    this.$scope.my_data = [];
        //    this.$scope.doing_async = true;
        //    return this.$timeout(() => {
        //        if (Math.random() + 10 < 0.5) {
        //            this.$scope.my_data = this.treedataAvm;
        //        } else {
        //            this.$scope.my_data = this.treedataGeography;
        //        }
        //        this.$scope.doing_async = false;
        //        return this.tree.expand_all();
        //    }, 1000);
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
    }
}
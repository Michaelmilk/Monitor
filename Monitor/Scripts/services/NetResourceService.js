/// <reference path="../_all_ts_ref.ts"/>
/**
 * The net service module
 */
var App;
(function (App) {
    'use strict';
    var NetResourceService = (function () {
        function NetResourceService($resource) {
            this.$resource = $resource;
        }
        NetResourceService.prototype.getMapTreeResource = function () {
            var getMapTree = {
                method: 'GET',
                params: { action: "get-map-tree" },
                isArray: false
            };
            return this.$resource("/api/monitor/:action/:id/:label", {}, {
                getMapTree: getMapTree
            });
        };
        NetResourceService.$inject = [
            '$resource'
        ];
        return NetResourceService;
    }());
    App.NetResourceService = NetResourceService;
})(App || (App = {}));
//# sourceMappingURL=NetResourceService.js.map
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
        NetResourceService.prototype.getMapTreeNodeResource = function () {
            var getMapNode = {
                method: 'GET',
                params: { action: "get-map-node" },
                isArray: true
            };
            return this.$resource("/api/map/:id/:label", {}, {
                getMapNode: getMapNode
            });
        };
        NetResourceService.$inject = [
            '$resource'
        ];
        return NetResourceService;
    })();
    App.NetResourceService = NetResourceService;
})(App || (App = {}));
//# sourceMappingURL=NetResourceService.js.map
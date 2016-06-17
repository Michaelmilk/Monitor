/// <reference path="../_all_ts_ref.ts"/>

/**
 * The net service module
 */

module App {
    'use strict';
    export class NetResourceService {
        public static $inject = [
            '$resource'
        ];

        constructor(private $resource: ng.resource.IResourceService) { }

        getMapTreeResource(): IMapNodeResource {
            var getMapTree: ng.resource.IActionDescriptor = {
                method: 'GET',
                params: { action: "get-map-tree" },
                isArray: false
            };

            return <IMapNodeResource>this.$resource("/api/monitor/:action/:id/:label", {}, {
                getMapTree: getMapTree
            });
        }
    }
}
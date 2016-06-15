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

        getMapTreeNodeResource(): IMapNodeResource {
            var getMapNode: ng.resource.IActionDescriptor = {
                method: 'GET',
                params: { action: "get-map-node" },
                isArray: true
            };

            return <IMapNodeResource>this.$resource("/api/map/:id/:label", {}, {
                getMapNode: getMapNode
            });
        }
    }
}
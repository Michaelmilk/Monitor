/// <reference path="../_all_ts_ref.ts"/>

module App {
    export interface IPoint {
        X: number;
        Y: number;
    }

    export interface IMapNode {
        id?: number;
        name?: string;
        locationCoordinate: IPoint;
        iconUrl: string;
    };
}
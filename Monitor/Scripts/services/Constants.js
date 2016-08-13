///<reference path="../_all_ts_ref.ts"/>
var App;
(function (App) {
    'use strict';
    var Constants = (function () {
        function Constants() {
        }
        Object.defineProperty(Constants, "Default", {
            get: function () {
                return {
                    iconRadius: 10,
                    keyCodes: { 'Enter': 13, 'Delete': 46 }
                };
            },
            enumerable: true,
            configurable: true
        });
        return Constants;
    }());
    App.Constants = Constants;
})(App || (App = {}));

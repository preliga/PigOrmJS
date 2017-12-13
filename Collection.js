'use strict';
define(
    [
    ],
    function () {

        return class Collection {
            constructor(collection, dataTemplateName) {
                this.collection = collection;
                this.dataTemplateName = dataTemplateName;
            }

            // getArray(){
            //     return this.collection;
            // }
        };
    }
);
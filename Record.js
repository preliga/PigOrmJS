'use strict';
define(
    [
    ],
    function () {

        return class Record {
            constructor(record, dataTemplateName) {
                this.record = record;
                this.dataTemplateName = dataTemplateName;
            }

            getArray(){
                return this.record;
            }
        };
    }
);
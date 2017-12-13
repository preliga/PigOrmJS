'use strict';
define(
    [],
    function () {

        return class Collection {

            /*
            collection musi być tablicą rekordów
             */
            constructor(collection, dataTemplateName) {
                this.collection = collection;
                this.dataTemplateName = dataTemplateName;

                this.baseUrlOrm = "/orm/orm";

                this.init = {
                    method: 'GET',
                    headers: new Headers(),
                    mode: 'cors',
                    cache: 'default'
                };

                this.data = {
                    'dataTemplate': this.dataTemplateName,
                    'type': 'collection'
                }
            }

            validate(column) {
                this.data.method = 'validate';
                this.data.column = column;

                let url = this.baseUrlOrm + "?" + getQueryString(this.data);

                return fetch(url, this.init)
                    .then(response => response.text())
                    .then(jsonString => JSON.parse(jsonString))
                    .then(json => json.data.results)
            }

            save(notTables, onlyTables, reload) {
                this.data.method = 'save';
                this.data.notTables = JSON.stringify(notTables);
                this.data.onlyTables = JSON.stringify(onlyTables);
                this.data.reload = reload;

                let url = this.baseUrlOrm + "?" + getQueryString(this.data);

                return fetch(url, this.init)
                    .then(response => response.text())
                    .then(jsonString => JSON.parse(jsonString))
                    .then(json => json.data.results)
            }

            delete(notTables, onlyTables) {
                this.data.method = 'delete';
                this.data.notTables = JSON.stringify(notTables);
                this.data.onlyTables = JSON.stringify(onlyTables);

                let url = this.baseUrlOrm + "?" + getQueryString(this.data);

                return fetch(url, this.init)
                    .then(response => response.text())
                    .then(jsonString => JSON.parse(jsonString))
                    .then(json => json.data.results)
            }

            reload() {
                this.data.method = 'reload';
                this.data.data = JSON.stringify(this.collection);

                let url = this.baseUrlOrm + "?" + getQueryString(this.data);

                let $this = this;
                return fetch(url, this.init)
                    .then(response => response.text())
                    .then(jsonString => JSON.parse(jsonString))
                    .then(function(json){
                        $this.collection = json.data.results
                    })
            }
        };

        function getQueryString(params) {
            let esc = encodeURIComponent;
            return Object.keys(params)
                .map(k => esc(k) + '=' + esc(params[k]))
                .join('&');
        }
    }
);
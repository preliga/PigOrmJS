'use strict';
define(
    [
        './Record.js',
        './Collection.js'
    ],
    function (Record, Collection) {

        return class DataTemplate {
            constructor(dataTemplateName) {
                this.dataTemplateName = dataTemplateName;

                this.baseUrlOrm = "/orm/orm";

                this.init = {
                    method: 'GET',
                    headers: new Headers(),
                    mode: 'cors',
                    cache: 'default'
                };
            }

            find(where = null, order = null, group = null, variable = {}) {

                let data = {
                    'dataTemplate': this.dataTemplateName,
                    'method': 'find',
                    'where': JSON.stringify(where),
                    'order': JSON.stringify(order),
                    'group': JSON.stringify(group),
                    'variable': JSON.stringify(variable),
                };

                let url = this.baseUrlOrm + "?" + getQueryString(data);

                return fetch(url, this.init)
                    .then(response => response.text())
                    .then(jsonString => JSON.parse(jsonString))
                    .then(json => new Collection(json.data.results, this.dataTemplateName))
            }

            findOne(where = null, order = null, group = null, variable = {}) {

                let data = {
                    'dataTemplate': this.dataTemplateName,
                    'method': 'findOne',
                    'where': JSON.stringify(where),
                    'order': JSON.stringify(order),
                    'group': JSON.stringify(group),
                    'variable': JSON.stringify(variable),
                };

                let url = this.baseUrlOrm + "?" + getQueryString(data);

                return fetch(url, this.init)
                    .then(response => response.text())
                    .then(jsonString => JSON.parse(jsonString))
                    .then(json => new Record(json.data.results, this.dataTemplateName))
            }

            get(id, variable = {}) {
                let data = {
                    'dataTemplate': this.dataTemplateName,
                    'method': 'get',
                    'id': id,
                    'variable': JSON.stringify(variable),
                };

                let url = this.baseUrlOrm + "?" + getQueryString(data);

                return fetch(url, this.init)
                    .then(response => response.text())
                    .then(jsonString => JSON.parse(jsonString))
                    .then(json => new Record(json.data.results, this.dataTemplateName))
            }

            count(column, where = null, group = null, variable = {}) {
                return this._aggregateFunction('count', column, where, group, variable);
            }

            sum(column, where = null, group = null, variable = {}) {
                return this._aggregateFunction('sum', column, where, group, variable);
            }

            max(column, where = null, group = null, variable = {}) {
                return this._aggregateFunction('max', column, where, group, variable);
            }

            min(column, where = null, group = null, variable = {}) {
                return this._aggregateFunction('min', column, where, group, variable);
            }

            avg(column, where = null, group = null, variable = {}) {
                return this._aggregateFunction('avg', column, where, group, variable);
            }

            _aggregateFunction(typ, column, where = null, group = null, variable = {}) {
                let data = {
                    'dataTemplate': this.dataTemplateName,
                    'method': typ,
                    'column': column,
                    'where': JSON.stringify(where),
                    'group': JSON.stringify(group),
                    'variable': JSON.stringify(variable),
                };

                let url = this.baseUrlOrm + "?" + getQueryString(data);

                return fetch(url, this.init)
                    .then(response => response.text())
                    .then(jsonString => JSON.parse(jsonString))
                    .then(json => json.data.result[0])
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
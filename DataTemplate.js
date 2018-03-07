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

                this.data = {
                    'dataTemplate': this.dataTemplateName,
                    'type': 'dataTemplate'
                }
            }

            call(method, params) {

                this.data.method = method;
                this.data.params = JSON.stringify(params);
                let url = this.baseUrlOrm + "?" + getQueryString(this.data);

                return fetch(url, this.init)
                    .then(response => response.text())
                    .then(jsonString => JSON.parse(jsonString));
            }

            find(where = null, order = null, group = null, variable = {}) {

                this.data.method = 'find';
                this.data.where = JSON.stringify(where);
                this.data.order = JSON.stringify(order);
                this.data.group = JSON.stringify(group);
                this.data.variable = JSON.stringify(variable);

                let url = this.baseUrlOrm + "?" + getQueryString(this.data);

                return fetch(url, this.init)
                    .then(response => response.text())
                    .then(jsonString => JSON.parse(jsonString))
                    .then(json => new Collection(json.data.results, this.dataTemplateName))
            }

            findOne(where = null, order = null, group = null, variable = {}) {

                this.data.method = 'findOne';
                this.data.where = JSON.stringify(where);
                this.data.order = JSON.stringify(order);
                this.data.group = JSON.stringify(group);
                this.data.variable = JSON.stringify(variable);

                let url = this.baseUrlOrm + "?" + getQueryString(this.data);

                return fetch(url, this.init)
                    .then(response => response.text())
                    .then(jsonString => JSON.parse(jsonString))
                    .then(json => new Record(json.data.results, this.dataTemplateName))
            }

            get(id, variable = {}) {

                this.data.method = 'get';
                this.data.id = id;
                this.data.variable = JSON.stringify(variable);

                let url = this.baseUrlOrm + "?" + getQueryString(this.data);

                return fetch(url, this.init)
                    .then(response => response.text())
                    .then(jsonString => JSON.parse(jsonString))
                    .then(json => new Record(json.data.results, this.dataTemplateName))
            }

            exists(where = null, group = null, variable = null) {

                this.data.method = 'exists';
                this.data.where = JSON.stringify(where);
                this.data.group = JSON.stringify(group);
                this.data.variable = JSON.stringify(variable);

                let url = this.baseUrlOrm + "?" + getQueryString(this.data);

                return fetch(url, this.init)
                    .then(response => response.text())
                    .then(jsonString => JSON.parse(jsonString))
                    .then(json => json.data.results)
            }

            count(column, where = null, group = null, order = null, variable = {}) {
                return this._aggregateFunction('count', column, where, group, order, variable);
            }

            sum(column, where = null, group = null, order = null, variable = {}) {
                return this._aggregateFunction('sum', column, where, group, order, variable);
            }

            max(column, where = null, group = null, order = null, variable = {}) {
                return this._aggregateFunction('max', column, where, group, order, variable);
            }

            min(column, where = null, group = null, order = null, variable = {}) {
                return this._aggregateFunction('min', column, where, group, order, variable);
            }

            avg(column, where = null, group = null, order = null, variable = {}) {
                return this._aggregateFunction('avg', column, where, group, order, variable);
            }

            _aggregateFunction(method, column, where = null, group = null, order = null, variable = {}) {

                if (typeof column === "string") {
                    this.data.column = column;
                } else {
                    this.data.column = JSON.stringify(column);
                }

                this.data.method = method;
                this.data.where = JSON.stringify(where);
                this.data.group = JSON.stringify(group);
                this.data.order = JSON.stringify(order);
                this.data.variable = JSON.stringify(variable);

                let url = this.baseUrlOrm + "?" + getQueryString(this.data);

                return fetch(url, this.init)
                    .then(response => response.text())
                    .then(jsonString => JSON.parse(jsonString))
                    .then(json => json.data.results)
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
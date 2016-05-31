"use strict";

let mysql = require("mysql");
let Transaction = require("./libs/transaction.js");

class Client {
    constructor(options) {
        this._options = options;
        this._transaction = null;
    }

    query(sql, params) {
        let _this = this;
        return new Promise(function (resolve, reject) {
            let connection = mysql.createConnection(_this._options.mysql);
            connection.connect();
            connection.query(sql, params, function (error, rows, fields) {
                if (error) {
                    return reject(error);
                }

                return resolve(rows);
            });
            connection.end();
        });
    }

    startTransaction() {
        this._transaction = new Transaction(this._options.mysql);
        return this._transaction.start();
    }

    executeTransaction(sql, params) {
        return this._transaction.execute(sql, params);
    }

    stopTransaction() {
        return this._transaction.stop();
    }
}

module.exports = Client;
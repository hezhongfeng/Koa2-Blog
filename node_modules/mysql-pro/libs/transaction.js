"use strict";

let mysql = require("mysql");

class Transaction {
    constructor(config) {
        this._connection = mysql.createConnection(config);
    }

    start() {
        let _this = this;
        return new Promise(function (resolve, reject) {
            _this._connection.beginTransaction(function (error) {
                if (error) {
                    return reject(error);
                }

                return resolve();
            });
        });
    }

    execute(sql, params) {
        let _this = this;
        return new Promise(function (resolve, reject) {
            _this._connection.query(sql, params, function (error, rows, fields) {
                if (error) {
                    return _this._connection.rollback(function () {
                        reject(error);
                    });
                }

                return resolve(rows);
            });
        });
    }

    stop() {
        let _this = this;
        return new Promise(function (resolve, reject) {
            _this._connection.commit(function (error) {
                if (error) {
                    return _this._connection.rollback(function () {
                        reject(error);
                    });
                }

                return resolve();
            });
        });
    }
}

module.exports = Transaction;

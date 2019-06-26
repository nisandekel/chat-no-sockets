const mysql = require('mysql2/promise');
const bluebird = require("bluebird");


class Database {

    constructor() {
        this.connection = null;
    }

    async initDB() {

        this.connection = await mysql.createConnection({
            host: 'remotemysql.com',
            user: 'claa2KHhlq',
            password: 'eqvF2J55Hi',
            database: 'claa2KHhlq',
            Promise: bluebird
        });
    }

    async getAll(tableName) {
        const [rows] = await this.connection.execute("select * from " + tableName);
        return rows;
    }

    async insertOne(item, tableName) {
        const itemKeys = Object.keys(item);
        let itemfields = "(";
        let itemValues = [];
        for (let i = 0; i < itemKeys.length; i++) {
            if (i === itemKeys.length - 1) {
                itemfields += itemKeys[i] + ")";
            }
            else {
                itemfields += itemKeys[i] + ", ";
            }
            itemValues.push(item[itemKeys[i]]);
        }

        const sql = "INSERT INTO " + tableName + " " + itemfields + " " + "VALUES ?";
        try {
            const [ResultSetHeader] = await this.connection.query(sql, [[itemValues]]);
            return ResultSetHeader;
        } catch (err) {
            if(err.code==="ER_DUP_ENTRY"){
                return {duplicateUniqeField:"duplicate uniqe field"}
            }
        }
    }

    async getNewInstances(lastInstanceID, tableName) {
        const lastInstanceDatetimeSql = "select dateTime from " + tableName + " where id = ?";
        const [rows] = await this.connection.query(lastInstanceDatetimeSql, lastInstanceID);
        const lastInstanceDateTime = rows.pop().dateTime;
        const newInsancesSql = "select * from " + tableName + " where dateTime > ?";
        const [TextRow] = await this.connection.query(newInsancesSql, lastInstanceDateTime);
        return TextRow;
    }

    async getLastInstancesByLimit(tableName, limit) {
        const sql = "select * from " + tableName + " order by dateTime desc limit " + limit;
        const [rows] = await this.connection.query(sql);
        return rows.reverse();
    }

    async getColumnValue(columnName,tableName,item){
        const field = Object.keys(item).pop();
        const value = item[field];
        const sql = "select " +columnName +" from " + tableName + " where " + field +" = ?";
        const [rows] = await this.connection.query(sql,value);
        return rows;
    }
}

module.exports = Database;

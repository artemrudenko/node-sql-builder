"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DBConfigInfoBuilder = void 0;
class DBConfigInfoBuilder {
    constructor() {
        this.server = process.env.DB_SERVER_NAME || '';
        this.database = process.env.DB_DATABASE_NAME || '';
        this.ntlm = true;
        this.requestTimeout = 60000;
    }
    withServer(value) {
        this.server = value;
        return this;
    }
    withDatabase(value) {
        this.database = value;
        return this;
    }
    withPort(value) {
        this.port = value;
        return this;
    }
    withTimeout(value) {
        this.requestTimeout = value;
        return this;
    }
    withQuery(value) {
        this.query = value;
        return this;
    }
    withNtlmAuth(value) {
        this.ntlm = value;
        if (value === true) {
            this.username = undefined;
            this.password = undefined;
        }
        return this;
    }
    withUsername(value) {
        this.username = value;
        return this;
    }
    withPassword(value) {
        this.password = value;
        return this;
    }
    build() {
        return {
            server: this.server,
            database: this.database,
            port: this.port,
            query: this.query,
            username: this.username,
            password: this.password,
            ntlm: this.ntlm,
            requestTimeout: this.requestTimeout
        };
    }
}
exports.DBConfigInfoBuilder = DBConfigInfoBuilder;

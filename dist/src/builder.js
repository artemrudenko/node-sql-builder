"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DBRequestBuilder = void 0;
class DBRequestBuilder {
    constructor() {
        this.server = process.env.DBSERVERNAME || 'PERCIVAL';
        this.database = process.env.DATABASE || 'Coeus_Dev';
        this.ntlm = true;
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
    withQuery(value) {
        this.query = value;
        return this;
    }
    withNtlmAuth(value) {
        this.ntlm = value;
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
            ntlm: this.ntlm
        };
    }
}
exports.DBRequestBuilder = DBRequestBuilder;

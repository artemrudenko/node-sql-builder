import { IDBConfigInfo } from "./model";
export declare class DBConfigInfoBuilder {
    server: string;
    database: string;
    port: number | undefined;
    query: string | undefined;
    username: string | undefined;
    password: string | undefined;
    ntlm: boolean;
    requestTimeout: number;
    withServer(value: string): this;
    withDatabase(value: string): this;
    withPort(value: number): this;
    withTimeout(value: number): this;
    withQuery(value: string): this;
    withNtlmAuth(value: boolean): this;
    withUsername(value: string): this;
    withPassword(value: string): this;
    build(): IDBConfigInfo;
}

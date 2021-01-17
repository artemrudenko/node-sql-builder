export interface IDBConfigInfo {
    server: string;
    database: string;
    port?: number;
    query?: string;
    username?: string;
    password?: string;
    ntlm?: boolean;
    requestTimeout?: number;
}
export declare enum QueryType {
    Query = 0,
    Procedure = 1
}

import * as sql from 'mssql/msnodesqlv8';
import { IDBConfigInfo } from "./model";
export declare class DBRequest {
    private config;
    pool: sql.ConnectionPool;
    _config: sql.config | undefined;
    get connectionConfig(): sql.config | undefined;
    constructor(config: IDBConfigInfo);
    execute(query?: string): Promise<any>;
    executeProc(query?: string): Promise<any>;
    close(): Promise<void>;
    private executeQuery;
}

import * as sql from 'mssql/msnodesqlv8';
import { IDBConfigInfo } from "./model";
export declare class DBRequest {
    private config;
    pool: sql.ConnectionPool;
    constructor(config: IDBConfigInfo);
    execute(): Promise<sql.IRecordSet<any>>;
    executeProc(): Promise<sql.IProcedureResult<any>>;
    close(): Promise<void>;
}

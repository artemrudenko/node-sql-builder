import * as sql from 'mssql/msnodesqlv8';

import { IDBConfigInfo } from "./model";

export class DBRequest {
  pool: sql.ConnectionPool;

  constructor(private config: IDBConfigInfo) {
    const connectionConfig: sql.config = {
      server: this.config.server,
      driver: 'msnodesqlv8',
      database: this.config.database
    }
    if (!!this.config.port) {
      connectionConfig.port = this.config.port;
    }
    if (this.config.ntlm) {
      connectionConfig.options = connectionConfig.options
        ? { ...connectionConfig.options, trustedConnection: true }
        : { trustedConnection: true };
    } else {
      connectionConfig.user = this.config.username;
      connectionConfig.password = this.config.password;
    }
    connectionConfig.requestTimeout = 60000;

    this.pool = new sql.ConnectionPool(connectionConfig);
  }

  public async execute() {
    if (this.config.query === undefined) {
      throw new Error(`Can't execute query if it wasn't specified!`);
    }
    if (!this.pool.connected) {
      await this.pool.connect();
    }
    try {
      const result = await this.pool.request().query(this.config.query);
      return result.recordset;
    } finally {
      await this.pool.close();
    }
  }

  public async executeProc() {
    if (this.config.query === undefined) {
      throw new Error(`Can't execute query if it wasn't specified!`);
    }
    if (!this.pool.connected) {
      await this.pool.connect();
    }
    try {
      const result = await this.pool.request().execute(this.config.query);
      return result;
    } finally {
      await this.pool.close();
    }
  }

  public async close() {
    if (this.pool.connected) {
      return this.pool.close();
    }
  }
}
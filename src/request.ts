import * as sql from 'mssql/msnodesqlv8';

import { IDBConfigInfo, QueryType } from "./model";

export class DBRequest {
  pool: sql.ConnectionPool;
  _config: sql.config | undefined;

  get connectionConfig() {
    return this._config
  }

  constructor(private config: IDBConfigInfo) {
    this._config = {
      server: this.config.server,
      driver: 'msnodesqlv8',
      database: this.config.database
    }
    if (!!this.config.port) {
      this._config.port = this.config.port;
    }
    if (this.config.ntlm) {
      this._config.options = this._config.options
        ? { ...this._config.options, trustedConnection: true }
        : { trustedConnection: true };
    } else {
      this._config.user = this.config.username;
      this._config.password = this.config.password;
    }
    this._config.requestTimeout = this.config.requestTimeout;

    this.pool = new sql.ConnectionPool(this._config);
  }

  public async execute(query?: string) {
    query = !!query ? query : this.config.query;
    if (query === undefined) {
      throw new Error(`Can't execute query if it wasn't specified!`);
    }
    return this.executeQuery(query, QueryType.Query);
  }

  public async executeProc(query?: string) {
    query = !!query ? query : this.config.query;
    if (query === undefined) {
      throw new Error(`Can't execute query if it wasn't specified!`);
    }
    return this.executeQuery(query, QueryType.Procedure);
  }

  public async close() {
    if (this.pool.connected) {
      return this.pool.close();
    }
  }


  private async executeQuery(query: string, queryType: QueryType) {
    if (!this.pool.connected) {
      await this.pool.connect();
    }
    try {
      let result: any;
      switch (queryType) {
        case QueryType.Procedure:
          result = await this.pool.request().execute(query);
          break;
        case QueryType.Query:
        default:
          result = await this.pool.request().query(query);
          return result;
      }
    } finally {
      await this.pool.close();
    }
  }
}
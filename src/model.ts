export interface IDBConfigInfo {
  server: string;
  database: string;
  port?: number;
  query?: string;
  username?: string;
  password?: string;
  ntlm?: boolean;
  requestTimeout?: number;
};

export enum QueryType {
  Query,
  Procedure
}
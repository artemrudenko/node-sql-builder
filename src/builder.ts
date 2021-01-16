import { IDBConfigInfo } from "./model";

export class DBRequestBuilder {
  public server: string = process.env.DBSERVERNAME || '';
  public database: string = process.env.DATABASE || '';
  public port: number | undefined;
  public query: string | undefined;
  public username: string | undefined;
  public password: string | undefined;
  public ntlm: boolean = true;

  public withServer(value: string) {
    this.server = value;
    return this;
  }

  public withDatabase(value: string) {
    this.database = value;
    return this;
  }

  public withPort(value: number) {
    this.port = value;
    return this;
  }

  public withQuery(value: string) {
    this.query = value;
    return this;
  }

  public withNtlmAuth(value: boolean) {
    this.ntlm = value;
    return this;
  }

  public withUsername(value: string) {
    this.username = value;
    return this;
  }

  public withPassword(value: string) {
    this.password = value;
    return this;
  }

  public build(): IDBConfigInfo {
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

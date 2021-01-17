
import * as dotenv from 'dotenv';

import { DBConfigInfoBuilder } from "./config.builder";

describe('DBConfigInfoBuilder::', () => {
  const port = 8888;
  const query = 'SELECT * FROM TABLE_A';

  beforeAll(() => dotenv.config());

  test(`should allow to create db config info`, () => {
    const server = 'MOCK_DB_Server';
    const name = 'MOCK_DB_NAME';
    const ntlm = true;
    // Act
    const info = new DBConfigInfoBuilder()
      .withServer(server)
      .withDatabase(name)
      .withPort(port)
      .withQuery(query)
      .withNtlmAuth(ntlm)
      .build();
    // Verify
    expect(info)
      .toMatchObject({
        server: server,
        database: name,
        port: port,
        query: query,
        username: undefined,
        password: undefined,
        ntlm: ntlm
      });
  });

  test(`should init info with env variables if present`, () => {
    // Act
    const info = new DBConfigInfoBuilder()
      .withPort(port)
      .withQuery(query)
      .build();
    // Verify
    expect(info)
      .toMatchObject({
        server: process.env.DB_SERVER_NAME,
        database: process.env.DB_DATABASE_NAME,
        port: port,
        query: query,
        username: undefined,
        password: undefined,
        ntlm: true
      });
  });
});
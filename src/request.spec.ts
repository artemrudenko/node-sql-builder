import { DBConfigInfoBuilder } from "./config.builder";
import { DBRequest } from "./request";

describe('DBRequest::', () => {
  test(`should allow to create instance`, () => {
    const dbRequest = new DBRequest({ server: 'Mock_Server', database: 'Mock_Database' });
    expect(dbRequest)
      .toBeDefined();
  });

  test(`should properly init connection info`, () => {
    const config = new DBConfigInfoBuilder()
      .withServer('Mock_Server')
      .withDatabase('Mock_Database')
      .build();
    const dbRequest = new DBRequest(config);
    expect(dbRequest.connectionConfig)
      .toMatchObject({
        "database": "Mock_Database",
        "server": "Mock_Server",
        "driver": "msnodesqlv8",
        "options": {
          "trustedConnection": true
        }
      });
  })

  test(`should init connection pool`, () => {
    const dbRequest = new DBRequest({ server: 'Mock_Server', database: 'Mock_Database' });
    expect(dbRequest.pool)
      .toBeDefined();
  })
});
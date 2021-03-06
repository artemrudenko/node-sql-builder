# node-sql-builder

This package is build on top of [mssql](https://www.npmjs.com/package/mssql) and is using [msnodesqlv8](https://www.npmjs.com/package/msnodesqlv8) driver.
The main purpose is to simplify configuration for some base cases with NTLM auth and env variables usage.

## Example
```ts
const table = `MOCK_Table`;

const options = new DBConfigInfoBuilder()
  .withServer(process.env.DB_SERVER_NAME)
  .withDatabase(process.env.DB_DATABASE_NAME)
  .withPort(process.env.DB_DATABASE_PORT)
  .withQuery(`SELECT * FROM ${table} WHERE id > 10`)
  .withUsername(process.env.DB_DATABASE_USERNAME)
  .withPassword(process.env.DB_DATABASE_USERPWD)
  .build();
const results = await new DBRequest(options)
  .execute();
```

Or using default setting and env variables:
```ts
const table = `MOCK_Table`;
const results = await new DBRequest(new DBRequestBuilder().build())
  .execute(`SELECT * FROM ${table} WHERE id > 10`);
```
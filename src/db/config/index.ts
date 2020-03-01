interface IDBConfig {
  [key: string]: {
    uri: string;
    dialect: "postgres";
    protocol: "postgres";
    dialectOptions?: {
      ssl: true;
    };
  };
}

export default {
  development: {
    uri: "postgres://shaneboyar:@127.0.0.1:5432/database_development",
    dialect: "postgres",
    protocol: "postgres"
  },
  test: {
    uri: "postgres://shaneboyar:@127.0.0.1:5432/database_test",
    dialect: "postgres",
    protocol: "postgres"
  },
  production: {
    uri: process.env.DATABASE_URL,
    dialect: "postgres",
    protocol: "postgres",
    dialectOptions: {
      ssl: true
    }
  }
} as IDBConfig;

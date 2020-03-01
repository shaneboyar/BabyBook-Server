interface IDBConfig {
  [key: string]: {
    username: string;
    password: null;
    database: "database_development" | "database_test" | "database_production";
    host: "127.0.0.1";
    dialect: "postgres";
  };
}

export default {
  development: {
    username: "shaneboyar",
    password: null,
    database: "database_development",
    host: "127.0.0.1",
    dialect: "postgres"
  },
  test: {
    username: "shaneboyar",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "postgres"
  },
  production: {
    username: "root",
    password: null,
    database: "database_production",
    host: "127.0.0.1",
    dialect: "postgres"
  }
} as IDBConfig;
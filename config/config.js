require('dotenv').config()
module.exports = {
  development: {
    database: "cocktail_social_development",
    dialect: "postgres"
  },
  test: {
    database: "database_test",
    dialect: "postgres"
  },
  production: {
    use_env_variable: "DATABASE_URL",
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false,
        require: true
      }
    }
  }
}

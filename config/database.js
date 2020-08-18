const { Sequelize } = require("sequelize");
const sequelize = new Sequelize(process.env.DB_CONNECT);

async function testDB() {
  try {
    await sequelize.authenticate();
    console.log("database: connected");
  } catch (error) {
    console.error("database: connection error: ", error);
  }
}

testDB();

module.exports = sequelize;

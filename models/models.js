const db = require("../config/database");
const sequelize = require("../config/database");

const Message = db.define("message", {
  body: {
    type: db.Sequelize.STRING,
  },
});

const Room = db.define("room", {
  name: {
    type: db.Sequelize.STRING,
  },
});

const User = db.define("user", {
  name: {
    type: db.Sequelize.STRING,
  },
  password: {
    type: db.Sequelize.STRING,
  },
});

User.hasMany(Message, { foreignKey: "userId" });
Message.belongsTo(User);
Room.hasMany(Message, { foreignKey: "roomId" });
Message.belongsTo(Room);

createTables = async () => {
  await sequelize.sync();
};

createTables();

module.exports = { Room, Message, User };

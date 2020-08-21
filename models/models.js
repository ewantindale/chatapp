const db = require("../config/database");
const sequelize = require("../config/database");

const Message = db.define("message", {
  body: {
    type: db.Sequelize.STRING,
    allowNull: false,
  },
});

const Room = db.define("room", {
  name: {
    type: db.Sequelize.STRING,
    allowNull: false,
  },
});

const User = db.define("user", {
  name: {
    type: db.Sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: db.Sequelize.STRING,
    allowNull: false,
  },
});

User.hasMany(Message, { foreignKey: "userId", allowNull: false });
Message.belongsTo(User);

Room.hasMany(Message, { foreignKey: "roomId", allowNull: false });
Message.belongsTo(Room);

User.hasMany(Room, { foreignKey: "userId", allowNull: false });
Room.belongsTo(User);

createTables = async () => {
  await sequelize.sync();
};

createTables();

module.exports = { Room, Message, User };

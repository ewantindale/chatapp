const express = require("express");
const router = express.Router();
const { Room, Message, User } = require("../../models/models");

// POST /api/rooms
router.post("/", async (req, res) => {
  const { name } = req.body;
  const room = await Room.create({ name });
  res.status(201).json(room);
});

// DELETE /api/rooms/:id
router.delete("/:id", async (req, res) => {
  const deleted = await Room.destroy({ where: { id: req.params.id } });
  res.status(201).json({ msg: "Room deleted" });
});

// GET /api/rooms
router.get("/", async (req, res) => {
  const rooms = await Room.findAll();
  return res.status(200).json(rooms);
});

// GET /api/rooms/:id/messages
// Return all messages belonging to the specified room
router.get("/:id/messages", async (req, res) => {
  const messages = await Message.findAll({
    where: { roomId: req.params.id },
    include: [User],
  });
  return res.status(200).json(messages);
});

// POST /api/rooms/:id/messages
// Add a new message in the specified room
router.post("/:id/messages", async (req, res) => {
  const { body, userId, roomId } = req.body;

  const messageInfo = {
    body,
    userId,
    roomId,
  };

  const message = await Message.create(messageInfo);

  const messageInDatabase = await Message.findByPk(message.id, {
    include: [{ model: User, attributes: { exclude: ["password"] } }],
  });

  return res.status(201).json(messageInDatabase);
});

async function roomExists(name) {
  try {
    const user = await Room.findOne({ where: { name: name } });
    if (user) return true;
  } catch (e) {
    return false;
  }
}

module.exports = router;

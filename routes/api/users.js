const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../../models/User");

// POST /api/users
// Register
router.post("/", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ msg: "Missing one or more fields" });
  }

  if (await userExists(username)) {
    return res.status(400).json({ msg: "User already exists" });
  }

  const userInfo = { username, password };

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(userInfo.password, salt);

  userInfo.password = hash;

  const user = await User.create(userInfo);

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: 3600,
  });

  return res
    .status(201)
    .json({ token, user: { id: user.id, username: user.username } });
});

async function userExists(username) {
  try {
    const user = await User.findOne({ where: { username: username } });
    if (user) return true;
  } catch (e) {
    return false;
  }
}

module.exports = router;

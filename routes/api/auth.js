const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../../models/User");

// POST /api/auth
// Authenticate (login) a user
router.post("/", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ msg: "Missing one or more fields" });
  }

  try {
    const user = await User.findOne({ where: { username: username } });

    const passwordsMatch = await bcrypt.compare(password, user.password);

    if (!passwordsMatch) {
      throw new Error();
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: 3600,
    });

    return res
      .status(200)
      .json({ token, user: { id: user.id, username: user.username } });
  } catch (error) {
    return res.status(400).json({ msg: "Invalid credentials" });
  }
});

module.exports = router;

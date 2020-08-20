const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { User } = require("../../models/models");

// POST /api/auth
// Authenticate (login) a user
router.post("/", async (req, res) => {
  const { name, password } = req.body;

  if (!name || !password) {
    return res.status(400).json({ msg: "Missing one or more fields" });
  }

  try {
    const user = await User.findOne({ where: { name: name } });

    const passwordsMatch = await bcrypt.compare(password, user.password);

    if (!passwordsMatch) {
      throw new Error();
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: 3600,
    });

    return res
      .status(200)
      .json({ token, user: { id: user.id, name: user.name } });
  } catch (error) {
    return res.status(400).json({ msg: "Invalid credentials" });
  }
});

module.exports = router;

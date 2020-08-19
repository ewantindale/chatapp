const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const token = req.header("x-auth-token");

  if (!token) return res.status(401).json({ msg: "Missing token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (e) {
    res.status(400).json({ msg: "Invalid token" });
  }
}

module.exports = auth;

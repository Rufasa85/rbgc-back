const jwt = require("jsonwebtoken");

const tokenAuth = (req, res, next) => {
  try {
    const token = req.headers?.authorization?.split(" ")[1];
    if (!token) {
      throw new Error("no token provided");
    }
    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    req.user = id;
    next();
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "auth failed", err });
  }
};
module.exports = tokenAuth;

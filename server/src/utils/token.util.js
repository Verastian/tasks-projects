const jwt = require("jsonwebtoken");
const config = require("../config/env");
module.exports = {
  createToken: (payload, expires) => {
    const token = jwt.sign(payload, config.JWT_SECRET, {
      expiresIn: expires,
    });
    return token;
  },

  generateId: () => {
    const id = Math.random().toString(32).substring(2);
    const dateId = Date.now().toString(32);
    return id + dateId
  },

  decodeToken: (token) => {
    const decode = jwt.verify(token, config.JWT_SECRET);
    return decode
  },
};

const jwt = require("jsonwebtoken");
const CONFIG = require("../config");

function generate(payload) {
  const token = jwt.sign(payload, CONFIG.SECRET_KEY, {
    expiresIn: CONFIG.ACCESS_TOKEN_EXPIRES_IN
  });
  return token;
}

function validate(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, CONFIG.SECRET_KEY, function(err, decoded) {
      if (err) reject({ message: "unauthorize" });
      resolve(decoded);
    });
  });
}

module.exports = {
  generate,
  validate
};

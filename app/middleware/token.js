const jwt = require("jsonwebtoken");
const CONFIG = require("../config");

async function parse(req, res, next) {
  try {
    const authorization = req.get("Authorization"); 
    if (authorization) {
      const token = authorization.split(" ")[1];
      if (token) {
        const { username, user_id, role } = await jwt.verify(token, CONFIG.SECRET_KEY);
        req.auth = { username, user_id, role };
      }
    }
    
    next();
  } catch (error) {
    console.error("Error while call parse token()", error);
    next()
  }
}

function validate(req, res, next) {
  try {
    const authorization = req.get("Authorization"); 
    if (!authorization) throw Error("invalid token");
    const token = authorization.split(" ")[1];
    if (!token) {
      throw Error("invalid token");
    }

    const { username, user_id, role } = jwt.verify(token, CONFIG.SECRET_KEY);

    req.auth = { username, user_id, role };
    next();
  } catch (error) {
    console.error("Error while call validate token()", error);
    res
      .status(401)
      .json({ statusCode: 401, message: error.message, url: req.originalUrl });
  }
}

module.exports = {
  parse,
  validate,
};

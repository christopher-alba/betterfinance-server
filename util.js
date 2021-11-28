const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { User } = require("./mongodb/models");

const encryptPassword = (password) =>
  new Promise((resolve, reject) => {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        reject(err);
        return false;
      }
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) {
          reject(err);
          return false;
        }
        resolve(hash);
        return true;
      });
    });
  });

const comparePassword = (password, hash) =>
  new Promise(async (resolve, reject) => {
    try {
      const isMatch = await bcrypt.compare(password, hash);
      resolve(isMatch);
      return true;
    } catch (err) {
      reject(err);
      return false;
    }
  });

const getToken = (payload) => {
  const token = jwt.sign(payload, "secretString", {
    expiresIn: 604800, // 1 Week
  });
  return token;
};

const getPayload = async (token) => {
  try {
    const user = await User.findOne({
      token,
    });
    if (user) {
      const payload = jwt.verify(token, "secretString");
      return { loggedIn: true, payload };
    } else {
      return { loggedIn: false };
    }
  } catch (err) {
    return { loggedIn: false };
  }
};

module.exports = {
  getToken,
  getPayload,
  encryptPassword,
  comparePassword,
};

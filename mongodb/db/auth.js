const { User } = require("../models");
const { createProfile } = require("../db/profile");
const { getToken, encryptPassword, comparePassword } = require("../../util");

const register = async (args) => {
  if (args.username === "" || args.password === "") {
    throw new Error("Invalid Username or Password");
  }
  const newUser = {
    username: args.username,
    password: await encryptPassword(args.password),
    permission: args.permission,
    token: undefined,
  };
  // Check conditions
  const user = await User.findOne({ username: args.username });
  if (user) {
    throw new Error("User Already Exists!");
  }
  try {
    const user = new User({ ...newUser });
    const res = await user.save();
    const token = getToken({ username: res.username });
    const newProfile = {
      email: args.email,
      userID: res._id,
    };
    await createProfile(newProfile);
    await User.updateOne(
      { _id: res._id },
      {
        token: token,
      }
    );
    return { ...res.toObject(), token };
  } catch (e) {
    console.log(e);
    throw e;
  }
};
const login = async (args) => {
  try {
    const user = await User.findOne({ username: args.username });
    if (!user) {
      throw new Error("User does not exist");
    }
    const isMatch = await comparePassword(args.password, user.password);
    if (isMatch) {
      const token = getToken({ username: user.username });
      await User.updateOne(
        { _id: user._id },
        {
          token: token,
        }
      );
      return { ...user.toObject(), token };
    } else {
      throw new Error("Wrong Password!");
    }
  } catch (e) {
    console.log(e);
    throw e;
  }
};

module.exports = {
  register,
  login,
};

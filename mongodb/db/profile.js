const { Profile } = require("../models");

const createProfile = async (profileObj) => {
  try {
    const res = await Profile.create(profileObj);
    return res;
  } catch (err) {
    return new Error(err.message);
  }
};

const updateProfile = async (profileObj, profileID) => {
  try {
    await Profile.updateOne({ _id: profileID }, profileObj);
    const res = await Profile.findOne({ _id: profileID });
    return res;
  } catch (err) {
    return new Error(err.message);
  }
};

const getProfile = async ({ userID }) => {
  try {
    const res = await Profile.findOne({ userID: userID });
    return res;
  } catch (err) {
    return new Error(err.message);
  }
};

module.exports = {
  createProfile,
  updateProfile,
  getProfile,
};

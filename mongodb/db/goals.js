const { Goal } = require("../models");

const createGoal = async (goalObj) => {
  try {
    if (
      new Date(goalObj.goal.completionDate) <
      new Date(Date.now() + 1000 * 60 * 60 * 24 * 2)
    ) {
      throw new Error(
        "target completion date is invalid - set to the past, not future"
      );
    }
    const res = await Goal.create(goalObj.goal);
    return res;
  } catch (err) {
    return new Error(err.message);
  }
};

const updateGoal = async (goalObj, goalID) => {
  try {
    if (
      new Date(goalObj.goal.completionDate) <
      new Date(Date.now() + 1000 * 60 * 60 * 24 * 2)
    ) {
      throw new Error(
        "target completion date is invalid - set to the past, not future"
      );
    }
    await Goal.updateOne({ _id: goalID }, goalObj);
    const res = await Goal.findOne({ _id: goalID });
    return res;
  } catch (err) {
    return new Error(err.message);
  }
};

const deleteGoal = async (goalID) => {
  try {
    const res = await Goal.deleteOne({ _id: goalID });
    return res.deletedCount;
  } catch (err) {
    return new Error(err.message);
  }
};

const deleteAllUserGoals = async (profileID) => {
  try {
    const res = await Goal.deleteMany({ profileID: profileID });
    return res.deletedCount;
  } catch (err) {
    return new Error(err.message);
  }
};

const getAllUserGoals = async (profileID) => {
  try {
    const res = await Goal.find({ profileID: profileID });
    return res;
  } catch (err) {
    return new Error(err.message);
  }
};

module.exports = {
  createGoal,
  updateGoal,
  deleteGoal,
  deleteAllUserGoals,
  getAllUserGoals,
};

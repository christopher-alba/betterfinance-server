const { Goal } = require("../models");

const createGoal = async (goalObj) => {
    try {
      const res = await Goal.create(goalObj.goal);
      return res;
    } catch (err) {
      return new Error(err.message);
    }
  };
  
  const updateGoal = async (goalObj, goalID) => {
    try {
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
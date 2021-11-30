const { Income } = require("../models");

const createIncome = async (incomeObj) => {
  try {
    const res = await Income.create(incomeObj.income);
    return res;
  } catch (err) {
    return new Error(err.message);
  }
};

const updateIncome = async (incomeObj, incomeID) => {
  try {
    await Income.updateOne({ _id: incomeID }, incomeObj);
    const res = await Income.findOne({ _id: incomeID });
    return res;
  } catch (err) {
    return new Error(err.message);
  }
};

const deleteIncome = async (incomeID) => {
  try {
    const res = await Income.deleteOne({ _id: incomeID });
    return res.deletedCount;
  } catch (err) {
    return new Error(err.message);
  }
};

const deleteAllUserIncomes = async (profileID) => {
  try {
    const res = await Income.deleteMany({ profileID: profileID });
    return res.deletedCount;
  } catch (err) {
    return new Error(err.message);
  }
};

const getAllUserIncomes = async (profileID) => {
  try {
    const res = await Income.find({ profileID: profileID });
    return res;
  } catch (err) {
    return new Error(err.message);
  }
};

module.exports = {
  createIncome,
  updateIncome,
  deleteIncome,
  deleteAllUserIncomes,
  getAllUserIncomes,
};

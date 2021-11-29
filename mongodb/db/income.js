const { Income } = require("../models");

const createIncome = async (incomeObj) => {
  try {
    const res = await Income.create(incomeObj);
    return res;
  } catch (err) {
    return new Error(err.message);
  }
};

const updateIncome = async (incomeObj, incomeID) => {
  try {
    const res = await Income.updateOne({ _id: incomeID }, incomeObj);
    return res;
  } catch (err) {
    return new Error(err.message);
  }
};

const deleteIncome = async (incomeID) => {
  try {
    const res = await Income.deleteOne({ _id: incomeID });
    return res;
  } catch (err) {
    return new Error(err.message);
  }
};

const deleteAllUserIncomes = async (profileID) => {
  try {
    const res = await Income.deleteMany({ profileID: profileID });
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
};

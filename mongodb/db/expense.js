const { Expense } = require("../models");

const createExpense = async (expenseObj) => {
  try {
    const res = await Expense.create(expenseObj.expense);
    return res;
  } catch (err) {
    return new Error(err.message);
  }
};

const updateExpense = async (expenseObj, expenseID) => {
  try {
    await Expense.updateOne({ _id: expenseID }, expenseObj);
    const res = await Expense.findOne({ _id: expenseID });
    return res;
  } catch (err) {
    return new Error(err.message);
  }
};

const deleteExpense = async (expenseID) => {
  try {
    const res = await Expense.deleteOne({ _id: expenseID });
    return res.deletedCount;
  } catch (err) {
    return new Error(err.message);
  }
};

const deleteAllUserExpenses = async (profileID) => {
  try {
    const res = await Expense.deleteMany({ profileID: profileID });
    return res.deletedCount;
  } catch (err) {
    return new Error(err.message);
  }
};

const getAllUserExpenses = async (profileID) => {
  try {
    const res = await Expense.find({ profileID: profileID });
    return res;
  } catch (err) {
    return new Error(err.message);
  }
};

module.exports = {
  createExpense,
  updateExpense,
  deleteExpense,
  deleteAllUserExpenses,
  getAllUserExpenses,
};

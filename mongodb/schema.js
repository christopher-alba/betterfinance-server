const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  token: String,
});

const profileSchema = new mongoose.Schema({
  email: String,
  userID: String,
});

const incomeSchema = new mongoose.Schema({
  name: String,
  amount: Number,
  frequency: {
    type: String,
    enum: ["Daily", "Weekly", "Monthly", "Yearly"],
  },
  active: Boolean,
  profileID: String,
});

const expensesSchema = new mongoose.Schema({
  name: String,
  amount: Number,
  frequency: {
    type: String,
    enum: ["Daily", "Weekly", "Monthly", "Yearly"],
  },
  active: Boolean,
  profileID: String,
});

const goalsSchema = new mongoose.Schema({
  name: String,
  targetAmount: Number,
  currentAmount: Number,
  completionDate: Date,
  contributionAmount: Number,
  contributionFrequency: {
    type: String,
    enum: ["Daily", "Weekly", "Monthly", "Yearly"],
  },
  active: Boolean,
  profileID: String,
});

module.exports = {
  userSchema,
  profileSchema,
  incomeSchema,
  expensesSchema,
  goalsSchema,
};

const mongoose = require("mongoose");
const {
  userSchema,
  profileSchema,
  incomeSchema,
  expensesSchema,
  goalsSchema,
} = require("./schema");

const User = mongoose.model("User", userSchema);
const Profile = mongoose.model("Profile", profileSchema);
const Income = mongoose.model("Income", incomeSchema);
const Expense = mongoose.model("Expense", expensesSchema);
const Goal = mongoose.model("Goal", goalsSchema);

module.exports = {
  User,
  Profile,
  Income,
  Expense,
  Goal,
};

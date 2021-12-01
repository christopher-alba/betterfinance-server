const { register, login } = require("../mongodb/db/auth");
const {
  getProfile,
  updateProfile,
} = require("../mongodb/db/profile");
const {
  createIncome,
  updateIncome,
  deleteIncome,
  deleteAllUserIncomes,
  getAllUserIncomes,
} = require("../mongodb/db/income");
const {
  getAllUserExpenses,
  deleteAllUserExpenses,
  deleteExpense,
  updateExpense,
  createExpense,
} = require("../mongodb/db/expense");
const { AuthenticationError } = require("apollo-server");

exports.resolvers = {
  Query: {
    me: (parent, args, context, info) => {
      if (context.loggedIn) {
        return context.user;
      } else {
        throw new AuthenticationError("Please Login.");
      }
    },
    getProfile: (parent, args, context, info) => {
      if (context.loggedIn) {
        return getProfile(args).then((res) => res);
      } else {
        throw new AuthenticationError("Please Login.");
      }
    },
    getAllUserIncomes: (parent, args, context, info) => {
      if (context.loggedIn) {
        return getAllUserIncomes(args.profileID).then((res) => {
          return res;
        });
      } else {
        throw new AuthenticationError("Please Login.");
      }
    },
    getAllUserExpenses: (parent, args, context, info) => {
      if (context.loggedIn) {
        return getAllUserExpenses(args.profileID).then((res) => {
          return res;
        });
      } else {
        throw new AuthenticationError("Please Login.");
      }
    },
  },
  Mutation: {
    register: (parent, args, context, info) => {
      return register(args).then((res) => {
        return {
          ...res,
        };
      });
    },
    login: (parent, args, context, info) => {
      return login(args).then((res) => {
        return {
          ...res,
        };
      });
    },
    updateProfile: (parent, args, context, info) => {
      if (context.loggedIn) {
        return updateProfile(args.profileObj, args.profileID).then(
          (res) => res
        );
      } else {
        throw new AuthenticationError("Please Login.");
      }
    },
    createIncome: (parent, args, context, info) => {
      if (context.loggedIn) {
        return createIncome(args).then((res) => {
          return res;
        });
      } else {
        throw new AuthenticationError("Please Login.");
      }
    },
    updateIncome: (parent, args, context, info) => {
      if (context.loggedIn) {
        return updateIncome(args.incomeObj, args.incomeID).then((res) => {
          return res;
        });
      } else {
        throw new AuthenticationError("Please Login.");
      }
    },
    deleteIncome: (parent, args, context, info) => {
      if (context.loggedIn) {
        return deleteIncome(args.incomeID).then((res) => {
          return res;
        });
      } else {
        throw new AuthenticationError("Please Login.");
      }
    },
    deleteAllUserIncomes: (parent, args, context, info) => {
      if (context.loggedIn) {
        return deleteAllUserIncomes(args.profileID).then((res) => {
          return res;
        });
      } else {
        throw new AuthenticationError("Please Login.");
      }
    },
    createExpense: (parent, args, context, info) => {
      if (context.loggedIn) {
        return createExpense(args).then((res) => {
          return res;
        });
      } else {
        throw new AuthenticationError("Please Login.");
      }
    },
    updateExpense: (parent, args, context, info) => {
      if (context.loggedIn) {
        return updateExpense(args.expenseObj, args.expenseID).then((res) => {
          return res;
        });
      } else {
        throw new AuthenticationError("Please Login.");
      }
    },
    deleteExpense: (parent, args, context, info) => {
      if (context.loggedIn) {
        return deleteExpense(args.expenseID).then((res) => {
          return res;
        });
      } else {
        throw new AuthenticationError("Please Login.");
      }
    },
    deleteAllUserExpenses: (parent, args, context, info) => {
      if (context.loggedIn) {
        return deleteAllUserExpenses(args.profileID).then((res) => {
          return res;
        });
      } else {
        throw new AuthenticationError("Please Login.");
      }
    },
  },
};

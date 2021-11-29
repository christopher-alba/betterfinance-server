const { register, login } = require("../mongodb/db/auth");
const {
  createIncome,
  updateIncome,
  deleteIncome,
  deleteAllUserIncomes,
  getAllUserIncomes,
} = require("../mongodb/db/income");
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
    getAllUserIncomes: (parent, args, context, info) => {
      if (context.loggedIn) {
        return getAllUserIncomes(args).then((res) => {
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
        return deleteIncome(args).then((res) => {
          return res;
        });
      } else {
        throw new AuthenticationError("Please Login.");
      }
    },
    deleteAllUserIncomes: (parent, args, context, info) => {
      if (context.loggedIn) {
        return deleteAllUserIncomes(args).then((res) => {
          return res;
        });
      } else {
        throw new AuthenticationError("Please Login.");
      }
    },
  },
};

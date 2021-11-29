const { register, login } = require("../mongodb/db/auth");
const {
  getProfile,
  createProfile,
  updateProfile,
} = require("../mongodb/db/profile");
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
    getProfile: (parent, args, context, info) => {
      console.log(context);
      if (context.loggedIn) {
        return getProfile(args).then((res) => res);
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
    createProfile: (parent, args, context, info) => {
      if (context.loggedIn) {
        return createProfile(args).then((res) => res);
      } else {
        throw new AuthenticationError("Please Login.");
      }
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

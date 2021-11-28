const { register, login } = require("../mongodb/db/auth");
const { AuthenticationError } = require("apollo-server");

exports.resolvers = {
  Query: {
    me: (parent, args, context, info) => {
      if (context.loggedIn) {
        return context.user;
      } else {
        throw new AuthenticationError("Please Login Again!");
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
  },
};

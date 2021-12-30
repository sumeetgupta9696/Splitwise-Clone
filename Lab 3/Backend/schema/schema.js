const graphql = require("graphql");
const bcrypt = require("bcrypt");

const {
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLFloat,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLBoolean,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
} = graphql;

const Bill = require("../models/BillModel");
const Group = require("../models/GroupModel");
const User = require("../models/UserModel");

const usermodel = new GraphQLObjectType({
  name: "Usermodel",
  fields: () => ({
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    phone: { type: GraphQLString },
    invitations: { type: new GraphQLList(GraphQLString) },
    memberships: { type: new GraphQLList(GraphQLString) },
    bills: { type: new GraphQLList(GraphQLString) },
    currency: { type: GraphQLString },
    image: { type: GraphQLString },
    language: { type: GraphQLString },
    timezone: { type: GraphQLString },
    message: { type: GraphQLString },
    res: { type: new GraphQLList(GraphQLString) },
    status: { type: GraphQLInt },
  }),
});

const groupmodel = new GraphQLObjectType({
  name: "Groupmodel",
  fields: () => ({
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    groupImage: { type: GraphQLString },
    members: { type: new GraphQLList(GraphQLString) },
    bills: { type: new GraphQLList(GraphQLString) },
    message: { type: GraphQLString },
    res: { type: new GraphQLList(GraphQLString) },
    status: { type: GraphQLInt },
  }),
});

const custObj = new GraphQLObjectType({
  name: "MyObject",
  fields: () => ({
    users: { type: new GraphQLList(GraphQLString) },
    splitAmount: { type: new GraphQLFloat() },
    settled: { type: GraphQLBoolean }
  }),
});

const billmodel = new GraphQLObjectType({
  name: "Billmodel",
  fields: () => ({
    _id: { type: GraphQLID },
    description: { type: GraphQLString },
    date: { type: GraphQLString },
    billAmount: { type: GraphQLFloat },
    group: { type: GraphQLString },
    paidby: { type: GraphQLString },
    comments: { type: new GraphQLList(GraphQLString) },
    participants: { type: new GraphQLList(custObj) },
    message: { type: GraphQLString },
    res: { type: new GraphQLList(GraphQLString) },
    status: { type: GraphQLInt },
  }),
});

const RootType = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    getProfileHandler: {
      type: usermodel,
      args: {
        email: { type: GraphQLString },
      },
      async resolve(parent, args) {
        const res = {};
        const user = await User.findOne({email: args.email});
        if (!user) {
          res.status = 404;
          return { res };
        } else {
          res.status = 200;
          return {
            name: user.name,
            email: user.email,
            phone: user.phone,
            language: user.language,
            currency: user.currency,
            timezone: user.timezone,
            image: user.image,
            _id: user._id,
            message: "GET_PROFILE_SUCCESSFUL",
            status: 200,
          };
        }
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    loginHandler: {
      type: usermodel,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      async resolve(parent, args) {
        const res = {};
        const user = await User.findOne({ email: args.email });
        if (!user) {
          return { message: "User not found", status: 400 };
        } else {
          const match = await bcrypt.compare(args.password, user.password); //, async (err, match) => {
          if (!match) {
            console.log("in match error");
            return { status: 403, message: "INCORRECT_PASSWORD" };
          }
          if (match) {
            return {
              name: user.name,
              email: user.email,
              phone: user.phone,
              language: user.language,
              currency: user.currency,
              timezone: user.timezone,
              image: user.image,
              _id: user._id,
              message: "user found",
              status: 200,
            };
          }
        }
      },
    },
    signUpHandler: {
      type: usermodel,
      args: {
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      async resolve(parent, args) {
        const res = {};
        const userExists = await User.findOne({ email: args.email });
        if (userExists) {
          status = 400;
          message = "USER_ALREADY_EXISTS";
          return { status, message };
        } else {
          const user = new User(args);
          user.password = bcrypt.hashSync(args.password, 10);
          try {
            await user.save();
            return {
              name: user.name,
              email: user.email,
              phone: user.phone,
              language: user.language,
              currency: user.currency,
              timezone: user.timezone,
              image: user.image,
              _id: user._id,
              status: 200,
              message: "Signup Successful",
            };
          } catch (e) {
            return {
              e,
              status: 400,
              message: "Signup Failed",
            };
          }
        }
      },
    },
    updateProfileHandler: {
      type: usermodel,
      args: {
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        phone: { type: GraphQLString },
        currency: { type: GraphQLString },
        language: { type: GraphQLString },
        timezone: { type: GraphQLString },
      },
      async resolve(parent, args) {
        const res = {};
        try {
          const oldUser = await User.findOne({ email: args.email });
          if (!oldUser) {
            return { status: 404, message: "User Not found" };
          } else {
            const filter = { email: args.email };
            const update = {
              name: args.name ? args.name : oldUser.name,
              email: args.email ? args.email : oldUser.email,
              phone: args.phone ? args.phone : oldUser.phone,
              currency: args.currency ? args.currency : oldUser.currency,
              language: args.language ? args.language : oldUser.language,
              timezone: args.timezone ? args.timezone : oldUser.timezone,
            };
            const updatedUser = await User.findOneAndUpdate(filter, update, {
              new: true,
              useFindAndModify: true,
            });
            return {
              name: updatedUser.name,
              email: updatedUser.email,
              phone: updatedUser.phone,
              language: updatedUser.language,
              currency: updatedUser.currency,
              timezone: updatedUser.timezone,
              image: updatedUser.image,
              _id: updatedUser._id,
              status: 200,
              message: "user updated successfully",
            };
          }
        } catch (e) {
          return {
            status: 500,
            message: "e",
          };
        }
      },
    },
  },
});

const schema = new GraphQLSchema({
  query: RootType,
  mutation: Mutation,
});
module.exports = schema;

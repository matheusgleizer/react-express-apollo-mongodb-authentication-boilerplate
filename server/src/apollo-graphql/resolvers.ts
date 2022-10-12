import { createUser, signInUser, signOutUser } from './resolvers/userMutation';
import { getUserByEmail } from './resolvers/userQuery';

const resolvers = {
  Query: {
    getUserByEmail,
  },
  Mutation: {
    createUser,
    signInUser,
    signOutUser,
  },
};

export default resolvers;

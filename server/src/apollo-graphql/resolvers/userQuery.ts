import User from "../../database/models/user";

export const getUserByEmail = async (
  _: any,
  args: any,
  _context: any
): Promise<object> => {
  const {
    input: { email },
  } = args;

  const user = await User.findOne({ email: email });

  if (user) return user;

  return {};
};

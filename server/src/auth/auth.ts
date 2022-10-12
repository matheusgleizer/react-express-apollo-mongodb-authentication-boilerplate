import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET;
import User from '../database/models/user';

export const tokenGenerator = async (userId: string): Promise<string> => {
  return jwt.sign({ id: userId }, JWT_SECRET as string, { expiresIn: '1d' });
};

export const getUserByToken = async (token: string) => {
  const decoded: any = jwt.verify(token, JWT_SECRET as string);

  if (decoded) {
    const user = await User.findById(decoded._id);
    if (user) return user;
    return {};
  }
};

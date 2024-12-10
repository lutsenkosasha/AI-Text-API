import jwt from 'jsonwebtoken';
import { config } from '../config';

export const generateToken = (userId: number, role: string): string => {
    return jwt.sign({ userId, role }, config.jwtSecret, { expiresIn: config.jwtExpiration });
  };

export const verifyToken = (token: string) => {
  return jwt.verify(token, config.jwtSecret);
};
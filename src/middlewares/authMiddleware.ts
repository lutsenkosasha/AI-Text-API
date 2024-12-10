import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwtUtils';
import { User } from '../models/User';
import { DecodedToken } from '../models/Token';

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(403).json({ message: 'Access denied, token missing.' });
  }

  console.log('Token:', token); // Логируем токен для проверки

  try {
    // Декодируем токен и приводим его к типу DecodedToken
    const decoded = verifyToken(token) as DecodedToken;

    console.log('Decoded token:', decoded);

    // Проверка, что пользовательский id и роль правильно передаются
    if (!decoded.userId || !decoded.role) {
        return res.status(401).json({ message: 'Invalid token: missing user data.' });
      }

    req.user = decoded; // Добавляем информацию о пользователе в запрос
    next();
  } catch (error) {
    console.error('Token verification error:', error);
    return res.status(403).json({ message: 'Invalid token.' });
  }
};

export default authenticateToken;
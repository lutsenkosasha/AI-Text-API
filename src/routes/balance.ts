import { Request, Response } from 'express';
import pool from '../database/database';

// Проверка баланса для текущего пользователя (роль "client")
export const getBalance = async (req: Request, res: Response) => {
  const userId = req.user?.userId;
  
  console.log('Fetching balance for userId:', userId);

  if (!userId) {
      return res.status(400).json({ message: 'User ID not found in token.' });
    }

  try {
    const result = await pool.query('SELECT balance FROM users WHERE id = $1', [userId]);
    const balance = result.rows[0]?.balance;

    if (balance === undefined) {
        return res.status(404).json({ message: 'Balance not found' });
    }
      
    res.status(200).json({ balance });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Обновление баланса пользователя (только роль "admin")
export const updateBalance = async (req: Request, res: Response) => {
    const { userId, newBalance } = req.body;
  
    try {
      await pool.query('UPDATE users SET balance = $1 WHERE id = $2', [newBalance, userId]);
  
      res.status(200).json({ message: 'Balance updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };
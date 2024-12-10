import { Request, Response } from 'express';
import { models } from '../models/aiModels';
import pool from '../database/database';

export const generateText = async (req: Request, res: Response) => {
  const { modelName, prompt } = req.body;
  const userId = req.user.userId;

  const model = models.find(m => m.name === modelName);
  if (!model) {
    return res.status(400).json({ message: 'Model not found' });
  }

  try {
        // Проверяем баланс пользователя
        const result = await pool.query('SELECT balance FROM users WHERE id = $1', [userId]);
        console.log('Database query result:', result.rows);

        if (!result.rows.length) {
            return res.status(404).json({ message: 'User not found or balance missing' });
        }

        const balance = result.rows[0].balance;
        const tokensNeeded = 100; // Примерное количество токенов
        const cost = (tokensNeeded / 100) * model.tokenPrice;

        if (balance < cost) {
            return res.status(403).json({ message: 'Insufficient balance' });
        }

  
    // Генерируем текст
    const generatedText = await model.generateText(prompt);

    // Обновляем баланс пользователя
    await pool.query('UPDATE users SET balance = balance - $1 WHERE id = $2', [cost, userId]);

    res.status(200).json({ text: generatedText });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error generating text' });
  }
};
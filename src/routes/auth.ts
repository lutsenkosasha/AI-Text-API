import express from 'express';
import { loginUser } from '../controllers/Authorization';
import { registerUser } from '../controllers/Registration';

const router = express.Router();

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Регистрация нового пользователя
 *     description: Создает нового пользователя с указанными данными.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: Имя пользователя
 *               email:
 *                 type: string
 *                 description: Электронная почта
 *               password:
 *                 type: string
 *                 description: Пароль
 *             required:
 *               - username
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: Успешная регистрация
 *       400:
 *         description: Неверные данные
 */
router.post('/register', registerUser);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Авторизация пользователя
 *     description: Авторизует пользователя по email и паролю.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Электронная почта
 *               password:
 *                 type: string
 *                 description: Пароль
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: Успешная авторизация
 *       400:
 *         description: Неверные данные
 */
router.post('/login', loginUser);

export default router;
import express from 'express';
import bodyParser from 'body-parser';
import authRoutes from './routes/authRoutes';
import { swaggerUi, specs } from './swagger';
import { generateText } from './routes/generate';
import { streamGeneratedText } from './routes/streamingAnswers';
import { authenticateToken } from './middlewares/authMiddleware';
import { getBalance, updateBalance } from './routes/balance';
import { authorizeRole } from './middlewares/roleMiddleware';

const app = express();

// Middleware для обработки JSON
app.use(bodyParser.json());

// Аутентификация
app.use('/auth', authRoutes);

// Swagger-документация
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Все роуты c authenticateToken защищены токеном
app.post('/generate', authenticateToken, generateText);
app.post('/stream', authenticateToken, streamGeneratedText);

// Проверка баланса (только для клиента)
app.get('/balance', authenticateToken, authorizeRole(['client']), getBalance);

// Обновление баланса (только для админа)
app.put('/balance', authenticateToken, authorizeRole(['admin']), updateBalance);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
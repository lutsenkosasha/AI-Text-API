import express from 'express';
import { loginUser } from '../controllers/Authorization';
import { registerUser } from '../controllers/Registration';

const router = express.Router();

router.post('/login', loginUser);
router.post('/register', registerUser);

export default router;
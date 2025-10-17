import express from 'express';
import { getUsers, uploadAvatar, deleteUser } from '../controllers/userController.js';
import { verifyToken } from '../middleware/auth.js';
import upload from '../middleware/upload.js';

const router = express.Router();

router.get('/', verifyToken, getUsers);
router.post('/avatar', verifyToken, upload.single('file'), uploadAvatar);
router.delete('/:id', verifyToken, deleteUser);

export default router;

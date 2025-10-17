import express from 'express';
import { getUsers, uploadAvatar, deleteUser, updateUser } from '../controllers/userController.js';
import { verifyToken } from '../middleware/auth.js';
import upload from '../middleware/upload.js';

const router = express.Router();

router.get('/', verifyToken, getUsers);
router.post('/avatar', verifyToken, upload.single('file'), uploadAvatar);
router.delete('/:id', verifyToken, deleteUser);
router.put('/:id', verifyToken, updateUser);

export default router;

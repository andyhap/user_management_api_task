// import express from 'express';
// import { getUsers, uploadAvatar, deleteUser, updateUser } from '../controllers/userController.js';
// import { verifyToken } from '../middleware/auth.js';
// import upload from '../middleware/upload.js';

// const router = express.Router();

// router.get('/', verifyToken, getUsers);
// router.post('/avatar', verifyToken, upload.single('file'), uploadAvatar);
// router.delete('/:id', verifyToken, deleteUser);
// router.put('/:id', verifyToken, updateUser);

// export default router;

import express from 'express';
import { getUsers, uploadAvatar, deleteUser, updateUser } from '../controllers/userController.js';
import { verifyToken } from '../middleware/auth.js';
import upload from '../middleware/upload.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Endpoint untuk manajemen data user
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Ambil semua data user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Daftar user berhasil diambil
 *       401:
 *         description: Token tidak valid
 */
router.get('/', verifyToken, getUsers);

/**
 * @swagger
 * /users/avatar:
 *   post:
 *     summary: Upload avatar user ke Cloudinary
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Avatar berhasil diupload
 *       400:
 *         description: Tidak ada file yang diupload
 *       401:
 *         description: Token tidak valid
 */
router.post('/avatar', verifyToken, upload.single('file'), uploadAvatar);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update data user berdasarkan ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               role:
 *                 type: string
 *     responses:
 *       200:
 *         description: User berhasil diupdate
 *       404:
 *         description: User tidak ditemukan
 *       401:
 *         description: Token tidak valid
 */
router.put('/:id', verifyToken, updateUser);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Hapus user berdasarkan ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User berhasil dihapus
 *       404:
 *         description: User tidak ditemukan
 *       401:
 *         description: Token tidak valid
 */
router.delete('/:id', verifyToken, deleteUser);

export default router;

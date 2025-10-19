// import express from 'express';
// import { register, login } from '../controllers/authController.js';
// const router = express.Router();

// router.post('/register', register);
// router.post('/login', login);

// export default router;

import express from 'express';
import { register, login } from '../controllers/authController.js';
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Endpoint untuk autentikasi user
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Registrasi user baru
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: johndoe
 *               email:
 *                 type: string
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 example: secret123
 *     responses:
 *       201:
 *         description: User berhasil didaftarkan
 *       500:
 *         description: Terjadi kesalahan server
 */
router.post('/register', register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user dan dapatkan JWT token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 example: secret123
 *     responses:
 *       200:
 *         description: Login berhasil, token dikembalikan
 *       401:
 *         description: Kredensial salah
 *       404:
 *         description: User tidak ditemukan
 */
router.post('/login', login);

export default router;

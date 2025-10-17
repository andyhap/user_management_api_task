import pool from '../config/db.js';
import cloudinary from '../config/cloudinary.js';
import streamifier from 'streamifier';

export const getUsers = async (req, res) => {
    const { rows } = await pool.query('SELECT id, username, email, role, avatar_url FROM users');
    res.json(rows);
};

export const uploadAvatar = async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

        const uploadStream = () =>
        new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
            { folder: 'avatars' },
            (err, result) => {
                if (err) reject(err);
                else resolve(result);
            }
            );
            streamifier.createReadStream(req.file.buffer).pipe(stream);
        });

        const result = await uploadStream();
        const { id } = req.user;

        await pool.query('UPDATE users SET avatar_url = $1 WHERE id = $2', [result.secure_url, id]);

        res.json({ message: 'Avatar uploaded', url: result.secure_url });
    } catch (err) {
        res.status(500).json({ message: 'Upload failed', error: err.message });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        
        const checkUser = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
        if (checkUser.rows.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        await pool.query('DELETE FROM users WHERE id = $1', [id]);
        
        res.json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Delete failed', error: err.message });
    }
};

export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { username, email, role } = req.body;

        if (!username && !email && !role) {
            return res.status(400).json({ message: 'No fields to update' });
        }

        const fields = [];
        const values = [];
        let idx = 1;

        if (username !== undefined) { fields.push(`username = $${idx++}`); values.push(username); }
        if (email !== undefined)    { fields.push(`email = $${idx++}`); values.push(email); }
        if (role !== undefined)     { fields.push(`role = $${idx++}`); values.push(role); }

        const query = `
            UPDATE users
            SET ${fields.join(', ')}
            WHERE id = $${idx}
            RETURNING id, username, email, role, avatar_url
        `;
        values.push(id);

        const { rows } = await pool.query(query, values);

        if (rows.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ message: 'User updated successfully', user: rows[0] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Update failed', error: err.message });
    }
};

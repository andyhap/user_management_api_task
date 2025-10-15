import pool from '../config/db.js';

export const createUser = async ({ username, email, password, role = 'user', avatar_url = null }) => {
    const query = `
        INSERT INTO users (username, email, password, role, avatar_url)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING id, username, email, role, avatar_url
    `;
    const values = [username, email, password, role, avatar_url];
    const { rows } = await pool.query(query, values);
    return rows[0];
};

export const findByEmail = async (email) => {
    const { rows } = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    return rows[0] || null;
};

export const findById = async (id) => {
    const { rows } = await pool.query('SELECT id, username, email, role, avatar_url FROM users WHERE id = $1', [id]);
    return rows[0] || null;
};

export const getAllUsers = async () => {
    const { rows } = await pool.query('SELECT id, username, email, role, avatar_url FROM users ORDER BY id');
    return rows;
};

export const updateUserById = async (id, { username, email, password, role }) => {
    const fields = [];
    const values = [];
    let idx = 1;

    if (username !== undefined) { fields.push(`username = $${idx++}`); values.push(username); }
    if (email !== undefined)    { fields.push(`email = $${idx++}`); values.push(email); }
    if (password !== undefined) { fields.push(`password = $${idx++}`); values.push(password); }
    if (role !== undefined)     { fields.push(`role = $${idx++}`); values.push(role); }

    if (fields.length === 0) return null;

    const query = `
        UPDATE users
        SET ${fields.join(', ')}
        WHERE id = $${idx}
        RETURNING id, username, email, role, avatar_url
    `;
    values.push(id);

    const { rows } = await pool.query(query, values);
    return rows[0] || null;
};

export const updateAvatarById = async (id, avatarUrl) => {
    const query = `
        UPDATE users
        SET avatar_url = $1
        WHERE id = $2
        RETURNING id, username, email, role, avatar_url
    `;
    const { rows } = await pool.query(query, [avatarUrl, id]);
    return rows[0] || null;
};

export const deleteUserById = async (id) => {
    const { rows } = await pool.query('DELETE FROM users WHERE id = $1 RETURNING id', [id]);
    return rows[0] || null;
};

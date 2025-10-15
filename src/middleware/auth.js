// import jwt, { verify } from 'jsonwebtoken';
// import dotenv from 'dotenv';
// dotenv.config();

// export const verifyToken = (req, res, next) => {
//     const auhtHeader = req.headers['authorization'];
//     const token = auhtHeader && auhtHeader.split(' ')[1];
    
//     if (!token) return res.status(403).json({ message: 'Token Missing' });

//     jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//         if (err) return res.status(401).json({ message: 'Invalid Token' });
//         req.user = user;
//         next();
//     });
// };

import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(403).json({ message: 'Token missing' });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(401).json({ message: 'Invalid token' });
        req.user = user;
        next();
    });
};

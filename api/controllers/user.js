import { db } from "../connect.js";

export const addUser = (req, res) => {
     const { name, email, phone } = req.body;
    try {
        const result = db.query(
            'INSERT INTO users (name, email, phone) VALUES (?, ?, ?)',
            [name, email, phone]
        );
        res.status(201).json({ id: result.insertId, name, email, phone });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Något gick fel vid skapandet av användaren' });
    }
}


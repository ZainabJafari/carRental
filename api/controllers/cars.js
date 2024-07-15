import { db } from "../connect.js";

export const getCars = (req, res) => {
    const q = "SELECT * FROM cars";

    db.query(q, (err, data) => {
        if (err) {
            console.error(err);  
            return res.status(500).json(err);
        }
        if (data.length === 0) {
            console.log('not data'); 
            return res.status(404).json({ message: "Cars not found" });
        }
        
        return res.status(200).json(data);
    });
};

import { db } from "../connect.js";

export const getCars = (req, res) => {
    const { make, year, transmission } = req.query;
    let q = "SELECT * FROM cars WHERE 1=1";
    
    if (make) {
        q += ` AND make = ${db.escape(make)}`;
    }
    if (year) {
        q += ` AND year = ${db.escape(year)}`;
    }
    if (transmission) {
        q += ` AND transmission = ${db.escape(transmission)}`;
    }

    db.query(q, (err, data) => {
        if (err) {
            console.error(err);  
            return res.status(500).json(err);
        }
        if (data.length === 0) {
            console.log('no data'); 
            return res.status(404).json({ message: "Cars not found" });
        }
        
        return res.status(200).json(data);
    });
};

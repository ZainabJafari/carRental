import { db } from "../connect.js";

export const createBooking = (data, callback) => {
    const { pickupDate, pickupLocation, pickupTime, dropoffDate, dropoffLocation, dropoffTime, carId } = data;
    const q = `
        INSERT INTO bookings (pickupDate, pickupLocation, pickupTime, dropoffDate, dropoffLocation, dropoffTime, carId)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    db.query(q, [pickupDate, pickupLocation, pickupTime, dropoffDate, dropoffLocation, dropoffTime, carId], callback);
};

export const getBookings = (callback) => {
    const q = "SELECT * FROM bookings";
    db.query(q, callback);
};

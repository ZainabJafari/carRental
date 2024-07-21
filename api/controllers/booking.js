import { createBooking, getBookings } from '../models/booking.js';

export const addBooking = (req, res) => {
    const bookingData = req.body;
    createBooking(bookingData, (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json(err);
        }
        return res.status(201).json({ message: "Booking created successfully", bookingId: data.insertId });
    });
};

export const listBookings = (req, res) => {
    getBookings((err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json(err);
        }
        return res.status(200).json(data);
    });
};

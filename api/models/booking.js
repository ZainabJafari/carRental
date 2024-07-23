import { db } from "../connect.js";

// Helper function to format date
const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
};

export const createBooking = (data, callback) => {
    const { pickupDate, pickupLocation, pickupTime, dropoffDate, dropoffLocation, dropoffTime } = data;

    const formattedPickupDate = formatDate(pickupDate);
    const formattedDropoffDate = formatDate(dropoffDate);

    const q = `
        INSERT INTO bookings (pickupDate, pickupLocation, pickupTime, dropoffDate, dropoffLocation, dropoffTime)
        VALUES (?, ?, ?, ?, ?, ?)
    `;
    db.query(q, [formattedPickupDate, pickupLocation, pickupTime, formattedDropoffDate, dropoffLocation, dropoffTime], callback);
};


export const getBookings = (callback) => {
    const q = "SELECT * FROM bookings";
    db.query(q, callback);
};

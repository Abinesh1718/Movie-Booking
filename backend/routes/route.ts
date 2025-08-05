import express from "express";
import { login, register } from "../controler/auth.controler";
import { bookTicket, getAllBookedSeats, getBookings } from "../controler/bookingController";

const router = express.Router()
router.post('/register', register)
router.post('/login', login)
router.post('/book', bookTicket);
router.get('/bookings', getBookings);
router.get('/allbookings', getAllBookedSeats);




export default router
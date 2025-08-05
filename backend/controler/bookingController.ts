import { Request, Response } from 'express';
import { Booking } from '../model/Booking.model';
import jwt from 'jsonwebtoken';

export const bookTicket = async (req: Request, res: Response) => {
  try {
    const { movie, theater, time, seats, date } = req.body;

    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const decoded: any = jwt.verify(token, 'ABINESH');

    const booking = await Booking.create({
      movie,
      theater,
      time,
      date,
      seats,
      userId: decoded.id,
    });

    res.status(201).json(booking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};

export const getBookings = async (req: Request, res: Response) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) return res.status(401).json({ error: 'Unauthorized' });

  try {
    const decoded: any = jwt.verify(token, 'ABINESH');
    const bookings = await Booking.findAll({ where: { userId: decoded.id } });

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
};


export const getAllBookedSeats = async (req: Request, res: Response) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Unauthorized' });

  try {
    const bookings = await Booking.findAll();
    return res.status(200).json({ bookings });
  } catch (error) {
    console.error("Failed to fetch booked seats:", error);
    return res.status(500).json({ error: "Server error while fetching booked seats" });
  }
};

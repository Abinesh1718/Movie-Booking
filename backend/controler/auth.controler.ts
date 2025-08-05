import { Request, Response } from "express";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from "../model/User.model";

const JWT_SECRET = 'ABINESH'; 

export const register = async (req: Request, res: Response) => {
  const { name, email, password, username } = req.body;

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ name, email, username, password: hashedPassword });

    const token = jwt.sign({ id: user.id }, JWT_SECRET);

    res.status(201).json({ token, user: user.name });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong during registration' });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user: any = await User.findOne({ where: { email } });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: 'Invalid Credentials' });
  }

  const token = jwt.sign({ id: user.id }, JWT_SECRET);
  return res.status(200).json({ token, user: user.name });
};

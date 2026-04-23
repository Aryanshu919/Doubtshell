import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import bcypt from "bcrypt";
import { registerSchema, loginSchema } from "../utils/validator/auth_validator";
import prisma from "../db";
import { JWT_SECRET } from "../config"; 

export const register = async (req: Request, res: Response) => {
  const parsedData = registerSchema.safeParse(req.body);

  if (!parsedData.success) {
    const errors = parsedData.error;
    res.send(400).json({
      message: "validation failed",
      errors,
    });

    return;
  }

  const { name, email, password } = parsedData.data;

  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) {
    res.status(400).json({
      msg: "user already registered",
    });

    return;
  }

  const hashedPassword = await bcypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  const userId = user.id;

  const token = jwt.sign({ userId }, JWT_SECRET, { expiresIn: "1d" });
  res
    .cookie("auth-cookie", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })
    .status(201)
    .json({
      message: "User registered",
      user: { id: user.id, email: user.email, name: user.name },
    });
};

export const login = async (req: Request, res: Response) => {
  const parsedData = loginSchema.safeParse(req.body);

  if (!parsedData.success) {
    const errors = parsedData.error;
    res.send(400).json({
      message: "validation failed",
      errors,
    });

    return;
  }

  const { email, password } = parsedData.data;

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    return res.status(400).json({
      msg: "Invalid credentials",
    });
  }

  const isPasswordValid = await bcypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(400).json({
      msg: "Password is incorrect",
    });
  }

  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "1d" });
  res
    .cookie("auth-cookie", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })
    .status(201)
    .json({
      message: "User Logged in Scuccessfully",
      user: { id: user.id, email: user.email, name: user.name },
      token,
    });
};

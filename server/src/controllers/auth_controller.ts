import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import bcypt from "bcrypt";
import { registerSchema } from "../utils/validator/auth_validator";
import prisma from "../db";

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

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
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })
    .status(201)
    .json({
      message: "User registered",
      user: { id: user.id, email: user.email, name: user.name },
    });
};

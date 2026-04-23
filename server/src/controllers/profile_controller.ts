import { Response } from "express";
import { AuthRequest } from "../types";

import prisma from "../db";

export const getProfile = async (req: AuthRequest, res: Response) => {
  const userId = req.userId;
  console.log("inside the geProfile router");
  if (!userId) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
      name: true,
      email: true,
      imageUrl: true,
      bookmarks: true,
      questions: true,
      answers: true
    },
  });

  return res.status(200).json({
    user,
  });
};

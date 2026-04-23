import { Response } from "express";
import { AuthRequest } from "../types";
import prisma from "../db";

export const bookmarkQuestion = async (req: AuthRequest, res: Response) => {

  const { questionId } = req.body;
  const userId = req.userId;

  if (!userId || !questionId) {
    return res.status(400).json({
      message: "Missing userId or questionId",
    });
  }

  const existingBookmark = await prisma.bookmark.findUnique({
    where: {
      userId_questionId: {
        userId,
        questionId,
      },
    },
  });

  if (existingBookmark) {
    await prisma.bookmark.delete({
      where: {
        userId_questionId: {
          userId,
          questionId,
        },
      },
    });

    return res.status(200).json({
      msg: "Bookmark removed",
    });
  } else {
    await prisma.bookmark.create({
      data: {
        userId,
        questionId,
      },
    });

    return res.status(200).json({
      msg: "Bookmark added",
    });


  }
};

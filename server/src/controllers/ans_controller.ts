import { Response } from "express";
import prisma from "../db";
import { AuthRequest } from "../types";


export const createAnswerByQuestionId = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const { body } = req.body;
  const userId = req.userId;

  if(!userId){
    return res.status(401).json({
      message: "Unauthorized"
    })
  }

  const answer = await prisma.answer.create({
    data: {
      body,
      questionId: id,
      userId: userId
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
}

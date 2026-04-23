import { Request, Response } from "express";
import { createQuestionSchema } from "../utils/validator/ques_validator";
import prisma from "../db";

export const createQuestion = async (req: Request, res: Response) => {
  const parsedData = createQuestionSchema.safeParse(req.body);

  if (!parsedData.success) {
    const errors = parsedData.error;
    res.status(400).json({
      message: "validation failed",
      errors,
    });

    return;
  }

  const { title, body, tags, userId, imageUrl, isSolved, anonymous } =
    parsedData.data;

  const question = await prisma.question.create({
    data: {
      title,
      body,
      tags,
      isSolved,
      imageUrl,
      anonymous,
      userId: userId,
    },
  });
};

export const getQuestions = async (req: Request, res: Response) => {
  console.log(Object.keys(prisma))
  try {
    const { cursor, limit } = req.query;

    console.log("Received query params - cursor:", cursor, "limit:", limit);

    const parsedLimit =
      typeof limit === "string" ? Math.min(Number(limit), 20) : 10;

    // ✅ FIX: cursor should be an object, not string
    let parsedCursor:
      | { id: string; createdAt: string }
      | null = null;

    if (typeof cursor === "string") {
      try {
        parsedCursor = JSON.parse(JSON.parse(cursor));
      } catch (err) {
        parsedCursor = null;
      }
    }

    console.log("Parsed cursor:", parsedCursor);

    const questions = await prisma.question.findMany({
      take: parsedLimit,

      skip: parsedCursor ? 1 : 0,

      cursor: parsedCursor
        ? {
            Question_createdAt_id_key: {
              id: parsedCursor.id,
              createdAt: parsedCursor.createdAt, // ⚠️ convert to Date
            },
          }
        : undefined,

      orderBy: [
        { createdAt: "desc" },
        { id: "desc" },
      ],

      include: {
        user: {
          select: {
            id: true,
            name: true,
          },
        },

        answers:{
          select:{
            id: true,
            body: true
          }
        },

        bookmarks:{
          select:{
            userId: true, 
            questionId: true
          }
        }
      },
    });

    const lastQuestion = questions[questions.length - 1];

    // ✅ FIX: nextCursor must match cursor structure
    const nextCursor =
      questions.length === parsedLimit && lastQuestion
        ? JSON.stringify({
            id: lastQuestion.id,
            createdAt: lastQuestion.createdAt,
          })
        : null;

    res.status(200).json({
      questions,
      nextCursor,
    });
  } catch (error) {
    console.error("Error fetching questions:", error);

    res.status(500).json({
      message: "Something went wrong while fetching questions",
    });
  }
};


export const deleteQuestionById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const question = await prisma.question.delete({
    where: {
      id,
    },
  });

  res.json({
    message: "Question deleted",
    question,
  });
};


export const updateQuestion = async ( req: Request, res: Response) => {
  const { id } = req.params;
  const { title, body, tags, isSolved, imageUrl, anonymous } = req.body;

  const question = await prisma.question.update({
    where: {
      id,
    },
    data: {
      title,
      body,
      tags,
      isSolved,
      imageUrl,
      anonymous,
    },
  });

  res.json({
    message: "Question updated",
    question,
  });

}

export const  getQuestionsById = async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log("Fetching question with ID:", id);

  const question = await prisma.question.findUnique({
    where: {
      id
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
        },
      },

      answers:{
        select:{
          id: true,
          body: true,
          createdAt: true,
          user: {
            select: {
              id: true,
              name: true,
            },
          },
        }
      }
    },
  })

  return res.json(({
    message: "Question fetched successfully",
    question,
  }))
}
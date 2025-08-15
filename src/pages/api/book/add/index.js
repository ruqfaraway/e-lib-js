import prisma from "@/lib/prisma";
import dayjs from "dayjs";

export default async function handler(req, res) {
  switch (req.method) {
    case "POST": {
      try {
        const {
          title,
          stock,
          category,
          description,
          publishYear,
          isbn,
          authorId,
          publisherId,
        } = req.body;

        const book = await prisma.book.create({
          data: {
            title,
            stock,
            category,
            description,
            publishYear: Number(publishYear),
            isbn,
            authorId,
            publisherId,
          },
        });

        return res.status(201).send({
          status: 201,
          message: "book created successfully",
          data: book,
        });
      } catch (err) {
        console.error(err);
        return res.status(500).send({
          status: 500,
          message: "Internal Server Error",
          data: null,
          error: err.message,
        });
      }
    }

    default: {
      return res.status(405).send({ message: "Method not allowed" });
    }
  }
}

import prisma from "@/lib/prisma";
import dayjs from "dayjs";

export default async function handler(req, res) {
  const id = Number(req?.query?.id);
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

        if (!id) {
          return res.status(400).send({
            status: 400,
            message: "book ID is required",
          });
        }

        const book = await prisma.book.update({
          where: { id },
          data: {
            title,
            stock,
            category,
            description,
            publishYear,
            isbn,
            authorId,
            publisherId,
          },
        });

        return res.status(200).send({
          status: 200,
          message: "book updated successfully",
          data: book,
        });
      } catch (err) {
        console.error(err);
        return res.status(500).send({
          status: 500,
          message: "Internal Server Error",
          error: err.message,
        });
      }
    }

    default: {
      return res.status(405).send({
        status: 405,
        message: "Method not allowed",
      });
    }
  }
}

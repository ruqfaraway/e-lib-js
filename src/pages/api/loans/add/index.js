import prisma from "@/lib/prisma";
import dayjs from "dayjs";

export default async function handler(req, res) {
  switch (req.method) {
    case "POST": {
      try {
        const {
          userId,
          bookId,
          borrowDate,
          dueDate,
          returnDate,
          status,
          fine,
          notes,
        } = req.body;

        const borrowing = await prisma.borrowing.create({
          data: {
            userId,
            bookId,
            borrowDate,
            dueDate,
            returnDate,
            status,
            fine,
            notes,
          },
        });

        return res.status(201).send({
          status: 201,
          message: "borrowing created successfully",
          data: borrowing,
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

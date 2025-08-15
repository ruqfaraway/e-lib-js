import prisma from "@/lib/prisma";
import dayjs from "dayjs";

export default async function handler(req, res) {
  switch (req.method) {
    case "POST": {
      try {
        const { name, bio } = req.body;

        const author = await prisma.author.create({
          data: {
            name,
            bio,
          },
        });

        return res.status(201).send({
          status: 201,
          message: "Author created successfully",
          data: author,
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

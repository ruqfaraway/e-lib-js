import prisma from "@/lib/prisma";
import dayjs from "dayjs";

export default async function handler(req, res) {
  const id = Number(req?.query?.id);
  switch (req.method) {
    case "POST": {
      try {
        const { name, address, contact } = req.body;

        if (!id) {
          return res.status(400).send({
            status: 400,
            message: "User ID is required",
          });
        }

        const publisher = await prisma.publisher.update({
          where: { id },
          data: {
            name,
            address,
            contact,
          },
        });

        return res.status(200).send({
          status: 200,
          message: "Publisher updated successfully",
          data: publisher,
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

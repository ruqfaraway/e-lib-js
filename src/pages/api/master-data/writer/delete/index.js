import prisma from "@/lib/prisma";

export default async function handler(req, res) {
  console.log(req.body, "reqqq");
  switch (req.method) {
    case "DELETE": {
      try {
        const { id } = req.body; // pastikan body berisi { id: ... }
        const author = await prisma.author.delete({
          where: { id },
        });

        return res.status(200).send({
          status: 200,
          message: "author deleted successfully",
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

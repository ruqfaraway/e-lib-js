import prisma from "@/lib/prisma";
import dayjs from "dayjs";

export default async function handler(req, res) {
  switch (req.method) {
    case "POST": {
      try {
        const {
          name,
          username,
          address,
          phone,
          email,
          nationalId,
          dateOfBirth,
          emergencyContact,
        } = req.body;

        const user = await prisma.user.create({
          data: {
            name,
            username,
            address,
            phoneNumber: phone,
            email,
            nationalId,
            dateOfBirth: dayjs(dateOfBirth).toDate().toISOString(),
            emergencyContact,
            password: "password",
          },
        });

        return res.status(201).send({
          status: 201,
          message: "User created successfully",
          data: user,
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

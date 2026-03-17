import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { db } from "../../lib/db";
import bcrypt from "bcryptjs";

const schema = z.object({
  user: z.object({
    name: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(8),
  }),
  organization: z.object({
    name: z.string().min(1),
  }),
});

export class SignUpController {
  static async handler(request: FastifyRequest, reply: FastifyReply) {
    const { user, organization } = schema.parse(request.body);

    const userAlreadyExists = await db.user.findUnique({
      where: { email: user.email },
      select: { id: true },
    });

    if (userAlreadyExists) {
      return reply.code(409).send({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(user.password, 12);

    const { id } = await db.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: hashedPassword,
        organizations:{
          create {
            role: 'OWNER',
            organization: {
              create: {
                name: organization.name,
              }
            }
          }
        }
      },
    });

    reply.code(200).send({ id });
  }
}

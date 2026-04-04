import { FastifyReply, FastifyRequest } from "fastify";
import { jwt, z } from "zod";
import { db } from "../../lib/db";
import bcrypt from "bcryptjs";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export class SignInController {
  static async handler(request: FastifyRequest, reply: FastifyReply) {
    const { email, password } = schema.parse(request.body);

    const user = await db.user.findUnique({
      where: { email },
      select: {
        id: true,
        password: true,
      },
    });

    if (!user || !(await compare(password, user.password))) {
      return reply.code(409).send({ error: "Invalid credentials" });
    }
    
    const accessToken = request.server.jwt.sign({
      sub: user.id,
    });

    reply.code(200).send({
      accessToken,
    });
  }
}

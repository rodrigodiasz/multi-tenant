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
        organizations: {
          take: 1,
          where: {
            role: "OWNER",
          },
        },
      },
    });

    if (!user) {
      return reply.code(409).send({ error: "nvalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return reply.code(409).send({ error: "Invalid credentials" });
    }

    const [organization] = user.organizations;

    if (!organization) {
      return reply.code(409).send({ error: "You dont have any organizations" });
    }

    const accessToken = request.server.jwt.sign({
      sub: user.id,
      organizationId: organization.organizationId,
      role: organization.role,
    });

    reply.code(200).send({
      accessToken,
    });
  }
}

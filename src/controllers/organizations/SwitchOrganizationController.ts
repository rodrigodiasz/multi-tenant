import { FastifyRequest, FastifyReply } from "fastify";
import { db } from "../../lib/db";
import { z } from "zod";

const schema = z.object({
  organizationId: z.string().uuid(),
});

export class SwitchOrganizationController {
  static async handler(request: FastifyRequest, reply: FastifyReply) {
    const { organizationId } = schema.parse(request.params);
    const { sub } = request.user;

    const organizationUser = await db.organizationUser.findUnique({
      where: {
        userId_organizationId: {
          organizationId,
          userId: sub,
        },
      },
    });

    if (!organizationUser) {
      return reply.code(403).send({ error: "You cannot switch to this organization." });
    }

    const acessToken = reply.server.jwt.sign({
      sub: organizationUser.userId,
      organizationId: organizationUser.organizationId,
      role: organizationUser.role,
    })

    reply.code(200).send({ acessToken });
  }
}

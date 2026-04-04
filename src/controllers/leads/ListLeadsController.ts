import { FastifyRequest, FastifyReply } from "fastify";
import { randomUUID } from "crypto";
import { db } from "../../lib/db";

export class ListLeadsController {
  static async handler(request: FastifyRequest, reply: FastifyReply) {
    const organizationId = request.headers["x-org-id"];

    if (!organizationId || typeof organizationId !== 'string') {
      return reply.status(403).send({ message: "Organization is missing" });
    }

    const leads = await db.lead.findMany({
      where: {
        organizationId,
      },
    });
    return {
      leads,
    };
  }
}

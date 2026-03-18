import { FastifyRequest, FastifyReply } from "fastify";
import { randomUUID } from "crypto";
import { db } from "../../lib/db";

export class ListLeadsController {
  static async handler(request: FastifyRequest, reply: FastifyReply) {
    const { organizationId } = request.user;

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

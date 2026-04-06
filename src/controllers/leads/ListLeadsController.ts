import { FastifyRequest, FastifyReply } from "fastify";
import { db } from "../../lib/db";

export class ListLeadsController {
  static async handler(request: FastifyRequest) {
    const { organizationId } = request.organizationUser;

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

import { FastifyRequest} from "fastify";
import { db } from "../../lib/db";

export class ListOrgUsersController {
  static async handler(request: FastifyRequest) {
    const { organizationId } = request.organizationUser;

    const members = await db.organizationUser.findMany({
      where: {
        organizationId,
      },
      select: {
        role: true,
        user: {
          select: {
            id: true,
            email: true,
            name: true,
          }
        },
      }
    });
    return {
      members,
    };
  }
}

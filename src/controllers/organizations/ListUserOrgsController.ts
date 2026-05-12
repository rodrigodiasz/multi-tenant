import { FastifyRequest} from "fastify";
import { db } from "../../lib/db";

export class ListUserOrgsController {
  static async handler(request: FastifyRequest) {
    const { sub: userId } = request.user;

    const organizations = await db.organizationUser.findMany({
      where: {
        userId,
      },
      select: {
        role: true,
        organization: {
          select: {
            id: true,
            name: true,
          }
        }
      }
    });
    return {
      organizations,
    };
  }
}

import { FastifyReply, FastifyRequest } from "fastify";
import { db } from "../lib/db";

export async function validatePermissionMiddleware(requiredRoles?: OrganizationRole[]) {

  return async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const organizationId = request.headers["x-org-id"];

    if (!organizationId || typeof organizationId !== 'string') {
      return reply.status(403).send({ message: "Organization is missing" });
    }

    const { sub } = request.user;

    const organizationUser = await db.organizationUser.findUnique({
      where: {
        userId_organizationId: {
          organizationId,
          userId: sub,
        },
      },
    });

    if (!organizationUser || (requiredRoles || !requiredRoles.includes(organizationUser.role))) {
      return reply.status(403).send({ message: "You don't have enough permissions" });
    }
    request.organizationUser = organizationUser;
    } catch {
      return reply.status(403).send({ message: "You don't have enough permissions" });
    }
  }
}

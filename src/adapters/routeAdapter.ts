import { IController } from "../interfaces/IController";
import { FastifyRequest, FastifyReply } from "fastify";

export function routeAdapter(controllerFactory: (tenantId: string) => IController) {
  return (request: FastifyRequest, reply: FastifyReply) => {
    const organizationId = request.headers["x-org-id"];

    if (!organizationId || typeof organizationId !== 'string') {
      return reply.status(403).send({ message: "Organization is missing" });
    };

    const controller = controllerFactory(organizationId);
    
    return controller.handle(request, reply);
  }
}
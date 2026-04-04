import { FastifyPluginAsync } from "fastify";
import { ListLeadsController } from "../controllers/leads/ListLeadsController";
import { validatePermissionMiddleware } from "../middlewares/validadePermissionMiddleware";

export const leadsRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.addHook('onRequest', validatePermissionMiddleware);

  fastify.get("/", ListLeadsController.handler);
};

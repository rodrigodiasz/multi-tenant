import { FastifyPluginAsync} from "fastify";
import { validatePermissionMiddleware } from "../middlewares/validadePermissionMiddleware";
import { makeListLeadsController } from "../factories/makeListLeadsController";
import { routeAdapter } from "../adapters/routeAdapter";
import { makeCreateLeadController } from "../factories/makeCreateLeadController";

export const leadsRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.addHook('onRequest', validatePermissionMiddleware());

  fastify.get("/", routeAdapter(makeListLeadsController));
  fastify.post("/", 
  {
    onRequest:[validatePermissionMiddleware(['ADMIN', 'OWNER'])],
  }, 
  routeAdapter(makeCreateLeadController),
);
};

import { FastifyPluginAsync } from "fastify";
import { validatePermissionMiddleware } from "../middlewares/validadePermissionMiddleware";
import { routeAdapter } from "../adapters/routeAdapter";
import { makeListUserOrgsController } from "../factories/makeListUserOrgsController";
import { makeListOrgUsersController } from "../factories/makeListOrgUsersController";

export const organizationsRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.get(
    "/users", 
    {
    onRequest:[validatePermissionMiddleware(['ADMIN', 'OWNER'])],
  }, routeAdapter(makeListOrgUsersController),
);
  
  fastify.get("/", routeAdapter(makeListUserOrgsController, false));
};

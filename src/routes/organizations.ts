import { FastifyPluginAsync } from "fastify";
import { ListOrgUsersController } from "../controllers/organizations/ListOrgUsersController";
import { ListUserOrgsController } from "../controllers/organizations/ListUserOrgsController";
import { validatePermissionMiddleware } from "../middlewares/validadePermissionMiddleware";

export const organizationsRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.get(
    "/users", 
    {
    onRequest:[validatePermissionMiddleware(['ADMIN', 'OWNER'])],
  }, ListOrgUsersController.handler);
  
  fastify.get("/", ListUserOrgsController.handler);
};

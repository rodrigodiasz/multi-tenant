import { FastifyPluginAsync } from "fastify";
import { authRoutes } from "./auth";
import { leadsRoutes } from "./leads";
import { authenticationMiddleware } from "../middlewares/authenticationMiddleware";
import { organizationsRoutes } from "./organizations";
import { validatePermissionMiddleware } from "../middlewares/validadePermissionMiddleware";

const publicRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.register(authRoutes, { prefix: '/auth' });
};

const privateRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.addHook('onRequest', authenticationMiddleware);

  fastify.register(leadsRoutes, { prefix: '/leads' });
  fastify.register(organizationsRoutes, { prefix: '/organization' });
};

export const routes: FastifyPluginAsync = async (fastify) => {
  fastify.register(publicRoutes);
  fastify.register(privateRoutes);
};

import { FastifyPluginAsync } from "fastify";
import { SignUpController } from "../controllers/auth/SignUpController";
import { SignInController } from "../controllers/auth/SignInController";

export const authRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.post("/signup", SignUpController.handler);
  fastify.post("/signin", SignInController.handler);
};

import { FastifyPluginAsync } from "fastify";
import { signupController } from "../controllers/auth/SignUpController";

export const routes: FastifyPluginAsync = async (fastify) => {
  fastify.post("/auth/signup", signupController.handler);
};

import { FastifyPluginAsync } from "fastify";
import { SwitchOrganizationController } from "../controllers/organizations/SwitchOrganizationController";

export const organizations: FastifyPluginAsync = async (fastify) => {
  fastify.post("/:organizationId/switch", SwitchOrganizationController.handler);
};

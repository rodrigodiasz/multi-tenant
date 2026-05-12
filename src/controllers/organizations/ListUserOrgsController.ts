import { FastifyRequest} from "fastify";
import { OrganizationsRepository } from "../../repositories/OrganizationsRepository";

export class ListUserOrgsController {
  constructor(private readonly organizationsRepo: OrganizationsRepository) {}
  async handler(request: FastifyRequest) {
    const { sub: userId } = request.user;

    const organizations = await this.organizationsRepo.findOrgsByUserId(userId);

    return {
      organizations,
    };
  }
}

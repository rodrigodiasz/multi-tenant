import { OrganizationsRepository } from "../../repositories/OrganizationsRepository";

export class ListOrgUsersController {
  constructor(private readonly orgsRepo: OrganizationsRepository) {}
  async handler() {
    const users = await this.orgsRepo.findOrgUsers();

    return {
      users,
    };
  }
}

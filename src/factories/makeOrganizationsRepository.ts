import { OrganizationsRepository } from "../repositories/OrganizationsRepository";

export function makeOrganizationsRepository(organizationId?: string) {
  return new OrganizationsRepository(organizationId);
}
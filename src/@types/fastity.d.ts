import  'fastify';
import { OrganizationRole } from '@prisma/client';

declare module 'fastify'{
  interface FastifyRequest{
    OrganizationUser: {
      userId: string;
      organizationId: string;
      role: OrganizationRole;
    }
  }
}
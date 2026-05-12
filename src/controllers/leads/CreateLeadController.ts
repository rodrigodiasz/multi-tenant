import { FastifyRequest, FastifyReply } from "fastify";
import { db } from "../../lib/db";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(1),
  email: z.string().email().min(1),
  phone: z.string().min(1),
  });

export class CreateLeadController {
  static async handler(request: FastifyRequest, reply: FastifyReply) {
    const { name, email, phone } = schema.parse(request.body);
    const { organizationId } = request.organizationUser;

    const lead = await db.lead.create({
      data: {
        name,
        email,    
        phone,
        organizationId,
      },
    });
  reply.code(201).send({lead})
  }
}

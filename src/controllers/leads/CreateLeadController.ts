import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { LeadsRepository } from "../../repositories/LeadsRepository";

const schema = z.object({
  name: z.string().min(1),
  email: z.string().email().min(1),
  phone: z.string().min(1),
  });

export class CreateLeadController {
  constructor(private readonly leadsRepo: LeadsRepository) {}

  async handler(request: FastifyRequest, reply: FastifyReply) {
    const { name, email, phone } = schema.parse(request.body);

    const lead = await this.leadsRepo.create(
      {
        name,
        email,
        phone,
      }
    );

  reply.code(201).send({lead})
  }
}

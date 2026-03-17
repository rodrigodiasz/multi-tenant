import { FastifyRequest, FastifyReply } from "fastify";

export class ListLeadsController {
  static async handler(request: FastifyRequest, reply: FastifyReply) {
    return {
      leads: [],
    };
  }
}

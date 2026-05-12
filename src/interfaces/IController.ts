import { FastifyRequest, FastifyReply } from "fastify";

export interface IController<T> {
  handle(request: FastifyRequest, reply: FastifyReply): Promise<unknown>;
}
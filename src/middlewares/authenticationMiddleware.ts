import { FastifyReply, FastifyRequest } from "fastify";

export async function authenticationMiddleware(request: FastifyRequest, reply: FastifyReply) {
  try {
    await request.jwtVerify();
  } catch {
    reply.code(401).send({ error: 'Invalid access token' });
  }
}

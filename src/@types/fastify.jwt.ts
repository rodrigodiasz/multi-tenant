import "@fastify/jwt";

declare module "@fastify/jwt" {
  type Payload = {
    payload: {
      sub: string;
    };
  }
  interface FastifyJWT {
    payload: Payload;
    user: Payload;
  }
}

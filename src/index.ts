import Fastify from "fastify";
import { routes } from "./routes";
import { ZodError } from "zod";

const fastify = Fastify();

fastify.register(routes);

fastify.setErrorHandler((error, request, reply) => {
  if (error instanceof ZodError) {
    reply.code(400).send({ errors: error.issues });
  }

  console.log(error);
  reply.code(500).send({ message: "Internal server error" });
});

fastify
  .listen({ port: 3001 })
  .then(() => console.log("Server is running on port 3001"));

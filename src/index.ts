import cors from "@elysiajs/cors";
import swagger from "@elysiajs/swagger";
import { Elysia } from "elysia";
import { env } from "./config/env";
import v1Controller from "./controller/v1.controller";
import ApiError from "./lib/error";

export const app = new Elysia()
  .use(cors())
  .use(
    swagger({
      path: "/docs",
      autoDarkMode: true,
      documentation: {
        info: {
          title: "ArtSpace API",
          version: "1.0.0",
          description: "ArtSpace API",
        },
      },
    })
  )
  .error({
    ApiError,
  })
  .onError(({ error, code }) => {
    if (code === "VALIDATION") {
      return {
        message: "VALIDATION_ERROR",
        payload: { errors: error.all },
      };
    }

    return {
      message: error.message,
      payload: null,
    };
  })
  .onAfterResponse(({ request, route, set }) => {
    const now = new Date();
    console.log(
      `[${now.getHours()}:${now.getMinutes()}] ${request.method} ${route} - ${
        set.status
      }`
    );
  })
  .group("/api", (api) => api.use(v1Controller))
  .listen(env.APP_PORT);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);

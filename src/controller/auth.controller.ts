import Elysia, { t } from "elysia";
import {
  loginRequestBody,
  loginResponse,
  logoutRequestCookie,
  logoutResponse,
  registerRequestBody,
  registerResponse,
} from "../dto/auth.dto";
import { UnauthorizedError } from "../lib/error";
import { sessionMiddleware } from "../middleware/session.middleware";
import { AuthService } from "../service/auth.service";
import { SessionService } from "../service/session.service";

const AuthController = new Elysia({
  prefix: "/auth",
})
  .decorate("authService", new AuthService())
  .post(
    "/register",
    async ({ authService, set, body }) => {
      const res = await authService.register(body);

      set.status = 201;

      return {
        payload: res,
        message: "REGISTER_SUCCESS",
      };
    },
    {
      detail: {
        tags: ["Auth"],
        summary: "Register",
        description: "Register a user",
      },
      body: registerRequestBody,
      response: {
        201: t.Object({
          payload: registerResponse,
          message: t.String(),
        }),
      },
    }
  )
  .post(
    "/login",
    async ({ authService, set, body }) => {
      const res = await authService.login(body);

      set.status = 200;

      return {
        payload: res,
        message: "LOGIN_SUCCESS",
      };
    },
    {
      detail: {
        tags: ["Auth"],
        summary: "Login",
        description: "Login a user",
      },
      body: loginRequestBody,
      response: {
        200: t.Object({
          payload: loginResponse,
          message: t.String(),
        }),
      },
    }
  )
  .derive(sessionMiddleware)
  .post(
    "/logout",
    async ({ authService, set, cookie: { session } }) => {
      const res = await authService.logout({
        session: session.value,
      });

      set.status = 200;

      return {
        payload: res,
        message: "LOGOUT_SUCCESS",
      };
    },
    {
      detail: {
        tags: ["Auth"],
        summary: "Logout",
        description: "Logout a user",
      },
      cookie: logoutRequestCookie,
      response: {
        200: t.Object({
          payload: logoutResponse,
          message: t.String(),
        }),
      },
    }
  );

export default AuthController;

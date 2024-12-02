import { t } from "elysia";

export const registerRequestBody = t.Object({
  full_name: t.String({
    minLength: 1,
    description: "Full name",
    error: {
      minLength: "Full name is required",
    },
  }),
  email: t.String({
    format: "email",
    minLength: 1,
    description: "Email address",
    error: {
      minLength: "Email is required",
      format: "Email must be a valid email address",
    },
  }),
  password: t.String({
    minLength: 8,
    description: "Password",
    error: {
      minLength: "Password must be at least 8 characters",
    },
  }),
});

export type RegisterRequestBody = typeof registerRequestBody.static;

export const registerResponse = t.Object({
  id: t.String(),
});

export type RegisterResponse = typeof registerResponse.static;

export const loginRequestBody = t.Object({
  email: t.String({
    format: "email",
    minLength: 1,
    description: "Email address",
    error: {
      minLength: "Email is required",
      format: "Email must be a valid email address",
    },
  }),
  password: t.String({
    minLength: 8,
    description: "Password",
    error: {
      minLength: "Password must be at least 8 characters",
    },
  }),
});

export type LoginRequestBody = typeof loginRequestBody.static;

export const loginResponse = t.Object({
  session: t.String(),
});

export type LoginResponse = typeof loginResponse.static;

export const logoutRequestCookie = t.Cookie({
  session: t.String({
    minLength: 1,
    description: "Session ID",
    error: {
      minLength: "Session is required",
    },
  }),
});

export type LogoutRequestCookie = typeof logoutRequestCookie.static;

export const logoutResponse = t.Object({});

export type LogoutResponse = typeof logoutResponse.static;

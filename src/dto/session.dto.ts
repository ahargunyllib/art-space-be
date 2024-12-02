import { t } from "elysia";

export const getSessionRequestBody = t.Object({
  session: t.String({
    minLength: 1,
    description: "Session ID",
    error: {
      minLength: "Session is required",
    },
  }),
});

export type GetSessionRequestBody = typeof getSessionRequestBody.static;

export const getSessionResponseBody = t.Object({
  user: t.Object({
    id: t.String(),
    full_name: t.String(),
    email: t.String(),
    role: t.Enum({
      admin: "admin",
      user: "user",
    }),
  }),
});

export type GetSessionResponseBody = typeof getSessionResponseBody.static;

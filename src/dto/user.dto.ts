import { t } from "elysia";

export const getUsersRequestParams = t.Object({});

export type GetUsersRequestParams = typeof getUsersRequestParams.static;

export const getUsersResponse = t.Object({
  users: t.Array(
    t.Object({
      id: t.String({
        format: "uuid",
        minLength: 1,
        description: "User ID",
        error: {
          minLength: "User ID is required",
          format: "User ID must be a valid UUID",
        },
      }),
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
      role: t.Enum(
        {
          admin: "admin",
          user: "user",
        },
        {
          description: "User role",
          error: {
            enum: "Role must be either 'admin' or 'user'",
          },
        }
      ),
    })
  ),
});

export type GetUsersResponse = typeof getUsersResponse.static;

export const getUserRequestParams = t.Object({
  id: t.String({
    format: "uuid",
    minLength: 1,
    description: "User ID",
    error: {
      minLength: "User ID is required",
      format: "User ID must be a valid UUID",
    },
  }),
});

export type GetUserRequestParams = typeof getUserRequestParams.static;

export const getUserResponse = t.Object({
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

export type GetUserResponse = typeof getUserResponse.static;

export const createUserRequestBody = t.Object({
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
      format: "Email must be a valid email address",
      minLength: "Email is required",
    },
  }),
  password: t.String({
    minLength: 8,
    description: "Password",
    error: {
      minLength: "Password must be at least 8 characters",
    },
  }),
  role: t.Enum(
    {
      admin: "admin",
      user: "user",
    },
    {
      description: "User role",
      error: {
        enum: "Role must be either 'admin' or 'user'",
      },
    }
  ),
});

export type CreateUserRequestBody = typeof createUserRequestBody.static;

export const createUserResponse = t.Object({
  id: t.String(),
});

export type CreateUserResponse = typeof createUserResponse.static;

export const updateUserRequestBody = t.Object({
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
      format: "Email must be a valid email address",
      minLength: "Email is required",
    },
  }),
  password: t.String({
    minLength: 8,
    description: "Password",
    error: {
      minLength: "Password must be at least 8 characters",
    },
  }),
  role: t.Enum(
    {
      admin: "admin",
      user: "user",
    },
    {
      description: "User role",
      error: {
        enum: "Role must be either 'admin' or 'user'",
      },
    }
  ),
});

export type UpdateUserRequestBody = typeof updateUserRequestBody.static;

export const updateUserRequestParams = t.Object({
  id: t.String(),
});

export type UpdateUserRequestParams = typeof updateUserRequestParams.static;

export const updateUserResponse = t.Object({
  id: t.String(),
});

export type UpdateUserResponse = typeof updateUserResponse.static;

export const deleteUserRequestParams = t.Object({
  id: t.String({
    format: "uuid",
    minLength: 1,
    description: "User ID",
    error: {
      minLength: "User ID is required",
      format: "User ID must be a valid UUID",
    },
  }),
});

export type DeleteUserRequestParams = typeof deleteUserRequestParams.static;

export const deleteUserResponse = t.Object({
  id: t.String(),
});

export type DeleteUserResponse = typeof deleteUserResponse.static;

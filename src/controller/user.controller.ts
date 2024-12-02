import Elysia, { t } from "elysia";
import {
  createUserRequestBody,
  createUserResponse,
  deleteUserRequestParams,
  deleteUserResponse,
  getUserRequestParams,
  getUserResponse,
  getUsersResponse,
  updateUserRequestBody,
  updateUserRequestParams,
  updateUserResponse,
} from "../dto/user.dto";
import { sessionMiddleware } from "../middleware/session.middleware";
import { UserService } from "../service/user.service";

const UserController = new Elysia({
  prefix: "/users",
})
  .decorate("userService", new UserService())
  // .derive(sessionMiddleware)
  .get(
    "/",
    async ({ userService, set }) => {
      const res = await userService.getUsers({});

      set.status = 200;

      return {
        payload: res,
        message: "GET_USERS_SUCCESS",
      };
    },
    {
      detail: {
        tags: ["User"],
        summary: "Get users",
        description: "Get all users",
      },
      response: {
        200: t.Object({
          payload: getUsersResponse,
          message: t.String(),
        }),
      },
    }
  )
  .get(
    "/:id",
    async ({ userService, set, params: { id } }) => {
      const res = await userService.getUser({ id });

      set.status = 200;

      return {
        payload: res,
        message: "GET_USER_SUCCESS",
      };
    },
    {
      detail: {
        tags: ["User"],
        summary: "Get user",
        description: "Get a user",
      },
      params: getUserRequestParams,
      response: {
        200: t.Object({
          payload: getUserResponse,
          message: t.String(),
        }),
      },
    }
  )
  .post(
    "/",
    async ({ userService, set, body }) => {
      const res = await userService.createUser(body);

      set.status = 201;

      return {
        payload: res,
        message: "CREATE_USER_SUCCESS",
      };
    },
    {
      detail: {
        tags: ["User"],
        summary: "Create user",
        description: "Create a user",
      },
      body: createUserRequestBody,
      response: {
        201: t.Object({
          payload: createUserResponse,
          message: t.String(),
        }),
      },
    }
  )
  .put(
    "/:id",
    async ({ userService, set, body, params }) => {
      const res = await userService.updateUser(body, { id: params.id });

      set.status = 200;

      return {
        payload: res,
        message: "UPDATE_USER_SUCCESS",
      };
    },
    {
      detail: {
        tags: ["User"],
        summary: "Update user",
        description: "Update a user",
      },
      body: updateUserRequestBody,
      params: updateUserRequestParams,
      response: {
        200: t.Object({
          payload: updateUserResponse,
          message: t.String(),
        }),
      },
    }
  )
  .delete(
    "/:id",
    async ({ userService, set, params }) => {
      const res = await userService.deleteUser({ id: params.id });

      set.status = 200;

      return {
        payload: res,
        message: "DELETE_USER_SUCCESS",
      };
    },
    {
      detail: {
        tags: ["User"],
        summary: "Delete user",
        description: "Delete a user",
      },
      params: deleteUserRequestParams,
      response: {
        200: t.Object({
          payload: deleteUserResponse,
          message: t.String(),
        }),
      },
    }
  );

export default UserController;

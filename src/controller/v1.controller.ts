import Elysia from "elysia";
import AuthController from "./auth.controller";
import UserController from "./user.controller";

const v1Controller = new Elysia({
  prefix: "/v1",
})
  .use(UserController)
  .use(AuthController);

export default v1Controller;

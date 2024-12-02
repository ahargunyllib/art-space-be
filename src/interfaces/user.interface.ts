import {
  CreateUserRequestBody,
  CreateUserResponse,
  DeleteUserRequestParams,
  DeleteUserResponse,
  GetUserRequestParams,
  GetUserResponse,
  GetUsersRequestParams,
  GetUsersResponse,
  UpdateUserRequestBody,
  UpdateUserRequestParams,
  UpdateUserResponse,
} from "../dto/user.dto";
import UserEntity from "../model/user.model";

export interface IUserRepository {
  findUsers(
    limit?: number,
    offset?: number,
    column?: string,
    direction?: string
  ): Promise<Omit<UserEntity, "password">[]>;
  findUser(query: string): Promise<UserEntity | null>;
  createUser(
    user: Omit<UserEntity, "created_at" | "updated_at">
  ): Promise<Pick<UserEntity, "id">>;
  updateUser(
    user: Omit<UserEntity, "created_at">
  ): Promise<Pick<UserEntity, "id">>;
  deleteUser(user: Pick<UserEntity, "id">): Promise<Pick<UserEntity, "id">>;
}

export interface IUserService {
  getUsers(params: GetUsersRequestParams): Promise<GetUsersResponse>;
  getUser(params: GetUserRequestParams): Promise<GetUserResponse>;
  createUser(req: CreateUserRequestBody): Promise<CreateUserResponse>;
  updateUser(
    req: UpdateUserRequestBody,
    params: UpdateUserRequestParams
  ): Promise<UpdateUserResponse>;
  deleteUser(params: DeleteUserRequestParams): Promise<DeleteUserResponse>;
}

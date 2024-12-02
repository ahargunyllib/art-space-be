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
import { IUserRepository, IUserService } from "../interfaces/user.interface";
import { ConflictError, NotFoundError } from "../lib/error";
import { hashPassword } from "../lib/password";
import { generateUUID } from "../lib/uuid";
import { UserRepository } from "../repository/user.repository";

export class UserService implements IUserService {
  private userRepository: IUserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async getUsers(params: GetUsersRequestParams): Promise<GetUsersResponse> {
    const users = await this.userRepository.findUsers();

    const res: GetUsersResponse = {
      users,
    };

    return res;
  }

  async getUser(params: GetUserRequestParams): Promise<GetUserResponse> {
    const query = `WHERE id = '${params.id}'`;

    const user = await this.userRepository.findUser(query);
    if (!user) {
      throw NotFoundError;
    }

    const res: GetUserResponse = {
      user,
    };

    return res;
  }

  async createUser(req: CreateUserRequestBody): Promise<CreateUserResponse> {
    const userWithSameEmail = await this.userRepository.findUser(
      `WHERE email = '${req.email}'`
    );
    if (userWithSameEmail) {
      throw ConflictError;
    }

    const hashedPassword = await hashPassword(req.password);

    const id = generateUUID();

    const user = await this.userRepository.createUser({
      id: id,
      email: req.email,
      full_name: req.full_name,
      password: hashedPassword,
      role: req.role,
    });

    const res: CreateUserResponse = {
      id: user.id,
    };

    return res;
  }

  async updateUser(
    req: UpdateUserRequestBody,
    params: UpdateUserRequestParams
  ): Promise<UpdateUserResponse> {
    const userWithSameId = await this.userRepository.findUser(
      `WHERE id = '${params.id}'`
    );
    if (!userWithSameId) {
      throw NotFoundError;
    }

    const userWithSameEmail = await this.userRepository.findUser(
      `WHERE email = '${req.email}' AND id != '${params.id}'`
    );
    if (userWithSameEmail) {
      throw ConflictError;
    }

    const hashedPassword = await hashPassword(req.password);

    const user = await this.userRepository.updateUser(
      {
        id: params.id,
        email: req.email,
        full_name: req.full_name,
        password: hashedPassword,
        role: req.role,
        updated_at: new Date(),
      },
    );

    const res: UpdateUserResponse = {
      id: user.id,
    };

    return res;
  }

  async deleteUser(
    params: DeleteUserRequestParams
  ): Promise<DeleteUserResponse> {
    const userWithSameId = await this.userRepository.findUser(
      `WHERE id = '${params.id}'`
    );
    if (!userWithSameId) {
      throw NotFoundError;
    }

    const user = await this.userRepository.deleteUser({
      id: params.id,
    });

    const res: DeleteUserResponse = {
      id: user.id,
    };

    return res;
  }
}

import {
  LoginRequestBody,
  LoginResponse,
  LogoutRequestCookie,
  LogoutResponse,
  RegisterRequestBody,
  RegisterResponse,
} from "../dto/auth.dto";
import { IAuthService } from "../interfaces/auth.interface";
import { ISessionRepository } from "../interfaces/session.interface";
import { IUserRepository } from "../interfaces/user.interface";
import {
  ConflictError,
  SessionNotFound,
  WrongCredentialsError,
} from "../lib/error";
import { hashPassword, verifyPassword } from "../lib/password";
import { generateUUID } from "../lib/uuid";
import { SessionRepository } from "../repository/session.repository";
import { UserRepository } from "../repository/user.repository";

export class AuthService implements IAuthService {
  private sessionRepository: ISessionRepository;
  private userRepository: IUserRepository;

  constructor() {
    this.sessionRepository = new SessionRepository();
    this.userRepository = new UserRepository();
  }

  async register(req: RegisterRequestBody): Promise<RegisterResponse> {
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
      role: "user",
    });

    const res: RegisterResponse = {
      id: user.id,
    };

    return res;
  }

  async login(req: LoginRequestBody): Promise<LoginResponse> {
    const user = await this.userRepository.findUser(
      `WHERE email = '${req.email}'`
    );
    if (!user) {
      throw WrongCredentialsError;
    }

    const isPasswordMatch = await verifyPassword(req.password, user.password);
    if (!isPasswordMatch) {
      throw WrongCredentialsError;
    }

    const id = generateUUID();
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 24);

    const returnedSession = await this.sessionRepository.createSession({
      id: id,
      user_id: user.id,
      expires_at: expiresAt,
    });

    const res: LoginResponse = {
      session: returnedSession.id,
    };

    return res;
  }

  async logout(req: LogoutRequestCookie): Promise<LogoutResponse> {
    const session = await this.sessionRepository.findSessionById({
      id: req.session,
    });

    if (!session) {
      throw SessionNotFound;
    }

    const _ = await this.sessionRepository.deleteSession({
      id: req.session,
    });

    const res: LogoutResponse = {};

    return res;
  }
}

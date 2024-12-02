import {
  LoginRequestBody,
  LoginResponse,
  LogoutRequestCookie,
  LogoutResponse,
  RegisterRequestBody,
  RegisterResponse,
} from "../dto/auth.dto";

export interface IAuthService {
  register(req: RegisterRequestBody): Promise<RegisterResponse>;
  login(req: LoginRequestBody): Promise<LoginResponse>;
  logout(req: LogoutRequestCookie): Promise<LogoutResponse>;
}

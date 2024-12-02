import {
  GetSessionRequestBody,
  GetSessionResponseBody,
} from "../dto/session.dto";
import {
  ISessionRepository,
  ISessionService,
} from "../interfaces/session.interface";
import { SessionExpired, UnauthorizedError } from "../lib/error";
import { SessionRepository } from "../repository/session.repository";

export class SessionService implements ISessionService {
  private sessionRepository: ISessionRepository;

  constructor() {
    this.sessionRepository = new SessionRepository();
  }

  async getSession(
    req: GetSessionRequestBody
  ): Promise<GetSessionResponseBody> {
    const session = await this.sessionRepository.findSessionById({
      id: req.session,
    });

    if (!session) {
      throw UnauthorizedError;
    }

    const now = new Date();
    if (session.expires_at < now) {
      await this.sessionRepository.deleteSession({ id: session.id });
      throw SessionExpired;
    }

    const res: GetSessionResponseBody = {
      user: {
        id: session.user_id,
        full_name: session.full_name,
        email: session.email,
        role: session.role,
      },
    };

    return res;
  }
}

import {
  GetSessionRequestBody,
  GetSessionResponseBody,
} from "../dto/session.dto";
import SessionEntity from "../model/session.model";

export interface ISessionRepository {
  findSessionById(session: Pick<SessionEntity, "id">): Promise<SessionEntity | null>;
  createSession(
    session: Omit<SessionEntity, "created_at" | "full_name" | "email" | "role">
  ): Promise<Pick<SessionEntity, "id">>;
  deleteSession(
    session: Pick<SessionEntity, "id">
  ): Promise<Pick<SessionEntity, "id">>;
}

export interface ISessionService {
  getSession(req: GetSessionRequestBody): Promise<GetSessionResponseBody>;
}

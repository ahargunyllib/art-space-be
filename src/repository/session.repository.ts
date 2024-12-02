import { sql } from "drizzle-orm";
import { QueryResult } from "pg";
import db from "../config/db";
import { ISessionRepository } from "../interfaces/session.interface";
import SessionEntity from "../model/session.model";
export class SessionRepository implements ISessionRepository {
  async findSessionById(
    session: Pick<SessionEntity, "id">
  ): Promise<SessionEntity | null> {
    const statement = sql.raw(`
      SELECT
        sessions.id,
        sessions.user_id,
        sessions.created_at,
        sessions.expires_at,
        users.id as user_id,
        users.full_name,
        users.email,
        users.role
      FROM sessions
      LEFT JOIN users ON sessions.user_id = users.id
      WHERE sessions.id = '${session.id}'
    `);
    const res: QueryResult<SessionEntity> = await db.execute(statement);

    if (res.rowCount === 0) {
      return null;
    }

    const returnedSession = res.rows[0];

    return returnedSession;
  }

  async createSession(
    session: Omit<SessionEntity, "created_at" | "full_name" | "email" | "role">
  ): Promise<Pick<SessionEntity, "id">> {
    const statement = sql.raw(`
      INSERT INTO sessions (id, user_id, expires_at)
      VALUES ('${session.id}', '${
      session.user_id
    }', '${session.expires_at.toISOString()}')
      RETURNING id
    `);

    const res: QueryResult<Pick<SessionEntity, "id">> = await db.execute(
      statement
    );

    return res.rows[0];
  }

  async deleteSession(
    session: Pick<SessionEntity, "id">
  ): Promise<Pick<SessionEntity, "id">> {
    const statement = sql.raw(`
      DELETE FROM sessions
      WHERE id = '${session.id}'
      RETURNING id
    `);

    const res: QueryResult<Pick<SessionEntity, "id">> = await db.execute(
      statement
    );

    const deletedSession = res.rows[0];

    return deletedSession;
  }
}

import { sql } from "drizzle-orm";
import { QueryResult } from "pg";
import db from "../config/db";
import { IUserRepository } from "../interfaces/user.interface";
import UserEntity from "../model/user.model";

export class UserRepository implements IUserRepository {
  async findUsers(
    limit: number = 10,
    offset: number = 0,
    column: "created_at" = "created_at",
    direction: "DESC" | "ASC" = "DESC"
  ): Promise<Omit<UserEntity, "password">[]> {
    const statement = sql.raw(`
    SELECT *
    FROM users
    ORDER BY ${column} ${direction} LIMIT ${limit} OFFSET ${offset}
    `);
    const res: QueryResult<UserEntity> = await db.execute(statement);

    const users = res.rows;

    return users;
  }

  async findUser(query: string): Promise<UserEntity | null> {
    const statement = sql.raw(`
    SELECT *
    FROM users
    ${query}
    LIMIT 1
    `);
    const res: QueryResult<UserEntity> = await db.execute(statement);

    if (res.rowCount === 0) {
      return null;
    }

    const user = res.rows[0];

    return user;
  }

  async createUser({
    id,
    full_name,
    email,
    password,
    role,
  }: Omit<UserEntity, "created_at" | "updated_at">): Promise<
    Pick<UserEntity, "id">
  > {
    const statement = sql.raw(`
    INSERT INTO users (id, full_name, email, password, role)
    VALUES ('${id}', '${full_name}', '${email}', '${password}', '${role}')
    RETURNING id, password
    `);

    const res: QueryResult<Pick<UserEntity, "id">> = await db.execute(
      statement
    );

    const returnedId = res.rows[0];

    return returnedId;
  }

  async updateUser({
    id,
    full_name,
    email,
    password,
    role,
  }: Omit<UserEntity, "created_at">): Promise<Pick<UserEntity, "id">> {
    const statement = sql.raw(`
    UPDATE users
    SET full_name = '${full_name}', email = '${email}', password = '${password}', role = '${role}', updated_at = now()
    WHERE id = '${id}'
    RETURNING id
    `);

    const res: QueryResult<Pick<UserEntity, "id">> = await db.execute(
      statement
    );

    const returnedId = res.rows[0];

    return returnedId;
  }

  async deleteUser(
    user: Pick<UserEntity, "id">
  ): Promise<Pick<UserEntity, "id">> {
    const statement = sql.raw(`
    DELETE FROM users
    WHERE id = '${user.id}'
    RETURNING id
    `);
    const res: QueryResult<Pick<UserEntity, "id">> = await db.execute(
      statement
    );

    const returnedId = res.rows[0];

    return returnedId;
  }
}

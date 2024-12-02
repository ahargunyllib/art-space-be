import { Context } from "elysia";
import { UnauthorizedError } from "../lib/error";
import { SessionService } from "../service/session.service";

export async function sessionMiddleware({ cookie: { session } }: Context) {
  if (!session?.value) {
    throw UnauthorizedError;
  }

  const sessionService = new SessionService();

  const { user } = await sessionService.getSession({
    session: session.value,
  });

  return {
    user,
  };
}

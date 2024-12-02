export default class ApiError extends Error {
  public status: number;

  constructor(status: number, public message: string) {
    super(message);
    this.status = status;
  }
}

export const NotFoundError = new ApiError(404, "Not found");
export const AnomalyError = new ApiError(500, "Anomaly error");
export const DatabaseError = new ApiError(500, "Database error");
export const ValidationError = new ApiError(400, "Validation error");
export const UnauthorizedError = new ApiError(401, "Unauthorized");
export const ForbiddenError = new ApiError(403, "Forbidden");
export const InternalServerError = new ApiError(500, "Internal server error");
export const ConflictError = new ApiError(409, "Conflict");
export const WrongCredentialsError = new ApiError(401, "Wrong credentials");
export const SessionNotFound = new ApiError(401, "Session not found");
export const SessionExpired = new ApiError(401, "Session expired");

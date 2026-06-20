export class AppError extends Error {
  constructor(error, statusCode) {
    super(error)
    this.statusCode = statusCode
    this.isOperational = true;
  }
}

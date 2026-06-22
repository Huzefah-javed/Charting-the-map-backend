import { AppError } from "../utils/errorClass.js";

export const validationCheck = (schema) => {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      const message = result.error.issues.map((issue) => {
        const fieldName = issue.path.join('.'); 
        return `${fieldName}: ${issue.message}`;
      })
      .join(', ');
      return next(new AppError(message,400));
    }
    req.body = result.data
    next()
  };
};

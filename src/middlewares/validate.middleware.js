import { ZodError } from "zod";

const validate = (schema) => {
  return async (req, res, next) => {
    try {
      const validatedData = await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      req.body = validatedData.body;

      req.validated = {
        params: validatedData.params,
        query: validatedData.query,
      };

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          success: false,
          message: "Validation failed",
          errors: error.issues.map((issue) => ({
            field: issue.path.slice(1).join("."),
            message: issue.message,
          })),
        });
      }

      next(error);
    }
  };
};

export default validate;

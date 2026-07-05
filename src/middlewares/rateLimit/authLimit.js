import rateLimit from "express-rate-limit";

import createRateLimitStore from "../../configs/rateLimit.config.js";

const authLimiter = rateLimit({
  store: createRateLimitStore(
    "rate-limit:auth:"
  ),

  windowMs: 15 * 60 * 1000,

  limit: 20,

  standardHeaders: "draft-8",

  legacyHeaders: false,

  handler: (req, res) => {
    res.status(429).json({
      success: false,

      message: "Too many authentication attempts",
    });
  },
});

export default authLimiter;

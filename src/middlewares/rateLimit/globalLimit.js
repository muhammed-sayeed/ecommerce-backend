import rateLimit from "express-rate-limit";

import createRateLimitStore from "../../configs/rateLimit.config.js";

const globalLimiter = rateLimit({
  store: createRateLimitStore("rate-limit:global:"),

  windowMs: 15 * 60 * 1000,

  limit: 300,

  standardHeaders: "draft-8",

  legacyHeaders: false,

  handler: (req, res) => {
    res.status(429).json({
      success: false,

      message: "Too many requests. Please try again later.",
    });
  },
});

export default globalLimiter;

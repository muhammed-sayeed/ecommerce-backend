import pino from "pino";

import appConfig from "../configs/app.config.js";

const logger = pino({
  level: appConfig.env === "production" ? "info" : "debug",

  transport:
    appConfig.env !== "production"
      ? {
          target: "pino-pretty",
          options: {
            colorize: true,
            translateTime: "SYS:standard",
          },
        }
      : undefined,
});

export default logger;

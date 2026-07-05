import { RedisStore } from "rate-limit-redis";

import redisClient from "./redis.config.js";

const createRateLimitStore = (prefix) => {
  return new RedisStore({
    prefix,

    sendCommand: (...args) => redisClient.sendCommand(args),
  });
};

export default createRateLimitStore;

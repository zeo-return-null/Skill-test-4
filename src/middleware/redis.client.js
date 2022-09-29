import { createClient } from "redis";

import { REDIS_URL } from "../config.js";

export const client = createClient({
  url: REDIS_URL,
});


import redis from "@/database/redis";
import { Ratelimit } from "@upstash/ratelimit";

//invoke ratelimit in upstash for some request or api call
const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.fixedWindow(3, "1m"),
  analytics: true,
  prefix: "@upstash/ratelimit",
});

export default ratelimit;

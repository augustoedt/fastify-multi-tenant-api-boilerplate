import pino from "pino";

export const logger = pino({
  redact: ["DATABASE_CONNECTION"],
  level: "debug",
  transport: {
    target: "pino-pretty",
    options: {
      translateTime: "dd/MM - HH:mm:ss",
      ignore: "pid, hostname",
    },
  },
});

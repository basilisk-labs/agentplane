import type { Logger, LoggerWriter } from "@agentplaneorg/core/logger";
import { createLogger } from "@agentplaneorg/core/logger";

export type TraceEvent = {
  component: string;
  event: string;
  details?: Record<string, unknown>;
};

export function isTraceEnabled(env: NodeJS.ProcessEnv = process.env): boolean {
  const raw = env.AGENTPLANE_TRACE?.trim().toLowerCase();
  return raw === "1" || raw === "true" || raw === "yes" || raw === "on";
}

export function emitTraceEvent(
  event: TraceEvent,
  opts?: {
    env?: NodeJS.ProcessEnv;
    logger?: Logger;
    stderr?: LoggerWriter;
  },
): void {
  if (!isTraceEnabled(opts?.env)) return;
  const logger =
    opts?.logger ?? createLogger({ mode: "json", stdout: opts?.stderr, stderr: opts?.stderr });
  logger.write({
    kind: "trace",
    stream: "stderr",
    component: event.component,
    event: event.event,
    details: event.details,
  });
}

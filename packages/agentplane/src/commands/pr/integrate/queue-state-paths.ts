import path from "node:path";

export type IntegrationQueueMutexContext = {
  gitRoot: string;
  locksDir: string;
  lockPath: string;
  queuePath: string;
};

export function integrationQueuePath(gitRoot: string): string {
  return path.join(gitRoot, ".agentplane", "cache", "integration-queue.json");
}

export function resolveIntegrationQueueMutexContext(gitRoot: string): IntegrationQueueMutexContext {
  const locksDir = path.join(gitRoot, ".agentplane", "cache", "locks");
  return {
    gitRoot,
    locksDir,
    lockPath: path.join(locksDir, "integration-queue.lock"),
    queuePath: integrationQueuePath(gitRoot),
  };
}

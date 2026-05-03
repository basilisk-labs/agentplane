import { mkdir, readFile, rm } from "node:fs/promises";
import path from "node:path";

import { defaultConfig, isConfigRecord } from "./defaults.js";
import type { AgentplaneConfig } from "./validation.js";
import {
  stripDeprecatedConfigKeys,
  validateConfig,
  warnDeprecatedConfigKeys,
} from "./validation.js";
import {
  readWorkflowConfigRaw,
  writeWorkflowConfigRaw,
} from "./workflow-file.js";

export type LoadedConfig = {
  path: string;
  exists: boolean;
  config: AgentplaneConfig;
  raw: Record<string, unknown>;
};

function toErrnoException(err: unknown): NodeJS.ErrnoException | null {
  if (!err || typeof err !== "object") return null;
  if (!("code" in err)) return null;
  return err as NodeJS.ErrnoException;
}

export async function loadConfig(agentplaneDir: string): Promise<LoadedConfig> {
  const workflowPath = path.join(agentplaneDir, "WORKFLOW.md");
  const legacyConfigPath = path.join(agentplaneDir, "config.json");
  try {
    const workflowRaw = await readWorkflowConfigRaw(agentplaneDir);
    if (workflowRaw.exists) {
      const sanitized = stripDeprecatedConfigKeys(workflowRaw.raw);
      if (sanitized.removed.length > 0) warnDeprecatedConfigKeys(sanitized.removed);
      const validated = validateConfig(sanitized.sanitized);
      return {
        path: workflowRaw.path,
        exists: true,
        config: validated,
        raw: sanitized.sanitized,
      };
    }
  } catch (err) {
    const errno = toErrnoException(err);
    if (errno?.code !== "ENOENT") throw err;
  }

  try {
    const rawText = await readFile(legacyConfigPath, "utf8");
    const parsed = JSON.parse(rawText) as unknown;
    const rawRecord = isConfigRecord(parsed) ? parsed : null;
    const sanitized = rawRecord
      ? stripDeprecatedConfigKeys(rawRecord)
      : { sanitized: parsed, removed: [] };
    if (sanitized.removed.length > 0) warnDeprecatedConfigKeys(sanitized.removed);
    const validated = validateConfig(sanitized.sanitized);
    return {
      path: legacyConfigPath,
      exists: true,
      config: validated,
      raw: (sanitized.sanitized ?? parsed) as Record<string, unknown>,
    };
  } catch (err) {
    const errno = toErrnoException(err);
    if (errno?.code === "ENOENT") {
      const def = defaultConfig();
      return {
        path: workflowPath,
        exists: false,
        config: def,
        raw: def as unknown as Record<string, unknown>,
      };
    }
    throw err;
  }
}

export async function saveConfig(
  agentplaneDir: string,
  raw: Record<string, unknown>,
): Promise<AgentplaneConfig> {
  const sanitized = stripDeprecatedConfigKeys(raw);
  if (sanitized.removed.length > 0) warnDeprecatedConfigKeys(sanitized.removed);
  const validated = validateConfig(sanitized.sanitized);
  await mkdir(agentplaneDir, { recursive: true });
  await writeWorkflowConfigRaw(agentplaneDir, sanitized.sanitized);
  await rm(path.join(agentplaneDir, "config.json"), { force: true });
  return validated;
}

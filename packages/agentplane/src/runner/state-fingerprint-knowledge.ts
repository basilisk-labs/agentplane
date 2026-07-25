import { createHash } from "node:crypto";
import path from "node:path";

import type { StateFingerprintComponentInput } from "@agentplaneorg/core/schemas";

import { readContainedStableTextNoFollow } from "../shared/contained-stable-file.js";

const KNOWLEDGE_MANIFEST_MAX_BYTES = 16 * 1024 * 1024;

function digestText(text: string): string {
  return `sha256:${createHash("sha256").update(text, "utf8").digest("hex")}`;
}

function unavailableComponent(
  reason_code: string,
  evidence?: unknown,
): StateFingerprintComponentInput {
  return {
    state: "unavailable",
    source: "context_manifest_lock",
    reason_code,
    ...(evidence === undefined ? {} : { evidence }),
  };
}

export async function observeKnowledgeProjection(
  repositoryRoot: string,
): Promise<StateFingerprintComponentInput> {
  const manifestPath = path.join(repositoryRoot, ".agentplane", "context", "manifest.lock.json");
  let manifestText = "";
  try {
    manifestText = await readContainedStableTextNoFollow({
      repository_root: repositoryRoot,
      file_path: manifestPath,
      label: "knowledge manifest lock",
      max_bytes: KNOWLEDGE_MANIFEST_MAX_BYTES,
    });
    JSON.parse(manifestText);
    return {
      state: "present",
      source: "context_manifest_lock",
      value: {
        path: ".agentplane/context/manifest.lock.json",
        initialized: true,
        sha256: digestText(manifestText),
      },
    };
  } catch (error) {
    if (error instanceof SyntaxError) {
      return unavailableComponent("knowledge_manifest_invalid", {
        path: ".agentplane/context/manifest.lock.json",
        sha256: digestText(manifestText),
      });
    }
    if ((error as NodeJS.ErrnoException | null)?.code !== "ENOENT") {
      return unavailableComponent("knowledge_manifest_unreadable");
    }
    try {
      await readContainedStableTextNoFollow({
        repository_root: repositoryRoot,
        file_path: path.join(repositoryRoot, ".agentplane", "context", "agentplane.context.yaml"),
        label: "knowledge manifest",
        max_bytes: KNOWLEDGE_MANIFEST_MAX_BYTES,
      });
      return unavailableComponent("knowledge_manifest_lock_missing");
    } catch (manifestError) {
      if ((manifestError as NodeJS.ErrnoException | null)?.code === "ENOENT") {
        return {
          state: "present",
          source: "context_manifest_lock",
          value: {
            path: ".agentplane/context/manifest.lock.json",
            initialized: false,
            sha256: null,
          },
        };
      }
      return unavailableComponent("knowledge_manifest_unreadable");
    }
  }
}

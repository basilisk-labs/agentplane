import type { TaskData } from "../../../backends/task-backend.js";
import type { PrMeta } from "../../shared/pr-meta.js";
import type { readPrHandoffNotes } from "./note-store.js";
import type { AgentplaneConfig } from "@agentplaneorg/core/config";

export type PrRemoteMode = "auto" | "sync-only";

export type PrOpenOutcome = {
  action: "linked-existing" | "created" | "sync-only" | "staged";
  message: string;
  artifactState?: "open" | "remote_staged" | "remote_failed";
};

export type PrSyncResolved = { gitRoot: string };

export type PrSyncCommonState = {
  task: TaskData;
  resolved: PrSyncResolved;
  workflowDir: string;
  tasksPath: string;
  prDir: string;
  metaPath: string;
  diffstatPath: string;
  notesPath: string;
  verifyLogPath: string;
  reviewPath: string;
  githubTitlePath: string;
  githubBodyPath: string;
  artifactsLanguage: AgentplaneConfig["artifacts_language"];
  existingMeta: PrMeta | null;
  relatedTaskIds: string[];
  handoffNotes: Awaited<ReturnType<typeof readPrHandoffNotes>>;
  now: string;
  createdAt: string;
  branch: string;
  baseBranch: string | null;
  headSha: string | null;
  artifactRefresh: boolean;
  renderUpdatedAt: string;
};

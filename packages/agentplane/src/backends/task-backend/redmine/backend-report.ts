import { canonicalizeJson } from "@agentplaneorg/core/tasks";

import {
  detectConfiguredFieldNameDrift,
  inferVisibleCanonicalStateFieldId,
  inspectVisibleCustomFields,
} from "./inspect.js";
import { type TaskBackendInspectionResult, type TaskData } from "../shared.js";

type RedmineReportContext = {
  projectId: string;
  customFields: Record<string, unknown>;
  requestJson: (
    method: string,
    reqPath: string,
    payload?: Record<string, unknown>,
    params?: Record<string, unknown>,
  ) => Promise<Record<string, unknown>>;
};

export async function inspectRedmineConfiguration(
  context: RedmineReportContext,
): Promise<TaskBackendInspectionResult> {
  const visibleCustomFields = await inspectVisibleCustomFields({
    projectId: context.projectId,
    requestJson: async (method, reqPath, payload, params) =>
      await context.requestJson(method, reqPath, payload, params),
  });
  const visibleCanonicalStateFieldId = inferVisibleCanonicalStateFieldId(visibleCustomFields);
  return {
    backendId: "redmine",
    visibleCustomFields,
    canonicalState: {
      configuredFieldId:
        typeof context.customFields.canonical_state === "number"
          ? context.customFields.canonical_state
          : null,
      visibleFieldId: visibleCanonicalStateFieldId,
    },
    configuredFieldNameDrift: detectConfiguredFieldNameDrift({
      configuredFields: context.customFields,
      visibleFields: visibleCustomFields,
    }),
  };
}

export function diffRedmineTasks(localTask: TaskData, remoteTask: TaskData): string {
  const localText = JSON.stringify(canonicalizeJson(localTask), null, 2).split("\n");
  const remoteText = JSON.stringify(canonicalizeJson(remoteTask), null, 2).split("\n");
  const diff = ["--- remote", "+++ local"];
  const max = Math.max(localText.length, remoteText.length);
  for (let i = 0; i < max; i++) {
    const localLine = localText[i];
    const remoteLine = remoteText[i];
    if (localLine === remoteLine) continue;
    if (remoteLine !== undefined) diff.push(`- ${remoteLine}`);
    if (localLine !== undefined) diff.push(`+ ${localLine}`);
  }
  return diff.join("\n");
}

export function redmineTasksDiffer(localTask: TaskData, remoteTask: TaskData): boolean {
  return (
    JSON.stringify(canonicalizeJson(localTask)) !== JSON.stringify(canonicalizeJson(remoteTask))
  );
}

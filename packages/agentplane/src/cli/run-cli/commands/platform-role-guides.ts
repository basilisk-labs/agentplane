import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

import { isRecord } from "../../../shared/guards.js";
import { renderRole, type RoleProfileGuide } from "../../command-guide.js";

type IdeAgentProfile = {
  id?: string;
  role?: string;
  description?: string;
  inputs?: unknown;
  outputs?: unknown;
  permissions?: unknown;
  workflow?: unknown;
};

function toStringList(value: unknown): string[] {
  const items = Array.isArray(value) ? value : isRecord(value) ? Object.values(value) : [];
  return items
    .map((item) => {
      if (typeof item === "string") return item.trim();
      if (isRecord(item) && typeof item.text === "string") {
        return item.text.trim();
      }
      return "";
    })
    .filter(Boolean);
}

function toRoleProfileGuide(opts: {
  filename: string;
  roleId: string;
  profile: IdeAgentProfile;
}): RoleProfileGuide {
  return {
    filename: opts.filename,
    id: (typeof opts.profile.id === "string" ? opts.profile.id : "").trim() || opts.roleId,
    role: (typeof opts.profile.role === "string" ? opts.profile.role : "").trim(),
    description: (typeof opts.profile.description === "string"
      ? opts.profile.description
      : ""
    ).trim(),
    inputs: toStringList(opts.profile.inputs),
    outputs: toStringList(opts.profile.outputs),
    permissions: toStringList(opts.profile.permissions),
    workflow: toStringList(opts.profile.workflow),
  };
}

export async function renderInstalledRoleGuides(agentplaneDir: string): Promise<string> {
  const agentsDir = path.join(agentplaneDir, "agents");
  let entries: string[] = [];
  try {
    const dirEntries = await readdir(agentsDir);
    entries = dirEntries.filter((entry) => entry.endsWith(".json")).toSorted();
  } catch {
    return "";
  }

  const guides: string[] = [];
  for (const entry of entries) {
    const roleId = entry.replace(/\.json$/i, "");
    const raw = JSON.parse(await readFile(path.join(agentsDir, entry), "utf8")) as IdeAgentProfile;
    const guide = renderRole(roleId, {
      profile: toRoleProfileGuide({
        filename: entry,
        roleId,
        profile: raw,
      }),
    });
    if (guide) guides.push(guide);
  }
  if (guides.length === 0) return "";
  return [
    "",
    "## Synced Role Activation",
    "",
    "- Use `agentplane role ORCHESTRATOR` while planning and approvals are active.",
    "- As soon as a task owner is known, switch to that owner role before owner-scoped execution.",
    "- Do not keep implementation or verification inside ORCHESTRATOR once the task owner is established.",
    "",
    ...guides,
  ].join("\n");
}

import { getRoleSupplementLines, listRoles, renderRole } from "../../../command-guide.js";
import { createCliEmitter } from "../../../output.js";
import { usageError } from "../../../spec/errors.js";
import type { CommandHandler, CommandSpec } from "../../../spec/spec.js";
import { dedupeStrings } from "../../../../shared/strings.js";

import {
  listAgentProfileIds,
  normalizeRoleId,
  readAgentProfile,
  toRoleProfileGuide,
} from "./agent-profiles.js";
import { wrapCommand } from "../wrap-command.js";

const output = createCliEmitter();

type RoleParsed = { role: string; json: boolean };

export const roleSpec: CommandSpec<RoleParsed> = {
  id: ["role"],
  group: "Core",
  summary: "Show role-specific workflow guidance.",
  args: [{ name: "role", required: true, valueHint: "<role>" }],
  options: [
    {
      kind: "boolean",
      name: "json",
      default: false,
      description: "Emit compact machine-readable role payload.",
    },
  ],
  examples: [{ cmd: "agentplane role ORCHESTRATOR", why: "Show ORCHESTRATOR guide." }],
  parse: (raw) => ({ role: String(raw.args.role ?? ""), json: raw.opts.json === true }),
};

async function cmdRole(opts: {
  cwd: string;
  rootOverride?: string;
  role: string;
  json: boolean;
}): Promise<number> {
  return wrapCommand({ command: "role", rootOverride: opts.rootOverride }, async () => {
    const roleRaw = opts.role.trim();
    if (!roleRaw) {
      throw usageError({
        spec: roleSpec,
        command: "role",
        message: "Missing required argument: role",
      });
    }

    const normalizedRole = normalizeRoleId(roleRaw);
    const agentProfile = await readAgentProfile({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride,
      roleId: normalizedRole,
    });
    const normalizedProfile = agentProfile
      ? toRoleProfileGuide({
          filename: agentProfile.filename,
          roleId: normalizedRole,
          profile: agentProfile.profile,
        })
      : null;
    const guide = renderRole(normalizedRole, { profile: normalizedProfile });

    if (!guide && !agentProfile) {
      const builtin = listRoles();
      const agentIds = await listAgentProfileIds({
        cwd: opts.cwd,
        rootOverride: opts.rootOverride,
      });
      const discovered = agentIds ? agentIds.ids : [];
      const availableList = dedupeStrings([...builtin, ...discovered]).toSorted();
      const available =
        availableList.length > 0 ? `\nAvailable roles: ${availableList.join(", ")}` : "";
      throw usageError({
        spec: roleSpec,
        command: "role",
        message: `Unknown role: ${roleRaw}.${available}`,
      });
    }

    if (guide) {
      if (opts.json) {
        const payload: Record<string, unknown> = {
          role: normalizedRole,
          guide: guide
            .split("\n")
            .map((line) => line.trim())
            .filter((line) => line.length > 0),
        };
        const supplementLines = getRoleSupplementLines(normalizedRole);
        if (supplementLines) {
          payload.builtin_guide = supplementLines;
        }
        if (agentProfile) {
          payload.agent_profile = {
            filename: agentProfile.filename,
            profile: agentProfile.profile,
          };
        }
        output.json(payload);
        return 0;
      }
      output.line(guide);
      return 0;
    }

    if (!agentProfile) {
      throw usageError({
        spec: roleSpec,
        command: "role",
        message: `Unknown role: ${roleRaw}.`,
      });
    }

    const block = renderRole(normalizedRole, { profile: normalizedProfile });
    if (!block) {
      throw usageError({
        spec: roleSpec,
        command: "role",
        message: `Unknown role: ${roleRaw}.`,
      });
    }
    if (opts.json) {
      output.json({
        role: normalizedRole,
        guide: block
          .split("\n")
          .map((line) => line.trim())
          .filter((line) => line.length > 0),
        agent_profile: {
          filename: agentProfile.filename,
          profile: agentProfile.profile,
        },
      });
      return 0;
    }
    output.line(block);
    return 0;
  });
}

export const runRole: CommandHandler<RoleParsed> = (ctx, parsed) => {
  return cmdRole({
    cwd: ctx.cwd,
    rootOverride: ctx.rootOverride,
    role: parsed.role,
    json: parsed.json,
  });
};

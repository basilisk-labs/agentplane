import type {
  InitFlags,
  InitIde,
  InitMode,
  InitParsed,
  InitRunnerProfile,
  InitTool,
  SetupProfilePreset,
  UserFacingProfile,
} from "./model.js";
import type { PolicyGatewayFlavor } from "../../../../shared/policy-gateway.js";

export function resolveInitMode(opts: { flags: InitParsed; interactive: boolean }): InitMode {
  if (opts.flags.initMode) return opts.flags.initMode;
  if (opts.flags.yes) return "ci";
  if (!opts.interactive) return "ci";
  return "guided";
}

export function setupProfileToUserFacingProfile(profile: SetupProfilePreset): UserFacingProfile {
  if (profile === "light") return "solo";
  if (profile === "full-harness") return "strict";
  return "team";
}

export function resolveToolDefaults(tool: InitTool | undefined): {
  policyGateway?: PolicyGatewayFlavor;
  ide?: InitIde;
  runnerProfile?: InitRunnerProfile;
} {
  if (!tool || tool === "multiple" || tool === "manual") return {};
  if (tool === "claude") return { policyGateway: "claude", ide: "codex" };
  if (tool === "cursor") return { policyGateway: "codex", ide: "cursor" };
  if (tool === "windsurf") return { policyGateway: "codex", ide: "windsurf" };
  if (tool === "hermes") return { policyGateway: "codex", ide: "none", runnerProfile: "hermes" };
  return { policyGateway: "codex", ide: "codex" };
}

export function resolveRunnerProfileFromFlags(
  flags: Pick<InitFlags, "tool">,
  fallback: InitRunnerProfile,
): InitRunnerProfile {
  return resolveToolDefaults(flags.tool).runnerProfile ?? fallback;
}

export function resolvePolicyGatewayFromFlags(
  flags: Pick<InitFlags, "policyGateway" | "tool">,
  fallback: PolicyGatewayFlavor,
): PolicyGatewayFlavor {
  return flags.policyGateway ?? resolveToolDefaults(flags.tool).policyGateway ?? fallback;
}

export function resolveIdeFromFlags(
  flags: Pick<InitFlags, "ide" | "tool">,
  fallback: InitIde,
): InitIde {
  return flags.ide ?? resolveToolDefaults(flags.tool).ide ?? fallback;
}

import { access } from "node:fs/promises";
import path from "node:path";

export type PolicyGatewayFlavor = "codex" | "claude";
export type PolicyGatewayFileName = "AGENTS.md" | "CLAUDE.md";

export const POLICY_GATEWAY_FILE_BY_FLAVOR: Record<PolicyGatewayFlavor, PolicyGatewayFileName> = {
  codex: "AGENTS.md",
  claude: "CLAUDE.md",
};

export type PolicyGatewayResolution = {
  flavor: PolicyGatewayFlavor;
  fileName: PolicyGatewayFileName;
  absPath: string;
};

async function exists(absPath: string): Promise<boolean> {
  try {
    await access(absPath);
    return true;
  } catch {
    return false;
  }
}

export function policyGatewayFileName(flavor: PolicyGatewayFlavor): PolicyGatewayFileName {
  return POLICY_GATEWAY_FILE_BY_FLAVOR[flavor];
}

export function renderPolicyGatewayTemplateText(
  text: string,
  fileName: PolicyGatewayFileName,
): string {
  const collapsed = text
    .replaceAll("{{POLICY_GATEWAY_FILE}}", fileName)
    .replaceAll("AGENTS.md or CLAUDE.md", fileName)
    .replaceAll("AGENTS.md and CLAUDE.md", fileName)
    .replaceAll("AGENTS.md|CLAUDE.md", fileName);
  if (fileName === "AGENTS.md") return collapsed;
  return collapsed
    .replaceAll("AGENTS.md", "CLAUDE.md")
    .replaceAll("AGENTS_POLICY", "CLAUDE_POLICY");
}

export async function resolvePolicyGatewayForRepo(opts: {
  gitRoot: string;
  fallbackFlavor?: PolicyGatewayFlavor;
}): Promise<PolicyGatewayResolution> {
  const codexPath = path.join(opts.gitRoot, POLICY_GATEWAY_FILE_BY_FLAVOR.codex);
  const claudePath = path.join(opts.gitRoot, POLICY_GATEWAY_FILE_BY_FLAVOR.claude);
  const hasCodex = await exists(codexPath);
  const hasClaude = await exists(claudePath);

  if (hasCodex) {
    return { flavor: "codex", fileName: "AGENTS.md", absPath: codexPath };
  }
  if (hasClaude) {
    return { flavor: "claude", fileName: "CLAUDE.md", absPath: claudePath };
  }

  const fallback = opts.fallbackFlavor ?? "codex";
  const fileName = policyGatewayFileName(fallback);
  return {
    flavor: fallback,
    fileName,
    absPath: path.join(opts.gitRoot, fileName),
  };
}

import type { RunnerRunState } from "./types.js";

function compactRunnerText(value: string): string {
  return value.replaceAll(/\s+/gu, " ").trim();
}

function encodeRunnerManagedText(value: string): string {
  return compactRunnerText(value).replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

export function renderAgentSemanticResult(
  result: RunnerRunState["result"] | null | undefined,
): string[] {
  const report = result?.semantic_result;
  if (!report) return [];
  const semantic = report.value;
  const lines: string[] = [];
  if (semantic.status) {
    lines.push(`AgentSemanticStatus[${report.provenance}]: ${semantic.status}`);
  }
  if (semantic.summary) {
    lines.push(`AgentSummary[${report.provenance}]: ${encodeRunnerManagedText(semantic.summary)}`);
  }
  if (semantic.findings?.length) {
    lines.push(
      `AgentFindings[${report.provenance}]: ${semantic.findings
        .map((finding) => encodeRunnerManagedText(finding))
        .join(" | ")}`,
    );
  }
  if ("uncertainty" in semantic && semantic.uncertainty.length > 0) {
    lines.push(
      `AgentUncertainty[${report.provenance}]: ${semantic.uncertainty
        .map((uncertainty) => encodeRunnerManagedText(uncertainty))
        .join(" | ")}`,
    );
  }
  if (semantic.blocker) {
    lines.push(
      `AgentBlocker[${report.provenance}]: ${encodeRunnerManagedText(semantic.blocker.summary)}${
        semantic.blocker.recommended_action
          ? `; recommended_action=${encodeRunnerManagedText(semantic.blocker.recommended_action)}`
          : ""
      }`,
    );
  }
  if ("knowledge_request" in semantic && semantic.knowledge_request) {
    lines.push(
      `AgentKnowledgeRequest[${report.provenance}]: ${encodeRunnerManagedText(
        semantic.knowledge_request.query,
      )}; reason=${encodeRunnerManagedText(semantic.knowledge_request.reason)}`,
    );
  }
  if ("claimed_checks" in semantic && semantic.claimed_checks?.length) {
    lines.push(
      `ClaimedChecks[${report.provenance}]: ${semantic.claimed_checks
        .map(
          (check) =>
            `${encodeRunnerManagedText(check.check)}=${check.claimed_status}${
              check.details ? ` (${encodeRunnerManagedText(check.details)})` : ""
            }`,
        )
        .join(" | ")}`,
    );
  }
  if (result?.agent_reported_claims?.length) {
    lines.push(
      `LegacyClaims[agent_reported]: ${result.agent_reported_claims
        .map((claim) => encodeRunnerManagedText(claim.field))
        .join(", ")}`,
    );
  }
  if (result?.claim_conflicts?.length) {
    lines.push(
      `ClaimConflicts: ${result.claim_conflicts
        .map((conflict) => encodeRunnerManagedText(conflict.field))
        .join(", ")} (observed_wins over agent_reported)`,
    );
  }
  if (result?.manifest_warnings?.length) {
    lines.push(
      `ManifestWarnings: ${result.manifest_warnings
        .map((warning) =>
          warning.code === "legacy_agent_observed_claim"
            ? `${warning.code}:${encodeRunnerManagedText(warning.field)}`
            : warning.code,
        )
        .join(", ")}`,
    );
  }
  return lines;
}

export function encodeTaskRunnerManagedText(value: string): string {
  return encodeRunnerManagedText(value);
}

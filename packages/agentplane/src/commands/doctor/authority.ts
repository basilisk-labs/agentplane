import type { AgentplaneConfig } from "@agentplaneorg/core/config";

import { renderDiagnosticFinding } from "../shared/diagnostics.js";

export function checkPlanApprovalTransport(config: AgentplaneConfig): string[] {
  const issuers = config.authority.approval_receipts.trusted_issuers;
  if (issuers.length > 0) {
    return [
      renderDiagnosticFinding({
        severity: "INFO",
        state: "plan approval transport is available through host_user_decision and signed_user_receipt",
        likelyCause: `${issuers.length} trusted signed-receipt issuer(s) are configured`,
        details: [
          "Codex may use the host-originated decision packet; remote bridges may use a signed receipt.",
        ],
      }),
    ];
  }
  return [
    renderDiagnosticFinding({
      severity: "INFO",
      state: "local plan approval requires a host-originated user decision",
      likelyCause: "no trusted signed-receipt issuer is configured",
      nextAction: {
        command: "ap task advance <task-id> --agent-json",
        reason:
          "present the emitted host_user_decision request in Codex; use task plan approve --by USER only as explicit manual compatibility",
        reasonCode: "host_user_decision_required",
      },
      details: [
        "Reason code: host_user_decision_required",
        "AgentPlane will not emit an unavailable signed_user_receipt transport.",
        "A managed runner cannot synthesize the user decision and stops at the plan boundary.",
      ],
    }),
  ];
}

import { describe, expect, it } from "vitest";

import { defaultConfig } from "../../cli/core-imports.js";
import { checkPlanApprovalTransport } from "./authority.js";

describe("doctor plan approval transport", () => {
  it("explains the Codex host route when no signed issuer exists", () => {
    const config = defaultConfig();
    config.authority.approval_receipts.trusted_issuers = [];

    expect(checkPlanApprovalTransport(config).join("\n")).toContain(
      "host_user_decision_required",
    );
    expect(checkPlanApprovalTransport(config).join("\n")).toContain(
      "will not emit an unavailable signed_user_receipt transport",
    );
  });

  it("reports both transports when a signed issuer exists", () => {
    const config = defaultConfig();
    config.authority.approval_receipts.trusted_issuers = [
      {
        issuer: "codex-bridge",
        public_key: Buffer.alloc(32).toString("base64url"),
      },
    ];

    expect(checkPlanApprovalTransport(config).join("\n")).toContain(
      "host_user_decision and signed_user_receipt",
    );
  });
});

import { expect } from "vitest";

import { captureStdIO } from "@agentplane/testkit";

import { runCli } from "./run-cli.js";

export async function readRouteFingerprint(root: string, taskId: string): Promise<string> {
  const io = captureStdIO();
  try {
    const code = await runCli(["task", "next-action", taskId, "--json", "--root", root]);
    expect(code, io.stderr).toBe(0);
    const payload = JSON.parse(io.stdout) as {
      workflow_step: { preconditionFingerprint: { digest: string } };
    };
    return payload.workflow_step.preconditionFingerprint.digest;
  } finally {
    io.restore();
  }
}

export async function readRoute(
  root: string,
  taskId: string,
): Promise<{
  workflow_step: {
    kind: string;
    preconditionFingerprint: { digest: string };
    request?: {
      type: string;
      operationId: string;
      operationDigest: string;
      stateFingerprintDigest: string;
      stateScopeDigest: string;
    };
  };
  route_oracle: { phase: string; authoritativeCheckout: string };
}> {
  const io = captureStdIO();
  try {
    const code = await runCli(["task", "next-action", taskId, "--json", "--root", root]);
    expect(code, io.stderr).toBe(0);
    return JSON.parse(io.stdout) as {
      workflow_step: {
        kind: string;
        preconditionFingerprint: { digest: string };
        request?: {
          type: string;
          operationId: string;
          operationDigest: string;
          stateFingerprintDigest: string;
          stateScopeDigest: string;
        };
      };
      route_oracle: { phase: string; authoritativeCheckout: string };
    };
  } finally {
    io.restore();
  }
}

import type { RunnerCustomConfig } from "@agentplaneorg/core/config";
import { vi } from "vitest";
import { CustomRunnerAdapter } from "../../runner/adapters/custom.js";

/** Adapter contract fixture. Real custom processes remain unverified in production. */
export function observeKernelTestRunner(
  config: RunnerCustomConfig | undefined,
  trustedContractDouble: boolean,
) {
  const originalAdapter = new CustomRunnerAdapter(config);
  const originalExecute = originalAdapter.execute.bind(originalAdapter);
  const execute = vi.spyOn(CustomRunnerAdapter.prototype, "execute");
  if (trustedContractDouble) {
    const describe = originalAdapter.describeCapabilities.bind(originalAdapter);
    vi.spyOn(CustomRunnerAdapter.prototype, "describeCapabilities").mockImplementation((bundle) => {
      const capabilities = describe(bundle);
      capabilities.fields.sandbox = {
        level: "native",
        channel: "argv",
        supported_values: ["read-only", "workspace-write"],
        note: "Explicit test-only adapter contract. This does not attest a custom process sandbox.",
      };
      return capabilities;
    });
    // Exercise the trusted native adapter success contract. This does not certify the custom process sandbox.
    // Capability and unverified-receipt rejection are exercised by separate negative tests.
    execute.mockImplementation(async (invocation) => {
      const result = await originalExecute(invocation);
      if (!result.execution_receipt) throw new Error("Fixture execution receipt missing");
      return {
        ...result,
        execution_receipt: { ...result.execution_receipt, verification_state: "observed_success" },
      };
    });
  }
  return execute;
}

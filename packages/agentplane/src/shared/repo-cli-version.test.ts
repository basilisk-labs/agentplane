import { defaultConfig } from "@agentplaneorg/core";
import { describe, expect, it } from "vitest";

import { evaluateRepoCliVersionExpectation } from "./repo-cli-version.js";
import type { RuntimeSourceInfo } from "./runtime-source.js";

function runtimeReport(overrides: Partial<RuntimeSourceInfo> = {}): RuntimeSourceInfo {
  return {
    cwd: "/repo",
    activeBinaryPath: "/usr/local/bin/agentplane",
    handoffFromBinaryPath: null,
    mode: "global-installed",
    framework: {
      inFrameworkCheckout: false,
      isRepoLocalBinary: false,
      isRepoLocalRuntime: false,
      checkout: null,
      thisBin: "/usr/local/bin/agentplane",
    },
    frameworkSources: {
      repoRoot: null,
      agentplaneRoot: "/usr/local/lib/node_modules/agentplane",
      coreRoot: null,
    },
    agentplane: {
      name: "agentplane",
      version: "0.3.2",
      packageRoot: "/usr/local/lib/node_modules/agentplane",
      packageJsonPath: "/usr/local/lib/node_modules/agentplane/package.json",
    },
    core: {
      name: "@agentplaneorg/core",
      version: "0.3.2",
      packageRoot: "/usr/local/lib/node_modules/@agentplaneorg/core",
      packageJsonPath: "/usr/local/lib/node_modules/@agentplaneorg/core/package.json",
    },
    ...overrides,
  };
}

describe("repo-cli-version", () => {
  it("returns unconfigured when the repository does not declare an expected CLI version", () => {
    const config = defaultConfig();
    const expectation = evaluateRepoCliVersionExpectation(config, runtimeReport());
    expect(expectation.state).toBe("unconfigured");
    expect(expectation.expectedVersion).toBeNull();
  });

  it("warns when the active CLI is older than the repository expectation", () => {
    const config = defaultConfig();
    config.framework.cli.expected_version = "0.3.3";
    const expectation = evaluateRepoCliVersionExpectation(
      config,
      runtimeReport({ agentplane: { ...runtimeReport().agentplane, version: "0.3.2" } }),
    );
    expect(expectation.state).toBe("older_than_expected");
    expect(expectation.summary).toContain("expects agentplane 0.3.3");
    expect(expectation.recovery).toBe("Run: npm i -g agentplane@0.3.3");
  });

  it("uses the reinstall helper for global binaries inside a framework checkout", () => {
    const config = defaultConfig();
    config.framework.cli.expected_version = "0.3.3";
    const expectation = evaluateRepoCliVersionExpectation(
      config,
      runtimeReport({
        mode: "global-in-framework",
        framework: {
          inFrameworkCheckout: true,
          isRepoLocalBinary: false,
          isRepoLocalRuntime: false,
          checkout: {
            repoRoot: "/repo",
            packageRoot: "/repo/packages/agentplane",
            repoBin: "/repo/packages/agentplane/bin/agentplane.js",
            repoCli: "/repo/packages/agentplane/src/cli.ts",
          },
          thisBin: "/usr/local/bin/agentplane",
        },
        frameworkSources: {
          repoRoot: "/repo",
          agentplaneRoot: "/repo/packages/agentplane",
          coreRoot: "/repo/packages/core",
        },
        agentplane: { ...runtimeReport().agentplane, version: "0.3.1" },
      }),
    );
    expect(expectation.state).toBe("older_than_expected");
    expect(expectation.recovery).toBe("Run: scripts/reinstall-global-agentplane.sh");
  });
});

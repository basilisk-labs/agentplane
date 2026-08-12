/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return -- TypeScript does not associate sibling declaration files with repository-root .mjs test helpers. */
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { describe, expect, it } from "vitest";

import {
  computeVerificationContract,
  mergeVerificationContracts,
} from "../../../../scripts/lib/verification-contract.mjs";
import { runVerificationGroups } from "../../../../scripts/lib/verification-scheduler.mjs";
import { readTaskVerificationEffects } from "../../../../scripts/lib/task-verification-contracts.mjs";

describe("verification contract", () => {
  it("fails closed for central, unknown, PR, release, and external effects", () => {
    expect(
      computeVerificationContract({ phase: "local", changedFiles: ["schemas/task.json"] }),
    ).toMatchObject({ requires_full_regression: true });
    expect(
      computeVerificationContract({ phase: "local", changedFiles: ["unknown/file.xyz"] }),
    ).toMatchObject({ requires_full_regression: true });
    expect(
      computeVerificationContract({
        phase: "pr",
        changedFiles: ["packages/testkit/src/helper.test.ts"],
      }),
    ).toMatchObject({ requires_full_regression: true });
    expect(
      computeVerificationContract({
        phase: "local",
        changedFiles: ["packages/testkit/src/helper.test.ts"],
        declaredExternalEffects: ["deploy"],
      }),
    ).toMatchObject({ requires_real_e2e: true });
  });

  it("never weakens a previously selected full contract", () => {
    const full = computeVerificationContract({
      phase: "local",
      changedFiles: ["schemas/task.json"],
    });
    const localized = computeVerificationContract({
      phase: "local",
      changedFiles: ["packages/testkit/src/helper.test.ts"],
      selectorKind: "targeted",
      selectorReason: "noncentral_colocated_tests",
      selectedTestFiles: ["packages/testkit/src/helper.test.ts"],
    });
    expect(mergeVerificationContracts(full, localized)).toMatchObject({
      requires_full_regression: true,
    });
  });

  it("reads semantic effects structurally from the task execution contract", () => {
    const root = mkdtempSync(path.join(os.tmpdir(), "agentplane-verification-contract-"));
    try {
      const relative = ".agentplane/tasks/202608120000-RISK/README.md";
      mkdirSync(path.dirname(path.join(root, relative)), { recursive: true });
      writeFileSync(
        path.join(root, relative),
        [
          "---",
          "id: 202608120000-RISK",
          "description: deploy is prose only and must not drive selection",
          "execution_contract:",
          "  declaration:",
          "    repository_effects:",
          '      - "source_code"',
          "    external_effects:",
          '      - "external_write"',
          "  observed:",
          "    repository_effects:",
          '      - "tests"',
          "    external_effects: []",
          "---",
          "",
        ].join("\n"),
      );
      expect(readTaskVerificationEffects([relative], { cwd: root })).toMatchObject({
        declaredRepositoryEffects: ["source_code"],
        declaredExternalEffects: ["external_write"],
        observedRepositoryEffects: ["tests"],
        observedExternalEffects: [],
        sourcePaths: [relative],
      });

      writeFileSync(
        path.join(root, relative),
        [
          "---",
          "id: 202608120000-RISK",
          "execution_contract:",
          "  declaration:",
          "    repository_effects: [source_code, tests]",
          "    external_effects: [external_write]",
          "  observed:",
          "    repository_effects: [ci]",
          "    external_effects: []",
          "---",
          "",
        ].join("\n"),
      );
      expect(readTaskVerificationEffects([relative], { cwd: root })).toMatchObject({
        declaredRepositoryEffects: ["source_code", "tests"],
        declaredExternalEffects: ["external_write"],
        observedRepositoryEffects: ["ci"],
      });
    } finally {
      rmSync(root, { force: true, recursive: true });
    }
  });

  it("aggregates every independent failure deterministically", async () => {
    const result = await runVerificationGroups(
      [
        { id: "first", command: process.execPath, args: ["-e", "process.exit(2)"] },
        { id: "second", command: process.execPath, args: ["-e", "process.exit(3)"] },
        { id: "third", command: process.execPath, args: ["-e", "process.stdout.write('ok')"] },
      ],
      { concurrency: 3 },
    );
    expect(result.ok).toBe(false);
    expect(result.results.map(({ id, exit_code }) => [id, exit_code])).toEqual([
      ["first", 2],
      ["second", 3],
      ["third", 0],
    ]);
  });

  it("bounds a stalled group without hiding an independent failure", async () => {
    const result = await runVerificationGroups(
      [
        { id: "stalled", command: process.execPath, args: ["-e", "setInterval(() => {}, 1000)"] },
        { id: "failed", command: process.execPath, args: ["-e", "process.exit(7)"] },
      ],
      { concurrency: 2, timeoutMs: 200, killGraceMs: 25 },
    );

    expect(
      result.results.map(({ id, exit_code, timed_out }) => [id, exit_code, timed_out]),
    ).toEqual([
      ["stalled", 124, true],
      ["failed", 7, false],
    ]);
  });
});

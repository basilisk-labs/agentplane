/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return -- TypeScript does not associate sibling declaration files with repository-root .mjs test helpers. */
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { describe, expect, it } from "vitest";

import {
  computeVerificationContract,
  mergeVerificationContracts,
} from "../../../../scripts/lib/verification-contract.mjs";
import { runVerificationGroups } from "../../../../scripts/lib/verification-scheduler.mjs";
import { readTaskVerificationEffects } from "../../../../scripts/lib/task-verification-contracts.mjs";
import {
  LIFECYCLE_CONTROL_EVENT_KIND,
  evaluateLifecycleControlBudget,
  readLifecycleControlEvents,
  recordLifecycleControlCommand,
} from "../../../../scripts/lib/lifecycle-control-metrics.mjs";
import { evaluateVerificationBenchmarkQualification } from "../../../../scripts/lib/verification-benchmark.mjs";
import { tempRepo } from "@agentplane/testkit";

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
        parseErrors: [],
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
        parseErrors: [],
      });

      writeFileSync(
        path.join(root, relative),
        [
          "---",
          "id: 202608120000-RISK",
          "execution_contract:",
          "  declaration:",
          "    repository_effects: source_code",
          "    external_effects: [future_external_effect]",
          "---",
          "",
        ].join("\n"),
      );
      expect(readTaskVerificationEffects([relative], { cwd: root })).toMatchObject({
        declaredRepositoryEffects: [],
        parseErrors: [
          expect.stringContaining("invalid repository_effects list"),
          expect.stringContaining("unknown effect value future_external_effect"),
        ],
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

  it("cannot qualify mandatory verification from planning-only timings", () => {
    const qualification = evaluateVerificationBenchmarkQualification({
      execution_mode: "plan",
      samples: 1,
      sample_results: [
        {
          ok: true,
          lifecycle_control: { provenance: "observed_command_events" },
        },
      ],
      p50_ms: 1,
      p95_ms: 1,
      lifecycle_control_commands: 1,
      selected_groups: 5,
      duplicate_build_invocations: 1,
      full_cli_regression_selected: false,
      thresholds: { p50_ms: 60_000, p95_ms: 120_000, lifecycle_control_commands: 3 },
      comparison: { selected_group_reduction: 13, duplicate_build_reduction: 2 },
    });

    expect(qualification).toMatchObject({
      mandatory_verification_executed: false,
      ok: false,
      checks: { mandatory_verification_executed: false },
    });
    const scripts = JSON.parse(readFileSync("package.json", "utf8")).scripts as Record<
      string,
      string
    >;
    expect(scripts["bench:verification:check"]).toContain("--execute");
  });

  it("counts lifecycle control commands from observed events and rejects four", () => {
    const root = mkdtempSync(path.join(os.tmpdir(), "agentplane-lifecycle-metrics-"));
    try {
      const eventLog = path.join(root, "events.jsonl");
      for (let index = 0; index < 4; index += 1) {
        recordLifecycleControlCommand(eventLog, {
          command: `agentplane-control-${index + 1}`,
          phase: "execute",
        });
      }
      const events = readLifecycleControlEvents(eventLog);
      expect(events).toHaveLength(4);
      expect(events.every((event) => event.kind === LIFECYCLE_CONTROL_EVENT_KIND)).toBe(true);
      expect(evaluateLifecycleControlBudget(events, 3)).toMatchObject({
        provenance: "observed_command_events",
        call_count: 4,
        maximum: 3,
        ok: false,
      });
    } finally {
      rmSync(root, { force: true, recursive: true });
    }
  });

  it("keeps cached fixture templates isolated and cleans each mutable repository", async () => {
    const first = await tempRepo({ branch: "main" });
    const second = await tempRepo({ branch: "main" });
    const firstRoot = first.root;
    const secondRoot = second.root;
    expect(firstRoot).not.toBe(secondRoot);
    writeFileSync(path.join(firstRoot, "mutable.txt"), "first only\n", "utf8");
    expect(existsSync(path.join(secondRoot, "mutable.txt"))).toBe(false);

    await Promise.all([first.cleanup(), second.cleanup()]);
    expect(existsSync(firstRoot)).toBe(false);
    expect(existsSync(secondRoot)).toBe(false);
  });
});

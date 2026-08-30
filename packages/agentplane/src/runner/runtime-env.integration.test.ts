import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { EXECUTION_RECEIPT_V2_VALID_FIXTURE } from "@agentplaneorg/core/schemas";
import { createExecutionReceipt, writeExecutionReceipt } from "./execution-receipt.js";
import { chmod, mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import os from "node:os";
import { afterEach, describe, expect, it, vi } from "vitest";
import { runSupervisedProcess } from "./process-supervision/run.js";
import type { RunnerInvocation } from "./types.js";
import { runShellCommand } from "../commands/shared/pr-meta/verify-log.js";
import { resolveLocalExecutable, withPreferredRuntimePath } from "../shared/runtime-env.js";
const roots: string[] = [];
afterEach(async () => {
  vi.unstubAllEnvs();
  await Promise.all(roots.splice(0).map((root) => rm(root, { recursive: true, force: true })));
});
async function fixture(prefix: string): Promise<string> {
  const root = await mkdtemp(path.join(os.tmpdir(), prefix));
  roots.push(root);
  return root;
}
describe("production local subprocess runtime", () => {
  it("reports absent Node instead of selecting Bun as Node under a Bun-hosted CLI", async () => {
    const home = await fixture("agentplane-node-absent-");
    const bun = resolveLocalExecutable("bun", withPreferredRuntimePath(process.env));
    if (!bun) throw new Error("This subprocess regression requires the repository Bun toolchain.");
    const moduleUrl = new URL("../shared/runtime-env.ts", import.meta.url).href;
    const script = `import {resolvePreferredNodeExecutable} from ${JSON.stringify(moduleUrl)}; try { resolvePreferredNodeExecutable({HOME:${JSON.stringify(home)},PATH:""}); process.exitCode=2; } catch(error) { console.log(error.code); }`;
    const result = await promisify(execFile)(bun, ["-e", script], { cwd: home });
    expect(result.stdout.trim()).toBe("ENOENT");
  });

  it.skipIf(process.platform === "win32")(
    "discovers a fixture HOME executable from both runner transports and verification",
    async () => {
      const home = await fixture("agentplane-runtime-production-");
      const bin = path.join(home, ".bun", "bin");
      await mkdir(bin, { recursive: true });
      const executable = path.join(bin, "bun");
      await writeFile(
        executable,
        `#!${process.execPath}\nprocess.stdout.write("fixture-runtime-ok\\n");\n`,
      );
      await chmod(executable, 0o755);
      vi.stubEnv("HOME", home);
      vi.stubEnv("PATH", "/usr/bin:/bin");
      vi.stubEnv("BUN_INSTALL", "");
      vi.stubEnv("NVM_BIN", "");
      vi.stubEnv("VOLTA_HOME", "");
      const parentPath = process.env.PATH;
      for (const workOrder of ["standalone", "root:work-item", "profile-override"]) {
        const runDir = path.join(home, workOrder.replace(":", "-"));
        await mkdir(runDir);
        const invocation: RunnerInvocation = {
          adapter_id: "custom",
          run_id: workOrder,
          work_order_id: workOrder,
          repository_root: home,
          run_dir: runDir,
          bundle_path: path.join(runDir, "bundle.json"),
          state_path: path.join(runDir, "state.json"),
          events_path: path.join(runDir, "events.jsonl"),
          result_path: path.join(runDir, "result.json"),
          receipt_path: path.join(runDir, "receipt.json"),
          trace_path: path.join(runDir, "trace.jsonl"),
          stderr_path: path.join(runDir, "stderr.log"),
          trace_policy: { mode: "raw", max_tail_bytes: 65_536, capture_stderr: true },
          timeout_policy: { wall_clock_ms: 10_000, idle_ms: 10_000, terminate_grace_ms: 100 },
          bootstrap_path: null,
          output_last_message_path: null,
          argv: ["bun", "--version"],
          env: {},
          dry_run: false,
        };
        if (workOrder === "profile-override") {
          const profileBin = path.join(runDir, "bin");
          await mkdir(profileBin);
          const profileExecutable = path.join(profileBin, "bun");
          await writeFile(
            profileExecutable,
            `#!${process.execPath}\nprocess.stdout.write("profile-runtime-ok\\n");\n`,
          );
          await chmod(profileExecutable, 0o755);
          invocation.env.PATH = profileBin;
        }
        await writeFile(
          invocation.state_path,
          JSON.stringify({
            schema_version: 1,
            runner_api_version: "1",
            run_id: invocation.run_id,
            adapter_id: invocation.adapter_id,
            target: { kind: "task", task_id: "runtime-test" },
            status: "prepared",
            mode: "execute",
            bundle_path: invocation.bundle_path,
            result_path: invocation.result_path,
            receipt_path: invocation.receipt_path,
            bootstrap_path: null,
            events_path: invocation.events_path,
            trace_path: invocation.trace_path,
            stderr_path: invocation.stderr_path,
            trace_policy: invocation.trace_policy,
            timeout_policy: invocation.timeout_policy,
            created_at: "2026-08-30T00:00:00Z",
            updated_at: "2026-08-30T00:00:00Z",
          }),
        );
        const result = await runSupervisedProcess({
          invocation,
          stdin_text: "",
          start_message: "runtime regression",
        });
        expect(result.exit_code).toBe(0);
        expect(result.stdout_tail).toContain(
          workOrder === "profile-override" ? "profile-runtime-ok" : "fixture-runtime-ok",
        );
        const baseline = structuredClone(EXECUTION_RECEIPT_V2_VALID_FIXTURE);
        const receipt = createExecutionReceipt({
          run_id: invocation.run_id,
          work_order_id: invocation.work_order_id,
          process_result: result,
          started_at: result.started_at,
          ended_at: result.ended_at,
          capabilities_invoked: [],
          git: baseline.git,
          artifacts: [],
          checks: [],
          scope_evaluation: baseline.scope_evaluation,
        });
        await writeExecutionReceipt({
          receipt_path: invocation.receipt_path,
          reference_path: "receipt.json",
          receipt,
        });
        const recorded = await readFile(invocation.receipt_path, "utf8");
        expect(recorded).toContain(result.runtime!.environment_digest);
        expect(
          receipt.checks.find((check) => check.id === "local-runtime-resolution")?.status,
        ).toBe("passed");
        const eventText = await readFile(invocation.events_path, "utf8");
        const events = eventText
          .trim()
          .split("\n")
          .map(
            (line) => JSON.parse(line) as { type: string; data: { runtime: { status: string } } },
          );
        expect(
          events.find((event) => event.type === "runner_execute_start")?.data.runtime.status,
        ).toBe("resolved");
      }
      expect(await runShellCommand("bun --version", home)).toMatchObject({
        code: 0,
        output: "fixture-runtime-ok\n",
      });
      expect(process.env.PATH).toBe(parentPath);
      await rm(executable);
      expect(resolveLocalExecutable("bun", { PATH: bin })).toBeNull();
      expect(await runShellCommand("bun --version", home)).toMatchObject({
        code: 1,
        failure_kind: "infrastructure",
      });
    },
  );
});

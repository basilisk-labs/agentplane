import { readFile } from "node:fs/promises";
import path from "node:path";
import { describe, expect, it } from "vitest";
import {
  createRecipeArchiveWithManifest,
  mkGitRepoRoot,
  writeDefaultConfig,
  runCliSilent,
  registerAgentplaneHome,
  captureStdIO,
} from "@agentplane/testkit";
import { runCli } from "../../cli/run-cli.js";
import { runJson } from "../../cli/task-create-planner-intent.testkit.js";
import { compactPlanInput } from "../task/create-plan-input.testkit.js";

registerAgentplaneHome();
function manifest(api: "1" | "2", declared: string | undefined = api) {
  return {
    schema_version: api,
    kind: "project_overlay",
    id: "installed-report",
    name: "Report",
    version: "1.0.0",
    summary: "Report",
    ...(declared
      ? {
          compatibility: {
            manifest_api_version: api,
            scenario_api_version: declared,
            runtime_api_version: "1",
          },
        }
      : {}),
    agents: [
      {
        id: "worker",
        display_name: "Worker",
        role: "EXECUTOR",
        summary: "Report",
        file: "agent.md",
      },
    ],
    scenarios: [
      {
        id: "report",
        name: "Report",
        summary: "Report",
        use_when: ["report"],
        required_inputs: [],
        outputs: [],
        permissions: [],
        artifacts: [],
        agents_involved: ["worker"],
        skills_used: [],
        tools_used: [],
        run_profile: { mode: "analysis" },
        file: "scenario.json",
      },
    ],
  };
}
const scenarioV2 = () => ({
  schema_version: "2",
  id: "report",
  goal: "Report",
  parameters: [],
  applicability: { required: [], excluded: [] },
  plan_template: compactPlanInput(),
});
async function install(rawManifest: unknown, scenario: unknown) {
  const root = await mkGitRepoRoot();
  await writeDefaultConfig(root);
  const archive = await createRecipeArchiveWithManifest({
    manifest: rawManifest as Record<string, unknown>,
    files: {
      "scenario.json": JSON.stringify(scenario),
      "agent.md": "Report guidance. No authority is granted.",
    },
  });
  const io = captureStdIO();
  try {
    const code = await runCli(["recipes", "install", "--path", archive, "--root", root]);
    return { root, code, error: io.stderr };
  } finally {
    io.restore();
  }
}

describe("installed Recipe archive API negotiation", () => {
  it("installs and vendors a declared V2 archive without falling through the V1 reader", async () => {
    const scenario = scenarioV2();
    const { root, code, error } = await install(manifest("2"), scenario);
    expect(code, error).toBe(0);
    expect(
      await runCliSilent([
        "recipes",
        "add",
        "installed-report@1.0.0",
        "--mode",
        "copy",
        "--root",
        root,
      ]),
    ).toBe(0);
    const installed: unknown = JSON.parse(
      await readFile(
        path.join(root, ".agentplane/recipes/packages/installed-report/scenario.json"),
        "utf8",
      ),
    );
    expect(installed).toEqual(scenario);
  });
  it("preserves undeclared historical V1 and custom ordered steps without claiming conversion", async () => {
    const scenario = {
      id: "report",
      goal: "Report",
      task_template: { title: "Report", description: "Preserve order", owner: "CODER" },
      inputs: {},
      outputs: [],
      steps: ["Inspect", { custom_mandatory: "Do not publish" }, "Report"],
    };
    const legacy = manifest("1");
    delete (legacy as { compatibility?: unknown }).compatibility;
    const { root, code } = await install(legacy, scenario);
    expect(code).toBe(0);
    expect(await runCliSilent(["recipes", "add", "installed-report@1.0.0", "--root", root])).toBe(
      0,
    );
    const audit = await runJson(root, [
      "recipes",
      "preview-v1",
      ".agentplane/recipes/packages/installed-report/scenario.json",
    ]);
    expect(audit.disposition).toBe("semantic_conversion_required");
    const source = audit.source as { base64: string };
    expect(
      (JSON.parse(Buffer.from(source.base64, "base64").toString()) as { steps: unknown }).steps,
    ).toEqual(scenario.steps);
    expect(audit).not.toHaveProperty("scenario");
  });
  it("rejects V2 without explicit negotiation, mismatched versions and lifecycle fields", async () => {
    const undeclared = manifest("2");
    delete (undeclared as { compatibility?: unknown }).compatibility;
    for (const [metadata, scenario] of [
      [undeclared, scenarioV2()],
      [manifest("2", "1"), scenarioV2()],
      [manifest("2"), { ...scenarioV2(), schema_version: "3" }],
      [manifest("2"), { ...scenarioV2(), approval: "USER" }],
    ]) {
      const result = await install(metadata, scenario);
      expect(result.code).not.toBe(0);
    }
  });
});

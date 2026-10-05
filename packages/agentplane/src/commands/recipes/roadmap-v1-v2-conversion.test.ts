import { mkdir, readFile, readdir, rm, symlink, writeFile } from "node:fs/promises";
import path from "node:path";
import { describe, expect, it } from "vitest";
import {
  commitAll,
  configureGitUser,
  installRunCliIntegrationHarness,
  mkGitRepoRootWithBranch,
  writeConfig,
} from "@agentplane/testkit";
import { defaultConfig } from "@agentplaneorg/core/config";
import { execFileAsync } from "@agentplaneorg/core/process";
import { gitEnv } from "@agentplaneorg/core/git";
import { taskKernel as k } from "@agentplaneorg/core/tasks";
import { AGENT_WORK_ORDER_V2_ZOD_SCHEMA } from "@agentplaneorg/core/schemas";
import {
  auditRecipeV1,
  parseScenarioV2,
  validateRecipeV1ConversionResult,
} from "@agentplaneorg/recipes";
import {
  previewRecipeV1Conversion,
  prepareRecipeV1ConversionSource,
  prepareRecipeV1ConversionPlan,
  readReviewedRecipeV1Conversion,
} from "./impl/v1-conversion.js";
import { runCli } from "../../cli/run-cli.js";
import { loadCommandContext } from "../shared/task-backend.js";
import { runTaskNewParsed } from "../task/new.js";
import { compactPlanInput } from "../task/create-plan-input.testkit.js";
import { setCanonicalPlan } from "../task/kernel-plan.js";
import { createKernelRuntime, requireKernelCommit } from "../task/kernel-runtime-context.js";
import { advanceTaskStep } from "../task/advance-task-step.js";

installRunCliIntegrationHarness();
const v1 = () => ({
  schema_version: "1",
  id: "report",
  goal: "Report without disclosing private source data",
  task_template: {
    title: "Report",
    description: "Report carefully",
    owner: "CODER",
    doc: { plan: "First inspect inputs. Then draft. Never publish private data." },
    verify: ["touch MUST-NOT-RUN"],
  },
  inputs: { source: { custom_type: "private-document", required: true } },
  outputs: ["report"],
  steps: [
    "Inspect inputs",
    { custom_mandatory: "Keep all private data local", command: "touch MUST-NOT-RUN" },
    "Draft report",
  ],
  evidence: { required: true, files: ["report.json"] },
  custom_stop: "Stop when source provenance is unknown",
});
const bytes = (value: unknown) => Buffer.from(JSON.stringify(value, null, 2) + "\n");
function draft(audit: ReturnType<typeof auditRecipeV1>, taskId: string) {
  return {
    schema_version: 1,
    kind: "recipe_v1_conversion_result",
    task_id: taskId,
    source_digest: audit.source.digest,
    audit_digest: k.kernelDigest(audit),
    status: "draft",
    scenario: parseScenarioV2({
      schema_version: "2",
      id: "report",
      goal: "Report without disclosing private source data",
      parameters: [],
      applicability: { required: [], excluded: [] },
      plan_template: compactPlanInput(),
    }),
    resolutions: audit.unresolved.map((field) => ({
      source_path: field.source_path,
      target_path: field.target,
      explanation: "Draft interpretation requires explicit independent semantic review.",
    })),
  };
}
async function fixture() {
  const root = await mkGitRepoRootWithBranch("main");
  await configureGitUser(root);
  await writeConfig(root, defaultConfig());
  await writeFile(path.join(root, "scenario-v1.json"), bytes(v1()));
  await commitAll(root, "seed V1 conversion");
  const command = await loadCommandContext({ cwd: root, rootOverride: root });
  const created = await runTaskNewParsed({
    ctx: command,
    cwd: root,
    rootOverride: root,
    printTaskId: false,
    parsed: {
      title: "Audit V1 conversion",
      description: "Prepare only a reviewed V2 draft",
      owner: "CODER",
      priority: "med",
      tags: ["workflow"],
      taskKind: "analysis",
      mutationScope: "none",
      verify: [],
      dependsOn: [],
      allowDuplicate: true,
    },
  });
  const task_id = created.task_id;
  const audit = await previewRecipeV1Conversion({
    repository_root: root,
    source_path: "scenario-v1.json",
  });
  const reference = await prepareRecipeV1ConversionSource({
    command,
    task_id,
    source_path: "scenario-v1.json",
    expected_source_digest: audit.source.digest,
  });
  async function retain() {
    const opts = {
      cwd: root,
      env: { ...gitEnv(), GIT_ALLOW_PROTOCOL: "file", GIT_TERMINAL_PROMPT: "0" },
      timeout: 30_000,
    };
    await execFileAsync(
      "git",
      ["-c", "core.hooksPath=/dev/null", "add", "-f", reference.artifact.path],
      opts,
    );
    await execFileAsync(
      "git",
      [
        "-c",
        "core.hooksPath=/dev/null",
        "-c",
        "commit.gpgsign=false",
        "commit",
        "-m",
        "retain exact V1 bytes",
      ],
      opts,
    );
  }
  const prepare = () => prepareRecipeV1ConversionPlan({ command, task_id, reference });
  const advance = (result_path?: string) =>
    advanceTaskStep({ command, task_id, transport: "host", result_path });
  return { root, command, task_id, audit, reference, retain, prepare, advance };
}

describe("offline V1 conversion and native review", { timeout: 180_000 }, () => {
  it("preserves raw ordered/custom semantics and never advertises prose as exact conversion", () => {
    const original = bytes(v1());
    const audit = auditRecipeV1(original);
    expect(Buffer.from(audit.source.base64, "base64")).toEqual(original);
    expect(audit.disposition).toBe("semantic_conversion_required");
    expect(audit).not.toHaveProperty("scenario");
    expect(audit.unresolved.map((field) => field.source_path)).toEqual([
      "/task_template",
      "/inputs",
      "/outputs",
      "/steps",
      "/custom_stop",
      "/evidence",
    ]);
    expect(JSON.parse(Buffer.from(audit.source.base64, "base64").toString("utf8"))).toEqual(v1());
    expect(audit.exact_fields).toMatchObject({ id: "report", goal: v1().goal });
    const empty = auditRecipeV1(bytes({ ...v1(), steps: [] }));
    expect(empty.disposition).toBe("semantic_conversion_required");
  });

  it("keeps asset/policy overlays unchanged and requires separate audits for declared scenarios", () => {
    const overlay = {
      schema_version: "1",
      kind: "project_overlay",
      id: "overlay",
      version: "1.0.0",
      name: "Overlay",
      summary: "Policy assets",
      prompts: [{ id: "rule", surface: "coding", file: "policy.md", strength: "required" }],
    };
    const original = bytes(overlay);
    const audit = auditRecipeV1(original);
    expect(audit.disposition).toBe("overlay_unchanged");
    expect(Buffer.from(audit.source.base64, "base64")).toEqual(original);
    expect(audit).not.toHaveProperty("scenario");
    const { kind: _kind, ...legacyOverlay } = overlay;
    expect(auditRecipeV1(bytes(legacyOverlay)).disposition).toBe("overlay_unchanged");
    const withScenario = auditRecipeV1(
      bytes({
        ...overlay,
        agents: [
          {
            id: "worker",
            role: "CODER",
            display_name: "Worker",
            summary: "Worker",
            file: "worker.md",
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
      }),
    );
    expect(withScenario.disposition).toBe("scenario_audit_required");
    expect(withScenario.scenario_sources).toEqual([{ id: "report", file: "scenario.json" }]);
    expect(() => auditRecipeV1(bytes({ ...overlay, ...v1() }))).toThrow("Ambiguous");
    expect(() => auditRecipeV1(bytes({ ...overlay, schema_version: "99" }))).toThrow();
    expect(() => auditRecipeV1(Buffer.alloc(65_537))).toThrow("byte budget");
    expect(() => auditRecipeV1(Buffer.from([0xff]))).toThrow();
  });

  it("runs the public offline preview with no repository, task, install or command effects", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    await writeFile(path.join(root, "scenario-v1.json"), bytes(v1()));
    const before = await readdir(root, { recursive: true });
    const source = await readFile(path.join(root, "scenario-v1.json"));
    expect(await runCli(["recipes", "preview-v1", "scenario-v1.json", "--root", root])).toBe(0);
    const after = await readdir(root, { recursive: true });
    expect(after.toSorted()).toEqual(before.toSorted());
    expect(await readFile(path.join(root, "scenario-v1.json"))).toEqual(source);
    await expect(readFile(path.join(root, "MUST-NOT-RUN"))).rejects.toMatchObject({
      code: "ENOENT",
    });
    for (const source_path of [
      "../outside.json",
      "C:\\outside.json",
      "//host/share.json",
      "SCENARIO-V1.json",
    ])
      await expect(
        previewRecipeV1Conversion({ repository_root: root, source_path }),
      ).rejects.toThrow();
    await mkdir(path.join(root, "links"));
    await symlink(path.join(root, "scenario-v1.json"), path.join(root, "links/source.json"));
    await expect(
      previewRecipeV1Conversion({ repository_root: root, source_path: "links/source.json" }),
    ).rejects.toThrow();
  });

  it("validates bound typed drafts and blockers without accepting review claims, missing mappings or stale sources", () => {
    const audit = auditRecipeV1(bytes(v1()));
    const result = draft(audit, "task");
    expect(validateRecipeV1ConversionResult({ audit, task_id: "task", result }).status).toBe(
      "draft",
    );
    for (const invalid of [
      { ...result, reviewed: true },
      { ...result, source_digest: k.kernelDigest("other") },
      { ...result, task_id: "other" },
      { ...result, resolutions: result.resolutions.slice(1) },
      { ...result, scenario: { ...result.scenario, steps: [] } },
      {
        ...result,
        resolutions: result.resolutions.map((r) => ({ ...r, target_path: "/missing" })),
      },
    ])
      expect(() =>
        validateRecipeV1ConversionResult({ audit, task_id: "task", result: invalid }),
      ).toThrow();
    expect(
      validateRecipeV1ConversionResult({
        audit,
        task_id: "task",
        result: {
          schema_version: 1,
          kind: "recipe_v1_conversion_result",
          task_id: "task",
          source_digest: audit.source.digest,
          audit_digest: k.kernelDigest(audit),
          status: "blocked",
          reason: "Cannot preserve custom mandatory semantics",
        },
      }).status,
    ).toBe("blocked");
    expect(() => parseScenarioV2(result)).toThrow();
  });

  it("requires explicit committed retention and rejects source changes, tamper and cross-task references", async () => {
    const f = await fixture();
    await expect(f.prepare()).rejects.toThrow("not committed");
    await f.retain();
    const prepared = await f.prepare();
    expect(prepared.proposal.work_items).toHaveLength(1);
    expect(prepared.proposal.work_items[0]!.contract.role).toBe("CURATOR");
    expect(prepared.audit.source).toEqual(f.audit.source);
    await writeFile(path.join(f.root, "scenario-v1.json"), bytes({ ...v1(), goal: "Changed" }));
    await expect(
      prepareRecipeV1ConversionSource({
        command: f.command,
        task_id: f.task_id,
        source_path: "scenario-v1.json",
        expected_source_digest: f.audit.source.digest,
      }),
    ).rejects.toThrow("changed since preview");
    await rm(path.join(f.root, "scenario-v1.json"));
    const recovered = await f.prepare();
    expect(recovered.audit.source).toEqual(f.audit.source);
    await expect(
      prepareRecipeV1ConversionPlan({
        command: f.command,
        task_id: f.task_id,
        reference: { ...f.reference, task_id: "other" },
      }),
    ).rejects.toThrow("another Task");
    await writeFile(path.join(f.root, f.reference.artifact.path), "tampered");
    await expect(f.prepare()).rejects.toThrow();
  });

  it("issues one native CURATOR episode and exposes only its exact independently reviewed draft", async () => {
    const f = await fixture();
    await f.retain();
    const prepared = await f.prepare();
    const work_item_id = prepared.proposal.work_items[0]!.id;
    const result = draft(f.audit, f.task_id);
    const read = (value: unknown = result, itemId = work_item_id) =>
      readReviewedRecipeV1Conversion({
        command: f.command,
        task_id: f.task_id,
        work_item_id: itemId,
        reference: f.reference,
        result: value,
      });
    await setCanonicalPlan(f.command, f.task_id, prepared.proposal);
    await expect(read()).rejects.toThrow("independently reviewed");
    const runtime = await createKernelRuntime({
      command: f.command,
      task_id: f.task_id,
      transport: "manual",
      operation_id: "approve-conversion",
      approval: {
        kind: "manual_operator",
        actor_id: "USER",
        invocation_id: k.kernelDigest("approve-conversion"),
      },
    });
    requireKernelCommit(await runtime.authority.approve(f.task_id));
    const packet = await f.advance();
    if (!("exchange" in packet)) throw new Error(JSON.stringify(packet.action));
    const order = AGENT_WORK_ORDER_V2_ZOD_SCHEMA.parse(
      JSON.parse(await readFile(path.join(packet.exchange.directory, "work-order.json"), "utf8")),
    );
    expect(order.role).toBe("CURATOR");
    expect(order.task.objective).toContain(f.audit.source.digest);
    const sourceInput = order.required_inputs.find((input) => input.id === "recipe-v1-source")!;
    expect(sourceInput).toMatchObject({ required: true, digest: f.reference.artifact.sha256 });
    expect(sourceInput.path).toBe(path.join(f.root, f.reference.artifact.path));
    expect(Buffer.from(f.audit.source.base64, "base64").toString("utf8")).toContain(
      "custom_mandatory",
    );
    expect(order.authority).toMatchObject({
      writable_roots: [],
      network: "deny",
      external_side_effects: [],
    });
    await writeFile(
      packet.exchange.result_path,
      JSON.stringify({
        work_order_id: order.work_order_id,
        status: "completed",
        summary: JSON.stringify(result),
        findings: [],
        uncertainty: [],
        canonical_outputs: [
          { id: "recipe-v2-draft", kind: "report", digest: k.kernelDigest(result) },
        ],
      }),
    );
    const validPayload = await readFile(packet.exchange.result_path, "utf8");
    const wrongClaim = {
      ...(JSON.parse(validPayload) as Record<string, unknown>),
      canonical_outputs: [
        { id: "recipe-v2-draft", kind: "report", digest: k.kernelDigest("different draft") },
      ],
    };
    await writeFile(packet.exchange.result_path, JSON.stringify(wrongClaim));
    await expect(f.advance(packet.exchange.result_path)).rejects.toThrow("exact typed draft");
    await writeFile(packet.exchange.result_path, validPayload);
    const inspecting = await f.advance(packet.exchange.result_path);
    if (!("exchange" in inspecting)) throw new Error(JSON.stringify(inspecting.action));
    const inspection = AGENT_WORK_ORDER_V2_ZOD_SCHEMA.parse(
      JSON.parse(
        await readFile(path.join(inspecting.exchange.directory, "work-order.json"), "utf8"),
      ),
    );
    expect(inspection.role).toBe("EVALUATOR");
    expect(inspection.required_inputs).toContainEqual(sourceInput);
    await expect(read()).rejects.toThrow("independently reviewed");
    await expect(read({ ...result, reviewed: true })).rejects.toThrow();
    await writeFile(
      inspecting.exchange.result_path,
      JSON.stringify({
        work_order_id: inspection.work_order_id,
        status: "completed",
        summary: "Fixture explicit review of bound conversion draft",
        findings: [
          "Fixture reviewer checked the retained source and exact draft digest under the conversion contract.",
        ],
        uncertainty: [],
        review: { verdict: "pass", missing_tests: [], hidden_assumptions: [], residual_risks: [] },
      }),
    );
    await f.advance(inspecting.exchange.result_path);
    const candidate = await read();
    expect(candidate.scenario).toEqual(result.scenario);
    expect(candidate.source_digest).toBe(f.audit.source.digest);
    expect(candidate.draft_digest).toBe(k.kernelDigest(result));
    await expect(read(result, "other-work-item")).rejects.toThrow("another WorkItem");
    await expect(
      read({ ...result, scenario: { ...result.scenario, goal: "Unreviewed changed goal" } }),
    ).rejects.toThrow("independently reviewed");
    expect(await readFile(path.join(f.root, "scenario-v1.json"))).toEqual(bytes(v1()));
  });
});

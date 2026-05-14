import { describe, expect, it, vi } from "vitest";
import os from "node:os";
import path from "node:path";
import { mkdtemp, readFile, writeFile, mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";

import {
  defaultConfig,
  loadConfig,
  renderAgentplaneConfigSchemaJson,
  saveConfig,
  setByDottedKey,
  validateConfig,
} from "../index.js";

const makeConfigRecord = (): Record<string, unknown> =>
  structuredClone(defaultConfig()) as Record<string, unknown>;
const readConfigModuleText = async (relativePath: string): Promise<string> =>
  await readFile(fileURLToPath(new URL(relativePath, import.meta.url)), "utf8");
const schemaPath = (pathValue: string): RegExp => {
  const [first = "", ...rest] = pathValue.split(".");
  const pathPattern = [
    first,
    ...rest.map((segment) =>
      /^\d+$/.test(segment) ? String.raw`(?:[./]${segment}|\[${segment}\])` : `[./]${segment}`,
    ),
  ].join("");
  return new RegExp(`(?:config[/.])?${pathPattern}`);
};

describe("config", () => {
  it("defaultConfig validates", () => {
    expect(() => validateConfig(defaultConfig())).not.toThrow();
  });

  it("defaults GitHub issue feedback to enabled with explicit opt-out", () => {
    const cfg = defaultConfig();
    expect(cfg.feedback.github_issues).toMatchObject({
      enabled: true,
      repository: "basilisk-labs/agentplane",
      prompt_on_internal_error: true,
      include_insights_report: true,
      dedupe: true,
      labels: ["agentplane-feedback", "bug"],
    });
  });

  it("spec example config validates at runtime", async () => {
    const exampleUrl = new URL("../../../spec/examples/config.json", import.meta.url);
    const text = await readFile(fileURLToPath(exampleUrl), "utf8");
    const parsed = JSON.parse(text) as unknown;
    expect(() => validateConfig(parsed)).not.toThrow();
  });

  it("published config schema artifacts match the runtime schema source", async () => {
    const specSchemaUrl = new URL("../../../spec/schemas/config.schema.json", import.meta.url);
    const coreSchemaUrl = new URL("../../schemas/config.schema.json", import.meta.url);
    const rendered = JSON.parse(renderAgentplaneConfigSchemaJson()) as unknown;

    const [specText, coreText] = await Promise.all([
      readFile(fileURLToPath(specSchemaUrl), "utf8"),
      readFile(fileURLToPath(coreSchemaUrl), "utf8"),
    ]);

    expect(JSON.parse(specText)).toEqual(rendered);
    expect(JSON.parse(coreText)).toEqual(rendered);
  });

  it("keeps config IO and validation behind dedicated modules", async () => {
    const [configText, ioText, validationText, workflowFileText] = await Promise.all([
      readConfigModuleText("./config.ts"),
      readConfigModuleText("./io.ts"),
      readConfigModuleText("./validation.ts"),
      readConfigModuleText("./workflow-file.ts"),
    ]);

    expect(configText).toContain('from "./io.js"');
    expect(configText).toContain('from "./validation.js"');
    expect(configText).not.toContain("node:fs/promises");
    expect(configText).not.toContain("atomicWriteFile");

    expect(ioText).toContain("node:fs/promises");
    expect(ioText).toContain("readWorkflowConfigRaw");
    expect(workflowFileText).toContain("atomicWriteFile");
    expect(validationText).toContain("validateAgentplaneConfig");
  });

  it("validateConfig allows missing agents approvals", () => {
    const raw = defaultConfig() as unknown as Record<string, unknown>;
    delete raw.agents;
    expect(() => validateConfig(raw)).not.toThrow();
  });

  it("loadConfig returns default config when WORKFLOW.md is missing", async () => {
    const tmp = await mkdtemp(path.join(os.tmpdir(), "agentplane-config-missing-"));
    const agentplaneDir = path.join(tmp, ".agentplane");

    const loaded = await loadConfig(agentplaneDir);
    expect(loaded.exists).toBe(false);
    expect(loaded.config.schema_version).toBe(1);
    expect(loaded.raw).toHaveProperty("schema_version", 1);
  });

  it("loadConfig strips deprecated base_branch and warns", async () => {
    const tmp = await mkdtemp(path.join(os.tmpdir(), "agentplane-config-deprecated-"));
    const agentplaneDir = path.join(tmp, ".agentplane");
    await mkdir(agentplaneDir, { recursive: true });

    const raw = defaultConfig() as unknown as Record<string, unknown>;
    (raw as { base_branch?: string }).base_branch = "main";
    await writeFile(path.join(agentplaneDir, "config.json"), JSON.stringify(raw, null, 2), "utf8");

    const stderrSpy = vi.spyOn(process.stderr, "write").mockImplementation(() => true);
    try {
      const loaded = await loadConfig(agentplaneDir);
      expect(loaded.raw).not.toHaveProperty("base_branch");
      expect(loaded.config).not.toHaveProperty("base_branch");
      expect(stderrSpy).toHaveBeenCalledWith(
        expect.stringContaining('config key "base_branch" is deprecated and ignored'),
      );
    } finally {
      stderrSpy.mockRestore();
    }
  });

  it("loadConfig fills the default runner adapter when legacy config.json omits runner", async () => {
    const tmp = await mkdtemp(path.join(os.tmpdir(), "agentplane-config-runner-default-"));
    const agentplaneDir = path.join(tmp, ".agentplane");
    await mkdir(agentplaneDir, { recursive: true });

    const raw = defaultConfig() as unknown as Record<string, unknown>;
    delete raw.runner;
    await writeFile(path.join(agentplaneDir, "config.json"), JSON.stringify(raw, null, 2), "utf8");

    const loaded = await loadConfig(agentplaneDir);
    expect(loaded.config.runner.default_adapter).toBe("codex");
  });

  it("validateConfig accepts custom runner enforcement settings", () => {
    const raw = defaultConfig() as unknown as Record<string, unknown>;
    raw.runner = {
      ...raw.runner,
      default_adapter: "custom",
      custom: {
        command: ["custom-runner", "--bundle-from-env"],
        enforcement: {
          mode: "codex_sandbox_full_auto",
          platform: "macos",
        },
      },
    };

    const validated = validateConfig(raw);

    expect(validated.runner.custom).toEqual({
      command: ["custom-runner", "--bundle-from-env"],
      env: {},
      enforcement: {
        mode: "codex_sandbox_full_auto",
        platform: "macos",
      },
    });
  });

  it("setByDottedKey sets nested fields and preserves object shape", () => {
    const cfg = defaultConfig() as unknown as Record<string, unknown>;
    setByDottedKey(cfg, "workflow_mode", "branch_pr");
    setByDottedKey(cfg, "paths.tasks_path", ".agentplane/tasks.json");
    const validated = validateConfig(cfg);
    expect(validated.workflow_mode).toBe("branch_pr");
    expect(validated.paths.tasks_path).toBe(".agentplane/tasks.json");
  });

  it("setByDottedKey parses scalars and json-ish values", () => {
    const cfg = defaultConfig() as unknown as Record<string, unknown>;
    setByDottedKey(cfg, "finish_auto_status_commit", "false");
    setByDottedKey(cfg, "close_commit.direct_dirty_policy", "strict");
    setByDottedKey(cfg, "tasks.id_suffix_length_default", "12");
    setByDottedKey(cfg, "tasks.verify.required_tags", '["code","backend"]');
    setByDottedKey(cfg, "artifacts_language", "en");

    const validated = validateConfig(cfg);
    expect(validated.finish_auto_status_commit).toBe(false);
    expect(validated.close_commit.direct_dirty_policy).toBe("strict");
    expect(validated.tasks.id_suffix_length_default).toBe(12);
    expect(validated.tasks.verify.required_tags).toEqual(["code", "backend"]);
    expect(validated.artifacts_language).toBe("en");
  });

  it("default execution profile values are present", () => {
    const cfg = defaultConfig();
    expect(cfg.execution.profile).toBe("balanced");
    expect(cfg.execution.reasoning_effort).toBe("medium");
    expect(cfg.execution.text_verbosity).toBe("medium");
    expect(cfg.execution.tool_budget).toEqual({
      discovery: 6,
      implementation: 10,
      verification: 6,
    });
    expect(cfg.execution.stop_conditions.length).toBeGreaterThan(0);
    expect(cfg.execution.handoff_conditions.length).toBeGreaterThan(0);
    expect(cfg.execution.unsafe_actions_requiring_explicit_user_ok.length).toBeGreaterThan(0);
    expect(cfg.framework.cli.expected_version).toBeNull();
    expect(cfg.runner.default_adapter).toBe("codex");
    expect(cfg.runner.trace).toEqual({
      mode: "raw",
      max_tail_bytes: 65_536,
      capture_stderr: true,
      retention: "keep",
      compression: "none",
      redact_patterns: [],
    });
    expect(cfg.runner.timeouts).toEqual({
      wall_clock_ms: 900_000,
      idle_ms: 180_000,
      terminate_grace_ms: 1500,
    });
    expect(cfg.close_commit.direct_dirty_policy).toBe("allow_other_task_readmes");
  });

  it("accepts xhigh reasoning effort and low text verbosity overrides", () => {
    const cfg = defaultConfig();
    cfg.execution.reasoning_effort = "xhigh";
    cfg.execution.text_verbosity = "low";

    const validated = validateConfig(cfg);

    expect(validated.execution.reasoning_effort).toBe("xhigh");
    expect(validated.execution.text_verbosity).toBe("low");
  });

  it("default task README contract uses the active v3 sections", () => {
    const cfg = defaultConfig();
    expect(cfg.tasks.doc.sections).toEqual([
      "Summary",
      "Scope",
      "Plan",
      "Verify Steps",
      "Verification",
      "Rollback Plan",
      "Findings",
    ]);
    expect(cfg.tasks.doc.required_sections).toEqual([
      "Summary",
      "Scope",
      "Plan",
      "Verification",
      "Rollback Plan",
    ]);
  });

  it("setByDottedKey handles edge scalar parsing cases", () => {
    const cfg = defaultConfig() as unknown as Record<string, unknown>;

    setByDottedKey(cfg, "finish_auto_status_commit", "true");
    setByDottedKey(cfg, "framework.last_update", "null");
    setByDottedKey(cfg, "framework.cli.expected_version", "0.3.2");

    setByDottedKey(cfg, "misc.decimal", "1.5");
    setByDottedKey(cfg, "misc.bad_object", "{not-json");
    setByDottedKey(cfg, "misc.bad_array", "[not-json");

    setByDottedKey(cfg, "shadow", "oops");
    setByDottedKey(cfg, "shadow.nested", "2");

    const validated = validateConfig(cfg);
    expect(validated.finish_auto_status_commit).toBe(true);
    expect(validated.framework.last_update).toBeNull();
    expect(validated.framework.cli.expected_version).toBe("0.3.2");

    const rawCfg = cfg as unknown as {
      misc: { decimal: unknown; bad_object: unknown; bad_array: unknown };
      shadow: { nested: unknown };
    };
    expect(rawCfg.misc.decimal).toBe(1.5);
    expect(rawCfg.misc.bad_object).toBe("{not-json");
    expect(rawCfg.misc.bad_array).toBe("[not-json");
    expect(rawCfg.shadow.nested).toBe(2);
  });

  it("setByDottedKey rejects empty keys", () => {
    const cfg = defaultConfig() as unknown as Record<string, unknown>;
    expect(() => setByDottedKey(cfg, "", "x")).toThrow(/non-empty/);
    expect(() => setByDottedKey(cfg, ".", "x")).toThrow(/non-empty/);
  });

  it("saveConfig writes WORKFLOW.md, removes config.json, and loadConfig reads it back", async () => {
    const tmp = await mkdtemp(path.join(os.tmpdir(), "agentplane-config-test-"));
    const agentplaneDir = path.join(tmp, ".agentplane");

    const raw = defaultConfig() as unknown as Record<string, unknown>;
    setByDottedKey(raw, "workflow_mode", "branch_pr");
    await mkdir(agentplaneDir, { recursive: true });
    await writeFile(path.join(agentplaneDir, "config.json"), "{}\n", "utf8");
    await saveConfig(agentplaneDir, raw);

    await expect(readFile(path.join(agentplaneDir, "config.json"), "utf8")).rejects.toMatchObject({
      code: "ENOENT",
    });
    const text = await readFile(path.join(agentplaneDir, "WORKFLOW.md"), "utf8");
    expect(text).toContain("version: 2");
    expect(text).toContain("mode: branch_pr");
    expect(text).toContain("github_issues:");
    expect(text).toContain("enabled: true");

    const loaded = await loadConfig(agentplaneDir);
    expect(loaded.exists).toBe(true);
    expect(loaded.config.workflow_mode).toBe("branch_pr");
    expect(path.basename(loaded.path)).toBe("WORKFLOW.md");
  });

  it("validateConfig rejects unsupported schema_version", () => {
    const raw = defaultConfig() as unknown as Record<string, unknown>;
    raw.schema_version = 999;
    expect(() => validateConfig(raw)).toThrow(/schema_version/);
  });

  it("validateConfig rejects non-integer id_suffix_length_default", () => {
    const raw = defaultConfig() as unknown as {
      tasks: { id_suffix_length_default: number };
    };
    raw.tasks.id_suffix_length_default = 1.25;
    expect(() => validateConfig(raw)).toThrow(/id_suffix_length_default/);
  });

  it("validateConfig rejects invalid field shapes", () => {
    const cases: [string, (raw: Record<string, unknown>) => void, RegExp][] = [
      ["workflow_mode", (raw) => (raw.workflow_mode = "nope"), /workflow_mode/],
      ["status_commit_policy", (raw) => (raw.status_commit_policy = "bad"), /status_commit_policy/],
      ["commit_automation", (raw) => (raw.commit_automation = "bad"), /commit_automation/],
      [
        "finish_auto_status_commit",
        (raw) => (raw.finish_auto_status_commit = "nope"),
        /finish_auto_status_commit/,
      ],
      ["agents", (raw) => (raw.agents = "nope"), schemaPath("agents")],
      [
        "agents.approvals",
        (raw) => ((raw.agents as Record<string, unknown>).approvals = "nope"),
        schemaPath("agents.approvals"),
      ],
      [
        "agents.approvals.require_plan",
        (raw) =>
          ((
            (raw.agents as Record<string, unknown>).approvals as Record<string, unknown>
          ).require_plan = "nope"),
        schemaPath("agents.approvals.require_plan"),
      ],
      [
        "agents.approvals.require_network",
        (raw) =>
          ((
            (raw.agents as Record<string, unknown>).approvals as Record<string, unknown>
          ).require_network = "nope"),
        schemaPath("agents.approvals.require_network"),
      ],
      [
        "agents.approvals.require_verify",
        (raw) =>
          ((
            (raw.agents as Record<string, unknown>).approvals as Record<string, unknown>
          ).require_verify = "nope"),
        schemaPath("agents.approvals.require_verify"),
      ],
      [
        "agents.approvals.require_force",
        (raw) =>
          ((
            (raw.agents as Record<string, unknown>).approvals as Record<string, unknown>
          ).require_force = "nope"),
        schemaPath("agents.approvals.require_force"),
      ],
      ["recipes", (raw) => (raw.recipes = "nope"), schemaPath("recipes")],
      [
        "recipes.storage_default",
        (raw) => ((raw.recipes as Record<string, unknown>).storage_default = "bad"),
        schemaPath("recipes.storage_default"),
      ],
      ["runner", (raw) => (raw.runner = "nope"), schemaPath("runner")],
      [
        "runner.default_adapter",
        (raw) => ((raw.runner as Record<string, unknown>).default_adapter = "unknown"),
        schemaPath("runner.default_adapter"),
      ],
      [
        "runner.trace",
        (raw) => ((raw.runner as Record<string, unknown>).trace = "nope"),
        schemaPath("runner.trace"),
      ],
      [
        "runner.trace.mode",
        (raw) =>
          (((raw.runner as Record<string, unknown>).trace as Record<string, unknown>).mode = "bad"),
        schemaPath("runner.trace.mode"),
      ],
      [
        "runner.trace.max_tail_bytes",
        (raw) =>
          ((
            (raw.runner as Record<string, unknown>).trace as Record<string, unknown>
          ).max_tail_bytes = -1),
        schemaPath("runner.trace.max_tail_bytes"),
      ],
      [
        "runner.trace.capture_stderr",
        (raw) =>
          ((
            (raw.runner as Record<string, unknown>).trace as Record<string, unknown>
          ).capture_stderr = "nope"),
        schemaPath("runner.trace.capture_stderr"),
      ],
      [
        "runner.trace.retention",
        (raw) =>
          (((raw.runner as Record<string, unknown>).trace as Record<string, unknown>).retention =
            "bad"),
        schemaPath("runner.trace.retention"),
      ],
      [
        "runner.trace.compression",
        (raw) =>
          (((raw.runner as Record<string, unknown>).trace as Record<string, unknown>).compression =
            "bad"),
        schemaPath("runner.trace.compression"),
      ],
      [
        "runner.trace.redact_patterns",
        (raw) =>
          ((
            (raw.runner as Record<string, unknown>).trace as Record<string, unknown>
          ).redact_patterns = [""]),
        schemaPath("runner.trace.redact_patterns.0"),
      ],
      [
        "runner.timeouts",
        (raw) => ((raw.runner as Record<string, unknown>).timeouts = "nope"),
        schemaPath("runner.timeouts"),
      ],
      [
        "runner.timeouts.wall_clock_ms",
        (raw) =>
          ((
            (raw.runner as Record<string, unknown>).timeouts as Record<string, unknown>
          ).wall_clock_ms = -1),
        schemaPath("runner.timeouts.wall_clock_ms"),
      ],
      [
        "runner.timeouts.idle_ms",
        (raw) =>
          (((raw.runner as Record<string, unknown>).timeouts as Record<string, unknown>).idle_ms =
            -1),
        schemaPath("runner.timeouts.idle_ms"),
      ],
      [
        "runner.timeouts.terminate_grace_ms",
        (raw) =>
          ((
            (raw.runner as Record<string, unknown>).timeouts as Record<string, unknown>
          ).terminate_grace_ms = -1),
        schemaPath("runner.timeouts.terminate_grace_ms"),
      ],
      ["execution", (raw) => (raw.execution = "nope"), schemaPath("execution")],
      [
        "execution.profile",
        (raw) => ((raw.execution as Record<string, unknown>).profile = "bad"),
        schemaPath("execution.profile"),
      ],
      [
        "execution.reasoning_effort",
        (raw) => ((raw.execution as Record<string, unknown>).reasoning_effort = "bad"),
        schemaPath("execution.reasoning_effort"),
      ],
      [
        "execution.text_verbosity",
        (raw) => ((raw.execution as Record<string, unknown>).text_verbosity = "bad"),
        schemaPath("execution.text_verbosity"),
      ],
      [
        "execution.tool_budget",
        (raw) => ((raw.execution as Record<string, unknown>).tool_budget = "bad"),
        schemaPath("execution.tool_budget"),
      ],
      [
        "execution.tool_budget.discovery",
        (raw) =>
          ((
            (raw.execution as Record<string, unknown>).tool_budget as Record<string, unknown>
          ).discovery = 0) as unknown,
        schemaPath("execution.tool_budget.discovery"),
      ],
      [
        "execution.stop_conditions",
        (raw) => ((raw.execution as Record<string, unknown>).stop_conditions = [""]),
        schemaPath("execution.stop_conditions"),
      ],
      [
        "execution.handoff_conditions",
        (raw) => ((raw.execution as Record<string, unknown>).handoff_conditions = [""]),
        schemaPath("execution.handoff_conditions"),
      ],
      [
        "execution.unsafe_actions_requiring_explicit_user_ok",
        (raw) =>
          ((raw.execution as Record<string, unknown>).unsafe_actions_requiring_explicit_user_ok = [
            "",
          ]),
        schemaPath("execution.unsafe_actions_requiring_explicit_user_ok"),
      ],
      ["paths", (raw) => (raw.paths = "nope"), schemaPath("paths")],
      ["branch", (raw) => (raw.branch = "nope"), schemaPath("branch")],
      ["framework", (raw) => (raw.framework = "nope"), schemaPath("framework")],
      ["tasks", (raw) => (raw.tasks = "nope"), schemaPath("tasks")],
      ["commit", (raw) => (raw.commit = "nope"), schemaPath("commit")],
      ["tasks_backend", (raw) => (raw.tasks_backend = "nope"), schemaPath("tasks_backend")],
      [
        "closure_commit_requires_approval",
        (raw) => (raw.closure_commit_requires_approval = "nope"),
        /closure_commit_requires_approval/,
      ],
      [
        "artifacts_language",
        (raw) => (raw.artifacts_language = "de"),
        schemaPath("artifacts_language"),
      ],
      [
        "paths.agents_dir",
        (raw) => ((raw.paths as Record<string, unknown>).agents_dir = ""),
        schemaPath("paths.agents_dir"),
      ],
      [
        "branch.task_prefix",
        (raw) => ((raw.branch as Record<string, unknown>).task_prefix = ""),
        schemaPath("branch.task_prefix"),
      ],
      [
        "framework.source",
        (raw) => ((raw.framework as Record<string, unknown>).source = ""),
        schemaPath("framework.source"),
      ],
      [
        "framework.last_update",
        (raw) => ((raw.framework as Record<string, unknown>).last_update = 123),
        schemaPath("framework.last_update"),
      ],
      [
        "framework.cli",
        (raw) => ((raw.framework as Record<string, unknown>).cli = "nope"),
        schemaPath("framework.cli"),
      ],
      [
        "framework.cli.expected_version",
        (raw) =>
          ((
            (raw.framework as Record<string, unknown>).cli as Record<string, unknown>
          ).expected_version = 123) as unknown,
        schemaPath("framework.cli.expected_version"),
      ],
      [
        "tasks.verify.required_tags",
        (raw) =>
          ((
            (raw.tasks as Record<string, unknown>).verify as Record<string, unknown>
          ).required_tags = [""]),
        schemaPath("tasks.verify.required_tags"),
      ],
      [
        "tasks.doc.sections",
        (raw) =>
          (((raw.tasks as Record<string, unknown>).doc as Record<string, unknown>).sections = [""]),
        schemaPath("tasks.doc.sections"),
      ],
      [
        "tasks.comments",
        (raw) => ((raw.tasks as Record<string, unknown>).comments = "nope"),
        schemaPath("tasks.comments"),
      ],
      [
        "tasks.comments.start",
        (raw) =>
          (((raw.tasks as Record<string, unknown>).comments as Record<string, unknown>).start = {}),
        schemaPath("tasks.comments.start"),
      ],
      [
        "commit.generic_tokens",
        (raw) => ((raw.commit as Record<string, unknown>).generic_tokens = "nope"),
        schemaPath("commit.generic_tokens"),
      ],
      [
        "tasks_backend.config_path",
        (raw) => ((raw.tasks_backend as Record<string, unknown>).config_path = ""),
        schemaPath("tasks_backend.config_path"),
      ],
    ];

    for (const [_name, mutate, pattern] of cases) {
      const raw = makeConfigRecord();
      mutate(raw);
      expect(() => validateConfig(raw)).toThrow(pattern);
    }
  });
});

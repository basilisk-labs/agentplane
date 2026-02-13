import { describe, expect, it, vi } from "vitest";
import os from "node:os";
import path from "node:path";
import { mkdtemp, readFile, writeFile, mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";

import { defaultConfig, loadConfig, saveConfig, setByDottedKey, validateConfig } from "../index.js";

const makeConfigRecord = (): Record<string, unknown> =>
  structuredClone(defaultConfig()) as Record<string, unknown>;
const schemaPath = (pathValue: string): RegExp =>
  new RegExp(`(?:config/)?${pathValue.replaceAll(".", "/")}`);

describe("config", () => {
  it("defaultConfig validates", () => {
    expect(() => validateConfig(defaultConfig())).not.toThrow();
  });

  it("spec example config validates at runtime", async () => {
    const exampleUrl = new URL("../../../spec/examples/config.json", import.meta.url);
    const text = await readFile(fileURLToPath(exampleUrl), "utf8");
    const parsed = JSON.parse(text) as unknown;
    expect(() => validateConfig(parsed)).not.toThrow();
  });

  it("validateConfig allows missing agents approvals", () => {
    const raw = defaultConfig() as unknown as Record<string, unknown>;
    delete raw.agents;
    expect(() => validateConfig(raw)).not.toThrow();
  });

  it("loadConfig returns default config when config.json is missing", async () => {
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

    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => false);
    try {
      const loaded = await loadConfig(agentplaneDir);
      expect(loaded.raw).not.toHaveProperty("base_branch");
      expect(loaded.config).not.toHaveProperty("base_branch");
      expect(warnSpy).toHaveBeenCalled();
    } finally {
      warnSpy.mockRestore();
    }
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
    setByDottedKey(cfg, "tasks.id_suffix_length_default", "12");
    setByDottedKey(cfg, "tasks.verify.required_tags", '["code","backend"]');

    const validated = validateConfig(cfg);
    expect(validated.finish_auto_status_commit).toBe(false);
    expect(validated.tasks.id_suffix_length_default).toBe(12);
    expect(validated.tasks.verify.required_tags).toEqual(["code", "backend"]);
  });

  it("default execution profile values are present", () => {
    const cfg = defaultConfig();
    expect(cfg.execution.profile).toBe("balanced");
    expect(cfg.execution.reasoning_effort).toBe("medium");
    expect(cfg.execution.tool_budget).toEqual({
      discovery: 6,
      implementation: 10,
      verification: 6,
    });
    expect(cfg.execution.stop_conditions.length).toBeGreaterThan(0);
    expect(cfg.execution.handoff_conditions.length).toBeGreaterThan(0);
    expect(cfg.execution.unsafe_actions_requiring_explicit_user_ok.length).toBeGreaterThan(0);
  });

  it("setByDottedKey handles edge scalar parsing cases", () => {
    const cfg = defaultConfig() as unknown as Record<string, unknown>;

    setByDottedKey(cfg, "finish_auto_status_commit", "true");
    setByDottedKey(cfg, "framework.last_update", "null");

    setByDottedKey(cfg, "misc.decimal", "1.5");
    setByDottedKey(cfg, "misc.bad_object", "{not-json");
    setByDottedKey(cfg, "misc.bad_array", "[not-json");

    setByDottedKey(cfg, "shadow", "oops");
    setByDottedKey(cfg, "shadow.nested", "2");

    const validated = validateConfig(cfg);
    expect(validated.finish_auto_status_commit).toBe(true);
    expect(validated.framework.last_update).toBeNull();

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

  it("saveConfig writes config.json and loadConfig reads it back", async () => {
    const tmp = await mkdtemp(path.join(os.tmpdir(), "agentplane-config-test-"));
    const agentplaneDir = path.join(tmp, ".agentplane");

    const raw = defaultConfig() as unknown as Record<string, unknown>;
    setByDottedKey(raw, "workflow_mode", "branch_pr");
    await saveConfig(agentplaneDir, raw);

    const text = await readFile(path.join(agentplaneDir, "config.json"), "utf8");
    expect(text).toContain('"workflow_mode": "branch_pr"');

    const loaded = await loadConfig(agentplaneDir);
    expect(loaded.exists).toBe(true);
    expect(loaded.config.workflow_mode).toBe("branch_pr");
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
      ["agents", (raw) => (raw.agents = "nope"), /agents must be object/],
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
        /require_plan must be boolean/,
      ],
      [
        "agents.approvals.require_network",
        (raw) =>
          ((
            (raw.agents as Record<string, unknown>).approvals as Record<string, unknown>
          ).require_network = "nope"),
        /require_network must be boolean/,
      ],
      [
        "agents.approvals.require_verify",
        (raw) =>
          ((
            (raw.agents as Record<string, unknown>).approvals as Record<string, unknown>
          ).require_verify = "nope"),
        /require_verify must be boolean/,
      ],
      [
        "agents.approvals.require_force",
        (raw) =>
          ((
            (raw.agents as Record<string, unknown>).approvals as Record<string, unknown>
          ).require_force = "nope"),
        /require_force must be boolean/,
      ],
      ["recipes", (raw) => (raw.recipes = "nope"), /recipes must be object/],
      [
        "recipes.storage_default",
        (raw) => ((raw.recipes as Record<string, unknown>).storage_default = "bad"),
        schemaPath("recipes.storage_default"),
      ],
      ["execution", (raw) => (raw.execution = "nope"), /execution must be object/],
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
      ["paths", (raw) => (raw.paths = "nope"), /paths must be object/],
      ["branch", (raw) => (raw.branch = "nope"), /branch must be object/],
      ["framework", (raw) => (raw.framework = "nope"), /framework must be object/],
      ["tasks", (raw) => (raw.tasks = "nope"), /tasks must be object/],
      ["commit", (raw) => (raw.commit = "nope"), /commit must be object/],
      ["tasks_backend", (raw) => (raw.tasks_backend = "nope"), /tasks_backend must be object/],
      [
        "closure_commit_requires_approval",
        (raw) => (raw.closure_commit_requires_approval = "nope"),
        /closure_commit_requires_approval/,
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

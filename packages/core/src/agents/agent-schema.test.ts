import { describe, expect, it } from "vitest";
import os from "node:os";
import path from "node:path";
import { mkdtemp, writeFile, mkdir } from "node:fs/promises";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

import { validateAgent, lintAgent, lintAgentsDir } from "../index.js";

const VALID_AGENT = {
  id: "TEST_AGENT",
  role: "Test role.",
  description: "Test description.",
  permissions: ["read"],
  workflow: ["Do things."],
};

describe("validateAgent", () => {
  it("accepts a valid agent", () => {
    expect(() => validateAgent(VALID_AGENT)).not.toThrow();
  });

  it("spec example agent validates at runtime", () => {
    const exampleUrl = new URL("../../../spec/examples/agent.json", import.meta.url);
    const text = readFileSync(fileURLToPath(exampleUrl), "utf8");
    const parsed = JSON.parse(text) as unknown;
    expect(() => validateAgent(parsed)).not.toThrow();
  });

  it("accepts agent with tool restrictions", () => {
    const agent = {
      ...VALID_AGENT,
      allowed_tools: ["read", "write"],
      denied_tools: ["git_commit"],
      model_preference: "fast" as const,
    };
    expect(() => validateAgent(agent)).not.toThrow();
  });

  it("rejects missing required fields", () => {
    expect(() => validateAgent({})).toThrow(/agent/);
  });

  it("rejects invalid id pattern", () => {
    expect(() => validateAgent({ ...VALID_AGENT, id: "lowercase" })).toThrow(/agent/);
  });

  it("rejects empty permissions", () => {
    expect(() => validateAgent({ ...VALID_AGENT, permissions: [] })).toThrow(/agent/);
  });

  it("rejects invalid model_preference", () => {
    expect(() =>
      validateAgent({ ...VALID_AGENT, model_preference: "turbo" }),
    ).toThrow(/agent/);
  });
});

describe("lintAgent", () => {
  it("returns no errors for valid agent", () => {
    const result = lintAgent(VALID_AGENT, "TEST_AGENT.json");
    expect(result.errors).toHaveLength(0);
  });

  it("detects filename mismatch", () => {
    const result = lintAgent(VALID_AGENT, "WRONG.json");
    expect(result.errors.some((e) => e.includes("does not match"))).toBe(true);
  });

  it("detects allowed/denied overlap", () => {
    const agent = { ...VALID_AGENT, allowed_tools: ["read", "write"], denied_tools: ["write"] };
    const result = lintAgent(agent);
    expect(result.errors.some((e) => e.includes("overlap"))).toBe(true);
  });

  it("returns schema errors for invalid input", () => {
    const result = lintAgent({ id: "bad" });
    expect(result.errors.length).toBeGreaterThan(0);
  });
});

describe("lintAgentsDir", () => {
  it("lints a directory of valid agents", async () => {
    const tmp = await mkdtemp(path.join(os.tmpdir(), "agentplane-agents-lint-"));
    const agentsDir = path.join(tmp, "agents");
    await mkdir(agentsDir, { recursive: true });

    await writeFile(
      path.join(agentsDir, "ALPHA.json"),
      JSON.stringify({ ...VALID_AGENT, id: "ALPHA" }),
    );
    await writeFile(
      path.join(agentsDir, "BETA.json"),
      JSON.stringify({ ...VALID_AGENT, id: "BETA" }),
    );

    const result = await lintAgentsDir(agentsDir);
    expect(result.errors).toHaveLength(0);
  });

  it("detects duplicate agent IDs", async () => {
    const tmp = await mkdtemp(path.join(os.tmpdir(), "agentplane-agents-dup-"));
    const agentsDir = path.join(tmp, "agents");
    await mkdir(agentsDir, { recursive: true });

    await writeFile(
      path.join(agentsDir, "A.json"),
      JSON.stringify({ ...VALID_AGENT, id: "SAME" }),
    );
    await writeFile(
      path.join(agentsDir, "B.json"),
      JSON.stringify({ ...VALID_AGENT, id: "SAME" }),
    );

    const result = await lintAgentsDir(agentsDir);
    expect(result.errors.some((e) => e.includes("duplicate"))).toBe(true);
  });

  it("reports invalid JSON gracefully", async () => {
    const tmp = await mkdtemp(path.join(os.tmpdir(), "agentplane-agents-bad-"));
    const agentsDir = path.join(tmp, "agents");
    await mkdir(agentsDir, { recursive: true });

    await writeFile(path.join(agentsDir, "BAD.json"), "not json{");

    const result = await lintAgentsDir(agentsDir);
    expect(result.errors.some((e) => e.includes("invalid JSON"))).toBe(true);
  });

  it("warns on empty directory", async () => {
    const tmp = await mkdtemp(path.join(os.tmpdir(), "agentplane-agents-empty-"));
    const agentsDir = path.join(tmp, "agents");
    await mkdir(agentsDir, { recursive: true });

    const result = await lintAgentsDir(agentsDir);
    expect(result.warnings.some((w) => w.includes("no agent JSON"))).toBe(true);
  });

  it("reports missing directory", async () => {
    const result = await lintAgentsDir("/tmp/nonexistent-agents-dir-xyz");
    expect(result.errors.some((e) => e.includes("cannot read"))).toBe(true);
  });
});

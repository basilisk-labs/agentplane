import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import { requireBlueprint } from "../blueprints/registry.js";
import { captureStdIO, mkTempDir } from "@agentplane/testkit";
import { describe, expect, it } from "vitest";

import { runCli } from "./run-cli.js";

async function mkProject(): Promise<string> {
  const root = await mkTempDir();
  await mkdir(path.join(root, ".git"));
  await mkdir(path.join(root, ".agentplane"), { recursive: true });
  await writeFile(
    path.join(root, ".agentplane", "config.json"),
    '{\n  "schema_version": 1,\n  "workflow_mode": "direct"\n}\n',
    "utf8",
  );
  return root;
}

describe("runCli blueprint commands", () => {
  it("blueprint validate accepts a project-local blueprint JSON file", async () => {
    const root = await mkTempDir();
    const blueprintPath = path.join(root, "analysis.custom.json");
    const blueprint = {
      ...structuredClone(requireBlueprint("analysis.light")),
      id: "analysis.custom",
      title: "Custom analysis",
    };
    await writeFile(blueprintPath, `${JSON.stringify(blueprint, null, 2)}\n`, "utf8");

    const io = captureStdIO();
    try {
      const code = await runCli(["blueprint", "validate", blueprintPath, "--json"]);
      expect(code).toBe(0);
      expect(JSON.parse(io.stdout)).toMatchObject({
        ok: true,
        path: blueprintPath,
        blueprint_id: "analysis.custom",
        errors: [],
      });
    } finally {
      io.restore();
    }
  });

  it("blueprint validate rejects invalid JSON", async () => {
    const root = await mkTempDir();
    const blueprintPath = path.join(root, "invalid.json");
    await writeFile(blueprintPath, "{", "utf8");

    const io = captureStdIO();
    try {
      const code = await runCli(["blueprint", "validate", blueprintPath]);
      expect(code).toBe(3);
      expect(io.stderr).toContain("not valid JSON");
    } finally {
      io.restore();
    }
  });

  it("blueprint validate reports blueprint contract errors", async () => {
    const root = await mkTempDir();
    const blueprintPath = path.join(root, "missing-core.json");
    const blueprint = structuredClone(requireBlueprint("analysis.light"));
    blueprint.nodes = blueprint.nodes.filter((node) => node.kind !== "context_resolve");
    blueprint.edges = blueprint.edges.filter(
      (edge) => edge.from !== "context_resolve" && edge.to !== "context_resolve",
    );
    await writeFile(blueprintPath, `${JSON.stringify(blueprint, null, 2)}\n`, "utf8");

    const io = captureStdIO();
    try {
      const code = await runCli(["blueprint", "validate", blueprintPath]);
      expect(code).toBe(3);
      expect(io.stderr).toContain("missing_core_node");
    } finally {
      io.restore();
    }
  });

  it("blueprint scaffold creates a project-local blueprint file", async () => {
    const root = await mkProject();
    const io = captureStdIO();
    try {
      const code = await runCli(["--root", root, "blueprint", "scaffold", "analysis.custom"]);
      expect(code).toBe(0);
      const blueprintPath = path.join(root, ".agentplane", "blueprints", "analysis.custom.json");
      const blueprint = JSON.parse(await readFile(blueprintPath, "utf8")) as { id?: string };
      expect(blueprint.id).toBe("analysis.custom");
      expect(io.stdout).toContain("blueprint scaffolded:");
    } finally {
      io.restore();
    }
  });

  it("blueprint list --project includes validated project-local blueprints", async () => {
    const root = await mkProject();
    const blueprintPath = path.join(root, ".agentplane", "blueprints", "analysis.custom.json");
    await mkdir(path.dirname(blueprintPath), { recursive: true });
    await writeFile(
      blueprintPath,
      `${JSON.stringify(
        {
          ...structuredClone(requireBlueprint("analysis.light")),
          id: "analysis.custom",
          title: "Custom analysis",
        },
        null,
        2,
      )}\n`,
      "utf8",
    );

    const io = captureStdIO();
    try {
      const code = await runCli(["--root", root, "blueprint", "list", "--project", "--json"]);
      expect(code).toBe(0);
      const payload = JSON.parse(io.stdout) as {
        blueprints: { id: string; source: string; path?: string }[];
      };
      expect(payload.blueprints).toContainEqual(
        expect.objectContaining({
          id: "analysis.custom",
          source: "project",
          path: blueprintPath,
        }),
      );
    } finally {
      io.restore();
    }
  });
});

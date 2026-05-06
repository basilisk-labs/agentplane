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

  it("blueprint validate reports malformed blueprint objects without crashing", async () => {
    const root = await mkTempDir();
    const blueprintPath = path.join(root, "malformed.json");
    await writeFile(
      blueprintPath,
      JSON.stringify(
        {
          id: "analysis.malformed",
          title: "Malformed",
          description: "Missing context budget",
          taskKinds: ["analysis"],
          allowedCommands: [],
          policyModules: [],
          nodes: [],
          edges: [],
          requiredEvidence: [],
          stopRules: [],
        },
        null,
        2,
      ),
      "utf8",
    );

    const io = captureStdIO();
    try {
      const code = await runCli(["blueprint", "validate", blueprintPath]);
      expect(code).toBe(3);
      expect(io.stderr).toContain("invalid_shape");
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

  it("blueprint scaffold rejects output paths outside the project", async () => {
    const root = await mkProject();
    const io = captureStdIO();
    try {
      const code = await runCli([
        "--root",
        root,
        "blueprint",
        "scaffold",
        "analysis.custom",
        "--out",
        "../outside.json",
      ]);
      expect(code).not.toBe(0);
      expect(io.stderr).toContain("output must stay inside the project");
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

  it("blueprint explain resolves an explicitly trusted project-local blueprint", async () => {
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
    await writeFile(
      path.join(root, ".agentplane", "blueprints", "config.json"),
      '{\n  "enabled": true,\n  "allowed_ids": ["analysis.custom"],\n  "selection": "explicit_only"\n}\n',
      "utf8",
    );

    const io = captureStdIO();
    try {
      const code = await runCli([
        "--root",
        root,
        "blueprint",
        "explain",
        "--kind",
        "analysis",
        "--mutation",
        "none",
        "--blueprint",
        "analysis.custom",
        "--json",
      ]);
      expect(code).toBe(0);
      const payload = JSON.parse(io.stdout) as {
        blueprintId: string;
        selectionReasons: string[];
      };
      expect(payload.blueprintId).toBe("analysis.custom");
      expect(payload.selectionReasons).toContain(
        "trusted project-local blueprint selected: analysis.custom",
      );
    } finally {
      io.restore();
    }
  });

  it("blueprint explain rejects project-local blueprints without trust config opt-in", async () => {
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
      const code = await runCli([
        "--root",
        root,
        "blueprint",
        "explain",
        "--kind",
        "analysis",
        "--mutation",
        "none",
        "--blueprint",
        "analysis.custom",
      ]);
      expect(code).not.toBe(0);
      expect(io.stderr).toContain("Unknown blueprint in registry: analysis.custom");
    } finally {
      io.restore();
    }
  });

  it("blueprint validate --project reports invalid trust config entries", async () => {
    const root = await mkProject();
    await mkdir(path.join(root, ".agentplane", "blueprints"), { recursive: true });
    await writeFile(
      path.join(root, ".agentplane", "blueprints", "config.json"),
      '{\n  "enabled": true,\n  "allowed_ids": ["analysis.missing"],\n  "selection": "explicit_only"\n}\n',
      "utf8",
    );

    const io = captureStdIO();
    try {
      const code = await runCli(["--root", root, "blueprint", "validate", "--project"]);
      expect(code).toBe(3);
      expect(io.stderr).toContain("allows unknown project-local blueprint id");
    } finally {
      io.restore();
    }
  });

  it("blueprint validate --project rejects non-string trust allowlist entries", async () => {
    const root = await mkProject();
    await mkdir(path.join(root, ".agentplane", "blueprints"), { recursive: true });
    await writeFile(
      path.join(root, ".agentplane", "blueprints", "config.json"),
      '{\n  "enabled": true,\n  "allowed_ids": ["analysis.custom", 7, ""],\n  "selection": "explicit_only"\n}\n',
      "utf8",
    );

    const io = captureStdIO();
    try {
      const code = await runCli(["--root", root, "blueprint", "validate", "--project"]);
      expect(code).toBe(3);
      expect(io.stderr).toContain("allowed_ids[1] must be a non-empty string");
      expect(io.stderr).toContain("allowed_ids[2] must be a non-empty string");
    } finally {
      io.restore();
    }
  });

  it("blueprint list --project rejects local blueprints that shadow built-ins", async () => {
    const root = await mkProject();
    const blueprintPath = path.join(root, ".agentplane", "blueprints", "analysis.light.json");
    await mkdir(path.dirname(blueprintPath), { recursive: true });
    await writeFile(
      blueprintPath,
      `${JSON.stringify(requireBlueprint("analysis.light"), null, 2)}\n`,
      "utf8",
    );

    const io = captureStdIO();
    try {
      const code = await runCli(["--root", root, "blueprint", "list", "--project"]);
      expect(code).toBe(3);
      expect(io.stderr).toContain("must not shadow a built-in blueprint id");
    } finally {
      io.restore();
    }
  });

  it("blueprint snapshot refreshes a task-local resolved snapshot artifact", async () => {
    const root = await mkProject();
    let taskId = "";
    const createIo = captureStdIO();
    try {
      const createCode = await runCli([
        "--root",
        root,
        "task",
        "new",
        "--title",
        "Implement route",
        "--description",
        "Write code",
        "--priority",
        "med",
        "--owner",
        "CODER",
        "--tag",
        "code",
      ]);
      expect(createCode).toBe(0);
      taskId = createIo.stdout.trim();
    } finally {
      createIo.restore();
    }

    const refreshIo = captureStdIO();
    try {
      const code = await runCli(["--root", root, "blueprint", "snapshot", taskId, "--json"]);
      expect(code).toBe(0);
      const output = JSON.parse(refreshIo.stdout) as {
        old_digest: string | null;
        new_digest: string;
        changed: boolean;
        route_changed: boolean | null;
        path: string;
      };
      expect(output.old_digest).toBeNull();
      expect(output.new_digest).toMatch(/^[a-f0-9]{64}$/);
      expect(output.changed).toBe(true);
      expect(output.route_changed).toBeNull();
      const snapshot = JSON.parse(await readFile(output.path, "utf8")) as {
        selectedBlueprint?: { id?: string };
      };
      expect(snapshot.selectedBlueprint?.id).toBe("code.direct");
    } finally {
      refreshIo.restore();
    }
  });

  it("blueprint drift detects missing and current snapshots", async () => {
    const root = await mkProject();
    let taskId = "";
    const createIo = captureStdIO();
    try {
      const createCode = await runCli([
        "--root",
        root,
        "task",
        "new",
        "--title",
        "Analyze route",
        "--description",
        "Read-only analysis",
        "--priority",
        "med",
        "--owner",
        "ANALYST",
        "--tag",
        "analysis",
      ]);
      expect(createCode).toBe(0);
      taskId = createIo.stdout.trim();
    } finally {
      createIo.restore();
    }

    const missingIo = captureStdIO();
    try {
      const missingCode = await runCli(["--root", root, "blueprint", "drift", taskId, "--json"]);
      expect(missingCode).toBe(2);
      const missing = JSON.parse(missingIo.stdout) as { state?: string; safe_command?: string };
      expect(missing.state).toBe("missing");
      expect(missing.safe_command).toBe(`agentplane blueprint snapshot ${taskId}`);
    } finally {
      missingIo.restore();
    }

    const refreshIo = captureStdIO();
    try {
      expect(await runCli(["--root", root, "blueprint", "snapshot", taskId, "--json"])).toBe(0);
    } finally {
      refreshIo.restore();
    }

    const currentIo = captureStdIO();
    try {
      const currentCode = await runCli(["--root", root, "blueprint", "drift", taskId, "--json"]);
      expect(currentCode).toBe(0);
      const current = JSON.parse(currentIo.stdout) as { state?: string; route_changed?: boolean };
      expect(current.state).toBe("current");
      expect(current.route_changed).toBe(false);
    } finally {
      currentIo.restore();
    }
  });
});

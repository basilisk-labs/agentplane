import { createHash } from "node:crypto";
import { execFile } from "node:child_process";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";

import { requireBlueprint } from "../blueprints/registry.js";
import { captureStdIO, mkTempDir } from "@agentplane/testkit";
import { describe, expect, it } from "vitest";

import { runCli } from "./run-cli.js";

const execFileAsync = promisify(execFile);

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

async function mkBlueprintCatalogFixture(): Promise<{ root: string; indexPath: string }> {
  const root = await mkTempDir();
  const blueprint = {
    ...structuredClone(requireBlueprint("analysis.light")),
    id: "analysis.external",
    title: "External analysis",
  };
  await mkdir(path.join(root, "catalog"), { recursive: true });
  await mkdir(path.join(root, "blueprints", "external-analysis", "blueprints"), {
    recursive: true,
  });
  await mkdir(path.join(root, "packs", "baseline"), { recursive: true });
  await writeFile(
    path.join(root, "catalog", "index.json"),
    `${JSON.stringify(
      {
        schema_version: 1,
        catalog_id: "test-blueprints",
        name: "Test Blueprints",
        blueprints: [
          {
            id: "external-analysis",
            path: "blueprints/external-analysis/blueprint.json",
          },
        ],
        packs: [{ id: "baseline", path: "packs/baseline/pack.json" }],
      },
      null,
      2,
    )}\n`,
    "utf8",
  );
  await writeFile(
    path.join(root, "blueprints", "external-analysis", "blueprint.json"),
    `${JSON.stringify(
      {
        schema_version: 1,
        id: "external-analysis",
        version: "0.1.0",
        name: "External Analysis",
        summary: "External analysis route.",
        definition: {
          id: "analysis.external",
          path: "blueprints/analysis.external.json",
        },
        activation: {
          recommended_allowed_ids: ["analysis.external"],
        },
      },
      null,
      2,
    )}\n`,
    "utf8",
  );
  await writeFile(
    path.join(root, "blueprints", "external-analysis", "blueprints", "analysis.external.json"),
    `${JSON.stringify(blueprint, null, 2)}\n`,
    "utf8",
  );
  await writeFile(
    path.join(root, "packs", "baseline", "pack.json"),
    `${JSON.stringify(
      {
        schema_version: 1,
        id: "baseline",
        version: "0.1.0",
        name: "Baseline",
        summary: "Baseline blueprint pack.",
        blueprints: [{ id: "external-analysis", required: true }],
        activation: {
          recommended_allowed_ids: ["analysis.external"],
        },
      },
      null,
      2,
    )}\n`,
    "utf8",
  );
  return { root, indexPath: path.join(root, "catalog", "index.json") };
}

async function mkPackagedBlueprintCatalogFixture(): Promise<{ root: string; indexPath: string }> {
  const fixture = await mkBlueprintCatalogFixture();
  const distDir = path.join(fixture.root, "dist");
  await mkdir(distDir, { recursive: true });
  const archivePath = path.join(distDir, "external-analysis-0.1.0.tar.gz");
  await execFileAsync("tar", [
    "-czf",
    archivePath,
    "-C",
    path.join(fixture.root, "blueprints"),
    "external-analysis",
  ]);
  const sha256 = createHash("sha256").update(await readFile(archivePath)).digest("hex");
  const releaseIndexPath = path.join(fixture.root, "index.json");
  await writeFile(
    releaseIndexPath,
    `${JSON.stringify(
      {
        schema_version: 1,
        catalog_id: "test-blueprints",
        name: "Test Blueprints",
        blueprints: [
          {
            id: "external-analysis",
            name: "External Analysis",
            summary: "External analysis route.",
            activation: {
              recommended_allowed_ids: ["analysis.external"],
            },
            versions: [
              {
                version: "0.1.0",
                url: archivePath,
                sha256,
                min_agentplane_version: "0.5.0-rc.1",
                tags: ["analysis"],
              },
            ],
          },
        ],
        packs: [
          {
            id: "baseline",
            version: "0.1.0",
            name: "Baseline",
            summary: "Baseline blueprint pack.",
            blueprints: [{ id: "external-analysis", required: true }],
            activation: {
              recommended_allowed_ids: ["analysis.external"],
            },
          },
        ],
      },
      null,
      2,
    )}\n`,
    "utf8",
  );
  return { root: fixture.root, indexPath: releaseIndexPath };
}

describe("runCli blueprint commands", () => {
  it("blueprint examples shows practical route inspection commands", async () => {
    const io = captureStdIO();
    try {
      const code = await runCli(["blueprint", "examples"]);
      expect(code).toBe(0);
      expect(io.stdout).toContain("Blueprint route inspection examples");
      expect(io.stdout).toContain("analysis.light");
      expect(io.stdout).toContain("code.branch_pr");
      expect(io.stdout).toContain("agentplane blueprint explain --kind analysis --mutation none");
    } finally {
      io.restore();
    }
  });

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

  it("blueprints catalog refresh caches a local external catalog", async () => {
    const home = await mkTempDir();
    const originalHome = process.env.AGENTPLANE_HOME;
    process.env.AGENTPLANE_HOME = home;
    const fixture = await mkBlueprintCatalogFixture();
    const io = captureStdIO();
    try {
      const code = await runCli([
        "blueprints",
        "catalog",
        "refresh",
        "--index",
        fixture.indexPath,
        "--json",
      ]);
      expect(code).toBe(0);
      expect(JSON.parse(io.stdout)).toMatchObject({
        catalog_id: "test-blueprints",
        blueprints: 1,
        packs: 1,
        source: fixture.indexPath,
      });
    } finally {
      io.restore();
      if (originalHome === undefined) delete process.env.AGENTPLANE_HOME;
      else process.env.AGENTPLANE_HOME = originalHome;
    }
  });

  it("blueprints install writes an external blueprint without activating it by default", async () => {
    const home = await mkTempDir();
    const originalHome = process.env.AGENTPLANE_HOME;
    process.env.AGENTPLANE_HOME = home;
    const fixture = await mkBlueprintCatalogFixture();
    const root = await mkProject();
    const io = captureStdIO();
    try {
      const code = await runCli([
        "--root",
        root,
        "blueprints",
        "install",
        "external-analysis",
        "--index",
        fixture.indexPath,
        "--json",
      ]);
      expect(code).toBe(0);
      const payload = JSON.parse(io.stdout) as {
        activated: boolean;
        installed: { blueprintId: string; projectPath: string }[];
        allowed_ids: string[];
      };
      expect(payload.activated).toBe(false);
      expect(payload.allowed_ids).toEqual([]);
      expect(payload.installed).toEqual([
        expect.objectContaining({
          blueprintId: "analysis.external",
          projectPath: ".agentplane/blueprints/analysis.external.json",
        }),
      ]);
      const installed = JSON.parse(
        await readFile(
          path.join(root, ".agentplane", "blueprints", "analysis.external.json"),
          "utf8",
        ),
      ) as { id?: string };
      expect(installed.id).toBe("analysis.external");
    } finally {
      io.restore();
      if (originalHome === undefined) delete process.env.AGENTPLANE_HOME;
      else process.env.AGENTPLANE_HOME = originalHome;
    }
  });

  it("blueprints install writes a packaged blueprint after checksum verification", async () => {
    const home = await mkTempDir();
    const originalHome = process.env.AGENTPLANE_HOME;
    process.env.AGENTPLANE_HOME = home;
    const fixture = await mkPackagedBlueprintCatalogFixture();
    const root = await mkProject();
    const io = captureStdIO();
    try {
      const code = await runCli([
        "--root",
        root,
        "blueprints",
        "install",
        "external-analysis",
        "--index",
        fixture.indexPath,
        "--activate",
        "--json",
      ]);
      expect(code).toBe(0);
      const payload = JSON.parse(io.stdout) as {
        activated: boolean;
        installed: { blueprintId: string; projectPath: string }[];
        allowed_ids: string[];
      };
      expect(payload.activated).toBe(true);
      expect(payload.allowed_ids).toEqual(["analysis.external"]);
      expect(payload.installed).toEqual([
        expect.objectContaining({
          blueprintId: "analysis.external",
          projectPath: ".agentplane/blueprints/analysis.external.json",
        }),
      ]);
      const installed = JSON.parse(
        await readFile(
          path.join(root, ".agentplane", "blueprints", "analysis.external.json"),
          "utf8",
        ),
      ) as { id?: string };
      expect(installed.id).toBe("analysis.external");
      await expect(
        readFile(
          path.join(root, ".agentplane", "blueprint-catalog", "external-analysis", "blueprint.json"),
          "utf8",
        ),
      ).resolves.toContain('"external-analysis"');
    } finally {
      io.restore();
      if (originalHome === undefined) delete process.env.AGENTPLANE_HOME;
      else process.env.AGENTPLANE_HOME = originalHome;
    }
  });

  it("blueprints install rejects traversal in blueprint definition ids", async () => {
    const fixture = await mkBlueprintCatalogFixture();
    const root = await mkProject();
    await writeFile(
      path.join(fixture.root, "blueprints", "external-analysis", "blueprint.json"),
      `${JSON.stringify(
        {
          schema_version: 1,
          id: "external-analysis",
          version: "0.1.0",
          name: "External Analysis",
          summary: "External analysis route.",
          definition: {
            id: "../escaped",
            path: "blueprints/analysis.external.json",
          },
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
        "blueprints",
        "install",
        "external-analysis",
        "--index",
        fixture.indexPath,
      ]);
      expect(code).not.toBe(0);
      expect(io.stderr).toContain("definition.id must be a safe path segment");
      await expect(
        readFile(path.join(root, ".agentplane", "escaped.json"), "utf8"),
      ).rejects.toThrow();
    } finally {
      io.restore();
    }
  });

  it("blueprints install rejects traversal in local catalog manifest ids before provenance copy", async () => {
    const fixture = await mkBlueprintCatalogFixture();
    const root = await mkProject();
    const escapedCatalogDir = path.join(root, ".agentplane", "escaped-catalog");
    const sentinelPath = path.join(escapedCatalogDir, "sentinel.txt");
    await mkdir(escapedCatalogDir, { recursive: true });
    await writeFile(sentinelPath, "keep\n", "utf8");
    await writeFile(
      path.join(fixture.root, "blueprints", "external-analysis", "blueprint.json"),
      `${JSON.stringify(
        {
          schema_version: 1,
          id: "../escaped-catalog",
          version: "0.1.0",
          name: "External Analysis",
          summary: "External analysis route.",
          definition: {
            id: "analysis.external",
            path: "blueprints/analysis.external.json",
          },
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
        "blueprints",
        "install",
        "external-analysis",
        "--index",
        fixture.indexPath,
      ]);
      expect(code).not.toBe(0);
      expect(io.stderr).toContain("manifest id must be a safe path segment");
      await expect(readFile(sentinelPath, "utf8")).resolves.toBe("keep\n");
      await expect(
        readFile(path.join(root, ".agentplane", "blueprints", "analysis.external.json"), "utf8"),
      ).rejects.toThrow();
    } finally {
      io.restore();
    }
  });

  it("blueprints install can activate every blueprint in a pack", async () => {
    const home = await mkTempDir();
    const originalHome = process.env.AGENTPLANE_HOME;
    process.env.AGENTPLANE_HOME = home;
    const fixture = await mkBlueprintCatalogFixture();
    const root = await mkProject();
    const io = captureStdIO();
    try {
      const code = await runCli([
        "--root",
        root,
        "blueprints",
        "install",
        "baseline",
        "--kind",
        "pack",
        "--index",
        fixture.indexPath,
        "--activate",
        "--json",
      ]);
      expect(code).toBe(0);
      expect(JSON.parse(io.stdout)).toMatchObject({
        target: "baseline",
        kind: "pack",
        activated: true,
        allowed_ids: ["analysis.external"],
      });
      const trustConfig = JSON.parse(
        await readFile(path.join(root, ".agentplane", "blueprints", "config.json"), "utf8"),
      ) as { allowed_ids?: string[] };
      expect(trustConfig.allowed_ids).toEqual(["analysis.external"]);
    } finally {
      io.restore();
      if (originalHome === undefined) delete process.env.AGENTPLANE_HOME;
      else process.env.AGENTPLANE_HOME = originalHome;
    }
  });

  it("init can install and activate cached blueprint packs explicitly", async () => {
    const home = await mkTempDir();
    const originalHome = process.env.AGENTPLANE_HOME;
    process.env.AGENTPLANE_HOME = home;
    const fixture = await mkBlueprintCatalogFixture();
    const root = await mkTempDir();
    try {
      const refreshIo = captureStdIO();
      try {
        const refreshCode = await runCli([
          "blueprints",
          "catalog",
          "refresh",
          "--index",
          fixture.indexPath,
          "--json",
        ]);
        expect(refreshCode).toBe(0);
      } finally {
        refreshIo.restore();
      }

      const initIo = captureStdIO();
      try {
        const initCode = await runCli([
          "init",
          "--yes",
          "--setup-profile",
          "full-harness",
          "--blueprints",
          "pack:baseline",
          "--gitignore-agents",
          "--root",
          root,
        ]);
        expect(initCode).toBe(0);
      } finally {
        initIo.restore();
      }

      const installed = JSON.parse(
        await readFile(
          path.join(root, ".agentplane", "blueprints", "analysis.external.json"),
          "utf8",
        ),
      ) as { id?: string };
      expect(installed.id).toBe("analysis.external");
      const trustConfig = JSON.parse(
        await readFile(path.join(root, ".agentplane", "blueprints", "config.json"), "utf8"),
      ) as { allowed_ids?: string[] };
      expect(trustConfig.allowed_ids).toEqual(["analysis.external"]);
    } finally {
      if (originalHome === undefined) delete process.env.AGENTPLANE_HOME;
      else process.env.AGENTPLANE_HOME = originalHome;
    }
  });

  it("blueprint report emits project-local compatibility status", async () => {
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
      '{\n  "schema_version": 1,\n  "trust_model": "explicit_allowlist",\n  "enabled": true,\n  "allowed_ids": ["analysis.custom"],\n  "selection": "explicit_only"\n}\n',
      "utf8",
    );

    const io = captureStdIO();
    try {
      const code = await runCli(["--root", root, "blueprint", "report", "--json"]);
      expect(code).toBe(0);
      expect(JSON.parse(io.stdout)).toMatchObject({
        schemaVersion: 1,
        compatible: true,
        trustedBlueprintIds: ["analysis.custom"],
        blueprints: [
          {
            blueprintId: "analysis.custom",
            trusted: true,
            ok: true,
          },
        ],
      });
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

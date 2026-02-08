import { createHash, generateKeyPairSync, sign } from "node:crypto";
import { mkdir, mkdtemp, readFile, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { runCli } from "./run-cli.js";
import {
  captureStdIO,
  createRecipeArchive,
  createRecipeArchiveWithManifest,
  createUnsafeRecipeArchive,
  getAgentplaneHome,
  mkGitRepoRoot,
  pathExists,
  registerAgentplaneHome,
  resetAgentplaneHomeRecipes,
  runCliSilent,
  silenceStdIO,
  writeDefaultConfig,
} from "./run-cli.test-helpers.js";

registerAgentplaneHome();

const agentplaneHomePath = () => getAgentplaneHome() ?? "";
const originalRecipesKeys = process.env.AGENTPLANE_RECIPES_INDEX_PUBLIC_KEYS;
let restoreStdIO: (() => void) | null = null;
let testKeyId = "test-key";
let testPrivateKey: ReturnType<typeof generateKeyPairSync>["privateKey"] | null = null;

function signIndexPayload(indexText: string): {
  schema_version: 1;
  key_id: string;
  signature: string;
} {
  if (!testPrivateKey) throw new Error("test private key not set");
  const signature = sign(null, Buffer.from(indexText), testPrivateKey).toString("base64");
  return { schema_version: 1, key_id: testKeyId, signature };
}

async function writeSignedIndex(indexPath: string, payload: unknown): Promise<void> {
  const indexText = JSON.stringify(payload, null, 2);
  await writeFile(indexPath, indexText, "utf8");
  const signature = signIndexPayload(indexText);
  await writeFile(`${indexPath}.sig`, JSON.stringify(signature, null, 2), "utf8");
}

beforeEach(() => {
  restoreStdIO = silenceStdIO();
  const { publicKey, privateKey } = generateKeyPairSync("ed25519");
  testPrivateKey = privateKey;
  const publicPem = publicKey.export({ type: "spki", format: "pem" }).toString();
  process.env.AGENTPLANE_RECIPES_INDEX_PUBLIC_KEYS = JSON.stringify({ [testKeyId]: publicPem });
});

afterEach(() => {
  restoreStdIO?.();
  restoreStdIO = null;
  if (originalRecipesKeys === undefined) {
    delete process.env.AGENTPLANE_RECIPES_INDEX_PUBLIC_KEYS;
  } else {
    process.env.AGENTPLANE_RECIPES_INDEX_PUBLIC_KEYS = originalRecipesKeys;
  }
  testPrivateKey = null;
});

describe("runCli recipes", () => {
  it("recipes install renames agents on conflict when requested", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const agentsDir = path.join(root, ".agentplane", "agents");
    await mkdir(agentsDir, { recursive: true });
    await writeFile(
      path.join(agentsDir, "viewer__RECIPE_AGENT.json"),
      JSON.stringify({ id: "viewer__RECIPE_AGENT", role: "Existing agent" }, null, 2),
      "utf8",
    );

    const { archivePath } = await createRecipeArchive({ id: "viewer" });
    const io = captureStdIO();
    try {
      const code = await runCli([
        "recipes",
        "install",
        "--path",
        archivePath,
        "--on-conflict",
        "rename",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
    } finally {
      io.restore();
    }

    const renamedPath = path.join(agentsDir, "viewer__RECIPE_AGENT__1.json");
    expect(await pathExists(renamedPath)).toBe(true);
    const renamedText = await readFile(renamedPath, "utf8");
    expect(renamedText).toContain(`"id": "viewer__RECIPE_AGENT__1"`);
  });

  it("recipes install accepts zip archives with a top-level folder", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const { archivePath, manifest } = await createRecipeArchive({
      id: "zipper",
      version: "0.1.0",
      format: "zip",
      wrapDir: true,
    });

    const io = captureStdIO();
    try {
      const code = await runCli(["recipes", "install", "--path", archivePath, "--root", root]);
      expect(code).toBe(0);
    } finally {
      io.restore();
    }

    const manifestPath = path.join(
      agentplaneHomePath(),
      "recipes",
      String(manifest.id),
      String(manifest.version),
      "manifest.json",
    );
    expect(await pathExists(manifestPath)).toBe(true);
  });

  it("rejects tar archives with path traversal entries", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const archivePath = await createUnsafeRecipeArchive({ format: "tar" });

    const io = captureStdIO();
    try {
      const code = await runCli(["recipes", "install", "--path", archivePath, "--root", root]);
      expect(code).toBe(3);
      expect(io.stderr).toContain("Unsafe archive entry");
    } finally {
      io.restore();
    }
  });

  it("rejects zip archives with path traversal entries", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const archivePath = await createUnsafeRecipeArchive({ format: "zip" });

    const io = captureStdIO();
    try {
      const code = await runCli(["recipes", "install", "--path", archivePath, "--root", root]);
      expect(code).toBe(4);
      expect(io.stderr).toContain("invalid relative path");
    } finally {
      io.restore();
    }
  });

  it("recipes list reports when no recipes are installed", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    await resetAgentplaneHomeRecipes();
    const io = captureStdIO();
    try {
      const code = await runCli(["recipes", "list"]);
      expect(code).toBe(0);
      expect(io.stdout).toContain("No installed recipes found.");
    } finally {
      io.restore();
    }
  });

  it("recipes list supports --full output", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    await resetAgentplaneHomeRecipes();
    const archivePath = await createRecipeArchiveWithManifest({
      manifest: {
        schema_version: "1",
        id: "full",
        version: "1.0.0",
        name: "Full recipe",
        summary: "Full summary",
        description: "Full description",
      },
    });
    await runCliSilent(["recipes", "install", "--path", archivePath, "--root", root]);

    const io = captureStdIO();
    try {
      const code = await runCli(["recipes", "list", "--full", "--root", root]);
      expect(code).toBe(0);
      expect(io.stdout).toContain('"id": "full"');
      expect(io.stdout).toContain('"version": "1.0.0"');
    } finally {
      io.restore();
    }
  });

  it("recipes list rejects empty tag values", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const io = captureStdIO();
    try {
      const code = await runCli(["recipes", "list", "--tag", " ", "--root", root]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Option --tag must not be empty.");
      expect(io.stderr).toContain("Usage:");
      expect(io.stderr).toContain("agentplane recipes list");
      expect(io.stderr).toContain("agentplane help recipes list --compact");
    } finally {
      io.restore();
    }
  });

  it("recipes list rejects invalid recipes.json entries", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    await resetAgentplaneHomeRecipes();
    const recipesPath = path.join(agentplaneHomePath(), "recipes.json");
    await writeFile(
      recipesPath,
      JSON.stringify(
        {
          schema_version: 1,
          updated_at: new Date().toISOString(),
          recipes: [
            {
              id: "bad",
              version: "1.0.0",
              source: "",
              installed_at: "",
              manifest: {
                schema_version: "1",
                id: "bad",
                version: "1.0.0",
                name: "Bad",
                summary: "Bad",
                description: "Bad",
              },
            },
          ],
        },
        null,
        2,
      ),
      "utf8",
    );

    const io = captureStdIO();
    try {
      const code = await runCli(["recipes", "list"]);
      expect(code).toBe(4);
      expect(io.stderr).toContain(
        "Invalid field recipes.json.recipes[]: expected id, version, source, installed_at",
      );
    } finally {
      io.restore();
    }
  });

  it("recipes install rejects invalid manifest tags", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    await resetAgentplaneHomeRecipes();
    const archivePath = await createRecipeArchiveWithManifest({
      manifest: {
        schema_version: "1",
        id: "invalid-tags",
        version: "1.0.0",
        name: "Invalid Tags",
        summary: "Invalid",
        description: "Invalid",
        tags: "nope",
      },
    });

    const io = captureStdIO();
    try {
      const code = await runCli(["recipes", "install", "--path", archivePath, "--root", root]);
      expect(code).toBe(4);
      expect(io.stderr).toContain("Invalid field manifest.tags: expected string[]");
    } finally {
      io.restore();
    }
  });

  it("recipes install rejects invalid manifest id", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    await resetAgentplaneHomeRecipes();
    const archivePath = await createRecipeArchiveWithManifest({
      manifest: {
        schema_version: "1",
        id: "bad/path",
        version: "1.0.0",
        name: "Invalid Id",
        summary: "Invalid",
        description: "Invalid",
      },
    });

    const io = captureStdIO();
    try {
      const code = await runCli(["recipes", "install", "--path", archivePath, "--root", root]);
      expect(code).toBe(4);
      expect(io.stderr).toContain("Invalid manifest.id: must not contain path separators");
    } finally {
      io.restore();
    }
  });

  it("recipes install rejects invalid agent and scenario assets", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);

    const cases: {
      manifest: Record<string, unknown>;
      files?: Record<string, string>;
      pattern: RegExp;
    }[] = [
      {
        manifest: {
          schema_version: "1",
          id: "bad-agent-id",
          version: "1.0.0",
          name: "Bad Agent",
          summary: "Bad Agent",
          description: "Bad Agent",
          agents: [{ id: "bad/id", summary: "Bad", file: "agents/bad.json" }],
        },
        files: { "agents/bad.json": '{"id":"X"}' },
        pattern: /Invalid agent\.id: must not contain path separators/,
      },
      {
        manifest: {
          schema_version: "1",
          id: "missing-agent-file",
          version: "1.0.0",
          name: "Missing Agent",
          summary: "Missing Agent",
          description: "Missing Agent",
          agents: [{ id: "AGENT", summary: "Agent", file: "agents/missing.json" }],
        },
        pattern: /Missing recipe agent file/,
      },
      {
        manifest: {
          schema_version: "1",
          id: "bad-agent-json",
          version: "1.0.0",
          name: "Bad Agent Json",
          summary: "Bad Agent Json",
          description: "Bad Agent Json",
          agents: [{ id: "AGENT", summary: "Agent", file: "agents/bad.json" }],
        },
        files: { "agents/bad.json": "[]" },
        pattern: /Invalid field recipe agent file: expected JSON object/,
      },
      {
        manifest: {
          schema_version: "1",
          id: "bad-scenario-id",
          version: "1.0.0",
          name: "Bad Scenario",
          summary: "Bad Scenario",
          description: "Bad Scenario",
          tools: [{ id: "TOOL", summary: "Tool", runtime: "bash", entrypoint: "tools/run.sh" }],
        },
        files: {
          "tools/run.sh": "#!/usr/bin/env bash\n",
          "scenarios/bad.json": JSON.stringify(
            {
              schema_version: "1",
              id: "..",
              summary: "Bad",
              goal: "Goal",
              inputs: [],
              outputs: [],
              steps: [{ tool: "TOOL" }],
            },
            null,
            2,
          ),
        },
        pattern: /Invalid scenario\.id: must not be '\.' or '\.\.'/,
      },
    ];

    for (const entry of cases) {
      await resetAgentplaneHomeRecipes();
      const archivePath = await createRecipeArchiveWithManifest({
        manifest: entry.manifest,
        files: entry.files,
      });
      const io = captureStdIO();
      try {
        const code = await runCli(["recipes", "install", "--path", archivePath, "--root", root]);
        expect(code).toBe(4);
        expect(io.stderr).toMatch(entry.pattern);
      } finally {
        io.restore();
      }
    }
  });

  it("recipes list-remote reads cached index", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const indexPath = path.join(agentplaneHomePath(), "recipes-index.json");
    const index = {
      schema_version: 1,
      recipes: [
        {
          id: "viewer",
          summary: "Viewer recipe",
          versions: [
            {
              version: "1.2.3",
              url: "https://example.com/viewer.tar.gz",
              sha256: "abc123",
            },
          ],
        },
      ],
    };
    await writeSignedIndex(indexPath, index);

    const io = captureStdIO();
    try {
      const code = await runCli(["recipes", "list-remote"]);
      expect(code).toBe(0);
      expect(io.stdout).toContain("viewer@1.2.3 - Viewer recipe");
    } finally {
      io.restore();
    }
  });

  it("recipes list-remote rejects invalid cached index", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const indexPath = path.join(agentplaneHomePath(), "recipes-index.json");
    const index = {
      schema_version: 1,
      recipes: [{ id: "broken", summary: "Broken", versions: [] }],
    };
    await writeSignedIndex(indexPath, index);

    const io = captureStdIO();
    try {
      const code = await runCli(["recipes", "list-remote"]);
      expect(code).toBe(4);
      expect(io.stderr).toContain(
        "Invalid field recipes index.recipes[]: expected id, summary, versions",
      );
    } finally {
      io.restore();
    }
  });

  it("recipes flag parsing rejects invalid usage", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const cases: { args: string[]; msg: string }[] = [
      { args: ["recipes", "install"], msg: "Exactly one source is required" },
      { args: ["recipes", "install", "--name"], msg: "Missing value after --name" },
      { args: ["recipes", "install", "--path"], msg: "Missing value after --path" },
      { args: ["recipes", "install", "--url"], msg: "Missing value after --url" },
      {
        args: ["recipes", "install", "--name", "x", "--path", "y"],
        msg: "Exactly one source is required",
      },
      {
        args: ["recipes", "install", "--path", "x", "extra"],
        msg: "Exactly one source is required",
      },
      {
        args: ["recipes", "install", "--conflict", "nope", "--path", "x"],
        msg: "Unknown option: --conflict",
      },
      { args: ["recipes", "list", "--tag"], msg: "Missing value after --tag" },
      { args: ["recipes", "list", "--nope"], msg: "Unknown option: --nope" },
      { args: ["recipes", "cache"], msg: "Usage: agentplane recipes cache <prune> [args]" },
      {
        args: ["recipes", "cache", "nope"],
        msg: "Usage: agentplane recipes cache <prune> [args]",
      },
      {
        args: ["recipes", "cache", "prune", "--wat"],
        msg: "Usage: agentplane recipes cache prune",
      },
      {
        args: ["recipes", "list-remote", "--index"],
        msg: "Missing value after --index",
      },
      {
        args: ["recipes", "list-remote", "--wat"],
        msg: "Unknown option: --wat",
      },
    ];

    for (const entry of cases) {
      const io = captureStdIO();
      try {
        const code = await runCli([...entry.args, "--root", root]);
        expect(code).toBe(2);
        expect(io.stderr).toContain(entry.msg);
      } finally {
        io.restore();
      }
    }
  });

  it("recipes list-remote refreshes cache from local index", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const tempDir = await mkdtemp(path.join(os.tmpdir(), "agentplane-recipes-index-"));
    const localIndexPath = path.join(tempDir, "index.json");
    const index = {
      schema_version: 1,
      recipes: [
        {
          id: "redmine",
          summary: "Redmine sync",
          versions: [
            {
              version: "2.0.0",
              url: "https://example.com/redmine.tar.gz",
              sha256: "def456",
            },
          ],
        },
      ],
    };
    await writeSignedIndex(localIndexPath, index);

    const io = captureStdIO();
    try {
      const code = await runCli(["recipes", "list-remote", "--refresh", "--index", localIndexPath]);
      expect(code).toBe(0);
      expect(io.stdout).toContain("redmine@2.0.0 - Redmine sync");
    } finally {
      io.restore();
    }

    const cacheText = await readFile(path.join(agentplaneHomePath(), "recipes-index.json"), "utf8");
    expect(cacheText).toContain('"redmine"');
  });

  it("recipes list-remote refreshes cache from remote index", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    await resetAgentplaneHomeRecipes();
    const index = {
      schema_version: 1,
      recipes: [
        {
          id: "remote-recipe",
          summary: "Remote recipe",
          versions: [{ version: "1.0.0", url: "https://example.com/remote.tgz", sha256: "abc" }],
        },
      ],
    };

    const originalFetch = globalThis.fetch;
    const indexText = JSON.stringify(index, null, 2);
    const signature = signIndexPayload(indexText);
    globalThis.fetch = vi.fn((url: string) => {
      if (url.endsWith(".sig")) {
        return Promise.resolve({
          ok: true,
          status: 200,
          statusText: "OK",
          json: () => Promise.resolve(signature),
        } as unknown as Response);
      }
      return Promise.resolve({
        ok: true,
        status: 200,
        statusText: "OK",
        text: () => Promise.resolve(indexText),
      } as unknown as Response);
    }) as unknown as typeof fetch;

    const io = captureStdIO();
    try {
      const code = await runCli([
        "recipes",
        "list-remote",
        "--refresh",
        "--index",
        "https://example.com/index.json",
        "--yes",
      ]);
      expect(code).toBe(0);
      expect(io.stdout).toContain("remote-recipe@1.0.0");
    } finally {
      io.restore();
      globalThis.fetch = originalFetch;
    }
  });

  it("recipes install supports id from indexed catalog", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const { archivePath, manifest } = await createRecipeArchive({
      id: "viewer",
      version: "1.0.0",
      summary: "Viewer recipe",
    });
    const sha256 = createHash("sha256")
      .update(await readFile(archivePath))
      .digest("hex");
    const index = {
      schema_version: 1,
      recipes: [
        {
          id: String(manifest.id),
          summary: "Viewer recipe",
          versions: [
            {
              version: String(manifest.version),
              url: archivePath,
              sha256,
            },
          ],
        },
      ],
    };
    const tempDir = await mkdtemp(path.join(os.tmpdir(), "agentplane-recipes-index-"));
    const indexPath = path.join(tempDir, "index.json");
    await writeSignedIndex(indexPath, index);

    const io = captureStdIO();
    try {
      const code = await runCli([
        "recipes",
        "install",
        "--name",
        "viewer",
        "--index",
        indexPath,
        "--refresh",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
    } finally {
      io.restore();
    }

    const manifestPath = path.join(
      "recipes",
      String(manifest.id),
      String(manifest.version),
      "manifest.json",
    );
    expect(await pathExists(path.join(agentplaneHomePath(), manifestPath))).toBe(true);
  });

  it("recipes install rejects unsupported archives", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const filePath = path.join(root, "recipe.txt");
    await writeFile(filePath, "not an archive", "utf8");

    const io = captureStdIO();
    try {
      const code = await runCli(["recipes", "install", "--path", filePath, "--root", root]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Usage: agentplane recipes install");
    } finally {
      io.restore();
    }
  });

  it("recipes list rejects extra args", async () => {
    const io = captureStdIO();
    try {
      const code = await runCli(["recipes", "list", "extra"]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Unexpected argument: extra");
      expect(io.stderr).toContain("Usage:");
      expect(io.stderr).toContain("agentplane recipes list");
      expect(io.stderr).toContain("agentplane help recipes list --compact");
    } finally {
      io.restore();
    }
  });

  it("recipes info rejects missing id", async () => {
    const io = captureStdIO();
    try {
      const code = await runCli(["recipes", "info"]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Usage: agentplane recipes info");
    } finally {
      io.restore();
    }
  });

  it("recipes explain rejects missing id", async () => {
    const io = captureStdIO();
    try {
      const code = await runCli(["recipes", "explain"]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Usage: agentplane recipes explain");
    } finally {
      io.restore();
    }
  });

  it("recipes rejects missing subcommand", async () => {
    const io = captureStdIO();
    try {
      const code = await runCli(["recipes"]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Usage: agentplane recipes");
    } finally {
      io.restore();
    }
  });

  it("recipes rejects unknown subcommand", async () => {
    const io = captureStdIO();
    try {
      const code = await runCli(["recipes", "noop"]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Usage: agentplane recipes");
    } finally {
      io.restore();
    }
  });

  it("recipes install rejects extra args", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const io = captureStdIO();
    try {
      const code = await runCli([
        "recipes",
        "install",
        "--path",
        "a.tar.gz",
        "extra",
        "--root",
        root,
      ]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Exactly one source is required");
    } finally {
      io.restore();
    }
  });

  it("recipes remove rejects extra args", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const io = captureStdIO();
    try {
      const code = await runCli(["recipes", "remove", "id", "extra", "--root", root]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Usage: agentplane recipes remove");
    } finally {
      io.restore();
    }
  });
});

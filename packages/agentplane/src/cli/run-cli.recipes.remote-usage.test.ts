import { createHash, generateKeyPairSync, sign } from "node:crypto";
import { mkdtemp, readFile, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { runCli } from "./run-cli.js";
import {
  captureStdIO,
  createRecipeArchive,
  getAgentplaneHome,
  mkGitRepoRoot,
  registerAgentplaneHome,
  resetAgentplaneHomeRecipes,
  silenceStdIO,
  writeDefaultConfig,
} from "@agentplane/testkit";

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

describe("runCli recipes remote index and usage errors", () => {
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
              version: "1.2.0",
              url: "https://example.com/viewer-1.2.0.tar.gz",
              sha256: "abc120",
            },
            {
              version: "1.10.0",
              url: "https://example.com/viewer-1.10.0.tar.gz",
              sha256: "abc1100",
            },
            {
              version: "1.2.10",
              url: "https://example.com/viewer-1.2.10.tar.gz",
              sha256: "abc1210",
            },
            {
              version: "1.2.3",
              url: "https://example.com/viewer-1.2.3.tar.gz",
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
      expect(io.stdout).toContain("viewer@1.10.0 - Viewer recipe");
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
      { args: ["recipes", "cache"], msg: "Missing recipes cache subcommand" },
      {
        args: ["recipes", "cache", "nope"],
        msg: "Unknown recipes cache subcommand",
      },
      {
        args: ["recipes", "cache", "prune", "--wat"],
        msg: "Unknown option: --wat",
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
    const fixtures = await Promise.all([
      createRecipeArchive({
        id: "viewer",
        version: "1.2.0",
        summary: "Viewer recipe",
      }),
      createRecipeArchive({
        id: "viewer",
        version: "1.10.0",
        summary: "Viewer recipe",
      }),
      createRecipeArchive({
        id: "viewer",
        version: "1.2.10",
        summary: "Viewer recipe",
      }),
    ]);
    const index = {
      schema_version: 1,
      recipes: [
        {
          id: "viewer",
          summary: "Viewer recipe",
          versions: await Promise.all(
            fixtures.map(async ({ archivePath, manifest }) => ({
              version: String(manifest.version),
              url: archivePath,
              sha256: createHash("sha256")
                .update(await readFile(archivePath))
                .digest("hex"),
            })),
          ),
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

    const registry = JSON.parse(
      await readFile(
        path.join(process.env.AGENTPLANE_HOME ?? agentplaneHomePath(), "recipes.json"),
        "utf8",
      ),
    ) as { recipes: { id: string; version: string }[] };
    expect(registry.recipes).toEqual(
      expect.arrayContaining([expect.objectContaining({ id: "viewer", version: "1.10.0" })]),
    );
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
      expect(io.stderr).toContain("Usage:");
      expect(io.stderr).toContain("agentplane recipes install");
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
      expect(io.stderr).toContain("Missing required argument");
      expect(io.stderr).toContain("Usage:");
      expect(io.stderr).toContain("agentplane recipes info");
      expect(io.stderr).toContain("agentplane help recipes info --compact");
    } finally {
      io.restore();
    }
  });

  it("recipes explain rejects missing id", async () => {
    const io = captureStdIO();
    try {
      const code = await runCli(["recipes", "explain"]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Missing required argument");
      expect(io.stderr).toContain("Usage:");
      expect(io.stderr).toContain("agentplane recipes explain");
      expect(io.stderr).toContain("agentplane help recipes explain --compact");
    } finally {
      io.restore();
    }
  });

  it("recipes rejects missing subcommand", async () => {
    const io = captureStdIO();
    try {
      const code = await runCli(["recipes"]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Missing recipes subcommand");
      expect(io.stderr).toContain("Usage:");
      expect(io.stderr).toContain("agentplane recipes");
      expect(io.stderr).toContain("agentplane help recipes --compact");
    } finally {
      io.restore();
    }
  });

  it("recipes rejects unknown subcommand", async () => {
    const io = captureStdIO();
    try {
      const code = await runCli(["recipes", "noop"]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Unknown recipes subcommand");
      expect(io.stderr).toContain("Usage:");
      expect(io.stderr).toContain("agentplane recipes");
      expect(io.stderr).toContain("agentplane help recipes --compact");
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
      expect(io.stderr).toContain("Unexpected argument: extra");
      expect(io.stderr).toContain("Usage:");
      expect(io.stderr).toContain("agentplane recipes remove");
      expect(io.stderr).toContain("agentplane help recipes remove --compact");
    } finally {
      io.restore();
    }
  });
});

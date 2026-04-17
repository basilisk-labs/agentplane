import { copyFile, mkdir, readFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { CliError } from "../../shared/errors.js";
import { getVersion } from "../../meta/version.js";
import { writeJsonStableIfChanged, writeTextIfChanged } from "../../shared/write-if-changed.js";

const PLUGIN_NAME = "agentplane";
const DEFAULT_MARKETPLACE_NAME = "agentplane-local-marketplace";
const DEFAULT_MARKETPLACE_DISPLAY_NAME = "AgentPlane Local Plugins";
const ASSET_ROOT_URL = new URL("../../../assets/codex-plugin/", import.meta.url);

const TEXT_ASSETS = [
  {
    source: new URL("skills/agentplane/SKILL.md", ASSET_ROOT_URL),
    relativePath: "skills/agentplane/SKILL.md",
  },
] as const;

const BINARY_ASSETS = [
  {
    source: new URL("assets/icon.svg", ASSET_ROOT_URL),
    relativePath: "assets/icon.svg",
  },
  {
    source: new URL("assets/logo.svg", ASSET_ROOT_URL),
    relativePath: "assets/logo.svg",
  },
  {
    source: new URL("assets/header.png", ASSET_ROOT_URL),
    relativePath: "assets/header.png",
  },
] as const;

export const AGENTPLANE_CODEX_HOME_ENV = "AGENTPLANE_CODEX_HOME";

export type CodexPluginInstallScope = "user" | "repo";

export type CodexPluginInstallResult = {
  scope: CodexPluginInstallScope;
  installRoot: string;
  pluginRoot: string;
  manifestPath: string;
  marketplacePath: string;
  copiedAssets: string[];
};

type JsonObject = Record<string, unknown>;

function isJsonObject(value: unknown): value is JsonObject {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function invalidMarketplaceError(message: string): CliError {
  return new CliError({
    exitCode: 3,
    code: "E_VALIDATION",
    message,
  });
}

async function readTextIfExists(filePath: string): Promise<string | null> {
  try {
    return await readFile(filePath, "utf8");
  } catch (err) {
    const code = (err as { code?: string } | null)?.code;
    if (code === "ENOENT") return null;
    throw err;
  }
}

function defaultMarketplaceDocument(): JsonObject {
  return {
    name: DEFAULT_MARKETPLACE_NAME,
    interface: {
      displayName: DEFAULT_MARKETPLACE_DISPLAY_NAME,
    },
    plugins: [],
  };
}

function parseMarketplaceDocument(text: string | null): JsonObject {
  if (text === null) return defaultMarketplaceDocument();
  let parsed: unknown;
  try {
    parsed = JSON.parse(text);
  } catch (err) {
    throw invalidMarketplaceError(
      `Invalid Codex marketplace JSON: ${err instanceof Error ? err.message : "unknown parse error"}`,
    );
  }
  if (!isJsonObject(parsed)) {
    throw invalidMarketplaceError("Invalid Codex marketplace JSON: expected a top-level object.");
  }
  if ("plugins" in parsed && !Array.isArray(parsed.plugins)) {
    throw invalidMarketplaceError("Invalid Codex marketplace JSON: `plugins` must be an array.");
  }
  if (
    "interface" in parsed &&
    parsed.interface !== undefined &&
    !isJsonObject(parsed.interface)
  ) {
    throw invalidMarketplaceError(
      "Invalid Codex marketplace JSON: `interface` must be an object when present.",
    );
  }
  return parsed;
}

function marketplaceEntry(): JsonObject {
  return {
    name: PLUGIN_NAME,
    source: {
      source: "local",
      path: `./plugins/${PLUGIN_NAME}`,
    },
    policy: {
      installation: "AVAILABLE",
      authentication: "ON_INSTALL",
    },
    category: "Productivity",
  };
}

function upsertMarketplaceDocument(text: string | null): JsonObject {
  const document = parseMarketplaceDocument(text);
  const interfaceObject = isJsonObject(document.interface) ? { ...document.interface } : {};
  if (typeof document.name !== "string" || document.name.trim().length === 0) {
    document.name = DEFAULT_MARKETPLACE_NAME;
  }
  if (
    typeof interfaceObject.displayName !== "string" ||
    interfaceObject.displayName.trim().length === 0
  ) {
    interfaceObject.displayName = DEFAULT_MARKETPLACE_DISPLAY_NAME;
  }

  const plugins: unknown[] = Array.isArray(document.plugins) ? document.plugins : [];
  const nextEntry = marketplaceEntry();
  const existingIndex = plugins.findIndex(
    (entry) => isJsonObject(entry) && entry.name === PLUGIN_NAME,
  );
  if (existingIndex === -1) {
    plugins.push(nextEntry);
  } else {
    plugins.splice(existingIndex, 1, nextEntry);
  }

  return {
    ...document,
    interface: interfaceObject,
    plugins,
  };
}

export function buildCodexPluginManifest(version = getVersion()): JsonObject {
  return {
    name: PLUGIN_NAME,
    version,
    description: "Bundle AgentPlane workflow guidance for the Codex plugins UI.",
    homepage: "https://github.com/basilisk-labs/agentplane",
    repository: "https://github.com/basilisk-labs/agentplane",
    license: "MIT",
    keywords: ["agentplane", "codex", "workflow", "tasks", "git"],
    skills: "./skills/",
    interface: {
      displayName: "AgentPlane",
      shortDescription: "Governed git-native workflow guidance for Codex",
      longDescription:
        "Install AgentPlane into Codex through a local marketplace and give Codex explicit task, planning, verification, and branch_pr workflow guidance.",
      developerName: "basilisk-labs",
      category: "Productivity",
      capabilities: ["Read", "Write"],
      websiteURL: "https://github.com/basilisk-labs/agentplane",
      defaultPrompt: [
        "Use AgentPlane to initialize a governed workflow in this repository.",
        "Use AgentPlane to create a task, approve the plan, and start work in branch_pr mode.",
        "Use AgentPlane to verify the active task and record evidence before finish.",
      ],
      brandColor: "#111827",
      composerIcon: "./assets/icon.svg",
      logo: "./assets/logo.svg",
      screenshots: ["./assets/header.png"],
    },
  };
}

export function resolveCodexInstallRoot(opts: {
  scope: CodexPluginInstallScope;
  repoRoot?: string;
  env?: NodeJS.ProcessEnv;
}): string {
  if (opts.scope === "repo") {
    const repoRoot = opts.repoRoot?.trim();
    if (!repoRoot) {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: "Repo scope requires a resolved repository root.",
      });
    }
    return path.resolve(repoRoot);
  }

  const env = opts.env ?? process.env;
  const overridden = env[AGENTPLANE_CODEX_HOME_ENV]?.trim();
  if (overridden) return path.resolve(overridden);
  return os.homedir();
}

export function resolveCodexPluginRoot(installRoot: string): string {
  return path.join(installRoot, "plugins", PLUGIN_NAME);
}

export function resolveCodexMarketplacePath(installRoot: string): string {
  return path.join(installRoot, ".agents", "plugins", "marketplace.json");
}

export async function installBundledCodexPlugin(opts: {
  scope: CodexPluginInstallScope;
  installRoot: string;
  version?: string;
}): Promise<CodexPluginInstallResult> {
  const installRoot = path.resolve(opts.installRoot);
  const pluginRoot = resolveCodexPluginRoot(installRoot);
  const manifestPath = path.join(pluginRoot, ".codex-plugin", "plugin.json");
  const marketplacePath = resolveCodexMarketplacePath(installRoot);

  await mkdir(path.dirname(manifestPath), { recursive: true });
  await mkdir(path.dirname(marketplacePath), { recursive: true });

  await writeJsonStableIfChanged(
    manifestPath,
    buildCodexPluginManifest(opts.version ?? getVersion()),
  );

  const copiedAssets: string[] = [];
  for (const asset of TEXT_ASSETS) {
    const targetPath = path.join(pluginRoot, asset.relativePath);
    await mkdir(path.dirname(targetPath), { recursive: true });
    const contents = await readFile(asset.source, "utf8");
    await writeTextIfChanged(targetPath, contents);
    copiedAssets.push(targetPath);
  }

  for (const asset of BINARY_ASSETS) {
    const targetPath = path.join(pluginRoot, asset.relativePath);
    await mkdir(path.dirname(targetPath), { recursive: true });
    await copyFile(fileURLToPath(asset.source), targetPath);
    copiedAssets.push(targetPath);
  }

  const nextMarketplace = upsertMarketplaceDocument(await readTextIfExists(marketplacePath));
  await writeJsonStableIfChanged(marketplacePath, nextMarketplace);

  return {
    scope: opts.scope,
    installRoot,
    pluginRoot,
    manifestPath,
    marketplacePath,
    copiedAssets,
  };
}

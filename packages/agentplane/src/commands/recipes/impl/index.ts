import { createPublicKey, verify } from "node:crypto";
import { mkdir, readFile } from "node:fs/promises";
import path from "node:path";

import { fetchJson, fetchText } from "../../../cli/http.js";
import { fileExists } from "../../../cli/fs-utils.js";
import { invalidFieldMessage } from "../../../cli/output.js";
import { isRecord } from "../../../shared/guards.js";
import { writeJsonStableIfChanged, writeTextIfChanged } from "../../../shared/write-if-changed.js";

import {
  DEFAULT_RECIPES_INDEX_URL,
  RECIPES_INDEX_PUBLIC_KEYS,
  RECIPES_INDEX_PUBLIC_KEYS_ENV,
} from "./constants.js";
import { resolveRecipesIndexCachePath, resolveRecipesIndexCacheSigPath } from "./paths.js";
import type { RecipesIndex, RecipesIndexSignature } from "./types.js";

function loadRecipesIndexPublicKeys(): Record<string, string> {
  const raw = process.env[RECIPES_INDEX_PUBLIC_KEYS_ENV];
  if (!raw) return { ...RECIPES_INDEX_PUBLIC_KEYS };
  try {
    const parsed = JSON.parse(raw) as Record<string, unknown>;
    const merged: Record<string, string> = { ...RECIPES_INDEX_PUBLIC_KEYS };
    for (const [key, value] of Object.entries(parsed)) {
      if (typeof value === "string" && value.trim()) merged[key] = value.trim();
    }
    return merged;
  } catch {
    return { ...RECIPES_INDEX_PUBLIC_KEYS };
  }
}

function validateRecipesIndexSignature(raw: unknown): RecipesIndexSignature {
  if (!isRecord(raw)) throw new Error(invalidFieldMessage("recipes index signature", "object"));
  if (raw.schema_version !== 1) {
    throw new Error(invalidFieldMessage("recipes index signature.schema_version", "1"));
  }
  const keyId = typeof raw.key_id === "string" ? raw.key_id.trim() : "";
  const signature = typeof raw.signature === "string" ? raw.signature.trim() : "";
  if (!keyId || !signature) {
    throw new Error(invalidFieldMessage("recipes index signature", "key_id, signature"));
  }
  const algorithm = typeof raw.algorithm === "string" ? raw.algorithm.trim() : undefined;
  return { schema_version: 1, key_id: keyId, signature, algorithm };
}

function verifyRecipesIndexSignature(indexText: string, signature: RecipesIndexSignature): void {
  if (signature.algorithm && signature.algorithm !== "ed25519") {
    throw new Error(invalidFieldMessage("recipes index signature.algorithm", "ed25519"));
  }
  const keys = loadRecipesIndexPublicKeys();
  const publicKey = keys[signature.key_id];
  if (!publicKey) {
    throw new Error(invalidFieldMessage("recipes index signature.key_id", "known key id"));
  }
  const key = createPublicKey(publicKey);
  const ok = verify(null, Buffer.from(indexText), key, Buffer.from(signature.signature, "base64"));
  if (!ok) {
    throw new Error("Invalid signature for recipes index");
  }
}

function validateRecipesIndex(raw: unknown): RecipesIndex {
  if (!isRecord(raw)) throw new Error(invalidFieldMessage("recipes index", "object"));
  if (raw.schema_version !== 1)
    throw new Error(invalidFieldMessage("recipes index.schema_version", "1"));
  if (!Array.isArray(raw.recipes))
    throw new Error(invalidFieldMessage("recipes index.recipes", "array"));

  const recipes = raw.recipes
    .filter((entry) => isRecord(entry))
    .map((entry) => {
      const id = typeof entry.id === "string" ? entry.id : "";
      const summary = typeof entry.summary === "string" ? entry.summary : "";
      const description = typeof entry.description === "string" ? entry.description : undefined;
      const versionsRaw = Array.isArray(entry.versions) ? entry.versions : [];
      if (!id || !summary || versionsRaw.length === 0) {
        throw new Error(invalidFieldMessage("recipes index.recipes[]", "id, summary, versions"));
      }
      const versions = versionsRaw
        .filter((version) => isRecord(version))
        .map((version) => {
          const versionId = typeof version.version === "string" ? version.version : "";
          const url = typeof version.url === "string" ? version.url : "";
          const sha256 = typeof version.sha256 === "string" ? version.sha256 : "";
          if (!versionId || !url || !sha256) {
            throw new Error(
              invalidFieldMessage("recipes index.recipes[].versions[]", "version, url, sha256"),
            );
          }
          return {
            version: versionId,
            url,
            sha256,
            min_agentplane_version:
              typeof version.min_agentplane_version === "string"
                ? version.min_agentplane_version
                : undefined,
            tags: Array.isArray(version.tags)
              ? version.tags.filter((tag) => typeof tag === "string")
              : undefined,
          };
        });
      return { id, summary, description, versions };
    });
  return { schema_version: 1, recipes };
}

function isHttpUrl(value: string): boolean {
  return value.startsWith("http://") || value.startsWith("https://");
}

async function readRecipesIndexText(source: string, cwd: string): Promise<string> {
  if (isHttpUrl(source)) {
    return await fetchText(source);
  }
  return await readFile(path.resolve(cwd, source), "utf8");
}

function signatureSourceForIndex(source: string): string {
  return `${source}.sig`;
}

async function readRecipesIndexSignature(
  source: string,
  cwd: string,
): Promise<RecipesIndexSignature> {
  const sigSource = signatureSourceForIndex(source);
  if (isHttpUrl(sigSource)) {
    const raw = await fetchJson(sigSource);
    return validateRecipesIndexSignature(raw);
  }
  const rawText = await readFile(path.resolve(cwd, sigSource), "utf8");
  return validateRecipesIndexSignature(JSON.parse(rawText) as unknown);
}

export async function loadRecipesRemoteIndex(opts: {
  cwd: string;
  source?: string;
  refresh: boolean;
}): Promise<RecipesIndex> {
  const cachePath = resolveRecipesIndexCachePath();
  const cacheSigPath = resolveRecipesIndexCacheSigPath();
  const cacheDir = path.dirname(cachePath);
  let rawIndex: unknown;

  if (opts.refresh || !(await fileExists(cachePath))) {
    const source = opts.source ?? DEFAULT_RECIPES_INDEX_URL;
    const indexText = await readRecipesIndexText(source, opts.cwd);
    const signature = await readRecipesIndexSignature(source, opts.cwd);
    verifyRecipesIndexSignature(indexText, signature);
    rawIndex = JSON.parse(indexText) as unknown;
    await mkdir(cacheDir, { recursive: true });
    await writeTextIfChanged(cachePath, indexText);
    await writeJsonStableIfChanged(cacheSigPath, signature);
  } else {
    const [indexText, sigText] = await Promise.all([
      readFile(cachePath, "utf8"),
      readFile(cacheSigPath, "utf8"),
    ]);
    const signature = validateRecipesIndexSignature(JSON.parse(sigText) as unknown);
    verifyRecipesIndexSignature(indexText, signature);
    rawIndex = JSON.parse(indexText) as unknown;
  }

  return validateRecipesIndex(rawIndex);
}

export function willFetchRemoteRecipesIndex(opts: {
  source: string;
  refresh: boolean;
  cachePathExists: boolean;
}): boolean {
  if (!isHttpUrl(opts.source)) return false;
  return opts.refresh || !opts.cachePathExists;
}

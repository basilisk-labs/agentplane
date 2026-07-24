import { lstat } from "node:fs/promises";
import { atomicWriteFile } from "@agentplaneorg/core/fs";
import { canonicalizeJson } from "@agentplaneorg/core/tasks";

import {
  assertContainedPathChainIdentityUnchanged,
  captureContainedPathChainIdentity,
  readContainedStableTextNoFollow,
} from "./contained-stable-file.js";
import { readStableRegularTextNoFollow } from "./stable-file.js";

const WRITE_TARGET_MAX_BYTES = 256 * 1024 * 1024;

type TextFileObservation = {
  text: string;
  dev: bigint;
  ino: bigint;
  ctimeNs: bigint;
  mtimeNs: bigint;
  size: bigint;
};

type WriteTextOptions = {
  beforePublication?: () => Promise<void> | void;
  containedRoot?: string;
  label?: string;
  /** @internal Deterministic race injection for security regression tests. */
  afterObservation?: () => Promise<void> | void;
};

async function readTextIfExists(
  filePath: string,
  opts?: WriteTextOptions,
): Promise<TextFileObservation | null> {
  let stats;
  try {
    stats = await lstat(filePath, { bigint: true });
  } catch (err) {
    const code = (err as { code?: string } | null)?.code;
    if (code === "ENOENT") return null;
    throw err;
  }
  if (stats.isSymbolicLink() || !stats.isFile()) {
    throw new Error(`Refusing non-regular write target: ${filePath}`);
  }
  const expectedIdentity = {
    dev: BigInt(stats.dev),
    ino: BigInt(stats.ino),
  };
  return {
    text: opts?.containedRoot
      ? await readContainedStableTextNoFollow({
          repository_root: opts.containedRoot,
          file_path: filePath,
          label: opts.label ?? "write target",
          max_bytes: WRITE_TARGET_MAX_BYTES,
          expected_identity: expectedIdentity,
        })
      : await readStableRegularTextNoFollow(filePath, opts?.label ?? "write target", {
          expected_identity: expectedIdentity,
        }),
    dev: BigInt(stats.dev),
    ino: BigInt(stats.ino),
    ctimeNs: BigInt(stats.ctimeNs),
    mtimeNs: BigInt(stats.mtimeNs),
    size: BigInt(stats.size),
  };
}

async function assertTextFileObservationUnchanged(
  filePath: string,
  expected: TextFileObservation | null,
): Promise<void> {
  let stats;
  try {
    stats = await lstat(filePath, { bigint: true });
  } catch (error) {
    if ((error as NodeJS.ErrnoException | null)?.code === "ENOENT" && expected === null) return;
    throw new Error(`Write target changed before publication: ${filePath}`, { cause: error });
  }
  if (
    expected === null ||
    stats.isSymbolicLink() ||
    !stats.isFile() ||
    BigInt(stats.dev) !== expected.dev ||
    BigInt(stats.ino) !== expected.ino ||
    BigInt(stats.ctimeNs) !== expected.ctimeNs ||
    BigInt(stats.mtimeNs) !== expected.mtimeNs ||
    BigInt(stats.size) !== expected.size
  ) {
    throw new Error(`Write target changed before publication: ${filePath}`);
  }
}

export async function writeTextIfChanged(
  filePath: string,
  content: string,
  opts?: WriteTextOptions,
): Promise<boolean> {
  const label = opts?.label ?? "write target";
  const containedPathIdentity = opts?.containedRoot
    ? await captureContainedPathChainIdentity({
        repository_root: opts.containedRoot,
        file_path: filePath,
        label,
      })
    : null;
  const existing = await readTextIfExists(filePath, opts);
  if (existing?.text === content) return false;
  await opts?.afterObservation?.();
  const assertWritePreconditions = async (): Promise<void> => {
    if (containedPathIdentity) {
      await assertContainedPathChainIdentityUnchanged(containedPathIdentity, label);
    }
    await assertTextFileObservationUnchanged(filePath, existing);
  };
  await atomicWriteFile(filePath, content, "utf8", {
    beforeAllocation: assertWritePreconditions,
    beforePublication: async () => {
      await opts?.beforePublication?.();
      await assertWritePreconditions();
    },
  });
  return true;
}

export async function writeJsonStableIfChanged(filePath: string, obj: unknown): Promise<boolean> {
  const stable = canonicalizeJson(obj);
  const text = `${JSON.stringify(stable, null, 2)}\n`;
  return await writeTextIfChanged(filePath, text);
}

import path from "node:path";
import { mkdir } from "node:fs/promises";
import { taskKernel as k } from "@agentplaneorg/core/tasks";
import {
  readStableRegularTextNoFollow,
  writeNewStableRegularFileNoFollow,
} from "../../shared/stable-file.js";
import type {
  KernelRepositoryCommitIntent,
  KernelRepositoryFollowupCommitIntent,
} from "./kernel-repository-types.js";

export async function writeCommitIntent(directory: string, intent: KernelRepositoryCommitIntent) {
  await mkdir(directory, { recursive: true, mode: 0o700 });
  const target = path.join(directory, "repository-commit-intent.json");
  try {
    await writeNewStableRegularFileNoFollow(
      target,
      `${JSON.stringify(intent, null, 2)}\n`,
      "canonical repository commit intent",
    );
  } catch (error) {
    const stored = JSON.parse(
      await readStableRegularTextNoFollow(target, "canonical repository commit intent"),
    ) as KernelRepositoryCommitIntent;
    if (k.kernelDigest(stored) !== k.kernelDigest(intent)) throw error;
  }
}

export async function readCommitIntent(
  directory: string,
): Promise<KernelRepositoryCommitIntent | null> {
  try {
    const intent = JSON.parse(
      await readStableRegularTextNoFollow(
        path.join(directory, "repository-commit-intent.json"),
        "canonical repository commit intent",
      ),
    ) as KernelRepositoryCommitIntent;
    const { digest, ...contents } = intent;
    if (k.kernelDigest(contents) !== digest)
      throw new Error("Canonical repository commit intent is invalid");
    return intent;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return null;
    throw error;
  }
}

export async function writeFollowupCommitIntent(
  directory: string,
  intent: KernelRepositoryFollowupCommitIntent,
) {
  await writeKernelIntent(directory, "repository-followup-commit-intent.json", intent);
}

export async function readFollowupCommitIntent(
  directory: string,
): Promise<KernelRepositoryFollowupCommitIntent | null> {
  try {
    const intent = JSON.parse(
      await readStableRegularTextNoFollow(
        path.join(directory, "repository-followup-commit-intent.json"),
        "canonical repository followup commit intent",
      ),
    ) as KernelRepositoryFollowupCommitIntent;
    const { digest, ...contents } = intent;
    if (k.kernelDigest(contents) !== digest)
      throw new Error("Canonical repository followup commit intent is invalid");
    return intent;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return null;
    throw error;
  }
}

async function writeKernelIntent(
  directory: string,
  name: string,
  intent: KernelRepositoryCommitIntent | KernelRepositoryFollowupCommitIntent,
) {
  await mkdir(directory, { recursive: true, mode: 0o700 });
  const target = path.join(directory, name);
  try {
    await writeNewStableRegularFileNoFollow(
      target,
      `${JSON.stringify(intent, null, 2)}\n`,
      "canonical repository commit intent",
    );
  } catch (error) {
    const stored = JSON.parse(
      await readStableRegularTextNoFollow(target, "canonical repository commit intent"),
    ) as typeof intent;
    if (k.kernelDigest(stored) !== k.kernelDigest(intent)) throw error;
  }
}

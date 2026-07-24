import { createHash } from "node:crypto";

import { createRunnerInvocationSnapshot } from "../artifacts.js";
import { readStableRegularFileNoFollow } from "../stable-file.js";
import type { RunnerInvocation } from "../types.js";

class RunnerPreparedInputError extends Error {
  readonly code = "RUNNER_PREPARED_INPUT";

  constructor(message: string) {
    super(message);
    this.name = "RunnerPreparedInputError";
  }
}

type OptionalPreparedInput = {
  path: string;
  label: string;
  expected_text: string;
};

function preparedInputError(message: string): RunnerPreparedInputError {
  return new RunnerPreparedInputError(`Runner prepared input validation failed: ${message}`);
}

function sha256(content: Buffer | string): string {
  return createHash("sha256").update(content).digest("hex");
}

async function readPreparedFile(path: string, label: string): Promise<Buffer> {
  try {
    return await readStableRegularFileNoFollow(path, label);
  } catch (error) {
    throw preparedInputError(
      `${label} could not be read as a stable regular file (${path}): ${
        error instanceof Error ? error.message : String(error)
      }`,
    );
  }
}

function assertPreparedDigest(opts: {
  content: Buffer;
  label: string;
  path: string;
  expected_bytes: number;
  expected_sha256: string;
}): void {
  const observedBytes = opts.content.byteLength;
  const observedSha256 = sha256(opts.content);
  if (observedBytes === opts.expected_bytes && observedSha256 === opts.expected_sha256) {
    return;
  }
  throw preparedInputError(
    `${opts.label} digest no longer matches prepared metadata (${opts.path}; ` +
      `expected_bytes=${opts.expected_bytes}; observed_bytes=${observedBytes}; ` +
      `expected_sha256=${opts.expected_sha256}; observed_sha256=${observedSha256})`,
  );
}

export async function readValidatedPreparedRunnerStdin(opts: {
  invocation: RunnerInvocation;
  require_bootstrap: boolean;
  optional_inputs?: readonly OptionalPreparedInput[];
}): Promise<string> {
  const preparedInput = opts.invocation.supervisor_prepared_input;
  if (!preparedInput) {
    throw preparedInputError(
      `process-local supervisor prepared input is unavailable (${opts.invocation.run_id})`,
    );
  }

  const currentInvocation = createRunnerInvocationSnapshot(opts.invocation);
  if (sha256(JSON.stringify(currentInvocation)) !== preparedInput.invocation_snapshot_sha256) {
    throw preparedInputError(
      `current invocation identity differs from the prepared invocation ` +
        `(${opts.invocation.run_id})`,
    );
  }

  const bundle = await readPreparedFile(opts.invocation.bundle_path, "runner prepared bundle");
  assertPreparedDigest({
    content: bundle,
    label: "runner prepared bundle",
    path: opts.invocation.bundle_path,
    expected_bytes: preparedInput.bundle_bytes,
    expected_sha256: preparedInput.bundle_sha256,
  });

  if (!opts.invocation.bootstrap_path && opts.require_bootstrap) {
    throw preparedInputError("required bootstrap_path is missing");
  }
  const bootstrap = opts.invocation.bootstrap_path
    ? await readPreparedFile(opts.invocation.bootstrap_path, "runner prepared bootstrap")
    : Buffer.from("", "utf8");
  assertPreparedDigest({
    content: bootstrap,
    label: "runner prepared bootstrap",
    path: opts.invocation.bootstrap_path ?? "<absent>",
    expected_bytes: preparedInput.bootstrap_bytes,
    expected_sha256: preparedInput.bootstrap_sha256,
  });

  for (const input of opts.optional_inputs ?? []) {
    const content = await readPreparedFile(input.path, input.label);
    const expected = Buffer.from(input.expected_text, "utf8");
    assertPreparedDigest({
      content,
      label: input.label,
      path: input.path,
      expected_bytes: expected.byteLength,
      expected_sha256: sha256(expected),
    });
  }

  return bootstrap.toString("utf8");
}

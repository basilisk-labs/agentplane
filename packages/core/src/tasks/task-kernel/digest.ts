import { createHash } from "node:crypto";
import type { Sha256Digest } from "./model.js";

function canonicalValue(value: unknown): unknown {
  if (Array.isArray(value)) return value.map((item) => canonicalValue(item));
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value)
        .filter(([, item]) => item !== undefined)
        .toSorted(([left], [right]) => (left < right ? -1 : left > right ? 1 : 0))
        .map(([key, item]) => [key, canonicalValue(item)]),
    );
  }
  return value;
}

export function kernelDigest(value: unknown): Sha256Digest {
  const input = JSON.stringify(canonicalValue(value));
  return `sha256:${createHash("sha256").update(input, "utf8").digest("hex")}`;
}

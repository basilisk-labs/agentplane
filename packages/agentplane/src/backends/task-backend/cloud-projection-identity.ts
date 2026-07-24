import { createHash } from "node:crypto";

export function cloudProjectionIdentitySha256(input: {
  endpoint: string;
  projectId: string;
  provider: string | null;
}): string {
  const canonicalIdentity = JSON.stringify({
    endpoint: input.endpoint || null,
    project_id: input.projectId || null,
    provider: input.provider,
  });
  return `sha256:${createHash("sha256").update(canonicalIdentity, "utf8").digest("hex")}`;
}

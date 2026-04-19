import {
  applyTaskDocMutations,
  type TaskDocMutationComment,
  type TaskDocVersion,
} from "@agentplaneorg/core";

export function buildTaskDocState(opts: {
  doc: string;
  owner?: string;
  updatedBy?: string;
  version?: TaskDocVersion;
  updatedAt?: string;
  comments?: readonly TaskDocMutationComment[] | null;
}) {
  return applyTaskDocMutations(
    {
      doc: "",
      owner: opts.owner,
      comments: opts.comments ?? null,
    },
    [
      { kind: "replace-doc", doc: opts.doc },
      {
        kind: "touch-doc-meta",
        updatedBy: opts.updatedBy ?? opts.owner,
        version: opts.version,
      },
    ],
    { now: opts.updatedAt },
  );
}

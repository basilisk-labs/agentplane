import { usageError } from "../../cli/spec/errors.js";
import type { CommandSpec } from "../../cli/spec/spec.js";

export type BumpKind = "patch" | "minor" | "major";

export type ReleasePlanFlags = {
  bump: BumpKind;
  since?: string;
  yes: boolean;
};

export type ReleasePlanParsed = ReleasePlanFlags;

export const releasePlanSpec: CommandSpec<ReleasePlanParsed> = {
  id: ["release", "plan"],
  group: "Release",
  summary: "Generate an agent-assisted release plan (changes list + next patch version).",
  description:
    "Generates a structured changes list since the last semver tag and writes a plan directory under .agentplane/.release/. This plan is intended for a DOCS agent to author release notes. By default, only patch bumps are allowed without explicit approval.",
  options: [
    {
      kind: "boolean",
      name: "patch",
      default: false,
      description: "Bump patch version (default).",
    },
    {
      kind: "boolean",
      name: "minor",
      default: false,
      description: "Bump minor version (requires --yes).",
    },
    {
      kind: "boolean",
      name: "major",
      default: false,
      description: "Bump major version (requires --yes).",
    },
    {
      kind: "string",
      name: "since",
      valueHint: "<tag>",
      description: "Override the starting tag/ref (defaults to the latest vX.Y.Z tag).",
    },
    {
      kind: "boolean",
      name: "yes",
      default: false,
      description: "Approve minor/major version bumps (required for --minor/--major).",
    },
  ],
  validateRaw: (raw) => {
    const count = [
      raw.opts.patch === true,
      raw.opts.minor === true,
      raw.opts.major === true,
    ].filter(Boolean).length;
    if (count > 1) {
      throw usageError({
        spec: releasePlanSpec,
        command: "release plan",
        message: "Options --patch/--minor/--major are mutually exclusive.",
      });
    }
  },
  parse: (raw) => {
    const bump: BumpKind =
      raw.opts.major === true ? "major" : raw.opts.minor === true ? "minor" : "patch";
    return { bump, since: raw.opts.since as string | undefined, yes: raw.opts.yes === true };
  },
  validate: (p) => {
    if ((p.bump === "minor" || p.bump === "major") && p.yes !== true) {
      throw usageError({
        spec: releasePlanSpec,
        command: "release plan",
        message: `Bump '${p.bump}' requires explicit approval. Re-run with --yes.`,
      });
    }
  },
  examples: [
    {
      cmd: "agentplane release plan",
      why: "Generate a plan for the next patch release and hand it to a DOCS agent to write release notes.",
    },
    {
      cmd: "agentplane release plan --minor --yes",
      why: "Generate a plan for the next minor release (explicit approval required).",
    },
  ],
};

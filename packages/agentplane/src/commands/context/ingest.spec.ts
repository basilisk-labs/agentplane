import type { CommandSpec } from "../../cli/spec/spec.js";
import { usageError } from "../../cli/spec/errors.js";
import type { ContextIngestParsed } from "./ingest.js";

function normalizeRawSources(raw: unknown): string[] {
  if (Array.isArray(raw)) {
    return raw.filter((item) => typeof item === "string" && item.trim().length > 0);
  }
  if (typeof raw === "string") return [raw].filter((item) => item.trim().length > 0);
  return [];
}

export const contextIngestSpec: CommandSpec<ContextIngestParsed> = {
  id: ["context", "ingest"],
  group: "Context",
  summary: "Create and optionally run a context assimilation task.",
  description:
    "Collects source context hints, creates a task with context task_kind, and can run it through the shared runner.",
  args: [{ name: "sources", required: false, variadic: true, valueHint: "<source>" }],
  options: [
    {
      kind: "boolean",
      name: "changed",
      default: false,
      description: "Process only changed sources in the current context (default mode).",
    },
    {
      kind: "boolean",
      name: "all",
      default: false,
      description: "Process all available sources instead of only changed sources.",
    },
    {
      kind: "boolean",
      name: "dry-run",
      default: false,
      description: "Preview only; do not create a task.",
    },
    {
      kind: "boolean",
      name: "index-only",
      default: false,
      description:
        "Index raw context sources into local projection without creating a context assimilation task.",
    },
    {
      kind: "boolean",
      name: "run",
      default: false,
      description: "Create task and immediately run it via `task run`.",
    },
    {
      kind: "boolean",
      name: "include-private",
      default: false,
      description: "Include context/raw/private sources in the local source set.",
    },
  ],
  examples: [
    {
      cmd: "agentplane context ingest --changed",
      why: "Create a context task from currently changed sources.",
    },
    {
      cmd: "agentplane context ingest --all --run",
      why: "Create a full context task and run it immediately.",
    },
    {
      cmd: "agentplane context ingest --dry-run src/index.ts src/lib/context.ts",
      why: "Preview context ingestion for explicit sources.",
    },
  ],
  validateRaw: (raw) => {
    const all = raw.opts.all === true;
    const changed = raw.opts.changed === true;
    if (all && changed) {
      throw usageError({
        spec: contextIngestSpec,
        message: "Invalid value for --changed/--all: use only one mode flag.",
      });
    }
    const dryRun = raw.opts["dry-run"] === true;
    const run = raw.opts.run === true;
    const indexOnly = raw.opts["index-only"] === true;
    if (dryRun && run) {
      throw usageError({
        spec: contextIngestSpec,
        message: "Invalid value for --dry-run/--run: do not pair them; --dry-run is preview-only.",
      });
    }
    if (indexOnly && run) {
      throw usageError({
        spec: contextIngestSpec,
        message: "Invalid value for --index-only/--run: --index-only does not run assimilation.",
      });
    }
  },
  parse: (raw) => {
    const sources = normalizeRawSources(raw.args.sources);
    const all = raw.opts.all === true;
    const changed = raw.opts.changed === true;
    const mode = all ? "all" : sources.length > 0 ? "sources" : "changed";
    return {
      sources,
      mode,
      dryRun: raw.opts["dry-run"] === true,
      indexOnly: raw.opts["index-only"] === true,
      runTask: raw.opts.run === true,
      includePrivate: raw.opts["include-private"] === true,
    };
  },
};

import { resolveProject } from "@agentplaneorg/core/project";

import {
  createBlueprintRegistry,
  loadTrustedProjectBlueprintRegistry,
  listBlueprints,
  type Blueprint,
} from "../../blueprints/index.js";
import type { CommandHandler } from "../../cli/spec/spec.js";
import { ValidationError } from "../../shared/errors.js";
import type { BlueprintExamplesParsed, BlueprintListParsed } from "./blueprint.specs.js";

function blueprintRoute(blueprint: Blueprint, source: "builtin" | "project", filePath?: string) {
  return {
    id: blueprint.id,
    version: blueprint.version,
    title: blueprint.title,
    source,
    ...(filePath ? { path: filePath } : {}),
    task_kinds: blueprint.taskKinds,
    workflow_modes: blueprint.workflowModes ?? ["direct", "branch_pr"],
    route: blueprint.nodes.map((node) => node.kind),
  };
}

function validationErrorFromProjectFile(
  filePath: string,
  errors: readonly { code: string; message: string }[],
) {
  return new ValidationError({
    message: `Project blueprint ${JSON.stringify(filePath)} is invalid:\n${errors
      .map((error) => `- ${error.code}: ${error.message}`)
      .join("\n")}`,
    context: { path: filePath },
  });
}

const BLUEPRINT_ROUTE_EXAMPLES = [
  {
    id: "analysis.readonly",
    title: "Read-only analysis",
    command: "agentplane blueprint explain --kind analysis --mutation none",
    expected: "analysis.light",
    note: "No CI, PR, worktree, or merge gates.",
  },
  {
    id: "content.readonly",
    title: "Content generation",
    command: "agentplane blueprint explain --kind content --mutation none",
    expected: "content.light",
    note: "Evidence and final output, not code lifecycle.",
  },
  {
    id: "docs.change",
    title: "Documentation change",
    command: "agentplane blueprint explain --kind docs --mutation docs",
    expected: "docs.change",
    note: "Docs verification without code checks by default.",
  },
  {
    id: "code.branch_pr",
    title: "Code change in branch_pr",
    command: "agentplane blueprint explain --kind code --mutation code --workflow-mode branch_pr",
    expected: "code.branch_pr",
    note: "Task branch, local checks, PR artifact, integration gate.",
  },
  {
    id: "release.strict",
    title: "Release or publish",
    command:
      "agentplane blueprint explain --kind release --mutation release --risk external_publish",
    expected: "release.strict",
    note: "Version, manifest, parity, and publish safety gates.",
  },
  {
    id: "existing.task",
    title: "Existing task",
    command: "agentplane blueprint explain <task-id>",
    expected: "task-specific route",
    note: "Uses task fields, tags, workflow mode, mutation scope, and risk hints.",
  },
] as const;

export const runBlueprintExamples: CommandHandler<BlueprintExamplesParsed> = (_ctx, p) => {
  if (p.json) {
    process.stdout.write(`${JSON.stringify({ examples: BLUEPRINT_ROUTE_EXAMPLES }, null, 2)}\n`);
    return Promise.resolve(0);
  }
  process.stdout.write("Blueprint route inspection examples\n");
  for (const example of BLUEPRINT_ROUTE_EXAMPLES) {
    process.stdout.write(`\n- ${example.title}\n`);
    process.stdout.write(`  command: ${example.command}\n`);
    process.stdout.write(`  expected: ${example.expected}\n`);
    process.stdout.write(`  note: ${example.note}\n`);
  }
  process.stdout.write("\nNext commands:\n");
  process.stdout.write("- agentplane blueprint list\n");
  process.stdout.write("- agentplane blueprint report\n");
  process.stdout.write("- agentplane help blueprint explain --compact\n");
  return Promise.resolve(0);
};

export const runBlueprintList: CommandHandler<BlueprintListParsed> = async (ctx, p) => {
  const registry = createBlueprintRegistry();
  const routes = listBlueprints(registry).map((blueprint) => blueprintRoute(blueprint, "builtin"));
  let trustedIds = new Set<string>();
  let trustConfig: unknown = null;
  if (p.project || p.trusted) {
    const resolved = await resolveProject({ cwd: ctx.cwd, rootOverride: ctx.rootOverride ?? null });
    const trusted = await loadTrustedProjectBlueprintRegistry(resolved.gitRoot);
    if (!trusted.ok) {
      throw new ValidationError({
        message: `Invalid project-local blueprint trust registry:\n${trusted.errors
          .map((error) => `- ${error.code}: ${error.message}`)
          .join("\n")}`,
      });
    }
    trustedIds = new Set(trusted.trustedBlueprints.map((blueprint) => blueprint.id));
    trustConfig = {
      enabled: trusted.trustConfig.config.enabled,
      exists: trusted.trustConfig.exists,
      allowed_ids: trusted.trustConfig.config.allowedIds,
      selection: trusted.trustConfig.config.selection,
    };
    const invalid = trusted.files.find((file) => !file.ok);
    if (invalid) throw validationErrorFromProjectFile(invalid.path, invalid.errors);
    routes.push(
      ...trusted.files.flatMap((file) =>
        file.blueprint ? [blueprintRoute(file.blueprint, "project", file.path)] : [],
      ),
    );
  }
  const outputRoutes = routes.map((route) => ({
    ...route,
    ...(p.trusted && route.source === "project" ? { trusted: trustedIds.has(route.id) } : {}),
  }));
  if (p.json) {
    process.stdout.write(
      `${JSON.stringify({ blueprints: outputRoutes, ...(p.trusted ? { trust: trustConfig } : {}) }, null, 2)}\n`,
    );
    return 0;
  }
  for (const route of outputRoutes) {
    const trustLabel =
      p.trusted && route.source === "project" ? ` trusted=${route.trusted ? "yes" : "no"}` : "";
    process.stdout.write(
      `${route.source}${trustLabel} ${route.id}@${route.version} ${route.route.join(" -> ")}\n`,
    );
  }
  return 0;
};

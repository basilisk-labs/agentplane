import type { ResolvedProject } from "@agentplaneorg/core/project";

export type BumpKind = "patch" | "minor" | "major";

export type ReleaseApplyFlags = {
  plan?: string;
  yes: boolean;
  push: boolean;
  remote: string;
};

export type ReleaseApplyParsed = ReleaseApplyFlags;

export type ReleaseVersionPlan = {
  prevTag: string | null;
  prevVersion: string;
  nextTag: string;
  nextVersion: string;
  bump: BumpKind;
  baseSha?: string | null;
};

export type ReleaseApplyRoute = {
  kind: "direct_release" | "release_candidate";
  workflow_mode: "direct" | "branch_pr";
  current_branch: string;
  base_branch: string | null;
};

export type PlanChange = {
  hash: string;
  authorDateIso: string;
  subject: string;
};

export type ReleaseApplyReport = {
  applied_at: string;
  plan_dir: string;
  notes_path: string;
  prev_version: string;
  next_version: string;
  prev_tag: string | null;
  next_tag: string;
  bump: BumpKind;
  checks: {
    clean_tracked_tree: true;
    tag_absent: true;
    notes_validated: true;
    npm_version_available_checked: boolean;
  };
  commit: { hash: string; subject: string } | null;
  route: ReleaseApplyRoute;
  tag: { name: string; created: boolean; pushed: boolean };
  push: { requested: boolean; remote: string; performed: boolean; refs: string[] };
};

export type ReleaseCommandState = {
  resolved: ResolvedProject;
  gitRoot: string;
  planDir: string;
  plan: ReleaseVersionPlan;
  notesPath: string;
  taskBranchPrefix: string;
  route: ReleaseApplyRoute;
  corePkgPath: string;
  agentplanePkgPath: string;
  recipesPkgPath: string;
  testkitPkgPath: string;
  npmVersionChecked: boolean;
};

export type ReleaseCommandMutation = {
  releaseCommit: { hash: string; subject: string } | null;
};

export type ReleaseCommandRouteResolver = (opts: {
  cwd: string;
  rootOverride?: string | null;
  gitRoot: string;
  agentplaneDir: string;
}) => Promise<ReleaseApplyRoute>;

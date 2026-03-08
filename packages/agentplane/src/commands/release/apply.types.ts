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
  push: { requested: boolean; remote: string; performed: boolean };
};

export type GitHubRelease = {
  tag_name?: string;
  assets?: { name?: string; browser_download_url?: string }[];
  tarball_url?: string;
};

export type FrameworkManifest = {
  schema_version: 1;
  files: FrameworkManifestEntry[];
};

export type FrameworkManifestEntry = {
  path: string;
  source_path?: string;
  type: "markdown" | "json" | "text";
  merge_strategy: "agents_policy_markdown" | "agent_json_3way" | "agent_json_merge";
  required?: boolean;
};

export type UpgradeReviewRecord = {
  relPath: string;
  mergeStrategy: FrameworkManifestEntry["merge_strategy"];
  hasBaseline: boolean;
  changedCurrentVsBaseline: boolean | null;
  changedIncomingVsBaseline: boolean | null;
  currentDiffersFromIncoming: boolean;
  needsSemanticReview: boolean;
  mergeApplied: boolean;
  mergePath:
    | "none"
    | "markdownOverrides"
    | "3way"
    | "incomingWins"
    | "incomingWinsFallback"
    | "parseFailed"
    | "incidentsAppend";
};

export function formatIntegrateRoute(opts: {
  protectedBaseRequiresPrMerge: boolean;
  provider: "github" | "gitlab" | null;
}): "local" | "github-pr" | "gitlab-mr" {
  if (!opts.protectedBaseRequiresPrMerge) return "local";
  return opts.provider === "gitlab" ? "gitlab-mr" : "github-pr";
}

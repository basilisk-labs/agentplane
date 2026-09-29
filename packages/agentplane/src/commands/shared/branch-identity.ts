export function normalizeBranchIdentity(branch: string): string {
  if (branch.startsWith("refs/remotes/origin/")) {
    return branch.slice("refs/remotes/origin/".length);
  }
  if (branch.startsWith("refs/heads/")) {
    return branch.slice("refs/heads/".length);
  }
  return branch.startsWith("origin/") ? branch.slice("origin/".length) : branch;
}

export function isSameBranchIdentity(left: string, right: string): boolean {
  return normalizeBranchIdentity(left) === normalizeBranchIdentity(right);
}

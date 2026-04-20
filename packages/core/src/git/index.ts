export {
  clearPinnedBaseBranch,
  getBaseBranch,
  getPinnedBaseBranch,
  resolveBaseBranch,
  setPinnedBaseBranch,
} from "./base-branch.js";

export {
  GitContext,
  gitAddPaths,
  gitBranchExists,
  gitBranchUpstream,
  gitCommit,
  gitCurrentBranch,
  gitEnv,
  gitInitRepo,
  gitIsAncestor,
  gitListBranches,
  gitRevParse,
  gitStagedPaths,
  resolveInitBaseBranch,
} from "./git-client.js";

export { gitAheadBehind, gitDiffNames, gitDiffStat, gitShowFile, toGitPath } from "./git-diff.js";

export {
  findWorktreeForBranch,
  gitListBranchesByPrefixes,
  gitListTaskBranches,
  listWorktrees,
  parseTaskIdFromBranch,
  parseTaskIdFromCloseBranch,
} from "./git-worktree.js";

export { getStagedFiles, getUnstagedFiles, getUnstagedTrackedFiles } from "./git-utils.js";

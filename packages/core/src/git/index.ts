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
  gitConfigGet,
  gitCommit,
  gitCurrentBranch,
  gitEnv,
  gitInitRepo,
  gitIsAncestor,
  gitListBranches,
  gitMergeBase,
  gitRevParse,
  gitStagedPaths,
  resolveInitBaseBranch,
} from "./git-client.js";

export {
  gitAheadBehind,
  gitDiffNames,
  gitDiffNameStatus,
  gitDiffNumstat,
  gitDiffStat,
  gitShowFile,
  toGitPath,
  type GitDiffRange,
  type GitDiffNameStatusEntry,
  type GitDiffNumstatEntry,
} from "./git-diff.js";

export {
  findWorktreeForBranch,
  gitListBranchesByPrefixes,
  gitListTaskBranches,
  listWorktrees,
  parseTaskIdFromBranch,
  parseTaskIdFromCloseBranch,
} from "./git-worktree.js";

export { getStagedFiles, getUnstagedFiles, getUnstagedTrackedFiles } from "./git-utils.js";

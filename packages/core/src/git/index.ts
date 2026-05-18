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
  DEFAULT_TASK_BRANCH_PREFIX,
  DEFAULT_TASK_CLOSE_BRANCH_PREFIX,
  findWorktreeForBranch,
  gitListBranchesByPrefixes,
  gitListTaskBranches,
  listWorktrees,
  parseTaskIdFromBranch,
  parseTaskIdFromCloseBranch,
  taskBranchName,
  taskCloseBranchName,
} from "./git-worktree.js";

export { getStagedFiles, getUnstagedFiles, getUnstagedTrackedFiles } from "./git-utils.js";

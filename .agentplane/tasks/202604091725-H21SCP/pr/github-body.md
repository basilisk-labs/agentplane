## Summary

Ignore dotfiles in watched runtime snapshots

Exclude junk dotfiles such as .DS_Store from watched runtime snapshot collection so stale-dist manifests do not drift across branches or machines because of filesystem litter.

## Scope

- In scope: Exclude junk dotfiles such as .DS_Store from watched runtime snapshot collection so stale-dist manifests do not drift across branches or machines because of filesystem litter.
- Out of scope: unrelated refactors not required for "Ignore dotfiles in watched runtime snapshots".

## Verification

### Plan

1. Create or simulate dotfiles such as .DS_Store inside watched runtime paths and collect the runtime snapshot. Expected: the snapshot excludes those files from watched_runtime_files and snapshot hashing.
2. Run targeted stale-dist/runtime-watch regression tests. Expected: dotfile litter inside src no longer marks the package build stale.
3. Lint touched runtime-watch/dist-guard sources and tests. Expected: eslint exits 0 for the modified files.

### Current Status

- State: ok
- Note: Verified targeted runtime-watch/dist-guard regressions and eslint; source-tree dotfiles no longer affect watched runtime snapshots or stale-dist freshness.

## Risks

- Risk level: not recorded
- Breaking change: no

### Rollback

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-09T17:48:27.708Z
- Branch: task/202604091725-H21SCP/ignore-runtime-dotfiles
- Head: 19cb4970e8ea

```text
 .agentplane/tasks/202604091725-H21SCP/README.md    | 116 +++++++++++++++++++++
 .../tasks/202604091725-H21SCP/pr/diffstat.txt      |   0
 .../tasks/202604091725-H21SCP/pr/github-body.md    |  50 +++++++++
 .../tasks/202604091725-H21SCP/pr/github-title.txt  |   1 +
 .agentplane/tasks/202604091725-H21SCP/pr/meta.json |  14 +++
 .../tasks/202604091725-H21SCP/pr/notes.jsonl       |   0
 .agentplane/tasks/202604091725-H21SCP/pr/review.md |  57 ++++++++++
 .../tasks/202604091725-H21SCP/pr/verify.log        |   0
 packages/agentplane/bin/runtime-watch.js           |   1 +
 packages/agentplane/src/cli/dist-guard.test.ts     |  23 ++++
 packages/agentplane/src/cli/runtime-watch.test.ts  |   7 ++
 11 files changed, 269 insertions(+)
```

</details>

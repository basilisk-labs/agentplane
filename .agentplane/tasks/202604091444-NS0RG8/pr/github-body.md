## Summary

Repair legacy lefthook installs during framework bootstrap

Make framework bootstrap or managed hook flow detect and replace stale lefthook-generated git hooks so task worktrees do not silently skip pre-commit or pre-push when agentplane-managed hooks are expected.

## Scope

- In scope: Make framework bootstrap or managed hook flow detect and replace stale lefthook-generated git hooks so task worktrees do not silently skip pre-commit or pre-push when agentplane-managed hooks are expected.
- Out of scope: unrelated refactors not required for "Repair legacy lefthook installs during framework bootstrap".

## Verification

### Plan

1. Reproduce a checkout with legacy lefthook-generated git hooks. Expected: the improved bootstrap or hook repair path detects and replaces them with agentplane-managed hooks. 2. Run focused hook/bootstrap tests. Expected: fresh worktrees end with deterministic managed hooks instead of external lefthook shims. 3. Run relevant lint/tests. Expected: hook install and bootstrap flows remain valid for existing managed-checkout users.

### Current Status

- State: ok
- Note: Command: bun x prettier --check packages/agentplane/src/cli/bootstrap-framework-dev-script.test.ts scripts/bootstrap-framework-dev.mjs && bun test packages/agentplane/src/cli/bootstrap-framework-dev-script.test.ts && bun x eslint scripts/bootstrap-framework-dev.mjs packages/agentplane/src/cli/bootstrap-framework-dev-script.test.ts
Result: pass
Evidence: Prettier matched, bootstrap tests passed, eslint exited 0 after CI formatting fix.
Scope: current branch head after post-CI formatting for legacy lefthook bootstrap repair.

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

- Updated: 2026-04-09T15:14:29.409Z
- Branch: task/202604091444-NS0RG8/repair-legacy-lefthook
- Head: c6cbd71b668f

```text
 .agentplane/tasks/202604091444-NS0RG8/README.md    | 172 +++++++++++++++++++++
 .../tasks/202604091444-NS0RG8/pr/diffstat.txt      |   0
 .../tasks/202604091444-NS0RG8/pr/github-body.md    |  61 ++++++++
 .../tasks/202604091444-NS0RG8/pr/github-title.txt  |   1 +
 .agentplane/tasks/202604091444-NS0RG8/pr/meta.json |  14 ++
 .../tasks/202604091444-NS0RG8/pr/notes.jsonl       |   0
 .agentplane/tasks/202604091444-NS0RG8/pr/review.md |  68 ++++++++
 .../tasks/202604091444-NS0RG8/pr/verify.log        |   0
 .../src/cli/bootstrap-framework-dev-script.test.ts |  78 ++++++----
 scripts/bootstrap-framework-dev.mjs                | 120 ++++++++++++++
 10 files changed, 487 insertions(+), 27 deletions(-)
```

</details>

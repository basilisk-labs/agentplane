## Summary

Fix bootstrap doc generation to reject stale dist

Generator and freshness check for agent bootstrap docs still import dist bootstrap-guide modules directly, so docs can be regenerated and validated against stale dist after src changes. Make the path source-truth safe or fail fast when dist is stale.

## Scope

- In scope: Generator and freshness check for agent bootstrap docs still import dist bootstrap-guide modules directly, so docs can be regenerated and validated against stale dist after src changes. Make the path source-truth safe or fail fast when dist is stale.
- Out of scope: unrelated refactors not required for "Fix bootstrap doc generation to reject stale dist".

## Verification

### Plan

1. Modify bootstrap doc generation/check paths so src changes cannot validate against stale dist silently.
2. Add or update tests that fail when bootstrap docs are generated from stale dist.
3. Run the targeted test suite plus the bootstrap freshness check path.

### Current Status

- State: ok
- Note: Command: bun test packages/agentplane/src/cli/bootstrap-doc-build-freshness.test.ts
Result: pass
Evidence: 2 tests passed covering stale-dist and missing-dist rejection for bootstrap doc scripts.
Scope: scripts/lib/generated-artifacts.mjs and bootstrap doc generator/check guards.

Command: bun x eslint scripts/lib/generated-artifacts.mjs scripts/generate-agent-bootstrap-doc.mjs scripts/check-agent-bootstrap-fresh.mjs packages/agentplane/src/cli/bootstrap-doc-build-freshness.test.ts
Result: pass
Evidence: no lint errors after typing the script helper import in the regression test.
Scope: touched scripts and new test only.

Command: bun run framework:dev:bootstrap && node scripts/check-agent-bootstrap-fresh.mjs
Result: pass
Evidence: repo-local runtime rebuilt successfully and bootstrap freshness check reported docs/runtime surfaces aligned.
Scope: real framework-worktree bootstrap and docs freshness path.

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

- Updated: 2026-04-08T05:03:22.241Z
- Branch: task/202604080136-0Q524H/bootstrap-doc-freshness
- Head: 8b38947c5fda

```text
 .agentplane/tasks/202604080136-0Q524H/README.md    | 167 +++++++++++++++++++++
 .../tasks/202604080136-0Q524H/pr/diffstat.txt      |   0
 .../tasks/202604080136-0Q524H/pr/github-body.md    |  63 ++++++++
 .../tasks/202604080136-0Q524H/pr/github-title.txt  |   1 +
 .agentplane/tasks/202604080136-0Q524H/pr/meta.json |  14 ++
 .../tasks/202604080136-0Q524H/pr/notes.jsonl       |   0
 .agentplane/tasks/202604080136-0Q524H/pr/review.md |  70 +++++++++
 .../tasks/202604080136-0Q524H/pr/verify.log        |   0
 .../src/cli/bootstrap-doc-build-freshness.test.ts  | 120 +++++++++++++++
 scripts/check-agent-bootstrap-fresh.mjs            |  12 +-
 scripts/generate-agent-bootstrap-doc.mjs           |   6 +-
 scripts/lib/generated-artifacts.mjs                |  37 +++++
 12 files changed, 487 insertions(+), 3 deletions(-)
```

</details>

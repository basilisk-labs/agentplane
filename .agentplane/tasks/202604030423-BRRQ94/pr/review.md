# PR Review

Created: 2026-04-03T04:24:36.547Z
Branch: task/202604030423-BRRQ94/workflow-mode-sync

## Summary

Fix workflow mode drift between AGENTS.md and init config

Eliminate fresh-install and mode-switch drift where the policy gateway implies branch_pr while .agentplane/config.json is direct. Keep one workflow source, minimize code duplication, update tests, and preserve GitHub-facing UX clarity.

## Scope

- In scope: Eliminate fresh-install and mode-switch drift where the policy gateway implies branch_pr while .agentplane/config.json is direct. Keep one workflow source, minimize code duplication, update tests, and preserve GitHub-facing UX clarity.
- Out of scope: unrelated refactors not required for "Fix workflow mode drift between AGENTS.md and init config".

## Verification

### Plan

1. Run `bunx vitest run packages/agentplane/src/agents/agents-template.test.ts packages/agentplane/src/cli/run-cli.core.init.test.ts --pool=forks --testTimeout 60000 --hookTimeout 60000`. Expected: both suites pass.
2. Run `node .agentplane/policy/check-routing.mjs`. Expected: output is `policy routing OK`.
3. Initialize a temporary repo with `node packages/agentplane/bin/agentplane.js init --yes --root <tmp>`. Expected: generated `AGENTS.md` says the route is determined by `workflow_mode` and does not hardcode `workflow_mode=branch_pr`.

### Current Status

- State: ok
- Note: Targeted vitest suites passed, policy routing check passed, and fresh direct init no longer hardcodes branch_pr in AGENTS.md.

## Risks

- Risk level: not recorded
- Breaking change: no

### Rollback

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-03T04:31:14.047Z
- Branch: task/202604030423-BRRQ94/workflow-mode-sync
- Head: a22a7358ccff

```text
 .agentplane/tasks/202604030423-BRRQ94/README.md    | 98 ++++++++++++++++++++++
 .../tasks/202604030423-BRRQ94/pr/diffstat.txt      |  0
 .../tasks/202604030423-BRRQ94/pr/github-body.md    | 52 ++++++++++++
 .../tasks/202604030423-BRRQ94/pr/github-title.txt  |  1 +
 .agentplane/tasks/202604030423-BRRQ94/pr/meta.json | 14 ++++
 .../tasks/202604030423-BRRQ94/pr/notes.jsonl       |  0
 .agentplane/tasks/202604030423-BRRQ94/pr/review.md | 59 +++++++++++++
 .../tasks/202604030423-BRRQ94/pr/verify.log        |  0
 packages/agentplane/assets/AGENTS.md               |  2 +-
 .../agentplane/src/agents/agents-template.test.ts  |  8 ++
 .../agentplane/src/cli/run-cli.core.init.test.ts   |  4 +
 11 files changed, 237 insertions(+), 1 deletion(-)
```

</details>
<!-- END AUTO SUMMARY -->

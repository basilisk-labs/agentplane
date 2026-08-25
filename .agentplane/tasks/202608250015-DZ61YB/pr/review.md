# PR Review

Created: 2026-08-25T00:39:56.067Z

## Task

- Task: `202608250015-DZ61YB`
- Title: Make aggregate local CI deterministic and preserve failing-group evidence
- Status: DOING
- Branch: `task/202608250015-DZ61YB/make-aggregate-local-ci-deterministic-and-preser`
- Canonical task record: `.agentplane/tasks/202608250015-DZ61YB/README.md`

## Verification

- State: ok
- Note: Verified: CLI-owned checks passed before independent EVALUATOR review.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-25T00:39:56.067Z
- Branch: task/202608250015-DZ61YB/make-aggregate-local-ci-deterministic-and-preser
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/cli/verification-contract.test.ts          | 69 +++++++++++++++++++++-
 scripts/checks/run-local-ci.mjs                    | 19 +++---
 scripts/lib/verification-scheduler.d.ts            | 19 ++++++
 scripts/lib/verification-scheduler.mjs             | 35 +++++++++++
 4 files changed, 129 insertions(+), 13 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->

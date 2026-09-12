# PR Review

Created: 2026-09-12T22:42:33.380Z

## Task

- Task: `202609122236-JFNN6B`
- Title: Simplify the test suite without weakening safety-critical coverage
- Status: DOING
- Branch: `task/202609122236-JFNN6B/simplify-the-test-suite-without-weakening-safety`
- Canonical task record: `.agentplane/tasks/202609122236-JFNN6B/README.md`

## Verification

- State: ok
- Note: Verified: CLI-owned declared checks passed; independent EVALUATOR review is pending.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-09-12T23:23:45.211Z
- Branch: task/202609122236-JFNN6B/simplify-the-test-suite-without-weakening-safety
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 package.json                                       |   4 +-
 .../commands/release/release-ci-contract.test.ts   |  19 ++-
 .../task-run-bootstrap.result-examples.test.ts     |   5 +-
 .../runtime/prompt-modules/gpt55-contract.test.ts  | 167 ---------------------
 .../src/runtime/prompt-modules/gpt55-contract.ts   | 137 -----------------
 .../runtime/prompt-modules/gpt56-contract.test.ts  | 119 ---------------
 .../src/runtime/prompt-modules/gpt56-contract.ts   |  78 ----------
 .../agentplane/src/runtime/prompt-modules/index.ts |   2 -
 scripts/README.md                                  |  64 ++++----
 scripts/check-coverage-thresholds.mjs              |   1 -
 scripts/checks/check-coverage-thresholds.mjs       |  48 ------
 scripts/lib/test-route-registry.mjs                |  27 +++-
 12 files changed, 76 insertions(+), 595 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->

Task: `202610110620-65K8GW`
Title: Transport complete GitHub CI aggregate plans through authenticated same-run artifacts instead of oversized environmen...
Canonical task record: `.agentplane/tasks/202610110620-65K8GW/README.md`

## Summary

Transport complete GitHub CI aggregate plans through authenticated same-run artifacts instead of oversized environment variables

PR6128 exact ce174 hosted38116647743 passed every substantive job but aggregate114405191871 failed before bash launch: Argument list too long. Preserve full aggregate plan JSON bytes and SHA256 via producer file and same-run upload/download artifact. Evaluator validates file digest before unchanged fail-closed job evaluation. Preserve scalar routing, no truncation or skipped gates. Add large-plan transport, tamper/missing/malformed and workflow contract regressions. No AGR owner or canonical state mutation. Independent review required; broad lane remains coordinated.

## Scope

- In scope: PR6128 exact ce174 hosted38116647743 passed every substantive job but aggregate114405191871 failed before bash launch: Argument list too long. Preserve full aggregate plan JSON bytes and SHA256 via producer file and same-run upload/download artifact. Evaluator validates file digest before unchanged fail-closed job evaluation. Preserve scalar routing, no truncation or skipped gates. Add large-plan transport, tamper/missing/malformed and workflow contract regressions. No AGR owner or canonical state mutation. Independent review required; broad lane remains coordinated.
- Out of scope: unrelated refactors not required for "Transport complete GitHub CI aggregate plans through authenticated same-run artifacts instead of oversized environment variables".

## Verification

- State: ok
- Note: Verified: canonical Task Kernel final checks passed.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-10-11T06:38:47.169Z
- Branch: task/202610110620-65K8GW/ci-plan-artifact-transport
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .github/workflows/ci.yml                           | 19 +++++-
 .../commands/release/ci-workflow-contract.test.ts  | 15 ++++-
 .../commands/release/github-ci-aggregate.test.ts   | 78 ++++++++++++++++++++++
 .../src/commands/release/github-ci-plan.test.ts    | 49 +++++++++++++-
 .../release/workflow-node-version-contract.test.ts |  3 +-
 scripts/checks/evaluate-github-ci.mjs              | 15 ++++-
 scripts/checks/plan-github-ci.mjs                  | 15 ++++-
 7 files changed, 184 insertions(+), 10 deletions(-)
```

</details>

Task: `202610271638-AX942H`
Title: Make native PR publication converge with clean, published task artifacts
Canonical task record: `.agentplane/tasks/202610271638-AX942H/README.md`

## Summary

Make native PR publication converge with clean, published task artifacts

Generic AgentPlane fix: after pr.open or pr.head.publish creates or links a hosted PR, persist final observed PR link/status metadata and publish the resulting exact task branch head. Ensure repeated publication with an already linked PR does not churn timestamps or create dirty task artifacts. Add focused negative tests for newly created and linked PRs, failed/uncertain publication, and exact-head alignment. Preserve hosted effect authority and do not bypass protected integration.

## Scope

- In scope: Generic AgentPlane fix: after pr.open or pr.head.publish creates or links a hosted PR, persist final observed PR link/status metadata and publish the resulting exact task branch head. Ensure repeated publication with an already linked PR does not churn timestamps or create dirty task artifacts. Add focused negative tests for newly created and linked PRs, failed/uncertain publication, and exact-head alignment. Preserve hosted effect authority and do not bypass protected integration.
- Out of scope: unrelated refactors not required for "Make native PR publication converge with clean, published task artifacts".

## Verification

- State: ok
- Note: Verified: canonical Task Kernel final checks passed.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-10-27T17:23:52.054Z
- Branch: task/202610271638-AX942H/make-native-pr-publication-converge-with-clean-p
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/commands/pr/open.convergence.test.ts       | 212 +++++++++++++++++++++
 packages/agentplane/src/commands/pr/open.ts        |  72 +++++++
 2 files changed, 284 insertions(+)
```

</details>

Task: `202609211700-JT0KEW`
Title: Release AgentPlane v0.7.11
Canonical task record: `.agentplane/tasks/202609211700-JT0KEW/README.md`

## Summary

Release AgentPlane v0.7.11

Prepare, validate, integrate, publish, and verify AgentPlane 0.7.11 from the fully validated LC-01 through LC-24 implementation on current main. Include package and runtime version updates, generated reference and release notes, strict release-scope evidence for already merged tasks, hosted release publication, npm and GitHub evidence, and system CLI upgrade verification.

## Scope

- In scope: Prepare, validate, integrate, publish, and verify AgentPlane 0.7.11 from the fully validated LC-01 through LC-24 implementation on current main. Include package and runtime version updates, generated reference and release notes, strict release-scope evidence for already merged tasks, hosted release publication, npm and GitHub evidence, and system CLI upgrade verification.
- Out of scope: unrelated refactors not required for "Release AgentPlane v0.7.11".

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-09-21T17:18:59.736Z
- Branch: task/202609211700-JT0KEW/release-agentplane-v0-7-11
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 docs/reference/generated-reference.mdx        |  6 +-
 docs/releases/v0.7.11.md                      | 89 +++++++++++++++++++++++++++
 packages/agentplane/package.json              |  6 +-
 packages/core/package.json                    |  2 +-
 packages/recipes/package.json                 |  2 +-
 packages/recipes/src/index.ts                 |  2 +-
 packages/spec/examples/acr.json               |  4 +-
 packages/testkit/package.json                 |  2 +-
 scripts/release/release-scope-exclusions.json |  6 ++
 9 files changed, 107 insertions(+), 12 deletions(-)
```

</details>

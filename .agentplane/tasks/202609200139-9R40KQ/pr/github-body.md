Task: `202609200139-9R40KQ`
Title: Publish and verify AgentPlane 0.7.10
Canonical task record: `.agentplane/tasks/202609200139-9R40KQ/README.md`

## Summary

Publish and verify AgentPlane 0.7.10

Publish the exact 0.7.10 candidate from protected main through the GitHub Publish release workflow. Verify the exact release SHA, npm packages and stable dist-tags, v0.7.10 tag, GitHub release assets, distribution channels, and a clean installed CLI. Do not change product code unless a release gate exposes a concrete defect.

## Scope

- In scope: Publish the exact 0.7.10 candidate from protected main through the GitHub Publish release workflow. Verify the exact release SHA, npm packages and stable dist-tags, v0.7.10 tag, GitHub release assets, distribution channels, and a clean installed CLI. Do not change product code unless a release gate exposes a concrete defect.
- Out of scope: unrelated refactors not required for "Publish and verify AgentPlane 0.7.10".

## Verification

- State: ok
- Note: Canonical validation sha256:41d37776507a4cd264570962d9e0ef62be422c5031a166594432d7bbfa2800be
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-09-20T05:44:50.837Z
- Branch: task/202609200139-9R40KQ/canonical-9r40kq
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 bun.lock                                           |  6 +-
 docs/releases/v0.7.10.md                           | 47 ++++++++++++---
 .../task/kernel-repository-coordinator.test.ts     | 66 +++++++++++++++++++++-
 .../commands/task/kernel-repository-coordinator.ts | 32 +++++------
 .../src/policy/rules/task-bound-mutation.test.ts   | 26 ---------
 .../src/policy/rules/task-bound-mutation.ts        | 12 +---
 .../src/runner/usecases/kernel-authority.test.ts   | 47 +++++++++++++++
 .../src/runner/usecases/kernel-authority.ts        |  4 +-
 packages/core/src/tasks/task-readme-io.test.ts     | 55 +++++++++++++++++-
 packages/core/src/tasks/task-readme-io.ts          |  2 +-
 10 files changed, 227 insertions(+), 70 deletions(-)
```

</details>

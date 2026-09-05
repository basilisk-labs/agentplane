Task: `202609042327-PH5N6S`
Title: Run supervisor verification against the committed implementation without dirtying its checkout
Canonical task record: `.agentplane/tasks/202609042327-PH5N6S/README.md`

## Summary

Run supervisor verification against the committed implementation without dirtying its checkout

User-authorized blocking repair for Arkady Factory APTA3E. Supervisor writes implementation/task evidence before checks that require a clean exact commit, causing ci:local:full to refuse its own checkout. Reproduce through existing supervisor tests and fix ordering or reuse the canonical isolated verification mechanism. Preserve exact implementation identity, evidence durability, interruption recovery, authority and clean-worktree checks. Do not change Factory checks. Exclude unrelated lifecycle/approval work and workspace-base recovery, which will be a subsequent bounded slice. Coordinate source ownership with the remote AgentPlane Clean Core task.

## Scope

- In scope: User-authorized blocking repair for Arkady Factory APTA3E. Supervisor writes implementation/task evidence before checks that require a clean exact commit, causing ci:local:full to refuse its own checkout. Reproduce through existing supervisor tests and fix ordering or reuse the canonical isolated verification mechanism. Preserve exact implementation identity, evidence durability, interruption recovery, authority and clean-worktree checks. Do not change Factory checks. Exclude unrelated lifecycle/approval work and workspace-base recovery, which will be a subsequent bounded slice. Coordinate source ownership with the remote AgentPlane Clean Core task.
- Out of scope: unrelated refactors not required for "Run supervisor verification against the committed implementation without dirtying its checkout".

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-09-04T23:32:29.145Z
- Branch: task/202609042327-PH5N6S/run-supervisor-verification-against-the-committe
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 ...li.core.task-advance.clean-verification.test.ts | 255 +++++++++++++++++++++
 .../external-agent-implementation-authority.ts     |  36 ++-
 2 files changed, 272 insertions(+), 19 deletions(-)
```

</details>

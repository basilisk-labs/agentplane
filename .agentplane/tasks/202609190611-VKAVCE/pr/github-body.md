Task: `202609190611-VKAVCE`
Title: Preserve evaluator repository evidence for hosted closure
Canonical task record: `.agentplane/tasks/202609190611-VKAVCE/README.md`

## Summary

Preserve evaluator repository evidence for hosted closure

Release blocker: an evaluator retry without a new repository mutation omitted valid repository evidence from an earlier attempt for the same work item. The passing inspection skipped operational projection, so hosted-close for PR #5969 refused legacy mutation. Preserve or recover same-work-item repository evidence across evaluator retries, keep digest and commit identity checks fail-closed, and add regression coverage.

## Scope

- In scope: Release blocker: an evaluator retry without a new repository mutation omitted valid repository evidence from an earlier attempt for the same work item. The passing inspection skipped operational projection, so hosted-close for PR #5969 refused legacy mutation. Preserve or recover same-work-item repository evidence across evaluator retries, keep digest and commit identity checks fail-closed, and add regression coverage.
- Out of scope: unrelated refactors not required for "Preserve evaluator repository evidence for hosted closure".

## Verification

- State: ok
- Note: Canonical validation sha256:8353c8d55cd0876d1de7e87bd20ab223e8ad281f73ae7957de114d5606f314ab
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-09-19T06:36:06.689Z
- Branch: task/202609190611-VKAVCE/preserve-evaluator-evidence
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/cli/run-cli.core.kernel-transport.test.ts  | 15 ++++
 .../src/commands/task/kernel-inspection.ts         | 91 ++++++++++++++++++----
 2 files changed, 89 insertions(+), 17 deletions(-)
```

</details>

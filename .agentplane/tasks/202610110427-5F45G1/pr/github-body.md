Task: `202610110427-5F45G1`
Title: Remove scope replan artifact writer cycle including direct test callers
Canonical task record: `.agentplane/tasks/202610110427-5F45G1/README.md`

## Summary

Remove scope replan artifact writer cycle including direct test callers

Replace unstarted449D9V with complete three-file scope for PR6128 architecture failure at a5e1434de2123284564ae3d2cdaba1af23d3981a. Inject existing writeKernelArtifact callback into scopeReplanInputs; update direct test callers with same writer. Preserve authentication, artifact bytes, propagation and assertions. No AGR owner/state edits. Independent review and scoped checks precede integration; full-fast waits for lane.

## Scope

- In scope: Replace unstarted449D9V with complete three-file scope for PR6128 architecture failure at a5e1434de2123284564ae3d2cdaba1af23d3981a. Inject existing writeKernelArtifact callback into scopeReplanInputs; update direct test callers with same writer. Preserve authentication, artifact bytes, propagation and assertions. No AGR owner/state edits. Independent review and scoped checks precede integration; full-fast waits for lane.
- Out of scope: unrelated refactors not required for "Remove scope replan artifact writer cycle including direct test callers".

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-10-11T04:52:33.987Z
- Branch: task/202610110427-5F45G1/scope-replan-cycle
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 packages/agentplane/src/commands/task/kernel-exchange.ts      |  3 ++-
 .../src/commands/task/kernel-scope-replan-inputs.ts           |  6 +++---
 .../agentplane/src/commands/task/kernel-scope-request.test.ts | 11 +++++++----
 3 files changed, 12 insertions(+), 8 deletions(-)
```

</details>

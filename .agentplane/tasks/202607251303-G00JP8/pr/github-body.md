Task: `202607251303-G00JP8`
Title: Stabilize parallel full-fast runner and integration tests
Canonical task record: `.agentplane/tasks/202607251303-G00JP8/README.md`

## Summary

Stabilize parallel full-fast runner and integration tests

Remove three v0.7 integration blockers found by RF08 hosted/full-suite verification: return deterministic busy authority when a live runner claim races mutable history scanning; make the integration-queue mutex concurrency test deterministic; and isolate the Bun compiled CLI smoke from mutable shared build artifacts. Preserve fail-closed safety and production behavior outside the diagnosed error precedence.

## Scope

- In scope: Remove three v0.7 integration blockers found by RF08 hosted/full-suite verification: return deterministic busy authority when a live runner claim races mutable history scanning; make the integration-queue mutex concurrency test deterministic; and isolate the Bun compiled CLI smoke from mutable shared build artifacts. Preserve fail-closed safety and production behavior outside the diagnosed error precedence.
- Out of scope: unrelated refactors not required for "Stabilize parallel full-fast runner and integration tests".

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-25T13:06:52.051Z
- Branch: task/202607251303-G00JP8/stabilize-parallel-full-fast-runner-and-integrat
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
No changes detected.
```

</details>

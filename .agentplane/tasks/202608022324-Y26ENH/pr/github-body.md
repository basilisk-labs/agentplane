Task: `202608022324-Y26ENH`
Title: Restore supervisor orchestration latency to the v0.6 baseline
Canonical task record: `.agentplane/tasks/202608022324-Y26ENH/README.md`

## Summary

Restore supervisor orchestration latency to the v0.6 baseline

Profile the canonical task advance and task run preparation paths, remove redundant repository scans, CLI bootstraps, context preparation, and route recomputation where state fingerprints permit safe reuse, and establish release gates that prevent setup latency or time-to-verified regressions relative to the matched v0.6 baseline without weakening correctness or evidence.

## Scope

- In scope: Profile the canonical task advance and task run preparation paths, remove redundant repository scans, CLI bootstraps, context preparation, and route recomputation where state fingerprints permit safe reuse, and establish release gates that prevent setup latency or time-to-verified regressions relative to the matched v0.6 baseline without weakening correctness or evidence.
- Out of scope: unrelated refactors not required for "Restore supervisor orchestration latency to the v0.6 baseline".

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-03T01:51:46.239Z
- Branch: task/202608022324-Y26ENH/restore-supervisor-orchestration-latency-to-the
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
No changes detected.
```

</details>

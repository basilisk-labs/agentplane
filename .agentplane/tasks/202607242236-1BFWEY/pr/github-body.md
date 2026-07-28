Task: `202607242236-1BFWEY`
Title: Persist bounded supervisor execution episodes
Canonical task record: `.agentplane/tasks/202607242236-1BFWEY/README.md`

## Summary

Persist bounded supervisor execution episodes

Define a durable supervisor episode journal and hard execution budgets for bounded EXECUTOR to EVALUATOR to rework cycles, with deterministic checkpoints, resume without replay, stop reasons, bounded feedback deltas, and limits for episodes, agent runs, tokens, wall time, changed files, diff lines, and no-progress episodes; integrate with the typed supervisor and runner without exposing the legacy ap loop or LoopSpec surface.

## Scope

- In scope: one versioned journal and hard budget contract shared by direct EXECUTOR, context/CURATOR, EVALUATOR, and rework episodes; deterministic checkpoints and stop records; resume without replay; bounded feedback deltas; usage limits for episodes, agent runs, tokens, wall time, changed files, diff lines, and no-progress episodes. - In scope: canonical schema and fixtures, migrator from absent/legacy state, idempotency and rollback/recovery evidence, installed-package smoke, human/JSON status, StateFingerprint, execution-receipt, authority, and effect-in-doubt integration. - Out of scope: importing ap loop, LoopSpec, project-local programmable loop JSON, automatic loop selection, or any second orchestration controller.

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-28T03:32:16.784Z
- Branch: task/202607242236-1BFWEY/persist-bounded-supervisor-execution-episodes
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
No changes detected.
```

</details>

Task: `202608250402-QWP8S8`
Title: Execute safe fail-fast declared-check sequences in the direct verifier
Canonical task record: `.agentplane/tasks/202608250402-QWP8S8/README.md`

## Summary

Execute safe fail-fast declared-check sequences in the direct verifier

Blocker for 202608242156-A8Q1W1. Symptom: the approved required check 'bun run docs:readme-header:generate && bun run docs:readme-header:check' is classified unsupported after all other checks pass, so evidence-only recovery loops forever. Violated invariant: every planner-approved deterministic verification command must either be safely executable by the CLI or rejected before approval, not become an unrecoverable runtime criterion. Root cause: parseDirectTaskCheck accepts one argv command and runDirectTaskVerification rejects the whole command at the first && token. Temporary recovery: keep A8Q1W1 and implementation commit 655f72d307962addfe932c4f8b6f2c7ff83ade82 unchanged until this blocker lands. Permanent fix: support only a fail-fast sequence of individually safe declared commands separated by literal &&, parse every segment through the existing structured grammar, execute without a shell, stop after the first failure, preserve the declared check timeout as the sequence budget, and reject empty segments or every other shell operator. Add regression tests for successful sequencing, fail-fast behavior, timeout propagation, and unsafe syntax rejection. After hosted integration, resume A8Q1W1 through a fresh supervisor packet.

## Scope

- In scope: Blocker for 202608242156-A8Q1W1. Symptom: the approved required check 'bun run docs:readme-header:generate && bun run docs:readme-header:check' is classified unsupported after all other checks pass, so evidence-only recovery loops forever. Violated invariant: every planner-approved deterministic verification command must either be safely executable by the CLI or rejected before approval, not become an unrecoverable runtime criterion. Root cause: parseDirectTaskCheck accepts one argv command and runDirectTaskVerification rejects the whole command at the first && token. Temporary recovery: keep A8Q1W1 and implementation commit 655f72d307962addfe932c4f8b6f2c7ff83ade82 unchanged until this blocker lands. Permanent fix: support only a fail-fast sequence of individually safe declared commands separated by literal &&, parse every segment through the existing structured grammar, execute without a shell, stop after the first failure, preserve the declared check timeout as the sequence budget, and reject empty segments or every other shell operator. Add regression tests for successful sequencing, fail-fast behavior, timeout propagation, and unsafe syntax rejection. After hosted integration, resume A8Q1W1 through a fresh supervisor packet.
- Out of scope: unrelated refactors not required for "Execute safe fail-fast declared-check sequences in the direct verifier".

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-25T09:14:06.810Z
- Branch: task/202608250402-QWP8S8/execute-safe-fail-fast-declared-check-sequences
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
No changes detected.
```

</details>

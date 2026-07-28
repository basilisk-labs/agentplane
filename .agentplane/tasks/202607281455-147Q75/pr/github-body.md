Task: `202607281455-147Q75`
Title: Repair evaluator response schema for Codex structured output
Canonical task record: `.agentplane/tasks/202607281455-147Q75/README.md`

## Summary

Repair evaluator response schema for Codex structured output

Release-blocking follow-up: make the evaluator typed-result JSON Schema compatible with the current Codex structured-output validator, preserve optional evidence fields through explicit nullable values, and add a regression test proving evaluator execution reaches a typed result instead of failing before the provider turn.

## Scope

- In scope: Release-blocking follow-up: make the evaluator typed-result JSON Schema compatible with the current Codex structured-output validator, preserve optional evidence fields through explicit nullable values, and add a regression test proving evaluator execution reaches a typed result instead of failing before the provider turn.
- Out of scope: unrelated refactors not required for "Repair evaluator response schema for Codex structured output".

## Verification

- State: ok
- Note:

```text
Verified evaluator schema compatibility: all structured-output properties are required with nullable
optional metadata, nulls normalize before strict SGR validation, and the provider boundary remains
read-only. Checks passed: focused evaluator suites (14), typecheck, format, routing validation.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-28T14:56:52.349Z
- Branch: task/202607281455-147Q75/repair-evaluator-response-schema
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../evaluator-episode.calibration.test.ts          | 59 ++++++++++++++++++----
 .../src/commands/evaluator/evaluator-episode.ts    | 29 ++++++++---
 .../commands/evaluator/evaluator-review-usecase.ts | 25 ++++++++-
 3 files changed, 95 insertions(+), 18 deletions(-)
```

</details>

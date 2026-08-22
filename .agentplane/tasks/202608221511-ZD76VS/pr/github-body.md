Task: `202608221511-ZD76VS`
Title: Finalize the v0.7.8 maximum-assimilation compatibility gate
Canonical task record: `.agentplane/tasks/202608221511-ZD76VS/README.md`

## Summary

Finalize the v0.7.8 maximum-assimilation compatibility gate

Add exactly one compatibility E2E proving the existing context.maximum_assimilation workflow enters and preserves its contract through the new task-centric Core. Reuse existing context contracts, prompts, extraction schemas, artifacts, provenance, and approval gate. Fix only a regression proven by this E2E. Do not implement Knowledge Assimilation. This replaces unpublished Task 202608221453-EKC1X8 after its legacy execution contract omitted repository_effect:tests and failed to record the WorkItem completion receipt.

## Scope

- In scope: Add exactly one compatibility E2E proving the existing context.maximum_assimilation workflow enters and preserves its contract through the new task-centric Core. Reuse existing context contracts, prompts, extraction schemas, artifacts, provenance, and approval gate. Fix only a regression proven by this E2E. Do not implement Knowledge Assimilation. This replaces unpublished Task 202608221453-EKC1X8 after its legacy execution contract omitted repository_effect:tests and failed to record the WorkItem completion receipt.
- Out of scope: unrelated refactors not required for "Finalize the v0.7.8 maximum-assimilation compatibility gate".

## Verification

- State: ok
- Note: Verified: CLI-owned checks passed before independent EVALUATOR review.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-22T15:16:04.743Z
- Branch: task/202608221511-ZD76VS/finalize-the-v0-7-8-maximum-assimilation-compati
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 ...i.critical.context-maximum-assimilation.test.ts | 138 +++++++++++++++++++++
 1 file changed, 138 insertions(+)
```

</details>

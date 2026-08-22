Task: `202608221453-EKC1X8`
Title: Add the v0.7.8 maximum-assimilation compatibility gate
Canonical task record: `.agentplane/tasks/202608221453-EKC1X8/README.md`

## Summary

Add the v0.7.8 maximum-assimilation compatibility gate

Add exactly one compatibility E2E proving the existing context.maximum_assimilation workflow enters and preserves its contract through the new task-centric Core. Reuse the existing context contracts, prompts, extraction schemas, artifacts, provenance, and approval gate. Fix only a regression proven by this E2E. Do not implement the follow-up Knowledge Assimilation subsystem. This replaces unpublished Task 202608221254-YSDSN5 whose WorkItemGraph incorrectly treated repository source paths as upstream required_inputs.

## Scope

- In scope: Add exactly one compatibility E2E proving the existing context.maximum_assimilation workflow enters and preserves its contract through the new task-centric Core. Reuse the existing context contracts, prompts, extraction schemas, artifacts, provenance, and approval gate. Fix only a regression proven by this E2E. Do not implement the follow-up Knowledge Assimilation subsystem. This replaces unpublished Task 202608221254-YSDSN5 whose WorkItemGraph incorrectly treated repository source paths as upstream required_inputs.
- Out of scope: unrelated refactors not required for "Add the v0.7.8 maximum-assimilation compatibility gate".

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-22T14:56:34.929Z
- Branch: task/202608221453-EKC1X8/add-the-v0-7-8-maximum-assimilation-compatibilit
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 ...i.critical.context-maximum-assimilation.test.ts | 130 +++++++++++++++++++++
 1 file changed, 130 insertions(+)
```

</details>

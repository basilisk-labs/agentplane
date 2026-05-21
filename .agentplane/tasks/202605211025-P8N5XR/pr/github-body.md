Task: `202605211025-P8N5XR`
Title: Harden recent issue candidates
Canonical task record: `.agentplane/tasks/202605211025-P8N5XR/README.md`

## Summary

Harden recent issue candidates

Verify and implement confirmed follow-ups from recent history: routed CI prerequisite preflight, legacy Verify Steps lint cleanup path, maximum-assimilation glossary validation, release version-surface idempotency, and observations harvest shortcut where reproducible.

## Scope

- In scope: Verify and implement confirmed follow-ups from recent history: routed CI prerequisite preflight, legacy Verify Steps lint cleanup path, maximum-assimilation glossary validation, release version-surface idempotency, and observations harvest shortcut where reproducible.
- Out of scope: unrelated refactors not required for "Harden recent issue candidates".

## Verification

- State: ok
- Note:

```text
Quality gate passed for current task branch. Confirmed the implementation is bounded to the approved
recent issue candidates: routed CI now exposes explicit prerequisite outputs before hosted gates,
Verify Steps lint has changed-task scope for strict rollout, maximum-assimilation verify-task
validates navigable glossary content for assimilation tasks, release mutation helpers are idempotent
when version surfaces already match, and observations harvest avoids loading the full task registry
when no journals exist. Focused tests, eslint, typecheck, docs CLI freshness, workflow lint, policy
routing, doctor, changed Verify Steps lint, and diff whitespace checks passed.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-21T10:26:10.917Z
- Branch: task/202605211025-P8N5XR/recent-issue-candidates
- Head: 85752945e646

```text
No changes detected.
```

</details>

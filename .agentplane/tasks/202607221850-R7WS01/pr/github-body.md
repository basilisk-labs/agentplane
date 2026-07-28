Task: `202607221850-R7WS01`
Title: Return typed runner lifecycle results
Canonical task record: `.agentplane/tasks/202607221850-R7WS01/README.md`

## Summary

Return typed runner lifecycle results

RF-25d: make runner preparation, invocation, observation, evaluation, and lifecycle operations return typed in-process results with compatibility renderers instead of stdout parsing.

## Scope

- In scope: typed runner use-case results, adapter ports, error/result union, human/JSON renderers, compatibility snapshots, and supervisor invocation without subprocess/stdout capture.
- Consume the durable effect-resolution contract as typed `effect_in_doubt`, `applied` and `not_applied` states, preserving resolution provenance, authority/evidence identity and claim generation in every in-process result and renderer.
- An unresolved `effect_in_doubt` result is terminally blocked for generic retry, replay, resume and restart paths; only the explicit resolution protocol from task 202607242158-QV09NA may transition it to `applied` or `not_applied`.
- Out of scope: automating the complete direct route, delivered by the next task.

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-28T01:55:50.166Z
- Branch: task/202607221850-R7WS01/return-typed-runner-lifecycle-results
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
No changes detected.
```

</details>

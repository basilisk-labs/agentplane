Task: `202609082225-ZYASFT`
Title: Measure provider token usage and align Bun runtime qualification
Canonical task record: `.agentplane/tasks/202609082225-ZYASFT/README.md`

## Summary

Measure provider token usage and align Bun runtime qualification

USER approved implementation of factual provider-token accounting and a reproducible before/after experiment. Reuse the supervisor journal and task usage projection. Persist cached input usage, bind telemetry to task, episode, attempt and provider session/turn identity, deduplicate replay, include failed attempts and all roles, and expose incomplete coverage without inventing values. Provide comparable fixed-model and reasoning runs from identical repository states, report task totals, time, rework and quality with separate fresh-session and acknowledged-retention scenarios. USER also approved upgrading the system Bun installation to the latest stable version. Align local qualification with the pinned Bun version, add a narrow runtime version preflight using the existing packageManager pin, and reassess the Bun identifier-minification workaround on the current pinned runtime before retaining or removing it. Preserve historical measurements, existing Node runtime boundaries, unrelated tasks and dirty work. Run focused tests, type checks, affected lint/format, compiled CLI smoke and full local CI. Do not publish, push or merge without separate approval.

## Scope

- In scope: USER approved implementation of factual provider-token accounting and a reproducible before/after experiment. Reuse the supervisor journal and task usage projection. Persist cached input usage, bind telemetry to task, episode, attempt and provider session/turn identity, deduplicate replay, include failed attempts and all roles, and expose incomplete coverage without inventing values. Provide comparable fixed-model and reasoning runs from identical repository states, report task totals, time, rework and quality with separate fresh-session and acknowledged-retention scenarios. USER also approved upgrading the system Bun installation to the latest stable version. Align local qualification with the pinned Bun version, add a narrow runtime version preflight using the existing packageManager pin, and reassess the Bun identifier-minification workaround on the current pinned runtime before retaining or removing it. Preserve historical measurements, existing Node runtime boundaries, unrelated tasks and dirty work. Run focused tests, type checks, affected lint/format, compiled CLI smoke and full local CI. Do not publish, push or merge without separate approval.
- Out of scope: unrelated refactors not required for "Measure provider token usage and align Bun runtime qualification".

## Verification

- State: ok
- Note: Verified: CLI-owned declared checks passed; independent EVALUATOR review is pending.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-09-08T23:36:23.845Z
- Branch: task/202609082225-ZYASFT/measure-provider-token-usage-and-align-bun-runti
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
No changes detected.
```

</details>

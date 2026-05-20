Task: `202605200641-P7R67H`
Title: Implement observation harvest and follow-up gates
Canonical task record: `.agentplane/tasks/202605200641-P7R67H/README.md`

## Summary

Implement observation harvest and follow-up gates

Implement the recent follow-ups from task execution logs: harvest task observations into actionable queues, align runtime log surface, harden cold-start retry/reporting, fix docs social image drift, gate release readiness on blocking observations, and prepare branch protection for the new PR verification aggregate.

## Scope

- In scope: Implement the recent follow-ups from task execution logs: harvest task observations into actionable queues, align runtime log surface, harden cold-start retry/reporting, fix docs social image drift, gate release readiness on blocking observations, and prepare branch protection for the new PR verification aggregate.
- Out of scope: unrelated refactors not required for "Implement observation harvest and follow-up gates".

## Verification

- State: ok
- Note:

```text
Implemented observations harvest, release observation gating, cold-start retry diagnostics, per-task
runs_dir contract, docs social image repair, and promoted the prior handled observations. Checks
passed: focused observations/release/cold-start tests; core and agentplane typecheck;
framework:dev:bootstrap; ap task observations harvest/check smoke; docs:cli:check;
docs:scripts:check; website build:check including social images; local CI route explain;
bench:cli:cold:check; targeted eslint; format:changed; policy routing; ap doctor; git diff --check.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-20T06:42:30.667Z
- Branch: task/202605200641-P7R67H/observations-followup-gates
- Head: 6d0b0f745b68

```text
No changes detected.
```

</details>

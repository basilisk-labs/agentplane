Task: `202608250015-DZ61YB`
Title: Make aggregate local CI deterministic and preserve failing-group evidence
Canonical task record: `.agentplane/tasks/202608250015-DZ61YB/README.md`

## Summary

Make aggregate local CI deterministic and preserve failing-group evidence

Release self-hosting blocker discovered while verifying 202608242233-KTFFN7. Symptom: bun run ci:local:full failed four times on implementation c566a26f34699e0d0f779ad19fa4978f712aed66, while docs-schema, core, runtime, and cli each passed independently; the persisted declared-check evidence retained only an aggregate exit 1 and truncated output without the failing group identity. Violated invariant: the aggregate gate must deterministically reflect its constituent groups and must persist the exact failed or timed-out group, exit status, and useful tail so a task cannot exhaust verification retries on an opaque orchestration failure. Root-cause scope: verification scheduler and full local-CI group orchestration, including concurrency/resource isolation and result rendering. Temporary recovery: run constituent groups independently and do not alter the blocked implementation. Permanent fix: make aggregate scheduling deterministic under the repository workload and preserve structured per-group failure evidence in the aggregate output. Regression: reproduce concurrent group failure/timeout, prove exact group attribution and bounded output, then prove the default aggregate gate passes when every group passes. After integration, resume KTFFN7 at c566a26f without source reimplementation.

## Scope

- In scope: Release self-hosting blocker discovered while verifying 202608242233-KTFFN7. Symptom: bun run ci:local:full failed four times on implementation c566a26f34699e0d0f779ad19fa4978f712aed66, while docs-schema, core, runtime, and cli each passed independently; the persisted declared-check evidence retained only an aggregate exit 1 and truncated output without the failing group identity. Violated invariant: the aggregate gate must deterministically reflect its constituent groups and must persist the exact failed or timed-out group, exit status, and useful tail so a task cannot exhaust verification retries on an opaque orchestration failure. Root-cause scope: verification scheduler and full local-CI group orchestration, including concurrency/resource isolation and result rendering. Temporary recovery: run constituent groups independently and do not alter the blocked implementation. Permanent fix: make aggregate scheduling deterministic under the repository workload and preserve structured per-group failure evidence in the aggregate output. Regression: reproduce concurrent group failure/timeout, prove exact group attribution and bounded output, then prove the default aggregate gate passes when every group passes. After integration, resume KTFFN7 at c566a26f without source reimplementation.
- Out of scope: unrelated refactors not required for "Make aggregate local CI deterministic and preserve failing-group evidence".

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-25T00:39:56.067Z
- Branch: task/202608250015-DZ61YB/make-aggregate-local-ci-deterministic-and-preser
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/cli/verification-contract.test.ts          | 69 +++++++++++++++++++++-
 scripts/checks/run-local-ci.mjs                    | 19 +++---
 scripts/lib/verification-scheduler.d.ts            | 19 ++++++
 scripts/lib/verification-scheduler.mjs             | 35 +++++++++++
 4 files changed, 129 insertions(+), 13 deletions(-)
```

</details>

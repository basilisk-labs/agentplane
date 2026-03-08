# DoD: core

The task is complete only if all core checks are true:

1. Preflight summary was produced.
2. Plan + task graph was presented and approved.
3. Executable task traceability exists for all repo mutations.
4. Required task documentation sections are populated.
5. Verification steps are executed and results recorded.
6. Drift was either absent or explicitly re-approved.
7. Final repo state contains no unintended tracked changes.

## Required task README contract

Every non-trivial task README must satisfy the active `doc_version` contract.

Legacy `doc_version=2` tasks use:

- `Summary`
- `Scope`
- `Plan`
- `Risks`
- `Verify Steps`
- `Rollback Plan`
- `Notes`

Target `doc_version=3` tasks use:

- `Summary`
- `Scope`
- `Plan`
- `Verify Steps`
- `Verification`
- `Rollback Plan`
- `Findings`

`Findings` is task-local. Policy incidents are curated separately in `.agentplane/policy/incidents.md`.

## Material drift criteria

Treat drift as material and require re-approval when at least one is true:

- Files outside approved scope are modified.
- Network or outside-repo access becomes necessary and was not approved.
- Planned scope expands by more than 5 additional files versus approved plan.
- Verification contract changes (new required checks, changed pass criteria, or skipped mandatory checks).

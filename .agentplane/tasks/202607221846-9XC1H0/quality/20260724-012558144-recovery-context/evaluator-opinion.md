# Semantic quality review: rework

Provenance: evaluator_supplied

RF-03 happy-path trust model is fail-closed and all five Verify Steps are substantively implemented, but lifecycle concurrency races and legacy run-storage visibility make commit 727af2f45 unsafe to publish.

## Findings
- atomicWriteFile can reject a legitimate concurrent writer after another writer replaces the published target inode.
- Concurrent resume/retry operations have no atomic per-task claim and can both execute.
- Cancel can overwrite a terminal success from a stale snapshot and retains a PID identity TOCTOU.
- A crash after immutable start claim can leave an unrecoverable prepared run.
- Replay provenance is persisted only after execution side effects.
- Public inspect/status/logs/cancel lack fallback for historical task-local 0.6.24 runs after supervisor-storage migration.

## Evidence
- .agentplane/tasks/202607221846-9XC1H0/README.md
- packages/core/src/fs/atomic-write.ts
- packages/agentplane/src/runner/usecases/task-run-lifecycle-replay.ts
- packages/agentplane/src/runner/usecases/task-run-lifecycle-cancel.ts
- packages/agentplane/src/runner/adapters/execute-supervised.ts
- packages/agentplane/src/runner/usecases/task-run-inspect.ts

## Missing Tests
- Deterministic concurrent-writer test that permits last-writer-wins without false atomicWrite failure.
- Deterministic concurrent replay/resume claim test and cancel-vs-finalizer interleaving test.
- Public legacy task-local run inspect/logs/cancel fallback regression.

## Hidden Assumptions
- TaskData.runner and immutable start decision were treated as concurrency authorities without a shared CAS/lease.

## Residual Risks
- Custom/Hermes and limited containment modes remain verification_state=unverified by design.
- Persisted receipts remain diagnostic-only for context verify-task until authenticated handoff in RF-09/RF-10/RF-25.

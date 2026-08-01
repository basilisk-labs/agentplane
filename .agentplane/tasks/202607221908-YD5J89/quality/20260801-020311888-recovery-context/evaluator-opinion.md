# Semantic quality review: rework

Provenance: evaluator_supplied

EVALUATOR returned rework with 1 typed finding(s).

## Findings
- `evaluator run --no-record` still enters a command catalog boundary declared with write and Git-mutation capabilities, despite selecting a read dependency inside the handler. The implementation therefore does not provide the promised read-only evaluator authority boundary.

## Evidence
- .agentplane/tasks/202607221908-YD5J89/quality/20260801-020311888-recovery-context/evaluator-diff.patch
- .agentplane/tasks/202607221908-YD5J89/README.md

## Missing Tests
- Add a catalog-level `evaluator run --no-record` test that exercises normal command dispatch and proves the created session excludes `backend.write`, `task.write`, `git.mutate`, and `approvals`, rather than testing only the handler with injected read/write callbacks.
- Add the corresponding recording-path test proving `evaluator run` receives write capabilities only when recording is enabled.

## Hidden Assumptions
- Selecting `session.require("task.read")` inside a session declared with `EVALUATOR_WRITE_REQUIREMENTS` is assumed to be equivalent to creating a genuinely read-only authority boundary.
- The handler-level test is assumed to validate catalog/session capability allocation, although it bypasses normal catalog dispatch and session construction.

## Residual Risks
- Split `evaluator run` authority selection at or before command-session construction so `--no-record` creates an evaluator-read session and the recording path creates an evaluator-write session. Re-run capability-denial coverage through normal catalog dispatch; existing deterministic checks do not cover this boundary mismatch.

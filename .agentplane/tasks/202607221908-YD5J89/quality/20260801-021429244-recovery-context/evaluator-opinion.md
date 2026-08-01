# Semantic quality review: rework

Provenance: evaluator_supplied

EVALUATOR returned rework with 1 typed finding(s).

## Findings
- `evaluator run --no-record` is assigned a read-only session but still writes a new evaluator evidence packet directly to the task quality directory.

## Evidence
- .agentplane/tasks/202607221908-YD5J89/quality/20260801-021429244-recovery-context/evaluator-diff.patch
- .agentplane/tasks/202607221908-YD5J89/README.md

## Missing Tests
- Run the real `evaluator run --no-record` handler against a repository snapshot and assert that no task-quality files or directories are created or changed, rather than only asserting that undeclared capabilities cannot be resolved from the session.
- Exercise evaluator preparation through an explicitly write-authorized capability or prove that preparation is side-effect-free; assert a typed denial when the same write path is invoked through `EVALUATOR_READ_REQUIREMENTS`.

## Hidden Assumptions
- Declaring a read-only `CommandSession` is assumed to make the handler read-only even though the resolved shared `CommandContext` and evaluator preparation use case retain unrestricted direct filesystem access.
- The implementation treats `--no-record` as excluding quality-state recording but implicitly permits evidence-artifact writes, while the approved verification contract describes read-only evaluator mutation as denied.

## Residual Risks
- Route evaluator evidence-packet creation through an explicitly write-authorized capability, or redefine the no-record path so it performs no filesystem writes. Re-run the real registry-dispatched no-record command with before/after filesystem assertions and typed-denial coverage; session.require-only tests are insufficient.

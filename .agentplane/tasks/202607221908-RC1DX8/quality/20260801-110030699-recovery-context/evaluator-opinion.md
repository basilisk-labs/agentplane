# Semantic quality review: rework

Provenance: evaluator_supplied

EVALUATOR returned rework with 1 typed finding(s).

## Findings
- Hermes inspect-only supervision receives execution authority even when neither remote access nor step execution is requested.

## Evidence
- .agentplane/tasks/202607221908-RC1DX8/quality/20260801-110030699-recovery-context/evaluator-diff.patch
- .agentplane/tasks/202607221908-RC1DX8/README.md

## Missing Tests
- Add runtime session-selection tests for `hermes supervise` covering inspect-only, remote inspection, dry-run execution, and real execution; assert that inspect-only authority excludes `provider` and `git.mutate` and that cross-phase access produces typed denial.

## Hidden Assumptions
- The implementation assumes that avoiding calls to `session.require("provider")` and `session.require("git.mutate")` is equivalent to withholding those capabilities, although the command session was already constructed with both capabilities.

## Residual Risks
- Split `hermes supervise` session selection by parsed execution/remote intent, analogous to `task run`, then refresh SHA-bound focused and repository verification evidence. The current deterministic evidence passes but asserts the overly broad static Hermes supervision profile rather than the required least-authority behavior.

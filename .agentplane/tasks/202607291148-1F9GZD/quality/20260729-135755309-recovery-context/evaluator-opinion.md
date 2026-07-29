# Semantic quality review: rework

Provenance: evaluator_supplied

EVALUATOR returned rework with 1 typed finding(s).

## Findings
- Dependency closure records DONE and verification state from the current task backend, while only hashing the dependency README at the reviewed SHA; it never proves that the README at that SHA contains those lifecycle states. Post-SHA task-state drift can therefore produce a packet that falsely claims SHA-bound closure.

## Evidence
- .agentplane/tasks/202607291148-1F9GZD/quality/20260729-135755309-recovery-context/evaluator-diff.patch

## Missing Tests
- Create a dependency whose README at the reviewed implementation SHA is not DONE or lacks accepted verification, then update only the current backend state to DONE/ok before packet generation; qualification packet creation must fail.
- Assert that each emitted dependency lifecycle field is derived from and agrees with the dependency task document read at the reviewed SHA.

## Hidden Assumptions
- The current task backend state is assumed to be identical to the dependency task state committed at the qualification implementation SHA.
- Hashing a dependency README is assumed to prove lifecycle claims even though its committed contents are not parsed or reconciled with those claims.

## Residual Risks
- Derive dependency status and verification metadata from the task document at implementation_sha, or explicitly reconcile current backend fields against the parsed SHA-pinned document; add a post-SHA drift regression before rerunning focused evaluator tests and ci:contract.

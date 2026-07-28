# Semantic quality review: rework

Provenance: evaluator_supplied

EVALUATOR returned rework with 1 typed finding(s).

## Findings
- Verification state is persisted before the durable verification record is written, so a filesystem failure can leave the task verified without the machine-readable evidence required by evaluator review.

## Evidence
- .agentplane/tasks/202607282157-FT85MC/quality/20260728-221955893-recovery-context/evaluator-diff.patch
- .agentplane/tasks/202607282157-FT85MC/README.md

## Missing Tests
- A failure-path test that forces verification-record directory creation or JSON writing to fail and asserts that the task verification state is not persisted as ok without its durable record.
- A concurrency test for simultaneous verification attempts confirming that task state and the selected current verification record remain consistent.

## Hidden Assumptions
- Filesystem creation and writing of the verification record are assumed not to fail after the task mutation succeeds.
- Successful-path coverage is assumed to prove the durability invariant despite the task-state mutation and evidence write being separate non-atomic operations.

## Residual Risks
- Make verification-state persistence and durable-record creation fail closed as one consistency boundary, then add write-failure and concurrent-verification regression coverage before regenerating evaluator evidence.

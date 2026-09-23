# Semantic quality review: rework

Provenance: evaluator_supplied

EVALUATOR returned rework with 1 typed finding(s).

## Findings
- Replacement can replay an executor that already started. Ordinary implementation episodes retain work_order_ref=null during execution. After a supervisor crash, the new recovery condition classifies that unresolved intent as pre-dispatch failure and permits another executor run.

## Evidence
- .agentplane/tasks/202609231019-MPSGJZ/quality/objects/sha256/288a74b6ec3b8c99f289e214d03676063dad172dcbebd2b71c5b3ee194a4e48a.patch

## Missing Tests
- Interrupt a completed canonical implementation-rework episode after executor dispatch but before journal completion; request replacement and assert that no second executor starts without resolution of the original run.

## Hidden Assumptions
- work_order_ref=null distinguishes pre-dispatch interruption from an executor run whose outcome has not yet been persisted.

## Residual Risks
- Frozen evidence digests match, and both required checks are recorded as passing for the evaluated commit. Fix recovery to distinguish proven non-dispatch from an unresolved dispatched run, and add a behavioral interruption regression test. Existing passing verification does not cover this crash window.

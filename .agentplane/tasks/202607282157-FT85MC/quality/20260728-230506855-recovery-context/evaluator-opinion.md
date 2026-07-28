# Semantic quality review: rework

Provenance: evaluator_supplied

EVALUATOR returned rework with 1 typed finding(s).

## Findings
- Verification-record admission does not bind the record to the evaluated commit or current verification scope. A record matching only the task's timestamp, state, verifier, and note can be frozen after implementation or Verify Steps drift, allowing stale checks to support a new quality review.

## Evidence
- .agentplane/tasks/202607282157-FT85MC/quality/20260728-230506855-recovery-context/evaluator-diff.patch
- .agentplane/tasks/202607282157-FT85MC/verification/20260728230443027-9b1ce9fa67c234df.json

## Missing Tests
- Reject an otherwise metadata-matching verification record when implementation_sha differs from the evaluator work order's evaluated_sha.
- Reject an otherwise metadata-matching verification record when scope_digest differs from the digest of the current Verify Steps.
- Cover post-verification implementation and Verify Steps changes to prove stale records are excluded from observed checks and work-order evidence.

## Hidden Assumptions
- Matching recorded_at, result, verifier, and note uniquely identifies evidence applicable to the current implementation and verification contract.
- Verification state cannot remain unchanged while the evaluated commit or Verify Steps change.

## Residual Risks
- Update verification-record admission to require implementation_sha equality with the evaluated SHA and scope_digest equality with the current Verify Steps digest, then add stale-commit and stale-scope regression coverage and regenerate the frozen evaluator evidence.

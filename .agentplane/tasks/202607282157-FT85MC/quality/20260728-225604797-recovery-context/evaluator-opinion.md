# Semantic quality review: rework

Provenance: evaluator_supplied

EVALUATOR returned rework with 1 typed finding(s).

## Findings
- The frozen verification record still does not provide the required concrete command evidence: its free-form details use abbreviated command descriptions and omit every required Evidence field.

## Evidence
- .agentplane/tasks/202607282157-FT85MC/verification/20260728225543061-e033ad9caec75582.json
- .agentplane/policy/dod.code.md
- .agentplane/tasks/202607282157-FT85MC/README.md

## Missing Tests
- A regression test that rejects or excludes a verification record when any check lacks an exact command string, Result, Evidence, or Scope.
- A final work-order test proving the frozen verification record contains independently assessable evidence for every required Verify Step, not only asserted pass summaries.

## Hidden Assumptions
- Unvalidated free-form text inside a JSON record is assumed to constitute machine-readable command evidence.
- A claimed pass result without captured key output is assumed sufficient for independent evaluator assessment.

## Residual Risks
- Preserve the complete branch-diff and current-record matching changes, but strengthen durable verification records so each required check contains the exact executable command and concrete key-output evidence, then freeze that validated record in a new evaluator work order.

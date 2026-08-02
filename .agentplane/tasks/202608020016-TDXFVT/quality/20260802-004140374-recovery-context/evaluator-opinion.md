# Semantic quality review: rework

Provenance: evaluator_supplied

EVALUATOR returned rework with 1 typed finding(s).

## Findings
- The approved plan requires hosted integration, but the frozen verification record contains only local checks and does not demonstrate a successful hosted integration run.

## Evidence
- .agentplane/tasks/202608020016-TDXFVT/README.md
- .agentplane/tasks/202608020016-TDXFVT/verification/20260802004126077-38d6187f16df3303.json

## Missing Tests
- A successful hosted integration run against evaluated SHA 6d9968b6730e14c7bbbb7c106565e8dea25d3a24.
- A merge-specific negative regression proving lifecycle-only or managed-artifact-only changes do not become a new semantic target when inspected against the second parent.

## Hidden Assumptions
- Passing the hosted static-analysis phases locally is assumed to be equivalent to the approved hosted integration gate.
- The second parent of every relevant merge is assumed to be the synchronized base lineage; the implementation does not explicitly establish that relationship.

## Residual Risks
- Run and record the required hosted integration for the evaluated SHA. Add or provide merge-specific negative coverage for lifecycle-only and managed-artifact-only second-parent comparisons, then freeze a new evaluator packet.

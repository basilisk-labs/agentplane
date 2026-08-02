# Semantic quality review: rework

Provenance: evaluator_supplied

EVALUATOR returned rework with 1 typed finding(s).

## Findings
- The evaluated patch includes four unrelated task definitions and changes another task's dependency graph, but the frozen evidence contains no drift classification or re-approval for those repository mutations.

## Evidence
- .agentplane/tasks/202608021231-SHYJGK/quality/20260802-181008299-recovery-context/evaluator-diff.patch
- .agentplane/tasks/202608021231-SHYJGK/README.md
- .agentplane/policy/dod.core.md

## Missing Tests
- A deterministic changed-path scope check that rejects unrelated task artifacts unless the verification evidence includes an explicit drift classification and re-approval.

## Hidden Assumptions
- The four new task documents and the dependency changes to task 202608021232-6BTB6D are assumed to belong to this performance task despite having separate objectives and no frozen re-approval evidence.
- The benchmark uses published 0.6.26 while the approved Verify Steps still name the accepted v0.6.24 baseline; the evidence assumes 0.6.26 is the authoritative baseline.

## Residual Risks
- Separate the unrelated task-document and dependency-graph mutations from this implementation patch, or provide frozen evidence that classifies them as intentional task-owned drift and records explicit re-approval; then rerun exact-SHA verification on the resulting patch.

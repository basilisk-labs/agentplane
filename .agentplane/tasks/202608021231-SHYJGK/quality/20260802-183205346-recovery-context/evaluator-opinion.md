# Semantic quality review: rework

Provenance: evaluator_supplied

EVALUATOR returned rework with 1 typed finding(s).

## Findings
- The evaluated patch still creates four unrelated task definitions and modifies a fifth task's dependency graph without drift classification or re-approval.

## Evidence
- .agentplane/tasks/202608021231-SHYJGK/quality/20260802-183205346-recovery-context/evaluator-diff.patch
- .agentplane/tasks/202608021231-SHYJGK/README.md
- .agentplane/policy/dod.core.md

## Missing Tests
- Add a deterministic changed-path scope check that rejects unrelated task artifacts or requires an explicit drift classification and re-approval record.

## Hidden Assumptions
- The implementation assumes newly created task definitions and another task's dependency changes may ride on the latency task branch merely because they are task artifacts.

## Residual Risks
- Remove the four unrelated task definitions and the dependency-graph mutation from this patch, or explicitly classify them as a related-task batch and obtain the required scope re-approval before reevaluation.

# Semantic quality review: rework

Provenance: evaluator_supplied

Roadmap executable-leaf count is inconsistent with the canonical release ancestry.

## Findings
- The roadmap table contains 60 task rows, including one PLANNER amendment, so it represents 59 implementation/release tasks rather than 58; the original planning task is the second PLANNER record outside the table.

## Evidence
- .agentplane/tasks/202607242201-6BN1GV/README.md
- docs/internal/v0.7-refactor-plan.md

## Missing Tests
- none recorded

## Hidden Assumptions
- The previous review counted the two PLANNER records correctly in release closure but subtracted both from the roadmap table even though only one appears there.

## Residual Risks
- Recount the table and final-release ancestry after correcting the declared total.

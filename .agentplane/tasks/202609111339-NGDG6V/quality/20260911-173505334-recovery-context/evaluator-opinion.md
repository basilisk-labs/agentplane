# Semantic quality review: rework

Provenance: evaluator_supplied

EVALUATOR returned rework with 3 typed finding(s).

## Findings
- When task.commit is absent, verificationReworkHasNewImplementation currently accepts a committed DOING event from any author. The approved refinement and live evidence identify the supervisor implementation receipt as the valid fallback, so the event-only branch should require author SUPERVISOR.
- The verification_required assertion was accidentally moved from the existing newer-implementation test into the preceding quality-rework test. Restore it to the original test and keep the event-only test focused on removing implementation_rework_required.
- Residual risk: Without the author constraint, an unrelated committed status event could bypass required implementation rework for task metadata without task.commit.

## Evidence
- .agentplane/tasks/202609111339-NGDG6V/quality/objects/sha256/4618e515a90acc2cb6c970fb5b59a6b953c88a4de76e982917c327bc5f57316d.patch

## Missing Tests
- Add or adjust regression coverage so an event-only fallback is supervisor-authored and a non-supervisor event cannot prove fresh implementation when task.commit is absent.

## Hidden Assumptions
- none recorded

## Residual Risks
- Require SUPERVISOR only for the event-only fallback, preserve the existing commit-match behavior when task.commit is populated, and correct the misplaced assertion without widening scope.

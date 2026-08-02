# Semantic quality review: rework

Provenance: evaluator_supplied

EVALUATOR returned rework with 2 typed finding(s).

## Findings
- task begin --plan records updated_by=HUMAN even though the CLI cannot prove the caller is human; this fabricates provenance on an agent-accessible compatibility path.
- The planning guard recognizes only the new exact placeholder, so an unapproved or previously approved legacy synthetic default plan can bypass the new semantic PLANNER boundary.

## Evidence
- .agentplane/tasks/202608021534-YN84E1/quality/20260802-201827242-recovery-context/evaluator-diff.patch

## Missing Tests
- Add a fail-closed assertion for task complete with verification and quality review but no AgentPlane-observed runner receipt before exercising the unsafe override.

## Hidden Assumptions
- The implementation assumes all open tasks were created after the placeholder migration.

## Residual Risks
- Attribute explicit task begin plans to PLANNER rather than HUMAN unless a separately authenticated human provenance channel exists.
Recognize both legacy synthetic default-plan templates and enforce the planning episode even if legacy plan_approval is already approved.
Exercise the normal missing-receipt rejection before the explicit unsafe compatibility path.

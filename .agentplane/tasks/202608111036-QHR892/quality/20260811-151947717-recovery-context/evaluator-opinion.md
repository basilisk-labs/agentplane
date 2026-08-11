# Semantic quality review: rework

Provenance: evaluator_supplied

EVALUATOR returned rework with 2 typed finding(s).

## Findings
- CLI-регрессия не доказывает немедленный переход именно к quality review: она проверяет лишь отсутствие verification_required и допускает любой другой nextAction.
- Замороженная запись проверки не содержит результата обязательной инспекции итогового маршрута после единой команды verify.

## Evidence
- .agentplane/tasks/202608111036-QHR892/README.md
- .agentplane/tasks/202608111036-QHR892/quality/objects/sha256/bbe6214187cd93bb1d754af8d416ffdbe15938444f2f45af6c595c50cfc0ab51.patch
- .agentplane/tasks/202608111036-QHR892/verification/20260811151629029-e146b2f46c0413b6.json
- .agentplane/policy/dod.core.md

## Missing Tests
- CLI-level regression asserting the exact quality-review next-action code immediately after a single valid verify command.
- Recorded read-only final-route inspection showing verification_required absent and the quality-review gate selected without rerunning checks.

## Hidden Assumptions
- Any nextAction other than verification_required is assumed to satisfy the required transition to quality review.
- Passing the route-decision test is assumed to substitute for the separately required inspection of the real final task route.

## Residual Risks
- Strengthen the CLI regression to assert the exact quality-review gate, then include frozen evidence of the required final-route inspection after the single valid verify command.

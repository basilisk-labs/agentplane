# Semantic quality review: blocked

Provenance: evaluator_supplied

EVALUATOR returned blocked with 1 typed finding(s).

## Findings
- Frozen observed-checks evidence contains no deterministic verification records for evaluated SHA 2b8ee19e18f936d418cdd2736a2b393114da6a1d.

## Evidence
- .agentplane/tasks/202608070209-J3DEJ1/quality/objects/sha256/4a6b43a525c46f747c18c8548c61584197697dc4fe038f2a972f0c50d7f40a4c.json

## Missing Tests
- none recorded

## Hidden Assumptions
- The packet assumes narrative verification recorded in the task document is equivalent to deterministic observed-check evidence bound to the evaluated SHA.

## Residual Risks
- Regenerate the frozen evaluator packet after deterministic local and hosted verification records for exact SHA 2b8ee19e18f936d418cdd2736a2b393114da6a1d are persisted into observed-checks evidence.

# Semantic quality review: rework

Provenance: evaluator_supplied

EVALUATOR returned rework with 1 typed finding(s).

## Findings
- The versioned execution declaration collapses requirements uncertainty and implementation uncertainty into one `uncertainty` field, so the resolver cannot represent or reason about these independently as required.

## Evidence
- .agentplane/tasks/202608112232-3NC7Y4/README.md
- .agentplane/tasks/202608112232-3NC7Y4/quality/objects/sha256/c54420ced0dd987642bf51e7bd403ccaf786c58ff80bf2ce85b1b0b0623cf3cd.patch

## Missing Tests
- Schema and resolver tests covering independent combinations of bounded/material requirements uncertainty and bounded/material implementation uncertainty, including distinct reason codes and deterministic workflow/evidence outcomes.
- Compatibility tests proving legacy declarations migrate or normalize into both uncertainty dimensions without silently weakening an existing branch_pr or verification requirement.

## Hidden Assumptions
- Requirements ambiguity and implementation difficulty always have the same risk level and therefore can be represented by one enum.
- One generic `material_uncertainty` reason is sufficient for explainability and for every subsystem consuming the compiled contract.

## Residual Risks
- Split the execution declaration into explicit requirements-uncertainty and implementation-uncertainty dimensions, define deterministic resolution and compatibility behavior for both, propagate them through schemas/readback, and add combination tests before reevaluation.

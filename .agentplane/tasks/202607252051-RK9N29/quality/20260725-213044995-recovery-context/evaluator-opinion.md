# Semantic quality review: rework

Provenance: evaluator_supplied

CodeQL identified unsafe command construction in the new remote task-branch discovery path.

## Findings
- The remote branch prefix derived from configuration is interpolated into git for-each-ref argv; replace it with a constant ref root and filter returned refs in TypeScript.

## Evidence
- .agentplane/tasks/202607252051-RK9N29/README.md
- packages/agentplane/src/commands/shared/task-backend-branch-snapshot.ts

## Missing Tests
- none recorded

## Hidden Assumptions
- none recorded

## Residual Risks
- none recorded

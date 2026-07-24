# Semantic quality review: rework

Provenance: evaluator_supplied

Batch quality-review target is inconsistent across evaluator, route, and integrate

## Findings
- Evaluator resolves only the primary task while route and integrate resolve primary plus included task IDs, so an included-task metadata unit can make a freshly recorded review immediately stale.

## Evidence
- .agentplane/tasks/202607240736-FCBKJQ/README.md
- packages/agentplane/src/commands/evaluator/evaluator.command.ts
- packages/agentplane/src/commands/pr/integrate/internal/prepare.ts
- packages/agentplane/src/commands/shared/route-decision-blockers.ts

## Missing Tests
- none recorded

## Hidden Assumptions
- The evaluator and integration surfaces were assumed to receive the same task set without an explicit shared call-site contract.

## Residual Risks
- Batch ownership is still derived from task extension in prepare and PR metadata in route; drift between those durable surfaces should fail closed or be checked in a follow-up.

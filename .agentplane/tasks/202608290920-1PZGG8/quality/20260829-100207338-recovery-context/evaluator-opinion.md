# Semantic quality review: rework

Provenance: evaluator_supplied

EVALUATOR returned rework with 5 typed finding(s).

## Findings
- The intended material-refinement case is correctly recorded before WorkItem selection and returns replan_required with a nullable work_item_id.
- The claimedIds ambiguity check moved implicitly after recordPlanRefinement. A local amendment paired with a null-ID result and multiple claimed WorkItems can now mutate plan amendments before the same call rejects as ambiguous.
- Compute and reject multiple claimed WorkItems before recording refinement, while retaining material refinement before actual WorkItem selection.
- Add a regression proving an ambiguous null-ID local refinement leaves task revision and plan amendments unchanged.
- The prepared verification evidence does not record the task plan's declared bun run ci:local:full check; exact full-regression evidence remains required before PASS.

## Evidence
- .agentplane/tasks/202608290920-1PZGG8/quality/objects/sha256/6238bed33ff5edad09db6bb76534efbfd68babd7775a75c0db7b0b53a128a033.patch

## Missing Tests
- Ambiguous null-ID local refinement rejects without recording a plan amendment.
- Exact full local CI evidence on the final candidate.

## Hidden Assumptions
- Recording a local amendment before validating result identity would be harmless; it is an observable task-state mutation and violates the preserved fail-closed contract.

## Residual Risks
- Rework. Material refinement is now reachable without a schedulable WorkItem, but the move also applies local amendments before the existing null-ID multiple-claim ambiguity guard, changing a previously fail-closed path after mutation.

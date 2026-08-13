# Semantic quality review: rework

Provenance: evaluator_supplied

EVALUATOR returned rework with 3 typed finding(s).

## Findings
- Local execution remains authoritative over the Verification Contract: the code selects a local plan and constructs executable steps before computing the contract, then executes the original plan rather than deriving execution from contract.selected_checks.
- The computed contract does not record declared risk, declared components, or evidence requirements and exposes no inputs for them, so it cannot consume the full semantic assessment or govern risk-selected verification as specified.
- The parallel runner is used for build, format, lint, selected tests, and critical paths, but the implementation does not create the required independent core, runtime, CLI, and docs/schema execution groups; the full verification route remains sequential.

## Evidence
- .agentplane/tasks/202608112259-T3ZDDM/quality/objects/sha256/b9dde49f363707885d7276347d030ccceaa5002b687282dd0e2491cc6684e810.patch
- .agentplane/tasks/202608112259-T3ZDDM/README.md

## Missing Tests
- An end-to-end invariant test proving every local, PR, release, evaluator, finish, and recovery command derives its executable requirements solely from one persisted contract, rather than from a parallel selector or plan.
- Contract schema and consumer tests covering declared risk, declared components, evidence requirements, risk escalation, and monotonic readback of those fields.
- An execution test proving named core, runtime, CLI, and docs/schema groups actually overlap in wall-clock execution and retain deterministic results for multiple simultaneous failures.

## Hidden Assumptions
- A contract computed after executable step selection is assumed to be authoritative merely because its digest is propagated to consumers.
- External effects are assumed to be an adequate substitute for the semantic assessment's explicit risk classification.
- Parallelizing lint, formatting, tests, and critical paths is assumed to satisfy the separately specified core, runtime, CLI, and docs/schema grouping contract.
- The verification record's broad scope claims are assumed to prove architectural invariants that the frozen diff contradicts.

## Residual Risks
- Make the persisted Verification Contract complete and executable: include semantic risk, declared components, and evidence requirements; derive every phase's runnable checks from that contract alone; then implement and verify the required named parallel groups before repeating exact-SHA qualification.

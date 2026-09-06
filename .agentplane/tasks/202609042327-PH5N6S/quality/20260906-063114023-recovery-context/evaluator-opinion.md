# Semantic quality review: rework

Provenance: evaluator_supplied

EVALUATOR returned rework with 2 typed finding(s).

## Findings
- The merged artifact-commit ordering changes conflict recovery behavior. Running the existing cli-core run-cli.core.pr-conflict-rework.test.ts with -t advanced_base produced 5 failures and 3 passes. external_exchange_advanced_base fails its declared clean-check command; after_verification_advanced_base fails replay with Conflict snapshot does not match the persisted semantic result; base/provider/diffstat drift cases fail before their expected identity-bound checkpoint checks. The current full CI does not cover this focused suite.
- Residual risk: PR publication and integration must wait for repaired conflict recovery and fresh verification.

## Evidence
- .agentplane/tasks/202609042327-PH5N6S/quality/objects/sha256/5f21a0e8545d799300ec12cdde63d55326594ad3303c468fe16f8ad6de34fd08.patch

## Missing Tests
- Run the existing advanced_base conflict matrix after fixing the artifact commit ordering, then the full conflict suite before integration.

## Hidden Assumptions
- An extra pre-verification artifact commit cannot change the conflict merge HEAD or interruption recovery identity.

## Residual Risks
- Keep the native main merge and completed WorkItems. Reproduce the single external_exchange_advanced_base case and the interrupted after_verification_advanced_base case. Inspect the approved external-agent-implementation-authority.ts and external-agent-implementation-finalization.ts changes against the existing conflict snapshot and checkpoint contracts. Fix the artifact ordering through existing owners without weakening identity checks or editing lifecycle records. Use existing regression tests; if a necessary change lies outside the five approved files, return a bounded plan refinement before editing that path.

# Semantic quality review: rework

Provenance: evaluator_supplied

EVALUATOR returned rework with 1 typed finding(s).

## Findings
- The persisted Verification Contract was not strengthened from the evaluated diff: it records no changed files or components and does not require full regression despite changes to CI, package manifests, schemas, routing, lifecycle, verification policy, and previously unmapped paths.

## Evidence
- .agentplane/tasks/202608112259-T3ZDDM/quality/objects/sha256/8fd6209c2f8bb5830e68c2168ef7f6d2a9c1be6aff4610f7778e10ff78c3009c.patch
- .agentplane/tasks/202608112259-T3ZDDM/quality/objects/sha256/1cabe36d131c3ba8156174a88d89100d4aa35fb15c57a397737948417168e386.json
- .agentplane/tasks/202608112259-T3ZDDM/README.md
- .agentplane/tasks/202608112259-T3ZDDM/verification/20260813074722992-6ad656c6781aca9e.json

## Missing Tests
- An exact-SHA integration test that computes observed effects from a diff containing CI, manifests, schemas, lifecycle/routing, and verification-policy paths, then asserts the persisted evaluator/recovery contract contains those paths/components, escalation reasons, and requires_full_regression=true.
- A regression test that rejects evaluator preparation when the persisted contract's observed changed_files set is empty or inconsistent with the frozen evaluated diff, even when an independently executed full regression passed.
- A consumer-consistency test proving local, PR, release, evaluator, finish, and recovery use the same strengthened contract digest after deterministic diff observation.

## Hidden Assumptions
- Passing broader local and hosted commands can compensate for a persisted Verification Contract that did not select those checks.
- An execution declaration with no changed paths or components is sufficient input for deterministic effect mapping at evaluator and recovery time.
- Binding verification evidence to the digest of an undercomputed contract proves that the contract was authoritative for the executed checks.

## Residual Risks
- Recompute and persist the Verification Contract from the exact evaluated diff so deterministic observed paths/components trigger the required central/unmapped fallback, then record exact-SHA verification against the strengthened digest and regenerate frozen evaluator evidence.

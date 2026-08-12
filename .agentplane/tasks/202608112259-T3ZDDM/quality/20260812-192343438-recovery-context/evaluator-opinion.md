# Semantic quality review: rework

Provenance: evaluator_supplied

EVALUATOR returned rework with 3 typed finding(s).

## Findings
- The frozen exact-SHA verification record does not show a hosted PR full CLI regression for evaluated SHA 98422e10574192fd43f9da6a0509ec71a2e3d1cd.
- The claimed risk-selected E2E evidence is a partial audit qualification on a different SHA, not completed real E2E on the evaluated SHA.
- Frozen verification does not demonstrate that evaluator, finish, and recovery consume the contract as an authoritative check selector; the diff primarily binds verification reuse and quality targeting to a digest.

## Evidence
- .agentplane/tasks/202608112259-T3ZDDM/verification/20260812192306993-5c516c2dac825b29.json
- .agentplane/tasks/202608112259-T3ZDDM/README.md
- .agentplane/tasks/202608112259-T3ZDDM/quality/objects/sha256/9a291733533abba8a1f938586cc3b60a4aeb2c90c506256de3f25be8df957261.patch

## Missing Tests
- Hosted PR qualification proving the complete CLI regression passed on evaluated SHA 98422e10574192fd43f9da6a0509ec71a2e3d1cd.
- A real risk-triggered E2E run bound to the evaluated SHA, with completed qualification rather than a partial audit selection.
- End-to-end tests showing evaluator, finish, and recovery derive mandatory checks from the persisted Verification Contract and block when required evidence is absent or stale.

## Hidden Assumptions
- A packaged install smoke test plus hosted-boundary Vitest matrix is treated as equivalent to the task's required real E2E.
- Evidence produced on ancestor or different clean SHAs is assumed sufficient for exact-SHA hosted and E2E gates.
- Binding verification records to a contract digest is assumed to make every lifecycle consumer authoritative even without evidence that those consumers enforce the selected checks.

## Residual Risks
- Provide exact-SHA hosted PR full-regression evidence, completed risk-selected real E2E evidence for the evaluated SHA, and consumer-level proof that evaluator, finish, and recovery enforce the persisted Verification Contract before requesting reevaluation.

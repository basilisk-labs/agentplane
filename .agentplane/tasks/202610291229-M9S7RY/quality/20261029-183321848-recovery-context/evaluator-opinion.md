# Semantic quality review: rework

Provenance: evaluator_supplied

EVALUATOR returned rework with 1 typed finding(s).

## Findings
- P2: completed-repair-scope-request.ts uses git log --full-history -m without fixing the merge diff mode. With log.diffMerges=off, the independently retained genuine merge fixture omits merge-resolution-only source.ts. gitProofEnv disables replacement objects but does not isolate log.diffMerges. The history predicate can therefore miss source changes after the consumed blocker. Use explicit --diff-merges=separate in the same approved helper and add configuration-negative coverage in the existing scope command test. Native full008 passed on178357, but the uncovered configuration case prevents semantic acceptance.

## Evidence
- .agentplane/tasks/202610291229-M9S7RY/quality/objects/sha256/d6714eb97b22b88e75e722b4e04531214a94503090fa794ef40659eee55314cd.patch

## Missing Tests
- Refuse merge-resolution-only source drift and its later revert with repository-local log.diffMerges=off. Assert the exit code before the validator reason and verify unchanged HEAD, Kernel, contract and pending request.
- Admit an authenticated README-only genuine merge that restores the exact original README and does not change source.

## Hidden Assumptions
- The -m option always selects separate merge diffs independently of log.diffMerges.

## Residual Risks
- Continue the original M9 task through a fresh native EXECUTOR episode. Change only the already approved helper and scope command test. Preserve the completed Kernel, Plan, old results, failed history and existing review thread. Require fresh native checks and EVAL for the corrected source. No publication, queue or merge before current acceptance.

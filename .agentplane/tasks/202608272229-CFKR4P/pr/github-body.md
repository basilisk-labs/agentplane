Task: `202608272229-CFKR4P`
Title: Keep verification and review on the same semantic commit
Canonical task record: `.agentplane/tasks/202608272229-CFKR4P/README.md`

## Summary

Keep verification and review on the same semantic commit

On exact main 9ab453ac00d41ea0a58cdd02e84bd0456233b151, run-cli.core.pr-flow.integrate-merge.test.ts test 'integrate promotes structured external incident candidates into the incident registry' fails at prepareHostedIntegrateFixture -> recordVerificationOk -> evaluator with missing observed changed file .agentplane/policy/incidents.md. The neighboring finish-only incident scenario passes. Diagnose the complete implementation -> pre-merge closure/policy commit -> verification -> evaluator -> integration/replay chain. Current verify-record-execute pins the review resolver head to the recorded implementation, while evaluator resolves current HEAD; prove the cause with real-Git controls before changing this. Retain the existing semantic-target resolver, frozen execution base, unchanged lifecycle-only identity, and exact evaluated diff/authority guards. Fix the smallest product/fixture scope justified by the proof. Cover a reviewable post-implementation policy change, lifecycle-only metadata, repeat verification and stale evidence. Replace any internal-call expectation only with behavior-backed coverage. Do not omit incidents from observed evidence, relax checks, add skips/timeouts, rewrite artifacts, change actual policy or CI, create a new verification architecture or implement AP-CORE-013. Preserve full mandatory CI and release 0.7.8 -> Core order. Keep provider-neutral wording as a separate cause. Two existing changes DVS5NN and AD3030 have priority for integration; planning and bounded diagnosis may proceed while their checks run. User authorized autonomous refactoring and supported operator approvals; release publication is separate.

## Scope

- In scope: On exact main 9ab453ac00d41ea0a58cdd02e84bd0456233b151, run-cli.core.pr-flow.integrate-merge.test.ts test 'integrate promotes structured external incident candidates into the incident registry' fails at prepareHostedIntegrateFixture -> recordVerificationOk -> evaluator with missing observed changed file .agentplane/policy/incidents.md. The neighboring finish-only incident scenario passes. Diagnose the complete implementation -> pre-merge closure/policy commit -> verification -> evaluator -> integration/replay chain. Current verify-record-execute pins the review resolver head to the recorded implementation, while evaluator resolves current HEAD; prove the cause with real-Git controls before changing this. Retain the existing semantic-target resolver, frozen execution base, unchanged lifecycle-only identity, and exact evaluated diff/authority guards. Fix the smallest product/fixture scope justified by the proof. Cover a reviewable post-implementation policy change, lifecycle-only metadata, repeat verification and stale evidence. Replace any internal-call expectation only with behavior-backed coverage. Do not omit incidents from observed evidence, relax checks, add skips/timeouts, rewrite artifacts, change actual policy or CI, create a new verification architecture or implement AP-CORE-013. Preserve full mandatory CI and release 0.7.8 -> Core order. Keep provider-neutral wording as a separate cause. Two existing changes DVS5NN and AD3030 have priority for integration; planning and bounded diagnosis may proceed while their checks run. User authorized autonomous refactoring and supported operator approvals; release publication is separate.
- Out of scope: unrelated refactors not required for "Keep verification and review on the same semantic commit".

## Verification

- State: ok
- Note: Verified: CLI-owned checks passed before independent EVALUATOR review.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-27T23:06:06.875Z
- Branch: task/202608272229-CFKR4P/keep-verification-and-review-on-the-same-semanti
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/commands/task/verify-record-execute.ts     |  11 +-
 .../task/verify-record.durability.unit.test.ts     | 329 +++++++++++++++------
 .../src/commands/task/verify-record.unit.test.ts   |   5 +-
 3 files changed, 253 insertions(+), 92 deletions(-)
```

</details>

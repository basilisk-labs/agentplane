Task: `202610280840-VPBGBK`
Title: Allow one admitted verification retry for immutable completed Kernel followups
Canonical task record: `.agentplane/tasks/202610280840-VPBGBK/README.md`

## Summary

Allow one admitted verification retry for immutable completed Kernel followups

Actual HUMAN explicitly approved in SB thread01a17c58-b597-78a1-abed-517855b3f393 message01a181a3-ef22-7af0-b6ce-e9f9b00f8d23: narrow AgentPlane fix, separate Task ID, checks and PR/merge, then sb recovery preserving data credentials runtime guards. Exact reviewed design SHA9bda08b6d37c2badb985ac8c8c823651cd0a5edcfd0db8c856dfdedf68964794 in Factory YMR EVID sb-post121845-terminal-verification-retry-reviewable-design.json. Real case Factory completedKernel DRG36R, source48a/currentmanagedhead d906: native run028failed environmental localhost proxy501; corrected commandlocaltransport and actual canonical72PASS685.829/5441/4partitions, but completed no-source-change rework84699 refuses; legacy recovery requires missing current_plan. First qualify CURRENTcanonical d514 mechanisms; do not duplicate a newly existing supported route. Implement one public typed verification_retry_request through existing task advance workflow recovery. Controller authenticates exact repository/terminalKernel digest/approvedcheckcontract/realfailedsupervisorattempt/source or audited managedmetadata-only descendant; when bindingmissing create fresh controller adoption observation, never backfill oldreceipt. One statebound durable retry/attempt, all original mandatorychecks actualnativeexecutor once, fresh before/after source/scope/contract pins; PASS only after actualsuccess, then freshEVALUATOR current-source. Immutable completedKernel/plan/workitems/oldEVAL/failed028 remain byteexact. No general reopen/forceOK/internalAPIcaller/manualTaskJSON/fake sourcediff/import of independentPASS as authority. Drift/unknown/interrupt/duplicate refuse, old no-diff and publicationfrozenbaseguards unchanged. Publicationbase mismatch3f31-vs94 is separate blocker, not permission to disable it. Nearest fault/CLI tests cover canonicalcompleted/no legacy/envfail recovery and exactKernel preservation, source/head/scope/command drift, oldevidence non-adoption, interrupted/failed idempotence/no duplicateexecutor, unchangedlegacy/no-diff/provider guard. Scope exacteight listed roots; native plan may narrow or propose necessary bounded refinement under actual user authorization, not silently broaden. Preserve all originalAP/Factory worktrees and untracked native artifacts, foreignFactoryshim cfab, all privateTMP; no install/globalenv/auth/credential/ACL/runtime effects. Only source repair/checks/authorizedcanonicalGitHubPRmerge in this APTask; no Beta host access. Full mandatory native validation and independent review before publication. Existing source/currentbase CDC stale; canonicalremote d514 verified by ls-remote+scopedfetch. Base pinned d514. Previous N1E7M3 scope is not reused/reopened. This is genuinely new framework repair, not replacementFactoryTask or fakeclosure.

## Scope

- In scope: Actual HUMAN explicitly approved in SB thread01a17c58-b597-78a1-abed-517855b3f393 message01a181a3-ef22-7af0-b6ce-e9f9b00f8d23: narrow AgentPlane fix, separate Task ID, checks and PR/merge, then sb recovery preserving data credentials runtime guards. Exact reviewed design SHA9bda08b6d37c2badb985ac8c8c823651cd0a5edcfd0db8c856dfdedf68964794 in Factory YMR EVID sb-post121845-terminal-verification-retry-reviewable-design.json. Real case Factory completedKernel DRG36R, source48a/currentmanagedhead d906: native run028failed environmental localhost proxy501; corrected commandlocaltransport and actual canonical72PASS685.829/5441/4partitions, but completed no-source-change rework84699 refuses; legacy recovery requires missing current_plan. First qualify CURRENTcanonical d514 mechanisms; do not duplicate a newly existing supported route. Implement one public typed verification_retry_request through existing task advance workflow recovery. Controller authenticates exact repository/terminalKernel digest/approvedcheckcontract/realfailedsupervisorattempt/source or audited managedmetadata-only descendant; when bindingmissing create fresh controller adoption observation, never backfill oldreceipt. One statebound durable retry/attempt, all original mandatorychecks actualnativeexecutor once, fresh before/after source/scope/contract pins; PASS only after actualsuccess, then freshEVALUATOR current-source. Immutable completedKernel/plan/workitems/oldEVAL/failed028 remain byteexact. No general reopen/forceOK/internalAPIcaller/manualTaskJSON/fake sourcediff/import of independentPASS as authority. Drift/unknown/interrupt/duplicate refuse, old no-diff and publicationfrozenbaseguards unchanged. Publicationbase mismatch3f31-vs94 is separate blocker, not permission to disable it. Nearest fault/CLI tests cover canonicalcompleted/no legacy/envfail recovery and exactKernel preservation, source/head/scope/command drift, oldevidence non-adoption, interrupted/failed idempotence/no duplicateexecutor, unchangedlegacy/no-diff/provider guard. Scope exacteight listed roots; native plan may narrow or propose necessary bounded refinement under actual user authorization, not silently broaden. Preserve all originalAP/Factory worktrees and untracked native artifacts, foreignFactoryshim cfab, all privateTMP; no install/globalenv/auth/credential/ACL/runtime effects. Only source repair/checks/authorizedcanonicalGitHubPRmerge in this APTask; no Beta host access. Full mandatory native validation and independent review before publication. Existing source/currentbase CDC stale; canonicalremote d514 verified by ls-remote+scopedfetch. Base pinned d514. Previous N1E7M3 scope is not reused/reopened. This is genuinely new framework repair, not replacementFactoryTask or fakeclosure.
- Out of scope: unrelated refactors not required for "Allow one admitted verification retry for immutable completed Kernel followups".

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-10-28T11:38:02.250Z
- Branch: task/202610280840-VPBGBK/terminal-verification-retry
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 ...re.workflow-recovery.verification-retry.test.ts | 563 +++++++++++++++++++++
 .../agentplane/src/cli/stale-dist-readonly.test.ts |   2 +
 .../task/direct-task-verification-observation.ts   | 101 +++-
 .../direct-task-verification.observability.test.ts |  88 +++-
 .../src/commands/task/direct-task-verification.ts  |  24 +-
 .../verification-retry-effect-recovery.test.ts     | 392 ++++++++++++++
 .../task/verification-retry-effect-recovery.ts     | 479 ++++++++++++++++++
 .../task/verification-retry-source-proof.test.ts   | 145 ++++++
 .../task/verification-retry-source-proof.ts        | 276 ++++++++++
 .../src/commands/task/verify-record-execute.ts     |   5 +-
 .../agentplane/src/commands/task/verify-record.ts  |   2 +
 .../src/commands/task/verify-record.types.ts       |   2 +
 .../src/commands/task/workflow-effect-recovery.ts  |   2 +
 13 files changed, 2059 insertions(+), 22 deletions(-)
```

</details>

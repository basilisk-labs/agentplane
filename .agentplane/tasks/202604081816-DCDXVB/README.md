---
id: "202604081816-DCDXVB"
title: "Let verify append promotable incident findings in one command"
result_summary: "integrate: squash task/202604081816-DCDXVB/verify-incident-finding"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "incidents"
  - "ux"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-08T18:17:42.963Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-08T18:50:24.765Z"
  updated_by: "CODER"
  note: "Command: bun x vitest run packages/agentplane/src/commands/task/verify-record.unit.test.ts packages/agentplane/src/commands/workflow.verify-hooks.test.ts packages/agentplane/src/cli/run-cli.core.incidents.test.ts; bun x eslint packages/agentplane/src/cli/command-invocations.ts packages/agentplane/src/commands/task/findings.ts packages/agentplane/src/commands/task/shared/transitions.ts packages/agentplane/src/commands/task/verify-command-shared.ts packages/agentplane/src/commands/task/verify-ok.command.ts packages/agentplane/src/commands/task/verify-record.ts packages/agentplane/src/commands/task/verify-rework.command.ts packages/agentplane/src/commands/verify.run.ts packages/agentplane/src/commands/verify.spec.ts packages/agentplane/src/commands/workflow.verify-hooks.test.ts packages/agentplane/src/cli/run-cli.core.incidents.test.ts; bun run framework:dev:bootstrap. Result: pass. Evidence: verify now accepts structured finding flags, records incident-candidate vs task-local findings in the same mutation path, and incidents collect sees verify-appended promotable findings while local-only entries stay skipped. Scope: verify-to-findings incident flow."
commit:
  hash: "02141f1ad9f97bd4858467b1c4440c891113c597"
  message: "🧩 DCDXVB integrate: incidents/ux: Let verify append promotable incident findings in one command"
comments:
  -
    author: "CODER"
    body: "Start: trace verify and findings flows, then add the smallest verify-side structured finding append path so incident candidates can be recorded without a second command."
  -
    author: "INTEGRATOR"
    body: "Verified: Integrated via squash; verify=skipped(no commands); pr=.agentplane/tasks/202604081816-DCDXVB/pr."
events:
  -
    type: "status"
    at: "2026-04-08T18:26:53.837Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: trace verify and findings flows, then add the smallest verify-side structured finding append path so incident candidates can be recorded without a second command."
  -
    type: "verify"
    at: "2026-04-08T18:50:24.765Z"
    author: "CODER"
    state: "ok"
    note: "Command: bun x vitest run packages/agentplane/src/commands/task/verify-record.unit.test.ts packages/agentplane/src/commands/workflow.verify-hooks.test.ts packages/agentplane/src/cli/run-cli.core.incidents.test.ts; bun x eslint packages/agentplane/src/cli/command-invocations.ts packages/agentplane/src/commands/task/findings.ts packages/agentplane/src/commands/task/shared/transitions.ts packages/agentplane/src/commands/task/verify-command-shared.ts packages/agentplane/src/commands/task/verify-ok.command.ts packages/agentplane/src/commands/task/verify-record.ts packages/agentplane/src/commands/task/verify-rework.command.ts packages/agentplane/src/commands/verify.run.ts packages/agentplane/src/commands/verify.spec.ts packages/agentplane/src/commands/workflow.verify-hooks.test.ts packages/agentplane/src/cli/run-cli.core.incidents.test.ts; bun run framework:dev:bootstrap. Result: pass. Evidence: verify now accepts structured finding flags, records incident-candidate vs task-local findings in the same mutation path, and incidents collect sees verify-appended promotable findings while local-only entries stay skipped. Scope: verify-to-findings incident flow."
  -
    type: "status"
    at: "2026-04-08T19:05:09.423Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: Integrated via squash; verify=skipped(no commands); pr=.agentplane/tasks/202604081816-DCDXVB/pr."
doc_version: 3
doc_updated_at: "2026-04-08T19:05:09.427Z"
doc_updated_by: "INTEGRATOR"
description: "The incident registry path exists, but real operator flow almost never leaves structured incident candidates because verify and findings are separate steps. Extend verify so a verifier can append a structured finding/incident candidate in the same command, preserving task-local opt-out and existing promotion semantics."
sections:
  Summary: |-
    Let verify append promotable incident findings in one command
    
    The incident registry path exists, but real operator flow almost never leaves structured incident candidates because verify and findings are separate steps. Extend verify so a verifier can append a structured finding/incident candidate in the same command, preserving task-local opt-out and existing promotion semantics.
  Scope: |-
    - In scope: The incident registry path exists, but real operator flow almost never leaves structured incident candidates because verify and findings are separate steps. Extend verify so a verifier can append a structured finding/incident candidate in the same command, preserving task-local opt-out and existing promotion semantics.
    - Out of scope: unrelated refactors not required for "Let verify append promotable incident findings in one command".
  Plan: "1. Trace verify and findings flows to find the smallest way to let a verifier append a structured finding/incident candidate without a second command. 2. Extend verify CLI parsing and record logic with optional finding fields that append the same structured block as task findings add, preserving local-only opt-out and existing note/file behavior. 3. Add targeted tests for verify plus finding append, local-only behavior, and incident-ready default semantics. 4. Verify that finish or incidents collect can promote the appended finding under the existing rules."
  Verify Steps: "1. Run the focused verify/findings/incident tests. Expected: verify can append a structured finding in the same command and preserves existing verification behavior. 2. Validate local-only vs default-promotable semantics. Expected: default verify-added findings carry incident-candidate metadata, while explicit local-only entries stay task-local. 3. Run incidents collect on a representative task fixture. Expected: a verify-appended promotable finding can be promoted under the existing incidents rules."
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-08T18:50:24.765Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: bun x vitest run packages/agentplane/src/commands/task/verify-record.unit.test.ts packages/agentplane/src/commands/workflow.verify-hooks.test.ts packages/agentplane/src/cli/run-cli.core.incidents.test.ts; bun x eslint packages/agentplane/src/cli/command-invocations.ts packages/agentplane/src/commands/task/findings.ts packages/agentplane/src/commands/task/shared/transitions.ts packages/agentplane/src/commands/task/verify-command-shared.ts packages/agentplane/src/commands/task/verify-ok.command.ts packages/agentplane/src/commands/task/verify-record.ts packages/agentplane/src/commands/task/verify-rework.command.ts packages/agentplane/src/commands/verify.run.ts packages/agentplane/src/commands/verify.spec.ts packages/agentplane/src/commands/workflow.verify-hooks.test.ts packages/agentplane/src/cli/run-cli.core.incidents.test.ts; bun run framework:dev:bootstrap. Result: pass. Evidence: verify now accepts structured finding flags, records incident-candidate vs task-local findings in the same mutation path, and incidents collect sees verify-appended promotable findings while local-only entries stay skipped. Scope: verify-to-findings incident flow.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-08T18:26:53.852Z, excerpt_hash=sha256:1bb20b0c5a296606ae8641fe595c4679af4b17c3ae788a4e0cad851b32f7f7e4
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Let verify append promotable incident findings in one command

The incident registry path exists, but real operator flow almost never leaves structured incident candidates because verify and findings are separate steps. Extend verify so a verifier can append a structured finding/incident candidate in the same command, preserving task-local opt-out and existing promotion semantics.

## Scope

- In scope: The incident registry path exists, but real operator flow almost never leaves structured incident candidates because verify and findings are separate steps. Extend verify so a verifier can append a structured finding/incident candidate in the same command, preserving task-local opt-out and existing promotion semantics.
- Out of scope: unrelated refactors not required for "Let verify append promotable incident findings in one command".

## Plan

1. Trace verify and findings flows to find the smallest way to let a verifier append a structured finding/incident candidate without a second command. 2. Extend verify CLI parsing and record logic with optional finding fields that append the same structured block as task findings add, preserving local-only opt-out and existing note/file behavior. 3. Add targeted tests for verify plus finding append, local-only behavior, and incident-ready default semantics. 4. Verify that finish or incidents collect can promote the appended finding under the existing rules.

## Verify Steps

1. Run the focused verify/findings/incident tests. Expected: verify can append a structured finding in the same command and preserves existing verification behavior. 2. Validate local-only vs default-promotable semantics. Expected: default verify-added findings carry incident-candidate metadata, while explicit local-only entries stay task-local. 3. Run incidents collect on a representative task fixture. Expected: a verify-appended promotable finding can be promoted under the existing incidents rules.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-08T18:50:24.765Z — VERIFY — ok

By: CODER

Note: Command: bun x vitest run packages/agentplane/src/commands/task/verify-record.unit.test.ts packages/agentplane/src/commands/workflow.verify-hooks.test.ts packages/agentplane/src/cli/run-cli.core.incidents.test.ts; bun x eslint packages/agentplane/src/cli/command-invocations.ts packages/agentplane/src/commands/task/findings.ts packages/agentplane/src/commands/task/shared/transitions.ts packages/agentplane/src/commands/task/verify-command-shared.ts packages/agentplane/src/commands/task/verify-ok.command.ts packages/agentplane/src/commands/task/verify-record.ts packages/agentplane/src/commands/task/verify-rework.command.ts packages/agentplane/src/commands/verify.run.ts packages/agentplane/src/commands/verify.spec.ts packages/agentplane/src/commands/workflow.verify-hooks.test.ts packages/agentplane/src/cli/run-cli.core.incidents.test.ts; bun run framework:dev:bootstrap. Result: pass. Evidence: verify now accepts structured finding flags, records incident-candidate vs task-local findings in the same mutation path, and incidents collect sees verify-appended promotable findings while local-only entries stay skipped. Scope: verify-to-findings incident flow.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-08T18:26:53.852Z, excerpt_hash=sha256:1bb20b0c5a296606ae8641fe595c4679af4b17c3ae788a4e0cad851b32f7f7e4

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

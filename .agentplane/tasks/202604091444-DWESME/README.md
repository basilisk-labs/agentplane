---
id: "202604091444-DWESME"
title: "Let finish append structured incident findings before promotion"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 8
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "incidents"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-09T14:46:02.768Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-09T15:17:27.588Z"
  updated_by: "CODER"
  note: |-
    Command: agentplane docs cli --out docs/user/cli-reference.generated.mdx && bun run docs:cli:check
    Result: pass
    Evidence: regenerated docs/user/cli-reference.generated.mdx and docs parity check reported the reference up to date.
    Scope: current branch head after refreshing generated CLI docs for finish command changes.
commit: null
comments:
  -
    author: "CODER"
    body: "Start: let finish append a structured finding and collect it into incidents.md during closeout."
events:
  -
    type: "status"
    at: "2026-04-09T14:46:06.076Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: let finish append a structured finding and collect it into incidents.md during closeout."
  -
    type: "verify"
    at: "2026-04-09T15:07:25.338Z"
    author: "CODER"
    state: "ok"
    note: |-
      Command: bun x vitest run packages/agentplane/src/cli/run-cli.core.incidents.test.ts packages/agentplane/src/commands/task/finish.unit.test.ts
      Result: pass
      Evidence: 40/40 tests passed, including finish-time structured finding promotion during closeout.
      Scope: finish CLI parsing, finish task mutation, and incident promotion flow.
      
      Command: bun x eslint packages/agentplane/src/commands/finish.spec.ts packages/agentplane/src/commands/finish.run.ts packages/agentplane/src/commands/task/finish.ts packages/agentplane/src/cli/run-cli.core.incidents.test.ts
      Result: pass
      Evidence: eslint exited 0.
      Scope: finish implementation and integration test coverage.
      
      Command: node .agentplane/policy/check-routing.mjs
      Result: pass
      Evidence: policy routing OK.
      Scope: policy gateway and routing budget integrity after finish command changes.
  -
    type: "verify"
    at: "2026-04-09T15:14:15.106Z"
    author: "CODER"
    state: "ok"
    note: |-
      Command: bun x prettier --check packages/agentplane/src/cli/run-cli.core.incidents.test.ts packages/agentplane/src/commands/finish.spec.ts && bun x vitest run packages/agentplane/src/cli/run-cli.core.incidents.test.ts packages/agentplane/src/commands/task/finish.unit.test.ts && bun x eslint packages/agentplane/src/commands/finish.spec.ts packages/agentplane/src/commands/finish.run.ts packages/agentplane/src/commands/task/finish.ts packages/agentplane/src/cli/run-cli.core.incidents.test.ts
      Result: pass
      Evidence: Prettier matched, 40/40 tests passed, eslint exited 0 after CI formatting fix.
      Scope: current branch head after post-CI formatting for finish-time incident promotion.
  -
    type: "verify"
    at: "2026-04-09T15:17:27.588Z"
    author: "CODER"
    state: "ok"
    note: |-
      Command: agentplane docs cli --out docs/user/cli-reference.generated.mdx && bun run docs:cli:check
      Result: pass
      Evidence: regenerated docs/user/cli-reference.generated.mdx and docs parity check reported the reference up to date.
      Scope: current branch head after refreshing generated CLI docs for finish command changes.
doc_version: 3
doc_updated_at: "2026-04-09T15:17:27.595Z"
doc_updated_by: "CODER"
description: "Allow finish-time closure to record a structured finding and immediately promote it into incidents.md so recurring workflow failures can be captured even when the finding was identified only at closeout."
sections:
  Summary: |-
    Let finish append structured incident findings before promotion
    
    Allow finish-time closure to record a structured finding and immediately promote it into incidents.md so recurring workflow failures can be captured even when the finding was identified only at closeout.
  Scope: |-
    - In scope: Allow finish-time closure to record a structured finding and immediately promote it into incidents.md so recurring workflow failures can be captured even when the finding was identified only at closeout.
    - Out of scope: unrelated refactors not required for "Let finish append structured incident findings before promotion".
  Plan: |-
    1. Implement the change for "Let finish append structured incident findings before promotion".
    2. Run required checks and capture verification evidence.
    3. Finalize task findings and finish with traceable commit metadata.
  Verify Steps: "1. Reproduce finish-time closure where a reusable workflow finding is identified only at closeout. Expected: finish can append a structured finding and promote it into .agentplane/policy/incidents.md in the same flow. 2. Run focused incidents/finish tests. Expected: external or repo-fixable closeout findings update both task docs and the shared incident registry deterministically. 3. Run relevant lint/tests and policy routing check. Expected: incidents policy mirrors and CLI behavior stay aligned."
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-09T15:07:25.338Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: bun x vitest run packages/agentplane/src/cli/run-cli.core.incidents.test.ts packages/agentplane/src/commands/task/finish.unit.test.ts
    Result: pass
    Evidence: 40/40 tests passed, including finish-time structured finding promotion during closeout.
    Scope: finish CLI parsing, finish task mutation, and incident promotion flow.
    
    Command: bun x eslint packages/agentplane/src/commands/finish.spec.ts packages/agentplane/src/commands/finish.run.ts packages/agentplane/src/commands/task/finish.ts packages/agentplane/src/cli/run-cli.core.incidents.test.ts
    Result: pass
    Evidence: eslint exited 0.
    Scope: finish implementation and integration test coverage.
    
    Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: policy routing OK.
    Scope: policy gateway and routing budget integrity after finish command changes.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-09T14:46:06.088Z, excerpt_hash=sha256:287e4845bf228f50eda79665fdc1b5d86aa80fd51cc825c032459c75f423d5b1
    
    ### 2026-04-09T15:14:15.106Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: bun x prettier --check packages/agentplane/src/cli/run-cli.core.incidents.test.ts packages/agentplane/src/commands/finish.spec.ts && bun x vitest run packages/agentplane/src/cli/run-cli.core.incidents.test.ts packages/agentplane/src/commands/task/finish.unit.test.ts && bun x eslint packages/agentplane/src/commands/finish.spec.ts packages/agentplane/src/commands/finish.run.ts packages/agentplane/src/commands/task/finish.ts packages/agentplane/src/cli/run-cli.core.incidents.test.ts
    Result: pass
    Evidence: Prettier matched, 40/40 tests passed, eslint exited 0 after CI formatting fix.
    Scope: current branch head after post-CI formatting for finish-time incident promotion.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-09T15:07:25.342Z, excerpt_hash=sha256:287e4845bf228f50eda79665fdc1b5d86aa80fd51cc825c032459c75f423d5b1
    
    ### 2026-04-09T15:17:27.588Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: agentplane docs cli --out docs/user/cli-reference.generated.mdx && bun run docs:cli:check
    Result: pass
    Evidence: regenerated docs/user/cli-reference.generated.mdx and docs parity check reported the reference up to date.
    Scope: current branch head after refreshing generated CLI docs for finish command changes.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-09T15:14:15.115Z, excerpt_hash=sha256:287e4845bf228f50eda79665fdc1b5d86aa80fd51cc825c032459c75f423d5b1
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Let finish append structured incident findings before promotion

Allow finish-time closure to record a structured finding and immediately promote it into incidents.md so recurring workflow failures can be captured even when the finding was identified only at closeout.

## Scope

- In scope: Allow finish-time closure to record a structured finding and immediately promote it into incidents.md so recurring workflow failures can be captured even when the finding was identified only at closeout.
- Out of scope: unrelated refactors not required for "Let finish append structured incident findings before promotion".

## Plan

1. Implement the change for "Let finish append structured incident findings before promotion".
2. Run required checks and capture verification evidence.
3. Finalize task findings and finish with traceable commit metadata.

## Verify Steps

1. Reproduce finish-time closure where a reusable workflow finding is identified only at closeout. Expected: finish can append a structured finding and promote it into .agentplane/policy/incidents.md in the same flow. 2. Run focused incidents/finish tests. Expected: external or repo-fixable closeout findings update both task docs and the shared incident registry deterministically. 3. Run relevant lint/tests and policy routing check. Expected: incidents policy mirrors and CLI behavior stay aligned.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-09T15:07:25.338Z — VERIFY — ok

By: CODER

Note: Command: bun x vitest run packages/agentplane/src/cli/run-cli.core.incidents.test.ts packages/agentplane/src/commands/task/finish.unit.test.ts
Result: pass
Evidence: 40/40 tests passed, including finish-time structured finding promotion during closeout.
Scope: finish CLI parsing, finish task mutation, and incident promotion flow.

Command: bun x eslint packages/agentplane/src/commands/finish.spec.ts packages/agentplane/src/commands/finish.run.ts packages/agentplane/src/commands/task/finish.ts packages/agentplane/src/cli/run-cli.core.incidents.test.ts
Result: pass
Evidence: eslint exited 0.
Scope: finish implementation and integration test coverage.

Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: policy routing OK.
Scope: policy gateway and routing budget integrity after finish command changes.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-09T14:46:06.088Z, excerpt_hash=sha256:287e4845bf228f50eda79665fdc1b5d86aa80fd51cc825c032459c75f423d5b1

### 2026-04-09T15:14:15.106Z — VERIFY — ok

By: CODER

Note: Command: bun x prettier --check packages/agentplane/src/cli/run-cli.core.incidents.test.ts packages/agentplane/src/commands/finish.spec.ts && bun x vitest run packages/agentplane/src/cli/run-cli.core.incidents.test.ts packages/agentplane/src/commands/task/finish.unit.test.ts && bun x eslint packages/agentplane/src/commands/finish.spec.ts packages/agentplane/src/commands/finish.run.ts packages/agentplane/src/commands/task/finish.ts packages/agentplane/src/cli/run-cli.core.incidents.test.ts
Result: pass
Evidence: Prettier matched, 40/40 tests passed, eslint exited 0 after CI formatting fix.
Scope: current branch head after post-CI formatting for finish-time incident promotion.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-09T15:07:25.342Z, excerpt_hash=sha256:287e4845bf228f50eda79665fdc1b5d86aa80fd51cc825c032459c75f423d5b1

### 2026-04-09T15:17:27.588Z — VERIFY — ok

By: CODER

Note: Command: agentplane docs cli --out docs/user/cli-reference.generated.mdx && bun run docs:cli:check
Result: pass
Evidence: regenerated docs/user/cli-reference.generated.mdx and docs parity check reported the reference up to date.
Scope: current branch head after refreshing generated CLI docs for finish command changes.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-09T15:14:15.115Z, excerpt_hash=sha256:287e4845bf228f50eda79665fdc1b5d86aa80fd51cc825c032459c75f423d5b1

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

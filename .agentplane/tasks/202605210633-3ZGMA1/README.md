---
id: "202605210633-3ZGMA1"
title: "Fix README stale run examples"
status: "DOING"
priority: "med"
owner: "DOCS"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "docs"
task_kind: "docs"
mutation_scope: "docs"
blueprint_request: "docs.change"
verify:
  - "agentplane doctor"
  - "bunx prettier --check README.md packages/agentplane/README.md"
  - "node .agentplane/policy/check-routing.mjs"
  - "rg -n 'agentplane run|agentplane trace|agentplane.yaml' README.md packages/agentplane/README.md"
plan_approval:
  state: "approved"
  updated_at: "2026-05-21T06:33:44.381Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-21T06:37:00.853Z"
  updated_by: "EVALUATOR"
  note: "Independent quality gate pass: diff is limited to README.md plus task artifacts, stale README runner/trace examples are removed, package README had no matching stale surface, and required docs checks passed. Residual gap: broader docs still contain historical run/trace pages, outside this README-scoped task."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-05-21T06:37:00.853Z"
  updated_by: "EVALUATOR"
  note: "Independent quality gate pass: diff is limited to README.md plus task artifacts, stale README runner/trace examples are removed, package README had no matching stale surface, and required docs checks passed. Residual gap: broader docs still contain historical run/trace pages, outside this README-scoped task."
  evaluated_sha: "a25ac4fc2bf7ad0551d2fccb3c29a82f4ee743ca"
  blueprint_digest: "7845963ecc4ace1ba2b90cb5fd5a04f7b732be38f730967707f3d635e108c15b"
  evidence_refs:
    - ".agentplane/tasks/202605210633-3ZGMA1/README.md"
    - "/Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605210633-3ZGMA1-readme-cli-drift/.agentplane/tasks/202605210633-3ZGMA1/blueprint/resolved-snapshot.json"
  findings: []
commit: null
comments:
  -
    author: "DOCS"
    body: "Start: updating public README command examples against current CLI help output and removing stale run/trace YAML onboarding claims."
events:
  -
    type: "status"
    at: "2026-05-21T06:34:14.446Z"
    author: "DOCS"
    from: "TODO"
    to: "DOING"
    note: "Start: updating public README command examples against current CLI help output and removing stale run/trace YAML onboarding claims."
  -
    type: "verify"
    at: "2026-05-21T06:36:46.503Z"
    author: "DOCS"
    state: "ok"
    note: "Command: ap help --compact; Result: pass; Evidence: command catalog includes quickstart/demo/task begin/acr and no public run or trace commands. Command: ap help run --compact and ap help trace --compact; Result: pass; Evidence: both return Unknown command. Command: rg -n 'agentplane run|agentplane trace|agentplane\\.ya?ml|\\.agentplane/runs|\\.agentplane/traces|\\.agentplane/exports|run -> trace' -g 'README.md'; Result: pass; Evidence: no README files contain stale runner/trace onboarding. Command: bunx prettier --check README.md packages/agentplane/README.md; Result: pass. Command: node .agentplane/policy/check-routing.mjs; Result: pass. Command: agentplane doctor; Result: pass with info-only runtime findings."
  -
    type: "verify"
    at: "2026-05-21T06:37:00.853Z"
    author: "EVALUATOR"
    state: "ok"
    note: "Independent quality gate pass: diff is limited to README.md plus task artifacts, stale README runner/trace examples are removed, package README had no matching stale surface, and required docs checks passed. Residual gap: broader docs still contain historical run/trace pages, outside this README-scoped task."
doc_version: 3
doc_updated_at: "2026-05-21T06:37:00.905Z"
doc_updated_by: "DOCS"
description: "Remove stale README references to the removed agentplane run/trace YAML workflow and align public README onboarding with the current CLI."
sections:
  Summary: |-
    Fix README stale run examples

    Remove stale README references to the removed agentplane run/trace YAML workflow and align public README onboarding with the current CLI.
  Scope: |-
    - In scope: Remove stale README references to the removed agentplane run/trace YAML workflow and align public README onboarding with the current CLI.
    - Out of scope: unrelated refactors not required for "Fix README stale run examples".
  Plan: |-
    1. Compare README command examples against the current CLI help/catalog.
    2. Replace stale run/trace/agentplane.yaml examples with supported init/quickstart/demo/task/ACR flows.
    3. Keep README and npm package README consistent where public onboarding overlaps.
    4. Run docs verification: routing check, doctor, targeted prettier, and grep for stale README run examples.
  Verify Steps: |-
    1. Run `ap help --compact`. Expected: public command list includes current onboarding commands and does not include public `run` or `trace` commands.
    2. Run `ap help run --compact` and `ap help trace --compact`. Expected: both return `Unknown command`, confirming the removed README examples were stale.
    3. Run `rg -n 'agentplane run|agentplane trace|agentplane\.ya?ml|\.agentplane/runs|\.agentplane/traces|\.agentplane/exports|run -> trace' -g 'README.md'`. Expected: no README files contain the stale runner/trace onboarding surface.
    4. Run `bunx prettier --check README.md packages/agentplane/README.md`. Expected: touched README surfaces are formatted.
    5. Run `node .agentplane/policy/check-routing.mjs` and `agentplane doctor`. Expected: docs routing and workspace invariants pass.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-21T06:36:46.503Z — VERIFY — ok

    By: DOCS

    Note: Command: ap help --compact; Result: pass; Evidence: command catalog includes quickstart/demo/task begin/acr and no public run or trace commands. Command: ap help run --compact and ap help trace --compact; Result: pass; Evidence: both return Unknown command. Command: rg -n 'agentplane run|agentplane trace|agentplane\.ya?ml|\.agentplane/runs|\.agentplane/traces|\.agentplane/exports|run -> trace' -g 'README.md'; Result: pass; Evidence: no README files contain stale runner/trace onboarding. Command: bunx prettier --check README.md packages/agentplane/README.md; Result: pass. Command: node .agentplane/policy/check-routing.mjs; Result: pass. Command: agentplane doctor; Result: pass with info-only runtime findings.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-21T06:35:30.399Z, excerpt_hash=sha256:01b8374511f201deedade6def46d5a4120ce9b4e7e55862c0744cb22d97a2cf0

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605210633-3ZGMA1-readme-cli-drift/.agentplane/tasks/202605210633-3ZGMA1/blueprint/resolved-snapshot.json
    - old_digest: 7845963ecc4ace1ba2b90cb5fd5a04f7b732be38f730967707f3d635e108c15b
    - current_digest: 7845963ecc4ace1ba2b90cb5fd5a04f7b732be38f730967707f3d635e108c15b
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605210633-3ZGMA1

    ### 2026-05-21T06:37:00.853Z — VERIFY — ok

    By: EVALUATOR

    Note: Independent quality gate pass: diff is limited to README.md plus task artifacts, stale README runner/trace examples are removed, package README had no matching stale surface, and required docs checks passed. Residual gap: broader docs still contain historical run/trace pages, outside this README-scoped task.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-21T06:36:46.535Z, excerpt_hash=sha256:01b8374511f201deedade6def46d5a4120ce9b4e7e55862c0744cb22d97a2cf0

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605210633-3ZGMA1-readme-cli-drift/.agentplane/tasks/202605210633-3ZGMA1/blueprint/resolved-snapshot.json
    - old_digest: 7845963ecc4ace1ba2b90cb5fd5a04f7b732be38f730967707f3d635e108c15b
    - current_digest: 7845963ecc4ace1ba2b90cb5fd5a04f7b732be38f730967707f3d635e108c15b
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605210633-3ZGMA1

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Fix README stale run examples

Remove stale README references to the removed agentplane run/trace YAML workflow and align public README onboarding with the current CLI.

## Scope

- In scope: Remove stale README references to the removed agentplane run/trace YAML workflow and align public README onboarding with the current CLI.
- Out of scope: unrelated refactors not required for "Fix README stale run examples".

## Plan

1. Compare README command examples against the current CLI help/catalog.
2. Replace stale run/trace/agentplane.yaml examples with supported init/quickstart/demo/task/ACR flows.
3. Keep README and npm package README consistent where public onboarding overlaps.
4. Run docs verification: routing check, doctor, targeted prettier, and grep for stale README run examples.

## Verify Steps

1. Run `ap help --compact`. Expected: public command list includes current onboarding commands and does not include public `run` or `trace` commands.
2. Run `ap help run --compact` and `ap help trace --compact`. Expected: both return `Unknown command`, confirming the removed README examples were stale.
3. Run `rg -n 'agentplane run|agentplane trace|agentplane\.ya?ml|\.agentplane/runs|\.agentplane/traces|\.agentplane/exports|run -> trace' -g 'README.md'`. Expected: no README files contain the stale runner/trace onboarding surface.
4. Run `bunx prettier --check README.md packages/agentplane/README.md`. Expected: touched README surfaces are formatted.
5. Run `node .agentplane/policy/check-routing.mjs` and `agentplane doctor`. Expected: docs routing and workspace invariants pass.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-21T06:36:46.503Z — VERIFY — ok

By: DOCS

Note: Command: ap help --compact; Result: pass; Evidence: command catalog includes quickstart/demo/task begin/acr and no public run or trace commands. Command: ap help run --compact and ap help trace --compact; Result: pass; Evidence: both return Unknown command. Command: rg -n 'agentplane run|agentplane trace|agentplane\.ya?ml|\.agentplane/runs|\.agentplane/traces|\.agentplane/exports|run -> trace' -g 'README.md'; Result: pass; Evidence: no README files contain stale runner/trace onboarding. Command: bunx prettier --check README.md packages/agentplane/README.md; Result: pass. Command: node .agentplane/policy/check-routing.mjs; Result: pass. Command: agentplane doctor; Result: pass with info-only runtime findings.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-21T06:35:30.399Z, excerpt_hash=sha256:01b8374511f201deedade6def46d5a4120ce9b4e7e55862c0744cb22d97a2cf0

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605210633-3ZGMA1-readme-cli-drift/.agentplane/tasks/202605210633-3ZGMA1/blueprint/resolved-snapshot.json
- old_digest: 7845963ecc4ace1ba2b90cb5fd5a04f7b732be38f730967707f3d635e108c15b
- current_digest: 7845963ecc4ace1ba2b90cb5fd5a04f7b732be38f730967707f3d635e108c15b
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605210633-3ZGMA1

### 2026-05-21T06:37:00.853Z — VERIFY — ok

By: EVALUATOR

Note: Independent quality gate pass: diff is limited to README.md plus task artifacts, stale README runner/trace examples are removed, package README had no matching stale surface, and required docs checks passed. Residual gap: broader docs still contain historical run/trace pages, outside this README-scoped task.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-21T06:36:46.535Z, excerpt_hash=sha256:01b8374511f201deedade6def46d5a4120ce9b4e7e55862c0744cb22d97a2cf0

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605210633-3ZGMA1-readme-cli-drift/.agentplane/tasks/202605210633-3ZGMA1/blueprint/resolved-snapshot.json
- old_digest: 7845963ecc4ace1ba2b90cb5fd5a04f7b732be38f730967707f3d635e108c15b
- current_digest: 7845963ecc4ace1ba2b90cb5fd5a04f7b732be38f730967707f3d635e108c15b
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605210633-3ZGMA1

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

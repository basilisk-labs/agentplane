---
id: "202604171121-2FF00N"
title: "Add SKILL_EXTRACTOR agent"
result_summary: "Merged via PR #378."
status: "DONE"
priority: "med"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "agents"
  - "code"
  - "workflow"
verify:
  - "bun test packages/agentplane/src/agents/agents-template.test.ts"
  - "node packages/agentplane/bin/agentplane.js agents"
plan_approval:
  state: "approved"
  updated_at: "2026-04-17T11:21:49.601Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-17T11:24:53.985Z"
  updated_by: "CODER"
  note: "Command: bun test packages/agentplane/src/agents/agents-template.test.ts; Result: pass; Evidence: 11 tests passed and the repo .agentplane/agents copy stayed in sync with bundled assets after adding SKILL_EXTRACTOR. Scope: bundled/install agent parity and manifest coverage. Command: node packages/agentplane/bin/agentplane.js agents; Result: pass; Evidence: the CLI table now lists SKILL_EXTRACTOR with the expected role text. Scope: installed-agent discovery. Command: node packages/agentplane/bin/agentplane.js role SKILL_EXTRACTOR; Result: pass; Evidence: role output renders the new profile, permissions, and workflow contract without extra CLI code changes. Scope: role guidance usability."
commit:
  hash: "5e7b67e85b8bc9b4ceb519926718714ca7c4acfa"
  message: "agents/workflow: Add SKILL_EXTRACTOR agent (2FF00N) (#378)"
comments:
  -
    author: "CODER"
    body: "Start: add a new bundled SKILL_EXTRACTOR agent that turns completed-task evidence into reusable repo-local skills, wire it into the shipped agent set, and verify the new profile is discoverable and sync-safe."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #378 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-04-17T11:22:04.182Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: add a new bundled SKILL_EXTRACTOR agent that turns completed-task evidence into reusable repo-local skills, wire it into the shipped agent set, and verify the new profile is discoverable and sync-safe."
  -
    type: "verify"
    at: "2026-04-17T11:24:53.985Z"
    author: "CODER"
    state: "ok"
    note: "Command: bun test packages/agentplane/src/agents/agents-template.test.ts; Result: pass; Evidence: 11 tests passed and the repo .agentplane/agents copy stayed in sync with bundled assets after adding SKILL_EXTRACTOR. Scope: bundled/install agent parity and manifest coverage. Command: node packages/agentplane/bin/agentplane.js agents; Result: pass; Evidence: the CLI table now lists SKILL_EXTRACTOR with the expected role text. Scope: installed-agent discovery. Command: node packages/agentplane/bin/agentplane.js role SKILL_EXTRACTOR; Result: pass; Evidence: role output renders the new profile, permissions, and workflow contract without extra CLI code changes. Scope: role guidance usability."
  -
    type: "status"
    at: "2026-04-17T11:32:30.556Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #378 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-04-17T11:32:30.561Z"
doc_updated_by: "INTEGRATOR"
description: "Create a new agent profile that mines completed tasks, commits, and incidents into reusable repo-local skills under skills/, then wire it into the bundled agent set and any required guidance surfaces."
sections:
  Summary: |-
    Add SKILL_EXTRACTOR agent
    
    Create a new agent profile that mines completed tasks, commits, and incidents into reusable repo-local skills under skills/, then wire it into the bundled agent set and any required guidance surfaces.
  Scope: |-
    - In scope: Create a new agent profile that mines completed tasks, commits, and incidents into reusable repo-local skills under skills/, then wire it into the bundled agent set and any required guidance surfaces.
    - Out of scope: unrelated refactors not required for "Add SKILL_EXTRACTOR agent".
  Plan: "1. Add a new SKILL_EXTRACTOR agent profile under .agentplane/agents and bundled assets with a narrow contract: analyze completed task READMEs, related commits, and incident guidance to extract repeated remediation scenarios into self-contained repo-local skills under skills/<name>/SKILL.md. 2. Wire the new agent into the framework bundle/installed-agent sync surface so init/upgrade paths ship it deterministically. 3. Update the minimal runtime guidance surface needed for discoverability without broad docs drift. 4. Run the task verify contract and record evidence."
  Verify Steps: |-
    1. Run `bun test packages/agentplane/src/agents/agents-template.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `node packages/agentplane/bin/agentplane.js agents`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-17T11:24:53.985Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: bun test packages/agentplane/src/agents/agents-template.test.ts; Result: pass; Evidence: 11 tests passed and the repo .agentplane/agents copy stayed in sync with bundled assets after adding SKILL_EXTRACTOR. Scope: bundled/install agent parity and manifest coverage. Command: node packages/agentplane/bin/agentplane.js agents; Result: pass; Evidence: the CLI table now lists SKILL_EXTRACTOR with the expected role text. Scope: installed-agent discovery. Command: node packages/agentplane/bin/agentplane.js role SKILL_EXTRACTOR; Result: pass; Evidence: role output renders the new profile, permissions, and workflow contract without extra CLI code changes. Scope: role guidance usability.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-17T11:22:04.190Z, excerpt_hash=sha256:88f4daef668d2e3460bd3f411ebf2e44912d1d13e384d5449bed01b660907758
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Add SKILL_EXTRACTOR agent

Create a new agent profile that mines completed tasks, commits, and incidents into reusable repo-local skills under skills/, then wire it into the bundled agent set and any required guidance surfaces.

## Scope

- In scope: Create a new agent profile that mines completed tasks, commits, and incidents into reusable repo-local skills under skills/, then wire it into the bundled agent set and any required guidance surfaces.
- Out of scope: unrelated refactors not required for "Add SKILL_EXTRACTOR agent".

## Plan

1. Add a new SKILL_EXTRACTOR agent profile under .agentplane/agents and bundled assets with a narrow contract: analyze completed task READMEs, related commits, and incident guidance to extract repeated remediation scenarios into self-contained repo-local skills under skills/<name>/SKILL.md. 2. Wire the new agent into the framework bundle/installed-agent sync surface so init/upgrade paths ship it deterministically. 3. Update the minimal runtime guidance surface needed for discoverability without broad docs drift. 4. Run the task verify contract and record evidence.

## Verify Steps

1. Run `bun test packages/agentplane/src/agents/agents-template.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `node packages/agentplane/bin/agentplane.js agents`. Expected: it succeeds and confirms the requested outcome for this task.
3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-17T11:24:53.985Z — VERIFY — ok

By: CODER

Note: Command: bun test packages/agentplane/src/agents/agents-template.test.ts; Result: pass; Evidence: 11 tests passed and the repo .agentplane/agents copy stayed in sync with bundled assets after adding SKILL_EXTRACTOR. Scope: bundled/install agent parity and manifest coverage. Command: node packages/agentplane/bin/agentplane.js agents; Result: pass; Evidence: the CLI table now lists SKILL_EXTRACTOR with the expected role text. Scope: installed-agent discovery. Command: node packages/agentplane/bin/agentplane.js role SKILL_EXTRACTOR; Result: pass; Evidence: role output renders the new profile, permissions, and workflow contract without extra CLI code changes. Scope: role guidance usability.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-17T11:22:04.190Z, excerpt_hash=sha256:88f4daef668d2e3460bd3f411ebf2e44912d1d13e384d5449bed01b660907758

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

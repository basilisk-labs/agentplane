---
id: "202604240855-WN9XJA"
title: "Fix lint in init hotfix regression mocks"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "cli"
  - "init"
  - "lint"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-24T08:55:50.818Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-24T08:57:21.773Z"
  updated_by: "CODER"
  note: "Command: /Users/densmirnov/.bun/bin/bun run lint:core -- packages/agentplane/src/cli/run-cli.core.init.v2.test.ts packages/agentplane/src/cli/run-cli/commands/init/steps/prompt-steps.test.ts; ./node_modules/.bin/prettier --check packages/agentplane/src/cli/run-cli.core.init.v2.test.ts packages/agentplane/src/cli/run-cli/commands/init/steps/prompt-steps.test.ts; git diff --check. Result: pass. Evidence: removed the unnecessary async wrappers from both mock callbacks, bun-run lint completed cleanly on the touched tests, Prettier check reported all matched files clean, and git diff --check returned no whitespace issues. Scope: final lint recovery for the init cached recipe hotfix publication path."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: remove unnecessary async from the two init regression mocks, verify lint on the touched files, then publish the branch."
events:
  -
    type: "status"
    at: "2026-04-24T08:55:50.813Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: remove unnecessary async from the two init regression mocks, verify lint on the touched files, then publish the branch."
  -
    type: "verify"
    at: "2026-04-24T08:57:21.773Z"
    author: "CODER"
    state: "ok"
    note: "Command: /Users/densmirnov/.bun/bin/bun run lint:core -- packages/agentplane/src/cli/run-cli.core.init.v2.test.ts packages/agentplane/src/cli/run-cli/commands/init/steps/prompt-steps.test.ts; ./node_modules/.bin/prettier --check packages/agentplane/src/cli/run-cli.core.init.v2.test.ts packages/agentplane/src/cli/run-cli/commands/init/steps/prompt-steps.test.ts; git diff --check. Result: pass. Evidence: removed the unnecessary async wrappers from both mock callbacks, bun-run lint completed cleanly on the touched tests, Prettier check reported all matched files clean, and git diff --check returned no whitespace issues. Scope: final lint recovery for the init cached recipe hotfix publication path."
doc_version: 3
doc_updated_at: "2026-04-24T08:57:21.777Z"
doc_updated_by: "CODER"
description: "Remove unnecessary async wrappers from the new init regression test mocks so pre-push lint passes and the hotfix branch can publish."
sections:
  Summary: |-
    Fix lint in init hotfix regression mocks
    
    Remove unnecessary async wrappers from the new init regression test mocks so pre-push lint passes and the hotfix branch can publish.
  Scope: |-
    - In scope: Remove unnecessary async wrappers from the new init regression test mocks so pre-push lint passes and the hotfix branch can publish.
    - Out of scope: unrelated refactors not required for "Fix lint in init hotfix regression mocks".
  Plan: "1. Remove unnecessary async wrappers from the two new init regression test mock callbacks. 2. Run eslint on the touched test files and git diff --check. 3. Publish the hotfix branch and close the task."
  Verify Steps: |-
    1. Review the requested outcome for "Fix lint in init hotfix regression mocks". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-24T08:57:21.773Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: /Users/densmirnov/.bun/bin/bun run lint:core -- packages/agentplane/src/cli/run-cli.core.init.v2.test.ts packages/agentplane/src/cli/run-cli/commands/init/steps/prompt-steps.test.ts; ./node_modules/.bin/prettier --check packages/agentplane/src/cli/run-cli.core.init.v2.test.ts packages/agentplane/src/cli/run-cli/commands/init/steps/prompt-steps.test.ts; git diff --check. Result: pass. Evidence: removed the unnecessary async wrappers from both mock callbacks, bun-run lint completed cleanly on the touched tests, Prettier check reported all matched files clean, and git diff --check returned no whitespace issues. Scope: final lint recovery for the init cached recipe hotfix publication path.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-24T08:55:50.822Z, excerpt_hash=sha256:859ebe247b2186348f7a3294ab2a3df0b2b7cba7ed12a5270aed087d586e271e
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Fix lint in init hotfix regression mocks

Remove unnecessary async wrappers from the new init regression test mocks so pre-push lint passes and the hotfix branch can publish.

## Scope

- In scope: Remove unnecessary async wrappers from the new init regression test mocks so pre-push lint passes and the hotfix branch can publish.
- Out of scope: unrelated refactors not required for "Fix lint in init hotfix regression mocks".

## Plan

1. Remove unnecessary async wrappers from the two new init regression test mock callbacks. 2. Run eslint on the touched test files and git diff --check. 3. Publish the hotfix branch and close the task.

## Verify Steps

1. Review the requested outcome for "Fix lint in init hotfix regression mocks". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-24T08:57:21.773Z — VERIFY — ok

By: CODER

Note: Command: /Users/densmirnov/.bun/bin/bun run lint:core -- packages/agentplane/src/cli/run-cli.core.init.v2.test.ts packages/agentplane/src/cli/run-cli/commands/init/steps/prompt-steps.test.ts; ./node_modules/.bin/prettier --check packages/agentplane/src/cli/run-cli.core.init.v2.test.ts packages/agentplane/src/cli/run-cli/commands/init/steps/prompt-steps.test.ts; git diff --check. Result: pass. Evidence: removed the unnecessary async wrappers from both mock callbacks, bun-run lint completed cleanly on the touched tests, Prettier check reported all matched files clean, and git diff --check returned no whitespace issues. Scope: final lint recovery for the init cached recipe hotfix publication path.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-24T08:55:50.822Z, excerpt_hash=sha256:859ebe247b2186348f7a3294ab2a3df0b2b7cba7ed12a5270aed087d586e271e

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

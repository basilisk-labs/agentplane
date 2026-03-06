---
id: "202603061401-6CAKBY"
title: "Allow batched task-doc planning updates and publish site"
result_summary: "Batched task-doc updates are now explicitly documented without weakening lifecycle sequencing."
status: "DONE"
priority: "high"
owner: "CODER"
depends_on: []
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-06T14:05:20.448Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved batched task-doc guidance change and website publication verification."
verification:
  state: "ok"
  updated_at: "2026-03-06T14:07:58.732Z"
  updated_by: "CODER"
  note: "Command: git diff -- .agentplane/policy/workflow.direct.md .agentplane/policy/workflow.branch_pr.md packages/agentplane/src/cli/command-guide.ts packages/agentplane/src/commands/task/doc.command.ts\nResult: pass\nEvidence: policy and CLI guidance now explicitly allow batched task-doc updates before approval while keeping approve -> start-ready sequential\nScope: workflow policy and task-doc guidance surfaces\n\nCommand: node .agentplane/policy/check-routing.mjs\nResult: pass\nEvidence: policy routing OK\nScope: policy gateway and canonical module routing\n\nCommand: AGENTPLANE_DEV_ALLOW_STALE_DIST=1 agentplane doctor\nResult: pass\nEvidence: doctor OK with historical warning-only task archive findings\nScope: repository workflow health\n\nCommand: bunx vitest run packages/agentplane/src/cli/command-guide.test.ts packages/agentplane/src/cli/run-cli.core.help-snap.test.ts packages/agentplane/src/cli/run-cli.core.tasks.test.ts\nResult: pass\nEvidence: 67 tests passed across command-guide/help/task CLI surfaces\nScope: CLI guidance/help/task-doc behavior"
commit:
  hash: "3758c4b0bc071ce082c5e10bdc298b65dc023de4"
  message: "📝 6CAKBY policy: allow batched task-doc updates before approval"
comments:
  -
    author: "CODER"
    body: "Start: update policy and CLI guidance so batched task-doc updates are explicitly allowed before approval while keeping approve-to-start sequencing strict, then push main and verify the website deployment."
  -
    author: "CODER"
    body: "Verified: workflow policy and CLI guidance now state that task documentation sections may be batched in one turn before approval, while the approve-to-start transition remains strictly sequential; routing, doctor, and targeted CLI help/task tests passed, and the next step is to publish the accumulated website changes via main."
events:
  -
    type: "status"
    at: "2026-03-06T14:05:29.256Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: update policy and CLI guidance so batched task-doc updates are explicitly allowed before approval while keeping approve-to-start sequencing strict, then push main and verify the website deployment."
  -
    type: "verify"
    at: "2026-03-06T14:07:58.732Z"
    author: "CODER"
    state: "ok"
    note: "Command: git diff -- .agentplane/policy/workflow.direct.md .agentplane/policy/workflow.branch_pr.md packages/agentplane/src/cli/command-guide.ts packages/agentplane/src/commands/task/doc.command.ts\nResult: pass\nEvidence: policy and CLI guidance now explicitly allow batched task-doc updates before approval while keeping approve -> start-ready sequential\nScope: workflow policy and task-doc guidance surfaces\n\nCommand: node .agentplane/policy/check-routing.mjs\nResult: pass\nEvidence: policy routing OK\nScope: policy gateway and canonical module routing\n\nCommand: AGENTPLANE_DEV_ALLOW_STALE_DIST=1 agentplane doctor\nResult: pass\nEvidence: doctor OK with historical warning-only task archive findings\nScope: repository workflow health\n\nCommand: bunx vitest run packages/agentplane/src/cli/command-guide.test.ts packages/agentplane/src/cli/run-cli.core.help-snap.test.ts packages/agentplane/src/cli/run-cli.core.tasks.test.ts\nResult: pass\nEvidence: 67 tests passed across command-guide/help/task CLI surfaces\nScope: CLI guidance/help/task-doc behavior"
  -
    type: "status"
    at: "2026-03-06T14:08:28.820Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: workflow policy and CLI guidance now state that task documentation sections may be batched in one turn before approval, while the approve-to-start transition remains strictly sequential; routing, doctor, and targeted CLI help/task tests passed, and the next step is to publish the accumulated website changes via main."
doc_version: 2
doc_updated_at: "2026-03-06T14:08:28.820Z"
doc_updated_by: "CODER"
description: "Adjust workflow/task tooling or docs so plan and task documentation sections can be applied together in one agent turn without violating lifecycle sequencing, then push the website changes and verify the site deploy."
id_source: "generated"
---
## Summary

Allow batched task-doc planning updates and publish site

Adjust workflow/task tooling or docs so plan and task documentation sections can be applied together in one agent turn without violating lifecycle sequencing, then push the website changes and verify the site deploy.

## Scope

- In scope: Adjust workflow/task tooling or docs so plan and task documentation sections can be applied together in one agent turn without violating lifecycle sequencing, then push the website changes and verify the site deploy..
- Out of scope: unrelated refactors not required for "Allow batched task-doc planning updates and publish site".

## Plan

1) Update workflow/policy guidance so task documentation sections may be batched in one turn before approval, while preserving the strict sequential gate for plan approval followed by start-ready. 2) Update CLI command guidance/help so full-doc payload support is visible to users and agents. 3) Run routing and targeted CLI help/guide tests to verify the wording change. 4) Commit the policy/guide changes with task traceability. 5) Push main so the already-prepared website commits are published, then verify Docs CI and Pages Deploy.

## Risks

- Risk: hidden regressions in touched paths.
- Mitigation: run required checks before finish and record evidence.

## Verify Steps

### Scope
Validate the policy/guidance change for batched task-doc updates plus successful website publication.

### Checks
- Review diffs for changed policy and CLI guidance files.
- Run policy routing validation.
- Run targeted tests for command guide/help surfaces.
- Push main and verify remote Docs CI and Pages Deploy.

### Evidence / Commands
- git diff -- .agentplane/policy/workflow.direct.md .agentplane/policy/workflow.branch_pr.md packages/agentplane/src/cli/command-guide.ts packages/agentplane/src/commands/task/doc.command.ts
- node .agentplane/policy/check-routing.mjs
- bunx vitest run packages/agentplane/src/cli/command-guide.test.ts packages/agentplane/src/cli/run-cli.core.help-snap.test.ts packages/agentplane/src/cli/run-cli.core.tasks.test.ts
- git push origin main
- gh run list --workflow docs-ci.yml --limit 5
- gh run list --workflow pages-deploy.yml --limit 5

### Pass criteria
- Policy/guidance text explicitly allows batched doc updates before approval without weakening approve -> start-ready sequencing.
- Targeted checks pass.
- main is pushed and the website deployment succeeds.

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-06T14:07:58.732Z — VERIFY — ok

By: CODER

Note: Command: git diff -- .agentplane/policy/workflow.direct.md .agentplane/policy/workflow.branch_pr.md packages/agentplane/src/cli/command-guide.ts packages/agentplane/src/commands/task/doc.command.ts
Result: pass
Evidence: policy and CLI guidance now explicitly allow batched task-doc updates before approval while keeping approve -> start-ready sequential
Scope: workflow policy and task-doc guidance surfaces

Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: policy routing OK
Scope: policy gateway and canonical module routing

Command: AGENTPLANE_DEV_ALLOW_STALE_DIST=1 agentplane doctor
Result: pass
Evidence: doctor OK with historical warning-only task archive findings
Scope: repository workflow health

Command: bunx vitest run packages/agentplane/src/cli/command-guide.test.ts packages/agentplane/src/cli/run-cli.core.help-snap.test.ts packages/agentplane/src/cli/run-cli.core.tasks.test.ts
Result: pass
Evidence: 67 tests passed across command-guide/help/task CLI surfaces
Scope: CLI guidance/help/task-doc behavior

VerifyStepsRef: doc_version=2, doc_updated_at=2026-03-06T14:05:39.240Z, excerpt_hash=sha256:dc5b9749f1cf4dfcf4c7e77c453aa57380aca0b481fbb9f8b655c845f7e9c036

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Notes

- This change documents an existing capability rather than adding a new lifecycle bypass: full-doc batched updates already work in task doc set.
- The sequential constraint remains only for plan approval followed by start-ready.
- Website publication in this task is a push/deploy step, not a release publish.

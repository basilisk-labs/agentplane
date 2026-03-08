---
id: "202603051138-HAXWZV"
title: "Relocate WORKFLOW.md into .agentplane"
result_summary: "Workflow contract relocated to .agentplane with legacy migration handling"
risk_level: "low"
status: "DONE"
priority: "high"
owner: "CODER"
depends_on: []
tags:
  - "code"
verify: []
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-05T11:46:03.840Z"
  updated_by: "CODER"
  note: "Workflow path relocation validated"
commit:
  hash: "a17de0fad2b76d752bf369e360aa5a1f3be3a61e"
  message: "🚧 HAXWZV workflow: relocate contract path to .agentplane"
comments:
  -
    author: "CODER"
    body: "Start: relocate active workflow contract to .agentplane/WORKFLOW.md, add root-file migration behavior, and update tests/docs for the new canonical path."
  -
    author: "CODER"
    body: "Verified: workflow contract is now anchored at .agentplane/WORKFLOW.md, runtime supports legacy root fallback for reads plus migration cleanup on publish/restore/fix, and affected tests/docs were updated to the new canonical location."
events:
  -
    type: "status"
    at: "2026-03-05T11:38:57.432Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: relocate active workflow contract to .agentplane/WORKFLOW.md, add root-file migration behavior, and update tests/docs for the new canonical path."
  -
    type: "verify"
    at: "2026-03-05T11:46:03.840Z"
    author: "CODER"
    state: "ok"
    note: "Workflow path relocation validated"
  -
    type: "status"
    at: "2026-03-05T11:46:10.892Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: workflow contract is now anchored at .agentplane/WORKFLOW.md, runtime supports legacy root fallback for reads plus migration cleanup on publish/restore/fix, and affected tests/docs were updated to the new canonical location."
doc_version: 3
doc_updated_at: "2026-03-05T11:46:10.892Z"
doc_updated_by: "CODER"
description: "Move active workflow contract path from repository root to .agentplane/WORKFLOW.md and update runtime/docs/tests accordingly."
id_source: "generated"
---
## Summary


## Scope


## Plan


## Verify Steps

### Scope\n- Primary tag: code\n\n### Checks\n- bun run test:fast -- packages/agentplane/src/workflow-runtime/file-ops.test.ts packages/agentplane/src/commands/doctor.command.test.ts packages/agentplane/src/cli/run-cli.core.branch-meta.test.ts\n- bun run lint:core\n- bun run typecheck\n\n### Evidence / Commands\n- Record command outputs in task verification details.\n\n### Pass criteria\n- Active workflow path is .agentplane/WORKFLOW.md and legacy root WORKFLOW.md is migrated/handled safely.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-05T11:46:03.840Z — VERIFY — ok

By: CODER

Note: Workflow path relocation validated

VerifyStepsRef: doc_version=2, doc_updated_at=2026-03-05T11:38:57.432Z, excerpt_hash=sha256:0cb7327b59f524784e390459ee9f65ec71967e9efbf0e3d7e0d38ece22694f6a

Details:

Updated workflow runtime path resolution to .agentplane/WORKFLOW.md with legacy root fallback/migration on publish/restore/doctor fix. Updated init/doctor/cli tests and docs references. Validation: bunx vitest run packages/agentplane/src/workflow-runtime/file-ops.test.ts packages/agentplane/src/commands/doctor.command.test.ts packages/agentplane/src/cli/run-cli.core.branch-meta.test.ts --hookTimeout 60000 --testTimeout 60000; bun run lint:core; bun run typecheck.

<!-- END VERIFICATION RESULTS -->

## Rollback Plan


## Findings


## Risks

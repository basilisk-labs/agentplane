---
id: "202604192112-QG4ZEB"
title: "Regenerate stale CLI reference after command surface changes"
result_summary: "CLI reference is regenerated from the current built command surface, so docs freshness no longer blocks epic push"
status: "DONE"
priority: "med"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "docs"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-19T21:12:33.816Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-19T21:12:57.617Z"
  updated_by: "CODER"
  note: "Verified: agentplane docs cli regenerated docs/user/cli-reference.generated.mdx and bun run docs:cli:check now passes."
commit:
  hash: "00d46fb3c84968339c25d8622ecb0a23d121e8ef"
  message: "📝 QG4ZEB task: regenerate stale CLI reference"
comments:
  -
    author: "CODER"
    body: "Start: regenerate the stale CLI reference so pre-push docs freshness passes after recent command-surface changes."
  -
    author: "CODER"
    body: "Verified: agentplane docs cli regenerated docs/user/cli-reference.generated.mdx and bun run docs:cli:check now passes."
events:
  -
    type: "status"
    at: "2026-04-19T21:12:34.260Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: regenerate the stale CLI reference so pre-push docs freshness passes after recent command-surface changes."
  -
    type: "verify"
    at: "2026-04-19T21:12:57.617Z"
    author: "CODER"
    state: "ok"
    note: "Verified: agentplane docs cli regenerated docs/user/cli-reference.generated.mdx and bun run docs:cli:check now passes."
  -
    type: "status"
    at: "2026-04-19T21:13:06.062Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: agentplane docs cli regenerated docs/user/cli-reference.generated.mdx and bun run docs:cli:check now passes."
doc_version: 3
doc_updated_at: "2026-04-19T21:13:06.062Z"
doc_updated_by: "CODER"
description: "Pre-push ci:local:fast fails on docs:cli:check because docs/user/cli-reference.generated.mdx is stale relative to the current built CLI after recent init and guard command changes. Regenerate the CLI reference from the built CLI, verify docs freshness, and unblock epic push."
sections:
  Summary: |-
    Regenerate stale CLI reference after command surface changes
    
    Pre-push ci:local:fast fails on docs:cli:check because docs/user/cli-reference.generated.mdx is stale relative to the current built CLI after recent init and guard command changes. Regenerate the CLI reference from the built CLI, verify docs freshness, and unblock epic push.
  Scope: |-
    - In scope: Pre-push ci:local:fast fails on docs:cli:check because docs/user/cli-reference.generated.mdx is stale relative to the current built CLI after recent init and guard command changes. Regenerate the CLI reference from the built CLI, verify docs freshness, and unblock epic push.
    - Out of scope: unrelated refactors not required for "Regenerate stale CLI reference after command surface changes".
  Plan: "1. Rebuild or reuse the current CLI artifact and regenerate docs/user/cli-reference.generated.mdx from the canonical command. 2. Check the generated diff stays limited to CLI reference freshness. 3. Verify docs:cli:check passes, then commit and close the task to unblock epic push."
  Verify Steps: |-
    1. Review the requested outcome for "Regenerate stale CLI reference after command surface changes". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-19T21:12:57.617Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified: agentplane docs cli regenerated docs/user/cli-reference.generated.mdx and bun run docs:cli:check now passes.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-19T21:12:34.265Z, excerpt_hash=sha256:9c3abc7a86ab3eacb6c99d80e9bf4cb4fd40451c3ac11536026d29289e4348be
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Regenerate stale CLI reference after command surface changes

Pre-push ci:local:fast fails on docs:cli:check because docs/user/cli-reference.generated.mdx is stale relative to the current built CLI after recent init and guard command changes. Regenerate the CLI reference from the built CLI, verify docs freshness, and unblock epic push.

## Scope

- In scope: Pre-push ci:local:fast fails on docs:cli:check because docs/user/cli-reference.generated.mdx is stale relative to the current built CLI after recent init and guard command changes. Regenerate the CLI reference from the built CLI, verify docs freshness, and unblock epic push.
- Out of scope: unrelated refactors not required for "Regenerate stale CLI reference after command surface changes".

## Plan

1. Rebuild or reuse the current CLI artifact and regenerate docs/user/cli-reference.generated.mdx from the canonical command. 2. Check the generated diff stays limited to CLI reference freshness. 3. Verify docs:cli:check passes, then commit and close the task to unblock epic push.

## Verify Steps

1. Review the requested outcome for "Regenerate stale CLI reference after command surface changes". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-19T21:12:57.617Z — VERIFY — ok

By: CODER

Note: Verified: agentplane docs cli regenerated docs/user/cli-reference.generated.mdx and bun run docs:cli:check now passes.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-19T21:12:34.265Z, excerpt_hash=sha256:9c3abc7a86ab3eacb6c99d80e9bf4cb4fd40451c3ac11536026d29289e4348be

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

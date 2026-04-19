---
id: "202604192112-QG4ZEB"
title: "Regenerate stale CLI reference after command surface changes"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 4
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
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments:
  -
    author: "CODER"
    body: "Start: regenerate the stale CLI reference so pre-push docs freshness passes after recent command-surface changes."
events:
  -
    type: "status"
    at: "2026-04-19T21:12:34.260Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: regenerate the stale CLI reference so pre-push docs freshness passes after recent command-surface changes."
doc_version: 3
doc_updated_at: "2026-04-19T21:12:34.265Z"
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
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

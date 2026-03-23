---
id: "202603231959-G1ZKYV"
title: "Refresh generated CLI reference after runner recipe contract changes"
result_summary: "docs: refresh generated CLI reference"
status: "DONE"
priority: "high"
owner: "DOCS"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "docs"
  - "cli"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-23T20:00:06.753Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-23T20:01:10.784Z"
  updated_by: "DOCS"
  note: "Command: bun packages/agentplane/src/cli.ts docs cli --out docs/user/cli-reference.generated.mdx; Result: pass; Evidence: regenerated the canonical CLI reference from the current installed command surface. Scope: docs/user/cli-reference.generated.mdx. Command: bun run docs:cli:check; Result: pass; Evidence: docs freshness check now reports docs/user/cli-reference.generated.mdx is up to date. Scope: pre-push CLI docs freshness gate. Command: node .agentplane/policy/check-routing.mjs; Result: pass; Evidence: policy routing OK. Scope: docs DoD routing gate. Command: AGENTPLANE_DEV_ALLOW_STALE_DIST=1 agentplane doctor; Result: pass; Evidence: doctor returned OK with informational findings only. Scope: runtime/docs consistency gate."
commit:
  hash: "e7e026c8ddc56ddba61ab514427bea5a96e33462"
  message: "✅ G1ZKYV docs: done"
comments:
  -
    author: "DOCS"
    body: "Start: regenerate the canonical CLI reference markdown from the current installed command surface, verify the docs freshness gate and docs DoD checks, and unblock the pending push without changing any other docs scope."
  -
    author: "DOCS"
    body: "Verified: Regenerated the canonical CLI reference markdown from the current installed command surface, passed the docs freshness gate, and rechecked routing plus doctor so the blocked push can proceed without bypassing repository gates."
events:
  -
    type: "status"
    at: "2026-03-23T20:00:36.422Z"
    author: "DOCS"
    from: "TODO"
    to: "DOING"
    note: "Start: regenerate the canonical CLI reference markdown from the current installed command surface, verify the docs freshness gate and docs DoD checks, and unblock the pending push without changing any other docs scope."
  -
    type: "verify"
    at: "2026-03-23T20:01:10.784Z"
    author: "DOCS"
    state: "ok"
    note: "Command: bun packages/agentplane/src/cli.ts docs cli --out docs/user/cli-reference.generated.mdx; Result: pass; Evidence: regenerated the canonical CLI reference from the current installed command surface. Scope: docs/user/cli-reference.generated.mdx. Command: bun run docs:cli:check; Result: pass; Evidence: docs freshness check now reports docs/user/cli-reference.generated.mdx is up to date. Scope: pre-push CLI docs freshness gate. Command: node .agentplane/policy/check-routing.mjs; Result: pass; Evidence: policy routing OK. Scope: docs DoD routing gate. Command: AGENTPLANE_DEV_ALLOW_STALE_DIST=1 agentplane doctor; Result: pass; Evidence: doctor returned OK with informational findings only. Scope: runtime/docs consistency gate."
  -
    type: "status"
    at: "2026-03-23T20:01:35.461Z"
    author: "DOCS"
    from: "DOING"
    to: "DONE"
    note: "Verified: Regenerated the canonical CLI reference markdown from the current installed command surface, passed the docs freshness gate, and rechecked routing plus doctor so the blocked push can proceed without bypassing repository gates."
doc_version: 3
doc_updated_at: "2026-03-23T20:01:35.461Z"
doc_updated_by: "DOCS"
description: "Regenerate the canonical CLI reference markdown so the pre-push docs freshness check matches the current installed command surface and the pending push can pass without bypassing gates."
sections:
  Summary: |-
    Refresh generated CLI reference after runner recipe contract changes
    
    Regenerate the canonical CLI reference markdown so the pre-push docs freshness check matches the current installed command surface and the pending push can pass without bypassing gates.
  Scope: |-
    - In scope: Regenerate the canonical CLI reference markdown so the pre-push docs freshness check matches the current installed command surface and the pending push can pass without bypassing gates.
    - Out of scope: unrelated refactors not required for "Refresh generated CLI reference after runner recipe contract changes".
  Plan: "1. Confirm the docs freshness blocker is only the generated CLI reference. 2. Regenerate docs/user/cli-reference.generated.mdx from the current installed CLI. 3. Run the docs freshness gate plus docs DoD checks. 4. Finish as a docs-only unblocker commit, then retry push."
  Verify Steps: "1. Run bun packages/agentplane/src/cli.ts docs cli --out docs/user/cli-reference.generated.mdx. 2. Run bun run docs:cli:check. 3. Run node .agentplane/policy/check-routing.mjs and AGENTPLANE_DEV_ALLOW_STALE_DIST=1 agentplane doctor. 4. Confirm the task diff contains only the task README and docs/user/cli-reference.generated.mdx."
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    #### 2026-03-23T20:01:10.784Z — VERIFY — ok
    
    By: DOCS
    
    Note: Command: bun packages/agentplane/src/cli.ts docs cli --out docs/user/cli-reference.generated.mdx; Result: pass; Evidence: regenerated the canonical CLI reference from the current installed command surface. Scope: docs/user/cli-reference.generated.mdx. Command: bun run docs:cli:check; Result: pass; Evidence: docs freshness check now reports docs/user/cli-reference.generated.mdx is up to date. Scope: pre-push CLI docs freshness gate. Command: node .agentplane/policy/check-routing.mjs; Result: pass; Evidence: policy routing OK. Scope: docs DoD routing gate. Command: AGENTPLANE_DEV_ALLOW_STALE_DIST=1 agentplane doctor; Result: pass; Evidence: doctor returned OK with informational findings only. Scope: runtime/docs consistency gate.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-23T20:00:36.424Z, excerpt_hash=sha256:2b26b731ec3484d19290eba27bf8b24cddb62d4c4daa2649ae0db05d48ac456e
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Refresh generated CLI reference after runner recipe contract changes

Regenerate the canonical CLI reference markdown so the pre-push docs freshness check matches the current installed command surface and the pending push can pass without bypassing gates.

## Scope

- In scope: Regenerate the canonical CLI reference markdown so the pre-push docs freshness check matches the current installed command surface and the pending push can pass without bypassing gates.
- Out of scope: unrelated refactors not required for "Refresh generated CLI reference after runner recipe contract changes".

## Plan

1. Confirm the docs freshness blocker is only the generated CLI reference. 2. Regenerate docs/user/cli-reference.generated.mdx from the current installed CLI. 3. Run the docs freshness gate plus docs DoD checks. 4. Finish as a docs-only unblocker commit, then retry push.

## Verify Steps

1. Run bun packages/agentplane/src/cli.ts docs cli --out docs/user/cli-reference.generated.mdx. 2. Run bun run docs:cli:check. 3. Run node .agentplane/policy/check-routing.mjs and AGENTPLANE_DEV_ALLOW_STALE_DIST=1 agentplane doctor. 4. Confirm the task diff contains only the task README and docs/user/cli-reference.generated.mdx.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-23T20:01:10.784Z — VERIFY — ok

By: DOCS

Note: Command: bun packages/agentplane/src/cli.ts docs cli --out docs/user/cli-reference.generated.mdx; Result: pass; Evidence: regenerated the canonical CLI reference from the current installed command surface. Scope: docs/user/cli-reference.generated.mdx. Command: bun run docs:cli:check; Result: pass; Evidence: docs freshness check now reports docs/user/cli-reference.generated.mdx is up to date. Scope: pre-push CLI docs freshness gate. Command: node .agentplane/policy/check-routing.mjs; Result: pass; Evidence: policy routing OK. Scope: docs DoD routing gate. Command: AGENTPLANE_DEV_ALLOW_STALE_DIST=1 agentplane doctor; Result: pass; Evidence: doctor returned OK with informational findings only. Scope: runtime/docs consistency gate.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-23T20:00:36.424Z, excerpt_hash=sha256:2b26b731ec3484d19290eba27bf8b24cddb62d4c4daa2649ae0db05d48ac456e

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

---
id: "202603240901-R6SAJD"
title: "Document runner trace layering and language boundary rules"
result_summary: "Runner trace layering and language-boundary rules documented in developer spec and user commands guide."
status: "DONE"
priority: "med"
owner: "DOCS"
revision: 7
origin:
  system: "manual"
depends_on:
  - "202603240901-KT3C1C"
tags:
  - "docs"
  - "runner"
  - "traces"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-24T10:06:32.097Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-24T10:07:25.236Z"
  updated_by: "DOCS"
  note: "Command: node .agentplane/policy/check-routing.mjs; Result: pass; Evidence: policy routing OK. Command: AGENTPLANE_DEV_ALLOW_STALE_DIST=1 agentplane doctor; Result: pass; Evidence: doctor OK with 0 errors and 0 warnings. Scope: docs/developer/recipes-spec.mdx and docs/user/commands.mdx. Links: docs/developer/recipes-spec.mdx, docs/user/commands.mdx."
commit:
  hash: "1c612caa35e3fd383914086d8250cbcdc819a925"
  message: "✅ R6SAJD docs: done"
comments:
  -
    author: "DOCS"
    body: "Start: document runner artifact layering and the rule that raw trace may preserve original assistant output while task-facing runner logs remain English-only."
  -
    author: "DOCS"
    body: "Verified: developer and user docs now describe runner artifact layering, identify raw trace and side artifacts explicitly, and state that task-facing runner logs remain English-only and path-based instead of copying assistant prose."
events:
  -
    type: "status"
    at: "2026-03-24T10:06:33.280Z"
    author: "DOCS"
    from: "TODO"
    to: "DOING"
    note: "Start: document runner artifact layering and the rule that raw trace may preserve original assistant output while task-facing runner logs remain English-only."
  -
    type: "verify"
    at: "2026-03-24T10:07:25.236Z"
    author: "DOCS"
    state: "ok"
    note: "Command: node .agentplane/policy/check-routing.mjs; Result: pass; Evidence: policy routing OK. Command: AGENTPLANE_DEV_ALLOW_STALE_DIST=1 agentplane doctor; Result: pass; Evidence: doctor OK with 0 errors and 0 warnings. Scope: docs/developer/recipes-spec.mdx and docs/user/commands.mdx. Links: docs/developer/recipes-spec.mdx, docs/user/commands.mdx."
  -
    type: "status"
    at: "2026-03-24T10:07:44.335Z"
    author: "DOCS"
    from: "DOING"
    to: "DONE"
    note: "Verified: developer and user docs now describe runner artifact layering, identify raw trace and side artifacts explicitly, and state that task-facing runner logs remain English-only and path-based instead of copying assistant prose."
doc_version: 3
doc_updated_at: "2026-03-24T10:07:44.336Z"
doc_updated_by: "DOCS"
description: "Update docs to describe the distinction between raw runner trace, control artifacts, and task-facing projection, and document that task logs must stay English-only while raw debug trace may preserve original assistant output."
sections:
  Summary: |-
    Document runner trace layering and language boundary rules.
    
    Update docs to describe the distinction between raw runner trace, control artifacts, and task-facing projection, and document that task logs must stay English-only while raw debug trace may preserve original assistant output.
  Scope: |-
    - In scope: document runner artifact layers, the role of agent-trace.jsonl and codex-last-message.md, and the rule that task-facing runner logs must not copy assistant prose.
    - Out of scope: runtime or schema changes and unrelated docs cleanup.
  Plan: "1. Update canonical developer docs for runner artifact layering and the no-projection rule for assistant prose. 2. Update the user-facing commands guide so task run and scenario execute explain where raw trace lives. 3. Run routing and doctor checks and record evidence."
  Verify Steps: |-
    1. Review the updated docs sections. Expected: they explicitly separate raw trace, control artifacts, and task-facing projection.
    2. Run docs verification commands. Expected: routing and doctor checks pass for the changed docs scope.
    3. Check the final wording. Expected: docs state that assistant prose may remain in raw trace artifacts, but task-facing runner logs stay English-only and path-based.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    #### 2026-03-24T10:07:25.236Z — VERIFY — ok
    
    By: DOCS
    
    Note: Command: node .agentplane/policy/check-routing.mjs; Result: pass; Evidence: policy routing OK. Command: AGENTPLANE_DEV_ALLOW_STALE_DIST=1 agentplane doctor; Result: pass; Evidence: doctor OK with 0 errors and 0 warnings. Scope: docs/developer/recipes-spec.mdx and docs/user/commands.mdx. Links: docs/developer/recipes-spec.mdx, docs/user/commands.mdx.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-24T10:06:33.282Z, excerpt_hash=sha256:20fd7c4c359742daf6475ce20626871be5bac5aca210aef2aebc906c521ac50a
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert the docs task commit.
    - Re-run docs verification to confirm the previous wording is restored.
  Findings: ""
id_source: "generated"
---
## Summary

Document runner trace layering and language boundary rules.

Update docs to describe the distinction between raw runner trace, control artifacts, and task-facing projection, and document that task logs must stay English-only while raw debug trace may preserve original assistant output.

## Scope

- In scope: document runner artifact layers, the role of agent-trace.jsonl and codex-last-message.md, and the rule that task-facing runner logs must not copy assistant prose.
- Out of scope: runtime or schema changes and unrelated docs cleanup.

## Plan

1. Update canonical developer docs for runner artifact layering and the no-projection rule for assistant prose. 2. Update the user-facing commands guide so task run and scenario execute explain where raw trace lives. 3. Run routing and doctor checks and record evidence.

## Verify Steps

1. Review the updated docs sections. Expected: they explicitly separate raw trace, control artifacts, and task-facing projection.
2. Run docs verification commands. Expected: routing and doctor checks pass for the changed docs scope.
3. Check the final wording. Expected: docs state that assistant prose may remain in raw trace artifacts, but task-facing runner logs stay English-only and path-based.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-24T10:07:25.236Z — VERIFY — ok

By: DOCS

Note: Command: node .agentplane/policy/check-routing.mjs; Result: pass; Evidence: policy routing OK. Command: AGENTPLANE_DEV_ALLOW_STALE_DIST=1 agentplane doctor; Result: pass; Evidence: doctor OK with 0 errors and 0 warnings. Scope: docs/developer/recipes-spec.mdx and docs/user/commands.mdx. Links: docs/developer/recipes-spec.mdx, docs/user/commands.mdx.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-24T10:06:33.282Z, excerpt_hash=sha256:20fd7c4c359742daf6475ce20626871be5bac5aca210aef2aebc906c521ac50a

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert the docs task commit.
- Re-run docs verification to confirm the previous wording is restored.

## Findings

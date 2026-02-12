---
id: "202602121142-W83TH9"
title: "Docs: make generated CLI reference MDX-safe for Mintlify"
result_summary: "Mintlify-safe CLI reference generation restored"
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
  updated_at: "2026-02-12T11:43:52.661Z"
  updated_by: "CODER"
  note: "Verified: docs renderer now escapes angle brackets in prose, regenerated cli-reference contains &lt;name&gt; in descriptive text, docs-cli tests and lint pass."
commit:
  hash: "e583043fcd60061039b8cb399c50ab414c185810"
  message: "✅ W83TH9 docs: make generated CLI reference MDX-safe"
comments:
  -
    author: "CODER"
    body: "Start: fix CLI docs renderer to escape angle brackets in prose for Mintlify-compatible MDX output."
  -
    author: "CODER"
    body: "Verified: generated prose escapes angle brackets so MDX parser no longer interprets placeholders as unclosed tags."
events:
  -
    type: "status"
    at: "2026-02-12T11:42:44.403Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: fix CLI docs renderer to escape angle brackets in prose for Mintlify-compatible MDX output."
  -
    type: "verify"
    at: "2026-02-12T11:43:52.661Z"
    author: "CODER"
    state: "ok"
    note: "Verified: docs renderer now escapes angle brackets in prose, regenerated cli-reference contains &lt;name&gt; in descriptive text, docs-cli tests and lint pass."
  -
    type: "status"
    at: "2026-02-12T11:44:35.690Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: generated prose escapes angle brackets so MDX parser no longer interprets placeholders as unclosed tags."
doc_version: 2
doc_updated_at: "2026-02-12T11:44:35.690Z"
doc_updated_by: "CODER"
description: "Escape angle-bracket placeholders in generated prose (not code spans) so Mintlify parser does not treat them as unclosed tags in cli-reference.generated.mdx."
id_source: "generated"
---
## Summary


## Scope


## Plan


## Risks


## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-12T11:43:52.661Z — VERIFY — ok

By: CODER

Note: Verified: docs renderer now escapes angle brackets in prose, regenerated cli-reference contains &lt;name&gt; in descriptive text, docs-cli tests and lint pass.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-02-12T11:42:44.403Z, excerpt_hash=sha256:d7488bf9a36fa12145f837fbafdd344e10c1a7a2da30dc16a37accfc836021b3

<!-- END VERIFICATION RESULTS -->

## Rollback Plan


## Verify Steps

1. node packages/agentplane/bin/agentplane.js docs cli --out docs/user/cli-reference.generated.mdx
2. Verify problematic option text uses escaped placeholders in prose (branch base set --current description)
3. bunx prettier --write docs/user/cli-reference.generated.mdx
4. bun run lint

---
id: "202602121056-H02WKT"
title: "Dev UX: warn when global agentplane binary is used inside repo"
result_summary: "dev checkout now warns on global binary mismatch"
risk_level: "low"
status: "DONE"
priority: "med"
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
  updated_at: "2026-02-12T10:57:49.597Z"
  updated_by: "CODER"
  note: "Verified: repository bin now warns when a non-local agentplane binary is invoked from repo root context; local bin path remains unchanged; lint passes."
commit:
  hash: "6c5c4babaa5d41e9e12dce00076e2d9ce6239db6"
  message: "✅ H02WKT cli: warn on global binary inside repo checkout"
comments:
  -
    author: "CODER"
    body: "Verified: added global-binary-in-repo warning path in bin bootstrap without changing regular local execution."
events:
  -
    type: "verify"
    at: "2026-02-12T10:57:49.597Z"
    author: "CODER"
    state: "ok"
    note: "Verified: repository bin now warns when a non-local agentplane binary is invoked from repo root context; local bin path remains unchanged; lint passes."
  -
    type: "status"
    at: "2026-02-12T10:58:20.007Z"
    author: "CODER"
    from: "TODO"
    to: "DONE"
    note: "Verified: added global-binary-in-repo warning path in bin bootstrap without changing regular local execution."
doc_version: 2
doc_updated_at: "2026-02-12T10:58:20.007Z"
doc_updated_by: "CODER"
description: "Add a lightweight warning in dev repository context when command is executed via global installed binary instead of local repo binary, to prevent stale-version confusion."
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
#### 2026-02-12T10:57:49.597Z — VERIFY — ok

By: CODER

Note: Verified: repository bin now warns when a non-local agentplane binary is invoked from repo root context; local bin path remains unchanged; lint passes.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-02-12T10:57:06.130Z, excerpt_hash=sha256:df4a1d22bbbc83db97f28ca0d1a3f70bbc1f6a9b1ddfde86d2d56792c69539e5

<!-- END VERIFICATION RESULTS -->

## Rollback Plan


## Verify Steps

1. node packages/agentplane/bin/agentplane.js --version
2. npm i -g context validation is not required; emulate global path by direct node run and assert warning appears only in repo context
3. bunx vitest run packages/agentplane/src/cli/cli-smoke.test.ts --testTimeout 60000 --hookTimeout 60000
4. bun run lint

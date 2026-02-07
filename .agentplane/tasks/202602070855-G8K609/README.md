---
id: "202602070855-G8K609"
title: "Stable ordering + replace always-write with writeIfChanged"
status: "DONE"
priority: "med"
owner: "CODER"
depends_on:
  - "202602070855-JRBN0P"
tags:
  - "code"
  - "perf"
  - "formatting"
verify:
  - "bun run typecheck"
  - "bun run test:agentplane"
plan_approval:
  state: "approved"
  updated_at: "2026-02-07T12:29:41.004Z"
  updated_by: "USER"
  note: "Approved in chat on 2026-02-07T12:29:41.004Z."
verification:
  state: "ok"
  updated_at: "2026-02-07T12:32:21.519Z"
  updated_by: "CODEX"
  note: "Verified: bun run typecheck; bun run lint; bun run test:agentplane"
commit:
  hash: "9011be7e8306aa6cecffa3e1585eb0ed2b19ddc2"
  message: "✅ G8K609 io: write-if-changed for task README + stable backend.json"
comments:
  -
    author: "ORCHESTRATOR"
    body: "Start: replace unconditional writes with write-if-changed and ensure stable serialization/ordering."
  -
    author: "CODEX"
    body: "Verified: bun run typecheck; bun run lint; bun run test:agentplane. Summary: replace unconditional task README writes with writeTextIfChanged; init backend.json uses canonical stable writer. Implementation: 9011be7e8306."
doc_version: 2
doc_updated_at: "2026-02-07T12:32:26.986Z"
doc_updated_by: "CODEX"
description: "Stabilize ordering in JSON/YAML/README rendering; ensure deterministic task sorting; replace unconditional writes with writeIfChanged across config/meta/cache/export/normalize."
id_source: "explicit"
---
## Summary

Reduce diff-noise by ensuring stable ordering and avoiding unconditional file rewrites when rendered output is unchanged.

## Scope

In scope: switch task README writes in LocalBackend and task scaffold to writeTextIfChanged; use stable JSON writer for backend.json templates; keep output deterministic and avoid mtime churn when content is unchanged.

## Plan

1) Replace unconditional task README writes (LocalBackend writeTask/setTaskDoc/touchTaskDocMetadata and task scaffold) with writeTextIfChanged while keeping atomic writes.\n2) Use writeJsonStableIfChanged for init backend.json templates to canonicalize key order.\n3) Run typecheck, lint, test:agentplane.

## Risks

Risk: changing write behavior could mask bugs if callers rely on mtime changes; Risk: stable ordering changes may create one-time diffs; Risk: must preserve atomic write semantics.

## Verification

- bun run typecheck\n- bun run lint\n- bun run test:agentplane

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-07T12:32:21.519Z — VERIFY — ok

By: CODEX

Note: Verified: bun run typecheck; bun run lint; bun run test:agentplane

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert commits; fallback is unconditional atomic writes (previous behavior).

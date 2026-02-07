---
id: "202601290714-A3RMM3"
title: "AP-032: recipe install by id from remote"
status: "DONE"
priority: "med"
owner: "CODER"
depends_on:
  - "202601290714-ZPPQFE"
tags:
  - "roadmap"
  - "nodejs"
  - "recipes"
verify: []
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit:
  hash: "7f3769272ab04226b3737bcf5f0952eae0ed5985"
  message: "feat: A3RMM3 install by id"
comments:
  -
    author: "CODER"
    body: "Start: add recipe install by id from remote index."
  -
    author: "CODER"
    body: "verified: bun run ci:agentplane (2026-01-29). | details: Scope: recipe install supports ids via cached index."
doc_version: 2
doc_updated_at: "2026-02-03T12:09:17.439Z"
doc_updated_by: "agentplane"
description: "Implement recipe install <id> using remote index (resolve latest compatible version, download, verify sha256, install)."
---
## Summary

Allow recipe install to resolve ids via the cached remote index.

## Scope

- Extend recipe install to accept id and URL sources.\n- Resolve ids via the cached remote index and verify checksums.\n- Add tests for id-based installs using a cached index.

## Risks

- Remote index URLs might not be reachable; install fails without a cached index.\n- Checksums in the index must match archives; mismatches will block installs.

## Verify Steps

- 2026-01-29: bun run ci:agentplane (pass)

## Rollback Plan

- Revert the task commit(s) to restore local-only recipe install.

## Plan


## Verification

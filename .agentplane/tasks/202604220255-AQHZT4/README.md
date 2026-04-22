---
id: "202604220255-AQHZT4"
title: "Cache runner prompt source assembly"
status: "DOING"
priority: "low"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on:
  - "202604220255-XYGAHE"
tags:
  - "cache"
  - "perf"
  - "runner"
verify:
  - "bun run arch:baseline && bun run arch:deps"
  - "bun run ci:local:fast"
  - "bun run knip:check"
  - "git diff --check"
plan_approval:
  state: "approved"
  updated_at: "2026-04-22T02:59:00.408Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-22T05:09:04.222Z"
  updated_by: "CODER"
  note: "Implemented process-local caching for static runner prompt inputs. Verified focused runner prompt tests, arch checks, knip baseline, git diff --check, and ci:local:fast."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: cache static runner prompt source assembly without caching task-specific prompt content."
events:
  -
    type: "status"
    at: "2026-04-22T05:02:22.407Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: cache static runner prompt source assembly without caching task-specific prompt content."
  -
    type: "verify"
    at: "2026-04-22T05:09:04.222Z"
    author: "CODER"
    state: "ok"
    note: "Implemented process-local caching for static runner prompt inputs. Verified focused runner prompt tests, arch checks, knip baseline, git diff --check, and ci:local:fast."
doc_version: 3
doc_updated_at: "2026-04-22T05:09:04.236Z"
doc_updated_by: "CODER"
description: "Avoid repeated scanning/assembly of static runner prompt source files during repeated runner invocations in one process."
sections:
  Summary: "Introduce process-local caching for static runner prompt inputs with invalidation boundaries that preserve tests."
  Scope: "Runner prompt assembly only. Do not cache task-specific prompt content or mutable task state."
  Plan: |-
    1. Identify static prompt sources and current read/scan path.
    2. Add a small cache for static content keyed by source path/config.
    3. Keep task-specific data uncached.
    4. Add tests proving repeated runs reuse static assembly without stale task content.
  Verify Steps: "Run runner prompt tests, runner adapter tests, fast CI."
  Verification: |-
    Pending implementation.
    
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-22T05:09:04.222Z — VERIFY — ok
    
    By: CODER
    
    Note: Implemented process-local caching for static runner prompt inputs. Verified focused runner prompt tests, arch checks, knip baseline, git diff --check, and ci:local:fast.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-22T05:02:22.423Z, excerpt_hash=sha256:0ee1431692a1dc0e12fdd51a7e498b477d833632a8927d5c3fd2c7e0b87ffebb
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: "Remove the cache and restore direct prompt assembly reads."
  Findings: |-
    None yet.
    
    - Observation: Cached bundled agent templates, bundled policy gateway templates, and framework runner prompt assembly; repo-local policy/profile reads use mtime/size validation so changed files are not stale.
      Impact: Repeated runner prompt collection avoids repeated static asset reads while keeping task, command, overlay, and recipe prompt content uncached.
      Resolution: Added regression coverage for repeated static prompt reuse and repo-local prompt cache invalidation.
      Promotion: incident-candidate
      Fixability: external
id_source: "generated"
---
## Summary

Introduce process-local caching for static runner prompt inputs with invalidation boundaries that preserve tests.

## Scope

Runner prompt assembly only. Do not cache task-specific prompt content or mutable task state.

## Plan

1. Identify static prompt sources and current read/scan path.
2. Add a small cache for static content keyed by source path/config.
3. Keep task-specific data uncached.
4. Add tests proving repeated runs reuse static assembly without stale task content.

## Verify Steps

Run runner prompt tests, runner adapter tests, fast CI.

## Verification

Pending implementation.

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-22T05:09:04.222Z — VERIFY — ok

By: CODER

Note: Implemented process-local caching for static runner prompt inputs. Verified focused runner prompt tests, arch checks, knip baseline, git diff --check, and ci:local:fast.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-22T05:02:22.423Z, excerpt_hash=sha256:0ee1431692a1dc0e12fdd51a7e498b477d833632a8927d5c3fd2c7e0b87ffebb

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Remove the cache and restore direct prompt assembly reads.

## Findings

None yet.

- Observation: Cached bundled agent templates, bundled policy gateway templates, and framework runner prompt assembly; repo-local policy/profile reads use mtime/size validation so changed files are not stale.
  Impact: Repeated runner prompt collection avoids repeated static asset reads while keeping task, command, overlay, and recipe prompt content uncached.
  Resolution: Added regression coverage for repeated static prompt reuse and repo-local prompt cache invalidation.
  Promotion: incident-candidate
  Fixability: external

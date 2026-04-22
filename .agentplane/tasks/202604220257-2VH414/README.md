---
id: "202604220257-2VH414"
title: "Run final optimization verification and baseline refresh"
status: "TODO"
priority: "med"
owner: "CODER"
revision: 10
origin:
  system: "manual"
depends_on:
  - "202604220257-F79BSN"
tags:
  - "ci"
  - "release-readiness"
  - "verification"
verify:
  - "bun run arch:baseline && bun run arch:deps"
  - "bun run ci:local:fast"
  - "bun run knip:check"
  - "git diff --check"
plan_approval:
  state: "approved"
  updated_at: "2026-04-22T02:59:13.883Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-04-22T02:58:37.794Z"
doc_updated_by: "PLANNER"
description: "After the optimization/refactor chain lands, run the full guardrail suite and update documented baselines only where backed by measured results."
sections:
  Summary: "Close the optimization roadmap with measured verification across hotspots, dependency cycles, knip, cold-start, and fast CI."
  Scope: "Verification scripts, generated baseline docs/files if needed, and release-readiness notes. No new refactor scope beyond fixing verification regressions from the chain."
  Plan: |-
    1. Run hotspot, dep-cruiser, knip, cold-start, and fast CI checks.
    2. Update baselines only for intentional stricter counts or measured threshold changes.
    3. Record residual risks and next-release follow-ups.
    4. Ensure no unintended tracked changes remain.
  Verify Steps: "Run hotspot report/check, arch checks, knip check, bench cold check, ci:local:fast, git diff --check."
  Verification: "Pending implementation."
  Rollback Plan: "Revert baseline/doc-only updates from this verification task."
  Findings: "None yet."
id_source: "generated"
---
## Summary

Close the optimization roadmap with measured verification across hotspots, dependency cycles, knip, cold-start, and fast CI.

## Scope

Verification scripts, generated baseline docs/files if needed, and release-readiness notes. No new refactor scope beyond fixing verification regressions from the chain.

## Plan

1. Run hotspot, dep-cruiser, knip, cold-start, and fast CI checks.
2. Update baselines only for intentional stricter counts or measured threshold changes.
3. Record residual risks and next-release follow-ups.
4. Ensure no unintended tracked changes remain.

## Verify Steps

Run hotspot report/check, arch checks, knip check, bench cold check, ci:local:fast, git diff --check.

## Verification

Pending implementation.

## Rollback Plan

Revert baseline/doc-only updates from this verification task.

## Findings

None yet.

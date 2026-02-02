---
id: "202601271027-A6D5EF"
title: "AP-011: Export .agentplane/tasks.json + checksum"
status: "DONE"
priority: "high"
owner: "CODER"
depends_on: ["202601271008-63G26Q", "202601270756-KREHV4"]
tags: ["nodejs", "roadmap", "tasks", "export"]
verify: ["bun run ci"]
commit: { hash: "bdc536afb9202d2dcd3e2cfebeed47643ae06448", message: "✨ A6D5EF AP-011: task export (tasks.json + sha256)" }
comments:
  - { author: "CODER", body: "verified: bun run ci passed | details: details: agentplane task export writes .agentplane/tasks.json with sha256 checksum (python-canonical parity) and stable ordering; tests added." }
doc_version: 2
doc_updated_at: "2026-01-27T11:20:39+00:00"
doc_updated_by: "agentctl"
description: "Implement generating .agentplane/tasks.json snapshot with stable canonical JSON ordering and sha256 checksum; add golden tests per spec."
---
## Summary

Implement tasks.json export (.agentplane/tasks.json) with sha256 checksum canonicalization and add CLI command agentplane task export.

## Scope

- Add core tasks export snapshot writer (schema v1 + meta)
- Match Python checksum canonicalization (sha256 over canonical {tasks} JSON)
- Add golden/unit tests (spec example parity)
- Add CLI command: agentplane task export

## Risks

Checksum/canonicalization drift vs spec can break parity; mitigated by hardcoded parity test vs packages/spec/examples/tasks.json.

## Verify Steps

bun run ci

## Rollback Plan

git revert bdc536afb920

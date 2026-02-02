---
id: "202601300958-HRNHRH"
title: "Audit agentctl parity vs Node CLI"
status: "DONE"
priority: "high"
owner: "ORCHESTRATOR"
depends_on: []
tags: ["agentctl", "parity", "audit"]
verify: []
commit: { hash: "4adde64fde4cacfb4ef567e0e3e269fc0436495e", message: "🚧 HRNHRH audit: create parity tasks" }
comments:
  - { author: "ORCHESTRATOR", body: "Start: audit agentctl.py parity against node CLI and list gaps." }
  - { author: "ORCHESTRATOR", body: "Collected agentctl help outputs and created parity implementation tasks: 202601301004-QCQWCN (task subcommands), 202601301004-VWC1C3 (start/block/finish flags), 202601301004-W5KYK7 (workflow/support cmds), 202601301004-B2MTY4 (commit/guard flags)." }
  - { author: "ORCHESTRATOR", body: "verified: HRNHRH audit complete | details: parity tasks created and recorded for implementation." }
doc_version: 2
doc_updated_at: "2026-01-30T10:05:23+00:00"
doc_updated_by: "agentctl"
description: "Compare agentctl.py behavior to Node agentplane CLI, identify gaps, and propose concrete parity tasks with priorities."
---
## Summary

Audited agentctl vs Node CLI command surface and created parity implementation tasks.

## Scope

Compared agentctl help for core/task/workflow commands against Node CLI help; identified missing commands/flags; created follow-up tasks with priorities.

## Risks

Parity list based on CLI help; implementation details may reveal additional gaps during coding.

## Verify Steps

N/A (audit only).

## Rollback Plan

N/A (audit only).

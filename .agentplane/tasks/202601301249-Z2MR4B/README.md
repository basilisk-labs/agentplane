---
id: "202601301249-Z2MR4B"
title: "Audit parity: Python agentctl vs Node.js CLI"
status: "DONE"
priority: "high"
owner: "ORCHESTRATOR"
depends_on: []
tags: ["parity", "audit", "nodejs", "agentctl"]
verify: []
commit: { hash: "dd3c6909140aa0bd96555ceebdec639ddf66c038", message: "✨ Z2MR4B add parity audit reports" }
comments:
  - { author: "ORCHESTRATOR", body: "Start: begin full parity audit of python agentctl + scripts vs node cli." }
  - { author: "ORCHESTRATOR", body: "verified: produced python inventory, parity matrix, and report | details: audit files saved under docs/audits." }
doc_version: 2
doc_updated_at: "2026-01-30T12:50:03+00:00"
doc_updated_by: "agentctl"
description: "Audit Python agentctl + supporting scripts, compare against Node.js CLI, and report gaps + parity plan."
---
## Summary

- Produce a full inventory of Python agentctl + framework scripts.\n- Compare Node.js CLI behavior against the inventory and document gaps.\n- Deliver a parity report with prioritized remediation plan.

## Scope

- Audit Python agentctl CLI and supporting scripts; capture commands, flags, I/O, and side effects.\n- Audit Node.js CLI implementation and map each capability to the Python inventory.\n- Produce a parity report with gaps, risks, and a prioritized work plan.

## Risks

- Missing hidden behaviors or edge cases could understate parity gaps.\n- Output formatting differences might be overlooked without fixtures.

## Verify Steps

- Inventory file exists and covers agentctl subcommands + scripts.\n- Parity matrix references every inventory item with status.\n- Parity report summarizes gaps and priorities.

## Rollback Plan

- Reopen the task and expand the audit if gaps are found after review.\n- Revise the parity plan and re-issue the report.

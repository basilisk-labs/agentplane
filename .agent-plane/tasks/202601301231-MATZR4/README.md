---
id: "202601301231-MATZR4"
title: "Audit parity: Python agentctl vs Node.js CLI"
status: "DOING"
priority: "high"
owner: "ORCHESTRATOR"
depends_on: []
tags: ["parity", "audit", "nodejs", "agentctl"]
comments:
  - { author: "ORCHESTRATOR", body: "Start: begin full parity audit of python agentctl + scripts vs node cli." }
doc_version: 2
doc_updated_at: "2026-01-30T12:32:02+00:00"
doc_updated_by: "agentctl"
description: "Audit Python agentctl + supporting scripts, compare against Node.js CLI, and report gaps + parity plan."
---
## Summary

- Produce a full inventory of Python agentctl + framework scripts.\n- Compare Node.js CLI behavior against the inventory and document gaps.\n- Deliver a parity report with prioritized remediation plan.

## Scope

- Audit Python agentctl CLI and supporting scripts used by the framework; capture commands, flags, I/O, and side effects.\n- Audit Node.js CLI implementation and map each capability to the Python inventory.\n- Produce a parity report with gaps, risks, and a prioritized work plan.

## Risks

- Missing hidden behaviors or edge cases could understate parity gaps.\n- Python/Node differences in output formatting may be overlooked without fixtures.

## Verify Steps

- Audit inventory file exists and covers all agentctl subcommands + scripts.\n- Parity matrix references every inventory item with status.

## Rollback Plan

- Reopen the task and expand the audit if gaps are found after review.\n- Revise the parity plan and re-issue the report.


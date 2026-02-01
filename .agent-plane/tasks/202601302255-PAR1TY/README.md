---
id: "202601302255-PAR1TY"
title: "Audit parity gaps: Python agentctl vs Node CLI"
status: "DOING"
priority: "high"
owner: "ORCHESTRATOR"
depends_on: []
tags: ["parity", "audit", "nodejs", "agentctl"]
doc_version: 2
doc_updated_at: "2026-02-01T13:04:35+00:00"
doc_updated_by: "agentctl"
description: "Review parity audits and summarize remaining gaps for Node CLI vs Python agentctl."
---
## Summary

Updated parity audit docs to reflect quickstart and recipes explain, and clarified CI scope expectations.

## Scope

docs/audits/parity-report.md; docs/audits/nodejs-parity-matrix.md.

## Risks

Audit notes can drift as CLI behavior changes; keep docs aligned with releases.

## Verify Steps

Manual review of parity-report.md and nodejs-parity-matrix.md for accuracy.

## Rollback Plan

Revert the audit doc updates if parity status needs to be restored.


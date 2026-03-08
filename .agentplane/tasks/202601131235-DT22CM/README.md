---
id: "202601131235-DT22CM"
title: "Map agentctl commands by agent and phase"
status: "DONE"
priority: "normal"
owner: "ORCHESTRATOR"
depends_on: []
tags:
  - "agentctl"
  - "agents"
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
  hash: "bc30c58e49fae183e38567424944e97a2e8fe2ab"
  message: "✨ DT22CM map agentctl commands by role and phase"
comments:
  -
    author: "ORCHESTRATOR"
    body: "Verified: Docs-only change; updated agentctl role/phase mapping and task artifact; no runtime impact."
doc_version: 3
doc_updated_at: "2026-02-03T12:08:45.104Z"
doc_updated_by: "agentplane"
description: "Analyze agentctl docs and agent specs to map which agent can use which agentctl commands at each workflow stage, then update agentctl.md so agents can avoid extra help calls."
---
## Summary

Added a role/phase command guide to agentctl.md so agents can map commands to workflow moments.

## Context

Request was to map agentctl commands to agents and workflow phases based on agent specs and CLI docs.

## Scope

Updated only .agent-plane/agentctl.md; no CLI behavior changes.

## Plan


## Verify Steps

None (docs-only).

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert the doc change and task artifacts.

## Findings

Commands listed align with .agent-plane/agents/*.json and current agentctl.md examples.

## Risks

Low; docs could drift if commands change.

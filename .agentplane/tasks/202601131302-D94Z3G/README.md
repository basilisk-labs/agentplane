---
id: "202601131302-D94Z3G"
title: "Add agentctl role command"
status: "DONE"
priority: "normal"
owner: "CODER"
depends_on: []
tags:
  - "agentctl"
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
  hash: "6e20f08a17a9cc114c8f2d43270fe2375623544d"
  message: "✨ D94Z3G add agentctl role command"
comments:
  -
    author: "CODER"
    body: "Verified: Added agentctl role <ROLE> command; updated role headings and docs. Manual check: python .agent-plane/agentctl.py role CODER"
doc_version: 2
doc_updated_at: "2026-02-03T12:08:45.740Z"
doc_updated_by: "agentplane"
description: "Add a CLI command (agentctl role <ROLE>) that prints the role-specific command block from .agent-plane/agentctl.md so agents can see only their guidance."
---
## Summary

Implemented agentctl role <ROLE> to print a single role block from agentctl.md and updated headings for parsing.

## Context

Agents need a quick way to see only their command guidance without scanning the full agentctl.md.

## Scope

Update agentctl.py to add the role command and update agentctl.md headings/usage.

## Risks

Low; parsing errors could hide guidance or print the wrong section.

## Verify Steps

Run: python .agent-plane/agentctl.py role CODER

## Rollback Plan

Revert the command and doc heading changes.

## Notes

Verified locally with: python .agent-plane/agentctl.py role CODER

## Plan


## Verification

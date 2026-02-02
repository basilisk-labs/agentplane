---
id: "202602021556-ASWWV2"
title: "Enable npm trusted publishing in workflow"
status: "DOING"
priority: "high"
owner: "ORCHESTRATOR"
depends_on: []
tags: ["release", "ci"]
verify: []
commit: null
comments:
  - { author: "ORCHESTRATOR", body: "Start: enable OIDC trusted publishing flags in workflow to remove token dependency." }
doc_version: 2
doc_updated_at: "2026-02-02T15:57:02.255Z"
doc_updated_by: "agentplane"
description: "Update publish workflow to use OIDC provenance so npm publish succeeds without tokens."
id_source: "generated"
---
## Summary

## Scope

## Risks

## Verify Steps

## Rollback Plan

## Summary

Enable npm trusted publishing via OIDC provenance in GitHub Actions.

## Scope

Update publish workflow to set NPM_CONFIG_PROVENANCE and use npm publish --provenance.

## Verify Steps

1) GitHub Actions publish workflow succeeds for tag v0.1.1

## Risks

Workflow may still fail if trusted publisher is misconfigured for the tag/branch.

## Rollback Plan

Revert workflow changes and publish manually if needed.

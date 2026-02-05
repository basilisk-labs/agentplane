---
id: "202601270756-779J2V"
title: "AP-003: Fix recipes spec v1 (manifest/schema/commands)"
status: "DONE"
priority: "med"
owner: "CODER"
depends_on: ["202601270755-M1Q50F"]
tags: ["nodejs", "recipes", "spec"]
verify: []
commit: { hash: "eb94fcb00f796dd2837e125e8b1f08cfcd528dce", message: "✨ 779J2V recipes spec: document v1 and add recipe-manifest schema" }
comments:
  - { author: "CODER", body: "Start: writing recipes v1 spec doc and JSON Schema for manifest.json to support offline/local installs and remote catalog." }
  - { author: "CODER", body: "verified: added docs/recipes-spec.md plus schemas/recipe-manifest.schema.json defining v1 recipe archive + manifest contract." }
doc_version: 2
doc_updated_at: "2026-02-03T12:09:02.775Z"
doc_updated_by: "agentplane"
description: "Define v1 recipe archive structure, manifest.json schema, optional lockfile, and public CLI commands for recipe management."
---
## Summary

Define the v1 recipes spec (package format, manifest schema, and CLI surface) so recipes remain optional extensions.

## Scope

- Document archive layout (`manifest.json`, optional `agents/`, `tools/`, `scenarios/`, `assets/`).
- Ship `manifest.json` JSON Schema v1.
- Specify CLI commands and required outputs (`recipe list|info|install|remove|list-remote`, etc.).

## Risks

- Security model is v1-warning-only; make sure spec surfaces permissions explicitly.
- Manifest schema must stay small enough for "context minimization" goals.

## Verify Steps

- Validate a sample `manifest.json` against the schema.
- Confirm the CLI spec is compatible with offline-first constraints.

## Rollback Plan

- Revert the recipe spec docs/schemas and keep recipes as an internal-only concept until M5.

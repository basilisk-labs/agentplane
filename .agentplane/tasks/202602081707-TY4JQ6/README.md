---
id: "202602081707-TY4JQ6"
title: "Docs: rename cli2 terminology to cli/spec"
status: "DOING"
priority: "high"
owner: "ORCHESTRATOR"
depends_on: []
tags:
  - "docs"
  - "cli"
  - "refactor"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-02-08T17:07:52.442Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved by user (2026-02-08)"
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments:
  -
    author: "ORCHESTRATOR"
    body: "Start: updating docs/developer to replace cli2 terminology with spec-driven CLI (cli/spec path) and keeping help JSON contract wording accurate."
events:
  -
    type: "status"
    at: "2026-02-08T17:08:01.457Z"
    author: "ORCHESTRATOR"
    from: "TODO"
    to: "DOING"
    note: "Start: updating docs/developer to replace cli2 terminology with spec-driven CLI (cli/spec path) and keeping help JSON contract wording accurate."
doc_version: 2
doc_updated_at: "2026-02-08T17:08:01.457Z"
doc_updated_by: "ORCHESTRATOR"
description: "Update docs/developer to stop referring to 'cli2' as a separate folder; describe the spec-driven CLI layer as cli/spec and keep the help JSON contract accurate."
id_source: "generated"
---
## Summary

Remove stale "cli2" terminology from developer docs by describing the spec-driven CLI layer as `packages/agentplane/src/cli/spec` and updating the help JSON contract wording accordingly.

## Scope

In scope:
- `docs/developer/*` references to "cli2" when it implies a separate folder/version.
- Update wording to "spec-driven CLI" and reference the current path `packages/agentplane/src/cli/spec`.

Out of scope:
- Code behavior changes.
- Renaming commands/flags.
- Rewriting user docs.

## Plan

Update docs/developer to replace 'cli2' wording with 'spec-driven CLI' and current path packages/agentplane/src/cli/spec; keep help JSON contract accurate.

## Risks

- Some uses of "cli2" may be conceptual (not path-based); avoid breaking meaning by keeping the "spec-driven" distinction explicit.

## Verification


## Rollback Plan

Revert the docs-only commits from this task.

## Verify Steps

Pass criteria:
- `docs/developer/*` no longer implies that `src/cli2` exists.
- The help JSON contract still matches `agentplane help --json` output shape.

Checks to run:
- `rg -n "cli2" docs/developer -S` (should be 0 or only historical notes if explicitly intended)
- `bunx prettier docs/developer/*.mdx --check`

---
id: "202603071710-Y4YT4P"
title: "Layer CLI help surfaces"
result_summary: "Layered CLI help so quickstart stays short while deeper surfaces hold detail."
status: "DONE"
priority: "med"
owner: "DOCS"
depends_on:
  - "202603071710-EKJZW1"
tags:
  - "docs"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-07T19:45:03.650Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-07T19:47:38.919Z"
  updated_by: "DOCS"
  note: "Command: bunx vitest run packages/agentplane/src/cli/command-guide.test.ts packages/agentplane/src/cli/run-cli.core.branch-meta.test.ts; Result: pass; Evidence: 43 targeted CLI tests passed, including the updated quickstart rendering checks. Scope: quickstart rendering and run-cli contract surfaces. Command: bun run lint:core -- packages/agentplane/src/cli/command-guide.ts packages/agentplane/src/cli/command-guide.test.ts packages/agentplane/src/cli/run-cli.core.branch-meta.test.ts; Result: pass; Evidence: eslint clean after shortening the first-screen quickstart and updating role pointers. Scope: touched CLI help source and tests. Command: bun run --filter=agentplane build; Result: pass; Evidence: agentplane build exited with code 0 on the implementation commit. Scope: updated CLI help runtime bundle. Command: agentplane quickstart --json; Result: inferred-pass via targeted run-cli coverage and rebuilt bundle; Evidence: quickstart still exposes bootstrap/init/help lines while the first screen no longer duplicates the full bootstrap structure. Scope: layered CLI help output."
commit:
  hash: "28ca7b120327ce0845e8907781f03f60adf3cd10"
  message: "🧭 Y4YT4P docs: layer CLI help surfaces"
comments:
  -
    author: "DOCS"
    body: "Start: shorten quickstart first-screen output and push deeper details into role/help/reference surfaces."
  -
    author: "DOCS"
    body: "Verified: quickstart is now shorter on the first screen and pushes deeper details into role, help, bootstrap, and reference surfaces."
events:
  -
    type: "status"
    at: "2026-03-07T19:45:10.627Z"
    author: "DOCS"
    from: "TODO"
    to: "DOING"
    note: "Start: shorten quickstart first-screen output and push deeper details into role/help/reference surfaces."
  -
    type: "verify"
    at: "2026-03-07T19:47:38.919Z"
    author: "DOCS"
    state: "ok"
    note: "Command: bunx vitest run packages/agentplane/src/cli/command-guide.test.ts packages/agentplane/src/cli/run-cli.core.branch-meta.test.ts; Result: pass; Evidence: 43 targeted CLI tests passed, including the updated quickstart rendering checks. Scope: quickstart rendering and run-cli contract surfaces. Command: bun run lint:core -- packages/agentplane/src/cli/command-guide.ts packages/agentplane/src/cli/command-guide.test.ts packages/agentplane/src/cli/run-cli.core.branch-meta.test.ts; Result: pass; Evidence: eslint clean after shortening the first-screen quickstart and updating role pointers. Scope: touched CLI help source and tests. Command: bun run --filter=agentplane build; Result: pass; Evidence: agentplane build exited with code 0 on the implementation commit. Scope: updated CLI help runtime bundle. Command: agentplane quickstart --json; Result: inferred-pass via targeted run-cli coverage and rebuilt bundle; Evidence: quickstart still exposes bootstrap/init/help lines while the first screen no longer duplicates the full bootstrap structure. Scope: layered CLI help output."
  -
    type: "status"
    at: "2026-03-07T19:48:09.114Z"
    author: "DOCS"
    from: "DOING"
    to: "DONE"
    note: "Verified: quickstart is now shorter on the first screen and pushes deeper details into role, help, bootstrap, and reference surfaces."
doc_version: 3
doc_updated_at: "2026-03-07T19:48:09.114Z"
doc_updated_by: "DOCS"
description: "Shorten first-screen quickstart/help output and move detailed or exceptional flows into on-demand role and reference surfaces."
id_source: "generated"
---
## Summary

Layer CLI help surfaces

Shorten first-screen quickstart/help output and move detailed or exceptional flows into on-demand role and reference surfaces.

## Scope

- In scope: Shorten first-screen quickstart/help output and move detailed or exceptional flows into on-demand role and reference surfaces..
- Out of scope: unrelated refactors not required for "Layer CLI help surfaces".

## Plan

1. Shorten renderQuickstart() so the first screen contains only the canonical bootstrap pointer, preflight, one minimal direct route, and explicit pointers to deeper role/help/reference surfaces instead of duplicating the full bootstrap doc. 2. Move any detailed or exceptional guidance that no longer belongs on the first screen into role-oriented or on-demand help references, keeping the quickstart narrative layered rather than flat. 3. Update targeted CLI help tests, run the command-guide and run-cli quickstart checks, rebuild agentplane, and verify that the shorter quickstart still points agents to the right deeper surfaces.

## Verify Steps

### Scope
- Primary tag: `docs`

### Checks
1. `bunx vitest run packages/agentplane/src/cli/command-guide.test.ts packages/agentplane/src/cli/run-cli.core.branch-meta.test.ts`
2. `bun run lint:core -- packages/agentplane/src/cli/command-guide.ts packages/agentplane/src/cli/command-guide.test.ts packages/agentplane/src/cli/run-cli.core.branch-meta.test.ts`
3. `bun run --filter=agentplane build`

### Evidence / Commands
- Record whether quickstart became shorter while still pointing to role, help, bootstrap, and reference surfaces.

### Pass criteria
- The first-screen quickstart is shorter than before and no longer restates the full bootstrap structure.
- Detailed and exceptional paths are discoverable through role/help/reference surfaces.
- Targeted CLI tests and build pass.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-07T19:47:38.919Z — VERIFY — ok

By: DOCS

Note: Command: bunx vitest run packages/agentplane/src/cli/command-guide.test.ts packages/agentplane/src/cli/run-cli.core.branch-meta.test.ts; Result: pass; Evidence: 43 targeted CLI tests passed, including the updated quickstart rendering checks. Scope: quickstart rendering and run-cli contract surfaces. Command: bun run lint:core -- packages/agentplane/src/cli/command-guide.ts packages/agentplane/src/cli/command-guide.test.ts packages/agentplane/src/cli/run-cli.core.branch-meta.test.ts; Result: pass; Evidence: eslint clean after shortening the first-screen quickstart and updating role pointers. Scope: touched CLI help source and tests. Command: bun run --filter=agentplane build; Result: pass; Evidence: agentplane build exited with code 0 on the implementation commit. Scope: updated CLI help runtime bundle. Command: agentplane quickstart --json; Result: inferred-pass via targeted run-cli coverage and rebuilt bundle; Evidence: quickstart still exposes bootstrap/init/help lines while the first screen no longer duplicates the full bootstrap structure. Scope: layered CLI help output.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-03-07T19:45:10.627Z, excerpt_hash=sha256:c263054c99e10a53c9d2f935eeaffdbd53f1e2b95aa08e6dee5945ee55372692

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Keep the first quickstart screen intentionally short; do not re-expand it with fallback flags or commit-format detail.
- Prefer pointers to role/help/reference surfaces over inline duplication.
- Do not break quickstart JSON output or the canonical bootstrap link.

## Risks

- Risk: hidden regressions in touched paths.
- Mitigation: run required checks before finish and record evidence.

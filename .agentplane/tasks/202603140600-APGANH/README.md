---
id: "202603140600-APGANH"
title: "Add Redmine canonical-state custom field plumbing"
result_summary: "Introduced AGENTPLANE_REDMINE_CUSTOM_FIELDS_CANONICAL_STATE plumbing, added redmine/state.ts helper seams, serialized canonical_state into Redmine payloads, and synced init/docs/tests. Implementation commits: 25692e8ec5b6, 7155158f80f4."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 9
depends_on: []
tags:
  - "code"
  - "backend"
  - "redmine"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-14T06:03:22.245Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-14T06:14:14.034Z"
  updated_by: "CODER"
  note: |-
    Command: bun x vitest run packages/agentplane/src/backends/task-backend/redmine/env.test.ts packages/agentplane/src/backends/task-backend.load.test.ts packages/agentplane/src/backends/task-backend.redmine.test.ts packages/agentplane/src/cli/run-cli.core.init.test.ts --hookTimeout 60000 --testTimeout 60000
    Result: pass
    Evidence: 4 test files passed; 81 tests passed, including Redmine env/load tests, payload serialization coverage, and redmine init regressions.
    Scope: Redmine canonical_state plumbing across env parsing, backend loading, payload building, and init template behavior.
    
    Command: ./node_modules/.bin/eslint packages/agentplane/src/backends/task-backend/redmine/env.ts packages/agentplane/src/backends/task-backend/redmine/state.ts packages/agentplane/src/backends/task-backend/redmine/env.test.ts packages/agentplane/src/backends/task-backend.load.test.ts packages/agentplane/src/backends/task-backend.redmine.test.ts packages/agentplane/src/cli/run-cli/commands/init/write-env.ts packages/agentplane/src/cli/run-cli.core.init.test.ts
    Result: pass
    Evidence: eslint exited cleanly with no findings.
    Scope: New canonical_state env key, helper seam, and touched Redmine/init regression files.
    
    Command: ./node_modules/.bin/prettier --check docs/user/backends/redmine.mdx --parser markdown && git diff --check -- .env.example docs/user/backends/redmine.mdx && bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build
    Result: pass
    Evidence: Prettier matched the MDX doc; git diff --check reported no whitespace issues for .env.example/docs; both package builds exited 0. Note: .env.example required git diff --check because this Prettier build cannot infer a parser for that file.
    Scope: Docs/template formatting sanity and package build integrity for the new Redmine plumbing.
commit:
  hash: "7155158f80f42a1f9ebd6dedf35ba0ed116f1dd8"
  message: "🧪 APGANH task: add Redmine plumbing regressions"
comments:
  -
    author: "CODER"
    body: "Start: implement Redmine canonical_state plumbing across env parsing, init templates, helper seams, and focused regression coverage."
  -
    author: "CODER"
    body: "Verified: Redmine now exposes a canonical_state custom field seam across env parsing, init templates, payload building, and focused regression coverage without yet switching remote round-trip behavior."
events:
  -
    type: "status"
    at: "2026-03-14T06:03:34.536Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implement Redmine canonical_state plumbing across env parsing, init templates, helper seams, and focused regression coverage."
  -
    type: "verify"
    at: "2026-03-14T06:14:14.034Z"
    author: "CODER"
    state: "ok"
    note: |-
      Command: bun x vitest run packages/agentplane/src/backends/task-backend/redmine/env.test.ts packages/agentplane/src/backends/task-backend.load.test.ts packages/agentplane/src/backends/task-backend.redmine.test.ts packages/agentplane/src/cli/run-cli.core.init.test.ts --hookTimeout 60000 --testTimeout 60000
      Result: pass
      Evidence: 4 test files passed; 81 tests passed, including Redmine env/load tests, payload serialization coverage, and redmine init regressions.
      Scope: Redmine canonical_state plumbing across env parsing, backend loading, payload building, and init template behavior.
      
      Command: ./node_modules/.bin/eslint packages/agentplane/src/backends/task-backend/redmine/env.ts packages/agentplane/src/backends/task-backend/redmine/state.ts packages/agentplane/src/backends/task-backend/redmine/env.test.ts packages/agentplane/src/backends/task-backend.load.test.ts packages/agentplane/src/backends/task-backend.redmine.test.ts packages/agentplane/src/cli/run-cli/commands/init/write-env.ts packages/agentplane/src/cli/run-cli.core.init.test.ts
      Result: pass
      Evidence: eslint exited cleanly with no findings.
      Scope: New canonical_state env key, helper seam, and touched Redmine/init regression files.
      
      Command: ./node_modules/.bin/prettier --check docs/user/backends/redmine.mdx --parser markdown && git diff --check -- .env.example docs/user/backends/redmine.mdx && bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build
      Result: pass
      Evidence: Prettier matched the MDX doc; git diff --check reported no whitespace issues for .env.example/docs; both package builds exited 0. Note: .env.example required git diff --check because this Prettier build cannot infer a parser for that file.
      Scope: Docs/template formatting sanity and package build integrity for the new Redmine plumbing.
  -
    type: "status"
    at: "2026-03-14T06:15:19.173Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: Redmine now exposes a canonical_state custom field seam across env parsing, init templates, payload building, and focused regression coverage without yet switching remote round-trip behavior."
doc_version: 3
doc_updated_at: "2026-03-14T06:15:19.174Z"
doc_updated_by: "CODER"
description: "Introduce one structured Redmine custom field for canonical task state and wire env/config parsing around it without yet claiming full remote parity."
sections:
  Summary: |-
    Add Redmine canonical-state custom field plumbing
    
    Introduce one structured Redmine custom field for canonical task state and wire env/config parsing around it without yet claiming full remote parity.
  Scope: |-
    - In scope: Introduce one structured Redmine custom field for canonical task state and wire env/config parsing around it without yet claiming full remote parity.
    - Out of scope: unrelated refactors not required for "Add Redmine canonical-state custom field plumbing".
  Plan: |-
    1. Extend the Redmine env/config surface with one structured canonical_state custom field key and seed it through init/env templates and backend-loading coverage.
    2. Add shared Redmine canonical-state helpers for parsing and building the structured field payload without yet switching mapping round-trip to it.
    3. Cover the new plumbing with focused env/load/init and Redmine backend regressions so the next round-trip tasks can build on a stable seam.
  Verify Steps: |-
    1. Run `bun x vitest run packages/agentplane/src/backends/task-backend/redmine/env.test.ts packages/agentplane/src/backends/task-backend.load.test.ts packages/agentplane/src/backends/task-backend.redmine.test.ts packages/agentplane/src/cli/run-cli.core.init.test.ts --hookTimeout 60000 --testTimeout 60000`. Expected: the Redmine plumbing regressions pass with the new canonical_state field surfaced through env/load/init paths.
    2. Run `./node_modules/.bin/eslint packages/agentplane/src/backends/task-backend/redmine/env.ts packages/agentplane/src/backends/task-backend/redmine/state.ts packages/agentplane/src/backends/task-backend/redmine/env.test.ts packages/agentplane/src/backends/task-backend.load.test.ts packages/agentplane/src/backends/task-backend.redmine.test.ts packages/agentplane/src/cli/run-cli/commands/init/write-env.ts packages/agentplane/src/cli/run-cli.core.init.test.ts`. Expected: lint passes on the new Redmine state seam and template plumbing.
    3. Run `./node_modules/.bin/prettier --check docs/user/backends/redmine.mdx .env.example && bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build`. Expected: docs/templates stay formatted and both packages still build.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    #### 2026-03-14T06:14:14.034Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: bun x vitest run packages/agentplane/src/backends/task-backend/redmine/env.test.ts packages/agentplane/src/backends/task-backend.load.test.ts packages/agentplane/src/backends/task-backend.redmine.test.ts packages/agentplane/src/cli/run-cli.core.init.test.ts --hookTimeout 60000 --testTimeout 60000
    Result: pass
    Evidence: 4 test files passed; 81 tests passed, including Redmine env/load tests, payload serialization coverage, and redmine init regressions.
    Scope: Redmine canonical_state plumbing across env parsing, backend loading, payload building, and init template behavior.
    
    Command: ./node_modules/.bin/eslint packages/agentplane/src/backends/task-backend/redmine/env.ts packages/agentplane/src/backends/task-backend/redmine/state.ts packages/agentplane/src/backends/task-backend/redmine/env.test.ts packages/agentplane/src/backends/task-backend.load.test.ts packages/agentplane/src/backends/task-backend.redmine.test.ts packages/agentplane/src/cli/run-cli/commands/init/write-env.ts packages/agentplane/src/cli/run-cli.core.init.test.ts
    Result: pass
    Evidence: eslint exited cleanly with no findings.
    Scope: New canonical_state env key, helper seam, and touched Redmine/init regression files.
    
    Command: ./node_modules/.bin/prettier --check docs/user/backends/redmine.mdx --parser markdown && git diff --check -- .env.example docs/user/backends/redmine.mdx && bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build
    Result: pass
    Evidence: Prettier matched the MDX doc; git diff --check reported no whitespace issues for .env.example/docs; both package builds exited 0. Note: .env.example required git diff --check because this Prettier build cannot infer a parser for that file.
    Scope: Docs/template formatting sanity and package build integrity for the new Redmine plumbing.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-14T06:13:54.547Z, excerpt_hash=sha256:09a5ca8264f220c0843e929daafee60004565ff40c6cb0b541faeb05550829ac
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: "- `prettier --check .env.example` fails because the bundled Prettier build cannot infer a parser for `.env.example`; verification used `git diff --check -- .env.example` instead for whitespace/form sanity.`"
id_source: "generated"
---
## Summary

Add Redmine canonical-state custom field plumbing

Introduce one structured Redmine custom field for canonical task state and wire env/config parsing around it without yet claiming full remote parity.

## Scope

- In scope: Introduce one structured Redmine custom field for canonical task state and wire env/config parsing around it without yet claiming full remote parity.
- Out of scope: unrelated refactors not required for "Add Redmine canonical-state custom field plumbing".

## Plan

1. Extend the Redmine env/config surface with one structured canonical_state custom field key and seed it through init/env templates and backend-loading coverage.
2. Add shared Redmine canonical-state helpers for parsing and building the structured field payload without yet switching mapping round-trip to it.
3. Cover the new plumbing with focused env/load/init and Redmine backend regressions so the next round-trip tasks can build on a stable seam.

## Verify Steps

1. Run `bun x vitest run packages/agentplane/src/backends/task-backend/redmine/env.test.ts packages/agentplane/src/backends/task-backend.load.test.ts packages/agentplane/src/backends/task-backend.redmine.test.ts packages/agentplane/src/cli/run-cli.core.init.test.ts --hookTimeout 60000 --testTimeout 60000`. Expected: the Redmine plumbing regressions pass with the new canonical_state field surfaced through env/load/init paths.
2. Run `./node_modules/.bin/eslint packages/agentplane/src/backends/task-backend/redmine/env.ts packages/agentplane/src/backends/task-backend/redmine/state.ts packages/agentplane/src/backends/task-backend/redmine/env.test.ts packages/agentplane/src/backends/task-backend.load.test.ts packages/agentplane/src/backends/task-backend.redmine.test.ts packages/agentplane/src/cli/run-cli/commands/init/write-env.ts packages/agentplane/src/cli/run-cli.core.init.test.ts`. Expected: lint passes on the new Redmine state seam and template plumbing.
3. Run `./node_modules/.bin/prettier --check docs/user/backends/redmine.mdx .env.example && bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build`. Expected: docs/templates stay formatted and both packages still build.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-14T06:14:14.034Z — VERIFY — ok

By: CODER

Note: Command: bun x vitest run packages/agentplane/src/backends/task-backend/redmine/env.test.ts packages/agentplane/src/backends/task-backend.load.test.ts packages/agentplane/src/backends/task-backend.redmine.test.ts packages/agentplane/src/cli/run-cli.core.init.test.ts --hookTimeout 60000 --testTimeout 60000
Result: pass
Evidence: 4 test files passed; 81 tests passed, including Redmine env/load tests, payload serialization coverage, and redmine init regressions.
Scope: Redmine canonical_state plumbing across env parsing, backend loading, payload building, and init template behavior.

Command: ./node_modules/.bin/eslint packages/agentplane/src/backends/task-backend/redmine/env.ts packages/agentplane/src/backends/task-backend/redmine/state.ts packages/agentplane/src/backends/task-backend/redmine/env.test.ts packages/agentplane/src/backends/task-backend.load.test.ts packages/agentplane/src/backends/task-backend.redmine.test.ts packages/agentplane/src/cli/run-cli/commands/init/write-env.ts packages/agentplane/src/cli/run-cli.core.init.test.ts
Result: pass
Evidence: eslint exited cleanly with no findings.
Scope: New canonical_state env key, helper seam, and touched Redmine/init regression files.

Command: ./node_modules/.bin/prettier --check docs/user/backends/redmine.mdx --parser markdown && git diff --check -- .env.example docs/user/backends/redmine.mdx && bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build
Result: pass
Evidence: Prettier matched the MDX doc; git diff --check reported no whitespace issues for .env.example/docs; both package builds exited 0. Note: .env.example required git diff --check because this Prettier build cannot infer a parser for that file.
Scope: Docs/template formatting sanity and package build integrity for the new Redmine plumbing.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-14T06:13:54.547Z, excerpt_hash=sha256:09a5ca8264f220c0843e929daafee60004565ff40c6cb0b541faeb05550829ac

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- `prettier --check .env.example` fails because the bundled Prettier build cannot infer a parser for `.env.example`; verification used `git diff --check -- .env.example` instead for whitespace/form sanity.`

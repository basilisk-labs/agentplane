---
id: "202605041805-1SY9WX"
title: "Add experimental ap agent mode"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-04T18:05:25.398Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-04T18:15:08.006Z"
  updated_by: "CODER"
  note: "Command: bun run test:project -- cli-core packages/agentplane/src/cli/run-cli.core.test.ts -t 'experimental ap|ap init' | Result: pass | Evidence: 3 ap tests passed; compact help, shorthand expansion, non-interactive init structured error covered. Command: bun run test:project -- cli-core packages/agentplane/src/cli/run-cli.core.installed-smoke.test.ts | Result: pass | Evidence: 3 installed smoke tests passed, including experimental ap entrypoint. Command: bun run typecheck | Result: pass | Evidence: tsc -b exited 0. Command: bun run framework:dev:bootstrap | Result: pass | Evidence: core, agentplane, and testkit built; repo-local runtime ready. Command: node packages/agentplane/bin/ap.js next --help | Result: pass | Evidence: compact task next help printed without Examples section. Command: bun run package:tarball:check | Result: pass | Evidence: package tarball policy OK; agentplane=48 files including bin/ap.js. Command: bun run package:install-smoke | Result: pass | Evidence: local tarball install smoke OK and exercised ap. Command: git diff --check | Result: pass | Evidence: no whitespace errors. Command: node .agentplane/policy/check-routing.mjs | Result: pass | Evidence: policy routing OK. Command: agentplane doctor | Result: pass | Evidence: doctor OK with informational runtime handoff entries only. Observation: full run-cli.core.test.ts was also attempted and failed in two broad existing cases before command execution (schema validation fixture and last-known-good fixture); targeted ap cases passed."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: implement the experimental ap agent-mode entrypoint in its dedicated worktree, covering package bin metadata, CLI agent defaults, interactive guardrails, and focused verification."
events:
  -
    type: "status"
    at: "2026-05-04T18:05:43.884Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implement the experimental ap agent-mode entrypoint in its dedicated worktree, covering package bin metadata, CLI agent defaults, interactive guardrails, and focused verification."
  -
    type: "verify"
    at: "2026-05-04T18:15:08.006Z"
    author: "CODER"
    state: "ok"
    note: "Command: bun run test:project -- cli-core packages/agentplane/src/cli/run-cli.core.test.ts -t 'experimental ap|ap init' | Result: pass | Evidence: 3 ap tests passed; compact help, shorthand expansion, non-interactive init structured error covered. Command: bun run test:project -- cli-core packages/agentplane/src/cli/run-cli.core.installed-smoke.test.ts | Result: pass | Evidence: 3 installed smoke tests passed, including experimental ap entrypoint. Command: bun run typecheck | Result: pass | Evidence: tsc -b exited 0. Command: bun run framework:dev:bootstrap | Result: pass | Evidence: core, agentplane, and testkit built; repo-local runtime ready. Command: node packages/agentplane/bin/ap.js next --help | Result: pass | Evidence: compact task next help printed without Examples section. Command: bun run package:tarball:check | Result: pass | Evidence: package tarball policy OK; agentplane=48 files including bin/ap.js. Command: bun run package:install-smoke | Result: pass | Evidence: local tarball install smoke OK and exercised ap. Command: git diff --check | Result: pass | Evidence: no whitespace errors. Command: node .agentplane/policy/check-routing.mjs | Result: pass | Evidence: policy routing OK. Command: agentplane doctor | Result: pass | Evidence: doctor OK with informational runtime handoff entries only. Observation: full run-cli.core.test.ts was also attempted and failed in two broad existing cases before command execution (schema validation fixture and last-known-good fixture); targeted ap cases passed."
doc_version: 3
doc_updated_at: "2026-05-04T18:15:08.012Z"
doc_updated_by: "CODER"
description: "Add an experimental short ap entrypoint with agent-oriented defaults, non-interactive guardrails, and focused verification for the next release."
sections:
  Summary: |-
    Add experimental ap agent mode
    
    Add an experimental short ap entrypoint with agent-oriented defaults, non-interactive guardrails, and focused verification for the next release.
  Scope: |-
    - In scope: Add an experimental short ap entrypoint with agent-oriented defaults, non-interactive guardrails, and focused verification for the next release.
    - Out of scope: unrelated refactors not required for "Add experimental ap agent mode".
  Plan: |-
    1. Inspect the existing CLI entrypoint, global argument parsing, package bin metadata, and release packaging scripts for command-name assumptions.
    2. Add an experimental ap entrypoint that routes to the existing CLI with an explicit agent-mode marker and defaults optimized for agent use.
    3. Guard interactive flows under ap so commands that need human prompts fail with compact actionable guidance unless explicit non-interactive flags are present.
    4. Add focused tests/smoke coverage for ap version/help/init behavior and package metadata.
    5. Run focused CLI tests, typecheck or relevant package build checks, git diff --check, policy routing, and agentplane doctor.
  Verify Steps: |-
    1. Run focused CLI tests for experimental ap agent mode. Expected: compact help defaults, shorthand expansion, and non-interactive init error behavior pass.
    2. Run installed/package smoke coverage for the ap bin. Expected: pseudo-installed and npm tarball installs expose ap and agentplane successfully.
    3. Run package tarball policy. Expected: agentplane package includes bin/ap.js and no unexpected files.
    4. Run typecheck, git diff --check, policy routing, framework bootstrap, and agentplane doctor. Expected: all pass or any unrelated broad-suite failures are recorded explicitly.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-04T18:15:08.006Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: bun run test:project -- cli-core packages/agentplane/src/cli/run-cli.core.test.ts -t 'experimental ap|ap init' | Result: pass | Evidence: 3 ap tests passed; compact help, shorthand expansion, non-interactive init structured error covered. Command: bun run test:project -- cli-core packages/agentplane/src/cli/run-cli.core.installed-smoke.test.ts | Result: pass | Evidence: 3 installed smoke tests passed, including experimental ap entrypoint. Command: bun run typecheck | Result: pass | Evidence: tsc -b exited 0. Command: bun run framework:dev:bootstrap | Result: pass | Evidence: core, agentplane, and testkit built; repo-local runtime ready. Command: node packages/agentplane/bin/ap.js next --help | Result: pass | Evidence: compact task next help printed without Examples section. Command: bun run package:tarball:check | Result: pass | Evidence: package tarball policy OK; agentplane=48 files including bin/ap.js. Command: bun run package:install-smoke | Result: pass | Evidence: local tarball install smoke OK and exercised ap. Command: git diff --check | Result: pass | Evidence: no whitespace errors. Command: node .agentplane/policy/check-routing.mjs | Result: pass | Evidence: policy routing OK. Command: agentplane doctor | Result: pass | Evidence: doctor OK with informational runtime handoff entries only. Observation: full run-cli.core.test.ts was also attempted and failed in two broad existing cases before command execution (schema validation fixture and last-known-good fixture); targeted ap cases passed.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-04T18:14:47.172Z, excerpt_hash=sha256:fde26f864f5f56195648b2280b07169a53430436ec82d5d4b80deb6f582f0c8d
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Add experimental ap agent mode

Add an experimental short ap entrypoint with agent-oriented defaults, non-interactive guardrails, and focused verification for the next release.

## Scope

- In scope: Add an experimental short ap entrypoint with agent-oriented defaults, non-interactive guardrails, and focused verification for the next release.
- Out of scope: unrelated refactors not required for "Add experimental ap agent mode".

## Plan

1. Inspect the existing CLI entrypoint, global argument parsing, package bin metadata, and release packaging scripts for command-name assumptions.
2. Add an experimental ap entrypoint that routes to the existing CLI with an explicit agent-mode marker and defaults optimized for agent use.
3. Guard interactive flows under ap so commands that need human prompts fail with compact actionable guidance unless explicit non-interactive flags are present.
4. Add focused tests/smoke coverage for ap version/help/init behavior and package metadata.
5. Run focused CLI tests, typecheck or relevant package build checks, git diff --check, policy routing, and agentplane doctor.

## Verify Steps

1. Run focused CLI tests for experimental ap agent mode. Expected: compact help defaults, shorthand expansion, and non-interactive init error behavior pass.
2. Run installed/package smoke coverage for the ap bin. Expected: pseudo-installed and npm tarball installs expose ap and agentplane successfully.
3. Run package tarball policy. Expected: agentplane package includes bin/ap.js and no unexpected files.
4. Run typecheck, git diff --check, policy routing, framework bootstrap, and agentplane doctor. Expected: all pass or any unrelated broad-suite failures are recorded explicitly.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-04T18:15:08.006Z — VERIFY — ok

By: CODER

Note: Command: bun run test:project -- cli-core packages/agentplane/src/cli/run-cli.core.test.ts -t 'experimental ap|ap init' | Result: pass | Evidence: 3 ap tests passed; compact help, shorthand expansion, non-interactive init structured error covered. Command: bun run test:project -- cli-core packages/agentplane/src/cli/run-cli.core.installed-smoke.test.ts | Result: pass | Evidence: 3 installed smoke tests passed, including experimental ap entrypoint. Command: bun run typecheck | Result: pass | Evidence: tsc -b exited 0. Command: bun run framework:dev:bootstrap | Result: pass | Evidence: core, agentplane, and testkit built; repo-local runtime ready. Command: node packages/agentplane/bin/ap.js next --help | Result: pass | Evidence: compact task next help printed without Examples section. Command: bun run package:tarball:check | Result: pass | Evidence: package tarball policy OK; agentplane=48 files including bin/ap.js. Command: bun run package:install-smoke | Result: pass | Evidence: local tarball install smoke OK and exercised ap. Command: git diff --check | Result: pass | Evidence: no whitespace errors. Command: node .agentplane/policy/check-routing.mjs | Result: pass | Evidence: policy routing OK. Command: agentplane doctor | Result: pass | Evidence: doctor OK with informational runtime handoff entries only. Observation: full run-cli.core.test.ts was also attempted and failed in two broad existing cases before command execution (schema validation fixture and last-known-good fixture); targeted ap cases passed.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-04T18:14:47.172Z, excerpt_hash=sha256:fde26f864f5f56195648b2280b07169a53430436ec82d5d4b80deb6f582f0c8d

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

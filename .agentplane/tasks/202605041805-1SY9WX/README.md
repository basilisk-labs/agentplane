---
id: "202605041805-1SY9WX"
title: "Add experimental ap agent mode"
result_summary: "Merged via PR #873."
status: "DONE"
priority: "med"
owner: "CODER"
revision: 13
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
  updated_at: "2026-05-04T19:22:53.498Z"
  updated_by: "CODER"
  note: "Addressed Codex review blockers for ap shorthand and agent-mode JSON global parse errors; targeted agent-mode tests, installed smoke, lint, and diff check passed."
commit:
  hash: "200b00a434f64dea33060f2b66f2bf93d3c000e3"
  message: "🧪 1SY9WX task: Add experimental ap agent mode [202605041805-1SY9WX]"
comments:
  -
    author: "CODER"
    body: "Start: implement the experimental ap agent-mode entrypoint in its dedicated worktree, covering package bin metadata, CLI agent defaults, interactive guardrails, and focused verification."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #873 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
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
  -
    type: "verify"
    at: "2026-05-04T18:25:10.376Z"
    author: "CODER"
    state: "ok"
    note: "Prompt assets now prefer compact ap agent commands with agentplane fallback; routing, focused ap tests, typecheck, bootstrap, tarball check, and doctor passed."
  -
    type: "verify"
    at: "2026-05-04T18:32:32.981Z"
    author: "CODER"
    state: "ok"
    note: "Current installed .agentplane/agents role cards now prefer ap command notation; doctor, routing, and diff whitespace checks passed."
  -
    type: "verify"
    at: "2026-05-04T18:40:08.630Z"
    author: "CODER"
    state: "ok"
    note: "Reduced ap test coverage footprint to satisfy oversized-test baseline while preserving installed ap entrypoint and shorthand coverage; installed smoke and oversized baseline checks passed."
  -
    type: "verify"
    at: "2026-05-04T18:53:14.731Z"
    author: "CODER"
    state: "ok"
    note: "Lint blockers from broad pre-push were fixed; lint:core, installed smoke, diff whitespace, and oversized baseline checks passed."
  -
    type: "verify"
    at: "2026-05-04T19:04:20.404Z"
    author: "CODER"
    state: "ok"
    note: "Updated tests that still asserted old agentplane prompt/runtime-watch contracts; targeted agents-template/runtime-watch tests and lint passed."
  -
    type: "verify"
    at: "2026-05-04T19:22:53.498Z"
    author: "CODER"
    state: "ok"
    note: "Addressed Codex review blockers for ap shorthand and agent-mode JSON global parse errors; targeted agent-mode tests, installed smoke, lint, and diff check passed."
  -
    type: "status"
    at: "2026-05-04T19:31:45.004Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #873 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-05-04T19:31:45.014Z"
doc_updated_by: "INTEGRATOR"
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
    
    ### 2026-05-04T18:25:10.376Z — VERIFY — ok
    
    By: CODER
    
    Note: Prompt assets now prefer compact ap agent commands with agentplane fallback; routing, focused ap tests, typecheck, bootstrap, tarball check, and doctor passed.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-04T18:15:08.012Z, excerpt_hash=sha256:fde26f864f5f56195648b2280b07169a53430436ec82d5d4b80deb6f582f0c8d
    
    ### 2026-05-04T18:32:32.981Z — VERIFY — ok
    
    By: CODER
    
    Note: Current installed .agentplane/agents role cards now prefer ap command notation; doctor, routing, and diff whitespace checks passed.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-04T18:25:10.396Z, excerpt_hash=sha256:fde26f864f5f56195648b2280b07169a53430436ec82d5d4b80deb6f582f0c8d
    
    ### 2026-05-04T18:40:08.630Z — VERIFY — ok
    
    By: CODER
    
    Note: Reduced ap test coverage footprint to satisfy oversized-test baseline while preserving installed ap entrypoint and shorthand coverage; installed smoke and oversized baseline checks passed.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-04T18:32:32.998Z, excerpt_hash=sha256:fde26f864f5f56195648b2280b07169a53430436ec82d5d4b80deb6f582f0c8d
    
    ### 2026-05-04T18:53:14.731Z — VERIFY — ok
    
    By: CODER
    
    Note: Lint blockers from broad pre-push were fixed; lint:core, installed smoke, diff whitespace, and oversized baseline checks passed.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-04T18:40:08.646Z, excerpt_hash=sha256:fde26f864f5f56195648b2280b07169a53430436ec82d5d4b80deb6f582f0c8d
    
    ### 2026-05-04T19:04:20.404Z — VERIFY — ok
    
    By: CODER
    
    Note: Updated tests that still asserted old agentplane prompt/runtime-watch contracts; targeted agents-template/runtime-watch tests and lint passed.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-04T18:53:14.807Z, excerpt_hash=sha256:fde26f864f5f56195648b2280b07169a53430436ec82d5d4b80deb6f582f0c8d
    
    ### 2026-05-04T19:22:53.498Z — VERIFY — ok
    
    By: CODER
    
    Note: Addressed Codex review blockers for ap shorthand and agent-mode JSON global parse errors; targeted agent-mode tests, installed smoke, lint, and diff check passed.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-04T19:04:20.411Z, excerpt_hash=sha256:fde26f864f5f56195648b2280b07169a53430436ec82d5d4b80deb6f582f0c8d
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Updated installed AGENTS gateway, runner prompt, agent role cards, and bundled Codex AgentPlane skill to use ap for agent-oriented command examples.
      Impact: Agents spend fewer prompt tokens on repeated command prefixes while keeping compatibility through explicit agentplane fallback.
      Resolution: Kept public README human-facing and scoped shorthand replacement to agent-facing assets.
      Promotion: incident-candidate
      Fixability: external
    
    - Observation: Synchronized .agentplane/agents/*.json from updated package agent assets so the current checkout prompt graph matches next init/upgrade assets.
      Impact: Agents in this repository now receive ap-oriented role-card guidance immediately, not only after a future package install or upgrade.
      Resolution: Left canonical .agentplane/policy modules in long-form agentplane notation as a separate policy contract surface.
      Promotion: incident-candidate
      Fixability: external
    
    - Observation: Moved shorthand coverage from oversized run-cli.core.test.ts into run-cli.core.installed-smoke.test.ts, where the real ap binary is exercised.
      Impact: Pre-push hotspot baseline can pass without weakening ap behavior verification.
      Resolution: run-cli.core.test.ts is now 1040 lines, below the 1041-line baseline.
      Promotion: incident-candidate
      Fixability: external
    
    - Observation: Added switch-case braces/nullish coalescing in agent-mode, repaired two broad lint findings, and kept ap coverage in installed smoke.
      Impact: Branch can satisfy broad pre-push without bypassing hooks.
      Resolution: Ready to re-run git push with standard pre-push checks.
      Promotion: incident-candidate
      Fixability: external
    
    - Observation: agents-template now expects ap in installed agent cards; runtime-watch expects bin/ap.js in watched paths.
      Impact: Broad fast CI expectations now match the experimental ap agent mode surface.
      Resolution: Ready for another standard push attempt.
      Promotion: incident-candidate
      Fixability: external
    
    - Observation: Recognize --option=value when deciding whether to append defaults; enable jsonErrors before throwing global parse failures in agent mode.
      Impact: ap next --limit=3 no longer receives a duplicate --limit default, and ap global usage errors are structured JSON.
      Resolution: Ready to push review-fix commit and re-check mergeability.
      Promotion: incident-candidate
      Fixability: external
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

### 2026-05-04T18:25:10.376Z — VERIFY — ok

By: CODER

Note: Prompt assets now prefer compact ap agent commands with agentplane fallback; routing, focused ap tests, typecheck, bootstrap, tarball check, and doctor passed.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-04T18:15:08.012Z, excerpt_hash=sha256:fde26f864f5f56195648b2280b07169a53430436ec82d5d4b80deb6f582f0c8d

### 2026-05-04T18:32:32.981Z — VERIFY — ok

By: CODER

Note: Current installed .agentplane/agents role cards now prefer ap command notation; doctor, routing, and diff whitespace checks passed.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-04T18:25:10.396Z, excerpt_hash=sha256:fde26f864f5f56195648b2280b07169a53430436ec82d5d4b80deb6f582f0c8d

### 2026-05-04T18:40:08.630Z — VERIFY — ok

By: CODER

Note: Reduced ap test coverage footprint to satisfy oversized-test baseline while preserving installed ap entrypoint and shorthand coverage; installed smoke and oversized baseline checks passed.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-04T18:32:32.998Z, excerpt_hash=sha256:fde26f864f5f56195648b2280b07169a53430436ec82d5d4b80deb6f582f0c8d

### 2026-05-04T18:53:14.731Z — VERIFY — ok

By: CODER

Note: Lint blockers from broad pre-push were fixed; lint:core, installed smoke, diff whitespace, and oversized baseline checks passed.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-04T18:40:08.646Z, excerpt_hash=sha256:fde26f864f5f56195648b2280b07169a53430436ec82d5d4b80deb6f582f0c8d

### 2026-05-04T19:04:20.404Z — VERIFY — ok

By: CODER

Note: Updated tests that still asserted old agentplane prompt/runtime-watch contracts; targeted agents-template/runtime-watch tests and lint passed.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-04T18:53:14.807Z, excerpt_hash=sha256:fde26f864f5f56195648b2280b07169a53430436ec82d5d4b80deb6f582f0c8d

### 2026-05-04T19:22:53.498Z — VERIFY — ok

By: CODER

Note: Addressed Codex review blockers for ap shorthand and agent-mode JSON global parse errors; targeted agent-mode tests, installed smoke, lint, and diff check passed.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-04T19:04:20.411Z, excerpt_hash=sha256:fde26f864f5f56195648b2280b07169a53430436ec82d5d4b80deb6f582f0c8d

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Updated installed AGENTS gateway, runner prompt, agent role cards, and bundled Codex AgentPlane skill to use ap for agent-oriented command examples.
  Impact: Agents spend fewer prompt tokens on repeated command prefixes while keeping compatibility through explicit agentplane fallback.
  Resolution: Kept public README human-facing and scoped shorthand replacement to agent-facing assets.
  Promotion: incident-candidate
  Fixability: external

- Observation: Synchronized .agentplane/agents/*.json from updated package agent assets so the current checkout prompt graph matches next init/upgrade assets.
  Impact: Agents in this repository now receive ap-oriented role-card guidance immediately, not only after a future package install or upgrade.
  Resolution: Left canonical .agentplane/policy modules in long-form agentplane notation as a separate policy contract surface.
  Promotion: incident-candidate
  Fixability: external

- Observation: Moved shorthand coverage from oversized run-cli.core.test.ts into run-cli.core.installed-smoke.test.ts, where the real ap binary is exercised.
  Impact: Pre-push hotspot baseline can pass without weakening ap behavior verification.
  Resolution: run-cli.core.test.ts is now 1040 lines, below the 1041-line baseline.
  Promotion: incident-candidate
  Fixability: external

- Observation: Added switch-case braces/nullish coalescing in agent-mode, repaired two broad lint findings, and kept ap coverage in installed smoke.
  Impact: Branch can satisfy broad pre-push without bypassing hooks.
  Resolution: Ready to re-run git push with standard pre-push checks.
  Promotion: incident-candidate
  Fixability: external

- Observation: agents-template now expects ap in installed agent cards; runtime-watch expects bin/ap.js in watched paths.
  Impact: Broad fast CI expectations now match the experimental ap agent mode surface.
  Resolution: Ready for another standard push attempt.
  Promotion: incident-candidate
  Fixability: external

- Observation: Recognize --option=value when deciding whether to append defaults; enable jsonErrors before throwing global parse failures in agent mode.
  Impact: ap next --limit=3 no longer receives a duplicate --limit default, and ap global usage errors are structured JSON.
  Resolution: Ready to push review-fix commit and re-check mergeability.
  Promotion: incident-candidate
  Fixability: external

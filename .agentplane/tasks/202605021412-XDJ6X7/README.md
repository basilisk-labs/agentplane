---
id: "202605021412-XDJ6X7"
title: "Switch Homebrew formula to standalone assets"
result_summary: "Merged via PR #754."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on:
  - "202605021412-3KA8WV"
tags:
  - "code"
  - "homebrew"
  - "release"
verify:
  - "bun run release:homebrew:check"
  - "ruby -c generated Formula/agentplane.rb"
plan_approval:
  state: "approved"
  updated_at: "2026-05-02T17:29:26.652Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-02T17:33:35.388Z"
  updated_by: "CODER"
  note: "Passed: agentplane task verify-show 202605021412-XDJ6X7; bun run release:homebrew:check; bun test packages/agentplane/src/commands/release/render-homebrew-formula-script.test.ts; ruby -c generated Formula/agentplane.rb; bunx eslint scripts/render-homebrew-formula.mjs packages/agentplane/src/commands/release/render-homebrew-formula-script.test.ts; bun run format:check; node .agentplane/policy/check-routing.mjs; agentplane doctor."
commit:
  hash: "1038442881c2232891fb53d9ab38892975555941"
  message: "release: Switch Homebrew formula to standalone assets (XDJ6X7)"
comments:
  -
    author: "CODER"
    body: "Start: Render Homebrew formula from macOS standalone archives without Node dependency."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #754 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-05-02T17:29:47.706Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Render Homebrew formula from macOS standalone archives without Node dependency."
  -
    type: "verify"
    at: "2026-05-02T17:33:35.388Z"
    author: "CODER"
    state: "ok"
    note: "Passed: agentplane task verify-show 202605021412-XDJ6X7; bun run release:homebrew:check; bun test packages/agentplane/src/commands/release/render-homebrew-formula-script.test.ts; ruby -c generated Formula/agentplane.rb; bunx eslint scripts/render-homebrew-formula.mjs packages/agentplane/src/commands/release/render-homebrew-formula-script.test.ts; bun run format:check; node .agentplane/policy/check-routing.mjs; agentplane doctor."
  -
    type: "status"
    at: "2026-05-02T17:36:34.689Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #754 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-05-02T17:36:34.694Z"
doc_updated_by: "INTEGRATOR"
description: "Update the Homebrew formula renderer and tap publication flow to consume macOS bundled-runtime archives directly, remove depends_on node, select arm64/x64 assets, and validate formula syntax/install behavior."
sections:
  Summary: |-
    Switch Homebrew formula to standalone assets
    
    Update the Homebrew formula renderer and tap publication flow to consume macOS bundled-runtime archives directly, remove depends_on node, select arm64/x64 assets, and validate formula syntax/install behavior.
  Scope: |-
    - In scope: Update the Homebrew formula renderer and tap publication flow to consume macOS bundled-runtime archives directly, remove depends_on node, select arm64/x64 assets, and validate formula syntax/install behavior.
    - Out of scope: unrelated refactors not required for "Switch Homebrew formula to standalone assets".
  Plan: |-
    Switch Homebrew rendering from npm tarball install to macOS standalone archives.
    
    Scope:
    - Select darwin-arm64 and darwin-x64 platformAssets from release-distribution.json.
    - Render a Formula that installs the bundled-runtime archive directly and removes depends_on node/npm install.
    - Preserve Homebrew tap publication handoff/evidence fields with standalone install strategy metadata.
    - Update renderer tests and check validation to cover formula syntax and no Node dependency.
    
    Verification:
    - agentplane task verify-show 202605021412-XDJ6X7
    - bun run release:homebrew:check
    - bun test packages/agentplane/src/commands/release/render-homebrew-formula-script.test.ts
    - ruby -c <generated Formula/agentplane.rb>
    - node .agentplane/policy/check-routing.mjs
    - agentplane doctor
  Verify Steps: |-
    1. Run `bun run release:homebrew:check`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `ruby -c generated Formula/agentplane.rb`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-02T17:33:35.388Z — VERIFY — ok
    
    By: CODER
    
    Note: Passed: agentplane task verify-show 202605021412-XDJ6X7; bun run release:homebrew:check; bun test packages/agentplane/src/commands/release/render-homebrew-formula-script.test.ts; ruby -c generated Formula/agentplane.rb; bunx eslint scripts/render-homebrew-formula.mjs packages/agentplane/src/commands/release/render-homebrew-formula-script.test.ts; bun run format:check; node .agentplane/policy/check-routing.mjs; agentplane doctor.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-02T17:29:47.706Z, excerpt_hash=sha256:f3bd7043d7b1fae7ab77cb29aefc662bcb312a434a91e6664bf3f0232aec8e72
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Switch Homebrew formula to standalone assets

Update the Homebrew formula renderer and tap publication flow to consume macOS bundled-runtime archives directly, remove depends_on node, select arm64/x64 assets, and validate formula syntax/install behavior.

## Scope

- In scope: Update the Homebrew formula renderer and tap publication flow to consume macOS bundled-runtime archives directly, remove depends_on node, select arm64/x64 assets, and validate formula syntax/install behavior.
- Out of scope: unrelated refactors not required for "Switch Homebrew formula to standalone assets".

## Plan

Switch Homebrew rendering from npm tarball install to macOS standalone archives.

Scope:
- Select darwin-arm64 and darwin-x64 platformAssets from release-distribution.json.
- Render a Formula that installs the bundled-runtime archive directly and removes depends_on node/npm install.
- Preserve Homebrew tap publication handoff/evidence fields with standalone install strategy metadata.
- Update renderer tests and check validation to cover formula syntax and no Node dependency.

Verification:
- agentplane task verify-show 202605021412-XDJ6X7
- bun run release:homebrew:check
- bun test packages/agentplane/src/commands/release/render-homebrew-formula-script.test.ts
- ruby -c <generated Formula/agentplane.rb>
- node .agentplane/policy/check-routing.mjs
- agentplane doctor

## Verify Steps

1. Run `bun run release:homebrew:check`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `ruby -c generated Formula/agentplane.rb`. Expected: it succeeds and confirms the requested outcome for this task.
3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-02T17:33:35.388Z — VERIFY — ok

By: CODER

Note: Passed: agentplane task verify-show 202605021412-XDJ6X7; bun run release:homebrew:check; bun test packages/agentplane/src/commands/release/render-homebrew-formula-script.test.ts; ruby -c generated Formula/agentplane.rb; bunx eslint scripts/render-homebrew-formula.mjs packages/agentplane/src/commands/release/render-homebrew-formula-script.test.ts; bun run format:check; node .agentplane/policy/check-routing.mjs; agentplane doctor.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-02T17:29:47.706Z, excerpt_hash=sha256:f3bd7043d7b1fae7ab77cb29aefc662bcb312a434a91e6664bf3f0232aec8e72

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

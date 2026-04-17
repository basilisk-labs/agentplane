---
id: "202604170838-73XAXT"
title: "Add Codex plugin installer and metadata"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 8
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-17T08:39:26.341Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved for bundled Codex plugin installer, metadata, and targeted verification."
verification:
  state: "ok"
  updated_at: "2026-04-17T08:53:27.873Z"
  updated_by: "CODER"
  note: "Codex plugin installer, manifest metadata, and help surfaces verified with typecheck, targeted Vitest, and targeted ESLint."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: implementing the bundled Codex plugin installer, metadata generation, and targeted verification inside the dedicated task worktree."
events:
  -
    type: "status"
    at: "2026-04-17T08:40:01.401Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implementing the bundled Codex plugin installer, metadata generation, and targeted verification inside the dedicated task worktree."
  -
    type: "verify"
    at: "2026-04-17T08:53:27.873Z"
    author: "CODER"
    state: "ok"
    note: "Codex plugin installer, manifest metadata, and help surfaces verified with typecheck, targeted Vitest, and targeted ESLint."
doc_version: 3
doc_updated_at: "2026-04-17T08:53:27.893Z"
doc_updated_by: "CODER"
description: "Bundle a Codex plugin install flow, manifest metadata, and a Codex skill so AgentPlane can appear in the Codex plugins UI via a local marketplace."
sections:
  Summary: |-
    Add Codex plugin installer and metadata
    
    Bundle a Codex plugin install flow, manifest metadata, and a Codex skill so AgentPlane can appear in the Codex plugins UI via a local marketplace.
  Scope: |-
    - In scope: Bundle a Codex plugin install flow, manifest metadata, and a Codex skill so AgentPlane can appear in the Codex plugins UI via a local marketplace.
    - Out of scope: unrelated refactors not required for "Add Codex plugin installer and metadata".
  Plan: |-
    1. Implement the change for "Add Codex plugin installer and metadata".
    2. Run required checks and capture verification evidence.
    3. Finalize task findings and finish with traceable commit metadata.
  Verify Steps: |-
    1. Run `vitest run packages/agentplane/src/commands/codex/plugin-install.test.ts packages/agentplane/src/cli/run-cli.core.help-snap.test.ts packages/agentplane/src/cli/run-cli.core.help-contract.test.ts packages/agentplane/src/cli/run-cli.core.group-root-usage.test.ts --hookTimeout 60000 --testTimeout 60000`. Expected: the new Codex plugin command, group roots, and help surfaces pass.
    2. Run `bun run typecheck`. Expected: touched TypeScript surfaces compile without errors.
    3. Review the generated plugin manifest and marketplace entry from the command tests. Expected: manifest asset paths stay relative `./...` and the marketplace contains one `agentplane` entry without disturbing unrelated plugins.
  Verification: |-
    - Command: `agentplane task verify-show 202604170838-73XAXT`
      Result: pass
      Evidence: the recorded Verify Steps matched the implemented installer, help, and marketplace checks without contract drift.
      Scope: task acceptance contract review for the active Codex plugin work.
    
    - Command: `bun run typecheck`
      Result: pass
      Evidence: `tsc -b` completed successfully with exit code 0 on the final diff.
      Scope: TypeScript compile safety for the touched AgentPlane CLI and installer files.
    
    - Command: `bunx vitest run packages/agentplane/src/commands/codex/plugin-install.test.ts packages/agentplane/src/cli/run-cli.core.codex-plugin.test.ts packages/agentplane/src/cli/run-cli.core.help-snap.test.ts packages/agentplane/src/cli/run-cli.core.help-contract.test.ts packages/agentplane/src/cli/run-cli.core.group-root-usage.test.ts packages/agentplane/src/cli/run-cli/command-catalog.test.ts --hookTimeout 60000 --testTimeout 60000 -u`
      Result: pass
      Evidence: 6 test files passed, 43 tests passed, 1 snapshot written, and 1 snapshot updated while refreshing the new Codex help snapshot.
      Scope: bundled plugin installation, marketplace merge behavior, command catalog wiring, group-root usage, and help snapshots.
    
    - Command: `bunx eslint packages/agentplane/src/commands/codex/plugin-install.ts packages/agentplane/src/commands/codex/plugin-install.test.ts packages/agentplane/src/cli/run-cli/commands/codex.ts packages/agentplane/src/cli/run-cli.core.codex-plugin.test.ts packages/agentplane/src/cli/run-cli.core.group-root-usage.test.ts packages/agentplane/src/cli/run-cli.core.help-contract.test.ts packages/agentplane/src/cli/run-cli.core.help-snap.test.ts packages/agentplane/src/cli/run-cli/command-catalog.test.ts packages/agentplane/src/cli/run-cli/command-catalog/core.ts packages/agentplane/src/cli/run-cli/commands/core.ts`
      Result: pass
      Evidence: no lint errors remained after the installer and command wiring fixes.
      Scope: style and static analysis for the touched TypeScript files.
    
    - Command: `bunx vitest run packages/agentplane/src/commands/codex/plugin-install.test.ts packages/agentplane/src/cli/run-cli.core.codex-plugin.test.ts packages/agentplane/src/cli/run-cli.core.help-snap.test.ts packages/agentplane/src/cli/run-cli.core.help-contract.test.ts packages/agentplane/src/cli/run-cli.core.group-root-usage.test.ts packages/agentplane/src/cli/run-cli/command-catalog.test.ts --hookTimeout 60000 --testTimeout 60000`
      Result: pass
      Evidence: 6 test files passed and 43 tests passed on the final rerun after lint fixes.
      Scope: final regression confirmation for the bundled plugin install flow and CLI help surfaces.
    
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-17T08:53:27.873Z — VERIFY — ok
    
    By: CODER
    
    Note: Codex plugin installer, manifest metadata, and help surfaces verified with typecheck, targeted Vitest, and targeted ESLint.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-17T08:52:55.031Z, excerpt_hash=sha256:3adaa12f555e09f5f96fe0bdc467018f514b692734bf749c651f3fc9599dfcab
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Official public self-serve publishing for the Codex Plugin Directory is not available in the current OpenAI docs, so this implementation targets the supported local marketplace route only.
    - The bundled manifest intentionally omits privacy-policy and terms URLs because the project does not currently publish canonical pages for those links.
    - The plugin uses bundled SVG logo/icon assets plus a PNG screenshot copied from the docs surface; if Codex install UI later constrains asset formats more tightly, those assets may need a follow-up adjustment.
id_source: "generated"
---
## Summary

Add Codex plugin installer and metadata

Bundle a Codex plugin install flow, manifest metadata, and a Codex skill so AgentPlane can appear in the Codex plugins UI via a local marketplace.

## Scope

- In scope: Bundle a Codex plugin install flow, manifest metadata, and a Codex skill so AgentPlane can appear in the Codex plugins UI via a local marketplace.
- Out of scope: unrelated refactors not required for "Add Codex plugin installer and metadata".

## Plan

1. Implement the change for "Add Codex plugin installer and metadata".
2. Run required checks and capture verification evidence.
3. Finalize task findings and finish with traceable commit metadata.

## Verify Steps

1. Run `vitest run packages/agentplane/src/commands/codex/plugin-install.test.ts packages/agentplane/src/cli/run-cli.core.help-snap.test.ts packages/agentplane/src/cli/run-cli.core.help-contract.test.ts packages/agentplane/src/cli/run-cli.core.group-root-usage.test.ts --hookTimeout 60000 --testTimeout 60000`. Expected: the new Codex plugin command, group roots, and help surfaces pass.
2. Run `bun run typecheck`. Expected: touched TypeScript surfaces compile without errors.
3. Review the generated plugin manifest and marketplace entry from the command tests. Expected: manifest asset paths stay relative `./...` and the marketplace contains one `agentplane` entry without disturbing unrelated plugins.

## Verification

- Command: `agentplane task verify-show 202604170838-73XAXT`
  Result: pass
  Evidence: the recorded Verify Steps matched the implemented installer, help, and marketplace checks without contract drift.
  Scope: task acceptance contract review for the active Codex plugin work.

- Command: `bun run typecheck`
  Result: pass
  Evidence: `tsc -b` completed successfully with exit code 0 on the final diff.
  Scope: TypeScript compile safety for the touched AgentPlane CLI and installer files.

- Command: `bunx vitest run packages/agentplane/src/commands/codex/plugin-install.test.ts packages/agentplane/src/cli/run-cli.core.codex-plugin.test.ts packages/agentplane/src/cli/run-cli.core.help-snap.test.ts packages/agentplane/src/cli/run-cli.core.help-contract.test.ts packages/agentplane/src/cli/run-cli.core.group-root-usage.test.ts packages/agentplane/src/cli/run-cli/command-catalog.test.ts --hookTimeout 60000 --testTimeout 60000 -u`
  Result: pass
  Evidence: 6 test files passed, 43 tests passed, 1 snapshot written, and 1 snapshot updated while refreshing the new Codex help snapshot.
  Scope: bundled plugin installation, marketplace merge behavior, command catalog wiring, group-root usage, and help snapshots.

- Command: `bunx eslint packages/agentplane/src/commands/codex/plugin-install.ts packages/agentplane/src/commands/codex/plugin-install.test.ts packages/agentplane/src/cli/run-cli/commands/codex.ts packages/agentplane/src/cli/run-cli.core.codex-plugin.test.ts packages/agentplane/src/cli/run-cli.core.group-root-usage.test.ts packages/agentplane/src/cli/run-cli.core.help-contract.test.ts packages/agentplane/src/cli/run-cli.core.help-snap.test.ts packages/agentplane/src/cli/run-cli/command-catalog.test.ts packages/agentplane/src/cli/run-cli/command-catalog/core.ts packages/agentplane/src/cli/run-cli/commands/core.ts`
  Result: pass
  Evidence: no lint errors remained after the installer and command wiring fixes.
  Scope: style and static analysis for the touched TypeScript files.

- Command: `bunx vitest run packages/agentplane/src/commands/codex/plugin-install.test.ts packages/agentplane/src/cli/run-cli.core.codex-plugin.test.ts packages/agentplane/src/cli/run-cli.core.help-snap.test.ts packages/agentplane/src/cli/run-cli.core.help-contract.test.ts packages/agentplane/src/cli/run-cli.core.group-root-usage.test.ts packages/agentplane/src/cli/run-cli/command-catalog.test.ts --hookTimeout 60000 --testTimeout 60000`
  Result: pass
  Evidence: 6 test files passed and 43 tests passed on the final rerun after lint fixes.
  Scope: final regression confirmation for the bundled plugin install flow and CLI help surfaces.

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-17T08:53:27.873Z — VERIFY — ok

By: CODER

Note: Codex plugin installer, manifest metadata, and help surfaces verified with typecheck, targeted Vitest, and targeted ESLint.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-17T08:52:55.031Z, excerpt_hash=sha256:3adaa12f555e09f5f96fe0bdc467018f514b692734bf749c651f3fc9599dfcab

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Official public self-serve publishing for the Codex Plugin Directory is not available in the current OpenAI docs, so this implementation targets the supported local marketplace route only.
- The bundled manifest intentionally omits privacy-policy and terms URLs because the project does not currently publish canonical pages for those links.
- The plugin uses bundled SVG logo/icon assets plus a PNG screenshot copied from the docs surface; if Codex install UI later constrains asset formats more tightly, those assets may need a follow-up adjustment.

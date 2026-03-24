---
id: "202603241830-YR71H6"
title: "Harden recipe artifact prefix checks against path traversal"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "runner"
  - "recipes"
  - "security"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-24T18:31:17.147Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments:
  -
    author: "CODER"
    body: "Start: harden recipe writes_artifacts_to enforcement so external manifest paths are checked as normalized relative containment, not naive string prefixes, and traversal or absolute-path escapes fail deterministically."
events:
  -
    type: "status"
    at: "2026-03-24T18:31:17.774Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: harden recipe writes_artifacts_to enforcement so external manifest paths are checked as normalized relative containment, not naive string prefixes, and traversal or absolute-path escapes fail deterministically."
doc_version: 3
doc_updated_at: "2026-03-24T18:34:46.199Z"
doc_updated_by: "CODER"
description: "Replace lexical writes_artifacts_to prefix matching with normalized relative-path validation so external runner manifest paths cannot escape declared prefixes via ../ segments, duplicate separators, or absolute paths."
sections:
  Summary: |-
    Harden recipe artifact prefix checks against path traversal
    
    Replace lexical writes_artifacts_to prefix matching with normalized relative-path validation so external runner manifest paths cannot escape declared prefixes via ../ segments, duplicate separators, or absolute paths.
  Scope: |-
    - In scope: Replace lexical writes_artifacts_to prefix matching with normalized relative-path validation so external runner manifest paths cannot escape declared prefixes via ../ segments, duplicate separators, or absolute paths.
    - Out of scope: unrelated refactors not required for "Harden recipe artifact prefix checks against path traversal".
  Plan: |-
    1. Replace lexical writes_artifacts_to prefix matching with normalized relative-path containment checks that reject absolute paths, traversal segments, and other escaping forms.
    2. Add focused unit and adapter/integration coverage for paths like reports/../outside.txt, ../outside.txt, and absolute manifest paths so policy failures stay deterministic and source manifests remain preserved.
    3. Update runner docs only if the enforcement semantics need clearer wording after normalization.
  Verify Steps: |-
    1. Run bunx vitest run packages/agentplane/src/runner/result-manifest-policy.test.ts packages/agentplane/src/runner/adapters/custom.test.ts packages/agentplane/src/runner/adapters/codex.test.ts packages/agentplane/src/cli/run-cli.scenario.test.ts. Expected: traversal and absolute-path manifest entries fail deterministically while in-scope relative paths still pass.
    2. Run bun run --filter=agentplane build. Expected: the runner package builds cleanly after the path-normalization change.
    3. Inspect the updated writes_artifacts_to wording if docs changed. Expected: it describes normalized containment, not naive lexical prefix matching.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - writes_artifacts_to enforcement now normalizes runner-reported manifest paths before checking containment against declared prefixes.
    - Traversal forms, sibling-prefix collisions, backslash variants, and absolute paths now fail deterministically instead of slipping through naive string-prefix matching.
    - Invalid declared prefixes in the exported recipe env now surface as explicit runtime errors rather than silently disabling enforcement.
id_source: "generated"
---
## Summary

Harden recipe artifact prefix checks against path traversal

Replace lexical writes_artifacts_to prefix matching with normalized relative-path validation so external runner manifest paths cannot escape declared prefixes via ../ segments, duplicate separators, or absolute paths.

## Scope

- In scope: Replace lexical writes_artifacts_to prefix matching with normalized relative-path validation so external runner manifest paths cannot escape declared prefixes via ../ segments, duplicate separators, or absolute paths.
- Out of scope: unrelated refactors not required for "Harden recipe artifact prefix checks against path traversal".

## Plan

1. Replace lexical writes_artifacts_to prefix matching with normalized relative-path containment checks that reject absolute paths, traversal segments, and other escaping forms.
2. Add focused unit and adapter/integration coverage for paths like reports/../outside.txt, ../outside.txt, and absolute manifest paths so policy failures stay deterministic and source manifests remain preserved.
3. Update runner docs only if the enforcement semantics need clearer wording after normalization.

## Verify Steps

1. Run bunx vitest run packages/agentplane/src/runner/result-manifest-policy.test.ts packages/agentplane/src/runner/adapters/custom.test.ts packages/agentplane/src/runner/adapters/codex.test.ts packages/agentplane/src/cli/run-cli.scenario.test.ts. Expected: traversal and absolute-path manifest entries fail deterministically while in-scope relative paths still pass.
2. Run bun run --filter=agentplane build. Expected: the runner package builds cleanly after the path-normalization change.
3. Inspect the updated writes_artifacts_to wording if docs changed. Expected: it describes normalized containment, not naive lexical prefix matching.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- writes_artifacts_to enforcement now normalizes runner-reported manifest paths before checking containment against declared prefixes.
- Traversal forms, sibling-prefix collisions, backslash variants, and absolute paths now fail deterministically instead of slipping through naive string-prefix matching.
- Invalid declared prefixes in the exported recipe env now surface as explicit runtime errors rather than silently disabling enforcement.

---
id: "202605061518-ZJM8VR"
title: "Separate framework dev CLI help surface"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "cli"
  - "docs"
  - "framework"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-06T15:19:00.364Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-06T15:32:28.887Z"
  updated_by: "CODER"
  note: "Verified CLI help surface split: normal help hides release/framework and advanced maintenance commands, framework checkout help exposes Framework Dev, docs reference is fresh, focused tests and typecheck passed."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: implement CLI help surface split for installed project versus framework development commands, preserving dispatch compatibility and updating docs/tests."
events:
  -
    type: "status"
    at: "2026-05-06T15:19:21.278Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implement CLI help surface split for installed project versus framework development commands, preserving dispatch compatibility and updating docs/tests."
  -
    type: "verify"
    at: "2026-05-06T15:32:28.887Z"
    author: "CODER"
    state: "ok"
    note: "Verified CLI help surface split: normal help hides release/framework and advanced maintenance commands, framework checkout help exposes Framework Dev, docs reference is fresh, focused tests and typecheck passed."
doc_version: 3
doc_updated_at: "2026-05-06T15:32:28.939Z"
doc_updated_by: "CODER"
description: "Hide AgentPlane framework-maintainer commands such as release from the default installed-project command surface, expose them only in framework checkout/dev help, and organize command help to reduce agent cognitive load."
sections:
  Summary: |-
    Separate framework dev CLI help surface
    
    Hide AgentPlane framework-maintainer commands such as release from the default installed-project command surface, expose them only in framework checkout/dev help, and organize command help to reduce agent cognitive load.
  Scope: |-
    - In scope: Hide AgentPlane framework-maintainer commands such as release from the default installed-project command surface, expose them only in framework checkout/dev help, and organize command help to reduce agent cognitive load.
    - Out of scope: unrelated refactors not required for "Separate framework dev CLI help surface".
  Plan: |-
    1. Audit command catalog/help rendering and existing framework checkout detection.
    2. Add command visibility/surface metadata and filter default help/docs output by installed-project vs framework-dev context.
    3. Move `release` and other framework-maintainer commands out of normal help into a dedicated framework/dev surface while keeping dispatch compatibility.
    4. Reorganize help grouping/naming so agents see project workflow commands before framework maintenance commands.
    5. Update user command docs to document normal vs framework-dev surfaces.
    6. Verify with focused CLI help tests, generated docs checks, typecheck or targeted project tests, `ap doctor`, and policy routing.
  Verify Steps: |-
    - `ap help` outside framework-dev context does not show framework-maintainer commands such as `release`.
    - Framework checkout/dev context exposes those commands under a dedicated framework/dev surface.
    - Existing command dispatch remains backward-compatible for migrated commands.
    - Generated CLI docs reflect the intended surface split and hierarchy.
    - Run focused CLI help tests, docs CLI freshness/checks, TypeScript checks as needed, `ap doctor`, and `node .agentplane/policy/check-routing.mjs`.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-06T15:32:28.887Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified CLI help surface split: normal help hides release/framework and advanced maintenance commands, framework checkout help exposes Framework Dev, docs reference is fresh, focused tests and typecheck passed.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-06T15:19:21.278Z, excerpt_hash=sha256:6277c9b98bc45bc22381e3b4ab68af1b4709308ead9b1d847150a1f50a33df02
    
    Details:
    
    Command: bunx vitest run packages/agentplane/src/cli/run-cli/command-catalog.test.ts packages/agentplane/src/cli/run-cli.core.help-contract.test.ts packages/agentplane/src/cli/spec/help-render.test.ts packages/agentplane/src/cli/run-cli.core.docs-cli.test.ts | Result: pass | Evidence: 4 files, 17 tests passed. Command: bun run typecheck | Result: pass. Command: bun run docs:cli:check | Result: pass, generated CLI reference up to date. Command: ap --root <tmp> help | Result: pass, no release/Framework Dev in normal output. Command: ap help | Result: pass, Framework Dev includes release/docs cli/workflow. Command: git diff --check && bun run framework:dev:bootstrap && ap doctor && node .agentplane/policy/check-routing.mjs | Result: pass, doctor OK and policy routing OK.
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605061518-ZJM8VR-cli-help-surfaces/.agentplane/tasks/202605061518-ZJM8VR/blueprint/resolved-snapshot.json
    - old_digest: 8a5049127a55b14e97c2bee7924d679c6e76f45885c3059f7e6f05bee45d6328
    - current_digest: 8a5049127a55b14e97c2bee7924d679c6e76f45885c3059f7e6f05bee45d6328
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605061518-ZJM8VR
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---

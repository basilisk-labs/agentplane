---
id: "202605311941-K4FCKS"
title: "Design and scaffold Hermes adapter"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 18
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
verify:
  - "ap doctor"
  - "bunx vitest run packages/agentplane/src/commands/hermes"
  - "node .agentplane/policy/check-routing.mjs"
plan_approval:
  state: "approved"
  updated_at: "2026-05-31T20:39:33.128Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-31T20:52:30.460Z"
  updated_by: "CODER"
  note: "Verified CI guard fix after commit 8d55becc7: bun run lint:core passed; bunx vitest run packages/agentplane/src/commands/hermes passed; bunx vitest run legacy-cli-regressions, bun-compiled-cli smoke, and targeted release-smoke passed; bun run test:fast passed with 336 files / 2003 tests; format/schema/docs checks passed."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-05-31T20:42:06.835Z"
  updated_by: "EVALUATOR"
  note: "Hermes adapter executor, lifecycle callback client, docs, and vendorable Hermes Agentplane recipe are implemented and locally verified."
  evaluated_sha: "d9d8684c1db31c21aeefd2480c58d876b1e7f356"
  blueprint_digest: "d8d874faab06b06f8a8617d021f8f519d8d6a3329c16aa740e57a351cf92b306"
  evidence_refs:
    - ".agentplane/tasks/202605311941-K4FCKS/README.md"
    - ".agentplane/tasks/202605311941-K4FCKS/quality/20260531-204206835-recovery-context/quality-report.json"
    - ".agentplane/tasks/202605311941-K4FCKS/quality/20260531-204206835-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202605311941-K4FCKS/quality/20260531-204206835-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202605311941-K4FCKS/blueprint/resolved-snapshot.json"
    - "node .agentplane/policy/check-routing.mjs"
    - "bunx vitest run packages/agentplane/src/commands/hermes"
    - "bun run --filter=agentplane build"
    - "bun run docs:cli:check"
    - "bun run docs:recipes:check"
    - "bun run format:changed"
    - "recipe install/add/explain smoke with temporary AGENTPLANE_HOME"
  findings:
    - "Agentplane now exposes route-gated Hermes supervision with one allowlisted step per claim, Hermes lifecycle dry-run/comment/block/complete plumbing, lane registry diagnostics, generated CLI docs, and a Hermes Agentplane recipe package that installs/adds/explains from a local archive."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: implementing the approved Hermes adapter documentation and initial command scaffold in the dedicated branch_pr worktree."
  -
    author: "CODER"
    body: "Start: Continue after approved scope expansion by implementing Hermes supervisor lifecycle command and publish-ready Hermes Agentplane recipe assets."
events:
  -
    type: "status"
    at: "2026-05-31T19:42:09.810Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implementing the approved Hermes adapter documentation and initial command scaffold in the dedicated branch_pr worktree."
  -
    type: "verify"
    at: "2026-05-31T19:49:23.310Z"
    author: "CODER"
    state: "ok"
    note: "Verified Hermes adapter scaffold and documentation. Commands passed: node .agentplane/policy/check-routing.mjs; ap doctor (OK with two unrelated historical DONE-task commit warnings); bunx vitest run packages/agentplane/src/commands/hermes (1 file, 3 tests); bun run --filter=agentplane build; bun run format:changed."
  -
    type: "verify"
    at: "2026-05-31T19:50:39.533Z"
    author: "CODER"
    state: "ok"
    note: "Final verification passed after CLI reference generation. Commands: node .agentplane/policy/check-routing.mjs (pass); ap doctor (pass, with two unrelated historical DONE-task commit warnings); bunx vitest run packages/agentplane/src/commands/hermes (1 file, 3 tests pass); bun run --filter=agentplane build (pass); bun run docs:cli:check (pass); bun run format:changed (pass)."
  -
    type: "verify"
    at: "2026-05-31T19:53:19.134Z"
    author: "CODER"
    state: "ok"
    note: "Verified on current head 1732aab54827: node .agentplane/policy/check-routing.mjs passed; ap doctor passed with two unrelated historical DONE-task warnings; bunx vitest run packages/agentplane/src/commands/hermes passed; bun run --filter=agentplane build passed; bun run docs:cli:check passed; bun run format:changed passed."
  -
    type: "verify"
    at: "2026-05-31T19:57:54.769Z"
    author: "CODER"
    state: "ok"
    note: "Verified on current Hermes adapter scaffold: node import check for integrations/hermes-agentplane-plugin passed; node .agentplane/policy/check-routing.mjs passed; bunx vitest run packages/agentplane/src/commands/hermes passed; bun run format:changed passed. Earlier full checks also passed: ap doctor, bun run --filter=agentplane build, bun run docs:cli:check."
  -
    type: "verify"
    at: "2026-05-31T20:14:03.224Z"
    author: "CODER"
    state: "ok"
    note: "Verified Hermes plugin shim and image requirements update: remote Hermes image smoke passed with PYTHONPATH=/opt/hermes (plugin registers CLI command, patches kanban_db.dispatch_once, treats agentplane-coder as spawnable, extracts Agentplane task id); bunx vitest run packages/agentplane/src/commands/hermes passed; node import check for integrations/hermes-agentplane-plugin/src/index.mjs passed; node .agentplane/policy/check-routing.mjs passed; bun run format:changed passed."
  -
    type: "status"
    at: "2026-05-31T20:39:41.701Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Start: Continue after approved scope expansion by implementing Hermes supervisor lifecycle command and publish-ready Hermes Agentplane recipe assets."
  -
    type: "verify"
    at: "2026-05-31T20:40:45.104Z"
    author: "CODER"
    state: "ok"
    note: "Verified Hermes executor/lifecycle and recipe integration: node .agentplane/policy/check-routing.mjs passed; bunx vitest run packages/agentplane/src/commands/hermes passed; bun run --filter=agentplane build passed; bun run docs:cli:check passed; bun run docs:recipes:check passed; bun run format:changed passed; git diff --check and submodule diff --check passed; recipe archive install/add/explain smoke passed with temporary AGENTPLANE_HOME."
  -
    type: "verify"
    at: "2026-05-31T20:41:34.518Z"
    author: "CODER"
    state: "ok"
    note: "Verified after commit 71b1e0af1: policy routing, Hermes vitest suite, agentplane build, CLI docs check, recipes inventory check, changed-format check, git diff checks, and Hermes recipe install/add/explain smoke all passed. Submodule recipe commit ed7fea3 is included via updated submodule pointer."
  -
    type: "verify"
    at: "2026-05-31T20:52:30.460Z"
    author: "CODER"
    state: "ok"
    note: "Verified CI guard fix after commit 8d55becc7: bun run lint:core passed; bunx vitest run packages/agentplane/src/commands/hermes passed; bunx vitest run legacy-cli-regressions, bun-compiled-cli smoke, and targeted release-smoke passed; bun run test:fast passed with 336 files / 2003 tests; format/schema/docs checks passed."
doc_version: 3
doc_updated_at: "2026-05-31T20:52:30.478Z"
doc_updated_by: "CODER"
description: "Document the target Hermes Agentplane adapter architecture and add an initial repo-local scaffold for Agentplane-owned Hermes supervision commands without creating an external repository."
sections:
  Summary: |-
    Design and scaffold Hermes adapter

    Document the target Hermes Agentplane adapter architecture and add an initial repo-local scaffold for Agentplane-owned Hermes supervision commands without creating an external repository.
  Scope: |-
    - In scope: Document the target Hermes Agentplane adapter architecture and add an initial repo-local scaffold for Agentplane-owned Hermes supervision commands without creating an external repository.
    - Out of scope: unrelated refactors not required for "Design and scaffold Hermes adapter".
  Plan: "Expand the Hermes adapter beyond scaffold: add Agentplane hermes supervise execution mode for one allowlisted route step; add Hermes lifecycle command helpers for comment/block/complete/heartbeat through Hermes CLI; enhance doctor to inspect ARKADY_LANE_REGISTRY/AGENTPLANE_BIN/Hermes CLI availability; add tests for executor/registry behavior; create and document a Hermes worker recipe for prompt integration; refresh PR artifacts and verification."
  Verify Steps: |-
    1. Run `node .agentplane/policy/check-routing.mjs`. Expected: policy routing passes.
    2. Run `bunx vitest run packages/agentplane/src/commands/hermes`. Expected: Hermes adapter executor, doctor, and registry tests pass.
    3. Run `bun run --filter=agentplane build`. Expected: command specs and executor code typecheck.
    4. Run `bun run docs:cli:check`. Expected: generated CLI reference is current.
    5. Run `bun run recipes:check` if available, otherwise run the nearest recipe/schema check. Expected: Hermes recipe validates.
    6. Run `bun run format:changed`. Expected: changed docs, recipes, and TypeScript pass Prettier.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-31T19:49:23.310Z — VERIFY — ok

    By: CODER

    Note: Verified Hermes adapter scaffold and documentation. Commands passed: node .agentplane/policy/check-routing.mjs; ap doctor (OK with two unrelated historical DONE-task commit warnings); bunx vitest run packages/agentplane/src/commands/hermes (1 file, 3 tests); bun run --filter=agentplane build; bun run format:changed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-31T19:48:45.548Z, excerpt_hash=sha256:aca8f2f27a23dee5790e9cae2ef6de72da26462f301820005b05c5a6917c1ccf

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605311941-K4FCKS-design-and-scaffold-hermes-adapter/.agentplane/tasks/202605311941-K4FCKS/blueprint/resolved-snapshot.json
    - old_digest: d8d874faab06b06f8a8617d021f8f519d8d6a3329c16aa740e57a351cf92b306
    - current_digest: d8d874faab06b06f8a8617d021f8f519d8d6a3329c16aa740e57a351cf92b306
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605311941-K4FCKS

    ### 2026-05-31T19:50:39.533Z — VERIFY — ok

    By: CODER

    Note: Final verification passed after CLI reference generation. Commands: node .agentplane/policy/check-routing.mjs (pass); ap doctor (pass, with two unrelated historical DONE-task commit warnings); bunx vitest run packages/agentplane/src/commands/hermes (1 file, 3 tests pass); bun run --filter=agentplane build (pass); bun run docs:cli:check (pass); bun run format:changed (pass).
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-31T19:49:23.327Z, excerpt_hash=sha256:aca8f2f27a23dee5790e9cae2ef6de72da26462f301820005b05c5a6917c1ccf

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605311941-K4FCKS-design-and-scaffold-hermes-adapter/.agentplane/tasks/202605311941-K4FCKS/blueprint/resolved-snapshot.json
    - old_digest: d8d874faab06b06f8a8617d021f8f519d8d6a3329c16aa740e57a351cf92b306
    - current_digest: d8d874faab06b06f8a8617d021f8f519d8d6a3329c16aa740e57a351cf92b306
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605311941-K4FCKS

    ### 2026-05-31T19:53:19.134Z — VERIFY — ok

    By: CODER

    Note: Verified on current head 1732aab54827: node .agentplane/policy/check-routing.mjs passed; ap doctor passed with two unrelated historical DONE-task warnings; bunx vitest run packages/agentplane/src/commands/hermes passed; bun run --filter=agentplane build passed; bun run docs:cli:check passed; bun run format:changed passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-31T19:50:39.578Z, excerpt_hash=sha256:aca8f2f27a23dee5790e9cae2ef6de72da26462f301820005b05c5a6917c1ccf

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605311941-K4FCKS-design-and-scaffold-hermes-adapter/.agentplane/tasks/202605311941-K4FCKS/blueprint/resolved-snapshot.json
    - old_digest: d8d874faab06b06f8a8617d021f8f519d8d6a3329c16aa740e57a351cf92b306
    - current_digest: d8d874faab06b06f8a8617d021f8f519d8d6a3329c16aa740e57a351cf92b306
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605311941-K4FCKS

    ### 2026-05-31T19:57:54.769Z — VERIFY — ok

    By: CODER

    Note: Verified on current Hermes adapter scaffold: node import check for integrations/hermes-agentplane-plugin passed; node .agentplane/policy/check-routing.mjs passed; bunx vitest run packages/agentplane/src/commands/hermes passed; bun run format:changed passed. Earlier full checks also passed: ap doctor, bun run --filter=agentplane build, bun run docs:cli:check.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-31T19:53:19.153Z, excerpt_hash=sha256:aca8f2f27a23dee5790e9cae2ef6de72da26462f301820005b05c5a6917c1ccf

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605311941-K4FCKS-design-and-scaffold-hermes-adapter/.agentplane/tasks/202605311941-K4FCKS/blueprint/resolved-snapshot.json
    - old_digest: d8d874faab06b06f8a8617d021f8f519d8d6a3329c16aa740e57a351cf92b306
    - current_digest: d8d874faab06b06f8a8617d021f8f519d8d6a3329c16aa740e57a351cf92b306
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605311941-K4FCKS

    ### 2026-05-31T20:14:03.224Z — VERIFY — ok

    By: CODER

    Note: Verified Hermes plugin shim and image requirements update: remote Hermes image smoke passed with PYTHONPATH=/opt/hermes (plugin registers CLI command, patches kanban_db.dispatch_once, treats agentplane-coder as spawnable, extracts Agentplane task id); bunx vitest run packages/agentplane/src/commands/hermes passed; node import check for integrations/hermes-agentplane-plugin/src/index.mjs passed; node .agentplane/policy/check-routing.mjs passed; bun run format:changed passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-31T19:57:54.788Z, excerpt_hash=sha256:aca8f2f27a23dee5790e9cae2ef6de72da26462f301820005b05c5a6917c1ccf

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605311941-K4FCKS-design-and-scaffold-hermes-adapter/.agentplane/tasks/202605311941-K4FCKS/blueprint/resolved-snapshot.json
    - old_digest: d8d874faab06b06f8a8617d021f8f519d8d6a3329c16aa740e57a351cf92b306
    - current_digest: d8d874faab06b06f8a8617d021f8f519d8d6a3329c16aa740e57a351cf92b306
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605311941-K4FCKS

    ### 2026-05-31T20:40:45.104Z — VERIFY — ok

    By: CODER

    Note: Verified Hermes executor/lifecycle and recipe integration: node .agentplane/policy/check-routing.mjs passed; bunx vitest run packages/agentplane/src/commands/hermes passed; bun run --filter=agentplane build passed; bun run docs:cli:check passed; bun run docs:recipes:check passed; bun run format:changed passed; git diff --check and submodule diff --check passed; recipe archive install/add/explain smoke passed with temporary AGENTPLANE_HOME.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-31T20:39:41.701Z, excerpt_hash=sha256:a6da8b7be6bed358a22ef2f57a9ae1336dfe6a913e5827f085ea06178689b33d

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605311941-K4FCKS-design-and-scaffold-hermes-adapter/.agentplane/tasks/202605311941-K4FCKS/blueprint/resolved-snapshot.json
    - old_digest: d8d874faab06b06f8a8617d021f8f519d8d6a3329c16aa740e57a351cf92b306
    - current_digest: d8d874faab06b06f8a8617d021f8f519d8d6a3329c16aa740e57a351cf92b306
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605311941-K4FCKS

    ### 2026-05-31T20:41:34.518Z — VERIFY — ok

    By: CODER

    Note: Verified after commit 71b1e0af1: policy routing, Hermes vitest suite, agentplane build, CLI docs check, recipes inventory check, changed-format check, git diff checks, and Hermes recipe install/add/explain smoke all passed. Submodule recipe commit ed7fea3 is included via updated submodule pointer.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-31T20:40:45.123Z, excerpt_hash=sha256:a6da8b7be6bed358a22ef2f57a9ae1336dfe6a913e5827f085ea06178689b33d

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605311941-K4FCKS-design-and-scaffold-hermes-adapter/.agentplane/tasks/202605311941-K4FCKS/blueprint/resolved-snapshot.json
    - old_digest: d8d874faab06b06f8a8617d021f8f519d8d6a3329c16aa740e57a351cf92b306
    - current_digest: d8d874faab06b06f8a8617d021f8f519d8d6a3329c16aa740e57a351cf92b306
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605311941-K4FCKS

    ### 2026-05-31T20:52:30.460Z — VERIFY — ok

    By: CODER

    Note: Verified CI guard fix after commit 8d55becc7: bun run lint:core passed; bunx vitest run packages/agentplane/src/commands/hermes passed; bunx vitest run legacy-cli-regressions, bun-compiled-cli smoke, and targeted release-smoke passed; bun run test:fast passed with 336 files / 2003 tests; format/schema/docs checks passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-31T20:41:34.536Z, excerpt_hash=sha256:a6da8b7be6bed358a22ef2f57a9ae1336dfe6a913e5827f085ea06178689b33d

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605311941-K4FCKS-design-and-scaffold-hermes-adapter/.agentplane/tasks/202605311941-K4FCKS/blueprint/resolved-snapshot.json
    - old_digest: d8d874faab06b06f8a8617d021f8f519d8d6a3329c16aa740e57a351cf92b306
    - current_digest: d8d874faab06b06f8a8617d021f8f519d8d6a3329c16aa740e57a351cf92b306
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605311941-K4FCKS

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Hermes Agentplane recipe is cataloged in the submodule and validates locally; public catalog signing still requires the agentplane-recipes production signing key before remote users can trust the updated index.
      Impact: Agentplane can now expose a deterministic Hermes worker supervisor surface and a vendorable prompt recipe, while production publication remains gated by the signed catalog release process.
      Resolution: Commit recipe source, archive, catalog index, docs inventory, CLI command docs, and tests; leave signing as a release/publishing gate because private signing material is not available in this workspace.

    - Observation: The code and recipe artifacts are committed; public remote recipe availability still depends on signed agentplane-recipes catalog publication with the production key.
      Impact: Task branch contains the Agentplane CLI executor/lifecycle surface plus vendorable Hermes prompt recipe assets and generated docs.
      Resolution: Recorded post-commit verification so PR artifacts can reference current HEAD.

    - Observation: Hosted failures were caused by command-layer lint and legacy process.argv usage in the Hermes command; local equivalents now pass.
      Impact: PR should rerun verify-static and verify-unit without the previous failures.
      Resolution: Replaced process.argv access with resolveAgentplaneBinPath, adjusted route parsing and switch style to project lint rules, and revalidated locally.
id_source: "generated"
---
## Summary

Design and scaffold Hermes adapter

Document the target Hermes Agentplane adapter architecture and add an initial repo-local scaffold for Agentplane-owned Hermes supervision commands without creating an external repository.

## Scope

- In scope: Document the target Hermes Agentplane adapter architecture and add an initial repo-local scaffold for Agentplane-owned Hermes supervision commands without creating an external repository.
- Out of scope: unrelated refactors not required for "Design and scaffold Hermes adapter".

## Plan

Expand the Hermes adapter beyond scaffold: add Agentplane hermes supervise execution mode for one allowlisted route step; add Hermes lifecycle command helpers for comment/block/complete/heartbeat through Hermes CLI; enhance doctor to inspect ARKADY_LANE_REGISTRY/AGENTPLANE_BIN/Hermes CLI availability; add tests for executor/registry behavior; create and document a Hermes worker recipe for prompt integration; refresh PR artifacts and verification.

## Verify Steps

1. Run `node .agentplane/policy/check-routing.mjs`. Expected: policy routing passes.
2. Run `bunx vitest run packages/agentplane/src/commands/hermes`. Expected: Hermes adapter executor, doctor, and registry tests pass.
3. Run `bun run --filter=agentplane build`. Expected: command specs and executor code typecheck.
4. Run `bun run docs:cli:check`. Expected: generated CLI reference is current.
5. Run `bun run recipes:check` if available, otherwise run the nearest recipe/schema check. Expected: Hermes recipe validates.
6. Run `bun run format:changed`. Expected: changed docs, recipes, and TypeScript pass Prettier.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-31T19:49:23.310Z — VERIFY — ok

By: CODER

Note: Verified Hermes adapter scaffold and documentation. Commands passed: node .agentplane/policy/check-routing.mjs; ap doctor (OK with two unrelated historical DONE-task commit warnings); bunx vitest run packages/agentplane/src/commands/hermes (1 file, 3 tests); bun run --filter=agentplane build; bun run format:changed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-31T19:48:45.548Z, excerpt_hash=sha256:aca8f2f27a23dee5790e9cae2ef6de72da26462f301820005b05c5a6917c1ccf

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605311941-K4FCKS-design-and-scaffold-hermes-adapter/.agentplane/tasks/202605311941-K4FCKS/blueprint/resolved-snapshot.json
- old_digest: d8d874faab06b06f8a8617d021f8f519d8d6a3329c16aa740e57a351cf92b306
- current_digest: d8d874faab06b06f8a8617d021f8f519d8d6a3329c16aa740e57a351cf92b306
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605311941-K4FCKS

### 2026-05-31T19:50:39.533Z — VERIFY — ok

By: CODER

Note: Final verification passed after CLI reference generation. Commands: node .agentplane/policy/check-routing.mjs (pass); ap doctor (pass, with two unrelated historical DONE-task commit warnings); bunx vitest run packages/agentplane/src/commands/hermes (1 file, 3 tests pass); bun run --filter=agentplane build (pass); bun run docs:cli:check (pass); bun run format:changed (pass).
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-31T19:49:23.327Z, excerpt_hash=sha256:aca8f2f27a23dee5790e9cae2ef6de72da26462f301820005b05c5a6917c1ccf

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605311941-K4FCKS-design-and-scaffold-hermes-adapter/.agentplane/tasks/202605311941-K4FCKS/blueprint/resolved-snapshot.json
- old_digest: d8d874faab06b06f8a8617d021f8f519d8d6a3329c16aa740e57a351cf92b306
- current_digest: d8d874faab06b06f8a8617d021f8f519d8d6a3329c16aa740e57a351cf92b306
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605311941-K4FCKS

### 2026-05-31T19:53:19.134Z — VERIFY — ok

By: CODER

Note: Verified on current head 1732aab54827: node .agentplane/policy/check-routing.mjs passed; ap doctor passed with two unrelated historical DONE-task warnings; bunx vitest run packages/agentplane/src/commands/hermes passed; bun run --filter=agentplane build passed; bun run docs:cli:check passed; bun run format:changed passed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-31T19:50:39.578Z, excerpt_hash=sha256:aca8f2f27a23dee5790e9cae2ef6de72da26462f301820005b05c5a6917c1ccf

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605311941-K4FCKS-design-and-scaffold-hermes-adapter/.agentplane/tasks/202605311941-K4FCKS/blueprint/resolved-snapshot.json
- old_digest: d8d874faab06b06f8a8617d021f8f519d8d6a3329c16aa740e57a351cf92b306
- current_digest: d8d874faab06b06f8a8617d021f8f519d8d6a3329c16aa740e57a351cf92b306
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605311941-K4FCKS

### 2026-05-31T19:57:54.769Z — VERIFY — ok

By: CODER

Note: Verified on current Hermes adapter scaffold: node import check for integrations/hermes-agentplane-plugin passed; node .agentplane/policy/check-routing.mjs passed; bunx vitest run packages/agentplane/src/commands/hermes passed; bun run format:changed passed. Earlier full checks also passed: ap doctor, bun run --filter=agentplane build, bun run docs:cli:check.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-31T19:53:19.153Z, excerpt_hash=sha256:aca8f2f27a23dee5790e9cae2ef6de72da26462f301820005b05c5a6917c1ccf

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605311941-K4FCKS-design-and-scaffold-hermes-adapter/.agentplane/tasks/202605311941-K4FCKS/blueprint/resolved-snapshot.json
- old_digest: d8d874faab06b06f8a8617d021f8f519d8d6a3329c16aa740e57a351cf92b306
- current_digest: d8d874faab06b06f8a8617d021f8f519d8d6a3329c16aa740e57a351cf92b306
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605311941-K4FCKS

### 2026-05-31T20:14:03.224Z — VERIFY — ok

By: CODER

Note: Verified Hermes plugin shim and image requirements update: remote Hermes image smoke passed with PYTHONPATH=/opt/hermes (plugin registers CLI command, patches kanban_db.dispatch_once, treats agentplane-coder as spawnable, extracts Agentplane task id); bunx vitest run packages/agentplane/src/commands/hermes passed; node import check for integrations/hermes-agentplane-plugin/src/index.mjs passed; node .agentplane/policy/check-routing.mjs passed; bun run format:changed passed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-31T19:57:54.788Z, excerpt_hash=sha256:aca8f2f27a23dee5790e9cae2ef6de72da26462f301820005b05c5a6917c1ccf

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605311941-K4FCKS-design-and-scaffold-hermes-adapter/.agentplane/tasks/202605311941-K4FCKS/blueprint/resolved-snapshot.json
- old_digest: d8d874faab06b06f8a8617d021f8f519d8d6a3329c16aa740e57a351cf92b306
- current_digest: d8d874faab06b06f8a8617d021f8f519d8d6a3329c16aa740e57a351cf92b306
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605311941-K4FCKS

### 2026-05-31T20:40:45.104Z — VERIFY — ok

By: CODER

Note: Verified Hermes executor/lifecycle and recipe integration: node .agentplane/policy/check-routing.mjs passed; bunx vitest run packages/agentplane/src/commands/hermes passed; bun run --filter=agentplane build passed; bun run docs:cli:check passed; bun run docs:recipes:check passed; bun run format:changed passed; git diff --check and submodule diff --check passed; recipe archive install/add/explain smoke passed with temporary AGENTPLANE_HOME.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-31T20:39:41.701Z, excerpt_hash=sha256:a6da8b7be6bed358a22ef2f57a9ae1336dfe6a913e5827f085ea06178689b33d

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605311941-K4FCKS-design-and-scaffold-hermes-adapter/.agentplane/tasks/202605311941-K4FCKS/blueprint/resolved-snapshot.json
- old_digest: d8d874faab06b06f8a8617d021f8f519d8d6a3329c16aa740e57a351cf92b306
- current_digest: d8d874faab06b06f8a8617d021f8f519d8d6a3329c16aa740e57a351cf92b306
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605311941-K4FCKS

### 2026-05-31T20:41:34.518Z — VERIFY — ok

By: CODER

Note: Verified after commit 71b1e0af1: policy routing, Hermes vitest suite, agentplane build, CLI docs check, recipes inventory check, changed-format check, git diff checks, and Hermes recipe install/add/explain smoke all passed. Submodule recipe commit ed7fea3 is included via updated submodule pointer.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-31T20:40:45.123Z, excerpt_hash=sha256:a6da8b7be6bed358a22ef2f57a9ae1336dfe6a913e5827f085ea06178689b33d

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605311941-K4FCKS-design-and-scaffold-hermes-adapter/.agentplane/tasks/202605311941-K4FCKS/blueprint/resolved-snapshot.json
- old_digest: d8d874faab06b06f8a8617d021f8f519d8d6a3329c16aa740e57a351cf92b306
- current_digest: d8d874faab06b06f8a8617d021f8f519d8d6a3329c16aa740e57a351cf92b306
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605311941-K4FCKS

### 2026-05-31T20:52:30.460Z — VERIFY — ok

By: CODER

Note: Verified CI guard fix after commit 8d55becc7: bun run lint:core passed; bunx vitest run packages/agentplane/src/commands/hermes passed; bunx vitest run legacy-cli-regressions, bun-compiled-cli smoke, and targeted release-smoke passed; bun run test:fast passed with 336 files / 2003 tests; format/schema/docs checks passed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-31T20:41:34.536Z, excerpt_hash=sha256:a6da8b7be6bed358a22ef2f57a9ae1336dfe6a913e5827f085ea06178689b33d

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605311941-K4FCKS-design-and-scaffold-hermes-adapter/.agentplane/tasks/202605311941-K4FCKS/blueprint/resolved-snapshot.json
- old_digest: d8d874faab06b06f8a8617d021f8f519d8d6a3329c16aa740e57a351cf92b306
- current_digest: d8d874faab06b06f8a8617d021f8f519d8d6a3329c16aa740e57a351cf92b306
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605311941-K4FCKS

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Hermes Agentplane recipe is cataloged in the submodule and validates locally; public catalog signing still requires the agentplane-recipes production signing key before remote users can trust the updated index.
  Impact: Agentplane can now expose a deterministic Hermes worker supervisor surface and a vendorable prompt recipe, while production publication remains gated by the signed catalog release process.
  Resolution: Commit recipe source, archive, catalog index, docs inventory, CLI command docs, and tests; leave signing as a release/publishing gate because private signing material is not available in this workspace.

- Observation: The code and recipe artifacts are committed; public remote recipe availability still depends on signed agentplane-recipes catalog publication with the production key.
  Impact: Task branch contains the Agentplane CLI executor/lifecycle surface plus vendorable Hermes prompt recipe assets and generated docs.
  Resolution: Recorded post-commit verification so PR artifacts can reference current HEAD.

- Observation: Hosted failures were caused by command-layer lint and legacy process.argv usage in the Hermes command; local equivalents now pass.
  Impact: PR should rerun verify-static and verify-unit without the previous failures.
  Resolution: Replaced process.argv access with resolveAgentplaneBinPath, adjusted route parsing and switch style to project lint rules, and revalidated locally.

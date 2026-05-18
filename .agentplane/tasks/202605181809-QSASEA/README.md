---
id: "202605181809-QSASEA"
title: "Reframe docs around agent-first usage"
status: "DOING"
priority: "med"
owner: "DOCS"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "docs"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-18T18:10:07.864Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-18T18:19:41.964Z"
  updated_by: "DOCS"
  note: "Verified on commit 9d2d9ad67: docs IA, sidebar, typecheck, and Docusaurus build-check passed for the agent-first docs restructure."
  attempts: 0
commit: null
comments:
  -
    author: "DOCS"
    body: "Start: updating public documentation navigation and onboarding copy to make agent handoff the default path, record AgentPlane as agent-agnostic through repo files and AGENTS.md, and split local context into a first-class docs section."
events:
  -
    type: "status"
    at: "2026-05-18T18:10:37.819Z"
    author: "DOCS"
    from: "TODO"
    to: "DOING"
    note: "Start: updating public documentation navigation and onboarding copy to make agent handoff the default path, record AgentPlane as agent-agnostic through repo files and AGENTS.md, and split local context into a first-class docs section."
  -
    type: "verify"
    at: "2026-05-18T18:17:06.312Z"
    author: "DOCS"
    state: "ok"
    note: "Docs IA update verified: check-routing, doctor, docs IA check, website typecheck, and website build-check passed after regenerating required social images."
  -
    type: "verify"
    at: "2026-05-18T18:19:41.964Z"
    author: "DOCS"
    state: "ok"
    note: "Verified on commit 9d2d9ad67: docs IA, sidebar, typecheck, and Docusaurus build-check passed for the agent-first docs restructure."
doc_version: 3
doc_updated_at: "2026-05-18T18:19:42.007Z"
doc_updated_by: "DOCS"
description: "Make documentation emphasize install/init/agent handoff as the default path, document AgentPlane as agent-agnostic through repo files and AGENTS.md, and separate local context into its own docs section."
sections:
  Summary: |-
    Reframe docs around agent-first usage

    Make documentation emphasize install/init/agent handoff as the default path, document AgentPlane as agent-agnostic through repo files and AGENTS.md, and separate local context into its own docs section.
  Scope: |-
    - In scope: Make documentation emphasize install/init/agent handoff as the default path, document AgentPlane as agent-agnostic through repo files and AGENTS.md, and separate local context into its own docs section.
    - Out of scope: unrelated refactors not required for "Reframe docs around agent-first usage".
  Plan: |-
    1. Reframe the public docs entry path around install -> init -> context init -> agent handoff instead of manual CLI usage.
    2. Add or update a user-facing handoff page that states AgentPlane is agent-agnostic because it operates through repository files, Git, and the universal AGENTS.md/CLAUDE.md policy gateway.
    3. Restructure docs navigation so local context is its own first-class section and manual CLI/reference material is clearly advanced.
    4. Update the docs index/overview/setup cross-links to match the new agent-first journey.
    5. Verify docs routing and repository health with the docs-policy checks.
  Verify Steps: |-
    1. Run node .agentplane/policy/check-routing.mjs. Expected: policy routing OK.
    2. Run ap doctor. Expected: doctor OK with no errors.
    3. Run bun run docs:ia:check. Expected: docs IA, sidebar coverage, and current path references are aligned.
    4. Run bun run docs:site:typecheck. Expected: website TypeScript passes.
    5. Run bun run docs:site:build:check. Expected: site content, social images, and Docusaurus build pass.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-18T18:17:06.312Z — VERIFY — ok

    By: DOCS

    Note: Docs IA update verified: check-routing, doctor, docs IA check, website typecheck, and website build-check passed after regenerating required social images.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-18T18:16:39.153Z, excerpt_hash=sha256:64b7f5fecbfb03d2ed5349c5c580d1fd90cba78a2cdc4063dbdd5b4d812d4779

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605181809-QSASEA-agent-first-docs-ia/.agentplane/tasks/202605181809-QSASEA/blueprint/resolved-snapshot.json
    - old_digest: a9bf21053d4107889e6c42706ccec1ce2be4c96dff87c8b2ba68610fda54f0d1
    - current_digest: a9bf21053d4107889e6c42706ccec1ce2be4c96dff87c8b2ba68610fda54f0d1
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605181809-QSASEA

    ### 2026-05-18T18:19:41.964Z — VERIFY — ok

    By: DOCS

    Note: Verified on commit 9d2d9ad67: docs IA, sidebar, typecheck, and Docusaurus build-check passed for the agent-first docs restructure.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-18T18:17:06.447Z, excerpt_hash=sha256:64b7f5fecbfb03d2ed5349c5c580d1fd90cba78a2cdc4063dbdd5b4d812d4779

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605181809-QSASEA-agent-first-docs-ia/.agentplane/tasks/202605181809-QSASEA/blueprint/resolved-snapshot.json
    - old_digest: a9bf21053d4107889e6c42706ccec1ce2be4c96dff87c8b2ba68610fda54f0d1
    - current_digest: a9bf21053d4107889e6c42706ccec1ce2be4c96dff87c8b2ba68610fda54f0d1
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605181809-QSASEA

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Updated public docs to make install/init/context init/agent handoff the default path; documented AgentPlane as agent-agnostic through repo files, Git, and AGENTS.md/CLAUDE.md; split Local context into its own docs/sidebar section.
      Impact: Readers are routed to agent-operated workflows first, while manual CLI material is framed as advanced operator/recovery/reference usage.
      Resolution: Ran node .agentplane/policy/check-routing.mjs, ap doctor, bun run docs:ia:check, bun run docs:site:typecheck, and bun run docs:site:build:check. Build-check required regenerated social images for the new/renamed docs routes.

    - Observation: PR #3903 is open for task/202605181809-QSASEA/agent-first-docs-ia; GitHub checks are running.
      Impact: Task evidence now points to the committed docs restructure and open PR artifact.
      Resolution: Local verification commands already passed before commit; PR metadata recorded after ap pr open.
id_source: "generated"
---
## Summary

Reframe docs around agent-first usage

Make documentation emphasize install/init/agent handoff as the default path, document AgentPlane as agent-agnostic through repo files and AGENTS.md, and separate local context into its own docs section.

## Scope

- In scope: Make documentation emphasize install/init/agent handoff as the default path, document AgentPlane as agent-agnostic through repo files and AGENTS.md, and separate local context into its own docs section.
- Out of scope: unrelated refactors not required for "Reframe docs around agent-first usage".

## Plan

1. Reframe the public docs entry path around install -> init -> context init -> agent handoff instead of manual CLI usage.
2. Add or update a user-facing handoff page that states AgentPlane is agent-agnostic because it operates through repository files, Git, and the universal AGENTS.md/CLAUDE.md policy gateway.
3. Restructure docs navigation so local context is its own first-class section and manual CLI/reference material is clearly advanced.
4. Update the docs index/overview/setup cross-links to match the new agent-first journey.
5. Verify docs routing and repository health with the docs-policy checks.

## Verify Steps

1. Run node .agentplane/policy/check-routing.mjs. Expected: policy routing OK.
2. Run ap doctor. Expected: doctor OK with no errors.
3. Run bun run docs:ia:check. Expected: docs IA, sidebar coverage, and current path references are aligned.
4. Run bun run docs:site:typecheck. Expected: website TypeScript passes.
5. Run bun run docs:site:build:check. Expected: site content, social images, and Docusaurus build pass.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-18T18:17:06.312Z — VERIFY — ok

By: DOCS

Note: Docs IA update verified: check-routing, doctor, docs IA check, website typecheck, and website build-check passed after regenerating required social images.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-18T18:16:39.153Z, excerpt_hash=sha256:64b7f5fecbfb03d2ed5349c5c580d1fd90cba78a2cdc4063dbdd5b4d812d4779

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605181809-QSASEA-agent-first-docs-ia/.agentplane/tasks/202605181809-QSASEA/blueprint/resolved-snapshot.json
- old_digest: a9bf21053d4107889e6c42706ccec1ce2be4c96dff87c8b2ba68610fda54f0d1
- current_digest: a9bf21053d4107889e6c42706ccec1ce2be4c96dff87c8b2ba68610fda54f0d1
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605181809-QSASEA

### 2026-05-18T18:19:41.964Z — VERIFY — ok

By: DOCS

Note: Verified on commit 9d2d9ad67: docs IA, sidebar, typecheck, and Docusaurus build-check passed for the agent-first docs restructure.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-18T18:17:06.447Z, excerpt_hash=sha256:64b7f5fecbfb03d2ed5349c5c580d1fd90cba78a2cdc4063dbdd5b4d812d4779

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605181809-QSASEA-agent-first-docs-ia/.agentplane/tasks/202605181809-QSASEA/blueprint/resolved-snapshot.json
- old_digest: a9bf21053d4107889e6c42706ccec1ce2be4c96dff87c8b2ba68610fda54f0d1
- current_digest: a9bf21053d4107889e6c42706ccec1ce2be4c96dff87c8b2ba68610fda54f0d1
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605181809-QSASEA

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Updated public docs to make install/init/context init/agent handoff the default path; documented AgentPlane as agent-agnostic through repo files, Git, and AGENTS.md/CLAUDE.md; split Local context into its own docs/sidebar section.
  Impact: Readers are routed to agent-operated workflows first, while manual CLI material is framed as advanced operator/recovery/reference usage.
  Resolution: Ran node .agentplane/policy/check-routing.mjs, ap doctor, bun run docs:ia:check, bun run docs:site:typecheck, and bun run docs:site:build:check. Build-check required regenerated social images for the new/renamed docs routes.

- Observation: PR #3903 is open for task/202605181809-QSASEA/agent-first-docs-ia; GitHub checks are running.
  Impact: Task evidence now points to the committed docs restructure and open PR artifact.
  Resolution: Local verification commands already passed before commit; PR metadata recorded after ap pr open.

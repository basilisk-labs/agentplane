---
id: "202605081758-TEPFPR"
title: "Reposition public copy around Git-native AI evidence"
status: "DOING"
priority: "med"
owner: "DOCS"
revision: 1
origin:
  system: "manual"
depends_on: []
tags:
  - "docs"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-08T17:58:38.653Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-08T18:34:27.528Z"
  updated_by: "DOCS"
  note: "Command: node .agentplane/policy/check-routing.mjs; Result: pass; Evidence: policy routing OK; Scope: policy routing after docs/site copy changes; Links: .agentplane/policy/*.md. Command: ap doctor; Result: pass; Evidence: doctor OK with zero errors and zero warnings; Scope: task worktree runtime and branch_pr drift. Command: bun run docs:ia:check; Result: pass; Evidence: docs IA, sidebar coverage, and current path references are aligned; Scope: docs/index.mdx and website/sidebars.ts. Command: bun run docs:site:typecheck; Result: pass; Evidence: website TypeScript check exited 0; Scope: Docusaurus config and homepage TSX. Command: bun run docs:site:build; Result: pass; Evidence: static files generated successfully; only existing dependency warning from vscode-languageserver-types; Scope: docs site routes, anchors, and content. Command: bun run docs:site:check:design; Result: pass; Evidence: DESIGN.md compliance check passed; Scope: public website content. Command: git diff --check; Result: pass; Evidence: no whitespace errors; Scope: all changed files."
commit: null
comments:
  -
    author: "DOCS"
    body: "Start: update the public README, website, and docs copy in the task worktree to reposition AgentPlane as Git-native infrastructure for traceable AI work while preserving current shipped CLI and ACR behavior."
events:
  -
    type: "status"
    at: "2026-05-08T18:03:56.114Z"
    author: "DOCS"
    from: "TODO"
    to: "DOING"
    note: "Start: update the public README, website, and docs copy in the task worktree to reposition AgentPlane as Git-native infrastructure for traceable AI work while preserving current shipped CLI and ACR behavior."
  -
    type: "verify"
    at: "2026-05-08T18:34:27.528Z"
    author: "DOCS"
    state: "ok"
    note: "Command: node .agentplane/policy/check-routing.mjs; Result: pass; Evidence: policy routing OK; Scope: policy routing after docs/site copy changes; Links: .agentplane/policy/*.md. Command: ap doctor; Result: pass; Evidence: doctor OK with zero errors and zero warnings; Scope: task worktree runtime and branch_pr drift. Command: bun run docs:ia:check; Result: pass; Evidence: docs IA, sidebar coverage, and current path references are aligned; Scope: docs/index.mdx and website/sidebars.ts. Command: bun run docs:site:typecheck; Result: pass; Evidence: website TypeScript check exited 0; Scope: Docusaurus config and homepage TSX. Command: bun run docs:site:build; Result: pass; Evidence: static files generated successfully; only existing dependency warning from vscode-languageserver-types; Scope: docs site routes, anchors, and content. Command: bun run docs:site:check:design; Result: pass; Evidence: DESIGN.md compliance check passed; Scope: public website content. Command: git diff --check; Result: pass; Evidence: no whitespace errors; Scope: all changed files."
doc_version: 3
doc_updated_at: "2026-05-08T18:34:27.561Z"
doc_updated_by: "DOCS"
description: "Update AgentPlane public README, website, and docs copy from audit-layer CLI framing toward Git-native infrastructure for traceable AI work, with ACR as the main evidence artifact."
sections:
  Summary: |-
    Reposition public copy around Git-native AI evidence
    
    Update AgentPlane public README, website, and docs copy from audit-layer CLI framing toward Git-native infrastructure for traceable AI work, with ACR as the main evidence artifact.
  Scope: |-
    - In scope: Update AgentPlane public README, website, and docs copy from audit-layer CLI framing toward Git-native infrastructure for traceable AI work, with ACR as the main evidence artifact.
    - Out of scope: unrelated refactors not required for "Reposition public copy around Git-native AI evidence".
  Plan: |-
    1. Update the public positioning spine in README/package README, website homepage copy, docs landing/overview, manifesto, compare, and ACR-oriented docs so AgentPlane is framed as Git-native infrastructure for traceable AI work.
    2. Keep the change docs/text-only: no CLI behavior, schema, backend, or policy-code changes.
    3. Preserve existing trust signals: local-first, no hosted runtime, no telemetry, no vendor lock-in, lifecycle, and ACR commands.
    4. Verify with policy routing, doctor, formatting/diff checks, and docs-site build or targeted docs-site checks available in this checkout.
  Verify Steps: |-
    1. Review the requested outcome for "Reposition public copy around Git-native AI evidence". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-08T18:34:27.528Z — VERIFY — ok
    
    By: DOCS
    
    Note: Command: node .agentplane/policy/check-routing.mjs; Result: pass; Evidence: policy routing OK; Scope: policy routing after docs/site copy changes; Links: .agentplane/policy/*.md. Command: ap doctor; Result: pass; Evidence: doctor OK with zero errors and zero warnings; Scope: task worktree runtime and branch_pr drift. Command: bun run docs:ia:check; Result: pass; Evidence: docs IA, sidebar coverage, and current path references are aligned; Scope: docs/index.mdx and website/sidebars.ts. Command: bun run docs:site:typecheck; Result: pass; Evidence: website TypeScript check exited 0; Scope: Docusaurus config and homepage TSX. Command: bun run docs:site:build; Result: pass; Evidence: static files generated successfully; only existing dependency warning from vscode-languageserver-types; Scope: docs site routes, anchors, and content. Command: bun run docs:site:check:design; Result: pass; Evidence: DESIGN.md compliance check passed; Scope: public website content. Command: git diff --check; Result: pass; Evidence: no whitespace errors; Scope: all changed files.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-08T18:03:56.175Z, excerpt_hash=sha256:836e6df46e8a730b8b4c8f56af6c7c2c32673a25daca74530102d38704e9020b
    
    Details:
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605081758-TEPFPR-git-native-evidence-copy/.agentplane/tasks/202605081758-TEPFPR/blueprint/resolved-snapshot.json
    - old_digest: 9eabdad35284395dcc91ab2b840f43962a4b4a0103922b43dc0f1378d535b1f7
    - current_digest: 9eabdad35284395dcc91ab2b840f43962a4b4a0103922b43dc0f1378d535b1f7
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605081758-TEPFPR
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---

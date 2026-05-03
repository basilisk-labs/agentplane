---
id: "202605031315-E9WZ3G"
title: "Add comparison manifesto and LLM discovery docs"
result_summary: "Comparison manifesto and LLM discovery docs are present in the public surface."
status: "DONE"
priority: "high"
owner: "DOCS"
revision: 6
origin:
  system: "manual"
depends_on:
  - "202605031315-GPW9P5"
tags:
  - "discovery"
  - "docs"
  - "positioning"
verify:
  - "bun run docs:site:build"
  - "rg -n 'compare|manifesto|audit layer|Claude Code|Codex|Cursor|Aider' docs website/static/llms.txt website/static/llms-full.txt"
plan_approval:
  state: "approved"
  updated_at: "2026-05-03T13:15:58.140Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-03T13:41:18.199Z"
  updated_by: "DOCS"
  note: "Added docs/manifesto.mdx and docs/compare.mdx, placed them in the docs index/sidebar, and refreshed llms.txt plus llms-full.txt around the audit-layer positioning. Verified with bun run docs:site:typecheck, bun run docs:site:build, and git diff --check."
commit:
  hash: "ee25574b22cb4f28cb70658eef40d913b9d64f63"
  message: "📝 E9WZ3G docs: add comparison discovery surfaces"
comments:
  -
    author: "DOCS"
    body: "Start: add comparison, manifesto, and LLM discovery surfaces required by the updated website navigation."
  -
    author: "INTEGRATOR"
    body: "Verified: Comparison manifesto and LLM discovery docs landed through PR #819; task verification was recorded before merge."
events:
  -
    type: "status"
    at: "2026-05-03T13:36:32.948Z"
    author: "DOCS"
    from: "TODO"
    to: "DOING"
    note: "Start: add comparison, manifesto, and LLM discovery surfaces required by the updated website navigation."
  -
    type: "verify"
    at: "2026-05-03T13:41:18.199Z"
    author: "DOCS"
    state: "ok"
    note: "Added docs/manifesto.mdx and docs/compare.mdx, placed them in the docs index/sidebar, and refreshed llms.txt plus llms-full.txt around the audit-layer positioning. Verified with bun run docs:site:typecheck, bun run docs:site:build, and git diff --check."
  -
    type: "status"
    at: "2026-05-03T14:43:22.574Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: Comparison manifesto and LLM discovery docs landed through PR #819; task verification was recorded before merge."
doc_version: 3
doc_updated_at: "2026-05-03T14:43:22.574Z"
doc_updated_by: "INTEGRATOR"
description: "Add repository-owned discovery docs from the audit: compare page, manifesto page, llms.txt rewrite, and llms-full freshness or generation contract so LLM and search surfaces teach the same model."
sections:
  Summary: |-
    Add comparison manifesto and LLM discovery docs
    
    Add repository-owned discovery docs from the audit: compare page, manifesto page, llms.txt rewrite, and llms-full freshness or generation contract so LLM and search surfaces teach the same model.
  Scope: |-
    - In scope: Add repository-owned discovery docs from the audit: compare page, manifesto page, llms.txt rewrite, and llms-full freshness or generation contract so LLM and search surfaces teach the same model.
    - Out of scope: unrelated refactors not required for "Add comparison manifesto and LLM discovery docs".
  Plan: "Add docs/compare.mdx and docs/manifesto.mdx or the current equivalent docs-site paths, wire navigation as needed, rewrite website/static/llms.txt, and make llms-full.txt fresh via existing generation or a narrow freshness contract. Acceptance: compare/manifesto are discoverable, LLM surfaces use the same canonical model, docs-site build passes."
  Verify Steps: |-
    1. Review the requested outcome for "Add comparison manifesto and LLM discovery docs". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-03T13:41:18.199Z — VERIFY — ok
    
    By: DOCS
    
    Note: Added docs/manifesto.mdx and docs/compare.mdx, placed them in the docs index/sidebar, and refreshed llms.txt plus llms-full.txt around the audit-layer positioning. Verified with bun run docs:site:typecheck, bun run docs:site:build, and git diff --check.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-03T13:36:32.948Z, excerpt_hash=sha256:a0254289a785c6444cd8d50bdf8a107bb80e2ca28a0da6c29c0330c152b9330e
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: The updated Docusaurus build resolves the previously broken /docs/manifesto and /docs/compare links.
      Impact: Human and LLM discovery surfaces now explain AgentPlane as a repository-native audit layer and route readers to comparison and manifesto pages.
      Resolution: Keep future copy changes grounded in repo-local lifecycle artifacts rather than vendor-specific claims.
id_source: "generated"
---
## Summary

Add comparison manifesto and LLM discovery docs

Add repository-owned discovery docs from the audit: compare page, manifesto page, llms.txt rewrite, and llms-full freshness or generation contract so LLM and search surfaces teach the same model.

## Scope

- In scope: Add repository-owned discovery docs from the audit: compare page, manifesto page, llms.txt rewrite, and llms-full freshness or generation contract so LLM and search surfaces teach the same model.
- Out of scope: unrelated refactors not required for "Add comparison manifesto and LLM discovery docs".

## Plan

Add docs/compare.mdx and docs/manifesto.mdx or the current equivalent docs-site paths, wire navigation as needed, rewrite website/static/llms.txt, and make llms-full.txt fresh via existing generation or a narrow freshness contract. Acceptance: compare/manifesto are discoverable, LLM surfaces use the same canonical model, docs-site build passes.

## Verify Steps

1. Review the requested outcome for "Add comparison manifesto and LLM discovery docs". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-03T13:41:18.199Z — VERIFY — ok

By: DOCS

Note: Added docs/manifesto.mdx and docs/compare.mdx, placed them in the docs index/sidebar, and refreshed llms.txt plus llms-full.txt around the audit-layer positioning. Verified with bun run docs:site:typecheck, bun run docs:site:build, and git diff --check.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-03T13:36:32.948Z, excerpt_hash=sha256:a0254289a785c6444cd8d50bdf8a107bb80e2ca28a0da6c29c0330c152b9330e

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: The updated Docusaurus build resolves the previously broken /docs/manifesto and /docs/compare links.
  Impact: Human and LLM discovery surfaces now explain AgentPlane as a repository-native audit layer and route readers to comparison and manifesto pages.
  Resolution: Keep future copy changes grounded in repo-local lifecycle artifacts rather than vendor-specific claims.

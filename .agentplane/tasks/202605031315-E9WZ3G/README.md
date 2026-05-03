---
id: "202605031315-E9WZ3G"
title: "Add comparison manifesto and LLM discovery docs"
status: "TODO"
priority: "high"
owner: "DOCS"
revision: 3
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
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-05-03T13:15:45.516Z"
doc_updated_by: "PLANNER"
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
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
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
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

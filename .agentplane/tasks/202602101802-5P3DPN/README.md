---
id: "202602101802-5P3DPN"
title: "Docs IA: updated table of contents and navigation"
status: "DOING"
priority: "high"
owner: "DOCS"
depends_on: []
tags:
  - "docs"
verify: []
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments:
  -
    author: "DOCS"
    body: "Start: Update documentation TOC and Mintlify navigation to reflect current code, workflows, and policy boundaries."
events:
  -
    type: "status"
    at: "2026-02-10T18:04:47.043Z"
    author: "DOCS"
    from: "TODO"
    to: "DOING"
    note: "Start: Update documentation TOC and Mintlify navigation to reflect current code, workflows, and policy boundaries."
doc_version: 2
doc_updated_at: "2026-02-10T18:06:40.652Z"
doc_updated_by: "DOCS"
description: "Produce a code-informed documentation outline (TOC) and update docs navigation (docs/index.mdx, docs/docs.json) to match."
id_source: "generated"
---
## Summary

Update the documentation information architecture (TOC) and Mintlify navigation to reflect the current CLI, workflows, and policy.

## Scope


## Plan

1. Update docs/index.mdx reading order and links (add CLI reference, move Breaking changes to Start here).\n2. Update docs/docs.json navigation to expose generated CLI reference and match reading order.\n3. Validate JSON and ensure referenced pages exist.

## Risks

Risk: nav and index drift causes users to miss required docs or hit dead links. Mitigation: keep both files updated together and validate referenced pages exist.

## Verify Steps

- Confirm docs/docs.json parses as valid JSON.\n- Confirm docs/user/cli-reference.generated.mdx exists and is linked from docs/index.mdx and docs/docs.json.\n- Confirm docs/index.mdx links match existing pages.

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan


## Notes

### Implementation Notes\n- Updated docs index reading order and links: docs/index.mdx\n- Exposed generated CLI reference in Mintlify nav: docs/docs.json\n\n### Verification\n- docs/docs.json parses as JSON.\n- docs/user/cli-reference.generated.mdx exists.

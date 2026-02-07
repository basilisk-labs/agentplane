---
id: "202602071329-PYB8DV"
title: "AP-UX-01: Improve help banner (version + release date)"
status: "DONE"
priority: "high"
owner: "CODER"
depends_on:
  - "202602071328-RDATF2"
tags:
  - "roadmap"
  - "cli"
  - "ux"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-02-07T13:30:30.862Z"
  updated_by: "USER"
  note: "Approved in chat on 2026-02-07."
verification:
  state: "ok"
  updated_at: "2026-02-07T13:45:54.959Z"
  updated_by: "CODER"
  note: "Help banner now shows version and release commit date in this repo; help remains usable without tags."
commit:
  hash: "e71a31c97ca36005bd5f550329a2727f9ccd7a47"
  message: "✅ 7H5M54 git: ignore and untrack .agentplane/tasks.json"
comments:
  -
    author: "CODER"
    body: "Start: Update CLI help banner to show version and release date."
  -
    author: "CODER"
    body: "Verified: Help banner now reports CLI version and the v<version> tag commit date; tagline is concise and English-only."
events: []
doc_version: 2
doc_updated_at: "2026-02-07T13:46:02.880Z"
doc_updated_by: "CODER"
description: "Replace 'agentplane (v1 prototype)' in help with: current version from packages/agentplane/package.json + release commit date for tag v<version> + a short, more informative tagline."
id_source: "generated"
---
## Summary


## Scope


## Plan

1. Locate the current banner line in CLI help.
2. Read version from packages/agentplane/package.json.
3. Resolve release commit date from git tag v<version>.
4. Update banner format: version + release date + a short informative tagline.
5. Update/add tests to lock the new banner.

## Risks


## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-07T13:45:54.959Z — VERIFY — ok

By: CODER

Note: Help banner now shows version and release commit date in this repo; help remains usable without tags.

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

---
id: "202601270958-Z5B9P9"
title: "Prepare npm publishable packages"
status: "DONE"
priority: "high"
owner: "CODER"
depends_on: []
tags:
  - "nodejs"
  - "packaging"
  - "npm"
verify:
  - "bun run ci"
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
commit:
  hash: "4216dbc965593e84b35a8f9e5245566dfd0308e4"
  message: "✨ Z5B9P9 prepare npm publish"
comments:
  -
    author: "CODER"
    body: "Start: preparing agentplane packages for npm publish (bin shim, files whitelist, metadata)."
  -
    author: "CODER"
    body: "Start: implementing npm publish readiness for agentplane CLI (bin shim, files, metadata, npm pack checks)."
  -
    author: "CODER"
    body: "verified: bun run ci passed | details: npm pack 202601041253-00001 produces clean tarballs for agentplane and @agentplane/core."
doc_version: 2
doc_updated_at: "2026-02-03T12:09:06.703Z"
doc_updated_by: "agentplane"
description: "Prepare packages/agentplane (and its runtime deps) so it can be published to npmjs via npm publish: add bin shim, files whitelist, package metadata, and verify npm pack output."
---
## Summary

Prepare the repository for npm publication: make the agentplane CLI package publishable with an npm-compatible bin shim and files whitelist, and ensure npm pack produces a correct tarball.

## Scope

- Add `packages/agentplane/bin/agentplane.js` npm CLI shim
- Update `packages/agentplane/package.json` for publishing (bin, files, engines, scripts)
- Make runtime dependency packages publishable where needed (e.g. @agentplane/core)
- Validate with `npm pack 202601041253-00001`

## Risks

- Publishing a workspace package requires all workspace: protocol deps to resolve to publishable versions.
- Ensure published artifacts do not depend on bun at runtime (only build-time).

## Verify Steps

- `bun run ci`
- `npm pack 202601041253-00001` in `packages/core` and `packages/agentplane` shows expected files (bin + dist + README + LICENSE)

## Rollback Plan

- Revert commits; restore package.json privacy flags and bin entries
- Remove `bin/` shims and package READMEs

## Plan


## Verification

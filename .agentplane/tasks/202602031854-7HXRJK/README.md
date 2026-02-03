---
id: "202602031854-7HXRJK"
title: "Push branch and diagnose git push hang"
status: "DOING"
priority: "med"
owner: "ORCHESTRATOR"
depends_on: []
tags: ["git"]
verify: []
commit: null
comments:
  - { author: "ORCHESTRATOR", body: "Start: prepare to push current branch, diagnose any push hangs, and fix hooks if needed." }
doc_version: 2
doc_updated_at: "2026-02-03T19:06:24.928Z"
doc_updated_by: "ORCHESTRATOR"
description: "Push current branch to origin. If push hangs, inspect git push implementation and hooks, fix root cause, and retry."
id_source: "generated"
---
## Summary

Fixed the pre-push release-notes hook hang by ensuring it receives git push stdin.

## Scope

Updated pre-push release-notes command in lefthook config to pass stdin.

## Risks

If lefthook ignores use_stdin, the hook could still block on TTY; otherwise behavior is unchanged for non-tag pushes.

## Verify Steps

1. Run `git push origin main` and confirm pre-push completes without hanging.
2. Confirm `release-notes` and `test-full` pass in lefthook output.

## Rollback Plan

Revert `lefthook.yml` to remove `use_stdin` from the pre-push release-notes command.

---
id: "202601270932-B4MVS9"
title: "Enforce code quality via git hooks + CI"
status: "DONE"
priority: "high"
owner: "CODER"
depends_on: []
tags:
  - "nodejs"
  - "tooling"
  - "quality"
  - "ci"
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
  hash: "4fa3ff495bc81a2a18c5ab9232f8df0a8d951cc3"
  message: "✨ B4MVS9 enforce quality via hooks + CI"
comments:
  -
    author: "CODER"
    body: "Start: adding git hooks + GitHub Actions to enforce bun run ci for all changes."
  -
    author: "CODER"
    body: "Start: implementing lefthook pre-commit hook and GitHub Actions CI to enforce bun run ci."
  -
    author: "CODER"
    body: "verified: bun run ci passed | details: lefthook + GitHub Actions CI enforce quality gates."
doc_version: 2
doc_updated_at: "2026-02-03T12:09:05.824Z"
doc_updated_by: "agentplane"
description: "Add local git hooks (pre-commit/pre-push) and a GitHub Actions workflow to enforce bun-based quality gates (format/lint/typecheck/tests/coverage) for all changes."
---
## Summary

Enforce bun-based quality gates by adding local git hooks (lefthook) and CI (GitHub Actions) so formatting, linting, typecheck and coverage run automatically.

## Scope

- Add `lefthook` pre-commit hook that runs `bun run ci`
- Add GitHub Actions workflow that runs `bun run ci` on PRs and pushes to `main`
- Document how to install/restore hooks and how enforcement works

## Risks

- Local hooks can be bypassed with `--no-verify`; CI still enforces for PRs, but branch protection must be enabled in GitHub settings to block direct pushes.
- Running `bun run ci` on every commit may be slow for large changes; adjust hook scope only if it becomes a productivity issue.

## Verify Steps

- `bun install` installs hooks (or `bun run hooks:install`)
- `git commit` runs `bun run ci` via lefthook
- GitHub Actions workflow passes for a PR / push
- `bun run ci` passes locally

## Rollback Plan

- Remove `lefthook.yml` and the `lefthook` dependency
- Remove `postinstall` / `hooks:install` scripts from `package.json`
- Remove `.github/workflows/ci.yml`

## Plan


## Verification

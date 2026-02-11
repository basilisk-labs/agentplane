---
id: "202602110759-8479KY"
title: "Release v0.2.13"
result_summary: "Published v0.2.13 to npm after full local CI-equivalent gate and pushed release tag."
risk_level: "low"
status: "DONE"
priority: "high"
owner: "INTEGRATOR"
depends_on: []
tags:
  - "release"
  - "npm"
  - "cli"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-02-11T08:00:38.182Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved release execution for v0.2.13 with mandatory pre-release CI gate."
verification:
  state: "ok"
  updated_at: "2026-02-11T08:06:00.769Z"
  updated_by: "REVIEWER"
  note: "Release commit/tag were pushed and npm registry now serves 0.2.13 for both packages."
commit:
  hash: "a94f8f09a6626b34308fd1206e2e01eba3a3577c"
  message: "✨ release: v0.2.13"
comments:
  -
    author: "INTEGRATOR"
    body: "Start: execute CI-equivalent pre-release gate, patch release apply, npm publish for both packages, and post-publish registry validation for v0.2.13."
  -
    author: "INTEGRATOR"
    body: "Blocked: npm publish requires one-time password (EOTP) for package write operations; release commit/tag are already pushed, but npm registry publish cannot continue without an OTP code."
  -
    author: "INTEGRATOR"
    body: "Start: resumed release execution after npm passkey authentication; validating published versions and completing task closure for v0.2.13."
  -
    author: "INTEGRATOR"
    body: "Verified: release v0.2.13 completed with CI-equivalent preflight and both npm packages published at 0.2.13; registry checks confirmed availability."
events:
  -
    type: "status"
    at: "2026-02-11T08:00:38.510Z"
    author: "INTEGRATOR"
    from: "TODO"
    to: "DOING"
    note: "Start: execute CI-equivalent pre-release gate, patch release apply, npm publish for both packages, and post-publish registry validation for v0.2.13."
  -
    type: "status"
    at: "2026-02-11T08:04:24.328Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "BLOCKED"
    note: "Blocked: npm publish requires one-time password (EOTP) for package write operations; release commit/tag are already pushed, but npm registry publish cannot continue without an OTP code."
  -
    type: "status"
    at: "2026-02-11T08:06:00.496Z"
    author: "INTEGRATOR"
    from: "BLOCKED"
    to: "DOING"
    note: "Start: resumed release execution after npm passkey authentication; validating published versions and completing task closure for v0.2.13."
  -
    type: "verify"
    at: "2026-02-11T08:06:00.769Z"
    author: "REVIEWER"
    state: "ok"
    note: "Release commit/tag were pushed and npm registry now serves 0.2.13 for both packages."
  -
    type: "status"
    at: "2026-02-11T08:06:01.061Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: release v0.2.13 completed with CI-equivalent preflight and both npm packages published at 0.2.13; registry checks confirmed availability."
doc_version: 2
doc_updated_at: "2026-02-11T08:06:01.061Z"
doc_updated_by: "INTEGRATOR"
description: "Run CI-equivalent preflight, generate/apply patch release, publish @agentplaneorg/core and agentplane to npm, and verify installed versions."
id_source: "generated"
---
## Summary

Publish patch release v0.2.13 after running the same CI-equivalent checks locally that GitHub CI runs, then publish both npm packages and verify published versions.

## Scope

In scope:
- Run `bun run release:ci-check` in repository root.
- Run release planning/apply for patch bump from v0.2.12 to v0.2.13.
- Publish `@agentplaneorg/core` and `agentplane` to npm.
- Validate published versions and close task with evidence.

Out of scope:
- Feature work unrelated to release process.
- Retroactive npm tag/version rewrites.

## Plan

1. Fill task documentation and start task execution.
2. Run `bun run release:ci-check`; stop and fix only release-blocking failures.
3. Generate release plan and release notes for v0.2.13.
4. Apply release (version bump, changelog/release note integration, commit, tag).
5. Publish both packages to npm.
6. Verify `npm view` versions and record evidence.

## Risks

- npm auth/session expiration can block publish.
- Local uncommitted changes can interfere with release apply.
- Tag/version mismatch can fail release commands.
Mitigation: verify clean tree before release steps, use explicit package publish commands, and validate registry versions after publish.

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-11T08:06:00.769Z — VERIFY — ok

By: REVIEWER

Note: Release commit/tag were pushed and npm registry now serves 0.2.13 for both packages.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-02-11T08:06:00.496Z, excerpt_hash=sha256:962fc66d0ddf5646d8b6c3f58e1dc41ee52b26704dec8f871b9c83a0ab6e4726

Details:

Checks run: bun run release:ci-check (pass), git push main+v0.2.13 (pass), npm view @agentplaneorg/core version=0.2.13, npm view agentplane version=0.2.13.

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

If release apply fails before publishing, reset only release task state and fix root cause without rewriting history. If publish partially fails, publish missing package with same version and re-verify. If irreversible publish problem occurs, document incident in task notes and release next patch with corrective fix.

## Context

Release flow must fail fast locally if build/lint/tests would fail in GitHub CI. This task uses the new `release:ci-check` gate before version bump/tag/publish, then validates npm registry versions.

## Verify Steps

- `bun run release:ci-check` exits 0.
- `agentplane release plan` targets v0.2.13 patch release.
- `agentplane release apply` creates release commit and `v0.2.13` tag.
- `npm publish` succeeds for `packages/core` and `packages/agentplane`.
- `npm view @agentplaneorg/core version` returns `0.2.13`.
- `npm view agentplane version` returns `0.2.13`.

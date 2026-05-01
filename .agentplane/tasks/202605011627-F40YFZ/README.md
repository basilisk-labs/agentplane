---
id: "202605011627-F40YFZ"
title: "Add GHCR release image module"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on:
  - "202605011626-HXH0R5"
tags:
  - "code"
  - "release"
verify:
  - "bun run release:distribution:check"
  - "docker build -t agentplane:release-smoke -f packages/agentplane/Dockerfile ."
plan_approval:
  state: "approved"
  updated_at: "2026-05-01T16:29:58.871Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-01T17:52:04.041Z"
  updated_by: "CODER"
  note: "GHCR release image module builds the AgentPlane container from the local release tarball artifact, pushes version/tag/latest tags in publish.yml, and uploads ghcr-module evidence."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: add GHCR image packaging and release workflow evidence from release-distribution.json."
events:
  -
    type: "status"
    at: "2026-05-01T17:27:30.196Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: add GHCR image packaging and release workflow evidence from release-distribution.json."
  -
    type: "verify"
    at: "2026-05-01T17:52:04.041Z"
    author: "CODER"
    state: "ok"
    note: "GHCR release image module builds the AgentPlane container from the local release tarball artifact, pushes version/tag/latest tags in publish.yml, and uploads ghcr-module evidence."
doc_version: 3
doc_updated_at: "2026-05-01T17:52:04.074Z"
doc_updated_by: "CODER"
description: "Add a release module that builds and publishes a versioned GHCR image for AgentPlane and verifies the container can run the CLI."
sections:
  Summary: |-
    Add GHCR release image module
    
    Add a release module that builds and publishes a versioned GHCR image for AgentPlane and verifies the container can run the CLI.
  Scope: |-
    - In scope: Add a release module that builds and publishes a versioned GHCR image for AgentPlane and verifies the container can run the CLI.
    - Out of scope: unrelated refactors not required for "Add GHCR release image module".
  Plan: "Plan: add a GHCR release image module, Dockerfile, image metadata labels, and workflow publication path that tags exact version, sha, and latest only after the release manifest is ready. Verification: distribution check and Docker build smoke when Docker is available."
  Verify Steps: |-
    1. Run `bun run release:distribution:check`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `docker build -t agentplane:release-smoke -f packages/agentplane/Dockerfile .`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-01T17:52:04.041Z — VERIFY — ok
    
    By: CODER
    
    Note: GHCR release image module builds the AgentPlane container from the local release tarball artifact, pushes version/tag/latest tags in publish.yml, and uploads ghcr-module evidence.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-01T17:27:30.196Z, excerpt_hash=sha256:7bf0b5d3b4d965cf1b88c3b90d1f8590f9ba78bd961f0f976f3c22b1b41454da
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Checks: bun run release:ghcr:check; bun run release:distribution:check; docker build -t agentplane:release-smoke -f packages/agentplane/Dockerfile .; docker run --rm agentplane:release-smoke --version => 0.4.0; bun run workflows:command-check; bun test packages/agentplane/src/commands/release/publish-workflow-contract.test.ts; bun run docs:scripts:check; bun run lint:core; node .agentplane/policy/check-routing.mjs; agentplane doctor; git diff --check.
      Impact: Next release publish job will produce a GHCR image and explicit ghcr-result.json evidence instead of stopping at npm/GitHub assets.
      Resolution: Docker build avoids registry checksum drift by using the same npm pack tarball artifact generated for the release candidate; GHCR publish uses packages: write permission and records published status after pushes.
id_source: "generated"
---
## Summary

Add GHCR release image module

Add a release module that builds and publishes a versioned GHCR image for AgentPlane and verifies the container can run the CLI.

## Scope

- In scope: Add a release module that builds and publishes a versioned GHCR image for AgentPlane and verifies the container can run the CLI.
- Out of scope: unrelated refactors not required for "Add GHCR release image module".

## Plan

Plan: add a GHCR release image module, Dockerfile, image metadata labels, and workflow publication path that tags exact version, sha, and latest only after the release manifest is ready. Verification: distribution check and Docker build smoke when Docker is available.

## Verify Steps

1. Run `bun run release:distribution:check`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `docker build -t agentplane:release-smoke -f packages/agentplane/Dockerfile .`. Expected: it succeeds and confirms the requested outcome for this task.
3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-01T17:52:04.041Z — VERIFY — ok

By: CODER

Note: GHCR release image module builds the AgentPlane container from the local release tarball artifact, pushes version/tag/latest tags in publish.yml, and uploads ghcr-module evidence.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-01T17:27:30.196Z, excerpt_hash=sha256:7bf0b5d3b4d965cf1b88c3b90d1f8590f9ba78bd961f0f976f3c22b1b41454da

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Checks: bun run release:ghcr:check; bun run release:distribution:check; docker build -t agentplane:release-smoke -f packages/agentplane/Dockerfile .; docker run --rm agentplane:release-smoke --version => 0.4.0; bun run workflows:command-check; bun test packages/agentplane/src/commands/release/publish-workflow-contract.test.ts; bun run docs:scripts:check; bun run lint:core; node .agentplane/policy/check-routing.mjs; agentplane doctor; git diff --check.
  Impact: Next release publish job will produce a GHCR image and explicit ghcr-result.json evidence instead of stopping at npm/GitHub assets.
  Resolution: Docker build avoids registry checksum drift by using the same npm pack tarball artifact generated for the release candidate; GHCR publish uses packages: write permission and records published status after pushes.

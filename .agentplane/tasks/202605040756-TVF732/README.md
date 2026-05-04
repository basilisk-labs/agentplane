---
id: "202605040756-TVF732"
title: "Refresh README header asset tagline"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "assets"
  - "website"
verify:
  - "shasum -a 256 docs/assets/header.png website/static/img/header.png website/static/img/og-image.png website/static/img/twitter-card.png website/static/img/hn-card.png"
plan_approval:
  state: "approved"
  updated_at: "2026-05-04T07:56:42.634Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-04T08:07:43.406Z"
  updated_by: "CODER"
  note: "README header asset now uses the current tagline and both committed copies match."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: refreshing the README header asset in the shared launch punch-list worktree and checking for existing generation scripts before changing binary assets."
events:
  -
    type: "status"
    at: "2026-05-04T07:57:20.299Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: refreshing the README header asset in the shared launch punch-list worktree and checking for existing generation scripts before changing binary assets."
  -
    type: "verify"
    at: "2026-05-04T08:07:43.406Z"
    author: "CODER"
    state: "ok"
    note: "README header asset now uses the current tagline and both committed copies match."
doc_version: 3
doc_updated_at: "2026-05-04T08:07:43.420Z"
doc_updated_by: "CODER"
description: "Regenerate the README header asset so the first GitHub visual matches the current tagline: The audit layer for coding agents."
sections:
  Summary: |-
    Refresh README header asset tagline
    
    Regenerate the README header asset so the first GitHub visual matches the current tagline: The audit layer for coding agents.
  Scope: |-
    - In scope: Regenerate the README header asset so the first GitHub visual matches the current tagline: The audit layer for coding agents.
    - Out of scope: unrelated refactors not required for "Refresh README header asset tagline".
  Plan: "Refresh docs/assets/header.png and website/static/img/header.png so the README header uses the current tagline, The audit layer for coding agents. Prefer an existing asset generator if present; otherwise make the smallest reproducible local asset update and record residual source-generation gap. Verify both header copies match each other and differ from the stale 170586-byte asset baseline."
  Verify Steps: |-
    1. file docs/assets/header.png website/static/img/header.png reports 1560 x 840 PNG assets.
    2. shasum -a 256 docs/assets/header.png website/static/img/header.png shows both copies match.
    3. shasum -a 256 docs/assets/header.png differs from the stale baseline bbf1aeedf59f306470542cff871ddc0246f546d364aabef2724934d629622a4e.
    4. Visual inspection confirms the current tagline: The audit layer for coding agents.
    5. node .agentplane/policy/check-routing.mjs passes.
    6. agentplane doctor passes.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-04T08:07:43.406Z — VERIFY — ok
    
    By: CODER
    
    Note: README header asset now uses the current tagline and both committed copies match.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-04T08:02:01.842Z, excerpt_hash=sha256:7ffc0e45e0b466968d9a164eb2dcc6ca14cda5070f735e9a053741d0c8b187b9
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Commands: magick website/static/img/og-image.png -resize 1560x780! -background white -gravity center -extent 1560x840 -depth 8 docs/assets/header.png; cp docs/assets/header.png website/static/img/header.png; file docs/assets/header.png website/static/img/header.png reported 1560 x 840 PNG; shasum -a 256 showed both copies at d93a29de773227700aea04f6512cce7773614a37f917c2c75a6a8488da213d6d, different from stale baseline bbf1aeedf59f306470542cff871ddc0246f546d364aabef2724934d629622a4e.
      Impact: T24/N3 header is no longer byte-identical stale asset; it reuses the current repo-local OG card brand pass.
      Resolution: No Discord or off-repo asset upload was attempted.
id_source: "generated"
---
## Summary

Refresh README header asset tagline

Regenerate the README header asset so the first GitHub visual matches the current tagline: The audit layer for coding agents.

## Scope

- In scope: Regenerate the README header asset so the first GitHub visual matches the current tagline: The audit layer for coding agents.
- Out of scope: unrelated refactors not required for "Refresh README header asset tagline".

## Plan

Refresh docs/assets/header.png and website/static/img/header.png so the README header uses the current tagline, The audit layer for coding agents. Prefer an existing asset generator if present; otherwise make the smallest reproducible local asset update and record residual source-generation gap. Verify both header copies match each other and differ from the stale 170586-byte asset baseline.

## Verify Steps

1. file docs/assets/header.png website/static/img/header.png reports 1560 x 840 PNG assets.
2. shasum -a 256 docs/assets/header.png website/static/img/header.png shows both copies match.
3. shasum -a 256 docs/assets/header.png differs from the stale baseline bbf1aeedf59f306470542cff871ddc0246f546d364aabef2724934d629622a4e.
4. Visual inspection confirms the current tagline: The audit layer for coding agents.
5. node .agentplane/policy/check-routing.mjs passes.
6. agentplane doctor passes.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-04T08:07:43.406Z — VERIFY — ok

By: CODER

Note: README header asset now uses the current tagline and both committed copies match.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-04T08:02:01.842Z, excerpt_hash=sha256:7ffc0e45e0b466968d9a164eb2dcc6ca14cda5070f735e9a053741d0c8b187b9

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Commands: magick website/static/img/og-image.png -resize 1560x780! -background white -gravity center -extent 1560x840 -depth 8 docs/assets/header.png; cp docs/assets/header.png website/static/img/header.png; file docs/assets/header.png website/static/img/header.png reported 1560 x 840 PNG; shasum -a 256 showed both copies at d93a29de773227700aea04f6512cce7773614a37f917c2c75a6a8488da213d6d, different from stale baseline bbf1aeedf59f306470542cff871ddc0246f546d364aabef2724934d629622a4e.
  Impact: T24/N3 header is no longer byte-identical stale asset; it reuses the current repo-local OG card brand pass.
  Resolution: No Discord or off-repo asset upload was attempted.

---
id: "202603231944-QEG6QB"
title: "Document runner network-policy removal and preserve global require_network docs"
result_summary: "docs: remove recipe runner network-policy claims"
status: "DONE"
priority: "med"
owner: "DOCS"
revision: 7
origin:
  system: "manual"
depends_on:
  - "202603231944-RFV5N9"
tags:
  - "docs"
  - "runner"
  - "recipes"
  - "policy"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-23T19:46:20.813Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-23T19:57:31.082Z"
  updated_by: "DOCS"
  note: "Command: bunx prettier --check docs/recipes-inventory.json docs/developer/recipes-spec.mdx docs/developer/recipes-how-it-works.mdx docs/developer/recipes-safety.mdx; Result: pass; Evidence: formatting passed on all touched docs surfaces. Scope: docs inventory and developer docs updated for the runner network-field removal. Command: rg -n '\"network\"|run_profile\\.network|require_network' docs/recipes-inventory.json docs/developer/recipes-spec.mdx docs/developer/recipes-how-it-works.mdx docs/developer/recipes-safety.mdx docs/user/configuration.mdx; Result: pass; Evidence: recipe inventory no longer contains run_profile.network, while docs still retain the global require_network guidance in the correct places. Scope: truthfulness of recipe-vs-global network policy documentation. Command: node .agentplane/policy/check-routing.mjs; Result: pass; Evidence: policy routing OK. Scope: docs/policy routing consistency. Command: AGENTPLANE_DEV_ALLOW_STALE_DIST=1 agentplane doctor; Result: pass; Evidence: doctor returned OK with informational findings only. Scope: installed/runtime docs consistency gate. Skipped: bunx vitest run packages/agentplane/src/cli/run-cli.core.help-snap.test.ts -u and CLI reference regeneration. Reason: no help text or CLI reference source changed in this task. Risk: low; command surface stayed unchanged and the task only updated developer docs plus inventory JSON. Approval: covered by the approved Q5 scope."
commit:
  hash: "fd64fe099c817af3ac545a4b3431e1283438b463"
  message: "✅ QEG6QB docs: done"
comments:
  -
    author: "DOCS"
    body: "Start: audit docs and CLI reference surfaces for any remaining recipe runner network-policy claims, update only the confirmed documentation gaps, and preserve the existing global require_network guidance unchanged."
  -
    author: "DOCS"
    body: "Verified: Updated the published recipe inventory and developer docs so recipe run_profile no longer claims a separate network policy, preserved the global require_network guidance, and confirmed the docs/runtime contract with formatting, routing, and doctor checks."
events:
  -
    type: "status"
    at: "2026-03-23T19:55:39.315Z"
    author: "DOCS"
    from: "TODO"
    to: "DOING"
    note: "Start: audit docs and CLI reference surfaces for any remaining recipe runner network-policy claims, update only the confirmed documentation gaps, and preserve the existing global require_network guidance unchanged."
  -
    type: "verify"
    at: "2026-03-23T19:57:31.082Z"
    author: "DOCS"
    state: "ok"
    note: "Command: bunx prettier --check docs/recipes-inventory.json docs/developer/recipes-spec.mdx docs/developer/recipes-how-it-works.mdx docs/developer/recipes-safety.mdx; Result: pass; Evidence: formatting passed on all touched docs surfaces. Scope: docs inventory and developer docs updated for the runner network-field removal. Command: rg -n '\"network\"|run_profile\\.network|require_network' docs/recipes-inventory.json docs/developer/recipes-spec.mdx docs/developer/recipes-how-it-works.mdx docs/developer/recipes-safety.mdx docs/user/configuration.mdx; Result: pass; Evidence: recipe inventory no longer contains run_profile.network, while docs still retain the global require_network guidance in the correct places. Scope: truthfulness of recipe-vs-global network policy documentation. Command: node .agentplane/policy/check-routing.mjs; Result: pass; Evidence: policy routing OK. Scope: docs/policy routing consistency. Command: AGENTPLANE_DEV_ALLOW_STALE_DIST=1 agentplane doctor; Result: pass; Evidence: doctor returned OK with informational findings only. Scope: installed/runtime docs consistency gate. Skipped: bunx vitest run packages/agentplane/src/cli/run-cli.core.help-snap.test.ts -u and CLI reference regeneration. Reason: no help text or CLI reference source changed in this task. Risk: low; command surface stayed unchanged and the task only updated developer docs plus inventory JSON. Approval: covered by the approved Q5 scope."
  -
    type: "status"
    at: "2026-03-23T19:57:51.554Z"
    author: "DOCS"
    from: "DOING"
    to: "DONE"
    note: "Verified: Updated the published recipe inventory and developer docs so recipe run_profile no longer claims a separate network policy, preserved the global require_network guidance, and confirmed the docs/runtime contract with formatting, routing, and doctor checks."
doc_version: 3
doc_updated_at: "2026-03-23T19:57:51.555Z"
doc_updated_by: "DOCS"
description: "Update docs and help text to clarify that global require_network still gates real network CLI operations while recipe runner no longer exposes a separate network policy contract."
sections:
  Summary: |-
    Document runner network-policy removal and preserve global require_network docs
    
    Update docs and help text to clarify that global require_network still gates real network CLI operations while recipe runner no longer exposes a separate network policy contract.
  Scope: |-
    - In scope: Update docs and help text to clarify that global require_network still gates real network CLI operations while recipe runner no longer exposes a separate network policy contract.
    - Out of scope: unrelated refactors not required for "Document runner network-policy removal and preserve global require_network docs".
  Plan: "1. Update user and developer docs to remove runner-level network policy claims. 2. Preserve and clarify the existing documentation for global require_network approval gates. 3. Refresh generated CLI/help references if needed. 4. Verify docs and references are aligned with the code contract."
  Verify Steps: "1. Run bunx vitest run packages/agentplane/src/cli/run-cli.core.help-snap.test.ts -u if help text changes. 2. Regenerate docs/user/cli-reference.generated.mdx if CLI reference output changes. 3. Confirm docs describe global require_network approval gates while runner recipe policy no longer claims a separate network restriction."
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    #### 2026-03-23T19:57:31.082Z — VERIFY — ok
    
    By: DOCS
    
    Note: Command: bunx prettier --check docs/recipes-inventory.json docs/developer/recipes-spec.mdx docs/developer/recipes-how-it-works.mdx docs/developer/recipes-safety.mdx; Result: pass; Evidence: formatting passed on all touched docs surfaces. Scope: docs inventory and developer docs updated for the runner network-field removal. Command: rg -n '"network"|run_profile\.network|require_network' docs/recipes-inventory.json docs/developer/recipes-spec.mdx docs/developer/recipes-how-it-works.mdx docs/developer/recipes-safety.mdx docs/user/configuration.mdx; Result: pass; Evidence: recipe inventory no longer contains run_profile.network, while docs still retain the global require_network guidance in the correct places. Scope: truthfulness of recipe-vs-global network policy documentation. Command: node .agentplane/policy/check-routing.mjs; Result: pass; Evidence: policy routing OK. Scope: docs/policy routing consistency. Command: AGENTPLANE_DEV_ALLOW_STALE_DIST=1 agentplane doctor; Result: pass; Evidence: doctor returned OK with informational findings only. Scope: installed/runtime docs consistency gate. Skipped: bunx vitest run packages/agentplane/src/cli/run-cli.core.help-snap.test.ts -u and CLI reference regeneration. Reason: no help text or CLI reference source changed in this task. Risk: low; command surface stayed unchanged and the task only updated developer docs plus inventory JSON. Approval: covered by the approved Q5 scope.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-23T19:55:39.318Z, excerpt_hash=sha256:904b79899910d23c0959017bd39308b29524be8a1702ab2a150f234ff507a03d
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Document runner network-policy removal and preserve global require_network docs

Update docs and help text to clarify that global require_network still gates real network CLI operations while recipe runner no longer exposes a separate network policy contract.

## Scope

- In scope: Update docs and help text to clarify that global require_network still gates real network CLI operations while recipe runner no longer exposes a separate network policy contract.
- Out of scope: unrelated refactors not required for "Document runner network-policy removal and preserve global require_network docs".

## Plan

1. Update user and developer docs to remove runner-level network policy claims. 2. Preserve and clarify the existing documentation for global require_network approval gates. 3. Refresh generated CLI/help references if needed. 4. Verify docs and references are aligned with the code contract.

## Verify Steps

1. Run bunx vitest run packages/agentplane/src/cli/run-cli.core.help-snap.test.ts -u if help text changes. 2. Regenerate docs/user/cli-reference.generated.mdx if CLI reference output changes. 3. Confirm docs describe global require_network approval gates while runner recipe policy no longer claims a separate network restriction.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-23T19:57:31.082Z — VERIFY — ok

By: DOCS

Note: Command: bunx prettier --check docs/recipes-inventory.json docs/developer/recipes-spec.mdx docs/developer/recipes-how-it-works.mdx docs/developer/recipes-safety.mdx; Result: pass; Evidence: formatting passed on all touched docs surfaces. Scope: docs inventory and developer docs updated for the runner network-field removal. Command: rg -n '"network"|run_profile\.network|require_network' docs/recipes-inventory.json docs/developer/recipes-spec.mdx docs/developer/recipes-how-it-works.mdx docs/developer/recipes-safety.mdx docs/user/configuration.mdx; Result: pass; Evidence: recipe inventory no longer contains run_profile.network, while docs still retain the global require_network guidance in the correct places. Scope: truthfulness of recipe-vs-global network policy documentation. Command: node .agentplane/policy/check-routing.mjs; Result: pass; Evidence: policy routing OK. Scope: docs/policy routing consistency. Command: AGENTPLANE_DEV_ALLOW_STALE_DIST=1 agentplane doctor; Result: pass; Evidence: doctor returned OK with informational findings only. Scope: installed/runtime docs consistency gate. Skipped: bunx vitest run packages/agentplane/src/cli/run-cli.core.help-snap.test.ts -u and CLI reference regeneration. Reason: no help text or CLI reference source changed in this task. Risk: low; command surface stayed unchanged and the task only updated developer docs plus inventory JSON. Approval: covered by the approved Q5 scope.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-23T19:55:39.318Z, excerpt_hash=sha256:904b79899910d23c0959017bd39308b29524be8a1702ab2a150f234ff507a03d

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

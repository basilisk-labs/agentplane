---
id: "202607270107-GRJSV6"
title: "Preserve authority-only tails during merged cleanup"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 9
origin:
  system: "manual"
depends_on: []
tags:
  - "post-merge-followup"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-07-27T01:07:38.771Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
  attempts: 0
commit: null
comments:
  -
    author: "ORCHESTRATOR"
    body: "Start: approved post-merge cleanup authority follow-up."
events:
  -
    type: "status"
    at: "2026-07-27T01:07:39.057Z"
    author: "ORCHESTRATOR"
    from: "TODO"
    to: "DOING"
    note: "Start: approved post-merge cleanup authority follow-up."
doc_version: 3
doc_updated_at: "2026-07-27T01:21:15.474Z"
doc_updated_by: "ORCHESTRATOR"
description: "Follow up RF13: permit targeted merged cleanup only when a local post-merge tail is proven authority-only against the provider-merged head, and classify hosted close finalization as local reversible after the merge and pre-merge closure are already durable."
sections:
  Summary: |-
    Preserve authority-only tails during merged cleanup

    Follow up RF13: permit targeted merged cleanup only when a local post-merge tail is proven authority-only against the provider-merged head, and classify hosted close finalization as local reversible after the merge and pre-merge closure are already durable.
  Scope: |-
    - In scope: Follow up RF13: permit targeted merged cleanup only when a local post-merge tail is proven authority-only against the provider-merged head, and classify hosted close finalization as local reversible after the merge and pre-merge closure are already durable.
    - Out of scope: unrelated refactors not required for "Preserve authority-only tails during merged cleanup".
  Plan: "1. CODER: add a narrowly scoped cleanup proof that accepts only a provider-merged task head followed by authority-only task README records; keep semantic or arbitrary post-merge tails blocked. 2. CODER: classify hosted-close finalization as local reversible because protected merge and task completion are already durable before cleanup. 3. TESTER: add regression coverage for accepted authority-only tails and rejected semantic tails, then run focused cleanup/authority checks. 4. EVALUATOR: record an independent pass against the new proof. 5. INTEGRATOR: merge the follow-up and rerun targeted cleanup for NWVCAG."
  Verify Steps: |-
    1. Run targeted cleanup proof tests. Expected: a provider-merged head followed only by authority-extension README commits is removable; a non-authority tail remains blocked.
    2. Run authority policy tests. Expected: task.hosted_close.finalize is local_reversible and requires no authority because protected merge and close evidence already exist.
    3. Run format, lint, type checks, and ci:contract. Expected: all pass without generated-artifact drift.
    4. Re-run RF13 targeted cleanup after integration. Expected: the previously blocked local authority-only tail is removed by the CLI, while no unrelated worktree or branch is touched.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
extensions:
  agentplane.side_effect_authority:
    audit:
      -
        actor: "USER"
        at: "2026-07-27T01:22:11.621Z"
        authorityDigest: "sha256:380140799ddcedbfce850b5b646d3e817edce64230776010aefcafcdccd42963"
        digest: "sha256:9ec49f000de2e8ff95112a6b97e4021284871adb8250a18f93de09d3c5520780"
        operationDigest: "sha256:457693dd75dab26a5967c46a9a5cbaed57cb8134a5955c165cc7a37fd1633032"
        operationId: "pr.open"
        outcome: "approved"
        policyRule: "workflow.external_reversible"
        previousDigest: null
        schemaVersion: 1
        sequence: 1
        stateFingerprintDigest: "sha256:447625bb985641e8e1e4b9a726a083688bcf78081d00ed1860a1ce1e7b127f05"
      -
        actor: "USER"
        at: "2026-07-27T01:22:50.144Z"
        authorityDigest: "sha256:e8f1b5d0de585df21375c33ad416a6c9973f035250a488de8b15f3f63e03f17d"
        digest: "sha256:e6836bb260632ae81a12e17153dd47a1ffb31c581c12a8c7ee387394f3e31989"
        operationDigest: "sha256:457693dd75dab26a5967c46a9a5cbaed57cb8134a5955c165cc7a37fd1633032"
        operationId: "pr.open"
        outcome: "approved"
        policyRule: "workflow.external_reversible"
        previousDigest: "sha256:9ec49f000de2e8ff95112a6b97e4021284871adb8250a18f93de09d3c5520780"
        schemaVersion: 1
        sequence: 2
        stateFingerprintDigest: "sha256:6adc15105a5ca7cab4e1a6cf157632ec94ad5b38c20351d8dad04fb2348af97c"
      -
        actor: "USER"
        at: "2026-07-27T01:29:56.339Z"
        authorityDigest: "sha256:c391b26e96ec28c8d4696eac2748f3d71f3c3616dd167722a569a9bab7c42702"
        digest: "sha256:536c88ed614377b316116b8693cdce0042259911630687c63fcb7138b5a54f95"
        operationDigest: "sha256:32cd8038dd66f1689375293f198abb6f965d6a7768bd945fb924d67bd194605e"
        operationId: "integration.enqueue"
        outcome: "approved"
        policyRule: "workflow.external_high_risk"
        previousDigest: "sha256:e6836bb260632ae81a12e17153dd47a1ffb31c581c12a8c7ee387394f3e31989"
        schemaVersion: 1
        sequence: 3
        stateFingerprintDigest: "sha256:91137e2815b5968a5d5e8cc1860c60ef50c7deb79fd0a36a57ad445af3635d31"
      -
        actor: "USER"
        at: "2026-07-27T01:30:17.499Z"
        authorityDigest: "sha256:ee8eaa910f22721f63c2951b04d55cd299978e97efdbcbbdec97bca62db87c21"
        digest: "sha256:64dbee3b1eb18228a071fbdf1b34f7db84852944d9cd054161dddbf1395f70ed"
        operationDigest: "sha256:be6044036047203402ecf8652ec2bbb35b7818eb33cd08789d4498ed30691cd9"
        operationId: "pr.head.publish"
        outcome: "approved"
        policyRule: "workflow.external_reversible"
        previousDigest: "sha256:536c88ed614377b316116b8693cdce0042259911630687c63fcb7138b5a54f95"
        schemaVersion: 1
        sequence: 4
        stateFingerprintDigest: "sha256:d6a1b201c654e8277758b09e04725560ab39a4d0c963c6b6e551a98859954247"
    grants:
      -
        actor: "USER"
        digest: "sha256:380140799ddcedbfce850b5b646d3e817edce64230776010aefcafcdccd42963"
        expiresAt: "2026-07-27T01:37:11.621Z"
        id: "authority-c54eac2c-890f-439a-8cbb-e699691b1996"
        issuedAt: "2026-07-27T01:22:11.621Z"
        kind: "side_effect_authority"
        operationDigest: "sha256:457693dd75dab26a5967c46a9a5cbaed57cb8134a5955c165cc7a37fd1633032"
        operationId: "pr.open"
        policyRule: "workflow.external_reversible"
        schemaVersion: 1
        stateFingerprintDigest: "sha256:447625bb985641e8e1e4b9a726a083688bcf78081d00ed1860a1ce1e7b127f05"
        stateScopeDigest: "sha256:7315243d9bcacad97144422ba77090892cebb6d15843c223b6acfd376e355a88"
      -
        actor: "USER"
        digest: "sha256:e8f1b5d0de585df21375c33ad416a6c9973f035250a488de8b15f3f63e03f17d"
        expiresAt: "2026-07-27T01:37:50.144Z"
        id: "authority-78a995b3-6277-410b-8436-61abd66a4372"
        issuedAt: "2026-07-27T01:22:50.144Z"
        kind: "side_effect_authority"
        operationDigest: "sha256:457693dd75dab26a5967c46a9a5cbaed57cb8134a5955c165cc7a37fd1633032"
        operationId: "pr.open"
        policyRule: "workflow.external_reversible"
        schemaVersion: 1
        stateFingerprintDigest: "sha256:6adc15105a5ca7cab4e1a6cf157632ec94ad5b38c20351d8dad04fb2348af97c"
        stateScopeDigest: "sha256:6fa573bf1fd13a3ea19d43fff269594334175df6b47472ca032305ebcb9cf95c"
      -
        actor: "USER"
        digest: "sha256:c391b26e96ec28c8d4696eac2748f3d71f3c3616dd167722a569a9bab7c42702"
        expiresAt: "2026-07-27T01:44:56.339Z"
        id: "authority-1abddddc-39f0-421b-9fa2-159049b8025d"
        issuedAt: "2026-07-27T01:29:56.339Z"
        kind: "side_effect_authority"
        operationDigest: "sha256:32cd8038dd66f1689375293f198abb6f965d6a7768bd945fb924d67bd194605e"
        operationId: "integration.enqueue"
        policyRule: "workflow.external_high_risk"
        schemaVersion: 1
        stateFingerprintDigest: "sha256:91137e2815b5968a5d5e8cc1860c60ef50c7deb79fd0a36a57ad445af3635d31"
        stateScopeDigest: "sha256:e661950fb0e988c9efab7a8915a176e8e2b8ef44102f9450758c92c12dea7c16"
      -
        actor: "USER"
        digest: "sha256:ee8eaa910f22721f63c2951b04d55cd299978e97efdbcbbdec97bca62db87c21"
        expiresAt: "2026-07-27T01:45:17.499Z"
        id: "authority-1db6ab2f-6bf9-498b-b4fe-6ca1db3d1410"
        issuedAt: "2026-07-27T01:30:17.499Z"
        kind: "side_effect_authority"
        operationDigest: "sha256:be6044036047203402ecf8652ec2bbb35b7818eb33cd08789d4498ed30691cd9"
        operationId: "pr.head.publish"
        policyRule: "workflow.external_reversible"
        schemaVersion: 1
        stateFingerprintDigest: "sha256:d6a1b201c654e8277758b09e04725560ab39a4d0c963c6b6e551a98859954247"
        stateScopeDigest: "sha256:c109e28230076b1657037909c98751edda3dd80dea03de2cda8e63b863bded06"
    schemaVersion: 1
  workflow_route_baseline:
    start_head_sha: "518f9f4a62e09016262af2cbbeb89947550be2e0"
    version: 1
id_source: "generated"
---
## Summary

Preserve authority-only tails during merged cleanup

Follow up RF13: permit targeted merged cleanup only when a local post-merge tail is proven authority-only against the provider-merged head, and classify hosted close finalization as local reversible after the merge and pre-merge closure are already durable.

## Scope

- In scope: Follow up RF13: permit targeted merged cleanup only when a local post-merge tail is proven authority-only against the provider-merged head, and classify hosted close finalization as local reversible after the merge and pre-merge closure are already durable.
- Out of scope: unrelated refactors not required for "Preserve authority-only tails during merged cleanup".

## Plan

1. CODER: add a narrowly scoped cleanup proof that accepts only a provider-merged task head followed by authority-only task README records; keep semantic or arbitrary post-merge tails blocked. 2. CODER: classify hosted-close finalization as local reversible because protected merge and task completion are already durable before cleanup. 3. TESTER: add regression coverage for accepted authority-only tails and rejected semantic tails, then run focused cleanup/authority checks. 4. EVALUATOR: record an independent pass against the new proof. 5. INTEGRATOR: merge the follow-up and rerun targeted cleanup for NWVCAG.

## Verify Steps

1. Run targeted cleanup proof tests. Expected: a provider-merged head followed only by authority-extension README commits is removable; a non-authority tail remains blocked.
2. Run authority policy tests. Expected: task.hosted_close.finalize is local_reversible and requires no authority because protected merge and close evidence already exist.
3. Run format, lint, type checks, and ci:contract. Expected: all pass without generated-artifact drift.
4. Re-run RF13 targeted cleanup after integration. Expected: the previously blocked local authority-only tail is removed by the CLI, while no unrelated worktree or branch is touched.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

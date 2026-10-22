---
id: "202610092056-WS6H31"
title: "Review and update compatibility candidate for CLI help changes in PR 6095"
status: "DONE"
priority: "high"
owner: "ORCHESTRATOR"
revision: 54
origin:
  system: "manual"
depends_on: []
tags:
  - "intake"
task_kind: "code"
mutation_scope: "code"
verify:
  - "bun run bench:compatibility:check"
plan_approval:
  state: "approved"
  updated_at: "2026-10-10T10:50:16.873Z"
  updated_by: "USER"
  note: "Explicit operator recovery: select retained evidence for reviewed merged PR6112 and PR6113 main import; preserve plan, scope, checks, operational artifacts and failed history. This pins historical evidence selection, not issuance attestation."
verification:
  state: "ok"
  updated_at: "2026-10-10T11:52:31.354Z"
  updated_by: "SUPERVISOR"
  note: "Verified: canonical Task Kernel final checks passed."
  attempts: 0
quality_review:
  state: "pass"
  provenance: "evaluator_supplied"
  updated_at: "2026-10-09T21:29:43.484Z"
  updated_by: "EVALUATOR"
  note: "Canonical EVALUATOR review passed."
  evaluated_sha: "b3cf4b13e2804179c8a3437d7372377ed33b93e0"
  review_identity_digest: "sha256:f4982f34845df9f04b5aab3e1f7bc208498f954cfb3e89bd8584cde6800e00d0"
  evidence_refs:
    - "../../../.git/agentplane/kernel/exchanges/202610092056-WS6H31/9e473320c915633d268e69669373325619e383c2bdfeb8d3608eec0d4e93df6b/quality-report.json"
  findings:
    - "Validated the context source, all 13 required context block digests and lengths, all four required input digests, and result schema digest. The report raw SHA-256 matches c5abc748b5db2134a6a12a64c3805294ede2f91242eab90b07fca6232ec50e30."
    - "The report pins both comparison commits, before and after topology digests, unchanged command and positional counts, the three additive closure options, absence of removals and mutations, and source task provenance. Each listed candidate JSON path resolves to the reviewed change, including derived digest fields. Candidate, guard and immutable baseline file hashes match the report."
    - "The correction adds only scripts/baselines/v0.7-pr6095-cli-review.json beyond the previously inspected implementation. The candidate and exact-delta guard remain unchanged from that inspection; published baselines, package versions and rejected-recapture checks remain intact."
    - "Native validation records exit 0 for all required commands: bun run bench:compatibility:candidate:check, bun run bench:compatibility:check and bun run format:check. The contract check reports 255 commands, 176 arguments and 860 options."
execution_route:
  frozen: true
  reason_codes:
    - "agent_preferred_branch_pr"
    - "effect_ci"
    - "repository_branch_pr_floor"
  repository_mode: "branch_pr"
  requested_mode: "branch_pr"
  schema_version: 1
  selected_mode: "branch_pr"
execution_contract:
  authority:
    allowed_capabilities:
      - "repository_write"
    allowed_external_effects: []
    allowed_repository_effects:
      - "ci"
      - "repository_write"
      - "source_code"
      - "tests"
    allowed_resources: []
    forbidden_external_effects:
      - "network_read"
      - "external_write"
      - "credentials"
      - "publish"
      - "deploy"
      - "destructive_git"
    forbidden_repository_effects:
      - "documentation"
      - "public_api"
      - "schema"
      - "dependencies"
      - "release_metadata"
      - "security_boundary"
    writable_roots:
      - "scripts"
  declaration:
    external_effects: []
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "explicit structured task intake"
    repository_effects:
      - "ci"
      - "repository_write"
      - "source_code"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "reversible"
    schema_version: 2
    scope_roots:
      - "scripts"
  observed:
    authority_violations:
      - "repository_effect:dependencies"
      - "repository_effect:documentation"
      - "repository_effect:public_api"
      - "repository_effect:release_metadata"
      - "repository_effect:schema"
      - "writable_scope:.agentplane/policy/context.must.md"
      - "writable_scope:.agentplane/policy/dod.core.md"
      - "writable_scope:.agentplane/policy/dod.docs.md"
      - "writable_scope:.agentplane/policy/examples/migration-note.md"
      - "writable_scope:.agentplane/policy/governance.md"
      - "writable_scope:.agentplane/policy/security.must.md"
      - "writable_scope:.agentplane/policy/workflow.branch_pr.md"
      - "writable_scope:.agentplane/policy/workflow.direct.md"
      - "writable_scope:.agentplane/policy/workflow.md"
      - "writable_scope:.agentplane/policy/workflow.release.md"
      - "writable_scope:.agentplane/policy/workflow.upgrade.md"
      - "writable_scope:.agentplane/tasks/202610020159-60QH9J/README.md"
      - "writable_scope:.agentplane/tasks/202610020159-60QH9J/pr/diffstat.txt"
      - "writable_scope:.agentplane/tasks/202610020159-60QH9J/pr/github-body.md"
      - "writable_scope:.agentplane/tasks/202610020159-60QH9J/pr/github-title.txt"
      - "writable_scope:.agentplane/tasks/202610020159-60QH9J/pr/meta.json"
      - "writable_scope:.agentplane/tasks/202610020159-60QH9J/pr/review.md"
      - "writable_scope:.agentplane/tasks/202610020159-60QH9J/quality/objects/sha256/3843bff288bb14b89e3366c8d7dec5532bcc3f35106b624f48f00047b3593844.json"
      - "writable_scope:.agentplane/tasks/202610020159-60QH9J/quality/objects/sha256/42b9e36673a3cc9bf23e38c4d451a9668ffb475c35f74aeb00f272aa861dd9cc.json"
      - "writable_scope:.agentplane/tasks/202610020159-60QH9J/quality/objects/sha256/78dd518372ace9dcbe508e9366b5020456fbc1d869ce4e6ce802a4dd9ecd357a.json"
      - "writable_scope:.agentplane/tasks/202610020159-60QH9J/supervision/declared-checks.json"
      - "writable_scope:.agentplane/tasks/202610020159-60QH9J/supervision/implementation-evidence.json"
      - "writable_scope:.agentplane/tasks/202610020159-60QH9J/verification/20261005205447553-d6d6686c6a8a01d3.json"
      - "writable_scope:.agentplane/tasks/202610020159-60QH9J/verification/20261005223905618-0396b72ba13e2c83.json"
      - "writable_scope:.agentplane/tasks/202610020159-60QH9J/verification/20261005230826992-23e0b9424c6c69fe.json"
      - "writable_scope:.agentplane/tasks/202610080726-0JHB26/README.md"
      - "writable_scope:.agentplane/tasks/202610080726-0JHB26/pr/diffstat.txt"
      - "writable_scope:.agentplane/tasks/202610080726-0JHB26/pr/github-body.md"
      - "writable_scope:.agentplane/tasks/202610080726-0JHB26/pr/github-title.txt"
      - "writable_scope:.agentplane/tasks/202610080726-0JHB26/pr/meta.json"
      - "writable_scope:.agentplane/tasks/202610080726-0JHB26/pr/review.md"
      - "writable_scope:.agentplane/tasks/202610080726-0JHB26/quality/20261008-154206362-recovery-context/evaluator-evidence-manifest.json"
      - "writable_scope:.agentplane/tasks/202610080726-0JHB26/quality/20261008-154206362-recovery-context/evaluator-follow-up.json"
      - "writable_scope:.agentplane/tasks/202610080726-0JHB26/quality/20261008-154206362-recovery-context/evaluator-opinion.md"
      - "writable_scope:.agentplane/tasks/202610080726-0JHB26/quality/20261008-154206362-recovery-context/evaluator-result.json"
      - "writable_scope:.agentplane/tasks/202610080726-0JHB26/quality/20261008-154206362-recovery-context/evaluator-work-order.json"
      - "writable_scope:.agentplane/tasks/202610080726-0JHB26/quality/20261008-154206362-recovery-context/quality-report.json"
      - "writable_scope:.agentplane/tasks/202610080726-0JHB26/quality/20261008-155843556-recovery-context/evaluator-evidence-manifest.json"
      - "writable_scope:.agentplane/tasks/202610080726-0JHB26/quality/20261008-155843556-recovery-context/evaluator-work-order.json"
      - "writable_scope:.agentplane/tasks/202610080726-0JHB26/quality/20261010-034407402-recovery-context/evaluator-evidence-manifest.json"
      - "writable_scope:.agentplane/tasks/202610080726-0JHB26/quality/20261010-034407402-recovery-context/evaluator-opinion.md"
      - "writable_scope:.agentplane/tasks/202610080726-0JHB26/quality/20261010-034407402-recovery-context/evaluator-result.json"
      - "writable_scope:.agentplane/tasks/202610080726-0JHB26/quality/20261010-034407402-recovery-context/evaluator-work-order.json"
      - "writable_scope:.agentplane/tasks/202610080726-0JHB26/quality/20261010-034407402-recovery-context/quality-report.json"
      - "writable_scope:.agentplane/tasks/202610080726-0JHB26/quality/objects/sha256/42b9e36673a3cc9bf23e38c4d451a9668ffb475c35f74aeb00f272aa861dd9cc.json"
      - "writable_scope:.agentplane/tasks/202610080726-0JHB26/quality/objects/sha256/6b013e24f814eba6b8136e36997905960dda4fb7e22682171c0b484688bc0977.json"
      - "writable_scope:.agentplane/tasks/202610080726-0JHB26/quality/objects/sha256/78dd518372ace9dcbe508e9366b5020456fbc1d869ce4e6ce802a4dd9ecd357a.json"
      - "writable_scope:.agentplane/tasks/202610080726-0JHB26/quality/objects/sha256/872fdcf271df312c7037ea4134f47b6ac3f50e6d686fc1ada29a5d67c5f0c5c0.md"
      - "writable_scope:.agentplane/tasks/202610080726-0JHB26/quality/objects/sha256/8d9959fee0db986395d856f24ff509d4eb7ba9af18c76949c095fce62c59bebd.md"
      - "writable_scope:.agentplane/tasks/202610080726-0JHB26/quality/objects/sha256/9037cdf98253e70333ede9358d360264a85ee905be64a8723bbdd4ca71e02d4a.json"
      - "writable_scope:.agentplane/tasks/202610080726-0JHB26/quality/objects/sha256/ba40a2a38d77adb9a4ef3479e1201194dc8f3beeaf66105f085f4d1298d214aa.md"
      - "writable_scope:.agentplane/tasks/202610080726-0JHB26/quality/objects/sha256/c345f5b1d9c58c323792137fb3cdaeed440202b090d25260b3ee0eeee772c8be.json"
      - "writable_scope:.agentplane/tasks/202610080726-0JHB26/quality/objects/sha256/cd35fbf396f0028e374b3f84595480f6edd9dcf606c23ee72655c873780bf2b2.json"
      - "writable_scope:.agentplane/tasks/202610080726-0JHB26/quality/objects/sha256/e01436d9127d88f273b2a19d4bb25a98a66b5273b579be373fc8a5cb2b6ddd89.json"
      - "writable_scope:.agentplane/tasks/202610080726-0JHB26/quality/objects/sha256/feed3ea63a7331cb8756f8d6ce742330d25c8dbedffa8826f001840f3ef63f80.patch"
      - "writable_scope:.agentplane/tasks/202610080726-0JHB26/supervision/declared-checks.json"
      - "writable_scope:.agentplane/tasks/202610080726-0JHB26/supervision/implementation-evidence.json"
      - "writable_scope:.agentplane/tasks/202610080726-0JHB26/verification/20261008084315402-354e1fad3c69fd76.json"
      - "writable_scope:.agentplane/tasks/202610080740-NDWDC5/README.md"
      - "writable_scope:.agentplane/tasks/202610080740-NDWDC5/pr/diffstat.txt"
      - "writable_scope:.agentplane/tasks/202610080740-NDWDC5/pr/github-body.md"
      - "writable_scope:.agentplane/tasks/202610080740-NDWDC5/pr/github-title.txt"
      - "writable_scope:.agentplane/tasks/202610080740-NDWDC5/pr/meta.json"
      - "writable_scope:.agentplane/tasks/202610080740-NDWDC5/pr/review.md"
      - "writable_scope:.agentplane/tasks/202610080740-NDWDC5/quality/objects/sha256/42b9e36673a3cc9bf23e38c4d451a9668ffb475c35f74aeb00f272aa861dd9cc.json"
      - "writable_scope:.agentplane/tasks/202610080740-NDWDC5/quality/objects/sha256/78dd518372ace9dcbe508e9366b5020456fbc1d869ce4e6ce802a4dd9ecd357a.json"
      - "writable_scope:.agentplane/tasks/202610080740-NDWDC5/quality/objects/sha256/cd35fbf396f0028e374b3f84595480f6edd9dcf606c23ee72655c873780bf2b2.json"
      - "writable_scope:.agentplane/tasks/202610080740-NDWDC5/supervision/declared-checks.json"
      - "writable_scope:.agentplane/tasks/202610080740-NDWDC5/supervision/implementation-evidence.json"
      - "writable_scope:.agentplane/tasks/202610080929-405MZ2/README.md"
      - "writable_scope:.agentplane/tasks/202610080929-405MZ2/pr/diffstat.txt"
      - "writable_scope:.agentplane/tasks/202610080929-405MZ2/pr/github-body.md"
      - "writable_scope:.agentplane/tasks/202610080929-405MZ2/pr/github-title.txt"
      - "writable_scope:.agentplane/tasks/202610080929-405MZ2/pr/meta.json"
      - "writable_scope:.agentplane/tasks/202610080929-405MZ2/pr/review.md"
      - "writable_scope:.agentplane/tasks/202610080929-405MZ2/quality/objects/sha256/42b9e36673a3cc9bf23e38c4d451a9668ffb475c35f74aeb00f272aa861dd9cc.json"
      - "writable_scope:.agentplane/tasks/202610080929-405MZ2/quality/objects/sha256/78dd518372ace9dcbe508e9366b5020456fbc1d869ce4e6ce802a4dd9ecd357a.json"
      - "writable_scope:.agentplane/tasks/202610080929-405MZ2/quality/objects/sha256/cd35fbf396f0028e374b3f84595480f6edd9dcf606c23ee72655c873780bf2b2.json"
      - "writable_scope:.agentplane/tasks/202610080929-405MZ2/supervision/declared-checks.json"
      - "writable_scope:.agentplane/tasks/202610080929-405MZ2/supervision/implementation-evidence.json"
      - "writable_scope:.agentplane/tasks/202610080929-405MZ2/verification/20261008140930004-7308fe3545cb838f.json"
      - "writable_scope:.agentplane/tasks/202610081254-Z21QM3/README.md"
      - "writable_scope:.agentplane/tasks/202610081254-Z21QM3/pr/diffstat.txt"
      - "writable_scope:.agentplane/tasks/202610081254-Z21QM3/pr/github-body.md"
      - "writable_scope:.agentplane/tasks/202610081254-Z21QM3/pr/github-title.txt"
      - "writable_scope:.agentplane/tasks/202610081254-Z21QM3/pr/meta.json"
      - "writable_scope:.agentplane/tasks/202610081254-Z21QM3/pr/review.md"
      - "writable_scope:.agentplane/tasks/202610081254-Z21QM3/quality/objects/sha256/42b9e36673a3cc9bf23e38c4d451a9668ffb475c35f74aeb00f272aa861dd9cc.json"
      - "writable_scope:.agentplane/tasks/202610081254-Z21QM3/quality/objects/sha256/78dd518372ace9dcbe508e9366b5020456fbc1d869ce4e6ce802a4dd9ecd357a.json"
      - "writable_scope:.agentplane/tasks/202610081254-Z21QM3/quality/objects/sha256/cd35fbf396f0028e374b3f84595480f6edd9dcf606c23ee72655c873780bf2b2.json"
      - "writable_scope:.agentplane/tasks/202610081254-Z21QM3/supervision/declared-checks.json"
      - "writable_scope:.agentplane/tasks/202610081254-Z21QM3/supervision/implementation-evidence.json"
      - "writable_scope:.agentplane/tasks/202610081254-Z21QM3/verification/20261008131049932-b5f691d407e737f9.json"
      - "writable_scope:.agentplane/tasks/202610081424-21WCFZ/README.md"
      - "writable_scope:.agentplane/tasks/202610081424-21WCFZ/quality/objects/sha256/42b9e36673a3cc9bf23e38c4d451a9668ffb475c35f74aeb00f272aa861dd9cc.json"
      - "writable_scope:.agentplane/tasks/202610081424-21WCFZ/quality/objects/sha256/78dd518372ace9dcbe508e9366b5020456fbc1d869ce4e6ce802a4dd9ecd357a.json"
      - "writable_scope:.agentplane/tasks/202610081424-21WCFZ/quality/objects/sha256/cd35fbf396f0028e374b3f84595480f6edd9dcf606c23ee72655c873780bf2b2.json"
      - "writable_scope:.agentplane/tasks/202610081424-21WCFZ/supervision/declared-checks.json"
      - "writable_scope:.agentplane/tasks/202610081424-21WCFZ/supervision/implementation-evidence.json"
      - "writable_scope:.agentplane/tasks/202610081722-JBCX2J/README.md"
      - "writable_scope:.agentplane/tasks/202610081722-JBCX2J/pr/diffstat.txt"
      - "writable_scope:.agentplane/tasks/202610081722-JBCX2J/pr/github-body.md"
      - "writable_scope:.agentplane/tasks/202610081722-JBCX2J/pr/github-title.txt"
      - "writable_scope:.agentplane/tasks/202610081722-JBCX2J/pr/meta.json"
      - "writable_scope:.agentplane/tasks/202610081722-JBCX2J/pr/review.md"
      - "writable_scope:.agentplane/tasks/202610081722-JBCX2J/quality/objects/sha256/42b9e36673a3cc9bf23e38c4d451a9668ffb475c35f74aeb00f272aa861dd9cc.json"
      - "writable_scope:.agentplane/tasks/202610081722-JBCX2J/quality/objects/sha256/78dd518372ace9dcbe508e9366b5020456fbc1d869ce4e6ce802a4dd9ecd357a.json"
      - "writable_scope:.agentplane/tasks/202610081722-JBCX2J/quality/objects/sha256/cd35fbf396f0028e374b3f84595480f6edd9dcf606c23ee72655c873780bf2b2.json"
      - "writable_scope:.agentplane/tasks/202610081722-JBCX2J/supervision/declared-checks.json"
      - "writable_scope:.agentplane/tasks/202610081722-JBCX2J/supervision/implementation-evidence.json"
      - "writable_scope:.agentplane/tasks/202610081722-JBCX2J/verification/20261008175024322-0c00f4dc25089c04.json"
      - "writable_scope:.agentplane/tasks/202610092153-WZDW5D/README.md"
      - "writable_scope:.agentplane/tasks/202610092153-WZDW5D/pr/diffstat.txt"
      - "writable_scope:.agentplane/tasks/202610092153-WZDW5D/pr/github-body.md"
      - "writable_scope:.agentplane/tasks/202610092153-WZDW5D/pr/github-title.txt"
      - "writable_scope:.agentplane/tasks/202610092153-WZDW5D/pr/meta.json"
      - "writable_scope:.agentplane/tasks/202610092153-WZDW5D/pr/review.md"
      - "writable_scope:.agentplane/tasks/202610092153-WZDW5D/quality/objects/sha256/42b9e36673a3cc9bf23e38c4d451a9668ffb475c35f74aeb00f272aa861dd9cc.json"
      - "writable_scope:.agentplane/tasks/202610092153-WZDW5D/quality/objects/sha256/78dd518372ace9dcbe508e9366b5020456fbc1d869ce4e6ce802a4dd9ecd357a.json"
      - "writable_scope:.agentplane/tasks/202610092153-WZDW5D/supervision/declared-checks.json"
      - "writable_scope:.agentplane/tasks/202610092153-WZDW5D/supervision/implementation-evidence.json"
      - "writable_scope:.agentplane/tasks/202610092153-WZDW5D/verification/20261010074913475-fa74fe3853d40f8f.json"
      - "writable_scope:.agentplane/tasks/202610100342-PXH679/README.md"
      - "writable_scope:.agentplane/tasks/202610100342-PXH679/pr/diffstat.txt"
      - "writable_scope:.agentplane/tasks/202610100342-PXH679/pr/github-body.md"
      - "writable_scope:.agentplane/tasks/202610100342-PXH679/pr/github-title.txt"
      - "writable_scope:.agentplane/tasks/202610100342-PXH679/pr/meta.json"
      - "writable_scope:.agentplane/tasks/202610100342-PXH679/pr/review.md"
      - "writable_scope:.agentplane/tasks/202610100342-PXH679/quality/objects/sha256/78dd518372ace9dcbe508e9366b5020456fbc1d869ce4e6ce802a4dd9ecd357a.json"
      - "writable_scope:.agentplane/tasks/202610100342-PXH679/quality/objects/sha256/cd35fbf396f0028e374b3f84595480f6edd9dcf606c23ee72655c873780bf2b2.json"
      - "writable_scope:.agentplane/tasks/202610100342-PXH679/supervision/declared-checks.json"
      - "writable_scope:.agentplane/tasks/202610100342-PXH679/supervision/implementation-evidence.json"
      - "writable_scope:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-000/children/run-000/failures.jsonl"
      - "writable_scope:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-000/children/run-000/manifest.json"
      - "writable_scope:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-000/children/run-000/status.json"
      - "writable_scope:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-000/children/run-000/stderr.jsonl"
      - "writable_scope:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-000/children/run-000/stdout.jsonl"
      - "writable_scope:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-000/failures.jsonl"
      - "writable_scope:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-000/manifest.json"
      - "writable_scope:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-000/status.json"
      - "writable_scope:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-000/stderr.jsonl"
      - "writable_scope:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-000/stdout.jsonl"
      - "writable_scope:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-001/children/run-000/failures.jsonl"
      - "writable_scope:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-001/children/run-000/manifest.json"
      - "writable_scope:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-001/children/run-000/status.json"
      - "writable_scope:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-001/children/run-000/stderr.jsonl"
      - "writable_scope:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-001/children/run-000/stdout.jsonl"
      - "writable_scope:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-001/children/run-001/failures.jsonl"
      - "writable_scope:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-001/children/run-001/manifest.json"
      - "writable_scope:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-001/children/run-001/status.json"
      - "writable_scope:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-001/children/run-001/stderr.jsonl"
      - "writable_scope:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-001/children/run-001/stdout.jsonl"
      - "writable_scope:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-001/children/run-002/failures.jsonl"
      - "writable_scope:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-001/children/run-002/manifest.json"
      - "writable_scope:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-001/children/run-002/status.json"
      - "writable_scope:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-001/children/run-002/stderr.jsonl"
      - "writable_scope:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-001/children/run-002/stdout.jsonl"
      - "writable_scope:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-001/children/run-003/failures.jsonl"
      - "writable_scope:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-001/children/run-003/manifest.json"
      - "writable_scope:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-001/children/run-003/status.json"
      - "writable_scope:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-001/children/run-003/stderr.jsonl"
      - "writable_scope:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-001/children/run-003/stdout.jsonl"
      - "writable_scope:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-001/children/run-004/failures.jsonl"
      - "writable_scope:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-001/children/run-004/manifest.json"
      - "writable_scope:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-001/children/run-004/status.json"
      - "writable_scope:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-001/children/run-004/stderr.jsonl"
      - "writable_scope:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-001/children/run-004/stdout.jsonl"
      - "writable_scope:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-001/failures.jsonl"
      - "writable_scope:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-001/manifest.json"
      - "writable_scope:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-001/status.json"
      - "writable_scope:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-001/stderr.jsonl"
      - "writable_scope:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-001/stdout.jsonl"
      - "writable_scope:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-002/children/run-000/failures.jsonl"
      - "writable_scope:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-002/children/run-000/manifest.json"
      - "writable_scope:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-002/children/run-000/status.json"
      - "writable_scope:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-002/children/run-000/stderr.jsonl"
      - "writable_scope:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-002/children/run-000/stdout.jsonl"
      - "writable_scope:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-002/failures.jsonl"
      - "writable_scope:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-002/manifest.json"
      - "writable_scope:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-002/status.json"
      - "writable_scope:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-002/stderr.jsonl"
      - "writable_scope:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-002/stdout.jsonl"
      - "writable_scope:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-003/children/run-000/failures.jsonl"
      - "writable_scope:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-003/children/run-000/manifest.json"
      - "writable_scope:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-003/children/run-000/status.json"
      - "writable_scope:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-003/children/run-000/stderr.jsonl"
      - "writable_scope:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-003/children/run-000/stdout.jsonl"
      - "writable_scope:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-003/children/run-001/failures.jsonl"
      - "writable_scope:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-003/children/run-001/manifest.json"
      - "writable_scope:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-003/children/run-001/status.json"
      - "writable_scope:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-003/children/run-001/stderr.jsonl"
      - "writable_scope:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-003/children/run-001/stdout.jsonl"
      - "writable_scope:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-003/children/run-002/failures.jsonl"
      - "writable_scope:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-003/children/run-002/manifest.json"
      - "writable_scope:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-003/children/run-002/status.json"
      - "writable_scope:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-003/children/run-002/stderr.jsonl"
      - "writable_scope:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-003/children/run-002/stdout.jsonl"
      - "writable_scope:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-003/children/run-003/failures.jsonl"
      - "writable_scope:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-003/children/run-003/manifest.json"
      - "writable_scope:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-003/children/run-003/status.json"
      - "writable_scope:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-003/children/run-003/stderr.jsonl"
      - "writable_scope:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-003/children/run-003/stdout.jsonl"
      - "writable_scope:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-003/children/run-004/failures.jsonl"
      - "writable_scope:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-003/children/run-004/manifest.json"
      - "writable_scope:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-003/children/run-004/status.json"
      - "writable_scope:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-003/children/run-004/stderr.jsonl"
      - "writable_scope:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-003/children/run-004/stdout.jsonl"
      - "writable_scope:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-003/failures.jsonl"
      - "writable_scope:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-003/manifest.json"
      - "writable_scope:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-003/status.json"
      - "writable_scope:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-003/stderr.jsonl"
      - "writable_scope:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-003/stdout.jsonl"
      - "writable_scope:.prettierignore"
      - "writable_scope:artifacts/bench/m05-live-0.7.13/broker-qualification.md"
      - "writable_scope:artifacts/bench/m05-live-0.7.13/coding-corpus-qualification.json"
      - "writable_scope:artifacts/bench/m05-live-0.7.13/experiment-protocol.md"
      - "writable_scope:artifacts/bench/m05-live-0.7.13/oracle-framing-qualification.json"
      - "writable_scope:artifacts/bench/m05-live-0.7.13/subscription-protocol.md"
      - "writable_scope:artifacts/bench/m05-live-0.7.13/subscription-registration.json"
      - "writable_scope:bun.lock"
      - "writable_scope:context/wiki/index.md"
      - "writable_scope:context/wiki/proposals/index.md"
      - "writable_scope:context/wiki/proposals/task-harvest/index.md"
      - "writable_scope:context/wiki/release-docs/concepts/index.md"
      - "writable_scope:context/wiki/release-docs/domains/index.md"
      - "writable_scope:context/wiki/release-docs/release-lines/index.md"
      - "writable_scope:context/wiki/reports/index.md"
      - "writable_scope:context/wiki/task-harvest/index.md"
      - "writable_scope:docs/developer/modular-prompt-assembly.mdx"
      - "writable_scope:docs/developer/testing-and-quality.mdx"
      - "writable_scope:docs/releases/v0.7.1.md"
      - "writable_scope:docs/releases/v0.7.13-acceptance.md"
      - "writable_scope:docs/releases/v0.7.13.md"
      - "writable_scope:docs/user/cli-reference.generated.mdx"
      - "writable_scope:docs/user/task-lifecycle.mdx"
      - "writable_scope:eslint.config.cjs"
      - "writable_scope:package.json"
      - "writable_scope:packages/agentplane/assets/AGENTS.md"
      - "writable_scope:packages/agentplane/assets/RUNNER.md"
      - "writable_scope:packages/agentplane/assets/policy/context.must.md"
      - "writable_scope:packages/agentplane/assets/policy/dod.core.md"
      - "writable_scope:packages/agentplane/assets/policy/dod.docs.md"
      - "writable_scope:packages/agentplane/assets/policy/examples/migration-note.md"
      - "writable_scope:packages/agentplane/assets/policy/governance.md"
      - "writable_scope:packages/agentplane/assets/policy/security.must.md"
      - "writable_scope:packages/agentplane/assets/policy/workflow.branch_pr.md"
      - "writable_scope:packages/agentplane/assets/policy/workflow.direct.md"
      - "writable_scope:packages/agentplane/assets/policy/workflow.md"
      - "writable_scope:packages/agentplane/assets/policy/workflow.release.md"
      - "writable_scope:packages/agentplane/assets/policy/workflow.upgrade.md"
      - "writable_scope:packages/agentplane/package.json"
      - "writable_scope:packages/agentplane/src/adapters/task-backend/kernel-authority-schema.ts"
      - "writable_scope:packages/agentplane/src/adapters/task-backend/kernel-backend-adapter.test.ts"
      - "writable_scope:packages/agentplane/src/adapters/task-backend/kernel-backend-adapter.ts"
      - "writable_scope:packages/agentplane/src/adapters/task-backend/kernel-backend-reconciliation.test.ts"
      - "writable_scope:packages/agentplane/src/adapters/task-backend/kernel-documents.ts"
      - "writable_scope:packages/agentplane/src/adapters/task-backend/kernel-record.ts"
      - "writable_scope:packages/agentplane/src/agents/agents-template.test.ts"
      - "writable_scope:packages/agentplane/src/agents/agents-template.ts"
      - "writable_scope:packages/agentplane/src/backends/task-backend/local-backend-read.ts"
      - "writable_scope:packages/agentplane/src/backends/task-backend/shared/types.ts"
      - "writable_scope:packages/agentplane/src/cli/command-invocations.ts"
      - "writable_scope:packages/agentplane/src/cli/reason-codes.ts"
      - "writable_scope:packages/agentplane/src/cli/run-cli.core.kernel-projection.testkit.ts"
      - "writable_scope:packages/agentplane/src/cli/run-cli.core.roadmap-recipe-v2-entrypoint.test.ts"
      - "writable_scope:packages/agentplane/src/cli/run-cli/command-catalog-loader.ts"
      - "writable_scope:packages/agentplane/src/cli/run-cli/command-catalog/command-session.ts"
      - "writable_scope:packages/agentplane/src/cli/run-cli/command-catalog/task.ts"
      - "writable_scope:packages/agentplane/src/cli/run-cli/command-loaders/task.ts"
      - "writable_scope:packages/agentplane/src/cli/run-cli/commands/core/preflight-report-drift.ts"
      - "writable_scope:packages/agentplane/src/cli/run-cli/commands/init/model.ts"
      - "writable_scope:packages/agentplane/src/cli/run-cli/deferred-runtime-loader.ts"
      - "writable_scope:packages/agentplane/src/cli/run-cli/globals.ts"
      - "writable_scope:packages/agentplane/src/cli/task-advance-effect-recovery.testkit.ts"
      - "writable_scope:packages/agentplane/src/cli/verification-contract.test.ts"
      - "writable_scope:packages/agentplane/src/commands/context/context.spec.ts"
      - "writable_scope:packages/agentplane/src/commands/evaluator/evaluator-artifact-port.ts"
      - "writable_scope:packages/agentplane/src/commands/evaluator/evaluator-evidence-store.ts"
      - "writable_scope:packages/agentplane/src/commands/evaluator/evaluator-review-apply.test.ts"
      - "writable_scope:packages/agentplane/src/commands/evaluator/evaluator-review-apply.ts"
      - "writable_scope:packages/agentplane/src/commands/evaluator/evaluator-work-order.ts"
      - "writable_scope:packages/agentplane/src/commands/evaluator/evaluator.command.ts"
      - "writable_scope:packages/agentplane/src/commands/evidence/evidence-manifest.ts"
      - "writable_scope:packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts"
      - "writable_scope:packages/agentplane/src/commands/guard/impl/commit-diagnostics.ts"
      - "writable_scope:packages/agentplane/src/commands/pr/flow-status.ts"
      - "writable_scope:packages/agentplane/src/commands/pr/integrate/cmd.protected-base.test.ts"
      - "writable_scope:packages/agentplane/src/commands/pr/integrate/cmd.test.ts"
      - "writable_scope:packages/agentplane/src/commands/pr/integrate/internal/post-integrate-bootstrap.ts"
      - "writable_scope:packages/agentplane/src/commands/pr/integrate/queue-state-types.ts"
      - "writable_scope:packages/agentplane/src/commands/pr/internal/git-host-identity.test.ts"
      - "writable_scope:packages/agentplane/src/commands/pr/internal/git-host-identity.ts"
      - "writable_scope:packages/agentplane/src/commands/pr/internal/sync-frozen-base.test.ts"
      - "writable_scope:packages/agentplane/src/commands/recipes.list.test.ts"
      - "writable_scope:packages/agentplane/src/commands/recipes/impl/index.ts"
      - "writable_scope:packages/agentplane/src/commands/shared/declared-check.ts"
      - "writable_scope:packages/agentplane/src/commands/shared/native-task-identity-fixture.ts"
      - "writable_scope:packages/agentplane/src/commands/shared/native-task-identity.ts"
      - "writable_scope:packages/agentplane/src/commands/shared/prompt-graph-diagnostics.ts"
      - "writable_scope:packages/agentplane/src/commands/shared/reconcile-check.ts"
      - "writable_scope:packages/agentplane/src/commands/shared/reconcile-native-applicability.test.ts"
      - "writable_scope:packages/agentplane/src/commands/shared/route-guidance.ts"
      - "writable_scope:packages/agentplane/src/commands/shared/route-oracle.ts"
      - "writable_scope:packages/agentplane/src/commands/shared/source-confidence.ts"
      - "writable_scope:packages/agentplane/src/commands/shared/task-verification-input-types.ts"
      - "writable_scope:packages/agentplane/src/commands/shared/task-worktree-foreign-artifact-history-proof.ts"
      - "writable_scope:packages/agentplane/src/commands/shared/task-worktree-foreign-artifact-repair.test.ts"
      - "writable_scope:packages/agentplane/src/commands/shared/task-worktree-foreign-artifact-repair.ts"
      - "writable_scope:packages/agentplane/src/commands/task/advance-task-step.ts"
      - "writable_scope:packages/agentplane/src/commands/task/agent-work-context-contract.ts"
      - "writable_scope:packages/agentplane/src/commands/task/corrective-authority.command.ts"
      - "writable_scope:packages/agentplane/src/commands/task/create-plan-proposal.test.ts"
      - "writable_scope:packages/agentplane/src/commands/task/create-plan-proposal.ts"
      - "writable_scope:packages/agentplane/src/commands/task/direct-task-verification-checks.ts"
      - "writable_scope:packages/agentplane/src/commands/task/direct-task-verification-observation.ts"
      - "writable_scope:packages/agentplane/src/commands/task/direct-task-verification.observability.test.ts"
      - "writable_scope:packages/agentplane/src/commands/task/direct-task-verification.qualification.test.ts"
      - "writable_scope:packages/agentplane/src/commands/task/direct-task-verification.sequence.cases.ts"
      - "writable_scope:packages/agentplane/src/commands/task/direct-task-verification.test.ts"
      - "writable_scope:packages/agentplane/src/commands/task/direct-task-verification.ts"
      - "writable_scope:packages/agentplane/src/commands/task/external-agent-evaluator-input.ts"
      - "writable_scope:packages/agentplane/src/commands/task/external-agent-evaluator-recovery.ts"
      - "writable_scope:packages/agentplane/src/commands/task/external-agent-evaluator.ts"
      - "writable_scope:packages/agentplane/src/commands/task/external-agent-exchange-authority.ts"
      - "writable_scope:packages/agentplane/src/commands/task/external-agent-implementation-authority.ts"
      - "writable_scope:packages/agentplane/src/commands/task/external-agent-implementation-recovery.ts"
      - "writable_scope:packages/agentplane/src/commands/task/external-agent-planning-authority.ts"
      - "writable_scope:packages/agentplane/src/commands/task/external-agent-supervisor.ts"
      - "writable_scope:packages/agentplane/src/commands/task/external-agent-workflow-recovery.ts"
      - "writable_scope:packages/agentplane/src/commands/task/finish-closeout-journal.ts"
      - "writable_scope:packages/agentplane/src/commands/task/hosted-close-pr.types.ts"
      - "writable_scope:packages/agentplane/src/commands/task/hosted-close-premerge.ts"
      - "writable_scope:packages/agentplane/src/commands/task/kernel-accepted-repository-evidence.ts"
      - "writable_scope:packages/agentplane/src/commands/task/kernel-completed-external-rework.test.ts"
      - "writable_scope:packages/agentplane/src/commands/task/kernel-completed-external-rework.testkit.ts"
      - "writable_scope:packages/agentplane/src/commands/task/kernel-completed-native-review.ts"
      - "writable_scope:packages/agentplane/src/commands/task/kernel-corrective-authority.test.ts"
      - "writable_scope:packages/agentplane/src/commands/task/kernel-corrective-authority.ts"
      - "writable_scope:packages/agentplane/src/commands/task/kernel-cutover.ts"
      - "writable_scope:packages/agentplane/src/commands/task/kernel-exchange.test.ts"
      - "writable_scope:packages/agentplane/src/commands/task/kernel-final-validation.test.ts"
      - "writable_scope:packages/agentplane/src/commands/task/kernel-final-validation.ts"
      - "writable_scope:packages/agentplane/src/commands/task/kernel-inspection.ts"
      - "writable_scope:packages/agentplane/src/commands/task/kernel-operational-projection-recovery.test.ts"
      - "writable_scope:packages/agentplane/src/commands/task/kernel-operational-projection-recovery.ts"
      - "writable_scope:packages/agentplane/src/commands/task/kernel-operational-projection.test.ts"
      - "writable_scope:packages/agentplane/src/commands/task/kernel-operational-projection.ts"
      - "writable_scope:packages/agentplane/src/commands/task/kernel-plan-authority.test.ts"
      - "writable_scope:packages/agentplane/src/commands/task/kernel-plan-authority.ts"
      - "writable_scope:packages/agentplane/src/commands/task/kernel-plan.ts"
      - "writable_scope:packages/agentplane/src/commands/task/kernel-recipe-admission.ts"
      - "writable_scope:packages/agentplane/src/commands/task/kernel-report-only-completion.test.ts"
      - "writable_scope:packages/agentplane/src/commands/task/kernel-report-only-completion.ts"
      - "writable_scope:packages/agentplane/src/commands/task/kernel-repository-coordinator.ts"
      - "writable_scope:packages/agentplane/src/commands/task/kernel-reviewed-base-discovery.test.ts"
      - "writable_scope:packages/agentplane/src/commands/task/kernel-reviewed-base-import.test.ts"
      - "writable_scope:packages/agentplane/src/commands/task/kernel-reviewed-base-import.ts"
      - "writable_scope:packages/agentplane/src/commands/task/kernel-reviewed-base-tree.test.ts"
      - "writable_scope:packages/agentplane/src/commands/task/kernel-reviewed-base-tree.ts"
      - "writable_scope:packages/agentplane/src/commands/task/kernel-runtime-context.ts"
      - "writable_scope:packages/agentplane/src/commands/task/kernel-scoped-intake.test.ts"
      - "writable_scope:packages/agentplane/src/commands/task/kernel-work-order.ts"
      - "writable_scope:packages/agentplane/src/commands/task/migration-apply.ts"
      - "writable_scope:packages/agentplane/src/commands/task/plan-approve-reviewed-base.test.ts"
      - "writable_scope:packages/agentplane/src/commands/task/plan-approve.command.ts"
      - "writable_scope:packages/agentplane/src/commands/task/run-render.ts"
      - "writable_scope:packages/agentplane/src/commands/task/scaffold.ts"
      - "writable_scope:packages/agentplane/src/commands/task/shared/workflow-transition-service.ts"
      - "writable_scope:packages/agentplane/src/commands/task/verification-observation.test.ts"
      - "writable_scope:packages/agentplane/src/commands/task/verification-observation.ts"
      - "writable_scope:packages/agentplane/src/context/ingest-task-pack.test.ts"
      - "writable_scope:packages/agentplane/src/context/ingest-task.ts"
      - "writable_scope:packages/agentplane/src/context/knowledge-ref.ts"
      - "writable_scope:packages/agentplane/src/harness/state-machine.ts"
      - "writable_scope:packages/agentplane/src/policy/taxonomy.ts"
      - "writable_scope:packages/agentplane/src/ports/kernel-authority.ts"
      - "writable_scope:packages/agentplane/src/runner/context/prompt-module-bridge.ts"
      - "writable_scope:packages/agentplane/src/runner/context/recipe-role-context.ts"
      - "writable_scope:packages/agentplane/src/runner/context/roadmap-recipe-prompt.test.ts"
      - "writable_scope:packages/agentplane/src/runner/context/work-order-context.ts"
      - "writable_scope:packages/agentplane/src/runner/observation/git-snapshot/model.ts"
      - "writable_scope:packages/agentplane/src/runner/result-manifest.ts"
      - "writable_scope:packages/agentplane/src/runner/run-record-profile.ts"
      - "writable_scope:packages/agentplane/src/runner/types/state.ts"
      - "writable_scope:packages/agentplane/src/runner/usecases/agent-work-order-build.ts"
      - "writable_scope:packages/agentplane/src/runner/usecases/agent-work-order.integration.test.ts"
      - "writable_scope:packages/agentplane/src/runner/usecases/kernel-authority.test.ts"
      - "writable_scope:packages/agentplane/src/runner/usecases/kernel-authority.ts"
      - "writable_scope:packages/agentplane/src/runner/usecases/kernel-policy-renewal.ts"
      - "writable_scope:packages/agentplane/src/runner/usecases/kernel-task-lifecycle.ts"
      - "writable_scope:packages/agentplane/src/runner/usecases/task-knowledge-retrieval-query.ts"
      - "writable_scope:packages/agentplane/src/runner/usecases/task-knowledge-semantic-escalation.ts"
      - "writable_scope:packages/agentplane/src/runner/usecases/task-run-active-claim-record.ts"
      - "writable_scope:packages/agentplane/src/runner/usecases/task-run-active-claim.testkit.ts"
      - "writable_scope:packages/agentplane/src/runner/usecases/task-run-bootstrap.ts"
      - "writable_scope:packages/agentplane/src/runner/usecases/task-run-effect-resolution.test.ts"
      - "writable_scope:packages/agentplane/src/runner/usecases/task-run-lifecycle-result.ts"
      - "writable_scope:packages/agentplane/src/runner/usecases/task-run-missing-state-authority.ts"
      - "writable_scope:packages/agentplane/src/runner/usecases/task-run-orphaned-effect-guard.ts"
      - "writable_scope:packages/agentplane/src/runtime/harness/types.ts"
      - "writable_scope:packages/agentplane/src/runtime/prompt-modules/model.ts"
      - "writable_scope:packages/agentplane/src/runtime/sgr/contract-types.ts"
      - "writable_scope:packages/agentplane/src/runtime/shared/repo-cli-version.ts"
      - "writable_scope:packages/agentplane/src/runtime/task-execution-context/model.ts"
      - "writable_scope:packages/agentplane/src/shared/package-paths.ts"
      - "writable_scope:packages/agentplane/src/shared/preparation-trace.ts"
      - "writable_scope:packages/agentplane/src/shared/sqlite-driver.ts"
      - "writable_scope:packages/agentplane/src/workflow-runtime/migration.ts"
      - "writable_scope:packages/agentplane/test-fixtures/task-worktree-foreign-artifact-repair-fixture.ts"
      - "writable_scope:packages/core/package.json"
      - "writable_scope:packages/core/schemas/agent-work-order-v2.schema.json"
      - "writable_scope:packages/core/schemas/config.schema.json"
      - "writable_scope:packages/core/schemas/task-handoff.schema.json"
      - "writable_scope:packages/core/schemas/task-readme-frontmatter.schema.json"
      - "writable_scope:packages/core/schemas/tasks-export.schema.json"
      - "writable_scope:packages/core/schemas/workflow.schema.json"
      - "writable_scope:packages/core/src/config/schema.impl.ts"
      - "writable_scope:packages/core/src/git/git-utils.ts"
      - "writable_scope:packages/core/src/index.ts"
      - "writable_scope:packages/core/src/process/run-process.observation.test.ts"
      - "writable_scope:packages/core/src/process/run-process.ts"
      - "writable_scope:packages/core/src/runner/agent-work-order.ts"
      - "writable_scope:packages/core/src/runner/knowledge-ref.ts"
      - "writable_scope:packages/core/src/runner/recipe-role-context.test.ts"
      - "writable_scope:packages/core/src/runner/recipe-role-context.ts"
      - "writable_scope:packages/core/src/runner/runner-effect-operation.ts"
      - "writable_scope:packages/core/src/runner/supervisor-execution-episode-migration.ts"
      - "writable_scope:packages/core/src/runner/supervisor-execution-episode.ts"
      - "writable_scope:packages/core/src/schemas/index.ts"
      - "writable_scope:packages/core/src/schemas/iso-timestamp.test.ts"
      - "writable_scope:packages/core/src/schemas/iso-timestamp.ts"
      - "writable_scope:packages/core/src/tasks/index.ts"
      - "writable_scope:packages/core/src/tasks/kernel-plan-refinement.ts"
      - "writable_scope:packages/core/src/tasks/kernel-semantic.ts"
      - "writable_scope:packages/core/src/tasks/plan-execution-grant.ts"
      - "writable_scope:packages/core/src/tasks/supplied-plan-aggregate.ts"
      - "writable_scope:packages/core/src/tasks/task-artifact-schema.handoff.ts"
      - "writable_scope:packages/core/src/tasks/task-artifact-schema.shared.ts"
      - "writable_scope:packages/core/src/tasks/task-centric/model.ts"
      - "writable_scope:packages/core/src/tasks/task-centric/schema.ts"
      - "writable_scope:packages/core/src/tasks/task-kernel/authority-delta.test.ts"
      - "writable_scope:packages/core/src/tasks/task-kernel/authority-lineage.ts"
      - "writable_scope:packages/core/src/tasks/task-kernel/corrective-authority.test.ts"
      - "writable_scope:packages/core/src/tasks/task-kernel/corrective-authority.ts"
      - "writable_scope:packages/core/src/tasks/task-kernel/index.ts"
      - "writable_scope:packages/core/src/tasks/task-kernel/invariants.ts"
      - "writable_scope:packages/core/src/tasks/task-kernel/kernel.ts"
      - "writable_scope:packages/core/src/tasks/task-kernel/model.ts"
      - "writable_scope:packages/core/src/tasks/task-store.ts"
      - "writable_scope:packages/recipes/package.json"
      - "writable_scope:packages/recipes/src/compiled-contracts.ts"
      - "writable_scope:packages/recipes/src/manifest-contracts.ts"
      - "writable_scope:packages/recipes/src/manifest.ts"
      - "writable_scope:packages/spec/schemas/agent-work-order-v2.schema.json"
      - "writable_scope:packages/spec/schemas/config.schema.json"
      - "writable_scope:packages/spec/schemas/task-handoff.schema.json"
      - "writable_scope:packages/spec/schemas/task-readme-frontmatter.schema.json"
      - "writable_scope:packages/spec/schemas/tasks-export.schema.json"
      - "writable_scope:packages/spec/schemas/workflow.schema.json"
      - "writable_scope:packages/testkit/src/cli-harness/temp-root-cleanup.integration.test.ts"
      - "writable_scope:schemas/agent-semantic-result.schema.json"
      - "writable_scope:schemas/agent-work-order-v2.schema.json"
      - "writable_scope:schemas/config.schema.json"
      - "writable_scope:schemas/execution-receipt.schema.json"
      - "writable_scope:schemas/task-handoff.schema.json"
      - "writable_scope:schemas/task-readme-frontmatter.schema.json"
      - "writable_scope:schemas/tasks-export.schema.json"
      - "writable_scope:schemas/workflow.schema.json"
      - "writable_scope:vitest.config.ts"
    changed_components:
      - ".agentplane"
      - ".prettierignore"
      - "artifacts"
      - "bun.lock"
      - "context"
      - "docs"
      - "eslint.config.cjs"
      - "package.json"
      - "packages/agentplane"
      - "packages/core"
      - "packages/recipes"
      - "packages/spec"
      - "packages/testkit"
      - "schemas"
      - "scripts"
      - "vitest.config.ts"
    changed_paths:
      - ".agentplane/policy/context.must.md"
      - ".agentplane/policy/dod.core.md"
      - ".agentplane/policy/dod.docs.md"
      - ".agentplane/policy/examples/migration-note.md"
      - ".agentplane/policy/governance.md"
      - ".agentplane/policy/security.must.md"
      - ".agentplane/policy/workflow.branch_pr.md"
      - ".agentplane/policy/workflow.direct.md"
      - ".agentplane/policy/workflow.md"
      - ".agentplane/policy/workflow.release.md"
      - ".agentplane/policy/workflow.upgrade.md"
      - ".agentplane/tasks/202610020159-60QH9J/README.md"
      - ".agentplane/tasks/202610020159-60QH9J/pr/diffstat.txt"
      - ".agentplane/tasks/202610020159-60QH9J/pr/github-body.md"
      - ".agentplane/tasks/202610020159-60QH9J/pr/github-title.txt"
      - ".agentplane/tasks/202610020159-60QH9J/pr/meta.json"
      - ".agentplane/tasks/202610020159-60QH9J/pr/review.md"
      - ".agentplane/tasks/202610020159-60QH9J/quality/objects/sha256/3843bff288bb14b89e3366c8d7dec5532bcc3f35106b624f48f00047b3593844.json"
      - ".agentplane/tasks/202610020159-60QH9J/quality/objects/sha256/42b9e36673a3cc9bf23e38c4d451a9668ffb475c35f74aeb00f272aa861dd9cc.json"
      - ".agentplane/tasks/202610020159-60QH9J/quality/objects/sha256/78dd518372ace9dcbe508e9366b5020456fbc1d869ce4e6ce802a4dd9ecd357a.json"
      - ".agentplane/tasks/202610020159-60QH9J/supervision/declared-checks.json"
      - ".agentplane/tasks/202610020159-60QH9J/supervision/implementation-evidence.json"
      - ".agentplane/tasks/202610020159-60QH9J/verification/20261005205447553-d6d6686c6a8a01d3.json"
      - ".agentplane/tasks/202610020159-60QH9J/verification/20261005223905618-0396b72ba13e2c83.json"
      - ".agentplane/tasks/202610020159-60QH9J/verification/20261005230826992-23e0b9424c6c69fe.json"
      - ".agentplane/tasks/202610080726-0JHB26/README.md"
      - ".agentplane/tasks/202610080726-0JHB26/pr/diffstat.txt"
      - ".agentplane/tasks/202610080726-0JHB26/pr/github-body.md"
      - ".agentplane/tasks/202610080726-0JHB26/pr/github-title.txt"
      - ".agentplane/tasks/202610080726-0JHB26/pr/meta.json"
      - ".agentplane/tasks/202610080726-0JHB26/pr/review.md"
      - ".agentplane/tasks/202610080726-0JHB26/quality/20261008-154206362-recovery-context/evaluator-evidence-manifest.json"
      - ".agentplane/tasks/202610080726-0JHB26/quality/20261008-154206362-recovery-context/evaluator-follow-up.json"
      - ".agentplane/tasks/202610080726-0JHB26/quality/20261008-154206362-recovery-context/evaluator-opinion.md"
      - ".agentplane/tasks/202610080726-0JHB26/quality/20261008-154206362-recovery-context/evaluator-result.json"
      - ".agentplane/tasks/202610080726-0JHB26/quality/20261008-154206362-recovery-context/evaluator-work-order.json"
      - ".agentplane/tasks/202610080726-0JHB26/quality/20261008-154206362-recovery-context/quality-report.json"
      - ".agentplane/tasks/202610080726-0JHB26/quality/20261008-155843556-recovery-context/evaluator-evidence-manifest.json"
      - ".agentplane/tasks/202610080726-0JHB26/quality/20261008-155843556-recovery-context/evaluator-work-order.json"
      - ".agentplane/tasks/202610080726-0JHB26/quality/20261010-034407402-recovery-context/evaluator-evidence-manifest.json"
      - ".agentplane/tasks/202610080726-0JHB26/quality/20261010-034407402-recovery-context/evaluator-opinion.md"
      - ".agentplane/tasks/202610080726-0JHB26/quality/20261010-034407402-recovery-context/evaluator-result.json"
      - ".agentplane/tasks/202610080726-0JHB26/quality/20261010-034407402-recovery-context/evaluator-work-order.json"
      - ".agentplane/tasks/202610080726-0JHB26/quality/20261010-034407402-recovery-context/quality-report.json"
      - ".agentplane/tasks/202610080726-0JHB26/quality/objects/sha256/42b9e36673a3cc9bf23e38c4d451a9668ffb475c35f74aeb00f272aa861dd9cc.json"
      - ".agentplane/tasks/202610080726-0JHB26/quality/objects/sha256/6b013e24f814eba6b8136e36997905960dda4fb7e22682171c0b484688bc0977.json"
      - ".agentplane/tasks/202610080726-0JHB26/quality/objects/sha256/78dd518372ace9dcbe508e9366b5020456fbc1d869ce4e6ce802a4dd9ecd357a.json"
      - ".agentplane/tasks/202610080726-0JHB26/quality/objects/sha256/872fdcf271df312c7037ea4134f47b6ac3f50e6d686fc1ada29a5d67c5f0c5c0.md"
      - ".agentplane/tasks/202610080726-0JHB26/quality/objects/sha256/8d9959fee0db986395d856f24ff509d4eb7ba9af18c76949c095fce62c59bebd.md"
      - ".agentplane/tasks/202610080726-0JHB26/quality/objects/sha256/9037cdf98253e70333ede9358d360264a85ee905be64a8723bbdd4ca71e02d4a.json"
      - ".agentplane/tasks/202610080726-0JHB26/quality/objects/sha256/ba40a2a38d77adb9a4ef3479e1201194dc8f3beeaf66105f085f4d1298d214aa.md"
      - ".agentplane/tasks/202610080726-0JHB26/quality/objects/sha256/c345f5b1d9c58c323792137fb3cdaeed440202b090d25260b3ee0eeee772c8be.json"
      - ".agentplane/tasks/202610080726-0JHB26/quality/objects/sha256/cd35fbf396f0028e374b3f84595480f6edd9dcf606c23ee72655c873780bf2b2.json"
      - ".agentplane/tasks/202610080726-0JHB26/quality/objects/sha256/e01436d9127d88f273b2a19d4bb25a98a66b5273b579be373fc8a5cb2b6ddd89.json"
      - ".agentplane/tasks/202610080726-0JHB26/quality/objects/sha256/feed3ea63a7331cb8756f8d6ce742330d25c8dbedffa8826f001840f3ef63f80.patch"
      - ".agentplane/tasks/202610080726-0JHB26/supervision/declared-checks.json"
      - ".agentplane/tasks/202610080726-0JHB26/supervision/implementation-evidence.json"
      - ".agentplane/tasks/202610080726-0JHB26/verification/20261008084315402-354e1fad3c69fd76.json"
      - ".agentplane/tasks/202610080740-NDWDC5/README.md"
      - ".agentplane/tasks/202610080740-NDWDC5/pr/diffstat.txt"
      - ".agentplane/tasks/202610080740-NDWDC5/pr/github-body.md"
      - ".agentplane/tasks/202610080740-NDWDC5/pr/github-title.txt"
      - ".agentplane/tasks/202610080740-NDWDC5/pr/meta.json"
      - ".agentplane/tasks/202610080740-NDWDC5/pr/review.md"
      - ".agentplane/tasks/202610080740-NDWDC5/quality/objects/sha256/42b9e36673a3cc9bf23e38c4d451a9668ffb475c35f74aeb00f272aa861dd9cc.json"
      - ".agentplane/tasks/202610080740-NDWDC5/quality/objects/sha256/78dd518372ace9dcbe508e9366b5020456fbc1d869ce4e6ce802a4dd9ecd357a.json"
      - ".agentplane/tasks/202610080740-NDWDC5/quality/objects/sha256/cd35fbf396f0028e374b3f84595480f6edd9dcf606c23ee72655c873780bf2b2.json"
      - ".agentplane/tasks/202610080740-NDWDC5/supervision/declared-checks.json"
      - ".agentplane/tasks/202610080740-NDWDC5/supervision/implementation-evidence.json"
      - ".agentplane/tasks/202610080929-405MZ2/README.md"
      - ".agentplane/tasks/202610080929-405MZ2/pr/diffstat.txt"
      - ".agentplane/tasks/202610080929-405MZ2/pr/github-body.md"
      - ".agentplane/tasks/202610080929-405MZ2/pr/github-title.txt"
      - ".agentplane/tasks/202610080929-405MZ2/pr/meta.json"
      - ".agentplane/tasks/202610080929-405MZ2/pr/review.md"
      - ".agentplane/tasks/202610080929-405MZ2/quality/objects/sha256/42b9e36673a3cc9bf23e38c4d451a9668ffb475c35f74aeb00f272aa861dd9cc.json"
      - ".agentplane/tasks/202610080929-405MZ2/quality/objects/sha256/78dd518372ace9dcbe508e9366b5020456fbc1d869ce4e6ce802a4dd9ecd357a.json"
      - ".agentplane/tasks/202610080929-405MZ2/quality/objects/sha256/cd35fbf396f0028e374b3f84595480f6edd9dcf606c23ee72655c873780bf2b2.json"
      - ".agentplane/tasks/202610080929-405MZ2/supervision/declared-checks.json"
      - ".agentplane/tasks/202610080929-405MZ2/supervision/implementation-evidence.json"
      - ".agentplane/tasks/202610080929-405MZ2/verification/20261008140930004-7308fe3545cb838f.json"
      - ".agentplane/tasks/202610081254-Z21QM3/README.md"
      - ".agentplane/tasks/202610081254-Z21QM3/pr/diffstat.txt"
      - ".agentplane/tasks/202610081254-Z21QM3/pr/github-body.md"
      - ".agentplane/tasks/202610081254-Z21QM3/pr/github-title.txt"
      - ".agentplane/tasks/202610081254-Z21QM3/pr/meta.json"
      - ".agentplane/tasks/202610081254-Z21QM3/pr/review.md"
      - ".agentplane/tasks/202610081254-Z21QM3/quality/objects/sha256/42b9e36673a3cc9bf23e38c4d451a9668ffb475c35f74aeb00f272aa861dd9cc.json"
      - ".agentplane/tasks/202610081254-Z21QM3/quality/objects/sha256/78dd518372ace9dcbe508e9366b5020456fbc1d869ce4e6ce802a4dd9ecd357a.json"
      - ".agentplane/tasks/202610081254-Z21QM3/quality/objects/sha256/cd35fbf396f0028e374b3f84595480f6edd9dcf606c23ee72655c873780bf2b2.json"
      - ".agentplane/tasks/202610081254-Z21QM3/supervision/declared-checks.json"
      - ".agentplane/tasks/202610081254-Z21QM3/supervision/implementation-evidence.json"
      - ".agentplane/tasks/202610081254-Z21QM3/verification/20261008131049932-b5f691d407e737f9.json"
      - ".agentplane/tasks/202610081424-21WCFZ/README.md"
      - ".agentplane/tasks/202610081424-21WCFZ/quality/objects/sha256/42b9e36673a3cc9bf23e38c4d451a9668ffb475c35f74aeb00f272aa861dd9cc.json"
      - ".agentplane/tasks/202610081424-21WCFZ/quality/objects/sha256/78dd518372ace9dcbe508e9366b5020456fbc1d869ce4e6ce802a4dd9ecd357a.json"
      - ".agentplane/tasks/202610081424-21WCFZ/quality/objects/sha256/cd35fbf396f0028e374b3f84595480f6edd9dcf606c23ee72655c873780bf2b2.json"
      - ".agentplane/tasks/202610081424-21WCFZ/supervision/declared-checks.json"
      - ".agentplane/tasks/202610081424-21WCFZ/supervision/implementation-evidence.json"
      - ".agentplane/tasks/202610081722-JBCX2J/README.md"
      - ".agentplane/tasks/202610081722-JBCX2J/pr/diffstat.txt"
      - ".agentplane/tasks/202610081722-JBCX2J/pr/github-body.md"
      - ".agentplane/tasks/202610081722-JBCX2J/pr/github-title.txt"
      - ".agentplane/tasks/202610081722-JBCX2J/pr/meta.json"
      - ".agentplane/tasks/202610081722-JBCX2J/pr/review.md"
      - ".agentplane/tasks/202610081722-JBCX2J/quality/objects/sha256/42b9e36673a3cc9bf23e38c4d451a9668ffb475c35f74aeb00f272aa861dd9cc.json"
      - ".agentplane/tasks/202610081722-JBCX2J/quality/objects/sha256/78dd518372ace9dcbe508e9366b5020456fbc1d869ce4e6ce802a4dd9ecd357a.json"
      - ".agentplane/tasks/202610081722-JBCX2J/quality/objects/sha256/cd35fbf396f0028e374b3f84595480f6edd9dcf606c23ee72655c873780bf2b2.json"
      - ".agentplane/tasks/202610081722-JBCX2J/supervision/declared-checks.json"
      - ".agentplane/tasks/202610081722-JBCX2J/supervision/implementation-evidence.json"
      - ".agentplane/tasks/202610081722-JBCX2J/verification/20261008175024322-0c00f4dc25089c04.json"
      - ".agentplane/tasks/202610092153-WZDW5D/README.md"
      - ".agentplane/tasks/202610092153-WZDW5D/pr/diffstat.txt"
      - ".agentplane/tasks/202610092153-WZDW5D/pr/github-body.md"
      - ".agentplane/tasks/202610092153-WZDW5D/pr/github-title.txt"
      - ".agentplane/tasks/202610092153-WZDW5D/pr/meta.json"
      - ".agentplane/tasks/202610092153-WZDW5D/pr/review.md"
      - ".agentplane/tasks/202610092153-WZDW5D/quality/objects/sha256/42b9e36673a3cc9bf23e38c4d451a9668ffb475c35f74aeb00f272aa861dd9cc.json"
      - ".agentplane/tasks/202610092153-WZDW5D/quality/objects/sha256/78dd518372ace9dcbe508e9366b5020456fbc1d869ce4e6ce802a4dd9ecd357a.json"
      - ".agentplane/tasks/202610092153-WZDW5D/supervision/declared-checks.json"
      - ".agentplane/tasks/202610092153-WZDW5D/supervision/implementation-evidence.json"
      - ".agentplane/tasks/202610092153-WZDW5D/verification/20261010074913475-fa74fe3853d40f8f.json"
      - ".agentplane/tasks/202610100342-PXH679/README.md"
      - ".agentplane/tasks/202610100342-PXH679/pr/diffstat.txt"
      - ".agentplane/tasks/202610100342-PXH679/pr/github-body.md"
      - ".agentplane/tasks/202610100342-PXH679/pr/github-title.txt"
      - ".agentplane/tasks/202610100342-PXH679/pr/meta.json"
      - ".agentplane/tasks/202610100342-PXH679/pr/review.md"
      - ".agentplane/tasks/202610100342-PXH679/quality/objects/sha256/78dd518372ace9dcbe508e9366b5020456fbc1d869ce4e6ce802a4dd9ecd357a.json"
      - ".agentplane/tasks/202610100342-PXH679/quality/objects/sha256/cd35fbf396f0028e374b3f84595480f6edd9dcf606c23ee72655c873780bf2b2.json"
      - ".agentplane/tasks/202610100342-PXH679/supervision/declared-checks.json"
      - ".agentplane/tasks/202610100342-PXH679/supervision/implementation-evidence.json"
      - ".agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-000/children/run-000/failures.jsonl"
      - ".agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-000/children/run-000/manifest.json"
      - ".agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-000/children/run-000/status.json"
      - ".agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-000/children/run-000/stderr.jsonl"
      - ".agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-000/children/run-000/stdout.jsonl"
      - ".agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-000/failures.jsonl"
      - ".agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-000/manifest.json"
      - ".agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-000/status.json"
      - ".agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-000/stderr.jsonl"
      - ".agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-000/stdout.jsonl"
      - ".agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-001/children/run-000/failures.jsonl"
      - ".agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-001/children/run-000/manifest.json"
      - ".agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-001/children/run-000/status.json"
      - ".agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-001/children/run-000/stderr.jsonl"
      - ".agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-001/children/run-000/stdout.jsonl"
      - ".agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-001/children/run-001/failures.jsonl"
      - ".agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-001/children/run-001/manifest.json"
      - ".agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-001/children/run-001/status.json"
      - ".agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-001/children/run-001/stderr.jsonl"
      - ".agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-001/children/run-001/stdout.jsonl"
      - ".agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-001/children/run-002/failures.jsonl"
      - ".agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-001/children/run-002/manifest.json"
      - ".agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-001/children/run-002/status.json"
      - ".agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-001/children/run-002/stderr.jsonl"
      - ".agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-001/children/run-002/stdout.jsonl"
      - ".agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-001/children/run-003/failures.jsonl"
      - ".agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-001/children/run-003/manifest.json"
      - ".agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-001/children/run-003/status.json"
      - ".agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-001/children/run-003/stderr.jsonl"
      - ".agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-001/children/run-003/stdout.jsonl"
      - ".agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-001/children/run-004/failures.jsonl"
      - ".agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-001/children/run-004/manifest.json"
      - ".agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-001/children/run-004/status.json"
      - ".agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-001/children/run-004/stderr.jsonl"
      - ".agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-001/children/run-004/stdout.jsonl"
      - ".agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-001/failures.jsonl"
      - ".agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-001/manifest.json"
      - ".agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-001/status.json"
      - ".agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-001/stderr.jsonl"
      - ".agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-001/stdout.jsonl"
      - ".agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-002/children/run-000/failures.jsonl"
      - ".agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-002/children/run-000/manifest.json"
      - ".agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-002/children/run-000/status.json"
      - ".agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-002/children/run-000/stderr.jsonl"
      - ".agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-002/children/run-000/stdout.jsonl"
      - ".agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-002/failures.jsonl"
      - ".agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-002/manifest.json"
      - ".agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-002/status.json"
      - ".agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-002/stderr.jsonl"
      - ".agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-002/stdout.jsonl"
      - ".agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-003/children/run-000/failures.jsonl"
      - ".agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-003/children/run-000/manifest.json"
      - ".agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-003/children/run-000/status.json"
      - ".agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-003/children/run-000/stderr.jsonl"
      - ".agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-003/children/run-000/stdout.jsonl"
      - ".agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-003/children/run-001/failures.jsonl"
      - ".agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-003/children/run-001/manifest.json"
      - ".agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-003/children/run-001/status.json"
      - ".agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-003/children/run-001/stderr.jsonl"
      - ".agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-003/children/run-001/stdout.jsonl"
      - ".agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-003/children/run-002/failures.jsonl"
      - ".agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-003/children/run-002/manifest.json"
      - ".agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-003/children/run-002/status.json"
      - ".agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-003/children/run-002/stderr.jsonl"
      - ".agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-003/children/run-002/stdout.jsonl"
      - ".agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-003/children/run-003/failures.jsonl"
      - ".agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-003/children/run-003/manifest.json"
      - ".agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-003/children/run-003/status.json"
      - ".agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-003/children/run-003/stderr.jsonl"
      - ".agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-003/children/run-003/stdout.jsonl"
      - ".agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-003/children/run-004/failures.jsonl"
      - ".agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-003/children/run-004/manifest.json"
      - ".agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-003/children/run-004/status.json"
      - ".agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-003/children/run-004/stderr.jsonl"
      - ".agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-003/children/run-004/stdout.jsonl"
      - ".agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-003/failures.jsonl"
      - ".agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-003/manifest.json"
      - ".agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-003/status.json"
      - ".agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-003/stderr.jsonl"
      - ".agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-003/stdout.jsonl"
      - ".prettierignore"
      - "artifacts/bench/m05-live-0.7.13/broker-qualification.md"
      - "artifacts/bench/m05-live-0.7.13/coding-corpus-qualification.json"
      - "artifacts/bench/m05-live-0.7.13/experiment-protocol.md"
      - "artifacts/bench/m05-live-0.7.13/oracle-framing-qualification.json"
      - "artifacts/bench/m05-live-0.7.13/subscription-protocol.md"
      - "artifacts/bench/m05-live-0.7.13/subscription-registration.json"
      - "bun.lock"
      - "context/wiki/index.md"
      - "context/wiki/proposals/index.md"
      - "context/wiki/proposals/task-harvest/index.md"
      - "context/wiki/release-docs/concepts/index.md"
      - "context/wiki/release-docs/domains/index.md"
      - "context/wiki/release-docs/release-lines/index.md"
      - "context/wiki/reports/index.md"
      - "context/wiki/task-harvest/index.md"
      - "docs/developer/modular-prompt-assembly.mdx"
      - "docs/developer/testing-and-quality.mdx"
      - "docs/releases/v0.7.1.md"
      - "docs/releases/v0.7.13-acceptance.md"
      - "docs/releases/v0.7.13.md"
      - "docs/user/cli-reference.generated.mdx"
      - "docs/user/task-lifecycle.mdx"
      - "eslint.config.cjs"
      - "package.json"
      - "packages/agentplane/assets/AGENTS.md"
      - "packages/agentplane/assets/RUNNER.md"
      - "packages/agentplane/assets/policy/context.must.md"
      - "packages/agentplane/assets/policy/dod.core.md"
      - "packages/agentplane/assets/policy/dod.docs.md"
      - "packages/agentplane/assets/policy/examples/migration-note.md"
      - "packages/agentplane/assets/policy/governance.md"
      - "packages/agentplane/assets/policy/security.must.md"
      - "packages/agentplane/assets/policy/workflow.branch_pr.md"
      - "packages/agentplane/assets/policy/workflow.direct.md"
      - "packages/agentplane/assets/policy/workflow.md"
      - "packages/agentplane/assets/policy/workflow.release.md"
      - "packages/agentplane/assets/policy/workflow.upgrade.md"
      - "packages/agentplane/package.json"
      - "packages/agentplane/src/adapters/task-backend/kernel-authority-schema.ts"
      - "packages/agentplane/src/adapters/task-backend/kernel-backend-adapter.test.ts"
      - "packages/agentplane/src/adapters/task-backend/kernel-backend-adapter.ts"
      - "packages/agentplane/src/adapters/task-backend/kernel-backend-reconciliation.test.ts"
      - "packages/agentplane/src/adapters/task-backend/kernel-documents.ts"
      - "packages/agentplane/src/adapters/task-backend/kernel-record.ts"
      - "packages/agentplane/src/agents/agents-template.test.ts"
      - "packages/agentplane/src/agents/agents-template.ts"
      - "packages/agentplane/src/backends/task-backend/local-backend-read.ts"
      - "packages/agentplane/src/backends/task-backend/shared/types.ts"
      - "packages/agentplane/src/cli/command-invocations.ts"
      - "packages/agentplane/src/cli/reason-codes.ts"
      - "packages/agentplane/src/cli/run-cli.core.kernel-projection.testkit.ts"
      - "packages/agentplane/src/cli/run-cli.core.roadmap-recipe-v2-entrypoint.test.ts"
      - "packages/agentplane/src/cli/run-cli/command-catalog-loader.ts"
      - "packages/agentplane/src/cli/run-cli/command-catalog/command-session.ts"
      - "packages/agentplane/src/cli/run-cli/command-catalog/task.ts"
      - "packages/agentplane/src/cli/run-cli/command-loaders/task.ts"
      - "packages/agentplane/src/cli/run-cli/commands/core/preflight-report-drift.ts"
      - "packages/agentplane/src/cli/run-cli/commands/init/model.ts"
      - "packages/agentplane/src/cli/run-cli/deferred-runtime-loader.ts"
      - "packages/agentplane/src/cli/run-cli/globals.ts"
      - "packages/agentplane/src/cli/task-advance-effect-recovery.testkit.ts"
      - "packages/agentplane/src/cli/verification-contract.test.ts"
      - "packages/agentplane/src/commands/context/context.spec.ts"
      - "packages/agentplane/src/commands/evaluator/evaluator-artifact-port.ts"
      - "packages/agentplane/src/commands/evaluator/evaluator-evidence-store.ts"
      - "packages/agentplane/src/commands/evaluator/evaluator-review-apply.test.ts"
      - "packages/agentplane/src/commands/evaluator/evaluator-review-apply.ts"
      - "packages/agentplane/src/commands/evaluator/evaluator-work-order.ts"
      - "packages/agentplane/src/commands/evaluator/evaluator.command.ts"
      - "packages/agentplane/src/commands/evidence/evidence-manifest.ts"
      - "packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts"
      - "packages/agentplane/src/commands/guard/impl/commit-diagnostics.ts"
      - "packages/agentplane/src/commands/pr/flow-status.ts"
      - "packages/agentplane/src/commands/pr/integrate/cmd.protected-base.test.ts"
      - "packages/agentplane/src/commands/pr/integrate/cmd.test.ts"
      - "packages/agentplane/src/commands/pr/integrate/internal/post-integrate-bootstrap.ts"
      - "packages/agentplane/src/commands/pr/integrate/queue-state-types.ts"
      - "packages/agentplane/src/commands/pr/internal/git-host-identity.test.ts"
      - "packages/agentplane/src/commands/pr/internal/git-host-identity.ts"
      - "packages/agentplane/src/commands/pr/internal/sync-frozen-base.test.ts"
      - "packages/agentplane/src/commands/recipes.list.test.ts"
      - "packages/agentplane/src/commands/recipes/impl/index.ts"
      - "packages/agentplane/src/commands/shared/declared-check.ts"
      - "packages/agentplane/src/commands/shared/native-task-identity-fixture.ts"
      - "packages/agentplane/src/commands/shared/native-task-identity.ts"
      - "packages/agentplane/src/commands/shared/prompt-graph-diagnostics.ts"
      - "packages/agentplane/src/commands/shared/reconcile-check.ts"
      - "packages/agentplane/src/commands/shared/reconcile-native-applicability.test.ts"
      - "packages/agentplane/src/commands/shared/route-guidance.ts"
      - "packages/agentplane/src/commands/shared/route-oracle.ts"
      - "packages/agentplane/src/commands/shared/source-confidence.ts"
      - "packages/agentplane/src/commands/shared/task-verification-input-types.ts"
      - "packages/agentplane/src/commands/shared/task-worktree-foreign-artifact-history-proof.ts"
      - "packages/agentplane/src/commands/shared/task-worktree-foreign-artifact-repair.test.ts"
      - "packages/agentplane/src/commands/shared/task-worktree-foreign-artifact-repair.ts"
      - "packages/agentplane/src/commands/task/advance-task-step.ts"
      - "packages/agentplane/src/commands/task/agent-work-context-contract.ts"
      - "packages/agentplane/src/commands/task/corrective-authority.command.ts"
      - "packages/agentplane/src/commands/task/create-plan-proposal.test.ts"
      - "packages/agentplane/src/commands/task/create-plan-proposal.ts"
      - "packages/agentplane/src/commands/task/direct-task-verification-checks.ts"
      - "packages/agentplane/src/commands/task/direct-task-verification-observation.ts"
      - "packages/agentplane/src/commands/task/direct-task-verification.observability.test.ts"
      - "packages/agentplane/src/commands/task/direct-task-verification.qualification.test.ts"
      - "packages/agentplane/src/commands/task/direct-task-verification.sequence.cases.ts"
      - "packages/agentplane/src/commands/task/direct-task-verification.test.ts"
      - "packages/agentplane/src/commands/task/direct-task-verification.ts"
      - "packages/agentplane/src/commands/task/external-agent-evaluator-input.ts"
      - "packages/agentplane/src/commands/task/external-agent-evaluator-recovery.ts"
      - "packages/agentplane/src/commands/task/external-agent-evaluator.ts"
      - "packages/agentplane/src/commands/task/external-agent-exchange-authority.ts"
      - "packages/agentplane/src/commands/task/external-agent-implementation-authority.ts"
      - "packages/agentplane/src/commands/task/external-agent-implementation-recovery.ts"
      - "packages/agentplane/src/commands/task/external-agent-planning-authority.ts"
      - "packages/agentplane/src/commands/task/external-agent-supervisor.ts"
      - "packages/agentplane/src/commands/task/external-agent-workflow-recovery.ts"
      - "packages/agentplane/src/commands/task/finish-closeout-journal.ts"
      - "packages/agentplane/src/commands/task/hosted-close-pr.types.ts"
      - "packages/agentplane/src/commands/task/hosted-close-premerge.ts"
      - "packages/agentplane/src/commands/task/kernel-accepted-repository-evidence.ts"
      - "packages/agentplane/src/commands/task/kernel-completed-external-rework.test.ts"
      - "packages/agentplane/src/commands/task/kernel-completed-external-rework.testkit.ts"
      - "packages/agentplane/src/commands/task/kernel-completed-native-review.ts"
      - "packages/agentplane/src/commands/task/kernel-corrective-authority.test.ts"
      - "packages/agentplane/src/commands/task/kernel-corrective-authority.ts"
      - "packages/agentplane/src/commands/task/kernel-cutover.ts"
      - "packages/agentplane/src/commands/task/kernel-exchange.test.ts"
      - "packages/agentplane/src/commands/task/kernel-final-validation.test.ts"
      - "packages/agentplane/src/commands/task/kernel-final-validation.ts"
      - "packages/agentplane/src/commands/task/kernel-inspection.ts"
      - "packages/agentplane/src/commands/task/kernel-operational-projection-recovery.test.ts"
      - "packages/agentplane/src/commands/task/kernel-operational-projection-recovery.ts"
      - "packages/agentplane/src/commands/task/kernel-operational-projection.test.ts"
      - "packages/agentplane/src/commands/task/kernel-operational-projection.ts"
      - "packages/agentplane/src/commands/task/kernel-plan-authority.test.ts"
      - "packages/agentplane/src/commands/task/kernel-plan-authority.ts"
      - "packages/agentplane/src/commands/task/kernel-plan.ts"
      - "packages/agentplane/src/commands/task/kernel-recipe-admission.ts"
      - "packages/agentplane/src/commands/task/kernel-report-only-completion.test.ts"
      - "packages/agentplane/src/commands/task/kernel-report-only-completion.ts"
      - "packages/agentplane/src/commands/task/kernel-repository-coordinator.ts"
      - "packages/agentplane/src/commands/task/kernel-reviewed-base-discovery.test.ts"
      - "packages/agentplane/src/commands/task/kernel-reviewed-base-import.test.ts"
      - "packages/agentplane/src/commands/task/kernel-reviewed-base-import.ts"
      - "packages/agentplane/src/commands/task/kernel-reviewed-base-tree.test.ts"
      - "packages/agentplane/src/commands/task/kernel-reviewed-base-tree.ts"
      - "packages/agentplane/src/commands/task/kernel-runtime-context.ts"
      - "packages/agentplane/src/commands/task/kernel-scoped-intake.test.ts"
      - "packages/agentplane/src/commands/task/kernel-work-order.ts"
      - "packages/agentplane/src/commands/task/migration-apply.ts"
      - "packages/agentplane/src/commands/task/plan-approve-reviewed-base.test.ts"
      - "packages/agentplane/src/commands/task/plan-approve.command.ts"
      - "packages/agentplane/src/commands/task/run-render.ts"
      - "packages/agentplane/src/commands/task/scaffold.ts"
      - "packages/agentplane/src/commands/task/shared/workflow-transition-service.ts"
      - "packages/agentplane/src/commands/task/verification-observation.test.ts"
      - "packages/agentplane/src/commands/task/verification-observation.ts"
      - "packages/agentplane/src/context/ingest-task-pack.test.ts"
      - "packages/agentplane/src/context/ingest-task.ts"
      - "packages/agentplane/src/context/knowledge-ref.ts"
      - "packages/agentplane/src/harness/state-machine.ts"
      - "packages/agentplane/src/policy/taxonomy.ts"
      - "packages/agentplane/src/ports/kernel-authority.ts"
      - "packages/agentplane/src/runner/context/prompt-module-bridge.ts"
      - "packages/agentplane/src/runner/context/recipe-role-context.ts"
      - "packages/agentplane/src/runner/context/roadmap-recipe-prompt.test.ts"
      - "packages/agentplane/src/runner/context/work-order-context.ts"
      - "packages/agentplane/src/runner/observation/git-snapshot/model.ts"
      - "packages/agentplane/src/runner/result-manifest.ts"
      - "packages/agentplane/src/runner/run-record-profile.ts"
      - "packages/agentplane/src/runner/types/state.ts"
      - "packages/agentplane/src/runner/usecases/agent-work-order-build.ts"
      - "packages/agentplane/src/runner/usecases/agent-work-order.integration.test.ts"
      - "packages/agentplane/src/runner/usecases/kernel-authority.test.ts"
      - "packages/agentplane/src/runner/usecases/kernel-authority.ts"
      - "packages/agentplane/src/runner/usecases/kernel-policy-renewal.ts"
      - "packages/agentplane/src/runner/usecases/kernel-task-lifecycle.ts"
      - "packages/agentplane/src/runner/usecases/task-knowledge-retrieval-query.ts"
      - "packages/agentplane/src/runner/usecases/task-knowledge-semantic-escalation.ts"
      - "packages/agentplane/src/runner/usecases/task-run-active-claim-record.ts"
      - "packages/agentplane/src/runner/usecases/task-run-active-claim.testkit.ts"
      - "packages/agentplane/src/runner/usecases/task-run-bootstrap.ts"
      - "packages/agentplane/src/runner/usecases/task-run-effect-resolution.test.ts"
      - "packages/agentplane/src/runner/usecases/task-run-lifecycle-result.ts"
      - "packages/agentplane/src/runner/usecases/task-run-missing-state-authority.ts"
      - "packages/agentplane/src/runner/usecases/task-run-orphaned-effect-guard.ts"
      - "packages/agentplane/src/runtime/harness/types.ts"
      - "packages/agentplane/src/runtime/prompt-modules/model.ts"
      - "packages/agentplane/src/runtime/sgr/contract-types.ts"
      - "packages/agentplane/src/runtime/shared/repo-cli-version.ts"
      - "packages/agentplane/src/runtime/task-execution-context/model.ts"
      - "packages/agentplane/src/shared/package-paths.ts"
      - "packages/agentplane/src/shared/preparation-trace.ts"
      - "packages/agentplane/src/shared/sqlite-driver.ts"
      - "packages/agentplane/src/workflow-runtime/migration.ts"
      - "packages/agentplane/test-fixtures/task-worktree-foreign-artifact-repair-fixture.ts"
      - "packages/core/package.json"
      - "packages/core/schemas/agent-work-order-v2.schema.json"
      - "packages/core/schemas/config.schema.json"
      - "packages/core/schemas/task-handoff.schema.json"
      - "packages/core/schemas/task-readme-frontmatter.schema.json"
      - "packages/core/schemas/tasks-export.schema.json"
      - "packages/core/schemas/workflow.schema.json"
      - "packages/core/src/config/schema.impl.ts"
      - "packages/core/src/git/git-utils.ts"
      - "packages/core/src/index.ts"
      - "packages/core/src/process/run-process.observation.test.ts"
      - "packages/core/src/process/run-process.ts"
      - "packages/core/src/runner/agent-work-order.ts"
      - "packages/core/src/runner/knowledge-ref.ts"
      - "packages/core/src/runner/recipe-role-context.test.ts"
      - "packages/core/src/runner/recipe-role-context.ts"
      - "packages/core/src/runner/runner-effect-operation.ts"
      - "packages/core/src/runner/supervisor-execution-episode-migration.ts"
      - "packages/core/src/runner/supervisor-execution-episode.ts"
      - "packages/core/src/schemas/index.ts"
      - "packages/core/src/schemas/iso-timestamp.test.ts"
      - "packages/core/src/schemas/iso-timestamp.ts"
      - "packages/core/src/tasks/index.ts"
      - "packages/core/src/tasks/kernel-plan-refinement.ts"
      - "packages/core/src/tasks/kernel-semantic.ts"
      - "packages/core/src/tasks/plan-execution-grant.ts"
      - "packages/core/src/tasks/supplied-plan-aggregate.ts"
      - "packages/core/src/tasks/task-artifact-schema.handoff.ts"
      - "packages/core/src/tasks/task-artifact-schema.shared.ts"
      - "packages/core/src/tasks/task-centric/model.ts"
      - "packages/core/src/tasks/task-centric/schema.ts"
      - "packages/core/src/tasks/task-kernel/authority-delta.test.ts"
      - "packages/core/src/tasks/task-kernel/authority-lineage.ts"
      - "packages/core/src/tasks/task-kernel/corrective-authority.test.ts"
      - "packages/core/src/tasks/task-kernel/corrective-authority.ts"
      - "packages/core/src/tasks/task-kernel/index.ts"
      - "packages/core/src/tasks/task-kernel/invariants.ts"
      - "packages/core/src/tasks/task-kernel/kernel.ts"
      - "packages/core/src/tasks/task-kernel/model.ts"
      - "packages/core/src/tasks/task-store.ts"
      - "packages/recipes/package.json"
      - "packages/recipes/src/compiled-contracts.ts"
      - "packages/recipes/src/manifest-contracts.ts"
      - "packages/recipes/src/manifest.ts"
      - "packages/spec/schemas/agent-work-order-v2.schema.json"
      - "packages/spec/schemas/config.schema.json"
      - "packages/spec/schemas/task-handoff.schema.json"
      - "packages/spec/schemas/task-readme-frontmatter.schema.json"
      - "packages/spec/schemas/tasks-export.schema.json"
      - "packages/spec/schemas/workflow.schema.json"
      - "packages/testkit/src/cli-harness/temp-root-cleanup.integration.test.ts"
      - "schemas/agent-semantic-result.schema.json"
      - "schemas/agent-work-order-v2.schema.json"
      - "schemas/config.schema.json"
      - "schemas/execution-receipt.schema.json"
      - "schemas/task-handoff.schema.json"
      - "schemas/task-readme-frontmatter.schema.json"
      - "schemas/tasks-export.schema.json"
      - "schemas/workflow.schema.json"
      - "scripts/baselines/v0.7-compatibility-candidate.json"
      - "scripts/baselines/v0.7-pr6095-cli-review.json"
      - "scripts/bench/internal/paired-m05/app-server-host-probe.mjs"
      - "scripts/bench/internal/paired-m05/app-server-port.mjs"
      - "scripts/bench/internal/paired-m05/boundary.mjs"
      - "scripts/bench/internal/paired-m05/boundary.test.mjs"
      - "scripts/bench/internal/paired-m05/broker-configuration.mjs"
      - "scripts/bench/internal/paired-m05/broker-worker.mjs"
      - "scripts/bench/internal/paired-m05/broker-worker.test.mjs"
      - "scripts/bench/internal/paired-m05/brokered-app-server.mjs"
      - "scripts/bench/internal/paired-m05/brokered-app-server.test.mjs"
      - "scripts/bench/internal/paired-m05/coding-corpus.mjs"
      - "scripts/bench/internal/paired-m05/coding-corpus.test.mjs"
      - "scripts/bench/internal/paired-m05/coding-host.mjs"
      - "scripts/bench/internal/paired-m05/coding-host.test.mjs"
      - "scripts/bench/internal/paired-m05/coding-recipe-package.mjs"
      - "scripts/bench/internal/paired-m05/coding-recipe.mjs"
      - "scripts/bench/internal/paired-m05/coding-recipe.test.mjs"
      - "scripts/bench/internal/paired-m05/contract.mjs"
      - "scripts/bench/internal/paired-m05/isolation.mjs"
      - "scripts/bench/internal/paired-m05/isolation.test.mjs"
      - "scripts/bench/internal/paired-m05/journal.mjs"
      - "scripts/bench/internal/paired-m05/landlock-runner.py"
      - "scripts/bench/internal/paired-m05/ledger.mjs"
      - "scripts/bench/internal/paired-m05/ledger.test.mjs"
      - "scripts/bench/internal/paired-m05/native-coding-cli.test.mjs"
      - "scripts/bench/internal/paired-m05/native-coding-evidence.mjs"
      - "scripts/bench/internal/paired-m05/native-coding-loop.mjs"
      - "scripts/bench/internal/paired-m05/native-coding-loop.test.mjs"
      - "scripts/bench/internal/paired-m05/native-coding-port.mjs"
      - "scripts/bench/internal/paired-m05/public-compiler-feedback.mjs"
      - "scripts/bench/internal/paired-m05/public-compiler-feedback.test.mjs"
      - "scripts/bench/internal/paired-m05/public-interface-feedback.mjs"
      - "scripts/bench/internal/paired-m05/public-interface-feedback.test.mjs"
      - "scripts/bench/internal/paired-m05/public-package-feedback.mjs"
      - "scripts/bench/internal/paired-m05/public-package-feedback.test.mjs"
      - "scripts/bench/internal/paired-m05/public-product-contract.mjs"
      - "scripts/bench/internal/paired-m05/qualify-oracle-framing.mjs"
      - "scripts/bench/internal/paired-m05/report.mjs"
      - "scripts/bench/internal/paired-m05/report.test.mjs"
      - "scripts/bench/internal/paired-m05/semantic-coding-port.mjs"
      - "scripts/bench/internal/paired-m05/semantic-coding-port.test.mjs"
      - "scripts/bench/internal/paired-m05/stable-file.mjs"
      - "scripts/bench/internal/paired-m05/stable-file.test.mjs"
      - "scripts/bench/internal/paired-m05/subscription-analysis.mjs"
      - "scripts/bench/internal/paired-m05/subscription-boundary.mjs"
      - "scripts/bench/internal/paired-m05/subscription-contract.mjs"
      - "scripts/bench/internal/paired-m05/subscription-ledger.mjs"
      - "scripts/bench/internal/paired-m05/subscription-registration.mjs"
      - "scripts/bench/internal/paired-m05/subscription-report.mjs"
      - "scripts/bench/internal/paired-m05/subscription-report.test.mjs"
      - "scripts/bench/internal/paired-m05/subscription-setup-host.mjs"
      - "scripts/bench/internal/paired-m05/subscription-setup-host.test.mjs"
      - "scripts/bench/internal/paired-m05/subscription.test.mjs"
      - "scripts/bench/paired-live-codex-launcher.mjs"
      - "scripts/bench/paired-live-codex-launcher.test.mjs"
      - "scripts/bench/paired-m05-offline.test.mjs"
      - "scripts/bench/paired-m05-setup.mjs"
      - "scripts/bench/paired-production-driver.mjs"
      - "scripts/bench/paired-production-driver.test.mjs"
      - "scripts/bench/paired-result-report.mjs"
      - "scripts/bench/paired-result-report.test.mjs"
      - "scripts/checks/check-compatibility-contract-baseline.mjs"
      - "scripts/checks/run-local-ci-group.mjs"
      - "scripts/checks/run-local-ci.mjs"
      - "scripts/lib/local-ci-resource-profile.mjs"
      - "scripts/lib/local-ci-resource-profile.test.mjs"
      - "scripts/lib/verification-failures-reporter.mjs"
      - "scripts/lib/verification-observation.mjs"
      - "scripts/lib/verification-observation.test.mjs"
      - "scripts/lib/verification-scheduler.d.ts"
      - "scripts/lib/verification-scheduler.mjs"
      - "scripts/lib/verification-scheduler.test.mjs"
      - "scripts/release/check-local-tarball-install-smoke.mjs"
      - "scripts/release/installed-recipe-matrix.mjs"
      - "vitest.config.ts"
    external_effects: []
    repository_effects:
      - "dependencies"
      - "documentation"
      - "public_api"
      - "release_metadata"
      - "repository_write"
      - "schema"
      - "source_code"
      - "tests"
    verification_results:
      -
        id: "recorded-check-1"
        result: "pass"
      -
        id: "recorded-check-10"
        result: "pass"
      -
        id: "recorded-check-11"
        result: "pass"
      -
        id: "recorded-check-12"
        result: "pass"
      -
        id: "recorded-check-13"
        result: "pass"
      -
        id: "recorded-check-14"
        result: "pass"
      -
        id: "recorded-check-15"
        result: "pass"
      -
        id: "recorded-check-16"
        result: "pass"
      -
        id: "recorded-check-17"
        result: "pass"
      -
        id: "recorded-check-2"
        result: "pass"
      -
        id: "recorded-check-3"
        result: "pass"
      -
        id: "recorded-check-4"
        result: "pass"
      -
        id: "recorded-check-5"
        result: "pass"
      -
        id: "recorded-check-6"
        result: "pass"
      -
        id: "recorded-check-7"
        result: "pass"
      -
        id: "recorded-check-8"
        result: "pass"
      -
        id: "recorded-check-9"
        result: "pass"
      -
        id: "verification-record"
        result: "pass"
  reason_codes:
    - "agent_preferred_branch_pr"
    - "effect_ci"
    - "observed_effect_dependencies"
    - "observed_effect_public_api"
    - "observed_effect_release_metadata"
    - "observed_effect_schema"
    - "observed_path_outside_scope:.agentplane/policy/context.must.md"
    - "observed_path_outside_scope:.agentplane/policy/dod.core.md"
    - "observed_path_outside_scope:.agentplane/policy/dod.docs.md"
    - "observed_path_outside_scope:.agentplane/policy/examples/migration-note.md"
    - "observed_path_outside_scope:.agentplane/policy/governance.md"
    - "observed_path_outside_scope:.agentplane/policy/security.must.md"
    - "observed_path_outside_scope:.agentplane/policy/workflow.branch_pr.md"
    - "observed_path_outside_scope:.agentplane/policy/workflow.direct.md"
    - "observed_path_outside_scope:.agentplane/policy/workflow.md"
    - "observed_path_outside_scope:.agentplane/policy/workflow.release.md"
    - "observed_path_outside_scope:.agentplane/policy/workflow.upgrade.md"
    - "observed_path_outside_scope:.agentplane/tasks/202610020159-60QH9J/README.md"
    - "observed_path_outside_scope:.agentplane/tasks/202610020159-60QH9J/pr/diffstat.txt"
    - "observed_path_outside_scope:.agentplane/tasks/202610020159-60QH9J/pr/github-body.md"
    - "observed_path_outside_scope:.agentplane/tasks/202610020159-60QH9J/pr/github-title.txt"
    - "observed_path_outside_scope:.agentplane/tasks/202610020159-60QH9J/pr/meta.json"
    - "observed_path_outside_scope:.agentplane/tasks/202610020159-60QH9J/pr/review.md"
    - "observed_path_outside_scope:.agentplane/tasks/202610020159-60QH9J/quality/objects/sha256/3843bff288bb14b89e3366c8d7dec5532bcc3f35106b624f48f00047b3593844.json"
    - "observed_path_outside_scope:.agentplane/tasks/202610020159-60QH9J/quality/objects/sha256/42b9e36673a3cc9bf23e38c4d451a9668ffb475c35f74aeb00f272aa861dd9cc.json"
    - "observed_path_outside_scope:.agentplane/tasks/202610020159-60QH9J/quality/objects/sha256/78dd518372ace9dcbe508e9366b5020456fbc1d869ce4e6ce802a4dd9ecd357a.json"
    - "observed_path_outside_scope:.agentplane/tasks/202610020159-60QH9J/supervision/declared-checks.json"
    - "observed_path_outside_scope:.agentplane/tasks/202610020159-60QH9J/supervision/implementation-evidence.json"
    - "observed_path_outside_scope:.agentplane/tasks/202610020159-60QH9J/verification/20261005205447553-d6d6686c6a8a01d3.json"
    - "observed_path_outside_scope:.agentplane/tasks/202610020159-60QH9J/verification/20261005223905618-0396b72ba13e2c83.json"
    - "observed_path_outside_scope:.agentplane/tasks/202610020159-60QH9J/verification/20261005230826992-23e0b9424c6c69fe.json"
    - "observed_path_outside_scope:.agentplane/tasks/202610080726-0JHB26/README.md"
    - "observed_path_outside_scope:.agentplane/tasks/202610080726-0JHB26/pr/diffstat.txt"
    - "observed_path_outside_scope:.agentplane/tasks/202610080726-0JHB26/pr/github-body.md"
    - "observed_path_outside_scope:.agentplane/tasks/202610080726-0JHB26/pr/github-title.txt"
    - "observed_path_outside_scope:.agentplane/tasks/202610080726-0JHB26/pr/meta.json"
    - "observed_path_outside_scope:.agentplane/tasks/202610080726-0JHB26/pr/review.md"
    - "observed_path_outside_scope:.agentplane/tasks/202610080726-0JHB26/quality/20261008-154206362-recovery-context/evaluator-evidence-manifest.json"
    - "observed_path_outside_scope:.agentplane/tasks/202610080726-0JHB26/quality/20261008-154206362-recovery-context/evaluator-follow-up.json"
    - "observed_path_outside_scope:.agentplane/tasks/202610080726-0JHB26/quality/20261008-154206362-recovery-context/evaluator-opinion.md"
    - "observed_path_outside_scope:.agentplane/tasks/202610080726-0JHB26/quality/20261008-154206362-recovery-context/evaluator-result.json"
    - "observed_path_outside_scope:.agentplane/tasks/202610080726-0JHB26/quality/20261008-154206362-recovery-context/evaluator-work-order.json"
    - "observed_path_outside_scope:.agentplane/tasks/202610080726-0JHB26/quality/20261008-154206362-recovery-context/quality-report.json"
    - "observed_path_outside_scope:.agentplane/tasks/202610080726-0JHB26/quality/20261008-155843556-recovery-context/evaluator-evidence-manifest.json"
    - "observed_path_outside_scope:.agentplane/tasks/202610080726-0JHB26/quality/20261008-155843556-recovery-context/evaluator-work-order.json"
    - "observed_path_outside_scope:.agentplane/tasks/202610080726-0JHB26/quality/20261010-034407402-recovery-context/evaluator-evidence-manifest.json"
    - "observed_path_outside_scope:.agentplane/tasks/202610080726-0JHB26/quality/20261010-034407402-recovery-context/evaluator-opinion.md"
    - "observed_path_outside_scope:.agentplane/tasks/202610080726-0JHB26/quality/20261010-034407402-recovery-context/evaluator-result.json"
    - "observed_path_outside_scope:.agentplane/tasks/202610080726-0JHB26/quality/20261010-034407402-recovery-context/evaluator-work-order.json"
    - "observed_path_outside_scope:.agentplane/tasks/202610080726-0JHB26/quality/20261010-034407402-recovery-context/quality-report.json"
    - "observed_path_outside_scope:.agentplane/tasks/202610080726-0JHB26/quality/objects/sha256/42b9e36673a3cc9bf23e38c4d451a9668ffb475c35f74aeb00f272aa861dd9cc.json"
    - "observed_path_outside_scope:.agentplane/tasks/202610080726-0JHB26/quality/objects/sha256/6b013e24f814eba6b8136e36997905960dda4fb7e22682171c0b484688bc0977.json"
    - "observed_path_outside_scope:.agentplane/tasks/202610080726-0JHB26/quality/objects/sha256/78dd518372ace9dcbe508e9366b5020456fbc1d869ce4e6ce802a4dd9ecd357a.json"
    - "observed_path_outside_scope:.agentplane/tasks/202610080726-0JHB26/quality/objects/sha256/872fdcf271df312c7037ea4134f47b6ac3f50e6d686fc1ada29a5d67c5f0c5c0.md"
    - "observed_path_outside_scope:.agentplane/tasks/202610080726-0JHB26/quality/objects/sha256/8d9959fee0db986395d856f24ff509d4eb7ba9af18c76949c095fce62c59bebd.md"
    - "observed_path_outside_scope:.agentplane/tasks/202610080726-0JHB26/quality/objects/sha256/9037cdf98253e70333ede9358d360264a85ee905be64a8723bbdd4ca71e02d4a.json"
    - "observed_path_outside_scope:.agentplane/tasks/202610080726-0JHB26/quality/objects/sha256/ba40a2a38d77adb9a4ef3479e1201194dc8f3beeaf66105f085f4d1298d214aa.md"
    - "observed_path_outside_scope:.agentplane/tasks/202610080726-0JHB26/quality/objects/sha256/c345f5b1d9c58c323792137fb3cdaeed440202b090d25260b3ee0eeee772c8be.json"
    - "observed_path_outside_scope:.agentplane/tasks/202610080726-0JHB26/quality/objects/sha256/cd35fbf396f0028e374b3f84595480f6edd9dcf606c23ee72655c873780bf2b2.json"
    - "observed_path_outside_scope:.agentplane/tasks/202610080726-0JHB26/quality/objects/sha256/e01436d9127d88f273b2a19d4bb25a98a66b5273b579be373fc8a5cb2b6ddd89.json"
    - "observed_path_outside_scope:.agentplane/tasks/202610080726-0JHB26/quality/objects/sha256/feed3ea63a7331cb8756f8d6ce742330d25c8dbedffa8826f001840f3ef63f80.patch"
    - "observed_path_outside_scope:.agentplane/tasks/202610080726-0JHB26/supervision/declared-checks.json"
    - "observed_path_outside_scope:.agentplane/tasks/202610080726-0JHB26/supervision/implementation-evidence.json"
    - "observed_path_outside_scope:.agentplane/tasks/202610080726-0JHB26/verification/20261008084315402-354e1fad3c69fd76.json"
    - "observed_path_outside_scope:.agentplane/tasks/202610080740-NDWDC5/README.md"
    - "observed_path_outside_scope:.agentplane/tasks/202610080740-NDWDC5/pr/diffstat.txt"
    - "observed_path_outside_scope:.agentplane/tasks/202610080740-NDWDC5/pr/github-body.md"
    - "observed_path_outside_scope:.agentplane/tasks/202610080740-NDWDC5/pr/github-title.txt"
    - "observed_path_outside_scope:.agentplane/tasks/202610080740-NDWDC5/pr/meta.json"
    - "observed_path_outside_scope:.agentplane/tasks/202610080740-NDWDC5/pr/review.md"
    - "observed_path_outside_scope:.agentplane/tasks/202610080740-NDWDC5/quality/objects/sha256/42b9e36673a3cc9bf23e38c4d451a9668ffb475c35f74aeb00f272aa861dd9cc.json"
    - "observed_path_outside_scope:.agentplane/tasks/202610080740-NDWDC5/quality/objects/sha256/78dd518372ace9dcbe508e9366b5020456fbc1d869ce4e6ce802a4dd9ecd357a.json"
    - "observed_path_outside_scope:.agentplane/tasks/202610080740-NDWDC5/quality/objects/sha256/cd35fbf396f0028e374b3f84595480f6edd9dcf606c23ee72655c873780bf2b2.json"
    - "observed_path_outside_scope:.agentplane/tasks/202610080740-NDWDC5/supervision/declared-checks.json"
    - "observed_path_outside_scope:.agentplane/tasks/202610080740-NDWDC5/supervision/implementation-evidence.json"
    - "observed_path_outside_scope:.agentplane/tasks/202610080929-405MZ2/README.md"
    - "observed_path_outside_scope:.agentplane/tasks/202610080929-405MZ2/pr/diffstat.txt"
    - "observed_path_outside_scope:.agentplane/tasks/202610080929-405MZ2/pr/github-body.md"
    - "observed_path_outside_scope:.agentplane/tasks/202610080929-405MZ2/pr/github-title.txt"
    - "observed_path_outside_scope:.agentplane/tasks/202610080929-405MZ2/pr/meta.json"
    - "observed_path_outside_scope:.agentplane/tasks/202610080929-405MZ2/pr/review.md"
    - "observed_path_outside_scope:.agentplane/tasks/202610080929-405MZ2/quality/objects/sha256/42b9e36673a3cc9bf23e38c4d451a9668ffb475c35f74aeb00f272aa861dd9cc.json"
    - "observed_path_outside_scope:.agentplane/tasks/202610080929-405MZ2/quality/objects/sha256/78dd518372ace9dcbe508e9366b5020456fbc1d869ce4e6ce802a4dd9ecd357a.json"
    - "observed_path_outside_scope:.agentplane/tasks/202610080929-405MZ2/quality/objects/sha256/cd35fbf396f0028e374b3f84595480f6edd9dcf606c23ee72655c873780bf2b2.json"
    - "observed_path_outside_scope:.agentplane/tasks/202610080929-405MZ2/supervision/declared-checks.json"
    - "observed_path_outside_scope:.agentplane/tasks/202610080929-405MZ2/supervision/implementation-evidence.json"
    - "observed_path_outside_scope:.agentplane/tasks/202610080929-405MZ2/verification/20261008140930004-7308fe3545cb838f.json"
    - "observed_path_outside_scope:.agentplane/tasks/202610081254-Z21QM3/README.md"
    - "observed_path_outside_scope:.agentplane/tasks/202610081254-Z21QM3/pr/diffstat.txt"
    - "observed_path_outside_scope:.agentplane/tasks/202610081254-Z21QM3/pr/github-body.md"
    - "observed_path_outside_scope:.agentplane/tasks/202610081254-Z21QM3/pr/github-title.txt"
    - "observed_path_outside_scope:.agentplane/tasks/202610081254-Z21QM3/pr/meta.json"
    - "observed_path_outside_scope:.agentplane/tasks/202610081254-Z21QM3/pr/review.md"
    - "observed_path_outside_scope:.agentplane/tasks/202610081254-Z21QM3/quality/objects/sha256/42b9e36673a3cc9bf23e38c4d451a9668ffb475c35f74aeb00f272aa861dd9cc.json"
    - "observed_path_outside_scope:.agentplane/tasks/202610081254-Z21QM3/quality/objects/sha256/78dd518372ace9dcbe508e9366b5020456fbc1d869ce4e6ce802a4dd9ecd357a.json"
    - "observed_path_outside_scope:.agentplane/tasks/202610081254-Z21QM3/quality/objects/sha256/cd35fbf396f0028e374b3f84595480f6edd9dcf606c23ee72655c873780bf2b2.json"
    - "observed_path_outside_scope:.agentplane/tasks/202610081254-Z21QM3/supervision/declared-checks.json"
    - "observed_path_outside_scope:.agentplane/tasks/202610081254-Z21QM3/supervision/implementation-evidence.json"
    - "observed_path_outside_scope:.agentplane/tasks/202610081254-Z21QM3/verification/20261008131049932-b5f691d407e737f9.json"
    - "observed_path_outside_scope:.agentplane/tasks/202610081424-21WCFZ/README.md"
    - "observed_path_outside_scope:.agentplane/tasks/202610081424-21WCFZ/quality/objects/sha256/42b9e36673a3cc9bf23e38c4d451a9668ffb475c35f74aeb00f272aa861dd9cc.json"
    - "observed_path_outside_scope:.agentplane/tasks/202610081424-21WCFZ/quality/objects/sha256/78dd518372ace9dcbe508e9366b5020456fbc1d869ce4e6ce802a4dd9ecd357a.json"
    - "observed_path_outside_scope:.agentplane/tasks/202610081424-21WCFZ/quality/objects/sha256/cd35fbf396f0028e374b3f84595480f6edd9dcf606c23ee72655c873780bf2b2.json"
    - "observed_path_outside_scope:.agentplane/tasks/202610081424-21WCFZ/supervision/declared-checks.json"
    - "observed_path_outside_scope:.agentplane/tasks/202610081424-21WCFZ/supervision/implementation-evidence.json"
    - "observed_path_outside_scope:.agentplane/tasks/202610081722-JBCX2J/README.md"
    - "observed_path_outside_scope:.agentplane/tasks/202610081722-JBCX2J/pr/diffstat.txt"
    - "observed_path_outside_scope:.agentplane/tasks/202610081722-JBCX2J/pr/github-body.md"
    - "observed_path_outside_scope:.agentplane/tasks/202610081722-JBCX2J/pr/github-title.txt"
    - "observed_path_outside_scope:.agentplane/tasks/202610081722-JBCX2J/pr/meta.json"
    - "observed_path_outside_scope:.agentplane/tasks/202610081722-JBCX2J/pr/review.md"
    - "observed_path_outside_scope:.agentplane/tasks/202610081722-JBCX2J/quality/objects/sha256/42b9e36673a3cc9bf23e38c4d451a9668ffb475c35f74aeb00f272aa861dd9cc.json"
    - "observed_path_outside_scope:.agentplane/tasks/202610081722-JBCX2J/quality/objects/sha256/78dd518372ace9dcbe508e9366b5020456fbc1d869ce4e6ce802a4dd9ecd357a.json"
    - "observed_path_outside_scope:.agentplane/tasks/202610081722-JBCX2J/quality/objects/sha256/cd35fbf396f0028e374b3f84595480f6edd9dcf606c23ee72655c873780bf2b2.json"
    - "observed_path_outside_scope:.agentplane/tasks/202610081722-JBCX2J/supervision/declared-checks.json"
    - "observed_path_outside_scope:.agentplane/tasks/202610081722-JBCX2J/supervision/implementation-evidence.json"
    - "observed_path_outside_scope:.agentplane/tasks/202610081722-JBCX2J/verification/20261008175024322-0c00f4dc25089c04.json"
    - "observed_path_outside_scope:.agentplane/tasks/202610092153-WZDW5D/README.md"
    - "observed_path_outside_scope:.agentplane/tasks/202610092153-WZDW5D/pr/diffstat.txt"
    - "observed_path_outside_scope:.agentplane/tasks/202610092153-WZDW5D/pr/github-body.md"
    - "observed_path_outside_scope:.agentplane/tasks/202610092153-WZDW5D/pr/github-title.txt"
    - "observed_path_outside_scope:.agentplane/tasks/202610092153-WZDW5D/pr/meta.json"
    - "observed_path_outside_scope:.agentplane/tasks/202610092153-WZDW5D/pr/review.md"
    - "observed_path_outside_scope:.agentplane/tasks/202610092153-WZDW5D/quality/objects/sha256/42b9e36673a3cc9bf23e38c4d451a9668ffb475c35f74aeb00f272aa861dd9cc.json"
    - "observed_path_outside_scope:.agentplane/tasks/202610092153-WZDW5D/quality/objects/sha256/78dd518372ace9dcbe508e9366b5020456fbc1d869ce4e6ce802a4dd9ecd357a.json"
    - "observed_path_outside_scope:.agentplane/tasks/202610092153-WZDW5D/supervision/declared-checks.json"
    - "observed_path_outside_scope:.agentplane/tasks/202610092153-WZDW5D/supervision/implementation-evidence.json"
    - "observed_path_outside_scope:.agentplane/tasks/202610092153-WZDW5D/verification/20261010074913475-fa74fe3853d40f8f.json"
    - "observed_path_outside_scope:.agentplane/tasks/202610100342-PXH679/README.md"
    - "observed_path_outside_scope:.agentplane/tasks/202610100342-PXH679/pr/diffstat.txt"
    - "observed_path_outside_scope:.agentplane/tasks/202610100342-PXH679/pr/github-body.md"
    - "observed_path_outside_scope:.agentplane/tasks/202610100342-PXH679/pr/github-title.txt"
    - "observed_path_outside_scope:.agentplane/tasks/202610100342-PXH679/pr/meta.json"
    - "observed_path_outside_scope:.agentplane/tasks/202610100342-PXH679/pr/review.md"
    - "observed_path_outside_scope:.agentplane/tasks/202610100342-PXH679/quality/objects/sha256/78dd518372ace9dcbe508e9366b5020456fbc1d869ce4e6ce802a4dd9ecd357a.json"
    - "observed_path_outside_scope:.agentplane/tasks/202610100342-PXH679/quality/objects/sha256/cd35fbf396f0028e374b3f84595480f6edd9dcf606c23ee72655c873780bf2b2.json"
    - "observed_path_outside_scope:.agentplane/tasks/202610100342-PXH679/supervision/declared-checks.json"
    - "observed_path_outside_scope:.agentplane/tasks/202610100342-PXH679/supervision/implementation-evidence.json"
    - "observed_path_outside_scope:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-000/children/run-000/failures.jsonl"
    - "observed_path_outside_scope:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-000/children/run-000/manifest.json"
    - "observed_path_outside_scope:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-000/children/run-000/status.json"
    - "observed_path_outside_scope:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-000/children/run-000/stderr.jsonl"
    - "observed_path_outside_scope:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-000/children/run-000/stdout.jsonl"
    - "observed_path_outside_scope:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-000/failures.jsonl"
    - "observed_path_outside_scope:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-000/manifest.json"
    - "observed_path_outside_scope:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-000/status.json"
    - "observed_path_outside_scope:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-000/stderr.jsonl"
    - "observed_path_outside_scope:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-000/stdout.jsonl"
    - "observed_path_outside_scope:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-001/children/run-000/failures.jsonl"
    - "observed_path_outside_scope:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-001/children/run-000/manifest.json"
    - "observed_path_outside_scope:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-001/children/run-000/status.json"
    - "observed_path_outside_scope:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-001/children/run-000/stderr.jsonl"
    - "observed_path_outside_scope:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-001/children/run-000/stdout.jsonl"
    - "observed_path_outside_scope:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-001/children/run-001/failures.jsonl"
    - "observed_path_outside_scope:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-001/children/run-001/manifest.json"
    - "observed_path_outside_scope:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-001/children/run-001/status.json"
    - "observed_path_outside_scope:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-001/children/run-001/stderr.jsonl"
    - "observed_path_outside_scope:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-001/children/run-001/stdout.jsonl"
    - "observed_path_outside_scope:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-001/children/run-002/failures.jsonl"
    - "observed_path_outside_scope:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-001/children/run-002/manifest.json"
    - "observed_path_outside_scope:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-001/children/run-002/status.json"
    - "observed_path_outside_scope:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-001/children/run-002/stderr.jsonl"
    - "observed_path_outside_scope:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-001/children/run-002/stdout.jsonl"
    - "observed_path_outside_scope:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-001/children/run-003/failures.jsonl"
    - "observed_path_outside_scope:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-001/children/run-003/manifest.json"
    - "observed_path_outside_scope:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-001/children/run-003/status.json"
    - "observed_path_outside_scope:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-001/children/run-003/stderr.jsonl"
    - "observed_path_outside_scope:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-001/children/run-003/stdout.jsonl"
    - "observed_path_outside_scope:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-001/children/run-004/failures.jsonl"
    - "observed_path_outside_scope:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-001/children/run-004/manifest.json"
    - "observed_path_outside_scope:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-001/children/run-004/status.json"
    - "observed_path_outside_scope:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-001/children/run-004/stderr.jsonl"
    - "observed_path_outside_scope:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-001/children/run-004/stdout.jsonl"
    - "observed_path_outside_scope:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-001/failures.jsonl"
    - "observed_path_outside_scope:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-001/manifest.json"
    - "observed_path_outside_scope:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-001/status.json"
    - "observed_path_outside_scope:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-001/stderr.jsonl"
    - "observed_path_outside_scope:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-001/stdout.jsonl"
    - "observed_path_outside_scope:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-002/children/run-000/failures.jsonl"
    - "observed_path_outside_scope:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-002/children/run-000/manifest.json"
    - "observed_path_outside_scope:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-002/children/run-000/status.json"
    - "observed_path_outside_scope:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-002/children/run-000/stderr.jsonl"
    - "observed_path_outside_scope:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-002/children/run-000/stdout.jsonl"
    - "observed_path_outside_scope:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-002/failures.jsonl"
    - "observed_path_outside_scope:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-002/manifest.json"
    - "observed_path_outside_scope:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-002/status.json"
    - "observed_path_outside_scope:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-002/stderr.jsonl"
    - "observed_path_outside_scope:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-002/stdout.jsonl"
    - "observed_path_outside_scope:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-003/children/run-000/failures.jsonl"
    - "observed_path_outside_scope:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-003/children/run-000/manifest.json"
    - "observed_path_outside_scope:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-003/children/run-000/status.json"
    - "observed_path_outside_scope:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-003/children/run-000/stderr.jsonl"
    - "observed_path_outside_scope:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-003/children/run-000/stdout.jsonl"
    - "observed_path_outside_scope:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-003/children/run-001/failures.jsonl"
    - "observed_path_outside_scope:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-003/children/run-001/manifest.json"
    - "observed_path_outside_scope:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-003/children/run-001/status.json"
    - "observed_path_outside_scope:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-003/children/run-001/stderr.jsonl"
    - "observed_path_outside_scope:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-003/children/run-001/stdout.jsonl"
    - "observed_path_outside_scope:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-003/children/run-002/failures.jsonl"
    - "observed_path_outside_scope:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-003/children/run-002/manifest.json"
    - "observed_path_outside_scope:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-003/children/run-002/status.json"
    - "observed_path_outside_scope:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-003/children/run-002/stderr.jsonl"
    - "observed_path_outside_scope:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-003/children/run-002/stdout.jsonl"
    - "observed_path_outside_scope:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-003/children/run-003/failures.jsonl"
    - "observed_path_outside_scope:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-003/children/run-003/manifest.json"
    - "observed_path_outside_scope:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-003/children/run-003/status.json"
    - "observed_path_outside_scope:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-003/children/run-003/stderr.jsonl"
    - "observed_path_outside_scope:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-003/children/run-003/stdout.jsonl"
    - "observed_path_outside_scope:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-003/children/run-004/failures.jsonl"
    - "observed_path_outside_scope:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-003/children/run-004/manifest.json"
    - "observed_path_outside_scope:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-003/children/run-004/status.json"
    - "observed_path_outside_scope:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-003/children/run-004/stderr.jsonl"
    - "observed_path_outside_scope:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-003/children/run-004/stdout.jsonl"
    - "observed_path_outside_scope:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-003/failures.jsonl"
    - "observed_path_outside_scope:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-003/manifest.json"
    - "observed_path_outside_scope:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-003/status.json"
    - "observed_path_outside_scope:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-003/stderr.jsonl"
    - "observed_path_outside_scope:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-003/stdout.jsonl"
    - "observed_path_outside_scope:.prettierignore"
    - "observed_path_outside_scope:artifacts/bench/m05-live-0.7.13/broker-qualification.md"
    - "observed_path_outside_scope:artifacts/bench/m05-live-0.7.13/coding-corpus-qualification.json"
    - "observed_path_outside_scope:artifacts/bench/m05-live-0.7.13/experiment-protocol.md"
    - "observed_path_outside_scope:artifacts/bench/m05-live-0.7.13/oracle-framing-qualification.json"
    - "observed_path_outside_scope:artifacts/bench/m05-live-0.7.13/subscription-protocol.md"
    - "observed_path_outside_scope:artifacts/bench/m05-live-0.7.13/subscription-registration.json"
    - "observed_path_outside_scope:bun.lock"
    - "observed_path_outside_scope:context/wiki/index.md"
    - "observed_path_outside_scope:context/wiki/proposals/index.md"
    - "observed_path_outside_scope:context/wiki/proposals/task-harvest/index.md"
    - "observed_path_outside_scope:context/wiki/release-docs/concepts/index.md"
    - "observed_path_outside_scope:context/wiki/release-docs/domains/index.md"
    - "observed_path_outside_scope:context/wiki/release-docs/release-lines/index.md"
    - "observed_path_outside_scope:context/wiki/reports/index.md"
    - "observed_path_outside_scope:context/wiki/task-harvest/index.md"
    - "observed_path_outside_scope:docs/developer/modular-prompt-assembly.mdx"
    - "observed_path_outside_scope:docs/developer/testing-and-quality.mdx"
    - "observed_path_outside_scope:docs/releases/v0.7.1.md"
    - "observed_path_outside_scope:docs/releases/v0.7.13-acceptance.md"
    - "observed_path_outside_scope:docs/releases/v0.7.13.md"
    - "observed_path_outside_scope:docs/user/cli-reference.generated.mdx"
    - "observed_path_outside_scope:docs/user/task-lifecycle.mdx"
    - "observed_path_outside_scope:eslint.config.cjs"
    - "observed_path_outside_scope:package.json"
    - "observed_path_outside_scope:packages/agentplane/assets/AGENTS.md"
    - "observed_path_outside_scope:packages/agentplane/assets/RUNNER.md"
    - "observed_path_outside_scope:packages/agentplane/assets/policy/context.must.md"
    - "observed_path_outside_scope:packages/agentplane/assets/policy/dod.core.md"
    - "observed_path_outside_scope:packages/agentplane/assets/policy/dod.docs.md"
    - "observed_path_outside_scope:packages/agentplane/assets/policy/examples/migration-note.md"
    - "observed_path_outside_scope:packages/agentplane/assets/policy/governance.md"
    - "observed_path_outside_scope:packages/agentplane/assets/policy/security.must.md"
    - "observed_path_outside_scope:packages/agentplane/assets/policy/workflow.branch_pr.md"
    - "observed_path_outside_scope:packages/agentplane/assets/policy/workflow.direct.md"
    - "observed_path_outside_scope:packages/agentplane/assets/policy/workflow.md"
    - "observed_path_outside_scope:packages/agentplane/assets/policy/workflow.release.md"
    - "observed_path_outside_scope:packages/agentplane/assets/policy/workflow.upgrade.md"
    - "observed_path_outside_scope:packages/agentplane/package.json"
    - "observed_path_outside_scope:packages/agentplane/src/adapters/task-backend/kernel-authority-schema.ts"
    - "observed_path_outside_scope:packages/agentplane/src/adapters/task-backend/kernel-backend-adapter.test.ts"
    - "observed_path_outside_scope:packages/agentplane/src/adapters/task-backend/kernel-backend-adapter.ts"
    - "observed_path_outside_scope:packages/agentplane/src/adapters/task-backend/kernel-backend-reconciliation.test.ts"
    - "observed_path_outside_scope:packages/agentplane/src/adapters/task-backend/kernel-documents.ts"
    - "observed_path_outside_scope:packages/agentplane/src/adapters/task-backend/kernel-record.ts"
    - "observed_path_outside_scope:packages/agentplane/src/agents/agents-template.test.ts"
    - "observed_path_outside_scope:packages/agentplane/src/agents/agents-template.ts"
    - "observed_path_outside_scope:packages/agentplane/src/backends/task-backend/local-backend-read.ts"
    - "observed_path_outside_scope:packages/agentplane/src/backends/task-backend/shared/types.ts"
    - "observed_path_outside_scope:packages/agentplane/src/cli/command-invocations.ts"
    - "observed_path_outside_scope:packages/agentplane/src/cli/reason-codes.ts"
    - "observed_path_outside_scope:packages/agentplane/src/cli/run-cli.core.kernel-projection.testkit.ts"
    - "observed_path_outside_scope:packages/agentplane/src/cli/run-cli.core.roadmap-recipe-v2-entrypoint.test.ts"
    - "observed_path_outside_scope:packages/agentplane/src/cli/run-cli/command-catalog-loader.ts"
    - "observed_path_outside_scope:packages/agentplane/src/cli/run-cli/command-catalog/command-session.ts"
    - "observed_path_outside_scope:packages/agentplane/src/cli/run-cli/command-catalog/task.ts"
    - "observed_path_outside_scope:packages/agentplane/src/cli/run-cli/command-loaders/task.ts"
    - "observed_path_outside_scope:packages/agentplane/src/cli/run-cli/commands/core/preflight-report-drift.ts"
    - "observed_path_outside_scope:packages/agentplane/src/cli/run-cli/commands/init/model.ts"
    - "observed_path_outside_scope:packages/agentplane/src/cli/run-cli/deferred-runtime-loader.ts"
    - "observed_path_outside_scope:packages/agentplane/src/cli/run-cli/globals.ts"
    - "observed_path_outside_scope:packages/agentplane/src/cli/task-advance-effect-recovery.testkit.ts"
    - "observed_path_outside_scope:packages/agentplane/src/cli/verification-contract.test.ts"
    - "observed_path_outside_scope:packages/agentplane/src/commands/context/context.spec.ts"
    - "observed_path_outside_scope:packages/agentplane/src/commands/evaluator/evaluator-artifact-port.ts"
    - "observed_path_outside_scope:packages/agentplane/src/commands/evaluator/evaluator-evidence-store.ts"
    - "observed_path_outside_scope:packages/agentplane/src/commands/evaluator/evaluator-review-apply.test.ts"
    - "observed_path_outside_scope:packages/agentplane/src/commands/evaluator/evaluator-review-apply.ts"
    - "observed_path_outside_scope:packages/agentplane/src/commands/evaluator/evaluator-work-order.ts"
    - "observed_path_outside_scope:packages/agentplane/src/commands/evaluator/evaluator.command.ts"
    - "observed_path_outside_scope:packages/agentplane/src/commands/evidence/evidence-manifest.ts"
    - "observed_path_outside_scope:packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts"
    - "observed_path_outside_scope:packages/agentplane/src/commands/guard/impl/commit-diagnostics.ts"
    - "observed_path_outside_scope:packages/agentplane/src/commands/pr/flow-status.ts"
    - "observed_path_outside_scope:packages/agentplane/src/commands/pr/integrate/cmd.protected-base.test.ts"
    - "observed_path_outside_scope:packages/agentplane/src/commands/pr/integrate/cmd.test.ts"
    - "observed_path_outside_scope:packages/agentplane/src/commands/pr/integrate/internal/post-integrate-bootstrap.ts"
    - "observed_path_outside_scope:packages/agentplane/src/commands/pr/integrate/queue-state-types.ts"
    - "observed_path_outside_scope:packages/agentplane/src/commands/pr/internal/git-host-identity.test.ts"
    - "observed_path_outside_scope:packages/agentplane/src/commands/pr/internal/git-host-identity.ts"
    - "observed_path_outside_scope:packages/agentplane/src/commands/pr/internal/sync-frozen-base.test.ts"
    - "observed_path_outside_scope:packages/agentplane/src/commands/recipes.list.test.ts"
    - "observed_path_outside_scope:packages/agentplane/src/commands/recipes/impl/index.ts"
    - "observed_path_outside_scope:packages/agentplane/src/commands/shared/declared-check.ts"
    - "observed_path_outside_scope:packages/agentplane/src/commands/shared/native-task-identity-fixture.ts"
    - "observed_path_outside_scope:packages/agentplane/src/commands/shared/native-task-identity.ts"
    - "observed_path_outside_scope:packages/agentplane/src/commands/shared/prompt-graph-diagnostics.ts"
    - "observed_path_outside_scope:packages/agentplane/src/commands/shared/reconcile-check.ts"
    - "observed_path_outside_scope:packages/agentplane/src/commands/shared/reconcile-native-applicability.test.ts"
    - "observed_path_outside_scope:packages/agentplane/src/commands/shared/route-guidance.ts"
    - "observed_path_outside_scope:packages/agentplane/src/commands/shared/route-oracle.ts"
    - "observed_path_outside_scope:packages/agentplane/src/commands/shared/source-confidence.ts"
    - "observed_path_outside_scope:packages/agentplane/src/commands/shared/task-verification-input-types.ts"
    - "observed_path_outside_scope:packages/agentplane/src/commands/shared/task-worktree-foreign-artifact-history-proof.ts"
    - "observed_path_outside_scope:packages/agentplane/src/commands/shared/task-worktree-foreign-artifact-repair.test.ts"
    - "observed_path_outside_scope:packages/agentplane/src/commands/shared/task-worktree-foreign-artifact-repair.ts"
    - "observed_path_outside_scope:packages/agentplane/src/commands/task/advance-task-step.ts"
    - "observed_path_outside_scope:packages/agentplane/src/commands/task/agent-work-context-contract.ts"
    - "observed_path_outside_scope:packages/agentplane/src/commands/task/corrective-authority.command.ts"
    - "observed_path_outside_scope:packages/agentplane/src/commands/task/create-plan-proposal.test.ts"
    - "observed_path_outside_scope:packages/agentplane/src/commands/task/create-plan-proposal.ts"
    - "observed_path_outside_scope:packages/agentplane/src/commands/task/direct-task-verification-checks.ts"
    - "observed_path_outside_scope:packages/agentplane/src/commands/task/direct-task-verification-observation.ts"
    - "observed_path_outside_scope:packages/agentplane/src/commands/task/direct-task-verification.observability.test.ts"
    - "observed_path_outside_scope:packages/agentplane/src/commands/task/direct-task-verification.qualification.test.ts"
    - "observed_path_outside_scope:packages/agentplane/src/commands/task/direct-task-verification.sequence.cases.ts"
    - "observed_path_outside_scope:packages/agentplane/src/commands/task/direct-task-verification.test.ts"
    - "observed_path_outside_scope:packages/agentplane/src/commands/task/direct-task-verification.ts"
    - "observed_path_outside_scope:packages/agentplane/src/commands/task/external-agent-evaluator-input.ts"
    - "observed_path_outside_scope:packages/agentplane/src/commands/task/external-agent-evaluator-recovery.ts"
    - "observed_path_outside_scope:packages/agentplane/src/commands/task/external-agent-evaluator.ts"
    - "observed_path_outside_scope:packages/agentplane/src/commands/task/external-agent-exchange-authority.ts"
    - "observed_path_outside_scope:packages/agentplane/src/commands/task/external-agent-implementation-authority.ts"
    - "observed_path_outside_scope:packages/agentplane/src/commands/task/external-agent-implementation-recovery.ts"
    - "observed_path_outside_scope:packages/agentplane/src/commands/task/external-agent-planning-authority.ts"
    - "observed_path_outside_scope:packages/agentplane/src/commands/task/external-agent-supervisor.ts"
    - "observed_path_outside_scope:packages/agentplane/src/commands/task/external-agent-workflow-recovery.ts"
    - "observed_path_outside_scope:packages/agentplane/src/commands/task/finish-closeout-journal.ts"
    - "observed_path_outside_scope:packages/agentplane/src/commands/task/hosted-close-pr.types.ts"
    - "observed_path_outside_scope:packages/agentplane/src/commands/task/hosted-close-premerge.ts"
    - "observed_path_outside_scope:packages/agentplane/src/commands/task/kernel-accepted-repository-evidence.ts"
    - "observed_path_outside_scope:packages/agentplane/src/commands/task/kernel-completed-external-rework.test.ts"
    - "observed_path_outside_scope:packages/agentplane/src/commands/task/kernel-completed-external-rework.testkit.ts"
    - "observed_path_outside_scope:packages/agentplane/src/commands/task/kernel-completed-native-review.ts"
    - "observed_path_outside_scope:packages/agentplane/src/commands/task/kernel-corrective-authority.test.ts"
    - "observed_path_outside_scope:packages/agentplane/src/commands/task/kernel-corrective-authority.ts"
    - "observed_path_outside_scope:packages/agentplane/src/commands/task/kernel-cutover.ts"
    - "observed_path_outside_scope:packages/agentplane/src/commands/task/kernel-exchange.test.ts"
    - "observed_path_outside_scope:packages/agentplane/src/commands/task/kernel-final-validation.test.ts"
    - "observed_path_outside_scope:packages/agentplane/src/commands/task/kernel-final-validation.ts"
    - "observed_path_outside_scope:packages/agentplane/src/commands/task/kernel-inspection.ts"
    - "observed_path_outside_scope:packages/agentplane/src/commands/task/kernel-operational-projection-recovery.test.ts"
    - "observed_path_outside_scope:packages/agentplane/src/commands/task/kernel-operational-projection-recovery.ts"
    - "observed_path_outside_scope:packages/agentplane/src/commands/task/kernel-operational-projection.test.ts"
    - "observed_path_outside_scope:packages/agentplane/src/commands/task/kernel-operational-projection.ts"
    - "observed_path_outside_scope:packages/agentplane/src/commands/task/kernel-plan-authority.test.ts"
    - "observed_path_outside_scope:packages/agentplane/src/commands/task/kernel-plan-authority.ts"
    - "observed_path_outside_scope:packages/agentplane/src/commands/task/kernel-plan.ts"
    - "observed_path_outside_scope:packages/agentplane/src/commands/task/kernel-recipe-admission.ts"
    - "observed_path_outside_scope:packages/agentplane/src/commands/task/kernel-report-only-completion.test.ts"
    - "observed_path_outside_scope:packages/agentplane/src/commands/task/kernel-report-only-completion.ts"
    - "observed_path_outside_scope:packages/agentplane/src/commands/task/kernel-repository-coordinator.ts"
    - "observed_path_outside_scope:packages/agentplane/src/commands/task/kernel-reviewed-base-discovery.test.ts"
    - "observed_path_outside_scope:packages/agentplane/src/commands/task/kernel-reviewed-base-import.test.ts"
    - "observed_path_outside_scope:packages/agentplane/src/commands/task/kernel-reviewed-base-import.ts"
    - "observed_path_outside_scope:packages/agentplane/src/commands/task/kernel-reviewed-base-tree.test.ts"
    - "observed_path_outside_scope:packages/agentplane/src/commands/task/kernel-reviewed-base-tree.ts"
    - "observed_path_outside_scope:packages/agentplane/src/commands/task/kernel-runtime-context.ts"
    - "observed_path_outside_scope:packages/agentplane/src/commands/task/kernel-scoped-intake.test.ts"
    - "observed_path_outside_scope:packages/agentplane/src/commands/task/kernel-work-order.ts"
    - "observed_path_outside_scope:packages/agentplane/src/commands/task/migration-apply.ts"
    - "observed_path_outside_scope:packages/agentplane/src/commands/task/plan-approve-reviewed-base.test.ts"
    - "observed_path_outside_scope:packages/agentplane/src/commands/task/plan-approve.command.ts"
    - "observed_path_outside_scope:packages/agentplane/src/commands/task/run-render.ts"
    - "observed_path_outside_scope:packages/agentplane/src/commands/task/scaffold.ts"
    - "observed_path_outside_scope:packages/agentplane/src/commands/task/shared/workflow-transition-service.ts"
    - "observed_path_outside_scope:packages/agentplane/src/commands/task/verification-observation.test.ts"
    - "observed_path_outside_scope:packages/agentplane/src/commands/task/verification-observation.ts"
    - "observed_path_outside_scope:packages/agentplane/src/context/ingest-task-pack.test.ts"
    - "observed_path_outside_scope:packages/agentplane/src/context/ingest-task.ts"
    - "observed_path_outside_scope:packages/agentplane/src/context/knowledge-ref.ts"
    - "observed_path_outside_scope:packages/agentplane/src/harness/state-machine.ts"
    - "observed_path_outside_scope:packages/agentplane/src/policy/taxonomy.ts"
    - "observed_path_outside_scope:packages/agentplane/src/ports/kernel-authority.ts"
    - "observed_path_outside_scope:packages/agentplane/src/runner/context/prompt-module-bridge.ts"
    - "observed_path_outside_scope:packages/agentplane/src/runner/context/recipe-role-context.ts"
    - "observed_path_outside_scope:packages/agentplane/src/runner/context/roadmap-recipe-prompt.test.ts"
    - "observed_path_outside_scope:packages/agentplane/src/runner/context/work-order-context.ts"
    - "observed_path_outside_scope:packages/agentplane/src/runner/observation/git-snapshot/model.ts"
    - "observed_path_outside_scope:packages/agentplane/src/runner/result-manifest.ts"
    - "observed_path_outside_scope:packages/agentplane/src/runner/run-record-profile.ts"
    - "observed_path_outside_scope:packages/agentplane/src/runner/types/state.ts"
    - "observed_path_outside_scope:packages/agentplane/src/runner/usecases/agent-work-order-build.ts"
    - "observed_path_outside_scope:packages/agentplane/src/runner/usecases/agent-work-order.integration.test.ts"
    - "observed_path_outside_scope:packages/agentplane/src/runner/usecases/kernel-authority.test.ts"
    - "observed_path_outside_scope:packages/agentplane/src/runner/usecases/kernel-authority.ts"
    - "observed_path_outside_scope:packages/agentplane/src/runner/usecases/kernel-policy-renewal.ts"
    - "observed_path_outside_scope:packages/agentplane/src/runner/usecases/kernel-task-lifecycle.ts"
    - "observed_path_outside_scope:packages/agentplane/src/runner/usecases/task-knowledge-retrieval-query.ts"
    - "observed_path_outside_scope:packages/agentplane/src/runner/usecases/task-knowledge-semantic-escalation.ts"
    - "observed_path_outside_scope:packages/agentplane/src/runner/usecases/task-run-active-claim-record.ts"
    - "observed_path_outside_scope:packages/agentplane/src/runner/usecases/task-run-active-claim.testkit.ts"
    - "observed_path_outside_scope:packages/agentplane/src/runner/usecases/task-run-bootstrap.ts"
    - "observed_path_outside_scope:packages/agentplane/src/runner/usecases/task-run-effect-resolution.test.ts"
    - "observed_path_outside_scope:packages/agentplane/src/runner/usecases/task-run-lifecycle-result.ts"
    - "observed_path_outside_scope:packages/agentplane/src/runner/usecases/task-run-missing-state-authority.ts"
    - "observed_path_outside_scope:packages/agentplane/src/runner/usecases/task-run-orphaned-effect-guard.ts"
    - "observed_path_outside_scope:packages/agentplane/src/runtime/harness/types.ts"
    - "observed_path_outside_scope:packages/agentplane/src/runtime/prompt-modules/model.ts"
    - "observed_path_outside_scope:packages/agentplane/src/runtime/sgr/contract-types.ts"
    - "observed_path_outside_scope:packages/agentplane/src/runtime/shared/repo-cli-version.ts"
    - "observed_path_outside_scope:packages/agentplane/src/runtime/task-execution-context/model.ts"
    - "observed_path_outside_scope:packages/agentplane/src/shared/package-paths.ts"
    - "observed_path_outside_scope:packages/agentplane/src/shared/preparation-trace.ts"
    - "observed_path_outside_scope:packages/agentplane/src/shared/sqlite-driver.ts"
    - "observed_path_outside_scope:packages/agentplane/src/workflow-runtime/migration.ts"
    - "observed_path_outside_scope:packages/agentplane/test-fixtures/task-worktree-foreign-artifact-repair-fixture.ts"
    - "observed_path_outside_scope:packages/core/package.json"
    - "observed_path_outside_scope:packages/core/schemas/agent-work-order-v2.schema.json"
    - "observed_path_outside_scope:packages/core/schemas/config.schema.json"
    - "observed_path_outside_scope:packages/core/schemas/task-handoff.schema.json"
    - "observed_path_outside_scope:packages/core/schemas/task-readme-frontmatter.schema.json"
    - "observed_path_outside_scope:packages/core/schemas/tasks-export.schema.json"
    - "observed_path_outside_scope:packages/core/schemas/workflow.schema.json"
    - "observed_path_outside_scope:packages/core/src/config/schema.impl.ts"
    - "observed_path_outside_scope:packages/core/src/git/git-utils.ts"
    - "observed_path_outside_scope:packages/core/src/index.ts"
    - "observed_path_outside_scope:packages/core/src/process/run-process.observation.test.ts"
    - "observed_path_outside_scope:packages/core/src/process/run-process.ts"
    - "observed_path_outside_scope:packages/core/src/runner/agent-work-order.ts"
    - "observed_path_outside_scope:packages/core/src/runner/knowledge-ref.ts"
    - "observed_path_outside_scope:packages/core/src/runner/recipe-role-context.test.ts"
    - "observed_path_outside_scope:packages/core/src/runner/recipe-role-context.ts"
    - "observed_path_outside_scope:packages/core/src/runner/runner-effect-operation.ts"
    - "observed_path_outside_scope:packages/core/src/runner/supervisor-execution-episode-migration.ts"
    - "observed_path_outside_scope:packages/core/src/runner/supervisor-execution-episode.ts"
    - "observed_path_outside_scope:packages/core/src/schemas/index.ts"
    - "observed_path_outside_scope:packages/core/src/schemas/iso-timestamp.test.ts"
    - "observed_path_outside_scope:packages/core/src/schemas/iso-timestamp.ts"
    - "observed_path_outside_scope:packages/core/src/tasks/index.ts"
    - "observed_path_outside_scope:packages/core/src/tasks/kernel-plan-refinement.ts"
    - "observed_path_outside_scope:packages/core/src/tasks/kernel-semantic.ts"
    - "observed_path_outside_scope:packages/core/src/tasks/plan-execution-grant.ts"
    - "observed_path_outside_scope:packages/core/src/tasks/supplied-plan-aggregate.ts"
    - "observed_path_outside_scope:packages/core/src/tasks/task-artifact-schema.handoff.ts"
    - "observed_path_outside_scope:packages/core/src/tasks/task-artifact-schema.shared.ts"
    - "observed_path_outside_scope:packages/core/src/tasks/task-centric/model.ts"
    - "observed_path_outside_scope:packages/core/src/tasks/task-centric/schema.ts"
    - "observed_path_outside_scope:packages/core/src/tasks/task-kernel/authority-delta.test.ts"
    - "observed_path_outside_scope:packages/core/src/tasks/task-kernel/authority-lineage.ts"
    - "observed_path_outside_scope:packages/core/src/tasks/task-kernel/corrective-authority.test.ts"
    - "observed_path_outside_scope:packages/core/src/tasks/task-kernel/corrective-authority.ts"
    - "observed_path_outside_scope:packages/core/src/tasks/task-kernel/index.ts"
    - "observed_path_outside_scope:packages/core/src/tasks/task-kernel/invariants.ts"
    - "observed_path_outside_scope:packages/core/src/tasks/task-kernel/kernel.ts"
    - "observed_path_outside_scope:packages/core/src/tasks/task-kernel/model.ts"
    - "observed_path_outside_scope:packages/core/src/tasks/task-store.ts"
    - "observed_path_outside_scope:packages/recipes/package.json"
    - "observed_path_outside_scope:packages/recipes/src/compiled-contracts.ts"
    - "observed_path_outside_scope:packages/recipes/src/manifest-contracts.ts"
    - "observed_path_outside_scope:packages/recipes/src/manifest.ts"
    - "observed_path_outside_scope:packages/spec/schemas/agent-work-order-v2.schema.json"
    - "observed_path_outside_scope:packages/spec/schemas/config.schema.json"
    - "observed_path_outside_scope:packages/spec/schemas/task-handoff.schema.json"
    - "observed_path_outside_scope:packages/spec/schemas/task-readme-frontmatter.schema.json"
    - "observed_path_outside_scope:packages/spec/schemas/tasks-export.schema.json"
    - "observed_path_outside_scope:packages/spec/schemas/workflow.schema.json"
    - "observed_path_outside_scope:packages/testkit/src/cli-harness/temp-root-cleanup.integration.test.ts"
    - "observed_path_outside_scope:schemas/agent-semantic-result.schema.json"
    - "observed_path_outside_scope:schemas/agent-work-order-v2.schema.json"
    - "observed_path_outside_scope:schemas/config.schema.json"
    - "observed_path_outside_scope:schemas/execution-receipt.schema.json"
    - "observed_path_outside_scope:schemas/task-handoff.schema.json"
    - "observed_path_outside_scope:schemas/task-readme-frontmatter.schema.json"
    - "observed_path_outside_scope:schemas/tasks-export.schema.json"
    - "observed_path_outside_scope:schemas/workflow.schema.json"
    - "observed_path_outside_scope:vitest.config.ts"
    - "repository_branch_pr_floor"
  repository_mode: "branch_pr"
  safety:
    approval_effects: []
    requires_user_approval: false
    requires_worktree: true
  schema_version: 1
  selected_mode: "branch_pr"
  source: "agent_declared"
  verification:
    contract:
      declared:
        components:
          - "scripts"
        evidence_requirements:
          - "hosted_integration"
          - "repository_effect:ci"
          - "repository_effect:dependencies"
          - "repository_effect:documentation"
          - "repository_effect:public_api"
          - "repository_effect:release_metadata"
          - "repository_effect:repository_write"
          - "repository_effect:schema"
          - "repository_effect:source_code"
          - "repository_effect:tests"
          - "task_outcome"
        external_effects: []
        repository_effects:
          - "ci"
          - "repository_write"
          - "source_code"
          - "tests"
        risk:
          implementation_uncertainty: "bounded"
          requirements_uncertainty: "bounded"
          reversibility: "reversible"
      digest: "sha256:0fc91042b708f93681e2edff7b5cfbc3d2e720d9dd9c3171166d2d5016f187b6"
      escalation_reasons:
        - "central_path:bun.lock"
        - "central_path:package.json"
        - "central_path:packages/agentplane/src/cli/command-invocations.ts"
        - "central_path:packages/agentplane/src/cli/reason-codes.ts"
        - "central_path:packages/agentplane/src/cli/run-cli.core.kernel-projection.testkit.ts"
        - "central_path:packages/agentplane/src/cli/run-cli.core.roadmap-recipe-v2-entrypoint.test.ts"
        - "central_path:packages/agentplane/src/cli/run-cli/command-catalog-loader.ts"
        - "central_path:packages/agentplane/src/cli/run-cli/command-catalog/command-session.ts"
        - "central_path:packages/agentplane/src/cli/run-cli/command-catalog/task.ts"
        - "central_path:packages/agentplane/src/cli/run-cli/command-loaders/task.ts"
        - "central_path:packages/agentplane/src/cli/run-cli/commands/core/preflight-report-drift.ts"
        - "central_path:packages/agentplane/src/cli/run-cli/commands/init/model.ts"
        - "central_path:packages/agentplane/src/cli/run-cli/deferred-runtime-loader.ts"
        - "central_path:packages/agentplane/src/cli/run-cli/globals.ts"
        - "central_path:packages/agentplane/src/cli/task-advance-effect-recovery.testkit.ts"
        - "central_path:packages/agentplane/src/cli/verification-contract.test.ts"
        - "central_path:packages/agentplane/src/commands/shared/declared-check.ts"
        - "central_path:packages/agentplane/src/commands/shared/native-task-identity-fixture.ts"
        - "central_path:packages/agentplane/src/commands/shared/native-task-identity.ts"
        - "central_path:packages/agentplane/src/commands/shared/prompt-graph-diagnostics.ts"
        - "central_path:packages/agentplane/src/commands/shared/reconcile-check.ts"
        - "central_path:packages/agentplane/src/commands/shared/reconcile-native-applicability.test.ts"
        - "central_path:packages/agentplane/src/commands/shared/route-guidance.ts"
        - "central_path:packages/agentplane/src/commands/shared/route-oracle.ts"
        - "central_path:packages/agentplane/src/commands/shared/source-confidence.ts"
        - "central_path:packages/agentplane/src/commands/shared/task-verification-input-types.ts"
        - "central_path:packages/agentplane/src/commands/shared/task-worktree-foreign-artifact-history-proof.ts"
        - "central_path:packages/agentplane/src/commands/shared/task-worktree-foreign-artifact-repair.test.ts"
        - "central_path:packages/agentplane/src/commands/shared/task-worktree-foreign-artifact-repair.ts"
        - "central_path:packages/core/package.json"
        - "central_path:packages/core/schemas/agent-work-order-v2.schema.json"
        - "central_path:packages/core/schemas/config.schema.json"
        - "central_path:packages/core/schemas/task-handoff.schema.json"
        - "central_path:packages/core/schemas/task-readme-frontmatter.schema.json"
        - "central_path:packages/core/schemas/tasks-export.schema.json"
        - "central_path:packages/core/schemas/workflow.schema.json"
        - "central_path:packages/core/src/config/schema.impl.ts"
        - "central_path:packages/core/src/git/git-utils.ts"
        - "central_path:packages/core/src/index.ts"
        - "central_path:packages/core/src/process/run-process.observation.test.ts"
        - "central_path:packages/core/src/process/run-process.ts"
        - "central_path:packages/core/src/runner/agent-work-order.ts"
        - "central_path:packages/core/src/runner/knowledge-ref.ts"
        - "central_path:packages/core/src/runner/recipe-role-context.test.ts"
        - "central_path:packages/core/src/runner/recipe-role-context.ts"
        - "central_path:packages/core/src/runner/runner-effect-operation.ts"
        - "central_path:packages/core/src/runner/supervisor-execution-episode-migration.ts"
        - "central_path:packages/core/src/runner/supervisor-execution-episode.ts"
        - "central_path:packages/core/src/schemas/index.ts"
        - "central_path:packages/core/src/schemas/iso-timestamp.test.ts"
        - "central_path:packages/core/src/schemas/iso-timestamp.ts"
        - "central_path:packages/core/src/tasks/index.ts"
        - "central_path:packages/core/src/tasks/kernel-plan-refinement.ts"
        - "central_path:packages/core/src/tasks/kernel-semantic.ts"
        - "central_path:packages/core/src/tasks/plan-execution-grant.ts"
        - "central_path:packages/core/src/tasks/supplied-plan-aggregate.ts"
        - "central_path:packages/core/src/tasks/task-artifact-schema.handoff.ts"
        - "central_path:packages/core/src/tasks/task-artifact-schema.shared.ts"
        - "central_path:packages/core/src/tasks/task-centric/model.ts"
        - "central_path:packages/core/src/tasks/task-centric/schema.ts"
        - "central_path:packages/core/src/tasks/task-kernel/authority-delta.test.ts"
        - "central_path:packages/core/src/tasks/task-kernel/authority-lineage.ts"
        - "central_path:packages/core/src/tasks/task-kernel/corrective-authority.test.ts"
        - "central_path:packages/core/src/tasks/task-kernel/corrective-authority.ts"
        - "central_path:packages/core/src/tasks/task-kernel/index.ts"
        - "central_path:packages/core/src/tasks/task-kernel/invariants.ts"
        - "central_path:packages/core/src/tasks/task-kernel/kernel.ts"
        - "central_path:packages/core/src/tasks/task-kernel/model.ts"
        - "central_path:packages/core/src/tasks/task-store.ts"
        - "central_path:schemas/agent-semantic-result.schema.json"
        - "central_path:schemas/agent-work-order-v2.schema.json"
        - "central_path:schemas/config.schema.json"
        - "central_path:schemas/execution-receipt.schema.json"
        - "central_path:schemas/task-handoff.schema.json"
        - "central_path:schemas/task-readme-frontmatter.schema.json"
        - "central_path:schemas/tasks-export.schema.json"
        - "central_path:schemas/workflow.schema.json"
        - "central_path:scripts/checks/check-compatibility-contract-baseline.mjs"
        - "central_path:scripts/checks/run-local-ci-group.mjs"
        - "central_path:scripts/checks/run-local-ci.mjs"
        - "central_path:scripts/lib/local-ci-resource-profile.mjs"
        - "central_path:scripts/lib/local-ci-resource-profile.test.mjs"
        - "central_path:scripts/lib/verification-failures-reporter.mjs"
        - "central_path:scripts/lib/verification-observation.mjs"
        - "central_path:scripts/lib/verification-observation.test.mjs"
        - "central_path:scripts/lib/verification-scheduler.d.ts"
        - "central_path:scripts/lib/verification-scheduler.mjs"
        - "central_path:scripts/lib/verification-scheduler.test.mjs"
        - "central_path:scripts/release/check-local-tarball-install-smoke.mjs"
        - "central_path:scripts/release/installed-recipe-matrix.mjs"
        - "effect_ci"
        - "effect_dependencies"
        - "effect_public_api"
        - "effect_release_metadata"
        - "effect_schema"
        - "unknown_path:.agentplane/tasks/202610020159-60QH9J/pr/diffstat.txt"
        - "unknown_path:.agentplane/tasks/202610020159-60QH9J/pr/github-title.txt"
        - "unknown_path:.agentplane/tasks/202610020159-60QH9J/pr/meta.json"
        - "unknown_path:.agentplane/tasks/202610020159-60QH9J/quality/objects/sha256/3843bff288bb14b89e3366c8d7dec5532bcc3f35106b624f48f00047b3593844.json"
        - "unknown_path:.agentplane/tasks/202610020159-60QH9J/quality/objects/sha256/42b9e36673a3cc9bf23e38c4d451a9668ffb475c35f74aeb00f272aa861dd9cc.json"
        - "unknown_path:.agentplane/tasks/202610020159-60QH9J/quality/objects/sha256/78dd518372ace9dcbe508e9366b5020456fbc1d869ce4e6ce802a4dd9ecd357a.json"
        - "unknown_path:.agentplane/tasks/202610020159-60QH9J/supervision/declared-checks.json"
        - "unknown_path:.agentplane/tasks/202610020159-60QH9J/supervision/implementation-evidence.json"
        - "unknown_path:.agentplane/tasks/202610020159-60QH9J/verification/20261005205447553-d6d6686c6a8a01d3.json"
        - "unknown_path:.agentplane/tasks/202610020159-60QH9J/verification/20261005223905618-0396b72ba13e2c83.json"
        - "unknown_path:.agentplane/tasks/202610020159-60QH9J/verification/20261005230826992-23e0b9424c6c69fe.json"
        - "unknown_path:.agentplane/tasks/202610080726-0JHB26/pr/diffstat.txt"
        - "unknown_path:.agentplane/tasks/202610080726-0JHB26/pr/github-title.txt"
        - "unknown_path:.agentplane/tasks/202610080726-0JHB26/pr/meta.json"
        - "unknown_path:.agentplane/tasks/202610080726-0JHB26/quality/20261008-154206362-recovery-context/evaluator-evidence-manifest.json"
        - "unknown_path:.agentplane/tasks/202610080726-0JHB26/quality/20261008-154206362-recovery-context/evaluator-follow-up.json"
        - "unknown_path:.agentplane/tasks/202610080726-0JHB26/quality/20261008-154206362-recovery-context/evaluator-result.json"
        - "unknown_path:.agentplane/tasks/202610080726-0JHB26/quality/20261008-154206362-recovery-context/evaluator-work-order.json"
        - "unknown_path:.agentplane/tasks/202610080726-0JHB26/quality/20261008-154206362-recovery-context/quality-report.json"
        - "unknown_path:.agentplane/tasks/202610080726-0JHB26/quality/20261008-155843556-recovery-context/evaluator-evidence-manifest.json"
        - "unknown_path:.agentplane/tasks/202610080726-0JHB26/quality/20261008-155843556-recovery-context/evaluator-work-order.json"
        - "unknown_path:.agentplane/tasks/202610080726-0JHB26/quality/20261010-034407402-recovery-context/evaluator-evidence-manifest.json"
        - "unknown_path:.agentplane/tasks/202610080726-0JHB26/quality/20261010-034407402-recovery-context/evaluator-result.json"
        - "unknown_path:.agentplane/tasks/202610080726-0JHB26/quality/20261010-034407402-recovery-context/evaluator-work-order.json"
        - "unknown_path:.agentplane/tasks/202610080726-0JHB26/quality/20261010-034407402-recovery-context/quality-report.json"
        - "unknown_path:.agentplane/tasks/202610080726-0JHB26/quality/objects/sha256/42b9e36673a3cc9bf23e38c4d451a9668ffb475c35f74aeb00f272aa861dd9cc.json"
        - "unknown_path:.agentplane/tasks/202610080726-0JHB26/quality/objects/sha256/6b013e24f814eba6b8136e36997905960dda4fb7e22682171c0b484688bc0977.json"
        - "unknown_path:.agentplane/tasks/202610080726-0JHB26/quality/objects/sha256/78dd518372ace9dcbe508e9366b5020456fbc1d869ce4e6ce802a4dd9ecd357a.json"
        - "unknown_path:.agentplane/tasks/202610080726-0JHB26/quality/objects/sha256/9037cdf98253e70333ede9358d360264a85ee905be64a8723bbdd4ca71e02d4a.json"
        - "unknown_path:.agentplane/tasks/202610080726-0JHB26/quality/objects/sha256/c345f5b1d9c58c323792137fb3cdaeed440202b090d25260b3ee0eeee772c8be.json"
        - "unknown_path:.agentplane/tasks/202610080726-0JHB26/quality/objects/sha256/cd35fbf396f0028e374b3f84595480f6edd9dcf606c23ee72655c873780bf2b2.json"
        - "unknown_path:.agentplane/tasks/202610080726-0JHB26/quality/objects/sha256/e01436d9127d88f273b2a19d4bb25a98a66b5273b579be373fc8a5cb2b6ddd89.json"
        - "unknown_path:.agentplane/tasks/202610080726-0JHB26/quality/objects/sha256/feed3ea63a7331cb8756f8d6ce742330d25c8dbedffa8826f001840f3ef63f80.patch"
        - "unknown_path:.agentplane/tasks/202610080726-0JHB26/supervision/declared-checks.json"
        - "unknown_path:.agentplane/tasks/202610080726-0JHB26/supervision/implementation-evidence.json"
        - "unknown_path:.agentplane/tasks/202610080726-0JHB26/verification/20261008084315402-354e1fad3c69fd76.json"
        - "unknown_path:.agentplane/tasks/202610080740-NDWDC5/pr/diffstat.txt"
        - "unknown_path:.agentplane/tasks/202610080740-NDWDC5/pr/github-title.txt"
        - "unknown_path:.agentplane/tasks/202610080740-NDWDC5/pr/meta.json"
        - "unknown_path:.agentplane/tasks/202610080740-NDWDC5/quality/objects/sha256/42b9e36673a3cc9bf23e38c4d451a9668ffb475c35f74aeb00f272aa861dd9cc.json"
        - "unknown_path:.agentplane/tasks/202610080740-NDWDC5/quality/objects/sha256/78dd518372ace9dcbe508e9366b5020456fbc1d869ce4e6ce802a4dd9ecd357a.json"
        - "unknown_path:.agentplane/tasks/202610080740-NDWDC5/quality/objects/sha256/cd35fbf396f0028e374b3f84595480f6edd9dcf606c23ee72655c873780bf2b2.json"
        - "unknown_path:.agentplane/tasks/202610080740-NDWDC5/supervision/declared-checks.json"
        - "unknown_path:.agentplane/tasks/202610080740-NDWDC5/supervision/implementation-evidence.json"
        - "unknown_path:.agentplane/tasks/202610080929-405MZ2/pr/diffstat.txt"
        - "unknown_path:.agentplane/tasks/202610080929-405MZ2/pr/github-title.txt"
        - "unknown_path:.agentplane/tasks/202610080929-405MZ2/pr/meta.json"
        - "unknown_path:.agentplane/tasks/202610080929-405MZ2/quality/objects/sha256/42b9e36673a3cc9bf23e38c4d451a9668ffb475c35f74aeb00f272aa861dd9cc.json"
        - "unknown_path:.agentplane/tasks/202610080929-405MZ2/quality/objects/sha256/78dd518372ace9dcbe508e9366b5020456fbc1d869ce4e6ce802a4dd9ecd357a.json"
        - "unknown_path:.agentplane/tasks/202610080929-405MZ2/quality/objects/sha256/cd35fbf396f0028e374b3f84595480f6edd9dcf606c23ee72655c873780bf2b2.json"
        - "unknown_path:.agentplane/tasks/202610080929-405MZ2/supervision/declared-checks.json"
        - "unknown_path:.agentplane/tasks/202610080929-405MZ2/supervision/implementation-evidence.json"
        - "unknown_path:.agentplane/tasks/202610080929-405MZ2/verification/20261008140930004-7308fe3545cb838f.json"
        - "unknown_path:.agentplane/tasks/202610081254-Z21QM3/pr/diffstat.txt"
        - "unknown_path:.agentplane/tasks/202610081254-Z21QM3/pr/github-title.txt"
        - "unknown_path:.agentplane/tasks/202610081254-Z21QM3/pr/meta.json"
        - "unknown_path:.agentplane/tasks/202610081254-Z21QM3/quality/objects/sha256/42b9e36673a3cc9bf23e38c4d451a9668ffb475c35f74aeb00f272aa861dd9cc.json"
        - "unknown_path:.agentplane/tasks/202610081254-Z21QM3/quality/objects/sha256/78dd518372ace9dcbe508e9366b5020456fbc1d869ce4e6ce802a4dd9ecd357a.json"
        - "unknown_path:.agentplane/tasks/202610081254-Z21QM3/quality/objects/sha256/cd35fbf396f0028e374b3f84595480f6edd9dcf606c23ee72655c873780bf2b2.json"
        - "unknown_path:.agentplane/tasks/202610081254-Z21QM3/supervision/declared-checks.json"
        - "unknown_path:.agentplane/tasks/202610081254-Z21QM3/supervision/implementation-evidence.json"
        - "unknown_path:.agentplane/tasks/202610081254-Z21QM3/verification/20261008131049932-b5f691d407e737f9.json"
        - "unknown_path:.agentplane/tasks/202610081424-21WCFZ/quality/objects/sha256/42b9e36673a3cc9bf23e38c4d451a9668ffb475c35f74aeb00f272aa861dd9cc.json"
        - "unknown_path:.agentplane/tasks/202610081424-21WCFZ/quality/objects/sha256/78dd518372ace9dcbe508e9366b5020456fbc1d869ce4e6ce802a4dd9ecd357a.json"
        - "unknown_path:.agentplane/tasks/202610081424-21WCFZ/quality/objects/sha256/cd35fbf396f0028e374b3f84595480f6edd9dcf606c23ee72655c873780bf2b2.json"
        - "unknown_path:.agentplane/tasks/202610081424-21WCFZ/supervision/declared-checks.json"
        - "unknown_path:.agentplane/tasks/202610081424-21WCFZ/supervision/implementation-evidence.json"
        - "unknown_path:.agentplane/tasks/202610081722-JBCX2J/pr/diffstat.txt"
        - "unknown_path:.agentplane/tasks/202610081722-JBCX2J/pr/github-title.txt"
        - "unknown_path:.agentplane/tasks/202610081722-JBCX2J/pr/meta.json"
        - "unknown_path:.agentplane/tasks/202610081722-JBCX2J/quality/objects/sha256/42b9e36673a3cc9bf23e38c4d451a9668ffb475c35f74aeb00f272aa861dd9cc.json"
        - "unknown_path:.agentplane/tasks/202610081722-JBCX2J/quality/objects/sha256/78dd518372ace9dcbe508e9366b5020456fbc1d869ce4e6ce802a4dd9ecd357a.json"
        - "unknown_path:.agentplane/tasks/202610081722-JBCX2J/quality/objects/sha256/cd35fbf396f0028e374b3f84595480f6edd9dcf606c23ee72655c873780bf2b2.json"
        - "unknown_path:.agentplane/tasks/202610081722-JBCX2J/supervision/declared-checks.json"
        - "unknown_path:.agentplane/tasks/202610081722-JBCX2J/supervision/implementation-evidence.json"
        - "unknown_path:.agentplane/tasks/202610081722-JBCX2J/verification/20261008175024322-0c00f4dc25089c04.json"
        - "unknown_path:.agentplane/tasks/202610092153-WZDW5D/pr/diffstat.txt"
        - "unknown_path:.agentplane/tasks/202610092153-WZDW5D/pr/github-title.txt"
        - "unknown_path:.agentplane/tasks/202610092153-WZDW5D/pr/meta.json"
        - "unknown_path:.agentplane/tasks/202610092153-WZDW5D/quality/objects/sha256/42b9e36673a3cc9bf23e38c4d451a9668ffb475c35f74aeb00f272aa861dd9cc.json"
        - "unknown_path:.agentplane/tasks/202610092153-WZDW5D/quality/objects/sha256/78dd518372ace9dcbe508e9366b5020456fbc1d869ce4e6ce802a4dd9ecd357a.json"
        - "unknown_path:.agentplane/tasks/202610092153-WZDW5D/supervision/declared-checks.json"
        - "unknown_path:.agentplane/tasks/202610092153-WZDW5D/supervision/implementation-evidence.json"
        - "unknown_path:.agentplane/tasks/202610092153-WZDW5D/verification/20261010074913475-fa74fe3853d40f8f.json"
        - "unknown_path:.agentplane/tasks/202610100342-PXH679/pr/diffstat.txt"
        - "unknown_path:.agentplane/tasks/202610100342-PXH679/pr/github-title.txt"
        - "unknown_path:.agentplane/tasks/202610100342-PXH679/pr/meta.json"
        - "unknown_path:.agentplane/tasks/202610100342-PXH679/quality/objects/sha256/78dd518372ace9dcbe508e9366b5020456fbc1d869ce4e6ce802a4dd9ecd357a.json"
        - "unknown_path:.agentplane/tasks/202610100342-PXH679/quality/objects/sha256/cd35fbf396f0028e374b3f84595480f6edd9dcf606c23ee72655c873780bf2b2.json"
        - "unknown_path:.agentplane/tasks/202610100342-PXH679/supervision/declared-checks.json"
        - "unknown_path:.agentplane/tasks/202610100342-PXH679/supervision/implementation-evidence.json"
        - "unknown_path:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-000/children/run-000/failures.jsonl"
        - "unknown_path:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-000/children/run-000/manifest.json"
        - "unknown_path:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-000/children/run-000/status.json"
        - "unknown_path:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-000/children/run-000/stderr.jsonl"
        - "unknown_path:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-000/children/run-000/stdout.jsonl"
        - "unknown_path:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-000/failures.jsonl"
        - "unknown_path:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-000/manifest.json"
        - "unknown_path:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-000/status.json"
        - "unknown_path:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-000/stderr.jsonl"
        - "unknown_path:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-000/stdout.jsonl"
        - "unknown_path:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-001/children/run-000/failures.jsonl"
        - "unknown_path:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-001/children/run-000/manifest.json"
        - "unknown_path:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-001/children/run-000/status.json"
        - "unknown_path:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-001/children/run-000/stderr.jsonl"
        - "unknown_path:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-001/children/run-000/stdout.jsonl"
        - "unknown_path:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-001/children/run-001/failures.jsonl"
        - "unknown_path:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-001/children/run-001/manifest.json"
        - "unknown_path:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-001/children/run-001/status.json"
        - "unknown_path:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-001/children/run-001/stderr.jsonl"
        - "unknown_path:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-001/children/run-001/stdout.jsonl"
        - "unknown_path:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-001/children/run-002/failures.jsonl"
        - "unknown_path:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-001/children/run-002/manifest.json"
        - "unknown_path:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-001/children/run-002/status.json"
        - "unknown_path:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-001/children/run-002/stderr.jsonl"
        - "unknown_path:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-001/children/run-002/stdout.jsonl"
        - "unknown_path:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-001/children/run-003/failures.jsonl"
        - "unknown_path:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-001/children/run-003/manifest.json"
        - "unknown_path:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-001/children/run-003/status.json"
        - "unknown_path:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-001/children/run-003/stderr.jsonl"
        - "unknown_path:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-001/children/run-003/stdout.jsonl"
        - "unknown_path:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-001/children/run-004/failures.jsonl"
        - "unknown_path:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-001/children/run-004/manifest.json"
        - "unknown_path:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-001/children/run-004/status.json"
        - "unknown_path:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-001/children/run-004/stderr.jsonl"
        - "unknown_path:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-001/children/run-004/stdout.jsonl"
        - "unknown_path:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-001/failures.jsonl"
        - "unknown_path:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-001/manifest.json"
        - "unknown_path:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-001/status.json"
        - "unknown_path:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-001/stderr.jsonl"
        - "unknown_path:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-001/stdout.jsonl"
        - "unknown_path:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-002/children/run-000/failures.jsonl"
        - "unknown_path:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-002/children/run-000/manifest.json"
        - "unknown_path:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-002/children/run-000/status.json"
        - "unknown_path:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-002/children/run-000/stderr.jsonl"
        - "unknown_path:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-002/children/run-000/stdout.jsonl"
        - "unknown_path:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-002/failures.jsonl"
        - "unknown_path:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-002/manifest.json"
        - "unknown_path:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-002/status.json"
        - "unknown_path:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-002/stderr.jsonl"
        - "unknown_path:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-002/stdout.jsonl"
        - "unknown_path:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-003/children/run-000/failures.jsonl"
        - "unknown_path:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-003/children/run-000/manifest.json"
        - "unknown_path:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-003/children/run-000/status.json"
        - "unknown_path:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-003/children/run-000/stderr.jsonl"
        - "unknown_path:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-003/children/run-000/stdout.jsonl"
        - "unknown_path:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-003/children/run-001/failures.jsonl"
        - "unknown_path:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-003/children/run-001/manifest.json"
        - "unknown_path:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-003/children/run-001/status.json"
        - "unknown_path:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-003/children/run-001/stderr.jsonl"
        - "unknown_path:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-003/children/run-001/stdout.jsonl"
        - "unknown_path:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-003/children/run-002/failures.jsonl"
        - "unknown_path:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-003/children/run-002/manifest.json"
        - "unknown_path:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-003/children/run-002/status.json"
        - "unknown_path:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-003/children/run-002/stderr.jsonl"
        - "unknown_path:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-003/children/run-002/stdout.jsonl"
        - "unknown_path:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-003/children/run-003/failures.jsonl"
        - "unknown_path:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-003/children/run-003/manifest.json"
        - "unknown_path:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-003/children/run-003/status.json"
        - "unknown_path:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-003/children/run-003/stderr.jsonl"
        - "unknown_path:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-003/children/run-003/stdout.jsonl"
        - "unknown_path:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-003/children/run-004/failures.jsonl"
        - "unknown_path:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-003/children/run-004/manifest.json"
        - "unknown_path:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-003/children/run-004/status.json"
        - "unknown_path:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-003/children/run-004/stderr.jsonl"
        - "unknown_path:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-003/children/run-004/stdout.jsonl"
        - "unknown_path:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-003/failures.jsonl"
        - "unknown_path:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-003/manifest.json"
        - "unknown_path:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-003/status.json"
        - "unknown_path:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-003/stderr.jsonl"
        - "unknown_path:.agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-003/stdout.jsonl"
        - "unknown_path:.prettierignore"
        - "unknown_path:artifacts/bench/m05-live-0.7.13/coding-corpus-qualification.json"
        - "unknown_path:artifacts/bench/m05-live-0.7.13/oracle-framing-qualification.json"
        - "unknown_path:artifacts/bench/m05-live-0.7.13/subscription-registration.json"
        - "unknown_path:package.json"
        - "unknown_path:packages/agentplane/package.json"
        - "unknown_path:packages/core/package.json"
        - "unknown_path:packages/recipes/package.json"
        - "unknown_path:scripts/baselines/v0.7-compatibility-candidate.json"
        - "unknown_path:scripts/baselines/v0.7-pr6095-cli-review.json"
      execution_groups:
        - "docs-schema"
        - "core"
        - "runtime"
        - "cli"
      observed:
        changed_components:
          - ".agentplane"
          - ".prettierignore"
          - "artifacts"
          - "bun.lock"
          - "context"
          - "docs"
          - "eslint.config.cjs"
          - "package.json"
          - "packages/agentplane"
          - "packages/core"
          - "packages/recipes"
          - "packages/spec"
          - "packages/testkit"
          - "schemas"
          - "scripts"
          - "vitest.config.ts"
        changed_files:
          - ".agentplane/policy/context.must.md"
          - ".agentplane/policy/dod.core.md"
          - ".agentplane/policy/dod.docs.md"
          - ".agentplane/policy/examples/migration-note.md"
          - ".agentplane/policy/governance.md"
          - ".agentplane/policy/security.must.md"
          - ".agentplane/policy/workflow.branch_pr.md"
          - ".agentplane/policy/workflow.direct.md"
          - ".agentplane/policy/workflow.md"
          - ".agentplane/policy/workflow.release.md"
          - ".agentplane/policy/workflow.upgrade.md"
          - ".agentplane/tasks/202610020159-60QH9J/README.md"
          - ".agentplane/tasks/202610020159-60QH9J/pr/diffstat.txt"
          - ".agentplane/tasks/202610020159-60QH9J/pr/github-body.md"
          - ".agentplane/tasks/202610020159-60QH9J/pr/github-title.txt"
          - ".agentplane/tasks/202610020159-60QH9J/pr/meta.json"
          - ".agentplane/tasks/202610020159-60QH9J/pr/review.md"
          - ".agentplane/tasks/202610020159-60QH9J/quality/objects/sha256/3843bff288bb14b89e3366c8d7dec5532bcc3f35106b624f48f00047b3593844.json"
          - ".agentplane/tasks/202610020159-60QH9J/quality/objects/sha256/42b9e36673a3cc9bf23e38c4d451a9668ffb475c35f74aeb00f272aa861dd9cc.json"
          - ".agentplane/tasks/202610020159-60QH9J/quality/objects/sha256/78dd518372ace9dcbe508e9366b5020456fbc1d869ce4e6ce802a4dd9ecd357a.json"
          - ".agentplane/tasks/202610020159-60QH9J/supervision/declared-checks.json"
          - ".agentplane/tasks/202610020159-60QH9J/supervision/implementation-evidence.json"
          - ".agentplane/tasks/202610020159-60QH9J/verification/20261005205447553-d6d6686c6a8a01d3.json"
          - ".agentplane/tasks/202610020159-60QH9J/verification/20261005223905618-0396b72ba13e2c83.json"
          - ".agentplane/tasks/202610020159-60QH9J/verification/20261005230826992-23e0b9424c6c69fe.json"
          - ".agentplane/tasks/202610080726-0JHB26/README.md"
          - ".agentplane/tasks/202610080726-0JHB26/pr/diffstat.txt"
          - ".agentplane/tasks/202610080726-0JHB26/pr/github-body.md"
          - ".agentplane/tasks/202610080726-0JHB26/pr/github-title.txt"
          - ".agentplane/tasks/202610080726-0JHB26/pr/meta.json"
          - ".agentplane/tasks/202610080726-0JHB26/pr/review.md"
          - ".agentplane/tasks/202610080726-0JHB26/quality/20261008-154206362-recovery-context/evaluator-evidence-manifest.json"
          - ".agentplane/tasks/202610080726-0JHB26/quality/20261008-154206362-recovery-context/evaluator-follow-up.json"
          - ".agentplane/tasks/202610080726-0JHB26/quality/20261008-154206362-recovery-context/evaluator-opinion.md"
          - ".agentplane/tasks/202610080726-0JHB26/quality/20261008-154206362-recovery-context/evaluator-result.json"
          - ".agentplane/tasks/202610080726-0JHB26/quality/20261008-154206362-recovery-context/evaluator-work-order.json"
          - ".agentplane/tasks/202610080726-0JHB26/quality/20261008-154206362-recovery-context/quality-report.json"
          - ".agentplane/tasks/202610080726-0JHB26/quality/20261008-155843556-recovery-context/evaluator-evidence-manifest.json"
          - ".agentplane/tasks/202610080726-0JHB26/quality/20261008-155843556-recovery-context/evaluator-work-order.json"
          - ".agentplane/tasks/202610080726-0JHB26/quality/20261010-034407402-recovery-context/evaluator-evidence-manifest.json"
          - ".agentplane/tasks/202610080726-0JHB26/quality/20261010-034407402-recovery-context/evaluator-opinion.md"
          - ".agentplane/tasks/202610080726-0JHB26/quality/20261010-034407402-recovery-context/evaluator-result.json"
          - ".agentplane/tasks/202610080726-0JHB26/quality/20261010-034407402-recovery-context/evaluator-work-order.json"
          - ".agentplane/tasks/202610080726-0JHB26/quality/20261010-034407402-recovery-context/quality-report.json"
          - ".agentplane/tasks/202610080726-0JHB26/quality/objects/sha256/42b9e36673a3cc9bf23e38c4d451a9668ffb475c35f74aeb00f272aa861dd9cc.json"
          - ".agentplane/tasks/202610080726-0JHB26/quality/objects/sha256/6b013e24f814eba6b8136e36997905960dda4fb7e22682171c0b484688bc0977.json"
          - ".agentplane/tasks/202610080726-0JHB26/quality/objects/sha256/78dd518372ace9dcbe508e9366b5020456fbc1d869ce4e6ce802a4dd9ecd357a.json"
          - ".agentplane/tasks/202610080726-0JHB26/quality/objects/sha256/872fdcf271df312c7037ea4134f47b6ac3f50e6d686fc1ada29a5d67c5f0c5c0.md"
          - ".agentplane/tasks/202610080726-0JHB26/quality/objects/sha256/8d9959fee0db986395d856f24ff509d4eb7ba9af18c76949c095fce62c59bebd.md"
          - ".agentplane/tasks/202610080726-0JHB26/quality/objects/sha256/9037cdf98253e70333ede9358d360264a85ee905be64a8723bbdd4ca71e02d4a.json"
          - ".agentplane/tasks/202610080726-0JHB26/quality/objects/sha256/ba40a2a38d77adb9a4ef3479e1201194dc8f3beeaf66105f085f4d1298d214aa.md"
          - ".agentplane/tasks/202610080726-0JHB26/quality/objects/sha256/c345f5b1d9c58c323792137fb3cdaeed440202b090d25260b3ee0eeee772c8be.json"
          - ".agentplane/tasks/202610080726-0JHB26/quality/objects/sha256/cd35fbf396f0028e374b3f84595480f6edd9dcf606c23ee72655c873780bf2b2.json"
          - ".agentplane/tasks/202610080726-0JHB26/quality/objects/sha256/e01436d9127d88f273b2a19d4bb25a98a66b5273b579be373fc8a5cb2b6ddd89.json"
          - ".agentplane/tasks/202610080726-0JHB26/quality/objects/sha256/feed3ea63a7331cb8756f8d6ce742330d25c8dbedffa8826f001840f3ef63f80.patch"
          - ".agentplane/tasks/202610080726-0JHB26/supervision/declared-checks.json"
          - ".agentplane/tasks/202610080726-0JHB26/supervision/implementation-evidence.json"
          - ".agentplane/tasks/202610080726-0JHB26/verification/20261008084315402-354e1fad3c69fd76.json"
          - ".agentplane/tasks/202610080740-NDWDC5/README.md"
          - ".agentplane/tasks/202610080740-NDWDC5/pr/diffstat.txt"
          - ".agentplane/tasks/202610080740-NDWDC5/pr/github-body.md"
          - ".agentplane/tasks/202610080740-NDWDC5/pr/github-title.txt"
          - ".agentplane/tasks/202610080740-NDWDC5/pr/meta.json"
          - ".agentplane/tasks/202610080740-NDWDC5/pr/review.md"
          - ".agentplane/tasks/202610080740-NDWDC5/quality/objects/sha256/42b9e36673a3cc9bf23e38c4d451a9668ffb475c35f74aeb00f272aa861dd9cc.json"
          - ".agentplane/tasks/202610080740-NDWDC5/quality/objects/sha256/78dd518372ace9dcbe508e9366b5020456fbc1d869ce4e6ce802a4dd9ecd357a.json"
          - ".agentplane/tasks/202610080740-NDWDC5/quality/objects/sha256/cd35fbf396f0028e374b3f84595480f6edd9dcf606c23ee72655c873780bf2b2.json"
          - ".agentplane/tasks/202610080740-NDWDC5/supervision/declared-checks.json"
          - ".agentplane/tasks/202610080740-NDWDC5/supervision/implementation-evidence.json"
          - ".agentplane/tasks/202610080929-405MZ2/README.md"
          - ".agentplane/tasks/202610080929-405MZ2/pr/diffstat.txt"
          - ".agentplane/tasks/202610080929-405MZ2/pr/github-body.md"
          - ".agentplane/tasks/202610080929-405MZ2/pr/github-title.txt"
          - ".agentplane/tasks/202610080929-405MZ2/pr/meta.json"
          - ".agentplane/tasks/202610080929-405MZ2/pr/review.md"
          - ".agentplane/tasks/202610080929-405MZ2/quality/objects/sha256/42b9e36673a3cc9bf23e38c4d451a9668ffb475c35f74aeb00f272aa861dd9cc.json"
          - ".agentplane/tasks/202610080929-405MZ2/quality/objects/sha256/78dd518372ace9dcbe508e9366b5020456fbc1d869ce4e6ce802a4dd9ecd357a.json"
          - ".agentplane/tasks/202610080929-405MZ2/quality/objects/sha256/cd35fbf396f0028e374b3f84595480f6edd9dcf606c23ee72655c873780bf2b2.json"
          - ".agentplane/tasks/202610080929-405MZ2/supervision/declared-checks.json"
          - ".agentplane/tasks/202610080929-405MZ2/supervision/implementation-evidence.json"
          - ".agentplane/tasks/202610080929-405MZ2/verification/20261008140930004-7308fe3545cb838f.json"
          - ".agentplane/tasks/202610081254-Z21QM3/README.md"
          - ".agentplane/tasks/202610081254-Z21QM3/pr/diffstat.txt"
          - ".agentplane/tasks/202610081254-Z21QM3/pr/github-body.md"
          - ".agentplane/tasks/202610081254-Z21QM3/pr/github-title.txt"
          - ".agentplane/tasks/202610081254-Z21QM3/pr/meta.json"
          - ".agentplane/tasks/202610081254-Z21QM3/pr/review.md"
          - ".agentplane/tasks/202610081254-Z21QM3/quality/objects/sha256/42b9e36673a3cc9bf23e38c4d451a9668ffb475c35f74aeb00f272aa861dd9cc.json"
          - ".agentplane/tasks/202610081254-Z21QM3/quality/objects/sha256/78dd518372ace9dcbe508e9366b5020456fbc1d869ce4e6ce802a4dd9ecd357a.json"
          - ".agentplane/tasks/202610081254-Z21QM3/quality/objects/sha256/cd35fbf396f0028e374b3f84595480f6edd9dcf606c23ee72655c873780bf2b2.json"
          - ".agentplane/tasks/202610081254-Z21QM3/supervision/declared-checks.json"
          - ".agentplane/tasks/202610081254-Z21QM3/supervision/implementation-evidence.json"
          - ".agentplane/tasks/202610081254-Z21QM3/verification/20261008131049932-b5f691d407e737f9.json"
          - ".agentplane/tasks/202610081424-21WCFZ/README.md"
          - ".agentplane/tasks/202610081424-21WCFZ/quality/objects/sha256/42b9e36673a3cc9bf23e38c4d451a9668ffb475c35f74aeb00f272aa861dd9cc.json"
          - ".agentplane/tasks/202610081424-21WCFZ/quality/objects/sha256/78dd518372ace9dcbe508e9366b5020456fbc1d869ce4e6ce802a4dd9ecd357a.json"
          - ".agentplane/tasks/202610081424-21WCFZ/quality/objects/sha256/cd35fbf396f0028e374b3f84595480f6edd9dcf606c23ee72655c873780bf2b2.json"
          - ".agentplane/tasks/202610081424-21WCFZ/supervision/declared-checks.json"
          - ".agentplane/tasks/202610081424-21WCFZ/supervision/implementation-evidence.json"
          - ".agentplane/tasks/202610081722-JBCX2J/README.md"
          - ".agentplane/tasks/202610081722-JBCX2J/pr/diffstat.txt"
          - ".agentplane/tasks/202610081722-JBCX2J/pr/github-body.md"
          - ".agentplane/tasks/202610081722-JBCX2J/pr/github-title.txt"
          - ".agentplane/tasks/202610081722-JBCX2J/pr/meta.json"
          - ".agentplane/tasks/202610081722-JBCX2J/pr/review.md"
          - ".agentplane/tasks/202610081722-JBCX2J/quality/objects/sha256/42b9e36673a3cc9bf23e38c4d451a9668ffb475c35f74aeb00f272aa861dd9cc.json"
          - ".agentplane/tasks/202610081722-JBCX2J/quality/objects/sha256/78dd518372ace9dcbe508e9366b5020456fbc1d869ce4e6ce802a4dd9ecd357a.json"
          - ".agentplane/tasks/202610081722-JBCX2J/quality/objects/sha256/cd35fbf396f0028e374b3f84595480f6edd9dcf606c23ee72655c873780bf2b2.json"
          - ".agentplane/tasks/202610081722-JBCX2J/supervision/declared-checks.json"
          - ".agentplane/tasks/202610081722-JBCX2J/supervision/implementation-evidence.json"
          - ".agentplane/tasks/202610081722-JBCX2J/verification/20261008175024322-0c00f4dc25089c04.json"
          - ".agentplane/tasks/202610092153-WZDW5D/README.md"
          - ".agentplane/tasks/202610092153-WZDW5D/pr/diffstat.txt"
          - ".agentplane/tasks/202610092153-WZDW5D/pr/github-body.md"
          - ".agentplane/tasks/202610092153-WZDW5D/pr/github-title.txt"
          - ".agentplane/tasks/202610092153-WZDW5D/pr/meta.json"
          - ".agentplane/tasks/202610092153-WZDW5D/pr/review.md"
          - ".agentplane/tasks/202610092153-WZDW5D/quality/objects/sha256/42b9e36673a3cc9bf23e38c4d451a9668ffb475c35f74aeb00f272aa861dd9cc.json"
          - ".agentplane/tasks/202610092153-WZDW5D/quality/objects/sha256/78dd518372ace9dcbe508e9366b5020456fbc1d869ce4e6ce802a4dd9ecd357a.json"
          - ".agentplane/tasks/202610092153-WZDW5D/supervision/declared-checks.json"
          - ".agentplane/tasks/202610092153-WZDW5D/supervision/implementation-evidence.json"
          - ".agentplane/tasks/202610092153-WZDW5D/verification/20261010074913475-fa74fe3853d40f8f.json"
          - ".agentplane/tasks/202610100342-PXH679/README.md"
          - ".agentplane/tasks/202610100342-PXH679/pr/diffstat.txt"
          - ".agentplane/tasks/202610100342-PXH679/pr/github-body.md"
          - ".agentplane/tasks/202610100342-PXH679/pr/github-title.txt"
          - ".agentplane/tasks/202610100342-PXH679/pr/meta.json"
          - ".agentplane/tasks/202610100342-PXH679/pr/review.md"
          - ".agentplane/tasks/202610100342-PXH679/quality/objects/sha256/78dd518372ace9dcbe508e9366b5020456fbc1d869ce4e6ce802a4dd9ecd357a.json"
          - ".agentplane/tasks/202610100342-PXH679/quality/objects/sha256/cd35fbf396f0028e374b3f84595480f6edd9dcf606c23ee72655c873780bf2b2.json"
          - ".agentplane/tasks/202610100342-PXH679/supervision/declared-checks.json"
          - ".agentplane/tasks/202610100342-PXH679/supervision/implementation-evidence.json"
          - ".agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-000/children/run-000/failures.jsonl"
          - ".agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-000/children/run-000/manifest.json"
          - ".agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-000/children/run-000/status.json"
          - ".agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-000/children/run-000/stderr.jsonl"
          - ".agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-000/children/run-000/stdout.jsonl"
          - ".agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-000/failures.jsonl"
          - ".agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-000/manifest.json"
          - ".agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-000/status.json"
          - ".agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-000/stderr.jsonl"
          - ".agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-000/stdout.jsonl"
          - ".agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-001/children/run-000/failures.jsonl"
          - ".agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-001/children/run-000/manifest.json"
          - ".agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-001/children/run-000/status.json"
          - ".agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-001/children/run-000/stderr.jsonl"
          - ".agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-001/children/run-000/stdout.jsonl"
          - ".agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-001/children/run-001/failures.jsonl"
          - ".agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-001/children/run-001/manifest.json"
          - ".agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-001/children/run-001/status.json"
          - ".agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-001/children/run-001/stderr.jsonl"
          - ".agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-001/children/run-001/stdout.jsonl"
          - ".agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-001/children/run-002/failures.jsonl"
          - ".agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-001/children/run-002/manifest.json"
          - ".agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-001/children/run-002/status.json"
          - ".agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-001/children/run-002/stderr.jsonl"
          - ".agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-001/children/run-002/stdout.jsonl"
          - ".agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-001/children/run-003/failures.jsonl"
          - ".agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-001/children/run-003/manifest.json"
          - ".agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-001/children/run-003/status.json"
          - ".agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-001/children/run-003/stderr.jsonl"
          - ".agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-001/children/run-003/stdout.jsonl"
          - ".agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-001/children/run-004/failures.jsonl"
          - ".agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-001/children/run-004/manifest.json"
          - ".agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-001/children/run-004/status.json"
          - ".agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-001/children/run-004/stderr.jsonl"
          - ".agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-001/children/run-004/stdout.jsonl"
          - ".agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-001/failures.jsonl"
          - ".agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-001/manifest.json"
          - ".agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-001/status.json"
          - ".agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-001/stderr.jsonl"
          - ".agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-001/stdout.jsonl"
          - ".agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-002/children/run-000/failures.jsonl"
          - ".agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-002/children/run-000/manifest.json"
          - ".agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-002/children/run-000/status.json"
          - ".agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-002/children/run-000/stderr.jsonl"
          - ".agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-002/children/run-000/stdout.jsonl"
          - ".agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-002/failures.jsonl"
          - ".agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-002/manifest.json"
          - ".agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-002/status.json"
          - ".agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-002/stderr.jsonl"
          - ".agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-002/stdout.jsonl"
          - ".agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-003/children/run-000/failures.jsonl"
          - ".agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-003/children/run-000/manifest.json"
          - ".agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-003/children/run-000/status.json"
          - ".agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-003/children/run-000/stderr.jsonl"
          - ".agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-003/children/run-000/stdout.jsonl"
          - ".agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-003/children/run-001/failures.jsonl"
          - ".agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-003/children/run-001/manifest.json"
          - ".agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-003/children/run-001/status.json"
          - ".agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-003/children/run-001/stderr.jsonl"
          - ".agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-003/children/run-001/stdout.jsonl"
          - ".agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-003/children/run-002/failures.jsonl"
          - ".agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-003/children/run-002/manifest.json"
          - ".agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-003/children/run-002/status.json"
          - ".agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-003/children/run-002/stderr.jsonl"
          - ".agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-003/children/run-002/stdout.jsonl"
          - ".agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-003/children/run-003/failures.jsonl"
          - ".agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-003/children/run-003/manifest.json"
          - ".agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-003/children/run-003/status.json"
          - ".agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-003/children/run-003/stderr.jsonl"
          - ".agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-003/children/run-003/stdout.jsonl"
          - ".agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-003/children/run-004/failures.jsonl"
          - ".agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-003/children/run-004/manifest.json"
          - ".agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-003/children/run-004/status.json"
          - ".agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-003/children/run-004/stderr.jsonl"
          - ".agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-003/children/run-004/stdout.jsonl"
          - ".agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-003/failures.jsonl"
          - ".agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-003/manifest.json"
          - ".agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-003/status.json"
          - ".agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-003/stderr.jsonl"
          - ".agentplane/tasks/202610100342-PXH679/supervision/verification-runs/run-003/stdout.jsonl"
          - ".prettierignore"
          - "artifacts/bench/m05-live-0.7.13/broker-qualification.md"
          - "artifacts/bench/m05-live-0.7.13/coding-corpus-qualification.json"
          - "artifacts/bench/m05-live-0.7.13/experiment-protocol.md"
          - "artifacts/bench/m05-live-0.7.13/oracle-framing-qualification.json"
          - "artifacts/bench/m05-live-0.7.13/subscription-protocol.md"
          - "artifacts/bench/m05-live-0.7.13/subscription-registration.json"
          - "bun.lock"
          - "context/wiki/index.md"
          - "context/wiki/proposals/index.md"
          - "context/wiki/proposals/task-harvest/index.md"
          - "context/wiki/release-docs/concepts/index.md"
          - "context/wiki/release-docs/domains/index.md"
          - "context/wiki/release-docs/release-lines/index.md"
          - "context/wiki/reports/index.md"
          - "context/wiki/task-harvest/index.md"
          - "docs/developer/modular-prompt-assembly.mdx"
          - "docs/developer/testing-and-quality.mdx"
          - "docs/releases/v0.7.1.md"
          - "docs/releases/v0.7.13-acceptance.md"
          - "docs/releases/v0.7.13.md"
          - "docs/user/cli-reference.generated.mdx"
          - "docs/user/task-lifecycle.mdx"
          - "eslint.config.cjs"
          - "package.json"
          - "packages/agentplane/assets/AGENTS.md"
          - "packages/agentplane/assets/RUNNER.md"
          - "packages/agentplane/assets/policy/context.must.md"
          - "packages/agentplane/assets/policy/dod.core.md"
          - "packages/agentplane/assets/policy/dod.docs.md"
          - "packages/agentplane/assets/policy/examples/migration-note.md"
          - "packages/agentplane/assets/policy/governance.md"
          - "packages/agentplane/assets/policy/security.must.md"
          - "packages/agentplane/assets/policy/workflow.branch_pr.md"
          - "packages/agentplane/assets/policy/workflow.direct.md"
          - "packages/agentplane/assets/policy/workflow.md"
          - "packages/agentplane/assets/policy/workflow.release.md"
          - "packages/agentplane/assets/policy/workflow.upgrade.md"
          - "packages/agentplane/package.json"
          - "packages/agentplane/src/adapters/task-backend/kernel-authority-schema.ts"
          - "packages/agentplane/src/adapters/task-backend/kernel-backend-adapter.test.ts"
          - "packages/agentplane/src/adapters/task-backend/kernel-backend-adapter.ts"
          - "packages/agentplane/src/adapters/task-backend/kernel-backend-reconciliation.test.ts"
          - "packages/agentplane/src/adapters/task-backend/kernel-documents.ts"
          - "packages/agentplane/src/adapters/task-backend/kernel-record.ts"
          - "packages/agentplane/src/agents/agents-template.test.ts"
          - "packages/agentplane/src/agents/agents-template.ts"
          - "packages/agentplane/src/backends/task-backend/local-backend-read.ts"
          - "packages/agentplane/src/backends/task-backend/shared/types.ts"
          - "packages/agentplane/src/cli/command-invocations.ts"
          - "packages/agentplane/src/cli/reason-codes.ts"
          - "packages/agentplane/src/cli/run-cli.core.kernel-projection.testkit.ts"
          - "packages/agentplane/src/cli/run-cli.core.roadmap-recipe-v2-entrypoint.test.ts"
          - "packages/agentplane/src/cli/run-cli/command-catalog-loader.ts"
          - "packages/agentplane/src/cli/run-cli/command-catalog/command-session.ts"
          - "packages/agentplane/src/cli/run-cli/command-catalog/task.ts"
          - "packages/agentplane/src/cli/run-cli/command-loaders/task.ts"
          - "packages/agentplane/src/cli/run-cli/commands/core/preflight-report-drift.ts"
          - "packages/agentplane/src/cli/run-cli/commands/init/model.ts"
          - "packages/agentplane/src/cli/run-cli/deferred-runtime-loader.ts"
          - "packages/agentplane/src/cli/run-cli/globals.ts"
          - "packages/agentplane/src/cli/task-advance-effect-recovery.testkit.ts"
          - "packages/agentplane/src/cli/verification-contract.test.ts"
          - "packages/agentplane/src/commands/context/context.spec.ts"
          - "packages/agentplane/src/commands/evaluator/evaluator-artifact-port.ts"
          - "packages/agentplane/src/commands/evaluator/evaluator-evidence-store.ts"
          - "packages/agentplane/src/commands/evaluator/evaluator-review-apply.test.ts"
          - "packages/agentplane/src/commands/evaluator/evaluator-review-apply.ts"
          - "packages/agentplane/src/commands/evaluator/evaluator-work-order.ts"
          - "packages/agentplane/src/commands/evaluator/evaluator.command.ts"
          - "packages/agentplane/src/commands/evidence/evidence-manifest.ts"
          - "packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts"
          - "packages/agentplane/src/commands/guard/impl/commit-diagnostics.ts"
          - "packages/agentplane/src/commands/pr/flow-status.ts"
          - "packages/agentplane/src/commands/pr/integrate/cmd.protected-base.test.ts"
          - "packages/agentplane/src/commands/pr/integrate/cmd.test.ts"
          - "packages/agentplane/src/commands/pr/integrate/internal/post-integrate-bootstrap.ts"
          - "packages/agentplane/src/commands/pr/integrate/queue-state-types.ts"
          - "packages/agentplane/src/commands/pr/internal/git-host-identity.test.ts"
          - "packages/agentplane/src/commands/pr/internal/git-host-identity.ts"
          - "packages/agentplane/src/commands/pr/internal/sync-frozen-base.test.ts"
          - "packages/agentplane/src/commands/recipes.list.test.ts"
          - "packages/agentplane/src/commands/recipes/impl/index.ts"
          - "packages/agentplane/src/commands/shared/declared-check.ts"
          - "packages/agentplane/src/commands/shared/native-task-identity-fixture.ts"
          - "packages/agentplane/src/commands/shared/native-task-identity.ts"
          - "packages/agentplane/src/commands/shared/prompt-graph-diagnostics.ts"
          - "packages/agentplane/src/commands/shared/reconcile-check.ts"
          - "packages/agentplane/src/commands/shared/reconcile-native-applicability.test.ts"
          - "packages/agentplane/src/commands/shared/route-guidance.ts"
          - "packages/agentplane/src/commands/shared/route-oracle.ts"
          - "packages/agentplane/src/commands/shared/source-confidence.ts"
          - "packages/agentplane/src/commands/shared/task-verification-input-types.ts"
          - "packages/agentplane/src/commands/shared/task-worktree-foreign-artifact-history-proof.ts"
          - "packages/agentplane/src/commands/shared/task-worktree-foreign-artifact-repair.test.ts"
          - "packages/agentplane/src/commands/shared/task-worktree-foreign-artifact-repair.ts"
          - "packages/agentplane/src/commands/task/advance-task-step.ts"
          - "packages/agentplane/src/commands/task/agent-work-context-contract.ts"
          - "packages/agentplane/src/commands/task/corrective-authority.command.ts"
          - "packages/agentplane/src/commands/task/create-plan-proposal.test.ts"
          - "packages/agentplane/src/commands/task/create-plan-proposal.ts"
          - "packages/agentplane/src/commands/task/direct-task-verification-checks.ts"
          - "packages/agentplane/src/commands/task/direct-task-verification-observation.ts"
          - "packages/agentplane/src/commands/task/direct-task-verification.observability.test.ts"
          - "packages/agentplane/src/commands/task/direct-task-verification.qualification.test.ts"
          - "packages/agentplane/src/commands/task/direct-task-verification.sequence.cases.ts"
          - "packages/agentplane/src/commands/task/direct-task-verification.test.ts"
          - "packages/agentplane/src/commands/task/direct-task-verification.ts"
          - "packages/agentplane/src/commands/task/external-agent-evaluator-input.ts"
          - "packages/agentplane/src/commands/task/external-agent-evaluator-recovery.ts"
          - "packages/agentplane/src/commands/task/external-agent-evaluator.ts"
          - "packages/agentplane/src/commands/task/external-agent-exchange-authority.ts"
          - "packages/agentplane/src/commands/task/external-agent-implementation-authority.ts"
          - "packages/agentplane/src/commands/task/external-agent-implementation-recovery.ts"
          - "packages/agentplane/src/commands/task/external-agent-planning-authority.ts"
          - "packages/agentplane/src/commands/task/external-agent-supervisor.ts"
          - "packages/agentplane/src/commands/task/external-agent-workflow-recovery.ts"
          - "packages/agentplane/src/commands/task/finish-closeout-journal.ts"
          - "packages/agentplane/src/commands/task/hosted-close-pr.types.ts"
          - "packages/agentplane/src/commands/task/hosted-close-premerge.ts"
          - "packages/agentplane/src/commands/task/kernel-accepted-repository-evidence.ts"
          - "packages/agentplane/src/commands/task/kernel-completed-external-rework.test.ts"
          - "packages/agentplane/src/commands/task/kernel-completed-external-rework.testkit.ts"
          - "packages/agentplane/src/commands/task/kernel-completed-native-review.ts"
          - "packages/agentplane/src/commands/task/kernel-corrective-authority.test.ts"
          - "packages/agentplane/src/commands/task/kernel-corrective-authority.ts"
          - "packages/agentplane/src/commands/task/kernel-cutover.ts"
          - "packages/agentplane/src/commands/task/kernel-exchange.test.ts"
          - "packages/agentplane/src/commands/task/kernel-final-validation.test.ts"
          - "packages/agentplane/src/commands/task/kernel-final-validation.ts"
          - "packages/agentplane/src/commands/task/kernel-inspection.ts"
          - "packages/agentplane/src/commands/task/kernel-operational-projection-recovery.test.ts"
          - "packages/agentplane/src/commands/task/kernel-operational-projection-recovery.ts"
          - "packages/agentplane/src/commands/task/kernel-operational-projection.test.ts"
          - "packages/agentplane/src/commands/task/kernel-operational-projection.ts"
          - "packages/agentplane/src/commands/task/kernel-plan-authority.test.ts"
          - "packages/agentplane/src/commands/task/kernel-plan-authority.ts"
          - "packages/agentplane/src/commands/task/kernel-plan.ts"
          - "packages/agentplane/src/commands/task/kernel-recipe-admission.ts"
          - "packages/agentplane/src/commands/task/kernel-report-only-completion.test.ts"
          - "packages/agentplane/src/commands/task/kernel-report-only-completion.ts"
          - "packages/agentplane/src/commands/task/kernel-repository-coordinator.ts"
          - "packages/agentplane/src/commands/task/kernel-reviewed-base-discovery.test.ts"
          - "packages/agentplane/src/commands/task/kernel-reviewed-base-import.test.ts"
          - "packages/agentplane/src/commands/task/kernel-reviewed-base-import.ts"
          - "packages/agentplane/src/commands/task/kernel-reviewed-base-tree.test.ts"
          - "packages/agentplane/src/commands/task/kernel-reviewed-base-tree.ts"
          - "packages/agentplane/src/commands/task/kernel-runtime-context.ts"
          - "packages/agentplane/src/commands/task/kernel-scoped-intake.test.ts"
          - "packages/agentplane/src/commands/task/kernel-work-order.ts"
          - "packages/agentplane/src/commands/task/migration-apply.ts"
          - "packages/agentplane/src/commands/task/plan-approve-reviewed-base.test.ts"
          - "packages/agentplane/src/commands/task/plan-approve.command.ts"
          - "packages/agentplane/src/commands/task/run-render.ts"
          - "packages/agentplane/src/commands/task/scaffold.ts"
          - "packages/agentplane/src/commands/task/shared/workflow-transition-service.ts"
          - "packages/agentplane/src/commands/task/verification-observation.test.ts"
          - "packages/agentplane/src/commands/task/verification-observation.ts"
          - "packages/agentplane/src/context/ingest-task-pack.test.ts"
          - "packages/agentplane/src/context/ingest-task.ts"
          - "packages/agentplane/src/context/knowledge-ref.ts"
          - "packages/agentplane/src/harness/state-machine.ts"
          - "packages/agentplane/src/policy/taxonomy.ts"
          - "packages/agentplane/src/ports/kernel-authority.ts"
          - "packages/agentplane/src/runner/context/prompt-module-bridge.ts"
          - "packages/agentplane/src/runner/context/recipe-role-context.ts"
          - "packages/agentplane/src/runner/context/roadmap-recipe-prompt.test.ts"
          - "packages/agentplane/src/runner/context/work-order-context.ts"
          - "packages/agentplane/src/runner/observation/git-snapshot/model.ts"
          - "packages/agentplane/src/runner/result-manifest.ts"
          - "packages/agentplane/src/runner/run-record-profile.ts"
          - "packages/agentplane/src/runner/types/state.ts"
          - "packages/agentplane/src/runner/usecases/agent-work-order-build.ts"
          - "packages/agentplane/src/runner/usecases/agent-work-order.integration.test.ts"
          - "packages/agentplane/src/runner/usecases/kernel-authority.test.ts"
          - "packages/agentplane/src/runner/usecases/kernel-authority.ts"
          - "packages/agentplane/src/runner/usecases/kernel-policy-renewal.ts"
          - "packages/agentplane/src/runner/usecases/kernel-task-lifecycle.ts"
          - "packages/agentplane/src/runner/usecases/task-knowledge-retrieval-query.ts"
          - "packages/agentplane/src/runner/usecases/task-knowledge-semantic-escalation.ts"
          - "packages/agentplane/src/runner/usecases/task-run-active-claim-record.ts"
          - "packages/agentplane/src/runner/usecases/task-run-active-claim.testkit.ts"
          - "packages/agentplane/src/runner/usecases/task-run-bootstrap.ts"
          - "packages/agentplane/src/runner/usecases/task-run-effect-resolution.test.ts"
          - "packages/agentplane/src/runner/usecases/task-run-lifecycle-result.ts"
          - "packages/agentplane/src/runner/usecases/task-run-missing-state-authority.ts"
          - "packages/agentplane/src/runner/usecases/task-run-orphaned-effect-guard.ts"
          - "packages/agentplane/src/runtime/harness/types.ts"
          - "packages/agentplane/src/runtime/prompt-modules/model.ts"
          - "packages/agentplane/src/runtime/sgr/contract-types.ts"
          - "packages/agentplane/src/runtime/shared/repo-cli-version.ts"
          - "packages/agentplane/src/runtime/task-execution-context/model.ts"
          - "packages/agentplane/src/shared/package-paths.ts"
          - "packages/agentplane/src/shared/preparation-trace.ts"
          - "packages/agentplane/src/shared/sqlite-driver.ts"
          - "packages/agentplane/src/workflow-runtime/migration.ts"
          - "packages/agentplane/test-fixtures/task-worktree-foreign-artifact-repair-fixture.ts"
          - "packages/core/package.json"
          - "packages/core/schemas/agent-work-order-v2.schema.json"
          - "packages/core/schemas/config.schema.json"
          - "packages/core/schemas/task-handoff.schema.json"
          - "packages/core/schemas/task-readme-frontmatter.schema.json"
          - "packages/core/schemas/tasks-export.schema.json"
          - "packages/core/schemas/workflow.schema.json"
          - "packages/core/src/config/schema.impl.ts"
          - "packages/core/src/git/git-utils.ts"
          - "packages/core/src/index.ts"
          - "packages/core/src/process/run-process.observation.test.ts"
          - "packages/core/src/process/run-process.ts"
          - "packages/core/src/runner/agent-work-order.ts"
          - "packages/core/src/runner/knowledge-ref.ts"
          - "packages/core/src/runner/recipe-role-context.test.ts"
          - "packages/core/src/runner/recipe-role-context.ts"
          - "packages/core/src/runner/runner-effect-operation.ts"
          - "packages/core/src/runner/supervisor-execution-episode-migration.ts"
          - "packages/core/src/runner/supervisor-execution-episode.ts"
          - "packages/core/src/schemas/index.ts"
          - "packages/core/src/schemas/iso-timestamp.test.ts"
          - "packages/core/src/schemas/iso-timestamp.ts"
          - "packages/core/src/tasks/index.ts"
          - "packages/core/src/tasks/kernel-plan-refinement.ts"
          - "packages/core/src/tasks/kernel-semantic.ts"
          - "packages/core/src/tasks/plan-execution-grant.ts"
          - "packages/core/src/tasks/supplied-plan-aggregate.ts"
          - "packages/core/src/tasks/task-artifact-schema.handoff.ts"
          - "packages/core/src/tasks/task-artifact-schema.shared.ts"
          - "packages/core/src/tasks/task-centric/model.ts"
          - "packages/core/src/tasks/task-centric/schema.ts"
          - "packages/core/src/tasks/task-kernel/authority-delta.test.ts"
          - "packages/core/src/tasks/task-kernel/authority-lineage.ts"
          - "packages/core/src/tasks/task-kernel/corrective-authority.test.ts"
          - "packages/core/src/tasks/task-kernel/corrective-authority.ts"
          - "packages/core/src/tasks/task-kernel/index.ts"
          - "packages/core/src/tasks/task-kernel/invariants.ts"
          - "packages/core/src/tasks/task-kernel/kernel.ts"
          - "packages/core/src/tasks/task-kernel/model.ts"
          - "packages/core/src/tasks/task-store.ts"
          - "packages/recipes/package.json"
          - "packages/recipes/src/compiled-contracts.ts"
          - "packages/recipes/src/manifest-contracts.ts"
          - "packages/recipes/src/manifest.ts"
          - "packages/spec/schemas/agent-work-order-v2.schema.json"
          - "packages/spec/schemas/config.schema.json"
          - "packages/spec/schemas/task-handoff.schema.json"
          - "packages/spec/schemas/task-readme-frontmatter.schema.json"
          - "packages/spec/schemas/tasks-export.schema.json"
          - "packages/spec/schemas/workflow.schema.json"
          - "packages/testkit/src/cli-harness/temp-root-cleanup.integration.test.ts"
          - "schemas/agent-semantic-result.schema.json"
          - "schemas/agent-work-order-v2.schema.json"
          - "schemas/config.schema.json"
          - "schemas/execution-receipt.schema.json"
          - "schemas/task-handoff.schema.json"
          - "schemas/task-readme-frontmatter.schema.json"
          - "schemas/tasks-export.schema.json"
          - "schemas/workflow.schema.json"
          - "scripts/baselines/v0.7-compatibility-candidate.json"
          - "scripts/baselines/v0.7-pr6095-cli-review.json"
          - "scripts/bench/internal/paired-m05/app-server-host-probe.mjs"
          - "scripts/bench/internal/paired-m05/app-server-port.mjs"
          - "scripts/bench/internal/paired-m05/boundary.mjs"
          - "scripts/bench/internal/paired-m05/boundary.test.mjs"
          - "scripts/bench/internal/paired-m05/broker-configuration.mjs"
          - "scripts/bench/internal/paired-m05/broker-worker.mjs"
          - "scripts/bench/internal/paired-m05/broker-worker.test.mjs"
          - "scripts/bench/internal/paired-m05/brokered-app-server.mjs"
          - "scripts/bench/internal/paired-m05/brokered-app-server.test.mjs"
          - "scripts/bench/internal/paired-m05/coding-corpus.mjs"
          - "scripts/bench/internal/paired-m05/coding-corpus.test.mjs"
          - "scripts/bench/internal/paired-m05/coding-host.mjs"
          - "scripts/bench/internal/paired-m05/coding-host.test.mjs"
          - "scripts/bench/internal/paired-m05/coding-recipe-package.mjs"
          - "scripts/bench/internal/paired-m05/coding-recipe.mjs"
          - "scripts/bench/internal/paired-m05/coding-recipe.test.mjs"
          - "scripts/bench/internal/paired-m05/contract.mjs"
          - "scripts/bench/internal/paired-m05/isolation.mjs"
          - "scripts/bench/internal/paired-m05/isolation.test.mjs"
          - "scripts/bench/internal/paired-m05/journal.mjs"
          - "scripts/bench/internal/paired-m05/landlock-runner.py"
          - "scripts/bench/internal/paired-m05/ledger.mjs"
          - "scripts/bench/internal/paired-m05/ledger.test.mjs"
          - "scripts/bench/internal/paired-m05/native-coding-cli.test.mjs"
          - "scripts/bench/internal/paired-m05/native-coding-evidence.mjs"
          - "scripts/bench/internal/paired-m05/native-coding-loop.mjs"
          - "scripts/bench/internal/paired-m05/native-coding-loop.test.mjs"
          - "scripts/bench/internal/paired-m05/native-coding-port.mjs"
          - "scripts/bench/internal/paired-m05/public-compiler-feedback.mjs"
          - "scripts/bench/internal/paired-m05/public-compiler-feedback.test.mjs"
          - "scripts/bench/internal/paired-m05/public-interface-feedback.mjs"
          - "scripts/bench/internal/paired-m05/public-interface-feedback.test.mjs"
          - "scripts/bench/internal/paired-m05/public-package-feedback.mjs"
          - "scripts/bench/internal/paired-m05/public-package-feedback.test.mjs"
          - "scripts/bench/internal/paired-m05/public-product-contract.mjs"
          - "scripts/bench/internal/paired-m05/qualify-oracle-framing.mjs"
          - "scripts/bench/internal/paired-m05/report.mjs"
          - "scripts/bench/internal/paired-m05/report.test.mjs"
          - "scripts/bench/internal/paired-m05/semantic-coding-port.mjs"
          - "scripts/bench/internal/paired-m05/semantic-coding-port.test.mjs"
          - "scripts/bench/internal/paired-m05/stable-file.mjs"
          - "scripts/bench/internal/paired-m05/stable-file.test.mjs"
          - "scripts/bench/internal/paired-m05/subscription-analysis.mjs"
          - "scripts/bench/internal/paired-m05/subscription-boundary.mjs"
          - "scripts/bench/internal/paired-m05/subscription-contract.mjs"
          - "scripts/bench/internal/paired-m05/subscription-ledger.mjs"
          - "scripts/bench/internal/paired-m05/subscription-registration.mjs"
          - "scripts/bench/internal/paired-m05/subscription-report.mjs"
          - "scripts/bench/internal/paired-m05/subscription-report.test.mjs"
          - "scripts/bench/internal/paired-m05/subscription-setup-host.mjs"
          - "scripts/bench/internal/paired-m05/subscription-setup-host.test.mjs"
          - "scripts/bench/internal/paired-m05/subscription.test.mjs"
          - "scripts/bench/paired-live-codex-launcher.mjs"
          - "scripts/bench/paired-live-codex-launcher.test.mjs"
          - "scripts/bench/paired-m05-offline.test.mjs"
          - "scripts/bench/paired-m05-setup.mjs"
          - "scripts/bench/paired-production-driver.mjs"
          - "scripts/bench/paired-production-driver.test.mjs"
          - "scripts/bench/paired-result-report.mjs"
          - "scripts/bench/paired-result-report.test.mjs"
          - "scripts/checks/check-compatibility-contract-baseline.mjs"
          - "scripts/checks/run-local-ci-group.mjs"
          - "scripts/checks/run-local-ci.mjs"
          - "scripts/lib/local-ci-resource-profile.mjs"
          - "scripts/lib/local-ci-resource-profile.test.mjs"
          - "scripts/lib/verification-failures-reporter.mjs"
          - "scripts/lib/verification-observation.mjs"
          - "scripts/lib/verification-observation.test.mjs"
          - "scripts/lib/verification-scheduler.d.ts"
          - "scripts/lib/verification-scheduler.mjs"
          - "scripts/lib/verification-scheduler.test.mjs"
          - "scripts/release/check-local-tarball-install-smoke.mjs"
          - "scripts/release/installed-recipe-matrix.mjs"
          - "vitest.config.ts"
        external_effects: []
        repository_effects:
          - "dependencies"
          - "documentation"
          - "public_api"
          - "release_metadata"
          - "repository_write"
          - "schema"
          - "source_code"
          - "tests"
      phase: "task"
      policy_floor:
        monotonic_strengthening: true
        pr_full_regression: true
        unknown_or_central_full_regression: true
      requires_full_regression: true
      requires_real_e2e: false
      schema_version: 2
      selected_checks:
        - "affected_unit_integration"
        - "critical_paths"
        - "docs_contract"
        - "full_regression"
        - "hosted_integration"
        - "task_outcome"
      selector:
        bucket: null
        buckets: []
        execution_mode: "semantic"
        kind: "semantic"
        lint_targets: []
        reason: "execution_declaration"
        run_cli_docs_check: false
        selected_test_files: []
        vitest_pool: "forks"
      source: "execution_contract"
    required_evidence:
      - "hosted_integration"
      - "repository_effect:ci"
      - "repository_effect:dependencies"
      - "repository_effect:documentation"
      - "repository_effect:public_api"
      - "repository_effect:release_metadata"
      - "repository_effect:repository_write"
      - "repository_effect:schema"
      - "repository_effect:source_code"
      - "repository_effect:tests"
      - "task_outcome"
commit:
  hash: "b3cf4b13e2804179c8a3437d7372377ed33b93e0"
  message: "AgentPlane-owned canonical implementation commit"
comments: []
events:
  -
    type: "verify"
    at: "2026-10-10T11:52:31.354Z"
    author: "SUPERVISOR"
    state: "ok"
    note: "Verified: canonical Task Kernel final checks passed."
doc_version: 3
doc_updated_at: "2026-10-10T11:52:44.089Z"
doc_updated_by: "SUPERVISOR"
description: "The PR 6095 verify-contract job fails at reviewed Recipe V2 section inventory drift because the CLI topology digest changed from 1b2e5a... to d14dab... after fixing issue 6076. Review the exact CLI topology delta, update only the approved compatibility candidate and guard as warranted, preserve rejected-recapture protections, and validate the GitHub contract check. This is a corrective follow-up to the existing PR, not a release or package version change."
sections:
  Summary: |-
    Review and update compatibility candidate for CLI help changes in PR 6095

    The PR 6095 verify-contract job fails at reviewed Recipe V2 section inventory drift because the CLI topology digest changed from 1b2e5a... to d14dab... after fixing issue 6076. Review the exact CLI topology delta, update only the approved compatibility candidate and guard as warranted, preserve rejected-recapture protections, and validate the GitHub contract check. This is a corrective follow-up to the existing PR, not a release or package version change.
  Scope: |-
    - In scope: The PR 6095 verify-contract job fails at reviewed Recipe V2 section inventory drift because the CLI topology digest changed from 1b2e5a... to d14dab... after fixing issue 6076. Review the exact CLI topology delta, update only the approved compatibility candidate and guard as warranted, preserve rejected-recapture protections, and validate the GitHub contract check. This is a corrective follow-up to the existing PR, not a release or package version change.
    - Out of scope: unrelated refactors not required for "Review and update compatibility candidate for CLI help changes in PR 6095".
  Plan: |-
    1. Execute approved WorkItem review-compatibility-delta.
    2. Execute approved WorkItem final-correction-fc26d3df5ffb.
    3. Execute approved WorkItem final-correction-f78912693c7e.
  Verify Steps: |-
    PLANNER fallback scaffold for "Review and update compatibility candidate for CLI help changes in PR 6095". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Review and update compatibility candidate for CLI help changes in PR 6095". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-10-10T11:52:31.354Z — VERIFY — ok

    By: SUPERVISOR

    Note: Verified: canonical Task Kernel final checks passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:2d2aaea644d6f83c9949b5cac2c1454bb33763963143d109a4abcd4eda891f57, input_digest=sha256:5a4c5d4539f0cfe75bd8f2336e902ee50e70c128adf653be45ec61d5e63283c7

    Details:

    Check: affected_unit_integration
    Command: bun run bench:compatibility:candidate:check
    Result: pass
    Evidence: .agentplane/tasks/202610092056-WS6H31/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202610092056-WS6H31 Verification Contract check affected_unit_integration (1/4)

    Check: affected_unit_integration
    Command: bun run bench:compatibility:check
    Result: pass
    Evidence: .agentplane/tasks/202610092056-WS6H31/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202610092056-WS6H31 Verification Contract check affected_unit_integration (2/4)

    Check: affected_unit_integration
    Command: bun run format:check
    Result: pass
    Evidence: .agentplane/tasks/202610092056-WS6H31/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202610092056-WS6H31 Verification Contract check affected_unit_integration (3/4)

    Check: affected_unit_integration
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202610092056-WS6H31/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202610092056-WS6H31 Verification Contract check affected_unit_integration (4/4)

    Check: critical_paths
    Command: bun run bench:compatibility:candidate:check
    Result: pass
    Evidence: .agentplane/tasks/202610092056-WS6H31/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202610092056-WS6H31 Verification Contract check critical_paths (1/4)

    Check: critical_paths
    Command: bun run bench:compatibility:check
    Result: pass
    Evidence: .agentplane/tasks/202610092056-WS6H31/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202610092056-WS6H31 Verification Contract check critical_paths (2/4)

    Check: critical_paths
    Command: bun run format:check
    Result: pass
    Evidence: .agentplane/tasks/202610092056-WS6H31/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202610092056-WS6H31 Verification Contract check critical_paths (3/4)

    Check: critical_paths
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202610092056-WS6H31/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202610092056-WS6H31 Verification Contract check critical_paths (4/4)

    Check: docs_contract
    Command: bun run bench:compatibility:candidate:check
    Result: pass
    Evidence: .agentplane/tasks/202610092056-WS6H31/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202610092056-WS6H31 Verification Contract check docs_contract (1/4)

    Check: docs_contract
    Command: bun run bench:compatibility:check
    Result: pass
    Evidence: .agentplane/tasks/202610092056-WS6H31/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202610092056-WS6H31 Verification Contract check docs_contract (2/4)

    Check: docs_contract
    Command: bun run format:check
    Result: pass
    Evidence: .agentplane/tasks/202610092056-WS6H31/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202610092056-WS6H31 Verification Contract check docs_contract (3/4)

    Check: docs_contract
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202610092056-WS6H31/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202610092056-WS6H31 Verification Contract check docs_contract (4/4)

    Check: full_regression
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202610092056-WS6H31/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202610092056-WS6H31 Verification Contract check full_regression

    Check: task_outcome
    Command: bun run bench:compatibility:candidate:check
    Result: pass
    Evidence: .agentplane/tasks/202610092056-WS6H31/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202610092056-WS6H31 Verification Contract check task_outcome (1/4)

    Check: task_outcome
    Command: bun run bench:compatibility:check
    Result: pass
    Evidence: .agentplane/tasks/202610092056-WS6H31/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202610092056-WS6H31 Verification Contract check task_outcome (2/4)

    Check: task_outcome
    Command: bun run format:check
    Result: pass
    Evidence: .agentplane/tasks/202610092056-WS6H31/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202610092056-WS6H31 Verification Contract check task_outcome (3/4)

    Check: task_outcome
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202610092056-WS6H31/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202610092056-WS6H31 Verification Contract check task_outcome (4/4)

    NativeTaskIdentityRef:
    - plan_digest: sha256:86441b742d0944f42a36c484974a596d3337de0221f822cb6d27708ef67048b6
    - policy_digest: sha256:0a1c23b8d8d34f5109077402d56c9e1fcde960daddafaea20ba2824992dfef7f
    - capability_digest: sha256:ed73e7a6b8130531e435ae7307ee1c88ebd05d54f2fdd1f8e55eb67079748de9
    - checks_digest: sha256:aae24f3cf1ccc0877c88c221275cf9923adb88a484c496ddfc543c14f16c5b74
    - identity_digest: sha256:392b94db5202edbf7cdf94aabce10cd41b5f4351a28c41c1b461f0f4789396d7

    DecisionContextRef:
    - operator_action: provider_action
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: none
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
extensions:
  agentplane.kernel_operational_projection:
    digest: "sha256:b29c6080167f581c28a2210d4b3a1c6965387ac880bed54232c9490800afe22d"
    evidence_refs:
      - "../../../.git/agentplane/kernel/exchanges/202610092056-WS6H31/9e473320c915633d268e69669373325619e383c2bdfeb8d3608eec0d4e93df6b/quality-report.json"
    findings:
      - "Validated the context source, all 13 required context block digests and lengths, all four required input digests, and result schema digest. The report raw SHA-256 matches c5abc748b5db2134a6a12a64c3805294ede2f91242eab90b07fca6232ec50e30."
      - "The report pins both comparison commits, before and after topology digests, unchanged command and positional counts, the three additive closure options, absence of removals and mutations, and source task provenance. Each listed candidate JSON path resolves to the reviewed change, including derived digest fields. Candidate, guard and immutable baseline file hashes match the report."
      - "The correction adds only scripts/baselines/v0.7-pr6095-cli-review.json beyond the previously inspected implementation. The candidate and exact-delta guard remain unchanged from that inspection; published baselines, package versions and rejected-recapture checks remain intact."
      - "Native validation records exit 0 for all required commands: bun run bench:compatibility:candidate:check, bun run bench:compatibility:check and bun run format:check. The contract check reports 255 commands, 176 arguments and 860 options."
    implementation_commit: "b3cf4b13e2804179c8a3437d7372377ed33b93e0"
    implementation_tree: "4e56bb6c8635aa2000df232b0bc44a93d952b8af"
    projected_at: "2026-10-09T21:29:43.484Z"
    review_identity_digest: "sha256:f4982f34845df9f04b5aab3e1f7bc208498f954cfb3e89bd8584cde6800e00d0"
    schema_version: 1
    source: "task_kernel"
    verification_evidence_digest: "sha256:b43d4bd8da9590a61b5fd408a398fc3481dd00bab0917e092a89e9d7a11c3aa6"
    work_order_id: "sha256:9d306941441558a0ba876bcd5631b9a1477660fa4631dc62768ba7f07dabe67e"
  task_execution_context:
    base_ref: "task/202610081434-RDZE4P/resolve-open-consumer-lifecycle-defects-6054-and"
    base_sha: "f8df44c021e8cdfe38aa4eaedf9d8f86d441cad8"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    source: "explicit"
  task_kernel:
    aggregate:
      authority_lineage:
        -
          approval_mode: "repository_policy"
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:388e94bd57fa3ea63e799ce67febc100c74b45c6bd4a9cb47ec44e98a0723e97"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:f4644c2b8cd8639458f8f31b9bc2284175975585f4d42722031f9d9f39243e92"
            plan_revision: 1
            policy_digests:
              - "sha256:a91910e9592eefc136734171b90572e87ed161b2792c6aad955db92404621eed"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:fbcafb684fd4b100f2703290fa3ba6f957141000ebebe7969470a7a9038ac8c1"
              kind: "SYSTEM"
              parent_authority_digest: null
            repository_effects:
              - "ci"
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:08aca76b5ea2fb336d34a8515562a0aaa95529c3833b319f3752c956038ead54"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "scripts"
            task_id: "202610092056-WS6H31"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "full_regression"
              - "hosted_integration"
              - "task_outcome"
            work_item_id: null
          observation: null
        -
          approval_mode: null
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:b17a4ff58af8a52929c475e77eadc5706d6a79c376eb672e2d0b01489f8d3665"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:f4644c2b8cd8639458f8f31b9bc2284175975585f4d42722031f9d9f39243e92"
            plan_revision: 1
            policy_digests:
              - "sha256:a91910e9592eefc136734171b90572e87ed161b2792c6aad955db92404621eed"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:fbcafb684fd4b100f2703290fa3ba6f957141000ebebe7969470a7a9038ac8c1"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:388e94bd57fa3ea63e799ce67febc100c74b45c6bd4a9cb47ec44e98a0723e97"
            repository_effects:
              - "ci"
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:e0042d92dd460a50b74384420e3abdc8439f2d3c4e946e01553288ca6be3f180"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "scripts"
            task_id: "202610092056-WS6H31"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "full_regression"
              - "hosted_integration"
              - "task_outcome"
            work_item_id: null
          observation:
            changed_paths:
              - "scripts/baselines/v0.7-compatibility-candidate.json"
              - "scripts/checks/check-compatibility-contract-baseline.mjs"
            evidence_digest: "sha256:36d4370a7ab8fe7bc527db593c388a3483779a11e08529c434fd0e5d12480905"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:08aca76b5ea2fb336d34a8515562a0aaa95529c3833b319f3752c956038ead54"
        -
          approval_mode: null
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:017a58e746b3895579bbf017a231b2de1bc52994aa16038da3582511947aad22"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:f4644c2b8cd8639458f8f31b9bc2284175975585f4d42722031f9d9f39243e92"
            plan_revision: 1
            policy_digests:
              - "sha256:a91910e9592eefc136734171b90572e87ed161b2792c6aad955db92404621eed"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:fbcafb684fd4b100f2703290fa3ba6f957141000ebebe7969470a7a9038ac8c1"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:b17a4ff58af8a52929c475e77eadc5706d6a79c376eb672e2d0b01489f8d3665"
            repository_effects:
              - "ci"
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:eeb14096b1060fe1857c188626c4151755d70aeecac015c7ba126cbc21cdf75d"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "scripts"
            task_id: "202610092056-WS6H31"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "full_regression"
              - "hosted_integration"
              - "task_outcome"
            work_item_id: null
          observation:
            changed_paths:
              - "scripts/baselines/v0.7-pr6095-cli-review.json"
            evidence_digest: "sha256:cd4a9bc5dd186d70d2e2c246e63aa6c27e4776f742894bc35081a8d5a3b9bf01"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:e0042d92dd460a50b74384420e3abdc8439f2d3c4e946e01553288ca6be3f180"
        -
          approval_mode: null
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:ec595b59dd1dadba835278888bd29b52241beecf5cfff780f9bdb9d70a596d5d"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:838499da9353617f2b624adcd6434b65df29b62fe4d59ab4717a3689add4f254"
            plan_revision: 2
            policy_digests:
              - "sha256:a91910e9592eefc136734171b90572e87ed161b2792c6aad955db92404621eed"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:fbcafb684fd4b100f2703290fa3ba6f957141000ebebe7969470a7a9038ac8c1"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:017a58e746b3895579bbf017a231b2de1bc52994aa16038da3582511947aad22"
            repository_effects:
              - "ci"
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:eeb14096b1060fe1857c188626c4151755d70aeecac015c7ba126cbc21cdf75d"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "scripts"
            task_id: "202610092056-WS6H31"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "full_regression"
              - "hosted_integration"
              - "task_outcome"
            work_item_id: null
          observation:
            added_scope_roots: []
            changed_paths: []
            evidence_digest: "sha256:193dddd05118561493b566fe58102050211644fc6f2f0a674a67641479c0e227"
            kind: "plan_amendment"
            previous_fingerprint: "sha256:eeb14096b1060fe1857c188626c4151755d70aeecac015c7ba126cbc21cdf75d"
        -
          approval_mode: "manual_operator"
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:78a21169c427bdfe62bed44a5e4bd88bc449560ff03834f6e8e00afb0fb68621"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:838499da9353617f2b624adcd6434b65df29b62fe4d59ab4717a3689add4f254"
            plan_revision: 2
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "USER"
              evidence_digest: "sha256:fbcafb684fd4b100f2703290fa3ba6f957141000ebebe7969470a7a9038ac8c1"
              kind: "USER"
              parent_authority_digest: "sha256:ec595b59dd1dadba835278888bd29b52241beecf5cfff780f9bdb9d70a596d5d"
            repository_effects:
              - "ci"
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:99bf2816b1e084d95815cc175b980a1ff70ff54afa9d6e5302a795952dbb77fe"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "scripts"
            task_id: "202610092056-WS6H31"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "full_regression"
              - "hosted_integration"
              - "task_outcome"
            work_item_id: null
          observation:
            changed_paths:
              - ".agentplane/policy/context.must.md"
              - ".agentplane/policy/dod.core.md"
              - ".agentplane/policy/dod.docs.md"
              - ".agentplane/policy/examples/migration-note.md"
              - ".agentplane/policy/governance.md"
              - ".agentplane/policy/security.must.md"
              - ".agentplane/policy/workflow.branch_pr.md"
              - ".agentplane/policy/workflow.direct.md"
              - ".agentplane/policy/workflow.md"
              - ".agentplane/policy/workflow.release.md"
              - ".agentplane/policy/workflow.upgrade.md"
              - ".prettierignore"
              - "artifacts/bench/m05-live-0.7.13/broker-qualification.md"
              - "artifacts/bench/m05-live-0.7.13/coding-corpus-qualification.json"
              - "artifacts/bench/m05-live-0.7.13/experiment-protocol.md"
              - "artifacts/bench/m05-live-0.7.13/oracle-framing-qualification.json"
              - "artifacts/bench/m05-live-0.7.13/subscription-protocol.md"
              - "artifacts/bench/m05-live-0.7.13/subscription-registration.json"
              - "bun.lock"
              - "context/wiki/index.md"
              - "context/wiki/proposals/index.md"
              - "context/wiki/proposals/task-harvest/index.md"
              - "context/wiki/release-docs/concepts/index.md"
              - "context/wiki/release-docs/domains/index.md"
              - "context/wiki/release-docs/release-lines/index.md"
              - "context/wiki/reports/index.md"
              - "context/wiki/task-harvest/index.md"
              - "docs/developer/modular-prompt-assembly.mdx"
              - "docs/developer/testing-and-quality.mdx"
              - "docs/releases/v0.7.1.md"
              - "docs/releases/v0.7.13-acceptance.md"
              - "docs/releases/v0.7.13.md"
              - "docs/user/cli-reference.generated.mdx"
              - "docs/user/task-lifecycle.mdx"
              - "eslint.config.cjs"
              - "package.json"
              - "packages/agentplane/assets/AGENTS.md"
              - "packages/agentplane/assets/RUNNER.md"
              - "packages/agentplane/assets/policy/context.must.md"
              - "packages/agentplane/assets/policy/dod.core.md"
              - "packages/agentplane/assets/policy/dod.docs.md"
              - "packages/agentplane/assets/policy/examples/migration-note.md"
              - "packages/agentplane/assets/policy/governance.md"
              - "packages/agentplane/assets/policy/security.must.md"
              - "packages/agentplane/assets/policy/workflow.branch_pr.md"
              - "packages/agentplane/assets/policy/workflow.direct.md"
              - "packages/agentplane/assets/policy/workflow.md"
              - "packages/agentplane/assets/policy/workflow.release.md"
              - "packages/agentplane/assets/policy/workflow.upgrade.md"
              - "packages/agentplane/package.json"
              - "packages/agentplane/src/adapters/task-backend/kernel-authority-schema.ts"
              - "packages/agentplane/src/adapters/task-backend/kernel-backend-adapter.test.ts"
              - "packages/agentplane/src/adapters/task-backend/kernel-backend-adapter.ts"
              - "packages/agentplane/src/adapters/task-backend/kernel-backend-reconciliation.test.ts"
              - "packages/agentplane/src/adapters/task-backend/kernel-documents.ts"
              - "packages/agentplane/src/adapters/task-backend/kernel-record.ts"
              - "packages/agentplane/src/agents/agents-template.test.ts"
              - "packages/agentplane/src/agents/agents-template.ts"
              - "packages/agentplane/src/backends/task-backend/local-backend-read.ts"
              - "packages/agentplane/src/backends/task-backend/shared/types.ts"
              - "packages/agentplane/src/cli/command-invocations.ts"
              - "packages/agentplane/src/cli/reason-codes.ts"
              - "packages/agentplane/src/cli/run-cli.core.kernel-projection.testkit.ts"
              - "packages/agentplane/src/cli/run-cli.core.roadmap-recipe-v2-entrypoint.test.ts"
              - "packages/agentplane/src/cli/run-cli/command-catalog-loader.ts"
              - "packages/agentplane/src/cli/run-cli/command-catalog/command-session.ts"
              - "packages/agentplane/src/cli/run-cli/command-catalog/task.ts"
              - "packages/agentplane/src/cli/run-cli/command-loaders/task.ts"
              - "packages/agentplane/src/cli/run-cli/commands/core/preflight-report-drift.ts"
              - "packages/agentplane/src/cli/run-cli/commands/init/model.ts"
              - "packages/agentplane/src/cli/run-cli/deferred-runtime-loader.ts"
              - "packages/agentplane/src/cli/run-cli/globals.ts"
              - "packages/agentplane/src/cli/task-advance-effect-recovery.testkit.ts"
              - "packages/agentplane/src/commands/context/context.spec.ts"
              - "packages/agentplane/src/commands/evaluator/evaluator-artifact-port.ts"
              - "packages/agentplane/src/commands/evaluator/evaluator-evidence-store.ts"
              - "packages/agentplane/src/commands/evaluator/evaluator-review-apply.test.ts"
              - "packages/agentplane/src/commands/evaluator/evaluator-review-apply.ts"
              - "packages/agentplane/src/commands/evaluator/evaluator-work-order.ts"
              - "packages/agentplane/src/commands/evaluator/evaluator.command.ts"
              - "packages/agentplane/src/commands/evidence/evidence-manifest.ts"
              - "packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts"
              - "packages/agentplane/src/commands/guard/impl/commit-diagnostics.ts"
              - "packages/agentplane/src/commands/pr/flow-status.ts"
              - "packages/agentplane/src/commands/pr/integrate/cmd.protected-base.test.ts"
              - "packages/agentplane/src/commands/pr/integrate/cmd.test.ts"
              - "packages/agentplane/src/commands/pr/integrate/internal/post-integrate-bootstrap.ts"
              - "packages/agentplane/src/commands/pr/integrate/queue-state-types.ts"
              - "packages/agentplane/src/commands/pr/internal/git-host-identity.test.ts"
              - "packages/agentplane/src/commands/pr/internal/git-host-identity.ts"
              - "packages/agentplane/src/commands/pr/internal/sync-frozen-base.test.ts"
              - "packages/agentplane/src/commands/recipes.list.test.ts"
              - "packages/agentplane/src/commands/recipes/impl/index.ts"
              - "packages/agentplane/src/commands/shared/declared-check.ts"
              - "packages/agentplane/src/commands/shared/native-task-identity-fixture.ts"
              - "packages/agentplane/src/commands/shared/native-task-identity.ts"
              - "packages/agentplane/src/commands/shared/prompt-graph-diagnostics.ts"
              - "packages/agentplane/src/commands/shared/reconcile-check.ts"
              - "packages/agentplane/src/commands/shared/reconcile-native-applicability.test.ts"
              - "packages/agentplane/src/commands/shared/route-guidance.ts"
              - "packages/agentplane/src/commands/shared/route-oracle.ts"
              - "packages/agentplane/src/commands/shared/source-confidence.ts"
              - "packages/agentplane/src/commands/shared/task-verification-input-types.ts"
              - "packages/agentplane/src/commands/shared/task-worktree-foreign-artifact-history-proof.ts"
              - "packages/agentplane/src/commands/shared/task-worktree-foreign-artifact-repair.test.ts"
              - "packages/agentplane/src/commands/shared/task-worktree-foreign-artifact-repair.ts"
              - "packages/agentplane/src/commands/task/advance-task-step.ts"
              - "packages/agentplane/src/commands/task/agent-work-context-contract.ts"
              - "packages/agentplane/src/commands/task/corrective-authority.command.ts"
              - "packages/agentplane/src/commands/task/create-plan-proposal.test.ts"
              - "packages/agentplane/src/commands/task/create-plan-proposal.ts"
              - "packages/agentplane/src/commands/task/direct-task-verification-checks.ts"
              - "packages/agentplane/src/commands/task/direct-task-verification-observation.ts"
              - "packages/agentplane/src/commands/task/direct-task-verification.observability.test.ts"
              - "packages/agentplane/src/commands/task/direct-task-verification.qualification.test.ts"
              - "packages/agentplane/src/commands/task/direct-task-verification.sequence.cases.ts"
              - "packages/agentplane/src/commands/task/direct-task-verification.test.ts"
              - "packages/agentplane/src/commands/task/direct-task-verification.ts"
              - "packages/agentplane/src/commands/task/external-agent-evaluator-input.ts"
              - "packages/agentplane/src/commands/task/external-agent-evaluator-recovery.ts"
              - "packages/agentplane/src/commands/task/external-agent-evaluator.ts"
              - "packages/agentplane/src/commands/task/external-agent-exchange-authority.ts"
              - "packages/agentplane/src/commands/task/external-agent-implementation-authority.ts"
              - "packages/agentplane/src/commands/task/external-agent-implementation-recovery.ts"
              - "packages/agentplane/src/commands/task/external-agent-planning-authority.ts"
              - "packages/agentplane/src/commands/task/external-agent-supervisor.ts"
              - "packages/agentplane/src/commands/task/external-agent-workflow-recovery.ts"
              - "packages/agentplane/src/commands/task/finish-closeout-journal.ts"
              - "packages/agentplane/src/commands/task/hosted-close-pr.types.ts"
              - "packages/agentplane/src/commands/task/hosted-close-premerge.ts"
              - "packages/agentplane/src/commands/task/kernel-completed-external-rework.test.ts"
              - "packages/agentplane/src/commands/task/kernel-completed-external-rework.testkit.ts"
              - "packages/agentplane/src/commands/task/kernel-completed-native-review.ts"
              - "packages/agentplane/src/commands/task/kernel-corrective-authority.test.ts"
              - "packages/agentplane/src/commands/task/kernel-corrective-authority.ts"
              - "packages/agentplane/src/commands/task/kernel-cutover.ts"
              - "packages/agentplane/src/commands/task/kernel-exchange.test.ts"
              - "packages/agentplane/src/commands/task/kernel-final-validation.test.ts"
              - "packages/agentplane/src/commands/task/kernel-final-validation.ts"
              - "packages/agentplane/src/commands/task/kernel-inspection.ts"
              - "packages/agentplane/src/commands/task/kernel-operational-projection-recovery.ts"
              - "packages/agentplane/src/commands/task/kernel-operational-projection.test.ts"
              - "packages/agentplane/src/commands/task/kernel-operational-projection.ts"
              - "packages/agentplane/src/commands/task/kernel-plan-authority.test.ts"
              - "packages/agentplane/src/commands/task/kernel-plan-authority.ts"
              - "packages/agentplane/src/commands/task/kernel-plan.ts"
              - "packages/agentplane/src/commands/task/kernel-recipe-admission.ts"
              - "packages/agentplane/src/commands/task/kernel-report-only-completion.test.ts"
              - "packages/agentplane/src/commands/task/kernel-report-only-completion.ts"
              - "packages/agentplane/src/commands/task/kernel-reviewed-base-import.test.ts"
              - "packages/agentplane/src/commands/task/kernel-reviewed-base-import.ts"
              - "packages/agentplane/src/commands/task/kernel-reviewed-base-tree.test.ts"
              - "packages/agentplane/src/commands/task/kernel-reviewed-base-tree.ts"
              - "packages/agentplane/src/commands/task/kernel-runtime-context.ts"
              - "packages/agentplane/src/commands/task/kernel-scoped-intake.test.ts"
              - "packages/agentplane/src/commands/task/kernel-work-order.ts"
              - "packages/agentplane/src/commands/task/migration-apply.ts"
              - "packages/agentplane/src/commands/task/plan-approve-reviewed-base.test.ts"
              - "packages/agentplane/src/commands/task/plan-approve.command.ts"
              - "packages/agentplane/src/commands/task/run-render.ts"
              - "packages/agentplane/src/commands/task/scaffold.ts"
              - "packages/agentplane/src/commands/task/shared/workflow-transition-service.ts"
              - "packages/agentplane/src/commands/task/verification-observation.test.ts"
              - "packages/agentplane/src/commands/task/verification-observation.ts"
              - "packages/agentplane/src/context/ingest-task-pack.test.ts"
              - "packages/agentplane/src/context/ingest-task.ts"
              - "packages/agentplane/src/context/knowledge-ref.ts"
              - "packages/agentplane/src/harness/state-machine.ts"
              - "packages/agentplane/src/policy/taxonomy.ts"
              - "packages/agentplane/src/ports/kernel-authority.ts"
              - "packages/agentplane/src/runner/context/prompt-module-bridge.ts"
              - "packages/agentplane/src/runner/context/recipe-role-context.ts"
              - "packages/agentplane/src/runner/context/roadmap-recipe-prompt.test.ts"
              - "packages/agentplane/src/runner/context/work-order-context.ts"
              - "packages/agentplane/src/runner/observation/git-snapshot/model.ts"
              - "packages/agentplane/src/runner/result-manifest.ts"
              - "packages/agentplane/src/runner/run-record-profile.ts"
              - "packages/agentplane/src/runner/types/state.ts"
              - "packages/agentplane/src/runner/usecases/agent-work-order-build.ts"
              - "packages/agentplane/src/runner/usecases/agent-work-order.integration.test.ts"
              - "packages/agentplane/src/runner/usecases/kernel-authority.test.ts"
              - "packages/agentplane/src/runner/usecases/kernel-authority.ts"
              - "packages/agentplane/src/runner/usecases/kernel-policy-renewal.ts"
              - "packages/agentplane/src/runner/usecases/kernel-task-lifecycle.ts"
              - "packages/agentplane/src/runner/usecases/task-knowledge-retrieval-query.ts"
              - "packages/agentplane/src/runner/usecases/task-knowledge-semantic-escalation.ts"
              - "packages/agentplane/src/runner/usecases/task-run-active-claim-record.ts"
              - "packages/agentplane/src/runner/usecases/task-run-active-claim.testkit.ts"
              - "packages/agentplane/src/runner/usecases/task-run-bootstrap.ts"
              - "packages/agentplane/src/runner/usecases/task-run-effect-resolution.test.ts"
              - "packages/agentplane/src/runner/usecases/task-run-lifecycle-result.ts"
              - "packages/agentplane/src/runner/usecases/task-run-missing-state-authority.ts"
              - "packages/agentplane/src/runner/usecases/task-run-orphaned-effect-guard.ts"
              - "packages/agentplane/src/runtime/harness/types.ts"
              - "packages/agentplane/src/runtime/prompt-modules/model.ts"
              - "packages/agentplane/src/runtime/sgr/contract-types.ts"
              - "packages/agentplane/src/runtime/shared/repo-cli-version.ts"
              - "packages/agentplane/src/runtime/task-execution-context/model.ts"
              - "packages/agentplane/src/shared/package-paths.ts"
              - "packages/agentplane/src/shared/preparation-trace.ts"
              - "packages/agentplane/src/shared/sqlite-driver.ts"
              - "packages/agentplane/src/workflow-runtime/migration.ts"
              - "packages/agentplane/test-fixtures/task-worktree-foreign-artifact-repair-fixture.ts"
              - "packages/core/package.json"
              - "packages/core/schemas/agent-work-order-v2.schema.json"
              - "packages/core/schemas/config.schema.json"
              - "packages/core/schemas/task-handoff.schema.json"
              - "packages/core/schemas/task-readme-frontmatter.schema.json"
              - "packages/core/schemas/tasks-export.schema.json"
              - "packages/core/schemas/workflow.schema.json"
              - "packages/core/src/config/schema.impl.ts"
              - "packages/core/src/git/git-utils.ts"
              - "packages/core/src/index.ts"
              - "packages/core/src/process/run-process.observation.test.ts"
              - "packages/core/src/process/run-process.ts"
              - "packages/core/src/runner/agent-work-order.ts"
              - "packages/core/src/runner/knowledge-ref.ts"
              - "packages/core/src/runner/recipe-role-context.test.ts"
              - "packages/core/src/runner/recipe-role-context.ts"
              - "packages/core/src/runner/runner-effect-operation.ts"
              - "packages/core/src/runner/supervisor-execution-episode-migration.ts"
              - "packages/core/src/runner/supervisor-execution-episode.ts"
              - "packages/core/src/schemas/index.ts"
              - "packages/core/src/schemas/iso-timestamp.test.ts"
              - "packages/core/src/schemas/iso-timestamp.ts"
              - "packages/core/src/tasks/index.ts"
              - "packages/core/src/tasks/kernel-plan-refinement.ts"
              - "packages/core/src/tasks/kernel-semantic.ts"
              - "packages/core/src/tasks/plan-execution-grant.ts"
              - "packages/core/src/tasks/supplied-plan-aggregate.ts"
              - "packages/core/src/tasks/task-artifact-schema.handoff.ts"
              - "packages/core/src/tasks/task-artifact-schema.shared.ts"
              - "packages/core/src/tasks/task-centric/model.ts"
              - "packages/core/src/tasks/task-centric/schema.ts"
              - "packages/core/src/tasks/task-kernel/authority-lineage.ts"
              - "packages/core/src/tasks/task-kernel/corrective-authority.test.ts"
              - "packages/core/src/tasks/task-kernel/corrective-authority.ts"
              - "packages/core/src/tasks/task-kernel/index.ts"
              - "packages/core/src/tasks/task-kernel/invariants.ts"
              - "packages/core/src/tasks/task-kernel/kernel.ts"
              - "packages/core/src/tasks/task-kernel/model.ts"
              - "packages/core/src/tasks/task-store.ts"
              - "packages/recipes/package.json"
              - "packages/recipes/src/compiled-contracts.ts"
              - "packages/recipes/src/manifest-contracts.ts"
              - "packages/recipes/src/manifest.ts"
              - "packages/spec/schemas/agent-work-order-v2.schema.json"
              - "packages/spec/schemas/config.schema.json"
              - "packages/spec/schemas/task-handoff.schema.json"
              - "packages/spec/schemas/task-readme-frontmatter.schema.json"
              - "packages/spec/schemas/tasks-export.schema.json"
              - "packages/spec/schemas/workflow.schema.json"
              - "packages/testkit/src/cli-harness/temp-root-cleanup.integration.test.ts"
              - "schemas/agent-semantic-result.schema.json"
              - "schemas/agent-work-order-v2.schema.json"
              - "schemas/config.schema.json"
              - "schemas/execution-receipt.schema.json"
              - "schemas/task-handoff.schema.json"
              - "schemas/task-readme-frontmatter.schema.json"
              - "schemas/tasks-export.schema.json"
              - "schemas/workflow.schema.json"
              - "scripts/baselines/v0.7-compatibility-candidate.json"
              - "scripts/bench/internal/paired-m05/app-server-host-probe.mjs"
              - "scripts/bench/internal/paired-m05/app-server-port.mjs"
              - "scripts/bench/internal/paired-m05/boundary.mjs"
              - "scripts/bench/internal/paired-m05/boundary.test.mjs"
              - "scripts/bench/internal/paired-m05/broker-configuration.mjs"
              - "scripts/bench/internal/paired-m05/broker-worker.mjs"
              - "scripts/bench/internal/paired-m05/broker-worker.test.mjs"
              - "scripts/bench/internal/paired-m05/brokered-app-server.mjs"
              - "scripts/bench/internal/paired-m05/brokered-app-server.test.mjs"
              - "scripts/bench/internal/paired-m05/coding-corpus.mjs"
              - "scripts/bench/internal/paired-m05/coding-corpus.test.mjs"
              - "scripts/bench/internal/paired-m05/coding-host.mjs"
              - "scripts/bench/internal/paired-m05/coding-host.test.mjs"
              - "scripts/bench/internal/paired-m05/coding-recipe-package.mjs"
              - "scripts/bench/internal/paired-m05/coding-recipe.mjs"
              - "scripts/bench/internal/paired-m05/coding-recipe.test.mjs"
              - "scripts/bench/internal/paired-m05/contract.mjs"
              - "scripts/bench/internal/paired-m05/isolation.mjs"
              - "scripts/bench/internal/paired-m05/isolation.test.mjs"
              - "scripts/bench/internal/paired-m05/journal.mjs"
              - "scripts/bench/internal/paired-m05/landlock-runner.py"
              - "scripts/bench/internal/paired-m05/ledger.mjs"
              - "scripts/bench/internal/paired-m05/ledger.test.mjs"
              - "scripts/bench/internal/paired-m05/native-coding-cli.test.mjs"
              - "scripts/bench/internal/paired-m05/native-coding-evidence.mjs"
              - "scripts/bench/internal/paired-m05/native-coding-loop.mjs"
              - "scripts/bench/internal/paired-m05/native-coding-loop.test.mjs"
              - "scripts/bench/internal/paired-m05/native-coding-port.mjs"
              - "scripts/bench/internal/paired-m05/public-compiler-feedback.mjs"
              - "scripts/bench/internal/paired-m05/public-compiler-feedback.test.mjs"
              - "scripts/bench/internal/paired-m05/public-interface-feedback.mjs"
              - "scripts/bench/internal/paired-m05/public-interface-feedback.test.mjs"
              - "scripts/bench/internal/paired-m05/public-package-feedback.mjs"
              - "scripts/bench/internal/paired-m05/public-package-feedback.test.mjs"
              - "scripts/bench/internal/paired-m05/public-product-contract.mjs"
              - "scripts/bench/internal/paired-m05/qualify-oracle-framing.mjs"
              - "scripts/bench/internal/paired-m05/report.mjs"
              - "scripts/bench/internal/paired-m05/report.test.mjs"
              - "scripts/bench/internal/paired-m05/semantic-coding-port.mjs"
              - "scripts/bench/internal/paired-m05/semantic-coding-port.test.mjs"
              - "scripts/bench/internal/paired-m05/stable-file.mjs"
              - "scripts/bench/internal/paired-m05/stable-file.test.mjs"
              - "scripts/bench/internal/paired-m05/subscription-analysis.mjs"
              - "scripts/bench/internal/paired-m05/subscription-boundary.mjs"
              - "scripts/bench/internal/paired-m05/subscription-contract.mjs"
              - "scripts/bench/internal/paired-m05/subscription-ledger.mjs"
              - "scripts/bench/internal/paired-m05/subscription-registration.mjs"
              - "scripts/bench/internal/paired-m05/subscription-report.mjs"
              - "scripts/bench/internal/paired-m05/subscription-report.test.mjs"
              - "scripts/bench/internal/paired-m05/subscription-setup-host.mjs"
              - "scripts/bench/internal/paired-m05/subscription-setup-host.test.mjs"
              - "scripts/bench/internal/paired-m05/subscription.test.mjs"
              - "scripts/bench/paired-live-codex-launcher.mjs"
              - "scripts/bench/paired-live-codex-launcher.test.mjs"
              - "scripts/bench/paired-m05-offline.test.mjs"
              - "scripts/bench/paired-m05-setup.mjs"
              - "scripts/bench/paired-production-driver.mjs"
              - "scripts/bench/paired-production-driver.test.mjs"
              - "scripts/bench/paired-result-report.mjs"
              - "scripts/bench/paired-result-report.test.mjs"
              - "scripts/checks/check-compatibility-contract-baseline.mjs"
              - "scripts/checks/run-local-ci-group.mjs"
              - "scripts/checks/run-local-ci.mjs"
              - "scripts/lib/local-ci-resource-profile.mjs"
              - "scripts/lib/local-ci-resource-profile.test.mjs"
              - "scripts/lib/verification-failures-reporter.mjs"
              - "scripts/lib/verification-observation.mjs"
              - "scripts/lib/verification-observation.test.mjs"
              - "scripts/lib/verification-scheduler.d.ts"
              - "scripts/lib/verification-scheduler.mjs"
              - "scripts/lib/verification-scheduler.test.mjs"
              - "scripts/release/check-local-tarball-install-smoke.mjs"
              - "scripts/release/installed-recipe-matrix.mjs"
              - "vitest.config.ts"
            evidence_digest: "sha256:bc7b6c584210cbaca61d3ad25e74771dad87a367da0a5750474995a020b8463f"
            kind: "policy_renewal"
            previous_fingerprint: "sha256:eeb14096b1060fe1857c188626c4151755d70aeecac015c7ba126cbc21cdf75d"
            repository_evidence_digest: "sha256:71bc108504351eb376d224c1f1459e831500b5f65f295b4f753f9091266160b1"
            request_digest: "sha256:de2cd367c54f4dfadec28e22d69f0a1839d08f947da37cd3cb3af06cc57e958e"
            request_task_revision: 24
            reviewed_base_import:
              canonical_record_digest: "sha256:d3a85cd0c7dd88d7852921704bec6e262dff3b9741d830a0472ef47fac3be762"
              checkpoint_digest: "sha256:eeb14096b1060fe1857c188626c4151755d70aeecac015c7ba126cbc21cdf75d"
              imported_paths:
                - ".agentplane/policy/context.must.md"
                - ".agentplane/policy/dod.core.md"
                - ".agentplane/policy/dod.docs.md"
                - ".agentplane/policy/examples/migration-note.md"
                - ".agentplane/policy/governance.md"
                - ".agentplane/policy/security.must.md"
                - ".agentplane/policy/workflow.branch_pr.md"
                - ".agentplane/policy/workflow.direct.md"
                - ".agentplane/policy/workflow.md"
                - ".agentplane/policy/workflow.release.md"
                - ".agentplane/policy/workflow.upgrade.md"
                - ".prettierignore"
                - "artifacts/bench/m05-live-0.7.13/broker-qualification.md"
                - "artifacts/bench/m05-live-0.7.13/coding-corpus-qualification.json"
                - "artifacts/bench/m05-live-0.7.13/experiment-protocol.md"
                - "artifacts/bench/m05-live-0.7.13/oracle-framing-qualification.json"
                - "artifacts/bench/m05-live-0.7.13/subscription-protocol.md"
                - "artifacts/bench/m05-live-0.7.13/subscription-registration.json"
                - "bun.lock"
                - "context/wiki/index.md"
                - "context/wiki/proposals/index.md"
                - "context/wiki/proposals/task-harvest/index.md"
                - "context/wiki/release-docs/concepts/index.md"
                - "context/wiki/release-docs/domains/index.md"
                - "context/wiki/release-docs/release-lines/index.md"
                - "context/wiki/reports/index.md"
                - "context/wiki/task-harvest/index.md"
                - "docs/developer/modular-prompt-assembly.mdx"
                - "docs/developer/testing-and-quality.mdx"
                - "docs/releases/v0.7.1.md"
                - "docs/releases/v0.7.13-acceptance.md"
                - "docs/releases/v0.7.13.md"
                - "docs/user/cli-reference.generated.mdx"
                - "docs/user/task-lifecycle.mdx"
                - "eslint.config.cjs"
                - "package.json"
                - "packages/agentplane/assets/AGENTS.md"
                - "packages/agentplane/assets/RUNNER.md"
                - "packages/agentplane/assets/policy/context.must.md"
                - "packages/agentplane/assets/policy/dod.core.md"
                - "packages/agentplane/assets/policy/dod.docs.md"
                - "packages/agentplane/assets/policy/examples/migration-note.md"
                - "packages/agentplane/assets/policy/governance.md"
                - "packages/agentplane/assets/policy/security.must.md"
                - "packages/agentplane/assets/policy/workflow.branch_pr.md"
                - "packages/agentplane/assets/policy/workflow.direct.md"
                - "packages/agentplane/assets/policy/workflow.md"
                - "packages/agentplane/assets/policy/workflow.release.md"
                - "packages/agentplane/assets/policy/workflow.upgrade.md"
                - "packages/agentplane/package.json"
                - "packages/agentplane/src/adapters/task-backend/kernel-authority-schema.ts"
                - "packages/agentplane/src/adapters/task-backend/kernel-backend-adapter.test.ts"
                - "packages/agentplane/src/adapters/task-backend/kernel-backend-adapter.ts"
                - "packages/agentplane/src/adapters/task-backend/kernel-backend-reconciliation.test.ts"
                - "packages/agentplane/src/adapters/task-backend/kernel-documents.ts"
                - "packages/agentplane/src/adapters/task-backend/kernel-record.ts"
                - "packages/agentplane/src/agents/agents-template.test.ts"
                - "packages/agentplane/src/agents/agents-template.ts"
                - "packages/agentplane/src/backends/task-backend/local-backend-read.ts"
                - "packages/agentplane/src/backends/task-backend/shared/types.ts"
                - "packages/agentplane/src/cli/command-invocations.ts"
                - "packages/agentplane/src/cli/reason-codes.ts"
                - "packages/agentplane/src/cli/run-cli.core.kernel-projection.testkit.ts"
                - "packages/agentplane/src/cli/run-cli.core.roadmap-recipe-v2-entrypoint.test.ts"
                - "packages/agentplane/src/cli/run-cli/command-catalog-loader.ts"
                - "packages/agentplane/src/cli/run-cli/command-catalog/command-session.ts"
                - "packages/agentplane/src/cli/run-cli/command-catalog/task.ts"
                - "packages/agentplane/src/cli/run-cli/command-loaders/task.ts"
                - "packages/agentplane/src/cli/run-cli/commands/core/preflight-report-drift.ts"
                - "packages/agentplane/src/cli/run-cli/commands/init/model.ts"
                - "packages/agentplane/src/cli/run-cli/deferred-runtime-loader.ts"
                - "packages/agentplane/src/cli/run-cli/globals.ts"
                - "packages/agentplane/src/cli/task-advance-effect-recovery.testkit.ts"
                - "packages/agentplane/src/commands/context/context.spec.ts"
                - "packages/agentplane/src/commands/evaluator/evaluator-artifact-port.ts"
                - "packages/agentplane/src/commands/evaluator/evaluator-evidence-store.ts"
                - "packages/agentplane/src/commands/evaluator/evaluator-review-apply.test.ts"
                - "packages/agentplane/src/commands/evaluator/evaluator-review-apply.ts"
                - "packages/agentplane/src/commands/evaluator/evaluator-work-order.ts"
                - "packages/agentplane/src/commands/evaluator/evaluator.command.ts"
                - "packages/agentplane/src/commands/evidence/evidence-manifest.ts"
                - "packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts"
                - "packages/agentplane/src/commands/guard/impl/commit-diagnostics.ts"
                - "packages/agentplane/src/commands/pr/flow-status.ts"
                - "packages/agentplane/src/commands/pr/integrate/cmd.protected-base.test.ts"
                - "packages/agentplane/src/commands/pr/integrate/cmd.test.ts"
                - "packages/agentplane/src/commands/pr/integrate/internal/post-integrate-bootstrap.ts"
                - "packages/agentplane/src/commands/pr/integrate/queue-state-types.ts"
                - "packages/agentplane/src/commands/pr/internal/git-host-identity.test.ts"
                - "packages/agentplane/src/commands/pr/internal/git-host-identity.ts"
                - "packages/agentplane/src/commands/pr/internal/sync-frozen-base.test.ts"
                - "packages/agentplane/src/commands/recipes.list.test.ts"
                - "packages/agentplane/src/commands/recipes/impl/index.ts"
                - "packages/agentplane/src/commands/shared/declared-check.ts"
                - "packages/agentplane/src/commands/shared/native-task-identity-fixture.ts"
                - "packages/agentplane/src/commands/shared/native-task-identity.ts"
                - "packages/agentplane/src/commands/shared/prompt-graph-diagnostics.ts"
                - "packages/agentplane/src/commands/shared/reconcile-check.ts"
                - "packages/agentplane/src/commands/shared/reconcile-native-applicability.test.ts"
                - "packages/agentplane/src/commands/shared/route-guidance.ts"
                - "packages/agentplane/src/commands/shared/route-oracle.ts"
                - "packages/agentplane/src/commands/shared/source-confidence.ts"
                - "packages/agentplane/src/commands/shared/task-verification-input-types.ts"
                - "packages/agentplane/src/commands/shared/task-worktree-foreign-artifact-history-proof.ts"
                - "packages/agentplane/src/commands/shared/task-worktree-foreign-artifact-repair.test.ts"
                - "packages/agentplane/src/commands/shared/task-worktree-foreign-artifact-repair.ts"
                - "packages/agentplane/src/commands/task/advance-task-step.ts"
                - "packages/agentplane/src/commands/task/agent-work-context-contract.ts"
                - "packages/agentplane/src/commands/task/corrective-authority.command.ts"
                - "packages/agentplane/src/commands/task/create-plan-proposal.test.ts"
                - "packages/agentplane/src/commands/task/create-plan-proposal.ts"
                - "packages/agentplane/src/commands/task/direct-task-verification-checks.ts"
                - "packages/agentplane/src/commands/task/direct-task-verification-observation.ts"
                - "packages/agentplane/src/commands/task/direct-task-verification.observability.test.ts"
                - "packages/agentplane/src/commands/task/direct-task-verification.qualification.test.ts"
                - "packages/agentplane/src/commands/task/direct-task-verification.sequence.cases.ts"
                - "packages/agentplane/src/commands/task/direct-task-verification.test.ts"
                - "packages/agentplane/src/commands/task/direct-task-verification.ts"
                - "packages/agentplane/src/commands/task/external-agent-evaluator-input.ts"
                - "packages/agentplane/src/commands/task/external-agent-evaluator-recovery.ts"
                - "packages/agentplane/src/commands/task/external-agent-evaluator.ts"
                - "packages/agentplane/src/commands/task/external-agent-exchange-authority.ts"
                - "packages/agentplane/src/commands/task/external-agent-implementation-authority.ts"
                - "packages/agentplane/src/commands/task/external-agent-implementation-recovery.ts"
                - "packages/agentplane/src/commands/task/external-agent-planning-authority.ts"
                - "packages/agentplane/src/commands/task/external-agent-supervisor.ts"
                - "packages/agentplane/src/commands/task/external-agent-workflow-recovery.ts"
                - "packages/agentplane/src/commands/task/finish-closeout-journal.ts"
                - "packages/agentplane/src/commands/task/hosted-close-pr.types.ts"
                - "packages/agentplane/src/commands/task/hosted-close-premerge.ts"
                - "packages/agentplane/src/commands/task/kernel-completed-external-rework.test.ts"
                - "packages/agentplane/src/commands/task/kernel-completed-external-rework.testkit.ts"
                - "packages/agentplane/src/commands/task/kernel-completed-native-review.ts"
                - "packages/agentplane/src/commands/task/kernel-corrective-authority.test.ts"
                - "packages/agentplane/src/commands/task/kernel-corrective-authority.ts"
                - "packages/agentplane/src/commands/task/kernel-cutover.ts"
                - "packages/agentplane/src/commands/task/kernel-exchange.test.ts"
                - "packages/agentplane/src/commands/task/kernel-final-validation.test.ts"
                - "packages/agentplane/src/commands/task/kernel-final-validation.ts"
                - "packages/agentplane/src/commands/task/kernel-inspection.ts"
                - "packages/agentplane/src/commands/task/kernel-operational-projection-recovery.ts"
                - "packages/agentplane/src/commands/task/kernel-operational-projection.test.ts"
                - "packages/agentplane/src/commands/task/kernel-operational-projection.ts"
                - "packages/agentplane/src/commands/task/kernel-plan-authority.test.ts"
                - "packages/agentplane/src/commands/task/kernel-plan-authority.ts"
                - "packages/agentplane/src/commands/task/kernel-plan.ts"
                - "packages/agentplane/src/commands/task/kernel-recipe-admission.ts"
                - "packages/agentplane/src/commands/task/kernel-report-only-completion.test.ts"
                - "packages/agentplane/src/commands/task/kernel-report-only-completion.ts"
                - "packages/agentplane/src/commands/task/kernel-reviewed-base-import.test.ts"
                - "packages/agentplane/src/commands/task/kernel-reviewed-base-import.ts"
                - "packages/agentplane/src/commands/task/kernel-reviewed-base-tree.test.ts"
                - "packages/agentplane/src/commands/task/kernel-reviewed-base-tree.ts"
                - "packages/agentplane/src/commands/task/kernel-runtime-context.ts"
                - "packages/agentplane/src/commands/task/kernel-scoped-intake.test.ts"
                - "packages/agentplane/src/commands/task/kernel-work-order.ts"
                - "packages/agentplane/src/commands/task/migration-apply.ts"
                - "packages/agentplane/src/commands/task/plan-approve-reviewed-base.test.ts"
                - "packages/agentplane/src/commands/task/plan-approve.command.ts"
                - "packages/agentplane/src/commands/task/run-render.ts"
                - "packages/agentplane/src/commands/task/scaffold.ts"
                - "packages/agentplane/src/commands/task/shared/workflow-transition-service.ts"
                - "packages/agentplane/src/commands/task/verification-observation.test.ts"
                - "packages/agentplane/src/commands/task/verification-observation.ts"
                - "packages/agentplane/src/context/ingest-task-pack.test.ts"
                - "packages/agentplane/src/context/ingest-task.ts"
                - "packages/agentplane/src/context/knowledge-ref.ts"
                - "packages/agentplane/src/harness/state-machine.ts"
                - "packages/agentplane/src/policy/taxonomy.ts"
                - "packages/agentplane/src/ports/kernel-authority.ts"
                - "packages/agentplane/src/runner/context/prompt-module-bridge.ts"
                - "packages/agentplane/src/runner/context/recipe-role-context.ts"
                - "packages/agentplane/src/runner/context/roadmap-recipe-prompt.test.ts"
                - "packages/agentplane/src/runner/context/work-order-context.ts"
                - "packages/agentplane/src/runner/observation/git-snapshot/model.ts"
                - "packages/agentplane/src/runner/result-manifest.ts"
                - "packages/agentplane/src/runner/run-record-profile.ts"
                - "packages/agentplane/src/runner/types/state.ts"
                - "packages/agentplane/src/runner/usecases/agent-work-order-build.ts"
                - "packages/agentplane/src/runner/usecases/agent-work-order.integration.test.ts"
                - "packages/agentplane/src/runner/usecases/kernel-authority.test.ts"
                - "packages/agentplane/src/runner/usecases/kernel-authority.ts"
                - "packages/agentplane/src/runner/usecases/kernel-policy-renewal.ts"
                - "packages/agentplane/src/runner/usecases/kernel-task-lifecycle.ts"
                - "packages/agentplane/src/runner/usecases/task-knowledge-retrieval-query.ts"
                - "packages/agentplane/src/runner/usecases/task-knowledge-semantic-escalation.ts"
                - "packages/agentplane/src/runner/usecases/task-run-active-claim-record.ts"
                - "packages/agentplane/src/runner/usecases/task-run-active-claim.testkit.ts"
                - "packages/agentplane/src/runner/usecases/task-run-bootstrap.ts"
                - "packages/agentplane/src/runner/usecases/task-run-effect-resolution.test.ts"
                - "packages/agentplane/src/runner/usecases/task-run-lifecycle-result.ts"
                - "packages/agentplane/src/runner/usecases/task-run-missing-state-authority.ts"
                - "packages/agentplane/src/runner/usecases/task-run-orphaned-effect-guard.ts"
                - "packages/agentplane/src/runtime/harness/types.ts"
                - "packages/agentplane/src/runtime/prompt-modules/model.ts"
                - "packages/agentplane/src/runtime/sgr/contract-types.ts"
                - "packages/agentplane/src/runtime/shared/repo-cli-version.ts"
                - "packages/agentplane/src/runtime/task-execution-context/model.ts"
                - "packages/agentplane/src/shared/package-paths.ts"
                - "packages/agentplane/src/shared/preparation-trace.ts"
                - "packages/agentplane/src/shared/sqlite-driver.ts"
                - "packages/agentplane/src/workflow-runtime/migration.ts"
                - "packages/agentplane/test-fixtures/task-worktree-foreign-artifact-repair-fixture.ts"
                - "packages/core/package.json"
                - "packages/core/schemas/agent-work-order-v2.schema.json"
                - "packages/core/schemas/config.schema.json"
                - "packages/core/schemas/task-handoff.schema.json"
                - "packages/core/schemas/task-readme-frontmatter.schema.json"
                - "packages/core/schemas/tasks-export.schema.json"
                - "packages/core/schemas/workflow.schema.json"
                - "packages/core/src/config/schema.impl.ts"
                - "packages/core/src/git/git-utils.ts"
                - "packages/core/src/index.ts"
                - "packages/core/src/process/run-process.observation.test.ts"
                - "packages/core/src/process/run-process.ts"
                - "packages/core/src/runner/agent-work-order.ts"
                - "packages/core/src/runner/knowledge-ref.ts"
                - "packages/core/src/runner/recipe-role-context.test.ts"
                - "packages/core/src/runner/recipe-role-context.ts"
                - "packages/core/src/runner/runner-effect-operation.ts"
                - "packages/core/src/runner/supervisor-execution-episode-migration.ts"
                - "packages/core/src/runner/supervisor-execution-episode.ts"
                - "packages/core/src/schemas/index.ts"
                - "packages/core/src/schemas/iso-timestamp.test.ts"
                - "packages/core/src/schemas/iso-timestamp.ts"
                - "packages/core/src/tasks/index.ts"
                - "packages/core/src/tasks/kernel-plan-refinement.ts"
                - "packages/core/src/tasks/kernel-semantic.ts"
                - "packages/core/src/tasks/plan-execution-grant.ts"
                - "packages/core/src/tasks/supplied-plan-aggregate.ts"
                - "packages/core/src/tasks/task-artifact-schema.handoff.ts"
                - "packages/core/src/tasks/task-artifact-schema.shared.ts"
                - "packages/core/src/tasks/task-centric/model.ts"
                - "packages/core/src/tasks/task-centric/schema.ts"
                - "packages/core/src/tasks/task-kernel/authority-lineage.ts"
                - "packages/core/src/tasks/task-kernel/corrective-authority.test.ts"
                - "packages/core/src/tasks/task-kernel/corrective-authority.ts"
                - "packages/core/src/tasks/task-kernel/index.ts"
                - "packages/core/src/tasks/task-kernel/invariants.ts"
                - "packages/core/src/tasks/task-kernel/kernel.ts"
                - "packages/core/src/tasks/task-kernel/model.ts"
                - "packages/core/src/tasks/task-store.ts"
                - "packages/recipes/package.json"
                - "packages/recipes/src/compiled-contracts.ts"
                - "packages/recipes/src/manifest-contracts.ts"
                - "packages/recipes/src/manifest.ts"
                - "packages/spec/schemas/agent-work-order-v2.schema.json"
                - "packages/spec/schemas/config.schema.json"
                - "packages/spec/schemas/task-handoff.schema.json"
                - "packages/spec/schemas/task-readme-frontmatter.schema.json"
                - "packages/spec/schemas/tasks-export.schema.json"
                - "packages/spec/schemas/workflow.schema.json"
                - "packages/testkit/src/cli-harness/temp-root-cleanup.integration.test.ts"
                - "schemas/agent-semantic-result.schema.json"
                - "schemas/agent-work-order-v2.schema.json"
                - "schemas/config.schema.json"
                - "schemas/execution-receipt.schema.json"
                - "schemas/task-handoff.schema.json"
                - "schemas/task-readme-frontmatter.schema.json"
                - "schemas/tasks-export.schema.json"
                - "schemas/workflow.schema.json"
                - "scripts/baselines/v0.7-compatibility-candidate.json"
                - "scripts/bench/internal/paired-m05/app-server-host-probe.mjs"
                - "scripts/bench/internal/paired-m05/app-server-port.mjs"
                - "scripts/bench/internal/paired-m05/boundary.mjs"
                - "scripts/bench/internal/paired-m05/boundary.test.mjs"
                - "scripts/bench/internal/paired-m05/broker-configuration.mjs"
                - "scripts/bench/internal/paired-m05/broker-worker.mjs"
                - "scripts/bench/internal/paired-m05/broker-worker.test.mjs"
                - "scripts/bench/internal/paired-m05/brokered-app-server.mjs"
                - "scripts/bench/internal/paired-m05/brokered-app-server.test.mjs"
                - "scripts/bench/internal/paired-m05/coding-corpus.mjs"
                - "scripts/bench/internal/paired-m05/coding-corpus.test.mjs"
                - "scripts/bench/internal/paired-m05/coding-host.mjs"
                - "scripts/bench/internal/paired-m05/coding-host.test.mjs"
                - "scripts/bench/internal/paired-m05/coding-recipe-package.mjs"
                - "scripts/bench/internal/paired-m05/coding-recipe.mjs"
                - "scripts/bench/internal/paired-m05/coding-recipe.test.mjs"
                - "scripts/bench/internal/paired-m05/contract.mjs"
                - "scripts/bench/internal/paired-m05/isolation.mjs"
                - "scripts/bench/internal/paired-m05/isolation.test.mjs"
                - "scripts/bench/internal/paired-m05/journal.mjs"
                - "scripts/bench/internal/paired-m05/landlock-runner.py"
                - "scripts/bench/internal/paired-m05/ledger.mjs"
                - "scripts/bench/internal/paired-m05/ledger.test.mjs"
                - "scripts/bench/internal/paired-m05/native-coding-cli.test.mjs"
                - "scripts/bench/internal/paired-m05/native-coding-evidence.mjs"
                - "scripts/bench/internal/paired-m05/native-coding-loop.mjs"
                - "scripts/bench/internal/paired-m05/native-coding-loop.test.mjs"
                - "scripts/bench/internal/paired-m05/native-coding-port.mjs"
                - "scripts/bench/internal/paired-m05/public-compiler-feedback.mjs"
                - "scripts/bench/internal/paired-m05/public-compiler-feedback.test.mjs"
                - "scripts/bench/internal/paired-m05/public-interface-feedback.mjs"
                - "scripts/bench/internal/paired-m05/public-interface-feedback.test.mjs"
                - "scripts/bench/internal/paired-m05/public-package-feedback.mjs"
                - "scripts/bench/internal/paired-m05/public-package-feedback.test.mjs"
                - "scripts/bench/internal/paired-m05/public-product-contract.mjs"
                - "scripts/bench/internal/paired-m05/qualify-oracle-framing.mjs"
                - "scripts/bench/internal/paired-m05/report.mjs"
                - "scripts/bench/internal/paired-m05/report.test.mjs"
                - "scripts/bench/internal/paired-m05/semantic-coding-port.mjs"
                - "scripts/bench/internal/paired-m05/semantic-coding-port.test.mjs"
                - "scripts/bench/internal/paired-m05/stable-file.mjs"
                - "scripts/bench/internal/paired-m05/stable-file.test.mjs"
                - "scripts/bench/internal/paired-m05/subscription-analysis.mjs"
                - "scripts/bench/internal/paired-m05/subscription-boundary.mjs"
                - "scripts/bench/internal/paired-m05/subscription-contract.mjs"
                - "scripts/bench/internal/paired-m05/subscription-ledger.mjs"
                - "scripts/bench/internal/paired-m05/subscription-registration.mjs"
                - "scripts/bench/internal/paired-m05/subscription-report.mjs"
                - "scripts/bench/internal/paired-m05/subscription-report.test.mjs"
                - "scripts/bench/internal/paired-m05/subscription-setup-host.mjs"
                - "scripts/bench/internal/paired-m05/subscription-setup-host.test.mjs"
                - "scripts/bench/internal/paired-m05/subscription.test.mjs"
                - "scripts/bench/paired-live-codex-launcher.mjs"
                - "scripts/bench/paired-live-codex-launcher.test.mjs"
                - "scripts/bench/paired-m05-offline.test.mjs"
                - "scripts/bench/paired-m05-setup.mjs"
                - "scripts/bench/paired-production-driver.mjs"
                - "scripts/bench/paired-production-driver.test.mjs"
                - "scripts/bench/paired-result-report.mjs"
                - "scripts/bench/paired-result-report.test.mjs"
                - "scripts/checks/check-compatibility-contract-baseline.mjs"
                - "scripts/checks/run-local-ci-group.mjs"
                - "scripts/checks/run-local-ci.mjs"
                - "scripts/lib/local-ci-resource-profile.mjs"
                - "scripts/lib/local-ci-resource-profile.test.mjs"
                - "scripts/lib/verification-failures-reporter.mjs"
                - "scripts/lib/verification-observation.mjs"
                - "scripts/lib/verification-observation.test.mjs"
                - "scripts/lib/verification-scheduler.d.ts"
                - "scripts/lib/verification-scheduler.mjs"
                - "scripts/lib/verification-scheduler.test.mjs"
                - "scripts/release/check-local-tarball-install-smoke.mjs"
                - "scripts/release/installed-recipe-matrix.mjs"
                - "vitest.config.ts"
              mutation_receipt_digest: "sha256:4d317dd9d0ed2b7f169970b91e8cd3bf20283e31f745541a93ca1dfb1b4e994b"
              new_commit: "30a3f69f533b1c8c871994aead3783d2fa3d3f96"
              old_commit: "b3cf4b13e2804179c8a3437d7372377ed33b93e0"
              overlay_digest: "sha256:4f53cda18c2baa0c0354bb5f9a3ecbe5ed12ab4d8e11ba873c2f11161202b945"
              work_order_digest: "sha256:c92b88210109004e3be594de8a70b2580a476eb1fc5e64bce3f92881c0250c20"
        -
          approval_mode: null
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:15b137c113aca2a62c9ee548311ea8d9a2be069c42662aa05bdfb84037f7b8b3"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:86441b742d0944f42a36c484974a596d3337de0221f822cb6d27708ef67048b6"
            plan_revision: 3
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:fbcafb684fd4b100f2703290fa3ba6f957141000ebebe7969470a7a9038ac8c1"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:78a21169c427bdfe62bed44a5e4bd88bc449560ff03834f6e8e00afb0fb68621"
            repository_effects:
              - "ci"
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:99bf2816b1e084d95815cc175b980a1ff70ff54afa9d6e5302a795952dbb77fe"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "scripts"
            task_id: "202610092056-WS6H31"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "full_regression"
              - "hosted_integration"
              - "task_outcome"
            work_item_id: null
          observation:
            added_scope_roots: []
            changed_paths: []
            evidence_digest: "sha256:b0488f542794d64fb80ad5ee8896d9a0783d118bb04f755a4ab1b35464de482c"
            kind: "plan_amendment"
            previous_fingerprint: "sha256:99bf2816b1e084d95815cc175b980a1ff70ff54afa9d6e5302a795952dbb77fe"
        -
          approval_mode: "manual_operator"
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:7b80176ba234e5b38474d330751c9c1a39c43286b5de2b4dd18be734d5eeb12e"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:86441b742d0944f42a36c484974a596d3337de0221f822cb6d27708ef67048b6"
            plan_revision: 3
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "USER"
              evidence_digest: "sha256:fbcafb684fd4b100f2703290fa3ba6f957141000ebebe7969470a7a9038ac8c1"
              kind: "USER"
              parent_authority_digest: "sha256:15b137c113aca2a62c9ee548311ea8d9a2be069c42662aa05bdfb84037f7b8b3"
            repository_effects:
              - "ci"
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:d29669a68097b4418cb7d156d65b9d5dc196769dc0510c6e70a804988f89e12e"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "scripts"
            task_id: "202610092056-WS6H31"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "full_regression"
              - "hosted_integration"
              - "task_outcome"
            work_item_id: null
          observation:
            changed_paths:
              - "docs/releases/v0.7.13-acceptance.md"
              - "docs/releases/v0.7.13.md"
              - "packages/agentplane/src/cli/verification-contract.test.ts"
              - "packages/agentplane/src/commands/task/kernel-accepted-repository-evidence.ts"
              - "packages/agentplane/src/commands/task/kernel-operational-projection-recovery.test.ts"
              - "packages/agentplane/src/commands/task/kernel-operational-projection-recovery.ts"
              - "packages/agentplane/src/commands/task/kernel-report-only-completion.test.ts"
              - "packages/agentplane/src/commands/task/kernel-repository-coordinator.ts"
              - "packages/agentplane/src/commands/task/kernel-reviewed-base-discovery.test.ts"
              - "packages/agentplane/src/commands/task/kernel-reviewed-base-import.ts"
              - "packages/core/src/tasks/task-kernel/authority-delta.test.ts"
              - "packages/core/src/tasks/task-kernel/authority-lineage.ts"
            evidence_digest: "sha256:1184c6be54c1d75ebed92a6a3425002eee6a1f7fa7aad3bac36691eb66f08584"
            kind: "policy_renewal"
            previous_fingerprint: "sha256:99bf2816b1e084d95815cc175b980a1ff70ff54afa9d6e5302a795952dbb77fe"
            repository_evidence_digest: "sha256:5c037450412304a91e55079328daf79a3c5dabdc324afe8545b00e7a4c19d8a8"
            request_digest: "sha256:c42cfcde54cd88b2c3b33cecb2e5c68dd898a14438b800a92cbe9fa83ebf7acc"
            request_task_revision: 38
            reviewed_base_import:
              canonical_record_digest: "sha256:dc26b72a2f3d4b79707904276549ded35d1594bfae3e722f89f5852308c01d2e"
              checkpoint_digest: "sha256:99bf2816b1e084d95815cc175b980a1ff70ff54afa9d6e5302a795952dbb77fe"
              imported_paths:
                - "docs/releases/v0.7.13-acceptance.md"
                - "docs/releases/v0.7.13.md"
                - "packages/agentplane/src/cli/verification-contract.test.ts"
                - "packages/agentplane/src/commands/task/kernel-accepted-repository-evidence.ts"
                - "packages/agentplane/src/commands/task/kernel-operational-projection-recovery.test.ts"
                - "packages/agentplane/src/commands/task/kernel-operational-projection-recovery.ts"
                - "packages/agentplane/src/commands/task/kernel-report-only-completion.test.ts"
                - "packages/agentplane/src/commands/task/kernel-repository-coordinator.ts"
                - "packages/agentplane/src/commands/task/kernel-reviewed-base-discovery.test.ts"
                - "packages/agentplane/src/commands/task/kernel-reviewed-base-import.ts"
                - "packages/core/src/tasks/task-kernel/authority-delta.test.ts"
                - "packages/core/src/tasks/task-kernel/authority-lineage.ts"
              mutation_receipt_digest: "sha256:51bf9436384603569bf870661df08761774ea39daa4d0a09540466e79381ec3d"
              new_commit: "017f21d326d151c5ce6cbec4425ff112f4918095"
              old_commit: "30a3f69f533b1c8c871994aead3783d2fa3d3f96"
              overlay_digest: "sha256:4f53cda18c2baa0c0354bb5f9a3ecbe5ed12ab4d8e11ba873c2f11161202b945"
              work_order_digest: "sha256:9253e183636a2026192b5a3d2580d448a959d296f88d2cf298ede569ad81b3d8"
      controller_transfer: null
      current_plan:
        approval_actor_id: "USER"
        approval_evidence_digest: "sha256:7594f5ed13f2316b41aba3c8f9916b8b996945e5d5af1f0538d95ec0459a3cba"
        digest: "sha256:86441b742d0944f42a36c484974a596d3337de0221f822cb6d27708ef67048b6"
        revision: 3
        state: "APPROVED"
        work_items:
          -
            contract_digest: "sha256:183037f4f906a0b1c53ba3765397b35552095e1c831623459b28d053d06889e3"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "source_code"
                - "tests"
                - "ci"
              resources: []
              scope_roots:
                - "scripts"
            expected_outputs:
              - "reviewed-compatibility-delta"
            id: "review-compatibility-delta"
            optional: false
            required_inputs: []
          -
            contract_digest: "sha256:5919a3352617dfaeeb52952ddf586af7f213934efc2ed661c2736a2a9a04c370"
            depends_on:
              - "review-compatibility-delta"
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "ci"
                - "repository_write"
                - "source_code"
                - "tests"
              resources: []
              scope_roots:
                - "scripts"
            expected_outputs:
              - "final-correction-fc26d3df5ffb-evidence"
            id: "final-correction-fc26d3df5ffb"
            optional: false
            required_inputs: []
          -
            contract_digest: "sha256:7f86a57cba4306000e8ccf755e684d9fea1608624820b4b0f2c5ef70101b0fab"
            depends_on:
              - "review-compatibility-delta"
              - "final-correction-fc26d3df5ffb"
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "ci"
                - "repository_write"
                - "source_code"
                - "tests"
              resources: []
              scope_roots:
                - "scripts"
            expected_outputs:
              - "final-correction-f78912693c7e-evidence"
            id: "final-correction-f78912693c7e"
            optional: false
            required_inputs: []
      effects: []
      final_validation:
        evidence_digests:
          - "sha256:b43d4bd8da9590a61b5fd408a398fc3481dd00bab0917e092a89e9d7a11c3aa6"
        identity:
          check_id: "canonical-final-contracts-v2"
          command_digest: "sha256:2854e7ecf68c5194b07994cbd199b749f1b91e9e7cf65183dc834e54275f3210"
          environment_digest: "sha256:1ef361ec062f50ef6afbccff9df61076d862e58e7b2ec0ae20e5503d42c70ffe"
          implementation_identity: "sha256:d29669a68097b4418cb7d156d65b9d5dc196769dc0510c6e70a804988f89e12e"
          toolchain_digest: "sha256:a8beb2f725d4b06ec03a565c7b6f646dbf912c5a2e806a7315ce95015003ede0"
        observed_at: "2026-10-10T12:50:29.310Z"
        status: "PASSED"
      id: "202610092056-WS6H31"
      intent_digest: "sha256:e2ac957ff27274430b993a59dd1b74ee1e840b6a30c4c60f7f1fe57ffb015b79"
      migration_receipts: []
      mutation_receipts:
        amend:sha256:838499da9353617f2b624adcd6434b65df29b62fe4d59ab4717a3689add4f254:
          after_revision: 21
          aggregate_digest: "sha256:91efe825662f04b843370f14814d4e57f9976bbb78e4c618062bf0fe3d8a1ade"
          before_revision: 20
          command_digest: "sha256:1db90589cc9ae968e805542ecc68d60ff72229dfdd05bb42b0f7eb3588795bf7"
          effect_ids: []
          event_digests:
            - "sha256:7803e211459c88b822d801d6153d55de20c05b6010ba176e0bb79db8b6a4719a"
          mutation_id: "amend:sha256:838499da9353617f2b624adcd6434b65df29b62fe4d59ab4717a3689add4f254"
        amend:sha256:86441b742d0944f42a36c484974a596d3337de0221f822cb6d27708ef67048b6:
          after_revision: 31
          aggregate_digest: "sha256:d2beae411cfa90342c809a7286dd9d5fc66221c57d512ad8addd4c11608ecf04"
          before_revision: 30
          command_digest: "sha256:e10b9503e1ecb0be22abbc5991bfd239cecfc652b6b319966f87b79e094a783b"
          effect_ids: []
          event_digests:
            - "sha256:2f6c5192ac4b098c1397f7c58d22b6fddfa70f47aaf309eb345008ad5d6b9e86"
          mutation_id: "amend:sha256:86441b742d0944f42a36c484974a596d3337de0221f822cb6d27708ef67048b6"
        capture:202610092056-WS6H31:
          after_revision: 1
          aggregate_digest: "sha256:93d61b3350d9aea4c053bb4c48cfa27a2b6bd624fb5f25acb4cf7a30f9892982"
          before_revision: 0
          command_digest: "sha256:c2cac3f1e7db855f524a623274c400c51c8c310cac2ff893a0225c06cab2a87c"
          effect_ids: []
          event_digests:
            - "sha256:068551f7c385923920bc3439be7a9c24d2c0d0faf255ffe33b10c0cac1d2d385"
          mutation_id: "capture:202610092056-WS6H31"
        final-validation:sha256:004d97c50f7596a326e247e150eda25a87b6758d690f56e743379ee4d069ccf0:18:
          after_revision: 19
          aggregate_digest: "sha256:1cbb67d654562b6fe13e892be3db679bce9af00fcf1e618e50ac83e98b267560"
          before_revision: 18
          command_digest: "sha256:c5b6d635cad22d8a015cd2c950ff86c7a296533325d77535ae48502f5bf2c1c2"
          effect_ids: []
          event_digests:
            - "sha256:c38b92d62a367abd643093f85d28cf39178c29ecd7b88c36451307681acae53e"
          mutation_id: "final-validation:sha256:004d97c50f7596a326e247e150eda25a87b6758d690f56e743379ee4d069ccf0:18"
        final-validation:sha256:b43d4bd8da9590a61b5fd408a398fc3481dd00bab0917e092a89e9d7a11c3aa6:43:
          after_revision: 44
          aggregate_digest: "sha256:14abc25c6410c85c73a18a978c852be2db2c08c0f47816388180af03150c24cf"
          before_revision: 43
          command_digest: "sha256:c625d2935ca69c2b89ecdc34556c770346cb85ddbd16ab0671d8c11c859135ff"
          effect_ids: []
          event_digests:
            - "sha256:ed3dde9f5f3fca3752b4af03155641b73bba7581e0c8eec3d8d1430fcbdbb409"
          mutation_id: "final-validation:sha256:b43d4bd8da9590a61b5fd408a398fc3481dd00bab0917e092a89e9d7a11c3aa6:43"
        final-validation:sha256:f78912693c7e2ffe0c5f79199c1daea8f85935311f04fe37f92c252aaacb3487:29:
          after_revision: 30
          aggregate_digest: "sha256:f0dc6ee579f9aa80c9907a760e93ea7ac7138677e8142a5f3f371245c1aef8f7"
          before_revision: 29
          command_digest: "sha256:2906fb45566303811644be646ea74259adb126e3a0381c132a100e708abbe091"
          effect_ids: []
          event_digests:
            - "sha256:bcfb4f510596e5b78214c22e7493615e4875a3daf455e2ead6b1f0ec42a8d409"
          mutation_id: "final-validation:sha256:f78912693c7e2ffe0c5f79199c1daea8f85935311f04fe37f92c252aaacb3487:29"
        final-validation:sha256:fc26d3df5ffbed5e88b8ab7e77c1491e955edcd754adcac3bb91280810df6e39:19:
          after_revision: 20
          aggregate_digest: "sha256:29b63abece541f9855eebc0844a3c70e4deadc9739f1433a846eac572db1a26f"
          before_revision: 19
          command_digest: "sha256:340f108efcd9843d2b1082758ba73d77798c93a13753c1e9dbf28863e509f286"
          effect_ids: []
          event_digests:
            - "sha256:38d0d15a4e66d3f286f4ddf1ac929f32c1623ac7528a89c4752291546093e832"
          mutation_id: "final-validation:sha256:fc26d3df5ffbed5e88b8ab7e77c1491e955edcd754adcac3bb91280810df6e39:19"
        kernel_task_completion_required:sha256:aea6b2bd147d1781e3c020efd19ebc4b4a346306436edf3871ab7669f48c24c0:sha256:d29669a68097b4418cb7d156d65b9d5dc196769dc0510c6e70a804988f89e12e:
          after_revision: 45
          aggregate_digest: "sha256:b05a19d64804c276318c0bd43679afc68a3c656a8595cf0e97dbb9600fe430f7"
          before_revision: 44
          command_digest: "sha256:98c937087162c18c98fbf5bf0a03117ae8fc0c03002ae2b78d043f9a7317e2f2"
          effect_ids: []
          event_digests:
            - "sha256:d6586ee32d6f0c40c6153b8eea1a72ff6f0d129a14c02350d870acb0e793a352"
          mutation_id: "kernel_task_completion_required:sha256:aea6b2bd147d1781e3c020efd19ebc4b4a346306436edf3871ab7669f48c24c0:sha256:d29669a68097b4418cb7d156d65b9d5dc196769dc0510c6e70a804988f89e12e"
        kernel_work_item_claim_required:sha256:5d0edcb3375d640408ef2c2a4827ee8ea56a5ffb8cf9b51c1ea12fbd6f5006a0:sha256:eeb14096b1060fe1857c188626c4151755d70aeecac015c7ba126cbc21cdf75d:
          after_revision: 23
          aggregate_digest: "sha256:fb3b594c5992ecdae975ae1283dbcd924bfea700926546db6d963e808af2c564"
          before_revision: 22
          command_digest: "sha256:9f3bac8d82bb3afbc2ed579687df7745e36fe90db9c963f74f167d2790adce92"
          effect_ids: []
          event_digests:
            - "sha256:add0fade38abfc817c4dcf40e4a6f6479644e30893a1a1a54acd72a59810770e"
          mutation_id: "kernel_work_item_claim_required:sha256:5d0edcb3375d640408ef2c2a4827ee8ea56a5ffb8cf9b51c1ea12fbd6f5006a0:sha256:eeb14096b1060fe1857c188626c4151755d70aeecac015c7ba126cbc21cdf75d"
        kernel_work_item_claim_required:sha256:83cabcefe5d75c65c42eb0623933d2d7f176f1b52d905377bbc5311134e3d5b7:sha256:99bf2816b1e084d95815cc175b980a1ff70ff54afa9d6e5302a795952dbb77fe:
          after_revision: 33
          aggregate_digest: "sha256:51dfe7f545a68546ca0bbd27e718c81c5cdeae408332ed50e3d96b9c2e586663"
          before_revision: 32
          command_digest: "sha256:33c1a76dee17896c574a278b675ed72710d152946a817020818ea5cd2c1df85a"
          effect_ids: []
          event_digests:
            - "sha256:a4e453588f3a1a3422560fa214c88f310bb389674756601ae4f230106b21ee3e"
          mutation_id: "kernel_work_item_claim_required:sha256:83cabcefe5d75c65c42eb0623933d2d7f176f1b52d905377bbc5311134e3d5b7:sha256:99bf2816b1e084d95815cc175b980a1ff70ff54afa9d6e5302a795952dbb77fe"
        kernel_work_item_claim_required:sha256:ba17e9367089bb1d649c8c1603601547c04289cbb23fd954b65185cfde219788:sha256:08aca76b5ea2fb336d34a8515562a0aaa95529c3833b319f3752c956038ead54:
          after_revision: 5
          aggregate_digest: "sha256:201df9f3a2bce3130e115d9b4be36c9ee0bcd0768fdfe97e401394224a5c0f12"
          before_revision: 4
          command_digest: "sha256:e8b2a9595d541dcab897d235ced3362c4dc50c11868661094aab93d2a6ec4baf"
          effect_ids: []
          event_digests:
            - "sha256:896a9558b6d8b87278e3f0c921c68e08f8bfe1d6f9dabe194a6794a887a12c7e"
          mutation_id: "kernel_work_item_claim_required:sha256:ba17e9367089bb1d649c8c1603601547c04289cbb23fd954b65185cfde219788:sha256:08aca76b5ea2fb336d34a8515562a0aaa95529c3833b319f3752c956038ead54"
        kernel_work_item_claim_required:sha256:d74e6ac8914022bc577ff4cd46a8b876b3f71d6572649669914e538a967ac1e3:sha256:99bf2816b1e084d95815cc175b980a1ff70ff54afa9d6e5302a795952dbb77fe:
          after_revision: 37
          aggregate_digest: "sha256:b1fc08351b495f687ce08261695604194e5bad29d31b19bb41514c02c9ce70b9"
          before_revision: 36
          command_digest: "sha256:43aba2aa014a86e4166f942c023d82f1d0dea45260a32fa570a15832ace20f65"
          effect_ids: []
          event_digests:
            - "sha256:9f795cb9ba1be7cd05c31f98ab6d23fc7779bd67f97f8fac92c4ed3af38e7ad7"
          mutation_id: "kernel_work_item_claim_required:sha256:d74e6ac8914022bc577ff4cd46a8b876b3f71d6572649669914e538a967ac1e3:sha256:99bf2816b1e084d95815cc175b980a1ff70ff54afa9d6e5302a795952dbb77fe"
        kernel_work_item_execution_required:sha256:39c45f107e779861d59465bfcecaa9d56d639a26f3033284a8e0fecb777c77c5:sha256:08aca76b5ea2fb336d34a8515562a0aaa95529c3833b319f3752c956038ead54:
          after_revision: 6
          aggregate_digest: "sha256:8ddf2149181cc0a3fcbff52c1e369ef75c8be849e5ecc40b2ce3a60c1e9089ec"
          before_revision: 5
          command_digest: "sha256:cab94344de134bee98edb924c673469ded45fe30b7c7f85e977d7b84fe4ba8b0"
          effect_ids: []
          event_digests:
            - "sha256:94f78a5a7f6fc8ca43c7d497b95f544b9ac033fe3740de8bd931dd21de6b64b4"
          mutation_id: "kernel_work_item_execution_required:sha256:39c45f107e779861d59465bfcecaa9d56d639a26f3033284a8e0fecb777c77c5:sha256:08aca76b5ea2fb336d34a8515562a0aaa95529c3833b319f3752c956038ead54"
        kernel_work_item_execution_required:sha256:6cbd954f1ac311adaebc61b7e9aa648050751fd26725ee38b3a647c5da8ea152:sha256:e0042d92dd460a50b74384420e3abdc8439f2d3c4e946e01553288ca6be3f180:
          after_revision: 13
          aggregate_digest: "sha256:b99d095f9c3eed953fcefa7a18ce9afa03a8d836eba9a0b44e612d1cb4f4c1be"
          before_revision: 12
          command_digest: "sha256:32fdfeb752579e909c5ee338e07009d082bba01e2b7919135f9917bd7631db86"
          effect_ids: []
          event_digests:
            - "sha256:c14f2f04392094e1e9e4731c3ee052251e82fffccc1ded16108a23108348979e"
          mutation_id: "kernel_work_item_execution_required:sha256:6cbd954f1ac311adaebc61b7e9aa648050751fd26725ee38b3a647c5da8ea152:sha256:e0042d92dd460a50b74384420e3abdc8439f2d3c4e946e01553288ca6be3f180"
        kernel_work_item_execution_required:sha256:912dee4af2e70438b8321755bce77032041203dc40f1feccfd02d35c1c0d674b:sha256:99bf2816b1e084d95815cc175b980a1ff70ff54afa9d6e5302a795952dbb77fe:
          after_revision: 38
          aggregate_digest: "sha256:8152aa7f8c3c1fb562691efb671b8cf430ab09ade1288898e6252aba94258817"
          before_revision: 37
          command_digest: "sha256:c5ccd4badf27c72ae935320404291aac3f521c861adac4a1450c8b36a699b1f4"
          effect_ids: []
          event_digests:
            - "sha256:267db913e381a5da1bf3034593065f68169d01677db7638b4cf3fe7d6d00f2c2"
          mutation_id: "kernel_work_item_execution_required:sha256:912dee4af2e70438b8321755bce77032041203dc40f1feccfd02d35c1c0d674b:sha256:99bf2816b1e084d95815cc175b980a1ff70ff54afa9d6e5302a795952dbb77fe"
        kernel_work_item_execution_required:sha256:d2db16e979b191826e90cde56336cce1d9116c40fca7e982b0c70df3549affee:sha256:99bf2816b1e084d95815cc175b980a1ff70ff54afa9d6e5302a795952dbb77fe:
          after_revision: 34
          aggregate_digest: "sha256:c173481709ceff99de0775d586d302b5681fa5697fc1f51c706b14f6fef4859e"
          before_revision: 33
          command_digest: "sha256:fbef3fbfe58c50f21850daea0601fac961c593aeedca42a63867551be3ddb0b4"
          effect_ids: []
          event_digests:
            - "sha256:c4b8b89f430613bf899d32eacd58eca4fbaf1fda9cebb7b6eba20b0d0bdc5c3f"
          mutation_id: "kernel_work_item_execution_required:sha256:d2db16e979b191826e90cde56336cce1d9116c40fca7e982b0c70df3549affee:sha256:99bf2816b1e084d95815cc175b980a1ff70ff54afa9d6e5302a795952dbb77fe"
        kernel_work_item_execution_required:sha256:e8a291910c79b1f61bb4459d7b35cc9f3fe38e49aab65326123a9d0e903dc113:sha256:eeb14096b1060fe1857c188626c4151755d70aeecac015c7ba126cbc21cdf75d:
          after_revision: 24
          aggregate_digest: "sha256:07692cce5b373bad0b4c169b086f9b4cb4b9bae9906f07dcb756b3e2e128df97"
          before_revision: 23
          command_digest: "sha256:78db6fe81c50c0b9ecf6631c6a39561428783ef7f798fba85d1146930d6b492a"
          effect_ids: []
          event_digests:
            - "sha256:2091ab4b7b22d975ed1bca4d7e8e112165d52b9a661eac9fffa5fc6d1fa05964"
          mutation_id: "kernel_work_item_execution_required:sha256:e8a291910c79b1f61bb4459d7b35cc9f3fe38e49aab65326123a9d0e903dc113:sha256:eeb14096b1060fe1857c188626c4151755d70aeecac015c7ba126cbc21cdf75d"
        kernel_work_item_inspection_required:sha256:3aacbc6c9e18e96ec49cdd8a7d19e580a3adea53dfd05122b3b94d1b3d6d7ea0:sha256:99bf2816b1e084d95815cc175b980a1ff70ff54afa9d6e5302a795952dbb77fe:
          after_revision: 27
          aggregate_digest: "sha256:eb37abefcc2f49e8b4a1e83f22747654e2ab3e6ed469113aced55c2be484c3e9"
          before_revision: 26
          command_digest: "sha256:e0b8ae2f71704707876d8f65e06176c002e8bb452e2a6c0eaa94a3a99336857b"
          effect_ids: []
          event_digests:
            - "sha256:3ed0461ecd0b00af04e7bbbbe912dbe582bfaa0ee5f15dbd8f9bbd99acd87e48"
          mutation_id: "kernel_work_item_inspection_required:sha256:3aacbc6c9e18e96ec49cdd8a7d19e580a3adea53dfd05122b3b94d1b3d6d7ea0:sha256:99bf2816b1e084d95815cc175b980a1ff70ff54afa9d6e5302a795952dbb77fe"
        kernel_work_item_inspection_required:sha256:82e822abcf8f972067c06bed7eb38f31b3a8f58c1ae6ac3a82beda1123ba832c:sha256:e0042d92dd460a50b74384420e3abdc8439f2d3c4e946e01553288ca6be3f180:
          after_revision: 9
          aggregate_digest: "sha256:1cb98718ba6538b6aade02448b3e7bafc37e8f4cf45b3154b2c7e489b3e13d53"
          before_revision: 8
          command_digest: "sha256:1fe9c5f4c1e615255c0ae0a2763eff259fd48d7e855f937dbef4168e7ed351a4"
          effect_ids: []
          event_digests:
            - "sha256:5b49f7f8c65996a0938dad735ae3912db98de159ac754695f6c1bcabe8d10bdf"
          mutation_id: "kernel_work_item_inspection_required:sha256:82e822abcf8f972067c06bed7eb38f31b3a8f58c1ae6ac3a82beda1123ba832c:sha256:e0042d92dd460a50b74384420e3abdc8439f2d3c4e946e01553288ca6be3f180"
        kernel_work_item_inspection_required:sha256:8d2485b061e65060f84177cdb509be6dd9d6313257b4f31b139b4a24cd62bd64:sha256:eeb14096b1060fe1857c188626c4151755d70aeecac015c7ba126cbc21cdf75d:
          after_revision: 16
          aggregate_digest: "sha256:da578d21b737cb599bf48d5561200fdc5bbd56585be0934b75bf330957de4688"
          before_revision: 15
          command_digest: "sha256:369c1252e2897a2484b04b9c98748b0ebd4297ca653225e32c788fcae493adc2"
          effect_ids: []
          event_digests:
            - "sha256:3d3ca1d340d62da0cdb571a8be8f917439489e52f374a4810470ae67b77dd390"
          mutation_id: "kernel_work_item_inspection_required:sha256:8d2485b061e65060f84177cdb509be6dd9d6313257b4f31b139b4a24cd62bd64:sha256:eeb14096b1060fe1857c188626c4151755d70aeecac015c7ba126cbc21cdf75d"
        kernel_work_item_inspection_required:sha256:a59bf8fd39db4073ae2e01754c6ac166cae0af66b55b1ceae9c832d920a06e2d:sha256:d29669a68097b4418cb7d156d65b9d5dc196769dc0510c6e70a804988f89e12e:
          after_revision: 41
          aggregate_digest: "sha256:09f78fdfb8a520320b73f7fe46f1eb0b4ec48255bd25933d056966490ed69b3f"
          before_revision: 40
          command_digest: "sha256:059375709ff0df9edb7365669ac8de0c92df5b63af5c6ebbadfc170f30263934"
          effect_ids: []
          event_digests:
            - "sha256:f2a0361159b2b9da9a55309aa8ebdce51b8859b8cdba7c5803c321117a72088a"
          mutation_id: "kernel_work_item_inspection_required:sha256:a59bf8fd39db4073ae2e01754c6ac166cae0af66b55b1ceae9c832d920a06e2d:sha256:d29669a68097b4418cb7d156d65b9d5dc196769dc0510c6e70a804988f89e12e"
        kernel_work_item_materialization_required:sha256:f8350986a7f6d237a60d1dd8d238c3df510d6fb968d36199635107a44d23fae3:sha256:08aca76b5ea2fb336d34a8515562a0aaa95529c3833b319f3752c956038ead54:
          after_revision: 4
          aggregate_digest: "sha256:d3e438789c3e69962f1590867b8f3336863ea29a7b1fb059134a12766162cf99"
          before_revision: 3
          command_digest: "sha256:9403c68c3a05074e4955e71b96c13da10516753a1356f2d978010761842e709a"
          effect_ids: []
          event_digests:
            - "sha256:ea2258aa19c5a7f5772fd2615ae189c18bed5d3d88cec3a9e3bea4a3f5283d0e"
          mutation_id: "kernel_work_item_materialization_required:sha256:f8350986a7f6d237a60d1dd8d238c3df510d6fb968d36199635107a44d23fae3:sha256:08aca76b5ea2fb336d34a8515562a0aaa95529c3833b319f3752c956038ead54"
        kernel_work_item_rework_claim_required:sha256:390e9a01286d0d4dc90b1f6c2e64a8ba6ecc5bd2157b759b2ebd454fcd6062ef:sha256:e0042d92dd460a50b74384420e3abdc8439f2d3c4e946e01553288ca6be3f180:
          after_revision: 12
          aggregate_digest: "sha256:e45113fb82313f5b3290eafdc6064726fba9e0e377aeee430e399a03eec8e118"
          before_revision: 11
          command_digest: "sha256:638cf0b138e618795b5a4428f76d6e62696325f1f339f871a61b4a527824b5cc"
          effect_ids: []
          event_digests:
            - "sha256:3de0596290ec1900a85e59eaeda4fba3c0d5e306c818da53940741cc2ef7a812"
          mutation_id: "kernel_work_item_rework_claim_required:sha256:390e9a01286d0d4dc90b1f6c2e64a8ba6ecc5bd2157b759b2ebd454fcd6062ef:sha256:e0042d92dd460a50b74384420e3abdc8439f2d3c4e946e01553288ca6be3f180"
        result:sha256:546deb5bc075c5114a505e4b1203dd72f9f87eb9bd6dae5a4de8c81ed559bc0e:
          after_revision: 26
          aggregate_digest: "sha256:c9f43a7dcea6f045b38fe9366c846a218f5b3aa313c962726e4331dd6b9fda4a"
          before_revision: 25
          command_digest: "sha256:3842a4a1a76706bdcff92c187536218d9306fd0e3b451e1de4d94e0d68a160ad"
          effect_ids: []
          event_digests:
            - "sha256:9b43169b13c11e9b94a49c3a2f8a630970dcdbc78fc632738140a057ba83e417"
          mutation_id: "result:sha256:546deb5bc075c5114a505e4b1203dd72f9f87eb9bd6dae5a4de8c81ed559bc0e"
        result:sha256:6186730c458f01deade7b4e3a86b225cc210d34f90865e08fafdfc2bcc6c12e2:
          after_revision: 40
          aggregate_digest: "sha256:4f9ae7d8037cbcf081969cf79324b541abd7734324ec168fbb59b2e3bcf06154"
          before_revision: 39
          command_digest: "sha256:6ca73a486213ac2e47730110247ded754883209109459e32135d39d88bb25f8c"
          effect_ids: []
          event_digests:
            - "sha256:6fed5643633637bbec683f81a2a5a1235bc5c6c8a9dcf0ba40e88838667121e3"
          mutation_id: "result:sha256:6186730c458f01deade7b4e3a86b225cc210d34f90865e08fafdfc2bcc6c12e2"
        result:sha256:9d306941441558a0ba876bcd5631b9a1477660fa4631dc62768ba7f07dabe67e:
          after_revision: 15
          aggregate_digest: "sha256:c1fd80099a0d5a45422a8e2f33adf78f322df18928228d122a8ffda5fe19cf8e"
          before_revision: 14
          command_digest: "sha256:5c376dae06f7c0aea469e4715d392e710048fdb4158f5899a452fa5a652732fe"
          effect_ids: []
          event_digests:
            - "sha256:2131fda8466e10085cbae9c734dfe894bd04c317393d72fbeda730932f0bab40"
          mutation_id: "result:sha256:9d306941441558a0ba876bcd5631b9a1477660fa4631dc62768ba7f07dabe67e"
        result:sha256:e1bdd38750646b89fb2493422d17be22a88b57736c08185c8c2740bea8244d85:
          after_revision: 2
          aggregate_digest: "sha256:0533438ea62bed51396c3d0e275b60b9bff5cff8d0b76ccecd99b7a30b103391"
          before_revision: 1
          command_digest: "sha256:f5ce6087e39da6d065ebce7b79fac596107b089d72b8eedd1667ad3ae78d198c"
          effect_ids: []
          event_digests:
            - "sha256:c0f34d17380487afd2932b451d5eccf92bce1d9bb0c180c832a088b843643da4"
          mutation_id: "result:sha256:e1bdd38750646b89fb2493422d17be22a88b57736c08185c8c2740bea8244d85"
        result:sha256:f02e93630fce06aa157fd842ee072dc5a52eeccf32070552a0001bff83975fb2:
          after_revision: 8
          aggregate_digest: "sha256:666f7826b3c03d47a946572fb8d90d1a3e831763370fc0aefc62324237c93d3d"
          before_revision: 7
          command_digest: "sha256:018f9556b305db65baa3c2f8592dbba8e26bd0e03149bebf0a19d8e120cfb231"
          effect_ids: []
          event_digests:
            - "sha256:f54413ab871bef350351c3807ab720d66feb5127b155c571ea0e7e2e88e189c3"
          mutation_id: "result:sha256:f02e93630fce06aa157fd842ee072dc5a52eeccf32070552a0001bff83975fb2"
        semantic-stop:sha256:64128048665700b0a499beeadf23104d5e5acc14b7dc1cfcbb44520cae548bc2:
          after_revision: 35
          aggregate_digest: "sha256:63fc672268e3bbfc14ac86f317c2b2aef4eeaa79df5e69589acffeabd3aff6e2"
          before_revision: 34
          command_digest: "sha256:e4d4f8d495a48df64192571eeee36e6359a35fb47a340f7e60655118cf26c8a4"
          effect_ids: []
          event_digests:
            - "sha256:cb87c9c36c93e85d10055baabfe2936a1b7165ff4af1e2d1f399b501053e7dd8"
          mutation_id: "semantic-stop:sha256:64128048665700b0a499beeadf23104d5e5acc14b7dc1cfcbb44520cae548bc2"
        sha256:12f4194641df3f8d9c881b3e502ed8062e3e7ab47d5a2769dddbf0ba78c2a7c6:
          after_revision: 14
          aggregate_digest: "sha256:3eeca659f2f2a38ab1d0547544388e5d6121344e412168291578fd9ecc5dd712"
          before_revision: 13
          command_digest: "sha256:f684a305983a7d8e1aaf96b9d3f34656c0524756d610461df1fd8d744881cc7f"
          effect_ids: []
          event_digests:
            - "sha256:24d2b90e1deeffe6f78abcb69600c9ddfa45776c6d28041f58fd6965344cdd94"
          mutation_id: "sha256:12f4194641df3f8d9c881b3e502ed8062e3e7ab47d5a2769dddbf0ba78c2a7c6"
        sha256:2fe396d946d4695ddba545d02317809873bbb067de6676239e7b1c048de54f59:
          after_revision: 39
          aggregate_digest: "sha256:ef40c527d4254f024ebff79548795f9e3fd2870ea761d8d81a55df6f34b0f69a"
          before_revision: 38
          command_digest: "sha256:687431415dc5430e6310e0ec07843812222982d90295154acfdfc7764de63404"
          effect_ids: []
          event_digests:
            - "sha256:fdf0a04774023ec09f3ecdb500eb95536104845909555c75b23e9baf8f531440"
          mutation_id: "sha256:2fe396d946d4695ddba545d02317809873bbb067de6676239e7b1c048de54f59"
        sha256:337d5a149f92ab7efed9f58148507c56a149cbd887bc51ad68f78347179f453e:
          after_revision: 25
          aggregate_digest: "sha256:8b7993f7dc613283c7d0b32cf7e0e21630f2dcc5ee5cf2474f770e983e574d11"
          before_revision: 24
          command_digest: "sha256:a369e63d4536ff2aaa3b01235cc509eb7d22268ad246f5b5e1514dea0ed2fdc5"
          effect_ids: []
          event_digests:
            - "sha256:86787730f402d89f15993afe2522e929621522709d13de07239c0c6fc53021f8"
          mutation_id: "sha256:337d5a149f92ab7efed9f58148507c56a149cbd887bc51ad68f78347179f453e"
        sha256:421359b39be6469756def666d099b974be1d38ddfde623eb652e1859a9260847:
          after_revision: 7
          aggregate_digest: "sha256:6e0eb4099da14180bce65adc7dcfa45f13fd12dcf8404abeb27aea1ea501544c"
          before_revision: 6
          command_digest: "sha256:f60eb0e8f3cbd90ddee7a00968a5947d67d34f80842500e78b07b3c219c11aaf"
          effect_ids: []
          event_digests:
            - "sha256:6e21230d39ba1244e5a5b14f7aa0c59bc5d88bd3640d3878f42e85d1f28e8699"
          mutation_id: "sha256:421359b39be6469756def666d099b974be1d38ddfde623eb652e1859a9260847"
        sha256:abbbb089504b0e088030b7d89d4459719652a2bdc339a1097db72a85c201839c:
          after_revision: 32
          aggregate_digest: "sha256:e68154aa5afafd16fbda17109b5e3c073f62e43b78f6cabab2a16d5cea599bda"
          before_revision: 31
          command_digest: "sha256:520877341f4c5f6d68461d5c0c72944f4316b443e795768631f43904648a79f4"
          effect_ids: []
          event_digests:
            - "sha256:9dfcba1b8b44fec1a777adfc55e3c27d68c30a9bda33aa328e72c45a2385bc49"
          mutation_id: "sha256:abbbb089504b0e088030b7d89d4459719652a2bdc339a1097db72a85c201839c"
        sha256:b350edde10a47c734598e44762f313fd45cd65f45e0b2e8ed380cb8c30c124ff:
          after_revision: 22
          aggregate_digest: "sha256:471915c24be629f1e041335bb982f3fdbe6f323e7d6acef065c2c194945de8c7"
          before_revision: 21
          command_digest: "sha256:b1a1ea21634d74ed50304ea0cee83a747335963211f34c749d5c4730f8b192a5"
          effect_ids: []
          event_digests:
            - "sha256:292708b698944e129c3370356f8dc3217f87b625b9dc6c471bbc59a2c4d78423"
          mutation_id: "sha256:b350edde10a47c734598e44762f313fd45cd65f45e0b2e8ed380cb8c30c124ff"
        sha256:dd83bd0adbf399783bd8260cd482fd1e89674611758685758fc0697c4a1d916e:
          after_revision: 3
          aggregate_digest: "sha256:4ccdaa7c3dee9be32e90f904b5ba56daf7615c77b18a452ec5fc0fd628f336e6"
          before_revision: 2
          command_digest: "sha256:074cd72afef4d5d2a9a4ca806970c42ec36fe5ac39b5f0353fbae414ed5b164d"
          effect_ids: []
          event_digests:
            - "sha256:e0df409ddb1126a96bf6f90fb32c02f35040ca708b72f09905df8acc67b1f6a9"
          mutation_id: "sha256:dd83bd0adbf399783bd8260cd482fd1e89674611758685758fc0697c4a1d916e"
        validation-resolution:sha256:0a47da8dc8515e41ee70bf1b958e2b6c71f0602846826150beb0f87d4cd2bbdc:
          after_revision: 43
          aggregate_digest: "sha256:f7b09fe3e029ebe68755dd441be1be68b7f1a8445ed7f131ff4ef8065f426665"
          before_revision: 42
          command_digest: "sha256:45358560c9025d49eaf9552d42f4b2e005e69507da1e778775efcfe7a82a1676"
          effect_ids: []
          event_digests:
            - "sha256:1963f5c6cd4b31f02a31fb3a9241346a88f6610e29172d6d00904f1799154614"
          mutation_id: "validation-resolution:sha256:0a47da8dc8515e41ee70bf1b958e2b6c71f0602846826150beb0f87d4cd2bbdc"
        validation-resolution:sha256:34792b74aa21951802f5831728fae5c09a2e4b56491a442d251a0646715581dc:
          after_revision: 18
          aggregate_digest: "sha256:5578e1a98a3d37459065219cbfbe6d547fb7a50735130e4e97b88b0318932aa0"
          before_revision: 17
          command_digest: "sha256:a6b23bf2783ff004877e3f13514d175fec0c754384f3b9f191e1509e1b74e5a8"
          effect_ids: []
          event_digests:
            - "sha256:3a7b22dbd3ddfc0242c4729f8f5079e6d22a903e7103d13741f90b9d907284bf"
          mutation_id: "validation-resolution:sha256:34792b74aa21951802f5831728fae5c09a2e4b56491a442d251a0646715581dc"
        validation-resolution:sha256:57ce668926cce83c67f3dc328a09bff9f43976182a51f5120a107cd54e4acf12:
          after_revision: 11
          aggregate_digest: "sha256:981364e5fa43026adf088aec4908253026d4847a9d610d0b88ebfd1cdf8d1e2a"
          before_revision: 10
          command_digest: "sha256:8b8ffa7a3a9b66fe4076aaab06711a130da8bf7076b7c7696423c3748ad02b69"
          effect_ids: []
          event_digests:
            - "sha256:dd533d486e2a76ad708b88f7414a3b8932dab582aab08826c135b0041defebfb"
          mutation_id: "validation-resolution:sha256:57ce668926cce83c67f3dc328a09bff9f43976182a51f5120a107cd54e4acf12"
        validation-resolution:sha256:9ce9e434c47011786c4e28717c5ef819b4dd3bba388bb423317b1e8342626751:
          after_revision: 29
          aggregate_digest: "sha256:f94e9d3039275af8fc5adeb1bb41bfd893f9a03e3de036815fbc8633fad3795b"
          before_revision: 28
          command_digest: "sha256:f460e3a077d7b60d5493e874164184dcb6a38472d09c3085aa6c463b155d94da"
          effect_ids: []
          event_digests:
            - "sha256:ee5b208574a5e6d42b026283946262b57b299052245428e5cf2fd6babf021e97"
          mutation_id: "validation-resolution:sha256:9ce9e434c47011786c4e28717c5ef819b4dd3bba388bb423317b1e8342626751"
        validation:sha256:0a52addc49f2fc34165edbd72a7fea9fbc2c0abc436d3aa94f995a5a4a7a657e:
          after_revision: 28
          aggregate_digest: "sha256:aaa944ec91f89bcdba2f3683b2e2c757010819fc6a728edbe8ec8a5764ad0f66"
          before_revision: 27
          command_digest: "sha256:931dc88e866d67e768966daa99d4d1f6af2540958bf18b7cfaeefef3d90f6d48"
          effect_ids: []
          event_digests:
            - "sha256:3a29ad0e89b815766f3e29a131caa71236e51e4a327a38d77710a139c21d39af"
          mutation_id: "validation:sha256:0a52addc49f2fc34165edbd72a7fea9fbc2c0abc436d3aa94f995a5a4a7a657e"
        validation:sha256:1e74d5bfe965b3bd0381175689cc51c4698835c0cedde7de141bb22bd8b11a90:
          after_revision: 10
          aggregate_digest: "sha256:0aa60132cdfa8a29489b9334d8add6fdb7d83eba4c465ee2c0a13b4fff39e0e6"
          before_revision: 9
          command_digest: "sha256:d3ebedd87a97911d3d9cb0ae5423289444c7ba8cbde37030c6372e6648d4ecbd"
          effect_ids: []
          event_digests:
            - "sha256:7c4c98017f803a7c7b778a06a4b6ed0141e4de1270fbc569e18814981c08021d"
          mutation_id: "validation:sha256:1e74d5bfe965b3bd0381175689cc51c4698835c0cedde7de141bb22bd8b11a90"
        validation:sha256:9e473320c915633d268e69669373325619e383c2bdfeb8d3608eec0d4e93df6b:
          after_revision: 17
          aggregate_digest: "sha256:13eb4ad430f5e4d8b5a0d661920bf479980d08077df4b0b3f52e2b6f2ec5a340"
          before_revision: 16
          command_digest: "sha256:796a79da7fab7458d9383f17277f3c17c2328806d8ffa274dfa82b894887f5d9"
          effect_ids: []
          event_digests:
            - "sha256:1f205d1632772837b6b26beda889b2fb43810b7466c8f029d41f6746671bff97"
          mutation_id: "validation:sha256:9e473320c915633d268e69669373325619e383c2bdfeb8d3608eec0d4e93df6b"
        validation:sha256:d341b29302dfe0f356f1b1c74369ccfb34634f5ef759ab1c3ec0342e69aeb541:
          after_revision: 42
          aggregate_digest: "sha256:ca9643c6f37ef5ed37435c6ef1b1eeab19b0d0a1060734ded6384d2fb6503d6c"
          before_revision: 41
          command_digest: "sha256:6ac634f983e87c61f3f3058c9104b101759a9e628e7e72af903443293219fb7a"
          effect_ids: []
          event_digests:
            - "sha256:91d664bc9771c9041ee9005e8b1682492b50af3073ef74d5cdaf6baa4f25631a"
          mutation_id: "validation:sha256:d341b29302dfe0f356f1b1c74369ccfb34634f5ef759ab1c3ec0342e69aeb541"
        work-item-resume:sha256:e2ab746280bde3b32d139e7849da452270cbf43b05b81d46a2ca7fc4fa47613b:
          after_revision: 36
          aggregate_digest: "sha256:f927c972551942637e13de69bf6b4d872b9b40ccb638b031695d1971230e8676"
          before_revision: 35
          command_digest: "sha256:77bf04eda67a77d6e441ecce9803837451396b858b618c42e53c7bd15e65a9b4"
          effect_ids: []
          event_digests:
            - "sha256:118308bd9aed4859707881f2602d1d99c40910ce1e2f20da8974c3351aa5f8ff"
          mutation_id: "work-item-resume:sha256:e2ab746280bde3b32d139e7849da452270cbf43b05b81d46a2ca7fc4fa47613b"
      plan_history:
        -
          approval_actor_id: "agentplane:kernel-controller"
          approval_evidence_digest: "sha256:fbcafb684fd4b100f2703290fa3ba6f957141000ebebe7969470a7a9038ac8c1"
          digest: "sha256:f4644c2b8cd8639458f8f31b9bc2284175975585f4d42722031f9d9f39243e92"
          revision: 1
          state: "SUPERSEDED"
          work_items:
            -
              contract_digest: "sha256:183037f4f906a0b1c53ba3765397b35552095e1c831623459b28d053d06889e3"
              depends_on: []
              execution_requirements:
                capabilities:
                  - "repository_write"
                external_effects: []
                repository_effects:
                  - "repository_write"
                  - "source_code"
                  - "tests"
                  - "ci"
                resources: []
                scope_roots:
                  - "scripts"
              expected_outputs:
                - "reviewed-compatibility-delta"
              id: "review-compatibility-delta"
              optional: false
              required_inputs: []
        -
          approval_actor_id: "USER"
          approval_evidence_digest: "sha256:f54d3e56c97fb96fa71fd86a276741483de5e33d11ad3ad1aefef8115541874c"
          digest: "sha256:838499da9353617f2b624adcd6434b65df29b62fe4d59ab4717a3689add4f254"
          revision: 2
          state: "SUPERSEDED"
          work_items:
            -
              contract_digest: "sha256:183037f4f906a0b1c53ba3765397b35552095e1c831623459b28d053d06889e3"
              depends_on: []
              execution_requirements:
                capabilities:
                  - "repository_write"
                external_effects: []
                repository_effects:
                  - "repository_write"
                  - "source_code"
                  - "tests"
                  - "ci"
                resources: []
                scope_roots:
                  - "scripts"
              expected_outputs:
                - "reviewed-compatibility-delta"
              id: "review-compatibility-delta"
              optional: false
              required_inputs: []
            -
              contract_digest: "sha256:5919a3352617dfaeeb52952ddf586af7f213934efc2ed661c2736a2a9a04c370"
              depends_on:
                - "review-compatibility-delta"
              execution_requirements:
                capabilities:
                  - "repository_write"
                external_effects: []
                repository_effects:
                  - "ci"
                  - "repository_write"
                  - "source_code"
                  - "tests"
                resources: []
                scope_roots:
                  - "scripts"
              expected_outputs:
                - "final-correction-fc26d3df5ffb-evidence"
              id: "final-correction-fc26d3df5ffb"
              optional: false
              required_inputs: []
      revision: 45
      schema_version: 1
      state: "COMPLETED"
      work_items:
        final-correction-f78912693c7e:
          attempt: 2
          claim_id: "sha256:3746b7745f12700d17ef00a5c8bcbea56283b27ffe5a86dff01b825c472a7e56"
          definition:
            contract_digest: "sha256:7f86a57cba4306000e8ccf755e684d9fea1608624820b4b0f2c5ef70101b0fab"
            depends_on:
              - "review-compatibility-delta"
              - "final-correction-fc26d3df5ffb"
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "ci"
                - "repository_write"
                - "source_code"
                - "tests"
              resources: []
              scope_roots:
                - "scripts"
            expected_outputs:
              - "final-correction-f78912693c7e-evidence"
            id: "final-correction-f78912693c7e"
            optional: false
            required_inputs: []
          output_manifests:
            -
              attempt: 2
              digest: "sha256:b28c742f3ecf5d0d526ff9cb255ad6ee698e28bd3e07b120a3715645b6fbde7c"
              id: "final-correction-f78912693c7e-evidence"
              kind: "report"
              plan_revision: 3
              repository_fingerprint: "sha256:d29669a68097b4418cb7d156d65b9d5dc196769dc0510c6e70a804988f89e12e"
              task_id: "202610092056-WS6H31"
              work_item_id: "final-correction-f78912693c7e"
          result_digest: "sha256:2b98fdeee8f5c059fcbf16e3e6ca0721b3c61afdfa84417d1ca56b84d038cffe"
          revision: 12
          state: "COMPLETED"
          validation:
            evidence_digests:
              - "sha256:1716a2a51e8bb2ef5f769719d20d308f8d9560cf1e9b69e0de8ebdc7a65288fc"
              - "sha256:9242a337ce7d8e3d821621455da9be5cd7bae11ef9ce1b24e194db10a246e7fa"
            identity:
              check_id: "canonical-contract-and-inspection"
              command_digest: "sha256:2854e7ecf68c5194b07994cbd199b749f1b91e9e7cf65183dc834e54275f3210"
              environment_digest: "sha256:47bfbd7874002aa531d361ebd6c564a37ca89a704c30c87ca7f4bc54d4238de2"
              implementation_identity: "sha256:2b98fdeee8f5c059fcbf16e3e6ca0721b3c61afdfa84417d1ca56b84d038cffe"
              toolchain_digest: "sha256:5a3b0e29e27baf58fa8f4697c8a875f35fc209aaa906b14d0f3f20bd67718381"
            observed_at: "2026-10-10T10:56:51.643Z"
            status: "PASSED"
        final-correction-fc26d3df5ffb:
          attempt: 1
          claim_id: "sha256:72467fae1dcb5067f7874f07b50a5120581be6abf6da72a69f3ddb67a7ff2780"
          definition:
            contract_digest: "sha256:5919a3352617dfaeeb52952ddf586af7f213934efc2ed661c2736a2a9a04c370"
            depends_on:
              - "review-compatibility-delta"
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "ci"
                - "repository_write"
                - "source_code"
                - "tests"
              resources: []
              scope_roots:
                - "scripts"
            expected_outputs:
              - "final-correction-fc26d3df5ffb-evidence"
            id: "final-correction-fc26d3df5ffb"
            optional: false
            required_inputs: []
          output_manifests:
            -
              attempt: 1
              digest: "sha256:844fa755ae4f1888502487fe6a4f492add9c08a544b67470cf6cc66e31eafca5"
              id: "final-correction-fc26d3df5ffb-evidence"
              kind: "report"
              plan_revision: 2
              repository_fingerprint: "sha256:99bf2816b1e084d95815cc175b980a1ff70ff54afa9d6e5302a795952dbb77fe"
              task_id: "202610092056-WS6H31"
              work_item_id: "final-correction-fc26d3df5ffb"
          result_digest: "sha256:cbb9d1f79b588e481a2e5f4c48c7baea9712b85effe67e0ff1bad20a97f7e930"
          revision: 8
          state: "COMPLETED"
          validation:
            evidence_digests:
              - "sha256:d0a4193b68ac9f474ce8c8255154bbddbbfb0631cb7d557168d7c1f4843a61bf"
              - "sha256:2eb634acde03cfa6ffbcab3ae0a49a59565cbaaae8d0ddd7fb4fec839fe10b51"
            identity:
              check_id: "canonical-contract-and-inspection"
              command_digest: "sha256:2854e7ecf68c5194b07994cbd199b749f1b91e9e7cf65183dc834e54275f3210"
              environment_digest: "sha256:8db06a6d6fba6be52f1497c2e25d352dabe07e84af0e4f406af6ad21043577b1"
              implementation_identity: "sha256:cbb9d1f79b588e481a2e5f4c48c7baea9712b85effe67e0ff1bad20a97f7e930"
              toolchain_digest: "sha256:5a3b0e29e27baf58fa8f4697c8a875f35fc209aaa906b14d0f3f20bd67718381"
            observed_at: "2026-10-10T09:17:44.987Z"
            status: "PASSED"
        review-compatibility-delta:
          attempt: 2
          claim_id: "sha256:52137c5b5e0617483cb495f28693c85944c6645d3bb32c1905ab8d7dd8f6214d"
          definition:
            contract_digest: "sha256:183037f4f906a0b1c53ba3765397b35552095e1c831623459b28d053d06889e3"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "source_code"
                - "tests"
                - "ci"
              resources: []
              scope_roots:
                - "scripts"
            expected_outputs:
              - "reviewed-compatibility-delta"
            id: "review-compatibility-delta"
            optional: false
            required_inputs: []
          output_manifests:
            -
              attempt: 2
              digest: "sha256:c5abc748b5db2134a6a12a64c3805294ede2f91242eab90b07fca6232ec50e30"
              id: "reviewed-compatibility-delta"
              kind: "report"
              plan_revision: 1
              repository_fingerprint: "sha256:eeb14096b1060fe1857c188626c4151755d70aeecac015c7ba126cbc21cdf75d"
              task_id: "202610092056-WS6H31"
              work_item_id: "review-compatibility-delta"
          result_digest: "sha256:09e9deb628c4710ff5d2277cb05f1fd36ba32a53a9fba14c1153aa7fe0eab185"
          revision: 13
          state: "COMPLETED"
          validation:
            evidence_digests:
              - "sha256:aafb350bb173c1688e7500f10f7e5493860d2b524da9dc4342240b9919d4b2fc"
              - "sha256:f4982f34845df9f04b5aab3e1f7bc208498f954cfb3e89bd8584cde6800e00d0"
            identity:
              check_id: "canonical-contract-and-inspection"
              command_digest: "sha256:2854e7ecf68c5194b07994cbd199b749f1b91e9e7cf65183dc834e54275f3210"
              environment_digest: "sha256:1f7597351c2cbeccb6f0f4e4ccf158fb8e0f36061b33bceea45d6844e191b7bc"
              implementation_identity: "sha256:09e9deb628c4710ff5d2277cb05f1fd36ba32a53a9fba14c1153aa7fe0eab185"
              toolchain_digest: "sha256:5a3b0e29e27baf58fa8f4697c8a875f35fc209aaa906b14d0f3f20bd67718381"
            observed_at: "2026-10-09T21:29:43.484Z"
            status: "PASSED"
    digest: "sha256:c2b702f986612c6732bf43e2ba518042ff5b5337bc9c6c5eccb79111de841aa3"
    documents:
      contracts:
        sha256:183037f4f906a0b1c53ba3765397b35552095e1c831623459b28d053d06889e3:
          acceptance_criteria:
            - "Compare the current CLI topology with the reviewed candidate and identify every changed command, argument, option, and digest before editing."
            - "If any removed or unexpected public contract appears, stop and report a blocker instead of recapturing it."
            - "Keep immutable published baselines and rejected-recapture checks intact. Do not change package versions or release metadata."
            - "Make only the necessary scripts changes and record the reviewed allowed JSON paths and source task provenance."
            - "The compatibility candidate and contract checks pass against the task branch."
          objective: "Review the exact CLI topology delta caused by PR #6095, then update only the approved compatibility candidate and its guard if the delta is additive and in scope."
          role: "EXECUTOR"
          verification_commands:
            - "bun run bench:compatibility:candidate:check"
            - "bun run bench:compatibility:check"
            - "bun run format:check"
        sha256:5919a3352617dfaeeb52952ddf586af7f213934efc2ed661c2736a2a9a04c370:
          acceptance_criteria:
            - "Correct the reproduced regression within the existing approved scope. Preserve completed work and all prior evidence."
            - "Run the unchanged required validation commands. Return implementation evidence for independent native review."
            - "Do not bypass checks, expand authority, discard effects or claim that infrastructure failures are code defects."
          objective: "Repair the failed final validation evidenced by sha256:fc26d3df5ffbed5e88b8ab7e77c1491e955edcd754adcac3bb91280810df6e39. Read /home/agentplane/workspace/agentplane/.git/agentplane/kernel/exchanges/202610092056-WS6H31/38c2fa0b7d07844b63733059e55837a45879d5e5185c6adb1f8a20aea9f55ef9/final-validation.json before edits."
          role: "EXECUTOR"
          verification_commands:
            - "bun run bench:compatibility:candidate:check"
            - "bun run bench:compatibility:check"
            - "bun run format:check"
        sha256:7f86a57cba4306000e8ccf755e684d9fea1608624820b4b0f2c5ef70101b0fab:
          acceptance_criteria:
            - "Correct the reproduced regression within the existing approved scope. Preserve completed work and all prior evidence."
            - "Run the unchanged required validation commands. Return implementation evidence for independent native review."
            - "Do not bypass checks, expand authority, discard effects or claim that infrastructure failures are code defects."
          objective: "Repair the failed final validation evidenced by sha256:f78912693c7e2ffe0c5f79199c1daea8f85935311f04fe37f92c252aaacb3487. Read /home/agentplane/workspace/agentplane/.git/agentplane/kernel/exchanges/202610092056-WS6H31/5bdb8a21e6864b0e6d7e09a1ef44b72eae017a8db3dacbc84362d5f3b1f8673e/final-validation.json before edits."
          role: "EXECUTOR"
          verification_commands:
            - "bun run bench:compatibility:candidate:check"
            - "bun run bench:compatibility:check"
            - "bun run format:check"
      intent:
        context: "The PR 6095 verify-contract job fails at reviewed Recipe V2 section inventory drift because the CLI topology digest changed from 1b2e5a... to d14dab... after fixing issue 6076. Review the exact CLI topology delta, update only the approved compatibility candidate and guard as warranted, preserve rejected-recapture protections, and validate the GitHub contract check. This is a corrective follow-up to the existing PR, not a release or package version change."
        objective: "Review and update compatibility candidate for CLI help changes in PR 6095"
    events:
      -
        command_digest: "sha256:c2cac3f1e7db855f524a623274c400c51c8c310cac2ff893a0225c06cab2a87c"
        id: "capture:202610092056-WS6H31:intent_captured"
        kind: "intent_captured"
        mutation_id: "capture:202610092056-WS6H31"
        occurred_at: "2026-10-09T20:56:59.214Z"
        payload_digest: "sha256:dd4b9a1b01bc6ba26cb38ee8708732b4697168f9f1efd11ab69e8c59d1d7e5e5"
        task_id: "202610092056-WS6H31"
        task_revision: 1
      -
        command_digest: "sha256:f5ce6087e39da6d065ebce7b79fac596107b089d72b8eedd1667ad3ae78d198c"
        id: "result:sha256:e1bdd38750646b89fb2493422d17be22a88b57736c08185c8c2740bea8244d85:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "result:sha256:e1bdd38750646b89fb2493422d17be22a88b57736c08185c8c2740bea8244d85"
        occurred_at: "2026-10-09T20:58:16.665Z"
        payload_digest: "sha256:eb072bc87a56778129f2249262798ac4529cbb4dc23135c33a7bf51f80d80ac9"
        task_id: "202610092056-WS6H31"
        task_revision: 2
      -
        command_digest: "sha256:074cd72afef4d5d2a9a4ca806970c42ec36fe5ac39b5f0353fbae414ed5b164d"
        id: "sha256:dd83bd0adbf399783bd8260cd482fd1e89674611758685758fc0697c4a1d916e:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:dd83bd0adbf399783bd8260cd482fd1e89674611758685758fc0697c4a1d916e"
        occurred_at: "2026-10-09T20:58:27.233Z"
        payload_digest: "sha256:8b894fd1d9eede9fa4fff43cf8cf98a83ed8217946a44dad0bb15931ffd5d322"
        task_id: "202610092056-WS6H31"
        task_revision: 3
      -
        command_digest: "sha256:9403c68c3a05074e4955e71b96c13da10516753a1356f2d978010761842e709a"
        id: "kernel_work_item_materialization_required:sha256:f8350986a7f6d237a60d1dd8d238c3df510d6fb968d36199635107a44d23fae3:sha256:08aca76b5ea2fb336d34a8515562a0aaa95529c3833b319f3752c956038ead54:work_items_materialized"
        kind: "work_items_materialized"
        mutation_id: "kernel_work_item_materialization_required:sha256:f8350986a7f6d237a60d1dd8d238c3df510d6fb968d36199635107a44d23fae3:sha256:08aca76b5ea2fb336d34a8515562a0aaa95529c3833b319f3752c956038ead54"
        occurred_at: "2026-10-09T20:58:37.484Z"
        payload_digest: "sha256:65712c2a1da8380d008f22d3ef7a3bcd55819e440c88d04b41b962e540b4341f"
        task_id: "202610092056-WS6H31"
        task_revision: 4
      -
        command_digest: "sha256:e8b2a9595d541dcab897d235ced3362c4dc50c11868661094aab93d2a6ec4baf"
        id: "kernel_work_item_claim_required:sha256:ba17e9367089bb1d649c8c1603601547c04289cbb23fd954b65185cfde219788:sha256:08aca76b5ea2fb336d34a8515562a0aaa95529c3833b319f3752c956038ead54:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:ba17e9367089bb1d649c8c1603601547c04289cbb23fd954b65185cfde219788:sha256:08aca76b5ea2fb336d34a8515562a0aaa95529c3833b319f3752c956038ead54"
        occurred_at: "2026-10-09T20:58:49.489Z"
        payload_digest: "sha256:bc18f549bd285e143a017087b2bb0a7ed067d6adc7d081a7e0aaa4082dfc205d"
        task_id: "202610092056-WS6H31"
        task_revision: 5
      -
        command_digest: "sha256:cab94344de134bee98edb924c673469ded45fe30b7c7f85e977d7b84fe4ba8b0"
        id: "kernel_work_item_execution_required:sha256:39c45f107e779861d59465bfcecaa9d56d639a26f3033284a8e0fecb777c77c5:sha256:08aca76b5ea2fb336d34a8515562a0aaa95529c3833b319f3752c956038ead54:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:39c45f107e779861d59465bfcecaa9d56d639a26f3033284a8e0fecb777c77c5:sha256:08aca76b5ea2fb336d34a8515562a0aaa95529c3833b319f3752c956038ead54"
        occurred_at: "2026-10-09T21:14:16.072Z"
        payload_digest: "sha256:132bb5e03b9f4837e802aa9da83aa6998677794bad2eb82007248a052e674692"
        task_id: "202610092056-WS6H31"
        task_revision: 6
      -
        command_digest: "sha256:f60eb0e8f3cbd90ddee7a00968a5947d67d34f80842500e78b07b3c219c11aaf"
        id: "sha256:421359b39be6469756def666d099b974be1d38ddfde623eb652e1859a9260847:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:421359b39be6469756def666d099b974be1d38ddfde623eb652e1859a9260847"
        occurred_at: "2026-10-09T21:18:42.599Z"
        payload_digest: "sha256:c97e0b7c28b597183c806dd3531d44e9e175cf1adbd5b10e93bc8f226ad56d16"
        task_id: "202610092056-WS6H31"
        task_revision: 7
      -
        command_digest: "sha256:018f9556b305db65baa3c2f8592dbba8e26bd0e03149bebf0a19d8e120cfb231"
        id: "result:sha256:f02e93630fce06aa157fd842ee072dc5a52eeccf32070552a0001bff83975fb2:work_item_result_accepted"
        kind: "work_item_result_accepted"
        mutation_id: "result:sha256:f02e93630fce06aa157fd842ee072dc5a52eeccf32070552a0001bff83975fb2"
        occurred_at: "2026-10-09T21:18:56.622Z"
        payload_digest: "sha256:4c26a445bef46f8f221664c4f97ee6127afd08fc580d40a050e7abd9ccc1d245"
        task_id: "202610092056-WS6H31"
        task_revision: 8
      -
        command_digest: "sha256:1fe9c5f4c1e615255c0ae0a2763eff259fd48d7e855f937dbef4168e7ed351a4"
        id: "kernel_work_item_inspection_required:sha256:82e822abcf8f972067c06bed7eb38f31b3a8f58c1ae6ac3a82beda1123ba832c:sha256:e0042d92dd460a50b74384420e3abdc8439f2d3c4e946e01553288ca6be3f180:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_inspection_required:sha256:82e822abcf8f972067c06bed7eb38f31b3a8f58c1ae6ac3a82beda1123ba832c:sha256:e0042d92dd460a50b74384420e3abdc8439f2d3c4e946e01553288ca6be3f180"
        occurred_at: "2026-10-09T21:19:06.559Z"
        payload_digest: "sha256:59d31e7a530016d47e26d59ed832348e670cdbe3df0d93543d52eecd6bbec917"
        task_id: "202610092056-WS6H31"
        task_revision: 9
      -
        command_digest: "sha256:d3ebedd87a97911d3d9cb0ae5423289444c7ba8cbde37030c6372e6648d4ecbd"
        id: "validation:sha256:1e74d5bfe965b3bd0381175689cc51c4698835c0cedde7de141bb22bd8b11a90:work_item_validation_recorded"
        kind: "work_item_validation_recorded"
        mutation_id: "validation:sha256:1e74d5bfe965b3bd0381175689cc51c4698835c0cedde7de141bb22bd8b11a90"
        occurred_at: "2026-10-09T21:22:21.827Z"
        payload_digest: "sha256:e6db219cb18f877993172d24a5574a76f60763c83bcec2ed327be5afbd1d1262"
        task_id: "202610092056-WS6H31"
        task_revision: 10
      -
        command_digest: "sha256:8b8ffa7a3a9b66fe4076aaab06711a130da8bf7076b7c7696423c3748ad02b69"
        id: "validation-resolution:sha256:57ce668926cce83c67f3dc328a09bff9f43976182a51f5120a107cd54e4acf12:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "validation-resolution:sha256:57ce668926cce83c67f3dc328a09bff9f43976182a51f5120a107cd54e4acf12"
        occurred_at: "2026-10-09T21:22:28.260Z"
        payload_digest: "sha256:93f873b9d59c2f84a775335c1e6ddaded56a75244f1d33960e8b54cd1eefa169"
        task_id: "202610092056-WS6H31"
        task_revision: 11
      -
        command_digest: "sha256:638cf0b138e618795b5a4428f76d6e62696325f1f339f871a61b4a527824b5cc"
        id: "kernel_work_item_rework_claim_required:sha256:390e9a01286d0d4dc90b1f6c2e64a8ba6ecc5bd2157b759b2ebd454fcd6062ef:sha256:e0042d92dd460a50b74384420e3abdc8439f2d3c4e946e01553288ca6be3f180:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_rework_claim_required:sha256:390e9a01286d0d4dc90b1f6c2e64a8ba6ecc5bd2157b759b2ebd454fcd6062ef:sha256:e0042d92dd460a50b74384420e3abdc8439f2d3c4e946e01553288ca6be3f180"
        occurred_at: "2026-10-09T21:22:41.599Z"
        payload_digest: "sha256:b83c4c946cac7783bed014ea352f67089dcfd09b95fed414ae40f161efb9c63d"
        task_id: "202610092056-WS6H31"
        task_revision: 12
      -
        command_digest: "sha256:32fdfeb752579e909c5ee338e07009d082bba01e2b7919135f9917bd7631db86"
        id: "kernel_work_item_execution_required:sha256:6cbd954f1ac311adaebc61b7e9aa648050751fd26725ee38b3a647c5da8ea152:sha256:e0042d92dd460a50b74384420e3abdc8439f2d3c4e946e01553288ca6be3f180:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:6cbd954f1ac311adaebc61b7e9aa648050751fd26725ee38b3a647c5da8ea152:sha256:e0042d92dd460a50b74384420e3abdc8439f2d3c4e946e01553288ca6be3f180"
        occurred_at: "2026-10-09T21:22:51.362Z"
        payload_digest: "sha256:c99093fdb97ef2eb5de5b2df7e2a077423371426056b882cd2eac763ce27eb04"
        task_id: "202610092056-WS6H31"
        task_revision: 13
      -
        command_digest: "sha256:f684a305983a7d8e1aaf96b9d3f34656c0524756d610461df1fd8d744881cc7f"
        id: "sha256:12f4194641df3f8d9c881b3e502ed8062e3e7ab47d5a2769dddbf0ba78c2a7c6:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:12f4194641df3f8d9c881b3e502ed8062e3e7ab47d5a2769dddbf0ba78c2a7c6"
        occurred_at: "2026-10-09T21:26:35.097Z"
        payload_digest: "sha256:91d31435977dccde4e061711edafb9c99bc82cc29cc18915cc534a1da75c016b"
        task_id: "202610092056-WS6H31"
        task_revision: 14
      -
        command_digest: "sha256:5c376dae06f7c0aea469e4715d392e710048fdb4158f5899a452fa5a652732fe"
        id: "result:sha256:9d306941441558a0ba876bcd5631b9a1477660fa4631dc62768ba7f07dabe67e:work_item_result_accepted"
        kind: "work_item_result_accepted"
        mutation_id: "result:sha256:9d306941441558a0ba876bcd5631b9a1477660fa4631dc62768ba7f07dabe67e"
        occurred_at: "2026-10-09T21:26:48.982Z"
        payload_digest: "sha256:bb6f7c7d0e0821d49870e4a187a0e75c80a7cc51929fc279720ee5b1ed8b6cb8"
        task_id: "202610092056-WS6H31"
        task_revision: 15
      -
        command_digest: "sha256:369c1252e2897a2484b04b9c98748b0ebd4297ca653225e32c788fcae493adc2"
        id: "kernel_work_item_inspection_required:sha256:8d2485b061e65060f84177cdb509be6dd9d6313257b4f31b139b4a24cd62bd64:sha256:eeb14096b1060fe1857c188626c4151755d70aeecac015c7ba126cbc21cdf75d:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_inspection_required:sha256:8d2485b061e65060f84177cdb509be6dd9d6313257b4f31b139b4a24cd62bd64:sha256:eeb14096b1060fe1857c188626c4151755d70aeecac015c7ba126cbc21cdf75d"
        occurred_at: "2026-10-09T21:26:59.624Z"
        payload_digest: "sha256:c09c4ccf9770a2dae8a04f41f869d24cab69bce332f64ee9cebd37860cf4ca38"
        task_id: "202610092056-WS6H31"
        task_revision: 16
      -
        command_digest: "sha256:796a79da7fab7458d9383f17277f3c17c2328806d8ffa274dfa82b894887f5d9"
        id: "validation:sha256:9e473320c915633d268e69669373325619e383c2bdfeb8d3608eec0d4e93df6b:work_item_validation_recorded"
        kind: "work_item_validation_recorded"
        mutation_id: "validation:sha256:9e473320c915633d268e69669373325619e383c2bdfeb8d3608eec0d4e93df6b"
        occurred_at: "2026-10-09T21:29:54.168Z"
        payload_digest: "sha256:24fff27514128fda604bbcb0137c580d28fc08de41fa136d369641f1080c9a8b"
        task_id: "202610092056-WS6H31"
        task_revision: 17
      -
        command_digest: "sha256:a6b23bf2783ff004877e3f13514d175fec0c754384f3b9f191e1509e1b74e5a8"
        id: "validation-resolution:sha256:34792b74aa21951802f5831728fae5c09a2e4b56491a442d251a0646715581dc:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "validation-resolution:sha256:34792b74aa21951802f5831728fae5c09a2e4b56491a442d251a0646715581dc"
        occurred_at: "2026-10-09T21:30:01.666Z"
        payload_digest: "sha256:d3fdc2edbf64a9ef31cb0104aa624afc3b05ded85017b93eaa4a5dbc0d22049a"
        task_id: "202610092056-WS6H31"
        task_revision: 18
      -
        command_digest: "sha256:c5b6d635cad22d8a015cd2c950ff86c7a296533325d77535ae48502f5bf2c1c2"
        id: "final-validation:sha256:004d97c50f7596a326e247e150eda25a87b6758d690f56e743379ee4d069ccf0:18:final_validation_recorded"
        kind: "final_validation_recorded"
        mutation_id: "final-validation:sha256:004d97c50f7596a326e247e150eda25a87b6758d690f56e743379ee4d069ccf0:18"
        occurred_at: "2026-10-09T21:42:29.717Z"
        payload_digest: "sha256:061b64c43e766deec68402b745cdbeebf06d7f074e836a20923db1df75ee5a64"
        task_id: "202610092056-WS6H31"
        task_revision: 19
      -
        command_digest: "sha256:340f108efcd9843d2b1082758ba73d77798c93a13753c1e9dbf28863e509f286"
        id: "final-validation:sha256:fc26d3df5ffbed5e88b8ab7e77c1491e955edcd754adcac3bb91280810df6e39:19:final_validation_recorded"
        kind: "final_validation_recorded"
        mutation_id: "final-validation:sha256:fc26d3df5ffbed5e88b8ab7e77c1491e955edcd754adcac3bb91280810df6e39:19"
        occurred_at: "2026-10-10T08:42:21.415Z"
        payload_digest: "sha256:c70458916fe937f2d46d61147f98cd6d9c9423e9601ab09a233c4b1b64d13409"
        task_id: "202610092056-WS6H31"
        task_revision: 20
      -
        command_digest: "sha256:1db90589cc9ae968e805542ecc68d60ff72229dfdd05bb42b0f7eb3588795bf7"
        id: "amend:sha256:838499da9353617f2b624adcd6434b65df29b62fe4d59ab4717a3689add4f254:plan_amended"
        kind: "plan_amended"
        mutation_id: "amend:sha256:838499da9353617f2b624adcd6434b65df29b62fe4d59ab4717a3689add4f254"
        occurred_at: "2026-10-10T08:46:19.406Z"
        payload_digest: "sha256:d049cb1e030556feda78544ec6c82b985af2bf44050f0211b2dd4e1586a587f7"
        task_id: "202610092056-WS6H31"
        task_revision: 21
      -
        command_digest: "sha256:b1a1ea21634d74ed50304ea0cee83a747335963211f34c749d5c4730f8b192a5"
        id: "sha256:b350edde10a47c734598e44762f313fd45cd65f45e0b2e8ed380cb8c30c124ff:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:b350edde10a47c734598e44762f313fd45cd65f45e0b2e8ed380cb8c30c124ff"
        occurred_at: "2026-10-10T08:46:24.974Z"
        payload_digest: "sha256:be3663b3e19de3c102755ce6c68afb0345ff05ad1ecd659f29a48e6a01df736c"
        task_id: "202610092056-WS6H31"
        task_revision: 22
      -
        command_digest: "sha256:9f3bac8d82bb3afbc2ed579687df7745e36fe90db9c963f74f167d2790adce92"
        id: "kernel_work_item_claim_required:sha256:5d0edcb3375d640408ef2c2a4827ee8ea56a5ffb8cf9b51c1ea12fbd6f5006a0:sha256:eeb14096b1060fe1857c188626c4151755d70aeecac015c7ba126cbc21cdf75d:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:5d0edcb3375d640408ef2c2a4827ee8ea56a5ffb8cf9b51c1ea12fbd6f5006a0:sha256:eeb14096b1060fe1857c188626c4151755d70aeecac015c7ba126cbc21cdf75d"
        occurred_at: "2026-10-10T08:46:48.140Z"
        payload_digest: "sha256:cef1e95dbfd67cac8cd925768badce5ee5e942662a72361f0aa8ef2d416e79f6"
        task_id: "202610092056-WS6H31"
        task_revision: 23
      -
        command_digest: "sha256:78db6fe81c50c0b9ecf6631c6a39561428783ef7f798fba85d1146930d6b492a"
        id: "kernel_work_item_execution_required:sha256:e8a291910c79b1f61bb4459d7b35cc9f3fe38e49aab65326123a9d0e903dc113:sha256:eeb14096b1060fe1857c188626c4151755d70aeecac015c7ba126cbc21cdf75d:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:e8a291910c79b1f61bb4459d7b35cc9f3fe38e49aab65326123a9d0e903dc113:sha256:eeb14096b1060fe1857c188626c4151755d70aeecac015c7ba126cbc21cdf75d"
        occurred_at: "2026-10-10T08:46:57.024Z"
        payload_digest: "sha256:25fc799cbaea476a6a4f8cc85abc4fd5fad922d8757330254f9c97111bdb2c54"
        task_id: "202610092056-WS6H31"
        task_revision: 24
      -
        command_digest: "sha256:a369e63d4536ff2aaa3b01235cc509eb7d22268ad246f5b5e1514dea0ed2fdc5"
        id: "sha256:337d5a149f92ab7efed9f58148507c56a149cbd887bc51ad68f78347179f453e:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:337d5a149f92ab7efed9f58148507c56a149cbd887bc51ad68f78347179f453e"
        occurred_at: "2026-10-10T09:01:49.288Z"
        payload_digest: "sha256:05a272d24a0e435d82cf2c9bd2a9bf25c76dcef20a7eaf850b7a2de999d8be3b"
        task_id: "202610092056-WS6H31"
        task_revision: 25
      -
        command_digest: "sha256:3842a4a1a76706bdcff92c187536218d9306fd0e3b451e1de4d94e0d68a160ad"
        id: "result:sha256:546deb5bc075c5114a505e4b1203dd72f9f87eb9bd6dae5a4de8c81ed559bc0e:work_item_result_accepted"
        kind: "work_item_result_accepted"
        mutation_id: "result:sha256:546deb5bc075c5114a505e4b1203dd72f9f87eb9bd6dae5a4de8c81ed559bc0e"
        occurred_at: "2026-10-10T09:08:32.509Z"
        payload_digest: "sha256:0e67667c6876dfaf859630ccf07b6f9b1d617b5a2caf96dcae2605f9a8beb345"
        task_id: "202610092056-WS6H31"
        task_revision: 26
      -
        command_digest: "sha256:e0b8ae2f71704707876d8f65e06176c002e8bb452e2a6c0eaa94a3a99336857b"
        id: "kernel_work_item_inspection_required:sha256:3aacbc6c9e18e96ec49cdd8a7d19e580a3adea53dfd05122b3b94d1b3d6d7ea0:sha256:99bf2816b1e084d95815cc175b980a1ff70ff54afa9d6e5302a795952dbb77fe:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_inspection_required:sha256:3aacbc6c9e18e96ec49cdd8a7d19e580a3adea53dfd05122b3b94d1b3d6d7ea0:sha256:99bf2816b1e084d95815cc175b980a1ff70ff54afa9d6e5302a795952dbb77fe"
        occurred_at: "2026-10-10T09:08:49.486Z"
        payload_digest: "sha256:a6b9393b728eff7d50e5310deb6401fea9252fbd392b0fedbc3fb37467df9c63"
        task_id: "202610092056-WS6H31"
        task_revision: 27
      -
        command_digest: "sha256:931dc88e866d67e768966daa99d4d1f6af2540958bf18b7cfaeefef3d90f6d48"
        id: "validation:sha256:0a52addc49f2fc34165edbd72a7fea9fbc2c0abc436d3aa94f995a5a4a7a657e:work_item_validation_recorded"
        kind: "work_item_validation_recorded"
        mutation_id: "validation:sha256:0a52addc49f2fc34165edbd72a7fea9fbc2c0abc436d3aa94f995a5a4a7a657e"
        occurred_at: "2026-10-10T09:17:54.031Z"
        payload_digest: "sha256:a43e5e79e2536f385f2e6bb8563438e2c36b1e138d99185bd53bf0ea892cd36b"
        task_id: "202610092056-WS6H31"
        task_revision: 28
      -
        command_digest: "sha256:f460e3a077d7b60d5493e874164184dcb6a38472d09c3085aa6c463b155d94da"
        id: "validation-resolution:sha256:9ce9e434c47011786c4e28717c5ef819b4dd3bba388bb423317b1e8342626751:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "validation-resolution:sha256:9ce9e434c47011786c4e28717c5ef819b4dd3bba388bb423317b1e8342626751"
        occurred_at: "2026-10-10T09:18:01.802Z"
        payload_digest: "sha256:be14b62c42657d443241819bd50e2af1d1abb7355782ab6d19d2d7f55871def7"
        task_id: "202610092056-WS6H31"
        task_revision: 29
      -
        command_digest: "sha256:2906fb45566303811644be646ea74259adb126e3a0381c132a100e708abbe091"
        id: "final-validation:sha256:f78912693c7e2ffe0c5f79199c1daea8f85935311f04fe37f92c252aaacb3487:29:final_validation_recorded"
        kind: "final_validation_recorded"
        mutation_id: "final-validation:sha256:f78912693c7e2ffe0c5f79199c1daea8f85935311f04fe37f92c252aaacb3487:29"
        occurred_at: "2026-10-10T09:58:49.749Z"
        payload_digest: "sha256:a1cf56c6b5ad483cf6fee0b4cccda6265837251b8e79958d76fd7f459023bbae"
        task_id: "202610092056-WS6H31"
        task_revision: 30
      -
        command_digest: "sha256:e10b9503e1ecb0be22abbc5991bfd239cecfc652b6b319966f87b79e094a783b"
        id: "amend:sha256:86441b742d0944f42a36c484974a596d3337de0221f822cb6d27708ef67048b6:plan_amended"
        kind: "plan_amended"
        mutation_id: "amend:sha256:86441b742d0944f42a36c484974a596d3337de0221f822cb6d27708ef67048b6"
        occurred_at: "2026-10-10T10:02:00.635Z"
        payload_digest: "sha256:ad0f3a22e7d6f8063bc05e61f6e60f318b5b07647ffe4c79378df106d8424529"
        task_id: "202610092056-WS6H31"
        task_revision: 31
      -
        command_digest: "sha256:520877341f4c5f6d68461d5c0c72944f4316b443e795768631f43904648a79f4"
        id: "sha256:abbbb089504b0e088030b7d89d4459719652a2bdc339a1097db72a85c201839c:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:abbbb089504b0e088030b7d89d4459719652a2bdc339a1097db72a85c201839c"
        occurred_at: "2026-10-10T10:02:07.720Z"
        payload_digest: "sha256:6b0f9b979513ff748ce5c95191c6a22e38213e59f0f8c1b26ecc8051ae00244f"
        task_id: "202610092056-WS6H31"
        task_revision: 32
      -
        command_digest: "sha256:33c1a76dee17896c574a278b675ed72710d152946a817020818ea5cd2c1df85a"
        id: "kernel_work_item_claim_required:sha256:83cabcefe5d75c65c42eb0623933d2d7f176f1b52d905377bbc5311134e3d5b7:sha256:99bf2816b1e084d95815cc175b980a1ff70ff54afa9d6e5302a795952dbb77fe:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:83cabcefe5d75c65c42eb0623933d2d7f176f1b52d905377bbc5311134e3d5b7:sha256:99bf2816b1e084d95815cc175b980a1ff70ff54afa9d6e5302a795952dbb77fe"
        occurred_at: "2026-10-10T10:02:32.654Z"
        payload_digest: "sha256:e14313ad63cc38e30e2db52adf8f8fc2babbc3ae4a41e0fcc66a82921e297fd9"
        task_id: "202610092056-WS6H31"
        task_revision: 33
      -
        command_digest: "sha256:fbef3fbfe58c50f21850daea0601fac961c593aeedca42a63867551be3ddb0b4"
        id: "kernel_work_item_execution_required:sha256:d2db16e979b191826e90cde56336cce1d9116c40fca7e982b0c70df3549affee:sha256:99bf2816b1e084d95815cc175b980a1ff70ff54afa9d6e5302a795952dbb77fe:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:d2db16e979b191826e90cde56336cce1d9116c40fca7e982b0c70df3549affee:sha256:99bf2816b1e084d95815cc175b980a1ff70ff54afa9d6e5302a795952dbb77fe"
        occurred_at: "2026-10-10T10:02:40.693Z"
        payload_digest: "sha256:2c8825f2df1e5d586f549f034a6d8d55cf0206c93a79a641b229b209ac66991e"
        task_id: "202610092056-WS6H31"
        task_revision: 34
      -
        command_digest: "sha256:e4d4f8d495a48df64192571eeee36e6359a35fb47a340f7e60655118cf26c8a4"
        id: "semantic-stop:sha256:64128048665700b0a499beeadf23104d5e5acc14b7dc1cfcbb44520cae548bc2:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "semantic-stop:sha256:64128048665700b0a499beeadf23104d5e5acc14b7dc1cfcbb44520cae548bc2"
        occurred_at: "2026-10-10T10:03:21.765Z"
        payload_digest: "sha256:83321e093d0911e15803219e1bae99ce3af4c42e0b036b7c46cb3b59f6111cef"
        task_id: "202610092056-WS6H31"
        task_revision: 35
      -
        command_digest: "sha256:77bf04eda67a77d6e441ecce9803837451396b858b618c42e53c7bd15e65a9b4"
        id: "work-item-resume:sha256:e2ab746280bde3b32d139e7849da452270cbf43b05b81d46a2ca7fc4fa47613b:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "work-item-resume:sha256:e2ab746280bde3b32d139e7849da452270cbf43b05b81d46a2ca7fc4fa47613b"
        occurred_at: "2026-10-10T10:23:28.969Z"
        payload_digest: "sha256:2084d650d60628b69a6d243d48c76aa0d22b9d65927a8ff32ce6527ccf564ad9"
        task_id: "202610092056-WS6H31"
        task_revision: 36
      -
        command_digest: "sha256:43aba2aa014a86e4166f942c023d82f1d0dea45260a32fa570a15832ace20f65"
        id: "kernel_work_item_claim_required:sha256:d74e6ac8914022bc577ff4cd46a8b876b3f71d6572649669914e538a967ac1e3:sha256:99bf2816b1e084d95815cc175b980a1ff70ff54afa9d6e5302a795952dbb77fe:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:d74e6ac8914022bc577ff4cd46a8b876b3f71d6572649669914e538a967ac1e3:sha256:99bf2816b1e084d95815cc175b980a1ff70ff54afa9d6e5302a795952dbb77fe"
        occurred_at: "2026-10-10T10:23:48.911Z"
        payload_digest: "sha256:4b57ae96bbb30b8ddf86b349a9cf7ad9ef25bfaba3a6768eec3e07df7deebdc0"
        task_id: "202610092056-WS6H31"
        task_revision: 37
      -
        command_digest: "sha256:c5ccd4badf27c72ae935320404291aac3f521c861adac4a1450c8b36a699b1f4"
        id: "kernel_work_item_execution_required:sha256:912dee4af2e70438b8321755bce77032041203dc40f1feccfd02d35c1c0d674b:sha256:99bf2816b1e084d95815cc175b980a1ff70ff54afa9d6e5302a795952dbb77fe:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:912dee4af2e70438b8321755bce77032041203dc40f1feccfd02d35c1c0d674b:sha256:99bf2816b1e084d95815cc175b980a1ff70ff54afa9d6e5302a795952dbb77fe"
        occurred_at: "2026-10-10T10:23:57.593Z"
        payload_digest: "sha256:3d6e5aa65da47bbe339aa7dc612be0526a101e886703c7d258cbf804ec6dc165"
        task_id: "202610092056-WS6H31"
        task_revision: 38
      -
        command_digest: "sha256:687431415dc5430e6310e0ec07843812222982d90295154acfdfc7764de63404"
        id: "sha256:2fe396d946d4695ddba545d02317809873bbb067de6676239e7b1c048de54f59:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:2fe396d946d4695ddba545d02317809873bbb067de6676239e7b1c048de54f59"
        occurred_at: "2026-10-10T10:50:02.213Z"
        payload_digest: "sha256:5e7484cdf30ffeb839d17cc2e65c9200c218daaa47d31d5597f5fac21bee8a34"
        task_id: "202610092056-WS6H31"
        task_revision: 39
      -
        command_digest: "sha256:6ca73a486213ac2e47730110247ded754883209109459e32135d39d88bb25f8c"
        id: "result:sha256:6186730c458f01deade7b4e3a86b225cc210d34f90865e08fafdfc2bcc6c12e2:work_item_result_accepted"
        kind: "work_item_result_accepted"
        mutation_id: "result:sha256:6186730c458f01deade7b4e3a86b225cc210d34f90865e08fafdfc2bcc6c12e2"
        occurred_at: "2026-10-10T10:52:57.894Z"
        payload_digest: "sha256:02e56ca4228d1b488cc08e66cb1796f71f1caa0d5001df8a6ab8234419e2281a"
        task_id: "202610092056-WS6H31"
        task_revision: 40
      -
        command_digest: "sha256:059375709ff0df9edb7365669ac8de0c92df5b63af5c6ebbadfc170f30263934"
        id: "kernel_work_item_inspection_required:sha256:a59bf8fd39db4073ae2e01754c6ac166cae0af66b55b1ceae9c832d920a06e2d:sha256:d29669a68097b4418cb7d156d65b9d5dc196769dc0510c6e70a804988f89e12e:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_inspection_required:sha256:a59bf8fd39db4073ae2e01754c6ac166cae0af66b55b1ceae9c832d920a06e2d:sha256:d29669a68097b4418cb7d156d65b9d5dc196769dc0510c6e70a804988f89e12e"
        occurred_at: "2026-10-10T10:53:07.541Z"
        payload_digest: "sha256:6d756eeb8cec9f82fc6087e919673e23c7375d61274786e32bffd6144934d617"
        task_id: "202610092056-WS6H31"
        task_revision: 41
      -
        command_digest: "sha256:6ac634f983e87c61f3f3058c9104b101759a9e628e7e72af903443293219fb7a"
        id: "validation:sha256:d341b29302dfe0f356f1b1c74369ccfb34634f5ef759ab1c3ec0342e69aeb541:work_item_validation_recorded"
        kind: "work_item_validation_recorded"
        mutation_id: "validation:sha256:d341b29302dfe0f356f1b1c74369ccfb34634f5ef759ab1c3ec0342e69aeb541"
        occurred_at: "2026-10-10T10:57:00.593Z"
        payload_digest: "sha256:8a38433c245d154314423fb60ada21129fafda1cb76a95c204af10b836dff76a"
        task_id: "202610092056-WS6H31"
        task_revision: 42
      -
        command_digest: "sha256:45358560c9025d49eaf9552d42f4b2e005e69507da1e778775efcfe7a82a1676"
        id: "validation-resolution:sha256:0a47da8dc8515e41ee70bf1b958e2b6c71f0602846826150beb0f87d4cd2bbdc:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "validation-resolution:sha256:0a47da8dc8515e41ee70bf1b958e2b6c71f0602846826150beb0f87d4cd2bbdc"
        occurred_at: "2026-10-10T10:57:08.055Z"
        payload_digest: "sha256:0bcd5e2250d1b29f52698da2f1f0735696491baf0d0977d6ec4841af151706da"
        task_id: "202610092056-WS6H31"
        task_revision: 43
      -
        command_digest: "sha256:c625d2935ca69c2b89ecdc34556c770346cb85ddbd16ab0671d8c11c859135ff"
        id: "final-validation:sha256:b43d4bd8da9590a61b5fd408a398fc3481dd00bab0917e092a89e9d7a11c3aa6:43:final_validation_recorded"
        kind: "final_validation_recorded"
        mutation_id: "final-validation:sha256:b43d4bd8da9590a61b5fd408a398fc3481dd00bab0917e092a89e9d7a11c3aa6:43"
        occurred_at: "2026-10-10T12:51:03.536Z"
        payload_digest: "sha256:c8a7d153b79a6a84097b46bceefc00eedf0de2a3cd6705a08e867572e66479b2"
        task_id: "202610092056-WS6H31"
        task_revision: 44
      -
        command_digest: "sha256:98c937087162c18c98fbf5bf0a03117ae8fc0c03002ae2b78d043f9a7317e2f2"
        id: "kernel_task_completion_required:sha256:aea6b2bd147d1781e3c020efd19ebc4b4a346306436edf3871ab7669f48c24c0:sha256:d29669a68097b4418cb7d156d65b9d5dc196769dc0510c6e70a804988f89e12e:task_completed"
        kind: "task_completed"
        mutation_id: "kernel_task_completion_required:sha256:aea6b2bd147d1781e3c020efd19ebc4b4a346306436edf3871ab7669f48c24c0:sha256:d29669a68097b4418cb7d156d65b9d5dc196769dc0510c6e70a804988f89e12e"
        occurred_at: "2026-10-10T12:57:19.797Z"
        payload_digest: "sha256:1f4cd32004104ed4bbe051b4f3f79cc698f1b16e164ce3eabcb6ace0b37b2828"
        task_id: "202610092056-WS6H31"
        task_revision: 45
    kind: "canonical_task"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
id_source: "generated"
---
## Summary

Review and update compatibility candidate for CLI help changes in PR 6095

The PR 6095 verify-contract job fails at reviewed Recipe V2 section inventory drift because the CLI topology digest changed from 1b2e5a... to d14dab... after fixing issue 6076. Review the exact CLI topology delta, update only the approved compatibility candidate and guard as warranted, preserve rejected-recapture protections, and validate the GitHub contract check. This is a corrective follow-up to the existing PR, not a release or package version change.

## Scope

- In scope: The PR 6095 verify-contract job fails at reviewed Recipe V2 section inventory drift because the CLI topology digest changed from 1b2e5a... to d14dab... after fixing issue 6076. Review the exact CLI topology delta, update only the approved compatibility candidate and guard as warranted, preserve rejected-recapture protections, and validate the GitHub contract check. This is a corrective follow-up to the existing PR, not a release or package version change.
- Out of scope: unrelated refactors not required for "Review and update compatibility candidate for CLI help changes in PR 6095".

## Plan

1. Execute approved WorkItem review-compatibility-delta.
2. Execute approved WorkItem final-correction-fc26d3df5ffb.
3. Execute approved WorkItem final-correction-f78912693c7e.

## Verify Steps

PLANNER fallback scaffold for "Review and update compatibility candidate for CLI help changes in PR 6095". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Review and update compatibility candidate for CLI help changes in PR 6095". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-10-10T11:52:31.354Z — VERIFY — ok

By: SUPERVISOR

Note: Verified: canonical Task Kernel final checks passed.
Attempts: 0

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:2d2aaea644d6f83c9949b5cac2c1454bb33763963143d109a4abcd4eda891f57, input_digest=sha256:5a4c5d4539f0cfe75bd8f2336e902ee50e70c128adf653be45ec61d5e63283c7

Details:

Check: affected_unit_integration
Command: bun run bench:compatibility:candidate:check
Result: pass
Evidence: .agentplane/tasks/202610092056-WS6H31/supervision/declared-checks.json#check-1
Scope: branch_pr task 202610092056-WS6H31 Verification Contract check affected_unit_integration (1/4)

Check: affected_unit_integration
Command: bun run bench:compatibility:check
Result: pass
Evidence: .agentplane/tasks/202610092056-WS6H31/supervision/declared-checks.json#check-2
Scope: branch_pr task 202610092056-WS6H31 Verification Contract check affected_unit_integration (2/4)

Check: affected_unit_integration
Command: bun run format:check
Result: pass
Evidence: .agentplane/tasks/202610092056-WS6H31/supervision/declared-checks.json#check-3
Scope: branch_pr task 202610092056-WS6H31 Verification Contract check affected_unit_integration (3/4)

Check: affected_unit_integration
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202610092056-WS6H31/supervision/declared-checks.json#check-4
Scope: branch_pr task 202610092056-WS6H31 Verification Contract check affected_unit_integration (4/4)

Check: critical_paths
Command: bun run bench:compatibility:candidate:check
Result: pass
Evidence: .agentplane/tasks/202610092056-WS6H31/supervision/declared-checks.json#check-1
Scope: branch_pr task 202610092056-WS6H31 Verification Contract check critical_paths (1/4)

Check: critical_paths
Command: bun run bench:compatibility:check
Result: pass
Evidence: .agentplane/tasks/202610092056-WS6H31/supervision/declared-checks.json#check-2
Scope: branch_pr task 202610092056-WS6H31 Verification Contract check critical_paths (2/4)

Check: critical_paths
Command: bun run format:check
Result: pass
Evidence: .agentplane/tasks/202610092056-WS6H31/supervision/declared-checks.json#check-3
Scope: branch_pr task 202610092056-WS6H31 Verification Contract check critical_paths (3/4)

Check: critical_paths
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202610092056-WS6H31/supervision/declared-checks.json#check-4
Scope: branch_pr task 202610092056-WS6H31 Verification Contract check critical_paths (4/4)

Check: docs_contract
Command: bun run bench:compatibility:candidate:check
Result: pass
Evidence: .agentplane/tasks/202610092056-WS6H31/supervision/declared-checks.json#check-1
Scope: branch_pr task 202610092056-WS6H31 Verification Contract check docs_contract (1/4)

Check: docs_contract
Command: bun run bench:compatibility:check
Result: pass
Evidence: .agentplane/tasks/202610092056-WS6H31/supervision/declared-checks.json#check-2
Scope: branch_pr task 202610092056-WS6H31 Verification Contract check docs_contract (2/4)

Check: docs_contract
Command: bun run format:check
Result: pass
Evidence: .agentplane/tasks/202610092056-WS6H31/supervision/declared-checks.json#check-3
Scope: branch_pr task 202610092056-WS6H31 Verification Contract check docs_contract (3/4)

Check: docs_contract
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202610092056-WS6H31/supervision/declared-checks.json#check-4
Scope: branch_pr task 202610092056-WS6H31 Verification Contract check docs_contract (4/4)

Check: full_regression
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202610092056-WS6H31/supervision/declared-checks.json#check-4
Scope: branch_pr task 202610092056-WS6H31 Verification Contract check full_regression

Check: task_outcome
Command: bun run bench:compatibility:candidate:check
Result: pass
Evidence: .agentplane/tasks/202610092056-WS6H31/supervision/declared-checks.json#check-1
Scope: branch_pr task 202610092056-WS6H31 Verification Contract check task_outcome (1/4)

Check: task_outcome
Command: bun run bench:compatibility:check
Result: pass
Evidence: .agentplane/tasks/202610092056-WS6H31/supervision/declared-checks.json#check-2
Scope: branch_pr task 202610092056-WS6H31 Verification Contract check task_outcome (2/4)

Check: task_outcome
Command: bun run format:check
Result: pass
Evidence: .agentplane/tasks/202610092056-WS6H31/supervision/declared-checks.json#check-3
Scope: branch_pr task 202610092056-WS6H31 Verification Contract check task_outcome (3/4)

Check: task_outcome
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202610092056-WS6H31/supervision/declared-checks.json#check-4
Scope: branch_pr task 202610092056-WS6H31 Verification Contract check task_outcome (4/4)

NativeTaskIdentityRef:
- plan_digest: sha256:86441b742d0944f42a36c484974a596d3337de0221f822cb6d27708ef67048b6
- policy_digest: sha256:0a1c23b8d8d34f5109077402d56c9e1fcde960daddafaea20ba2824992dfef7f
- capability_digest: sha256:ed73e7a6b8130531e435ae7307ee1c88ebd05d54f2fdd1f8e55eb67079748de9
- checks_digest: sha256:aae24f3cf1ccc0877c88c221275cf9923adb88a484c496ddfc543c14f16c5b74
- identity_digest: sha256:392b94db5202edbf7cdf94aabce10cd41b5f4351a28c41c1b461f0f4789396d7

DecisionContextRef:
- operator_action: provider_action
- can_execute_now: false
- safe_command: none
- diagnostic_command: none
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

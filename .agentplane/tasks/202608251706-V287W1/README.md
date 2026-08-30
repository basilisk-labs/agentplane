---
id: "202608251706-V287W1"
title: "AP-RUNTIME-001 Make local execution runtime deterministic"
result_summary: "pre-merge closure"
status: "DONE"
priority: "med"
owner: "CODER"
revision: 44
origin:
  system: "manual"
depends_on: []
tags:
  - "core-clean-break"
  - "recovery"
  - "risk-high"
  - "roadmap"
  - "runtime-environment"
  - "verification"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "bun run ci:local:full"
  - "git diff --check"
plan_approval:
  state: "approved"
  updated_at: "2026-08-30T02:57:20.979Z"
  updated_by: "USER"
  note: "Approved under the user standing authorization for all subsequent in-scope Clean Task Core plans and the explicit instruction to finish the refactoring. This retained runtime prerequisite covers local executable resolution, environment propagation, tests and evidence only; no release, credential or remote-runtime changes."
verification:
  state: "ok"
  updated_at: "2026-08-30T08:11:15.015Z"
  updated_by: "SUPERVISOR"
  note: "Verified: CLI-owned declared checks passed; independent EVALUATOR review is pending."
  attempts: 0
quality_review:
  state: "pass"
  provenance: "evaluator_supplied"
  updated_at: "2026-08-30T08:36:18.504Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR returned pass with 4 typed finding(s)."
  evaluated_sha: "26b69b0fece6e4d9a8dfd013d6cafefadd4acf61"
  blueprint_digest: "1e66c76a78609a97f5cd128422e5e2722d341505f5b69118c1434c54aa793981"
  evidence_refs:
    - ".agentplane/tasks/202608251706-V287W1/quality/20260830-083531347-recovery-context/evaluator-work-order.json"
    - ".agentplane/tasks/202608251706-V287W1/quality/20260830-083531347-recovery-context/quality-report.json"
    - ".agentplane/tasks/202608251706-V287W1/quality/objects/sha256/a97c0bc6c09677173c191f887123546cf6b6600e571ddfcc30a92f48c4791120.md"
    - ".agentplane/tasks/202608251706-V287W1/quality/20260830-083531347-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202608251706-V287W1/quality/20260830-083531347-recovery-context/evaluator-result.json"
    - ".agentplane/tasks/202608251706-V287W1/quality/20260830-083531347-recovery-context/evaluator-evidence-manifest.json"
    - ".agentplane/tasks/202608251706-V287W1/README.md"
    - ".agentplane/tasks/202608251706-V287W1/quality/objects/sha256/59372fd7e1eb14ddeee2f0f8a1dd5dc2a6aca5631402b026475a6272cbf93a4b.patch"
    - ".agentplane/tasks/202608251706-V287W1/quality/objects/sha256/748cd92033b5ef7ccd952b387c265796da22207b471f228e089eb4a916d80ca5.json"
    - ".agentplane/tasks/202608251706-V287W1/verification/20260830081115015-c2db9bdb55e298d1.json"
    - ".agentplane/tasks/202608251706-V287W1/quality/objects/sha256/b724ae0edf9bc8c91af145edbf996f54aea38e60d9a39f39c83a0e333a911643.json"
    - ".agentplane/policy/dod.code.md"
    - ".agentplane/policy/dod.core.md"
    - ".agentplane/policy/security.must.md"
    - ".agentplane/policy/workflow.branch_pr.md"
  findings:
    - "Shared runtime normalization reaches supervised process launch, invocation identity and direct verification. Explicit profile PATH precedence and deterministic supported fallback selection are preserved."
    - "Executable, Node/Bun toolchain and runtime-selection environment digests bind prepared input and execution receipts. Missing/unexecutable runtime errors remain infrastructure failures."
    - "Conflict resolution preserves dotenv isolation before runtime selection. No quality receipt or immutable evidence was hand-edited. Historical direct-supervision metadata targets the earlier implementation; the fresh exact-merge verification record is the authoritative check evidence."
    - "All 48 focused tests passed across five runtime, production propagation, verification environment and prepared-input security suites."
token_usage:
  agent_runs: 10
  input_tokens: null
  journal_digest: "sha256:424572f81eb1a5dda819be965735984db1ce3fc543bdad3a5efc410c68528f9b"
  observed_agent_runs: 0
  observed_by: "agentplane"
  output_tokens: null
  reasoning_tokens: null
  schema_version: 1
  source: "supervisor_journal"
  state: "unavailable"
  total_tokens: null
  unavailable_reason: "provider_token_telemetry_unavailable"
  updated_at: "2026-08-30T05:20:24.205Z"
execution_route:
  frozen: true
  reason_codes:
    - "agent_preferred_branch_pr"
    - "effect_security_boundary"
    - "repository_branch_pr_floor"
  repository_mode: "branch_pr"
  requested_mode: "branch_pr"
  schema_version: 1
  selected_mode: "branch_pr"
execution_contract:
  authority:
    allowed_external_effects: []
    allowed_repository_effects:
      - "documentation"
      - "repository_write"
      - "security_boundary"
      - "source_code"
      - "tests"
    forbidden_external_effects:
      - "network_read"
      - "external_write"
      - "credentials"
      - "publish"
      - "deploy"
      - "destructive_git"
    forbidden_repository_effects:
      - "public_api"
      - "schema"
      - "dependencies"
      - "ci"
      - "release_metadata"
    writable_roots:
      - "docs/developer"
      - "packages/agentplane/src/commands/shared/pr-meta"
      - "packages/agentplane/src/commands/task"
      - "packages/agentplane/src/runner"
      - "packages/agentplane/src/shared"
  declaration:
    external_effects: []
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "Changes affect local executable discovery and subprocess environments across shared production paths. A task worktree and full regression are required. No credentials, publication or remote runtime changes are authorized."
    repository_effects:
      - "documentation"
      - "repository_write"
      - "security_boundary"
      - "source_code"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "reversible"
    schema_version: 2
    scope_roots:
      - "docs/developer"
      - "packages/agentplane/src/commands/shared/pr-meta"
      - "packages/agentplane/src/commands/task"
      - "packages/agentplane/src/runner"
      - "packages/agentplane/src/shared"
  observed:
    authority_violations:
      - "verification:verification-record:fail"
      - "writable_scope:.agentplane/policy/incidents.md"
      - "writable_scope:.agentplane/tasks/202608260947-C6WV4T/README.md"
      - "writable_scope:.agentplane/tasks/202608260947-C6WV4T/blueprint/resolved-snapshot.json"
      - "writable_scope:.agentplane/tasks/202608260947-C6WV4T/pr/diffstat.txt"
      - "writable_scope:.agentplane/tasks/202608260947-C6WV4T/pr/github-body.md"
      - "writable_scope:.agentplane/tasks/202608260947-C6WV4T/pr/github-title.txt"
      - "writable_scope:.agentplane/tasks/202608260947-C6WV4T/pr/meta.json"
      - "writable_scope:.agentplane/tasks/202608260947-C6WV4T/pr/review.md"
      - "writable_scope:.agentplane/tasks/202608260947-C6WV4T/quality/20260826-105227686-recovery-context/evaluator-evidence-manifest.json"
      - "writable_scope:.agentplane/tasks/202608260947-C6WV4T/quality/20260826-105227686-recovery-context/evaluator-opinion.md"
      - "writable_scope:.agentplane/tasks/202608260947-C6WV4T/quality/20260826-105227686-recovery-context/evaluator-result.json"
      - "writable_scope:.agentplane/tasks/202608260947-C6WV4T/quality/20260826-105227686-recovery-context/evaluator-work-order.json"
      - "writable_scope:.agentplane/tasks/202608260947-C6WV4T/quality/20260826-105227686-recovery-context/quality-report.json"
      - "writable_scope:.agentplane/tasks/202608260947-C6WV4T/quality/objects/sha256/28aeeca59baccc008fa96c5a1bba3e1c91e889eb8923ebefbcb1b317c408ece3.json"
      - "writable_scope:.agentplane/tasks/202608260947-C6WV4T/quality/objects/sha256/36e8a2a2c1b50ad817232abbdf1c90c83549c46da46de70003fc3d19c5b09703.md"
      - "writable_scope:.agentplane/tasks/202608260947-C6WV4T/quality/objects/sha256/9037cdf98253e70333ede9358d360264a85ee905be64a8723bbdd4ca71e02d4a.json"
      - "writable_scope:.agentplane/tasks/202608260947-C6WV4T/quality/objects/sha256/a39e66da8555d830d71298b5c64fbb5d3f50103573bc66640d89a196ba0621f8.json"
      - "writable_scope:.agentplane/tasks/202608260947-C6WV4T/quality/objects/sha256/ed5ff1bc96ab14843609d69b953efe9aa1d3a4216026cfbf5f6e2c2c67562c10.patch"
      - "writable_scope:.agentplane/tasks/202608260947-C6WV4T/supervision/declared-checks.json"
      - "writable_scope:.agentplane/tasks/202608260947-C6WV4T/supervision/implementation-evidence.json"
      - "writable_scope:.agentplane/tasks/202608260947-C6WV4T/verification/20260826101202781-c0efa3be2c04108a.json"
      - "writable_scope:.agentplane/tasks/202608260947-C6WV4T/verification/20260826102051415-1a60d2fff4f33f35.json"
      - "writable_scope:.agentplane/tasks/202608260947-C6WV4T/verification/20260826103831301-084955658270d1e2.json"
      - "writable_scope:.agentplane/tasks/202608260947-C6WV4T/verification/20260826104850237-742d0ef8d9576f58.json"
      - "writable_scope:.agentplane/tasks/202608261249-BXQZ97/README.md"
      - "writable_scope:.agentplane/tasks/202608261249-BXQZ97/blueprint/resolved-snapshot.json"
      - "writable_scope:.agentplane/tasks/202608261249-BXQZ97/pr/diffstat.txt"
      - "writable_scope:.agentplane/tasks/202608261249-BXQZ97/pr/github-body.md"
      - "writable_scope:.agentplane/tasks/202608261249-BXQZ97/pr/github-title.txt"
      - "writable_scope:.agentplane/tasks/202608261249-BXQZ97/pr/meta.json"
      - "writable_scope:.agentplane/tasks/202608261249-BXQZ97/pr/review.md"
      - "writable_scope:.agentplane/tasks/202608261249-BXQZ97/quality/20260826-154337837-recovery-context/evaluator-evidence-manifest.json"
      - "writable_scope:.agentplane/tasks/202608261249-BXQZ97/quality/20260826-154337837-recovery-context/evaluator-work-order.json"
      - "writable_scope:.agentplane/tasks/202608261249-BXQZ97/quality/20260826-154349579-recovery-context/evaluator-evidence-manifest.json"
      - "writable_scope:.agentplane/tasks/202608261249-BXQZ97/quality/20260826-154349579-recovery-context/evaluator-opinion.md"
      - "writable_scope:.agentplane/tasks/202608261249-BXQZ97/quality/20260826-154349579-recovery-context/evaluator-result.json"
      - "writable_scope:.agentplane/tasks/202608261249-BXQZ97/quality/20260826-154349579-recovery-context/evaluator-work-order.json"
      - "writable_scope:.agentplane/tasks/202608261249-BXQZ97/quality/20260826-154349579-recovery-context/quality-report.json"
      - "writable_scope:.agentplane/tasks/202608261249-BXQZ97/quality/20260826-171737369-recovery-context/evaluator-evidence-manifest.json"
      - "writable_scope:.agentplane/tasks/202608261249-BXQZ97/quality/20260826-171737369-recovery-context/evaluator-work-order.json"
      - "writable_scope:.agentplane/tasks/202608261249-BXQZ97/quality/20260826-171746402-recovery-context/evaluator-evidence-manifest.json"
      - "writable_scope:.agentplane/tasks/202608261249-BXQZ97/quality/20260826-171746402-recovery-context/evaluator-opinion.md"
      - "writable_scope:.agentplane/tasks/202608261249-BXQZ97/quality/20260826-171746402-recovery-context/evaluator-result.json"
      - "writable_scope:.agentplane/tasks/202608261249-BXQZ97/quality/20260826-171746402-recovery-context/evaluator-work-order.json"
      - "writable_scope:.agentplane/tasks/202608261249-BXQZ97/quality/20260826-171746402-recovery-context/quality-report.json"
      - "writable_scope:.agentplane/tasks/202608261249-BXQZ97/quality/20260826-184958130-recovery-context/evaluator-evidence-manifest.json"
      - "writable_scope:.agentplane/tasks/202608261249-BXQZ97/quality/20260826-184958130-recovery-context/evaluator-opinion.md"
      - "writable_scope:.agentplane/tasks/202608261249-BXQZ97/quality/20260826-184958130-recovery-context/evaluator-result.json"
      - "writable_scope:.agentplane/tasks/202608261249-BXQZ97/quality/20260826-184958130-recovery-context/evaluator-work-order.json"
      - "writable_scope:.agentplane/tasks/202608261249-BXQZ97/quality/20260826-184958130-recovery-context/quality-report.json"
      - "writable_scope:.agentplane/tasks/202608261249-BXQZ97/quality/objects/sha256/081a872247cd011fcd717d8674c5e8435662c78ef4fc15cb726edadffac91f00.patch"
      - "writable_scope:.agentplane/tasks/202608261249-BXQZ97/quality/objects/sha256/1f02efb4b8bab934d1772f143fb49a62c41af32c0dcc88e6d84d63067eb2476a.patch"
      - "writable_scope:.agentplane/tasks/202608261249-BXQZ97/quality/objects/sha256/2d08ac03d9f2c967e311337b36f1002c301ce46e6179b3197c8735f606d4bd5d.md"
      - "writable_scope:.agentplane/tasks/202608261249-BXQZ97/quality/objects/sha256/49864fc10ebd312c36e5388075629eb27dd999c9531f6456b52708a9955fb1ce.json"
      - "writable_scope:.agentplane/tasks/202608261249-BXQZ97/quality/objects/sha256/6e793f3b5cf384ceae276d6d2daa685a2ea831c2c622aa09bbd54f9e9993ea15.patch"
      - "writable_scope:.agentplane/tasks/202608261249-BXQZ97/quality/objects/sha256/7b8649aeee3293091a3475cb6b9b8fd50578e76f50f2d69d1a48b0a0564c6588.md"
      - "writable_scope:.agentplane/tasks/202608261249-BXQZ97/quality/objects/sha256/9037cdf98253e70333ede9358d360264a85ee905be64a8723bbdd4ca71e02d4a.json"
      - "writable_scope:.agentplane/tasks/202608261249-BXQZ97/quality/objects/sha256/ca152961094cc816531a9f9428b59e35044108767b0c5ab2b8697f9d41bd5d6e.md"
      - "writable_scope:.agentplane/tasks/202608261249-BXQZ97/quality/objects/sha256/dc53ed08c3dda49bb4078be5bf32b0ada19800cc5f1fcdb14fecdccd54975356.md"
      - "writable_scope:.agentplane/tasks/202608261249-BXQZ97/quality/objects/sha256/e6c20dad3911e302671884f019d9d82e25ccbc8f44d64823eeebfa77db14c513.json"
      - "writable_scope:.agentplane/tasks/202608261249-BXQZ97/quality/objects/sha256/ec34965843d7ceaadde82286a6f78ba6336ac4a3d062b6aa9890f9fd67f55ddb.json"
      - "writable_scope:.agentplane/tasks/202608261249-BXQZ97/quality/objects/sha256/f091e58f8e79aefd3d495f1f01552d4326b86c44e0607e070495425e53edbf2a.md"
      - "writable_scope:.agentplane/tasks/202608261249-BXQZ97/quality/objects/sha256/f3348a06497ca3aad892ff85d6f30139a609de8eb281221d422464223991c706.json"
      - "writable_scope:.agentplane/tasks/202608261249-BXQZ97/supervision/declared-checks.json"
      - "writable_scope:.agentplane/tasks/202608261249-BXQZ97/supervision/implementation-evidence.json"
      - "writable_scope:.agentplane/tasks/202608261249-BXQZ97/verification/20260826131231828-4899fc7776fc3011.json"
      - "writable_scope:.agentplane/tasks/202608261249-BXQZ97/verification/20260826131801504-414ceddf9264b14a.json"
      - "writable_scope:.agentplane/tasks/202608261249-BXQZ97/verification/20260826133735342-6eebdbeee58c63b8.json"
      - "writable_scope:.agentplane/tasks/202608261249-BXQZ97/verification/20260826140354671-51ca742916d6d412.json"
      - "writable_scope:.agentplane/tasks/202608261249-BXQZ97/verification/20260826140354671-f118e6b643ac2277.json"
      - "writable_scope:.agentplane/tasks/202608261249-BXQZ97/verification/20260826142031076-8ac311f53c036691.json"
      - "writable_scope:.agentplane/tasks/202608261249-BXQZ97/verification/20260826164823835-114624ee0716d03c.json"
      - "writable_scope:.agentplane/tasks/202608261249-BXQZ97/verification/20260826164823835-32417bd6c41cd6fa.json"
      - "writable_scope:.agentplane/tasks/202608261249-BXQZ97/verification/20260826165515427-a3cc939a542cd2aa.json"
      - "writable_scope:.agentplane/tasks/202608261249-BXQZ97/verification/20260826165827922-f50094dfabc25c8a.json"
      - "writable_scope:.agentplane/tasks/202608261249-BXQZ97/verification/20260826170134616-f04da5d817e4ab2e.json"
      - "writable_scope:.agentplane/tasks/202608261249-BXQZ97/verification/20260826170811135-da8030825d7c301a.json"
      - "writable_scope:.agentplane/tasks/202608261249-BXQZ97/verification/20260826171201924-42ebe5c731851354.json"
      - "writable_scope:.agentplane/tasks/202608261249-BXQZ97/verification/20260826171322652-7e41b1cc15cfed88.json"
      - "writable_scope:.agentplane/tasks/202608261249-BXQZ97/verification/20260826180631339-09707b1c0e98c6de.json"
      - "writable_scope:.agentplane/tasks/202608261249-BXQZ97/verification/20260826180631339-2614f45e8b6de844.json"
      - "writable_scope:.agentplane/tasks/202608261249-BXQZ97/verification/20260826181511661-477b9b7ac50111ef.json"
      - "writable_scope:.agentplane/tasks/202608261249-BXQZ97/verification/20260826182424360-48a3862358bbf338.json"
      - "writable_scope:.agentplane/tasks/202608261249-BXQZ97/verification/20260826182631556-e4632490ec0e3dab.json"
      - "writable_scope:.agentplane/tasks/202608262034-QVVB66/README.md"
      - "writable_scope:.agentplane/tasks/202608262034-QVVB66/blueprint/resolved-snapshot.json"
      - "writable_scope:.agentplane/tasks/202608262034-QVVB66/pr/diffstat.txt"
      - "writable_scope:.agentplane/tasks/202608262034-QVVB66/pr/github-body.md"
      - "writable_scope:.agentplane/tasks/202608262034-QVVB66/pr/github-title.txt"
      - "writable_scope:.agentplane/tasks/202608262034-QVVB66/pr/meta.json"
      - "writable_scope:.agentplane/tasks/202608262034-QVVB66/pr/review.md"
      - "writable_scope:.agentplane/tasks/202608262034-QVVB66/quality/20260826-232534701-recovery-context/evaluator-evidence-manifest.json"
      - "writable_scope:.agentplane/tasks/202608262034-QVVB66/quality/20260826-232534701-recovery-context/evaluator-opinion.md"
      - "writable_scope:.agentplane/tasks/202608262034-QVVB66/quality/20260826-232534701-recovery-context/evaluator-result.json"
      - "writable_scope:.agentplane/tasks/202608262034-QVVB66/quality/20260826-232534701-recovery-context/evaluator-work-order.json"
      - "writable_scope:.agentplane/tasks/202608262034-QVVB66/quality/20260826-232534701-recovery-context/quality-report.json"
      - "writable_scope:.agentplane/tasks/202608262034-QVVB66/quality/objects/sha256/0d8d9d809bba84acdf89f5b6a6de1e594e0e057ad12081d1c93925007ae3ba56.json"
      - "writable_scope:.agentplane/tasks/202608262034-QVVB66/quality/objects/sha256/1f8c4d5afe794c741ad276e3c9a442bb8d4a0a833501f6c57adcc2cc0cbd510a.md"
      - "writable_scope:.agentplane/tasks/202608262034-QVVB66/quality/objects/sha256/6e4e04668c5a112cfb3f80c4b887a269381efd99162afd71dc2db583b725b51f.patch"
      - "writable_scope:.agentplane/tasks/202608262034-QVVB66/quality/objects/sha256/9037cdf98253e70333ede9358d360264a85ee905be64a8723bbdd4ca71e02d4a.json"
      - "writable_scope:.agentplane/tasks/202608262034-QVVB66/quality/objects/sha256/fb1af76268dd0e8465077608561a882b98194d2c2106b9f4a0f54b5a8216c4e9.json"
      - "writable_scope:.agentplane/tasks/202608262034-QVVB66/supervision/declared-checks.json"
      - "writable_scope:.agentplane/tasks/202608262034-QVVB66/supervision/implementation-evidence.json"
      - "writable_scope:.agentplane/tasks/202608262034-QVVB66/verification/20260826210937938-160302ec11db2821.json"
      - "writable_scope:.agentplane/tasks/202608262034-QVVB66/verification/20260826214006249-ef143b4293541bc2.json"
      - "writable_scope:.agentplane/tasks/202608262034-QVVB66/verification/20260826214633989-ff0fb06f0372a7b1.json"
      - "writable_scope:.agentplane/tasks/202608262034-QVVB66/verification/20260826214746594-95de7efcdc59dfaf.json"
      - "writable_scope:.agentplane/tasks/202608262034-QVVB66/verification/20260826222042038-1fbbbd157b86bc45.json"
      - "writable_scope:.agentplane/tasks/202608262034-QVVB66/verification/20260826225343074-06fb3b6272c4d3ce.json"
      - "writable_scope:.agentplane/tasks/202608262034-QVVB66/verification/20260826232338533-1f3a5cc55d1c2e2e.json"
      - "writable_scope:.agentplane/tasks/202608262034-QVVB66/verification/20260826232507417-6ba5f717053eee31.json"
      - "writable_scope:.agentplane/tasks/202608271251-GHHA0Q/README.md"
      - "writable_scope:.agentplane/tasks/202608271251-GHHA0Q/blueprint/resolved-snapshot.json"
      - "writable_scope:.agentplane/tasks/202608271251-GHHA0Q/pr/diffstat.txt"
      - "writable_scope:.agentplane/tasks/202608271251-GHHA0Q/pr/github-body.md"
      - "writable_scope:.agentplane/tasks/202608271251-GHHA0Q/pr/github-title.txt"
      - "writable_scope:.agentplane/tasks/202608271251-GHHA0Q/pr/meta.json"
      - "writable_scope:.agentplane/tasks/202608271251-GHHA0Q/pr/review.md"
      - "writable_scope:.agentplane/tasks/202608271251-GHHA0Q/quality/20260827-132550152-recovery-context/evaluator-evidence-manifest.json"
      - "writable_scope:.agentplane/tasks/202608271251-GHHA0Q/quality/20260827-132550152-recovery-context/evaluator-opinion.md"
      - "writable_scope:.agentplane/tasks/202608271251-GHHA0Q/quality/20260827-132550152-recovery-context/evaluator-result.json"
      - "writable_scope:.agentplane/tasks/202608271251-GHHA0Q/quality/20260827-132550152-recovery-context/evaluator-work-order.json"
      - "writable_scope:.agentplane/tasks/202608271251-GHHA0Q/quality/20260827-132550152-recovery-context/quality-report.json"
      - "writable_scope:.agentplane/tasks/202608271251-GHHA0Q/quality/objects/sha256/5f1761b308e3fa79606d64298d038aa48eed248df8f75002c32bf6175b74a26f.md"
      - "writable_scope:.agentplane/tasks/202608271251-GHHA0Q/quality/objects/sha256/655d50e79cbbfa8962590054cf5fa3edbb0455a549a7ebf14ff0e4491251ee69.json"
      - "writable_scope:.agentplane/tasks/202608271251-GHHA0Q/quality/objects/sha256/87363b64dfbbc8acb0a0e1d49c8a00c932eb1f73b80583339c6e83f8490049d8.patch"
      - "writable_scope:.agentplane/tasks/202608271251-GHHA0Q/quality/objects/sha256/9037cdf98253e70333ede9358d360264a85ee905be64a8723bbdd4ca71e02d4a.json"
      - "writable_scope:.agentplane/tasks/202608271251-GHHA0Q/quality/objects/sha256/9ee81d006aad7410d4eabee9de9e480cf2cd79d61bd1335ade9707d04079fb6f.json"
      - "writable_scope:.agentplane/tasks/202608271251-GHHA0Q/supervision/declared-checks.json"
      - "writable_scope:.agentplane/tasks/202608271251-GHHA0Q/supervision/implementation-evidence.json"
      - "writable_scope:.agentplane/tasks/202608271251-GHHA0Q/verification/20260827130652681-032dc4b51b16d8f5.json"
      - "writable_scope:.agentplane/tasks/202608271251-GHHA0Q/verification/20260827132532555-956f74b4ae404852.json"
      - "writable_scope:.agentplane/tasks/202608271358-G0N9P4/README.md"
      - "writable_scope:.agentplane/tasks/202608271358-G0N9P4/blueprint/resolved-snapshot.json"
      - "writable_scope:.agentplane/tasks/202608271358-G0N9P4/pr/diffstat.txt"
      - "writable_scope:.agentplane/tasks/202608271358-G0N9P4/pr/github-body.md"
      - "writable_scope:.agentplane/tasks/202608271358-G0N9P4/pr/github-title.txt"
      - "writable_scope:.agentplane/tasks/202608271358-G0N9P4/pr/meta.json"
      - "writable_scope:.agentplane/tasks/202608271358-G0N9P4/pr/review.md"
      - "writable_scope:.agentplane/tasks/202608271358-G0N9P4/quality/20260827-144308272-recovery-context/evaluator-evidence-manifest.json"
      - "writable_scope:.agentplane/tasks/202608271358-G0N9P4/quality/20260827-144308272-recovery-context/evaluator-opinion.md"
      - "writable_scope:.agentplane/tasks/202608271358-G0N9P4/quality/20260827-144308272-recovery-context/evaluator-result.json"
      - "writable_scope:.agentplane/tasks/202608271358-G0N9P4/quality/20260827-144308272-recovery-context/evaluator-work-order.json"
      - "writable_scope:.agentplane/tasks/202608271358-G0N9P4/quality/20260827-144308272-recovery-context/quality-report.json"
      - "writable_scope:.agentplane/tasks/202608271358-G0N9P4/quality/objects/sha256/14513056fb48f13c0a2081399288b24ce14495e22af1134cff7f041d75a4cf96.json"
      - "writable_scope:.agentplane/tasks/202608271358-G0N9P4/quality/objects/sha256/2501149452aa79bbcf0f5915f02d7db1170a7c5b1117d25c3504628d5d3d60f1.patch"
      - "writable_scope:.agentplane/tasks/202608271358-G0N9P4/quality/objects/sha256/2f9b84087cbe4076bce202e94828ba937a9e4172d1620f4d48a2c73dcd5991c6.json"
      - "writable_scope:.agentplane/tasks/202608271358-G0N9P4/quality/objects/sha256/777c538f21215f1399fa50862508b756510efedb76645600f61bf3f670794223.md"
      - "writable_scope:.agentplane/tasks/202608271358-G0N9P4/quality/objects/sha256/9037cdf98253e70333ede9358d360264a85ee905be64a8723bbdd4ca71e02d4a.json"
      - "writable_scope:.agentplane/tasks/202608271358-G0N9P4/supervision/declared-checks.json"
      - "writable_scope:.agentplane/tasks/202608271358-G0N9P4/supervision/implementation-evidence.json"
      - "writable_scope:.agentplane/tasks/202608271358-G0N9P4/verification/20260827141049775-a9ec4c50eea55011.json"
      - "writable_scope:.agentplane/tasks/202608271358-G0N9P4/verification/20260827143026261-afc0c60aa5ad0a08.json"
      - "writable_scope:.agentplane/tasks/202608271358-G0N9P4/verification/20260827144238263-382161b49fad458b.json"
      - "writable_scope:.agentplane/tasks/202608271425-9EWJA1/README.md"
      - "writable_scope:.agentplane/tasks/202608271425-9EWJA1/blueprint/resolved-snapshot.json"
      - "writable_scope:.agentplane/tasks/202608271425-9EWJA1/pr/diffstat.txt"
      - "writable_scope:.agentplane/tasks/202608271425-9EWJA1/pr/github-body.md"
      - "writable_scope:.agentplane/tasks/202608271425-9EWJA1/pr/github-title.txt"
      - "writable_scope:.agentplane/tasks/202608271425-9EWJA1/pr/meta.json"
      - "writable_scope:.agentplane/tasks/202608271425-9EWJA1/pr/review.md"
      - "writable_scope:.agentplane/tasks/202608271425-9EWJA1/quality/20260827-145146182-recovery-context/evaluator-evidence-manifest.json"
      - "writable_scope:.agentplane/tasks/202608271425-9EWJA1/quality/20260827-145146182-recovery-context/evaluator-opinion.md"
      - "writable_scope:.agentplane/tasks/202608271425-9EWJA1/quality/20260827-145146182-recovery-context/evaluator-result.json"
      - "writable_scope:.agentplane/tasks/202608271425-9EWJA1/quality/20260827-145146182-recovery-context/evaluator-work-order.json"
      - "writable_scope:.agentplane/tasks/202608271425-9EWJA1/quality/20260827-145146182-recovery-context/quality-report.json"
      - "writable_scope:.agentplane/tasks/202608271425-9EWJA1/quality/objects/sha256/0573f938635c08e770dcac6ba9e37ee421ad948d77a226a96c698c79010dd886.patch"
      - "writable_scope:.agentplane/tasks/202608271425-9EWJA1/quality/objects/sha256/35a9c1b23cfd9a14cf2f7657ea3fea0d01006ae742d37e9c2cf68e91d2df2217.md"
      - "writable_scope:.agentplane/tasks/202608271425-9EWJA1/quality/objects/sha256/7080a6be2e427488741d82e5f0f80a864c64a7fa2e9cdb8e5118aedded4881ec.json"
      - "writable_scope:.agentplane/tasks/202608271425-9EWJA1/quality/objects/sha256/9037cdf98253e70333ede9358d360264a85ee905be64a8723bbdd4ca71e02d4a.json"
      - "writable_scope:.agentplane/tasks/202608271425-9EWJA1/quality/objects/sha256/d95d0acf71eba724329a418bc06e8264aea65cb35720be95bfc5a172bb57ba3d.json"
      - "writable_scope:.agentplane/tasks/202608271425-9EWJA1/supervision/declared-checks.json"
      - "writable_scope:.agentplane/tasks/202608271425-9EWJA1/supervision/implementation-evidence.json"
      - "writable_scope:.agentplane/tasks/202608271425-9EWJA1/verification/20260827145057353-8504a8d8eb4611ab.json"
      - "writable_scope:.agentplane/tasks/202608271441-DVEMAE/README.md"
      - "writable_scope:.agentplane/tasks/202608271441-DVEMAE/blueprint/resolved-snapshot.json"
      - "writable_scope:.agentplane/tasks/202608271441-DVEMAE/pr/diffstat.txt"
      - "writable_scope:.agentplane/tasks/202608271441-DVEMAE/pr/github-body.md"
      - "writable_scope:.agentplane/tasks/202608271441-DVEMAE/pr/github-title.txt"
      - "writable_scope:.agentplane/tasks/202608271441-DVEMAE/pr/meta.json"
      - "writable_scope:.agentplane/tasks/202608271441-DVEMAE/pr/review.md"
      - "writable_scope:.agentplane/tasks/202608271441-DVEMAE/quality/20260827-161517390-recovery-context/evaluator-evidence-manifest.json"
      - "writable_scope:.agentplane/tasks/202608271441-DVEMAE/quality/20260827-161517390-recovery-context/evaluator-opinion.md"
      - "writable_scope:.agentplane/tasks/202608271441-DVEMAE/quality/20260827-161517390-recovery-context/evaluator-result.json"
      - "writable_scope:.agentplane/tasks/202608271441-DVEMAE/quality/20260827-161517390-recovery-context/evaluator-work-order.json"
      - "writable_scope:.agentplane/tasks/202608271441-DVEMAE/quality/20260827-161517390-recovery-context/quality-report.json"
      - "writable_scope:.agentplane/tasks/202608271441-DVEMAE/quality/objects/sha256/25d9a8b1e3a9e4c13c66e484a4e1b24f8ecdb231997b03159e5461368f8ccace.json"
      - "writable_scope:.agentplane/tasks/202608271441-DVEMAE/quality/objects/sha256/46cd945b00a0fd8eda518b45ef616a27bab8334f224d47b965657bc5f8020958.md"
      - "writable_scope:.agentplane/tasks/202608271441-DVEMAE/quality/objects/sha256/9037cdf98253e70333ede9358d360264a85ee905be64a8723bbdd4ca71e02d4a.json"
      - "writable_scope:.agentplane/tasks/202608271441-DVEMAE/quality/objects/sha256/bc9a4be916f6f1bf3e52810f0bdcae083f6de1da2c9050a0b73d2b46f2f4c158.patch"
      - "writable_scope:.agentplane/tasks/202608271441-DVEMAE/quality/objects/sha256/c945029f8f9a6a3b6717b22494ab1e117a3ea4e6b526ce151bdf827980533c8b.json"
      - "writable_scope:.agentplane/tasks/202608271441-DVEMAE/supervision/declared-checks.json"
      - "writable_scope:.agentplane/tasks/202608271441-DVEMAE/supervision/implementation-evidence.json"
      - "writable_scope:.agentplane/tasks/202608271441-DVEMAE/verification/20260827151321725-77366aa3f29ad2fc.json"
      - "writable_scope:.agentplane/tasks/202608271441-DVEMAE/verification/20260827161459128-ce04c76286eb1a98.json"
      - "writable_scope:.agentplane/tasks/202608271450-TZHW4C/README.md"
      - "writable_scope:.agentplane/tasks/202608271450-TZHW4C/blueprint/resolved-snapshot.json"
      - "writable_scope:.agentplane/tasks/202608271450-TZHW4C/pr/diffstat.txt"
      - "writable_scope:.agentplane/tasks/202608271450-TZHW4C/pr/github-body.md"
      - "writable_scope:.agentplane/tasks/202608271450-TZHW4C/pr/github-title.txt"
      - "writable_scope:.agentplane/tasks/202608271450-TZHW4C/pr/meta.json"
      - "writable_scope:.agentplane/tasks/202608271450-TZHW4C/pr/review.md"
      - "writable_scope:.agentplane/tasks/202608271450-TZHW4C/quality/20260827-164341199-recovery-context/evaluator-evidence-manifest.json"
      - "writable_scope:.agentplane/tasks/202608271450-TZHW4C/quality/20260827-164341199-recovery-context/evaluator-opinion.md"
      - "writable_scope:.agentplane/tasks/202608271450-TZHW4C/quality/20260827-164341199-recovery-context/evaluator-result.json"
      - "writable_scope:.agentplane/tasks/202608271450-TZHW4C/quality/20260827-164341199-recovery-context/evaluator-work-order.json"
      - "writable_scope:.agentplane/tasks/202608271450-TZHW4C/quality/20260827-164341199-recovery-context/quality-report.json"
      - "writable_scope:.agentplane/tasks/202608271450-TZHW4C/quality/objects/sha256/4f8d1195a803cd3c4754483629f1325c54ba2b91328ee958c9811dbc031ab8fd.json"
      - "writable_scope:.agentplane/tasks/202608271450-TZHW4C/quality/objects/sha256/68302d9b5aaca3ffd777ed8c0b0c11a4f0141aa08562b9d28cc3bc9a3075ecfc.patch"
      - "writable_scope:.agentplane/tasks/202608271450-TZHW4C/quality/objects/sha256/9037cdf98253e70333ede9358d360264a85ee905be64a8723bbdd4ca71e02d4a.json"
      - "writable_scope:.agentplane/tasks/202608271450-TZHW4C/quality/objects/sha256/d7febebeb12f1a3d979e56533b3ec80fabd2809b0f26382417f868bf173049e8.md"
      - "writable_scope:.agentplane/tasks/202608271450-TZHW4C/quality/objects/sha256/db8f8a8efe42f5970786efbd4c479276e3b511d8fad72bc91924436db46ac611.json"
      - "writable_scope:.agentplane/tasks/202608271450-TZHW4C/supervision/declared-checks.json"
      - "writable_scope:.agentplane/tasks/202608271450-TZHW4C/supervision/implementation-evidence.json"
      - "writable_scope:.agentplane/tasks/202608271450-TZHW4C/verification/20260827153255520-912083059edc324f.json"
      - "writable_scope:.agentplane/tasks/202608271450-TZHW4C/verification/20260827164324368-fc4e3922be01c66f.json"
      - "writable_scope:.agentplane/tasks/202608271502-J6B4RW/README.md"
      - "writable_scope:.agentplane/tasks/202608271502-J6B4RW/blueprint/resolved-snapshot.json"
      - "writable_scope:.agentplane/tasks/202608271502-J6B4RW/pr/diffstat.txt"
      - "writable_scope:.agentplane/tasks/202608271502-J6B4RW/pr/github-body.md"
      - "writable_scope:.agentplane/tasks/202608271502-J6B4RW/pr/github-title.txt"
      - "writable_scope:.agentplane/tasks/202608271502-J6B4RW/pr/meta.json"
      - "writable_scope:.agentplane/tasks/202608271502-J6B4RW/pr/review.md"
      - "writable_scope:.agentplane/tasks/202608271502-J6B4RW/quality/20260827-154623971-recovery-context/evaluator-evidence-manifest.json"
      - "writable_scope:.agentplane/tasks/202608271502-J6B4RW/quality/20260827-154623971-recovery-context/evaluator-opinion.md"
      - "writable_scope:.agentplane/tasks/202608271502-J6B4RW/quality/20260827-154623971-recovery-context/evaluator-result.json"
      - "writable_scope:.agentplane/tasks/202608271502-J6B4RW/quality/20260827-154623971-recovery-context/evaluator-work-order.json"
      - "writable_scope:.agentplane/tasks/202608271502-J6B4RW/quality/20260827-154623971-recovery-context/quality-report.json"
      - "writable_scope:.agentplane/tasks/202608271502-J6B4RW/quality/objects/sha256/0031c8f4d4758e61b1466e0d1cc73f10d4188334296df7b99d8d999f5c4e8ea1.md"
      - "writable_scope:.agentplane/tasks/202608271502-J6B4RW/quality/objects/sha256/4fac0491a5e9a0c96c8ac043242a10a8897ab3ae27acf6ec034902b9811d012b.json"
      - "writable_scope:.agentplane/tasks/202608271502-J6B4RW/quality/objects/sha256/58b664e7b0a81b253833b10a6c216059659b73855a9bfe7503edda7e5c2c4aee.patch"
      - "writable_scope:.agentplane/tasks/202608271502-J6B4RW/quality/objects/sha256/9037cdf98253e70333ede9358d360264a85ee905be64a8723bbdd4ca71e02d4a.json"
      - "writable_scope:.agentplane/tasks/202608271502-J6B4RW/quality/objects/sha256/b1ec08ea0502169eb633c52e878c5f61dab6a05f7abb0b1e3821a09aae111dc8.json"
      - "writable_scope:.agentplane/tasks/202608271502-J6B4RW/supervision/declared-checks.json"
      - "writable_scope:.agentplane/tasks/202608271502-J6B4RW/supervision/implementation-evidence.json"
      - "writable_scope:.agentplane/tasks/202608271502-J6B4RW/verification/20260827154604703-18e8da1d3734f6ea.json"
      - "writable_scope:.agentplane/tasks/202608271520-175BQX/README.md"
      - "writable_scope:.agentplane/tasks/202608271520-175BQX/blueprint/resolved-snapshot.json"
      - "writable_scope:.agentplane/tasks/202608271520-175BQX/pr/diffstat.txt"
      - "writable_scope:.agentplane/tasks/202608271520-175BQX/pr/github-body.md"
      - "writable_scope:.agentplane/tasks/202608271520-175BQX/pr/github-title.txt"
      - "writable_scope:.agentplane/tasks/202608271520-175BQX/pr/meta.json"
      - "writable_scope:.agentplane/tasks/202608271520-175BQX/pr/review.md"
      - "writable_scope:.agentplane/tasks/202608271520-175BQX/quality/20260827-163417019-recovery-context/evaluator-evidence-manifest.json"
      - "writable_scope:.agentplane/tasks/202608271520-175BQX/quality/20260827-163417019-recovery-context/evaluator-opinion.md"
      - "writable_scope:.agentplane/tasks/202608271520-175BQX/quality/20260827-163417019-recovery-context/evaluator-result.json"
      - "writable_scope:.agentplane/tasks/202608271520-175BQX/quality/20260827-163417019-recovery-context/evaluator-work-order.json"
      - "writable_scope:.agentplane/tasks/202608271520-175BQX/quality/20260827-163417019-recovery-context/quality-report.json"
      - "writable_scope:.agentplane/tasks/202608271520-175BQX/quality/objects/sha256/3df5f4f1f353a441910c5898702f18d37f00971bf3cad8e11319d03103ab1c56.patch"
      - "writable_scope:.agentplane/tasks/202608271520-175BQX/quality/objects/sha256/9037cdf98253e70333ede9358d360264a85ee905be64a8723bbdd4ca71e02d4a.json"
      - "writable_scope:.agentplane/tasks/202608271520-175BQX/quality/objects/sha256/a288575b74937de29ef9e860b24bcdc61f3191f48df33fc132a601fd7072e7e6.json"
      - "writable_scope:.agentplane/tasks/202608271520-175BQX/quality/objects/sha256/aadfab4fb644761f23c0e128c6d090eb8b31d8787d9b2a201c93e5e10f1e03fe.json"
      - "writable_scope:.agentplane/tasks/202608271520-175BQX/quality/objects/sha256/cfcdcb5435bc36040568a2bd28a1a5c734c0b2fe8cc3b738c45514cc0aefe561.md"
      - "writable_scope:.agentplane/tasks/202608271520-175BQX/supervision/declared-checks.json"
      - "writable_scope:.agentplane/tasks/202608271520-175BQX/supervision/implementation-evidence.json"
      - "writable_scope:.agentplane/tasks/202608271520-175BQX/verification/20260827163359452-f5a7fe6f4992aa43.json"
      - "writable_scope:.agentplane/tasks/202608271538-T21JCA/README.md"
      - "writable_scope:.agentplane/tasks/202608271538-T21JCA/blueprint/resolved-snapshot.json"
      - "writable_scope:.agentplane/tasks/202608271538-T21JCA/pr/diffstat.txt"
      - "writable_scope:.agentplane/tasks/202608271538-T21JCA/pr/github-body.md"
      - "writable_scope:.agentplane/tasks/202608271538-T21JCA/pr/github-title.txt"
      - "writable_scope:.agentplane/tasks/202608271538-T21JCA/pr/meta.json"
      - "writable_scope:.agentplane/tasks/202608271538-T21JCA/pr/review.md"
      - "writable_scope:.agentplane/tasks/202608271538-T21JCA/quality/20260827-155614370-recovery-context/evaluator-evidence-manifest.json"
      - "writable_scope:.agentplane/tasks/202608271538-T21JCA/quality/20260827-155614370-recovery-context/evaluator-opinion.md"
      - "writable_scope:.agentplane/tasks/202608271538-T21JCA/quality/20260827-155614370-recovery-context/evaluator-result.json"
      - "writable_scope:.agentplane/tasks/202608271538-T21JCA/quality/20260827-155614370-recovery-context/evaluator-work-order.json"
      - "writable_scope:.agentplane/tasks/202608271538-T21JCA/quality/20260827-155614370-recovery-context/quality-report.json"
      - "writable_scope:.agentplane/tasks/202608271538-T21JCA/quality/20260827-165816155-recovery-context/evaluator-evidence-manifest.json"
      - "writable_scope:.agentplane/tasks/202608271538-T21JCA/quality/20260827-165816155-recovery-context/evaluator-opinion.md"
      - "writable_scope:.agentplane/tasks/202608271538-T21JCA/quality/20260827-165816155-recovery-context/evaluator-result.json"
      - "writable_scope:.agentplane/tasks/202608271538-T21JCA/quality/20260827-165816155-recovery-context/evaluator-work-order.json"
      - "writable_scope:.agentplane/tasks/202608271538-T21JCA/quality/20260827-165816155-recovery-context/quality-report.json"
      - "writable_scope:.agentplane/tasks/202608271538-T21JCA/quality/20260827-185237520-recovery-context/evaluator-evidence-manifest.json"
      - "writable_scope:.agentplane/tasks/202608271538-T21JCA/quality/20260827-185237520-recovery-context/evaluator-opinion.md"
      - "writable_scope:.agentplane/tasks/202608271538-T21JCA/quality/20260827-185237520-recovery-context/evaluator-result.json"
      - "writable_scope:.agentplane/tasks/202608271538-T21JCA/quality/20260827-185237520-recovery-context/evaluator-work-order.json"
      - "writable_scope:.agentplane/tasks/202608271538-T21JCA/quality/20260827-185237520-recovery-context/quality-report.json"
      - "writable_scope:.agentplane/tasks/202608271538-T21JCA/quality/objects/sha256/20e682bec49f3be073f007266985798ff96956563ac46f42c9c8963175cb0d75.json"
      - "writable_scope:.agentplane/tasks/202608271538-T21JCA/quality/objects/sha256/23f41be610f22839e63955e61a6129a0f92dc7b634a33469b42faf27be8d2392.json"
      - "writable_scope:.agentplane/tasks/202608271538-T21JCA/quality/objects/sha256/2ba4423ad95e1c8d825431449b05e8979e4147776ed5596cb0d9d1e8f498b19b.md"
      - "writable_scope:.agentplane/tasks/202608271538-T21JCA/quality/objects/sha256/5b969fa31cb380006daa12e43d9292d0b7b40b06dab78d360d996621e45a56f0.json"
      - "writable_scope:.agentplane/tasks/202608271538-T21JCA/quality/objects/sha256/8272d31e92fdd32ae188f1bceceb8fd5b20abee2ac53a445582b54e3cf230ada.patch"
      - "writable_scope:.agentplane/tasks/202608271538-T21JCA/quality/objects/sha256/9037cdf98253e70333ede9358d360264a85ee905be64a8723bbdd4ca71e02d4a.json"
      - "writable_scope:.agentplane/tasks/202608271538-T21JCA/quality/objects/sha256/a7e3196d56670a618cab6f2faccd91792fd9fdd6bb32df3f9587ff725891c60f.patch"
      - "writable_scope:.agentplane/tasks/202608271538-T21JCA/quality/objects/sha256/aaae0a4db026925daff5ae459b577e586f725c6f7b05301210c65ca44c52ae5f.json"
      - "writable_scope:.agentplane/tasks/202608271538-T21JCA/quality/objects/sha256/d45ba3378de8f21986c7dba53843422ac84e13c3a300a10b253f902a75553e18.md"
      - "writable_scope:.agentplane/tasks/202608271538-T21JCA/quality/objects/sha256/efe135d010022261174668a4c7cb2b3925b6118a8068b12cda82e02713ab0c81.md"
      - "writable_scope:.agentplane/tasks/202608271538-T21JCA/quality/objects/sha256/fcf8dd2e46cf020a4dfa46a07d648ce3dfb919b0ad00a577f97eacfd649d9817.patch"
      - "writable_scope:.agentplane/tasks/202608271538-T21JCA/supervision/declared-checks.json"
      - "writable_scope:.agentplane/tasks/202608271538-T21JCA/supervision/implementation-evidence.json"
      - "writable_scope:.agentplane/tasks/202608271538-T21JCA/verification/20260827155541958-c84df617bc1e0c1a.json"
      - "writable_scope:.agentplane/tasks/202608271538-T21JCA/verification/20260827163017204-63965a85298089d8.json"
      - "writable_scope:.agentplane/tasks/202608271538-T21JCA/verification/20260827165804845-f40035f1f5135e14.json"
      - "writable_scope:.agentplane/tasks/202608271538-T21JCA/verification/20260827175117746-40e332b32f5ff76b.json"
      - "writable_scope:.agentplane/tasks/202608271538-T21JCA/verification/20260827181112407-f0e13b14e41fe302.json"
      - "writable_scope:.agentplane/tasks/202608271538-T21JCA/verification/20260827185225478-6366f2fb7f9e38cb.json"
      - "writable_scope:.agentplane/tasks/202608271544-1TDVPJ/README.md"
      - "writable_scope:.agentplane/tasks/202608271544-1TDVPJ/blueprint/resolved-snapshot.json"
      - "writable_scope:.agentplane/tasks/202608271544-1TDVPJ/pr/diffstat.txt"
      - "writable_scope:.agentplane/tasks/202608271544-1TDVPJ/pr/github-body.md"
      - "writable_scope:.agentplane/tasks/202608271544-1TDVPJ/pr/github-title.txt"
      - "writable_scope:.agentplane/tasks/202608271544-1TDVPJ/pr/meta.json"
      - "writable_scope:.agentplane/tasks/202608271544-1TDVPJ/pr/review.md"
      - "writable_scope:.agentplane/tasks/202608271544-1TDVPJ/quality/20260827-162357810-recovery-context/evaluator-evidence-manifest.json"
      - "writable_scope:.agentplane/tasks/202608271544-1TDVPJ/quality/20260827-162357810-recovery-context/evaluator-opinion.md"
      - "writable_scope:.agentplane/tasks/202608271544-1TDVPJ/quality/20260827-162357810-recovery-context/evaluator-result.json"
      - "writable_scope:.agentplane/tasks/202608271544-1TDVPJ/quality/20260827-162357810-recovery-context/evaluator-work-order.json"
      - "writable_scope:.agentplane/tasks/202608271544-1TDVPJ/quality/20260827-162357810-recovery-context/quality-report.json"
      - "writable_scope:.agentplane/tasks/202608271544-1TDVPJ/quality/objects/sha256/09e7b31f3ac865c48223b58cfb33a8e0b13406f6b1d10fbd0397887ce64fcd39.json"
      - "writable_scope:.agentplane/tasks/202608271544-1TDVPJ/quality/objects/sha256/4a6b7f61fc2cd73a0ac64c0afa6b1e91ee9137ee153073440092170e287545ae.patch"
      - "writable_scope:.agentplane/tasks/202608271544-1TDVPJ/quality/objects/sha256/54db07e252c5020879f6e899f2b62e2cbfdd0f825307f6b3f8a998e2cee24ddf.json"
      - "writable_scope:.agentplane/tasks/202608271544-1TDVPJ/quality/objects/sha256/9037cdf98253e70333ede9358d360264a85ee905be64a8723bbdd4ca71e02d4a.json"
      - "writable_scope:.agentplane/tasks/202608271544-1TDVPJ/quality/objects/sha256/b138e23a64b8077d010b45401e70824413f65d708334c29a5b663586700828e7.md"
      - "writable_scope:.agentplane/tasks/202608271544-1TDVPJ/supervision/declared-checks.json"
      - "writable_scope:.agentplane/tasks/202608271544-1TDVPJ/supervision/implementation-evidence.json"
      - "writable_scope:.agentplane/tasks/202608271544-1TDVPJ/verification/20260827160642690-24295292837d8d7e.json"
      - "writable_scope:.agentplane/tasks/202608271544-1TDVPJ/verification/20260827162335964-8d33c746263199fc.json"
      - "writable_scope:.agentplane/tasks/202608271649-DVNTRR/README.md"
      - "writable_scope:.agentplane/tasks/202608271649-DVNTRR/blueprint/resolved-snapshot.json"
      - "writable_scope:.agentplane/tasks/202608271649-DVNTRR/pr/diffstat.txt"
      - "writable_scope:.agentplane/tasks/202608271649-DVNTRR/pr/github-body.md"
      - "writable_scope:.agentplane/tasks/202608271649-DVNTRR/pr/github-title.txt"
      - "writable_scope:.agentplane/tasks/202608271649-DVNTRR/pr/meta.json"
      - "writable_scope:.agentplane/tasks/202608271649-DVNTRR/pr/review.md"
      - "writable_scope:.agentplane/tasks/202608271649-DVNTRR/quality/20260827-170736164-recovery-context/evaluator-evidence-manifest.json"
      - "writable_scope:.agentplane/tasks/202608271649-DVNTRR/quality/20260827-170736164-recovery-context/evaluator-opinion.md"
      - "writable_scope:.agentplane/tasks/202608271649-DVNTRR/quality/20260827-170736164-recovery-context/evaluator-result.json"
      - "writable_scope:.agentplane/tasks/202608271649-DVNTRR/quality/20260827-170736164-recovery-context/evaluator-work-order.json"
      - "writable_scope:.agentplane/tasks/202608271649-DVNTRR/quality/20260827-170736164-recovery-context/quality-report.json"
      - "writable_scope:.agentplane/tasks/202608271649-DVNTRR/quality/objects/sha256/26b29129cee78cb00a376b7d25f1c78233418cc92f456e963b0122292f6b29fe.json"
      - "writable_scope:.agentplane/tasks/202608271649-DVNTRR/quality/objects/sha256/9037cdf98253e70333ede9358d360264a85ee905be64a8723bbdd4ca71e02d4a.json"
      - "writable_scope:.agentplane/tasks/202608271649-DVNTRR/quality/objects/sha256/9e458f50f4a70613d2c4d7d41c1006bf431af26fd040c3649cf38af0ae39c0ac.patch"
      - "writable_scope:.agentplane/tasks/202608271649-DVNTRR/quality/objects/sha256/a0a854b5539401e1ce7b8c5d69c90e66e4e7164cedf7d87371aed16ed16c54e5.json"
      - "writable_scope:.agentplane/tasks/202608271649-DVNTRR/quality/objects/sha256/fb58551d02547676b978b5aedde40828c7008703d368d527a61c52535306d00f.md"
      - "writable_scope:.agentplane/tasks/202608271649-DVNTRR/supervision/declared-checks.json"
      - "writable_scope:.agentplane/tasks/202608271649-DVNTRR/supervision/implementation-evidence.json"
      - "writable_scope:.agentplane/tasks/202608271649-DVNTRR/verification/20260827170718338-d32fb33a649bef9e.json"
      - "writable_scope:.agentplane/tasks/202608271659-AD3030/README.md"
      - "writable_scope:.agentplane/tasks/202608271659-AD3030/blueprint/resolved-snapshot.json"
      - "writable_scope:.agentplane/tasks/202608271659-AD3030/pr/diffstat.txt"
      - "writable_scope:.agentplane/tasks/202608271659-AD3030/pr/github-body.md"
      - "writable_scope:.agentplane/tasks/202608271659-AD3030/pr/github-title.txt"
      - "writable_scope:.agentplane/tasks/202608271659-AD3030/pr/meta.json"
      - "writable_scope:.agentplane/tasks/202608271659-AD3030/pr/review.md"
      - "writable_scope:.agentplane/tasks/202608271659-AD3030/quality/20260827-231601668-recovery-context/evaluator-evidence-manifest.json"
      - "writable_scope:.agentplane/tasks/202608271659-AD3030/quality/20260827-231601668-recovery-context/evaluator-follow-up.json"
      - "writable_scope:.agentplane/tasks/202608271659-AD3030/quality/20260827-231601668-recovery-context/evaluator-opinion.md"
      - "writable_scope:.agentplane/tasks/202608271659-AD3030/quality/20260827-231601668-recovery-context/evaluator-result.json"
      - "writable_scope:.agentplane/tasks/202608271659-AD3030/quality/20260827-231601668-recovery-context/evaluator-work-order.json"
      - "writable_scope:.agentplane/tasks/202608271659-AD3030/quality/20260827-231601668-recovery-context/quality-report.json"
      - "writable_scope:.agentplane/tasks/202608271659-AD3030/quality/20260827-233148153-recovery-context/evaluator-evidence-manifest.json"
      - "writable_scope:.agentplane/tasks/202608271659-AD3030/quality/20260827-233148153-recovery-context/evaluator-opinion.md"
      - "writable_scope:.agentplane/tasks/202608271659-AD3030/quality/20260827-233148153-recovery-context/evaluator-result.json"
      - "writable_scope:.agentplane/tasks/202608271659-AD3030/quality/20260827-233148153-recovery-context/evaluator-work-order.json"
      - "writable_scope:.agentplane/tasks/202608271659-AD3030/quality/20260827-233148153-recovery-context/quality-report.json"
      - "writable_scope:.agentplane/tasks/202608271659-AD3030/quality/objects/sha256/6a54b986c4337537710c4beb64489bec480674ba7177b0351762cbc6ef90410f.patch"
      - "writable_scope:.agentplane/tasks/202608271659-AD3030/quality/objects/sha256/7f8eaa563a57e96bcafc6c3a0510357cc3af386dc72cd2c7ea05829ca02b93d1.md"
      - "writable_scope:.agentplane/tasks/202608271659-AD3030/quality/objects/sha256/9037cdf98253e70333ede9358d360264a85ee905be64a8723bbdd4ca71e02d4a.json"
      - "writable_scope:.agentplane/tasks/202608271659-AD3030/quality/objects/sha256/90f0d1030d222fc87d8e92a8fc71195cb2c49a013eb106f43b8d570dab8cea0c.md"
      - "writable_scope:.agentplane/tasks/202608271659-AD3030/quality/objects/sha256/95b232edfe20d366180cc29edc1979fdffee0202f5881344b07866a82d04fc4f.json"
      - "writable_scope:.agentplane/tasks/202608271659-AD3030/quality/objects/sha256/d0d238d23c3006d5e0d4d0953d1881f99c4173f65bfe5d0abfb7b08b76de5a06.json"
      - "writable_scope:.agentplane/tasks/202608271659-AD3030/quality/objects/sha256/d36ac47a0ebecb9519f911ec1314b9ad33af5c3ced863ba464a8788b49dec5b9.json"
      - "writable_scope:.agentplane/tasks/202608271659-AD3030/supervision/declared-checks.json"
      - "writable_scope:.agentplane/tasks/202608271659-AD3030/supervision/implementation-evidence.json"
      - "writable_scope:.agentplane/tasks/202608271659-AD3030/verification/20260827213149985-715257e021089323.json"
      - "writable_scope:.agentplane/tasks/202608271659-AD3030/verification/20260827215847391-fb3c0afcc74de348.json"
      - "writable_scope:.agentplane/tasks/202608271659-AD3030/verification/20260827223623598-a12592ac3d5fc2df.json"
      - "writable_scope:.agentplane/tasks/202608271659-AD3030/verification/20260827231543799-24b0be63cfe9653d.json"
      - "writable_scope:.agentplane/tasks/202608271659-AD3030/verification/20260827233043685-d1e770e639a91501.json"
      - "writable_scope:.agentplane/tasks/202608272229-CFKR4P/README.md"
      - "writable_scope:.agentplane/tasks/202608272229-CFKR4P/blueprint/resolved-snapshot.json"
      - "writable_scope:.agentplane/tasks/202608272229-CFKR4P/pr/diffstat.txt"
      - "writable_scope:.agentplane/tasks/202608272229-CFKR4P/pr/github-body.md"
      - "writable_scope:.agentplane/tasks/202608272229-CFKR4P/pr/github-title.txt"
      - "writable_scope:.agentplane/tasks/202608272229-CFKR4P/pr/meta.json"
      - "writable_scope:.agentplane/tasks/202608272229-CFKR4P/pr/review.md"
      - "writable_scope:.agentplane/tasks/202608272229-CFKR4P/quality/20260827-230610775-recovery-context/evaluator-evidence-manifest.json"
      - "writable_scope:.agentplane/tasks/202608272229-CFKR4P/quality/20260827-230610775-recovery-context/evaluator-opinion.md"
      - "writable_scope:.agentplane/tasks/202608272229-CFKR4P/quality/20260827-230610775-recovery-context/evaluator-result.json"
      - "writable_scope:.agentplane/tasks/202608272229-CFKR4P/quality/20260827-230610775-recovery-context/evaluator-work-order.json"
      - "writable_scope:.agentplane/tasks/202608272229-CFKR4P/quality/20260827-230610775-recovery-context/quality-report.json"
      - "writable_scope:.agentplane/tasks/202608272229-CFKR4P/quality/20260828-000932160-recovery-context/evaluator-evidence-manifest.json"
      - "writable_scope:.agentplane/tasks/202608272229-CFKR4P/quality/20260828-000932160-recovery-context/evaluator-follow-up.json"
      - "writable_scope:.agentplane/tasks/202608272229-CFKR4P/quality/20260828-000932160-recovery-context/evaluator-opinion.md"
      - "writable_scope:.agentplane/tasks/202608272229-CFKR4P/quality/20260828-000932160-recovery-context/evaluator-result.json"
      - "writable_scope:.agentplane/tasks/202608272229-CFKR4P/quality/20260828-000932160-recovery-context/evaluator-work-order.json"
      - "writable_scope:.agentplane/tasks/202608272229-CFKR4P/quality/20260828-000932160-recovery-context/quality-report.json"
      - "writable_scope:.agentplane/tasks/202608272229-CFKR4P/quality/20260828-053621063-recovery-context/evaluator-evidence-manifest.json"
      - "writable_scope:.agentplane/tasks/202608272229-CFKR4P/quality/20260828-053621063-recovery-context/evaluator-opinion.md"
      - "writable_scope:.agentplane/tasks/202608272229-CFKR4P/quality/20260828-053621063-recovery-context/evaluator-result.json"
      - "writable_scope:.agentplane/tasks/202608272229-CFKR4P/quality/20260828-053621063-recovery-context/evaluator-work-order.json"
      - "writable_scope:.agentplane/tasks/202608272229-CFKR4P/quality/20260828-053621063-recovery-context/quality-report.json"
      - "writable_scope:.agentplane/tasks/202608272229-CFKR4P/quality/objects/sha256/11688b587a6c37b5298be891c8baca187f77e08c5986a1dc9f37e56709aa676e.patch"
      - "writable_scope:.agentplane/tasks/202608272229-CFKR4P/quality/objects/sha256/3fa8c5a4ffd8708f6e96a21eba31edaf65882e1844c30c1e86c408070f957b5b.patch"
      - "writable_scope:.agentplane/tasks/202608272229-CFKR4P/quality/objects/sha256/56d54e34c6824aaf1a152fdfb629d730440df65d4686321e6cbb73d499cb85a2.md"
      - "writable_scope:.agentplane/tasks/202608272229-CFKR4P/quality/objects/sha256/5a91f816258fbfff2849f7bc6be1f7cf50e4796b2e269be89388b9c66f1d5c68.md"
      - "writable_scope:.agentplane/tasks/202608272229-CFKR4P/quality/objects/sha256/6f267ba300d86b30f5a46cb1b7eae0f2cb31b89dd4cf4c01d666f9423b309d5e.json"
      - "writable_scope:.agentplane/tasks/202608272229-CFKR4P/quality/objects/sha256/8aa8430007db8b3269f6cb4f5d3aed2627eeadc552ce0127fbabae170ead8e9f.md"
      - "writable_scope:.agentplane/tasks/202608272229-CFKR4P/quality/objects/sha256/9037cdf98253e70333ede9358d360264a85ee905be64a8723bbdd4ca71e02d4a.json"
      - "writable_scope:.agentplane/tasks/202608272229-CFKR4P/quality/objects/sha256/9a2d9706dbffd1b3e70f61ffedc1e700dd415cee709f8010108ced527e4dfdc5.json"
      - "writable_scope:.agentplane/tasks/202608272229-CFKR4P/quality/objects/sha256/be5d9b5a63f50769630a2f792d28e7a198ceee47d2693d131f4b4de1dbdf8317.json"
      - "writable_scope:.agentplane/tasks/202608272229-CFKR4P/quality/objects/sha256/ddfa9158349dd8bc733f31959f4dd5b52edf19f263a2c56ebf3c0556d6f7eb98.json"
      - "writable_scope:.agentplane/tasks/202608272229-CFKR4P/supervision/declared-checks.json"
      - "writable_scope:.agentplane/tasks/202608272229-CFKR4P/supervision/implementation-evidence.json"
      - "writable_scope:.agentplane/tasks/202608272229-CFKR4P/verification/20260827230553240-5454bb7d2f564299.json"
      - "writable_scope:.agentplane/tasks/202608272229-CFKR4P/verification/20260828000849309-06bea9aa9602ed03.json"
      - "writable_scope:.agentplane/tasks/202608272229-CFKR4P/verification/20260828000849309-6c255a4db5aae45c.json"
      - "writable_scope:.agentplane/tasks/202608272229-CFKR4P/verification/20260828053605787-eca4721e74cf0d8e.json"
      - "writable_scope:.agentplane/tasks/202608280009-QMVHM2/README.md"
      - "writable_scope:.agentplane/tasks/202608280009-QMVHM2/blueprint/resolved-snapshot.json"
      - "writable_scope:.agentplane/tasks/202608280009-QMVHM2/pr/diffstat.txt"
      - "writable_scope:.agentplane/tasks/202608280009-QMVHM2/pr/github-body.md"
      - "writable_scope:.agentplane/tasks/202608280009-QMVHM2/pr/github-title.txt"
      - "writable_scope:.agentplane/tasks/202608280009-QMVHM2/pr/meta.json"
      - "writable_scope:.agentplane/tasks/202608280009-QMVHM2/pr/review.md"
      - "writable_scope:.agentplane/tasks/202608280009-QMVHM2/quality/20260828-011322107-recovery-context/evaluator-evidence-manifest.json"
      - "writable_scope:.agentplane/tasks/202608280009-QMVHM2/quality/20260828-011322107-recovery-context/evaluator-follow-up.json"
      - "writable_scope:.agentplane/tasks/202608280009-QMVHM2/quality/20260828-011322107-recovery-context/evaluator-opinion.md"
      - "writable_scope:.agentplane/tasks/202608280009-QMVHM2/quality/20260828-011322107-recovery-context/evaluator-result.json"
      - "writable_scope:.agentplane/tasks/202608280009-QMVHM2/quality/20260828-011322107-recovery-context/evaluator-work-order.json"
      - "writable_scope:.agentplane/tasks/202608280009-QMVHM2/quality/20260828-011322107-recovery-context/quality-report.json"
      - "writable_scope:.agentplane/tasks/202608280009-QMVHM2/quality/20260828-042840647-recovery-context/evaluator-evidence-manifest.json"
      - "writable_scope:.agentplane/tasks/202608280009-QMVHM2/quality/20260828-042840647-recovery-context/evaluator-opinion.md"
      - "writable_scope:.agentplane/tasks/202608280009-QMVHM2/quality/20260828-042840647-recovery-context/evaluator-result.json"
      - "writable_scope:.agentplane/tasks/202608280009-QMVHM2/quality/20260828-042840647-recovery-context/evaluator-work-order.json"
      - "writable_scope:.agentplane/tasks/202608280009-QMVHM2/quality/20260828-042840647-recovery-context/quality-report.json"
      - "writable_scope:.agentplane/tasks/202608280009-QMVHM2/quality/20260828-051322345-recovery-context/evaluator-evidence-manifest.json"
      - "writable_scope:.agentplane/tasks/202608280009-QMVHM2/quality/20260828-051322345-recovery-context/evaluator-opinion.md"
      - "writable_scope:.agentplane/tasks/202608280009-QMVHM2/quality/20260828-051322345-recovery-context/evaluator-result.json"
      - "writable_scope:.agentplane/tasks/202608280009-QMVHM2/quality/20260828-051322345-recovery-context/evaluator-work-order.json"
      - "writable_scope:.agentplane/tasks/202608280009-QMVHM2/quality/20260828-051322345-recovery-context/quality-report.json"
      - "writable_scope:.agentplane/tasks/202608280009-QMVHM2/quality/objects/sha256/1c71cb603799ea00dfe1eb4feba9eaaceb1ba54dcbf5d427df29019e0705cc88.md"
      - "writable_scope:.agentplane/tasks/202608280009-QMVHM2/quality/objects/sha256/239c6f92bfea8b9963a7280e631c183681ae1af1934202231f1189ec01382189.json"
      - "writable_scope:.agentplane/tasks/202608280009-QMVHM2/quality/objects/sha256/5379a6852a6d160cd1b996793dd260bf11f32c00c170218fea9dc0fff3a613e4.patch"
      - "writable_scope:.agentplane/tasks/202608280009-QMVHM2/quality/objects/sha256/60f75a07ff5023ff166e4200c64265239501e2b3f6b37a021996dff717b5fbfe.patch"
      - "writable_scope:.agentplane/tasks/202608280009-QMVHM2/quality/objects/sha256/66b158c9a1fbadd62b9ef4afac539b907e19606f24447f5afac1a180c96d1f76.json"
      - "writable_scope:.agentplane/tasks/202608280009-QMVHM2/quality/objects/sha256/9037cdf98253e70333ede9358d360264a85ee905be64a8723bbdd4ca71e02d4a.json"
      - "writable_scope:.agentplane/tasks/202608280009-QMVHM2/quality/objects/sha256/975b3b4c61f11b15abc435105a878d617ff4c7299a8b62d6c8401b9482fc9f3d.json"
      - "writable_scope:.agentplane/tasks/202608280009-QMVHM2/quality/objects/sha256/b2ffb42c3b91e00e03734e7dcf1aa3ef131732e1faccaedf4fa53f1310491c33.json"
      - "writable_scope:.agentplane/tasks/202608280009-QMVHM2/quality/objects/sha256/bd890fca94d16e8a62f92c3704058b03b54be072d1dee3056f0fe78883c3159e.md"
      - "writable_scope:.agentplane/tasks/202608280009-QMVHM2/quality/objects/sha256/eeb6b4d935b7082e3a532d3520244220ada15bb93c7ca55a51e8d77134958539.md"
      - "writable_scope:.agentplane/tasks/202608280009-QMVHM2/supervision/declared-checks.json"
      - "writable_scope:.agentplane/tasks/202608280009-QMVHM2/supervision/implementation-evidence.json"
      - "writable_scope:.agentplane/tasks/202608280009-QMVHM2/verification/20260828011304735-23f23a1652815c0c.json"
      - "writable_scope:.agentplane/tasks/202608280009-QMVHM2/verification/20260828042822482-e20218a743e953fb.json"
      - "writable_scope:.agentplane/tasks/202608280009-QMVHM2/verification/20260828050220795-2614f9b715b13cb6.json"
      - "writable_scope:.agentplane/tasks/202608280009-QMVHM2/verification/20260828050220795-466081e22890fca3.json"
      - "writable_scope:.agentplane/tasks/202608280009-QMVHM2/verification/20260828051308628-09a00b90b25d66f1.json"
      - "writable_scope:.agentplane/tasks/202608280529-59VB06/README.md"
      - "writable_scope:.agentplane/tasks/202608280529-59VB06/blueprint/resolved-snapshot.json"
      - "writable_scope:.agentplane/tasks/202608280529-59VB06/pr/diffstat.txt"
      - "writable_scope:.agentplane/tasks/202608280529-59VB06/pr/github-body.md"
      - "writable_scope:.agentplane/tasks/202608280529-59VB06/pr/github-title.txt"
      - "writable_scope:.agentplane/tasks/202608280529-59VB06/pr/meta.json"
      - "writable_scope:.agentplane/tasks/202608280529-59VB06/pr/review.md"
      - "writable_scope:.agentplane/tasks/202608280529-59VB06/quality/20260828-060709201-recovery-context/evaluator-evidence-manifest.json"
      - "writable_scope:.agentplane/tasks/202608280529-59VB06/quality/20260828-060709201-recovery-context/evaluator-follow-up.json"
      - "writable_scope:.agentplane/tasks/202608280529-59VB06/quality/20260828-060709201-recovery-context/evaluator-opinion.md"
      - "writable_scope:.agentplane/tasks/202608280529-59VB06/quality/20260828-060709201-recovery-context/evaluator-result.json"
      - "writable_scope:.agentplane/tasks/202608280529-59VB06/quality/20260828-060709201-recovery-context/evaluator-work-order.json"
      - "writable_scope:.agentplane/tasks/202608280529-59VB06/quality/20260828-060709201-recovery-context/quality-report.json"
      - "writable_scope:.agentplane/tasks/202608280529-59VB06/quality/20260828-153633672-recovery-context/evaluator-evidence-manifest.json"
      - "writable_scope:.agentplane/tasks/202608280529-59VB06/quality/20260828-153633672-recovery-context/evaluator-opinion.md"
      - "writable_scope:.agentplane/tasks/202608280529-59VB06/quality/20260828-153633672-recovery-context/evaluator-result.json"
      - "writable_scope:.agentplane/tasks/202608280529-59VB06/quality/20260828-153633672-recovery-context/evaluator-work-order.json"
      - "writable_scope:.agentplane/tasks/202608280529-59VB06/quality/20260828-153633672-recovery-context/quality-report.json"
      - "writable_scope:.agentplane/tasks/202608280529-59VB06/quality/20260828-181927875-recovery-context/evaluator-evidence-manifest.json"
      - "writable_scope:.agentplane/tasks/202608280529-59VB06/quality/20260828-181927875-recovery-context/evaluator-follow-up.json"
      - "writable_scope:.agentplane/tasks/202608280529-59VB06/quality/20260828-181927875-recovery-context/evaluator-opinion.md"
      - "writable_scope:.agentplane/tasks/202608280529-59VB06/quality/20260828-181927875-recovery-context/evaluator-result.json"
      - "writable_scope:.agentplane/tasks/202608280529-59VB06/quality/20260828-181927875-recovery-context/evaluator-work-order.json"
      - "writable_scope:.agentplane/tasks/202608280529-59VB06/quality/20260828-181927875-recovery-context/quality-report.json"
      - "writable_scope:.agentplane/tasks/202608280529-59VB06/quality/20260828-185050324-recovery-context/evaluator-evidence-manifest.json"
      - "writable_scope:.agentplane/tasks/202608280529-59VB06/quality/20260828-185050324-recovery-context/evaluator-opinion.md"
      - "writable_scope:.agentplane/tasks/202608280529-59VB06/quality/20260828-185050324-recovery-context/evaluator-result.json"
      - "writable_scope:.agentplane/tasks/202608280529-59VB06/quality/20260828-185050324-recovery-context/evaluator-work-order.json"
      - "writable_scope:.agentplane/tasks/202608280529-59VB06/quality/20260828-185050324-recovery-context/quality-report.json"
      - "writable_scope:.agentplane/tasks/202608280529-59VB06/quality/objects/sha256/24745007b98bd3eb7178a157f3cff4cd03ec4dd7de00613fbd465e1c9d85fc99.json"
      - "writable_scope:.agentplane/tasks/202608280529-59VB06/quality/objects/sha256/305dc31ef93c8cc2c3f6b8002313ce558bba82f431df8b7b35991b3a1335bfb4.md"
      - "writable_scope:.agentplane/tasks/202608280529-59VB06/quality/objects/sha256/32210e077de23f38baba474b9ad2cf03c748596a8597b2daf2df6a5f75376ef1.json"
      - "writable_scope:.agentplane/tasks/202608280529-59VB06/quality/objects/sha256/34b3e8375de5f18107ece3aea5f4b2af0c9ec6eec6bd7198fb9b886c82d91398.md"
      - "writable_scope:.agentplane/tasks/202608280529-59VB06/quality/objects/sha256/64558883dc2735b263e90375f5bf6254311c06dfe032688cfeda608774af92e4.md"
      - "writable_scope:.agentplane/tasks/202608280529-59VB06/quality/objects/sha256/85ab8a4388809a43346334532eaf5fea9f05ec0af3e6b17cced11cc3e28859fb.patch"
      - "writable_scope:.agentplane/tasks/202608280529-59VB06/quality/objects/sha256/8e54ddb6d171cda8ac2e9c2276a32c2567dee171dd67e7e76bce8968de76829a.patch"
      - "writable_scope:.agentplane/tasks/202608280529-59VB06/quality/objects/sha256/9037cdf98253e70333ede9358d360264a85ee905be64a8723bbdd4ca71e02d4a.json"
      - "writable_scope:.agentplane/tasks/202608280529-59VB06/quality/objects/sha256/9f4fefbba30eb4bff51cddd6573a18f686a9d04f29b7ab3104de0ccbe6a641b6.md"
      - "writable_scope:.agentplane/tasks/202608280529-59VB06/quality/objects/sha256/b3b3f9229ace468303c32054dbfc08138f4e6822b464104b4d9180421de40844.json"
      - "writable_scope:.agentplane/tasks/202608280529-59VB06/quality/objects/sha256/dffe78fab5abb3d7f0acea1c9b14f4cbfd56d68d836f90da49341774b928b834.json"
      - "writable_scope:.agentplane/tasks/202608280529-59VB06/quality/objects/sha256/f9a2f74389e1488cd06a9f00c9eb2086396f47f6f2dec4f25ee791723541a0e8.json"
      - "writable_scope:.agentplane/tasks/202608280529-59VB06/supervision/declared-checks.json"
      - "writable_scope:.agentplane/tasks/202608280529-59VB06/supervision/implementation-evidence.json"
      - "writable_scope:.agentplane/tasks/202608280529-59VB06/verification/20260828060650926-cb1fbd290a69ab04.json"
      - "writable_scope:.agentplane/tasks/202608280529-59VB06/verification/20260828153621983-c6c6865d6eab595e.json"
      - "writable_scope:.agentplane/tasks/202608280529-59VB06/verification/20260828161611883-ae6fce25c62f3d26.json"
      - "writable_scope:.agentplane/tasks/202608280529-59VB06/verification/20260828161639959-3ac5a4b484ed090d.json"
      - "writable_scope:.agentplane/tasks/202608280529-59VB06/verification/20260828181914331-2b5187ee7edbae42.json"
      - "writable_scope:.agentplane/tasks/202608280529-59VB06/verification/20260828185032879-7a1266da64904bc0.json"
      - "writable_scope:.agentplane/tasks/202608280614-PCBY2N/README.md"
      - "writable_scope:.agentplane/tasks/202608280614-PCBY2N/blueprint/resolved-snapshot.json"
      - "writable_scope:.agentplane/tasks/202608280614-PCBY2N/pr/diffstat.txt"
      - "writable_scope:.agentplane/tasks/202608280614-PCBY2N/pr/github-body.md"
      - "writable_scope:.agentplane/tasks/202608280614-PCBY2N/pr/github-title.txt"
      - "writable_scope:.agentplane/tasks/202608280614-PCBY2N/pr/meta.json"
      - "writable_scope:.agentplane/tasks/202608280614-PCBY2N/pr/review.md"
      - "writable_scope:.agentplane/tasks/202608280614-PCBY2N/quality/20260828-112915024-recovery-context/evaluator-evidence-manifest.json"
      - "writable_scope:.agentplane/tasks/202608280614-PCBY2N/quality/20260828-112915024-recovery-context/evaluator-opinion.md"
      - "writable_scope:.agentplane/tasks/202608280614-PCBY2N/quality/20260828-112915024-recovery-context/evaluator-result.json"
      - "writable_scope:.agentplane/tasks/202608280614-PCBY2N/quality/20260828-112915024-recovery-context/evaluator-work-order.json"
      - "writable_scope:.agentplane/tasks/202608280614-PCBY2N/quality/20260828-112915024-recovery-context/quality-report.json"
      - "writable_scope:.agentplane/tasks/202608280614-PCBY2N/quality/objects/sha256/167112d23a3809a69ce11c590bb2894d6d3e3faf1345fba7aff144166661a3df.patch"
      - "writable_scope:.agentplane/tasks/202608280614-PCBY2N/quality/objects/sha256/8f90f782af46a966c76dd5da65e416c01cf3411622326198570c32a970fec3b3.json"
      - "writable_scope:.agentplane/tasks/202608280614-PCBY2N/quality/objects/sha256/9037cdf98253e70333ede9358d360264a85ee905be64a8723bbdd4ca71e02d4a.json"
      - "writable_scope:.agentplane/tasks/202608280614-PCBY2N/quality/objects/sha256/b36787aabcc52d981eca63d4e3af434e33107ed9ccf1ae128be481174364df82.json"
      - "writable_scope:.agentplane/tasks/202608280614-PCBY2N/quality/objects/sha256/d14785f890fc8471120d4b446e0726677356828d07d89a361a0f44e435661c50.md"
      - "writable_scope:.agentplane/tasks/202608280614-PCBY2N/supervision/declared-checks.json"
      - "writable_scope:.agentplane/tasks/202608280614-PCBY2N/supervision/implementation-evidence.json"
      - "writable_scope:.agentplane/tasks/202608280614-PCBY2N/verification/20260828112857349-7df3e4f50a81c6b3.json"
      - "writable_scope:.agentplane/tasks/202608281151-WQ89A1/README.md"
      - "writable_scope:.agentplane/tasks/202608281151-WQ89A1/blueprint/resolved-snapshot.json"
      - "writable_scope:.agentplane/tasks/202608281151-WQ89A1/pr/diffstat.txt"
      - "writable_scope:.agentplane/tasks/202608281151-WQ89A1/pr/github-body.md"
      - "writable_scope:.agentplane/tasks/202608281151-WQ89A1/pr/github-title.txt"
      - "writable_scope:.agentplane/tasks/202608281151-WQ89A1/pr/meta.json"
      - "writable_scope:.agentplane/tasks/202608281151-WQ89A1/pr/review.md"
      - "writable_scope:.agentplane/tasks/202608281151-WQ89A1/quality/20260828-150601429-recovery-context/evaluator-evidence-manifest.json"
      - "writable_scope:.agentplane/tasks/202608281151-WQ89A1/quality/20260828-150601429-recovery-context/evaluator-opinion.md"
      - "writable_scope:.agentplane/tasks/202608281151-WQ89A1/quality/20260828-150601429-recovery-context/evaluator-result.json"
      - "writable_scope:.agentplane/tasks/202608281151-WQ89A1/quality/20260828-150601429-recovery-context/evaluator-work-order.json"
      - "writable_scope:.agentplane/tasks/202608281151-WQ89A1/quality/20260828-150601429-recovery-context/quality-report.json"
      - "writable_scope:.agentplane/tasks/202608281151-WQ89A1/quality/objects/sha256/10cb032f0abf80e517280add04bb38fa45a38a4188077f4ec44801ba6bde1b60.md"
      - "writable_scope:.agentplane/tasks/202608281151-WQ89A1/quality/objects/sha256/43169d59cb987746b213286a613126ae2137afffaf804712307b1f2b3a741c91.json"
      - "writable_scope:.agentplane/tasks/202608281151-WQ89A1/quality/objects/sha256/82ffda48c5bd3c808954f2b5392fefca5582063c40c2e392ae8e7400dca3a781.json"
      - "writable_scope:.agentplane/tasks/202608281151-WQ89A1/quality/objects/sha256/9037cdf98253e70333ede9358d360264a85ee905be64a8723bbdd4ca71e02d4a.json"
      - "writable_scope:.agentplane/tasks/202608281151-WQ89A1/quality/objects/sha256/98f3e36b297b1437355f74e2067b979339e47078ca441a1b89e73b498e0029e9.patch"
      - "writable_scope:.agentplane/tasks/202608281151-WQ89A1/supervision/declared-checks.json"
      - "writable_scope:.agentplane/tasks/202608281151-WQ89A1/supervision/implementation-evidence.json"
      - "writable_scope:.agentplane/tasks/202608281151-WQ89A1/verification/20260828150529537-22af9751a01470a1.json"
      - "writable_scope:.agentplane/tasks/202608290844-7JCQPF/README.md"
      - "writable_scope:.agentplane/tasks/202608290844-7JCQPF/blueprint/resolved-snapshot.json"
      - "writable_scope:.agentplane/tasks/202608290844-7JCQPF/pr/diffstat.txt"
      - "writable_scope:.agentplane/tasks/202608290844-7JCQPF/pr/github-body.md"
      - "writable_scope:.agentplane/tasks/202608290844-7JCQPF/pr/github-title.txt"
      - "writable_scope:.agentplane/tasks/202608290844-7JCQPF/pr/meta.json"
      - "writable_scope:.agentplane/tasks/202608290844-7JCQPF/pr/review.md"
      - "writable_scope:.agentplane/tasks/202608290844-7JCQPF/quality/20260829-091527574-recovery-context/evaluator-evidence-manifest.json"
      - "writable_scope:.agentplane/tasks/202608290844-7JCQPF/quality/20260829-091527574-recovery-context/evaluator-opinion.md"
      - "writable_scope:.agentplane/tasks/202608290844-7JCQPF/quality/20260829-091527574-recovery-context/evaluator-result.json"
      - "writable_scope:.agentplane/tasks/202608290844-7JCQPF/quality/20260829-091527574-recovery-context/evaluator-work-order.json"
      - "writable_scope:.agentplane/tasks/202608290844-7JCQPF/quality/20260829-091527574-recovery-context/quality-report.json"
      - "writable_scope:.agentplane/tasks/202608290844-7JCQPF/quality/20260829-135755737-recovery-context/evaluator-evidence-manifest.json"
      - "writable_scope:.agentplane/tasks/202608290844-7JCQPF/quality/20260829-135755737-recovery-context/evaluator-opinion.md"
      - "writable_scope:.agentplane/tasks/202608290844-7JCQPF/quality/20260829-135755737-recovery-context/evaluator-result.json"
      - "writable_scope:.agentplane/tasks/202608290844-7JCQPF/quality/20260829-135755737-recovery-context/evaluator-work-order.json"
      - "writable_scope:.agentplane/tasks/202608290844-7JCQPF/quality/20260829-135755737-recovery-context/quality-report.json"
      - "writable_scope:.agentplane/tasks/202608290844-7JCQPF/quality/20260829-154051921-recovery-context/evaluator-evidence-manifest.json"
      - "writable_scope:.agentplane/tasks/202608290844-7JCQPF/quality/20260829-154051921-recovery-context/evaluator-work-order.json"
      - "writable_scope:.agentplane/tasks/202608290844-7JCQPF/quality/20260829-154257984-recovery-context/evaluator-evidence-manifest.json"
      - "writable_scope:.agentplane/tasks/202608290844-7JCQPF/quality/20260829-154257984-recovery-context/evaluator-work-order.json"
      - "writable_scope:.agentplane/tasks/202608290844-7JCQPF/quality/20260829-154622554-recovery-context/evaluator-evidence-manifest.json"
      - "writable_scope:.agentplane/tasks/202608290844-7JCQPF/quality/20260829-154622554-recovery-context/evaluator-opinion.md"
      - "writable_scope:.agentplane/tasks/202608290844-7JCQPF/quality/20260829-154622554-recovery-context/evaluator-result.json"
      - "writable_scope:.agentplane/tasks/202608290844-7JCQPF/quality/20260829-154622554-recovery-context/evaluator-work-order.json"
      - "writable_scope:.agentplane/tasks/202608290844-7JCQPF/quality/20260829-154622554-recovery-context/quality-report.json"
      - "writable_scope:.agentplane/tasks/202608290844-7JCQPF/quality/20260829-165628160-recovery-context/evaluator-evidence-manifest.json"
      - "writable_scope:.agentplane/tasks/202608290844-7JCQPF/quality/20260829-165628160-recovery-context/evaluator-opinion.md"
      - "writable_scope:.agentplane/tasks/202608290844-7JCQPF/quality/20260829-165628160-recovery-context/evaluator-result.json"
      - "writable_scope:.agentplane/tasks/202608290844-7JCQPF/quality/20260829-165628160-recovery-context/evaluator-work-order.json"
      - "writable_scope:.agentplane/tasks/202608290844-7JCQPF/quality/20260829-165628160-recovery-context/quality-report.json"
      - "writable_scope:.agentplane/tasks/202608290844-7JCQPF/quality/objects/sha256/00cb8f6790a2d104fb8674882268758d2e941322ed8e92c3b5dc9e428fd8dce4.patch"
      - "writable_scope:.agentplane/tasks/202608290844-7JCQPF/quality/objects/sha256/094a699c910341a58afcb15c22105ae1b76587fcc875a385ab29d52916473829.json"
      - "writable_scope:.agentplane/tasks/202608290844-7JCQPF/quality/objects/sha256/0ac40dd9a245bdd7a6904bf832c36d53c5e8cf0e6f16f59e6ecea9c0f6dd8abc.json"
      - "writable_scope:.agentplane/tasks/202608290844-7JCQPF/quality/objects/sha256/2258e008d9ba7a086ad71c563a02b042962c03b0c5c940f4ea42f62bbb0eb012.patch"
      - "writable_scope:.agentplane/tasks/202608290844-7JCQPF/quality/objects/sha256/4f0352c5d6a2182a46e1c6f73e77b5f2708ad05adf67f8236213cab6bf722e40.patch"
      - "writable_scope:.agentplane/tasks/202608290844-7JCQPF/quality/objects/sha256/5a942fdbf7ae26d4b99cd24f9825b1a69678fafaf17cea7b1cb6739ea2315ec7.md"
      - "writable_scope:.agentplane/tasks/202608290844-7JCQPF/quality/objects/sha256/8151ee2edd7f965a2ab2a99ae032f5bb0480bbd6b0920b6e390d19304e950091.md"
      - "writable_scope:.agentplane/tasks/202608290844-7JCQPF/quality/objects/sha256/8a9ba323a4f7313e683932e5a199789ec48f072e7b92129fab34109e8df996f6.md"
      - "writable_scope:.agentplane/tasks/202608290844-7JCQPF/quality/objects/sha256/8f122888e39edc7063c8e2334278428e1e94b3a887b1354c9a6d0ad6ec3054cf.md"
      - "writable_scope:.agentplane/tasks/202608290844-7JCQPF/quality/objects/sha256/9037cdf98253e70333ede9358d360264a85ee905be64a8723bbdd4ca71e02d4a.json"
      - "writable_scope:.agentplane/tasks/202608290844-7JCQPF/quality/objects/sha256/9c4220d19202ff86a1d136041f176c55546dedfb87bfb3c92d111f797b57070f.md"
      - "writable_scope:.agentplane/tasks/202608290844-7JCQPF/quality/objects/sha256/bf246ecc6aed6a80440a3a0197ee6a33faa53b12ac072fd16ecde736ee4d7a69.json"
      - "writable_scope:.agentplane/tasks/202608290844-7JCQPF/quality/objects/sha256/e292f4d015d55c072e7e21144fc8791343a332c84a64d49e6164ed43ac4537ca.md"
      - "writable_scope:.agentplane/tasks/202608290844-7JCQPF/quality/objects/sha256/e36dbbcacb05dd26f53c2a444202d9451db4063b531311834485b11970ed6072.json"
      - "writable_scope:.agentplane/tasks/202608290844-7JCQPF/quality/objects/sha256/eba6a62437a3e1722cad7b6d477654c71e7c4ecea013a52313e862621c811e58.patch"
      - "writable_scope:.agentplane/tasks/202608290844-7JCQPF/quality/objects/sha256/f5a5751e9d32d9d24fb39379371b7291cd6420c99d10ecf8f0283eb09e84094e.json"
      - "writable_scope:.agentplane/tasks/202608290844-7JCQPF/supervision/declared-checks.json"
      - "writable_scope:.agentplane/tasks/202608290844-7JCQPF/supervision/implementation-evidence.json"
      - "writable_scope:.agentplane/tasks/202608290844-7JCQPF/verification/20260829090048568-8570d238d5b793a3.json"
      - "writable_scope:.agentplane/tasks/202608290844-7JCQPF/verification/20260829091431764-e529c93dd7f5a93e.json"
      - "writable_scope:.agentplane/tasks/202608290844-7JCQPF/verification/20260829091815695-7a192569682c3990.json"
      - "writable_scope:.agentplane/tasks/202608290844-7JCQPF/verification/20260829121518627-935aca8b41573d83.json"
      - "writable_scope:.agentplane/tasks/202608290844-7JCQPF/verification/20260829133155703-ba3bf05e6e8ab9b2.json"
      - "writable_scope:.agentplane/tasks/202608290844-7JCQPF/verification/20260829135723903-1e369e8c538b8c1d.json"
      - "writable_scope:.agentplane/tasks/202608290844-7JCQPF/verification/20260829140319538-403bd5a3f235102c.json"
      - "writable_scope:.agentplane/tasks/202608290844-7JCQPF/verification/20260829142522018-696e567acb8481c2.json"
      - "writable_scope:.agentplane/tasks/202608290844-7JCQPF/verification/20260829142603828-ccd96a6a223662af.json"
      - "writable_scope:.agentplane/tasks/202608290844-7JCQPF/verification/20260829143621259-88a931bdab985c02.json"
      - "writable_scope:.agentplane/tasks/202608290844-7JCQPF/verification/20260829144725405-280eceee3679149d.json"
      - "writable_scope:.agentplane/tasks/202608290844-7JCQPF/verification/20260829145124375-d0d20769bc9e2777.json"
      - "writable_scope:.agentplane/tasks/202608290844-7JCQPF/verification/20260829161700623-370a4f491fb5a800.json"
      - "writable_scope:.agentplane/tasks/202608290844-7JCQPF/verification/20260829165606401-4bf622d61e8adf7c.json"
      - "writable_scope:.agentplane/tasks/202608290920-1PZGG8/README.md"
      - "writable_scope:.agentplane/tasks/202608290920-1PZGG8/blueprint/resolved-snapshot.json"
      - "writable_scope:.agentplane/tasks/202608290920-1PZGG8/pr/diffstat.txt"
      - "writable_scope:.agentplane/tasks/202608290920-1PZGG8/pr/github-body.md"
      - "writable_scope:.agentplane/tasks/202608290920-1PZGG8/pr/github-title.txt"
      - "writable_scope:.agentplane/tasks/202608290920-1PZGG8/pr/meta.json"
      - "writable_scope:.agentplane/tasks/202608290920-1PZGG8/pr/review.md"
      - "writable_scope:.agentplane/tasks/202608290920-1PZGG8/quality/20260829-100207338-recovery-context/evaluator-evidence-manifest.json"
      - "writable_scope:.agentplane/tasks/202608290920-1PZGG8/quality/20260829-100207338-recovery-context/evaluator-follow-up.json"
      - "writable_scope:.agentplane/tasks/202608290920-1PZGG8/quality/20260829-100207338-recovery-context/evaluator-opinion.md"
      - "writable_scope:.agentplane/tasks/202608290920-1PZGG8/quality/20260829-100207338-recovery-context/evaluator-result.json"
      - "writable_scope:.agentplane/tasks/202608290920-1PZGG8/quality/20260829-100207338-recovery-context/evaluator-work-order.json"
      - "writable_scope:.agentplane/tasks/202608290920-1PZGG8/quality/20260829-100207338-recovery-context/quality-report.json"
      - "writable_scope:.agentplane/tasks/202608290920-1PZGG8/quality/20260829-112038164-recovery-context/evaluator-evidence-manifest.json"
      - "writable_scope:.agentplane/tasks/202608290920-1PZGG8/quality/20260829-112038164-recovery-context/evaluator-opinion.md"
      - "writable_scope:.agentplane/tasks/202608290920-1PZGG8/quality/20260829-112038164-recovery-context/evaluator-result.json"
      - "writable_scope:.agentplane/tasks/202608290920-1PZGG8/quality/20260829-112038164-recovery-context/evaluator-work-order.json"
      - "writable_scope:.agentplane/tasks/202608290920-1PZGG8/quality/20260829-112038164-recovery-context/quality-report.json"
      - "writable_scope:.agentplane/tasks/202608290920-1PZGG8/quality/objects/sha256/33ccc1d6b91deeda43925dda11bcb7871d4177f0b26d9f3f8f154203d618a3bf.patch"
      - "writable_scope:.agentplane/tasks/202608290920-1PZGG8/quality/objects/sha256/5bf18a85abd14fe0a9a2152613220bc2ad006608710b4b329837619185c0189d.json"
      - "writable_scope:.agentplane/tasks/202608290920-1PZGG8/quality/objects/sha256/6238bed33ff5edad09db6bb76534efbfd68babd7775a75c0db7b0b53a128a033.patch"
      - "writable_scope:.agentplane/tasks/202608290920-1PZGG8/quality/objects/sha256/6ab11382be85eb26466f9d0685b65b522e69c1ff5b74c1f152d4cb04e06604ca.md"
      - "writable_scope:.agentplane/tasks/202608290920-1PZGG8/quality/objects/sha256/6ff4eeeac1fb74deb063645fd271923073c9a9756944f516b8d10fb36ad1dcfd.json"
      - "writable_scope:.agentplane/tasks/202608290920-1PZGG8/quality/objects/sha256/9037cdf98253e70333ede9358d360264a85ee905be64a8723bbdd4ca71e02d4a.json"
      - "writable_scope:.agentplane/tasks/202608290920-1PZGG8/quality/objects/sha256/de714e1ae1e5247163e5007b3fe727baf606367028fdd58ebcb9f94f7333b4d9.md"
      - "writable_scope:.agentplane/tasks/202608290920-1PZGG8/quality/objects/sha256/e35839039295af7993b80adfdaa63da9729d59a2955432cd06975115f9057010.json"
      - "writable_scope:.agentplane/tasks/202608290920-1PZGG8/supervision/declared-checks.json"
      - "writable_scope:.agentplane/tasks/202608290920-1PZGG8/supervision/implementation-evidence.json"
      - "writable_scope:.agentplane/tasks/202608290920-1PZGG8/verification/20260829093430895-6606b487cced4039.json"
      - "writable_scope:.agentplane/tasks/202608290920-1PZGG8/verification/20260829105535831-b4c997c8906f47d0.json"
      - "writable_scope:.agentplane/tasks/202608290920-1PZGG8/verification/20260829105705983-3742ca4441ecc2c3.json"
      - "writable_scope:.agentplane/tasks/202608290920-1PZGG8/verification/20260829105843774-eef5a01e10b276a9.json"
      - "writable_scope:.agentplane/tasks/202608290920-1PZGG8/verification/20260829110002485-b669a1777bc06949.json"
      - "writable_scope:.agentplane/tasks/202608290920-1PZGG8/verification/20260829112024099-2dc4de9558ceb003.json"
      - "writable_scope:.agentplane/tasks/202608291005-K5TG4D/README.md"
      - "writable_scope:.agentplane/tasks/202608291005-K5TG4D/blueprint/resolved-snapshot.json"
      - "writable_scope:.agentplane/tasks/202608291005-K5TG4D/pr/diffstat.txt"
      - "writable_scope:.agentplane/tasks/202608291005-K5TG4D/pr/github-body.md"
      - "writable_scope:.agentplane/tasks/202608291005-K5TG4D/pr/github-title.txt"
      - "writable_scope:.agentplane/tasks/202608291005-K5TG4D/pr/meta.json"
      - "writable_scope:.agentplane/tasks/202608291005-K5TG4D/pr/review.md"
      - "writable_scope:.agentplane/tasks/202608291005-K5TG4D/quality/20260829-103229021-recovery-context/evaluator-evidence-manifest.json"
      - "writable_scope:.agentplane/tasks/202608291005-K5TG4D/quality/20260829-103229021-recovery-context/evaluator-follow-up.json"
      - "writable_scope:.agentplane/tasks/202608291005-K5TG4D/quality/20260829-103229021-recovery-context/evaluator-opinion.md"
      - "writable_scope:.agentplane/tasks/202608291005-K5TG4D/quality/20260829-103229021-recovery-context/evaluator-result.json"
      - "writable_scope:.agentplane/tasks/202608291005-K5TG4D/quality/20260829-103229021-recovery-context/evaluator-work-order.json"
      - "writable_scope:.agentplane/tasks/202608291005-K5TG4D/quality/20260829-103229021-recovery-context/quality-report.json"
      - "writable_scope:.agentplane/tasks/202608291005-K5TG4D/quality/20260829-104022155-recovery-context/evaluator-evidence-manifest.json"
      - "writable_scope:.agentplane/tasks/202608291005-K5TG4D/quality/20260829-104022155-recovery-context/evaluator-opinion.md"
      - "writable_scope:.agentplane/tasks/202608291005-K5TG4D/quality/20260829-104022155-recovery-context/evaluator-result.json"
      - "writable_scope:.agentplane/tasks/202608291005-K5TG4D/quality/20260829-104022155-recovery-context/evaluator-work-order.json"
      - "writable_scope:.agentplane/tasks/202608291005-K5TG4D/quality/20260829-104022155-recovery-context/quality-report.json"
      - "writable_scope:.agentplane/tasks/202608291005-K5TG4D/quality/20260829-173248762-recovery-context/evaluator-evidence-manifest.json"
      - "writable_scope:.agentplane/tasks/202608291005-K5TG4D/quality/20260829-173248762-recovery-context/evaluator-follow-up.json"
      - "writable_scope:.agentplane/tasks/202608291005-K5TG4D/quality/20260829-173248762-recovery-context/evaluator-opinion.md"
      - "writable_scope:.agentplane/tasks/202608291005-K5TG4D/quality/20260829-173248762-recovery-context/evaluator-result.json"
      - "writable_scope:.agentplane/tasks/202608291005-K5TG4D/quality/20260829-173248762-recovery-context/evaluator-work-order.json"
      - "writable_scope:.agentplane/tasks/202608291005-K5TG4D/quality/20260829-173248762-recovery-context/quality-report.json"
      - "writable_scope:.agentplane/tasks/202608291005-K5TG4D/quality/20260829-175010445-recovery-context/evaluator-evidence-manifest.json"
      - "writable_scope:.agentplane/tasks/202608291005-K5TG4D/quality/20260829-175010445-recovery-context/evaluator-opinion.md"
      - "writable_scope:.agentplane/tasks/202608291005-K5TG4D/quality/20260829-175010445-recovery-context/evaluator-result.json"
      - "writable_scope:.agentplane/tasks/202608291005-K5TG4D/quality/20260829-175010445-recovery-context/evaluator-work-order.json"
      - "writable_scope:.agentplane/tasks/202608291005-K5TG4D/quality/20260829-175010445-recovery-context/quality-report.json"
      - "writable_scope:.agentplane/tasks/202608291005-K5TG4D/quality/20260829-182509713-recovery-context/evaluator-evidence-manifest.json"
      - "writable_scope:.agentplane/tasks/202608291005-K5TG4D/quality/20260829-182509713-recovery-context/evaluator-opinion.md"
      - "writable_scope:.agentplane/tasks/202608291005-K5TG4D/quality/20260829-182509713-recovery-context/evaluator-result.json"
      - "writable_scope:.agentplane/tasks/202608291005-K5TG4D/quality/20260829-182509713-recovery-context/evaluator-work-order.json"
      - "writable_scope:.agentplane/tasks/202608291005-K5TG4D/quality/20260829-182509713-recovery-context/quality-report.json"
      - "writable_scope:.agentplane/tasks/202608291005-K5TG4D/quality/20260829-185822288-recovery-context/evaluator-evidence-manifest.json"
      - "writable_scope:.agentplane/tasks/202608291005-K5TG4D/quality/20260829-185822288-recovery-context/evaluator-opinion.md"
      - "writable_scope:.agentplane/tasks/202608291005-K5TG4D/quality/20260829-185822288-recovery-context/evaluator-result.json"
      - "writable_scope:.agentplane/tasks/202608291005-K5TG4D/quality/20260829-185822288-recovery-context/evaluator-work-order.json"
      - "writable_scope:.agentplane/tasks/202608291005-K5TG4D/quality/20260829-185822288-recovery-context/quality-report.json"
      - "writable_scope:.agentplane/tasks/202608291005-K5TG4D/quality/objects/sha256/03778a2ec59a89f86c77156b5c41749d8a0acbbdbda469294abad9d305f10155.json"
      - "writable_scope:.agentplane/tasks/202608291005-K5TG4D/quality/objects/sha256/07880f19b498431ef1d30b34fe2764e8b0fc650f427c040a2f0edc42c28f3b77.patch"
      - "writable_scope:.agentplane/tasks/202608291005-K5TG4D/quality/objects/sha256/0ced6f2c554a98af94d8e04123277a903da54392ebd92f3890c3a1c95ad75119.patch"
      - "writable_scope:.agentplane/tasks/202608291005-K5TG4D/quality/objects/sha256/1766f852085b004801c6b30bc74a4001f961ab6633e748f9d98d616dc6014fd4.md"
      - "writable_scope:.agentplane/tasks/202608291005-K5TG4D/quality/objects/sha256/2c17fdb65687181ba468e5cc9c2c3f984594a087910177a2a5891e3d95c0b2bb.patch"
      - "writable_scope:.agentplane/tasks/202608291005-K5TG4D/quality/objects/sha256/3bc81fab9e1463c5f3fc60e5327889cf576ad0e6813951c0f8f1c2aa2eb9ee55.patch"
      - "writable_scope:.agentplane/tasks/202608291005-K5TG4D/quality/objects/sha256/3da9d9fcb461bfc780a881e70453aaccb486b17c451b01ad89eb2b0eaa86b047.json"
      - "writable_scope:.agentplane/tasks/202608291005-K5TG4D/quality/objects/sha256/4514df8c306e4d9a4ba9c3d9383dee50e018667e53be66060da5eff32d761945.md"
      - "writable_scope:.agentplane/tasks/202608291005-K5TG4D/quality/objects/sha256/525c6509aac711b4d08c0090cc345b850ddebc82785837269bf692ee7e0f3136.md"
      - "writable_scope:.agentplane/tasks/202608291005-K5TG4D/quality/objects/sha256/69ada31950ca4db1dad4000541000ad3a3ab1150d54f116721dd24d4e2524dcc.json"
      - "writable_scope:.agentplane/tasks/202608291005-K5TG4D/quality/objects/sha256/727ea4cda0736b773d528b2de77e5229e46b9a933447c5a044ab9c8b9023c7b5.md"
      - "writable_scope:.agentplane/tasks/202608291005-K5TG4D/quality/objects/sha256/73eb709075c74a980968c0120a0294a67f005c9c2ff4ce66b7d285a631ceec90.json"
      - "writable_scope:.agentplane/tasks/202608291005-K5TG4D/quality/objects/sha256/7dc71118b2a8cd17ec7401ec0c3f4bdf02a52e16ca3172258eb6ae28fb15e051.json"
      - "writable_scope:.agentplane/tasks/202608291005-K5TG4D/quality/objects/sha256/80da80d9c3d52d3e25efbebf8895def8aa6134897e7646a5ed91c95a5fb37eb7.md"
      - "writable_scope:.agentplane/tasks/202608291005-K5TG4D/quality/objects/sha256/8d06a0bda439bd3cbb2a6a861bb3d632c3591570cb548e661e456561e6ebd0e3.patch"
      - "writable_scope:.agentplane/tasks/202608291005-K5TG4D/quality/objects/sha256/9037cdf98253e70333ede9358d360264a85ee905be64a8723bbdd4ca71e02d4a.json"
      - "writable_scope:.agentplane/tasks/202608291005-K5TG4D/quality/objects/sha256/991fe4f8cfd40b027fed1e34442956c77ba8324246953e0dfae571500cb2b31d.patch"
      - "writable_scope:.agentplane/tasks/202608291005-K5TG4D/quality/objects/sha256/c97155edadb265cb8b9e27094be1f5b53e338048ada37daee80cc3249047ec4f.json"
      - "writable_scope:.agentplane/tasks/202608291005-K5TG4D/quality/objects/sha256/de7dbf9bc2b623c88ba3ae813c42951e54995cde51ca26406dd6b51bf6fb6653.md"
      - "writable_scope:.agentplane/tasks/202608291005-K5TG4D/quality/objects/sha256/ebc86feacec7bdf43d9a1fdbf283a72e4634bef2dfceb9d03c2812644d0bc6fe.json"
      - "writable_scope:.agentplane/tasks/202608291005-K5TG4D/supervision/declared-checks.json"
      - "writable_scope:.agentplane/tasks/202608291005-K5TG4D/supervision/implementation-evidence.json"
      - "writable_scope:.agentplane/tasks/202608291005-K5TG4D/verification/20260829102927784-2ba47b70cf364a12.json"
      - "writable_scope:.agentplane/tasks/202608291005-K5TG4D/verification/20260829103744095-ab63071946986abe.json"
      - "writable_scope:.agentplane/tasks/202608291005-K5TG4D/verification/20260829104004712-22365c9597c0e6ce.json"
      - "writable_scope:.agentplane/tasks/202608291005-K5TG4D/verification/20260829171951260-f6b36db68eb2b50b.json"
      - "writable_scope:.agentplane/tasks/202608291005-K5TG4D/verification/20260829172303993-9558dcfb624109e6.json"
      - "writable_scope:.agentplane/tasks/202608291005-K5TG4D/verification/20260829173023681-a890bff98f1f1613.json"
      - "writable_scope:.agentplane/tasks/202608291005-K5TG4D/verification/20260829173606626-1d584fb7c8bed007.json"
      - "writable_scope:.agentplane/tasks/202608291005-K5TG4D/verification/20260829174126559-55291239fcb3e058.json"
      - "writable_scope:.agentplane/tasks/202608291005-K5TG4D/verification/20260829174619560-6bb5d9fd8340f4b4.json"
      - "writable_scope:.agentplane/tasks/202608291005-K5TG4D/verification/20260829174953384-9a1611a4242d4cd2.json"
      - "writable_scope:.agentplane/tasks/202608291005-K5TG4D/verification/20260829182451924-4a24553f3cae3f0f.json"
      - "writable_scope:.agentplane/tasks/202608291005-K5TG4D/verification/20260829184121098-79ba9f5978aab118.json"
      - "writable_scope:.agentplane/tasks/202608291005-K5TG4D/verification/20260829185804313-ec46cd710c0a1ae8.json"
      - "writable_scope:.agentplane/tasks/202608291505-F5AN0W/README.md"
      - "writable_scope:.agentplane/tasks/202608291505-F5AN0W/blueprint/resolved-snapshot.json"
      - "writable_scope:.agentplane/tasks/202608291505-F5AN0W/pr/diffstat.txt"
      - "writable_scope:.agentplane/tasks/202608291505-F5AN0W/pr/github-body.md"
      - "writable_scope:.agentplane/tasks/202608291505-F5AN0W/pr/github-title.txt"
      - "writable_scope:.agentplane/tasks/202608291505-F5AN0W/pr/meta.json"
      - "writable_scope:.agentplane/tasks/202608291505-F5AN0W/pr/review.md"
      - "writable_scope:.agentplane/tasks/202608291505-F5AN0W/quality/20260829-151703472-recovery-context/evaluator-evidence-manifest.json"
      - "writable_scope:.agentplane/tasks/202608291505-F5AN0W/quality/20260829-151703472-recovery-context/evaluator-opinion.md"
      - "writable_scope:.agentplane/tasks/202608291505-F5AN0W/quality/20260829-151703472-recovery-context/evaluator-result.json"
      - "writable_scope:.agentplane/tasks/202608291505-F5AN0W/quality/20260829-151703472-recovery-context/evaluator-work-order.json"
      - "writable_scope:.agentplane/tasks/202608291505-F5AN0W/quality/20260829-151703472-recovery-context/quality-report.json"
      - "writable_scope:.agentplane/tasks/202608291505-F5AN0W/quality/objects/sha256/34de800803c95065a60ed554ec20ee9e458e08e3eba91b1e37ed7a5fc6939a61.json"
      - "writable_scope:.agentplane/tasks/202608291505-F5AN0W/quality/objects/sha256/3be09f0b87c195e91069dbd310c3854392dd52abe1630e89c3c0b44acfd4f669.patch"
      - "writable_scope:.agentplane/tasks/202608291505-F5AN0W/quality/objects/sha256/41553f2e37d02a2a9ed9c27741445e29255fbfcc80aa18d77feafed25fb17fd8.md"
      - "writable_scope:.agentplane/tasks/202608291505-F5AN0W/quality/objects/sha256/4ed68c6fd1d0c009d994cd956e8cb679ed2f606ddcae63c2e86222ac1634e772.json"
      - "writable_scope:.agentplane/tasks/202608291505-F5AN0W/quality/objects/sha256/9037cdf98253e70333ede9358d360264a85ee905be64a8723bbdd4ca71e02d4a.json"
      - "writable_scope:.agentplane/tasks/202608291505-F5AN0W/supervision/declared-checks.json"
      - "writable_scope:.agentplane/tasks/202608291505-F5AN0W/supervision/implementation-evidence.json"
      - "writable_scope:.agentplane/tasks/202608291505-F5AN0W/verification/20260829151633691-2b8fca041d5695de.json"
      - "writable_scope:.agentplane/tasks/202608292032-1K47B8/README.md"
      - "writable_scope:.agentplane/tasks/202608292032-1K47B8/blueprint/resolved-snapshot.json"
      - "writable_scope:.agentplane/tasks/202608292032-1K47B8/pr/diffstat.txt"
      - "writable_scope:.agentplane/tasks/202608292032-1K47B8/pr/github-body.md"
      - "writable_scope:.agentplane/tasks/202608292032-1K47B8/pr/github-title.txt"
      - "writable_scope:.agentplane/tasks/202608292032-1K47B8/pr/meta.json"
      - "writable_scope:.agentplane/tasks/202608292032-1K47B8/pr/review.md"
      - "writable_scope:.agentplane/tasks/202608292032-1K47B8/quality/20260829-221228710-recovery-context/evaluator-evidence-manifest.json"
      - "writable_scope:.agentplane/tasks/202608292032-1K47B8/quality/20260829-221228710-recovery-context/evaluator-opinion.md"
      - "writable_scope:.agentplane/tasks/202608292032-1K47B8/quality/20260829-221228710-recovery-context/evaluator-result.json"
      - "writable_scope:.agentplane/tasks/202608292032-1K47B8/quality/20260829-221228710-recovery-context/evaluator-work-order.json"
      - "writable_scope:.agentplane/tasks/202608292032-1K47B8/quality/20260829-221228710-recovery-context/quality-report.json"
      - "writable_scope:.agentplane/tasks/202608292032-1K47B8/quality/20260830-014956776-recovery-context/evaluator-evidence-manifest.json"
      - "writable_scope:.agentplane/tasks/202608292032-1K47B8/quality/20260830-014956776-recovery-context/evaluator-follow-up.json"
      - "writable_scope:.agentplane/tasks/202608292032-1K47B8/quality/20260830-014956776-recovery-context/evaluator-opinion.md"
      - "writable_scope:.agentplane/tasks/202608292032-1K47B8/quality/20260830-014956776-recovery-context/evaluator-result.json"
      - "writable_scope:.agentplane/tasks/202608292032-1K47B8/quality/20260830-014956776-recovery-context/evaluator-work-order.json"
      - "writable_scope:.agentplane/tasks/202608292032-1K47B8/quality/20260830-014956776-recovery-context/quality-report.json"
      - "writable_scope:.agentplane/tasks/202608292032-1K47B8/quality/20260830-020852586-recovery-context/evaluator-evidence-manifest.json"
      - "writable_scope:.agentplane/tasks/202608292032-1K47B8/quality/20260830-020852586-recovery-context/evaluator-follow-up.json"
      - "writable_scope:.agentplane/tasks/202608292032-1K47B8/quality/20260830-020852586-recovery-context/evaluator-opinion.md"
      - "writable_scope:.agentplane/tasks/202608292032-1K47B8/quality/20260830-020852586-recovery-context/evaluator-result.json"
      - "writable_scope:.agentplane/tasks/202608292032-1K47B8/quality/20260830-020852586-recovery-context/evaluator-work-order.json"
      - "writable_scope:.agentplane/tasks/202608292032-1K47B8/quality/20260830-020852586-recovery-context/quality-report.json"
      - "writable_scope:.agentplane/tasks/202608292032-1K47B8/quality/20260830-022616722-recovery-context/evaluator-evidence-manifest.json"
      - "writable_scope:.agentplane/tasks/202608292032-1K47B8/quality/20260830-022616722-recovery-context/evaluator-follow-up.json"
      - "writable_scope:.agentplane/tasks/202608292032-1K47B8/quality/20260830-022616722-recovery-context/evaluator-opinion.md"
      - "writable_scope:.agentplane/tasks/202608292032-1K47B8/quality/20260830-022616722-recovery-context/evaluator-result.json"
      - "writable_scope:.agentplane/tasks/202608292032-1K47B8/quality/20260830-022616722-recovery-context/evaluator-work-order.json"
      - "writable_scope:.agentplane/tasks/202608292032-1K47B8/quality/20260830-022616722-recovery-context/quality-report.json"
      - "writable_scope:.agentplane/tasks/202608292032-1K47B8/quality/20260830-031507878-recovery-context/evaluator-evidence-manifest.json"
      - "writable_scope:.agentplane/tasks/202608292032-1K47B8/quality/20260830-031507878-recovery-context/evaluator-opinion.md"
      - "writable_scope:.agentplane/tasks/202608292032-1K47B8/quality/20260830-031507878-recovery-context/evaluator-result.json"
      - "writable_scope:.agentplane/tasks/202608292032-1K47B8/quality/20260830-031507878-recovery-context/evaluator-work-order.json"
      - "writable_scope:.agentplane/tasks/202608292032-1K47B8/quality/20260830-031507878-recovery-context/quality-report.json"
      - "writable_scope:.agentplane/tasks/202608292032-1K47B8/quality/objects/sha256/057b4113ef6c1d87a6a0c3ac3c46939bd871e81dc4f3c1b80129869074842092.patch"
      - "writable_scope:.agentplane/tasks/202608292032-1K47B8/quality/objects/sha256/2b30736d79fa3985a602ca79b8003a85696c1631aa650eb0a69f4b62a313d474.json"
      - "writable_scope:.agentplane/tasks/202608292032-1K47B8/quality/objects/sha256/31eb70979ca99b1b7baf8981a0aa4553f7836924a5a994ef188028919b165c2b.patch"
      - "writable_scope:.agentplane/tasks/202608292032-1K47B8/quality/objects/sha256/3dd6f4403a5f554c55142963371a7073049d6182f7d27407b73e562303e9abce.patch"
      - "writable_scope:.agentplane/tasks/202608292032-1K47B8/quality/objects/sha256/862b552d27a033d4119e9ae7e5436b8c29a143456489a4d14fe36e085df344c8.md"
      - "writable_scope:.agentplane/tasks/202608292032-1K47B8/quality/objects/sha256/8c21a0dae102df37781ea0703471756a6f4d2d97fcb284160d913ae3a336695e.json"
      - "writable_scope:.agentplane/tasks/202608292032-1K47B8/quality/objects/sha256/9037cdf98253e70333ede9358d360264a85ee905be64a8723bbdd4ca71e02d4a.json"
      - "writable_scope:.agentplane/tasks/202608292032-1K47B8/quality/objects/sha256/95b210af54b40faac12625eb2e712a51b734ab5d29796b4091d4b8ed4ba80724.md"
      - "writable_scope:.agentplane/tasks/202608292032-1K47B8/quality/objects/sha256/98a65c6e898cf6302e155442f9e9c0d591d7bf2aadd28d411d264e8c8b7485be.md"
      - "writable_scope:.agentplane/tasks/202608292032-1K47B8/quality/objects/sha256/9ce711649887bc636881f16928a22670e786265ea0c117f13d2613bc1b6f5fc2.patch"
      - "writable_scope:.agentplane/tasks/202608292032-1K47B8/quality/objects/sha256/9e9280b5ceb12fee8fdf6e8b7e283f15038b1c7e8f386ff82f56537c1b9c0ef7.md"
      - "writable_scope:.agentplane/tasks/202608292032-1K47B8/quality/objects/sha256/a042c1178c6dc91f1dba1c8d49a4edcb23a1ace5fa440eb47fcbe4820e3aeb19.json"
      - "writable_scope:.agentplane/tasks/202608292032-1K47B8/quality/objects/sha256/a1e6b2fe5c8facd48dfc66602704770fca1a35152897611f9d31210b22ee8a67.json"
      - "writable_scope:.agentplane/tasks/202608292032-1K47B8/quality/objects/sha256/cdccd39e524d1c90764685a8edd6ed62359da3abd8661ae465fa779bd9f3d0f9.json"
      - "writable_scope:.agentplane/tasks/202608292032-1K47B8/quality/objects/sha256/d79cfc55ccb00071fa070c6bbd3fdb6f55514df2d3d0381e943934ecaa5a55fc.patch"
      - "writable_scope:.agentplane/tasks/202608292032-1K47B8/quality/objects/sha256/ec06c6e7b7c18b069d7feb65ee296ee81d6dd16038b64f87e395a5e48cec1b36.md"
      - "writable_scope:.agentplane/tasks/202608292032-1K47B8/quality/objects/sha256/ef17fe668230493a9b07f598b59d087f0c79b80eefbd629aaeadaa33cdb8d767.json"
      - "writable_scope:.agentplane/tasks/202608292032-1K47B8/supervision/declared-checks.json"
      - "writable_scope:.agentplane/tasks/202608292032-1K47B8/supervision/implementation-evidence.json"
      - "writable_scope:.agentplane/tasks/202608292032-1K47B8/verification/20260829204319619-6c577c9c8306a169.json"
      - "writable_scope:.agentplane/tasks/202608292032-1K47B8/verification/20260829210140898-e3d969adc161f644.json"
      - "writable_scope:.agentplane/tasks/202608292032-1K47B8/verification/20260829212246580-d0145ef1b109b582.json"
      - "writable_scope:.agentplane/tasks/202608292032-1K47B8/verification/20260829213703792-b4d5487c553f5a17.json"
      - "writable_scope:.agentplane/tasks/202608292032-1K47B8/verification/20260829214826738-20b5311a327c1579.json"
      - "writable_scope:.agentplane/tasks/202608292032-1K47B8/verification/20260829215542838-893d49886b2f4a8e.json"
      - "writable_scope:.agentplane/tasks/202608292032-1K47B8/verification/20260829221218641-6fb97c97e2e96fa0.json"
      - "writable_scope:.agentplane/tasks/202608292032-1K47B8/verification/20260830003005735-5d60d1d702715321.json"
      - "writable_scope:.agentplane/tasks/202608292032-1K47B8/verification/20260830014945273-2738197afdbf32cb.json"
      - "writable_scope:.agentplane/tasks/202608292032-1K47B8/verification/20260830020840555-6abd518e792f9be0.json"
      - "writable_scope:.agentplane/tasks/202608292032-1K47B8/verification/20260830022602801-f4386fc8af0c0a93.json"
      - "writable_scope:.agentplane/tasks/202608292032-1K47B8/verification/20260830025715800-1f7012fe8ad951d0.json"
      - "writable_scope:.agentplane/tasks/202608292032-1K47B8/verification/20260830031455405-6315535599fc124b.json"
      - "writable_scope:.agentplane/tasks/202608292218-3N0FBK/README.md"
      - "writable_scope:.agentplane/tasks/202608292218-3N0FBK/blueprint/resolved-snapshot.json"
      - "writable_scope:.agentplane/tasks/202608292218-3N0FBK/pr/diffstat.txt"
      - "writable_scope:.agentplane/tasks/202608292218-3N0FBK/pr/github-body.md"
      - "writable_scope:.agentplane/tasks/202608292218-3N0FBK/pr/github-title.txt"
      - "writable_scope:.agentplane/tasks/202608292218-3N0FBK/pr/meta.json"
      - "writable_scope:.agentplane/tasks/202608292218-3N0FBK/pr/review.md"
      - "writable_scope:.agentplane/tasks/202608292218-3N0FBK/quality/20260829-232019133-recovery-context/evaluator-evidence-manifest.json"
      - "writable_scope:.agentplane/tasks/202608292218-3N0FBK/quality/20260829-232019133-recovery-context/evaluator-opinion.md"
      - "writable_scope:.agentplane/tasks/202608292218-3N0FBK/quality/20260829-232019133-recovery-context/evaluator-result.json"
      - "writable_scope:.agentplane/tasks/202608292218-3N0FBK/quality/20260829-232019133-recovery-context/evaluator-work-order.json"
      - "writable_scope:.agentplane/tasks/202608292218-3N0FBK/quality/20260829-232019133-recovery-context/quality-report.json"
      - "writable_scope:.agentplane/tasks/202608292218-3N0FBK/quality/objects/sha256/0746e6bf83a188f6678201af5c5c2e782aaaa0faebaf297aeaf0f1b9057cf4c2.md"
      - "writable_scope:.agentplane/tasks/202608292218-3N0FBK/quality/objects/sha256/6508f2281bdb76c7a51465f00997415cbb1144f19fa37a27045d5eb8eeaa13cf.patch"
      - "writable_scope:.agentplane/tasks/202608292218-3N0FBK/quality/objects/sha256/705fd23cea4f0661155d847cbe29aa51c0c7ce19052019f39df3424f3d34d10d.json"
      - "writable_scope:.agentplane/tasks/202608292218-3N0FBK/quality/objects/sha256/9037cdf98253e70333ede9358d360264a85ee905be64a8723bbdd4ca71e02d4a.json"
      - "writable_scope:.agentplane/tasks/202608292218-3N0FBK/quality/objects/sha256/9f512f0819486738a0914d14aafef8ee94d25191007e8e94c679c6aedca6fbd9.json"
      - "writable_scope:.agentplane/tasks/202608292218-3N0FBK/supervision/declared-checks.json"
      - "writable_scope:.agentplane/tasks/202608292218-3N0FBK/supervision/implementation-evidence.json"
      - "writable_scope:.agentplane/tasks/202608292218-3N0FBK/verification/20260829223458865-779a4c712ea93918.json"
      - "writable_scope:.agentplane/tasks/202608292218-3N0FBK/verification/20260829224625339-315ba0801ec5e6ea.json"
      - "writable_scope:.agentplane/tasks/202608292218-3N0FBK/verification/20260829225800434-b5f93cf6b11f2c61.json"
      - "writable_scope:.agentplane/tasks/202608292218-3N0FBK/verification/20260829230555501-2ec025e699fda236.json"
      - "writable_scope:.agentplane/tasks/202608292218-3N0FBK/verification/20260829232002016-276e3b6422ad5f09.json"
      - "writable_scope:.agentplane/tasks/202608300119-ZHYXRS/README.md"
      - "writable_scope:.agentplane/tasks/202608300119-ZHYXRS/blueprint/resolved-snapshot.json"
      - "writable_scope:.agentplane/tasks/202608300119-ZHYXRS/pr/diffstat.txt"
      - "writable_scope:.agentplane/tasks/202608300119-ZHYXRS/pr/github-body.md"
      - "writable_scope:.agentplane/tasks/202608300119-ZHYXRS/pr/github-title.txt"
      - "writable_scope:.agentplane/tasks/202608300119-ZHYXRS/pr/meta.json"
      - "writable_scope:.agentplane/tasks/202608300119-ZHYXRS/pr/review.md"
      - "writable_scope:.agentplane/tasks/202608300119-ZHYXRS/quality/20260830-014145339-recovery-context/evaluator-evidence-manifest.json"
      - "writable_scope:.agentplane/tasks/202608300119-ZHYXRS/quality/20260830-014145339-recovery-context/evaluator-opinion.md"
      - "writable_scope:.agentplane/tasks/202608300119-ZHYXRS/quality/20260830-014145339-recovery-context/evaluator-result.json"
      - "writable_scope:.agentplane/tasks/202608300119-ZHYXRS/quality/20260830-014145339-recovery-context/evaluator-work-order.json"
      - "writable_scope:.agentplane/tasks/202608300119-ZHYXRS/quality/20260830-014145339-recovery-context/quality-report.json"
      - "writable_scope:.agentplane/tasks/202608300119-ZHYXRS/quality/20260830-022732861-recovery-context/evaluator-evidence-manifest.json"
      - "writable_scope:.agentplane/tasks/202608300119-ZHYXRS/quality/20260830-022732861-recovery-context/evaluator-opinion.md"
      - "writable_scope:.agentplane/tasks/202608300119-ZHYXRS/quality/20260830-022732861-recovery-context/evaluator-result.json"
      - "writable_scope:.agentplane/tasks/202608300119-ZHYXRS/quality/20260830-022732861-recovery-context/evaluator-work-order.json"
      - "writable_scope:.agentplane/tasks/202608300119-ZHYXRS/quality/20260830-022732861-recovery-context/quality-report.json"
      - "writable_scope:.agentplane/tasks/202608300119-ZHYXRS/quality/objects/sha256/085818fb482ed6c75bdcd72074d2a06cd54a8963642055db58f4d5f95a5f417c.json"
      - "writable_scope:.agentplane/tasks/202608300119-ZHYXRS/quality/objects/sha256/0ae8f7054187226c4378474e61a236b83e14b480899aed7def309c417740ebc8.json"
      - "writable_scope:.agentplane/tasks/202608300119-ZHYXRS/quality/objects/sha256/68cd886e72e9a681f60c9770ffb31cc09b30751c52abfe3b9d62753ed744f3e9.json"
      - "writable_scope:.agentplane/tasks/202608300119-ZHYXRS/quality/objects/sha256/7bd203cf9dcbd8fd7fb54c71fb43608d75f904771948104bd6fb5e32111922c3.md"
      - "writable_scope:.agentplane/tasks/202608300119-ZHYXRS/quality/objects/sha256/9037cdf98253e70333ede9358d360264a85ee905be64a8723bbdd4ca71e02d4a.json"
      - "writable_scope:.agentplane/tasks/202608300119-ZHYXRS/quality/objects/sha256/9ca03923fb3436ecdd936ae66f4ce9710cdb58d8bccf37d570410152ec188918.md"
      - "writable_scope:.agentplane/tasks/202608300119-ZHYXRS/quality/objects/sha256/e4594a5165434d84043609c114251fb1d166c7612623342d185fb34239acfb29.patch"
      - "writable_scope:.agentplane/tasks/202608300119-ZHYXRS/quality/objects/sha256/efec60e7d3b43883689358d77d2278cfa5e0346ad57e5c8695bdc74cecff1470.patch"
      - "writable_scope:.agentplane/tasks/202608300119-ZHYXRS/supervision/declared-checks.json"
      - "writable_scope:.agentplane/tasks/202608300119-ZHYXRS/supervision/implementation-evidence.json"
      - "writable_scope:.agentplane/tasks/202608300119-ZHYXRS/verification/20260830013042448-9879d2e0317ba8ff.json"
      - "writable_scope:.agentplane/tasks/202608300119-ZHYXRS/verification/20260830014106431-a78ca4036e517933.json"
      - "writable_scope:.agentplane/tasks/202608300119-ZHYXRS/verification/20260830021428357-1faa3b8361b33f16.json"
      - "writable_scope:.agentplane/tasks/202608300119-ZHYXRS/verification/20260830022721719-75aba1a0c8379039.json"
      - "writable_scope:depcruise.config.cjs"
      - "writable_scope:docs/adr/0017-clean-task-core-rebuild.md"
      - "writable_scope:docs/adr/README.md"
      - "writable_scope:docs/reference/clean-task-core-rebuild-spec.mdx"
      - "writable_scope:packages/agentplane/assets/policy/incidents.md"
      - "writable_scope:packages/agentplane/src/cli/__snapshots__/run-cli.core.help-snap.test.ts.snap"
      - "writable_scope:packages/agentplane/src/cli/prompts.test.ts"
      - "writable_scope:packages/agentplane/src/cli/route-decision.testkit.ts"
      - "writable_scope:packages/agentplane/src/cli/run-cli.core.blueprint.test.ts"
      - "writable_scope:packages/agentplane/src/cli/run-cli.core.direct-task-supervision.test.ts"
      - "writable_scope:packages/agentplane/src/cli/run-cli.core.help-snap.test.ts"
      - "writable_scope:packages/agentplane/src/cli/run-cli.core.incidents.test.ts"
      - "writable_scope:packages/agentplane/src/cli/run-cli.core.lifecycle.finish-validation.test.ts"
      - "writable_scope:packages/agentplane/src/cli/run-cli.core.lifecycle.plan.test.ts"
      - "writable_scope:packages/agentplane/src/cli/run-cli.core.lifecycle.start-commit.policy.test.ts"
      - "writable_scope:packages/agentplane/src/cli/run-cli.core.lifecycle.start-readiness.test.ts"
      - "writable_scope:packages/agentplane/src/cli/run-cli.core.lifecycle.test.ts"
      - "writable_scope:packages/agentplane/src/cli/run-cli.core.lifecycle.verify.test.ts"
      - "writable_scope:packages/agentplane/src/cli/run-cli.core.pr-flow.pr-notes-verify.test.ts"
      - "writable_scope:packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.artifacts.test.ts"
      - "writable_scope:packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.git.test.ts"
      - "writable_scope:packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.network.test.ts"
      - "writable_scope:packages/agentplane/src/cli/run-cli.core.pr-flow.pr-validation.open-hydration.test.ts"
      - "writable_scope:packages/agentplane/src/cli/run-cli.core.pr-flow.pr-validation.test.ts"
      - "writable_scope:packages/agentplane/src/cli/run-cli.core.pr-flow.pr-validation.update.test.ts"
      - "writable_scope:packages/agentplane/src/cli/run-cli.core.pr-flow.start-ready.test.ts"
      - "writable_scope:packages/agentplane/src/cli/run-cli.core.pr-flow.status.test.ts"
      - "writable_scope:packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts"
      - "writable_scope:packages/agentplane/src/cli/run-cli.core.release-tasks-reconcile.test.ts"
      - "writable_scope:packages/agentplane/src/cli/run-cli.core.route-decision.batch.test.ts"
      - "writable_scope:packages/agentplane/src/cli/run-cli.core.route-decision.direct-closeout.test.ts"
      - "writable_scope:packages/agentplane/src/cli/run-cli.core.route-decision.pr-open-metadata.test.ts"
      - "writable_scope:packages/agentplane/src/cli/run-cli.core.route-decision.quality.test.ts"
      - "writable_scope:packages/agentplane/src/cli/run-cli.core.route-decision.remote-confidence.test.ts"
      - "writable_scope:packages/agentplane/src/cli/run-cli.core.route-decision.test.ts"
      - "writable_scope:packages/agentplane/src/cli/run-cli.core.route-decision.verification.test.ts"
      - "writable_scope:packages/agentplane/src/cli/run-cli.core.task-advance-effect-recovery.test.ts"
      - "writable_scope:packages/agentplane/src/cli/run-cli.core.task-advance.branch-worktree.test.ts"
      - "writable_scope:packages/agentplane/src/cli/run-cli.core.task-advance.evaluator-recovery.test.ts"
      - "writable_scope:packages/agentplane/src/cli/run-cli.core.task-advance.evidence-rework.test.ts"
      - "writable_scope:packages/agentplane/src/cli/run-cli.core.task-advance.worktree-resolution.test.ts"
      - "writable_scope:packages/agentplane/src/cli/run-cli.core.task-create-base-intent.test.ts"
      - "writable_scope:packages/agentplane/src/cli/run-cli.core.task-create-planner-intent.test.ts"
      - "writable_scope:packages/agentplane/src/cli/run-cli.core.task-guided.test.ts"
      - "writable_scope:packages/agentplane/src/cli/run-cli.core.task-handoff.test.ts"
      - "writable_scope:packages/agentplane/src/cli/run-cli.core.task-next-action-json.test.ts"
      - "writable_scope:packages/agentplane/src/cli/run-cli.core.task-routing.test.ts"
      - "writable_scope:packages/agentplane/src/cli/run-cli.core.task-status-token-usage.test.ts"
      - "writable_scope:packages/agentplane/src/cli/run-cli.core.tasks.active.test.ts"
      - "writable_scope:packages/agentplane/src/cli/run-cli.core.tasks.lifecycle.test.ts"
      - "writable_scope:packages/agentplane/src/cli/run-cli.core.tasks.user-create.test.ts"
      - "writable_scope:packages/agentplane/src/cli/run-cli.core.tasks.verify-matrix.test.ts"
      - "writable_scope:packages/agentplane/src/cli/run-cli/commands/init/prompts.test.ts"
      - "writable_scope:packages/agentplane/src/cli/task-advance-effect-recovery.testkit.ts"
      - "writable_scope:packages/agentplane/src/cli/task-continuity.testkit.ts"
      - "writable_scope:packages/agentplane/src/cli/task-create-planner-intent.testkit.ts"
      - "writable_scope:packages/agentplane/src/commands/evaluator/evaluator-episode.calibration.test.ts"
      - "writable_scope:packages/agentplane/src/commands/evaluator/evaluator-review-usecase.ts"
      - "writable_scope:packages/agentplane/src/commands/evaluator/evaluator-runtime-evidence.test.ts"
      - "writable_scope:packages/agentplane/src/commands/pr/head-publication.test.ts"
      - "writable_scope:packages/agentplane/src/commands/pr/head-publication.ts"
      - "writable_scope:packages/agentplane/src/commands/pr/provider-update-branch-local.test.ts"
      - "writable_scope:packages/agentplane/src/commands/pr/provider-update-branch-local.ts"
      - "writable_scope:packages/agentplane/src/commands/pr/provider-update-branch.test.ts"
      - "writable_scope:packages/agentplane/src/commands/pr/provider-update-branch.ts"
      - "writable_scope:packages/agentplane/src/commands/shared/provider-update-branch-route.ts"
      - "writable_scope:packages/agentplane/src/commands/shared/quality-review-retirement.ts"
      - "writable_scope:packages/agentplane/src/commands/shared/route-decision-blockers.quality-review.test.ts"
      - "writable_scope:packages/agentplane/src/commands/shared/route-decision-blockers.ts"
      - "writable_scope:packages/agentplane/src/commands/shared/route-gate-priority.ts"
      - "writable_scope:packages/agentplane/src/commands/shared/route-oracle.ts"
      - "writable_scope:packages/agentplane/src/commands/shared/side-effect-authority.test.ts"
      - "writable_scope:packages/agentplane/src/commands/shared/side-effect-authority.ts"
      - "writable_scope:packages/agentplane/src/commands/shared/task-scope-extension-request.ts"
      - "writable_scope:packages/agentplane/src/commands/shared/workflow-operation-effects.ts"
      - "writable_scope:packages/agentplane/src/commands/shared/workflow-operation-prefix.ts"
      - "writable_scope:packages/agentplane/src/commands/shared/workflow-operation-projection.registry.test.ts"
      - "writable_scope:packages/agentplane/src/commands/shared/workflow-operation-projection.ts"
      - "writable_scope:packages/agentplane/src/commands/shared/workflow-postconditions.ts"
      - "writable_scope:packages/agentplane/src/commands/shared/workflow-step-branch.ts"
      - "writable_scope:packages/agentplane/src/commands/shared/workflow-step-factory.ts"
      - "writable_scope:packages/agentplane/src/commands/shared/workflow-step-projections.conflict-rework.test.ts"
      - "writable_scope:packages/agentplane/src/commands/shared/workflow-step-provider-update-branch-spec.ts"
      - "writable_scope:packages/agentplane/src/commands/shared/workflow-step-provider-update-branch.ts"
      - "writable_scope:packages/agentplane/src/commands/shared/workflow-step-quality.test.ts"
      - "writable_scope:packages/agentplane/src/commands/shared/workflow-step.ts"
      - "writable_scope:packages/agentplane/src/runtime/task-execution-context/resolve.test.ts"
      - "writable_scope:packages/core/src/tasks/index.ts"
      - "writable_scope:packages/core/src/tasks/task-centric/graph.ts"
      - "writable_scope:packages/core/src/tasks/task-centric/task-centric.test.ts"
      - "writable_scope:packages/core/src/tasks/task-kernel/M1-QUALIFICATION.md"
      - "writable_scope:packages/core/src/tasks/task-kernel/index.ts"
      - "writable_scope:packages/core/src/tasks/task-kernel/invariants.test.ts"
      - "writable_scope:packages/core/src/tasks/task-kernel/invariants.ts"
      - "writable_scope:packages/core/src/tasks/task-kernel/kernel.test-fixtures.ts"
      - "writable_scope:packages/core/src/tasks/task-kernel/kernel.test.ts"
      - "writable_scope:packages/core/src/tasks/task-kernel/kernel.ts"
      - "writable_scope:packages/core/src/tasks/task-kernel/model.test.ts"
      - "writable_scope:packages/core/src/tasks/task-kernel/model.ts"
      - "writable_scope:packages/testkit/src/cli-core-pr-flow.ts"
      - "writable_scope:packages/testkit/src/cli.test.ts"
      - "writable_scope:scripts/qualification/check-packaged-mixed-scope-lifecycle.mjs"
      - "writable_scope:scripts/qualification/release-qualification.test.mjs"
      - "writable_scope:website/static/img/social/docs/adr/0017-clean-task-core-rebuild.png"
      - "writable_scope:website/static/img/social/docs/reference/clean-task-core-rebuild-spec.png"
      - "writable_scope:website/static/img/social/manifest.json"
    changed_components:
      - ".agentplane"
      - "depcruise.config.cjs"
      - "docs"
      - "packages/agentplane"
      - "packages/core"
      - "packages/testkit"
      - "scripts"
      - "website"
    changed_paths:
      - ".agentplane/policy/incidents.md"
      - ".agentplane/tasks/202608260947-C6WV4T/README.md"
      - ".agentplane/tasks/202608260947-C6WV4T/blueprint/resolved-snapshot.json"
      - ".agentplane/tasks/202608260947-C6WV4T/pr/diffstat.txt"
      - ".agentplane/tasks/202608260947-C6WV4T/pr/github-body.md"
      - ".agentplane/tasks/202608260947-C6WV4T/pr/github-title.txt"
      - ".agentplane/tasks/202608260947-C6WV4T/pr/meta.json"
      - ".agentplane/tasks/202608260947-C6WV4T/pr/review.md"
      - ".agentplane/tasks/202608260947-C6WV4T/quality/20260826-105227686-recovery-context/evaluator-evidence-manifest.json"
      - ".agentplane/tasks/202608260947-C6WV4T/quality/20260826-105227686-recovery-context/evaluator-opinion.md"
      - ".agentplane/tasks/202608260947-C6WV4T/quality/20260826-105227686-recovery-context/evaluator-result.json"
      - ".agentplane/tasks/202608260947-C6WV4T/quality/20260826-105227686-recovery-context/evaluator-work-order.json"
      - ".agentplane/tasks/202608260947-C6WV4T/quality/20260826-105227686-recovery-context/quality-report.json"
      - ".agentplane/tasks/202608260947-C6WV4T/quality/objects/sha256/28aeeca59baccc008fa96c5a1bba3e1c91e889eb8923ebefbcb1b317c408ece3.json"
      - ".agentplane/tasks/202608260947-C6WV4T/quality/objects/sha256/36e8a2a2c1b50ad817232abbdf1c90c83549c46da46de70003fc3d19c5b09703.md"
      - ".agentplane/tasks/202608260947-C6WV4T/quality/objects/sha256/9037cdf98253e70333ede9358d360264a85ee905be64a8723bbdd4ca71e02d4a.json"
      - ".agentplane/tasks/202608260947-C6WV4T/quality/objects/sha256/a39e66da8555d830d71298b5c64fbb5d3f50103573bc66640d89a196ba0621f8.json"
      - ".agentplane/tasks/202608260947-C6WV4T/quality/objects/sha256/ed5ff1bc96ab14843609d69b953efe9aa1d3a4216026cfbf5f6e2c2c67562c10.patch"
      - ".agentplane/tasks/202608260947-C6WV4T/supervision/declared-checks.json"
      - ".agentplane/tasks/202608260947-C6WV4T/supervision/implementation-evidence.json"
      - ".agentplane/tasks/202608260947-C6WV4T/verification/20260826101202781-c0efa3be2c04108a.json"
      - ".agentplane/tasks/202608260947-C6WV4T/verification/20260826102051415-1a60d2fff4f33f35.json"
      - ".agentplane/tasks/202608260947-C6WV4T/verification/20260826103831301-084955658270d1e2.json"
      - ".agentplane/tasks/202608260947-C6WV4T/verification/20260826104850237-742d0ef8d9576f58.json"
      - ".agentplane/tasks/202608261249-BXQZ97/README.md"
      - ".agentplane/tasks/202608261249-BXQZ97/blueprint/resolved-snapshot.json"
      - ".agentplane/tasks/202608261249-BXQZ97/pr/diffstat.txt"
      - ".agentplane/tasks/202608261249-BXQZ97/pr/github-body.md"
      - ".agentplane/tasks/202608261249-BXQZ97/pr/github-title.txt"
      - ".agentplane/tasks/202608261249-BXQZ97/pr/meta.json"
      - ".agentplane/tasks/202608261249-BXQZ97/pr/review.md"
      - ".agentplane/tasks/202608261249-BXQZ97/quality/20260826-154337837-recovery-context/evaluator-evidence-manifest.json"
      - ".agentplane/tasks/202608261249-BXQZ97/quality/20260826-154337837-recovery-context/evaluator-work-order.json"
      - ".agentplane/tasks/202608261249-BXQZ97/quality/20260826-154349579-recovery-context/evaluator-evidence-manifest.json"
      - ".agentplane/tasks/202608261249-BXQZ97/quality/20260826-154349579-recovery-context/evaluator-opinion.md"
      - ".agentplane/tasks/202608261249-BXQZ97/quality/20260826-154349579-recovery-context/evaluator-result.json"
      - ".agentplane/tasks/202608261249-BXQZ97/quality/20260826-154349579-recovery-context/evaluator-work-order.json"
      - ".agentplane/tasks/202608261249-BXQZ97/quality/20260826-154349579-recovery-context/quality-report.json"
      - ".agentplane/tasks/202608261249-BXQZ97/quality/20260826-171737369-recovery-context/evaluator-evidence-manifest.json"
      - ".agentplane/tasks/202608261249-BXQZ97/quality/20260826-171737369-recovery-context/evaluator-work-order.json"
      - ".agentplane/tasks/202608261249-BXQZ97/quality/20260826-171746402-recovery-context/evaluator-evidence-manifest.json"
      - ".agentplane/tasks/202608261249-BXQZ97/quality/20260826-171746402-recovery-context/evaluator-opinion.md"
      - ".agentplane/tasks/202608261249-BXQZ97/quality/20260826-171746402-recovery-context/evaluator-result.json"
      - ".agentplane/tasks/202608261249-BXQZ97/quality/20260826-171746402-recovery-context/evaluator-work-order.json"
      - ".agentplane/tasks/202608261249-BXQZ97/quality/20260826-171746402-recovery-context/quality-report.json"
      - ".agentplane/tasks/202608261249-BXQZ97/quality/20260826-184958130-recovery-context/evaluator-evidence-manifest.json"
      - ".agentplane/tasks/202608261249-BXQZ97/quality/20260826-184958130-recovery-context/evaluator-opinion.md"
      - ".agentplane/tasks/202608261249-BXQZ97/quality/20260826-184958130-recovery-context/evaluator-result.json"
      - ".agentplane/tasks/202608261249-BXQZ97/quality/20260826-184958130-recovery-context/evaluator-work-order.json"
      - ".agentplane/tasks/202608261249-BXQZ97/quality/20260826-184958130-recovery-context/quality-report.json"
      - ".agentplane/tasks/202608261249-BXQZ97/quality/objects/sha256/081a872247cd011fcd717d8674c5e8435662c78ef4fc15cb726edadffac91f00.patch"
      - ".agentplane/tasks/202608261249-BXQZ97/quality/objects/sha256/1f02efb4b8bab934d1772f143fb49a62c41af32c0dcc88e6d84d63067eb2476a.patch"
      - ".agentplane/tasks/202608261249-BXQZ97/quality/objects/sha256/2d08ac03d9f2c967e311337b36f1002c301ce46e6179b3197c8735f606d4bd5d.md"
      - ".agentplane/tasks/202608261249-BXQZ97/quality/objects/sha256/49864fc10ebd312c36e5388075629eb27dd999c9531f6456b52708a9955fb1ce.json"
      - ".agentplane/tasks/202608261249-BXQZ97/quality/objects/sha256/6e793f3b5cf384ceae276d6d2daa685a2ea831c2c622aa09bbd54f9e9993ea15.patch"
      - ".agentplane/tasks/202608261249-BXQZ97/quality/objects/sha256/7b8649aeee3293091a3475cb6b9b8fd50578e76f50f2d69d1a48b0a0564c6588.md"
      - ".agentplane/tasks/202608261249-BXQZ97/quality/objects/sha256/9037cdf98253e70333ede9358d360264a85ee905be64a8723bbdd4ca71e02d4a.json"
      - ".agentplane/tasks/202608261249-BXQZ97/quality/objects/sha256/ca152961094cc816531a9f9428b59e35044108767b0c5ab2b8697f9d41bd5d6e.md"
      - ".agentplane/tasks/202608261249-BXQZ97/quality/objects/sha256/dc53ed08c3dda49bb4078be5bf32b0ada19800cc5f1fcdb14fecdccd54975356.md"
      - ".agentplane/tasks/202608261249-BXQZ97/quality/objects/sha256/e6c20dad3911e302671884f019d9d82e25ccbc8f44d64823eeebfa77db14c513.json"
      - ".agentplane/tasks/202608261249-BXQZ97/quality/objects/sha256/ec34965843d7ceaadde82286a6f78ba6336ac4a3d062b6aa9890f9fd67f55ddb.json"
      - ".agentplane/tasks/202608261249-BXQZ97/quality/objects/sha256/f091e58f8e79aefd3d495f1f01552d4326b86c44e0607e070495425e53edbf2a.md"
      - ".agentplane/tasks/202608261249-BXQZ97/quality/objects/sha256/f3348a06497ca3aad892ff85d6f30139a609de8eb281221d422464223991c706.json"
      - ".agentplane/tasks/202608261249-BXQZ97/supervision/declared-checks.json"
      - ".agentplane/tasks/202608261249-BXQZ97/supervision/implementation-evidence.json"
      - ".agentplane/tasks/202608261249-BXQZ97/verification/20260826131231828-4899fc7776fc3011.json"
      - ".agentplane/tasks/202608261249-BXQZ97/verification/20260826131801504-414ceddf9264b14a.json"
      - ".agentplane/tasks/202608261249-BXQZ97/verification/20260826133735342-6eebdbeee58c63b8.json"
      - ".agentplane/tasks/202608261249-BXQZ97/verification/20260826140354671-51ca742916d6d412.json"
      - ".agentplane/tasks/202608261249-BXQZ97/verification/20260826140354671-f118e6b643ac2277.json"
      - ".agentplane/tasks/202608261249-BXQZ97/verification/20260826142031076-8ac311f53c036691.json"
      - ".agentplane/tasks/202608261249-BXQZ97/verification/20260826164823835-114624ee0716d03c.json"
      - ".agentplane/tasks/202608261249-BXQZ97/verification/20260826164823835-32417bd6c41cd6fa.json"
      - ".agentplane/tasks/202608261249-BXQZ97/verification/20260826165515427-a3cc939a542cd2aa.json"
      - ".agentplane/tasks/202608261249-BXQZ97/verification/20260826165827922-f50094dfabc25c8a.json"
      - ".agentplane/tasks/202608261249-BXQZ97/verification/20260826170134616-f04da5d817e4ab2e.json"
      - ".agentplane/tasks/202608261249-BXQZ97/verification/20260826170811135-da8030825d7c301a.json"
      - ".agentplane/tasks/202608261249-BXQZ97/verification/20260826171201924-42ebe5c731851354.json"
      - ".agentplane/tasks/202608261249-BXQZ97/verification/20260826171322652-7e41b1cc15cfed88.json"
      - ".agentplane/tasks/202608261249-BXQZ97/verification/20260826180631339-09707b1c0e98c6de.json"
      - ".agentplane/tasks/202608261249-BXQZ97/verification/20260826180631339-2614f45e8b6de844.json"
      - ".agentplane/tasks/202608261249-BXQZ97/verification/20260826181511661-477b9b7ac50111ef.json"
      - ".agentplane/tasks/202608261249-BXQZ97/verification/20260826182424360-48a3862358bbf338.json"
      - ".agentplane/tasks/202608261249-BXQZ97/verification/20260826182631556-e4632490ec0e3dab.json"
      - ".agentplane/tasks/202608262034-QVVB66/README.md"
      - ".agentplane/tasks/202608262034-QVVB66/blueprint/resolved-snapshot.json"
      - ".agentplane/tasks/202608262034-QVVB66/pr/diffstat.txt"
      - ".agentplane/tasks/202608262034-QVVB66/pr/github-body.md"
      - ".agentplane/tasks/202608262034-QVVB66/pr/github-title.txt"
      - ".agentplane/tasks/202608262034-QVVB66/pr/meta.json"
      - ".agentplane/tasks/202608262034-QVVB66/pr/review.md"
      - ".agentplane/tasks/202608262034-QVVB66/quality/20260826-232534701-recovery-context/evaluator-evidence-manifest.json"
      - ".agentplane/tasks/202608262034-QVVB66/quality/20260826-232534701-recovery-context/evaluator-opinion.md"
      - ".agentplane/tasks/202608262034-QVVB66/quality/20260826-232534701-recovery-context/evaluator-result.json"
      - ".agentplane/tasks/202608262034-QVVB66/quality/20260826-232534701-recovery-context/evaluator-work-order.json"
      - ".agentplane/tasks/202608262034-QVVB66/quality/20260826-232534701-recovery-context/quality-report.json"
      - ".agentplane/tasks/202608262034-QVVB66/quality/objects/sha256/0d8d9d809bba84acdf89f5b6a6de1e594e0e057ad12081d1c93925007ae3ba56.json"
      - ".agentplane/tasks/202608262034-QVVB66/quality/objects/sha256/1f8c4d5afe794c741ad276e3c9a442bb8d4a0a833501f6c57adcc2cc0cbd510a.md"
      - ".agentplane/tasks/202608262034-QVVB66/quality/objects/sha256/6e4e04668c5a112cfb3f80c4b887a269381efd99162afd71dc2db583b725b51f.patch"
      - ".agentplane/tasks/202608262034-QVVB66/quality/objects/sha256/9037cdf98253e70333ede9358d360264a85ee905be64a8723bbdd4ca71e02d4a.json"
      - ".agentplane/tasks/202608262034-QVVB66/quality/objects/sha256/fb1af76268dd0e8465077608561a882b98194d2c2106b9f4a0f54b5a8216c4e9.json"
      - ".agentplane/tasks/202608262034-QVVB66/supervision/declared-checks.json"
      - ".agentplane/tasks/202608262034-QVVB66/supervision/implementation-evidence.json"
      - ".agentplane/tasks/202608262034-QVVB66/verification/20260826210937938-160302ec11db2821.json"
      - ".agentplane/tasks/202608262034-QVVB66/verification/20260826214006249-ef143b4293541bc2.json"
      - ".agentplane/tasks/202608262034-QVVB66/verification/20260826214633989-ff0fb06f0372a7b1.json"
      - ".agentplane/tasks/202608262034-QVVB66/verification/20260826214746594-95de7efcdc59dfaf.json"
      - ".agentplane/tasks/202608262034-QVVB66/verification/20260826222042038-1fbbbd157b86bc45.json"
      - ".agentplane/tasks/202608262034-QVVB66/verification/20260826225343074-06fb3b6272c4d3ce.json"
      - ".agentplane/tasks/202608262034-QVVB66/verification/20260826232338533-1f3a5cc55d1c2e2e.json"
      - ".agentplane/tasks/202608262034-QVVB66/verification/20260826232507417-6ba5f717053eee31.json"
      - ".agentplane/tasks/202608271251-GHHA0Q/README.md"
      - ".agentplane/tasks/202608271251-GHHA0Q/blueprint/resolved-snapshot.json"
      - ".agentplane/tasks/202608271251-GHHA0Q/pr/diffstat.txt"
      - ".agentplane/tasks/202608271251-GHHA0Q/pr/github-body.md"
      - ".agentplane/tasks/202608271251-GHHA0Q/pr/github-title.txt"
      - ".agentplane/tasks/202608271251-GHHA0Q/pr/meta.json"
      - ".agentplane/tasks/202608271251-GHHA0Q/pr/review.md"
      - ".agentplane/tasks/202608271251-GHHA0Q/quality/20260827-132550152-recovery-context/evaluator-evidence-manifest.json"
      - ".agentplane/tasks/202608271251-GHHA0Q/quality/20260827-132550152-recovery-context/evaluator-opinion.md"
      - ".agentplane/tasks/202608271251-GHHA0Q/quality/20260827-132550152-recovery-context/evaluator-result.json"
      - ".agentplane/tasks/202608271251-GHHA0Q/quality/20260827-132550152-recovery-context/evaluator-work-order.json"
      - ".agentplane/tasks/202608271251-GHHA0Q/quality/20260827-132550152-recovery-context/quality-report.json"
      - ".agentplane/tasks/202608271251-GHHA0Q/quality/objects/sha256/5f1761b308e3fa79606d64298d038aa48eed248df8f75002c32bf6175b74a26f.md"
      - ".agentplane/tasks/202608271251-GHHA0Q/quality/objects/sha256/655d50e79cbbfa8962590054cf5fa3edbb0455a549a7ebf14ff0e4491251ee69.json"
      - ".agentplane/tasks/202608271251-GHHA0Q/quality/objects/sha256/87363b64dfbbc8acb0a0e1d49c8a00c932eb1f73b80583339c6e83f8490049d8.patch"
      - ".agentplane/tasks/202608271251-GHHA0Q/quality/objects/sha256/9037cdf98253e70333ede9358d360264a85ee905be64a8723bbdd4ca71e02d4a.json"
      - ".agentplane/tasks/202608271251-GHHA0Q/quality/objects/sha256/9ee81d006aad7410d4eabee9de9e480cf2cd79d61bd1335ade9707d04079fb6f.json"
      - ".agentplane/tasks/202608271251-GHHA0Q/supervision/declared-checks.json"
      - ".agentplane/tasks/202608271251-GHHA0Q/supervision/implementation-evidence.json"
      - ".agentplane/tasks/202608271251-GHHA0Q/verification/20260827130652681-032dc4b51b16d8f5.json"
      - ".agentplane/tasks/202608271251-GHHA0Q/verification/20260827132532555-956f74b4ae404852.json"
      - ".agentplane/tasks/202608271358-G0N9P4/README.md"
      - ".agentplane/tasks/202608271358-G0N9P4/blueprint/resolved-snapshot.json"
      - ".agentplane/tasks/202608271358-G0N9P4/pr/diffstat.txt"
      - ".agentplane/tasks/202608271358-G0N9P4/pr/github-body.md"
      - ".agentplane/tasks/202608271358-G0N9P4/pr/github-title.txt"
      - ".agentplane/tasks/202608271358-G0N9P4/pr/meta.json"
      - ".agentplane/tasks/202608271358-G0N9P4/pr/review.md"
      - ".agentplane/tasks/202608271358-G0N9P4/quality/20260827-144308272-recovery-context/evaluator-evidence-manifest.json"
      - ".agentplane/tasks/202608271358-G0N9P4/quality/20260827-144308272-recovery-context/evaluator-opinion.md"
      - ".agentplane/tasks/202608271358-G0N9P4/quality/20260827-144308272-recovery-context/evaluator-result.json"
      - ".agentplane/tasks/202608271358-G0N9P4/quality/20260827-144308272-recovery-context/evaluator-work-order.json"
      - ".agentplane/tasks/202608271358-G0N9P4/quality/20260827-144308272-recovery-context/quality-report.json"
      - ".agentplane/tasks/202608271358-G0N9P4/quality/objects/sha256/14513056fb48f13c0a2081399288b24ce14495e22af1134cff7f041d75a4cf96.json"
      - ".agentplane/tasks/202608271358-G0N9P4/quality/objects/sha256/2501149452aa79bbcf0f5915f02d7db1170a7c5b1117d25c3504628d5d3d60f1.patch"
      - ".agentplane/tasks/202608271358-G0N9P4/quality/objects/sha256/2f9b84087cbe4076bce202e94828ba937a9e4172d1620f4d48a2c73dcd5991c6.json"
      - ".agentplane/tasks/202608271358-G0N9P4/quality/objects/sha256/777c538f21215f1399fa50862508b756510efedb76645600f61bf3f670794223.md"
      - ".agentplane/tasks/202608271358-G0N9P4/quality/objects/sha256/9037cdf98253e70333ede9358d360264a85ee905be64a8723bbdd4ca71e02d4a.json"
      - ".agentplane/tasks/202608271358-G0N9P4/supervision/declared-checks.json"
      - ".agentplane/tasks/202608271358-G0N9P4/supervision/implementation-evidence.json"
      - ".agentplane/tasks/202608271358-G0N9P4/verification/20260827141049775-a9ec4c50eea55011.json"
      - ".agentplane/tasks/202608271358-G0N9P4/verification/20260827143026261-afc0c60aa5ad0a08.json"
      - ".agentplane/tasks/202608271358-G0N9P4/verification/20260827144238263-382161b49fad458b.json"
      - ".agentplane/tasks/202608271425-9EWJA1/README.md"
      - ".agentplane/tasks/202608271425-9EWJA1/blueprint/resolved-snapshot.json"
      - ".agentplane/tasks/202608271425-9EWJA1/pr/diffstat.txt"
      - ".agentplane/tasks/202608271425-9EWJA1/pr/github-body.md"
      - ".agentplane/tasks/202608271425-9EWJA1/pr/github-title.txt"
      - ".agentplane/tasks/202608271425-9EWJA1/pr/meta.json"
      - ".agentplane/tasks/202608271425-9EWJA1/pr/review.md"
      - ".agentplane/tasks/202608271425-9EWJA1/quality/20260827-145146182-recovery-context/evaluator-evidence-manifest.json"
      - ".agentplane/tasks/202608271425-9EWJA1/quality/20260827-145146182-recovery-context/evaluator-opinion.md"
      - ".agentplane/tasks/202608271425-9EWJA1/quality/20260827-145146182-recovery-context/evaluator-result.json"
      - ".agentplane/tasks/202608271425-9EWJA1/quality/20260827-145146182-recovery-context/evaluator-work-order.json"
      - ".agentplane/tasks/202608271425-9EWJA1/quality/20260827-145146182-recovery-context/quality-report.json"
      - ".agentplane/tasks/202608271425-9EWJA1/quality/objects/sha256/0573f938635c08e770dcac6ba9e37ee421ad948d77a226a96c698c79010dd886.patch"
      - ".agentplane/tasks/202608271425-9EWJA1/quality/objects/sha256/35a9c1b23cfd9a14cf2f7657ea3fea0d01006ae742d37e9c2cf68e91d2df2217.md"
      - ".agentplane/tasks/202608271425-9EWJA1/quality/objects/sha256/7080a6be2e427488741d82e5f0f80a864c64a7fa2e9cdb8e5118aedded4881ec.json"
      - ".agentplane/tasks/202608271425-9EWJA1/quality/objects/sha256/9037cdf98253e70333ede9358d360264a85ee905be64a8723bbdd4ca71e02d4a.json"
      - ".agentplane/tasks/202608271425-9EWJA1/quality/objects/sha256/d95d0acf71eba724329a418bc06e8264aea65cb35720be95bfc5a172bb57ba3d.json"
      - ".agentplane/tasks/202608271425-9EWJA1/supervision/declared-checks.json"
      - ".agentplane/tasks/202608271425-9EWJA1/supervision/implementation-evidence.json"
      - ".agentplane/tasks/202608271425-9EWJA1/verification/20260827145057353-8504a8d8eb4611ab.json"
      - ".agentplane/tasks/202608271441-DVEMAE/README.md"
      - ".agentplane/tasks/202608271441-DVEMAE/blueprint/resolved-snapshot.json"
      - ".agentplane/tasks/202608271441-DVEMAE/pr/diffstat.txt"
      - ".agentplane/tasks/202608271441-DVEMAE/pr/github-body.md"
      - ".agentplane/tasks/202608271441-DVEMAE/pr/github-title.txt"
      - ".agentplane/tasks/202608271441-DVEMAE/pr/meta.json"
      - ".agentplane/tasks/202608271441-DVEMAE/pr/review.md"
      - ".agentplane/tasks/202608271441-DVEMAE/quality/20260827-161517390-recovery-context/evaluator-evidence-manifest.json"
      - ".agentplane/tasks/202608271441-DVEMAE/quality/20260827-161517390-recovery-context/evaluator-opinion.md"
      - ".agentplane/tasks/202608271441-DVEMAE/quality/20260827-161517390-recovery-context/evaluator-result.json"
      - ".agentplane/tasks/202608271441-DVEMAE/quality/20260827-161517390-recovery-context/evaluator-work-order.json"
      - ".agentplane/tasks/202608271441-DVEMAE/quality/20260827-161517390-recovery-context/quality-report.json"
      - ".agentplane/tasks/202608271441-DVEMAE/quality/objects/sha256/25d9a8b1e3a9e4c13c66e484a4e1b24f8ecdb231997b03159e5461368f8ccace.json"
      - ".agentplane/tasks/202608271441-DVEMAE/quality/objects/sha256/46cd945b00a0fd8eda518b45ef616a27bab8334f224d47b965657bc5f8020958.md"
      - ".agentplane/tasks/202608271441-DVEMAE/quality/objects/sha256/9037cdf98253e70333ede9358d360264a85ee905be64a8723bbdd4ca71e02d4a.json"
      - ".agentplane/tasks/202608271441-DVEMAE/quality/objects/sha256/bc9a4be916f6f1bf3e52810f0bdcae083f6de1da2c9050a0b73d2b46f2f4c158.patch"
      - ".agentplane/tasks/202608271441-DVEMAE/quality/objects/sha256/c945029f8f9a6a3b6717b22494ab1e117a3ea4e6b526ce151bdf827980533c8b.json"
      - ".agentplane/tasks/202608271441-DVEMAE/supervision/declared-checks.json"
      - ".agentplane/tasks/202608271441-DVEMAE/supervision/implementation-evidence.json"
      - ".agentplane/tasks/202608271441-DVEMAE/verification/20260827151321725-77366aa3f29ad2fc.json"
      - ".agentplane/tasks/202608271441-DVEMAE/verification/20260827161459128-ce04c76286eb1a98.json"
      - ".agentplane/tasks/202608271450-TZHW4C/README.md"
      - ".agentplane/tasks/202608271450-TZHW4C/blueprint/resolved-snapshot.json"
      - ".agentplane/tasks/202608271450-TZHW4C/pr/diffstat.txt"
      - ".agentplane/tasks/202608271450-TZHW4C/pr/github-body.md"
      - ".agentplane/tasks/202608271450-TZHW4C/pr/github-title.txt"
      - ".agentplane/tasks/202608271450-TZHW4C/pr/meta.json"
      - ".agentplane/tasks/202608271450-TZHW4C/pr/review.md"
      - ".agentplane/tasks/202608271450-TZHW4C/quality/20260827-164341199-recovery-context/evaluator-evidence-manifest.json"
      - ".agentplane/tasks/202608271450-TZHW4C/quality/20260827-164341199-recovery-context/evaluator-opinion.md"
      - ".agentplane/tasks/202608271450-TZHW4C/quality/20260827-164341199-recovery-context/evaluator-result.json"
      - ".agentplane/tasks/202608271450-TZHW4C/quality/20260827-164341199-recovery-context/evaluator-work-order.json"
      - ".agentplane/tasks/202608271450-TZHW4C/quality/20260827-164341199-recovery-context/quality-report.json"
      - ".agentplane/tasks/202608271450-TZHW4C/quality/objects/sha256/4f8d1195a803cd3c4754483629f1325c54ba2b91328ee958c9811dbc031ab8fd.json"
      - ".agentplane/tasks/202608271450-TZHW4C/quality/objects/sha256/68302d9b5aaca3ffd777ed8c0b0c11a4f0141aa08562b9d28cc3bc9a3075ecfc.patch"
      - ".agentplane/tasks/202608271450-TZHW4C/quality/objects/sha256/9037cdf98253e70333ede9358d360264a85ee905be64a8723bbdd4ca71e02d4a.json"
      - ".agentplane/tasks/202608271450-TZHW4C/quality/objects/sha256/d7febebeb12f1a3d979e56533b3ec80fabd2809b0f26382417f868bf173049e8.md"
      - ".agentplane/tasks/202608271450-TZHW4C/quality/objects/sha256/db8f8a8efe42f5970786efbd4c479276e3b511d8fad72bc91924436db46ac611.json"
      - ".agentplane/tasks/202608271450-TZHW4C/supervision/declared-checks.json"
      - ".agentplane/tasks/202608271450-TZHW4C/supervision/implementation-evidence.json"
      - ".agentplane/tasks/202608271450-TZHW4C/verification/20260827153255520-912083059edc324f.json"
      - ".agentplane/tasks/202608271450-TZHW4C/verification/20260827164324368-fc4e3922be01c66f.json"
      - ".agentplane/tasks/202608271502-J6B4RW/README.md"
      - ".agentplane/tasks/202608271502-J6B4RW/blueprint/resolved-snapshot.json"
      - ".agentplane/tasks/202608271502-J6B4RW/pr/diffstat.txt"
      - ".agentplane/tasks/202608271502-J6B4RW/pr/github-body.md"
      - ".agentplane/tasks/202608271502-J6B4RW/pr/github-title.txt"
      - ".agentplane/tasks/202608271502-J6B4RW/pr/meta.json"
      - ".agentplane/tasks/202608271502-J6B4RW/pr/review.md"
      - ".agentplane/tasks/202608271502-J6B4RW/quality/20260827-154623971-recovery-context/evaluator-evidence-manifest.json"
      - ".agentplane/tasks/202608271502-J6B4RW/quality/20260827-154623971-recovery-context/evaluator-opinion.md"
      - ".agentplane/tasks/202608271502-J6B4RW/quality/20260827-154623971-recovery-context/evaluator-result.json"
      - ".agentplane/tasks/202608271502-J6B4RW/quality/20260827-154623971-recovery-context/evaluator-work-order.json"
      - ".agentplane/tasks/202608271502-J6B4RW/quality/20260827-154623971-recovery-context/quality-report.json"
      - ".agentplane/tasks/202608271502-J6B4RW/quality/objects/sha256/0031c8f4d4758e61b1466e0d1cc73f10d4188334296df7b99d8d999f5c4e8ea1.md"
      - ".agentplane/tasks/202608271502-J6B4RW/quality/objects/sha256/4fac0491a5e9a0c96c8ac043242a10a8897ab3ae27acf6ec034902b9811d012b.json"
      - ".agentplane/tasks/202608271502-J6B4RW/quality/objects/sha256/58b664e7b0a81b253833b10a6c216059659b73855a9bfe7503edda7e5c2c4aee.patch"
      - ".agentplane/tasks/202608271502-J6B4RW/quality/objects/sha256/9037cdf98253e70333ede9358d360264a85ee905be64a8723bbdd4ca71e02d4a.json"
      - ".agentplane/tasks/202608271502-J6B4RW/quality/objects/sha256/b1ec08ea0502169eb633c52e878c5f61dab6a05f7abb0b1e3821a09aae111dc8.json"
      - ".agentplane/tasks/202608271502-J6B4RW/supervision/declared-checks.json"
      - ".agentplane/tasks/202608271502-J6B4RW/supervision/implementation-evidence.json"
      - ".agentplane/tasks/202608271502-J6B4RW/verification/20260827154604703-18e8da1d3734f6ea.json"
      - ".agentplane/tasks/202608271520-175BQX/README.md"
      - ".agentplane/tasks/202608271520-175BQX/blueprint/resolved-snapshot.json"
      - ".agentplane/tasks/202608271520-175BQX/pr/diffstat.txt"
      - ".agentplane/tasks/202608271520-175BQX/pr/github-body.md"
      - ".agentplane/tasks/202608271520-175BQX/pr/github-title.txt"
      - ".agentplane/tasks/202608271520-175BQX/pr/meta.json"
      - ".agentplane/tasks/202608271520-175BQX/pr/review.md"
      - ".agentplane/tasks/202608271520-175BQX/quality/20260827-163417019-recovery-context/evaluator-evidence-manifest.json"
      - ".agentplane/tasks/202608271520-175BQX/quality/20260827-163417019-recovery-context/evaluator-opinion.md"
      - ".agentplane/tasks/202608271520-175BQX/quality/20260827-163417019-recovery-context/evaluator-result.json"
      - ".agentplane/tasks/202608271520-175BQX/quality/20260827-163417019-recovery-context/evaluator-work-order.json"
      - ".agentplane/tasks/202608271520-175BQX/quality/20260827-163417019-recovery-context/quality-report.json"
      - ".agentplane/tasks/202608271520-175BQX/quality/objects/sha256/3df5f4f1f353a441910c5898702f18d37f00971bf3cad8e11319d03103ab1c56.patch"
      - ".agentplane/tasks/202608271520-175BQX/quality/objects/sha256/9037cdf98253e70333ede9358d360264a85ee905be64a8723bbdd4ca71e02d4a.json"
      - ".agentplane/tasks/202608271520-175BQX/quality/objects/sha256/a288575b74937de29ef9e860b24bcdc61f3191f48df33fc132a601fd7072e7e6.json"
      - ".agentplane/tasks/202608271520-175BQX/quality/objects/sha256/aadfab4fb644761f23c0e128c6d090eb8b31d8787d9b2a201c93e5e10f1e03fe.json"
      - ".agentplane/tasks/202608271520-175BQX/quality/objects/sha256/cfcdcb5435bc36040568a2bd28a1a5c734c0b2fe8cc3b738c45514cc0aefe561.md"
      - ".agentplane/tasks/202608271520-175BQX/supervision/declared-checks.json"
      - ".agentplane/tasks/202608271520-175BQX/supervision/implementation-evidence.json"
      - ".agentplane/tasks/202608271520-175BQX/verification/20260827163359452-f5a7fe6f4992aa43.json"
      - ".agentplane/tasks/202608271538-T21JCA/README.md"
      - ".agentplane/tasks/202608271538-T21JCA/blueprint/resolved-snapshot.json"
      - ".agentplane/tasks/202608271538-T21JCA/pr/diffstat.txt"
      - ".agentplane/tasks/202608271538-T21JCA/pr/github-body.md"
      - ".agentplane/tasks/202608271538-T21JCA/pr/github-title.txt"
      - ".agentplane/tasks/202608271538-T21JCA/pr/meta.json"
      - ".agentplane/tasks/202608271538-T21JCA/pr/review.md"
      - ".agentplane/tasks/202608271538-T21JCA/quality/20260827-155614370-recovery-context/evaluator-evidence-manifest.json"
      - ".agentplane/tasks/202608271538-T21JCA/quality/20260827-155614370-recovery-context/evaluator-opinion.md"
      - ".agentplane/tasks/202608271538-T21JCA/quality/20260827-155614370-recovery-context/evaluator-result.json"
      - ".agentplane/tasks/202608271538-T21JCA/quality/20260827-155614370-recovery-context/evaluator-work-order.json"
      - ".agentplane/tasks/202608271538-T21JCA/quality/20260827-155614370-recovery-context/quality-report.json"
      - ".agentplane/tasks/202608271538-T21JCA/quality/20260827-165816155-recovery-context/evaluator-evidence-manifest.json"
      - ".agentplane/tasks/202608271538-T21JCA/quality/20260827-165816155-recovery-context/evaluator-opinion.md"
      - ".agentplane/tasks/202608271538-T21JCA/quality/20260827-165816155-recovery-context/evaluator-result.json"
      - ".agentplane/tasks/202608271538-T21JCA/quality/20260827-165816155-recovery-context/evaluator-work-order.json"
      - ".agentplane/tasks/202608271538-T21JCA/quality/20260827-165816155-recovery-context/quality-report.json"
      - ".agentplane/tasks/202608271538-T21JCA/quality/20260827-185237520-recovery-context/evaluator-evidence-manifest.json"
      - ".agentplane/tasks/202608271538-T21JCA/quality/20260827-185237520-recovery-context/evaluator-opinion.md"
      - ".agentplane/tasks/202608271538-T21JCA/quality/20260827-185237520-recovery-context/evaluator-result.json"
      - ".agentplane/tasks/202608271538-T21JCA/quality/20260827-185237520-recovery-context/evaluator-work-order.json"
      - ".agentplane/tasks/202608271538-T21JCA/quality/20260827-185237520-recovery-context/quality-report.json"
      - ".agentplane/tasks/202608271538-T21JCA/quality/objects/sha256/20e682bec49f3be073f007266985798ff96956563ac46f42c9c8963175cb0d75.json"
      - ".agentplane/tasks/202608271538-T21JCA/quality/objects/sha256/23f41be610f22839e63955e61a6129a0f92dc7b634a33469b42faf27be8d2392.json"
      - ".agentplane/tasks/202608271538-T21JCA/quality/objects/sha256/2ba4423ad95e1c8d825431449b05e8979e4147776ed5596cb0d9d1e8f498b19b.md"
      - ".agentplane/tasks/202608271538-T21JCA/quality/objects/sha256/5b969fa31cb380006daa12e43d9292d0b7b40b06dab78d360d996621e45a56f0.json"
      - ".agentplane/tasks/202608271538-T21JCA/quality/objects/sha256/8272d31e92fdd32ae188f1bceceb8fd5b20abee2ac53a445582b54e3cf230ada.patch"
      - ".agentplane/tasks/202608271538-T21JCA/quality/objects/sha256/9037cdf98253e70333ede9358d360264a85ee905be64a8723bbdd4ca71e02d4a.json"
      - ".agentplane/tasks/202608271538-T21JCA/quality/objects/sha256/a7e3196d56670a618cab6f2faccd91792fd9fdd6bb32df3f9587ff725891c60f.patch"
      - ".agentplane/tasks/202608271538-T21JCA/quality/objects/sha256/aaae0a4db026925daff5ae459b577e586f725c6f7b05301210c65ca44c52ae5f.json"
      - ".agentplane/tasks/202608271538-T21JCA/quality/objects/sha256/d45ba3378de8f21986c7dba53843422ac84e13c3a300a10b253f902a75553e18.md"
      - ".agentplane/tasks/202608271538-T21JCA/quality/objects/sha256/efe135d010022261174668a4c7cb2b3925b6118a8068b12cda82e02713ab0c81.md"
      - ".agentplane/tasks/202608271538-T21JCA/quality/objects/sha256/fcf8dd2e46cf020a4dfa46a07d648ce3dfb919b0ad00a577f97eacfd649d9817.patch"
      - ".agentplane/tasks/202608271538-T21JCA/supervision/declared-checks.json"
      - ".agentplane/tasks/202608271538-T21JCA/supervision/implementation-evidence.json"
      - ".agentplane/tasks/202608271538-T21JCA/verification/20260827155541958-c84df617bc1e0c1a.json"
      - ".agentplane/tasks/202608271538-T21JCA/verification/20260827163017204-63965a85298089d8.json"
      - ".agentplane/tasks/202608271538-T21JCA/verification/20260827165804845-f40035f1f5135e14.json"
      - ".agentplane/tasks/202608271538-T21JCA/verification/20260827175117746-40e332b32f5ff76b.json"
      - ".agentplane/tasks/202608271538-T21JCA/verification/20260827181112407-f0e13b14e41fe302.json"
      - ".agentplane/tasks/202608271538-T21JCA/verification/20260827185225478-6366f2fb7f9e38cb.json"
      - ".agentplane/tasks/202608271544-1TDVPJ/README.md"
      - ".agentplane/tasks/202608271544-1TDVPJ/blueprint/resolved-snapshot.json"
      - ".agentplane/tasks/202608271544-1TDVPJ/pr/diffstat.txt"
      - ".agentplane/tasks/202608271544-1TDVPJ/pr/github-body.md"
      - ".agentplane/tasks/202608271544-1TDVPJ/pr/github-title.txt"
      - ".agentplane/tasks/202608271544-1TDVPJ/pr/meta.json"
      - ".agentplane/tasks/202608271544-1TDVPJ/pr/review.md"
      - ".agentplane/tasks/202608271544-1TDVPJ/quality/20260827-162357810-recovery-context/evaluator-evidence-manifest.json"
      - ".agentplane/tasks/202608271544-1TDVPJ/quality/20260827-162357810-recovery-context/evaluator-opinion.md"
      - ".agentplane/tasks/202608271544-1TDVPJ/quality/20260827-162357810-recovery-context/evaluator-result.json"
      - ".agentplane/tasks/202608271544-1TDVPJ/quality/20260827-162357810-recovery-context/evaluator-work-order.json"
      - ".agentplane/tasks/202608271544-1TDVPJ/quality/20260827-162357810-recovery-context/quality-report.json"
      - ".agentplane/tasks/202608271544-1TDVPJ/quality/objects/sha256/09e7b31f3ac865c48223b58cfb33a8e0b13406f6b1d10fbd0397887ce64fcd39.json"
      - ".agentplane/tasks/202608271544-1TDVPJ/quality/objects/sha256/4a6b7f61fc2cd73a0ac64c0afa6b1e91ee9137ee153073440092170e287545ae.patch"
      - ".agentplane/tasks/202608271544-1TDVPJ/quality/objects/sha256/54db07e252c5020879f6e899f2b62e2cbfdd0f825307f6b3f8a998e2cee24ddf.json"
      - ".agentplane/tasks/202608271544-1TDVPJ/quality/objects/sha256/9037cdf98253e70333ede9358d360264a85ee905be64a8723bbdd4ca71e02d4a.json"
      - ".agentplane/tasks/202608271544-1TDVPJ/quality/objects/sha256/b138e23a64b8077d010b45401e70824413f65d708334c29a5b663586700828e7.md"
      - ".agentplane/tasks/202608271544-1TDVPJ/supervision/declared-checks.json"
      - ".agentplane/tasks/202608271544-1TDVPJ/supervision/implementation-evidence.json"
      - ".agentplane/tasks/202608271544-1TDVPJ/verification/20260827160642690-24295292837d8d7e.json"
      - ".agentplane/tasks/202608271544-1TDVPJ/verification/20260827162335964-8d33c746263199fc.json"
      - ".agentplane/tasks/202608271649-DVNTRR/README.md"
      - ".agentplane/tasks/202608271649-DVNTRR/blueprint/resolved-snapshot.json"
      - ".agentplane/tasks/202608271649-DVNTRR/pr/diffstat.txt"
      - ".agentplane/tasks/202608271649-DVNTRR/pr/github-body.md"
      - ".agentplane/tasks/202608271649-DVNTRR/pr/github-title.txt"
      - ".agentplane/tasks/202608271649-DVNTRR/pr/meta.json"
      - ".agentplane/tasks/202608271649-DVNTRR/pr/review.md"
      - ".agentplane/tasks/202608271649-DVNTRR/quality/20260827-170736164-recovery-context/evaluator-evidence-manifest.json"
      - ".agentplane/tasks/202608271649-DVNTRR/quality/20260827-170736164-recovery-context/evaluator-opinion.md"
      - ".agentplane/tasks/202608271649-DVNTRR/quality/20260827-170736164-recovery-context/evaluator-result.json"
      - ".agentplane/tasks/202608271649-DVNTRR/quality/20260827-170736164-recovery-context/evaluator-work-order.json"
      - ".agentplane/tasks/202608271649-DVNTRR/quality/20260827-170736164-recovery-context/quality-report.json"
      - ".agentplane/tasks/202608271649-DVNTRR/quality/objects/sha256/26b29129cee78cb00a376b7d25f1c78233418cc92f456e963b0122292f6b29fe.json"
      - ".agentplane/tasks/202608271649-DVNTRR/quality/objects/sha256/9037cdf98253e70333ede9358d360264a85ee905be64a8723bbdd4ca71e02d4a.json"
      - ".agentplane/tasks/202608271649-DVNTRR/quality/objects/sha256/9e458f50f4a70613d2c4d7d41c1006bf431af26fd040c3649cf38af0ae39c0ac.patch"
      - ".agentplane/tasks/202608271649-DVNTRR/quality/objects/sha256/a0a854b5539401e1ce7b8c5d69c90e66e4e7164cedf7d87371aed16ed16c54e5.json"
      - ".agentplane/tasks/202608271649-DVNTRR/quality/objects/sha256/fb58551d02547676b978b5aedde40828c7008703d368d527a61c52535306d00f.md"
      - ".agentplane/tasks/202608271649-DVNTRR/supervision/declared-checks.json"
      - ".agentplane/tasks/202608271649-DVNTRR/supervision/implementation-evidence.json"
      - ".agentplane/tasks/202608271649-DVNTRR/verification/20260827170718338-d32fb33a649bef9e.json"
      - ".agentplane/tasks/202608271659-AD3030/README.md"
      - ".agentplane/tasks/202608271659-AD3030/blueprint/resolved-snapshot.json"
      - ".agentplane/tasks/202608271659-AD3030/pr/diffstat.txt"
      - ".agentplane/tasks/202608271659-AD3030/pr/github-body.md"
      - ".agentplane/tasks/202608271659-AD3030/pr/github-title.txt"
      - ".agentplane/tasks/202608271659-AD3030/pr/meta.json"
      - ".agentplane/tasks/202608271659-AD3030/pr/review.md"
      - ".agentplane/tasks/202608271659-AD3030/quality/20260827-231601668-recovery-context/evaluator-evidence-manifest.json"
      - ".agentplane/tasks/202608271659-AD3030/quality/20260827-231601668-recovery-context/evaluator-follow-up.json"
      - ".agentplane/tasks/202608271659-AD3030/quality/20260827-231601668-recovery-context/evaluator-opinion.md"
      - ".agentplane/tasks/202608271659-AD3030/quality/20260827-231601668-recovery-context/evaluator-result.json"
      - ".agentplane/tasks/202608271659-AD3030/quality/20260827-231601668-recovery-context/evaluator-work-order.json"
      - ".agentplane/tasks/202608271659-AD3030/quality/20260827-231601668-recovery-context/quality-report.json"
      - ".agentplane/tasks/202608271659-AD3030/quality/20260827-233148153-recovery-context/evaluator-evidence-manifest.json"
      - ".agentplane/tasks/202608271659-AD3030/quality/20260827-233148153-recovery-context/evaluator-opinion.md"
      - ".agentplane/tasks/202608271659-AD3030/quality/20260827-233148153-recovery-context/evaluator-result.json"
      - ".agentplane/tasks/202608271659-AD3030/quality/20260827-233148153-recovery-context/evaluator-work-order.json"
      - ".agentplane/tasks/202608271659-AD3030/quality/20260827-233148153-recovery-context/quality-report.json"
      - ".agentplane/tasks/202608271659-AD3030/quality/objects/sha256/6a54b986c4337537710c4beb64489bec480674ba7177b0351762cbc6ef90410f.patch"
      - ".agentplane/tasks/202608271659-AD3030/quality/objects/sha256/7f8eaa563a57e96bcafc6c3a0510357cc3af386dc72cd2c7ea05829ca02b93d1.md"
      - ".agentplane/tasks/202608271659-AD3030/quality/objects/sha256/9037cdf98253e70333ede9358d360264a85ee905be64a8723bbdd4ca71e02d4a.json"
      - ".agentplane/tasks/202608271659-AD3030/quality/objects/sha256/90f0d1030d222fc87d8e92a8fc71195cb2c49a013eb106f43b8d570dab8cea0c.md"
      - ".agentplane/tasks/202608271659-AD3030/quality/objects/sha256/95b232edfe20d366180cc29edc1979fdffee0202f5881344b07866a82d04fc4f.json"
      - ".agentplane/tasks/202608271659-AD3030/quality/objects/sha256/d0d238d23c3006d5e0d4d0953d1881f99c4173f65bfe5d0abfb7b08b76de5a06.json"
      - ".agentplane/tasks/202608271659-AD3030/quality/objects/sha256/d36ac47a0ebecb9519f911ec1314b9ad33af5c3ced863ba464a8788b49dec5b9.json"
      - ".agentplane/tasks/202608271659-AD3030/supervision/declared-checks.json"
      - ".agentplane/tasks/202608271659-AD3030/supervision/implementation-evidence.json"
      - ".agentplane/tasks/202608271659-AD3030/verification/20260827213149985-715257e021089323.json"
      - ".agentplane/tasks/202608271659-AD3030/verification/20260827215847391-fb3c0afcc74de348.json"
      - ".agentplane/tasks/202608271659-AD3030/verification/20260827223623598-a12592ac3d5fc2df.json"
      - ".agentplane/tasks/202608271659-AD3030/verification/20260827231543799-24b0be63cfe9653d.json"
      - ".agentplane/tasks/202608271659-AD3030/verification/20260827233043685-d1e770e639a91501.json"
      - ".agentplane/tasks/202608272229-CFKR4P/README.md"
      - ".agentplane/tasks/202608272229-CFKR4P/blueprint/resolved-snapshot.json"
      - ".agentplane/tasks/202608272229-CFKR4P/pr/diffstat.txt"
      - ".agentplane/tasks/202608272229-CFKR4P/pr/github-body.md"
      - ".agentplane/tasks/202608272229-CFKR4P/pr/github-title.txt"
      - ".agentplane/tasks/202608272229-CFKR4P/pr/meta.json"
      - ".agentplane/tasks/202608272229-CFKR4P/pr/review.md"
      - ".agentplane/tasks/202608272229-CFKR4P/quality/20260827-230610775-recovery-context/evaluator-evidence-manifest.json"
      - ".agentplane/tasks/202608272229-CFKR4P/quality/20260827-230610775-recovery-context/evaluator-opinion.md"
      - ".agentplane/tasks/202608272229-CFKR4P/quality/20260827-230610775-recovery-context/evaluator-result.json"
      - ".agentplane/tasks/202608272229-CFKR4P/quality/20260827-230610775-recovery-context/evaluator-work-order.json"
      - ".agentplane/tasks/202608272229-CFKR4P/quality/20260827-230610775-recovery-context/quality-report.json"
      - ".agentplane/tasks/202608272229-CFKR4P/quality/20260828-000932160-recovery-context/evaluator-evidence-manifest.json"
      - ".agentplane/tasks/202608272229-CFKR4P/quality/20260828-000932160-recovery-context/evaluator-follow-up.json"
      - ".agentplane/tasks/202608272229-CFKR4P/quality/20260828-000932160-recovery-context/evaluator-opinion.md"
      - ".agentplane/tasks/202608272229-CFKR4P/quality/20260828-000932160-recovery-context/evaluator-result.json"
      - ".agentplane/tasks/202608272229-CFKR4P/quality/20260828-000932160-recovery-context/evaluator-work-order.json"
      - ".agentplane/tasks/202608272229-CFKR4P/quality/20260828-000932160-recovery-context/quality-report.json"
      - ".agentplane/tasks/202608272229-CFKR4P/quality/20260828-053621063-recovery-context/evaluator-evidence-manifest.json"
      - ".agentplane/tasks/202608272229-CFKR4P/quality/20260828-053621063-recovery-context/evaluator-opinion.md"
      - ".agentplane/tasks/202608272229-CFKR4P/quality/20260828-053621063-recovery-context/evaluator-result.json"
      - ".agentplane/tasks/202608272229-CFKR4P/quality/20260828-053621063-recovery-context/evaluator-work-order.json"
      - ".agentplane/tasks/202608272229-CFKR4P/quality/20260828-053621063-recovery-context/quality-report.json"
      - ".agentplane/tasks/202608272229-CFKR4P/quality/objects/sha256/11688b587a6c37b5298be891c8baca187f77e08c5986a1dc9f37e56709aa676e.patch"
      - ".agentplane/tasks/202608272229-CFKR4P/quality/objects/sha256/3fa8c5a4ffd8708f6e96a21eba31edaf65882e1844c30c1e86c408070f957b5b.patch"
      - ".agentplane/tasks/202608272229-CFKR4P/quality/objects/sha256/56d54e34c6824aaf1a152fdfb629d730440df65d4686321e6cbb73d499cb85a2.md"
      - ".agentplane/tasks/202608272229-CFKR4P/quality/objects/sha256/5a91f816258fbfff2849f7bc6be1f7cf50e4796b2e269be89388b9c66f1d5c68.md"
      - ".agentplane/tasks/202608272229-CFKR4P/quality/objects/sha256/6f267ba300d86b30f5a46cb1b7eae0f2cb31b89dd4cf4c01d666f9423b309d5e.json"
      - ".agentplane/tasks/202608272229-CFKR4P/quality/objects/sha256/8aa8430007db8b3269f6cb4f5d3aed2627eeadc552ce0127fbabae170ead8e9f.md"
      - ".agentplane/tasks/202608272229-CFKR4P/quality/objects/sha256/9037cdf98253e70333ede9358d360264a85ee905be64a8723bbdd4ca71e02d4a.json"
      - ".agentplane/tasks/202608272229-CFKR4P/quality/objects/sha256/9a2d9706dbffd1b3e70f61ffedc1e700dd415cee709f8010108ced527e4dfdc5.json"
      - ".agentplane/tasks/202608272229-CFKR4P/quality/objects/sha256/be5d9b5a63f50769630a2f792d28e7a198ceee47d2693d131f4b4de1dbdf8317.json"
      - ".agentplane/tasks/202608272229-CFKR4P/quality/objects/sha256/ddfa9158349dd8bc733f31959f4dd5b52edf19f263a2c56ebf3c0556d6f7eb98.json"
      - ".agentplane/tasks/202608272229-CFKR4P/supervision/declared-checks.json"
      - ".agentplane/tasks/202608272229-CFKR4P/supervision/implementation-evidence.json"
      - ".agentplane/tasks/202608272229-CFKR4P/verification/20260827230553240-5454bb7d2f564299.json"
      - ".agentplane/tasks/202608272229-CFKR4P/verification/20260828000849309-06bea9aa9602ed03.json"
      - ".agentplane/tasks/202608272229-CFKR4P/verification/20260828000849309-6c255a4db5aae45c.json"
      - ".agentplane/tasks/202608272229-CFKR4P/verification/20260828053605787-eca4721e74cf0d8e.json"
      - ".agentplane/tasks/202608280009-QMVHM2/README.md"
      - ".agentplane/tasks/202608280009-QMVHM2/blueprint/resolved-snapshot.json"
      - ".agentplane/tasks/202608280009-QMVHM2/pr/diffstat.txt"
      - ".agentplane/tasks/202608280009-QMVHM2/pr/github-body.md"
      - ".agentplane/tasks/202608280009-QMVHM2/pr/github-title.txt"
      - ".agentplane/tasks/202608280009-QMVHM2/pr/meta.json"
      - ".agentplane/tasks/202608280009-QMVHM2/pr/review.md"
      - ".agentplane/tasks/202608280009-QMVHM2/quality/20260828-011322107-recovery-context/evaluator-evidence-manifest.json"
      - ".agentplane/tasks/202608280009-QMVHM2/quality/20260828-011322107-recovery-context/evaluator-follow-up.json"
      - ".agentplane/tasks/202608280009-QMVHM2/quality/20260828-011322107-recovery-context/evaluator-opinion.md"
      - ".agentplane/tasks/202608280009-QMVHM2/quality/20260828-011322107-recovery-context/evaluator-result.json"
      - ".agentplane/tasks/202608280009-QMVHM2/quality/20260828-011322107-recovery-context/evaluator-work-order.json"
      - ".agentplane/tasks/202608280009-QMVHM2/quality/20260828-011322107-recovery-context/quality-report.json"
      - ".agentplane/tasks/202608280009-QMVHM2/quality/20260828-042840647-recovery-context/evaluator-evidence-manifest.json"
      - ".agentplane/tasks/202608280009-QMVHM2/quality/20260828-042840647-recovery-context/evaluator-opinion.md"
      - ".agentplane/tasks/202608280009-QMVHM2/quality/20260828-042840647-recovery-context/evaluator-result.json"
      - ".agentplane/tasks/202608280009-QMVHM2/quality/20260828-042840647-recovery-context/evaluator-work-order.json"
      - ".agentplane/tasks/202608280009-QMVHM2/quality/20260828-042840647-recovery-context/quality-report.json"
      - ".agentplane/tasks/202608280009-QMVHM2/quality/20260828-051322345-recovery-context/evaluator-evidence-manifest.json"
      - ".agentplane/tasks/202608280009-QMVHM2/quality/20260828-051322345-recovery-context/evaluator-opinion.md"
      - ".agentplane/tasks/202608280009-QMVHM2/quality/20260828-051322345-recovery-context/evaluator-result.json"
      - ".agentplane/tasks/202608280009-QMVHM2/quality/20260828-051322345-recovery-context/evaluator-work-order.json"
      - ".agentplane/tasks/202608280009-QMVHM2/quality/20260828-051322345-recovery-context/quality-report.json"
      - ".agentplane/tasks/202608280009-QMVHM2/quality/objects/sha256/1c71cb603799ea00dfe1eb4feba9eaaceb1ba54dcbf5d427df29019e0705cc88.md"
      - ".agentplane/tasks/202608280009-QMVHM2/quality/objects/sha256/239c6f92bfea8b9963a7280e631c183681ae1af1934202231f1189ec01382189.json"
      - ".agentplane/tasks/202608280009-QMVHM2/quality/objects/sha256/5379a6852a6d160cd1b996793dd260bf11f32c00c170218fea9dc0fff3a613e4.patch"
      - ".agentplane/tasks/202608280009-QMVHM2/quality/objects/sha256/60f75a07ff5023ff166e4200c64265239501e2b3f6b37a021996dff717b5fbfe.patch"
      - ".agentplane/tasks/202608280009-QMVHM2/quality/objects/sha256/66b158c9a1fbadd62b9ef4afac539b907e19606f24447f5afac1a180c96d1f76.json"
      - ".agentplane/tasks/202608280009-QMVHM2/quality/objects/sha256/9037cdf98253e70333ede9358d360264a85ee905be64a8723bbdd4ca71e02d4a.json"
      - ".agentplane/tasks/202608280009-QMVHM2/quality/objects/sha256/975b3b4c61f11b15abc435105a878d617ff4c7299a8b62d6c8401b9482fc9f3d.json"
      - ".agentplane/tasks/202608280009-QMVHM2/quality/objects/sha256/b2ffb42c3b91e00e03734e7dcf1aa3ef131732e1faccaedf4fa53f1310491c33.json"
      - ".agentplane/tasks/202608280009-QMVHM2/quality/objects/sha256/bd890fca94d16e8a62f92c3704058b03b54be072d1dee3056f0fe78883c3159e.md"
      - ".agentplane/tasks/202608280009-QMVHM2/quality/objects/sha256/eeb6b4d935b7082e3a532d3520244220ada15bb93c7ca55a51e8d77134958539.md"
      - ".agentplane/tasks/202608280009-QMVHM2/supervision/declared-checks.json"
      - ".agentplane/tasks/202608280009-QMVHM2/supervision/implementation-evidence.json"
      - ".agentplane/tasks/202608280009-QMVHM2/verification/20260828011304735-23f23a1652815c0c.json"
      - ".agentplane/tasks/202608280009-QMVHM2/verification/20260828042822482-e20218a743e953fb.json"
      - ".agentplane/tasks/202608280009-QMVHM2/verification/20260828050220795-2614f9b715b13cb6.json"
      - ".agentplane/tasks/202608280009-QMVHM2/verification/20260828050220795-466081e22890fca3.json"
      - ".agentplane/tasks/202608280009-QMVHM2/verification/20260828051308628-09a00b90b25d66f1.json"
      - ".agentplane/tasks/202608280529-59VB06/README.md"
      - ".agentplane/tasks/202608280529-59VB06/blueprint/resolved-snapshot.json"
      - ".agentplane/tasks/202608280529-59VB06/pr/diffstat.txt"
      - ".agentplane/tasks/202608280529-59VB06/pr/github-body.md"
      - ".agentplane/tasks/202608280529-59VB06/pr/github-title.txt"
      - ".agentplane/tasks/202608280529-59VB06/pr/meta.json"
      - ".agentplane/tasks/202608280529-59VB06/pr/review.md"
      - ".agentplane/tasks/202608280529-59VB06/quality/20260828-060709201-recovery-context/evaluator-evidence-manifest.json"
      - ".agentplane/tasks/202608280529-59VB06/quality/20260828-060709201-recovery-context/evaluator-follow-up.json"
      - ".agentplane/tasks/202608280529-59VB06/quality/20260828-060709201-recovery-context/evaluator-opinion.md"
      - ".agentplane/tasks/202608280529-59VB06/quality/20260828-060709201-recovery-context/evaluator-result.json"
      - ".agentplane/tasks/202608280529-59VB06/quality/20260828-060709201-recovery-context/evaluator-work-order.json"
      - ".agentplane/tasks/202608280529-59VB06/quality/20260828-060709201-recovery-context/quality-report.json"
      - ".agentplane/tasks/202608280529-59VB06/quality/20260828-153633672-recovery-context/evaluator-evidence-manifest.json"
      - ".agentplane/tasks/202608280529-59VB06/quality/20260828-153633672-recovery-context/evaluator-opinion.md"
      - ".agentplane/tasks/202608280529-59VB06/quality/20260828-153633672-recovery-context/evaluator-result.json"
      - ".agentplane/tasks/202608280529-59VB06/quality/20260828-153633672-recovery-context/evaluator-work-order.json"
      - ".agentplane/tasks/202608280529-59VB06/quality/20260828-153633672-recovery-context/quality-report.json"
      - ".agentplane/tasks/202608280529-59VB06/quality/20260828-181927875-recovery-context/evaluator-evidence-manifest.json"
      - ".agentplane/tasks/202608280529-59VB06/quality/20260828-181927875-recovery-context/evaluator-follow-up.json"
      - ".agentplane/tasks/202608280529-59VB06/quality/20260828-181927875-recovery-context/evaluator-opinion.md"
      - ".agentplane/tasks/202608280529-59VB06/quality/20260828-181927875-recovery-context/evaluator-result.json"
      - ".agentplane/tasks/202608280529-59VB06/quality/20260828-181927875-recovery-context/evaluator-work-order.json"
      - ".agentplane/tasks/202608280529-59VB06/quality/20260828-181927875-recovery-context/quality-report.json"
      - ".agentplane/tasks/202608280529-59VB06/quality/20260828-185050324-recovery-context/evaluator-evidence-manifest.json"
      - ".agentplane/tasks/202608280529-59VB06/quality/20260828-185050324-recovery-context/evaluator-opinion.md"
      - ".agentplane/tasks/202608280529-59VB06/quality/20260828-185050324-recovery-context/evaluator-result.json"
      - ".agentplane/tasks/202608280529-59VB06/quality/20260828-185050324-recovery-context/evaluator-work-order.json"
      - ".agentplane/tasks/202608280529-59VB06/quality/20260828-185050324-recovery-context/quality-report.json"
      - ".agentplane/tasks/202608280529-59VB06/quality/objects/sha256/24745007b98bd3eb7178a157f3cff4cd03ec4dd7de00613fbd465e1c9d85fc99.json"
      - ".agentplane/tasks/202608280529-59VB06/quality/objects/sha256/305dc31ef93c8cc2c3f6b8002313ce558bba82f431df8b7b35991b3a1335bfb4.md"
      - ".agentplane/tasks/202608280529-59VB06/quality/objects/sha256/32210e077de23f38baba474b9ad2cf03c748596a8597b2daf2df6a5f75376ef1.json"
      - ".agentplane/tasks/202608280529-59VB06/quality/objects/sha256/34b3e8375de5f18107ece3aea5f4b2af0c9ec6eec6bd7198fb9b886c82d91398.md"
      - ".agentplane/tasks/202608280529-59VB06/quality/objects/sha256/64558883dc2735b263e90375f5bf6254311c06dfe032688cfeda608774af92e4.md"
      - ".agentplane/tasks/202608280529-59VB06/quality/objects/sha256/85ab8a4388809a43346334532eaf5fea9f05ec0af3e6b17cced11cc3e28859fb.patch"
      - ".agentplane/tasks/202608280529-59VB06/quality/objects/sha256/8e54ddb6d171cda8ac2e9c2276a32c2567dee171dd67e7e76bce8968de76829a.patch"
      - ".agentplane/tasks/202608280529-59VB06/quality/objects/sha256/9037cdf98253e70333ede9358d360264a85ee905be64a8723bbdd4ca71e02d4a.json"
      - ".agentplane/tasks/202608280529-59VB06/quality/objects/sha256/9f4fefbba30eb4bff51cddd6573a18f686a9d04f29b7ab3104de0ccbe6a641b6.md"
      - ".agentplane/tasks/202608280529-59VB06/quality/objects/sha256/b3b3f9229ace468303c32054dbfc08138f4e6822b464104b4d9180421de40844.json"
      - ".agentplane/tasks/202608280529-59VB06/quality/objects/sha256/dffe78fab5abb3d7f0acea1c9b14f4cbfd56d68d836f90da49341774b928b834.json"
      - ".agentplane/tasks/202608280529-59VB06/quality/objects/sha256/f9a2f74389e1488cd06a9f00c9eb2086396f47f6f2dec4f25ee791723541a0e8.json"
      - ".agentplane/tasks/202608280529-59VB06/supervision/declared-checks.json"
      - ".agentplane/tasks/202608280529-59VB06/supervision/implementation-evidence.json"
      - ".agentplane/tasks/202608280529-59VB06/verification/20260828060650926-cb1fbd290a69ab04.json"
      - ".agentplane/tasks/202608280529-59VB06/verification/20260828153621983-c6c6865d6eab595e.json"
      - ".agentplane/tasks/202608280529-59VB06/verification/20260828161611883-ae6fce25c62f3d26.json"
      - ".agentplane/tasks/202608280529-59VB06/verification/20260828161639959-3ac5a4b484ed090d.json"
      - ".agentplane/tasks/202608280529-59VB06/verification/20260828181914331-2b5187ee7edbae42.json"
      - ".agentplane/tasks/202608280529-59VB06/verification/20260828185032879-7a1266da64904bc0.json"
      - ".agentplane/tasks/202608280614-PCBY2N/README.md"
      - ".agentplane/tasks/202608280614-PCBY2N/blueprint/resolved-snapshot.json"
      - ".agentplane/tasks/202608280614-PCBY2N/pr/diffstat.txt"
      - ".agentplane/tasks/202608280614-PCBY2N/pr/github-body.md"
      - ".agentplane/tasks/202608280614-PCBY2N/pr/github-title.txt"
      - ".agentplane/tasks/202608280614-PCBY2N/pr/meta.json"
      - ".agentplane/tasks/202608280614-PCBY2N/pr/review.md"
      - ".agentplane/tasks/202608280614-PCBY2N/quality/20260828-112915024-recovery-context/evaluator-evidence-manifest.json"
      - ".agentplane/tasks/202608280614-PCBY2N/quality/20260828-112915024-recovery-context/evaluator-opinion.md"
      - ".agentplane/tasks/202608280614-PCBY2N/quality/20260828-112915024-recovery-context/evaluator-result.json"
      - ".agentplane/tasks/202608280614-PCBY2N/quality/20260828-112915024-recovery-context/evaluator-work-order.json"
      - ".agentplane/tasks/202608280614-PCBY2N/quality/20260828-112915024-recovery-context/quality-report.json"
      - ".agentplane/tasks/202608280614-PCBY2N/quality/objects/sha256/167112d23a3809a69ce11c590bb2894d6d3e3faf1345fba7aff144166661a3df.patch"
      - ".agentplane/tasks/202608280614-PCBY2N/quality/objects/sha256/8f90f782af46a966c76dd5da65e416c01cf3411622326198570c32a970fec3b3.json"
      - ".agentplane/tasks/202608280614-PCBY2N/quality/objects/sha256/9037cdf98253e70333ede9358d360264a85ee905be64a8723bbdd4ca71e02d4a.json"
      - ".agentplane/tasks/202608280614-PCBY2N/quality/objects/sha256/b36787aabcc52d981eca63d4e3af434e33107ed9ccf1ae128be481174364df82.json"
      - ".agentplane/tasks/202608280614-PCBY2N/quality/objects/sha256/d14785f890fc8471120d4b446e0726677356828d07d89a361a0f44e435661c50.md"
      - ".agentplane/tasks/202608280614-PCBY2N/supervision/declared-checks.json"
      - ".agentplane/tasks/202608280614-PCBY2N/supervision/implementation-evidence.json"
      - ".agentplane/tasks/202608280614-PCBY2N/verification/20260828112857349-7df3e4f50a81c6b3.json"
      - ".agentplane/tasks/202608281151-WQ89A1/README.md"
      - ".agentplane/tasks/202608281151-WQ89A1/blueprint/resolved-snapshot.json"
      - ".agentplane/tasks/202608281151-WQ89A1/pr/diffstat.txt"
      - ".agentplane/tasks/202608281151-WQ89A1/pr/github-body.md"
      - ".agentplane/tasks/202608281151-WQ89A1/pr/github-title.txt"
      - ".agentplane/tasks/202608281151-WQ89A1/pr/meta.json"
      - ".agentplane/tasks/202608281151-WQ89A1/pr/review.md"
      - ".agentplane/tasks/202608281151-WQ89A1/quality/20260828-150601429-recovery-context/evaluator-evidence-manifest.json"
      - ".agentplane/tasks/202608281151-WQ89A1/quality/20260828-150601429-recovery-context/evaluator-opinion.md"
      - ".agentplane/tasks/202608281151-WQ89A1/quality/20260828-150601429-recovery-context/evaluator-result.json"
      - ".agentplane/tasks/202608281151-WQ89A1/quality/20260828-150601429-recovery-context/evaluator-work-order.json"
      - ".agentplane/tasks/202608281151-WQ89A1/quality/20260828-150601429-recovery-context/quality-report.json"
      - ".agentplane/tasks/202608281151-WQ89A1/quality/objects/sha256/10cb032f0abf80e517280add04bb38fa45a38a4188077f4ec44801ba6bde1b60.md"
      - ".agentplane/tasks/202608281151-WQ89A1/quality/objects/sha256/43169d59cb987746b213286a613126ae2137afffaf804712307b1f2b3a741c91.json"
      - ".agentplane/tasks/202608281151-WQ89A1/quality/objects/sha256/82ffda48c5bd3c808954f2b5392fefca5582063c40c2e392ae8e7400dca3a781.json"
      - ".agentplane/tasks/202608281151-WQ89A1/quality/objects/sha256/9037cdf98253e70333ede9358d360264a85ee905be64a8723bbdd4ca71e02d4a.json"
      - ".agentplane/tasks/202608281151-WQ89A1/quality/objects/sha256/98f3e36b297b1437355f74e2067b979339e47078ca441a1b89e73b498e0029e9.patch"
      - ".agentplane/tasks/202608281151-WQ89A1/supervision/declared-checks.json"
      - ".agentplane/tasks/202608281151-WQ89A1/supervision/implementation-evidence.json"
      - ".agentplane/tasks/202608281151-WQ89A1/verification/20260828150529537-22af9751a01470a1.json"
      - ".agentplane/tasks/202608290844-7JCQPF/README.md"
      - ".agentplane/tasks/202608290844-7JCQPF/blueprint/resolved-snapshot.json"
      - ".agentplane/tasks/202608290844-7JCQPF/pr/diffstat.txt"
      - ".agentplane/tasks/202608290844-7JCQPF/pr/github-body.md"
      - ".agentplane/tasks/202608290844-7JCQPF/pr/github-title.txt"
      - ".agentplane/tasks/202608290844-7JCQPF/pr/meta.json"
      - ".agentplane/tasks/202608290844-7JCQPF/pr/review.md"
      - ".agentplane/tasks/202608290844-7JCQPF/quality/20260829-091527574-recovery-context/evaluator-evidence-manifest.json"
      - ".agentplane/tasks/202608290844-7JCQPF/quality/20260829-091527574-recovery-context/evaluator-opinion.md"
      - ".agentplane/tasks/202608290844-7JCQPF/quality/20260829-091527574-recovery-context/evaluator-result.json"
      - ".agentplane/tasks/202608290844-7JCQPF/quality/20260829-091527574-recovery-context/evaluator-work-order.json"
      - ".agentplane/tasks/202608290844-7JCQPF/quality/20260829-091527574-recovery-context/quality-report.json"
      - ".agentplane/tasks/202608290844-7JCQPF/quality/20260829-135755737-recovery-context/evaluator-evidence-manifest.json"
      - ".agentplane/tasks/202608290844-7JCQPF/quality/20260829-135755737-recovery-context/evaluator-opinion.md"
      - ".agentplane/tasks/202608290844-7JCQPF/quality/20260829-135755737-recovery-context/evaluator-result.json"
      - ".agentplane/tasks/202608290844-7JCQPF/quality/20260829-135755737-recovery-context/evaluator-work-order.json"
      - ".agentplane/tasks/202608290844-7JCQPF/quality/20260829-135755737-recovery-context/quality-report.json"
      - ".agentplane/tasks/202608290844-7JCQPF/quality/20260829-154051921-recovery-context/evaluator-evidence-manifest.json"
      - ".agentplane/tasks/202608290844-7JCQPF/quality/20260829-154051921-recovery-context/evaluator-work-order.json"
      - ".agentplane/tasks/202608290844-7JCQPF/quality/20260829-154257984-recovery-context/evaluator-evidence-manifest.json"
      - ".agentplane/tasks/202608290844-7JCQPF/quality/20260829-154257984-recovery-context/evaluator-work-order.json"
      - ".agentplane/tasks/202608290844-7JCQPF/quality/20260829-154622554-recovery-context/evaluator-evidence-manifest.json"
      - ".agentplane/tasks/202608290844-7JCQPF/quality/20260829-154622554-recovery-context/evaluator-opinion.md"
      - ".agentplane/tasks/202608290844-7JCQPF/quality/20260829-154622554-recovery-context/evaluator-result.json"
      - ".agentplane/tasks/202608290844-7JCQPF/quality/20260829-154622554-recovery-context/evaluator-work-order.json"
      - ".agentplane/tasks/202608290844-7JCQPF/quality/20260829-154622554-recovery-context/quality-report.json"
      - ".agentplane/tasks/202608290844-7JCQPF/quality/20260829-165628160-recovery-context/evaluator-evidence-manifest.json"
      - ".agentplane/tasks/202608290844-7JCQPF/quality/20260829-165628160-recovery-context/evaluator-opinion.md"
      - ".agentplane/tasks/202608290844-7JCQPF/quality/20260829-165628160-recovery-context/evaluator-result.json"
      - ".agentplane/tasks/202608290844-7JCQPF/quality/20260829-165628160-recovery-context/evaluator-work-order.json"
      - ".agentplane/tasks/202608290844-7JCQPF/quality/20260829-165628160-recovery-context/quality-report.json"
      - ".agentplane/tasks/202608290844-7JCQPF/quality/objects/sha256/00cb8f6790a2d104fb8674882268758d2e941322ed8e92c3b5dc9e428fd8dce4.patch"
      - ".agentplane/tasks/202608290844-7JCQPF/quality/objects/sha256/094a699c910341a58afcb15c22105ae1b76587fcc875a385ab29d52916473829.json"
      - ".agentplane/tasks/202608290844-7JCQPF/quality/objects/sha256/0ac40dd9a245bdd7a6904bf832c36d53c5e8cf0e6f16f59e6ecea9c0f6dd8abc.json"
      - ".agentplane/tasks/202608290844-7JCQPF/quality/objects/sha256/2258e008d9ba7a086ad71c563a02b042962c03b0c5c940f4ea42f62bbb0eb012.patch"
      - ".agentplane/tasks/202608290844-7JCQPF/quality/objects/sha256/4f0352c5d6a2182a46e1c6f73e77b5f2708ad05adf67f8236213cab6bf722e40.patch"
      - ".agentplane/tasks/202608290844-7JCQPF/quality/objects/sha256/5a942fdbf7ae26d4b99cd24f9825b1a69678fafaf17cea7b1cb6739ea2315ec7.md"
      - ".agentplane/tasks/202608290844-7JCQPF/quality/objects/sha256/8151ee2edd7f965a2ab2a99ae032f5bb0480bbd6b0920b6e390d19304e950091.md"
      - ".agentplane/tasks/202608290844-7JCQPF/quality/objects/sha256/8a9ba323a4f7313e683932e5a199789ec48f072e7b92129fab34109e8df996f6.md"
      - ".agentplane/tasks/202608290844-7JCQPF/quality/objects/sha256/8f122888e39edc7063c8e2334278428e1e94b3a887b1354c9a6d0ad6ec3054cf.md"
      - ".agentplane/tasks/202608290844-7JCQPF/quality/objects/sha256/9037cdf98253e70333ede9358d360264a85ee905be64a8723bbdd4ca71e02d4a.json"
      - ".agentplane/tasks/202608290844-7JCQPF/quality/objects/sha256/9c4220d19202ff86a1d136041f176c55546dedfb87bfb3c92d111f797b57070f.md"
      - ".agentplane/tasks/202608290844-7JCQPF/quality/objects/sha256/bf246ecc6aed6a80440a3a0197ee6a33faa53b12ac072fd16ecde736ee4d7a69.json"
      - ".agentplane/tasks/202608290844-7JCQPF/quality/objects/sha256/e292f4d015d55c072e7e21144fc8791343a332c84a64d49e6164ed43ac4537ca.md"
      - ".agentplane/tasks/202608290844-7JCQPF/quality/objects/sha256/e36dbbcacb05dd26f53c2a444202d9451db4063b531311834485b11970ed6072.json"
      - ".agentplane/tasks/202608290844-7JCQPF/quality/objects/sha256/eba6a62437a3e1722cad7b6d477654c71e7c4ecea013a52313e862621c811e58.patch"
      - ".agentplane/tasks/202608290844-7JCQPF/quality/objects/sha256/f5a5751e9d32d9d24fb39379371b7291cd6420c99d10ecf8f0283eb09e84094e.json"
      - ".agentplane/tasks/202608290844-7JCQPF/supervision/declared-checks.json"
      - ".agentplane/tasks/202608290844-7JCQPF/supervision/implementation-evidence.json"
      - ".agentplane/tasks/202608290844-7JCQPF/verification/20260829090048568-8570d238d5b793a3.json"
      - ".agentplane/tasks/202608290844-7JCQPF/verification/20260829091431764-e529c93dd7f5a93e.json"
      - ".agentplane/tasks/202608290844-7JCQPF/verification/20260829091815695-7a192569682c3990.json"
      - ".agentplane/tasks/202608290844-7JCQPF/verification/20260829121518627-935aca8b41573d83.json"
      - ".agentplane/tasks/202608290844-7JCQPF/verification/20260829133155703-ba3bf05e6e8ab9b2.json"
      - ".agentplane/tasks/202608290844-7JCQPF/verification/20260829135723903-1e369e8c538b8c1d.json"
      - ".agentplane/tasks/202608290844-7JCQPF/verification/20260829140319538-403bd5a3f235102c.json"
      - ".agentplane/tasks/202608290844-7JCQPF/verification/20260829142522018-696e567acb8481c2.json"
      - ".agentplane/tasks/202608290844-7JCQPF/verification/20260829142603828-ccd96a6a223662af.json"
      - ".agentplane/tasks/202608290844-7JCQPF/verification/20260829143621259-88a931bdab985c02.json"
      - ".agentplane/tasks/202608290844-7JCQPF/verification/20260829144725405-280eceee3679149d.json"
      - ".agentplane/tasks/202608290844-7JCQPF/verification/20260829145124375-d0d20769bc9e2777.json"
      - ".agentplane/tasks/202608290844-7JCQPF/verification/20260829161700623-370a4f491fb5a800.json"
      - ".agentplane/tasks/202608290844-7JCQPF/verification/20260829165606401-4bf622d61e8adf7c.json"
      - ".agentplane/tasks/202608290920-1PZGG8/README.md"
      - ".agentplane/tasks/202608290920-1PZGG8/blueprint/resolved-snapshot.json"
      - ".agentplane/tasks/202608290920-1PZGG8/pr/diffstat.txt"
      - ".agentplane/tasks/202608290920-1PZGG8/pr/github-body.md"
      - ".agentplane/tasks/202608290920-1PZGG8/pr/github-title.txt"
      - ".agentplane/tasks/202608290920-1PZGG8/pr/meta.json"
      - ".agentplane/tasks/202608290920-1PZGG8/pr/review.md"
      - ".agentplane/tasks/202608290920-1PZGG8/quality/20260829-100207338-recovery-context/evaluator-evidence-manifest.json"
      - ".agentplane/tasks/202608290920-1PZGG8/quality/20260829-100207338-recovery-context/evaluator-follow-up.json"
      - ".agentplane/tasks/202608290920-1PZGG8/quality/20260829-100207338-recovery-context/evaluator-opinion.md"
      - ".agentplane/tasks/202608290920-1PZGG8/quality/20260829-100207338-recovery-context/evaluator-result.json"
      - ".agentplane/tasks/202608290920-1PZGG8/quality/20260829-100207338-recovery-context/evaluator-work-order.json"
      - ".agentplane/tasks/202608290920-1PZGG8/quality/20260829-100207338-recovery-context/quality-report.json"
      - ".agentplane/tasks/202608290920-1PZGG8/quality/20260829-112038164-recovery-context/evaluator-evidence-manifest.json"
      - ".agentplane/tasks/202608290920-1PZGG8/quality/20260829-112038164-recovery-context/evaluator-opinion.md"
      - ".agentplane/tasks/202608290920-1PZGG8/quality/20260829-112038164-recovery-context/evaluator-result.json"
      - ".agentplane/tasks/202608290920-1PZGG8/quality/20260829-112038164-recovery-context/evaluator-work-order.json"
      - ".agentplane/tasks/202608290920-1PZGG8/quality/20260829-112038164-recovery-context/quality-report.json"
      - ".agentplane/tasks/202608290920-1PZGG8/quality/objects/sha256/33ccc1d6b91deeda43925dda11bcb7871d4177f0b26d9f3f8f154203d618a3bf.patch"
      - ".agentplane/tasks/202608290920-1PZGG8/quality/objects/sha256/5bf18a85abd14fe0a9a2152613220bc2ad006608710b4b329837619185c0189d.json"
      - ".agentplane/tasks/202608290920-1PZGG8/quality/objects/sha256/6238bed33ff5edad09db6bb76534efbfd68babd7775a75c0db7b0b53a128a033.patch"
      - ".agentplane/tasks/202608290920-1PZGG8/quality/objects/sha256/6ab11382be85eb26466f9d0685b65b522e69c1ff5b74c1f152d4cb04e06604ca.md"
      - ".agentplane/tasks/202608290920-1PZGG8/quality/objects/sha256/6ff4eeeac1fb74deb063645fd271923073c9a9756944f516b8d10fb36ad1dcfd.json"
      - ".agentplane/tasks/202608290920-1PZGG8/quality/objects/sha256/9037cdf98253e70333ede9358d360264a85ee905be64a8723bbdd4ca71e02d4a.json"
      - ".agentplane/tasks/202608290920-1PZGG8/quality/objects/sha256/de714e1ae1e5247163e5007b3fe727baf606367028fdd58ebcb9f94f7333b4d9.md"
      - ".agentplane/tasks/202608290920-1PZGG8/quality/objects/sha256/e35839039295af7993b80adfdaa63da9729d59a2955432cd06975115f9057010.json"
      - ".agentplane/tasks/202608290920-1PZGG8/supervision/declared-checks.json"
      - ".agentplane/tasks/202608290920-1PZGG8/supervision/implementation-evidence.json"
      - ".agentplane/tasks/202608290920-1PZGG8/verification/20260829093430895-6606b487cced4039.json"
      - ".agentplane/tasks/202608290920-1PZGG8/verification/20260829105535831-b4c997c8906f47d0.json"
      - ".agentplane/tasks/202608290920-1PZGG8/verification/20260829105705983-3742ca4441ecc2c3.json"
      - ".agentplane/tasks/202608290920-1PZGG8/verification/20260829105843774-eef5a01e10b276a9.json"
      - ".agentplane/tasks/202608290920-1PZGG8/verification/20260829110002485-b669a1777bc06949.json"
      - ".agentplane/tasks/202608290920-1PZGG8/verification/20260829112024099-2dc4de9558ceb003.json"
      - ".agentplane/tasks/202608291005-K5TG4D/README.md"
      - ".agentplane/tasks/202608291005-K5TG4D/blueprint/resolved-snapshot.json"
      - ".agentplane/tasks/202608291005-K5TG4D/pr/diffstat.txt"
      - ".agentplane/tasks/202608291005-K5TG4D/pr/github-body.md"
      - ".agentplane/tasks/202608291005-K5TG4D/pr/github-title.txt"
      - ".agentplane/tasks/202608291005-K5TG4D/pr/meta.json"
      - ".agentplane/tasks/202608291005-K5TG4D/pr/review.md"
      - ".agentplane/tasks/202608291005-K5TG4D/quality/20260829-103229021-recovery-context/evaluator-evidence-manifest.json"
      - ".agentplane/tasks/202608291005-K5TG4D/quality/20260829-103229021-recovery-context/evaluator-follow-up.json"
      - ".agentplane/tasks/202608291005-K5TG4D/quality/20260829-103229021-recovery-context/evaluator-opinion.md"
      - ".agentplane/tasks/202608291005-K5TG4D/quality/20260829-103229021-recovery-context/evaluator-result.json"
      - ".agentplane/tasks/202608291005-K5TG4D/quality/20260829-103229021-recovery-context/evaluator-work-order.json"
      - ".agentplane/tasks/202608291005-K5TG4D/quality/20260829-103229021-recovery-context/quality-report.json"
      - ".agentplane/tasks/202608291005-K5TG4D/quality/20260829-104022155-recovery-context/evaluator-evidence-manifest.json"
      - ".agentplane/tasks/202608291005-K5TG4D/quality/20260829-104022155-recovery-context/evaluator-opinion.md"
      - ".agentplane/tasks/202608291005-K5TG4D/quality/20260829-104022155-recovery-context/evaluator-result.json"
      - ".agentplane/tasks/202608291005-K5TG4D/quality/20260829-104022155-recovery-context/evaluator-work-order.json"
      - ".agentplane/tasks/202608291005-K5TG4D/quality/20260829-104022155-recovery-context/quality-report.json"
      - ".agentplane/tasks/202608291005-K5TG4D/quality/20260829-173248762-recovery-context/evaluator-evidence-manifest.json"
      - ".agentplane/tasks/202608291005-K5TG4D/quality/20260829-173248762-recovery-context/evaluator-follow-up.json"
      - ".agentplane/tasks/202608291005-K5TG4D/quality/20260829-173248762-recovery-context/evaluator-opinion.md"
      - ".agentplane/tasks/202608291005-K5TG4D/quality/20260829-173248762-recovery-context/evaluator-result.json"
      - ".agentplane/tasks/202608291005-K5TG4D/quality/20260829-173248762-recovery-context/evaluator-work-order.json"
      - ".agentplane/tasks/202608291005-K5TG4D/quality/20260829-173248762-recovery-context/quality-report.json"
      - ".agentplane/tasks/202608291005-K5TG4D/quality/20260829-175010445-recovery-context/evaluator-evidence-manifest.json"
      - ".agentplane/tasks/202608291005-K5TG4D/quality/20260829-175010445-recovery-context/evaluator-opinion.md"
      - ".agentplane/tasks/202608291005-K5TG4D/quality/20260829-175010445-recovery-context/evaluator-result.json"
      - ".agentplane/tasks/202608291005-K5TG4D/quality/20260829-175010445-recovery-context/evaluator-work-order.json"
      - ".agentplane/tasks/202608291005-K5TG4D/quality/20260829-175010445-recovery-context/quality-report.json"
      - ".agentplane/tasks/202608291005-K5TG4D/quality/20260829-182509713-recovery-context/evaluator-evidence-manifest.json"
      - ".agentplane/tasks/202608291005-K5TG4D/quality/20260829-182509713-recovery-context/evaluator-opinion.md"
      - ".agentplane/tasks/202608291005-K5TG4D/quality/20260829-182509713-recovery-context/evaluator-result.json"
      - ".agentplane/tasks/202608291005-K5TG4D/quality/20260829-182509713-recovery-context/evaluator-work-order.json"
      - ".agentplane/tasks/202608291005-K5TG4D/quality/20260829-182509713-recovery-context/quality-report.json"
      - ".agentplane/tasks/202608291005-K5TG4D/quality/20260829-185822288-recovery-context/evaluator-evidence-manifest.json"
      - ".agentplane/tasks/202608291005-K5TG4D/quality/20260829-185822288-recovery-context/evaluator-opinion.md"
      - ".agentplane/tasks/202608291005-K5TG4D/quality/20260829-185822288-recovery-context/evaluator-result.json"
      - ".agentplane/tasks/202608291005-K5TG4D/quality/20260829-185822288-recovery-context/evaluator-work-order.json"
      - ".agentplane/tasks/202608291005-K5TG4D/quality/20260829-185822288-recovery-context/quality-report.json"
      - ".agentplane/tasks/202608291005-K5TG4D/quality/objects/sha256/03778a2ec59a89f86c77156b5c41749d8a0acbbdbda469294abad9d305f10155.json"
      - ".agentplane/tasks/202608291005-K5TG4D/quality/objects/sha256/07880f19b498431ef1d30b34fe2764e8b0fc650f427c040a2f0edc42c28f3b77.patch"
      - ".agentplane/tasks/202608291005-K5TG4D/quality/objects/sha256/0ced6f2c554a98af94d8e04123277a903da54392ebd92f3890c3a1c95ad75119.patch"
      - ".agentplane/tasks/202608291005-K5TG4D/quality/objects/sha256/1766f852085b004801c6b30bc74a4001f961ab6633e748f9d98d616dc6014fd4.md"
      - ".agentplane/tasks/202608291005-K5TG4D/quality/objects/sha256/2c17fdb65687181ba468e5cc9c2c3f984594a087910177a2a5891e3d95c0b2bb.patch"
      - ".agentplane/tasks/202608291005-K5TG4D/quality/objects/sha256/3bc81fab9e1463c5f3fc60e5327889cf576ad0e6813951c0f8f1c2aa2eb9ee55.patch"
      - ".agentplane/tasks/202608291005-K5TG4D/quality/objects/sha256/3da9d9fcb461bfc780a881e70453aaccb486b17c451b01ad89eb2b0eaa86b047.json"
      - ".agentplane/tasks/202608291005-K5TG4D/quality/objects/sha256/4514df8c306e4d9a4ba9c3d9383dee50e018667e53be66060da5eff32d761945.md"
      - ".agentplane/tasks/202608291005-K5TG4D/quality/objects/sha256/525c6509aac711b4d08c0090cc345b850ddebc82785837269bf692ee7e0f3136.md"
      - ".agentplane/tasks/202608291005-K5TG4D/quality/objects/sha256/69ada31950ca4db1dad4000541000ad3a3ab1150d54f116721dd24d4e2524dcc.json"
      - ".agentplane/tasks/202608291005-K5TG4D/quality/objects/sha256/727ea4cda0736b773d528b2de77e5229e46b9a933447c5a044ab9c8b9023c7b5.md"
      - ".agentplane/tasks/202608291005-K5TG4D/quality/objects/sha256/73eb709075c74a980968c0120a0294a67f005c9c2ff4ce66b7d285a631ceec90.json"
      - ".agentplane/tasks/202608291005-K5TG4D/quality/objects/sha256/7dc71118b2a8cd17ec7401ec0c3f4bdf02a52e16ca3172258eb6ae28fb15e051.json"
      - ".agentplane/tasks/202608291005-K5TG4D/quality/objects/sha256/80da80d9c3d52d3e25efbebf8895def8aa6134897e7646a5ed91c95a5fb37eb7.md"
      - ".agentplane/tasks/202608291005-K5TG4D/quality/objects/sha256/8d06a0bda439bd3cbb2a6a861bb3d632c3591570cb548e661e456561e6ebd0e3.patch"
      - ".agentplane/tasks/202608291005-K5TG4D/quality/objects/sha256/9037cdf98253e70333ede9358d360264a85ee905be64a8723bbdd4ca71e02d4a.json"
      - ".agentplane/tasks/202608291005-K5TG4D/quality/objects/sha256/991fe4f8cfd40b027fed1e34442956c77ba8324246953e0dfae571500cb2b31d.patch"
      - ".agentplane/tasks/202608291005-K5TG4D/quality/objects/sha256/c97155edadb265cb8b9e27094be1f5b53e338048ada37daee80cc3249047ec4f.json"
      - ".agentplane/tasks/202608291005-K5TG4D/quality/objects/sha256/de7dbf9bc2b623c88ba3ae813c42951e54995cde51ca26406dd6b51bf6fb6653.md"
      - ".agentplane/tasks/202608291005-K5TG4D/quality/objects/sha256/ebc86feacec7bdf43d9a1fdbf283a72e4634bef2dfceb9d03c2812644d0bc6fe.json"
      - ".agentplane/tasks/202608291005-K5TG4D/supervision/declared-checks.json"
      - ".agentplane/tasks/202608291005-K5TG4D/supervision/implementation-evidence.json"
      - ".agentplane/tasks/202608291005-K5TG4D/verification/20260829102927784-2ba47b70cf364a12.json"
      - ".agentplane/tasks/202608291005-K5TG4D/verification/20260829103744095-ab63071946986abe.json"
      - ".agentplane/tasks/202608291005-K5TG4D/verification/20260829104004712-22365c9597c0e6ce.json"
      - ".agentplane/tasks/202608291005-K5TG4D/verification/20260829171951260-f6b36db68eb2b50b.json"
      - ".agentplane/tasks/202608291005-K5TG4D/verification/20260829172303993-9558dcfb624109e6.json"
      - ".agentplane/tasks/202608291005-K5TG4D/verification/20260829173023681-a890bff98f1f1613.json"
      - ".agentplane/tasks/202608291005-K5TG4D/verification/20260829173606626-1d584fb7c8bed007.json"
      - ".agentplane/tasks/202608291005-K5TG4D/verification/20260829174126559-55291239fcb3e058.json"
      - ".agentplane/tasks/202608291005-K5TG4D/verification/20260829174619560-6bb5d9fd8340f4b4.json"
      - ".agentplane/tasks/202608291005-K5TG4D/verification/20260829174953384-9a1611a4242d4cd2.json"
      - ".agentplane/tasks/202608291005-K5TG4D/verification/20260829182451924-4a24553f3cae3f0f.json"
      - ".agentplane/tasks/202608291005-K5TG4D/verification/20260829184121098-79ba9f5978aab118.json"
      - ".agentplane/tasks/202608291005-K5TG4D/verification/20260829185804313-ec46cd710c0a1ae8.json"
      - ".agentplane/tasks/202608291505-F5AN0W/README.md"
      - ".agentplane/tasks/202608291505-F5AN0W/blueprint/resolved-snapshot.json"
      - ".agentplane/tasks/202608291505-F5AN0W/pr/diffstat.txt"
      - ".agentplane/tasks/202608291505-F5AN0W/pr/github-body.md"
      - ".agentplane/tasks/202608291505-F5AN0W/pr/github-title.txt"
      - ".agentplane/tasks/202608291505-F5AN0W/pr/meta.json"
      - ".agentplane/tasks/202608291505-F5AN0W/pr/review.md"
      - ".agentplane/tasks/202608291505-F5AN0W/quality/20260829-151703472-recovery-context/evaluator-evidence-manifest.json"
      - ".agentplane/tasks/202608291505-F5AN0W/quality/20260829-151703472-recovery-context/evaluator-opinion.md"
      - ".agentplane/tasks/202608291505-F5AN0W/quality/20260829-151703472-recovery-context/evaluator-result.json"
      - ".agentplane/tasks/202608291505-F5AN0W/quality/20260829-151703472-recovery-context/evaluator-work-order.json"
      - ".agentplane/tasks/202608291505-F5AN0W/quality/20260829-151703472-recovery-context/quality-report.json"
      - ".agentplane/tasks/202608291505-F5AN0W/quality/objects/sha256/34de800803c95065a60ed554ec20ee9e458e08e3eba91b1e37ed7a5fc6939a61.json"
      - ".agentplane/tasks/202608291505-F5AN0W/quality/objects/sha256/3be09f0b87c195e91069dbd310c3854392dd52abe1630e89c3c0b44acfd4f669.patch"
      - ".agentplane/tasks/202608291505-F5AN0W/quality/objects/sha256/41553f2e37d02a2a9ed9c27741445e29255fbfcc80aa18d77feafed25fb17fd8.md"
      - ".agentplane/tasks/202608291505-F5AN0W/quality/objects/sha256/4ed68c6fd1d0c009d994cd956e8cb679ed2f606ddcae63c2e86222ac1634e772.json"
      - ".agentplane/tasks/202608291505-F5AN0W/quality/objects/sha256/9037cdf98253e70333ede9358d360264a85ee905be64a8723bbdd4ca71e02d4a.json"
      - ".agentplane/tasks/202608291505-F5AN0W/supervision/declared-checks.json"
      - ".agentplane/tasks/202608291505-F5AN0W/supervision/implementation-evidence.json"
      - ".agentplane/tasks/202608291505-F5AN0W/verification/20260829151633691-2b8fca041d5695de.json"
      - ".agentplane/tasks/202608292032-1K47B8/README.md"
      - ".agentplane/tasks/202608292032-1K47B8/blueprint/resolved-snapshot.json"
      - ".agentplane/tasks/202608292032-1K47B8/pr/diffstat.txt"
      - ".agentplane/tasks/202608292032-1K47B8/pr/github-body.md"
      - ".agentplane/tasks/202608292032-1K47B8/pr/github-title.txt"
      - ".agentplane/tasks/202608292032-1K47B8/pr/meta.json"
      - ".agentplane/tasks/202608292032-1K47B8/pr/review.md"
      - ".agentplane/tasks/202608292032-1K47B8/quality/20260829-221228710-recovery-context/evaluator-evidence-manifest.json"
      - ".agentplane/tasks/202608292032-1K47B8/quality/20260829-221228710-recovery-context/evaluator-opinion.md"
      - ".agentplane/tasks/202608292032-1K47B8/quality/20260829-221228710-recovery-context/evaluator-result.json"
      - ".agentplane/tasks/202608292032-1K47B8/quality/20260829-221228710-recovery-context/evaluator-work-order.json"
      - ".agentplane/tasks/202608292032-1K47B8/quality/20260829-221228710-recovery-context/quality-report.json"
      - ".agentplane/tasks/202608292032-1K47B8/quality/20260830-014956776-recovery-context/evaluator-evidence-manifest.json"
      - ".agentplane/tasks/202608292032-1K47B8/quality/20260830-014956776-recovery-context/evaluator-follow-up.json"
      - ".agentplane/tasks/202608292032-1K47B8/quality/20260830-014956776-recovery-context/evaluator-opinion.md"
      - ".agentplane/tasks/202608292032-1K47B8/quality/20260830-014956776-recovery-context/evaluator-result.json"
      - ".agentplane/tasks/202608292032-1K47B8/quality/20260830-014956776-recovery-context/evaluator-work-order.json"
      - ".agentplane/tasks/202608292032-1K47B8/quality/20260830-014956776-recovery-context/quality-report.json"
      - ".agentplane/tasks/202608292032-1K47B8/quality/20260830-020852586-recovery-context/evaluator-evidence-manifest.json"
      - ".agentplane/tasks/202608292032-1K47B8/quality/20260830-020852586-recovery-context/evaluator-follow-up.json"
      - ".agentplane/tasks/202608292032-1K47B8/quality/20260830-020852586-recovery-context/evaluator-opinion.md"
      - ".agentplane/tasks/202608292032-1K47B8/quality/20260830-020852586-recovery-context/evaluator-result.json"
      - ".agentplane/tasks/202608292032-1K47B8/quality/20260830-020852586-recovery-context/evaluator-work-order.json"
      - ".agentplane/tasks/202608292032-1K47B8/quality/20260830-020852586-recovery-context/quality-report.json"
      - ".agentplane/tasks/202608292032-1K47B8/quality/20260830-022616722-recovery-context/evaluator-evidence-manifest.json"
      - ".agentplane/tasks/202608292032-1K47B8/quality/20260830-022616722-recovery-context/evaluator-follow-up.json"
      - ".agentplane/tasks/202608292032-1K47B8/quality/20260830-022616722-recovery-context/evaluator-opinion.md"
      - ".agentplane/tasks/202608292032-1K47B8/quality/20260830-022616722-recovery-context/evaluator-result.json"
      - ".agentplane/tasks/202608292032-1K47B8/quality/20260830-022616722-recovery-context/evaluator-work-order.json"
      - ".agentplane/tasks/202608292032-1K47B8/quality/20260830-022616722-recovery-context/quality-report.json"
      - ".agentplane/tasks/202608292032-1K47B8/quality/20260830-031507878-recovery-context/evaluator-evidence-manifest.json"
      - ".agentplane/tasks/202608292032-1K47B8/quality/20260830-031507878-recovery-context/evaluator-opinion.md"
      - ".agentplane/tasks/202608292032-1K47B8/quality/20260830-031507878-recovery-context/evaluator-result.json"
      - ".agentplane/tasks/202608292032-1K47B8/quality/20260830-031507878-recovery-context/evaluator-work-order.json"
      - ".agentplane/tasks/202608292032-1K47B8/quality/20260830-031507878-recovery-context/quality-report.json"
      - ".agentplane/tasks/202608292032-1K47B8/quality/objects/sha256/057b4113ef6c1d87a6a0c3ac3c46939bd871e81dc4f3c1b80129869074842092.patch"
      - ".agentplane/tasks/202608292032-1K47B8/quality/objects/sha256/2b30736d79fa3985a602ca79b8003a85696c1631aa650eb0a69f4b62a313d474.json"
      - ".agentplane/tasks/202608292032-1K47B8/quality/objects/sha256/31eb70979ca99b1b7baf8981a0aa4553f7836924a5a994ef188028919b165c2b.patch"
      - ".agentplane/tasks/202608292032-1K47B8/quality/objects/sha256/3dd6f4403a5f554c55142963371a7073049d6182f7d27407b73e562303e9abce.patch"
      - ".agentplane/tasks/202608292032-1K47B8/quality/objects/sha256/862b552d27a033d4119e9ae7e5436b8c29a143456489a4d14fe36e085df344c8.md"
      - ".agentplane/tasks/202608292032-1K47B8/quality/objects/sha256/8c21a0dae102df37781ea0703471756a6f4d2d97fcb284160d913ae3a336695e.json"
      - ".agentplane/tasks/202608292032-1K47B8/quality/objects/sha256/9037cdf98253e70333ede9358d360264a85ee905be64a8723bbdd4ca71e02d4a.json"
      - ".agentplane/tasks/202608292032-1K47B8/quality/objects/sha256/95b210af54b40faac12625eb2e712a51b734ab5d29796b4091d4b8ed4ba80724.md"
      - ".agentplane/tasks/202608292032-1K47B8/quality/objects/sha256/98a65c6e898cf6302e155442f9e9c0d591d7bf2aadd28d411d264e8c8b7485be.md"
      - ".agentplane/tasks/202608292032-1K47B8/quality/objects/sha256/9ce711649887bc636881f16928a22670e786265ea0c117f13d2613bc1b6f5fc2.patch"
      - ".agentplane/tasks/202608292032-1K47B8/quality/objects/sha256/9e9280b5ceb12fee8fdf6e8b7e283f15038b1c7e8f386ff82f56537c1b9c0ef7.md"
      - ".agentplane/tasks/202608292032-1K47B8/quality/objects/sha256/a042c1178c6dc91f1dba1c8d49a4edcb23a1ace5fa440eb47fcbe4820e3aeb19.json"
      - ".agentplane/tasks/202608292032-1K47B8/quality/objects/sha256/a1e6b2fe5c8facd48dfc66602704770fca1a35152897611f9d31210b22ee8a67.json"
      - ".agentplane/tasks/202608292032-1K47B8/quality/objects/sha256/cdccd39e524d1c90764685a8edd6ed62359da3abd8661ae465fa779bd9f3d0f9.json"
      - ".agentplane/tasks/202608292032-1K47B8/quality/objects/sha256/d79cfc55ccb00071fa070c6bbd3fdb6f55514df2d3d0381e943934ecaa5a55fc.patch"
      - ".agentplane/tasks/202608292032-1K47B8/quality/objects/sha256/ec06c6e7b7c18b069d7feb65ee296ee81d6dd16038b64f87e395a5e48cec1b36.md"
      - ".agentplane/tasks/202608292032-1K47B8/quality/objects/sha256/ef17fe668230493a9b07f598b59d087f0c79b80eefbd629aaeadaa33cdb8d767.json"
      - ".agentplane/tasks/202608292032-1K47B8/supervision/declared-checks.json"
      - ".agentplane/tasks/202608292032-1K47B8/supervision/implementation-evidence.json"
      - ".agentplane/tasks/202608292032-1K47B8/verification/20260829204319619-6c577c9c8306a169.json"
      - ".agentplane/tasks/202608292032-1K47B8/verification/20260829210140898-e3d969adc161f644.json"
      - ".agentplane/tasks/202608292032-1K47B8/verification/20260829212246580-d0145ef1b109b582.json"
      - ".agentplane/tasks/202608292032-1K47B8/verification/20260829213703792-b4d5487c553f5a17.json"
      - ".agentplane/tasks/202608292032-1K47B8/verification/20260829214826738-20b5311a327c1579.json"
      - ".agentplane/tasks/202608292032-1K47B8/verification/20260829215542838-893d49886b2f4a8e.json"
      - ".agentplane/tasks/202608292032-1K47B8/verification/20260829221218641-6fb97c97e2e96fa0.json"
      - ".agentplane/tasks/202608292032-1K47B8/verification/20260830003005735-5d60d1d702715321.json"
      - ".agentplane/tasks/202608292032-1K47B8/verification/20260830014945273-2738197afdbf32cb.json"
      - ".agentplane/tasks/202608292032-1K47B8/verification/20260830020840555-6abd518e792f9be0.json"
      - ".agentplane/tasks/202608292032-1K47B8/verification/20260830022602801-f4386fc8af0c0a93.json"
      - ".agentplane/tasks/202608292032-1K47B8/verification/20260830025715800-1f7012fe8ad951d0.json"
      - ".agentplane/tasks/202608292032-1K47B8/verification/20260830031455405-6315535599fc124b.json"
      - ".agentplane/tasks/202608292218-3N0FBK/README.md"
      - ".agentplane/tasks/202608292218-3N0FBK/blueprint/resolved-snapshot.json"
      - ".agentplane/tasks/202608292218-3N0FBK/pr/diffstat.txt"
      - ".agentplane/tasks/202608292218-3N0FBK/pr/github-body.md"
      - ".agentplane/tasks/202608292218-3N0FBK/pr/github-title.txt"
      - ".agentplane/tasks/202608292218-3N0FBK/pr/meta.json"
      - ".agentplane/tasks/202608292218-3N0FBK/pr/review.md"
      - ".agentplane/tasks/202608292218-3N0FBK/quality/20260829-232019133-recovery-context/evaluator-evidence-manifest.json"
      - ".agentplane/tasks/202608292218-3N0FBK/quality/20260829-232019133-recovery-context/evaluator-opinion.md"
      - ".agentplane/tasks/202608292218-3N0FBK/quality/20260829-232019133-recovery-context/evaluator-result.json"
      - ".agentplane/tasks/202608292218-3N0FBK/quality/20260829-232019133-recovery-context/evaluator-work-order.json"
      - ".agentplane/tasks/202608292218-3N0FBK/quality/20260829-232019133-recovery-context/quality-report.json"
      - ".agentplane/tasks/202608292218-3N0FBK/quality/objects/sha256/0746e6bf83a188f6678201af5c5c2e782aaaa0faebaf297aeaf0f1b9057cf4c2.md"
      - ".agentplane/tasks/202608292218-3N0FBK/quality/objects/sha256/6508f2281bdb76c7a51465f00997415cbb1144f19fa37a27045d5eb8eeaa13cf.patch"
      - ".agentplane/tasks/202608292218-3N0FBK/quality/objects/sha256/705fd23cea4f0661155d847cbe29aa51c0c7ce19052019f39df3424f3d34d10d.json"
      - ".agentplane/tasks/202608292218-3N0FBK/quality/objects/sha256/9037cdf98253e70333ede9358d360264a85ee905be64a8723bbdd4ca71e02d4a.json"
      - ".agentplane/tasks/202608292218-3N0FBK/quality/objects/sha256/9f512f0819486738a0914d14aafef8ee94d25191007e8e94c679c6aedca6fbd9.json"
      - ".agentplane/tasks/202608292218-3N0FBK/supervision/declared-checks.json"
      - ".agentplane/tasks/202608292218-3N0FBK/supervision/implementation-evidence.json"
      - ".agentplane/tasks/202608292218-3N0FBK/verification/20260829223458865-779a4c712ea93918.json"
      - ".agentplane/tasks/202608292218-3N0FBK/verification/20260829224625339-315ba0801ec5e6ea.json"
      - ".agentplane/tasks/202608292218-3N0FBK/verification/20260829225800434-b5f93cf6b11f2c61.json"
      - ".agentplane/tasks/202608292218-3N0FBK/verification/20260829230555501-2ec025e699fda236.json"
      - ".agentplane/tasks/202608292218-3N0FBK/verification/20260829232002016-276e3b6422ad5f09.json"
      - ".agentplane/tasks/202608300119-ZHYXRS/README.md"
      - ".agentplane/tasks/202608300119-ZHYXRS/blueprint/resolved-snapshot.json"
      - ".agentplane/tasks/202608300119-ZHYXRS/pr/diffstat.txt"
      - ".agentplane/tasks/202608300119-ZHYXRS/pr/github-body.md"
      - ".agentplane/tasks/202608300119-ZHYXRS/pr/github-title.txt"
      - ".agentplane/tasks/202608300119-ZHYXRS/pr/meta.json"
      - ".agentplane/tasks/202608300119-ZHYXRS/pr/review.md"
      - ".agentplane/tasks/202608300119-ZHYXRS/quality/20260830-014145339-recovery-context/evaluator-evidence-manifest.json"
      - ".agentplane/tasks/202608300119-ZHYXRS/quality/20260830-014145339-recovery-context/evaluator-opinion.md"
      - ".agentplane/tasks/202608300119-ZHYXRS/quality/20260830-014145339-recovery-context/evaluator-result.json"
      - ".agentplane/tasks/202608300119-ZHYXRS/quality/20260830-014145339-recovery-context/evaluator-work-order.json"
      - ".agentplane/tasks/202608300119-ZHYXRS/quality/20260830-014145339-recovery-context/quality-report.json"
      - ".agentplane/tasks/202608300119-ZHYXRS/quality/20260830-022732861-recovery-context/evaluator-evidence-manifest.json"
      - ".agentplane/tasks/202608300119-ZHYXRS/quality/20260830-022732861-recovery-context/evaluator-opinion.md"
      - ".agentplane/tasks/202608300119-ZHYXRS/quality/20260830-022732861-recovery-context/evaluator-result.json"
      - ".agentplane/tasks/202608300119-ZHYXRS/quality/20260830-022732861-recovery-context/evaluator-work-order.json"
      - ".agentplane/tasks/202608300119-ZHYXRS/quality/20260830-022732861-recovery-context/quality-report.json"
      - ".agentplane/tasks/202608300119-ZHYXRS/quality/objects/sha256/085818fb482ed6c75bdcd72074d2a06cd54a8963642055db58f4d5f95a5f417c.json"
      - ".agentplane/tasks/202608300119-ZHYXRS/quality/objects/sha256/0ae8f7054187226c4378474e61a236b83e14b480899aed7def309c417740ebc8.json"
      - ".agentplane/tasks/202608300119-ZHYXRS/quality/objects/sha256/68cd886e72e9a681f60c9770ffb31cc09b30751c52abfe3b9d62753ed744f3e9.json"
      - ".agentplane/tasks/202608300119-ZHYXRS/quality/objects/sha256/7bd203cf9dcbd8fd7fb54c71fb43608d75f904771948104bd6fb5e32111922c3.md"
      - ".agentplane/tasks/202608300119-ZHYXRS/quality/objects/sha256/9037cdf98253e70333ede9358d360264a85ee905be64a8723bbdd4ca71e02d4a.json"
      - ".agentplane/tasks/202608300119-ZHYXRS/quality/objects/sha256/9ca03923fb3436ecdd936ae66f4ce9710cdb58d8bccf37d570410152ec188918.md"
      - ".agentplane/tasks/202608300119-ZHYXRS/quality/objects/sha256/e4594a5165434d84043609c114251fb1d166c7612623342d185fb34239acfb29.patch"
      - ".agentplane/tasks/202608300119-ZHYXRS/quality/objects/sha256/efec60e7d3b43883689358d77d2278cfa5e0346ad57e5c8695bdc74cecff1470.patch"
      - ".agentplane/tasks/202608300119-ZHYXRS/supervision/declared-checks.json"
      - ".agentplane/tasks/202608300119-ZHYXRS/supervision/implementation-evidence.json"
      - ".agentplane/tasks/202608300119-ZHYXRS/verification/20260830013042448-9879d2e0317ba8ff.json"
      - ".agentplane/tasks/202608300119-ZHYXRS/verification/20260830014106431-a78ca4036e517933.json"
      - ".agentplane/tasks/202608300119-ZHYXRS/verification/20260830021428357-1faa3b8361b33f16.json"
      - ".agentplane/tasks/202608300119-ZHYXRS/verification/20260830022721719-75aba1a0c8379039.json"
      - "depcruise.config.cjs"
      - "docs/adr/0017-clean-task-core-rebuild.md"
      - "docs/adr/README.md"
      - "docs/developer/harness-dev.mdx"
      - "docs/developer/local-runtime-resolution.md"
      - "docs/reference/clean-task-core-rebuild-spec.mdx"
      - "packages/agentplane/assets/policy/incidents.md"
      - "packages/agentplane/src/cli/__snapshots__/run-cli.core.help-snap.test.ts.snap"
      - "packages/agentplane/src/cli/prompts.test.ts"
      - "packages/agentplane/src/cli/route-decision.testkit.ts"
      - "packages/agentplane/src/cli/run-cli.core.blueprint.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.direct-task-supervision.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.help-snap.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.incidents.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.lifecycle.finish-validation.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.lifecycle.plan.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.lifecycle.start-commit.policy.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.lifecycle.start-readiness.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.lifecycle.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.lifecycle.verify.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-notes-verify.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.artifacts.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.git.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.network.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-validation.open-hydration.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-validation.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-validation.update.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.pr-flow.start-ready.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.pr-flow.status.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.release-tasks-reconcile.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.route-decision.batch.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.route-decision.direct-closeout.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.route-decision.pr-open-metadata.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.route-decision.quality.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.route-decision.remote-confidence.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.route-decision.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.route-decision.verification.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.task-advance-effect-recovery.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.task-advance.branch-worktree.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.task-advance.evaluator-recovery.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.task-advance.evidence-rework.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.task-advance.worktree-resolution.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.task-create-base-intent.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.task-create-planner-intent.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.task-guided.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.task-handoff.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.task-next-action-json.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.task-routing.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.task-status-token-usage.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.tasks.active.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.tasks.lifecycle.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.tasks.user-create.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.tasks.verify-matrix.test.ts"
      - "packages/agentplane/src/cli/run-cli/commands/init/prompts.test.ts"
      - "packages/agentplane/src/cli/task-advance-effect-recovery.testkit.ts"
      - "packages/agentplane/src/cli/task-continuity.testkit.ts"
      - "packages/agentplane/src/cli/task-create-planner-intent.testkit.ts"
      - "packages/agentplane/src/commands/evaluator/evaluator-episode.calibration.test.ts"
      - "packages/agentplane/src/commands/evaluator/evaluator-review-usecase.ts"
      - "packages/agentplane/src/commands/evaluator/evaluator-runtime-evidence.test.ts"
      - "packages/agentplane/src/commands/pr/head-publication.test.ts"
      - "packages/agentplane/src/commands/pr/head-publication.ts"
      - "packages/agentplane/src/commands/pr/provider-update-branch-local.test.ts"
      - "packages/agentplane/src/commands/pr/provider-update-branch-local.ts"
      - "packages/agentplane/src/commands/pr/provider-update-branch.test.ts"
      - "packages/agentplane/src/commands/pr/provider-update-branch.ts"
      - "packages/agentplane/src/commands/shared/pr-meta/verify-log.test.ts"
      - "packages/agentplane/src/commands/shared/pr-meta/verify-log.ts"
      - "packages/agentplane/src/commands/shared/provider-update-branch-route.ts"
      - "packages/agentplane/src/commands/shared/quality-review-retirement.ts"
      - "packages/agentplane/src/commands/shared/route-decision-blockers.quality-review.test.ts"
      - "packages/agentplane/src/commands/shared/route-decision-blockers.ts"
      - "packages/agentplane/src/commands/shared/route-gate-priority.ts"
      - "packages/agentplane/src/commands/shared/route-oracle.ts"
      - "packages/agentplane/src/commands/shared/side-effect-authority.test.ts"
      - "packages/agentplane/src/commands/shared/side-effect-authority.ts"
      - "packages/agentplane/src/commands/shared/task-scope-extension-request.ts"
      - "packages/agentplane/src/commands/shared/workflow-operation-effects.ts"
      - "packages/agentplane/src/commands/shared/workflow-operation-prefix.ts"
      - "packages/agentplane/src/commands/shared/workflow-operation-projection.registry.test.ts"
      - "packages/agentplane/src/commands/shared/workflow-operation-projection.ts"
      - "packages/agentplane/src/commands/shared/workflow-postconditions.ts"
      - "packages/agentplane/src/commands/shared/workflow-step-branch.ts"
      - "packages/agentplane/src/commands/shared/workflow-step-factory.ts"
      - "packages/agentplane/src/commands/shared/workflow-step-projections.conflict-rework.test.ts"
      - "packages/agentplane/src/commands/shared/workflow-step-provider-update-branch-spec.ts"
      - "packages/agentplane/src/commands/shared/workflow-step-provider-update-branch.ts"
      - "packages/agentplane/src/commands/shared/workflow-step-quality.test.ts"
      - "packages/agentplane/src/commands/shared/workflow-step.ts"
      - "packages/agentplane/src/commands/task/branch-task-supervisor-operations.test.ts"
      - "packages/agentplane/src/commands/task/branch-task-supervisor-operations.ts"
      - "packages/agentplane/src/commands/task/configured-authority.test.ts"
      - "packages/agentplane/src/commands/task/direct-task-verification.test.ts"
      - "packages/agentplane/src/commands/task/direct-task-verification.ts"
      - "packages/agentplane/src/commands/task/external-agent-evaluator-recovery.test.ts"
      - "packages/agentplane/src/commands/task/external-agent-evaluator-recovery.ts"
      - "packages/agentplane/src/commands/task/external-agent-implementation-authority.ts"
      - "packages/agentplane/src/commands/task/external-agent-implementation-recovery.test.ts"
      - "packages/agentplane/src/commands/task/external-agent-implementation-recovery.ts"
      - "packages/agentplane/src/commands/task/external-agent-planning-authority.test.ts"
      - "packages/agentplane/src/commands/task/external-agent-planning-authority.ts"
      - "packages/agentplane/src/commands/task/external-agent-supervisor-recovery.ts"
      - "packages/agentplane/src/commands/task/external-agent-supervisor.ts"
      - "packages/agentplane/src/commands/task/finish-shared.ts"
      - "packages/agentplane/src/commands/task/scope-extend.test.ts"
      - "packages/agentplane/src/commands/task/task-centric-external-result.test.ts"
      - "packages/agentplane/src/commands/task/task-centric-external-result.ts"
      - "packages/agentplane/src/commands/task/verify-record-execute.ts"
      - "packages/agentplane/src/commands/task/verify-record.durability.unit.test.ts"
      - "packages/agentplane/src/commands/task/verify-record.unit.test.ts"
      - "packages/agentplane/src/runner/adapters/custom-security.test.ts"
      - "packages/agentplane/src/runner/artifacts.ts"
      - "packages/agentplane/src/runner/execution-receipt.ts"
      - "packages/agentplane/src/runner/process-supervision/result.ts"
      - "packages/agentplane/src/runner/process-supervision/run.ts"
      - "packages/agentplane/src/runner/process-supervision/state.ts"
      - "packages/agentplane/src/runner/runtime-env.integration.test.ts"
      - "packages/agentplane/src/runner/types/state.ts"
      - "packages/agentplane/src/runtime/task-execution-context/resolve.test.ts"
      - "packages/agentplane/src/shared/runtime-env.test.ts"
      - "packages/agentplane/src/shared/runtime-env.ts"
      - "packages/core/src/tasks/index.ts"
      - "packages/core/src/tasks/task-centric/graph.ts"
      - "packages/core/src/tasks/task-centric/task-centric.test.ts"
      - "packages/core/src/tasks/task-kernel/M1-QUALIFICATION.md"
      - "packages/core/src/tasks/task-kernel/index.ts"
      - "packages/core/src/tasks/task-kernel/invariants.test.ts"
      - "packages/core/src/tasks/task-kernel/invariants.ts"
      - "packages/core/src/tasks/task-kernel/kernel.test-fixtures.ts"
      - "packages/core/src/tasks/task-kernel/kernel.test.ts"
      - "packages/core/src/tasks/task-kernel/kernel.ts"
      - "packages/core/src/tasks/task-kernel/model.test.ts"
      - "packages/core/src/tasks/task-kernel/model.ts"
      - "packages/testkit/src/cli-core-pr-flow.ts"
      - "packages/testkit/src/cli.test.ts"
      - "scripts/qualification/check-packaged-mixed-scope-lifecycle.mjs"
      - "scripts/qualification/release-qualification.test.mjs"
      - "website/static/img/social/docs/adr/0017-clean-task-core-rebuild.png"
      - "website/static/img/social/docs/reference/clean-task-core-rebuild-spec.png"
      - "website/static/img/social/manifest.json"
    external_effects: []
    repository_effects:
      - "documentation"
      - "repository_write"
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
        result: "fail"
  reason_codes:
    - "agent_preferred_branch_pr"
    - "effect_security_boundary"
    - "observed_path_outside_scope:.agentplane/policy/incidents.md"
    - "observed_path_outside_scope:.agentplane/tasks/202608260947-C6WV4T/README.md"
    - "observed_path_outside_scope:.agentplane/tasks/202608260947-C6WV4T/blueprint/resolved-snapshot.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608260947-C6WV4T/pr/diffstat.txt"
    - "observed_path_outside_scope:.agentplane/tasks/202608260947-C6WV4T/pr/github-body.md"
    - "observed_path_outside_scope:.agentplane/tasks/202608260947-C6WV4T/pr/github-title.txt"
    - "observed_path_outside_scope:.agentplane/tasks/202608260947-C6WV4T/pr/meta.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608260947-C6WV4T/pr/review.md"
    - "observed_path_outside_scope:.agentplane/tasks/202608260947-C6WV4T/quality/20260826-105227686-recovery-context/evaluator-evidence-manifest.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608260947-C6WV4T/quality/20260826-105227686-recovery-context/evaluator-opinion.md"
    - "observed_path_outside_scope:.agentplane/tasks/202608260947-C6WV4T/quality/20260826-105227686-recovery-context/evaluator-result.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608260947-C6WV4T/quality/20260826-105227686-recovery-context/evaluator-work-order.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608260947-C6WV4T/quality/20260826-105227686-recovery-context/quality-report.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608260947-C6WV4T/quality/objects/sha256/28aeeca59baccc008fa96c5a1bba3e1c91e889eb8923ebefbcb1b317c408ece3.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608260947-C6WV4T/quality/objects/sha256/36e8a2a2c1b50ad817232abbdf1c90c83549c46da46de70003fc3d19c5b09703.md"
    - "observed_path_outside_scope:.agentplane/tasks/202608260947-C6WV4T/quality/objects/sha256/9037cdf98253e70333ede9358d360264a85ee905be64a8723bbdd4ca71e02d4a.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608260947-C6WV4T/quality/objects/sha256/a39e66da8555d830d71298b5c64fbb5d3f50103573bc66640d89a196ba0621f8.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608260947-C6WV4T/quality/objects/sha256/ed5ff1bc96ab14843609d69b953efe9aa1d3a4216026cfbf5f6e2c2c67562c10.patch"
    - "observed_path_outside_scope:.agentplane/tasks/202608260947-C6WV4T/supervision/declared-checks.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608260947-C6WV4T/supervision/implementation-evidence.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608260947-C6WV4T/verification/20260826101202781-c0efa3be2c04108a.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608260947-C6WV4T/verification/20260826102051415-1a60d2fff4f33f35.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608260947-C6WV4T/verification/20260826103831301-084955658270d1e2.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608260947-C6WV4T/verification/20260826104850237-742d0ef8d9576f58.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608261249-BXQZ97/README.md"
    - "observed_path_outside_scope:.agentplane/tasks/202608261249-BXQZ97/blueprint/resolved-snapshot.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608261249-BXQZ97/pr/diffstat.txt"
    - "observed_path_outside_scope:.agentplane/tasks/202608261249-BXQZ97/pr/github-body.md"
    - "observed_path_outside_scope:.agentplane/tasks/202608261249-BXQZ97/pr/github-title.txt"
    - "observed_path_outside_scope:.agentplane/tasks/202608261249-BXQZ97/pr/meta.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608261249-BXQZ97/pr/review.md"
    - "observed_path_outside_scope:.agentplane/tasks/202608261249-BXQZ97/quality/20260826-154337837-recovery-context/evaluator-evidence-manifest.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608261249-BXQZ97/quality/20260826-154337837-recovery-context/evaluator-work-order.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608261249-BXQZ97/quality/20260826-154349579-recovery-context/evaluator-evidence-manifest.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608261249-BXQZ97/quality/20260826-154349579-recovery-context/evaluator-opinion.md"
    - "observed_path_outside_scope:.agentplane/tasks/202608261249-BXQZ97/quality/20260826-154349579-recovery-context/evaluator-result.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608261249-BXQZ97/quality/20260826-154349579-recovery-context/evaluator-work-order.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608261249-BXQZ97/quality/20260826-154349579-recovery-context/quality-report.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608261249-BXQZ97/quality/20260826-171737369-recovery-context/evaluator-evidence-manifest.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608261249-BXQZ97/quality/20260826-171737369-recovery-context/evaluator-work-order.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608261249-BXQZ97/quality/20260826-171746402-recovery-context/evaluator-evidence-manifest.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608261249-BXQZ97/quality/20260826-171746402-recovery-context/evaluator-opinion.md"
    - "observed_path_outside_scope:.agentplane/tasks/202608261249-BXQZ97/quality/20260826-171746402-recovery-context/evaluator-result.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608261249-BXQZ97/quality/20260826-171746402-recovery-context/evaluator-work-order.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608261249-BXQZ97/quality/20260826-171746402-recovery-context/quality-report.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608261249-BXQZ97/quality/20260826-184958130-recovery-context/evaluator-evidence-manifest.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608261249-BXQZ97/quality/20260826-184958130-recovery-context/evaluator-opinion.md"
    - "observed_path_outside_scope:.agentplane/tasks/202608261249-BXQZ97/quality/20260826-184958130-recovery-context/evaluator-result.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608261249-BXQZ97/quality/20260826-184958130-recovery-context/evaluator-work-order.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608261249-BXQZ97/quality/20260826-184958130-recovery-context/quality-report.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608261249-BXQZ97/quality/objects/sha256/081a872247cd011fcd717d8674c5e8435662c78ef4fc15cb726edadffac91f00.patch"
    - "observed_path_outside_scope:.agentplane/tasks/202608261249-BXQZ97/quality/objects/sha256/1f02efb4b8bab934d1772f143fb49a62c41af32c0dcc88e6d84d63067eb2476a.patch"
    - "observed_path_outside_scope:.agentplane/tasks/202608261249-BXQZ97/quality/objects/sha256/2d08ac03d9f2c967e311337b36f1002c301ce46e6179b3197c8735f606d4bd5d.md"
    - "observed_path_outside_scope:.agentplane/tasks/202608261249-BXQZ97/quality/objects/sha256/49864fc10ebd312c36e5388075629eb27dd999c9531f6456b52708a9955fb1ce.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608261249-BXQZ97/quality/objects/sha256/6e793f3b5cf384ceae276d6d2daa685a2ea831c2c622aa09bbd54f9e9993ea15.patch"
    - "observed_path_outside_scope:.agentplane/tasks/202608261249-BXQZ97/quality/objects/sha256/7b8649aeee3293091a3475cb6b9b8fd50578e76f50f2d69d1a48b0a0564c6588.md"
    - "observed_path_outside_scope:.agentplane/tasks/202608261249-BXQZ97/quality/objects/sha256/9037cdf98253e70333ede9358d360264a85ee905be64a8723bbdd4ca71e02d4a.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608261249-BXQZ97/quality/objects/sha256/ca152961094cc816531a9f9428b59e35044108767b0c5ab2b8697f9d41bd5d6e.md"
    - "observed_path_outside_scope:.agentplane/tasks/202608261249-BXQZ97/quality/objects/sha256/dc53ed08c3dda49bb4078be5bf32b0ada19800cc5f1fcdb14fecdccd54975356.md"
    - "observed_path_outside_scope:.agentplane/tasks/202608261249-BXQZ97/quality/objects/sha256/e6c20dad3911e302671884f019d9d82e25ccbc8f44d64823eeebfa77db14c513.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608261249-BXQZ97/quality/objects/sha256/ec34965843d7ceaadde82286a6f78ba6336ac4a3d062b6aa9890f9fd67f55ddb.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608261249-BXQZ97/quality/objects/sha256/f091e58f8e79aefd3d495f1f01552d4326b86c44e0607e070495425e53edbf2a.md"
    - "observed_path_outside_scope:.agentplane/tasks/202608261249-BXQZ97/quality/objects/sha256/f3348a06497ca3aad892ff85d6f30139a609de8eb281221d422464223991c706.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608261249-BXQZ97/supervision/declared-checks.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608261249-BXQZ97/supervision/implementation-evidence.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608261249-BXQZ97/verification/20260826131231828-4899fc7776fc3011.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608261249-BXQZ97/verification/20260826131801504-414ceddf9264b14a.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608261249-BXQZ97/verification/20260826133735342-6eebdbeee58c63b8.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608261249-BXQZ97/verification/20260826140354671-51ca742916d6d412.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608261249-BXQZ97/verification/20260826140354671-f118e6b643ac2277.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608261249-BXQZ97/verification/20260826142031076-8ac311f53c036691.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608261249-BXQZ97/verification/20260826164823835-114624ee0716d03c.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608261249-BXQZ97/verification/20260826164823835-32417bd6c41cd6fa.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608261249-BXQZ97/verification/20260826165515427-a3cc939a542cd2aa.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608261249-BXQZ97/verification/20260826165827922-f50094dfabc25c8a.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608261249-BXQZ97/verification/20260826170134616-f04da5d817e4ab2e.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608261249-BXQZ97/verification/20260826170811135-da8030825d7c301a.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608261249-BXQZ97/verification/20260826171201924-42ebe5c731851354.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608261249-BXQZ97/verification/20260826171322652-7e41b1cc15cfed88.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608261249-BXQZ97/verification/20260826180631339-09707b1c0e98c6de.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608261249-BXQZ97/verification/20260826180631339-2614f45e8b6de844.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608261249-BXQZ97/verification/20260826181511661-477b9b7ac50111ef.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608261249-BXQZ97/verification/20260826182424360-48a3862358bbf338.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608261249-BXQZ97/verification/20260826182631556-e4632490ec0e3dab.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608262034-QVVB66/README.md"
    - "observed_path_outside_scope:.agentplane/tasks/202608262034-QVVB66/blueprint/resolved-snapshot.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608262034-QVVB66/pr/diffstat.txt"
    - "observed_path_outside_scope:.agentplane/tasks/202608262034-QVVB66/pr/github-body.md"
    - "observed_path_outside_scope:.agentplane/tasks/202608262034-QVVB66/pr/github-title.txt"
    - "observed_path_outside_scope:.agentplane/tasks/202608262034-QVVB66/pr/meta.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608262034-QVVB66/pr/review.md"
    - "observed_path_outside_scope:.agentplane/tasks/202608262034-QVVB66/quality/20260826-232534701-recovery-context/evaluator-evidence-manifest.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608262034-QVVB66/quality/20260826-232534701-recovery-context/evaluator-opinion.md"
    - "observed_path_outside_scope:.agentplane/tasks/202608262034-QVVB66/quality/20260826-232534701-recovery-context/evaluator-result.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608262034-QVVB66/quality/20260826-232534701-recovery-context/evaluator-work-order.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608262034-QVVB66/quality/20260826-232534701-recovery-context/quality-report.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608262034-QVVB66/quality/objects/sha256/0d8d9d809bba84acdf89f5b6a6de1e594e0e057ad12081d1c93925007ae3ba56.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608262034-QVVB66/quality/objects/sha256/1f8c4d5afe794c741ad276e3c9a442bb8d4a0a833501f6c57adcc2cc0cbd510a.md"
    - "observed_path_outside_scope:.agentplane/tasks/202608262034-QVVB66/quality/objects/sha256/6e4e04668c5a112cfb3f80c4b887a269381efd99162afd71dc2db583b725b51f.patch"
    - "observed_path_outside_scope:.agentplane/tasks/202608262034-QVVB66/quality/objects/sha256/9037cdf98253e70333ede9358d360264a85ee905be64a8723bbdd4ca71e02d4a.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608262034-QVVB66/quality/objects/sha256/fb1af76268dd0e8465077608561a882b98194d2c2106b9f4a0f54b5a8216c4e9.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608262034-QVVB66/supervision/declared-checks.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608262034-QVVB66/supervision/implementation-evidence.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608262034-QVVB66/verification/20260826210937938-160302ec11db2821.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608262034-QVVB66/verification/20260826214006249-ef143b4293541bc2.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608262034-QVVB66/verification/20260826214633989-ff0fb06f0372a7b1.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608262034-QVVB66/verification/20260826214746594-95de7efcdc59dfaf.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608262034-QVVB66/verification/20260826222042038-1fbbbd157b86bc45.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608262034-QVVB66/verification/20260826225343074-06fb3b6272c4d3ce.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608262034-QVVB66/verification/20260826232338533-1f3a5cc55d1c2e2e.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608262034-QVVB66/verification/20260826232507417-6ba5f717053eee31.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608271251-GHHA0Q/README.md"
    - "observed_path_outside_scope:.agentplane/tasks/202608271251-GHHA0Q/blueprint/resolved-snapshot.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608271251-GHHA0Q/pr/diffstat.txt"
    - "observed_path_outside_scope:.agentplane/tasks/202608271251-GHHA0Q/pr/github-body.md"
    - "observed_path_outside_scope:.agentplane/tasks/202608271251-GHHA0Q/pr/github-title.txt"
    - "observed_path_outside_scope:.agentplane/tasks/202608271251-GHHA0Q/pr/meta.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608271251-GHHA0Q/pr/review.md"
    - "observed_path_outside_scope:.agentplane/tasks/202608271251-GHHA0Q/quality/20260827-132550152-recovery-context/evaluator-evidence-manifest.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608271251-GHHA0Q/quality/20260827-132550152-recovery-context/evaluator-opinion.md"
    - "observed_path_outside_scope:.agentplane/tasks/202608271251-GHHA0Q/quality/20260827-132550152-recovery-context/evaluator-result.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608271251-GHHA0Q/quality/20260827-132550152-recovery-context/evaluator-work-order.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608271251-GHHA0Q/quality/20260827-132550152-recovery-context/quality-report.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608271251-GHHA0Q/quality/objects/sha256/5f1761b308e3fa79606d64298d038aa48eed248df8f75002c32bf6175b74a26f.md"
    - "observed_path_outside_scope:.agentplane/tasks/202608271251-GHHA0Q/quality/objects/sha256/655d50e79cbbfa8962590054cf5fa3edbb0455a549a7ebf14ff0e4491251ee69.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608271251-GHHA0Q/quality/objects/sha256/87363b64dfbbc8acb0a0e1d49c8a00c932eb1f73b80583339c6e83f8490049d8.patch"
    - "observed_path_outside_scope:.agentplane/tasks/202608271251-GHHA0Q/quality/objects/sha256/9037cdf98253e70333ede9358d360264a85ee905be64a8723bbdd4ca71e02d4a.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608271251-GHHA0Q/quality/objects/sha256/9ee81d006aad7410d4eabee9de9e480cf2cd79d61bd1335ade9707d04079fb6f.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608271251-GHHA0Q/supervision/declared-checks.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608271251-GHHA0Q/supervision/implementation-evidence.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608271251-GHHA0Q/verification/20260827130652681-032dc4b51b16d8f5.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608271251-GHHA0Q/verification/20260827132532555-956f74b4ae404852.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608271358-G0N9P4/README.md"
    - "observed_path_outside_scope:.agentplane/tasks/202608271358-G0N9P4/blueprint/resolved-snapshot.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608271358-G0N9P4/pr/diffstat.txt"
    - "observed_path_outside_scope:.agentplane/tasks/202608271358-G0N9P4/pr/github-body.md"
    - "observed_path_outside_scope:.agentplane/tasks/202608271358-G0N9P4/pr/github-title.txt"
    - "observed_path_outside_scope:.agentplane/tasks/202608271358-G0N9P4/pr/meta.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608271358-G0N9P4/pr/review.md"
    - "observed_path_outside_scope:.agentplane/tasks/202608271358-G0N9P4/quality/20260827-144308272-recovery-context/evaluator-evidence-manifest.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608271358-G0N9P4/quality/20260827-144308272-recovery-context/evaluator-opinion.md"
    - "observed_path_outside_scope:.agentplane/tasks/202608271358-G0N9P4/quality/20260827-144308272-recovery-context/evaluator-result.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608271358-G0N9P4/quality/20260827-144308272-recovery-context/evaluator-work-order.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608271358-G0N9P4/quality/20260827-144308272-recovery-context/quality-report.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608271358-G0N9P4/quality/objects/sha256/14513056fb48f13c0a2081399288b24ce14495e22af1134cff7f041d75a4cf96.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608271358-G0N9P4/quality/objects/sha256/2501149452aa79bbcf0f5915f02d7db1170a7c5b1117d25c3504628d5d3d60f1.patch"
    - "observed_path_outside_scope:.agentplane/tasks/202608271358-G0N9P4/quality/objects/sha256/2f9b84087cbe4076bce202e94828ba937a9e4172d1620f4d48a2c73dcd5991c6.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608271358-G0N9P4/quality/objects/sha256/777c538f21215f1399fa50862508b756510efedb76645600f61bf3f670794223.md"
    - "observed_path_outside_scope:.agentplane/tasks/202608271358-G0N9P4/quality/objects/sha256/9037cdf98253e70333ede9358d360264a85ee905be64a8723bbdd4ca71e02d4a.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608271358-G0N9P4/supervision/declared-checks.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608271358-G0N9P4/supervision/implementation-evidence.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608271358-G0N9P4/verification/20260827141049775-a9ec4c50eea55011.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608271358-G0N9P4/verification/20260827143026261-afc0c60aa5ad0a08.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608271358-G0N9P4/verification/20260827144238263-382161b49fad458b.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608271425-9EWJA1/README.md"
    - "observed_path_outside_scope:.agentplane/tasks/202608271425-9EWJA1/blueprint/resolved-snapshot.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608271425-9EWJA1/pr/diffstat.txt"
    - "observed_path_outside_scope:.agentplane/tasks/202608271425-9EWJA1/pr/github-body.md"
    - "observed_path_outside_scope:.agentplane/tasks/202608271425-9EWJA1/pr/github-title.txt"
    - "observed_path_outside_scope:.agentplane/tasks/202608271425-9EWJA1/pr/meta.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608271425-9EWJA1/pr/review.md"
    - "observed_path_outside_scope:.agentplane/tasks/202608271425-9EWJA1/quality/20260827-145146182-recovery-context/evaluator-evidence-manifest.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608271425-9EWJA1/quality/20260827-145146182-recovery-context/evaluator-opinion.md"
    - "observed_path_outside_scope:.agentplane/tasks/202608271425-9EWJA1/quality/20260827-145146182-recovery-context/evaluator-result.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608271425-9EWJA1/quality/20260827-145146182-recovery-context/evaluator-work-order.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608271425-9EWJA1/quality/20260827-145146182-recovery-context/quality-report.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608271425-9EWJA1/quality/objects/sha256/0573f938635c08e770dcac6ba9e37ee421ad948d77a226a96c698c79010dd886.patch"
    - "observed_path_outside_scope:.agentplane/tasks/202608271425-9EWJA1/quality/objects/sha256/35a9c1b23cfd9a14cf2f7657ea3fea0d01006ae742d37e9c2cf68e91d2df2217.md"
    - "observed_path_outside_scope:.agentplane/tasks/202608271425-9EWJA1/quality/objects/sha256/7080a6be2e427488741d82e5f0f80a864c64a7fa2e9cdb8e5118aedded4881ec.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608271425-9EWJA1/quality/objects/sha256/9037cdf98253e70333ede9358d360264a85ee905be64a8723bbdd4ca71e02d4a.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608271425-9EWJA1/quality/objects/sha256/d95d0acf71eba724329a418bc06e8264aea65cb35720be95bfc5a172bb57ba3d.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608271425-9EWJA1/supervision/declared-checks.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608271425-9EWJA1/supervision/implementation-evidence.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608271425-9EWJA1/verification/20260827145057353-8504a8d8eb4611ab.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608271441-DVEMAE/README.md"
    - "observed_path_outside_scope:.agentplane/tasks/202608271441-DVEMAE/blueprint/resolved-snapshot.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608271441-DVEMAE/pr/diffstat.txt"
    - "observed_path_outside_scope:.agentplane/tasks/202608271441-DVEMAE/pr/github-body.md"
    - "observed_path_outside_scope:.agentplane/tasks/202608271441-DVEMAE/pr/github-title.txt"
    - "observed_path_outside_scope:.agentplane/tasks/202608271441-DVEMAE/pr/meta.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608271441-DVEMAE/pr/review.md"
    - "observed_path_outside_scope:.agentplane/tasks/202608271441-DVEMAE/quality/20260827-161517390-recovery-context/evaluator-evidence-manifest.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608271441-DVEMAE/quality/20260827-161517390-recovery-context/evaluator-opinion.md"
    - "observed_path_outside_scope:.agentplane/tasks/202608271441-DVEMAE/quality/20260827-161517390-recovery-context/evaluator-result.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608271441-DVEMAE/quality/20260827-161517390-recovery-context/evaluator-work-order.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608271441-DVEMAE/quality/20260827-161517390-recovery-context/quality-report.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608271441-DVEMAE/quality/objects/sha256/25d9a8b1e3a9e4c13c66e484a4e1b24f8ecdb231997b03159e5461368f8ccace.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608271441-DVEMAE/quality/objects/sha256/46cd945b00a0fd8eda518b45ef616a27bab8334f224d47b965657bc5f8020958.md"
    - "observed_path_outside_scope:.agentplane/tasks/202608271441-DVEMAE/quality/objects/sha256/9037cdf98253e70333ede9358d360264a85ee905be64a8723bbdd4ca71e02d4a.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608271441-DVEMAE/quality/objects/sha256/bc9a4be916f6f1bf3e52810f0bdcae083f6de1da2c9050a0b73d2b46f2f4c158.patch"
    - "observed_path_outside_scope:.agentplane/tasks/202608271441-DVEMAE/quality/objects/sha256/c945029f8f9a6a3b6717b22494ab1e117a3ea4e6b526ce151bdf827980533c8b.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608271441-DVEMAE/supervision/declared-checks.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608271441-DVEMAE/supervision/implementation-evidence.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608271441-DVEMAE/verification/20260827151321725-77366aa3f29ad2fc.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608271441-DVEMAE/verification/20260827161459128-ce04c76286eb1a98.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608271450-TZHW4C/README.md"
    - "observed_path_outside_scope:.agentplane/tasks/202608271450-TZHW4C/blueprint/resolved-snapshot.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608271450-TZHW4C/pr/diffstat.txt"
    - "observed_path_outside_scope:.agentplane/tasks/202608271450-TZHW4C/pr/github-body.md"
    - "observed_path_outside_scope:.agentplane/tasks/202608271450-TZHW4C/pr/github-title.txt"
    - "observed_path_outside_scope:.agentplane/tasks/202608271450-TZHW4C/pr/meta.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608271450-TZHW4C/pr/review.md"
    - "observed_path_outside_scope:.agentplane/tasks/202608271450-TZHW4C/quality/20260827-164341199-recovery-context/evaluator-evidence-manifest.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608271450-TZHW4C/quality/20260827-164341199-recovery-context/evaluator-opinion.md"
    - "observed_path_outside_scope:.agentplane/tasks/202608271450-TZHW4C/quality/20260827-164341199-recovery-context/evaluator-result.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608271450-TZHW4C/quality/20260827-164341199-recovery-context/evaluator-work-order.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608271450-TZHW4C/quality/20260827-164341199-recovery-context/quality-report.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608271450-TZHW4C/quality/objects/sha256/4f8d1195a803cd3c4754483629f1325c54ba2b91328ee958c9811dbc031ab8fd.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608271450-TZHW4C/quality/objects/sha256/68302d9b5aaca3ffd777ed8c0b0c11a4f0141aa08562b9d28cc3bc9a3075ecfc.patch"
    - "observed_path_outside_scope:.agentplane/tasks/202608271450-TZHW4C/quality/objects/sha256/9037cdf98253e70333ede9358d360264a85ee905be64a8723bbdd4ca71e02d4a.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608271450-TZHW4C/quality/objects/sha256/d7febebeb12f1a3d979e56533b3ec80fabd2809b0f26382417f868bf173049e8.md"
    - "observed_path_outside_scope:.agentplane/tasks/202608271450-TZHW4C/quality/objects/sha256/db8f8a8efe42f5970786efbd4c479276e3b511d8fad72bc91924436db46ac611.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608271450-TZHW4C/supervision/declared-checks.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608271450-TZHW4C/supervision/implementation-evidence.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608271450-TZHW4C/verification/20260827153255520-912083059edc324f.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608271450-TZHW4C/verification/20260827164324368-fc4e3922be01c66f.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608271502-J6B4RW/README.md"
    - "observed_path_outside_scope:.agentplane/tasks/202608271502-J6B4RW/blueprint/resolved-snapshot.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608271502-J6B4RW/pr/diffstat.txt"
    - "observed_path_outside_scope:.agentplane/tasks/202608271502-J6B4RW/pr/github-body.md"
    - "observed_path_outside_scope:.agentplane/tasks/202608271502-J6B4RW/pr/github-title.txt"
    - "observed_path_outside_scope:.agentplane/tasks/202608271502-J6B4RW/pr/meta.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608271502-J6B4RW/pr/review.md"
    - "observed_path_outside_scope:.agentplane/tasks/202608271502-J6B4RW/quality/20260827-154623971-recovery-context/evaluator-evidence-manifest.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608271502-J6B4RW/quality/20260827-154623971-recovery-context/evaluator-opinion.md"
    - "observed_path_outside_scope:.agentplane/tasks/202608271502-J6B4RW/quality/20260827-154623971-recovery-context/evaluator-result.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608271502-J6B4RW/quality/20260827-154623971-recovery-context/evaluator-work-order.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608271502-J6B4RW/quality/20260827-154623971-recovery-context/quality-report.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608271502-J6B4RW/quality/objects/sha256/0031c8f4d4758e61b1466e0d1cc73f10d4188334296df7b99d8d999f5c4e8ea1.md"
    - "observed_path_outside_scope:.agentplane/tasks/202608271502-J6B4RW/quality/objects/sha256/4fac0491a5e9a0c96c8ac043242a10a8897ab3ae27acf6ec034902b9811d012b.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608271502-J6B4RW/quality/objects/sha256/58b664e7b0a81b253833b10a6c216059659b73855a9bfe7503edda7e5c2c4aee.patch"
    - "observed_path_outside_scope:.agentplane/tasks/202608271502-J6B4RW/quality/objects/sha256/9037cdf98253e70333ede9358d360264a85ee905be64a8723bbdd4ca71e02d4a.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608271502-J6B4RW/quality/objects/sha256/b1ec08ea0502169eb633c52e878c5f61dab6a05f7abb0b1e3821a09aae111dc8.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608271502-J6B4RW/supervision/declared-checks.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608271502-J6B4RW/supervision/implementation-evidence.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608271502-J6B4RW/verification/20260827154604703-18e8da1d3734f6ea.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608271520-175BQX/README.md"
    - "observed_path_outside_scope:.agentplane/tasks/202608271520-175BQX/blueprint/resolved-snapshot.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608271520-175BQX/pr/diffstat.txt"
    - "observed_path_outside_scope:.agentplane/tasks/202608271520-175BQX/pr/github-body.md"
    - "observed_path_outside_scope:.agentplane/tasks/202608271520-175BQX/pr/github-title.txt"
    - "observed_path_outside_scope:.agentplane/tasks/202608271520-175BQX/pr/meta.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608271520-175BQX/pr/review.md"
    - "observed_path_outside_scope:.agentplane/tasks/202608271520-175BQX/quality/20260827-163417019-recovery-context/evaluator-evidence-manifest.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608271520-175BQX/quality/20260827-163417019-recovery-context/evaluator-opinion.md"
    - "observed_path_outside_scope:.agentplane/tasks/202608271520-175BQX/quality/20260827-163417019-recovery-context/evaluator-result.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608271520-175BQX/quality/20260827-163417019-recovery-context/evaluator-work-order.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608271520-175BQX/quality/20260827-163417019-recovery-context/quality-report.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608271520-175BQX/quality/objects/sha256/3df5f4f1f353a441910c5898702f18d37f00971bf3cad8e11319d03103ab1c56.patch"
    - "observed_path_outside_scope:.agentplane/tasks/202608271520-175BQX/quality/objects/sha256/9037cdf98253e70333ede9358d360264a85ee905be64a8723bbdd4ca71e02d4a.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608271520-175BQX/quality/objects/sha256/a288575b74937de29ef9e860b24bcdc61f3191f48df33fc132a601fd7072e7e6.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608271520-175BQX/quality/objects/sha256/aadfab4fb644761f23c0e128c6d090eb8b31d8787d9b2a201c93e5e10f1e03fe.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608271520-175BQX/quality/objects/sha256/cfcdcb5435bc36040568a2bd28a1a5c734c0b2fe8cc3b738c45514cc0aefe561.md"
    - "observed_path_outside_scope:.agentplane/tasks/202608271520-175BQX/supervision/declared-checks.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608271520-175BQX/supervision/implementation-evidence.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608271520-175BQX/verification/20260827163359452-f5a7fe6f4992aa43.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608271538-T21JCA/README.md"
    - "observed_path_outside_scope:.agentplane/tasks/202608271538-T21JCA/blueprint/resolved-snapshot.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608271538-T21JCA/pr/diffstat.txt"
    - "observed_path_outside_scope:.agentplane/tasks/202608271538-T21JCA/pr/github-body.md"
    - "observed_path_outside_scope:.agentplane/tasks/202608271538-T21JCA/pr/github-title.txt"
    - "observed_path_outside_scope:.agentplane/tasks/202608271538-T21JCA/pr/meta.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608271538-T21JCA/pr/review.md"
    - "observed_path_outside_scope:.agentplane/tasks/202608271538-T21JCA/quality/20260827-155614370-recovery-context/evaluator-evidence-manifest.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608271538-T21JCA/quality/20260827-155614370-recovery-context/evaluator-opinion.md"
    - "observed_path_outside_scope:.agentplane/tasks/202608271538-T21JCA/quality/20260827-155614370-recovery-context/evaluator-result.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608271538-T21JCA/quality/20260827-155614370-recovery-context/evaluator-work-order.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608271538-T21JCA/quality/20260827-155614370-recovery-context/quality-report.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608271538-T21JCA/quality/20260827-165816155-recovery-context/evaluator-evidence-manifest.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608271538-T21JCA/quality/20260827-165816155-recovery-context/evaluator-opinion.md"
    - "observed_path_outside_scope:.agentplane/tasks/202608271538-T21JCA/quality/20260827-165816155-recovery-context/evaluator-result.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608271538-T21JCA/quality/20260827-165816155-recovery-context/evaluator-work-order.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608271538-T21JCA/quality/20260827-165816155-recovery-context/quality-report.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608271538-T21JCA/quality/20260827-185237520-recovery-context/evaluator-evidence-manifest.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608271538-T21JCA/quality/20260827-185237520-recovery-context/evaluator-opinion.md"
    - "observed_path_outside_scope:.agentplane/tasks/202608271538-T21JCA/quality/20260827-185237520-recovery-context/evaluator-result.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608271538-T21JCA/quality/20260827-185237520-recovery-context/evaluator-work-order.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608271538-T21JCA/quality/20260827-185237520-recovery-context/quality-report.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608271538-T21JCA/quality/objects/sha256/20e682bec49f3be073f007266985798ff96956563ac46f42c9c8963175cb0d75.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608271538-T21JCA/quality/objects/sha256/23f41be610f22839e63955e61a6129a0f92dc7b634a33469b42faf27be8d2392.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608271538-T21JCA/quality/objects/sha256/2ba4423ad95e1c8d825431449b05e8979e4147776ed5596cb0d9d1e8f498b19b.md"
    - "observed_path_outside_scope:.agentplane/tasks/202608271538-T21JCA/quality/objects/sha256/5b969fa31cb380006daa12e43d9292d0b7b40b06dab78d360d996621e45a56f0.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608271538-T21JCA/quality/objects/sha256/8272d31e92fdd32ae188f1bceceb8fd5b20abee2ac53a445582b54e3cf230ada.patch"
    - "observed_path_outside_scope:.agentplane/tasks/202608271538-T21JCA/quality/objects/sha256/9037cdf98253e70333ede9358d360264a85ee905be64a8723bbdd4ca71e02d4a.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608271538-T21JCA/quality/objects/sha256/a7e3196d56670a618cab6f2faccd91792fd9fdd6bb32df3f9587ff725891c60f.patch"
    - "observed_path_outside_scope:.agentplane/tasks/202608271538-T21JCA/quality/objects/sha256/aaae0a4db026925daff5ae459b577e586f725c6f7b05301210c65ca44c52ae5f.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608271538-T21JCA/quality/objects/sha256/d45ba3378de8f21986c7dba53843422ac84e13c3a300a10b253f902a75553e18.md"
    - "observed_path_outside_scope:.agentplane/tasks/202608271538-T21JCA/quality/objects/sha256/efe135d010022261174668a4c7cb2b3925b6118a8068b12cda82e02713ab0c81.md"
    - "observed_path_outside_scope:.agentplane/tasks/202608271538-T21JCA/quality/objects/sha256/fcf8dd2e46cf020a4dfa46a07d648ce3dfb919b0ad00a577f97eacfd649d9817.patch"
    - "observed_path_outside_scope:.agentplane/tasks/202608271538-T21JCA/supervision/declared-checks.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608271538-T21JCA/supervision/implementation-evidence.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608271538-T21JCA/verification/20260827155541958-c84df617bc1e0c1a.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608271538-T21JCA/verification/20260827163017204-63965a85298089d8.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608271538-T21JCA/verification/20260827165804845-f40035f1f5135e14.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608271538-T21JCA/verification/20260827175117746-40e332b32f5ff76b.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608271538-T21JCA/verification/20260827181112407-f0e13b14e41fe302.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608271538-T21JCA/verification/20260827185225478-6366f2fb7f9e38cb.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608271544-1TDVPJ/README.md"
    - "observed_path_outside_scope:.agentplane/tasks/202608271544-1TDVPJ/blueprint/resolved-snapshot.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608271544-1TDVPJ/pr/diffstat.txt"
    - "observed_path_outside_scope:.agentplane/tasks/202608271544-1TDVPJ/pr/github-body.md"
    - "observed_path_outside_scope:.agentplane/tasks/202608271544-1TDVPJ/pr/github-title.txt"
    - "observed_path_outside_scope:.agentplane/tasks/202608271544-1TDVPJ/pr/meta.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608271544-1TDVPJ/pr/review.md"
    - "observed_path_outside_scope:.agentplane/tasks/202608271544-1TDVPJ/quality/20260827-162357810-recovery-context/evaluator-evidence-manifest.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608271544-1TDVPJ/quality/20260827-162357810-recovery-context/evaluator-opinion.md"
    - "observed_path_outside_scope:.agentplane/tasks/202608271544-1TDVPJ/quality/20260827-162357810-recovery-context/evaluator-result.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608271544-1TDVPJ/quality/20260827-162357810-recovery-context/evaluator-work-order.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608271544-1TDVPJ/quality/20260827-162357810-recovery-context/quality-report.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608271544-1TDVPJ/quality/objects/sha256/09e7b31f3ac865c48223b58cfb33a8e0b13406f6b1d10fbd0397887ce64fcd39.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608271544-1TDVPJ/quality/objects/sha256/4a6b7f61fc2cd73a0ac64c0afa6b1e91ee9137ee153073440092170e287545ae.patch"
    - "observed_path_outside_scope:.agentplane/tasks/202608271544-1TDVPJ/quality/objects/sha256/54db07e252c5020879f6e899f2b62e2cbfdd0f825307f6b3f8a998e2cee24ddf.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608271544-1TDVPJ/quality/objects/sha256/9037cdf98253e70333ede9358d360264a85ee905be64a8723bbdd4ca71e02d4a.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608271544-1TDVPJ/quality/objects/sha256/b138e23a64b8077d010b45401e70824413f65d708334c29a5b663586700828e7.md"
    - "observed_path_outside_scope:.agentplane/tasks/202608271544-1TDVPJ/supervision/declared-checks.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608271544-1TDVPJ/supervision/implementation-evidence.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608271544-1TDVPJ/verification/20260827160642690-24295292837d8d7e.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608271544-1TDVPJ/verification/20260827162335964-8d33c746263199fc.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608271649-DVNTRR/README.md"
    - "observed_path_outside_scope:.agentplane/tasks/202608271649-DVNTRR/blueprint/resolved-snapshot.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608271649-DVNTRR/pr/diffstat.txt"
    - "observed_path_outside_scope:.agentplane/tasks/202608271649-DVNTRR/pr/github-body.md"
    - "observed_path_outside_scope:.agentplane/tasks/202608271649-DVNTRR/pr/github-title.txt"
    - "observed_path_outside_scope:.agentplane/tasks/202608271649-DVNTRR/pr/meta.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608271649-DVNTRR/pr/review.md"
    - "observed_path_outside_scope:.agentplane/tasks/202608271649-DVNTRR/quality/20260827-170736164-recovery-context/evaluator-evidence-manifest.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608271649-DVNTRR/quality/20260827-170736164-recovery-context/evaluator-opinion.md"
    - "observed_path_outside_scope:.agentplane/tasks/202608271649-DVNTRR/quality/20260827-170736164-recovery-context/evaluator-result.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608271649-DVNTRR/quality/20260827-170736164-recovery-context/evaluator-work-order.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608271649-DVNTRR/quality/20260827-170736164-recovery-context/quality-report.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608271649-DVNTRR/quality/objects/sha256/26b29129cee78cb00a376b7d25f1c78233418cc92f456e963b0122292f6b29fe.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608271649-DVNTRR/quality/objects/sha256/9037cdf98253e70333ede9358d360264a85ee905be64a8723bbdd4ca71e02d4a.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608271649-DVNTRR/quality/objects/sha256/9e458f50f4a70613d2c4d7d41c1006bf431af26fd040c3649cf38af0ae39c0ac.patch"
    - "observed_path_outside_scope:.agentplane/tasks/202608271649-DVNTRR/quality/objects/sha256/a0a854b5539401e1ce7b8c5d69c90e66e4e7164cedf7d87371aed16ed16c54e5.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608271649-DVNTRR/quality/objects/sha256/fb58551d02547676b978b5aedde40828c7008703d368d527a61c52535306d00f.md"
    - "observed_path_outside_scope:.agentplane/tasks/202608271649-DVNTRR/supervision/declared-checks.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608271649-DVNTRR/supervision/implementation-evidence.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608271649-DVNTRR/verification/20260827170718338-d32fb33a649bef9e.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608271659-AD3030/README.md"
    - "observed_path_outside_scope:.agentplane/tasks/202608271659-AD3030/blueprint/resolved-snapshot.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608271659-AD3030/pr/diffstat.txt"
    - "observed_path_outside_scope:.agentplane/tasks/202608271659-AD3030/pr/github-body.md"
    - "observed_path_outside_scope:.agentplane/tasks/202608271659-AD3030/pr/github-title.txt"
    - "observed_path_outside_scope:.agentplane/tasks/202608271659-AD3030/pr/meta.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608271659-AD3030/pr/review.md"
    - "observed_path_outside_scope:.agentplane/tasks/202608271659-AD3030/quality/20260827-231601668-recovery-context/evaluator-evidence-manifest.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608271659-AD3030/quality/20260827-231601668-recovery-context/evaluator-follow-up.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608271659-AD3030/quality/20260827-231601668-recovery-context/evaluator-opinion.md"
    - "observed_path_outside_scope:.agentplane/tasks/202608271659-AD3030/quality/20260827-231601668-recovery-context/evaluator-result.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608271659-AD3030/quality/20260827-231601668-recovery-context/evaluator-work-order.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608271659-AD3030/quality/20260827-231601668-recovery-context/quality-report.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608271659-AD3030/quality/20260827-233148153-recovery-context/evaluator-evidence-manifest.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608271659-AD3030/quality/20260827-233148153-recovery-context/evaluator-opinion.md"
    - "observed_path_outside_scope:.agentplane/tasks/202608271659-AD3030/quality/20260827-233148153-recovery-context/evaluator-result.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608271659-AD3030/quality/20260827-233148153-recovery-context/evaluator-work-order.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608271659-AD3030/quality/20260827-233148153-recovery-context/quality-report.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608271659-AD3030/quality/objects/sha256/6a54b986c4337537710c4beb64489bec480674ba7177b0351762cbc6ef90410f.patch"
    - "observed_path_outside_scope:.agentplane/tasks/202608271659-AD3030/quality/objects/sha256/7f8eaa563a57e96bcafc6c3a0510357cc3af386dc72cd2c7ea05829ca02b93d1.md"
    - "observed_path_outside_scope:.agentplane/tasks/202608271659-AD3030/quality/objects/sha256/9037cdf98253e70333ede9358d360264a85ee905be64a8723bbdd4ca71e02d4a.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608271659-AD3030/quality/objects/sha256/90f0d1030d222fc87d8e92a8fc71195cb2c49a013eb106f43b8d570dab8cea0c.md"
    - "observed_path_outside_scope:.agentplane/tasks/202608271659-AD3030/quality/objects/sha256/95b232edfe20d366180cc29edc1979fdffee0202f5881344b07866a82d04fc4f.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608271659-AD3030/quality/objects/sha256/d0d238d23c3006d5e0d4d0953d1881f99c4173f65bfe5d0abfb7b08b76de5a06.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608271659-AD3030/quality/objects/sha256/d36ac47a0ebecb9519f911ec1314b9ad33af5c3ced863ba464a8788b49dec5b9.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608271659-AD3030/supervision/declared-checks.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608271659-AD3030/supervision/implementation-evidence.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608271659-AD3030/verification/20260827213149985-715257e021089323.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608271659-AD3030/verification/20260827215847391-fb3c0afcc74de348.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608271659-AD3030/verification/20260827223623598-a12592ac3d5fc2df.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608271659-AD3030/verification/20260827231543799-24b0be63cfe9653d.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608271659-AD3030/verification/20260827233043685-d1e770e639a91501.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608272229-CFKR4P/README.md"
    - "observed_path_outside_scope:.agentplane/tasks/202608272229-CFKR4P/blueprint/resolved-snapshot.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608272229-CFKR4P/pr/diffstat.txt"
    - "observed_path_outside_scope:.agentplane/tasks/202608272229-CFKR4P/pr/github-body.md"
    - "observed_path_outside_scope:.agentplane/tasks/202608272229-CFKR4P/pr/github-title.txt"
    - "observed_path_outside_scope:.agentplane/tasks/202608272229-CFKR4P/pr/meta.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608272229-CFKR4P/pr/review.md"
    - "observed_path_outside_scope:.agentplane/tasks/202608272229-CFKR4P/quality/20260827-230610775-recovery-context/evaluator-evidence-manifest.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608272229-CFKR4P/quality/20260827-230610775-recovery-context/evaluator-opinion.md"
    - "observed_path_outside_scope:.agentplane/tasks/202608272229-CFKR4P/quality/20260827-230610775-recovery-context/evaluator-result.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608272229-CFKR4P/quality/20260827-230610775-recovery-context/evaluator-work-order.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608272229-CFKR4P/quality/20260827-230610775-recovery-context/quality-report.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608272229-CFKR4P/quality/20260828-000932160-recovery-context/evaluator-evidence-manifest.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608272229-CFKR4P/quality/20260828-000932160-recovery-context/evaluator-follow-up.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608272229-CFKR4P/quality/20260828-000932160-recovery-context/evaluator-opinion.md"
    - "observed_path_outside_scope:.agentplane/tasks/202608272229-CFKR4P/quality/20260828-000932160-recovery-context/evaluator-result.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608272229-CFKR4P/quality/20260828-000932160-recovery-context/evaluator-work-order.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608272229-CFKR4P/quality/20260828-000932160-recovery-context/quality-report.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608272229-CFKR4P/quality/20260828-053621063-recovery-context/evaluator-evidence-manifest.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608272229-CFKR4P/quality/20260828-053621063-recovery-context/evaluator-opinion.md"
    - "observed_path_outside_scope:.agentplane/tasks/202608272229-CFKR4P/quality/20260828-053621063-recovery-context/evaluator-result.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608272229-CFKR4P/quality/20260828-053621063-recovery-context/evaluator-work-order.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608272229-CFKR4P/quality/20260828-053621063-recovery-context/quality-report.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608272229-CFKR4P/quality/objects/sha256/11688b587a6c37b5298be891c8baca187f77e08c5986a1dc9f37e56709aa676e.patch"
    - "observed_path_outside_scope:.agentplane/tasks/202608272229-CFKR4P/quality/objects/sha256/3fa8c5a4ffd8708f6e96a21eba31edaf65882e1844c30c1e86c408070f957b5b.patch"
    - "observed_path_outside_scope:.agentplane/tasks/202608272229-CFKR4P/quality/objects/sha256/56d54e34c6824aaf1a152fdfb629d730440df65d4686321e6cbb73d499cb85a2.md"
    - "observed_path_outside_scope:.agentplane/tasks/202608272229-CFKR4P/quality/objects/sha256/5a91f816258fbfff2849f7bc6be1f7cf50e4796b2e269be89388b9c66f1d5c68.md"
    - "observed_path_outside_scope:.agentplane/tasks/202608272229-CFKR4P/quality/objects/sha256/6f267ba300d86b30f5a46cb1b7eae0f2cb31b89dd4cf4c01d666f9423b309d5e.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608272229-CFKR4P/quality/objects/sha256/8aa8430007db8b3269f6cb4f5d3aed2627eeadc552ce0127fbabae170ead8e9f.md"
    - "observed_path_outside_scope:.agentplane/tasks/202608272229-CFKR4P/quality/objects/sha256/9037cdf98253e70333ede9358d360264a85ee905be64a8723bbdd4ca71e02d4a.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608272229-CFKR4P/quality/objects/sha256/9a2d9706dbffd1b3e70f61ffedc1e700dd415cee709f8010108ced527e4dfdc5.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608272229-CFKR4P/quality/objects/sha256/be5d9b5a63f50769630a2f792d28e7a198ceee47d2693d131f4b4de1dbdf8317.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608272229-CFKR4P/quality/objects/sha256/ddfa9158349dd8bc733f31959f4dd5b52edf19f263a2c56ebf3c0556d6f7eb98.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608272229-CFKR4P/supervision/declared-checks.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608272229-CFKR4P/supervision/implementation-evidence.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608272229-CFKR4P/verification/20260827230553240-5454bb7d2f564299.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608272229-CFKR4P/verification/20260828000849309-06bea9aa9602ed03.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608272229-CFKR4P/verification/20260828000849309-6c255a4db5aae45c.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608272229-CFKR4P/verification/20260828053605787-eca4721e74cf0d8e.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608280009-QMVHM2/README.md"
    - "observed_path_outside_scope:.agentplane/tasks/202608280009-QMVHM2/blueprint/resolved-snapshot.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608280009-QMVHM2/pr/diffstat.txt"
    - "observed_path_outside_scope:.agentplane/tasks/202608280009-QMVHM2/pr/github-body.md"
    - "observed_path_outside_scope:.agentplane/tasks/202608280009-QMVHM2/pr/github-title.txt"
    - "observed_path_outside_scope:.agentplane/tasks/202608280009-QMVHM2/pr/meta.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608280009-QMVHM2/pr/review.md"
    - "observed_path_outside_scope:.agentplane/tasks/202608280009-QMVHM2/quality/20260828-011322107-recovery-context/evaluator-evidence-manifest.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608280009-QMVHM2/quality/20260828-011322107-recovery-context/evaluator-follow-up.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608280009-QMVHM2/quality/20260828-011322107-recovery-context/evaluator-opinion.md"
    - "observed_path_outside_scope:.agentplane/tasks/202608280009-QMVHM2/quality/20260828-011322107-recovery-context/evaluator-result.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608280009-QMVHM2/quality/20260828-011322107-recovery-context/evaluator-work-order.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608280009-QMVHM2/quality/20260828-011322107-recovery-context/quality-report.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608280009-QMVHM2/quality/20260828-042840647-recovery-context/evaluator-evidence-manifest.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608280009-QMVHM2/quality/20260828-042840647-recovery-context/evaluator-opinion.md"
    - "observed_path_outside_scope:.agentplane/tasks/202608280009-QMVHM2/quality/20260828-042840647-recovery-context/evaluator-result.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608280009-QMVHM2/quality/20260828-042840647-recovery-context/evaluator-work-order.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608280009-QMVHM2/quality/20260828-042840647-recovery-context/quality-report.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608280009-QMVHM2/quality/20260828-051322345-recovery-context/evaluator-evidence-manifest.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608280009-QMVHM2/quality/20260828-051322345-recovery-context/evaluator-opinion.md"
    - "observed_path_outside_scope:.agentplane/tasks/202608280009-QMVHM2/quality/20260828-051322345-recovery-context/evaluator-result.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608280009-QMVHM2/quality/20260828-051322345-recovery-context/evaluator-work-order.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608280009-QMVHM2/quality/20260828-051322345-recovery-context/quality-report.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608280009-QMVHM2/quality/objects/sha256/1c71cb603799ea00dfe1eb4feba9eaaceb1ba54dcbf5d427df29019e0705cc88.md"
    - "observed_path_outside_scope:.agentplane/tasks/202608280009-QMVHM2/quality/objects/sha256/239c6f92bfea8b9963a7280e631c183681ae1af1934202231f1189ec01382189.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608280009-QMVHM2/quality/objects/sha256/5379a6852a6d160cd1b996793dd260bf11f32c00c170218fea9dc0fff3a613e4.patch"
    - "observed_path_outside_scope:.agentplane/tasks/202608280009-QMVHM2/quality/objects/sha256/60f75a07ff5023ff166e4200c64265239501e2b3f6b37a021996dff717b5fbfe.patch"
    - "observed_path_outside_scope:.agentplane/tasks/202608280009-QMVHM2/quality/objects/sha256/66b158c9a1fbadd62b9ef4afac539b907e19606f24447f5afac1a180c96d1f76.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608280009-QMVHM2/quality/objects/sha256/9037cdf98253e70333ede9358d360264a85ee905be64a8723bbdd4ca71e02d4a.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608280009-QMVHM2/quality/objects/sha256/975b3b4c61f11b15abc435105a878d617ff4c7299a8b62d6c8401b9482fc9f3d.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608280009-QMVHM2/quality/objects/sha256/b2ffb42c3b91e00e03734e7dcf1aa3ef131732e1faccaedf4fa53f1310491c33.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608280009-QMVHM2/quality/objects/sha256/bd890fca94d16e8a62f92c3704058b03b54be072d1dee3056f0fe78883c3159e.md"
    - "observed_path_outside_scope:.agentplane/tasks/202608280009-QMVHM2/quality/objects/sha256/eeb6b4d935b7082e3a532d3520244220ada15bb93c7ca55a51e8d77134958539.md"
    - "observed_path_outside_scope:.agentplane/tasks/202608280009-QMVHM2/supervision/declared-checks.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608280009-QMVHM2/supervision/implementation-evidence.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608280009-QMVHM2/verification/20260828011304735-23f23a1652815c0c.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608280009-QMVHM2/verification/20260828042822482-e20218a743e953fb.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608280009-QMVHM2/verification/20260828050220795-2614f9b715b13cb6.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608280009-QMVHM2/verification/20260828050220795-466081e22890fca3.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608280009-QMVHM2/verification/20260828051308628-09a00b90b25d66f1.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608280529-59VB06/README.md"
    - "observed_path_outside_scope:.agentplane/tasks/202608280529-59VB06/blueprint/resolved-snapshot.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608280529-59VB06/pr/diffstat.txt"
    - "observed_path_outside_scope:.agentplane/tasks/202608280529-59VB06/pr/github-body.md"
    - "observed_path_outside_scope:.agentplane/tasks/202608280529-59VB06/pr/github-title.txt"
    - "observed_path_outside_scope:.agentplane/tasks/202608280529-59VB06/pr/meta.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608280529-59VB06/pr/review.md"
    - "observed_path_outside_scope:.agentplane/tasks/202608280529-59VB06/quality/20260828-060709201-recovery-context/evaluator-evidence-manifest.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608280529-59VB06/quality/20260828-060709201-recovery-context/evaluator-follow-up.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608280529-59VB06/quality/20260828-060709201-recovery-context/evaluator-opinion.md"
    - "observed_path_outside_scope:.agentplane/tasks/202608280529-59VB06/quality/20260828-060709201-recovery-context/evaluator-result.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608280529-59VB06/quality/20260828-060709201-recovery-context/evaluator-work-order.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608280529-59VB06/quality/20260828-060709201-recovery-context/quality-report.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608280529-59VB06/quality/20260828-153633672-recovery-context/evaluator-evidence-manifest.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608280529-59VB06/quality/20260828-153633672-recovery-context/evaluator-opinion.md"
    - "observed_path_outside_scope:.agentplane/tasks/202608280529-59VB06/quality/20260828-153633672-recovery-context/evaluator-result.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608280529-59VB06/quality/20260828-153633672-recovery-context/evaluator-work-order.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608280529-59VB06/quality/20260828-153633672-recovery-context/quality-report.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608280529-59VB06/quality/20260828-181927875-recovery-context/evaluator-evidence-manifest.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608280529-59VB06/quality/20260828-181927875-recovery-context/evaluator-follow-up.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608280529-59VB06/quality/20260828-181927875-recovery-context/evaluator-opinion.md"
    - "observed_path_outside_scope:.agentplane/tasks/202608280529-59VB06/quality/20260828-181927875-recovery-context/evaluator-result.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608280529-59VB06/quality/20260828-181927875-recovery-context/evaluator-work-order.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608280529-59VB06/quality/20260828-181927875-recovery-context/quality-report.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608280529-59VB06/quality/20260828-185050324-recovery-context/evaluator-evidence-manifest.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608280529-59VB06/quality/20260828-185050324-recovery-context/evaluator-opinion.md"
    - "observed_path_outside_scope:.agentplane/tasks/202608280529-59VB06/quality/20260828-185050324-recovery-context/evaluator-result.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608280529-59VB06/quality/20260828-185050324-recovery-context/evaluator-work-order.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608280529-59VB06/quality/20260828-185050324-recovery-context/quality-report.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608280529-59VB06/quality/objects/sha256/24745007b98bd3eb7178a157f3cff4cd03ec4dd7de00613fbd465e1c9d85fc99.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608280529-59VB06/quality/objects/sha256/305dc31ef93c8cc2c3f6b8002313ce558bba82f431df8b7b35991b3a1335bfb4.md"
    - "observed_path_outside_scope:.agentplane/tasks/202608280529-59VB06/quality/objects/sha256/32210e077de23f38baba474b9ad2cf03c748596a8597b2daf2df6a5f75376ef1.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608280529-59VB06/quality/objects/sha256/34b3e8375de5f18107ece3aea5f4b2af0c9ec6eec6bd7198fb9b886c82d91398.md"
    - "observed_path_outside_scope:.agentplane/tasks/202608280529-59VB06/quality/objects/sha256/64558883dc2735b263e90375f5bf6254311c06dfe032688cfeda608774af92e4.md"
    - "observed_path_outside_scope:.agentplane/tasks/202608280529-59VB06/quality/objects/sha256/85ab8a4388809a43346334532eaf5fea9f05ec0af3e6b17cced11cc3e28859fb.patch"
    - "observed_path_outside_scope:.agentplane/tasks/202608280529-59VB06/quality/objects/sha256/8e54ddb6d171cda8ac2e9c2276a32c2567dee171dd67e7e76bce8968de76829a.patch"
    - "observed_path_outside_scope:.agentplane/tasks/202608280529-59VB06/quality/objects/sha256/9037cdf98253e70333ede9358d360264a85ee905be64a8723bbdd4ca71e02d4a.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608280529-59VB06/quality/objects/sha256/9f4fefbba30eb4bff51cddd6573a18f686a9d04f29b7ab3104de0ccbe6a641b6.md"
    - "observed_path_outside_scope:.agentplane/tasks/202608280529-59VB06/quality/objects/sha256/b3b3f9229ace468303c32054dbfc08138f4e6822b464104b4d9180421de40844.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608280529-59VB06/quality/objects/sha256/dffe78fab5abb3d7f0acea1c9b14f4cbfd56d68d836f90da49341774b928b834.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608280529-59VB06/quality/objects/sha256/f9a2f74389e1488cd06a9f00c9eb2086396f47f6f2dec4f25ee791723541a0e8.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608280529-59VB06/supervision/declared-checks.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608280529-59VB06/supervision/implementation-evidence.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608280529-59VB06/verification/20260828060650926-cb1fbd290a69ab04.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608280529-59VB06/verification/20260828153621983-c6c6865d6eab595e.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608280529-59VB06/verification/20260828161611883-ae6fce25c62f3d26.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608280529-59VB06/verification/20260828161639959-3ac5a4b484ed090d.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608280529-59VB06/verification/20260828181914331-2b5187ee7edbae42.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608280529-59VB06/verification/20260828185032879-7a1266da64904bc0.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608280614-PCBY2N/README.md"
    - "observed_path_outside_scope:.agentplane/tasks/202608280614-PCBY2N/blueprint/resolved-snapshot.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608280614-PCBY2N/pr/diffstat.txt"
    - "observed_path_outside_scope:.agentplane/tasks/202608280614-PCBY2N/pr/github-body.md"
    - "observed_path_outside_scope:.agentplane/tasks/202608280614-PCBY2N/pr/github-title.txt"
    - "observed_path_outside_scope:.agentplane/tasks/202608280614-PCBY2N/pr/meta.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608280614-PCBY2N/pr/review.md"
    - "observed_path_outside_scope:.agentplane/tasks/202608280614-PCBY2N/quality/20260828-112915024-recovery-context/evaluator-evidence-manifest.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608280614-PCBY2N/quality/20260828-112915024-recovery-context/evaluator-opinion.md"
    - "observed_path_outside_scope:.agentplane/tasks/202608280614-PCBY2N/quality/20260828-112915024-recovery-context/evaluator-result.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608280614-PCBY2N/quality/20260828-112915024-recovery-context/evaluator-work-order.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608280614-PCBY2N/quality/20260828-112915024-recovery-context/quality-report.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608280614-PCBY2N/quality/objects/sha256/167112d23a3809a69ce11c590bb2894d6d3e3faf1345fba7aff144166661a3df.patch"
    - "observed_path_outside_scope:.agentplane/tasks/202608280614-PCBY2N/quality/objects/sha256/8f90f782af46a966c76dd5da65e416c01cf3411622326198570c32a970fec3b3.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608280614-PCBY2N/quality/objects/sha256/9037cdf98253e70333ede9358d360264a85ee905be64a8723bbdd4ca71e02d4a.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608280614-PCBY2N/quality/objects/sha256/b36787aabcc52d981eca63d4e3af434e33107ed9ccf1ae128be481174364df82.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608280614-PCBY2N/quality/objects/sha256/d14785f890fc8471120d4b446e0726677356828d07d89a361a0f44e435661c50.md"
    - "observed_path_outside_scope:.agentplane/tasks/202608280614-PCBY2N/supervision/declared-checks.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608280614-PCBY2N/supervision/implementation-evidence.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608280614-PCBY2N/verification/20260828112857349-7df3e4f50a81c6b3.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608281151-WQ89A1/README.md"
    - "observed_path_outside_scope:.agentplane/tasks/202608281151-WQ89A1/blueprint/resolved-snapshot.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608281151-WQ89A1/pr/diffstat.txt"
    - "observed_path_outside_scope:.agentplane/tasks/202608281151-WQ89A1/pr/github-body.md"
    - "observed_path_outside_scope:.agentplane/tasks/202608281151-WQ89A1/pr/github-title.txt"
    - "observed_path_outside_scope:.agentplane/tasks/202608281151-WQ89A1/pr/meta.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608281151-WQ89A1/pr/review.md"
    - "observed_path_outside_scope:.agentplane/tasks/202608281151-WQ89A1/quality/20260828-150601429-recovery-context/evaluator-evidence-manifest.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608281151-WQ89A1/quality/20260828-150601429-recovery-context/evaluator-opinion.md"
    - "observed_path_outside_scope:.agentplane/tasks/202608281151-WQ89A1/quality/20260828-150601429-recovery-context/evaluator-result.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608281151-WQ89A1/quality/20260828-150601429-recovery-context/evaluator-work-order.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608281151-WQ89A1/quality/20260828-150601429-recovery-context/quality-report.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608281151-WQ89A1/quality/objects/sha256/10cb032f0abf80e517280add04bb38fa45a38a4188077f4ec44801ba6bde1b60.md"
    - "observed_path_outside_scope:.agentplane/tasks/202608281151-WQ89A1/quality/objects/sha256/43169d59cb987746b213286a613126ae2137afffaf804712307b1f2b3a741c91.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608281151-WQ89A1/quality/objects/sha256/82ffda48c5bd3c808954f2b5392fefca5582063c40c2e392ae8e7400dca3a781.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608281151-WQ89A1/quality/objects/sha256/9037cdf98253e70333ede9358d360264a85ee905be64a8723bbdd4ca71e02d4a.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608281151-WQ89A1/quality/objects/sha256/98f3e36b297b1437355f74e2067b979339e47078ca441a1b89e73b498e0029e9.patch"
    - "observed_path_outside_scope:.agentplane/tasks/202608281151-WQ89A1/supervision/declared-checks.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608281151-WQ89A1/supervision/implementation-evidence.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608281151-WQ89A1/verification/20260828150529537-22af9751a01470a1.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608290844-7JCQPF/README.md"
    - "observed_path_outside_scope:.agentplane/tasks/202608290844-7JCQPF/blueprint/resolved-snapshot.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608290844-7JCQPF/pr/diffstat.txt"
    - "observed_path_outside_scope:.agentplane/tasks/202608290844-7JCQPF/pr/github-body.md"
    - "observed_path_outside_scope:.agentplane/tasks/202608290844-7JCQPF/pr/github-title.txt"
    - "observed_path_outside_scope:.agentplane/tasks/202608290844-7JCQPF/pr/meta.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608290844-7JCQPF/pr/review.md"
    - "observed_path_outside_scope:.agentplane/tasks/202608290844-7JCQPF/quality/20260829-091527574-recovery-context/evaluator-evidence-manifest.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608290844-7JCQPF/quality/20260829-091527574-recovery-context/evaluator-opinion.md"
    - "observed_path_outside_scope:.agentplane/tasks/202608290844-7JCQPF/quality/20260829-091527574-recovery-context/evaluator-result.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608290844-7JCQPF/quality/20260829-091527574-recovery-context/evaluator-work-order.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608290844-7JCQPF/quality/20260829-091527574-recovery-context/quality-report.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608290844-7JCQPF/quality/20260829-135755737-recovery-context/evaluator-evidence-manifest.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608290844-7JCQPF/quality/20260829-135755737-recovery-context/evaluator-opinion.md"
    - "observed_path_outside_scope:.agentplane/tasks/202608290844-7JCQPF/quality/20260829-135755737-recovery-context/evaluator-result.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608290844-7JCQPF/quality/20260829-135755737-recovery-context/evaluator-work-order.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608290844-7JCQPF/quality/20260829-135755737-recovery-context/quality-report.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608290844-7JCQPF/quality/20260829-154051921-recovery-context/evaluator-evidence-manifest.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608290844-7JCQPF/quality/20260829-154051921-recovery-context/evaluator-work-order.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608290844-7JCQPF/quality/20260829-154257984-recovery-context/evaluator-evidence-manifest.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608290844-7JCQPF/quality/20260829-154257984-recovery-context/evaluator-work-order.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608290844-7JCQPF/quality/20260829-154622554-recovery-context/evaluator-evidence-manifest.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608290844-7JCQPF/quality/20260829-154622554-recovery-context/evaluator-opinion.md"
    - "observed_path_outside_scope:.agentplane/tasks/202608290844-7JCQPF/quality/20260829-154622554-recovery-context/evaluator-result.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608290844-7JCQPF/quality/20260829-154622554-recovery-context/evaluator-work-order.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608290844-7JCQPF/quality/20260829-154622554-recovery-context/quality-report.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608290844-7JCQPF/quality/20260829-165628160-recovery-context/evaluator-evidence-manifest.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608290844-7JCQPF/quality/20260829-165628160-recovery-context/evaluator-opinion.md"
    - "observed_path_outside_scope:.agentplane/tasks/202608290844-7JCQPF/quality/20260829-165628160-recovery-context/evaluator-result.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608290844-7JCQPF/quality/20260829-165628160-recovery-context/evaluator-work-order.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608290844-7JCQPF/quality/20260829-165628160-recovery-context/quality-report.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608290844-7JCQPF/quality/objects/sha256/00cb8f6790a2d104fb8674882268758d2e941322ed8e92c3b5dc9e428fd8dce4.patch"
    - "observed_path_outside_scope:.agentplane/tasks/202608290844-7JCQPF/quality/objects/sha256/094a699c910341a58afcb15c22105ae1b76587fcc875a385ab29d52916473829.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608290844-7JCQPF/quality/objects/sha256/0ac40dd9a245bdd7a6904bf832c36d53c5e8cf0e6f16f59e6ecea9c0f6dd8abc.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608290844-7JCQPF/quality/objects/sha256/2258e008d9ba7a086ad71c563a02b042962c03b0c5c940f4ea42f62bbb0eb012.patch"
    - "observed_path_outside_scope:.agentplane/tasks/202608290844-7JCQPF/quality/objects/sha256/4f0352c5d6a2182a46e1c6f73e77b5f2708ad05adf67f8236213cab6bf722e40.patch"
    - "observed_path_outside_scope:.agentplane/tasks/202608290844-7JCQPF/quality/objects/sha256/5a942fdbf7ae26d4b99cd24f9825b1a69678fafaf17cea7b1cb6739ea2315ec7.md"
    - "observed_path_outside_scope:.agentplane/tasks/202608290844-7JCQPF/quality/objects/sha256/8151ee2edd7f965a2ab2a99ae032f5bb0480bbd6b0920b6e390d19304e950091.md"
    - "observed_path_outside_scope:.agentplane/tasks/202608290844-7JCQPF/quality/objects/sha256/8a9ba323a4f7313e683932e5a199789ec48f072e7b92129fab34109e8df996f6.md"
    - "observed_path_outside_scope:.agentplane/tasks/202608290844-7JCQPF/quality/objects/sha256/8f122888e39edc7063c8e2334278428e1e94b3a887b1354c9a6d0ad6ec3054cf.md"
    - "observed_path_outside_scope:.agentplane/tasks/202608290844-7JCQPF/quality/objects/sha256/9037cdf98253e70333ede9358d360264a85ee905be64a8723bbdd4ca71e02d4a.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608290844-7JCQPF/quality/objects/sha256/9c4220d19202ff86a1d136041f176c55546dedfb87bfb3c92d111f797b57070f.md"
    - "observed_path_outside_scope:.agentplane/tasks/202608290844-7JCQPF/quality/objects/sha256/bf246ecc6aed6a80440a3a0197ee6a33faa53b12ac072fd16ecde736ee4d7a69.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608290844-7JCQPF/quality/objects/sha256/e292f4d015d55c072e7e21144fc8791343a332c84a64d49e6164ed43ac4537ca.md"
    - "observed_path_outside_scope:.agentplane/tasks/202608290844-7JCQPF/quality/objects/sha256/e36dbbcacb05dd26f53c2a444202d9451db4063b531311834485b11970ed6072.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608290844-7JCQPF/quality/objects/sha256/eba6a62437a3e1722cad7b6d477654c71e7c4ecea013a52313e862621c811e58.patch"
    - "observed_path_outside_scope:.agentplane/tasks/202608290844-7JCQPF/quality/objects/sha256/f5a5751e9d32d9d24fb39379371b7291cd6420c99d10ecf8f0283eb09e84094e.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608290844-7JCQPF/supervision/declared-checks.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608290844-7JCQPF/supervision/implementation-evidence.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608290844-7JCQPF/verification/20260829090048568-8570d238d5b793a3.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608290844-7JCQPF/verification/20260829091431764-e529c93dd7f5a93e.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608290844-7JCQPF/verification/20260829091815695-7a192569682c3990.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608290844-7JCQPF/verification/20260829121518627-935aca8b41573d83.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608290844-7JCQPF/verification/20260829133155703-ba3bf05e6e8ab9b2.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608290844-7JCQPF/verification/20260829135723903-1e369e8c538b8c1d.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608290844-7JCQPF/verification/20260829140319538-403bd5a3f235102c.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608290844-7JCQPF/verification/20260829142522018-696e567acb8481c2.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608290844-7JCQPF/verification/20260829142603828-ccd96a6a223662af.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608290844-7JCQPF/verification/20260829143621259-88a931bdab985c02.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608290844-7JCQPF/verification/20260829144725405-280eceee3679149d.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608290844-7JCQPF/verification/20260829145124375-d0d20769bc9e2777.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608290844-7JCQPF/verification/20260829161700623-370a4f491fb5a800.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608290844-7JCQPF/verification/20260829165606401-4bf622d61e8adf7c.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608290920-1PZGG8/README.md"
    - "observed_path_outside_scope:.agentplane/tasks/202608290920-1PZGG8/blueprint/resolved-snapshot.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608290920-1PZGG8/pr/diffstat.txt"
    - "observed_path_outside_scope:.agentplane/tasks/202608290920-1PZGG8/pr/github-body.md"
    - "observed_path_outside_scope:.agentplane/tasks/202608290920-1PZGG8/pr/github-title.txt"
    - "observed_path_outside_scope:.agentplane/tasks/202608290920-1PZGG8/pr/meta.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608290920-1PZGG8/pr/review.md"
    - "observed_path_outside_scope:.agentplane/tasks/202608290920-1PZGG8/quality/20260829-100207338-recovery-context/evaluator-evidence-manifest.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608290920-1PZGG8/quality/20260829-100207338-recovery-context/evaluator-follow-up.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608290920-1PZGG8/quality/20260829-100207338-recovery-context/evaluator-opinion.md"
    - "observed_path_outside_scope:.agentplane/tasks/202608290920-1PZGG8/quality/20260829-100207338-recovery-context/evaluator-result.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608290920-1PZGG8/quality/20260829-100207338-recovery-context/evaluator-work-order.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608290920-1PZGG8/quality/20260829-100207338-recovery-context/quality-report.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608290920-1PZGG8/quality/20260829-112038164-recovery-context/evaluator-evidence-manifest.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608290920-1PZGG8/quality/20260829-112038164-recovery-context/evaluator-opinion.md"
    - "observed_path_outside_scope:.agentplane/tasks/202608290920-1PZGG8/quality/20260829-112038164-recovery-context/evaluator-result.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608290920-1PZGG8/quality/20260829-112038164-recovery-context/evaluator-work-order.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608290920-1PZGG8/quality/20260829-112038164-recovery-context/quality-report.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608290920-1PZGG8/quality/objects/sha256/33ccc1d6b91deeda43925dda11bcb7871d4177f0b26d9f3f8f154203d618a3bf.patch"
    - "observed_path_outside_scope:.agentplane/tasks/202608290920-1PZGG8/quality/objects/sha256/5bf18a85abd14fe0a9a2152613220bc2ad006608710b4b329837619185c0189d.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608290920-1PZGG8/quality/objects/sha256/6238bed33ff5edad09db6bb76534efbfd68babd7775a75c0db7b0b53a128a033.patch"
    - "observed_path_outside_scope:.agentplane/tasks/202608290920-1PZGG8/quality/objects/sha256/6ab11382be85eb26466f9d0685b65b522e69c1ff5b74c1f152d4cb04e06604ca.md"
    - "observed_path_outside_scope:.agentplane/tasks/202608290920-1PZGG8/quality/objects/sha256/6ff4eeeac1fb74deb063645fd271923073c9a9756944f516b8d10fb36ad1dcfd.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608290920-1PZGG8/quality/objects/sha256/9037cdf98253e70333ede9358d360264a85ee905be64a8723bbdd4ca71e02d4a.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608290920-1PZGG8/quality/objects/sha256/de714e1ae1e5247163e5007b3fe727baf606367028fdd58ebcb9f94f7333b4d9.md"
    - "observed_path_outside_scope:.agentplane/tasks/202608290920-1PZGG8/quality/objects/sha256/e35839039295af7993b80adfdaa63da9729d59a2955432cd06975115f9057010.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608290920-1PZGG8/supervision/declared-checks.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608290920-1PZGG8/supervision/implementation-evidence.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608290920-1PZGG8/verification/20260829093430895-6606b487cced4039.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608290920-1PZGG8/verification/20260829105535831-b4c997c8906f47d0.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608290920-1PZGG8/verification/20260829105705983-3742ca4441ecc2c3.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608290920-1PZGG8/verification/20260829105843774-eef5a01e10b276a9.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608290920-1PZGG8/verification/20260829110002485-b669a1777bc06949.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608290920-1PZGG8/verification/20260829112024099-2dc4de9558ceb003.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608291005-K5TG4D/README.md"
    - "observed_path_outside_scope:.agentplane/tasks/202608291005-K5TG4D/blueprint/resolved-snapshot.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608291005-K5TG4D/pr/diffstat.txt"
    - "observed_path_outside_scope:.agentplane/tasks/202608291005-K5TG4D/pr/github-body.md"
    - "observed_path_outside_scope:.agentplane/tasks/202608291005-K5TG4D/pr/github-title.txt"
    - "observed_path_outside_scope:.agentplane/tasks/202608291005-K5TG4D/pr/meta.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608291005-K5TG4D/pr/review.md"
    - "observed_path_outside_scope:.agentplane/tasks/202608291005-K5TG4D/quality/20260829-103229021-recovery-context/evaluator-evidence-manifest.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608291005-K5TG4D/quality/20260829-103229021-recovery-context/evaluator-follow-up.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608291005-K5TG4D/quality/20260829-103229021-recovery-context/evaluator-opinion.md"
    - "observed_path_outside_scope:.agentplane/tasks/202608291005-K5TG4D/quality/20260829-103229021-recovery-context/evaluator-result.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608291005-K5TG4D/quality/20260829-103229021-recovery-context/evaluator-work-order.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608291005-K5TG4D/quality/20260829-103229021-recovery-context/quality-report.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608291005-K5TG4D/quality/20260829-104022155-recovery-context/evaluator-evidence-manifest.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608291005-K5TG4D/quality/20260829-104022155-recovery-context/evaluator-opinion.md"
    - "observed_path_outside_scope:.agentplane/tasks/202608291005-K5TG4D/quality/20260829-104022155-recovery-context/evaluator-result.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608291005-K5TG4D/quality/20260829-104022155-recovery-context/evaluator-work-order.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608291005-K5TG4D/quality/20260829-104022155-recovery-context/quality-report.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608291005-K5TG4D/quality/20260829-173248762-recovery-context/evaluator-evidence-manifest.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608291005-K5TG4D/quality/20260829-173248762-recovery-context/evaluator-follow-up.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608291005-K5TG4D/quality/20260829-173248762-recovery-context/evaluator-opinion.md"
    - "observed_path_outside_scope:.agentplane/tasks/202608291005-K5TG4D/quality/20260829-173248762-recovery-context/evaluator-result.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608291005-K5TG4D/quality/20260829-173248762-recovery-context/evaluator-work-order.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608291005-K5TG4D/quality/20260829-173248762-recovery-context/quality-report.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608291005-K5TG4D/quality/20260829-175010445-recovery-context/evaluator-evidence-manifest.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608291005-K5TG4D/quality/20260829-175010445-recovery-context/evaluator-opinion.md"
    - "observed_path_outside_scope:.agentplane/tasks/202608291005-K5TG4D/quality/20260829-175010445-recovery-context/evaluator-result.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608291005-K5TG4D/quality/20260829-175010445-recovery-context/evaluator-work-order.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608291005-K5TG4D/quality/20260829-175010445-recovery-context/quality-report.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608291005-K5TG4D/quality/20260829-182509713-recovery-context/evaluator-evidence-manifest.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608291005-K5TG4D/quality/20260829-182509713-recovery-context/evaluator-opinion.md"
    - "observed_path_outside_scope:.agentplane/tasks/202608291005-K5TG4D/quality/20260829-182509713-recovery-context/evaluator-result.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608291005-K5TG4D/quality/20260829-182509713-recovery-context/evaluator-work-order.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608291005-K5TG4D/quality/20260829-182509713-recovery-context/quality-report.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608291005-K5TG4D/quality/20260829-185822288-recovery-context/evaluator-evidence-manifest.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608291005-K5TG4D/quality/20260829-185822288-recovery-context/evaluator-opinion.md"
    - "observed_path_outside_scope:.agentplane/tasks/202608291005-K5TG4D/quality/20260829-185822288-recovery-context/evaluator-result.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608291005-K5TG4D/quality/20260829-185822288-recovery-context/evaluator-work-order.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608291005-K5TG4D/quality/20260829-185822288-recovery-context/quality-report.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608291005-K5TG4D/quality/objects/sha256/03778a2ec59a89f86c77156b5c41749d8a0acbbdbda469294abad9d305f10155.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608291005-K5TG4D/quality/objects/sha256/07880f19b498431ef1d30b34fe2764e8b0fc650f427c040a2f0edc42c28f3b77.patch"
    - "observed_path_outside_scope:.agentplane/tasks/202608291005-K5TG4D/quality/objects/sha256/0ced6f2c554a98af94d8e04123277a903da54392ebd92f3890c3a1c95ad75119.patch"
    - "observed_path_outside_scope:.agentplane/tasks/202608291005-K5TG4D/quality/objects/sha256/1766f852085b004801c6b30bc74a4001f961ab6633e748f9d98d616dc6014fd4.md"
    - "observed_path_outside_scope:.agentplane/tasks/202608291005-K5TG4D/quality/objects/sha256/2c17fdb65687181ba468e5cc9c2c3f984594a087910177a2a5891e3d95c0b2bb.patch"
    - "observed_path_outside_scope:.agentplane/tasks/202608291005-K5TG4D/quality/objects/sha256/3bc81fab9e1463c5f3fc60e5327889cf576ad0e6813951c0f8f1c2aa2eb9ee55.patch"
    - "observed_path_outside_scope:.agentplane/tasks/202608291005-K5TG4D/quality/objects/sha256/3da9d9fcb461bfc780a881e70453aaccb486b17c451b01ad89eb2b0eaa86b047.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608291005-K5TG4D/quality/objects/sha256/4514df8c306e4d9a4ba9c3d9383dee50e018667e53be66060da5eff32d761945.md"
    - "observed_path_outside_scope:.agentplane/tasks/202608291005-K5TG4D/quality/objects/sha256/525c6509aac711b4d08c0090cc345b850ddebc82785837269bf692ee7e0f3136.md"
    - "observed_path_outside_scope:.agentplane/tasks/202608291005-K5TG4D/quality/objects/sha256/69ada31950ca4db1dad4000541000ad3a3ab1150d54f116721dd24d4e2524dcc.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608291005-K5TG4D/quality/objects/sha256/727ea4cda0736b773d528b2de77e5229e46b9a933447c5a044ab9c8b9023c7b5.md"
    - "observed_path_outside_scope:.agentplane/tasks/202608291005-K5TG4D/quality/objects/sha256/73eb709075c74a980968c0120a0294a67f005c9c2ff4ce66b7d285a631ceec90.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608291005-K5TG4D/quality/objects/sha256/7dc71118b2a8cd17ec7401ec0c3f4bdf02a52e16ca3172258eb6ae28fb15e051.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608291005-K5TG4D/quality/objects/sha256/80da80d9c3d52d3e25efbebf8895def8aa6134897e7646a5ed91c95a5fb37eb7.md"
    - "observed_path_outside_scope:.agentplane/tasks/202608291005-K5TG4D/quality/objects/sha256/8d06a0bda439bd3cbb2a6a861bb3d632c3591570cb548e661e456561e6ebd0e3.patch"
    - "observed_path_outside_scope:.agentplane/tasks/202608291005-K5TG4D/quality/objects/sha256/9037cdf98253e70333ede9358d360264a85ee905be64a8723bbdd4ca71e02d4a.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608291005-K5TG4D/quality/objects/sha256/991fe4f8cfd40b027fed1e34442956c77ba8324246953e0dfae571500cb2b31d.patch"
    - "observed_path_outside_scope:.agentplane/tasks/202608291005-K5TG4D/quality/objects/sha256/c97155edadb265cb8b9e27094be1f5b53e338048ada37daee80cc3249047ec4f.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608291005-K5TG4D/quality/objects/sha256/de7dbf9bc2b623c88ba3ae813c42951e54995cde51ca26406dd6b51bf6fb6653.md"
    - "observed_path_outside_scope:.agentplane/tasks/202608291005-K5TG4D/quality/objects/sha256/ebc86feacec7bdf43d9a1fdbf283a72e4634bef2dfceb9d03c2812644d0bc6fe.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608291005-K5TG4D/supervision/declared-checks.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608291005-K5TG4D/supervision/implementation-evidence.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608291005-K5TG4D/verification/20260829102927784-2ba47b70cf364a12.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608291005-K5TG4D/verification/20260829103744095-ab63071946986abe.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608291005-K5TG4D/verification/20260829104004712-22365c9597c0e6ce.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608291005-K5TG4D/verification/20260829171951260-f6b36db68eb2b50b.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608291005-K5TG4D/verification/20260829172303993-9558dcfb624109e6.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608291005-K5TG4D/verification/20260829173023681-a890bff98f1f1613.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608291005-K5TG4D/verification/20260829173606626-1d584fb7c8bed007.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608291005-K5TG4D/verification/20260829174126559-55291239fcb3e058.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608291005-K5TG4D/verification/20260829174619560-6bb5d9fd8340f4b4.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608291005-K5TG4D/verification/20260829174953384-9a1611a4242d4cd2.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608291005-K5TG4D/verification/20260829182451924-4a24553f3cae3f0f.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608291005-K5TG4D/verification/20260829184121098-79ba9f5978aab118.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608291005-K5TG4D/verification/20260829185804313-ec46cd710c0a1ae8.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608291505-F5AN0W/README.md"
    - "observed_path_outside_scope:.agentplane/tasks/202608291505-F5AN0W/blueprint/resolved-snapshot.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608291505-F5AN0W/pr/diffstat.txt"
    - "observed_path_outside_scope:.agentplane/tasks/202608291505-F5AN0W/pr/github-body.md"
    - "observed_path_outside_scope:.agentplane/tasks/202608291505-F5AN0W/pr/github-title.txt"
    - "observed_path_outside_scope:.agentplane/tasks/202608291505-F5AN0W/pr/meta.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608291505-F5AN0W/pr/review.md"
    - "observed_path_outside_scope:.agentplane/tasks/202608291505-F5AN0W/quality/20260829-151703472-recovery-context/evaluator-evidence-manifest.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608291505-F5AN0W/quality/20260829-151703472-recovery-context/evaluator-opinion.md"
    - "observed_path_outside_scope:.agentplane/tasks/202608291505-F5AN0W/quality/20260829-151703472-recovery-context/evaluator-result.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608291505-F5AN0W/quality/20260829-151703472-recovery-context/evaluator-work-order.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608291505-F5AN0W/quality/20260829-151703472-recovery-context/quality-report.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608291505-F5AN0W/quality/objects/sha256/34de800803c95065a60ed554ec20ee9e458e08e3eba91b1e37ed7a5fc6939a61.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608291505-F5AN0W/quality/objects/sha256/3be09f0b87c195e91069dbd310c3854392dd52abe1630e89c3c0b44acfd4f669.patch"
    - "observed_path_outside_scope:.agentplane/tasks/202608291505-F5AN0W/quality/objects/sha256/41553f2e37d02a2a9ed9c27741445e29255fbfcc80aa18d77feafed25fb17fd8.md"
    - "observed_path_outside_scope:.agentplane/tasks/202608291505-F5AN0W/quality/objects/sha256/4ed68c6fd1d0c009d994cd956e8cb679ed2f606ddcae63c2e86222ac1634e772.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608291505-F5AN0W/quality/objects/sha256/9037cdf98253e70333ede9358d360264a85ee905be64a8723bbdd4ca71e02d4a.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608291505-F5AN0W/supervision/declared-checks.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608291505-F5AN0W/supervision/implementation-evidence.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608291505-F5AN0W/verification/20260829151633691-2b8fca041d5695de.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608292032-1K47B8/README.md"
    - "observed_path_outside_scope:.agentplane/tasks/202608292032-1K47B8/blueprint/resolved-snapshot.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608292032-1K47B8/pr/diffstat.txt"
    - "observed_path_outside_scope:.agentplane/tasks/202608292032-1K47B8/pr/github-body.md"
    - "observed_path_outside_scope:.agentplane/tasks/202608292032-1K47B8/pr/github-title.txt"
    - "observed_path_outside_scope:.agentplane/tasks/202608292032-1K47B8/pr/meta.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608292032-1K47B8/pr/review.md"
    - "observed_path_outside_scope:.agentplane/tasks/202608292032-1K47B8/quality/20260829-221228710-recovery-context/evaluator-evidence-manifest.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608292032-1K47B8/quality/20260829-221228710-recovery-context/evaluator-opinion.md"
    - "observed_path_outside_scope:.agentplane/tasks/202608292032-1K47B8/quality/20260829-221228710-recovery-context/evaluator-result.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608292032-1K47B8/quality/20260829-221228710-recovery-context/evaluator-work-order.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608292032-1K47B8/quality/20260829-221228710-recovery-context/quality-report.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608292032-1K47B8/quality/20260830-014956776-recovery-context/evaluator-evidence-manifest.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608292032-1K47B8/quality/20260830-014956776-recovery-context/evaluator-follow-up.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608292032-1K47B8/quality/20260830-014956776-recovery-context/evaluator-opinion.md"
    - "observed_path_outside_scope:.agentplane/tasks/202608292032-1K47B8/quality/20260830-014956776-recovery-context/evaluator-result.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608292032-1K47B8/quality/20260830-014956776-recovery-context/evaluator-work-order.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608292032-1K47B8/quality/20260830-014956776-recovery-context/quality-report.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608292032-1K47B8/quality/20260830-020852586-recovery-context/evaluator-evidence-manifest.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608292032-1K47B8/quality/20260830-020852586-recovery-context/evaluator-follow-up.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608292032-1K47B8/quality/20260830-020852586-recovery-context/evaluator-opinion.md"
    - "observed_path_outside_scope:.agentplane/tasks/202608292032-1K47B8/quality/20260830-020852586-recovery-context/evaluator-result.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608292032-1K47B8/quality/20260830-020852586-recovery-context/evaluator-work-order.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608292032-1K47B8/quality/20260830-020852586-recovery-context/quality-report.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608292032-1K47B8/quality/20260830-022616722-recovery-context/evaluator-evidence-manifest.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608292032-1K47B8/quality/20260830-022616722-recovery-context/evaluator-follow-up.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608292032-1K47B8/quality/20260830-022616722-recovery-context/evaluator-opinion.md"
    - "observed_path_outside_scope:.agentplane/tasks/202608292032-1K47B8/quality/20260830-022616722-recovery-context/evaluator-result.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608292032-1K47B8/quality/20260830-022616722-recovery-context/evaluator-work-order.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608292032-1K47B8/quality/20260830-022616722-recovery-context/quality-report.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608292032-1K47B8/quality/20260830-031507878-recovery-context/evaluator-evidence-manifest.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608292032-1K47B8/quality/20260830-031507878-recovery-context/evaluator-opinion.md"
    - "observed_path_outside_scope:.agentplane/tasks/202608292032-1K47B8/quality/20260830-031507878-recovery-context/evaluator-result.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608292032-1K47B8/quality/20260830-031507878-recovery-context/evaluator-work-order.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608292032-1K47B8/quality/20260830-031507878-recovery-context/quality-report.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608292032-1K47B8/quality/objects/sha256/057b4113ef6c1d87a6a0c3ac3c46939bd871e81dc4f3c1b80129869074842092.patch"
    - "observed_path_outside_scope:.agentplane/tasks/202608292032-1K47B8/quality/objects/sha256/2b30736d79fa3985a602ca79b8003a85696c1631aa650eb0a69f4b62a313d474.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608292032-1K47B8/quality/objects/sha256/31eb70979ca99b1b7baf8981a0aa4553f7836924a5a994ef188028919b165c2b.patch"
    - "observed_path_outside_scope:.agentplane/tasks/202608292032-1K47B8/quality/objects/sha256/3dd6f4403a5f554c55142963371a7073049d6182f7d27407b73e562303e9abce.patch"
    - "observed_path_outside_scope:.agentplane/tasks/202608292032-1K47B8/quality/objects/sha256/862b552d27a033d4119e9ae7e5436b8c29a143456489a4d14fe36e085df344c8.md"
    - "observed_path_outside_scope:.agentplane/tasks/202608292032-1K47B8/quality/objects/sha256/8c21a0dae102df37781ea0703471756a6f4d2d97fcb284160d913ae3a336695e.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608292032-1K47B8/quality/objects/sha256/9037cdf98253e70333ede9358d360264a85ee905be64a8723bbdd4ca71e02d4a.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608292032-1K47B8/quality/objects/sha256/95b210af54b40faac12625eb2e712a51b734ab5d29796b4091d4b8ed4ba80724.md"
    - "observed_path_outside_scope:.agentplane/tasks/202608292032-1K47B8/quality/objects/sha256/98a65c6e898cf6302e155442f9e9c0d591d7bf2aadd28d411d264e8c8b7485be.md"
    - "observed_path_outside_scope:.agentplane/tasks/202608292032-1K47B8/quality/objects/sha256/9ce711649887bc636881f16928a22670e786265ea0c117f13d2613bc1b6f5fc2.patch"
    - "observed_path_outside_scope:.agentplane/tasks/202608292032-1K47B8/quality/objects/sha256/9e9280b5ceb12fee8fdf6e8b7e283f15038b1c7e8f386ff82f56537c1b9c0ef7.md"
    - "observed_path_outside_scope:.agentplane/tasks/202608292032-1K47B8/quality/objects/sha256/a042c1178c6dc91f1dba1c8d49a4edcb23a1ace5fa440eb47fcbe4820e3aeb19.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608292032-1K47B8/quality/objects/sha256/a1e6b2fe5c8facd48dfc66602704770fca1a35152897611f9d31210b22ee8a67.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608292032-1K47B8/quality/objects/sha256/cdccd39e524d1c90764685a8edd6ed62359da3abd8661ae465fa779bd9f3d0f9.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608292032-1K47B8/quality/objects/sha256/d79cfc55ccb00071fa070c6bbd3fdb6f55514df2d3d0381e943934ecaa5a55fc.patch"
    - "observed_path_outside_scope:.agentplane/tasks/202608292032-1K47B8/quality/objects/sha256/ec06c6e7b7c18b069d7feb65ee296ee81d6dd16038b64f87e395a5e48cec1b36.md"
    - "observed_path_outside_scope:.agentplane/tasks/202608292032-1K47B8/quality/objects/sha256/ef17fe668230493a9b07f598b59d087f0c79b80eefbd629aaeadaa33cdb8d767.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608292032-1K47B8/supervision/declared-checks.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608292032-1K47B8/supervision/implementation-evidence.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608292032-1K47B8/verification/20260829204319619-6c577c9c8306a169.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608292032-1K47B8/verification/20260829210140898-e3d969adc161f644.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608292032-1K47B8/verification/20260829212246580-d0145ef1b109b582.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608292032-1K47B8/verification/20260829213703792-b4d5487c553f5a17.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608292032-1K47B8/verification/20260829214826738-20b5311a327c1579.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608292032-1K47B8/verification/20260829215542838-893d49886b2f4a8e.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608292032-1K47B8/verification/20260829221218641-6fb97c97e2e96fa0.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608292032-1K47B8/verification/20260830003005735-5d60d1d702715321.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608292032-1K47B8/verification/20260830014945273-2738197afdbf32cb.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608292032-1K47B8/verification/20260830020840555-6abd518e792f9be0.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608292032-1K47B8/verification/20260830022602801-f4386fc8af0c0a93.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608292032-1K47B8/verification/20260830025715800-1f7012fe8ad951d0.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608292032-1K47B8/verification/20260830031455405-6315535599fc124b.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608292218-3N0FBK/README.md"
    - "observed_path_outside_scope:.agentplane/tasks/202608292218-3N0FBK/blueprint/resolved-snapshot.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608292218-3N0FBK/pr/diffstat.txt"
    - "observed_path_outside_scope:.agentplane/tasks/202608292218-3N0FBK/pr/github-body.md"
    - "observed_path_outside_scope:.agentplane/tasks/202608292218-3N0FBK/pr/github-title.txt"
    - "observed_path_outside_scope:.agentplane/tasks/202608292218-3N0FBK/pr/meta.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608292218-3N0FBK/pr/review.md"
    - "observed_path_outside_scope:.agentplane/tasks/202608292218-3N0FBK/quality/20260829-232019133-recovery-context/evaluator-evidence-manifest.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608292218-3N0FBK/quality/20260829-232019133-recovery-context/evaluator-opinion.md"
    - "observed_path_outside_scope:.agentplane/tasks/202608292218-3N0FBK/quality/20260829-232019133-recovery-context/evaluator-result.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608292218-3N0FBK/quality/20260829-232019133-recovery-context/evaluator-work-order.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608292218-3N0FBK/quality/20260829-232019133-recovery-context/quality-report.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608292218-3N0FBK/quality/objects/sha256/0746e6bf83a188f6678201af5c5c2e782aaaa0faebaf297aeaf0f1b9057cf4c2.md"
    - "observed_path_outside_scope:.agentplane/tasks/202608292218-3N0FBK/quality/objects/sha256/6508f2281bdb76c7a51465f00997415cbb1144f19fa37a27045d5eb8eeaa13cf.patch"
    - "observed_path_outside_scope:.agentplane/tasks/202608292218-3N0FBK/quality/objects/sha256/705fd23cea4f0661155d847cbe29aa51c0c7ce19052019f39df3424f3d34d10d.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608292218-3N0FBK/quality/objects/sha256/9037cdf98253e70333ede9358d360264a85ee905be64a8723bbdd4ca71e02d4a.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608292218-3N0FBK/quality/objects/sha256/9f512f0819486738a0914d14aafef8ee94d25191007e8e94c679c6aedca6fbd9.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608292218-3N0FBK/supervision/declared-checks.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608292218-3N0FBK/supervision/implementation-evidence.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608292218-3N0FBK/verification/20260829223458865-779a4c712ea93918.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608292218-3N0FBK/verification/20260829224625339-315ba0801ec5e6ea.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608292218-3N0FBK/verification/20260829225800434-b5f93cf6b11f2c61.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608292218-3N0FBK/verification/20260829230555501-2ec025e699fda236.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608292218-3N0FBK/verification/20260829232002016-276e3b6422ad5f09.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608300119-ZHYXRS/README.md"
    - "observed_path_outside_scope:.agentplane/tasks/202608300119-ZHYXRS/blueprint/resolved-snapshot.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608300119-ZHYXRS/pr/diffstat.txt"
    - "observed_path_outside_scope:.agentplane/tasks/202608300119-ZHYXRS/pr/github-body.md"
    - "observed_path_outside_scope:.agentplane/tasks/202608300119-ZHYXRS/pr/github-title.txt"
    - "observed_path_outside_scope:.agentplane/tasks/202608300119-ZHYXRS/pr/meta.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608300119-ZHYXRS/pr/review.md"
    - "observed_path_outside_scope:.agentplane/tasks/202608300119-ZHYXRS/quality/20260830-014145339-recovery-context/evaluator-evidence-manifest.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608300119-ZHYXRS/quality/20260830-014145339-recovery-context/evaluator-opinion.md"
    - "observed_path_outside_scope:.agentplane/tasks/202608300119-ZHYXRS/quality/20260830-014145339-recovery-context/evaluator-result.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608300119-ZHYXRS/quality/20260830-014145339-recovery-context/evaluator-work-order.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608300119-ZHYXRS/quality/20260830-014145339-recovery-context/quality-report.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608300119-ZHYXRS/quality/20260830-022732861-recovery-context/evaluator-evidence-manifest.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608300119-ZHYXRS/quality/20260830-022732861-recovery-context/evaluator-opinion.md"
    - "observed_path_outside_scope:.agentplane/tasks/202608300119-ZHYXRS/quality/20260830-022732861-recovery-context/evaluator-result.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608300119-ZHYXRS/quality/20260830-022732861-recovery-context/evaluator-work-order.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608300119-ZHYXRS/quality/20260830-022732861-recovery-context/quality-report.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608300119-ZHYXRS/quality/objects/sha256/085818fb482ed6c75bdcd72074d2a06cd54a8963642055db58f4d5f95a5f417c.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608300119-ZHYXRS/quality/objects/sha256/0ae8f7054187226c4378474e61a236b83e14b480899aed7def309c417740ebc8.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608300119-ZHYXRS/quality/objects/sha256/68cd886e72e9a681f60c9770ffb31cc09b30751c52abfe3b9d62753ed744f3e9.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608300119-ZHYXRS/quality/objects/sha256/7bd203cf9dcbd8fd7fb54c71fb43608d75f904771948104bd6fb5e32111922c3.md"
    - "observed_path_outside_scope:.agentplane/tasks/202608300119-ZHYXRS/quality/objects/sha256/9037cdf98253e70333ede9358d360264a85ee905be64a8723bbdd4ca71e02d4a.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608300119-ZHYXRS/quality/objects/sha256/9ca03923fb3436ecdd936ae66f4ce9710cdb58d8bccf37d570410152ec188918.md"
    - "observed_path_outside_scope:.agentplane/tasks/202608300119-ZHYXRS/quality/objects/sha256/e4594a5165434d84043609c114251fb1d166c7612623342d185fb34239acfb29.patch"
    - "observed_path_outside_scope:.agentplane/tasks/202608300119-ZHYXRS/quality/objects/sha256/efec60e7d3b43883689358d77d2278cfa5e0346ad57e5c8695bdc74cecff1470.patch"
    - "observed_path_outside_scope:.agentplane/tasks/202608300119-ZHYXRS/supervision/declared-checks.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608300119-ZHYXRS/supervision/implementation-evidence.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608300119-ZHYXRS/verification/20260830013042448-9879d2e0317ba8ff.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608300119-ZHYXRS/verification/20260830014106431-a78ca4036e517933.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608300119-ZHYXRS/verification/20260830021428357-1faa3b8361b33f16.json"
    - "observed_path_outside_scope:.agentplane/tasks/202608300119-ZHYXRS/verification/20260830022721719-75aba1a0c8379039.json"
    - "observed_path_outside_scope:depcruise.config.cjs"
    - "observed_path_outside_scope:docs/adr/0017-clean-task-core-rebuild.md"
    - "observed_path_outside_scope:docs/adr/README.md"
    - "observed_path_outside_scope:docs/reference/clean-task-core-rebuild-spec.mdx"
    - "observed_path_outside_scope:packages/agentplane/assets/policy/incidents.md"
    - "observed_path_outside_scope:packages/agentplane/src/cli/__snapshots__/run-cli.core.help-snap.test.ts.snap"
    - "observed_path_outside_scope:packages/agentplane/src/cli/prompts.test.ts"
    - "observed_path_outside_scope:packages/agentplane/src/cli/route-decision.testkit.ts"
    - "observed_path_outside_scope:packages/agentplane/src/cli/run-cli.core.blueprint.test.ts"
    - "observed_path_outside_scope:packages/agentplane/src/cli/run-cli.core.direct-task-supervision.test.ts"
    - "observed_path_outside_scope:packages/agentplane/src/cli/run-cli.core.help-snap.test.ts"
    - "observed_path_outside_scope:packages/agentplane/src/cli/run-cli.core.incidents.test.ts"
    - "observed_path_outside_scope:packages/agentplane/src/cli/run-cli.core.lifecycle.finish-validation.test.ts"
    - "observed_path_outside_scope:packages/agentplane/src/cli/run-cli.core.lifecycle.plan.test.ts"
    - "observed_path_outside_scope:packages/agentplane/src/cli/run-cli.core.lifecycle.start-commit.policy.test.ts"
    - "observed_path_outside_scope:packages/agentplane/src/cli/run-cli.core.lifecycle.start-readiness.test.ts"
    - "observed_path_outside_scope:packages/agentplane/src/cli/run-cli.core.lifecycle.test.ts"
    - "observed_path_outside_scope:packages/agentplane/src/cli/run-cli.core.lifecycle.verify.test.ts"
    - "observed_path_outside_scope:packages/agentplane/src/cli/run-cli.core.pr-flow.pr-notes-verify.test.ts"
    - "observed_path_outside_scope:packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.artifacts.test.ts"
    - "observed_path_outside_scope:packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.git.test.ts"
    - "observed_path_outside_scope:packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.network.test.ts"
    - "observed_path_outside_scope:packages/agentplane/src/cli/run-cli.core.pr-flow.pr-validation.open-hydration.test.ts"
    - "observed_path_outside_scope:packages/agentplane/src/cli/run-cli.core.pr-flow.pr-validation.test.ts"
    - "observed_path_outside_scope:packages/agentplane/src/cli/run-cli.core.pr-flow.pr-validation.update.test.ts"
    - "observed_path_outside_scope:packages/agentplane/src/cli/run-cli.core.pr-flow.start-ready.test.ts"
    - "observed_path_outside_scope:packages/agentplane/src/cli/run-cli.core.pr-flow.status.test.ts"
    - "observed_path_outside_scope:packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts"
    - "observed_path_outside_scope:packages/agentplane/src/cli/run-cli.core.release-tasks-reconcile.test.ts"
    - "observed_path_outside_scope:packages/agentplane/src/cli/run-cli.core.route-decision.batch.test.ts"
    - "observed_path_outside_scope:packages/agentplane/src/cli/run-cli.core.route-decision.direct-closeout.test.ts"
    - "observed_path_outside_scope:packages/agentplane/src/cli/run-cli.core.route-decision.pr-open-metadata.test.ts"
    - "observed_path_outside_scope:packages/agentplane/src/cli/run-cli.core.route-decision.quality.test.ts"
    - "observed_path_outside_scope:packages/agentplane/src/cli/run-cli.core.route-decision.remote-confidence.test.ts"
    - "observed_path_outside_scope:packages/agentplane/src/cli/run-cli.core.route-decision.test.ts"
    - "observed_path_outside_scope:packages/agentplane/src/cli/run-cli.core.route-decision.verification.test.ts"
    - "observed_path_outside_scope:packages/agentplane/src/cli/run-cli.core.task-advance-effect-recovery.test.ts"
    - "observed_path_outside_scope:packages/agentplane/src/cli/run-cli.core.task-advance.branch-worktree.test.ts"
    - "observed_path_outside_scope:packages/agentplane/src/cli/run-cli.core.task-advance.evaluator-recovery.test.ts"
    - "observed_path_outside_scope:packages/agentplane/src/cli/run-cli.core.task-advance.evidence-rework.test.ts"
    - "observed_path_outside_scope:packages/agentplane/src/cli/run-cli.core.task-advance.worktree-resolution.test.ts"
    - "observed_path_outside_scope:packages/agentplane/src/cli/run-cli.core.task-create-base-intent.test.ts"
    - "observed_path_outside_scope:packages/agentplane/src/cli/run-cli.core.task-create-planner-intent.test.ts"
    - "observed_path_outside_scope:packages/agentplane/src/cli/run-cli.core.task-guided.test.ts"
    - "observed_path_outside_scope:packages/agentplane/src/cli/run-cli.core.task-handoff.test.ts"
    - "observed_path_outside_scope:packages/agentplane/src/cli/run-cli.core.task-next-action-json.test.ts"
    - "observed_path_outside_scope:packages/agentplane/src/cli/run-cli.core.task-routing.test.ts"
    - "observed_path_outside_scope:packages/agentplane/src/cli/run-cli.core.task-status-token-usage.test.ts"
    - "observed_path_outside_scope:packages/agentplane/src/cli/run-cli.core.tasks.active.test.ts"
    - "observed_path_outside_scope:packages/agentplane/src/cli/run-cli.core.tasks.lifecycle.test.ts"
    - "observed_path_outside_scope:packages/agentplane/src/cli/run-cli.core.tasks.user-create.test.ts"
    - "observed_path_outside_scope:packages/agentplane/src/cli/run-cli.core.tasks.verify-matrix.test.ts"
    - "observed_path_outside_scope:packages/agentplane/src/cli/run-cli/commands/init/prompts.test.ts"
    - "observed_path_outside_scope:packages/agentplane/src/cli/task-advance-effect-recovery.testkit.ts"
    - "observed_path_outside_scope:packages/agentplane/src/cli/task-continuity.testkit.ts"
    - "observed_path_outside_scope:packages/agentplane/src/cli/task-create-planner-intent.testkit.ts"
    - "observed_path_outside_scope:packages/agentplane/src/commands/evaluator/evaluator-episode.calibration.test.ts"
    - "observed_path_outside_scope:packages/agentplane/src/commands/evaluator/evaluator-review-usecase.ts"
    - "observed_path_outside_scope:packages/agentplane/src/commands/evaluator/evaluator-runtime-evidence.test.ts"
    - "observed_path_outside_scope:packages/agentplane/src/commands/pr/head-publication.test.ts"
    - "observed_path_outside_scope:packages/agentplane/src/commands/pr/head-publication.ts"
    - "observed_path_outside_scope:packages/agentplane/src/commands/pr/provider-update-branch-local.test.ts"
    - "observed_path_outside_scope:packages/agentplane/src/commands/pr/provider-update-branch-local.ts"
    - "observed_path_outside_scope:packages/agentplane/src/commands/pr/provider-update-branch.test.ts"
    - "observed_path_outside_scope:packages/agentplane/src/commands/pr/provider-update-branch.ts"
    - "observed_path_outside_scope:packages/agentplane/src/commands/shared/provider-update-branch-route.ts"
    - "observed_path_outside_scope:packages/agentplane/src/commands/shared/quality-review-retirement.ts"
    - "observed_path_outside_scope:packages/agentplane/src/commands/shared/route-decision-blockers.quality-review.test.ts"
    - "observed_path_outside_scope:packages/agentplane/src/commands/shared/route-decision-blockers.ts"
    - "observed_path_outside_scope:packages/agentplane/src/commands/shared/route-gate-priority.ts"
    - "observed_path_outside_scope:packages/agentplane/src/commands/shared/route-oracle.ts"
    - "observed_path_outside_scope:packages/agentplane/src/commands/shared/side-effect-authority.test.ts"
    - "observed_path_outside_scope:packages/agentplane/src/commands/shared/side-effect-authority.ts"
    - "observed_path_outside_scope:packages/agentplane/src/commands/shared/task-scope-extension-request.ts"
    - "observed_path_outside_scope:packages/agentplane/src/commands/shared/workflow-operation-effects.ts"
    - "observed_path_outside_scope:packages/agentplane/src/commands/shared/workflow-operation-prefix.ts"
    - "observed_path_outside_scope:packages/agentplane/src/commands/shared/workflow-operation-projection.registry.test.ts"
    - "observed_path_outside_scope:packages/agentplane/src/commands/shared/workflow-operation-projection.ts"
    - "observed_path_outside_scope:packages/agentplane/src/commands/shared/workflow-postconditions.ts"
    - "observed_path_outside_scope:packages/agentplane/src/commands/shared/workflow-step-branch.ts"
    - "observed_path_outside_scope:packages/agentplane/src/commands/shared/workflow-step-factory.ts"
    - "observed_path_outside_scope:packages/agentplane/src/commands/shared/workflow-step-projections.conflict-rework.test.ts"
    - "observed_path_outside_scope:packages/agentplane/src/commands/shared/workflow-step-provider-update-branch-spec.ts"
    - "observed_path_outside_scope:packages/agentplane/src/commands/shared/workflow-step-provider-update-branch.ts"
    - "observed_path_outside_scope:packages/agentplane/src/commands/shared/workflow-step-quality.test.ts"
    - "observed_path_outside_scope:packages/agentplane/src/commands/shared/workflow-step.ts"
    - "observed_path_outside_scope:packages/agentplane/src/runtime/task-execution-context/resolve.test.ts"
    - "observed_path_outside_scope:packages/core/src/tasks/index.ts"
    - "observed_path_outside_scope:packages/core/src/tasks/task-centric/graph.ts"
    - "observed_path_outside_scope:packages/core/src/tasks/task-centric/task-centric.test.ts"
    - "observed_path_outside_scope:packages/core/src/tasks/task-kernel/M1-QUALIFICATION.md"
    - "observed_path_outside_scope:packages/core/src/tasks/task-kernel/index.ts"
    - "observed_path_outside_scope:packages/core/src/tasks/task-kernel/invariants.test.ts"
    - "observed_path_outside_scope:packages/core/src/tasks/task-kernel/invariants.ts"
    - "observed_path_outside_scope:packages/core/src/tasks/task-kernel/kernel.test-fixtures.ts"
    - "observed_path_outside_scope:packages/core/src/tasks/task-kernel/kernel.test.ts"
    - "observed_path_outside_scope:packages/core/src/tasks/task-kernel/kernel.ts"
    - "observed_path_outside_scope:packages/core/src/tasks/task-kernel/model.test.ts"
    - "observed_path_outside_scope:packages/core/src/tasks/task-kernel/model.ts"
    - "observed_path_outside_scope:packages/testkit/src/cli-core-pr-flow.ts"
    - "observed_path_outside_scope:packages/testkit/src/cli.test.ts"
    - "observed_path_outside_scope:scripts/qualification/check-packaged-mixed-scope-lifecycle.mjs"
    - "observed_path_outside_scope:scripts/qualification/release-qualification.test.mjs"
    - "observed_path_outside_scope:website/static/img/social/docs/adr/0017-clean-task-core-rebuild.png"
    - "observed_path_outside_scope:website/static/img/social/docs/reference/clean-task-core-rebuild-spec.png"
    - "observed_path_outside_scope:website/static/img/social/manifest.json"
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
          - "docs/developer"
          - "packages/agentplane/src/commands/shared/pr-meta"
          - "packages/agentplane/src/commands/task"
          - "packages/agentplane/src/runner"
          - "packages/agentplane/src/shared"
        evidence_requirements:
          - "hosted_integration"
          - "repository_effect:documentation"
          - "repository_effect:repository_write"
          - "repository_effect:security_boundary"
          - "repository_effect:source_code"
          - "repository_effect:tests"
          - "task_outcome"
        external_effects: []
        repository_effects:
          - "documentation"
          - "repository_write"
          - "security_boundary"
          - "source_code"
          - "tests"
        risk:
          implementation_uncertainty: "bounded"
          requirements_uncertainty: "bounded"
          reversibility: "reversible"
      digest: "sha256:00e05cdc12c1b6d84857775657a18eb4683074956ab5c274fadad304e04c9729"
      escalation_reasons:
        - "central_component:packages/agentplane/src/commands/shared/pr-meta"
        - "central_path:packages/agentplane/src/cli/__snapshots__/run-cli.core.help-snap.test.ts.snap"
        - "central_path:packages/agentplane/src/cli/prompts.test.ts"
        - "central_path:packages/agentplane/src/cli/route-decision.testkit.ts"
        - "central_path:packages/agentplane/src/cli/run-cli.core.blueprint.test.ts"
        - "central_path:packages/agentplane/src/cli/run-cli.core.direct-task-supervision.test.ts"
        - "central_path:packages/agentplane/src/cli/run-cli.core.help-snap.test.ts"
        - "central_path:packages/agentplane/src/cli/run-cli.core.incidents.test.ts"
        - "central_path:packages/agentplane/src/cli/run-cli.core.lifecycle.finish-validation.test.ts"
        - "central_path:packages/agentplane/src/cli/run-cli.core.lifecycle.plan.test.ts"
        - "central_path:packages/agentplane/src/cli/run-cli.core.lifecycle.start-commit.policy.test.ts"
        - "central_path:packages/agentplane/src/cli/run-cli.core.lifecycle.start-readiness.test.ts"
        - "central_path:packages/agentplane/src/cli/run-cli.core.lifecycle.test.ts"
        - "central_path:packages/agentplane/src/cli/run-cli.core.lifecycle.verify.test.ts"
        - "central_path:packages/agentplane/src/cli/run-cli.core.pr-flow.pr-notes-verify.test.ts"
        - "central_path:packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.artifacts.test.ts"
        - "central_path:packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.git.test.ts"
        - "central_path:packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.network.test.ts"
        - "central_path:packages/agentplane/src/cli/run-cli.core.pr-flow.pr-validation.open-hydration.test.ts"
        - "central_path:packages/agentplane/src/cli/run-cli.core.pr-flow.pr-validation.test.ts"
        - "central_path:packages/agentplane/src/cli/run-cli.core.pr-flow.pr-validation.update.test.ts"
        - "central_path:packages/agentplane/src/cli/run-cli.core.pr-flow.start-ready.test.ts"
        - "central_path:packages/agentplane/src/cli/run-cli.core.pr-flow.status.test.ts"
        - "central_path:packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts"
        - "central_path:packages/agentplane/src/cli/run-cli.core.release-tasks-reconcile.test.ts"
        - "central_path:packages/agentplane/src/cli/run-cli.core.route-decision.batch.test.ts"
        - "central_path:packages/agentplane/src/cli/run-cli.core.route-decision.direct-closeout.test.ts"
        - "central_path:packages/agentplane/src/cli/run-cli.core.route-decision.pr-open-metadata.test.ts"
        - "central_path:packages/agentplane/src/cli/run-cli.core.route-decision.quality.test.ts"
        - "central_path:packages/agentplane/src/cli/run-cli.core.route-decision.remote-confidence.test.ts"
        - "central_path:packages/agentplane/src/cli/run-cli.core.route-decision.test.ts"
        - "central_path:packages/agentplane/src/cli/run-cli.core.route-decision.verification.test.ts"
        - "central_path:packages/agentplane/src/cli/run-cli.core.task-advance-effect-recovery.test.ts"
        - "central_path:packages/agentplane/src/cli/run-cli.core.task-advance.branch-worktree.test.ts"
        - "central_path:packages/agentplane/src/cli/run-cli.core.task-advance.evaluator-recovery.test.ts"
        - "central_path:packages/agentplane/src/cli/run-cli.core.task-advance.evidence-rework.test.ts"
        - "central_path:packages/agentplane/src/cli/run-cli.core.task-advance.worktree-resolution.test.ts"
        - "central_path:packages/agentplane/src/cli/run-cli.core.task-create-base-intent.test.ts"
        - "central_path:packages/agentplane/src/cli/run-cli.core.task-create-planner-intent.test.ts"
        - "central_path:packages/agentplane/src/cli/run-cli.core.task-guided.test.ts"
        - "central_path:packages/agentplane/src/cli/run-cli.core.task-handoff.test.ts"
        - "central_path:packages/agentplane/src/cli/run-cli.core.task-next-action-json.test.ts"
        - "central_path:packages/agentplane/src/cli/run-cli.core.task-routing.test.ts"
        - "central_path:packages/agentplane/src/cli/run-cli.core.task-status-token-usage.test.ts"
        - "central_path:packages/agentplane/src/cli/run-cli.core.tasks.active.test.ts"
        - "central_path:packages/agentplane/src/cli/run-cli.core.tasks.lifecycle.test.ts"
        - "central_path:packages/agentplane/src/cli/run-cli.core.tasks.user-create.test.ts"
        - "central_path:packages/agentplane/src/cli/run-cli.core.tasks.verify-matrix.test.ts"
        - "central_path:packages/agentplane/src/cli/run-cli/commands/init/prompts.test.ts"
        - "central_path:packages/agentplane/src/cli/task-advance-effect-recovery.testkit.ts"
        - "central_path:packages/agentplane/src/cli/task-continuity.testkit.ts"
        - "central_path:packages/agentplane/src/cli/task-create-planner-intent.testkit.ts"
        - "central_path:packages/agentplane/src/commands/shared/pr-meta/verify-log.test.ts"
        - "central_path:packages/agentplane/src/commands/shared/pr-meta/verify-log.ts"
        - "central_path:packages/agentplane/src/commands/shared/provider-update-branch-route.ts"
        - "central_path:packages/agentplane/src/commands/shared/quality-review-retirement.ts"
        - "central_path:packages/agentplane/src/commands/shared/route-decision-blockers.quality-review.test.ts"
        - "central_path:packages/agentplane/src/commands/shared/route-decision-blockers.ts"
        - "central_path:packages/agentplane/src/commands/shared/route-gate-priority.ts"
        - "central_path:packages/agentplane/src/commands/shared/route-oracle.ts"
        - "central_path:packages/agentplane/src/commands/shared/side-effect-authority.test.ts"
        - "central_path:packages/agentplane/src/commands/shared/side-effect-authority.ts"
        - "central_path:packages/agentplane/src/commands/shared/task-scope-extension-request.ts"
        - "central_path:packages/agentplane/src/commands/shared/workflow-operation-effects.ts"
        - "central_path:packages/agentplane/src/commands/shared/workflow-operation-prefix.ts"
        - "central_path:packages/agentplane/src/commands/shared/workflow-operation-projection.registry.test.ts"
        - "central_path:packages/agentplane/src/commands/shared/workflow-operation-projection.ts"
        - "central_path:packages/agentplane/src/commands/shared/workflow-postconditions.ts"
        - "central_path:packages/agentplane/src/commands/shared/workflow-step-branch.ts"
        - "central_path:packages/agentplane/src/commands/shared/workflow-step-factory.ts"
        - "central_path:packages/agentplane/src/commands/shared/workflow-step-projections.conflict-rework.test.ts"
        - "central_path:packages/agentplane/src/commands/shared/workflow-step-provider-update-branch-spec.ts"
        - "central_path:packages/agentplane/src/commands/shared/workflow-step-provider-update-branch.ts"
        - "central_path:packages/agentplane/src/commands/shared/workflow-step-quality.test.ts"
        - "central_path:packages/agentplane/src/commands/shared/workflow-step.ts"
        - "central_path:packages/core/src/tasks/index.ts"
        - "central_path:packages/core/src/tasks/task-centric/graph.ts"
        - "central_path:packages/core/src/tasks/task-centric/task-centric.test.ts"
        - "central_path:packages/core/src/tasks/task-kernel/M1-QUALIFICATION.md"
        - "central_path:packages/core/src/tasks/task-kernel/index.ts"
        - "central_path:packages/core/src/tasks/task-kernel/invariants.test.ts"
        - "central_path:packages/core/src/tasks/task-kernel/invariants.ts"
        - "central_path:packages/core/src/tasks/task-kernel/kernel.test-fixtures.ts"
        - "central_path:packages/core/src/tasks/task-kernel/kernel.test.ts"
        - "central_path:packages/core/src/tasks/task-kernel/kernel.ts"
        - "central_path:packages/core/src/tasks/task-kernel/model.test.ts"
        - "central_path:packages/core/src/tasks/task-kernel/model.ts"
        - "effect_security_boundary"
        - "unknown_path:.agentplane/tasks/202608260947-C6WV4T/blueprint/resolved-snapshot.json"
        - "unknown_path:.agentplane/tasks/202608260947-C6WV4T/pr/diffstat.txt"
        - "unknown_path:.agentplane/tasks/202608260947-C6WV4T/pr/github-title.txt"
        - "unknown_path:.agentplane/tasks/202608260947-C6WV4T/pr/meta.json"
        - "unknown_path:.agentplane/tasks/202608260947-C6WV4T/quality/20260826-105227686-recovery-context/evaluator-evidence-manifest.json"
        - "unknown_path:.agentplane/tasks/202608260947-C6WV4T/quality/20260826-105227686-recovery-context/evaluator-result.json"
        - "unknown_path:.agentplane/tasks/202608260947-C6WV4T/quality/20260826-105227686-recovery-context/evaluator-work-order.json"
        - "unknown_path:.agentplane/tasks/202608260947-C6WV4T/quality/20260826-105227686-recovery-context/quality-report.json"
        - "unknown_path:.agentplane/tasks/202608260947-C6WV4T/quality/objects/sha256/28aeeca59baccc008fa96c5a1bba3e1c91e889eb8923ebefbcb1b317c408ece3.json"
        - "unknown_path:.agentplane/tasks/202608260947-C6WV4T/quality/objects/sha256/9037cdf98253e70333ede9358d360264a85ee905be64a8723bbdd4ca71e02d4a.json"
        - "unknown_path:.agentplane/tasks/202608260947-C6WV4T/quality/objects/sha256/a39e66da8555d830d71298b5c64fbb5d3f50103573bc66640d89a196ba0621f8.json"
        - "unknown_path:.agentplane/tasks/202608260947-C6WV4T/quality/objects/sha256/ed5ff1bc96ab14843609d69b953efe9aa1d3a4216026cfbf5f6e2c2c67562c10.patch"
        - "unknown_path:.agentplane/tasks/202608260947-C6WV4T/supervision/declared-checks.json"
        - "unknown_path:.agentplane/tasks/202608260947-C6WV4T/supervision/implementation-evidence.json"
        - "unknown_path:.agentplane/tasks/202608260947-C6WV4T/verification/20260826101202781-c0efa3be2c04108a.json"
        - "unknown_path:.agentplane/tasks/202608260947-C6WV4T/verification/20260826102051415-1a60d2fff4f33f35.json"
        - "unknown_path:.agentplane/tasks/202608260947-C6WV4T/verification/20260826103831301-084955658270d1e2.json"
        - "unknown_path:.agentplane/tasks/202608260947-C6WV4T/verification/20260826104850237-742d0ef8d9576f58.json"
        - "unknown_path:.agentplane/tasks/202608261249-BXQZ97/blueprint/resolved-snapshot.json"
        - "unknown_path:.agentplane/tasks/202608261249-BXQZ97/pr/diffstat.txt"
        - "unknown_path:.agentplane/tasks/202608261249-BXQZ97/pr/github-title.txt"
        - "unknown_path:.agentplane/tasks/202608261249-BXQZ97/pr/meta.json"
        - "unknown_path:.agentplane/tasks/202608261249-BXQZ97/quality/20260826-154337837-recovery-context/evaluator-evidence-manifest.json"
        - "unknown_path:.agentplane/tasks/202608261249-BXQZ97/quality/20260826-154337837-recovery-context/evaluator-work-order.json"
        - "unknown_path:.agentplane/tasks/202608261249-BXQZ97/quality/20260826-154349579-recovery-context/evaluator-evidence-manifest.json"
        - "unknown_path:.agentplane/tasks/202608261249-BXQZ97/quality/20260826-154349579-recovery-context/evaluator-result.json"
        - "unknown_path:.agentplane/tasks/202608261249-BXQZ97/quality/20260826-154349579-recovery-context/evaluator-work-order.json"
        - "unknown_path:.agentplane/tasks/202608261249-BXQZ97/quality/20260826-154349579-recovery-context/quality-report.json"
        - "unknown_path:.agentplane/tasks/202608261249-BXQZ97/quality/20260826-171737369-recovery-context/evaluator-evidence-manifest.json"
        - "unknown_path:.agentplane/tasks/202608261249-BXQZ97/quality/20260826-171737369-recovery-context/evaluator-work-order.json"
        - "unknown_path:.agentplane/tasks/202608261249-BXQZ97/quality/20260826-171746402-recovery-context/evaluator-evidence-manifest.json"
        - "unknown_path:.agentplane/tasks/202608261249-BXQZ97/quality/20260826-171746402-recovery-context/evaluator-result.json"
        - "unknown_path:.agentplane/tasks/202608261249-BXQZ97/quality/20260826-171746402-recovery-context/evaluator-work-order.json"
        - "unknown_path:.agentplane/tasks/202608261249-BXQZ97/quality/20260826-171746402-recovery-context/quality-report.json"
        - "unknown_path:.agentplane/tasks/202608261249-BXQZ97/quality/20260826-184958130-recovery-context/evaluator-evidence-manifest.json"
        - "unknown_path:.agentplane/tasks/202608261249-BXQZ97/quality/20260826-184958130-recovery-context/evaluator-result.json"
        - "unknown_path:.agentplane/tasks/202608261249-BXQZ97/quality/20260826-184958130-recovery-context/evaluator-work-order.json"
        - "unknown_path:.agentplane/tasks/202608261249-BXQZ97/quality/20260826-184958130-recovery-context/quality-report.json"
        - "unknown_path:.agentplane/tasks/202608261249-BXQZ97/quality/objects/sha256/081a872247cd011fcd717d8674c5e8435662c78ef4fc15cb726edadffac91f00.patch"
        - "unknown_path:.agentplane/tasks/202608261249-BXQZ97/quality/objects/sha256/1f02efb4b8bab934d1772f143fb49a62c41af32c0dcc88e6d84d63067eb2476a.patch"
        - "unknown_path:.agentplane/tasks/202608261249-BXQZ97/quality/objects/sha256/49864fc10ebd312c36e5388075629eb27dd999c9531f6456b52708a9955fb1ce.json"
        - "unknown_path:.agentplane/tasks/202608261249-BXQZ97/quality/objects/sha256/6e793f3b5cf384ceae276d6d2daa685a2ea831c2c622aa09bbd54f9e9993ea15.patch"
        - "unknown_path:.agentplane/tasks/202608261249-BXQZ97/quality/objects/sha256/9037cdf98253e70333ede9358d360264a85ee905be64a8723bbdd4ca71e02d4a.json"
        - "unknown_path:.agentplane/tasks/202608261249-BXQZ97/quality/objects/sha256/e6c20dad3911e302671884f019d9d82e25ccbc8f44d64823eeebfa77db14c513.json"
        - "unknown_path:.agentplane/tasks/202608261249-BXQZ97/quality/objects/sha256/ec34965843d7ceaadde82286a6f78ba6336ac4a3d062b6aa9890f9fd67f55ddb.json"
        - "unknown_path:.agentplane/tasks/202608261249-BXQZ97/quality/objects/sha256/f3348a06497ca3aad892ff85d6f30139a609de8eb281221d422464223991c706.json"
        - "unknown_path:.agentplane/tasks/202608261249-BXQZ97/supervision/declared-checks.json"
        - "unknown_path:.agentplane/tasks/202608261249-BXQZ97/supervision/implementation-evidence.json"
        - "unknown_path:.agentplane/tasks/202608261249-BXQZ97/verification/20260826131231828-4899fc7776fc3011.json"
        - "unknown_path:.agentplane/tasks/202608261249-BXQZ97/verification/20260826131801504-414ceddf9264b14a.json"
        - "unknown_path:.agentplane/tasks/202608261249-BXQZ97/verification/20260826133735342-6eebdbeee58c63b8.json"
        - "unknown_path:.agentplane/tasks/202608261249-BXQZ97/verification/20260826140354671-51ca742916d6d412.json"
        - "unknown_path:.agentplane/tasks/202608261249-BXQZ97/verification/20260826140354671-f118e6b643ac2277.json"
        - "unknown_path:.agentplane/tasks/202608261249-BXQZ97/verification/20260826142031076-8ac311f53c036691.json"
        - "unknown_path:.agentplane/tasks/202608261249-BXQZ97/verification/20260826164823835-114624ee0716d03c.json"
        - "unknown_path:.agentplane/tasks/202608261249-BXQZ97/verification/20260826164823835-32417bd6c41cd6fa.json"
        - "unknown_path:.agentplane/tasks/202608261249-BXQZ97/verification/20260826165515427-a3cc939a542cd2aa.json"
        - "unknown_path:.agentplane/tasks/202608261249-BXQZ97/verification/20260826165827922-f50094dfabc25c8a.json"
        - "unknown_path:.agentplane/tasks/202608261249-BXQZ97/verification/20260826170134616-f04da5d817e4ab2e.json"
        - "unknown_path:.agentplane/tasks/202608261249-BXQZ97/verification/20260826170811135-da8030825d7c301a.json"
        - "unknown_path:.agentplane/tasks/202608261249-BXQZ97/verification/20260826171201924-42ebe5c731851354.json"
        - "unknown_path:.agentplane/tasks/202608261249-BXQZ97/verification/20260826171322652-7e41b1cc15cfed88.json"
        - "unknown_path:.agentplane/tasks/202608261249-BXQZ97/verification/20260826180631339-09707b1c0e98c6de.json"
        - "unknown_path:.agentplane/tasks/202608261249-BXQZ97/verification/20260826180631339-2614f45e8b6de844.json"
        - "unknown_path:.agentplane/tasks/202608261249-BXQZ97/verification/20260826181511661-477b9b7ac50111ef.json"
        - "unknown_path:.agentplane/tasks/202608261249-BXQZ97/verification/20260826182424360-48a3862358bbf338.json"
        - "unknown_path:.agentplane/tasks/202608261249-BXQZ97/verification/20260826182631556-e4632490ec0e3dab.json"
        - "unknown_path:.agentplane/tasks/202608262034-QVVB66/blueprint/resolved-snapshot.json"
        - "unknown_path:.agentplane/tasks/202608262034-QVVB66/pr/diffstat.txt"
        - "unknown_path:.agentplane/tasks/202608262034-QVVB66/pr/github-title.txt"
        - "unknown_path:.agentplane/tasks/202608262034-QVVB66/pr/meta.json"
        - "unknown_path:.agentplane/tasks/202608262034-QVVB66/quality/20260826-232534701-recovery-context/evaluator-evidence-manifest.json"
        - "unknown_path:.agentplane/tasks/202608262034-QVVB66/quality/20260826-232534701-recovery-context/evaluator-result.json"
        - "unknown_path:.agentplane/tasks/202608262034-QVVB66/quality/20260826-232534701-recovery-context/evaluator-work-order.json"
        - "unknown_path:.agentplane/tasks/202608262034-QVVB66/quality/20260826-232534701-recovery-context/quality-report.json"
        - "unknown_path:.agentplane/tasks/202608262034-QVVB66/quality/objects/sha256/0d8d9d809bba84acdf89f5b6a6de1e594e0e057ad12081d1c93925007ae3ba56.json"
        - "unknown_path:.agentplane/tasks/202608262034-QVVB66/quality/objects/sha256/6e4e04668c5a112cfb3f80c4b887a269381efd99162afd71dc2db583b725b51f.patch"
        - "unknown_path:.agentplane/tasks/202608262034-QVVB66/quality/objects/sha256/9037cdf98253e70333ede9358d360264a85ee905be64a8723bbdd4ca71e02d4a.json"
        - "unknown_path:.agentplane/tasks/202608262034-QVVB66/quality/objects/sha256/fb1af76268dd0e8465077608561a882b98194d2c2106b9f4a0f54b5a8216c4e9.json"
        - "unknown_path:.agentplane/tasks/202608262034-QVVB66/supervision/declared-checks.json"
        - "unknown_path:.agentplane/tasks/202608262034-QVVB66/supervision/implementation-evidence.json"
        - "unknown_path:.agentplane/tasks/202608262034-QVVB66/verification/20260826210937938-160302ec11db2821.json"
        - "unknown_path:.agentplane/tasks/202608262034-QVVB66/verification/20260826214006249-ef143b4293541bc2.json"
        - "unknown_path:.agentplane/tasks/202608262034-QVVB66/verification/20260826214633989-ff0fb06f0372a7b1.json"
        - "unknown_path:.agentplane/tasks/202608262034-QVVB66/verification/20260826214746594-95de7efcdc59dfaf.json"
        - "unknown_path:.agentplane/tasks/202608262034-QVVB66/verification/20260826222042038-1fbbbd157b86bc45.json"
        - "unknown_path:.agentplane/tasks/202608262034-QVVB66/verification/20260826225343074-06fb3b6272c4d3ce.json"
        - "unknown_path:.agentplane/tasks/202608262034-QVVB66/verification/20260826232338533-1f3a5cc55d1c2e2e.json"
        - "unknown_path:.agentplane/tasks/202608262034-QVVB66/verification/20260826232507417-6ba5f717053eee31.json"
        - "unknown_path:.agentplane/tasks/202608271251-GHHA0Q/blueprint/resolved-snapshot.json"
        - "unknown_path:.agentplane/tasks/202608271251-GHHA0Q/pr/diffstat.txt"
        - "unknown_path:.agentplane/tasks/202608271251-GHHA0Q/pr/github-title.txt"
        - "unknown_path:.agentplane/tasks/202608271251-GHHA0Q/pr/meta.json"
        - "unknown_path:.agentplane/tasks/202608271251-GHHA0Q/quality/20260827-132550152-recovery-context/evaluator-evidence-manifest.json"
        - "unknown_path:.agentplane/tasks/202608271251-GHHA0Q/quality/20260827-132550152-recovery-context/evaluator-result.json"
        - "unknown_path:.agentplane/tasks/202608271251-GHHA0Q/quality/20260827-132550152-recovery-context/evaluator-work-order.json"
        - "unknown_path:.agentplane/tasks/202608271251-GHHA0Q/quality/20260827-132550152-recovery-context/quality-report.json"
        - "unknown_path:.agentplane/tasks/202608271251-GHHA0Q/quality/objects/sha256/655d50e79cbbfa8962590054cf5fa3edbb0455a549a7ebf14ff0e4491251ee69.json"
        - "unknown_path:.agentplane/tasks/202608271251-GHHA0Q/quality/objects/sha256/87363b64dfbbc8acb0a0e1d49c8a00c932eb1f73b80583339c6e83f8490049d8.patch"
        - "unknown_path:.agentplane/tasks/202608271251-GHHA0Q/quality/objects/sha256/9037cdf98253e70333ede9358d360264a85ee905be64a8723bbdd4ca71e02d4a.json"
        - "unknown_path:.agentplane/tasks/202608271251-GHHA0Q/quality/objects/sha256/9ee81d006aad7410d4eabee9de9e480cf2cd79d61bd1335ade9707d04079fb6f.json"
        - "unknown_path:.agentplane/tasks/202608271251-GHHA0Q/supervision/declared-checks.json"
        - "unknown_path:.agentplane/tasks/202608271251-GHHA0Q/supervision/implementation-evidence.json"
        - "unknown_path:.agentplane/tasks/202608271251-GHHA0Q/verification/20260827130652681-032dc4b51b16d8f5.json"
        - "unknown_path:.agentplane/tasks/202608271251-GHHA0Q/verification/20260827132532555-956f74b4ae404852.json"
        - "unknown_path:.agentplane/tasks/202608271358-G0N9P4/blueprint/resolved-snapshot.json"
        - "unknown_path:.agentplane/tasks/202608271358-G0N9P4/pr/diffstat.txt"
        - "unknown_path:.agentplane/tasks/202608271358-G0N9P4/pr/github-title.txt"
        - "unknown_path:.agentplane/tasks/202608271358-G0N9P4/pr/meta.json"
        - "unknown_path:.agentplane/tasks/202608271358-G0N9P4/quality/20260827-144308272-recovery-context/evaluator-evidence-manifest.json"
        - "unknown_path:.agentplane/tasks/202608271358-G0N9P4/quality/20260827-144308272-recovery-context/evaluator-result.json"
        - "unknown_path:.agentplane/tasks/202608271358-G0N9P4/quality/20260827-144308272-recovery-context/evaluator-work-order.json"
        - "unknown_path:.agentplane/tasks/202608271358-G0N9P4/quality/20260827-144308272-recovery-context/quality-report.json"
        - "unknown_path:.agentplane/tasks/202608271358-G0N9P4/quality/objects/sha256/14513056fb48f13c0a2081399288b24ce14495e22af1134cff7f041d75a4cf96.json"
        - "unknown_path:.agentplane/tasks/202608271358-G0N9P4/quality/objects/sha256/2501149452aa79bbcf0f5915f02d7db1170a7c5b1117d25c3504628d5d3d60f1.patch"
        - "unknown_path:.agentplane/tasks/202608271358-G0N9P4/quality/objects/sha256/2f9b84087cbe4076bce202e94828ba937a9e4172d1620f4d48a2c73dcd5991c6.json"
        - "unknown_path:.agentplane/tasks/202608271358-G0N9P4/quality/objects/sha256/9037cdf98253e70333ede9358d360264a85ee905be64a8723bbdd4ca71e02d4a.json"
        - "unknown_path:.agentplane/tasks/202608271358-G0N9P4/supervision/declared-checks.json"
        - "unknown_path:.agentplane/tasks/202608271358-G0N9P4/supervision/implementation-evidence.json"
        - "unknown_path:.agentplane/tasks/202608271358-G0N9P4/verification/20260827141049775-a9ec4c50eea55011.json"
        - "unknown_path:.agentplane/tasks/202608271358-G0N9P4/verification/20260827143026261-afc0c60aa5ad0a08.json"
        - "unknown_path:.agentplane/tasks/202608271358-G0N9P4/verification/20260827144238263-382161b49fad458b.json"
        - "unknown_path:.agentplane/tasks/202608271425-9EWJA1/blueprint/resolved-snapshot.json"
        - "unknown_path:.agentplane/tasks/202608271425-9EWJA1/pr/diffstat.txt"
        - "unknown_path:.agentplane/tasks/202608271425-9EWJA1/pr/github-title.txt"
        - "unknown_path:.agentplane/tasks/202608271425-9EWJA1/pr/meta.json"
        - "unknown_path:.agentplane/tasks/202608271425-9EWJA1/quality/20260827-145146182-recovery-context/evaluator-evidence-manifest.json"
        - "unknown_path:.agentplane/tasks/202608271425-9EWJA1/quality/20260827-145146182-recovery-context/evaluator-result.json"
        - "unknown_path:.agentplane/tasks/202608271425-9EWJA1/quality/20260827-145146182-recovery-context/evaluator-work-order.json"
        - "unknown_path:.agentplane/tasks/202608271425-9EWJA1/quality/20260827-145146182-recovery-context/quality-report.json"
        - "unknown_path:.agentplane/tasks/202608271425-9EWJA1/quality/objects/sha256/0573f938635c08e770dcac6ba9e37ee421ad948d77a226a96c698c79010dd886.patch"
        - "unknown_path:.agentplane/tasks/202608271425-9EWJA1/quality/objects/sha256/7080a6be2e427488741d82e5f0f80a864c64a7fa2e9cdb8e5118aedded4881ec.json"
        - "unknown_path:.agentplane/tasks/202608271425-9EWJA1/quality/objects/sha256/9037cdf98253e70333ede9358d360264a85ee905be64a8723bbdd4ca71e02d4a.json"
        - "unknown_path:.agentplane/tasks/202608271425-9EWJA1/quality/objects/sha256/d95d0acf71eba724329a418bc06e8264aea65cb35720be95bfc5a172bb57ba3d.json"
        - "unknown_path:.agentplane/tasks/202608271425-9EWJA1/supervision/declared-checks.json"
        - "unknown_path:.agentplane/tasks/202608271425-9EWJA1/supervision/implementation-evidence.json"
        - "unknown_path:.agentplane/tasks/202608271425-9EWJA1/verification/20260827145057353-8504a8d8eb4611ab.json"
        - "unknown_path:.agentplane/tasks/202608271441-DVEMAE/blueprint/resolved-snapshot.json"
        - "unknown_path:.agentplane/tasks/202608271441-DVEMAE/pr/diffstat.txt"
        - "unknown_path:.agentplane/tasks/202608271441-DVEMAE/pr/github-title.txt"
        - "unknown_path:.agentplane/tasks/202608271441-DVEMAE/pr/meta.json"
        - "unknown_path:.agentplane/tasks/202608271441-DVEMAE/quality/20260827-161517390-recovery-context/evaluator-evidence-manifest.json"
        - "unknown_path:.agentplane/tasks/202608271441-DVEMAE/quality/20260827-161517390-recovery-context/evaluator-result.json"
        - "unknown_path:.agentplane/tasks/202608271441-DVEMAE/quality/20260827-161517390-recovery-context/evaluator-work-order.json"
        - "unknown_path:.agentplane/tasks/202608271441-DVEMAE/quality/20260827-161517390-recovery-context/quality-report.json"
        - "unknown_path:.agentplane/tasks/202608271441-DVEMAE/quality/objects/sha256/25d9a8b1e3a9e4c13c66e484a4e1b24f8ecdb231997b03159e5461368f8ccace.json"
        - "unknown_path:.agentplane/tasks/202608271441-DVEMAE/quality/objects/sha256/9037cdf98253e70333ede9358d360264a85ee905be64a8723bbdd4ca71e02d4a.json"
        - "unknown_path:.agentplane/tasks/202608271441-DVEMAE/quality/objects/sha256/bc9a4be916f6f1bf3e52810f0bdcae083f6de1da2c9050a0b73d2b46f2f4c158.patch"
        - "unknown_path:.agentplane/tasks/202608271441-DVEMAE/quality/objects/sha256/c945029f8f9a6a3b6717b22494ab1e117a3ea4e6b526ce151bdf827980533c8b.json"
        - "unknown_path:.agentplane/tasks/202608271441-DVEMAE/supervision/declared-checks.json"
        - "unknown_path:.agentplane/tasks/202608271441-DVEMAE/supervision/implementation-evidence.json"
        - "unknown_path:.agentplane/tasks/202608271441-DVEMAE/verification/20260827151321725-77366aa3f29ad2fc.json"
        - "unknown_path:.agentplane/tasks/202608271441-DVEMAE/verification/20260827161459128-ce04c76286eb1a98.json"
        - "unknown_path:.agentplane/tasks/202608271450-TZHW4C/blueprint/resolved-snapshot.json"
        - "unknown_path:.agentplane/tasks/202608271450-TZHW4C/pr/diffstat.txt"
        - "unknown_path:.agentplane/tasks/202608271450-TZHW4C/pr/github-title.txt"
        - "unknown_path:.agentplane/tasks/202608271450-TZHW4C/pr/meta.json"
        - "unknown_path:.agentplane/tasks/202608271450-TZHW4C/quality/20260827-164341199-recovery-context/evaluator-evidence-manifest.json"
        - "unknown_path:.agentplane/tasks/202608271450-TZHW4C/quality/20260827-164341199-recovery-context/evaluator-result.json"
        - "unknown_path:.agentplane/tasks/202608271450-TZHW4C/quality/20260827-164341199-recovery-context/evaluator-work-order.json"
        - "unknown_path:.agentplane/tasks/202608271450-TZHW4C/quality/20260827-164341199-recovery-context/quality-report.json"
        - "unknown_path:.agentplane/tasks/202608271450-TZHW4C/quality/objects/sha256/4f8d1195a803cd3c4754483629f1325c54ba2b91328ee958c9811dbc031ab8fd.json"
        - "unknown_path:.agentplane/tasks/202608271450-TZHW4C/quality/objects/sha256/68302d9b5aaca3ffd777ed8c0b0c11a4f0141aa08562b9d28cc3bc9a3075ecfc.patch"
        - "unknown_path:.agentplane/tasks/202608271450-TZHW4C/quality/objects/sha256/9037cdf98253e70333ede9358d360264a85ee905be64a8723bbdd4ca71e02d4a.json"
        - "unknown_path:.agentplane/tasks/202608271450-TZHW4C/quality/objects/sha256/db8f8a8efe42f5970786efbd4c479276e3b511d8fad72bc91924436db46ac611.json"
        - "unknown_path:.agentplane/tasks/202608271450-TZHW4C/supervision/declared-checks.json"
        - "unknown_path:.agentplane/tasks/202608271450-TZHW4C/supervision/implementation-evidence.json"
        - "unknown_path:.agentplane/tasks/202608271450-TZHW4C/verification/20260827153255520-912083059edc324f.json"
        - "unknown_path:.agentplane/tasks/202608271450-TZHW4C/verification/20260827164324368-fc4e3922be01c66f.json"
        - "unknown_path:.agentplane/tasks/202608271502-J6B4RW/blueprint/resolved-snapshot.json"
        - "unknown_path:.agentplane/tasks/202608271502-J6B4RW/pr/diffstat.txt"
        - "unknown_path:.agentplane/tasks/202608271502-J6B4RW/pr/github-title.txt"
        - "unknown_path:.agentplane/tasks/202608271502-J6B4RW/pr/meta.json"
        - "unknown_path:.agentplane/tasks/202608271502-J6B4RW/quality/20260827-154623971-recovery-context/evaluator-evidence-manifest.json"
        - "unknown_path:.agentplane/tasks/202608271502-J6B4RW/quality/20260827-154623971-recovery-context/evaluator-result.json"
        - "unknown_path:.agentplane/tasks/202608271502-J6B4RW/quality/20260827-154623971-recovery-context/evaluator-work-order.json"
        - "unknown_path:.agentplane/tasks/202608271502-J6B4RW/quality/20260827-154623971-recovery-context/quality-report.json"
        - "unknown_path:.agentplane/tasks/202608271502-J6B4RW/quality/objects/sha256/4fac0491a5e9a0c96c8ac043242a10a8897ab3ae27acf6ec034902b9811d012b.json"
        - "unknown_path:.agentplane/tasks/202608271502-J6B4RW/quality/objects/sha256/58b664e7b0a81b253833b10a6c216059659b73855a9bfe7503edda7e5c2c4aee.patch"
        - "unknown_path:.agentplane/tasks/202608271502-J6B4RW/quality/objects/sha256/9037cdf98253e70333ede9358d360264a85ee905be64a8723bbdd4ca71e02d4a.json"
        - "unknown_path:.agentplane/tasks/202608271502-J6B4RW/quality/objects/sha256/b1ec08ea0502169eb633c52e878c5f61dab6a05f7abb0b1e3821a09aae111dc8.json"
        - "unknown_path:.agentplane/tasks/202608271502-J6B4RW/supervision/declared-checks.json"
        - "unknown_path:.agentplane/tasks/202608271502-J6B4RW/supervision/implementation-evidence.json"
        - "unknown_path:.agentplane/tasks/202608271502-J6B4RW/verification/20260827154604703-18e8da1d3734f6ea.json"
        - "unknown_path:.agentplane/tasks/202608271520-175BQX/blueprint/resolved-snapshot.json"
        - "unknown_path:.agentplane/tasks/202608271520-175BQX/pr/diffstat.txt"
        - "unknown_path:.agentplane/tasks/202608271520-175BQX/pr/github-title.txt"
        - "unknown_path:.agentplane/tasks/202608271520-175BQX/pr/meta.json"
        - "unknown_path:.agentplane/tasks/202608271520-175BQX/quality/20260827-163417019-recovery-context/evaluator-evidence-manifest.json"
        - "unknown_path:.agentplane/tasks/202608271520-175BQX/quality/20260827-163417019-recovery-context/evaluator-result.json"
        - "unknown_path:.agentplane/tasks/202608271520-175BQX/quality/20260827-163417019-recovery-context/evaluator-work-order.json"
        - "unknown_path:.agentplane/tasks/202608271520-175BQX/quality/20260827-163417019-recovery-context/quality-report.json"
        - "unknown_path:.agentplane/tasks/202608271520-175BQX/quality/objects/sha256/3df5f4f1f353a441910c5898702f18d37f00971bf3cad8e11319d03103ab1c56.patch"
        - "unknown_path:.agentplane/tasks/202608271520-175BQX/quality/objects/sha256/9037cdf98253e70333ede9358d360264a85ee905be64a8723bbdd4ca71e02d4a.json"
        - "unknown_path:.agentplane/tasks/202608271520-175BQX/quality/objects/sha256/a288575b74937de29ef9e860b24bcdc61f3191f48df33fc132a601fd7072e7e6.json"
        - "unknown_path:.agentplane/tasks/202608271520-175BQX/quality/objects/sha256/aadfab4fb644761f23c0e128c6d090eb8b31d8787d9b2a201c93e5e10f1e03fe.json"
        - "unknown_path:.agentplane/tasks/202608271520-175BQX/supervision/declared-checks.json"
        - "unknown_path:.agentplane/tasks/202608271520-175BQX/supervision/implementation-evidence.json"
        - "unknown_path:.agentplane/tasks/202608271520-175BQX/verification/20260827163359452-f5a7fe6f4992aa43.json"
        - "unknown_path:.agentplane/tasks/202608271538-T21JCA/blueprint/resolved-snapshot.json"
        - "unknown_path:.agentplane/tasks/202608271538-T21JCA/pr/diffstat.txt"
        - "unknown_path:.agentplane/tasks/202608271538-T21JCA/pr/github-title.txt"
        - "unknown_path:.agentplane/tasks/202608271538-T21JCA/pr/meta.json"
        - "unknown_path:.agentplane/tasks/202608271538-T21JCA/quality/20260827-155614370-recovery-context/evaluator-evidence-manifest.json"
        - "unknown_path:.agentplane/tasks/202608271538-T21JCA/quality/20260827-155614370-recovery-context/evaluator-result.json"
        - "unknown_path:.agentplane/tasks/202608271538-T21JCA/quality/20260827-155614370-recovery-context/evaluator-work-order.json"
        - "unknown_path:.agentplane/tasks/202608271538-T21JCA/quality/20260827-155614370-recovery-context/quality-report.json"
        - "unknown_path:.agentplane/tasks/202608271538-T21JCA/quality/20260827-165816155-recovery-context/evaluator-evidence-manifest.json"
        - "unknown_path:.agentplane/tasks/202608271538-T21JCA/quality/20260827-165816155-recovery-context/evaluator-result.json"
        - "unknown_path:.agentplane/tasks/202608271538-T21JCA/quality/20260827-165816155-recovery-context/evaluator-work-order.json"
        - "unknown_path:.agentplane/tasks/202608271538-T21JCA/quality/20260827-165816155-recovery-context/quality-report.json"
        - "unknown_path:.agentplane/tasks/202608271538-T21JCA/quality/20260827-185237520-recovery-context/evaluator-evidence-manifest.json"
        - "unknown_path:.agentplane/tasks/202608271538-T21JCA/quality/20260827-185237520-recovery-context/evaluator-result.json"
        - "unknown_path:.agentplane/tasks/202608271538-T21JCA/quality/20260827-185237520-recovery-context/evaluator-work-order.json"
        - "unknown_path:.agentplane/tasks/202608271538-T21JCA/quality/20260827-185237520-recovery-context/quality-report.json"
        - "unknown_path:.agentplane/tasks/202608271538-T21JCA/quality/objects/sha256/20e682bec49f3be073f007266985798ff96956563ac46f42c9c8963175cb0d75.json"
        - "unknown_path:.agentplane/tasks/202608271538-T21JCA/quality/objects/sha256/23f41be610f22839e63955e61a6129a0f92dc7b634a33469b42faf27be8d2392.json"
        - "unknown_path:.agentplane/tasks/202608271538-T21JCA/quality/objects/sha256/5b969fa31cb380006daa12e43d9292d0b7b40b06dab78d360d996621e45a56f0.json"
        - "unknown_path:.agentplane/tasks/202608271538-T21JCA/quality/objects/sha256/8272d31e92fdd32ae188f1bceceb8fd5b20abee2ac53a445582b54e3cf230ada.patch"
        - "unknown_path:.agentplane/tasks/202608271538-T21JCA/quality/objects/sha256/9037cdf98253e70333ede9358d360264a85ee905be64a8723bbdd4ca71e02d4a.json"
        - "unknown_path:.agentplane/tasks/202608271538-T21JCA/quality/objects/sha256/a7e3196d56670a618cab6f2faccd91792fd9fdd6bb32df3f9587ff725891c60f.patch"
        - "unknown_path:.agentplane/tasks/202608271538-T21JCA/quality/objects/sha256/aaae0a4db026925daff5ae459b577e586f725c6f7b05301210c65ca44c52ae5f.json"
        - "unknown_path:.agentplane/tasks/202608271538-T21JCA/quality/objects/sha256/fcf8dd2e46cf020a4dfa46a07d648ce3dfb919b0ad00a577f97eacfd649d9817.patch"
        - "unknown_path:.agentplane/tasks/202608271538-T21JCA/supervision/declared-checks.json"
        - "unknown_path:.agentplane/tasks/202608271538-T21JCA/supervision/implementation-evidence.json"
        - "unknown_path:.agentplane/tasks/202608271538-T21JCA/verification/20260827155541958-c84df617bc1e0c1a.json"
        - "unknown_path:.agentplane/tasks/202608271538-T21JCA/verification/20260827163017204-63965a85298089d8.json"
        - "unknown_path:.agentplane/tasks/202608271538-T21JCA/verification/20260827165804845-f40035f1f5135e14.json"
        - "unknown_path:.agentplane/tasks/202608271538-T21JCA/verification/20260827175117746-40e332b32f5ff76b.json"
        - "unknown_path:.agentplane/tasks/202608271538-T21JCA/verification/20260827181112407-f0e13b14e41fe302.json"
        - "unknown_path:.agentplane/tasks/202608271538-T21JCA/verification/20260827185225478-6366f2fb7f9e38cb.json"
        - "unknown_path:.agentplane/tasks/202608271544-1TDVPJ/blueprint/resolved-snapshot.json"
        - "unknown_path:.agentplane/tasks/202608271544-1TDVPJ/pr/diffstat.txt"
        - "unknown_path:.agentplane/tasks/202608271544-1TDVPJ/pr/github-title.txt"
        - "unknown_path:.agentplane/tasks/202608271544-1TDVPJ/pr/meta.json"
        - "unknown_path:.agentplane/tasks/202608271544-1TDVPJ/quality/20260827-162357810-recovery-context/evaluator-evidence-manifest.json"
        - "unknown_path:.agentplane/tasks/202608271544-1TDVPJ/quality/20260827-162357810-recovery-context/evaluator-result.json"
        - "unknown_path:.agentplane/tasks/202608271544-1TDVPJ/quality/20260827-162357810-recovery-context/evaluator-work-order.json"
        - "unknown_path:.agentplane/tasks/202608271544-1TDVPJ/quality/20260827-162357810-recovery-context/quality-report.json"
        - "unknown_path:.agentplane/tasks/202608271544-1TDVPJ/quality/objects/sha256/09e7b31f3ac865c48223b58cfb33a8e0b13406f6b1d10fbd0397887ce64fcd39.json"
        - "unknown_path:.agentplane/tasks/202608271544-1TDVPJ/quality/objects/sha256/4a6b7f61fc2cd73a0ac64c0afa6b1e91ee9137ee153073440092170e287545ae.patch"
        - "unknown_path:.agentplane/tasks/202608271544-1TDVPJ/quality/objects/sha256/54db07e252c5020879f6e899f2b62e2cbfdd0f825307f6b3f8a998e2cee24ddf.json"
        - "unknown_path:.agentplane/tasks/202608271544-1TDVPJ/quality/objects/sha256/9037cdf98253e70333ede9358d360264a85ee905be64a8723bbdd4ca71e02d4a.json"
        - "unknown_path:.agentplane/tasks/202608271544-1TDVPJ/supervision/declared-checks.json"
        - "unknown_path:.agentplane/tasks/202608271544-1TDVPJ/supervision/implementation-evidence.json"
        - "unknown_path:.agentplane/tasks/202608271544-1TDVPJ/verification/20260827160642690-24295292837d8d7e.json"
        - "unknown_path:.agentplane/tasks/202608271544-1TDVPJ/verification/20260827162335964-8d33c746263199fc.json"
        - "unknown_path:.agentplane/tasks/202608271649-DVNTRR/blueprint/resolved-snapshot.json"
        - "unknown_path:.agentplane/tasks/202608271649-DVNTRR/pr/diffstat.txt"
        - "unknown_path:.agentplane/tasks/202608271649-DVNTRR/pr/github-title.txt"
        - "unknown_path:.agentplane/tasks/202608271649-DVNTRR/pr/meta.json"
        - "unknown_path:.agentplane/tasks/202608271649-DVNTRR/quality/20260827-170736164-recovery-context/evaluator-evidence-manifest.json"
        - "unknown_path:.agentplane/tasks/202608271649-DVNTRR/quality/20260827-170736164-recovery-context/evaluator-result.json"
        - "unknown_path:.agentplane/tasks/202608271649-DVNTRR/quality/20260827-170736164-recovery-context/evaluator-work-order.json"
        - "unknown_path:.agentplane/tasks/202608271649-DVNTRR/quality/20260827-170736164-recovery-context/quality-report.json"
        - "unknown_path:.agentplane/tasks/202608271649-DVNTRR/quality/objects/sha256/26b29129cee78cb00a376b7d25f1c78233418cc92f456e963b0122292f6b29fe.json"
        - "unknown_path:.agentplane/tasks/202608271649-DVNTRR/quality/objects/sha256/9037cdf98253e70333ede9358d360264a85ee905be64a8723bbdd4ca71e02d4a.json"
        - "unknown_path:.agentplane/tasks/202608271649-DVNTRR/quality/objects/sha256/9e458f50f4a70613d2c4d7d41c1006bf431af26fd040c3649cf38af0ae39c0ac.patch"
        - "unknown_path:.agentplane/tasks/202608271649-DVNTRR/quality/objects/sha256/a0a854b5539401e1ce7b8c5d69c90e66e4e7164cedf7d87371aed16ed16c54e5.json"
        - "unknown_path:.agentplane/tasks/202608271649-DVNTRR/supervision/declared-checks.json"
        - "unknown_path:.agentplane/tasks/202608271649-DVNTRR/supervision/implementation-evidence.json"
        - "unknown_path:.agentplane/tasks/202608271649-DVNTRR/verification/20260827170718338-d32fb33a649bef9e.json"
        - "unknown_path:.agentplane/tasks/202608271659-AD3030/blueprint/resolved-snapshot.json"
        - "unknown_path:.agentplane/tasks/202608271659-AD3030/pr/diffstat.txt"
        - "unknown_path:.agentplane/tasks/202608271659-AD3030/pr/github-title.txt"
        - "unknown_path:.agentplane/tasks/202608271659-AD3030/pr/meta.json"
        - "unknown_path:.agentplane/tasks/202608271659-AD3030/quality/20260827-231601668-recovery-context/evaluator-evidence-manifest.json"
        - "unknown_path:.agentplane/tasks/202608271659-AD3030/quality/20260827-231601668-recovery-context/evaluator-follow-up.json"
        - "unknown_path:.agentplane/tasks/202608271659-AD3030/quality/20260827-231601668-recovery-context/evaluator-result.json"
        - "unknown_path:.agentplane/tasks/202608271659-AD3030/quality/20260827-231601668-recovery-context/evaluator-work-order.json"
        - "unknown_path:.agentplane/tasks/202608271659-AD3030/quality/20260827-231601668-recovery-context/quality-report.json"
        - "unknown_path:.agentplane/tasks/202608271659-AD3030/quality/20260827-233148153-recovery-context/evaluator-evidence-manifest.json"
        - "unknown_path:.agentplane/tasks/202608271659-AD3030/quality/20260827-233148153-recovery-context/evaluator-result.json"
        - "unknown_path:.agentplane/tasks/202608271659-AD3030/quality/20260827-233148153-recovery-context/evaluator-work-order.json"
        - "unknown_path:.agentplane/tasks/202608271659-AD3030/quality/20260827-233148153-recovery-context/quality-report.json"
        - "unknown_path:.agentplane/tasks/202608271659-AD3030/quality/objects/sha256/6a54b986c4337537710c4beb64489bec480674ba7177b0351762cbc6ef90410f.patch"
        - "unknown_path:.agentplane/tasks/202608271659-AD3030/quality/objects/sha256/9037cdf98253e70333ede9358d360264a85ee905be64a8723bbdd4ca71e02d4a.json"
        - "unknown_path:.agentplane/tasks/202608271659-AD3030/quality/objects/sha256/95b232edfe20d366180cc29edc1979fdffee0202f5881344b07866a82d04fc4f.json"
        - "unknown_path:.agentplane/tasks/202608271659-AD3030/quality/objects/sha256/d0d238d23c3006d5e0d4d0953d1881f99c4173f65bfe5d0abfb7b08b76de5a06.json"
        - "unknown_path:.agentplane/tasks/202608271659-AD3030/quality/objects/sha256/d36ac47a0ebecb9519f911ec1314b9ad33af5c3ced863ba464a8788b49dec5b9.json"
        - "unknown_path:.agentplane/tasks/202608271659-AD3030/supervision/declared-checks.json"
        - "unknown_path:.agentplane/tasks/202608271659-AD3030/supervision/implementation-evidence.json"
        - "unknown_path:.agentplane/tasks/202608271659-AD3030/verification/20260827213149985-715257e021089323.json"
        - "unknown_path:.agentplane/tasks/202608271659-AD3030/verification/20260827215847391-fb3c0afcc74de348.json"
        - "unknown_path:.agentplane/tasks/202608271659-AD3030/verification/20260827223623598-a12592ac3d5fc2df.json"
        - "unknown_path:.agentplane/tasks/202608271659-AD3030/verification/20260827231543799-24b0be63cfe9653d.json"
        - "unknown_path:.agentplane/tasks/202608271659-AD3030/verification/20260827233043685-d1e770e639a91501.json"
        - "unknown_path:.agentplane/tasks/202608272229-CFKR4P/blueprint/resolved-snapshot.json"
        - "unknown_path:.agentplane/tasks/202608272229-CFKR4P/pr/diffstat.txt"
        - "unknown_path:.agentplane/tasks/202608272229-CFKR4P/pr/github-title.txt"
        - "unknown_path:.agentplane/tasks/202608272229-CFKR4P/pr/meta.json"
        - "unknown_path:.agentplane/tasks/202608272229-CFKR4P/quality/20260827-230610775-recovery-context/evaluator-evidence-manifest.json"
        - "unknown_path:.agentplane/tasks/202608272229-CFKR4P/quality/20260827-230610775-recovery-context/evaluator-result.json"
        - "unknown_path:.agentplane/tasks/202608272229-CFKR4P/quality/20260827-230610775-recovery-context/evaluator-work-order.json"
        - "unknown_path:.agentplane/tasks/202608272229-CFKR4P/quality/20260827-230610775-recovery-context/quality-report.json"
        - "unknown_path:.agentplane/tasks/202608272229-CFKR4P/quality/20260828-000932160-recovery-context/evaluator-evidence-manifest.json"
        - "unknown_path:.agentplane/tasks/202608272229-CFKR4P/quality/20260828-000932160-recovery-context/evaluator-follow-up.json"
        - "unknown_path:.agentplane/tasks/202608272229-CFKR4P/quality/20260828-000932160-recovery-context/evaluator-result.json"
        - "unknown_path:.agentplane/tasks/202608272229-CFKR4P/quality/20260828-000932160-recovery-context/evaluator-work-order.json"
        - "unknown_path:.agentplane/tasks/202608272229-CFKR4P/quality/20260828-000932160-recovery-context/quality-report.json"
        - "unknown_path:.agentplane/tasks/202608272229-CFKR4P/quality/20260828-053621063-recovery-context/evaluator-evidence-manifest.json"
        - "unknown_path:.agentplane/tasks/202608272229-CFKR4P/quality/20260828-053621063-recovery-context/evaluator-result.json"
        - "unknown_path:.agentplane/tasks/202608272229-CFKR4P/quality/20260828-053621063-recovery-context/evaluator-work-order.json"
        - "unknown_path:.agentplane/tasks/202608272229-CFKR4P/quality/20260828-053621063-recovery-context/quality-report.json"
        - "unknown_path:.agentplane/tasks/202608272229-CFKR4P/quality/objects/sha256/11688b587a6c37b5298be891c8baca187f77e08c5986a1dc9f37e56709aa676e.patch"
        - "unknown_path:.agentplane/tasks/202608272229-CFKR4P/quality/objects/sha256/3fa8c5a4ffd8708f6e96a21eba31edaf65882e1844c30c1e86c408070f957b5b.patch"
        - "unknown_path:.agentplane/tasks/202608272229-CFKR4P/quality/objects/sha256/6f267ba300d86b30f5a46cb1b7eae0f2cb31b89dd4cf4c01d666f9423b309d5e.json"
        - "unknown_path:.agentplane/tasks/202608272229-CFKR4P/quality/objects/sha256/9037cdf98253e70333ede9358d360264a85ee905be64a8723bbdd4ca71e02d4a.json"
        - "unknown_path:.agentplane/tasks/202608272229-CFKR4P/quality/objects/sha256/9a2d9706dbffd1b3e70f61ffedc1e700dd415cee709f8010108ced527e4dfdc5.json"
        - "unknown_path:.agentplane/tasks/202608272229-CFKR4P/quality/objects/sha256/be5d9b5a63f50769630a2f792d28e7a198ceee47d2693d131f4b4de1dbdf8317.json"
        - "unknown_path:.agentplane/tasks/202608272229-CFKR4P/quality/objects/sha256/ddfa9158349dd8bc733f31959f4dd5b52edf19f263a2c56ebf3c0556d6f7eb98.json"
        - "unknown_path:.agentplane/tasks/202608272229-CFKR4P/supervision/declared-checks.json"
        - "unknown_path:.agentplane/tasks/202608272229-CFKR4P/supervision/implementation-evidence.json"
        - "unknown_path:.agentplane/tasks/202608272229-CFKR4P/verification/20260827230553240-5454bb7d2f564299.json"
        - "unknown_path:.agentplane/tasks/202608272229-CFKR4P/verification/20260828000849309-06bea9aa9602ed03.json"
        - "unknown_path:.agentplane/tasks/202608272229-CFKR4P/verification/20260828000849309-6c255a4db5aae45c.json"
        - "unknown_path:.agentplane/tasks/202608272229-CFKR4P/verification/20260828053605787-eca4721e74cf0d8e.json"
        - "unknown_path:.agentplane/tasks/202608280009-QMVHM2/blueprint/resolved-snapshot.json"
        - "unknown_path:.agentplane/tasks/202608280009-QMVHM2/pr/diffstat.txt"
        - "unknown_path:.agentplane/tasks/202608280009-QMVHM2/pr/github-title.txt"
        - "unknown_path:.agentplane/tasks/202608280009-QMVHM2/pr/meta.json"
        - "unknown_path:.agentplane/tasks/202608280009-QMVHM2/quality/20260828-011322107-recovery-context/evaluator-evidence-manifest.json"
        - "unknown_path:.agentplane/tasks/202608280009-QMVHM2/quality/20260828-011322107-recovery-context/evaluator-follow-up.json"
        - "unknown_path:.agentplane/tasks/202608280009-QMVHM2/quality/20260828-011322107-recovery-context/evaluator-result.json"
        - "unknown_path:.agentplane/tasks/202608280009-QMVHM2/quality/20260828-011322107-recovery-context/evaluator-work-order.json"
        - "unknown_path:.agentplane/tasks/202608280009-QMVHM2/quality/20260828-011322107-recovery-context/quality-report.json"
        - "unknown_path:.agentplane/tasks/202608280009-QMVHM2/quality/20260828-042840647-recovery-context/evaluator-evidence-manifest.json"
        - "unknown_path:.agentplane/tasks/202608280009-QMVHM2/quality/20260828-042840647-recovery-context/evaluator-result.json"
        - "unknown_path:.agentplane/tasks/202608280009-QMVHM2/quality/20260828-042840647-recovery-context/evaluator-work-order.json"
        - "unknown_path:.agentplane/tasks/202608280009-QMVHM2/quality/20260828-042840647-recovery-context/quality-report.json"
        - "unknown_path:.agentplane/tasks/202608280009-QMVHM2/quality/20260828-051322345-recovery-context/evaluator-evidence-manifest.json"
        - "unknown_path:.agentplane/tasks/202608280009-QMVHM2/quality/20260828-051322345-recovery-context/evaluator-result.json"
        - "unknown_path:.agentplane/tasks/202608280009-QMVHM2/quality/20260828-051322345-recovery-context/evaluator-work-order.json"
        - "unknown_path:.agentplane/tasks/202608280009-QMVHM2/quality/20260828-051322345-recovery-context/quality-report.json"
        - "unknown_path:.agentplane/tasks/202608280009-QMVHM2/quality/objects/sha256/239c6f92bfea8b9963a7280e631c183681ae1af1934202231f1189ec01382189.json"
        - "unknown_path:.agentplane/tasks/202608280009-QMVHM2/quality/objects/sha256/5379a6852a6d160cd1b996793dd260bf11f32c00c170218fea9dc0fff3a613e4.patch"
        - "unknown_path:.agentplane/tasks/202608280009-QMVHM2/quality/objects/sha256/60f75a07ff5023ff166e4200c64265239501e2b3f6b37a021996dff717b5fbfe.patch"
        - "unknown_path:.agentplane/tasks/202608280009-QMVHM2/quality/objects/sha256/66b158c9a1fbadd62b9ef4afac539b907e19606f24447f5afac1a180c96d1f76.json"
        - "unknown_path:.agentplane/tasks/202608280009-QMVHM2/quality/objects/sha256/9037cdf98253e70333ede9358d360264a85ee905be64a8723bbdd4ca71e02d4a.json"
        - "unknown_path:.agentplane/tasks/202608280009-QMVHM2/quality/objects/sha256/975b3b4c61f11b15abc435105a878d617ff4c7299a8b62d6c8401b9482fc9f3d.json"
        - "unknown_path:.agentplane/tasks/202608280009-QMVHM2/quality/objects/sha256/b2ffb42c3b91e00e03734e7dcf1aa3ef131732e1faccaedf4fa53f1310491c33.json"
        - "unknown_path:.agentplane/tasks/202608280009-QMVHM2/supervision/declared-checks.json"
        - "unknown_path:.agentplane/tasks/202608280009-QMVHM2/supervision/implementation-evidence.json"
        - "unknown_path:.agentplane/tasks/202608280009-QMVHM2/verification/20260828011304735-23f23a1652815c0c.json"
        - "unknown_path:.agentplane/tasks/202608280009-QMVHM2/verification/20260828042822482-e20218a743e953fb.json"
        - "unknown_path:.agentplane/tasks/202608280009-QMVHM2/verification/20260828050220795-2614f9b715b13cb6.json"
        - "unknown_path:.agentplane/tasks/202608280009-QMVHM2/verification/20260828050220795-466081e22890fca3.json"
        - "unknown_path:.agentplane/tasks/202608280009-QMVHM2/verification/20260828051308628-09a00b90b25d66f1.json"
        - "unknown_path:.agentplane/tasks/202608280529-59VB06/blueprint/resolved-snapshot.json"
        - "unknown_path:.agentplane/tasks/202608280529-59VB06/pr/diffstat.txt"
        - "unknown_path:.agentplane/tasks/202608280529-59VB06/pr/github-title.txt"
        - "unknown_path:.agentplane/tasks/202608280529-59VB06/pr/meta.json"
        - "unknown_path:.agentplane/tasks/202608280529-59VB06/quality/20260828-060709201-recovery-context/evaluator-evidence-manifest.json"
        - "unknown_path:.agentplane/tasks/202608280529-59VB06/quality/20260828-060709201-recovery-context/evaluator-follow-up.json"
        - "unknown_path:.agentplane/tasks/202608280529-59VB06/quality/20260828-060709201-recovery-context/evaluator-result.json"
        - "unknown_path:.agentplane/tasks/202608280529-59VB06/quality/20260828-060709201-recovery-context/evaluator-work-order.json"
        - "unknown_path:.agentplane/tasks/202608280529-59VB06/quality/20260828-060709201-recovery-context/quality-report.json"
        - "unknown_path:.agentplane/tasks/202608280529-59VB06/quality/20260828-153633672-recovery-context/evaluator-evidence-manifest.json"
        - "unknown_path:.agentplane/tasks/202608280529-59VB06/quality/20260828-153633672-recovery-context/evaluator-result.json"
        - "unknown_path:.agentplane/tasks/202608280529-59VB06/quality/20260828-153633672-recovery-context/evaluator-work-order.json"
        - "unknown_path:.agentplane/tasks/202608280529-59VB06/quality/20260828-153633672-recovery-context/quality-report.json"
        - "unknown_path:.agentplane/tasks/202608280529-59VB06/quality/20260828-181927875-recovery-context/evaluator-evidence-manifest.json"
        - "unknown_path:.agentplane/tasks/202608280529-59VB06/quality/20260828-181927875-recovery-context/evaluator-follow-up.json"
        - "unknown_path:.agentplane/tasks/202608280529-59VB06/quality/20260828-181927875-recovery-context/evaluator-result.json"
        - "unknown_path:.agentplane/tasks/202608280529-59VB06/quality/20260828-181927875-recovery-context/evaluator-work-order.json"
        - "unknown_path:.agentplane/tasks/202608280529-59VB06/quality/20260828-181927875-recovery-context/quality-report.json"
        - "unknown_path:.agentplane/tasks/202608280529-59VB06/quality/20260828-185050324-recovery-context/evaluator-evidence-manifest.json"
        - "unknown_path:.agentplane/tasks/202608280529-59VB06/quality/20260828-185050324-recovery-context/evaluator-result.json"
        - "unknown_path:.agentplane/tasks/202608280529-59VB06/quality/20260828-185050324-recovery-context/evaluator-work-order.json"
        - "unknown_path:.agentplane/tasks/202608280529-59VB06/quality/20260828-185050324-recovery-context/quality-report.json"
        - "unknown_path:.agentplane/tasks/202608280529-59VB06/quality/objects/sha256/24745007b98bd3eb7178a157f3cff4cd03ec4dd7de00613fbd465e1c9d85fc99.json"
        - "unknown_path:.agentplane/tasks/202608280529-59VB06/quality/objects/sha256/32210e077de23f38baba474b9ad2cf03c748596a8597b2daf2df6a5f75376ef1.json"
        - "unknown_path:.agentplane/tasks/202608280529-59VB06/quality/objects/sha256/85ab8a4388809a43346334532eaf5fea9f05ec0af3e6b17cced11cc3e28859fb.patch"
        - "unknown_path:.agentplane/tasks/202608280529-59VB06/quality/objects/sha256/8e54ddb6d171cda8ac2e9c2276a32c2567dee171dd67e7e76bce8968de76829a.patch"
        - "unknown_path:.agentplane/tasks/202608280529-59VB06/quality/objects/sha256/9037cdf98253e70333ede9358d360264a85ee905be64a8723bbdd4ca71e02d4a.json"
        - "unknown_path:.agentplane/tasks/202608280529-59VB06/quality/objects/sha256/b3b3f9229ace468303c32054dbfc08138f4e6822b464104b4d9180421de40844.json"
        - "unknown_path:.agentplane/tasks/202608280529-59VB06/quality/objects/sha256/dffe78fab5abb3d7f0acea1c9b14f4cbfd56d68d836f90da49341774b928b834.json"
        - "unknown_path:.agentplane/tasks/202608280529-59VB06/quality/objects/sha256/f9a2f74389e1488cd06a9f00c9eb2086396f47f6f2dec4f25ee791723541a0e8.json"
        - "unknown_path:.agentplane/tasks/202608280529-59VB06/supervision/declared-checks.json"
        - "unknown_path:.agentplane/tasks/202608280529-59VB06/supervision/implementation-evidence.json"
        - "unknown_path:.agentplane/tasks/202608280529-59VB06/verification/20260828060650926-cb1fbd290a69ab04.json"
        - "unknown_path:.agentplane/tasks/202608280529-59VB06/verification/20260828153621983-c6c6865d6eab595e.json"
        - "unknown_path:.agentplane/tasks/202608280529-59VB06/verification/20260828161611883-ae6fce25c62f3d26.json"
        - "unknown_path:.agentplane/tasks/202608280529-59VB06/verification/20260828161639959-3ac5a4b484ed090d.json"
        - "unknown_path:.agentplane/tasks/202608280529-59VB06/verification/20260828181914331-2b5187ee7edbae42.json"
        - "unknown_path:.agentplane/tasks/202608280529-59VB06/verification/20260828185032879-7a1266da64904bc0.json"
        - "unknown_path:.agentplane/tasks/202608280614-PCBY2N/blueprint/resolved-snapshot.json"
        - "unknown_path:.agentplane/tasks/202608280614-PCBY2N/pr/diffstat.txt"
        - "unknown_path:.agentplane/tasks/202608280614-PCBY2N/pr/github-title.txt"
        - "unknown_path:.agentplane/tasks/202608280614-PCBY2N/pr/meta.json"
        - "unknown_path:.agentplane/tasks/202608280614-PCBY2N/quality/20260828-112915024-recovery-context/evaluator-evidence-manifest.json"
        - "unknown_path:.agentplane/tasks/202608280614-PCBY2N/quality/20260828-112915024-recovery-context/evaluator-result.json"
        - "unknown_path:.agentplane/tasks/202608280614-PCBY2N/quality/20260828-112915024-recovery-context/evaluator-work-order.json"
        - "unknown_path:.agentplane/tasks/202608280614-PCBY2N/quality/20260828-112915024-recovery-context/quality-report.json"
        - "unknown_path:.agentplane/tasks/202608280614-PCBY2N/quality/objects/sha256/167112d23a3809a69ce11c590bb2894d6d3e3faf1345fba7aff144166661a3df.patch"
        - "unknown_path:.agentplane/tasks/202608280614-PCBY2N/quality/objects/sha256/8f90f782af46a966c76dd5da65e416c01cf3411622326198570c32a970fec3b3.json"
        - "unknown_path:.agentplane/tasks/202608280614-PCBY2N/quality/objects/sha256/9037cdf98253e70333ede9358d360264a85ee905be64a8723bbdd4ca71e02d4a.json"
        - "unknown_path:.agentplane/tasks/202608280614-PCBY2N/quality/objects/sha256/b36787aabcc52d981eca63d4e3af434e33107ed9ccf1ae128be481174364df82.json"
        - "unknown_path:.agentplane/tasks/202608280614-PCBY2N/supervision/declared-checks.json"
        - "unknown_path:.agentplane/tasks/202608280614-PCBY2N/supervision/implementation-evidence.json"
        - "unknown_path:.agentplane/tasks/202608280614-PCBY2N/verification/20260828112857349-7df3e4f50a81c6b3.json"
        - "unknown_path:.agentplane/tasks/202608281151-WQ89A1/blueprint/resolved-snapshot.json"
        - "unknown_path:.agentplane/tasks/202608281151-WQ89A1/pr/diffstat.txt"
        - "unknown_path:.agentplane/tasks/202608281151-WQ89A1/pr/github-title.txt"
        - "unknown_path:.agentplane/tasks/202608281151-WQ89A1/pr/meta.json"
        - "unknown_path:.agentplane/tasks/202608281151-WQ89A1/quality/20260828-150601429-recovery-context/evaluator-evidence-manifest.json"
        - "unknown_path:.agentplane/tasks/202608281151-WQ89A1/quality/20260828-150601429-recovery-context/evaluator-result.json"
        - "unknown_path:.agentplane/tasks/202608281151-WQ89A1/quality/20260828-150601429-recovery-context/evaluator-work-order.json"
        - "unknown_path:.agentplane/tasks/202608281151-WQ89A1/quality/20260828-150601429-recovery-context/quality-report.json"
        - "unknown_path:.agentplane/tasks/202608281151-WQ89A1/quality/objects/sha256/43169d59cb987746b213286a613126ae2137afffaf804712307b1f2b3a741c91.json"
        - "unknown_path:.agentplane/tasks/202608281151-WQ89A1/quality/objects/sha256/82ffda48c5bd3c808954f2b5392fefca5582063c40c2e392ae8e7400dca3a781.json"
        - "unknown_path:.agentplane/tasks/202608281151-WQ89A1/quality/objects/sha256/9037cdf98253e70333ede9358d360264a85ee905be64a8723bbdd4ca71e02d4a.json"
        - "unknown_path:.agentplane/tasks/202608281151-WQ89A1/quality/objects/sha256/98f3e36b297b1437355f74e2067b979339e47078ca441a1b89e73b498e0029e9.patch"
        - "unknown_path:.agentplane/tasks/202608281151-WQ89A1/supervision/declared-checks.json"
        - "unknown_path:.agentplane/tasks/202608281151-WQ89A1/supervision/implementation-evidence.json"
        - "unknown_path:.agentplane/tasks/202608281151-WQ89A1/verification/20260828150529537-22af9751a01470a1.json"
        - "unknown_path:.agentplane/tasks/202608290844-7JCQPF/blueprint/resolved-snapshot.json"
        - "unknown_path:.agentplane/tasks/202608290844-7JCQPF/pr/diffstat.txt"
        - "unknown_path:.agentplane/tasks/202608290844-7JCQPF/pr/github-title.txt"
        - "unknown_path:.agentplane/tasks/202608290844-7JCQPF/pr/meta.json"
        - "unknown_path:.agentplane/tasks/202608290844-7JCQPF/quality/20260829-091527574-recovery-context/evaluator-evidence-manifest.json"
        - "unknown_path:.agentplane/tasks/202608290844-7JCQPF/quality/20260829-091527574-recovery-context/evaluator-result.json"
        - "unknown_path:.agentplane/tasks/202608290844-7JCQPF/quality/20260829-091527574-recovery-context/evaluator-work-order.json"
        - "unknown_path:.agentplane/tasks/202608290844-7JCQPF/quality/20260829-091527574-recovery-context/quality-report.json"
        - "unknown_path:.agentplane/tasks/202608290844-7JCQPF/quality/20260829-135755737-recovery-context/evaluator-evidence-manifest.json"
        - "unknown_path:.agentplane/tasks/202608290844-7JCQPF/quality/20260829-135755737-recovery-context/evaluator-result.json"
        - "unknown_path:.agentplane/tasks/202608290844-7JCQPF/quality/20260829-135755737-recovery-context/evaluator-work-order.json"
        - "unknown_path:.agentplane/tasks/202608290844-7JCQPF/quality/20260829-135755737-recovery-context/quality-report.json"
        - "unknown_path:.agentplane/tasks/202608290844-7JCQPF/quality/20260829-154051921-recovery-context/evaluator-evidence-manifest.json"
        - "unknown_path:.agentplane/tasks/202608290844-7JCQPF/quality/20260829-154051921-recovery-context/evaluator-work-order.json"
        - "unknown_path:.agentplane/tasks/202608290844-7JCQPF/quality/20260829-154257984-recovery-context/evaluator-evidence-manifest.json"
        - "unknown_path:.agentplane/tasks/202608290844-7JCQPF/quality/20260829-154257984-recovery-context/evaluator-work-order.json"
        - "unknown_path:.agentplane/tasks/202608290844-7JCQPF/quality/20260829-154622554-recovery-context/evaluator-evidence-manifest.json"
        - "unknown_path:.agentplane/tasks/202608290844-7JCQPF/quality/20260829-154622554-recovery-context/evaluator-result.json"
        - "unknown_path:.agentplane/tasks/202608290844-7JCQPF/quality/20260829-154622554-recovery-context/evaluator-work-order.json"
        - "unknown_path:.agentplane/tasks/202608290844-7JCQPF/quality/20260829-154622554-recovery-context/quality-report.json"
        - "unknown_path:.agentplane/tasks/202608290844-7JCQPF/quality/20260829-165628160-recovery-context/evaluator-evidence-manifest.json"
        - "unknown_path:.agentplane/tasks/202608290844-7JCQPF/quality/20260829-165628160-recovery-context/evaluator-result.json"
        - "unknown_path:.agentplane/tasks/202608290844-7JCQPF/quality/20260829-165628160-recovery-context/evaluator-work-order.json"
        - "unknown_path:.agentplane/tasks/202608290844-7JCQPF/quality/20260829-165628160-recovery-context/quality-report.json"
        - "unknown_path:.agentplane/tasks/202608290844-7JCQPF/quality/objects/sha256/00cb8f6790a2d104fb8674882268758d2e941322ed8e92c3b5dc9e428fd8dce4.patch"
        - "unknown_path:.agentplane/tasks/202608290844-7JCQPF/quality/objects/sha256/094a699c910341a58afcb15c22105ae1b76587fcc875a385ab29d52916473829.json"
        - "unknown_path:.agentplane/tasks/202608290844-7JCQPF/quality/objects/sha256/0ac40dd9a245bdd7a6904bf832c36d53c5e8cf0e6f16f59e6ecea9c0f6dd8abc.json"
        - "unknown_path:.agentplane/tasks/202608290844-7JCQPF/quality/objects/sha256/2258e008d9ba7a086ad71c563a02b042962c03b0c5c940f4ea42f62bbb0eb012.patch"
        - "unknown_path:.agentplane/tasks/202608290844-7JCQPF/quality/objects/sha256/4f0352c5d6a2182a46e1c6f73e77b5f2708ad05adf67f8236213cab6bf722e40.patch"
        - "unknown_path:.agentplane/tasks/202608290844-7JCQPF/quality/objects/sha256/9037cdf98253e70333ede9358d360264a85ee905be64a8723bbdd4ca71e02d4a.json"
        - "unknown_path:.agentplane/tasks/202608290844-7JCQPF/quality/objects/sha256/bf246ecc6aed6a80440a3a0197ee6a33faa53b12ac072fd16ecde736ee4d7a69.json"
        - "unknown_path:.agentplane/tasks/202608290844-7JCQPF/quality/objects/sha256/e36dbbcacb05dd26f53c2a444202d9451db4063b531311834485b11970ed6072.json"
        - "unknown_path:.agentplane/tasks/202608290844-7JCQPF/quality/objects/sha256/eba6a62437a3e1722cad7b6d477654c71e7c4ecea013a52313e862621c811e58.patch"
        - "unknown_path:.agentplane/tasks/202608290844-7JCQPF/quality/objects/sha256/f5a5751e9d32d9d24fb39379371b7291cd6420c99d10ecf8f0283eb09e84094e.json"
        - "unknown_path:.agentplane/tasks/202608290844-7JCQPF/supervision/declared-checks.json"
        - "unknown_path:.agentplane/tasks/202608290844-7JCQPF/supervision/implementation-evidence.json"
        - "unknown_path:.agentplane/tasks/202608290844-7JCQPF/verification/20260829090048568-8570d238d5b793a3.json"
        - "unknown_path:.agentplane/tasks/202608290844-7JCQPF/verification/20260829091431764-e529c93dd7f5a93e.json"
        - "unknown_path:.agentplane/tasks/202608290844-7JCQPF/verification/20260829091815695-7a192569682c3990.json"
        - "unknown_path:.agentplane/tasks/202608290844-7JCQPF/verification/20260829121518627-935aca8b41573d83.json"
        - "unknown_path:.agentplane/tasks/202608290844-7JCQPF/verification/20260829133155703-ba3bf05e6e8ab9b2.json"
        - "unknown_path:.agentplane/tasks/202608290844-7JCQPF/verification/20260829135723903-1e369e8c538b8c1d.json"
        - "unknown_path:.agentplane/tasks/202608290844-7JCQPF/verification/20260829140319538-403bd5a3f235102c.json"
        - "unknown_path:.agentplane/tasks/202608290844-7JCQPF/verification/20260829142522018-696e567acb8481c2.json"
        - "unknown_path:.agentplane/tasks/202608290844-7JCQPF/verification/20260829142603828-ccd96a6a223662af.json"
        - "unknown_path:.agentplane/tasks/202608290844-7JCQPF/verification/20260829143621259-88a931bdab985c02.json"
        - "unknown_path:.agentplane/tasks/202608290844-7JCQPF/verification/20260829144725405-280eceee3679149d.json"
        - "unknown_path:.agentplane/tasks/202608290844-7JCQPF/verification/20260829145124375-d0d20769bc9e2777.json"
        - "unknown_path:.agentplane/tasks/202608290844-7JCQPF/verification/20260829161700623-370a4f491fb5a800.json"
        - "unknown_path:.agentplane/tasks/202608290844-7JCQPF/verification/20260829165606401-4bf622d61e8adf7c.json"
        - "unknown_path:.agentplane/tasks/202608290920-1PZGG8/blueprint/resolved-snapshot.json"
        - "unknown_path:.agentplane/tasks/202608290920-1PZGG8/pr/diffstat.txt"
        - "unknown_path:.agentplane/tasks/202608290920-1PZGG8/pr/github-title.txt"
        - "unknown_path:.agentplane/tasks/202608290920-1PZGG8/pr/meta.json"
        - "unknown_path:.agentplane/tasks/202608290920-1PZGG8/quality/20260829-100207338-recovery-context/evaluator-evidence-manifest.json"
        - "unknown_path:.agentplane/tasks/202608290920-1PZGG8/quality/20260829-100207338-recovery-context/evaluator-follow-up.json"
        - "unknown_path:.agentplane/tasks/202608290920-1PZGG8/quality/20260829-100207338-recovery-context/evaluator-result.json"
        - "unknown_path:.agentplane/tasks/202608290920-1PZGG8/quality/20260829-100207338-recovery-context/evaluator-work-order.json"
        - "unknown_path:.agentplane/tasks/202608290920-1PZGG8/quality/20260829-100207338-recovery-context/quality-report.json"
        - "unknown_path:.agentplane/tasks/202608290920-1PZGG8/quality/20260829-112038164-recovery-context/evaluator-evidence-manifest.json"
        - "unknown_path:.agentplane/tasks/202608290920-1PZGG8/quality/20260829-112038164-recovery-context/evaluator-result.json"
        - "unknown_path:.agentplane/tasks/202608290920-1PZGG8/quality/20260829-112038164-recovery-context/evaluator-work-order.json"
        - "unknown_path:.agentplane/tasks/202608290920-1PZGG8/quality/20260829-112038164-recovery-context/quality-report.json"
        - "unknown_path:.agentplane/tasks/202608290920-1PZGG8/quality/objects/sha256/33ccc1d6b91deeda43925dda11bcb7871d4177f0b26d9f3f8f154203d618a3bf.patch"
        - "unknown_path:.agentplane/tasks/202608290920-1PZGG8/quality/objects/sha256/5bf18a85abd14fe0a9a2152613220bc2ad006608710b4b329837619185c0189d.json"
        - "unknown_path:.agentplane/tasks/202608290920-1PZGG8/quality/objects/sha256/6238bed33ff5edad09db6bb76534efbfd68babd7775a75c0db7b0b53a128a033.patch"
        - "unknown_path:.agentplane/tasks/202608290920-1PZGG8/quality/objects/sha256/6ff4eeeac1fb74deb063645fd271923073c9a9756944f516b8d10fb36ad1dcfd.json"
        - "unknown_path:.agentplane/tasks/202608290920-1PZGG8/quality/objects/sha256/9037cdf98253e70333ede9358d360264a85ee905be64a8723bbdd4ca71e02d4a.json"
        - "unknown_path:.agentplane/tasks/202608290920-1PZGG8/quality/objects/sha256/e35839039295af7993b80adfdaa63da9729d59a2955432cd06975115f9057010.json"
        - "unknown_path:.agentplane/tasks/202608290920-1PZGG8/supervision/declared-checks.json"
        - "unknown_path:.agentplane/tasks/202608290920-1PZGG8/supervision/implementation-evidence.json"
        - "unknown_path:.agentplane/tasks/202608290920-1PZGG8/verification/20260829093430895-6606b487cced4039.json"
        - "unknown_path:.agentplane/tasks/202608290920-1PZGG8/verification/20260829105535831-b4c997c8906f47d0.json"
        - "unknown_path:.agentplane/tasks/202608290920-1PZGG8/verification/20260829105705983-3742ca4441ecc2c3.json"
        - "unknown_path:.agentplane/tasks/202608290920-1PZGG8/verification/20260829105843774-eef5a01e10b276a9.json"
        - "unknown_path:.agentplane/tasks/202608290920-1PZGG8/verification/20260829110002485-b669a1777bc06949.json"
        - "unknown_path:.agentplane/tasks/202608290920-1PZGG8/verification/20260829112024099-2dc4de9558ceb003.json"
        - "unknown_path:.agentplane/tasks/202608291005-K5TG4D/blueprint/resolved-snapshot.json"
        - "unknown_path:.agentplane/tasks/202608291005-K5TG4D/pr/diffstat.txt"
        - "unknown_path:.agentplane/tasks/202608291005-K5TG4D/pr/github-title.txt"
        - "unknown_path:.agentplane/tasks/202608291005-K5TG4D/pr/meta.json"
        - "unknown_path:.agentplane/tasks/202608291005-K5TG4D/quality/20260829-103229021-recovery-context/evaluator-evidence-manifest.json"
        - "unknown_path:.agentplane/tasks/202608291005-K5TG4D/quality/20260829-103229021-recovery-context/evaluator-follow-up.json"
        - "unknown_path:.agentplane/tasks/202608291005-K5TG4D/quality/20260829-103229021-recovery-context/evaluator-result.json"
        - "unknown_path:.agentplane/tasks/202608291005-K5TG4D/quality/20260829-103229021-recovery-context/evaluator-work-order.json"
        - "unknown_path:.agentplane/tasks/202608291005-K5TG4D/quality/20260829-103229021-recovery-context/quality-report.json"
        - "unknown_path:.agentplane/tasks/202608291005-K5TG4D/quality/20260829-104022155-recovery-context/evaluator-evidence-manifest.json"
        - "unknown_path:.agentplane/tasks/202608291005-K5TG4D/quality/20260829-104022155-recovery-context/evaluator-result.json"
        - "unknown_path:.agentplane/tasks/202608291005-K5TG4D/quality/20260829-104022155-recovery-context/evaluator-work-order.json"
        - "unknown_path:.agentplane/tasks/202608291005-K5TG4D/quality/20260829-104022155-recovery-context/quality-report.json"
        - "unknown_path:.agentplane/tasks/202608291005-K5TG4D/quality/20260829-173248762-recovery-context/evaluator-evidence-manifest.json"
        - "unknown_path:.agentplane/tasks/202608291005-K5TG4D/quality/20260829-173248762-recovery-context/evaluator-follow-up.json"
        - "unknown_path:.agentplane/tasks/202608291005-K5TG4D/quality/20260829-173248762-recovery-context/evaluator-result.json"
        - "unknown_path:.agentplane/tasks/202608291005-K5TG4D/quality/20260829-173248762-recovery-context/evaluator-work-order.json"
        - "unknown_path:.agentplane/tasks/202608291005-K5TG4D/quality/20260829-173248762-recovery-context/quality-report.json"
        - "unknown_path:.agentplane/tasks/202608291005-K5TG4D/quality/20260829-175010445-recovery-context/evaluator-evidence-manifest.json"
        - "unknown_path:.agentplane/tasks/202608291005-K5TG4D/quality/20260829-175010445-recovery-context/evaluator-result.json"
        - "unknown_path:.agentplane/tasks/202608291005-K5TG4D/quality/20260829-175010445-recovery-context/evaluator-work-order.json"
        - "unknown_path:.agentplane/tasks/202608291005-K5TG4D/quality/20260829-175010445-recovery-context/quality-report.json"
        - "unknown_path:.agentplane/tasks/202608291005-K5TG4D/quality/20260829-182509713-recovery-context/evaluator-evidence-manifest.json"
        - "unknown_path:.agentplane/tasks/202608291005-K5TG4D/quality/20260829-182509713-recovery-context/evaluator-result.json"
        - "unknown_path:.agentplane/tasks/202608291005-K5TG4D/quality/20260829-182509713-recovery-context/evaluator-work-order.json"
        - "unknown_path:.agentplane/tasks/202608291005-K5TG4D/quality/20260829-182509713-recovery-context/quality-report.json"
        - "unknown_path:.agentplane/tasks/202608291005-K5TG4D/quality/20260829-185822288-recovery-context/evaluator-evidence-manifest.json"
        - "unknown_path:.agentplane/tasks/202608291005-K5TG4D/quality/20260829-185822288-recovery-context/evaluator-result.json"
        - "unknown_path:.agentplane/tasks/202608291005-K5TG4D/quality/20260829-185822288-recovery-context/evaluator-work-order.json"
        - "unknown_path:.agentplane/tasks/202608291005-K5TG4D/quality/20260829-185822288-recovery-context/quality-report.json"
        - "unknown_path:.agentplane/tasks/202608291005-K5TG4D/quality/objects/sha256/03778a2ec59a89f86c77156b5c41749d8a0acbbdbda469294abad9d305f10155.json"
        - "unknown_path:.agentplane/tasks/202608291005-K5TG4D/quality/objects/sha256/07880f19b498431ef1d30b34fe2764e8b0fc650f427c040a2f0edc42c28f3b77.patch"
        - "unknown_path:.agentplane/tasks/202608291005-K5TG4D/quality/objects/sha256/0ced6f2c554a98af94d8e04123277a903da54392ebd92f3890c3a1c95ad75119.patch"
        - "unknown_path:.agentplane/tasks/202608291005-K5TG4D/quality/objects/sha256/2c17fdb65687181ba468e5cc9c2c3f984594a087910177a2a5891e3d95c0b2bb.patch"
        - "unknown_path:.agentplane/tasks/202608291005-K5TG4D/quality/objects/sha256/3bc81fab9e1463c5f3fc60e5327889cf576ad0e6813951c0f8f1c2aa2eb9ee55.patch"
        - "unknown_path:.agentplane/tasks/202608291005-K5TG4D/quality/objects/sha256/3da9d9fcb461bfc780a881e70453aaccb486b17c451b01ad89eb2b0eaa86b047.json"
        - "unknown_path:.agentplane/tasks/202608291005-K5TG4D/quality/objects/sha256/69ada31950ca4db1dad4000541000ad3a3ab1150d54f116721dd24d4e2524dcc.json"
        - "unknown_path:.agentplane/tasks/202608291005-K5TG4D/quality/objects/sha256/73eb709075c74a980968c0120a0294a67f005c9c2ff4ce66b7d285a631ceec90.json"
        - "unknown_path:.agentplane/tasks/202608291005-K5TG4D/quality/objects/sha256/7dc71118b2a8cd17ec7401ec0c3f4bdf02a52e16ca3172258eb6ae28fb15e051.json"
        - "unknown_path:.agentplane/tasks/202608291005-K5TG4D/quality/objects/sha256/8d06a0bda439bd3cbb2a6a861bb3d632c3591570cb548e661e456561e6ebd0e3.patch"
        - "unknown_path:.agentplane/tasks/202608291005-K5TG4D/quality/objects/sha256/9037cdf98253e70333ede9358d360264a85ee905be64a8723bbdd4ca71e02d4a.json"
        - "unknown_path:.agentplane/tasks/202608291005-K5TG4D/quality/objects/sha256/991fe4f8cfd40b027fed1e34442956c77ba8324246953e0dfae571500cb2b31d.patch"
        - "unknown_path:.agentplane/tasks/202608291005-K5TG4D/quality/objects/sha256/c97155edadb265cb8b9e27094be1f5b53e338048ada37daee80cc3249047ec4f.json"
        - "unknown_path:.agentplane/tasks/202608291005-K5TG4D/quality/objects/sha256/ebc86feacec7bdf43d9a1fdbf283a72e4634bef2dfceb9d03c2812644d0bc6fe.json"
        - "unknown_path:.agentplane/tasks/202608291005-K5TG4D/supervision/declared-checks.json"
        - "unknown_path:.agentplane/tasks/202608291005-K5TG4D/supervision/implementation-evidence.json"
        - "unknown_path:.agentplane/tasks/202608291005-K5TG4D/verification/20260829102927784-2ba47b70cf364a12.json"
        - "unknown_path:.agentplane/tasks/202608291005-K5TG4D/verification/20260829103744095-ab63071946986abe.json"
        - "unknown_path:.agentplane/tasks/202608291005-K5TG4D/verification/20260829104004712-22365c9597c0e6ce.json"
        - "unknown_path:.agentplane/tasks/202608291005-K5TG4D/verification/20260829171951260-f6b36db68eb2b50b.json"
        - "unknown_path:.agentplane/tasks/202608291005-K5TG4D/verification/20260829172303993-9558dcfb624109e6.json"
        - "unknown_path:.agentplane/tasks/202608291005-K5TG4D/verification/20260829173023681-a890bff98f1f1613.json"
        - "unknown_path:.agentplane/tasks/202608291005-K5TG4D/verification/20260829173606626-1d584fb7c8bed007.json"
        - "unknown_path:.agentplane/tasks/202608291005-K5TG4D/verification/20260829174126559-55291239fcb3e058.json"
        - "unknown_path:.agentplane/tasks/202608291005-K5TG4D/verification/20260829174619560-6bb5d9fd8340f4b4.json"
        - "unknown_path:.agentplane/tasks/202608291005-K5TG4D/verification/20260829174953384-9a1611a4242d4cd2.json"
        - "unknown_path:.agentplane/tasks/202608291005-K5TG4D/verification/20260829182451924-4a24553f3cae3f0f.json"
        - "unknown_path:.agentplane/tasks/202608291005-K5TG4D/verification/20260829184121098-79ba9f5978aab118.json"
        - "unknown_path:.agentplane/tasks/202608291005-K5TG4D/verification/20260829185804313-ec46cd710c0a1ae8.json"
        - "unknown_path:.agentplane/tasks/202608291505-F5AN0W/blueprint/resolved-snapshot.json"
        - "unknown_path:.agentplane/tasks/202608291505-F5AN0W/pr/diffstat.txt"
        - "unknown_path:.agentplane/tasks/202608291505-F5AN0W/pr/github-title.txt"
        - "unknown_path:.agentplane/tasks/202608291505-F5AN0W/pr/meta.json"
        - "unknown_path:.agentplane/tasks/202608291505-F5AN0W/quality/20260829-151703472-recovery-context/evaluator-evidence-manifest.json"
        - "unknown_path:.agentplane/tasks/202608291505-F5AN0W/quality/20260829-151703472-recovery-context/evaluator-result.json"
        - "unknown_path:.agentplane/tasks/202608291505-F5AN0W/quality/20260829-151703472-recovery-context/evaluator-work-order.json"
        - "unknown_path:.agentplane/tasks/202608291505-F5AN0W/quality/20260829-151703472-recovery-context/quality-report.json"
        - "unknown_path:.agentplane/tasks/202608291505-F5AN0W/quality/objects/sha256/34de800803c95065a60ed554ec20ee9e458e08e3eba91b1e37ed7a5fc6939a61.json"
        - "unknown_path:.agentplane/tasks/202608291505-F5AN0W/quality/objects/sha256/3be09f0b87c195e91069dbd310c3854392dd52abe1630e89c3c0b44acfd4f669.patch"
        - "unknown_path:.agentplane/tasks/202608291505-F5AN0W/quality/objects/sha256/4ed68c6fd1d0c009d994cd956e8cb679ed2f606ddcae63c2e86222ac1634e772.json"
        - "unknown_path:.agentplane/tasks/202608291505-F5AN0W/quality/objects/sha256/9037cdf98253e70333ede9358d360264a85ee905be64a8723bbdd4ca71e02d4a.json"
        - "unknown_path:.agentplane/tasks/202608291505-F5AN0W/supervision/declared-checks.json"
        - "unknown_path:.agentplane/tasks/202608291505-F5AN0W/supervision/implementation-evidence.json"
        - "unknown_path:.agentplane/tasks/202608291505-F5AN0W/verification/20260829151633691-2b8fca041d5695de.json"
        - "unknown_path:.agentplane/tasks/202608292032-1K47B8/blueprint/resolved-snapshot.json"
        - "unknown_path:.agentplane/tasks/202608292032-1K47B8/pr/diffstat.txt"
        - "unknown_path:.agentplane/tasks/202608292032-1K47B8/pr/github-title.txt"
        - "unknown_path:.agentplane/tasks/202608292032-1K47B8/pr/meta.json"
        - "unknown_path:.agentplane/tasks/202608292032-1K47B8/quality/20260829-221228710-recovery-context/evaluator-evidence-manifest.json"
        - "unknown_path:.agentplane/tasks/202608292032-1K47B8/quality/20260829-221228710-recovery-context/evaluator-result.json"
        - "unknown_path:.agentplane/tasks/202608292032-1K47B8/quality/20260829-221228710-recovery-context/evaluator-work-order.json"
        - "unknown_path:.agentplane/tasks/202608292032-1K47B8/quality/20260829-221228710-recovery-context/quality-report.json"
        - "unknown_path:.agentplane/tasks/202608292032-1K47B8/quality/20260830-014956776-recovery-context/evaluator-evidence-manifest.json"
        - "unknown_path:.agentplane/tasks/202608292032-1K47B8/quality/20260830-014956776-recovery-context/evaluator-follow-up.json"
        - "unknown_path:.agentplane/tasks/202608292032-1K47B8/quality/20260830-014956776-recovery-context/evaluator-result.json"
        - "unknown_path:.agentplane/tasks/202608292032-1K47B8/quality/20260830-014956776-recovery-context/evaluator-work-order.json"
        - "unknown_path:.agentplane/tasks/202608292032-1K47B8/quality/20260830-014956776-recovery-context/quality-report.json"
        - "unknown_path:.agentplane/tasks/202608292032-1K47B8/quality/20260830-020852586-recovery-context/evaluator-evidence-manifest.json"
        - "unknown_path:.agentplane/tasks/202608292032-1K47B8/quality/20260830-020852586-recovery-context/evaluator-follow-up.json"
        - "unknown_path:.agentplane/tasks/202608292032-1K47B8/quality/20260830-020852586-recovery-context/evaluator-result.json"
        - "unknown_path:.agentplane/tasks/202608292032-1K47B8/quality/20260830-020852586-recovery-context/evaluator-work-order.json"
        - "unknown_path:.agentplane/tasks/202608292032-1K47B8/quality/20260830-020852586-recovery-context/quality-report.json"
        - "unknown_path:.agentplane/tasks/202608292032-1K47B8/quality/20260830-022616722-recovery-context/evaluator-evidence-manifest.json"
        - "unknown_path:.agentplane/tasks/202608292032-1K47B8/quality/20260830-022616722-recovery-context/evaluator-follow-up.json"
        - "unknown_path:.agentplane/tasks/202608292032-1K47B8/quality/20260830-022616722-recovery-context/evaluator-result.json"
        - "unknown_path:.agentplane/tasks/202608292032-1K47B8/quality/20260830-022616722-recovery-context/evaluator-work-order.json"
        - "unknown_path:.agentplane/tasks/202608292032-1K47B8/quality/20260830-022616722-recovery-context/quality-report.json"
        - "unknown_path:.agentplane/tasks/202608292032-1K47B8/quality/20260830-031507878-recovery-context/evaluator-evidence-manifest.json"
        - "unknown_path:.agentplane/tasks/202608292032-1K47B8/quality/20260830-031507878-recovery-context/evaluator-result.json"
        - "unknown_path:.agentplane/tasks/202608292032-1K47B8/quality/20260830-031507878-recovery-context/evaluator-work-order.json"
        - "unknown_path:.agentplane/tasks/202608292032-1K47B8/quality/20260830-031507878-recovery-context/quality-report.json"
        - "unknown_path:.agentplane/tasks/202608292032-1K47B8/quality/objects/sha256/057b4113ef6c1d87a6a0c3ac3c46939bd871e81dc4f3c1b80129869074842092.patch"
        - "unknown_path:.agentplane/tasks/202608292032-1K47B8/quality/objects/sha256/2b30736d79fa3985a602ca79b8003a85696c1631aa650eb0a69f4b62a313d474.json"
        - "unknown_path:.agentplane/tasks/202608292032-1K47B8/quality/objects/sha256/31eb70979ca99b1b7baf8981a0aa4553f7836924a5a994ef188028919b165c2b.patch"
        - "unknown_path:.agentplane/tasks/202608292032-1K47B8/quality/objects/sha256/3dd6f4403a5f554c55142963371a7073049d6182f7d27407b73e562303e9abce.patch"
        - "unknown_path:.agentplane/tasks/202608292032-1K47B8/quality/objects/sha256/8c21a0dae102df37781ea0703471756a6f4d2d97fcb284160d913ae3a336695e.json"
        - "unknown_path:.agentplane/tasks/202608292032-1K47B8/quality/objects/sha256/9037cdf98253e70333ede9358d360264a85ee905be64a8723bbdd4ca71e02d4a.json"
        - "unknown_path:.agentplane/tasks/202608292032-1K47B8/quality/objects/sha256/9ce711649887bc636881f16928a22670e786265ea0c117f13d2613bc1b6f5fc2.patch"
        - "unknown_path:.agentplane/tasks/202608292032-1K47B8/quality/objects/sha256/a042c1178c6dc91f1dba1c8d49a4edcb23a1ace5fa440eb47fcbe4820e3aeb19.json"
        - "unknown_path:.agentplane/tasks/202608292032-1K47B8/quality/objects/sha256/a1e6b2fe5c8facd48dfc66602704770fca1a35152897611f9d31210b22ee8a67.json"
        - "unknown_path:.agentplane/tasks/202608292032-1K47B8/quality/objects/sha256/cdccd39e524d1c90764685a8edd6ed62359da3abd8661ae465fa779bd9f3d0f9.json"
        - "unknown_path:.agentplane/tasks/202608292032-1K47B8/quality/objects/sha256/d79cfc55ccb00071fa070c6bbd3fdb6f55514df2d3d0381e943934ecaa5a55fc.patch"
        - "unknown_path:.agentplane/tasks/202608292032-1K47B8/quality/objects/sha256/ef17fe668230493a9b07f598b59d087f0c79b80eefbd629aaeadaa33cdb8d767.json"
        - "unknown_path:.agentplane/tasks/202608292032-1K47B8/supervision/declared-checks.json"
        - "unknown_path:.agentplane/tasks/202608292032-1K47B8/supervision/implementation-evidence.json"
        - "unknown_path:.agentplane/tasks/202608292032-1K47B8/verification/20260829204319619-6c577c9c8306a169.json"
        - "unknown_path:.agentplane/tasks/202608292032-1K47B8/verification/20260829210140898-e3d969adc161f644.json"
        - "unknown_path:.agentplane/tasks/202608292032-1K47B8/verification/20260829212246580-d0145ef1b109b582.json"
        - "unknown_path:.agentplane/tasks/202608292032-1K47B8/verification/20260829213703792-b4d5487c553f5a17.json"
        - "unknown_path:.agentplane/tasks/202608292032-1K47B8/verification/20260829214826738-20b5311a327c1579.json"
        - "unknown_path:.agentplane/tasks/202608292032-1K47B8/verification/20260829215542838-893d49886b2f4a8e.json"
        - "unknown_path:.agentplane/tasks/202608292032-1K47B8/verification/20260829221218641-6fb97c97e2e96fa0.json"
        - "unknown_path:.agentplane/tasks/202608292032-1K47B8/verification/20260830003005735-5d60d1d702715321.json"
        - "unknown_path:.agentplane/tasks/202608292032-1K47B8/verification/20260830014945273-2738197afdbf32cb.json"
        - "unknown_path:.agentplane/tasks/202608292032-1K47B8/verification/20260830020840555-6abd518e792f9be0.json"
        - "unknown_path:.agentplane/tasks/202608292032-1K47B8/verification/20260830022602801-f4386fc8af0c0a93.json"
        - "unknown_path:.agentplane/tasks/202608292032-1K47B8/verification/20260830025715800-1f7012fe8ad951d0.json"
        - "unknown_path:.agentplane/tasks/202608292032-1K47B8/verification/20260830031455405-6315535599fc124b.json"
        - "unknown_path:.agentplane/tasks/202608292218-3N0FBK/blueprint/resolved-snapshot.json"
        - "unknown_path:.agentplane/tasks/202608292218-3N0FBK/pr/diffstat.txt"
        - "unknown_path:.agentplane/tasks/202608292218-3N0FBK/pr/github-title.txt"
        - "unknown_path:.agentplane/tasks/202608292218-3N0FBK/pr/meta.json"
        - "unknown_path:.agentplane/tasks/202608292218-3N0FBK/quality/20260829-232019133-recovery-context/evaluator-evidence-manifest.json"
        - "unknown_path:.agentplane/tasks/202608292218-3N0FBK/quality/20260829-232019133-recovery-context/evaluator-result.json"
        - "unknown_path:.agentplane/tasks/202608292218-3N0FBK/quality/20260829-232019133-recovery-context/evaluator-work-order.json"
        - "unknown_path:.agentplane/tasks/202608292218-3N0FBK/quality/20260829-232019133-recovery-context/quality-report.json"
        - "unknown_path:.agentplane/tasks/202608292218-3N0FBK/quality/objects/sha256/6508f2281bdb76c7a51465f00997415cbb1144f19fa37a27045d5eb8eeaa13cf.patch"
        - "unknown_path:.agentplane/tasks/202608292218-3N0FBK/quality/objects/sha256/705fd23cea4f0661155d847cbe29aa51c0c7ce19052019f39df3424f3d34d10d.json"
        - "unknown_path:.agentplane/tasks/202608292218-3N0FBK/quality/objects/sha256/9037cdf98253e70333ede9358d360264a85ee905be64a8723bbdd4ca71e02d4a.json"
        - "unknown_path:.agentplane/tasks/202608292218-3N0FBK/quality/objects/sha256/9f512f0819486738a0914d14aafef8ee94d25191007e8e94c679c6aedca6fbd9.json"
        - "unknown_path:.agentplane/tasks/202608292218-3N0FBK/supervision/declared-checks.json"
        - "unknown_path:.agentplane/tasks/202608292218-3N0FBK/supervision/implementation-evidence.json"
        - "unknown_path:.agentplane/tasks/202608292218-3N0FBK/verification/20260829223458865-779a4c712ea93918.json"
        - "unknown_path:.agentplane/tasks/202608292218-3N0FBK/verification/20260829224625339-315ba0801ec5e6ea.json"
        - "unknown_path:.agentplane/tasks/202608292218-3N0FBK/verification/20260829225800434-b5f93cf6b11f2c61.json"
        - "unknown_path:.agentplane/tasks/202608292218-3N0FBK/verification/20260829230555501-2ec025e699fda236.json"
        - "unknown_path:.agentplane/tasks/202608292218-3N0FBK/verification/20260829232002016-276e3b6422ad5f09.json"
        - "unknown_path:.agentplane/tasks/202608300119-ZHYXRS/blueprint/resolved-snapshot.json"
        - "unknown_path:.agentplane/tasks/202608300119-ZHYXRS/pr/diffstat.txt"
        - "unknown_path:.agentplane/tasks/202608300119-ZHYXRS/pr/github-title.txt"
        - "unknown_path:.agentplane/tasks/202608300119-ZHYXRS/pr/meta.json"
        - "unknown_path:.agentplane/tasks/202608300119-ZHYXRS/quality/20260830-014145339-recovery-context/evaluator-evidence-manifest.json"
        - "unknown_path:.agentplane/tasks/202608300119-ZHYXRS/quality/20260830-014145339-recovery-context/evaluator-result.json"
        - "unknown_path:.agentplane/tasks/202608300119-ZHYXRS/quality/20260830-014145339-recovery-context/evaluator-work-order.json"
        - "unknown_path:.agentplane/tasks/202608300119-ZHYXRS/quality/20260830-014145339-recovery-context/quality-report.json"
        - "unknown_path:.agentplane/tasks/202608300119-ZHYXRS/quality/20260830-022732861-recovery-context/evaluator-evidence-manifest.json"
        - "unknown_path:.agentplane/tasks/202608300119-ZHYXRS/quality/20260830-022732861-recovery-context/evaluator-result.json"
        - "unknown_path:.agentplane/tasks/202608300119-ZHYXRS/quality/20260830-022732861-recovery-context/evaluator-work-order.json"
        - "unknown_path:.agentplane/tasks/202608300119-ZHYXRS/quality/20260830-022732861-recovery-context/quality-report.json"
        - "unknown_path:.agentplane/tasks/202608300119-ZHYXRS/quality/objects/sha256/085818fb482ed6c75bdcd72074d2a06cd54a8963642055db58f4d5f95a5f417c.json"
        - "unknown_path:.agentplane/tasks/202608300119-ZHYXRS/quality/objects/sha256/0ae8f7054187226c4378474e61a236b83e14b480899aed7def309c417740ebc8.json"
        - "unknown_path:.agentplane/tasks/202608300119-ZHYXRS/quality/objects/sha256/68cd886e72e9a681f60c9770ffb31cc09b30751c52abfe3b9d62753ed744f3e9.json"
        - "unknown_path:.agentplane/tasks/202608300119-ZHYXRS/quality/objects/sha256/9037cdf98253e70333ede9358d360264a85ee905be64a8723bbdd4ca71e02d4a.json"
        - "unknown_path:.agentplane/tasks/202608300119-ZHYXRS/quality/objects/sha256/e4594a5165434d84043609c114251fb1d166c7612623342d185fb34239acfb29.patch"
        - "unknown_path:.agentplane/tasks/202608300119-ZHYXRS/quality/objects/sha256/efec60e7d3b43883689358d77d2278cfa5e0346ad57e5c8695bdc74cecff1470.patch"
        - "unknown_path:.agentplane/tasks/202608300119-ZHYXRS/supervision/declared-checks.json"
        - "unknown_path:.agentplane/tasks/202608300119-ZHYXRS/supervision/implementation-evidence.json"
        - "unknown_path:.agentplane/tasks/202608300119-ZHYXRS/verification/20260830013042448-9879d2e0317ba8ff.json"
        - "unknown_path:.agentplane/tasks/202608300119-ZHYXRS/verification/20260830014106431-a78ca4036e517933.json"
        - "unknown_path:.agentplane/tasks/202608300119-ZHYXRS/verification/20260830021428357-1faa3b8361b33f16.json"
        - "unknown_path:.agentplane/tasks/202608300119-ZHYXRS/verification/20260830022721719-75aba1a0c8379039.json"
        - "unknown_path:packages/agentplane/src/cli/__snapshots__/run-cli.core.help-snap.test.ts.snap"
      execution_groups:
        - "docs-schema"
        - "core"
        - "runtime"
        - "cli"
      observed:
        changed_components:
          - ".agentplane"
          - "depcruise.config.cjs"
          - "docs"
          - "packages/agentplane"
          - "packages/core"
          - "packages/testkit"
          - "scripts"
          - "website"
        changed_files:
          - ".agentplane/policy/incidents.md"
          - ".agentplane/tasks/202608260947-C6WV4T/README.md"
          - ".agentplane/tasks/202608260947-C6WV4T/blueprint/resolved-snapshot.json"
          - ".agentplane/tasks/202608260947-C6WV4T/pr/diffstat.txt"
          - ".agentplane/tasks/202608260947-C6WV4T/pr/github-body.md"
          - ".agentplane/tasks/202608260947-C6WV4T/pr/github-title.txt"
          - ".agentplane/tasks/202608260947-C6WV4T/pr/meta.json"
          - ".agentplane/tasks/202608260947-C6WV4T/pr/review.md"
          - ".agentplane/tasks/202608260947-C6WV4T/quality/20260826-105227686-recovery-context/evaluator-evidence-manifest.json"
          - ".agentplane/tasks/202608260947-C6WV4T/quality/20260826-105227686-recovery-context/evaluator-opinion.md"
          - ".agentplane/tasks/202608260947-C6WV4T/quality/20260826-105227686-recovery-context/evaluator-result.json"
          - ".agentplane/tasks/202608260947-C6WV4T/quality/20260826-105227686-recovery-context/evaluator-work-order.json"
          - ".agentplane/tasks/202608260947-C6WV4T/quality/20260826-105227686-recovery-context/quality-report.json"
          - ".agentplane/tasks/202608260947-C6WV4T/quality/objects/sha256/28aeeca59baccc008fa96c5a1bba3e1c91e889eb8923ebefbcb1b317c408ece3.json"
          - ".agentplane/tasks/202608260947-C6WV4T/quality/objects/sha256/36e8a2a2c1b50ad817232abbdf1c90c83549c46da46de70003fc3d19c5b09703.md"
          - ".agentplane/tasks/202608260947-C6WV4T/quality/objects/sha256/9037cdf98253e70333ede9358d360264a85ee905be64a8723bbdd4ca71e02d4a.json"
          - ".agentplane/tasks/202608260947-C6WV4T/quality/objects/sha256/a39e66da8555d830d71298b5c64fbb5d3f50103573bc66640d89a196ba0621f8.json"
          - ".agentplane/tasks/202608260947-C6WV4T/quality/objects/sha256/ed5ff1bc96ab14843609d69b953efe9aa1d3a4216026cfbf5f6e2c2c67562c10.patch"
          - ".agentplane/tasks/202608260947-C6WV4T/supervision/declared-checks.json"
          - ".agentplane/tasks/202608260947-C6WV4T/supervision/implementation-evidence.json"
          - ".agentplane/tasks/202608260947-C6WV4T/verification/20260826101202781-c0efa3be2c04108a.json"
          - ".agentplane/tasks/202608260947-C6WV4T/verification/20260826102051415-1a60d2fff4f33f35.json"
          - ".agentplane/tasks/202608260947-C6WV4T/verification/20260826103831301-084955658270d1e2.json"
          - ".agentplane/tasks/202608260947-C6WV4T/verification/20260826104850237-742d0ef8d9576f58.json"
          - ".agentplane/tasks/202608261249-BXQZ97/README.md"
          - ".agentplane/tasks/202608261249-BXQZ97/blueprint/resolved-snapshot.json"
          - ".agentplane/tasks/202608261249-BXQZ97/pr/diffstat.txt"
          - ".agentplane/tasks/202608261249-BXQZ97/pr/github-body.md"
          - ".agentplane/tasks/202608261249-BXQZ97/pr/github-title.txt"
          - ".agentplane/tasks/202608261249-BXQZ97/pr/meta.json"
          - ".agentplane/tasks/202608261249-BXQZ97/pr/review.md"
          - ".agentplane/tasks/202608261249-BXQZ97/quality/20260826-154337837-recovery-context/evaluator-evidence-manifest.json"
          - ".agentplane/tasks/202608261249-BXQZ97/quality/20260826-154337837-recovery-context/evaluator-work-order.json"
          - ".agentplane/tasks/202608261249-BXQZ97/quality/20260826-154349579-recovery-context/evaluator-evidence-manifest.json"
          - ".agentplane/tasks/202608261249-BXQZ97/quality/20260826-154349579-recovery-context/evaluator-opinion.md"
          - ".agentplane/tasks/202608261249-BXQZ97/quality/20260826-154349579-recovery-context/evaluator-result.json"
          - ".agentplane/tasks/202608261249-BXQZ97/quality/20260826-154349579-recovery-context/evaluator-work-order.json"
          - ".agentplane/tasks/202608261249-BXQZ97/quality/20260826-154349579-recovery-context/quality-report.json"
          - ".agentplane/tasks/202608261249-BXQZ97/quality/20260826-171737369-recovery-context/evaluator-evidence-manifest.json"
          - ".agentplane/tasks/202608261249-BXQZ97/quality/20260826-171737369-recovery-context/evaluator-work-order.json"
          - ".agentplane/tasks/202608261249-BXQZ97/quality/20260826-171746402-recovery-context/evaluator-evidence-manifest.json"
          - ".agentplane/tasks/202608261249-BXQZ97/quality/20260826-171746402-recovery-context/evaluator-opinion.md"
          - ".agentplane/tasks/202608261249-BXQZ97/quality/20260826-171746402-recovery-context/evaluator-result.json"
          - ".agentplane/tasks/202608261249-BXQZ97/quality/20260826-171746402-recovery-context/evaluator-work-order.json"
          - ".agentplane/tasks/202608261249-BXQZ97/quality/20260826-171746402-recovery-context/quality-report.json"
          - ".agentplane/tasks/202608261249-BXQZ97/quality/20260826-184958130-recovery-context/evaluator-evidence-manifest.json"
          - ".agentplane/tasks/202608261249-BXQZ97/quality/20260826-184958130-recovery-context/evaluator-opinion.md"
          - ".agentplane/tasks/202608261249-BXQZ97/quality/20260826-184958130-recovery-context/evaluator-result.json"
          - ".agentplane/tasks/202608261249-BXQZ97/quality/20260826-184958130-recovery-context/evaluator-work-order.json"
          - ".agentplane/tasks/202608261249-BXQZ97/quality/20260826-184958130-recovery-context/quality-report.json"
          - ".agentplane/tasks/202608261249-BXQZ97/quality/objects/sha256/081a872247cd011fcd717d8674c5e8435662c78ef4fc15cb726edadffac91f00.patch"
          - ".agentplane/tasks/202608261249-BXQZ97/quality/objects/sha256/1f02efb4b8bab934d1772f143fb49a62c41af32c0dcc88e6d84d63067eb2476a.patch"
          - ".agentplane/tasks/202608261249-BXQZ97/quality/objects/sha256/2d08ac03d9f2c967e311337b36f1002c301ce46e6179b3197c8735f606d4bd5d.md"
          - ".agentplane/tasks/202608261249-BXQZ97/quality/objects/sha256/49864fc10ebd312c36e5388075629eb27dd999c9531f6456b52708a9955fb1ce.json"
          - ".agentplane/tasks/202608261249-BXQZ97/quality/objects/sha256/6e793f3b5cf384ceae276d6d2daa685a2ea831c2c622aa09bbd54f9e9993ea15.patch"
          - ".agentplane/tasks/202608261249-BXQZ97/quality/objects/sha256/7b8649aeee3293091a3475cb6b9b8fd50578e76f50f2d69d1a48b0a0564c6588.md"
          - ".agentplane/tasks/202608261249-BXQZ97/quality/objects/sha256/9037cdf98253e70333ede9358d360264a85ee905be64a8723bbdd4ca71e02d4a.json"
          - ".agentplane/tasks/202608261249-BXQZ97/quality/objects/sha256/ca152961094cc816531a9f9428b59e35044108767b0c5ab2b8697f9d41bd5d6e.md"
          - ".agentplane/tasks/202608261249-BXQZ97/quality/objects/sha256/dc53ed08c3dda49bb4078be5bf32b0ada19800cc5f1fcdb14fecdccd54975356.md"
          - ".agentplane/tasks/202608261249-BXQZ97/quality/objects/sha256/e6c20dad3911e302671884f019d9d82e25ccbc8f44d64823eeebfa77db14c513.json"
          - ".agentplane/tasks/202608261249-BXQZ97/quality/objects/sha256/ec34965843d7ceaadde82286a6f78ba6336ac4a3d062b6aa9890f9fd67f55ddb.json"
          - ".agentplane/tasks/202608261249-BXQZ97/quality/objects/sha256/f091e58f8e79aefd3d495f1f01552d4326b86c44e0607e070495425e53edbf2a.md"
          - ".agentplane/tasks/202608261249-BXQZ97/quality/objects/sha256/f3348a06497ca3aad892ff85d6f30139a609de8eb281221d422464223991c706.json"
          - ".agentplane/tasks/202608261249-BXQZ97/supervision/declared-checks.json"
          - ".agentplane/tasks/202608261249-BXQZ97/supervision/implementation-evidence.json"
          - ".agentplane/tasks/202608261249-BXQZ97/verification/20260826131231828-4899fc7776fc3011.json"
          - ".agentplane/tasks/202608261249-BXQZ97/verification/20260826131801504-414ceddf9264b14a.json"
          - ".agentplane/tasks/202608261249-BXQZ97/verification/20260826133735342-6eebdbeee58c63b8.json"
          - ".agentplane/tasks/202608261249-BXQZ97/verification/20260826140354671-51ca742916d6d412.json"
          - ".agentplane/tasks/202608261249-BXQZ97/verification/20260826140354671-f118e6b643ac2277.json"
          - ".agentplane/tasks/202608261249-BXQZ97/verification/20260826142031076-8ac311f53c036691.json"
          - ".agentplane/tasks/202608261249-BXQZ97/verification/20260826164823835-114624ee0716d03c.json"
          - ".agentplane/tasks/202608261249-BXQZ97/verification/20260826164823835-32417bd6c41cd6fa.json"
          - ".agentplane/tasks/202608261249-BXQZ97/verification/20260826165515427-a3cc939a542cd2aa.json"
          - ".agentplane/tasks/202608261249-BXQZ97/verification/20260826165827922-f50094dfabc25c8a.json"
          - ".agentplane/tasks/202608261249-BXQZ97/verification/20260826170134616-f04da5d817e4ab2e.json"
          - ".agentplane/tasks/202608261249-BXQZ97/verification/20260826170811135-da8030825d7c301a.json"
          - ".agentplane/tasks/202608261249-BXQZ97/verification/20260826171201924-42ebe5c731851354.json"
          - ".agentplane/tasks/202608261249-BXQZ97/verification/20260826171322652-7e41b1cc15cfed88.json"
          - ".agentplane/tasks/202608261249-BXQZ97/verification/20260826180631339-09707b1c0e98c6de.json"
          - ".agentplane/tasks/202608261249-BXQZ97/verification/20260826180631339-2614f45e8b6de844.json"
          - ".agentplane/tasks/202608261249-BXQZ97/verification/20260826181511661-477b9b7ac50111ef.json"
          - ".agentplane/tasks/202608261249-BXQZ97/verification/20260826182424360-48a3862358bbf338.json"
          - ".agentplane/tasks/202608261249-BXQZ97/verification/20260826182631556-e4632490ec0e3dab.json"
          - ".agentplane/tasks/202608262034-QVVB66/README.md"
          - ".agentplane/tasks/202608262034-QVVB66/blueprint/resolved-snapshot.json"
          - ".agentplane/tasks/202608262034-QVVB66/pr/diffstat.txt"
          - ".agentplane/tasks/202608262034-QVVB66/pr/github-body.md"
          - ".agentplane/tasks/202608262034-QVVB66/pr/github-title.txt"
          - ".agentplane/tasks/202608262034-QVVB66/pr/meta.json"
          - ".agentplane/tasks/202608262034-QVVB66/pr/review.md"
          - ".agentplane/tasks/202608262034-QVVB66/quality/20260826-232534701-recovery-context/evaluator-evidence-manifest.json"
          - ".agentplane/tasks/202608262034-QVVB66/quality/20260826-232534701-recovery-context/evaluator-opinion.md"
          - ".agentplane/tasks/202608262034-QVVB66/quality/20260826-232534701-recovery-context/evaluator-result.json"
          - ".agentplane/tasks/202608262034-QVVB66/quality/20260826-232534701-recovery-context/evaluator-work-order.json"
          - ".agentplane/tasks/202608262034-QVVB66/quality/20260826-232534701-recovery-context/quality-report.json"
          - ".agentplane/tasks/202608262034-QVVB66/quality/objects/sha256/0d8d9d809bba84acdf89f5b6a6de1e594e0e057ad12081d1c93925007ae3ba56.json"
          - ".agentplane/tasks/202608262034-QVVB66/quality/objects/sha256/1f8c4d5afe794c741ad276e3c9a442bb8d4a0a833501f6c57adcc2cc0cbd510a.md"
          - ".agentplane/tasks/202608262034-QVVB66/quality/objects/sha256/6e4e04668c5a112cfb3f80c4b887a269381efd99162afd71dc2db583b725b51f.patch"
          - ".agentplane/tasks/202608262034-QVVB66/quality/objects/sha256/9037cdf98253e70333ede9358d360264a85ee905be64a8723bbdd4ca71e02d4a.json"
          - ".agentplane/tasks/202608262034-QVVB66/quality/objects/sha256/fb1af76268dd0e8465077608561a882b98194d2c2106b9f4a0f54b5a8216c4e9.json"
          - ".agentplane/tasks/202608262034-QVVB66/supervision/declared-checks.json"
          - ".agentplane/tasks/202608262034-QVVB66/supervision/implementation-evidence.json"
          - ".agentplane/tasks/202608262034-QVVB66/verification/20260826210937938-160302ec11db2821.json"
          - ".agentplane/tasks/202608262034-QVVB66/verification/20260826214006249-ef143b4293541bc2.json"
          - ".agentplane/tasks/202608262034-QVVB66/verification/20260826214633989-ff0fb06f0372a7b1.json"
          - ".agentplane/tasks/202608262034-QVVB66/verification/20260826214746594-95de7efcdc59dfaf.json"
          - ".agentplane/tasks/202608262034-QVVB66/verification/20260826222042038-1fbbbd157b86bc45.json"
          - ".agentplane/tasks/202608262034-QVVB66/verification/20260826225343074-06fb3b6272c4d3ce.json"
          - ".agentplane/tasks/202608262034-QVVB66/verification/20260826232338533-1f3a5cc55d1c2e2e.json"
          - ".agentplane/tasks/202608262034-QVVB66/verification/20260826232507417-6ba5f717053eee31.json"
          - ".agentplane/tasks/202608271251-GHHA0Q/README.md"
          - ".agentplane/tasks/202608271251-GHHA0Q/blueprint/resolved-snapshot.json"
          - ".agentplane/tasks/202608271251-GHHA0Q/pr/diffstat.txt"
          - ".agentplane/tasks/202608271251-GHHA0Q/pr/github-body.md"
          - ".agentplane/tasks/202608271251-GHHA0Q/pr/github-title.txt"
          - ".agentplane/tasks/202608271251-GHHA0Q/pr/meta.json"
          - ".agentplane/tasks/202608271251-GHHA0Q/pr/review.md"
          - ".agentplane/tasks/202608271251-GHHA0Q/quality/20260827-132550152-recovery-context/evaluator-evidence-manifest.json"
          - ".agentplane/tasks/202608271251-GHHA0Q/quality/20260827-132550152-recovery-context/evaluator-opinion.md"
          - ".agentplane/tasks/202608271251-GHHA0Q/quality/20260827-132550152-recovery-context/evaluator-result.json"
          - ".agentplane/tasks/202608271251-GHHA0Q/quality/20260827-132550152-recovery-context/evaluator-work-order.json"
          - ".agentplane/tasks/202608271251-GHHA0Q/quality/20260827-132550152-recovery-context/quality-report.json"
          - ".agentplane/tasks/202608271251-GHHA0Q/quality/objects/sha256/5f1761b308e3fa79606d64298d038aa48eed248df8f75002c32bf6175b74a26f.md"
          - ".agentplane/tasks/202608271251-GHHA0Q/quality/objects/sha256/655d50e79cbbfa8962590054cf5fa3edbb0455a549a7ebf14ff0e4491251ee69.json"
          - ".agentplane/tasks/202608271251-GHHA0Q/quality/objects/sha256/87363b64dfbbc8acb0a0e1d49c8a00c932eb1f73b80583339c6e83f8490049d8.patch"
          - ".agentplane/tasks/202608271251-GHHA0Q/quality/objects/sha256/9037cdf98253e70333ede9358d360264a85ee905be64a8723bbdd4ca71e02d4a.json"
          - ".agentplane/tasks/202608271251-GHHA0Q/quality/objects/sha256/9ee81d006aad7410d4eabee9de9e480cf2cd79d61bd1335ade9707d04079fb6f.json"
          - ".agentplane/tasks/202608271251-GHHA0Q/supervision/declared-checks.json"
          - ".agentplane/tasks/202608271251-GHHA0Q/supervision/implementation-evidence.json"
          - ".agentplane/tasks/202608271251-GHHA0Q/verification/20260827130652681-032dc4b51b16d8f5.json"
          - ".agentplane/tasks/202608271251-GHHA0Q/verification/20260827132532555-956f74b4ae404852.json"
          - ".agentplane/tasks/202608271358-G0N9P4/README.md"
          - ".agentplane/tasks/202608271358-G0N9P4/blueprint/resolved-snapshot.json"
          - ".agentplane/tasks/202608271358-G0N9P4/pr/diffstat.txt"
          - ".agentplane/tasks/202608271358-G0N9P4/pr/github-body.md"
          - ".agentplane/tasks/202608271358-G0N9P4/pr/github-title.txt"
          - ".agentplane/tasks/202608271358-G0N9P4/pr/meta.json"
          - ".agentplane/tasks/202608271358-G0N9P4/pr/review.md"
          - ".agentplane/tasks/202608271358-G0N9P4/quality/20260827-144308272-recovery-context/evaluator-evidence-manifest.json"
          - ".agentplane/tasks/202608271358-G0N9P4/quality/20260827-144308272-recovery-context/evaluator-opinion.md"
          - ".agentplane/tasks/202608271358-G0N9P4/quality/20260827-144308272-recovery-context/evaluator-result.json"
          - ".agentplane/tasks/202608271358-G0N9P4/quality/20260827-144308272-recovery-context/evaluator-work-order.json"
          - ".agentplane/tasks/202608271358-G0N9P4/quality/20260827-144308272-recovery-context/quality-report.json"
          - ".agentplane/tasks/202608271358-G0N9P4/quality/objects/sha256/14513056fb48f13c0a2081399288b24ce14495e22af1134cff7f041d75a4cf96.json"
          - ".agentplane/tasks/202608271358-G0N9P4/quality/objects/sha256/2501149452aa79bbcf0f5915f02d7db1170a7c5b1117d25c3504628d5d3d60f1.patch"
          - ".agentplane/tasks/202608271358-G0N9P4/quality/objects/sha256/2f9b84087cbe4076bce202e94828ba937a9e4172d1620f4d48a2c73dcd5991c6.json"
          - ".agentplane/tasks/202608271358-G0N9P4/quality/objects/sha256/777c538f21215f1399fa50862508b756510efedb76645600f61bf3f670794223.md"
          - ".agentplane/tasks/202608271358-G0N9P4/quality/objects/sha256/9037cdf98253e70333ede9358d360264a85ee905be64a8723bbdd4ca71e02d4a.json"
          - ".agentplane/tasks/202608271358-G0N9P4/supervision/declared-checks.json"
          - ".agentplane/tasks/202608271358-G0N9P4/supervision/implementation-evidence.json"
          - ".agentplane/tasks/202608271358-G0N9P4/verification/20260827141049775-a9ec4c50eea55011.json"
          - ".agentplane/tasks/202608271358-G0N9P4/verification/20260827143026261-afc0c60aa5ad0a08.json"
          - ".agentplane/tasks/202608271358-G0N9P4/verification/20260827144238263-382161b49fad458b.json"
          - ".agentplane/tasks/202608271425-9EWJA1/README.md"
          - ".agentplane/tasks/202608271425-9EWJA1/blueprint/resolved-snapshot.json"
          - ".agentplane/tasks/202608271425-9EWJA1/pr/diffstat.txt"
          - ".agentplane/tasks/202608271425-9EWJA1/pr/github-body.md"
          - ".agentplane/tasks/202608271425-9EWJA1/pr/github-title.txt"
          - ".agentplane/tasks/202608271425-9EWJA1/pr/meta.json"
          - ".agentplane/tasks/202608271425-9EWJA1/pr/review.md"
          - ".agentplane/tasks/202608271425-9EWJA1/quality/20260827-145146182-recovery-context/evaluator-evidence-manifest.json"
          - ".agentplane/tasks/202608271425-9EWJA1/quality/20260827-145146182-recovery-context/evaluator-opinion.md"
          - ".agentplane/tasks/202608271425-9EWJA1/quality/20260827-145146182-recovery-context/evaluator-result.json"
          - ".agentplane/tasks/202608271425-9EWJA1/quality/20260827-145146182-recovery-context/evaluator-work-order.json"
          - ".agentplane/tasks/202608271425-9EWJA1/quality/20260827-145146182-recovery-context/quality-report.json"
          - ".agentplane/tasks/202608271425-9EWJA1/quality/objects/sha256/0573f938635c08e770dcac6ba9e37ee421ad948d77a226a96c698c79010dd886.patch"
          - ".agentplane/tasks/202608271425-9EWJA1/quality/objects/sha256/35a9c1b23cfd9a14cf2f7657ea3fea0d01006ae742d37e9c2cf68e91d2df2217.md"
          - ".agentplane/tasks/202608271425-9EWJA1/quality/objects/sha256/7080a6be2e427488741d82e5f0f80a864c64a7fa2e9cdb8e5118aedded4881ec.json"
          - ".agentplane/tasks/202608271425-9EWJA1/quality/objects/sha256/9037cdf98253e70333ede9358d360264a85ee905be64a8723bbdd4ca71e02d4a.json"
          - ".agentplane/tasks/202608271425-9EWJA1/quality/objects/sha256/d95d0acf71eba724329a418bc06e8264aea65cb35720be95bfc5a172bb57ba3d.json"
          - ".agentplane/tasks/202608271425-9EWJA1/supervision/declared-checks.json"
          - ".agentplane/tasks/202608271425-9EWJA1/supervision/implementation-evidence.json"
          - ".agentplane/tasks/202608271425-9EWJA1/verification/20260827145057353-8504a8d8eb4611ab.json"
          - ".agentplane/tasks/202608271441-DVEMAE/README.md"
          - ".agentplane/tasks/202608271441-DVEMAE/blueprint/resolved-snapshot.json"
          - ".agentplane/tasks/202608271441-DVEMAE/pr/diffstat.txt"
          - ".agentplane/tasks/202608271441-DVEMAE/pr/github-body.md"
          - ".agentplane/tasks/202608271441-DVEMAE/pr/github-title.txt"
          - ".agentplane/tasks/202608271441-DVEMAE/pr/meta.json"
          - ".agentplane/tasks/202608271441-DVEMAE/pr/review.md"
          - ".agentplane/tasks/202608271441-DVEMAE/quality/20260827-161517390-recovery-context/evaluator-evidence-manifest.json"
          - ".agentplane/tasks/202608271441-DVEMAE/quality/20260827-161517390-recovery-context/evaluator-opinion.md"
          - ".agentplane/tasks/202608271441-DVEMAE/quality/20260827-161517390-recovery-context/evaluator-result.json"
          - ".agentplane/tasks/202608271441-DVEMAE/quality/20260827-161517390-recovery-context/evaluator-work-order.json"
          - ".agentplane/tasks/202608271441-DVEMAE/quality/20260827-161517390-recovery-context/quality-report.json"
          - ".agentplane/tasks/202608271441-DVEMAE/quality/objects/sha256/25d9a8b1e3a9e4c13c66e484a4e1b24f8ecdb231997b03159e5461368f8ccace.json"
          - ".agentplane/tasks/202608271441-DVEMAE/quality/objects/sha256/46cd945b00a0fd8eda518b45ef616a27bab8334f224d47b965657bc5f8020958.md"
          - ".agentplane/tasks/202608271441-DVEMAE/quality/objects/sha256/9037cdf98253e70333ede9358d360264a85ee905be64a8723bbdd4ca71e02d4a.json"
          - ".agentplane/tasks/202608271441-DVEMAE/quality/objects/sha256/bc9a4be916f6f1bf3e52810f0bdcae083f6de1da2c9050a0b73d2b46f2f4c158.patch"
          - ".agentplane/tasks/202608271441-DVEMAE/quality/objects/sha256/c945029f8f9a6a3b6717b22494ab1e117a3ea4e6b526ce151bdf827980533c8b.json"
          - ".agentplane/tasks/202608271441-DVEMAE/supervision/declared-checks.json"
          - ".agentplane/tasks/202608271441-DVEMAE/supervision/implementation-evidence.json"
          - ".agentplane/tasks/202608271441-DVEMAE/verification/20260827151321725-77366aa3f29ad2fc.json"
          - ".agentplane/tasks/202608271441-DVEMAE/verification/20260827161459128-ce04c76286eb1a98.json"
          - ".agentplane/tasks/202608271450-TZHW4C/README.md"
          - ".agentplane/tasks/202608271450-TZHW4C/blueprint/resolved-snapshot.json"
          - ".agentplane/tasks/202608271450-TZHW4C/pr/diffstat.txt"
          - ".agentplane/tasks/202608271450-TZHW4C/pr/github-body.md"
          - ".agentplane/tasks/202608271450-TZHW4C/pr/github-title.txt"
          - ".agentplane/tasks/202608271450-TZHW4C/pr/meta.json"
          - ".agentplane/tasks/202608271450-TZHW4C/pr/review.md"
          - ".agentplane/tasks/202608271450-TZHW4C/quality/20260827-164341199-recovery-context/evaluator-evidence-manifest.json"
          - ".agentplane/tasks/202608271450-TZHW4C/quality/20260827-164341199-recovery-context/evaluator-opinion.md"
          - ".agentplane/tasks/202608271450-TZHW4C/quality/20260827-164341199-recovery-context/evaluator-result.json"
          - ".agentplane/tasks/202608271450-TZHW4C/quality/20260827-164341199-recovery-context/evaluator-work-order.json"
          - ".agentplane/tasks/202608271450-TZHW4C/quality/20260827-164341199-recovery-context/quality-report.json"
          - ".agentplane/tasks/202608271450-TZHW4C/quality/objects/sha256/4f8d1195a803cd3c4754483629f1325c54ba2b91328ee958c9811dbc031ab8fd.json"
          - ".agentplane/tasks/202608271450-TZHW4C/quality/objects/sha256/68302d9b5aaca3ffd777ed8c0b0c11a4f0141aa08562b9d28cc3bc9a3075ecfc.patch"
          - ".agentplane/tasks/202608271450-TZHW4C/quality/objects/sha256/9037cdf98253e70333ede9358d360264a85ee905be64a8723bbdd4ca71e02d4a.json"
          - ".agentplane/tasks/202608271450-TZHW4C/quality/objects/sha256/d7febebeb12f1a3d979e56533b3ec80fabd2809b0f26382417f868bf173049e8.md"
          - ".agentplane/tasks/202608271450-TZHW4C/quality/objects/sha256/db8f8a8efe42f5970786efbd4c479276e3b511d8fad72bc91924436db46ac611.json"
          - ".agentplane/tasks/202608271450-TZHW4C/supervision/declared-checks.json"
          - ".agentplane/tasks/202608271450-TZHW4C/supervision/implementation-evidence.json"
          - ".agentplane/tasks/202608271450-TZHW4C/verification/20260827153255520-912083059edc324f.json"
          - ".agentplane/tasks/202608271450-TZHW4C/verification/20260827164324368-fc4e3922be01c66f.json"
          - ".agentplane/tasks/202608271502-J6B4RW/README.md"
          - ".agentplane/tasks/202608271502-J6B4RW/blueprint/resolved-snapshot.json"
          - ".agentplane/tasks/202608271502-J6B4RW/pr/diffstat.txt"
          - ".agentplane/tasks/202608271502-J6B4RW/pr/github-body.md"
          - ".agentplane/tasks/202608271502-J6B4RW/pr/github-title.txt"
          - ".agentplane/tasks/202608271502-J6B4RW/pr/meta.json"
          - ".agentplane/tasks/202608271502-J6B4RW/pr/review.md"
          - ".agentplane/tasks/202608271502-J6B4RW/quality/20260827-154623971-recovery-context/evaluator-evidence-manifest.json"
          - ".agentplane/tasks/202608271502-J6B4RW/quality/20260827-154623971-recovery-context/evaluator-opinion.md"
          - ".agentplane/tasks/202608271502-J6B4RW/quality/20260827-154623971-recovery-context/evaluator-result.json"
          - ".agentplane/tasks/202608271502-J6B4RW/quality/20260827-154623971-recovery-context/evaluator-work-order.json"
          - ".agentplane/tasks/202608271502-J6B4RW/quality/20260827-154623971-recovery-context/quality-report.json"
          - ".agentplane/tasks/202608271502-J6B4RW/quality/objects/sha256/0031c8f4d4758e61b1466e0d1cc73f10d4188334296df7b99d8d999f5c4e8ea1.md"
          - ".agentplane/tasks/202608271502-J6B4RW/quality/objects/sha256/4fac0491a5e9a0c96c8ac043242a10a8897ab3ae27acf6ec034902b9811d012b.json"
          - ".agentplane/tasks/202608271502-J6B4RW/quality/objects/sha256/58b664e7b0a81b253833b10a6c216059659b73855a9bfe7503edda7e5c2c4aee.patch"
          - ".agentplane/tasks/202608271502-J6B4RW/quality/objects/sha256/9037cdf98253e70333ede9358d360264a85ee905be64a8723bbdd4ca71e02d4a.json"
          - ".agentplane/tasks/202608271502-J6B4RW/quality/objects/sha256/b1ec08ea0502169eb633c52e878c5f61dab6a05f7abb0b1e3821a09aae111dc8.json"
          - ".agentplane/tasks/202608271502-J6B4RW/supervision/declared-checks.json"
          - ".agentplane/tasks/202608271502-J6B4RW/supervision/implementation-evidence.json"
          - ".agentplane/tasks/202608271502-J6B4RW/verification/20260827154604703-18e8da1d3734f6ea.json"
          - ".agentplane/tasks/202608271520-175BQX/README.md"
          - ".agentplane/tasks/202608271520-175BQX/blueprint/resolved-snapshot.json"
          - ".agentplane/tasks/202608271520-175BQX/pr/diffstat.txt"
          - ".agentplane/tasks/202608271520-175BQX/pr/github-body.md"
          - ".agentplane/tasks/202608271520-175BQX/pr/github-title.txt"
          - ".agentplane/tasks/202608271520-175BQX/pr/meta.json"
          - ".agentplane/tasks/202608271520-175BQX/pr/review.md"
          - ".agentplane/tasks/202608271520-175BQX/quality/20260827-163417019-recovery-context/evaluator-evidence-manifest.json"
          - ".agentplane/tasks/202608271520-175BQX/quality/20260827-163417019-recovery-context/evaluator-opinion.md"
          - ".agentplane/tasks/202608271520-175BQX/quality/20260827-163417019-recovery-context/evaluator-result.json"
          - ".agentplane/tasks/202608271520-175BQX/quality/20260827-163417019-recovery-context/evaluator-work-order.json"
          - ".agentplane/tasks/202608271520-175BQX/quality/20260827-163417019-recovery-context/quality-report.json"
          - ".agentplane/tasks/202608271520-175BQX/quality/objects/sha256/3df5f4f1f353a441910c5898702f18d37f00971bf3cad8e11319d03103ab1c56.patch"
          - ".agentplane/tasks/202608271520-175BQX/quality/objects/sha256/9037cdf98253e70333ede9358d360264a85ee905be64a8723bbdd4ca71e02d4a.json"
          - ".agentplane/tasks/202608271520-175BQX/quality/objects/sha256/a288575b74937de29ef9e860b24bcdc61f3191f48df33fc132a601fd7072e7e6.json"
          - ".agentplane/tasks/202608271520-175BQX/quality/objects/sha256/aadfab4fb644761f23c0e128c6d090eb8b31d8787d9b2a201c93e5e10f1e03fe.json"
          - ".agentplane/tasks/202608271520-175BQX/quality/objects/sha256/cfcdcb5435bc36040568a2bd28a1a5c734c0b2fe8cc3b738c45514cc0aefe561.md"
          - ".agentplane/tasks/202608271520-175BQX/supervision/declared-checks.json"
          - ".agentplane/tasks/202608271520-175BQX/supervision/implementation-evidence.json"
          - ".agentplane/tasks/202608271520-175BQX/verification/20260827163359452-f5a7fe6f4992aa43.json"
          - ".agentplane/tasks/202608271538-T21JCA/README.md"
          - ".agentplane/tasks/202608271538-T21JCA/blueprint/resolved-snapshot.json"
          - ".agentplane/tasks/202608271538-T21JCA/pr/diffstat.txt"
          - ".agentplane/tasks/202608271538-T21JCA/pr/github-body.md"
          - ".agentplane/tasks/202608271538-T21JCA/pr/github-title.txt"
          - ".agentplane/tasks/202608271538-T21JCA/pr/meta.json"
          - ".agentplane/tasks/202608271538-T21JCA/pr/review.md"
          - ".agentplane/tasks/202608271538-T21JCA/quality/20260827-155614370-recovery-context/evaluator-evidence-manifest.json"
          - ".agentplane/tasks/202608271538-T21JCA/quality/20260827-155614370-recovery-context/evaluator-opinion.md"
          - ".agentplane/tasks/202608271538-T21JCA/quality/20260827-155614370-recovery-context/evaluator-result.json"
          - ".agentplane/tasks/202608271538-T21JCA/quality/20260827-155614370-recovery-context/evaluator-work-order.json"
          - ".agentplane/tasks/202608271538-T21JCA/quality/20260827-155614370-recovery-context/quality-report.json"
          - ".agentplane/tasks/202608271538-T21JCA/quality/20260827-165816155-recovery-context/evaluator-evidence-manifest.json"
          - ".agentplane/tasks/202608271538-T21JCA/quality/20260827-165816155-recovery-context/evaluator-opinion.md"
          - ".agentplane/tasks/202608271538-T21JCA/quality/20260827-165816155-recovery-context/evaluator-result.json"
          - ".agentplane/tasks/202608271538-T21JCA/quality/20260827-165816155-recovery-context/evaluator-work-order.json"
          - ".agentplane/tasks/202608271538-T21JCA/quality/20260827-165816155-recovery-context/quality-report.json"
          - ".agentplane/tasks/202608271538-T21JCA/quality/20260827-185237520-recovery-context/evaluator-evidence-manifest.json"
          - ".agentplane/tasks/202608271538-T21JCA/quality/20260827-185237520-recovery-context/evaluator-opinion.md"
          - ".agentplane/tasks/202608271538-T21JCA/quality/20260827-185237520-recovery-context/evaluator-result.json"
          - ".agentplane/tasks/202608271538-T21JCA/quality/20260827-185237520-recovery-context/evaluator-work-order.json"
          - ".agentplane/tasks/202608271538-T21JCA/quality/20260827-185237520-recovery-context/quality-report.json"
          - ".agentplane/tasks/202608271538-T21JCA/quality/objects/sha256/20e682bec49f3be073f007266985798ff96956563ac46f42c9c8963175cb0d75.json"
          - ".agentplane/tasks/202608271538-T21JCA/quality/objects/sha256/23f41be610f22839e63955e61a6129a0f92dc7b634a33469b42faf27be8d2392.json"
          - ".agentplane/tasks/202608271538-T21JCA/quality/objects/sha256/2ba4423ad95e1c8d825431449b05e8979e4147776ed5596cb0d9d1e8f498b19b.md"
          - ".agentplane/tasks/202608271538-T21JCA/quality/objects/sha256/5b969fa31cb380006daa12e43d9292d0b7b40b06dab78d360d996621e45a56f0.json"
          - ".agentplane/tasks/202608271538-T21JCA/quality/objects/sha256/8272d31e92fdd32ae188f1bceceb8fd5b20abee2ac53a445582b54e3cf230ada.patch"
          - ".agentplane/tasks/202608271538-T21JCA/quality/objects/sha256/9037cdf98253e70333ede9358d360264a85ee905be64a8723bbdd4ca71e02d4a.json"
          - ".agentplane/tasks/202608271538-T21JCA/quality/objects/sha256/a7e3196d56670a618cab6f2faccd91792fd9fdd6bb32df3f9587ff725891c60f.patch"
          - ".agentplane/tasks/202608271538-T21JCA/quality/objects/sha256/aaae0a4db026925daff5ae459b577e586f725c6f7b05301210c65ca44c52ae5f.json"
          - ".agentplane/tasks/202608271538-T21JCA/quality/objects/sha256/d45ba3378de8f21986c7dba53843422ac84e13c3a300a10b253f902a75553e18.md"
          - ".agentplane/tasks/202608271538-T21JCA/quality/objects/sha256/efe135d010022261174668a4c7cb2b3925b6118a8068b12cda82e02713ab0c81.md"
          - ".agentplane/tasks/202608271538-T21JCA/quality/objects/sha256/fcf8dd2e46cf020a4dfa46a07d648ce3dfb919b0ad00a577f97eacfd649d9817.patch"
          - ".agentplane/tasks/202608271538-T21JCA/supervision/declared-checks.json"
          - ".agentplane/tasks/202608271538-T21JCA/supervision/implementation-evidence.json"
          - ".agentplane/tasks/202608271538-T21JCA/verification/20260827155541958-c84df617bc1e0c1a.json"
          - ".agentplane/tasks/202608271538-T21JCA/verification/20260827163017204-63965a85298089d8.json"
          - ".agentplane/tasks/202608271538-T21JCA/verification/20260827165804845-f40035f1f5135e14.json"
          - ".agentplane/tasks/202608271538-T21JCA/verification/20260827175117746-40e332b32f5ff76b.json"
          - ".agentplane/tasks/202608271538-T21JCA/verification/20260827181112407-f0e13b14e41fe302.json"
          - ".agentplane/tasks/202608271538-T21JCA/verification/20260827185225478-6366f2fb7f9e38cb.json"
          - ".agentplane/tasks/202608271544-1TDVPJ/README.md"
          - ".agentplane/tasks/202608271544-1TDVPJ/blueprint/resolved-snapshot.json"
          - ".agentplane/tasks/202608271544-1TDVPJ/pr/diffstat.txt"
          - ".agentplane/tasks/202608271544-1TDVPJ/pr/github-body.md"
          - ".agentplane/tasks/202608271544-1TDVPJ/pr/github-title.txt"
          - ".agentplane/tasks/202608271544-1TDVPJ/pr/meta.json"
          - ".agentplane/tasks/202608271544-1TDVPJ/pr/review.md"
          - ".agentplane/tasks/202608271544-1TDVPJ/quality/20260827-162357810-recovery-context/evaluator-evidence-manifest.json"
          - ".agentplane/tasks/202608271544-1TDVPJ/quality/20260827-162357810-recovery-context/evaluator-opinion.md"
          - ".agentplane/tasks/202608271544-1TDVPJ/quality/20260827-162357810-recovery-context/evaluator-result.json"
          - ".agentplane/tasks/202608271544-1TDVPJ/quality/20260827-162357810-recovery-context/evaluator-work-order.json"
          - ".agentplane/tasks/202608271544-1TDVPJ/quality/20260827-162357810-recovery-context/quality-report.json"
          - ".agentplane/tasks/202608271544-1TDVPJ/quality/objects/sha256/09e7b31f3ac865c48223b58cfb33a8e0b13406f6b1d10fbd0397887ce64fcd39.json"
          - ".agentplane/tasks/202608271544-1TDVPJ/quality/objects/sha256/4a6b7f61fc2cd73a0ac64c0afa6b1e91ee9137ee153073440092170e287545ae.patch"
          - ".agentplane/tasks/202608271544-1TDVPJ/quality/objects/sha256/54db07e252c5020879f6e899f2b62e2cbfdd0f825307f6b3f8a998e2cee24ddf.json"
          - ".agentplane/tasks/202608271544-1TDVPJ/quality/objects/sha256/9037cdf98253e70333ede9358d360264a85ee905be64a8723bbdd4ca71e02d4a.json"
          - ".agentplane/tasks/202608271544-1TDVPJ/quality/objects/sha256/b138e23a64b8077d010b45401e70824413f65d708334c29a5b663586700828e7.md"
          - ".agentplane/tasks/202608271544-1TDVPJ/supervision/declared-checks.json"
          - ".agentplane/tasks/202608271544-1TDVPJ/supervision/implementation-evidence.json"
          - ".agentplane/tasks/202608271544-1TDVPJ/verification/20260827160642690-24295292837d8d7e.json"
          - ".agentplane/tasks/202608271544-1TDVPJ/verification/20260827162335964-8d33c746263199fc.json"
          - ".agentplane/tasks/202608271649-DVNTRR/README.md"
          - ".agentplane/tasks/202608271649-DVNTRR/blueprint/resolved-snapshot.json"
          - ".agentplane/tasks/202608271649-DVNTRR/pr/diffstat.txt"
          - ".agentplane/tasks/202608271649-DVNTRR/pr/github-body.md"
          - ".agentplane/tasks/202608271649-DVNTRR/pr/github-title.txt"
          - ".agentplane/tasks/202608271649-DVNTRR/pr/meta.json"
          - ".agentplane/tasks/202608271649-DVNTRR/pr/review.md"
          - ".agentplane/tasks/202608271649-DVNTRR/quality/20260827-170736164-recovery-context/evaluator-evidence-manifest.json"
          - ".agentplane/tasks/202608271649-DVNTRR/quality/20260827-170736164-recovery-context/evaluator-opinion.md"
          - ".agentplane/tasks/202608271649-DVNTRR/quality/20260827-170736164-recovery-context/evaluator-result.json"
          - ".agentplane/tasks/202608271649-DVNTRR/quality/20260827-170736164-recovery-context/evaluator-work-order.json"
          - ".agentplane/tasks/202608271649-DVNTRR/quality/20260827-170736164-recovery-context/quality-report.json"
          - ".agentplane/tasks/202608271649-DVNTRR/quality/objects/sha256/26b29129cee78cb00a376b7d25f1c78233418cc92f456e963b0122292f6b29fe.json"
          - ".agentplane/tasks/202608271649-DVNTRR/quality/objects/sha256/9037cdf98253e70333ede9358d360264a85ee905be64a8723bbdd4ca71e02d4a.json"
          - ".agentplane/tasks/202608271649-DVNTRR/quality/objects/sha256/9e458f50f4a70613d2c4d7d41c1006bf431af26fd040c3649cf38af0ae39c0ac.patch"
          - ".agentplane/tasks/202608271649-DVNTRR/quality/objects/sha256/a0a854b5539401e1ce7b8c5d69c90e66e4e7164cedf7d87371aed16ed16c54e5.json"
          - ".agentplane/tasks/202608271649-DVNTRR/quality/objects/sha256/fb58551d02547676b978b5aedde40828c7008703d368d527a61c52535306d00f.md"
          - ".agentplane/tasks/202608271649-DVNTRR/supervision/declared-checks.json"
          - ".agentplane/tasks/202608271649-DVNTRR/supervision/implementation-evidence.json"
          - ".agentplane/tasks/202608271649-DVNTRR/verification/20260827170718338-d32fb33a649bef9e.json"
          - ".agentplane/tasks/202608271659-AD3030/README.md"
          - ".agentplane/tasks/202608271659-AD3030/blueprint/resolved-snapshot.json"
          - ".agentplane/tasks/202608271659-AD3030/pr/diffstat.txt"
          - ".agentplane/tasks/202608271659-AD3030/pr/github-body.md"
          - ".agentplane/tasks/202608271659-AD3030/pr/github-title.txt"
          - ".agentplane/tasks/202608271659-AD3030/pr/meta.json"
          - ".agentplane/tasks/202608271659-AD3030/pr/review.md"
          - ".agentplane/tasks/202608271659-AD3030/quality/20260827-231601668-recovery-context/evaluator-evidence-manifest.json"
          - ".agentplane/tasks/202608271659-AD3030/quality/20260827-231601668-recovery-context/evaluator-follow-up.json"
          - ".agentplane/tasks/202608271659-AD3030/quality/20260827-231601668-recovery-context/evaluator-opinion.md"
          - ".agentplane/tasks/202608271659-AD3030/quality/20260827-231601668-recovery-context/evaluator-result.json"
          - ".agentplane/tasks/202608271659-AD3030/quality/20260827-231601668-recovery-context/evaluator-work-order.json"
          - ".agentplane/tasks/202608271659-AD3030/quality/20260827-231601668-recovery-context/quality-report.json"
          - ".agentplane/tasks/202608271659-AD3030/quality/20260827-233148153-recovery-context/evaluator-evidence-manifest.json"
          - ".agentplane/tasks/202608271659-AD3030/quality/20260827-233148153-recovery-context/evaluator-opinion.md"
          - ".agentplane/tasks/202608271659-AD3030/quality/20260827-233148153-recovery-context/evaluator-result.json"
          - ".agentplane/tasks/202608271659-AD3030/quality/20260827-233148153-recovery-context/evaluator-work-order.json"
          - ".agentplane/tasks/202608271659-AD3030/quality/20260827-233148153-recovery-context/quality-report.json"
          - ".agentplane/tasks/202608271659-AD3030/quality/objects/sha256/6a54b986c4337537710c4beb64489bec480674ba7177b0351762cbc6ef90410f.patch"
          - ".agentplane/tasks/202608271659-AD3030/quality/objects/sha256/7f8eaa563a57e96bcafc6c3a0510357cc3af386dc72cd2c7ea05829ca02b93d1.md"
          - ".agentplane/tasks/202608271659-AD3030/quality/objects/sha256/9037cdf98253e70333ede9358d360264a85ee905be64a8723bbdd4ca71e02d4a.json"
          - ".agentplane/tasks/202608271659-AD3030/quality/objects/sha256/90f0d1030d222fc87d8e92a8fc71195cb2c49a013eb106f43b8d570dab8cea0c.md"
          - ".agentplane/tasks/202608271659-AD3030/quality/objects/sha256/95b232edfe20d366180cc29edc1979fdffee0202f5881344b07866a82d04fc4f.json"
          - ".agentplane/tasks/202608271659-AD3030/quality/objects/sha256/d0d238d23c3006d5e0d4d0953d1881f99c4173f65bfe5d0abfb7b08b76de5a06.json"
          - ".agentplane/tasks/202608271659-AD3030/quality/objects/sha256/d36ac47a0ebecb9519f911ec1314b9ad33af5c3ced863ba464a8788b49dec5b9.json"
          - ".agentplane/tasks/202608271659-AD3030/supervision/declared-checks.json"
          - ".agentplane/tasks/202608271659-AD3030/supervision/implementation-evidence.json"
          - ".agentplane/tasks/202608271659-AD3030/verification/20260827213149985-715257e021089323.json"
          - ".agentplane/tasks/202608271659-AD3030/verification/20260827215847391-fb3c0afcc74de348.json"
          - ".agentplane/tasks/202608271659-AD3030/verification/20260827223623598-a12592ac3d5fc2df.json"
          - ".agentplane/tasks/202608271659-AD3030/verification/20260827231543799-24b0be63cfe9653d.json"
          - ".agentplane/tasks/202608271659-AD3030/verification/20260827233043685-d1e770e639a91501.json"
          - ".agentplane/tasks/202608272229-CFKR4P/README.md"
          - ".agentplane/tasks/202608272229-CFKR4P/blueprint/resolved-snapshot.json"
          - ".agentplane/tasks/202608272229-CFKR4P/pr/diffstat.txt"
          - ".agentplane/tasks/202608272229-CFKR4P/pr/github-body.md"
          - ".agentplane/tasks/202608272229-CFKR4P/pr/github-title.txt"
          - ".agentplane/tasks/202608272229-CFKR4P/pr/meta.json"
          - ".agentplane/tasks/202608272229-CFKR4P/pr/review.md"
          - ".agentplane/tasks/202608272229-CFKR4P/quality/20260827-230610775-recovery-context/evaluator-evidence-manifest.json"
          - ".agentplane/tasks/202608272229-CFKR4P/quality/20260827-230610775-recovery-context/evaluator-opinion.md"
          - ".agentplane/tasks/202608272229-CFKR4P/quality/20260827-230610775-recovery-context/evaluator-result.json"
          - ".agentplane/tasks/202608272229-CFKR4P/quality/20260827-230610775-recovery-context/evaluator-work-order.json"
          - ".agentplane/tasks/202608272229-CFKR4P/quality/20260827-230610775-recovery-context/quality-report.json"
          - ".agentplane/tasks/202608272229-CFKR4P/quality/20260828-000932160-recovery-context/evaluator-evidence-manifest.json"
          - ".agentplane/tasks/202608272229-CFKR4P/quality/20260828-000932160-recovery-context/evaluator-follow-up.json"
          - ".agentplane/tasks/202608272229-CFKR4P/quality/20260828-000932160-recovery-context/evaluator-opinion.md"
          - ".agentplane/tasks/202608272229-CFKR4P/quality/20260828-000932160-recovery-context/evaluator-result.json"
          - ".agentplane/tasks/202608272229-CFKR4P/quality/20260828-000932160-recovery-context/evaluator-work-order.json"
          - ".agentplane/tasks/202608272229-CFKR4P/quality/20260828-000932160-recovery-context/quality-report.json"
          - ".agentplane/tasks/202608272229-CFKR4P/quality/20260828-053621063-recovery-context/evaluator-evidence-manifest.json"
          - ".agentplane/tasks/202608272229-CFKR4P/quality/20260828-053621063-recovery-context/evaluator-opinion.md"
          - ".agentplane/tasks/202608272229-CFKR4P/quality/20260828-053621063-recovery-context/evaluator-result.json"
          - ".agentplane/tasks/202608272229-CFKR4P/quality/20260828-053621063-recovery-context/evaluator-work-order.json"
          - ".agentplane/tasks/202608272229-CFKR4P/quality/20260828-053621063-recovery-context/quality-report.json"
          - ".agentplane/tasks/202608272229-CFKR4P/quality/objects/sha256/11688b587a6c37b5298be891c8baca187f77e08c5986a1dc9f37e56709aa676e.patch"
          - ".agentplane/tasks/202608272229-CFKR4P/quality/objects/sha256/3fa8c5a4ffd8708f6e96a21eba31edaf65882e1844c30c1e86c408070f957b5b.patch"
          - ".agentplane/tasks/202608272229-CFKR4P/quality/objects/sha256/56d54e34c6824aaf1a152fdfb629d730440df65d4686321e6cbb73d499cb85a2.md"
          - ".agentplane/tasks/202608272229-CFKR4P/quality/objects/sha256/5a91f816258fbfff2849f7bc6be1f7cf50e4796b2e269be89388b9c66f1d5c68.md"
          - ".agentplane/tasks/202608272229-CFKR4P/quality/objects/sha256/6f267ba300d86b30f5a46cb1b7eae0f2cb31b89dd4cf4c01d666f9423b309d5e.json"
          - ".agentplane/tasks/202608272229-CFKR4P/quality/objects/sha256/8aa8430007db8b3269f6cb4f5d3aed2627eeadc552ce0127fbabae170ead8e9f.md"
          - ".agentplane/tasks/202608272229-CFKR4P/quality/objects/sha256/9037cdf98253e70333ede9358d360264a85ee905be64a8723bbdd4ca71e02d4a.json"
          - ".agentplane/tasks/202608272229-CFKR4P/quality/objects/sha256/9a2d9706dbffd1b3e70f61ffedc1e700dd415cee709f8010108ced527e4dfdc5.json"
          - ".agentplane/tasks/202608272229-CFKR4P/quality/objects/sha256/be5d9b5a63f50769630a2f792d28e7a198ceee47d2693d131f4b4de1dbdf8317.json"
          - ".agentplane/tasks/202608272229-CFKR4P/quality/objects/sha256/ddfa9158349dd8bc733f31959f4dd5b52edf19f263a2c56ebf3c0556d6f7eb98.json"
          - ".agentplane/tasks/202608272229-CFKR4P/supervision/declared-checks.json"
          - ".agentplane/tasks/202608272229-CFKR4P/supervision/implementation-evidence.json"
          - ".agentplane/tasks/202608272229-CFKR4P/verification/20260827230553240-5454bb7d2f564299.json"
          - ".agentplane/tasks/202608272229-CFKR4P/verification/20260828000849309-06bea9aa9602ed03.json"
          - ".agentplane/tasks/202608272229-CFKR4P/verification/20260828000849309-6c255a4db5aae45c.json"
          - ".agentplane/tasks/202608272229-CFKR4P/verification/20260828053605787-eca4721e74cf0d8e.json"
          - ".agentplane/tasks/202608280009-QMVHM2/README.md"
          - ".agentplane/tasks/202608280009-QMVHM2/blueprint/resolved-snapshot.json"
          - ".agentplane/tasks/202608280009-QMVHM2/pr/diffstat.txt"
          - ".agentplane/tasks/202608280009-QMVHM2/pr/github-body.md"
          - ".agentplane/tasks/202608280009-QMVHM2/pr/github-title.txt"
          - ".agentplane/tasks/202608280009-QMVHM2/pr/meta.json"
          - ".agentplane/tasks/202608280009-QMVHM2/pr/review.md"
          - ".agentplane/tasks/202608280009-QMVHM2/quality/20260828-011322107-recovery-context/evaluator-evidence-manifest.json"
          - ".agentplane/tasks/202608280009-QMVHM2/quality/20260828-011322107-recovery-context/evaluator-follow-up.json"
          - ".agentplane/tasks/202608280009-QMVHM2/quality/20260828-011322107-recovery-context/evaluator-opinion.md"
          - ".agentplane/tasks/202608280009-QMVHM2/quality/20260828-011322107-recovery-context/evaluator-result.json"
          - ".agentplane/tasks/202608280009-QMVHM2/quality/20260828-011322107-recovery-context/evaluator-work-order.json"
          - ".agentplane/tasks/202608280009-QMVHM2/quality/20260828-011322107-recovery-context/quality-report.json"
          - ".agentplane/tasks/202608280009-QMVHM2/quality/20260828-042840647-recovery-context/evaluator-evidence-manifest.json"
          - ".agentplane/tasks/202608280009-QMVHM2/quality/20260828-042840647-recovery-context/evaluator-opinion.md"
          - ".agentplane/tasks/202608280009-QMVHM2/quality/20260828-042840647-recovery-context/evaluator-result.json"
          - ".agentplane/tasks/202608280009-QMVHM2/quality/20260828-042840647-recovery-context/evaluator-work-order.json"
          - ".agentplane/tasks/202608280009-QMVHM2/quality/20260828-042840647-recovery-context/quality-report.json"
          - ".agentplane/tasks/202608280009-QMVHM2/quality/20260828-051322345-recovery-context/evaluator-evidence-manifest.json"
          - ".agentplane/tasks/202608280009-QMVHM2/quality/20260828-051322345-recovery-context/evaluator-opinion.md"
          - ".agentplane/tasks/202608280009-QMVHM2/quality/20260828-051322345-recovery-context/evaluator-result.json"
          - ".agentplane/tasks/202608280009-QMVHM2/quality/20260828-051322345-recovery-context/evaluator-work-order.json"
          - ".agentplane/tasks/202608280009-QMVHM2/quality/20260828-051322345-recovery-context/quality-report.json"
          - ".agentplane/tasks/202608280009-QMVHM2/quality/objects/sha256/1c71cb603799ea00dfe1eb4feba9eaaceb1ba54dcbf5d427df29019e0705cc88.md"
          - ".agentplane/tasks/202608280009-QMVHM2/quality/objects/sha256/239c6f92bfea8b9963a7280e631c183681ae1af1934202231f1189ec01382189.json"
          - ".agentplane/tasks/202608280009-QMVHM2/quality/objects/sha256/5379a6852a6d160cd1b996793dd260bf11f32c00c170218fea9dc0fff3a613e4.patch"
          - ".agentplane/tasks/202608280009-QMVHM2/quality/objects/sha256/60f75a07ff5023ff166e4200c64265239501e2b3f6b37a021996dff717b5fbfe.patch"
          - ".agentplane/tasks/202608280009-QMVHM2/quality/objects/sha256/66b158c9a1fbadd62b9ef4afac539b907e19606f24447f5afac1a180c96d1f76.json"
          - ".agentplane/tasks/202608280009-QMVHM2/quality/objects/sha256/9037cdf98253e70333ede9358d360264a85ee905be64a8723bbdd4ca71e02d4a.json"
          - ".agentplane/tasks/202608280009-QMVHM2/quality/objects/sha256/975b3b4c61f11b15abc435105a878d617ff4c7299a8b62d6c8401b9482fc9f3d.json"
          - ".agentplane/tasks/202608280009-QMVHM2/quality/objects/sha256/b2ffb42c3b91e00e03734e7dcf1aa3ef131732e1faccaedf4fa53f1310491c33.json"
          - ".agentplane/tasks/202608280009-QMVHM2/quality/objects/sha256/bd890fca94d16e8a62f92c3704058b03b54be072d1dee3056f0fe78883c3159e.md"
          - ".agentplane/tasks/202608280009-QMVHM2/quality/objects/sha256/eeb6b4d935b7082e3a532d3520244220ada15bb93c7ca55a51e8d77134958539.md"
          - ".agentplane/tasks/202608280009-QMVHM2/supervision/declared-checks.json"
          - ".agentplane/tasks/202608280009-QMVHM2/supervision/implementation-evidence.json"
          - ".agentplane/tasks/202608280009-QMVHM2/verification/20260828011304735-23f23a1652815c0c.json"
          - ".agentplane/tasks/202608280009-QMVHM2/verification/20260828042822482-e20218a743e953fb.json"
          - ".agentplane/tasks/202608280009-QMVHM2/verification/20260828050220795-2614f9b715b13cb6.json"
          - ".agentplane/tasks/202608280009-QMVHM2/verification/20260828050220795-466081e22890fca3.json"
          - ".agentplane/tasks/202608280009-QMVHM2/verification/20260828051308628-09a00b90b25d66f1.json"
          - ".agentplane/tasks/202608280529-59VB06/README.md"
          - ".agentplane/tasks/202608280529-59VB06/blueprint/resolved-snapshot.json"
          - ".agentplane/tasks/202608280529-59VB06/pr/diffstat.txt"
          - ".agentplane/tasks/202608280529-59VB06/pr/github-body.md"
          - ".agentplane/tasks/202608280529-59VB06/pr/github-title.txt"
          - ".agentplane/tasks/202608280529-59VB06/pr/meta.json"
          - ".agentplane/tasks/202608280529-59VB06/pr/review.md"
          - ".agentplane/tasks/202608280529-59VB06/quality/20260828-060709201-recovery-context/evaluator-evidence-manifest.json"
          - ".agentplane/tasks/202608280529-59VB06/quality/20260828-060709201-recovery-context/evaluator-follow-up.json"
          - ".agentplane/tasks/202608280529-59VB06/quality/20260828-060709201-recovery-context/evaluator-opinion.md"
          - ".agentplane/tasks/202608280529-59VB06/quality/20260828-060709201-recovery-context/evaluator-result.json"
          - ".agentplane/tasks/202608280529-59VB06/quality/20260828-060709201-recovery-context/evaluator-work-order.json"
          - ".agentplane/tasks/202608280529-59VB06/quality/20260828-060709201-recovery-context/quality-report.json"
          - ".agentplane/tasks/202608280529-59VB06/quality/20260828-153633672-recovery-context/evaluator-evidence-manifest.json"
          - ".agentplane/tasks/202608280529-59VB06/quality/20260828-153633672-recovery-context/evaluator-opinion.md"
          - ".agentplane/tasks/202608280529-59VB06/quality/20260828-153633672-recovery-context/evaluator-result.json"
          - ".agentplane/tasks/202608280529-59VB06/quality/20260828-153633672-recovery-context/evaluator-work-order.json"
          - ".agentplane/tasks/202608280529-59VB06/quality/20260828-153633672-recovery-context/quality-report.json"
          - ".agentplane/tasks/202608280529-59VB06/quality/20260828-181927875-recovery-context/evaluator-evidence-manifest.json"
          - ".agentplane/tasks/202608280529-59VB06/quality/20260828-181927875-recovery-context/evaluator-follow-up.json"
          - ".agentplane/tasks/202608280529-59VB06/quality/20260828-181927875-recovery-context/evaluator-opinion.md"
          - ".agentplane/tasks/202608280529-59VB06/quality/20260828-181927875-recovery-context/evaluator-result.json"
          - ".agentplane/tasks/202608280529-59VB06/quality/20260828-181927875-recovery-context/evaluator-work-order.json"
          - ".agentplane/tasks/202608280529-59VB06/quality/20260828-181927875-recovery-context/quality-report.json"
          - ".agentplane/tasks/202608280529-59VB06/quality/20260828-185050324-recovery-context/evaluator-evidence-manifest.json"
          - ".agentplane/tasks/202608280529-59VB06/quality/20260828-185050324-recovery-context/evaluator-opinion.md"
          - ".agentplane/tasks/202608280529-59VB06/quality/20260828-185050324-recovery-context/evaluator-result.json"
          - ".agentplane/tasks/202608280529-59VB06/quality/20260828-185050324-recovery-context/evaluator-work-order.json"
          - ".agentplane/tasks/202608280529-59VB06/quality/20260828-185050324-recovery-context/quality-report.json"
          - ".agentplane/tasks/202608280529-59VB06/quality/objects/sha256/24745007b98bd3eb7178a157f3cff4cd03ec4dd7de00613fbd465e1c9d85fc99.json"
          - ".agentplane/tasks/202608280529-59VB06/quality/objects/sha256/305dc31ef93c8cc2c3f6b8002313ce558bba82f431df8b7b35991b3a1335bfb4.md"
          - ".agentplane/tasks/202608280529-59VB06/quality/objects/sha256/32210e077de23f38baba474b9ad2cf03c748596a8597b2daf2df6a5f75376ef1.json"
          - ".agentplane/tasks/202608280529-59VB06/quality/objects/sha256/34b3e8375de5f18107ece3aea5f4b2af0c9ec6eec6bd7198fb9b886c82d91398.md"
          - ".agentplane/tasks/202608280529-59VB06/quality/objects/sha256/64558883dc2735b263e90375f5bf6254311c06dfe032688cfeda608774af92e4.md"
          - ".agentplane/tasks/202608280529-59VB06/quality/objects/sha256/85ab8a4388809a43346334532eaf5fea9f05ec0af3e6b17cced11cc3e28859fb.patch"
          - ".agentplane/tasks/202608280529-59VB06/quality/objects/sha256/8e54ddb6d171cda8ac2e9c2276a32c2567dee171dd67e7e76bce8968de76829a.patch"
          - ".agentplane/tasks/202608280529-59VB06/quality/objects/sha256/9037cdf98253e70333ede9358d360264a85ee905be64a8723bbdd4ca71e02d4a.json"
          - ".agentplane/tasks/202608280529-59VB06/quality/objects/sha256/9f4fefbba30eb4bff51cddd6573a18f686a9d04f29b7ab3104de0ccbe6a641b6.md"
          - ".agentplane/tasks/202608280529-59VB06/quality/objects/sha256/b3b3f9229ace468303c32054dbfc08138f4e6822b464104b4d9180421de40844.json"
          - ".agentplane/tasks/202608280529-59VB06/quality/objects/sha256/dffe78fab5abb3d7f0acea1c9b14f4cbfd56d68d836f90da49341774b928b834.json"
          - ".agentplane/tasks/202608280529-59VB06/quality/objects/sha256/f9a2f74389e1488cd06a9f00c9eb2086396f47f6f2dec4f25ee791723541a0e8.json"
          - ".agentplane/tasks/202608280529-59VB06/supervision/declared-checks.json"
          - ".agentplane/tasks/202608280529-59VB06/supervision/implementation-evidence.json"
          - ".agentplane/tasks/202608280529-59VB06/verification/20260828060650926-cb1fbd290a69ab04.json"
          - ".agentplane/tasks/202608280529-59VB06/verification/20260828153621983-c6c6865d6eab595e.json"
          - ".agentplane/tasks/202608280529-59VB06/verification/20260828161611883-ae6fce25c62f3d26.json"
          - ".agentplane/tasks/202608280529-59VB06/verification/20260828161639959-3ac5a4b484ed090d.json"
          - ".agentplane/tasks/202608280529-59VB06/verification/20260828181914331-2b5187ee7edbae42.json"
          - ".agentplane/tasks/202608280529-59VB06/verification/20260828185032879-7a1266da64904bc0.json"
          - ".agentplane/tasks/202608280614-PCBY2N/README.md"
          - ".agentplane/tasks/202608280614-PCBY2N/blueprint/resolved-snapshot.json"
          - ".agentplane/tasks/202608280614-PCBY2N/pr/diffstat.txt"
          - ".agentplane/tasks/202608280614-PCBY2N/pr/github-body.md"
          - ".agentplane/tasks/202608280614-PCBY2N/pr/github-title.txt"
          - ".agentplane/tasks/202608280614-PCBY2N/pr/meta.json"
          - ".agentplane/tasks/202608280614-PCBY2N/pr/review.md"
          - ".agentplane/tasks/202608280614-PCBY2N/quality/20260828-112915024-recovery-context/evaluator-evidence-manifest.json"
          - ".agentplane/tasks/202608280614-PCBY2N/quality/20260828-112915024-recovery-context/evaluator-opinion.md"
          - ".agentplane/tasks/202608280614-PCBY2N/quality/20260828-112915024-recovery-context/evaluator-result.json"
          - ".agentplane/tasks/202608280614-PCBY2N/quality/20260828-112915024-recovery-context/evaluator-work-order.json"
          - ".agentplane/tasks/202608280614-PCBY2N/quality/20260828-112915024-recovery-context/quality-report.json"
          - ".agentplane/tasks/202608280614-PCBY2N/quality/objects/sha256/167112d23a3809a69ce11c590bb2894d6d3e3faf1345fba7aff144166661a3df.patch"
          - ".agentplane/tasks/202608280614-PCBY2N/quality/objects/sha256/8f90f782af46a966c76dd5da65e416c01cf3411622326198570c32a970fec3b3.json"
          - ".agentplane/tasks/202608280614-PCBY2N/quality/objects/sha256/9037cdf98253e70333ede9358d360264a85ee905be64a8723bbdd4ca71e02d4a.json"
          - ".agentplane/tasks/202608280614-PCBY2N/quality/objects/sha256/b36787aabcc52d981eca63d4e3af434e33107ed9ccf1ae128be481174364df82.json"
          - ".agentplane/tasks/202608280614-PCBY2N/quality/objects/sha256/d14785f890fc8471120d4b446e0726677356828d07d89a361a0f44e435661c50.md"
          - ".agentplane/tasks/202608280614-PCBY2N/supervision/declared-checks.json"
          - ".agentplane/tasks/202608280614-PCBY2N/supervision/implementation-evidence.json"
          - ".agentplane/tasks/202608280614-PCBY2N/verification/20260828112857349-7df3e4f50a81c6b3.json"
          - ".agentplane/tasks/202608281151-WQ89A1/README.md"
          - ".agentplane/tasks/202608281151-WQ89A1/blueprint/resolved-snapshot.json"
          - ".agentplane/tasks/202608281151-WQ89A1/pr/diffstat.txt"
          - ".agentplane/tasks/202608281151-WQ89A1/pr/github-body.md"
          - ".agentplane/tasks/202608281151-WQ89A1/pr/github-title.txt"
          - ".agentplane/tasks/202608281151-WQ89A1/pr/meta.json"
          - ".agentplane/tasks/202608281151-WQ89A1/pr/review.md"
          - ".agentplane/tasks/202608281151-WQ89A1/quality/20260828-150601429-recovery-context/evaluator-evidence-manifest.json"
          - ".agentplane/tasks/202608281151-WQ89A1/quality/20260828-150601429-recovery-context/evaluator-opinion.md"
          - ".agentplane/tasks/202608281151-WQ89A1/quality/20260828-150601429-recovery-context/evaluator-result.json"
          - ".agentplane/tasks/202608281151-WQ89A1/quality/20260828-150601429-recovery-context/evaluator-work-order.json"
          - ".agentplane/tasks/202608281151-WQ89A1/quality/20260828-150601429-recovery-context/quality-report.json"
          - ".agentplane/tasks/202608281151-WQ89A1/quality/objects/sha256/10cb032f0abf80e517280add04bb38fa45a38a4188077f4ec44801ba6bde1b60.md"
          - ".agentplane/tasks/202608281151-WQ89A1/quality/objects/sha256/43169d59cb987746b213286a613126ae2137afffaf804712307b1f2b3a741c91.json"
          - ".agentplane/tasks/202608281151-WQ89A1/quality/objects/sha256/82ffda48c5bd3c808954f2b5392fefca5582063c40c2e392ae8e7400dca3a781.json"
          - ".agentplane/tasks/202608281151-WQ89A1/quality/objects/sha256/9037cdf98253e70333ede9358d360264a85ee905be64a8723bbdd4ca71e02d4a.json"
          - ".agentplane/tasks/202608281151-WQ89A1/quality/objects/sha256/98f3e36b297b1437355f74e2067b979339e47078ca441a1b89e73b498e0029e9.patch"
          - ".agentplane/tasks/202608281151-WQ89A1/supervision/declared-checks.json"
          - ".agentplane/tasks/202608281151-WQ89A1/supervision/implementation-evidence.json"
          - ".agentplane/tasks/202608281151-WQ89A1/verification/20260828150529537-22af9751a01470a1.json"
          - ".agentplane/tasks/202608290844-7JCQPF/README.md"
          - ".agentplane/tasks/202608290844-7JCQPF/blueprint/resolved-snapshot.json"
          - ".agentplane/tasks/202608290844-7JCQPF/pr/diffstat.txt"
          - ".agentplane/tasks/202608290844-7JCQPF/pr/github-body.md"
          - ".agentplane/tasks/202608290844-7JCQPF/pr/github-title.txt"
          - ".agentplane/tasks/202608290844-7JCQPF/pr/meta.json"
          - ".agentplane/tasks/202608290844-7JCQPF/pr/review.md"
          - ".agentplane/tasks/202608290844-7JCQPF/quality/20260829-091527574-recovery-context/evaluator-evidence-manifest.json"
          - ".agentplane/tasks/202608290844-7JCQPF/quality/20260829-091527574-recovery-context/evaluator-opinion.md"
          - ".agentplane/tasks/202608290844-7JCQPF/quality/20260829-091527574-recovery-context/evaluator-result.json"
          - ".agentplane/tasks/202608290844-7JCQPF/quality/20260829-091527574-recovery-context/evaluator-work-order.json"
          - ".agentplane/tasks/202608290844-7JCQPF/quality/20260829-091527574-recovery-context/quality-report.json"
          - ".agentplane/tasks/202608290844-7JCQPF/quality/20260829-135755737-recovery-context/evaluator-evidence-manifest.json"
          - ".agentplane/tasks/202608290844-7JCQPF/quality/20260829-135755737-recovery-context/evaluator-opinion.md"
          - ".agentplane/tasks/202608290844-7JCQPF/quality/20260829-135755737-recovery-context/evaluator-result.json"
          - ".agentplane/tasks/202608290844-7JCQPF/quality/20260829-135755737-recovery-context/evaluator-work-order.json"
          - ".agentplane/tasks/202608290844-7JCQPF/quality/20260829-135755737-recovery-context/quality-report.json"
          - ".agentplane/tasks/202608290844-7JCQPF/quality/20260829-154051921-recovery-context/evaluator-evidence-manifest.json"
          - ".agentplane/tasks/202608290844-7JCQPF/quality/20260829-154051921-recovery-context/evaluator-work-order.json"
          - ".agentplane/tasks/202608290844-7JCQPF/quality/20260829-154257984-recovery-context/evaluator-evidence-manifest.json"
          - ".agentplane/tasks/202608290844-7JCQPF/quality/20260829-154257984-recovery-context/evaluator-work-order.json"
          - ".agentplane/tasks/202608290844-7JCQPF/quality/20260829-154622554-recovery-context/evaluator-evidence-manifest.json"
          - ".agentplane/tasks/202608290844-7JCQPF/quality/20260829-154622554-recovery-context/evaluator-opinion.md"
          - ".agentplane/tasks/202608290844-7JCQPF/quality/20260829-154622554-recovery-context/evaluator-result.json"
          - ".agentplane/tasks/202608290844-7JCQPF/quality/20260829-154622554-recovery-context/evaluator-work-order.json"
          - ".agentplane/tasks/202608290844-7JCQPF/quality/20260829-154622554-recovery-context/quality-report.json"
          - ".agentplane/tasks/202608290844-7JCQPF/quality/20260829-165628160-recovery-context/evaluator-evidence-manifest.json"
          - ".agentplane/tasks/202608290844-7JCQPF/quality/20260829-165628160-recovery-context/evaluator-opinion.md"
          - ".agentplane/tasks/202608290844-7JCQPF/quality/20260829-165628160-recovery-context/evaluator-result.json"
          - ".agentplane/tasks/202608290844-7JCQPF/quality/20260829-165628160-recovery-context/evaluator-work-order.json"
          - ".agentplane/tasks/202608290844-7JCQPF/quality/20260829-165628160-recovery-context/quality-report.json"
          - ".agentplane/tasks/202608290844-7JCQPF/quality/objects/sha256/00cb8f6790a2d104fb8674882268758d2e941322ed8e92c3b5dc9e428fd8dce4.patch"
          - ".agentplane/tasks/202608290844-7JCQPF/quality/objects/sha256/094a699c910341a58afcb15c22105ae1b76587fcc875a385ab29d52916473829.json"
          - ".agentplane/tasks/202608290844-7JCQPF/quality/objects/sha256/0ac40dd9a245bdd7a6904bf832c36d53c5e8cf0e6f16f59e6ecea9c0f6dd8abc.json"
          - ".agentplane/tasks/202608290844-7JCQPF/quality/objects/sha256/2258e008d9ba7a086ad71c563a02b042962c03b0c5c940f4ea42f62bbb0eb012.patch"
          - ".agentplane/tasks/202608290844-7JCQPF/quality/objects/sha256/4f0352c5d6a2182a46e1c6f73e77b5f2708ad05adf67f8236213cab6bf722e40.patch"
          - ".agentplane/tasks/202608290844-7JCQPF/quality/objects/sha256/5a942fdbf7ae26d4b99cd24f9825b1a69678fafaf17cea7b1cb6739ea2315ec7.md"
          - ".agentplane/tasks/202608290844-7JCQPF/quality/objects/sha256/8151ee2edd7f965a2ab2a99ae032f5bb0480bbd6b0920b6e390d19304e950091.md"
          - ".agentplane/tasks/202608290844-7JCQPF/quality/objects/sha256/8a9ba323a4f7313e683932e5a199789ec48f072e7b92129fab34109e8df996f6.md"
          - ".agentplane/tasks/202608290844-7JCQPF/quality/objects/sha256/8f122888e39edc7063c8e2334278428e1e94b3a887b1354c9a6d0ad6ec3054cf.md"
          - ".agentplane/tasks/202608290844-7JCQPF/quality/objects/sha256/9037cdf98253e70333ede9358d360264a85ee905be64a8723bbdd4ca71e02d4a.json"
          - ".agentplane/tasks/202608290844-7JCQPF/quality/objects/sha256/9c4220d19202ff86a1d136041f176c55546dedfb87bfb3c92d111f797b57070f.md"
          - ".agentplane/tasks/202608290844-7JCQPF/quality/objects/sha256/bf246ecc6aed6a80440a3a0197ee6a33faa53b12ac072fd16ecde736ee4d7a69.json"
          - ".agentplane/tasks/202608290844-7JCQPF/quality/objects/sha256/e292f4d015d55c072e7e21144fc8791343a332c84a64d49e6164ed43ac4537ca.md"
          - ".agentplane/tasks/202608290844-7JCQPF/quality/objects/sha256/e36dbbcacb05dd26f53c2a444202d9451db4063b531311834485b11970ed6072.json"
          - ".agentplane/tasks/202608290844-7JCQPF/quality/objects/sha256/eba6a62437a3e1722cad7b6d477654c71e7c4ecea013a52313e862621c811e58.patch"
          - ".agentplane/tasks/202608290844-7JCQPF/quality/objects/sha256/f5a5751e9d32d9d24fb39379371b7291cd6420c99d10ecf8f0283eb09e84094e.json"
          - ".agentplane/tasks/202608290844-7JCQPF/supervision/declared-checks.json"
          - ".agentplane/tasks/202608290844-7JCQPF/supervision/implementation-evidence.json"
          - ".agentplane/tasks/202608290844-7JCQPF/verification/20260829090048568-8570d238d5b793a3.json"
          - ".agentplane/tasks/202608290844-7JCQPF/verification/20260829091431764-e529c93dd7f5a93e.json"
          - ".agentplane/tasks/202608290844-7JCQPF/verification/20260829091815695-7a192569682c3990.json"
          - ".agentplane/tasks/202608290844-7JCQPF/verification/20260829121518627-935aca8b41573d83.json"
          - ".agentplane/tasks/202608290844-7JCQPF/verification/20260829133155703-ba3bf05e6e8ab9b2.json"
          - ".agentplane/tasks/202608290844-7JCQPF/verification/20260829135723903-1e369e8c538b8c1d.json"
          - ".agentplane/tasks/202608290844-7JCQPF/verification/20260829140319538-403bd5a3f235102c.json"
          - ".agentplane/tasks/202608290844-7JCQPF/verification/20260829142522018-696e567acb8481c2.json"
          - ".agentplane/tasks/202608290844-7JCQPF/verification/20260829142603828-ccd96a6a223662af.json"
          - ".agentplane/tasks/202608290844-7JCQPF/verification/20260829143621259-88a931bdab985c02.json"
          - ".agentplane/tasks/202608290844-7JCQPF/verification/20260829144725405-280eceee3679149d.json"
          - ".agentplane/tasks/202608290844-7JCQPF/verification/20260829145124375-d0d20769bc9e2777.json"
          - ".agentplane/tasks/202608290844-7JCQPF/verification/20260829161700623-370a4f491fb5a800.json"
          - ".agentplane/tasks/202608290844-7JCQPF/verification/20260829165606401-4bf622d61e8adf7c.json"
          - ".agentplane/tasks/202608290920-1PZGG8/README.md"
          - ".agentplane/tasks/202608290920-1PZGG8/blueprint/resolved-snapshot.json"
          - ".agentplane/tasks/202608290920-1PZGG8/pr/diffstat.txt"
          - ".agentplane/tasks/202608290920-1PZGG8/pr/github-body.md"
          - ".agentplane/tasks/202608290920-1PZGG8/pr/github-title.txt"
          - ".agentplane/tasks/202608290920-1PZGG8/pr/meta.json"
          - ".agentplane/tasks/202608290920-1PZGG8/pr/review.md"
          - ".agentplane/tasks/202608290920-1PZGG8/quality/20260829-100207338-recovery-context/evaluator-evidence-manifest.json"
          - ".agentplane/tasks/202608290920-1PZGG8/quality/20260829-100207338-recovery-context/evaluator-follow-up.json"
          - ".agentplane/tasks/202608290920-1PZGG8/quality/20260829-100207338-recovery-context/evaluator-opinion.md"
          - ".agentplane/tasks/202608290920-1PZGG8/quality/20260829-100207338-recovery-context/evaluator-result.json"
          - ".agentplane/tasks/202608290920-1PZGG8/quality/20260829-100207338-recovery-context/evaluator-work-order.json"
          - ".agentplane/tasks/202608290920-1PZGG8/quality/20260829-100207338-recovery-context/quality-report.json"
          - ".agentplane/tasks/202608290920-1PZGG8/quality/20260829-112038164-recovery-context/evaluator-evidence-manifest.json"
          - ".agentplane/tasks/202608290920-1PZGG8/quality/20260829-112038164-recovery-context/evaluator-opinion.md"
          - ".agentplane/tasks/202608290920-1PZGG8/quality/20260829-112038164-recovery-context/evaluator-result.json"
          - ".agentplane/tasks/202608290920-1PZGG8/quality/20260829-112038164-recovery-context/evaluator-work-order.json"
          - ".agentplane/tasks/202608290920-1PZGG8/quality/20260829-112038164-recovery-context/quality-report.json"
          - ".agentplane/tasks/202608290920-1PZGG8/quality/objects/sha256/33ccc1d6b91deeda43925dda11bcb7871d4177f0b26d9f3f8f154203d618a3bf.patch"
          - ".agentplane/tasks/202608290920-1PZGG8/quality/objects/sha256/5bf18a85abd14fe0a9a2152613220bc2ad006608710b4b329837619185c0189d.json"
          - ".agentplane/tasks/202608290920-1PZGG8/quality/objects/sha256/6238bed33ff5edad09db6bb76534efbfd68babd7775a75c0db7b0b53a128a033.patch"
          - ".agentplane/tasks/202608290920-1PZGG8/quality/objects/sha256/6ab11382be85eb26466f9d0685b65b522e69c1ff5b74c1f152d4cb04e06604ca.md"
          - ".agentplane/tasks/202608290920-1PZGG8/quality/objects/sha256/6ff4eeeac1fb74deb063645fd271923073c9a9756944f516b8d10fb36ad1dcfd.json"
          - ".agentplane/tasks/202608290920-1PZGG8/quality/objects/sha256/9037cdf98253e70333ede9358d360264a85ee905be64a8723bbdd4ca71e02d4a.json"
          - ".agentplane/tasks/202608290920-1PZGG8/quality/objects/sha256/de714e1ae1e5247163e5007b3fe727baf606367028fdd58ebcb9f94f7333b4d9.md"
          - ".agentplane/tasks/202608290920-1PZGG8/quality/objects/sha256/e35839039295af7993b80adfdaa63da9729d59a2955432cd06975115f9057010.json"
          - ".agentplane/tasks/202608290920-1PZGG8/supervision/declared-checks.json"
          - ".agentplane/tasks/202608290920-1PZGG8/supervision/implementation-evidence.json"
          - ".agentplane/tasks/202608290920-1PZGG8/verification/20260829093430895-6606b487cced4039.json"
          - ".agentplane/tasks/202608290920-1PZGG8/verification/20260829105535831-b4c997c8906f47d0.json"
          - ".agentplane/tasks/202608290920-1PZGG8/verification/20260829105705983-3742ca4441ecc2c3.json"
          - ".agentplane/tasks/202608290920-1PZGG8/verification/20260829105843774-eef5a01e10b276a9.json"
          - ".agentplane/tasks/202608290920-1PZGG8/verification/20260829110002485-b669a1777bc06949.json"
          - ".agentplane/tasks/202608290920-1PZGG8/verification/20260829112024099-2dc4de9558ceb003.json"
          - ".agentplane/tasks/202608291005-K5TG4D/README.md"
          - ".agentplane/tasks/202608291005-K5TG4D/blueprint/resolved-snapshot.json"
          - ".agentplane/tasks/202608291005-K5TG4D/pr/diffstat.txt"
          - ".agentplane/tasks/202608291005-K5TG4D/pr/github-body.md"
          - ".agentplane/tasks/202608291005-K5TG4D/pr/github-title.txt"
          - ".agentplane/tasks/202608291005-K5TG4D/pr/meta.json"
          - ".agentplane/tasks/202608291005-K5TG4D/pr/review.md"
          - ".agentplane/tasks/202608291005-K5TG4D/quality/20260829-103229021-recovery-context/evaluator-evidence-manifest.json"
          - ".agentplane/tasks/202608291005-K5TG4D/quality/20260829-103229021-recovery-context/evaluator-follow-up.json"
          - ".agentplane/tasks/202608291005-K5TG4D/quality/20260829-103229021-recovery-context/evaluator-opinion.md"
          - ".agentplane/tasks/202608291005-K5TG4D/quality/20260829-103229021-recovery-context/evaluator-result.json"
          - ".agentplane/tasks/202608291005-K5TG4D/quality/20260829-103229021-recovery-context/evaluator-work-order.json"
          - ".agentplane/tasks/202608291005-K5TG4D/quality/20260829-103229021-recovery-context/quality-report.json"
          - ".agentplane/tasks/202608291005-K5TG4D/quality/20260829-104022155-recovery-context/evaluator-evidence-manifest.json"
          - ".agentplane/tasks/202608291005-K5TG4D/quality/20260829-104022155-recovery-context/evaluator-opinion.md"
          - ".agentplane/tasks/202608291005-K5TG4D/quality/20260829-104022155-recovery-context/evaluator-result.json"
          - ".agentplane/tasks/202608291005-K5TG4D/quality/20260829-104022155-recovery-context/evaluator-work-order.json"
          - ".agentplane/tasks/202608291005-K5TG4D/quality/20260829-104022155-recovery-context/quality-report.json"
          - ".agentplane/tasks/202608291005-K5TG4D/quality/20260829-173248762-recovery-context/evaluator-evidence-manifest.json"
          - ".agentplane/tasks/202608291005-K5TG4D/quality/20260829-173248762-recovery-context/evaluator-follow-up.json"
          - ".agentplane/tasks/202608291005-K5TG4D/quality/20260829-173248762-recovery-context/evaluator-opinion.md"
          - ".agentplane/tasks/202608291005-K5TG4D/quality/20260829-173248762-recovery-context/evaluator-result.json"
          - ".agentplane/tasks/202608291005-K5TG4D/quality/20260829-173248762-recovery-context/evaluator-work-order.json"
          - ".agentplane/tasks/202608291005-K5TG4D/quality/20260829-173248762-recovery-context/quality-report.json"
          - ".agentplane/tasks/202608291005-K5TG4D/quality/20260829-175010445-recovery-context/evaluator-evidence-manifest.json"
          - ".agentplane/tasks/202608291005-K5TG4D/quality/20260829-175010445-recovery-context/evaluator-opinion.md"
          - ".agentplane/tasks/202608291005-K5TG4D/quality/20260829-175010445-recovery-context/evaluator-result.json"
          - ".agentplane/tasks/202608291005-K5TG4D/quality/20260829-175010445-recovery-context/evaluator-work-order.json"
          - ".agentplane/tasks/202608291005-K5TG4D/quality/20260829-175010445-recovery-context/quality-report.json"
          - ".agentplane/tasks/202608291005-K5TG4D/quality/20260829-182509713-recovery-context/evaluator-evidence-manifest.json"
          - ".agentplane/tasks/202608291005-K5TG4D/quality/20260829-182509713-recovery-context/evaluator-opinion.md"
          - ".agentplane/tasks/202608291005-K5TG4D/quality/20260829-182509713-recovery-context/evaluator-result.json"
          - ".agentplane/tasks/202608291005-K5TG4D/quality/20260829-182509713-recovery-context/evaluator-work-order.json"
          - ".agentplane/tasks/202608291005-K5TG4D/quality/20260829-182509713-recovery-context/quality-report.json"
          - ".agentplane/tasks/202608291005-K5TG4D/quality/20260829-185822288-recovery-context/evaluator-evidence-manifest.json"
          - ".agentplane/tasks/202608291005-K5TG4D/quality/20260829-185822288-recovery-context/evaluator-opinion.md"
          - ".agentplane/tasks/202608291005-K5TG4D/quality/20260829-185822288-recovery-context/evaluator-result.json"
          - ".agentplane/tasks/202608291005-K5TG4D/quality/20260829-185822288-recovery-context/evaluator-work-order.json"
          - ".agentplane/tasks/202608291005-K5TG4D/quality/20260829-185822288-recovery-context/quality-report.json"
          - ".agentplane/tasks/202608291005-K5TG4D/quality/objects/sha256/03778a2ec59a89f86c77156b5c41749d8a0acbbdbda469294abad9d305f10155.json"
          - ".agentplane/tasks/202608291005-K5TG4D/quality/objects/sha256/07880f19b498431ef1d30b34fe2764e8b0fc650f427c040a2f0edc42c28f3b77.patch"
          - ".agentplane/tasks/202608291005-K5TG4D/quality/objects/sha256/0ced6f2c554a98af94d8e04123277a903da54392ebd92f3890c3a1c95ad75119.patch"
          - ".agentplane/tasks/202608291005-K5TG4D/quality/objects/sha256/1766f852085b004801c6b30bc74a4001f961ab6633e748f9d98d616dc6014fd4.md"
          - ".agentplane/tasks/202608291005-K5TG4D/quality/objects/sha256/2c17fdb65687181ba468e5cc9c2c3f984594a087910177a2a5891e3d95c0b2bb.patch"
          - ".agentplane/tasks/202608291005-K5TG4D/quality/objects/sha256/3bc81fab9e1463c5f3fc60e5327889cf576ad0e6813951c0f8f1c2aa2eb9ee55.patch"
          - ".agentplane/tasks/202608291005-K5TG4D/quality/objects/sha256/3da9d9fcb461bfc780a881e70453aaccb486b17c451b01ad89eb2b0eaa86b047.json"
          - ".agentplane/tasks/202608291005-K5TG4D/quality/objects/sha256/4514df8c306e4d9a4ba9c3d9383dee50e018667e53be66060da5eff32d761945.md"
          - ".agentplane/tasks/202608291005-K5TG4D/quality/objects/sha256/525c6509aac711b4d08c0090cc345b850ddebc82785837269bf692ee7e0f3136.md"
          - ".agentplane/tasks/202608291005-K5TG4D/quality/objects/sha256/69ada31950ca4db1dad4000541000ad3a3ab1150d54f116721dd24d4e2524dcc.json"
          - ".agentplane/tasks/202608291005-K5TG4D/quality/objects/sha256/727ea4cda0736b773d528b2de77e5229e46b9a933447c5a044ab9c8b9023c7b5.md"
          - ".agentplane/tasks/202608291005-K5TG4D/quality/objects/sha256/73eb709075c74a980968c0120a0294a67f005c9c2ff4ce66b7d285a631ceec90.json"
          - ".agentplane/tasks/202608291005-K5TG4D/quality/objects/sha256/7dc71118b2a8cd17ec7401ec0c3f4bdf02a52e16ca3172258eb6ae28fb15e051.json"
          - ".agentplane/tasks/202608291005-K5TG4D/quality/objects/sha256/80da80d9c3d52d3e25efbebf8895def8aa6134897e7646a5ed91c95a5fb37eb7.md"
          - ".agentplane/tasks/202608291005-K5TG4D/quality/objects/sha256/8d06a0bda439bd3cbb2a6a861bb3d632c3591570cb548e661e456561e6ebd0e3.patch"
          - ".agentplane/tasks/202608291005-K5TG4D/quality/objects/sha256/9037cdf98253e70333ede9358d360264a85ee905be64a8723bbdd4ca71e02d4a.json"
          - ".agentplane/tasks/202608291005-K5TG4D/quality/objects/sha256/991fe4f8cfd40b027fed1e34442956c77ba8324246953e0dfae571500cb2b31d.patch"
          - ".agentplane/tasks/202608291005-K5TG4D/quality/objects/sha256/c97155edadb265cb8b9e27094be1f5b53e338048ada37daee80cc3249047ec4f.json"
          - ".agentplane/tasks/202608291005-K5TG4D/quality/objects/sha256/de7dbf9bc2b623c88ba3ae813c42951e54995cde51ca26406dd6b51bf6fb6653.md"
          - ".agentplane/tasks/202608291005-K5TG4D/quality/objects/sha256/ebc86feacec7bdf43d9a1fdbf283a72e4634bef2dfceb9d03c2812644d0bc6fe.json"
          - ".agentplane/tasks/202608291005-K5TG4D/supervision/declared-checks.json"
          - ".agentplane/tasks/202608291005-K5TG4D/supervision/implementation-evidence.json"
          - ".agentplane/tasks/202608291005-K5TG4D/verification/20260829102927784-2ba47b70cf364a12.json"
          - ".agentplane/tasks/202608291005-K5TG4D/verification/20260829103744095-ab63071946986abe.json"
          - ".agentplane/tasks/202608291005-K5TG4D/verification/20260829104004712-22365c9597c0e6ce.json"
          - ".agentplane/tasks/202608291005-K5TG4D/verification/20260829171951260-f6b36db68eb2b50b.json"
          - ".agentplane/tasks/202608291005-K5TG4D/verification/20260829172303993-9558dcfb624109e6.json"
          - ".agentplane/tasks/202608291005-K5TG4D/verification/20260829173023681-a890bff98f1f1613.json"
          - ".agentplane/tasks/202608291005-K5TG4D/verification/20260829173606626-1d584fb7c8bed007.json"
          - ".agentplane/tasks/202608291005-K5TG4D/verification/20260829174126559-55291239fcb3e058.json"
          - ".agentplane/tasks/202608291005-K5TG4D/verification/20260829174619560-6bb5d9fd8340f4b4.json"
          - ".agentplane/tasks/202608291005-K5TG4D/verification/20260829174953384-9a1611a4242d4cd2.json"
          - ".agentplane/tasks/202608291005-K5TG4D/verification/20260829182451924-4a24553f3cae3f0f.json"
          - ".agentplane/tasks/202608291005-K5TG4D/verification/20260829184121098-79ba9f5978aab118.json"
          - ".agentplane/tasks/202608291005-K5TG4D/verification/20260829185804313-ec46cd710c0a1ae8.json"
          - ".agentplane/tasks/202608291505-F5AN0W/README.md"
          - ".agentplane/tasks/202608291505-F5AN0W/blueprint/resolved-snapshot.json"
          - ".agentplane/tasks/202608291505-F5AN0W/pr/diffstat.txt"
          - ".agentplane/tasks/202608291505-F5AN0W/pr/github-body.md"
          - ".agentplane/tasks/202608291505-F5AN0W/pr/github-title.txt"
          - ".agentplane/tasks/202608291505-F5AN0W/pr/meta.json"
          - ".agentplane/tasks/202608291505-F5AN0W/pr/review.md"
          - ".agentplane/tasks/202608291505-F5AN0W/quality/20260829-151703472-recovery-context/evaluator-evidence-manifest.json"
          - ".agentplane/tasks/202608291505-F5AN0W/quality/20260829-151703472-recovery-context/evaluator-opinion.md"
          - ".agentplane/tasks/202608291505-F5AN0W/quality/20260829-151703472-recovery-context/evaluator-result.json"
          - ".agentplane/tasks/202608291505-F5AN0W/quality/20260829-151703472-recovery-context/evaluator-work-order.json"
          - ".agentplane/tasks/202608291505-F5AN0W/quality/20260829-151703472-recovery-context/quality-report.json"
          - ".agentplane/tasks/202608291505-F5AN0W/quality/objects/sha256/34de800803c95065a60ed554ec20ee9e458e08e3eba91b1e37ed7a5fc6939a61.json"
          - ".agentplane/tasks/202608291505-F5AN0W/quality/objects/sha256/3be09f0b87c195e91069dbd310c3854392dd52abe1630e89c3c0b44acfd4f669.patch"
          - ".agentplane/tasks/202608291505-F5AN0W/quality/objects/sha256/41553f2e37d02a2a9ed9c27741445e29255fbfcc80aa18d77feafed25fb17fd8.md"
          - ".agentplane/tasks/202608291505-F5AN0W/quality/objects/sha256/4ed68c6fd1d0c009d994cd956e8cb679ed2f606ddcae63c2e86222ac1634e772.json"
          - ".agentplane/tasks/202608291505-F5AN0W/quality/objects/sha256/9037cdf98253e70333ede9358d360264a85ee905be64a8723bbdd4ca71e02d4a.json"
          - ".agentplane/tasks/202608291505-F5AN0W/supervision/declared-checks.json"
          - ".agentplane/tasks/202608291505-F5AN0W/supervision/implementation-evidence.json"
          - ".agentplane/tasks/202608291505-F5AN0W/verification/20260829151633691-2b8fca041d5695de.json"
          - ".agentplane/tasks/202608292032-1K47B8/README.md"
          - ".agentplane/tasks/202608292032-1K47B8/blueprint/resolved-snapshot.json"
          - ".agentplane/tasks/202608292032-1K47B8/pr/diffstat.txt"
          - ".agentplane/tasks/202608292032-1K47B8/pr/github-body.md"
          - ".agentplane/tasks/202608292032-1K47B8/pr/github-title.txt"
          - ".agentplane/tasks/202608292032-1K47B8/pr/meta.json"
          - ".agentplane/tasks/202608292032-1K47B8/pr/review.md"
          - ".agentplane/tasks/202608292032-1K47B8/quality/20260829-221228710-recovery-context/evaluator-evidence-manifest.json"
          - ".agentplane/tasks/202608292032-1K47B8/quality/20260829-221228710-recovery-context/evaluator-opinion.md"
          - ".agentplane/tasks/202608292032-1K47B8/quality/20260829-221228710-recovery-context/evaluator-result.json"
          - ".agentplane/tasks/202608292032-1K47B8/quality/20260829-221228710-recovery-context/evaluator-work-order.json"
          - ".agentplane/tasks/202608292032-1K47B8/quality/20260829-221228710-recovery-context/quality-report.json"
          - ".agentplane/tasks/202608292032-1K47B8/quality/20260830-014956776-recovery-context/evaluator-evidence-manifest.json"
          - ".agentplane/tasks/202608292032-1K47B8/quality/20260830-014956776-recovery-context/evaluator-follow-up.json"
          - ".agentplane/tasks/202608292032-1K47B8/quality/20260830-014956776-recovery-context/evaluator-opinion.md"
          - ".agentplane/tasks/202608292032-1K47B8/quality/20260830-014956776-recovery-context/evaluator-result.json"
          - ".agentplane/tasks/202608292032-1K47B8/quality/20260830-014956776-recovery-context/evaluator-work-order.json"
          - ".agentplane/tasks/202608292032-1K47B8/quality/20260830-014956776-recovery-context/quality-report.json"
          - ".agentplane/tasks/202608292032-1K47B8/quality/20260830-020852586-recovery-context/evaluator-evidence-manifest.json"
          - ".agentplane/tasks/202608292032-1K47B8/quality/20260830-020852586-recovery-context/evaluator-follow-up.json"
          - ".agentplane/tasks/202608292032-1K47B8/quality/20260830-020852586-recovery-context/evaluator-opinion.md"
          - ".agentplane/tasks/202608292032-1K47B8/quality/20260830-020852586-recovery-context/evaluator-result.json"
          - ".agentplane/tasks/202608292032-1K47B8/quality/20260830-020852586-recovery-context/evaluator-work-order.json"
          - ".agentplane/tasks/202608292032-1K47B8/quality/20260830-020852586-recovery-context/quality-report.json"
          - ".agentplane/tasks/202608292032-1K47B8/quality/20260830-022616722-recovery-context/evaluator-evidence-manifest.json"
          - ".agentplane/tasks/202608292032-1K47B8/quality/20260830-022616722-recovery-context/evaluator-follow-up.json"
          - ".agentplane/tasks/202608292032-1K47B8/quality/20260830-022616722-recovery-context/evaluator-opinion.md"
          - ".agentplane/tasks/202608292032-1K47B8/quality/20260830-022616722-recovery-context/evaluator-result.json"
          - ".agentplane/tasks/202608292032-1K47B8/quality/20260830-022616722-recovery-context/evaluator-work-order.json"
          - ".agentplane/tasks/202608292032-1K47B8/quality/20260830-022616722-recovery-context/quality-report.json"
          - ".agentplane/tasks/202608292032-1K47B8/quality/20260830-031507878-recovery-context/evaluator-evidence-manifest.json"
          - ".agentplane/tasks/202608292032-1K47B8/quality/20260830-031507878-recovery-context/evaluator-opinion.md"
          - ".agentplane/tasks/202608292032-1K47B8/quality/20260830-031507878-recovery-context/evaluator-result.json"
          - ".agentplane/tasks/202608292032-1K47B8/quality/20260830-031507878-recovery-context/evaluator-work-order.json"
          - ".agentplane/tasks/202608292032-1K47B8/quality/20260830-031507878-recovery-context/quality-report.json"
          - ".agentplane/tasks/202608292032-1K47B8/quality/objects/sha256/057b4113ef6c1d87a6a0c3ac3c46939bd871e81dc4f3c1b80129869074842092.patch"
          - ".agentplane/tasks/202608292032-1K47B8/quality/objects/sha256/2b30736d79fa3985a602ca79b8003a85696c1631aa650eb0a69f4b62a313d474.json"
          - ".agentplane/tasks/202608292032-1K47B8/quality/objects/sha256/31eb70979ca99b1b7baf8981a0aa4553f7836924a5a994ef188028919b165c2b.patch"
          - ".agentplane/tasks/202608292032-1K47B8/quality/objects/sha256/3dd6f4403a5f554c55142963371a7073049d6182f7d27407b73e562303e9abce.patch"
          - ".agentplane/tasks/202608292032-1K47B8/quality/objects/sha256/862b552d27a033d4119e9ae7e5436b8c29a143456489a4d14fe36e085df344c8.md"
          - ".agentplane/tasks/202608292032-1K47B8/quality/objects/sha256/8c21a0dae102df37781ea0703471756a6f4d2d97fcb284160d913ae3a336695e.json"
          - ".agentplane/tasks/202608292032-1K47B8/quality/objects/sha256/9037cdf98253e70333ede9358d360264a85ee905be64a8723bbdd4ca71e02d4a.json"
          - ".agentplane/tasks/202608292032-1K47B8/quality/objects/sha256/95b210af54b40faac12625eb2e712a51b734ab5d29796b4091d4b8ed4ba80724.md"
          - ".agentplane/tasks/202608292032-1K47B8/quality/objects/sha256/98a65c6e898cf6302e155442f9e9c0d591d7bf2aadd28d411d264e8c8b7485be.md"
          - ".agentplane/tasks/202608292032-1K47B8/quality/objects/sha256/9ce711649887bc636881f16928a22670e786265ea0c117f13d2613bc1b6f5fc2.patch"
          - ".agentplane/tasks/202608292032-1K47B8/quality/objects/sha256/9e9280b5ceb12fee8fdf6e8b7e283f15038b1c7e8f386ff82f56537c1b9c0ef7.md"
          - ".agentplane/tasks/202608292032-1K47B8/quality/objects/sha256/a042c1178c6dc91f1dba1c8d49a4edcb23a1ace5fa440eb47fcbe4820e3aeb19.json"
          - ".agentplane/tasks/202608292032-1K47B8/quality/objects/sha256/a1e6b2fe5c8facd48dfc66602704770fca1a35152897611f9d31210b22ee8a67.json"
          - ".agentplane/tasks/202608292032-1K47B8/quality/objects/sha256/cdccd39e524d1c90764685a8edd6ed62359da3abd8661ae465fa779bd9f3d0f9.json"
          - ".agentplane/tasks/202608292032-1K47B8/quality/objects/sha256/d79cfc55ccb00071fa070c6bbd3fdb6f55514df2d3d0381e943934ecaa5a55fc.patch"
          - ".agentplane/tasks/202608292032-1K47B8/quality/objects/sha256/ec06c6e7b7c18b069d7feb65ee296ee81d6dd16038b64f87e395a5e48cec1b36.md"
          - ".agentplane/tasks/202608292032-1K47B8/quality/objects/sha256/ef17fe668230493a9b07f598b59d087f0c79b80eefbd629aaeadaa33cdb8d767.json"
          - ".agentplane/tasks/202608292032-1K47B8/supervision/declared-checks.json"
          - ".agentplane/tasks/202608292032-1K47B8/supervision/implementation-evidence.json"
          - ".agentplane/tasks/202608292032-1K47B8/verification/20260829204319619-6c577c9c8306a169.json"
          - ".agentplane/tasks/202608292032-1K47B8/verification/20260829210140898-e3d969adc161f644.json"
          - ".agentplane/tasks/202608292032-1K47B8/verification/20260829212246580-d0145ef1b109b582.json"
          - ".agentplane/tasks/202608292032-1K47B8/verification/20260829213703792-b4d5487c553f5a17.json"
          - ".agentplane/tasks/202608292032-1K47B8/verification/20260829214826738-20b5311a327c1579.json"
          - ".agentplane/tasks/202608292032-1K47B8/verification/20260829215542838-893d49886b2f4a8e.json"
          - ".agentplane/tasks/202608292032-1K47B8/verification/20260829221218641-6fb97c97e2e96fa0.json"
          - ".agentplane/tasks/202608292032-1K47B8/verification/20260830003005735-5d60d1d702715321.json"
          - ".agentplane/tasks/202608292032-1K47B8/verification/20260830014945273-2738197afdbf32cb.json"
          - ".agentplane/tasks/202608292032-1K47B8/verification/20260830020840555-6abd518e792f9be0.json"
          - ".agentplane/tasks/202608292032-1K47B8/verification/20260830022602801-f4386fc8af0c0a93.json"
          - ".agentplane/tasks/202608292032-1K47B8/verification/20260830025715800-1f7012fe8ad951d0.json"
          - ".agentplane/tasks/202608292032-1K47B8/verification/20260830031455405-6315535599fc124b.json"
          - ".agentplane/tasks/202608292218-3N0FBK/README.md"
          - ".agentplane/tasks/202608292218-3N0FBK/blueprint/resolved-snapshot.json"
          - ".agentplane/tasks/202608292218-3N0FBK/pr/diffstat.txt"
          - ".agentplane/tasks/202608292218-3N0FBK/pr/github-body.md"
          - ".agentplane/tasks/202608292218-3N0FBK/pr/github-title.txt"
          - ".agentplane/tasks/202608292218-3N0FBK/pr/meta.json"
          - ".agentplane/tasks/202608292218-3N0FBK/pr/review.md"
          - ".agentplane/tasks/202608292218-3N0FBK/quality/20260829-232019133-recovery-context/evaluator-evidence-manifest.json"
          - ".agentplane/tasks/202608292218-3N0FBK/quality/20260829-232019133-recovery-context/evaluator-opinion.md"
          - ".agentplane/tasks/202608292218-3N0FBK/quality/20260829-232019133-recovery-context/evaluator-result.json"
          - ".agentplane/tasks/202608292218-3N0FBK/quality/20260829-232019133-recovery-context/evaluator-work-order.json"
          - ".agentplane/tasks/202608292218-3N0FBK/quality/20260829-232019133-recovery-context/quality-report.json"
          - ".agentplane/tasks/202608292218-3N0FBK/quality/objects/sha256/0746e6bf83a188f6678201af5c5c2e782aaaa0faebaf297aeaf0f1b9057cf4c2.md"
          - ".agentplane/tasks/202608292218-3N0FBK/quality/objects/sha256/6508f2281bdb76c7a51465f00997415cbb1144f19fa37a27045d5eb8eeaa13cf.patch"
          - ".agentplane/tasks/202608292218-3N0FBK/quality/objects/sha256/705fd23cea4f0661155d847cbe29aa51c0c7ce19052019f39df3424f3d34d10d.json"
          - ".agentplane/tasks/202608292218-3N0FBK/quality/objects/sha256/9037cdf98253e70333ede9358d360264a85ee905be64a8723bbdd4ca71e02d4a.json"
          - ".agentplane/tasks/202608292218-3N0FBK/quality/objects/sha256/9f512f0819486738a0914d14aafef8ee94d25191007e8e94c679c6aedca6fbd9.json"
          - ".agentplane/tasks/202608292218-3N0FBK/supervision/declared-checks.json"
          - ".agentplane/tasks/202608292218-3N0FBK/supervision/implementation-evidence.json"
          - ".agentplane/tasks/202608292218-3N0FBK/verification/20260829223458865-779a4c712ea93918.json"
          - ".agentplane/tasks/202608292218-3N0FBK/verification/20260829224625339-315ba0801ec5e6ea.json"
          - ".agentplane/tasks/202608292218-3N0FBK/verification/20260829225800434-b5f93cf6b11f2c61.json"
          - ".agentplane/tasks/202608292218-3N0FBK/verification/20260829230555501-2ec025e699fda236.json"
          - ".agentplane/tasks/202608292218-3N0FBK/verification/20260829232002016-276e3b6422ad5f09.json"
          - ".agentplane/tasks/202608300119-ZHYXRS/README.md"
          - ".agentplane/tasks/202608300119-ZHYXRS/blueprint/resolved-snapshot.json"
          - ".agentplane/tasks/202608300119-ZHYXRS/pr/diffstat.txt"
          - ".agentplane/tasks/202608300119-ZHYXRS/pr/github-body.md"
          - ".agentplane/tasks/202608300119-ZHYXRS/pr/github-title.txt"
          - ".agentplane/tasks/202608300119-ZHYXRS/pr/meta.json"
          - ".agentplane/tasks/202608300119-ZHYXRS/pr/review.md"
          - ".agentplane/tasks/202608300119-ZHYXRS/quality/20260830-014145339-recovery-context/evaluator-evidence-manifest.json"
          - ".agentplane/tasks/202608300119-ZHYXRS/quality/20260830-014145339-recovery-context/evaluator-opinion.md"
          - ".agentplane/tasks/202608300119-ZHYXRS/quality/20260830-014145339-recovery-context/evaluator-result.json"
          - ".agentplane/tasks/202608300119-ZHYXRS/quality/20260830-014145339-recovery-context/evaluator-work-order.json"
          - ".agentplane/tasks/202608300119-ZHYXRS/quality/20260830-014145339-recovery-context/quality-report.json"
          - ".agentplane/tasks/202608300119-ZHYXRS/quality/20260830-022732861-recovery-context/evaluator-evidence-manifest.json"
          - ".agentplane/tasks/202608300119-ZHYXRS/quality/20260830-022732861-recovery-context/evaluator-opinion.md"
          - ".agentplane/tasks/202608300119-ZHYXRS/quality/20260830-022732861-recovery-context/evaluator-result.json"
          - ".agentplane/tasks/202608300119-ZHYXRS/quality/20260830-022732861-recovery-context/evaluator-work-order.json"
          - ".agentplane/tasks/202608300119-ZHYXRS/quality/20260830-022732861-recovery-context/quality-report.json"
          - ".agentplane/tasks/202608300119-ZHYXRS/quality/objects/sha256/085818fb482ed6c75bdcd72074d2a06cd54a8963642055db58f4d5f95a5f417c.json"
          - ".agentplane/tasks/202608300119-ZHYXRS/quality/objects/sha256/0ae8f7054187226c4378474e61a236b83e14b480899aed7def309c417740ebc8.json"
          - ".agentplane/tasks/202608300119-ZHYXRS/quality/objects/sha256/68cd886e72e9a681f60c9770ffb31cc09b30751c52abfe3b9d62753ed744f3e9.json"
          - ".agentplane/tasks/202608300119-ZHYXRS/quality/objects/sha256/7bd203cf9dcbd8fd7fb54c71fb43608d75f904771948104bd6fb5e32111922c3.md"
          - ".agentplane/tasks/202608300119-ZHYXRS/quality/objects/sha256/9037cdf98253e70333ede9358d360264a85ee905be64a8723bbdd4ca71e02d4a.json"
          - ".agentplane/tasks/202608300119-ZHYXRS/quality/objects/sha256/9ca03923fb3436ecdd936ae66f4ce9710cdb58d8bccf37d570410152ec188918.md"
          - ".agentplane/tasks/202608300119-ZHYXRS/quality/objects/sha256/e4594a5165434d84043609c114251fb1d166c7612623342d185fb34239acfb29.patch"
          - ".agentplane/tasks/202608300119-ZHYXRS/quality/objects/sha256/efec60e7d3b43883689358d77d2278cfa5e0346ad57e5c8695bdc74cecff1470.patch"
          - ".agentplane/tasks/202608300119-ZHYXRS/supervision/declared-checks.json"
          - ".agentplane/tasks/202608300119-ZHYXRS/supervision/implementation-evidence.json"
          - ".agentplane/tasks/202608300119-ZHYXRS/verification/20260830013042448-9879d2e0317ba8ff.json"
          - ".agentplane/tasks/202608300119-ZHYXRS/verification/20260830014106431-a78ca4036e517933.json"
          - ".agentplane/tasks/202608300119-ZHYXRS/verification/20260830021428357-1faa3b8361b33f16.json"
          - ".agentplane/tasks/202608300119-ZHYXRS/verification/20260830022721719-75aba1a0c8379039.json"
          - "depcruise.config.cjs"
          - "docs/adr/0017-clean-task-core-rebuild.md"
          - "docs/adr/README.md"
          - "docs/developer/harness-dev.mdx"
          - "docs/developer/local-runtime-resolution.md"
          - "docs/reference/clean-task-core-rebuild-spec.mdx"
          - "packages/agentplane/assets/policy/incidents.md"
          - "packages/agentplane/src/cli/__snapshots__/run-cli.core.help-snap.test.ts.snap"
          - "packages/agentplane/src/cli/prompts.test.ts"
          - "packages/agentplane/src/cli/route-decision.testkit.ts"
          - "packages/agentplane/src/cli/run-cli.core.blueprint.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.direct-task-supervision.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.help-snap.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.incidents.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.lifecycle.finish-validation.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.lifecycle.plan.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.lifecycle.start-commit.policy.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.lifecycle.start-readiness.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.lifecycle.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.lifecycle.verify.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-notes-verify.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.artifacts.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.git.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.network.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-validation.open-hydration.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-validation.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-validation.update.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.pr-flow.start-ready.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.pr-flow.status.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.release-tasks-reconcile.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.route-decision.batch.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.route-decision.direct-closeout.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.route-decision.pr-open-metadata.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.route-decision.quality.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.route-decision.remote-confidence.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.route-decision.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.route-decision.verification.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.task-advance-effect-recovery.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.task-advance.branch-worktree.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.task-advance.evaluator-recovery.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.task-advance.evidence-rework.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.task-advance.worktree-resolution.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.task-create-base-intent.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.task-create-planner-intent.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.task-guided.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.task-handoff.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.task-next-action-json.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.task-routing.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.task-status-token-usage.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.tasks.active.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.tasks.lifecycle.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.tasks.user-create.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.tasks.verify-matrix.test.ts"
          - "packages/agentplane/src/cli/run-cli/commands/init/prompts.test.ts"
          - "packages/agentplane/src/cli/task-advance-effect-recovery.testkit.ts"
          - "packages/agentplane/src/cli/task-continuity.testkit.ts"
          - "packages/agentplane/src/cli/task-create-planner-intent.testkit.ts"
          - "packages/agentplane/src/commands/evaluator/evaluator-episode.calibration.test.ts"
          - "packages/agentplane/src/commands/evaluator/evaluator-review-usecase.ts"
          - "packages/agentplane/src/commands/evaluator/evaluator-runtime-evidence.test.ts"
          - "packages/agentplane/src/commands/pr/head-publication.test.ts"
          - "packages/agentplane/src/commands/pr/head-publication.ts"
          - "packages/agentplane/src/commands/pr/provider-update-branch-local.test.ts"
          - "packages/agentplane/src/commands/pr/provider-update-branch-local.ts"
          - "packages/agentplane/src/commands/pr/provider-update-branch.test.ts"
          - "packages/agentplane/src/commands/pr/provider-update-branch.ts"
          - "packages/agentplane/src/commands/shared/pr-meta/verify-log.test.ts"
          - "packages/agentplane/src/commands/shared/pr-meta/verify-log.ts"
          - "packages/agentplane/src/commands/shared/provider-update-branch-route.ts"
          - "packages/agentplane/src/commands/shared/quality-review-retirement.ts"
          - "packages/agentplane/src/commands/shared/route-decision-blockers.quality-review.test.ts"
          - "packages/agentplane/src/commands/shared/route-decision-blockers.ts"
          - "packages/agentplane/src/commands/shared/route-gate-priority.ts"
          - "packages/agentplane/src/commands/shared/route-oracle.ts"
          - "packages/agentplane/src/commands/shared/side-effect-authority.test.ts"
          - "packages/agentplane/src/commands/shared/side-effect-authority.ts"
          - "packages/agentplane/src/commands/shared/task-scope-extension-request.ts"
          - "packages/agentplane/src/commands/shared/workflow-operation-effects.ts"
          - "packages/agentplane/src/commands/shared/workflow-operation-prefix.ts"
          - "packages/agentplane/src/commands/shared/workflow-operation-projection.registry.test.ts"
          - "packages/agentplane/src/commands/shared/workflow-operation-projection.ts"
          - "packages/agentplane/src/commands/shared/workflow-postconditions.ts"
          - "packages/agentplane/src/commands/shared/workflow-step-branch.ts"
          - "packages/agentplane/src/commands/shared/workflow-step-factory.ts"
          - "packages/agentplane/src/commands/shared/workflow-step-projections.conflict-rework.test.ts"
          - "packages/agentplane/src/commands/shared/workflow-step-provider-update-branch-spec.ts"
          - "packages/agentplane/src/commands/shared/workflow-step-provider-update-branch.ts"
          - "packages/agentplane/src/commands/shared/workflow-step-quality.test.ts"
          - "packages/agentplane/src/commands/shared/workflow-step.ts"
          - "packages/agentplane/src/commands/task/branch-task-supervisor-operations.test.ts"
          - "packages/agentplane/src/commands/task/branch-task-supervisor-operations.ts"
          - "packages/agentplane/src/commands/task/configured-authority.test.ts"
          - "packages/agentplane/src/commands/task/direct-task-verification.test.ts"
          - "packages/agentplane/src/commands/task/direct-task-verification.ts"
          - "packages/agentplane/src/commands/task/external-agent-evaluator-recovery.test.ts"
          - "packages/agentplane/src/commands/task/external-agent-evaluator-recovery.ts"
          - "packages/agentplane/src/commands/task/external-agent-implementation-authority.ts"
          - "packages/agentplane/src/commands/task/external-agent-implementation-recovery.test.ts"
          - "packages/agentplane/src/commands/task/external-agent-implementation-recovery.ts"
          - "packages/agentplane/src/commands/task/external-agent-planning-authority.test.ts"
          - "packages/agentplane/src/commands/task/external-agent-planning-authority.ts"
          - "packages/agentplane/src/commands/task/external-agent-supervisor-recovery.ts"
          - "packages/agentplane/src/commands/task/external-agent-supervisor.ts"
          - "packages/agentplane/src/commands/task/finish-shared.ts"
          - "packages/agentplane/src/commands/task/scope-extend.test.ts"
          - "packages/agentplane/src/commands/task/task-centric-external-result.test.ts"
          - "packages/agentplane/src/commands/task/task-centric-external-result.ts"
          - "packages/agentplane/src/commands/task/verify-record-execute.ts"
          - "packages/agentplane/src/commands/task/verify-record.durability.unit.test.ts"
          - "packages/agentplane/src/commands/task/verify-record.unit.test.ts"
          - "packages/agentplane/src/runner/adapters/custom-security.test.ts"
          - "packages/agentplane/src/runner/artifacts.ts"
          - "packages/agentplane/src/runner/execution-receipt.ts"
          - "packages/agentplane/src/runner/process-supervision/result.ts"
          - "packages/agentplane/src/runner/process-supervision/run.ts"
          - "packages/agentplane/src/runner/process-supervision/state.ts"
          - "packages/agentplane/src/runner/runtime-env.integration.test.ts"
          - "packages/agentplane/src/runner/types/state.ts"
          - "packages/agentplane/src/runtime/task-execution-context/resolve.test.ts"
          - "packages/agentplane/src/shared/runtime-env.test.ts"
          - "packages/agentplane/src/shared/runtime-env.ts"
          - "packages/core/src/tasks/index.ts"
          - "packages/core/src/tasks/task-centric/graph.ts"
          - "packages/core/src/tasks/task-centric/task-centric.test.ts"
          - "packages/core/src/tasks/task-kernel/M1-QUALIFICATION.md"
          - "packages/core/src/tasks/task-kernel/index.ts"
          - "packages/core/src/tasks/task-kernel/invariants.test.ts"
          - "packages/core/src/tasks/task-kernel/invariants.ts"
          - "packages/core/src/tasks/task-kernel/kernel.test-fixtures.ts"
          - "packages/core/src/tasks/task-kernel/kernel.test.ts"
          - "packages/core/src/tasks/task-kernel/kernel.ts"
          - "packages/core/src/tasks/task-kernel/model.test.ts"
          - "packages/core/src/tasks/task-kernel/model.ts"
          - "packages/testkit/src/cli-core-pr-flow.ts"
          - "packages/testkit/src/cli.test.ts"
          - "scripts/qualification/check-packaged-mixed-scope-lifecycle.mjs"
          - "scripts/qualification/release-qualification.test.mjs"
          - "website/static/img/social/docs/adr/0017-clean-task-core-rebuild.png"
          - "website/static/img/social/docs/reference/clean-task-core-rebuild-spec.png"
          - "website/static/img/social/manifest.json"
        external_effects: []
        repository_effects:
          - "documentation"
          - "repository_write"
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
      - "repository_effect:documentation"
      - "repository_effect:repository_write"
      - "repository_effect:security_boundary"
      - "repository_effect:source_code"
      - "repository_effect:tests"
      - "task_outcome"
      - "verification_recovery:verification-record"
commit:
  hash: "00207fd19a5fa292172b6a09d9affe297a227668"
  message: "🚧 V287W1 task: record external evaluator result"
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: 846ffaccbdec. CLI accepted one state-bound external-agent semantic result."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: eaf67c9057bb. CLI accepted one state-bound external-agent semantic result."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: 5819defbabe4. CLI accepted one state-bound external-agent semantic result."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: bf870e63a2cd. CLI accepted one state-bound external-agent semantic result."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: daf594dbe372. CLI accepted one state-bound external-agent semantic result."
  -
    author: "CODER"
    body: "Verified: pre-merge closure packet is ready for the task PR."
  -
    author: "SUPERVISOR"
    body: "Read-only worktree observation (completed): Read-only inspection completed. Four untracked Task-owned quality artifacts are genuine output from the earlier prepare step. Preserve them as historical evidence. They target daf594dbe372635d26bb67af0b9ee83ef6ac3c40 and cannot qualify semantic merge 26b69b0fece6e4d9a8dfd013d6cafefadd4acf61. No source conflict or unrelated change is present. The supervisor may preserve these exact artifacts through its lifecycle path; fresh exact-merge verification is required after bootstrap 3MDRBH is integrated."
  -
    author: "SUPERVISOR"
    body: "Read-only worktree observation (completed): The five untracked quality files are intended AgentPlane-generated frozen evaluator inputs for implementation 26b69b0fece6e4d9a8dfd013d6cafefadd4acf61. They were produced by the fresh evaluator preparation at 2026-08-30T08:15:35.655Z. Preserve and record these task-owned artifacts. No source changes, manual quality edits or external effects were made. The stale evaluator envelope was retired by AgentPlane; request a fresh evaluator episode after recording the observation."
  -
    author: "SUPERVISOR"
    body: "Read-only worktree observation (completed): All dirty files are intended Task-owned review artifacts. The operator recovery command evaluator apply validated the frozen 08:26:09 work order and recorded PASS for exact implementation 26b69b0fece6e4d9a8dfd013d6cafefadd4acf61. Preserve the README quality-review update and generated quality evidence. No implementation, policy, verification input or provider state was changed. AgentPlane owns recording these artifacts and continuing through fresh pre-merge closure and hosted qualification."
  -
    author: "SUPERVISOR"
    body: "Read-only worktree observation (completed): Preserve all intended Task-owned quality artifacts and the README review update. The 08:31:41 work order is historical retired input. The independent operator-prepared 08:35:31 work order and its evaluator apply PASS are current evidence for exact semantic merge 26b69b0fece6e4d9a8dfd013d6cafefadd4acf61. All nine hashes were verified; implementation, checks and verification bytes are unchanged. No source, policy or provider mutation occurred. AgentPlane should record these artifacts and recompute the normal closeout route."
events:
  -
    type: "status"
    at: "2026-08-30T03:06:28.261Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-08-30T03:24:14.153Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: 846ffaccbdec. CLI accepted one state-bound external-agent semantic result."
    commit: "846ffaccbdecfdfb07eb4000e6a943616090ad70"
  -
    type: "verify"
    at: "2026-08-30T03:30:52.423Z"
    author: "SUPERVISOR"
    state: "needs_rework"
    note: "Rework: Declared check failed: bun run ci:local:full"
  -
    type: "status"
    at: "2026-08-30T03:33:39.107Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: eaf67c9057bb. CLI accepted one state-bound external-agent semantic result."
    commit: "eaf67c9057bbb3ac9334088848157986aa890290"
  -
    type: "verify"
    at: "2026-08-30T03:40:59.794Z"
    author: "SUPERVISOR"
    state: "ok"
    note: "Verified: CLI-owned checks passed before independent EVALUATOR review."
  -
    type: "verify"
    at: "2026-08-30T04:06:29.644Z"
    author: "TESTER"
    state: "needs_rework"
    note: "Committed diff check failed after ESLint autofix: custom-security.test.ts contains trailing whitespace at lines 337, 342, 347 and 352 in implementation 9ae23e29f. No semantic test failure. Remove whitespace and requalify through a fresh executor packet."
  -
    type: "status"
    at: "2026-08-30T04:09:09.005Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: 5819defbabe4. CLI accepted one state-bound external-agent semantic result."
    commit: "5819defbabe468507c0f70bee3b9d430530be29c"
  -
    type: "verify"
    at: "2026-08-30T04:15:24.255Z"
    author: "SUPERVISOR"
    state: "needs_rework"
    note: "Rework: Declared check failed: bun run ci:local:full"
  -
    type: "status"
    at: "2026-08-30T04:32:11.059Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: bf870e63a2cd. CLI accepted one state-bound external-agent semantic result."
    commit: "bf870e63a2cdbdb52fda9bb60176ddeab3a924f7"
  -
    type: "verify"
    at: "2026-08-30T04:39:36.670Z"
    author: "SUPERVISOR"
    state: "ok"
    note: "Verified: CLI-owned checks passed before independent EVALUATOR review."
  -
    type: "status"
    at: "2026-08-30T04:48:38.555Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: daf594dbe372. CLI accepted one state-bound external-agent semantic result."
    commit: "daf594dbe372635d26bb67af0b9ee83ef6ac3c40"
  -
    type: "verify"
    at: "2026-08-30T04:59:53.524Z"
    author: "SUPERVISOR"
    state: "ok"
    note: "Verified: CLI-owned checks passed before independent EVALUATOR review."
  -
    type: "status"
    at: "2026-08-30T05:20:24.205Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: pre-merge closure packet is ready for the task PR."
    commit: "00207fd19a5fa292172b6a09d9affe297a227668"
  -
    type: "verify"
    at: "2026-08-30T05:56:53.203Z"
    author: "TESTER"
    state: "ok"
    note: "Verified: full local CI and 34 control tests passed after semantic conflict resolution at 26b69b0fe; hosted integration remains pending."
  -
    type: "comment"
    at: "2026-08-30T07:49:32.441Z"
    author: "SUPERVISOR"
    body: "Read-only worktree observation (completed): Read-only inspection completed. Four untracked Task-owned quality artifacts are genuine output from the earlier prepare step. Preserve them as historical evidence. They target daf594dbe372635d26bb67af0b9ee83ef6ac3c40 and cannot qualify semantic merge 26b69b0fece6e4d9a8dfd013d6cafefadd4acf61. No source conflict or unrelated change is present. The supervisor may preserve these exact artifacts through its lifecycle path; fresh exact-merge verification is required after bootstrap 3MDRBH is integrated."
  -
    type: "verify"
    at: "2026-08-30T08:11:15.015Z"
    author: "SUPERVISOR"
    state: "ok"
    note: "Verified: CLI-owned declared checks passed; independent EVALUATOR review is pending."
  -
    type: "comment"
    at: "2026-08-30T08:25:53.268Z"
    author: "SUPERVISOR"
    body: "Read-only worktree observation (completed): The five untracked quality files are intended AgentPlane-generated frozen evaluator inputs for implementation 26b69b0fece6e4d9a8dfd013d6cafefadd4acf61. They were produced by the fresh evaluator preparation at 2026-08-30T08:15:35.655Z. Preserve and record these task-owned artifacts. No source changes, manual quality edits or external effects were made. The stale evaluator envelope was retired by AgentPlane; request a fresh evaluator episode after recording the observation."
  -
    type: "comment"
    at: "2026-08-30T08:31:26.308Z"
    author: "SUPERVISOR"
    body: "Read-only worktree observation (completed): All dirty files are intended Task-owned review artifacts. The operator recovery command evaluator apply validated the frozen 08:26:09 work order and recorded PASS for exact implementation 26b69b0fece6e4d9a8dfd013d6cafefadd4acf61. Preserve the README quality-review update and generated quality evidence. No implementation, policy, verification input or provider state was changed. AgentPlane owns recording these artifacts and continuing through fresh pre-merge closure and hosted qualification."
  -
    type: "comment"
    at: "2026-08-30T08:37:14.337Z"
    author: "SUPERVISOR"
    body: "Read-only worktree observation (completed): Preserve all intended Task-owned quality artifacts and the README review update. The 08:31:41 work order is historical retired input. The independent operator-prepared 08:35:31 work order and its evaluator apply PASS are current evidence for exact semantic merge 26b69b0fece6e4d9a8dfd013d6cafefadd4acf61. All nine hashes were verified; implementation, checks and verification bytes are unchanged. No source, policy or provider mutation occurred. AgentPlane should record these artifacts and recompute the normal closeout route."
doc_version: 3
doc_updated_at: "2026-08-30T08:37:14.397Z"
doc_updated_by: "SUPERVISOR"
description: "Fix the observed defect where verification reports `bun: command not found` even though Bun is installed and available on the host. Confirm the root cause across agents, Supervisor, verification, and recovery subprocess production paths instead of assuming it is Supervisor-only. Establish one centralized executable resolver and normalized local runtime environment shared by default across those paths, without user-specific absolute paths and without per-agent PATH configuration by default. Explicit runtime profiles and task or execution overrides must take precedence over normalized defaults. Preserve inherited host PATH entries while resolving supported standard runtime locations deterministically. Distinguish executable-resolution or environment failure from implementation or test failure; if that typed classification requires a separate architectural change beyond this resolver, create a follow-up Task rather than widening this Task. Regression acceptance must exercise the production execution path with a deliberately reduced parent PATH, prove Bun resolution from a supported standard location, and prove fail-closed behavior with an explicit infrastructure-classified result when Bun is genuinely absent."
sections:
  Summary: |-
    AP-RUNTIME-001 Make local execution runtime deterministic

    Observed symptom: verification can report `bun: command not found` even though Bun is installed and available on the host. The violated invariant is that verification of the same execution contract on the same repository state must not depend on the parent shell PATH.

    Confirm the root cause across agents, Supervisor, verification, and recovery subprocess production paths; do not assume Supervisor is the sole owner. Implement one centralized executable resolver and normalized local runtime environment shared by those local paths by default. Explicit runtime profiles and task or execution overrides take precedence. Do not encode user-specific absolute paths or create per-agent PATH configuration as the default. Distinguish executable-resolution or environment failure from implementation or test failure; split a follow-up Task if typed classification requires a separate architectural change.
  Scope: |-
    - In scope: trace executable and environment propagation through the production launch paths for agents, Supervisor, verification, and recovery subprocesses; define and implement one shared local runtime resolver; preserve inherited host PATH entries while adding supported standard runtime locations deterministically; enforce precedence for explicit runtime profiles and task or execution overrides; emit enough structured evidence to distinguish resolution failure from implementation or test failure; add production-path regressions for reduced PATH and true executable absence.
    - Required invariant: verification of one execution contract on one repository state does not change solely because AgentPlane was launched from a different parent shell PATH.
    - Required regression: launch the production execution path with a deliberately reduced parent PATH and an isolated fixture home containing Bun in a supported standard location; prove the resolved Bun is executed.
    - Required fail-closed regression: remove Bun from both PATH and every supported standard location; prove no unrelated executable is selected and the outcome is an explicit infrastructure or executable-resolution failure, not an implementation failure.
    - Out of scope: user-specific absolute paths; per-agent PATHs as the default model; container or remote runtime unification; release 0.7.8 scope; redesign of the full verification-result taxonomy when it can be isolated as a follow-up Task.
  Plan: "Plan one cohesive runtime implementation WorkItem with shared resolver hardening, production propagation and evidence qualification. Reuse runtime-env.ts; preserve explicit overrides and canonical authority."
  Verify Steps: |-
    1. Run standalone and root-referenced child Tasks through agent, Supervisor, verification, and recovery subprocesses. Expected: identical executable resolution and shared environment semantics.
    2. Restart from base and child worktree. Expected: deterministic toolchain identity and preserved root provenance.
    3. Change PATH or toolchain. Expected: old receipts cannot be reused and authority remains canonical rather than environment-derived.
    4. Omit a required executable. Expected: typed infrastructure failure, not product failure or authority widening.
    5. Run runtime, subprocess, receipt, installed CLI, and root-child integration tests.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-08-30T03:30:52.423Z — VERIFY — needs_rework

    By: SUPERVISOR

    Note: Rework: Declared check failed: bun run ci:local:full
    Attempts: 1

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:6b4a90a00629d4251c2e20a1c8d0affcac23f80998acbda3ba0aa60559c77656, input_digest=sha256:662550a4afa531436620a3de058c0263090e62afd93530949292d244e87808e7

    Details:

    Command: bun run ci:local:full
    Result: fail
    Evidence: .agentplane/tasks/202608251706-V287W1/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608251706-V287W1 declared verification

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608251706-V287W1-ap-runtime-001-make-local-execution-runtime-dete/.agentplane/tasks/202608251706-V287W1/blueprint/resolved-snapshot.json
    - old_digest: 1e66c76a78609a97f5cd128422e5e2722d341505f5b69118c1434c54aa793981
    - current_digest: 1e66c76a78609a97f5cd128422e5e2722d341505f5b69118c1434c54aa793981
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608251706-V287W1

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: none
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-08-30T03:40:59.794Z — VERIFY — ok

    By: SUPERVISOR

    Note: Verified: CLI-owned checks passed before independent EVALUATOR review.
    Attempts: 0

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:6b4a90a00629d4251c2e20a1c8d0affcac23f80998acbda3ba0aa60559c77656, input_digest=sha256:93f0c2f9a7d14a5849b3db10b7424a0fb057a30c09ba061f2e1ff13b77382ab8

    Details:

    Check: affected_unit_integration
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608251706-V287W1/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608251706-V287W1 Verification Contract check affected_unit_integration (1/4)

    Check: affected_unit_integration
    Command: git diff --check
    Result: pass
    Evidence: .agentplane/tasks/202608251706-V287W1/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608251706-V287W1 Verification Contract check affected_unit_integration (2/4)

    Check: affected_unit_integration
    Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: .agentplane/tasks/202608251706-V287W1/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202608251706-V287W1 Verification Contract check affected_unit_integration (3/4)

    Check: affected_unit_integration
    Command: agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202608251706-V287W1/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202608251706-V287W1 Verification Contract check affected_unit_integration (4/4)

    Check: critical_paths
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608251706-V287W1/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608251706-V287W1 Verification Contract check critical_paths (1/4)

    Check: critical_paths
    Command: git diff --check
    Result: pass
    Evidence: .agentplane/tasks/202608251706-V287W1/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608251706-V287W1 Verification Contract check critical_paths (2/4)

    Check: critical_paths
    Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: .agentplane/tasks/202608251706-V287W1/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202608251706-V287W1 Verification Contract check critical_paths (3/4)

    Check: critical_paths
    Command: agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202608251706-V287W1/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202608251706-V287W1 Verification Contract check critical_paths (4/4)

    Check: docs_contract
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608251706-V287W1/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608251706-V287W1 Verification Contract check docs_contract (1/4)

    Check: docs_contract
    Command: git diff --check
    Result: pass
    Evidence: .agentplane/tasks/202608251706-V287W1/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608251706-V287W1 Verification Contract check docs_contract (2/4)

    Check: docs_contract
    Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: .agentplane/tasks/202608251706-V287W1/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202608251706-V287W1 Verification Contract check docs_contract (3/4)

    Check: docs_contract
    Command: agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202608251706-V287W1/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202608251706-V287W1 Verification Contract check docs_contract (4/4)

    Check: full_regression
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608251706-V287W1/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608251706-V287W1 Verification Contract check full_regression

    Check: task_outcome
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608251706-V287W1/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608251706-V287W1 Verification Contract check task_outcome (1/4)

    Check: task_outcome
    Command: git diff --check
    Result: pass
    Evidence: .agentplane/tasks/202608251706-V287W1/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608251706-V287W1 Verification Contract check task_outcome (2/4)

    Check: task_outcome
    Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: .agentplane/tasks/202608251706-V287W1/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202608251706-V287W1 Verification Contract check task_outcome (3/4)

    Check: task_outcome
    Command: agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202608251706-V287W1/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202608251706-V287W1 Verification Contract check task_outcome (4/4)

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608251706-V287W1-ap-runtime-001-make-local-execution-runtime-dete/.agentplane/tasks/202608251706-V287W1/blueprint/resolved-snapshot.json
    - old_digest: 1e66c76a78609a97f5cd128422e5e2722d341505f5b69118c1434c54aa793981
    - current_digest: 1e66c76a78609a97f5cd128422e5e2722d341505f5b69118c1434c54aa793981
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608251706-V287W1

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: none
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-08-30T04:06:29.644Z — VERIFY — needs_rework

    By: TESTER

    Note: Committed diff check failed after ESLint autofix: custom-security.test.ts contains trailing whitespace at lines 337, 342, 347 and 352 in implementation 9ae23e29f. No semantic test failure. Remove whitespace and requalify through a fresh executor packet.
    Attempts: 1

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:6b4a90a00629d4251c2e20a1c8d0affcac23f80998acbda3ba0aa60559c77656, input_digest=sha256:5e5785f7dbf868f12f3f7ce627af61ab0f610ba934819952bf4c544bdc57ec87

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608251706-V287W1-ap-runtime-001-make-local-execution-runtime-dete/.agentplane/tasks/202608251706-V287W1/blueprint/resolved-snapshot.json
    - old_digest: 1e66c76a78609a97f5cd128422e5e2722d341505f5b69118c1434c54aa793981
    - current_digest: 1e66c76a78609a97f5cd128422e5e2722d341505f5b69118c1434c54aa793981
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608251706-V287W1

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202608251706-V287W1
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-08-30T04:15:24.255Z — VERIFY — needs_rework

    By: SUPERVISOR

    Note: Rework: Declared check failed: bun run ci:local:full
    Attempts: 2

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:6b4a90a00629d4251c2e20a1c8d0affcac23f80998acbda3ba0aa60559c77656, input_digest=sha256:243758068152565bb1434d730356746acca7b4a3b87504f3e765431809bd2534

    Details:

    Command: bun run ci:local:full
    Result: fail
    Evidence: .agentplane/tasks/202608251706-V287W1/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608251706-V287W1 declared verification

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608251706-V287W1-ap-runtime-001-make-local-execution-runtime-dete/.agentplane/tasks/202608251706-V287W1/blueprint/resolved-snapshot.json
    - old_digest: 1e66c76a78609a97f5cd128422e5e2722d341505f5b69118c1434c54aa793981
    - current_digest: 1e66c76a78609a97f5cd128422e5e2722d341505f5b69118c1434c54aa793981
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608251706-V287W1

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202608251706-V287W1
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-08-30T04:39:36.670Z — VERIFY — ok

    By: SUPERVISOR

    Note: Verified: CLI-owned checks passed before independent EVALUATOR review.
    Attempts: 0

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:6b4a90a00629d4251c2e20a1c8d0affcac23f80998acbda3ba0aa60559c77656, input_digest=sha256:f1e76aef951bbaafd5d017a4ac29e0b8e5f22f33fbaeab26624c1214587ef3c3

    Details:

    Check: affected_unit_integration
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608251706-V287W1/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608251706-V287W1 Verification Contract check affected_unit_integration (1/4)

    Check: affected_unit_integration
    Command: git diff --check
    Result: pass
    Evidence: .agentplane/tasks/202608251706-V287W1/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608251706-V287W1 Verification Contract check affected_unit_integration (2/4)

    Check: affected_unit_integration
    Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: .agentplane/tasks/202608251706-V287W1/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202608251706-V287W1 Verification Contract check affected_unit_integration (3/4)

    Check: affected_unit_integration
    Command: agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202608251706-V287W1/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202608251706-V287W1 Verification Contract check affected_unit_integration (4/4)

    Check: critical_paths
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608251706-V287W1/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608251706-V287W1 Verification Contract check critical_paths (1/4)

    Check: critical_paths
    Command: git diff --check
    Result: pass
    Evidence: .agentplane/tasks/202608251706-V287W1/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608251706-V287W1 Verification Contract check critical_paths (2/4)

    Check: critical_paths
    Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: .agentplane/tasks/202608251706-V287W1/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202608251706-V287W1 Verification Contract check critical_paths (3/4)

    Check: critical_paths
    Command: agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202608251706-V287W1/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202608251706-V287W1 Verification Contract check critical_paths (4/4)

    Check: docs_contract
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608251706-V287W1/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608251706-V287W1 Verification Contract check docs_contract (1/4)

    Check: docs_contract
    Command: git diff --check
    Result: pass
    Evidence: .agentplane/tasks/202608251706-V287W1/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608251706-V287W1 Verification Contract check docs_contract (2/4)

    Check: docs_contract
    Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: .agentplane/tasks/202608251706-V287W1/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202608251706-V287W1 Verification Contract check docs_contract (3/4)

    Check: docs_contract
    Command: agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202608251706-V287W1/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202608251706-V287W1 Verification Contract check docs_contract (4/4)

    Check: full_regression
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608251706-V287W1/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608251706-V287W1 Verification Contract check full_regression

    Check: task_outcome
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608251706-V287W1/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608251706-V287W1 Verification Contract check task_outcome (1/4)

    Check: task_outcome
    Command: git diff --check
    Result: pass
    Evidence: .agentplane/tasks/202608251706-V287W1/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608251706-V287W1 Verification Contract check task_outcome (2/4)

    Check: task_outcome
    Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: .agentplane/tasks/202608251706-V287W1/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202608251706-V287W1 Verification Contract check task_outcome (3/4)

    Check: task_outcome
    Command: agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202608251706-V287W1/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202608251706-V287W1 Verification Contract check task_outcome (4/4)

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608251706-V287W1-ap-runtime-001-make-local-execution-runtime-dete/.agentplane/tasks/202608251706-V287W1/blueprint/resolved-snapshot.json
    - old_digest: 1e66c76a78609a97f5cd128422e5e2722d341505f5b69118c1434c54aa793981
    - current_digest: 1e66c76a78609a97f5cd128422e5e2722d341505f5b69118c1434c54aa793981
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608251706-V287W1

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202608251706-V287W1
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-08-30T04:59:53.524Z — VERIFY — ok

    By: SUPERVISOR

    Note: Verified: CLI-owned checks passed before independent EVALUATOR review.
    Attempts: 0

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:6b4a90a00629d4251c2e20a1c8d0affcac23f80998acbda3ba0aa60559c77656, input_digest=sha256:f817e0adad6e36987f1eb704d57797706f1170828206f0d515e39db859f36be9

    Details:

    Check: affected_unit_integration
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608251706-V287W1/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608251706-V287W1 Verification Contract check affected_unit_integration (1/4)

    Check: affected_unit_integration
    Command: git diff --check
    Result: pass
    Evidence: .agentplane/tasks/202608251706-V287W1/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608251706-V287W1 Verification Contract check affected_unit_integration (2/4)

    Check: affected_unit_integration
    Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: .agentplane/tasks/202608251706-V287W1/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202608251706-V287W1 Verification Contract check affected_unit_integration (3/4)

    Check: affected_unit_integration
    Command: agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202608251706-V287W1/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202608251706-V287W1 Verification Contract check affected_unit_integration (4/4)

    Check: critical_paths
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608251706-V287W1/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608251706-V287W1 Verification Contract check critical_paths (1/4)

    Check: critical_paths
    Command: git diff --check
    Result: pass
    Evidence: .agentplane/tasks/202608251706-V287W1/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608251706-V287W1 Verification Contract check critical_paths (2/4)

    Check: critical_paths
    Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: .agentplane/tasks/202608251706-V287W1/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202608251706-V287W1 Verification Contract check critical_paths (3/4)

    Check: critical_paths
    Command: agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202608251706-V287W1/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202608251706-V287W1 Verification Contract check critical_paths (4/4)

    Check: docs_contract
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608251706-V287W1/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608251706-V287W1 Verification Contract check docs_contract (1/4)

    Check: docs_contract
    Command: git diff --check
    Result: pass
    Evidence: .agentplane/tasks/202608251706-V287W1/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608251706-V287W1 Verification Contract check docs_contract (2/4)

    Check: docs_contract
    Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: .agentplane/tasks/202608251706-V287W1/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202608251706-V287W1 Verification Contract check docs_contract (3/4)

    Check: docs_contract
    Command: agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202608251706-V287W1/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202608251706-V287W1 Verification Contract check docs_contract (4/4)

    Check: full_regression
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608251706-V287W1/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608251706-V287W1 Verification Contract check full_regression

    Check: task_outcome
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608251706-V287W1/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608251706-V287W1 Verification Contract check task_outcome (1/4)

    Check: task_outcome
    Command: git diff --check
    Result: pass
    Evidence: .agentplane/tasks/202608251706-V287W1/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608251706-V287W1 Verification Contract check task_outcome (2/4)

    Check: task_outcome
    Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: .agentplane/tasks/202608251706-V287W1/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202608251706-V287W1 Verification Contract check task_outcome (3/4)

    Check: task_outcome
    Command: agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202608251706-V287W1/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202608251706-V287W1 Verification Contract check task_outcome (4/4)

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608251706-V287W1-ap-runtime-001-make-local-execution-runtime-dete/.agentplane/tasks/202608251706-V287W1/blueprint/resolved-snapshot.json
    - old_digest: 1e66c76a78609a97f5cd128422e5e2722d341505f5b69118c1434c54aa793981
    - current_digest: 1e66c76a78609a97f5cd128422e5e2722d341505f5b69118c1434c54aa793981
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608251706-V287W1

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202608251706-V287W1
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-08-30T05:56:53.203Z — VERIFY — ok

    By: TESTER

    Note: Verified: full local CI and 34 control tests passed after semantic conflict resolution at 26b69b0fe; hosted integration remains pending.
    Attempts: 0

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:6b4a90a00629d4251c2e20a1c8d0affcac23f80998acbda3ba0aa60559c77656, input_digest=sha256:0bf070b6569b257fe541d64d43cf16d2b4a6a2952a41346f895a9190e1c5160b

    Details:

    Check: affected_unit_integration
    Command: bun run ci:local:full
    Result: pass
    Evidence: Full local CI exited 0 after conflict resolution. Implementation SHA 26b69b0fece6e4d9a8dfd013d6cafefadd4acf61; published artifact-only descendant a5debd7e6387a3ac88fc32f5adc9379b52d76972. Build, runtime, docs-schema, core and CLI groups passed; Windows platform-critical 98 tests passed; significant coverage passed. Raw log sha256:48c10c7a0636aa08814235dc605e50125c1412ae96b7e0d68c6c6c79a1524c06. Hosted integration remains a separate pending gate.
    Scope: deterministic local runtime and verification integration after base reconciliation

    Check: critical_paths
    Command: bun run ci:local:full
    Result: pass
    Evidence: Full local CI exited 0 after conflict resolution. Implementation SHA 26b69b0fece6e4d9a8dfd013d6cafefadd4acf61; published artifact-only descendant a5debd7e6387a3ac88fc32f5adc9379b52d76972. Build, runtime, docs-schema, core and CLI groups passed; Windows platform-critical 98 tests passed; significant coverage passed. Raw log sha256:48c10c7a0636aa08814235dc605e50125c1412ae96b7e0d68c6c6c79a1524c06. Hosted integration remains a separate pending gate.
    Scope: deterministic local runtime and verification integration after base reconciliation

    Check: docs_contract
    Command: bun run ci:local:full
    Result: pass
    Evidence: Full local CI exited 0 after conflict resolution. Implementation SHA 26b69b0fece6e4d9a8dfd013d6cafefadd4acf61; published artifact-only descendant a5debd7e6387a3ac88fc32f5adc9379b52d76972. Build, runtime, docs-schema, core and CLI groups passed; Windows platform-critical 98 tests passed; significant coverage passed. Raw log sha256:48c10c7a0636aa08814235dc605e50125c1412ae96b7e0d68c6c6c79a1524c06. Hosted integration remains a separate pending gate.
    Scope: deterministic local runtime and verification integration after base reconciliation

    Check: full_regression
    Command: bun run ci:local:full
    Result: pass
    Evidence: Full local CI exited 0 after conflict resolution. Implementation SHA 26b69b0fece6e4d9a8dfd013d6cafefadd4acf61; published artifact-only descendant a5debd7e6387a3ac88fc32f5adc9379b52d76972. Build, runtime, docs-schema, core and CLI groups passed; Windows platform-critical 98 tests passed; significant coverage passed. Raw log sha256:48c10c7a0636aa08814235dc605e50125c1412ae96b7e0d68c6c6c79a1524c06. Hosted integration remains a separate pending gate.
    Scope: deterministic local runtime and verification integration after base reconciliation

    Check: task_outcome
    Command: bun run ci:local:full
    Result: pass
    Evidence: Full local CI exited 0 after conflict resolution. Implementation SHA 26b69b0fece6e4d9a8dfd013d6cafefadd4acf61; published artifact-only descendant a5debd7e6387a3ac88fc32f5adc9379b52d76972. Build, runtime, docs-schema, core and CLI groups passed; Windows platform-critical 98 tests passed; significant coverage passed. Raw log sha256:48c10c7a0636aa08814235dc605e50125c1412ae96b7e0d68c6c6c79a1524c06. Hosted integration remains a separate pending gate.
    Scope: deterministic local runtime and verification integration after base reconciliation

    Check: affected_unit_integration
    Command: bun x vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task/direct-task-verification.test.ts packages/agentplane/src/shared/runtime-env.test.ts packages/agentplane/src/commands/shared/pr-meta/verify-log.test.ts
    Result: pass
    Evidence: 34 tests in 3 files passed; preserved dotenv isolation, explicit parent values, runtime normalization and frozen verification mapping.
    Scope: semantic conflict resolution

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608251706-V287W1-ap-runtime-001-make-local-execution-runtime-dete/.agentplane/tasks/202608251706-V287W1/blueprint/resolved-snapshot.json
    - old_digest: 1e66c76a78609a97f5cd128422e5e2722d341505f5b69118c1434c54aa793981
    - current_digest: 1e66c76a78609a97f5cd128422e5e2722d341505f5b69118c1434c54aa793981
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608251706-V287W1

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: none
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-08-30T08:11:15.015Z — VERIFY — ok

    By: SUPERVISOR

    Note: Verified: CLI-owned declared checks passed; independent EVALUATOR review is pending.
    Attempts: 0

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:6b4a90a00629d4251c2e20a1c8d0affcac23f80998acbda3ba0aa60559c77656, input_digest=sha256:cc3dff7e9ec734792c1397264606848ade5b98345505e006808f4443c8da2737

    Details:

    Check: affected_unit_integration
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608251706-V287W1/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608251706-V287W1 Verification Contract check affected_unit_integration (1/4)

    Check: affected_unit_integration
    Command: git diff --check
    Result: pass
    Evidence: .agentplane/tasks/202608251706-V287W1/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608251706-V287W1 Verification Contract check affected_unit_integration (2/4)

    Check: affected_unit_integration
    Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: .agentplane/tasks/202608251706-V287W1/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202608251706-V287W1 Verification Contract check affected_unit_integration (3/4)

    Check: affected_unit_integration
    Command: agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202608251706-V287W1/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202608251706-V287W1 Verification Contract check affected_unit_integration (4/4)

    Check: critical_paths
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608251706-V287W1/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608251706-V287W1 Verification Contract check critical_paths (1/4)

    Check: critical_paths
    Command: git diff --check
    Result: pass
    Evidence: .agentplane/tasks/202608251706-V287W1/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608251706-V287W1 Verification Contract check critical_paths (2/4)

    Check: critical_paths
    Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: .agentplane/tasks/202608251706-V287W1/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202608251706-V287W1 Verification Contract check critical_paths (3/4)

    Check: critical_paths
    Command: agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202608251706-V287W1/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202608251706-V287W1 Verification Contract check critical_paths (4/4)

    Check: docs_contract
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608251706-V287W1/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608251706-V287W1 Verification Contract check docs_contract (1/4)

    Check: docs_contract
    Command: git diff --check
    Result: pass
    Evidence: .agentplane/tasks/202608251706-V287W1/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608251706-V287W1 Verification Contract check docs_contract (2/4)

    Check: docs_contract
    Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: .agentplane/tasks/202608251706-V287W1/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202608251706-V287W1 Verification Contract check docs_contract (3/4)

    Check: docs_contract
    Command: agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202608251706-V287W1/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202608251706-V287W1 Verification Contract check docs_contract (4/4)

    Check: full_regression
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608251706-V287W1/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608251706-V287W1 Verification Contract check full_regression

    Check: task_outcome
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608251706-V287W1/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608251706-V287W1 Verification Contract check task_outcome (1/4)

    Check: task_outcome
    Command: git diff --check
    Result: pass
    Evidence: .agentplane/tasks/202608251706-V287W1/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608251706-V287W1 Verification Contract check task_outcome (2/4)

    Check: task_outcome
    Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: .agentplane/tasks/202608251706-V287W1/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202608251706-V287W1 Verification Contract check task_outcome (3/4)

    Check: task_outcome
    Command: agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202608251706-V287W1/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202608251706-V287W1 Verification Contract check task_outcome (4/4)

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608251706-V287W1-ap-runtime-001-make-local-execution-runtime-dete/.agentplane/tasks/202608251706-V287W1/blueprint/resolved-snapshot.json
    - old_digest: 1e66c76a78609a97f5cd128422e5e2722d341505f5b69118c1434c54aa793981
    - current_digest: 1e66c76a78609a97f5cd128422e5e2722d341505f5b69118c1434c54aa793981
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608251706-V287W1

    DecisionContextRef:
    - operator_action: stop
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
  Findings: |-
    Roadmap intake on 2026-08-25:

    - The observed symptom is evidence of environment-dependent executable resolution, not proof that Supervisor alone owns the defect.
    - Completed Task 202603271156-EAMB43 covers first-class repository development bootstrap, not normalized runtime propagation across agent, Supervisor, verification, and recovery production subprocesses.
    - AP-CORE-016 already owns environment-bound verification receipts and infrastructure classification for missing toolchain binaries, but it does not own executable discovery or PATH normalization.
    - Placement: depend on AP-CORE-012 and make AP-CORE-013 depend on this Task. This establishes deterministic runtime resolution before canonical verification semantics and leaves AP-CORE-016 downstream to consume the normalized environment and classification evidence.
    - This Task is post-0.7.8 roadmap work and adds no dependency to the live 0.7.8 release chain.
extensions:
  agentplane.execution_grant:
    actor: "USER"
    approval_evidence_digest: null
    approval_kind: "manual_operator"
    capabilities:
      - "provider.merge"
      - "provider.pr"
      - "repository.integrate"
      - "repository.write"
      - "task.lifecycle"
      - "task.scope.extend"
    completion_contract_digest: "sha256:8729f96da6b32837f004e10d458b49de0917b7d6597fa98f6cc1564560a8836a"
    digest: "sha256:3ac1874ff717d1bbf8bef5fac8045d0664e12b2cbe97edba7b62ab2c468470f0"
    grant_id: "4ed7c9be-4fcb-486a-a35f-67233d864039"
    issued_at: "2026-08-30T02:57:20.979Z"
    kind: "agentplane.execution_grant"
    plan_digest: "sha256:e3411f9c00014061a11d43ace35d9d858606b835080ff1323ab8b457c652078c"
    plan_revision: 10
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    scope_digest: "sha256:5fac9f1c25b4514daf0ec5af461afe6e7348472267c3357d588f2a206cf78d35"
    status: "active"
    task_id: "202608251706-V287W1"
  agentplane.task_centric:
    current_plan:
      approval:
        approved_at: "2026-08-30T02:57:20.979Z"
        approved_by: "USER"
        approved_digest: "sha256:0a32be0fe48f48a34d82bc81aa1c7b858cb333250aede98c0e3e543061660753"
        policy_facts:
          - "manual_operator"
        state: "approved"
      created_at: "2026-08-30T02:56:49.483Z"
      digest: "sha256:0a32be0fe48f48a34d82bc81aa1c7b858cb333250aede98c0e3e543061660753"
      proposal:
        assumptions:
          - "Keep runtime/environment provenance separate from canonical authorization. Do not infer authority from environment variables."
          - "Preserve unrelated worktrees and release scope. Use isolated fixture homes for missing-tool and fallback-location tests."
          - "The existing shared runtime-env module is the canonical owner; consolidate callers instead of adding independent per-agent PATH rules."
        planning_baseline:
          captured_at: "2026-08-30T02:52:10.563Z"
          config_digest: null
          context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
          digest: "sha256:bbbc096958309edd6ad4181d5f6a4eccd6da16cdc434429e6f44c4683f21f479"
          dirty_paths:
            - ".agentplane/tasks/202608210955-9SX2C6/README.md"
            - ".agentplane/tasks/202608212244-Q3QMJR/README.md"
            - ".agentplane/tasks/202608220034-FPEFRK/README.md"
            - ".agentplane/tasks/202608220034-FPEFRK/blueprint/resolved-snapshot.json"
            - ".agentplane/tasks/202608241434-129F8R/README.md"
            - ".agentplane/tasks/202608241434-EH8E74/README.md"
            - ".agentplane/tasks/202608241434-KCC9K4/README.md"
            - ".agentplane/tasks/202608241434-QQNDGT/README.md"
            - ".agentplane/tasks/202608241434-SFPD91/README.md"
            - ".agentplane/tasks/202608241434-TA84WK/README.md"
            - ".agentplane/tasks/202608241434-WVYA5T/README.md"
            - ".agentplane/tasks/202608241435-40YZCE/README.md"
            - ".agentplane/tasks/202608241435-73DA89/README.md"
            - ".agentplane/tasks/202608241435-D001ET/README.md"
            - ".agentplane/tasks/202608241435-HTV4K2/README.md"
            - ".agentplane/tasks/202608241435-NDR0BX/README.md"
            - ".agentplane/tasks/202608241435-RJXGHQ/README.md"
            - ".agentplane/tasks/202608241435-W3DG6V/README.md"
            - ".agentplane/tasks/202608241435-YSW0E0/README.md"
            - ".agentplane/tasks/202608241436-2G9DA8/README.md"
            - ".agentplane/tasks/202608241436-63W678/README.md"
            - ".agentplane/tasks/202608241436-8PJKJP/README.md"
            - ".agentplane/tasks/202608241436-99B067/README.md"
            - ".agentplane/tasks/202608241436-A87Y59/README.md"
            - ".agentplane/tasks/202608241436-DHPR5E/README.md"
            - ".agentplane/tasks/202608241436-H60MCY/README.md"
            - ".agentplane/tasks/202608241436-TX6TRF/README.md"
            - ".agentplane/tasks/202608241436-W6A113/README.md"
            - ".agentplane/tasks/202608241437-5YZ0N8/README.md"
            - ".agentplane/tasks/202608241437-H5418M/README.md"
            - ".agentplane/tasks/202608241437-SH3CDX/README.md"
            - ".agentplane/tasks/202608241437-V8BA7Q/README.md"
            - ".agentplane/tasks/202608241437-XY3950/README.md"
            - ".agentplane/tasks/202608250007-P5BWP0/README.md"
            - ".agentplane/tasks/202608250007-P5BWP0/blueprint/resolved-snapshot.json"
            - ".agentplane/tasks/202608251038-42AC0D/README.md"
            - ".agentplane/tasks/202608251053-QAZ236/README.md"
            - ".agentplane/tasks/202608251706-V287W1/README.md"
            - ".agentplane/tasks/202608251735-ZJ7YZE/README.md"
            - ".agentplane/tasks/202608252233-JR4T47/README.md"
            - ".agentplane/tasks/202608252234-4CKSWA/README.md"
            - ".agentplane/tasks/202608252234-4CKSWA/blueprint/resolved-snapshot.json"
            - ".agentplane/tasks/202608262032-MAJQ5E/README.md"
            - ".agentplane/tasks/202608270848-0RAFH9/README.md"
            - ".agentplane/tasks/202608270848-37XB2K/README.md"
            - ".agentplane/tasks/202608270848-N28TBB/README.md"
            - ".agentplane/tasks/202608270848-V32542/README.md"
            - ".agentplane/tasks/202608271350-HVGQPQ/README.md"
            - ".agentplane/tasks/202608291005-33PHG4/README.md"
            - ".agentplane/tasks/202608291006-255K66/README.md"
            - ".agentplane/tasks/202608291006-2A6BJC/README.md"
          git:
            kind: "commit"
            ref: null
            sha: "71519a0e675d7d460d27e7c5aea87d1f2363b9e2"
          policy_digest: null
          schema_version: 1
          task_history_cursor: "task-revision:9"
        schema_version: 1
        task_id: "202608251706-V287W1"
        top_level_validation:
          checks:
            -
              capability: "task.verify"
              command: "bun run ci:local:full"
              id: "runtime-full-ci"
              kind: "deterministic"
              required: true
            -
              capability: "task.verify"
              command: "git diff --check"
              id: "runtime-diff-check"
              kind: "deterministic"
              required: true
          criteria:
            -
              check_ids:
                - "runtime-full-ci"
              description: "Reuse and harden shared runtime-env resolution. Reduced inherited PATH resolves installed Node/Bun from supported explicit or standard locations; explicit execution/profile overrides win. Never select implicit relative-CWD candidates or non-executable files."
              id: "runtime-resolution"
              required: true
            -
              check_ids:
                - "runtime-full-ci"
              description: "Production runner, Supervisor verification and recovery subprocesses share normalized default runtime semantics. Preserve canonical authority and existing dotenv isolation. Add real subprocess regressions for fixture HOME, explicit overrides, root-referenced and standalone invocations, and true executable absence."
              id: "runtime-launches"
              required: true
            -
              check_ids:
                - "runtime-full-ci"
                - "runtime-diff-check"
              description: "Missing executables produce typed infrastructure evidence and cannot masquerade as implementation failures. Bind resolved runtime/environment identity to applicable receipts without secret values. Reuse existing failure and evidence contracts where possible."
              id: "runtime-evidence"
              required: true
          evidence_fingerprint: "sha256:c1247e039678d04591d413d9fb258152b206836f8438303ae30bff7fe8acc58b"
          schema_version: 1
        unresolved_questions: []
        work_items:
          schema_version: 1
          work_items:
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "runtime-full-ci"
                  description: "Reuse and harden shared runtime-env resolution. Reduced inherited PATH resolves installed Node/Bun from supported explicit or standard locations; explicit execution/profile overrides win. Never select implicit relative-CWD candidates or non-executable files."
                  id: "runtime-resolution"
                  required: true
                -
                  check_ids:
                    - "runtime-full-ci"
                  description: "Production runner, Supervisor verification and recovery subprocesses share normalized default runtime semantics. Preserve canonical authority and existing dotenv isolation. Add real subprocess regressions for fixture HOME, explicit overrides, root-referenced and standalone invocations, and true executable absence."
                  id: "runtime-launches"
                  required: true
                -
                  check_ids:
                    - "runtime-full-ci"
                    - "runtime-diff-check"
                  description: "Missing executables produce typed infrastructure evidence and cannot masquerade as implementation failures. Bind resolved runtime/environment identity to applicable receipts without secret values. Reuse existing failure and evidence contracts where possible."
                  id: "runtime-evidence"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 64000
                optional_sources: []
                required_sources:
                  - "repository"
                  - "task-document"
                symbol_hints:
                  - "withPreferredRuntimePath"
                  - "resolvePreferredNodeExecutable"
                  - "runSupervisedProcess"
                  - "verificationChildEnv"
                  - "runDirectTaskVerification"
              depends_on: []
              expected_outputs:
                - "deterministic-local-runtime-implementation"
              id: "deterministic-local-runtime"
              objective: "Implement one deterministic local runtime resolver and propagate its environment through production execution, verification and recovery paths with explicit override precedence and typed resolution evidence."
              optional: false
              priority: 0
              required_inputs: []
              resource_claims:
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/shared"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/runner"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/task"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/shared/pr-meta"
                -
                  kind: "path"
                  mode: "write"
                  resource: "docs/developer"
              risk: "high"
              scope_roots:
                - "packages/agentplane/src/shared"
                - "packages/agentplane/src/runner"
                - "packages/agentplane/src/commands/task"
                - "packages/agentplane/src/commands/shared/pr-meta"
                - "docs/developer"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bun run ci:local:full"
                    id: "runtime-full-ci"
                    kind: "deterministic"
                    required: true
                  -
                    capability: "task.verify"
                    command: "git diff --check"
                    id: "runtime-diff-check"
                    kind: "deterministic"
                    required: true
                criteria:
                  -
                    check_ids:
                      - "runtime-full-ci"
                    description: "Reuse and harden shared runtime-env resolution. Reduced inherited PATH resolves installed Node/Bun from supported explicit or standard locations; explicit execution/profile overrides win. Never select implicit relative-CWD candidates or non-executable files."
                    id: "runtime-resolution"
                    required: true
                  -
                    check_ids:
                      - "runtime-full-ci"
                    description: "Production runner, Supervisor verification and recovery subprocesses share normalized default runtime semantics. Preserve canonical authority and existing dotenv isolation. Add real subprocess regressions for fixture HOME, explicit overrides, root-referenced and standalone invocations, and true executable absence."
                    id: "runtime-launches"
                    required: true
                  -
                    check_ids:
                      - "runtime-full-ci"
                      - "runtime-diff-check"
                    description: "Missing executables produce typed infrastructure evidence and cannot masquerade as implementation failures. Bind resolved runtime/environment identity to applicable receipts without secret values. Reuse existing failure and evidence contracts where possible."
                    id: "runtime-evidence"
                    required: true
                evidence_fingerprint: "sha256:c1247e039678d04591d413d9fb258152b206836f8438303ae30bff7fe8acc58b"
                schema_version: 1
      revision: 1
      schema_version: 1
      task_id: "202608251706-V287W1"
    event_cursor: 0
    final_validation:
      evidence:
        -
          artifact_refs:
            - "task-verification:202608251706-V287W1"
            - "git:daf594dbe372635d26bb67af0b9ee83ef6ac3c40"
          check_id: "runtime-full-ci"
          command_identity: "bun run ci:local:full"
          detail: "Verified: CLI-owned checks passed before independent EVALUATOR review."
          exit_code: 0
          observed_at: "2026-08-30T04:59:53.524Z"
          repository_snapshot_digest: "sha256:10c609b10015eff5d6d6be2cbaa459ef852bea880ab76a614433047afc961e21"
          status: "passed"
        -
          artifact_refs:
            - "task-verification:202608251706-V287W1"
            - "git:daf594dbe372635d26bb67af0b9ee83ef6ac3c40"
          check_id: "runtime-diff-check"
          command_identity: "git diff --check"
          detail: "Verified: CLI-owned checks passed before independent EVALUATOR review."
          exit_code: 0
          observed_at: "2026-08-30T04:59:53.524Z"
          repository_snapshot_digest: "sha256:10c609b10015eff5d6d6be2cbaa459ef852bea880ab76a614433047afc961e21"
          status: "passed"
      schema_version: 1
      stale_evidence: []
      status: "passed"
      unsatisfied_criteria: []
    id: "202608251706-V287W1"
    intent:
      acceptance_criteria:
        -
          check_ids: []
          description: "bun run ci:local:full"
          id: "legacy-1"
          required: true
        -
          check_ids: []
          description: "git diff --check"
          id: "legacy-2"
          required: true
      captured_at: "2026-08-25T22:46:41.344Z"
      constraints: []
      request: |-
        AP-RUNTIME-001 Make local execution runtime deterministic

        Fix the observed defect where verification reports `bun: command not found` even though Bun is installed and available on the host. Confirm the root cause across agents, Supervisor, verification, and recovery subprocess production paths instead of assuming it is Supervisor-only. Establish one centralized executable resolver and normalized local runtime environment shared by default across those paths, without user-specific absolute paths and without per-agent PATH configuration by default. Explicit runtime profiles and task or execution overrides must take precedence over normalized defaults. Preserve inherited host PATH entries while resolving supported standard runtime locations deterministically. Distinguish executable-resolution or environment failure from implementation or test failure; if that typed classification requires a separate architectural change beyond this resolver, create a follow-up Task rather than widening this Task. Regression acceptance must exercise the production execution path with a deliberately reduced parent PATH, prove Bun resolution from a supported standard location, and prove fail-closed behavior with an explicit infrastructure-classified result when Bun is genuinely absent.
      task_id: "202608251706-V287W1"
    lifecycle: "COMPLETED"
    plan_amendments: []
    plan_history: []
    revision: 36
    schema_version: 1
    updated_at: "2026-08-30T05:20:24.205Z"
    work_items:
      deterministic-local-runtime:
        attempt: 2
        claim_id: null
        id: "deterministic-local-runtime"
        last_failure: null
        output_manifests:
          -
            digest: "sha256:e65ddd981d0804acc7298c3df7d00a53a709f334bfee0e14145bb596704b8080"
            id: "deterministic-local-runtime-implementation"
            kind: "semantic_output"
            producer:
              attempt: 2
              plan_revision: 1
              task_id: "202608251706-V287W1"
              work_item_id: "deterministic-local-runtime"
            provenance:
              - "sha256:448da228a84294b151b493f4720a59d1b5cc42a7ded2c8f8a84793a163ee82f3"
              - ".agentplane/tasks/202608251706-V287W1/supervision/declared-checks.json"
            repository_snapshot_digest: "sha256:66e2633c70abade4ffef99a3c6ce80af7daecc40013d6cd60a2317b3bb9e71c2"
            schema: "agentplane.semantic-output.v1"
            schema_version: 1
        revision: 3
        state: "COMPLETED"
        validation_result:
          evidence:
            -
              artifact_refs:
                - ".agentplane/tasks/202608251706-V287W1/supervision/declared-checks.json"
              check_id: "runtime-full-ci"
              command_identity: "bun run ci:local:full"
              detail: "Observed by bun run ci:local:full."
              exit_code: 0
              observed_at: "2026-08-30T03:41:02.874Z"
              repository_snapshot_digest: "sha256:66e2633c70abade4ffef99a3c6ce80af7daecc40013d6cd60a2317b3bb9e71c2"
              status: "passed"
            -
              artifact_refs:
                - ".agentplane/tasks/202608251706-V287W1/supervision/declared-checks.json"
              check_id: "runtime-diff-check"
              command_identity: "git diff --check"
              detail: "Observed by git diff --check."
              exit_code: 0
              observed_at: "2026-08-30T03:41:02.874Z"
              repository_snapshot_digest: "sha256:66e2633c70abade4ffef99a3c6ce80af7daecc40013d6cd60a2317b3bb9e71c2"
              status: "passed"
          schema_version: 1
          stale_evidence: []
          status: "passed"
          unsatisfied_criteria: []
  agentplane.task_centric_runtime:
    checkpoints: []
    leases: []
    mutation_receipts:
      external-result:work-order-202608251706-V287W1-executor-4039265a31e04da683b4c138:
        aggregate_digest: "sha256:1432c3dd16fa68442e57fabb7994f3009804027c2ce20b7e4b2308f2e714b00a"
        event:
          actor_id: "agentplane"
          at: "2026-08-30T03:30:55.573Z"
          cause_refs: []
          entity: "work_item"
          from: "READY"
          id: "event_582243aea031db2947888577"
          mutation_id: "external-result:work-order-202608251706-V287W1-executor-4039265a31e04da683b4c138"
          plan_digest: "sha256:0a32be0fe48f48a34d82bc81aa1c7b858cb333250aede98c0e3e543061660753"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202608251706-V287W1"
          task_revision: 16
          to: "REWORK_READY"
          work_item_id: "deterministic-local-runtime"
        mutation_id: "external-result:work-order-202608251706-V287W1-executor-4039265a31e04da683b4c138"
        next_revision: 17
        previous_revision: 16
        schema_version: 1
        task_id: "202608251706-V287W1"
      external-result:work-order-202608251706-V287W1-executor-76fde4d6d989b04e2dc87a66:
        aggregate_digest: "sha256:892ad99a97e58a6ac71a31c5fe5d11d711d8a2ee0d4a3d85bf289169c5929975"
        event:
          actor_id: "agentplane"
          at: "2026-08-30T03:41:02.880Z"
          cause_refs: []
          entity: "work_item"
          from: "REWORK_READY"
          id: "event_668ce7c454684628833bacbc"
          mutation_id: "external-result:work-order-202608251706-V287W1-executor-76fde4d6d989b04e2dc87a66"
          plan_digest: "sha256:0a32be0fe48f48a34d82bc81aa1c7b858cb333250aede98c0e3e543061660753"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202608251706-V287W1"
          task_revision: 20
          to: "COMPLETED"
          work_item_id: "deterministic-local-runtime"
        mutation_id: "external-result:work-order-202608251706-V287W1-executor-76fde4d6d989b04e2dc87a66"
        next_revision: 21
        previous_revision: 20
        schema_version: 1
        task_id: "202608251706-V287W1"
      legacy-finish:202608251706-V287W1:2026-08-30T04:59:53.524Z:daf594dbe372635d26bb67af0b9ee83ef6ac3c40:
        aggregate_digest: "sha256:2dc9067e764ae0241c129227e4135dd85ff037c6946fd00e7cfac0dcffbec1fe"
        event:
          actor_id: "CODER"
          at: "2026-08-30T05:20:24.205Z"
          cause_refs:
            - "task-verification:202608251706-V287W1"
            - "git:daf594dbe372635d26bb67af0b9ee83ef6ac3c40"
          entity: "task"
          from: "ACTIVE"
          id: "event_593a5732b173928a4b6995ce"
          mutation_id: "legacy-finish:202608251706-V287W1:2026-08-30T04:59:53.524Z:daf594dbe372635d26bb67af0b9ee83ef6ac3c40"
          plan_digest: "sha256:0a32be0fe48f48a34d82bc81aa1c7b858cb333250aede98c0e3e543061660753"
          plan_revision: 1
          repository_fingerprint: "sha256:10c609b10015eff5d6d6be2cbaa459ef852bea880ab76a614433047afc961e21"
          schema_version: 1
          task_id: "202608251706-V287W1"
          task_revision: 21
          to: "COMPLETED"
          work_item_id: null
        mutation_id: "legacy-finish:202608251706-V287W1:2026-08-30T04:59:53.524Z:daf594dbe372635d26bb67af0b9ee83ef6ac3c40"
        next_revision: 36
        previous_revision: 35
        schema_version: 1
        task_id: "202608251706-V287W1"
    pending_effects: []
    retry_budgets: []
    schema_version: 1
  implementation_commit:
    hash: "daf594dbe372635d26bb67af0b9ee83ef6ac3c40"
    message: "🚧 V287W1 task: apply external agent result"
  task_execution_context:
    base_ref: "main"
    base_sha: "8ea1cefbbc96a8da5595fce36325ec0c1194a360"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
  workflow_route_baseline:
    start_head_sha: "8ea1cefbbc96a8da5595fce36325ec0c1194a360"
    version: 1
id_source: "generated"
---
## Summary

AP-RUNTIME-001 Make local execution runtime deterministic

Observed symptom: verification can report `bun: command not found` even though Bun is installed and available on the host. The violated invariant is that verification of the same execution contract on the same repository state must not depend on the parent shell PATH.

Confirm the root cause across agents, Supervisor, verification, and recovery subprocess production paths; do not assume Supervisor is the sole owner. Implement one centralized executable resolver and normalized local runtime environment shared by those local paths by default. Explicit runtime profiles and task or execution overrides take precedence. Do not encode user-specific absolute paths or create per-agent PATH configuration as the default. Distinguish executable-resolution or environment failure from implementation or test failure; split a follow-up Task if typed classification requires a separate architectural change.

## Scope

- In scope: trace executable and environment propagation through the production launch paths for agents, Supervisor, verification, and recovery subprocesses; define and implement one shared local runtime resolver; preserve inherited host PATH entries while adding supported standard runtime locations deterministically; enforce precedence for explicit runtime profiles and task or execution overrides; emit enough structured evidence to distinguish resolution failure from implementation or test failure; add production-path regressions for reduced PATH and true executable absence.
- Required invariant: verification of one execution contract on one repository state does not change solely because AgentPlane was launched from a different parent shell PATH.
- Required regression: launch the production execution path with a deliberately reduced parent PATH and an isolated fixture home containing Bun in a supported standard location; prove the resolved Bun is executed.
- Required fail-closed regression: remove Bun from both PATH and every supported standard location; prove no unrelated executable is selected and the outcome is an explicit infrastructure or executable-resolution failure, not an implementation failure.
- Out of scope: user-specific absolute paths; per-agent PATHs as the default model; container or remote runtime unification; release 0.7.8 scope; redesign of the full verification-result taxonomy when it can be isolated as a follow-up Task.

## Plan

Plan one cohesive runtime implementation WorkItem with shared resolver hardening, production propagation and evidence qualification. Reuse runtime-env.ts; preserve explicit overrides and canonical authority.

## Verify Steps

1. Run standalone and root-referenced child Tasks through agent, Supervisor, verification, and recovery subprocesses. Expected: identical executable resolution and shared environment semantics.
2. Restart from base and child worktree. Expected: deterministic toolchain identity and preserved root provenance.
3. Change PATH or toolchain. Expected: old receipts cannot be reused and authority remains canonical rather than environment-derived.
4. Omit a required executable. Expected: typed infrastructure failure, not product failure or authority widening.
5. Run runtime, subprocess, receipt, installed CLI, and root-child integration tests.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-08-30T03:30:52.423Z — VERIFY — needs_rework

By: SUPERVISOR

Note: Rework: Declared check failed: bun run ci:local:full
Attempts: 1

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:6b4a90a00629d4251c2e20a1c8d0affcac23f80998acbda3ba0aa60559c77656, input_digest=sha256:662550a4afa531436620a3de058c0263090e62afd93530949292d244e87808e7

Details:

Command: bun run ci:local:full
Result: fail
Evidence: .agentplane/tasks/202608251706-V287W1/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608251706-V287W1 declared verification

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608251706-V287W1-ap-runtime-001-make-local-execution-runtime-dete/.agentplane/tasks/202608251706-V287W1/blueprint/resolved-snapshot.json
- old_digest: 1e66c76a78609a97f5cd128422e5e2722d341505f5b69118c1434c54aa793981
- current_digest: 1e66c76a78609a97f5cd128422e5e2722d341505f5b69118c1434c54aa793981
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608251706-V287W1

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: none
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-08-30T03:40:59.794Z — VERIFY — ok

By: SUPERVISOR

Note: Verified: CLI-owned checks passed before independent EVALUATOR review.
Attempts: 0

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:6b4a90a00629d4251c2e20a1c8d0affcac23f80998acbda3ba0aa60559c77656, input_digest=sha256:93f0c2f9a7d14a5849b3db10b7424a0fb057a30c09ba061f2e1ff13b77382ab8

Details:

Check: affected_unit_integration
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608251706-V287W1/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608251706-V287W1 Verification Contract check affected_unit_integration (1/4)

Check: affected_unit_integration
Command: git diff --check
Result: pass
Evidence: .agentplane/tasks/202608251706-V287W1/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608251706-V287W1 Verification Contract check affected_unit_integration (2/4)

Check: affected_unit_integration
Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: .agentplane/tasks/202608251706-V287W1/supervision/declared-checks.json#check-3
Scope: branch_pr task 202608251706-V287W1 Verification Contract check affected_unit_integration (3/4)

Check: affected_unit_integration
Command: agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202608251706-V287W1/supervision/declared-checks.json#check-4
Scope: branch_pr task 202608251706-V287W1 Verification Contract check affected_unit_integration (4/4)

Check: critical_paths
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608251706-V287W1/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608251706-V287W1 Verification Contract check critical_paths (1/4)

Check: critical_paths
Command: git diff --check
Result: pass
Evidence: .agentplane/tasks/202608251706-V287W1/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608251706-V287W1 Verification Contract check critical_paths (2/4)

Check: critical_paths
Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: .agentplane/tasks/202608251706-V287W1/supervision/declared-checks.json#check-3
Scope: branch_pr task 202608251706-V287W1 Verification Contract check critical_paths (3/4)

Check: critical_paths
Command: agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202608251706-V287W1/supervision/declared-checks.json#check-4
Scope: branch_pr task 202608251706-V287W1 Verification Contract check critical_paths (4/4)

Check: docs_contract
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608251706-V287W1/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608251706-V287W1 Verification Contract check docs_contract (1/4)

Check: docs_contract
Command: git diff --check
Result: pass
Evidence: .agentplane/tasks/202608251706-V287W1/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608251706-V287W1 Verification Contract check docs_contract (2/4)

Check: docs_contract
Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: .agentplane/tasks/202608251706-V287W1/supervision/declared-checks.json#check-3
Scope: branch_pr task 202608251706-V287W1 Verification Contract check docs_contract (3/4)

Check: docs_contract
Command: agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202608251706-V287W1/supervision/declared-checks.json#check-4
Scope: branch_pr task 202608251706-V287W1 Verification Contract check docs_contract (4/4)

Check: full_regression
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608251706-V287W1/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608251706-V287W1 Verification Contract check full_regression

Check: task_outcome
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608251706-V287W1/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608251706-V287W1 Verification Contract check task_outcome (1/4)

Check: task_outcome
Command: git diff --check
Result: pass
Evidence: .agentplane/tasks/202608251706-V287W1/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608251706-V287W1 Verification Contract check task_outcome (2/4)

Check: task_outcome
Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: .agentplane/tasks/202608251706-V287W1/supervision/declared-checks.json#check-3
Scope: branch_pr task 202608251706-V287W1 Verification Contract check task_outcome (3/4)

Check: task_outcome
Command: agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202608251706-V287W1/supervision/declared-checks.json#check-4
Scope: branch_pr task 202608251706-V287W1 Verification Contract check task_outcome (4/4)

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608251706-V287W1-ap-runtime-001-make-local-execution-runtime-dete/.agentplane/tasks/202608251706-V287W1/blueprint/resolved-snapshot.json
- old_digest: 1e66c76a78609a97f5cd128422e5e2722d341505f5b69118c1434c54aa793981
- current_digest: 1e66c76a78609a97f5cd128422e5e2722d341505f5b69118c1434c54aa793981
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608251706-V287W1

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: none
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-08-30T04:06:29.644Z — VERIFY — needs_rework

By: TESTER

Note: Committed diff check failed after ESLint autofix: custom-security.test.ts contains trailing whitespace at lines 337, 342, 347 and 352 in implementation 9ae23e29f. No semantic test failure. Remove whitespace and requalify through a fresh executor packet.
Attempts: 1

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:6b4a90a00629d4251c2e20a1c8d0affcac23f80998acbda3ba0aa60559c77656, input_digest=sha256:5e5785f7dbf868f12f3f7ce627af61ab0f610ba934819952bf4c544bdc57ec87

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608251706-V287W1-ap-runtime-001-make-local-execution-runtime-dete/.agentplane/tasks/202608251706-V287W1/blueprint/resolved-snapshot.json
- old_digest: 1e66c76a78609a97f5cd128422e5e2722d341505f5b69118c1434c54aa793981
- current_digest: 1e66c76a78609a97f5cd128422e5e2722d341505f5b69118c1434c54aa793981
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608251706-V287W1

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202608251706-V287W1
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-08-30T04:15:24.255Z — VERIFY — needs_rework

By: SUPERVISOR

Note: Rework: Declared check failed: bun run ci:local:full
Attempts: 2

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:6b4a90a00629d4251c2e20a1c8d0affcac23f80998acbda3ba0aa60559c77656, input_digest=sha256:243758068152565bb1434d730356746acca7b4a3b87504f3e765431809bd2534

Details:

Command: bun run ci:local:full
Result: fail
Evidence: .agentplane/tasks/202608251706-V287W1/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608251706-V287W1 declared verification

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608251706-V287W1-ap-runtime-001-make-local-execution-runtime-dete/.agentplane/tasks/202608251706-V287W1/blueprint/resolved-snapshot.json
- old_digest: 1e66c76a78609a97f5cd128422e5e2722d341505f5b69118c1434c54aa793981
- current_digest: 1e66c76a78609a97f5cd128422e5e2722d341505f5b69118c1434c54aa793981
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608251706-V287W1

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202608251706-V287W1
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-08-30T04:39:36.670Z — VERIFY — ok

By: SUPERVISOR

Note: Verified: CLI-owned checks passed before independent EVALUATOR review.
Attempts: 0

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:6b4a90a00629d4251c2e20a1c8d0affcac23f80998acbda3ba0aa60559c77656, input_digest=sha256:f1e76aef951bbaafd5d017a4ac29e0b8e5f22f33fbaeab26624c1214587ef3c3

Details:

Check: affected_unit_integration
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608251706-V287W1/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608251706-V287W1 Verification Contract check affected_unit_integration (1/4)

Check: affected_unit_integration
Command: git diff --check
Result: pass
Evidence: .agentplane/tasks/202608251706-V287W1/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608251706-V287W1 Verification Contract check affected_unit_integration (2/4)

Check: affected_unit_integration
Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: .agentplane/tasks/202608251706-V287W1/supervision/declared-checks.json#check-3
Scope: branch_pr task 202608251706-V287W1 Verification Contract check affected_unit_integration (3/4)

Check: affected_unit_integration
Command: agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202608251706-V287W1/supervision/declared-checks.json#check-4
Scope: branch_pr task 202608251706-V287W1 Verification Contract check affected_unit_integration (4/4)

Check: critical_paths
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608251706-V287W1/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608251706-V287W1 Verification Contract check critical_paths (1/4)

Check: critical_paths
Command: git diff --check
Result: pass
Evidence: .agentplane/tasks/202608251706-V287W1/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608251706-V287W1 Verification Contract check critical_paths (2/4)

Check: critical_paths
Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: .agentplane/tasks/202608251706-V287W1/supervision/declared-checks.json#check-3
Scope: branch_pr task 202608251706-V287W1 Verification Contract check critical_paths (3/4)

Check: critical_paths
Command: agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202608251706-V287W1/supervision/declared-checks.json#check-4
Scope: branch_pr task 202608251706-V287W1 Verification Contract check critical_paths (4/4)

Check: docs_contract
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608251706-V287W1/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608251706-V287W1 Verification Contract check docs_contract (1/4)

Check: docs_contract
Command: git diff --check
Result: pass
Evidence: .agentplane/tasks/202608251706-V287W1/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608251706-V287W1 Verification Contract check docs_contract (2/4)

Check: docs_contract
Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: .agentplane/tasks/202608251706-V287W1/supervision/declared-checks.json#check-3
Scope: branch_pr task 202608251706-V287W1 Verification Contract check docs_contract (3/4)

Check: docs_contract
Command: agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202608251706-V287W1/supervision/declared-checks.json#check-4
Scope: branch_pr task 202608251706-V287W1 Verification Contract check docs_contract (4/4)

Check: full_regression
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608251706-V287W1/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608251706-V287W1 Verification Contract check full_regression

Check: task_outcome
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608251706-V287W1/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608251706-V287W1 Verification Contract check task_outcome (1/4)

Check: task_outcome
Command: git diff --check
Result: pass
Evidence: .agentplane/tasks/202608251706-V287W1/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608251706-V287W1 Verification Contract check task_outcome (2/4)

Check: task_outcome
Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: .agentplane/tasks/202608251706-V287W1/supervision/declared-checks.json#check-3
Scope: branch_pr task 202608251706-V287W1 Verification Contract check task_outcome (3/4)

Check: task_outcome
Command: agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202608251706-V287W1/supervision/declared-checks.json#check-4
Scope: branch_pr task 202608251706-V287W1 Verification Contract check task_outcome (4/4)

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608251706-V287W1-ap-runtime-001-make-local-execution-runtime-dete/.agentplane/tasks/202608251706-V287W1/blueprint/resolved-snapshot.json
- old_digest: 1e66c76a78609a97f5cd128422e5e2722d341505f5b69118c1434c54aa793981
- current_digest: 1e66c76a78609a97f5cd128422e5e2722d341505f5b69118c1434c54aa793981
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608251706-V287W1

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202608251706-V287W1
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-08-30T04:59:53.524Z — VERIFY — ok

By: SUPERVISOR

Note: Verified: CLI-owned checks passed before independent EVALUATOR review.
Attempts: 0

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:6b4a90a00629d4251c2e20a1c8d0affcac23f80998acbda3ba0aa60559c77656, input_digest=sha256:f817e0adad6e36987f1eb704d57797706f1170828206f0d515e39db859f36be9

Details:

Check: affected_unit_integration
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608251706-V287W1/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608251706-V287W1 Verification Contract check affected_unit_integration (1/4)

Check: affected_unit_integration
Command: git diff --check
Result: pass
Evidence: .agentplane/tasks/202608251706-V287W1/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608251706-V287W1 Verification Contract check affected_unit_integration (2/4)

Check: affected_unit_integration
Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: .agentplane/tasks/202608251706-V287W1/supervision/declared-checks.json#check-3
Scope: branch_pr task 202608251706-V287W1 Verification Contract check affected_unit_integration (3/4)

Check: affected_unit_integration
Command: agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202608251706-V287W1/supervision/declared-checks.json#check-4
Scope: branch_pr task 202608251706-V287W1 Verification Contract check affected_unit_integration (4/4)

Check: critical_paths
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608251706-V287W1/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608251706-V287W1 Verification Contract check critical_paths (1/4)

Check: critical_paths
Command: git diff --check
Result: pass
Evidence: .agentplane/tasks/202608251706-V287W1/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608251706-V287W1 Verification Contract check critical_paths (2/4)

Check: critical_paths
Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: .agentplane/tasks/202608251706-V287W1/supervision/declared-checks.json#check-3
Scope: branch_pr task 202608251706-V287W1 Verification Contract check critical_paths (3/4)

Check: critical_paths
Command: agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202608251706-V287W1/supervision/declared-checks.json#check-4
Scope: branch_pr task 202608251706-V287W1 Verification Contract check critical_paths (4/4)

Check: docs_contract
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608251706-V287W1/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608251706-V287W1 Verification Contract check docs_contract (1/4)

Check: docs_contract
Command: git diff --check
Result: pass
Evidence: .agentplane/tasks/202608251706-V287W1/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608251706-V287W1 Verification Contract check docs_contract (2/4)

Check: docs_contract
Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: .agentplane/tasks/202608251706-V287W1/supervision/declared-checks.json#check-3
Scope: branch_pr task 202608251706-V287W1 Verification Contract check docs_contract (3/4)

Check: docs_contract
Command: agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202608251706-V287W1/supervision/declared-checks.json#check-4
Scope: branch_pr task 202608251706-V287W1 Verification Contract check docs_contract (4/4)

Check: full_regression
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608251706-V287W1/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608251706-V287W1 Verification Contract check full_regression

Check: task_outcome
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608251706-V287W1/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608251706-V287W1 Verification Contract check task_outcome (1/4)

Check: task_outcome
Command: git diff --check
Result: pass
Evidence: .agentplane/tasks/202608251706-V287W1/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608251706-V287W1 Verification Contract check task_outcome (2/4)

Check: task_outcome
Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: .agentplane/tasks/202608251706-V287W1/supervision/declared-checks.json#check-3
Scope: branch_pr task 202608251706-V287W1 Verification Contract check task_outcome (3/4)

Check: task_outcome
Command: agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202608251706-V287W1/supervision/declared-checks.json#check-4
Scope: branch_pr task 202608251706-V287W1 Verification Contract check task_outcome (4/4)

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608251706-V287W1-ap-runtime-001-make-local-execution-runtime-dete/.agentplane/tasks/202608251706-V287W1/blueprint/resolved-snapshot.json
- old_digest: 1e66c76a78609a97f5cd128422e5e2722d341505f5b69118c1434c54aa793981
- current_digest: 1e66c76a78609a97f5cd128422e5e2722d341505f5b69118c1434c54aa793981
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608251706-V287W1

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202608251706-V287W1
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-08-30T05:56:53.203Z — VERIFY — ok

By: TESTER

Note: Verified: full local CI and 34 control tests passed after semantic conflict resolution at 26b69b0fe; hosted integration remains pending.
Attempts: 0

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:6b4a90a00629d4251c2e20a1c8d0affcac23f80998acbda3ba0aa60559c77656, input_digest=sha256:0bf070b6569b257fe541d64d43cf16d2b4a6a2952a41346f895a9190e1c5160b

Details:

Check: affected_unit_integration
Command: bun run ci:local:full
Result: pass
Evidence: Full local CI exited 0 after conflict resolution. Implementation SHA 26b69b0fece6e4d9a8dfd013d6cafefadd4acf61; published artifact-only descendant a5debd7e6387a3ac88fc32f5adc9379b52d76972. Build, runtime, docs-schema, core and CLI groups passed; Windows platform-critical 98 tests passed; significant coverage passed. Raw log sha256:48c10c7a0636aa08814235dc605e50125c1412ae96b7e0d68c6c6c79a1524c06. Hosted integration remains a separate pending gate.
Scope: deterministic local runtime and verification integration after base reconciliation

Check: critical_paths
Command: bun run ci:local:full
Result: pass
Evidence: Full local CI exited 0 after conflict resolution. Implementation SHA 26b69b0fece6e4d9a8dfd013d6cafefadd4acf61; published artifact-only descendant a5debd7e6387a3ac88fc32f5adc9379b52d76972. Build, runtime, docs-schema, core and CLI groups passed; Windows platform-critical 98 tests passed; significant coverage passed. Raw log sha256:48c10c7a0636aa08814235dc605e50125c1412ae96b7e0d68c6c6c79a1524c06. Hosted integration remains a separate pending gate.
Scope: deterministic local runtime and verification integration after base reconciliation

Check: docs_contract
Command: bun run ci:local:full
Result: pass
Evidence: Full local CI exited 0 after conflict resolution. Implementation SHA 26b69b0fece6e4d9a8dfd013d6cafefadd4acf61; published artifact-only descendant a5debd7e6387a3ac88fc32f5adc9379b52d76972. Build, runtime, docs-schema, core and CLI groups passed; Windows platform-critical 98 tests passed; significant coverage passed. Raw log sha256:48c10c7a0636aa08814235dc605e50125c1412ae96b7e0d68c6c6c79a1524c06. Hosted integration remains a separate pending gate.
Scope: deterministic local runtime and verification integration after base reconciliation

Check: full_regression
Command: bun run ci:local:full
Result: pass
Evidence: Full local CI exited 0 after conflict resolution. Implementation SHA 26b69b0fece6e4d9a8dfd013d6cafefadd4acf61; published artifact-only descendant a5debd7e6387a3ac88fc32f5adc9379b52d76972. Build, runtime, docs-schema, core and CLI groups passed; Windows platform-critical 98 tests passed; significant coverage passed. Raw log sha256:48c10c7a0636aa08814235dc605e50125c1412ae96b7e0d68c6c6c79a1524c06. Hosted integration remains a separate pending gate.
Scope: deterministic local runtime and verification integration after base reconciliation

Check: task_outcome
Command: bun run ci:local:full
Result: pass
Evidence: Full local CI exited 0 after conflict resolution. Implementation SHA 26b69b0fece6e4d9a8dfd013d6cafefadd4acf61; published artifact-only descendant a5debd7e6387a3ac88fc32f5adc9379b52d76972. Build, runtime, docs-schema, core and CLI groups passed; Windows platform-critical 98 tests passed; significant coverage passed. Raw log sha256:48c10c7a0636aa08814235dc605e50125c1412ae96b7e0d68c6c6c79a1524c06. Hosted integration remains a separate pending gate.
Scope: deterministic local runtime and verification integration after base reconciliation

Check: affected_unit_integration
Command: bun x vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task/direct-task-verification.test.ts packages/agentplane/src/shared/runtime-env.test.ts packages/agentplane/src/commands/shared/pr-meta/verify-log.test.ts
Result: pass
Evidence: 34 tests in 3 files passed; preserved dotenv isolation, explicit parent values, runtime normalization and frozen verification mapping.
Scope: semantic conflict resolution

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608251706-V287W1-ap-runtime-001-make-local-execution-runtime-dete/.agentplane/tasks/202608251706-V287W1/blueprint/resolved-snapshot.json
- old_digest: 1e66c76a78609a97f5cd128422e5e2722d341505f5b69118c1434c54aa793981
- current_digest: 1e66c76a78609a97f5cd128422e5e2722d341505f5b69118c1434c54aa793981
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608251706-V287W1

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: none
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-08-30T08:11:15.015Z — VERIFY — ok

By: SUPERVISOR

Note: Verified: CLI-owned declared checks passed; independent EVALUATOR review is pending.
Attempts: 0

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:6b4a90a00629d4251c2e20a1c8d0affcac23f80998acbda3ba0aa60559c77656, input_digest=sha256:cc3dff7e9ec734792c1397264606848ade5b98345505e006808f4443c8da2737

Details:

Check: affected_unit_integration
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608251706-V287W1/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608251706-V287W1 Verification Contract check affected_unit_integration (1/4)

Check: affected_unit_integration
Command: git diff --check
Result: pass
Evidence: .agentplane/tasks/202608251706-V287W1/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608251706-V287W1 Verification Contract check affected_unit_integration (2/4)

Check: affected_unit_integration
Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: .agentplane/tasks/202608251706-V287W1/supervision/declared-checks.json#check-3
Scope: branch_pr task 202608251706-V287W1 Verification Contract check affected_unit_integration (3/4)

Check: affected_unit_integration
Command: agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202608251706-V287W1/supervision/declared-checks.json#check-4
Scope: branch_pr task 202608251706-V287W1 Verification Contract check affected_unit_integration (4/4)

Check: critical_paths
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608251706-V287W1/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608251706-V287W1 Verification Contract check critical_paths (1/4)

Check: critical_paths
Command: git diff --check
Result: pass
Evidence: .agentplane/tasks/202608251706-V287W1/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608251706-V287W1 Verification Contract check critical_paths (2/4)

Check: critical_paths
Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: .agentplane/tasks/202608251706-V287W1/supervision/declared-checks.json#check-3
Scope: branch_pr task 202608251706-V287W1 Verification Contract check critical_paths (3/4)

Check: critical_paths
Command: agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202608251706-V287W1/supervision/declared-checks.json#check-4
Scope: branch_pr task 202608251706-V287W1 Verification Contract check critical_paths (4/4)

Check: docs_contract
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608251706-V287W1/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608251706-V287W1 Verification Contract check docs_contract (1/4)

Check: docs_contract
Command: git diff --check
Result: pass
Evidence: .agentplane/tasks/202608251706-V287W1/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608251706-V287W1 Verification Contract check docs_contract (2/4)

Check: docs_contract
Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: .agentplane/tasks/202608251706-V287W1/supervision/declared-checks.json#check-3
Scope: branch_pr task 202608251706-V287W1 Verification Contract check docs_contract (3/4)

Check: docs_contract
Command: agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202608251706-V287W1/supervision/declared-checks.json#check-4
Scope: branch_pr task 202608251706-V287W1 Verification Contract check docs_contract (4/4)

Check: full_regression
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608251706-V287W1/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608251706-V287W1 Verification Contract check full_regression

Check: task_outcome
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608251706-V287W1/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608251706-V287W1 Verification Contract check task_outcome (1/4)

Check: task_outcome
Command: git diff --check
Result: pass
Evidence: .agentplane/tasks/202608251706-V287W1/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608251706-V287W1 Verification Contract check task_outcome (2/4)

Check: task_outcome
Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: .agentplane/tasks/202608251706-V287W1/supervision/declared-checks.json#check-3
Scope: branch_pr task 202608251706-V287W1 Verification Contract check task_outcome (3/4)

Check: task_outcome
Command: agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202608251706-V287W1/supervision/declared-checks.json#check-4
Scope: branch_pr task 202608251706-V287W1 Verification Contract check task_outcome (4/4)

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608251706-V287W1-ap-runtime-001-make-local-execution-runtime-dete/.agentplane/tasks/202608251706-V287W1/blueprint/resolved-snapshot.json
- old_digest: 1e66c76a78609a97f5cd128422e5e2722d341505f5b69118c1434c54aa793981
- current_digest: 1e66c76a78609a97f5cd128422e5e2722d341505f5b69118c1434c54aa793981
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608251706-V287W1

DecisionContextRef:
- operator_action: stop
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

Roadmap intake on 2026-08-25:

- The observed symptom is evidence of environment-dependent executable resolution, not proof that Supervisor alone owns the defect.
- Completed Task 202603271156-EAMB43 covers first-class repository development bootstrap, not normalized runtime propagation across agent, Supervisor, verification, and recovery production subprocesses.
- AP-CORE-016 already owns environment-bound verification receipts and infrastructure classification for missing toolchain binaries, but it does not own executable discovery or PATH normalization.
- Placement: depend on AP-CORE-012 and make AP-CORE-013 depend on this Task. This establishes deterministic runtime resolution before canonical verification semantics and leaves AP-CORE-016 downstream to consume the normalized environment and classification evidence.
- This Task is post-0.7.8 roadmap work and adds no dependency to the live 0.7.8 release chain.

## Token Usage

- State: `unavailable`
- Completeness: `0/10` agent runs
- Input tokens: `unavailable`
- Output tokens: `unavailable`
- Reasoning tokens: `unavailable`
- Total tokens: `unavailable`
- Provenance: `supervisor_journal/agentplane`
- Journal digest: `sha256:424572f81eb1a5dda819be965735984db1ce3fc543bdad3a5efc410c68528f9b`
- Unavailable reason: `provider_token_telemetry_unavailable`
- Updated at: `2026-08-30T05:20:24.205Z`

---
id: "202608291006-2A6BJC"
title: "Add compatibility adapters and replay migration"
result_summary: "pre-merge closure"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 86
origin:
  system: "manual"
depends_on:
  - "202608292032-1K47B8"
tags:
  - "clean-core-rebuild"
  - "migration"
task_kind: "code"
mutation_scope: "code"
verify:
  - "bun run arch:check"
  - "bun run lifecycle:invariants"
  - "bun run test:fast"
  - "bun run typecheck"
plan_approval:
  state: "approved"
  updated_at: "2026-08-30T10:24:20.488Z"
  updated_by: "USER"
  note: "Standing user authorization for all subsequent in-scope refactoring plans. Approve exact sha256:8e32060f888533284a0d0235807cc97a6cad53aa4e1f9d48d24ec527928ae634. Preserve every M0 acceptance gate and the unresolved full-suite verification failure."
verification:
  state: "ok"
  updated_at: "2026-08-30T15:39:56.664Z"
  updated_by: "SUPERVISOR"
  note: "Verified: CLI-owned checks passed before independent EVALUATOR review."
  attempts: 0
quality_review:
  state: "pass"
  provenance: "evaluator_supplied"
  updated_at: "2026-08-30T15:01:19.666Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR returned pass with 8 typed finding(s)."
  evaluated_sha: "2d298871cf8d20ca5b35c3d0a311cdd3be5f83c5"
  blueprint_digest: "de01a169a7c1ba12da99c26a1e9c03024b28e8ea88f99c10758e30b1a931abc9"
  evidence_refs:
    - ".agentplane/tasks/202608291006-2A6BJC/quality/20260830-145833922-recovery-context/evaluator-work-order.json"
    - ".agentplane/tasks/202608291006-2A6BJC/quality/20260830-145833922-recovery-context/quality-report.json"
    - ".agentplane/tasks/202608291006-2A6BJC/quality/objects/sha256/ad4db6fe609ea05d7c37bdf4703f1a726fb223bfb639aba561b5cc45c89f26e8.md"
    - ".agentplane/tasks/202608291006-2A6BJC/quality/20260830-145833922-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202608291006-2A6BJC/quality/20260830-145833922-recovery-context/evaluator-result.json"
    - ".agentplane/tasks/202608291006-2A6BJC/quality/20260830-145833922-recovery-context/evaluator-evidence-manifest.json"
    - ".agentplane/tasks/202608291006-2A6BJC/README.md"
    - ".agentplane/tasks/202608291006-2A6BJC/quality/objects/sha256/bb7ca667de0a6a650c7bb8e78dace169ed03183cbcfadfe286039f71413dac59.patch"
    - ".agentplane/tasks/202608291006-2A6BJC/quality/objects/sha256/ff805619e2a2261e933967df1ed6d1f3c66f8523f0f0de372c3b654ed256d7dd.json"
    - ".agentplane/tasks/202608291006-2A6BJC/verification/20260830141335067-681b24fdea02d27c.json"
    - ".agentplane/tasks/202608291006-2A6BJC/quality/objects/sha256/beedd395f8c752c2788d7739e0c540e8e1fa9200654d224fcd4c08c39aced7d1.json"
    - ".agentplane/policy/dod.core.md"
    - ".agentplane/policy/security.must.md"
  findings:
    - "Migration follows the approved explicit mapping: active legacy records enter PLANNING without invented approval or WorkItems; terminal records become read-only archives. Ambiguous input categories, unsupported schemas and unreconciled runtime state are refused."
    - "The byte-store boundary preserves exact backups under containment/no-follow checks and guarded transactions. Apply independently reads back the output. Rollback revalidates receipt identity, backup bytes and unchanged canonical output before CAS. It cannot roll back a later Task revision."
    - "Canonical persistence checks backend capabilities, repository identity and task revisions. Lost-write readback proves durability but never fresh dispatch ownership. The durable begin_effect transition and counted concurrent-start regression prevent duplicate provider dispatch."
    - "Validation and review adapters bind evidence to Task, approved plan, WorkItem, implementation and repository state. Operational metadata does not invalidate semantic evidence; changed result identity does. These adapters do not complete lifecycle transitions themselves."
    - "The frozen twelve-family corpus executes saved inputs, checks source and payload digests, and compares exact histories, receipts, projections, effects and route codes. Crash observations retain independent old origins. The isolated driver rejects source leakage, unanchored helpers and incomplete test execution."
    - "The implementation preserves legacy production authority until the next milestone. It introduces explicit migration and read adapters rather than claiming a production cutover. Changes to immutable effect publication and check-artifact freshness address reproduced recovery defects and retain their negative/concurrency regressions."
    - "Residual risk: Provider qualification uses explicit fakes. Required hosted exact-head checks, supervised integration and hosted closure remain mandatory before M2 delivery."
    - "Residual risk: Repository-wide migration, legacy removal,20sequentialself-hostingTasks and3release drills are M3 acceptance and are not satisfied by this review."
token_usage:
  agent_runs: 24
  input_tokens: null
  journal_digest: "sha256:279230bcd5ba79c4c78f4ebe21ebbf6f3c95e10f3c24ffc68da1be3a8b636de0"
  observed_agent_runs: 0
  observed_by: "agentplane"
  output_tokens: null
  reasoning_tokens: null
  schema_version: 1
  source: "supervisor_journal"
  state: "unavailable"
  total_tokens: null
  unavailable_reason: "provider_token_telemetry_unavailable"
  updated_at: "2026-08-30T15:17:11.548Z"
execution_route:
  frozen: true
  reason_codes:
    - "agent_preferred_branch_pr"
    - "effect_public_api"
    - "effect_schema"
    - "effect_security_boundary"
    - "observed_path_outside_scope:.agentplane/policy/incidents.md"
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
    - "observed_path_outside_scope:packages/agentplane/assets/policy/incidents.md"
    - "observed_path_outside_scope:packages/agentplane/src/cli/run-cli.core.task-advance-effect-recovery.test.ts"
    - "observed_path_outside_scope:packages/agentplane/src/cli/run-cli.core.task-advance.branch-worktree.test.ts"
    - "observed_path_outside_scope:packages/agentplane/src/commands/evaluator/evaluator-episode.calibration.test.ts"
    - "observed_path_outside_scope:packages/agentplane/src/commands/evaluator/evaluator-review-usecase.ts"
    - "observed_path_outside_scope:packages/agentplane/src/commands/evaluator/evaluator-runtime-evidence.test.ts"
    - "observed_path_outside_scope:packages/agentplane/src/commands/shared/pr-meta/verify-log.test.ts"
    - "observed_path_outside_scope:packages/agentplane/src/commands/shared/pr-meta/verify-log.ts"
    - "observed_path_outside_scope:packages/agentplane/src/commands/shared/task-scope-extension-request.ts"
    - "observed_path_outside_scope:packages/agentplane/src/commands/shared/workflow-step-branch.ts"
    - "observed_path_outside_scope:packages/agentplane/src/commands/shared/workflow-step-quality.test.ts"
    - "observed_path_outside_scope:packages/core/src/tasks/task-centric/graph.ts"
    - "observed_path_outside_scope:packages/core/src/tasks/task-centric/task-centric.test.ts"
    - "observed_path_outside_scope:website/static/img/social/docs/adr/0017-clean-task-core-rebuild.png"
    - "observed_path_outside_scope:website/static/img/social/docs/reference/clean-task-core-rebuild-spec.png"
    - "observed_path_outside_scope:website/static/img/social/manifest.json"
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
      - "public_api"
      - "repository_write"
      - "schema"
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
      - "dependencies"
      - "ci"
      - "release_metadata"
    writable_roots:
      - "docs/developer"
      - "docs/reference/clean-task-core-rebuild-spec.mdx"
      - "packages/agentplane/src/adapters/task-backend"
      - "packages/agentplane/src/backends/task-backend"
      - "packages/agentplane/src/cli/run-cli"
      - "packages/agentplane/src/cli/run-cli.critical.agent-efficiency-baseline.test.ts"
      - "packages/agentplane/src/commands/task"
      - "packages/agentplane/src/ports"
      - "packages/agentplane/src/runner"
      - "packages/core/src/tasks/index.ts"
      - "packages/core/src/tasks/task-kernel"
      - "packages/testkit/src"
      - "scripts/baselines/v0.7-compatibility-candidate.json"
      - "scripts/bench"
      - "scripts/checks/check-compatibility-contract-baseline.mjs"
  declaration:
    external_effects: []
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "M0 defines migration and replay acceptance. M1 is integrated at cbc5d79d1510293de3b4c30b61679cdef85d0fdb. Changes are limited to adapter, storage, CLI boundary, replay fixtures and supporting documentation. No production data migration, release publication or legacy removal occurs during implementation episodes."
    repository_effects:
      - "documentation"
      - "public_api"
      - "repository_write"
      - "schema"
      - "security_boundary"
      - "source_code"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "reversible"
    schema_version: 2
    scope_roots:
      - "docs/developer"
      - "docs/reference/clean-task-core-rebuild-spec.mdx"
      - "packages/agentplane/src/adapters/task-backend"
      - "packages/agentplane/src/backends/task-backend"
      - "packages/agentplane/src/cli/run-cli"
      - "packages/agentplane/src/cli/run-cli.critical.agent-efficiency-baseline.test.ts"
      - "packages/agentplane/src/commands/task"
      - "packages/agentplane/src/ports"
      - "packages/agentplane/src/runner"
      - "packages/core/src/tasks/index.ts"
      - "packages/core/src/tasks/task-kernel"
      - "packages/testkit/src"
      - "scripts/baselines/v0.7-compatibility-candidate.json"
      - "scripts/bench"
      - "scripts/checks/check-compatibility-contract-baseline.mjs"
  observed:
    authority_violations:
      - "writable_scope:.agentplane/policy/incidents.md"
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
      - "writable_scope:packages/agentplane/assets/policy/incidents.md"
      - "writable_scope:packages/agentplane/src/cli/run-cli.core.task-advance-effect-recovery.test.ts"
      - "writable_scope:packages/agentplane/src/cli/run-cli.core.task-advance.branch-worktree.test.ts"
      - "writable_scope:packages/agentplane/src/commands/evaluator/evaluator-episode.calibration.test.ts"
      - "writable_scope:packages/agentplane/src/commands/evaluator/evaluator-review-usecase.ts"
      - "writable_scope:packages/agentplane/src/commands/evaluator/evaluator-runtime-evidence.test.ts"
      - "writable_scope:packages/agentplane/src/commands/shared/pr-meta/verify-log.test.ts"
      - "writable_scope:packages/agentplane/src/commands/shared/pr-meta/verify-log.ts"
      - "writable_scope:packages/agentplane/src/commands/shared/task-scope-extension-request.ts"
      - "writable_scope:packages/agentplane/src/commands/shared/workflow-step-branch.ts"
      - "writable_scope:packages/agentplane/src/commands/shared/workflow-step-quality.test.ts"
      - "writable_scope:packages/core/src/tasks/task-centric/graph.ts"
      - "writable_scope:packages/core/src/tasks/task-centric/task-centric.test.ts"
      - "writable_scope:website/static/img/social/docs/adr/0017-clean-task-core-rebuild.png"
      - "writable_scope:website/static/img/social/docs/reference/clean-task-core-rebuild-spec.png"
      - "writable_scope:website/static/img/social/manifest.json"
    changed_components:
      - ".agentplane"
      - "depcruise.config.cjs"
      - "docs"
      - "packages/agentplane"
      - "packages/core"
      - "scripts"
      - "website"
    changed_paths:
      - ".agentplane/policy/incidents.md"
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
      - "docs/developer/clean-task-core-m2-replay-checkpoint.md"
      - "docs/developer/clean-task-core-m2-replay-checkpoint/README.md"
      - "docs/developer/clean-task-core-m2-replay-checkpoint/qualification-capture.json"
      - "docs/developer/harness-dev.mdx"
      - "docs/reference/clean-task-core-rebuild-spec.mdx"
      - "packages/agentplane/assets/policy/incidents.md"
      - "packages/agentplane/src/adapters/task-backend/kernel-backend-adapter.test.ts"
      - "packages/agentplane/src/adapters/task-backend/kernel-backend-adapter.ts"
      - "packages/agentplane/src/adapters/task-backend/kernel-effect-dispatch.ts"
      - "packages/agentplane/src/adapters/task-backend/kernel-effect-replay.testkit.ts"
      - "packages/agentplane/src/adapters/task-backend/kernel-evidence-replay.testkit.ts"
      - "packages/agentplane/src/adapters/task-backend/kernel-migration-source.ts"
      - "packages/agentplane/src/adapters/task-backend/kernel-migration.test.ts"
      - "packages/agentplane/src/adapters/task-backend/kernel-migration.ts"
      - "packages/agentplane/src/adapters/task-backend/kernel-next-action.ts"
      - "packages/agentplane/src/adapters/task-backend/kernel-observations.ts"
      - "packages/agentplane/src/adapters/task-backend/kernel-projector.ts"
      - "packages/agentplane/src/adapters/task-backend/kernel-qualification.testkit.ts"
      - "packages/agentplane/src/adapters/task-backend/kernel-record-invariants.ts"
      - "packages/agentplane/src/adapters/task-backend/kernel-record.ts"
      - "packages/agentplane/src/adapters/task-backend/kernel-replay-capture.testkit.ts"
      - "packages/agentplane/src/adapters/task-backend/kernel-replay-evidence.corpus.json"
      - "packages/agentplane/src/adapters/task-backend/kernel-replay-journey.test-fixtures.ts"
      - "packages/agentplane/src/adapters/task-backend/kernel-replay-migration.corpus.json"
      - "packages/agentplane/src/adapters/task-backend/kernel-replay-migration.test.ts"
      - "packages/agentplane/src/adapters/task-backend/kernel-replay-persistence.corpus.json"
      - "packages/agentplane/src/adapters/task-backend/kernel-replay-persistence.test.ts"
      - "packages/agentplane/src/adapters/task-backend/kernel-replay-qualification.corpus.json"
      - "packages/agentplane/src/adapters/task-backend/kernel-replay-qualification.corpus.json.gz"
      - "packages/agentplane/src/adapters/task-backend/kernel-replay-storage.testkit.ts"
      - "packages/agentplane/src/adapters/task-backend/kernel-replay.corpus.json"
      - "packages/agentplane/src/adapters/task-backend/kernel-replay.test.ts"
      - "packages/agentplane/src/adapters/task-backend/kernel-replay.ts"
      - "packages/agentplane/src/adapters/task-backend/kernel-workspace-replay.testkit.ts"
      - "packages/agentplane/src/adapters/task-backend/task-centric-backend-runtime.ts"
      - "packages/agentplane/src/backends/task-backend/local-backend.ts"
      - "packages/agentplane/src/backends/task-backend/local-task-byte-store.ts"
      - "packages/agentplane/src/backends/task-backend/serialized-kernel-backend.ts"
      - "packages/agentplane/src/backends/task-backend/shared/types.ts"
      - "packages/agentplane/src/cli/run-cli.core.task-advance-effect-recovery.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.task-advance.branch-worktree.test.ts"
      - "packages/agentplane/src/cli/run-cli.critical.agent-efficiency-baseline.test.ts"
      - "packages/agentplane/src/cli/run-cli/command-catalog/task.ts"
      - "packages/agentplane/src/cli/run-cli/command-loaders/task.ts"
      - "packages/agentplane/src/commands/evaluator/evaluator-episode.calibration.test.ts"
      - "packages/agentplane/src/commands/evaluator/evaluator-review-usecase.ts"
      - "packages/agentplane/src/commands/evaluator/evaluator-runtime-evidence.test.ts"
      - "packages/agentplane/src/commands/shared/pr-meta/verify-log.test.ts"
      - "packages/agentplane/src/commands/shared/pr-meta/verify-log.ts"
      - "packages/agentplane/src/commands/shared/task-scope-extension-request.ts"
      - "packages/agentplane/src/commands/shared/workflow-step-branch.ts"
      - "packages/agentplane/src/commands/shared/workflow-step-quality.test.ts"
      - "packages/agentplane/src/commands/task/direct-task-verification.test.ts"
      - "packages/agentplane/src/commands/task/direct-task-verification.ts"
      - "packages/agentplane/src/commands/task/external-agent-implementation-authority.ts"
      - "packages/agentplane/src/commands/task/external-agent-implementation-recovery.test.ts"
      - "packages/agentplane/src/commands/task/kernel-migrate.command.ts"
      - "packages/agentplane/src/commands/task/scope-extend.test.ts"
      - "packages/agentplane/src/commands/task/show-kernel.test.ts"
      - "packages/agentplane/src/commands/task/show.ts"
      - "packages/agentplane/src/commands/task/task-centric-external-result.test.ts"
      - "packages/agentplane/src/commands/task/task-centric-external-result.ts"
      - "packages/agentplane/src/ports/task-byte-store.ts"
      - "packages/agentplane/src/ports/task-record-serialization.ts"
      - "packages/agentplane/src/runner/usecases/task-run-effect-resolution.test.ts"
      - "packages/agentplane/src/runner/usecases/task-run-effect-resolution.ts"
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
      - "scripts/baselines/v0.7-compatibility-candidate.json"
      - "scripts/bench/capture-kernel-evidence-replay.ts"
      - "scripts/bench/capture-kernel-migration-replay.ts"
      - "scripts/bench/capture-kernel-replay.ts"
      - "scripts/bench/internal/agent-efficiency-dependency-manifest.mjs"
      - "scripts/bench/internal/kernel-qualification-manifest.mjs"
      - "scripts/bench/internal/kernel-replay-isolation.mjs"
      - "scripts/bench/qualify-kernel-replay.mjs"
      - "scripts/checks/check-compatibility-contract-baseline.mjs"
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
        id: "recorded-check-18"
        result: "pass"
      -
        id: "recorded-check-19"
        result: "pass"
      -
        id: "recorded-check-2"
        result: "pass"
      -
        id: "recorded-check-20"
        result: "pass"
      -
        id: "recorded-check-21"
        result: "pass"
      -
        id: "recorded-check-22"
        result: "pass"
      -
        id: "recorded-check-23"
        result: "pass"
      -
        id: "recorded-check-24"
        result: "pass"
      -
        id: "recorded-check-25"
        result: "pass"
      -
        id: "recorded-check-26"
        result: "pass"
      -
        id: "recorded-check-27"
        result: "pass"
      -
        id: "recorded-check-28"
        result: "pass"
      -
        id: "recorded-check-29"
        result: "pass"
      -
        id: "recorded-check-3"
        result: "pass"
      -
        id: "recorded-check-30"
        result: "pass"
      -
        id: "recorded-check-31"
        result: "pass"
      -
        id: "recorded-check-32"
        result: "pass"
      -
        id: "recorded-check-33"
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
  reason_codes:
    - "agent_preferred_branch_pr"
    - "effect_public_api"
    - "effect_schema"
    - "effect_security_boundary"
    - "observed_path_outside_scope:.agentplane/policy/incidents.md"
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
    - "observed_path_outside_scope:packages/agentplane/assets/policy/incidents.md"
    - "observed_path_outside_scope:packages/agentplane/src/cli/run-cli.core.task-advance-effect-recovery.test.ts"
    - "observed_path_outside_scope:packages/agentplane/src/cli/run-cli.core.task-advance.branch-worktree.test.ts"
    - "observed_path_outside_scope:packages/agentplane/src/commands/evaluator/evaluator-episode.calibration.test.ts"
    - "observed_path_outside_scope:packages/agentplane/src/commands/evaluator/evaluator-review-usecase.ts"
    - "observed_path_outside_scope:packages/agentplane/src/commands/evaluator/evaluator-runtime-evidence.test.ts"
    - "observed_path_outside_scope:packages/agentplane/src/commands/shared/pr-meta/verify-log.test.ts"
    - "observed_path_outside_scope:packages/agentplane/src/commands/shared/pr-meta/verify-log.ts"
    - "observed_path_outside_scope:packages/agentplane/src/commands/shared/task-scope-extension-request.ts"
    - "observed_path_outside_scope:packages/agentplane/src/commands/shared/workflow-step-branch.ts"
    - "observed_path_outside_scope:packages/agentplane/src/commands/shared/workflow-step-quality.test.ts"
    - "observed_path_outside_scope:packages/core/src/tasks/task-centric/graph.ts"
    - "observed_path_outside_scope:packages/core/src/tasks/task-centric/task-centric.test.ts"
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
          - "docs/reference/clean-task-core-rebuild-spec.mdx"
          - "packages/agentplane/src/adapters/task-backend"
          - "packages/agentplane/src/backends/task-backend"
          - "packages/agentplane/src/cli/run-cli"
          - "packages/agentplane/src/cli/run-cli.critical.agent-efficiency-baseline.test.ts"
          - "packages/agentplane/src/commands/task"
          - "packages/agentplane/src/ports"
          - "packages/agentplane/src/runner"
          - "packages/core/src/tasks/index.ts"
          - "packages/core/src/tasks/task-kernel"
          - "packages/testkit/src"
          - "scripts/baselines/v0.7-compatibility-candidate.json"
          - "scripts/bench"
          - "scripts/checks/check-compatibility-contract-baseline.mjs"
        evidence_requirements:
          - "hosted_integration"
          - "repository_effect:documentation"
          - "repository_effect:public_api"
          - "repository_effect:repository_write"
          - "repository_effect:schema"
          - "repository_effect:security_boundary"
          - "repository_effect:source_code"
          - "repository_effect:tests"
          - "task_outcome"
        external_effects: []
        repository_effects:
          - "documentation"
          - "public_api"
          - "repository_write"
          - "schema"
          - "security_boundary"
          - "source_code"
          - "tests"
        risk:
          implementation_uncertainty: "bounded"
          requirements_uncertainty: "bounded"
          reversibility: "reversible"
      digest: "sha256:b26314728b587d16eded469034ca263b888863a77eec4369e890f8774d48c710"
      escalation_reasons:
        - "central_component:packages/agentplane/src/cli/run-cli"
        - "central_component:packages/agentplane/src/cli/run-cli.critical.agent-efficiency-baseline.test.ts"
        - "central_component:packages/core/src/tasks/index.ts"
        - "central_component:packages/core/src/tasks/task-kernel"
        - "central_component:scripts/checks/check-compatibility-contract-baseline.mjs"
        - "central_path:packages/agentplane/src/cli/run-cli.core.task-advance-effect-recovery.test.ts"
        - "central_path:packages/agentplane/src/cli/run-cli.core.task-advance.branch-worktree.test.ts"
        - "central_path:packages/agentplane/src/cli/run-cli.critical.agent-efficiency-baseline.test.ts"
        - "central_path:packages/agentplane/src/cli/run-cli/command-catalog/task.ts"
        - "central_path:packages/agentplane/src/cli/run-cli/command-loaders/task.ts"
        - "central_path:packages/agentplane/src/commands/shared/pr-meta/verify-log.test.ts"
        - "central_path:packages/agentplane/src/commands/shared/pr-meta/verify-log.ts"
        - "central_path:packages/agentplane/src/commands/shared/task-scope-extension-request.ts"
        - "central_path:packages/agentplane/src/commands/shared/workflow-step-branch.ts"
        - "central_path:packages/agentplane/src/commands/shared/workflow-step-quality.test.ts"
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
        - "central_path:scripts/checks/check-compatibility-contract-baseline.mjs"
        - "effect_public_api"
        - "effect_schema"
        - "effect_security_boundary"
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
        - "unknown_path:packages/agentplane/src/adapters/task-backend/kernel-replay-evidence.corpus.json"
        - "unknown_path:packages/agentplane/src/adapters/task-backend/kernel-replay-migration.corpus.json"
        - "unknown_path:packages/agentplane/src/adapters/task-backend/kernel-replay-persistence.corpus.json"
        - "unknown_path:packages/agentplane/src/adapters/task-backend/kernel-replay-qualification.corpus.json"
        - "unknown_path:packages/agentplane/src/adapters/task-backend/kernel-replay-qualification.corpus.json.gz"
        - "unknown_path:packages/agentplane/src/adapters/task-backend/kernel-replay.corpus.json"
        - "unknown_path:scripts/baselines/v0.7-compatibility-candidate.json"
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
          - "scripts"
          - "website"
        changed_files:
          - ".agentplane/policy/incidents.md"
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
          - "docs/developer/clean-task-core-m2-replay-checkpoint.md"
          - "docs/developer/clean-task-core-m2-replay-checkpoint/README.md"
          - "docs/developer/clean-task-core-m2-replay-checkpoint/qualification-capture.json"
          - "docs/developer/harness-dev.mdx"
          - "docs/reference/clean-task-core-rebuild-spec.mdx"
          - "packages/agentplane/assets/policy/incidents.md"
          - "packages/agentplane/src/adapters/task-backend/kernel-backend-adapter.test.ts"
          - "packages/agentplane/src/adapters/task-backend/kernel-backend-adapter.ts"
          - "packages/agentplane/src/adapters/task-backend/kernel-effect-dispatch.ts"
          - "packages/agentplane/src/adapters/task-backend/kernel-effect-replay.testkit.ts"
          - "packages/agentplane/src/adapters/task-backend/kernel-evidence-replay.testkit.ts"
          - "packages/agentplane/src/adapters/task-backend/kernel-migration-source.ts"
          - "packages/agentplane/src/adapters/task-backend/kernel-migration.test.ts"
          - "packages/agentplane/src/adapters/task-backend/kernel-migration.ts"
          - "packages/agentplane/src/adapters/task-backend/kernel-next-action.ts"
          - "packages/agentplane/src/adapters/task-backend/kernel-observations.ts"
          - "packages/agentplane/src/adapters/task-backend/kernel-projector.ts"
          - "packages/agentplane/src/adapters/task-backend/kernel-qualification.testkit.ts"
          - "packages/agentplane/src/adapters/task-backend/kernel-record-invariants.ts"
          - "packages/agentplane/src/adapters/task-backend/kernel-record.ts"
          - "packages/agentplane/src/adapters/task-backend/kernel-replay-capture.testkit.ts"
          - "packages/agentplane/src/adapters/task-backend/kernel-replay-evidence.corpus.json"
          - "packages/agentplane/src/adapters/task-backend/kernel-replay-journey.test-fixtures.ts"
          - "packages/agentplane/src/adapters/task-backend/kernel-replay-migration.corpus.json"
          - "packages/agentplane/src/adapters/task-backend/kernel-replay-migration.test.ts"
          - "packages/agentplane/src/adapters/task-backend/kernel-replay-persistence.corpus.json"
          - "packages/agentplane/src/adapters/task-backend/kernel-replay-persistence.test.ts"
          - "packages/agentplane/src/adapters/task-backend/kernel-replay-qualification.corpus.json"
          - "packages/agentplane/src/adapters/task-backend/kernel-replay-qualification.corpus.json.gz"
          - "packages/agentplane/src/adapters/task-backend/kernel-replay-storage.testkit.ts"
          - "packages/agentplane/src/adapters/task-backend/kernel-replay.corpus.json"
          - "packages/agentplane/src/adapters/task-backend/kernel-replay.test.ts"
          - "packages/agentplane/src/adapters/task-backend/kernel-replay.ts"
          - "packages/agentplane/src/adapters/task-backend/kernel-workspace-replay.testkit.ts"
          - "packages/agentplane/src/adapters/task-backend/task-centric-backend-runtime.ts"
          - "packages/agentplane/src/backends/task-backend/local-backend.ts"
          - "packages/agentplane/src/backends/task-backend/local-task-byte-store.ts"
          - "packages/agentplane/src/backends/task-backend/serialized-kernel-backend.ts"
          - "packages/agentplane/src/backends/task-backend/shared/types.ts"
          - "packages/agentplane/src/cli/run-cli.core.task-advance-effect-recovery.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.task-advance.branch-worktree.test.ts"
          - "packages/agentplane/src/cli/run-cli.critical.agent-efficiency-baseline.test.ts"
          - "packages/agentplane/src/cli/run-cli/command-catalog/task.ts"
          - "packages/agentplane/src/cli/run-cli/command-loaders/task.ts"
          - "packages/agentplane/src/commands/evaluator/evaluator-episode.calibration.test.ts"
          - "packages/agentplane/src/commands/evaluator/evaluator-review-usecase.ts"
          - "packages/agentplane/src/commands/evaluator/evaluator-runtime-evidence.test.ts"
          - "packages/agentplane/src/commands/shared/pr-meta/verify-log.test.ts"
          - "packages/agentplane/src/commands/shared/pr-meta/verify-log.ts"
          - "packages/agentplane/src/commands/shared/task-scope-extension-request.ts"
          - "packages/agentplane/src/commands/shared/workflow-step-branch.ts"
          - "packages/agentplane/src/commands/shared/workflow-step-quality.test.ts"
          - "packages/agentplane/src/commands/task/direct-task-verification.test.ts"
          - "packages/agentplane/src/commands/task/direct-task-verification.ts"
          - "packages/agentplane/src/commands/task/external-agent-implementation-authority.ts"
          - "packages/agentplane/src/commands/task/external-agent-implementation-recovery.test.ts"
          - "packages/agentplane/src/commands/task/kernel-migrate.command.ts"
          - "packages/agentplane/src/commands/task/scope-extend.test.ts"
          - "packages/agentplane/src/commands/task/show-kernel.test.ts"
          - "packages/agentplane/src/commands/task/show.ts"
          - "packages/agentplane/src/commands/task/task-centric-external-result.test.ts"
          - "packages/agentplane/src/commands/task/task-centric-external-result.ts"
          - "packages/agentplane/src/ports/task-byte-store.ts"
          - "packages/agentplane/src/ports/task-record-serialization.ts"
          - "packages/agentplane/src/runner/usecases/task-run-effect-resolution.test.ts"
          - "packages/agentplane/src/runner/usecases/task-run-effect-resolution.ts"
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
          - "scripts/baselines/v0.7-compatibility-candidate.json"
          - "scripts/bench/capture-kernel-evidence-replay.ts"
          - "scripts/bench/capture-kernel-migration-replay.ts"
          - "scripts/bench/capture-kernel-replay.ts"
          - "scripts/bench/internal/agent-efficiency-dependency-manifest.mjs"
          - "scripts/bench/internal/kernel-qualification-manifest.mjs"
          - "scripts/bench/internal/kernel-replay-isolation.mjs"
          - "scripts/bench/qualify-kernel-replay.mjs"
          - "scripts/checks/check-compatibility-contract-baseline.mjs"
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
      - "repository_effect:public_api"
      - "repository_effect:repository_write"
      - "repository_effect:schema"
      - "repository_effect:security_boundary"
      - "repository_effect:source_code"
      - "repository_effect:tests"
      - "task_outcome"
commit:
  hash: "1e07dd534c782e6ca325623af332e1f0ded85651"
  message: "🚧 2A6BJC task: apply external agent result"
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: 2ee9027b5628. CLI accepted one state-bound external-agent semantic result."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: 5ea8af080c33. CLI accepted one state-bound external-agent semantic result."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: 447e42b16e05. CLI accepted one state-bound external-agent semantic result."
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "SUPERVISOR"
    body: "Blocked: external EXECUTOR could not complete the scoped implementation. The approved material plan replacement requests fresh qualification of m2-boundaries. Full Task verification is blocked by the reviewed compatibility candidate freshness check. The current WorkItem does not authorize that candidate path. Preserve implementation and existing evidence; expand only the qualification artifact scope for predecessor WorkItems. Recommended action: Apply the supplied bounded plan refinement and request a fresh executor packet. Agentplane receipt: external-agent-blocker/tr_64b4801343ba63e742710c16fb9a339e/sha256:e4ee43de25f0af27bffe4954d774b7b6d79b5950b2488a0d2db6f946dc3b59e3."
  -
    author: "ORCHESTRATOR"
    body: "Resume: the operator resolved the missing qualification scope by requesting an exact plan correction. Continue the fresh PLANNER route under standing user authorization; preserve implementation and prior evidence."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: 2b964f7cbfc4. CLI accepted one state-bound external-agent semantic result."
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: 1bac24a6960b. CLI accepted one state-bound external-agent semantic result."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: ca249fe85995. CLI accepted one state-bound external-agent semantic result."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: e2d304641b0e. CLI accepted one state-bound external-agent semantic result."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: 57c23559657b. CLI accepted one state-bound external-agent semantic result."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: 8e92d66b8671. CLI accepted one state-bound external-agent semantic result."
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: 8b9a98f8b455. CLI accepted one state-bound external-agent semantic result."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: 2b787ce106bc. CLI accepted one state-bound external-agent semantic result."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: cd3252423edf. CLI accepted one state-bound external-agent semantic result."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: 2c752885453a. CLI accepted one state-bound external-agent semantic result."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: 646305bc4956. CLI accepted one state-bound external-agent semantic result."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: 2d298871cf8d. CLI accepted one state-bound external-agent semantic result."
  -
    author: "CODER"
    body: "Verified: pre-merge closure packet is ready for the task PR."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: 1e07dd534c78. CLI accepted one state-bound external-agent semantic result."
events:
  -
    type: "status"
    at: "2026-08-30T04:09:19.341Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-08-30T04:40:53.007Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: 2ee9027b5628. CLI accepted one state-bound external-agent semantic result."
    commit: "2ee9027b5628e0f6702afcaaa8d73d1667d07e5e"
  -
    type: "verify"
    at: "2026-08-30T04:58:08.850Z"
    author: "SUPERVISOR"
    state: "ok"
    note: "Verified: CLI-owned checks passed before independent EVALUATOR review."
  -
    type: "status"
    at: "2026-08-30T05:42:05.137Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: 5ea8af080c33. CLI accepted one state-bound external-agent semantic result."
    commit: "5ea8af080c331eed2528c34e67c15188a70a6291"
  -
    type: "verify"
    at: "2026-08-30T05:56:44.233Z"
    author: "SUPERVISOR"
    state: "needs_rework"
    note: "Rework: Declared check failed: bun run ci:local:full"
  -
    type: "status"
    at: "2026-08-30T07:10:35.949Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: 447e42b16e05. CLI accepted one state-bound external-agent semantic result."
    commit: "447e42b16e053477a6e8ec77ac590269ee2e43e2"
  -
    type: "verify"
    at: "2026-08-30T07:21:50.527Z"
    author: "SUPERVISOR"
    state: "needs_rework"
    note: "Rework: Declared check failed: bun run ci:local:full"
  -
    type: "status"
    at: "2026-08-30T07:30:17.385Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-08-30T07:32:49.353Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "BLOCKED"
    note: "Blocked: external EXECUTOR could not complete the scoped implementation. The approved material plan replacement requests fresh qualification of m2-boundaries. Full Task verification is blocked by the reviewed compatibility candidate freshness check. The current WorkItem does not authorize that candidate path. Preserve implementation and existing evidence; expand only the qualification artifact scope for predecessor WorkItems. Recommended action: Apply the supplied bounded plan refinement and request a fresh executor packet. Agentplane receipt: external-agent-blocker/tr_64b4801343ba63e742710c16fb9a339e/sha256:e4ee43de25f0af27bffe4954d774b7b6d79b5950b2488a0d2db6f946dc3b59e3."
  -
    type: "status"
    at: "2026-08-30T07:34:04.105Z"
    author: "ORCHESTRATOR"
    from: "BLOCKED"
    to: "DOING"
    note: "Resume: the operator resolved the missing qualification scope by requesting an exact plan correction. Continue the fresh PLANNER route under standing user authorization; preserve implementation and prior evidence."
  -
    type: "verify"
    at: "2026-08-30T07:36:28.040Z"
    author: "ORCHESTRATOR"
    state: "needs_rework"
    note: "Recover the failed no-change refinement return. Request a fresh bounded implementation episode to qualify adapter capability refusal and return the missing compatibility artifact scope refinement. Preserve prior implementation."
  -
    type: "status"
    at: "2026-08-30T07:39:42.768Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: 2b964f7cbfc4. CLI accepted one state-bound external-agent semantic result."
    commit: "2b964f7cbfc47b64d8ba8345211d806c59b6337c"
  -
    type: "verify"
    at: "2026-08-30T07:51:16.632Z"
    author: "SUPERVISOR"
    state: "needs_rework"
    note: "Rework: Declared check failed: bun run ci:local:full"
  -
    type: "status"
    at: "2026-08-30T07:52:15.866Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-08-30T07:59:45.404Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: 1bac24a6960b. CLI accepted one state-bound external-agent semantic result."
    commit: "1bac24a6960b557b29e02c15353466cee019d49f"
  -
    type: "verify"
    at: "2026-08-30T08:07:29.919Z"
    author: "SUPERVISOR"
    state: "blocked_external"
    note: "Rework: Declared check failed: bun run test:fast"
  -
    type: "status"
    at: "2026-08-30T08:19:21.376Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: ca249fe85995. CLI accepted one state-bound external-agent semantic result."
    commit: "ca249fe85995d92bdd5aa298683a4db6850d08f2"
  -
    type: "verify"
    at: "2026-08-30T08:32:18.484Z"
    author: "SUPERVISOR"
    state: "ok"
    note: "Verified: CLI-owned checks passed before independent EVALUATOR review."
  -
    type: "status"
    at: "2026-08-30T08:36:07.800Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: e2d304641b0e. CLI accepted one state-bound external-agent semantic result."
    commit: "e2d304641b0e283718c73e27a8fc0dd8f9406f74"
  -
    type: "verify"
    at: "2026-08-30T08:50:20.011Z"
    author: "SUPERVISOR"
    state: "ok"
    note: "Verified: CLI-owned checks passed before independent EVALUATOR review."
  -
    type: "status"
    at: "2026-08-30T09:02:38.595Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: 57c23559657b. CLI accepted one state-bound external-agent semantic result."
    commit: "57c23559657bc1a7f4df8106da3925668c54c9e9"
  -
    type: "verify"
    at: "2026-08-30T09:17:19.687Z"
    author: "SUPERVISOR"
    state: "ok"
    note: "Verified: CLI-owned checks passed before independent EVALUATOR review."
  -
    type: "status"
    at: "2026-08-30T09:54:06.030Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: 8e92d66b8671. CLI accepted one state-bound external-agent semantic result."
    commit: "8e92d66b8671d083b9928ef04b15a49dfece4292"
  -
    type: "verify"
    at: "2026-08-30T10:16:19.892Z"
    author: "SUPERVISOR"
    state: "needs_rework"
    note: "Rework: Declared check failed: bun run test:fast"
  -
    type: "status"
    at: "2026-08-30T10:24:31.681Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-08-30T10:37:22.091Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: 8b9a98f8b455. CLI accepted one state-bound external-agent semantic result."
    commit: "8b9a98f8b45539d01f59c73209947d74f738d4a6"
  -
    type: "verify"
    at: "2026-08-30T10:59:46.329Z"
    author: "SUPERVISOR"
    state: "needs_rework"
    note: "Rework: Declared check failed: bun run test:fast"
  -
    type: "status"
    at: "2026-08-30T11:19:26.449Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: 2b787ce106bc. CLI accepted one state-bound external-agent semantic result."
    commit: "2b787ce106bcb68f7abd1f2c45887eae8563f1cf"
  -
    type: "verify"
    at: "2026-08-30T11:33:08.691Z"
    author: "SUPERVISOR"
    state: "needs_rework"
    note: "Rework: Declared check failed: bun run ci:local:full"
  -
    type: "status"
    at: "2026-08-30T11:49:10.289Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: cd3252423edf. CLI accepted one state-bound external-agent semantic result."
    commit: "cd3252423edf12da15d601d82fd8eb31662dac28"
  -
    type: "verify"
    at: "2026-08-30T12:04:23.497Z"
    author: "SUPERVISOR"
    state: "ok"
    note: "Verified: CLI-owned checks passed before independent EVALUATOR review."
  -
    type: "status"
    at: "2026-08-30T12:15:27.685Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: 2c752885453a. CLI accepted one state-bound external-agent semantic result."
    commit: "2c752885453a6fbeebbb407db859a34454ff63a2"
  -
    type: "verify"
    at: "2026-08-30T12:30:03.566Z"
    author: "SUPERVISOR"
    state: "ok"
    note: "Verified: CLI-owned checks passed before independent EVALUATOR review."
  -
    type: "status"
    at: "2026-08-30T13:30:33.229Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: 646305bc4956. CLI accepted one state-bound external-agent semantic result."
    commit: "646305bc495692c3c6aba2835b66978ed0950a10"
  -
    type: "verify"
    at: "2026-08-30T13:45:01.039Z"
    author: "SUPERVISOR"
    state: "needs_rework"
    note: "Rework: Declared check failed: bun run ci:local:full"
  -
    type: "status"
    at: "2026-08-30T13:58:50.881Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: 2d298871cf8d. CLI accepted one state-bound external-agent semantic result."
    commit: "2d298871cf8d20ca5b35c3d0a311cdd3be5f83c5"
  -
    type: "verify"
    at: "2026-08-30T14:13:35.067Z"
    author: "SUPERVISOR"
    state: "ok"
    note: "Verified: CLI-owned checks passed before independent EVALUATOR review."
  -
    type: "status"
    at: "2026-08-30T15:17:11.548Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: pre-merge closure packet is ready for the task PR."
    commit: "cb7c6115667e2e5a49bd9456235b4aa79187f0a6"
  -
    type: "status"
    at: "2026-08-30T15:25:10.252Z"
    author: "SUPERVISOR"
    from: "DONE"
    to: "DOING"
    note: "Implementation committed: 1e07dd534c78. CLI accepted one state-bound external-agent semantic result."
    commit: "1e07dd534c782e6ca325623af332e1f0ded85651"
  -
    type: "verify"
    at: "2026-08-30T15:39:56.664Z"
    author: "SUPERVISOR"
    state: "ok"
    note: "Verified: CLI-owned checks passed before independent EVALUATOR review."
doc_version: 3
doc_updated_at: "2026-08-30T15:40:00.433Z"
doc_updated_by: "SUPERVISOR"
description: "Connect legacy CLI and repository surfaces to the canonical Task kernel through explicit adapters. Add one-time migration, dual-read or shadow execution where needed, exact replay fixtures, state equivalence checks, rollback receipts, and fail-closed handling for unknown legacy layouts."
sections:
  Summary: |-
    Add compatibility adapters and replay migration

    Connect legacy CLI and repository surfaces to the canonical Task kernel through explicit adapters. Add one-time migration, dual-read or shadow execution where needed, exact replay fixtures, state equivalence checks, rollback receipts, and fail-closed handling for unknown legacy layouts.
  Scope: |-
    - In scope: Connect legacy CLI and repository surfaces to the canonical Task kernel through explicit adapters. Add one-time migration, dual-read or shadow execution where needed, exact replay fixtures, state equivalence checks, rollback receipts, and fail-closed handling for unknown legacy layouts.
    - Out of scope: unrelated refactors not required for "Add compatibility adapters and replay migration".
  Plan: "Preserve all M0 acceptance and the first three WorkItem definitions. Split remaining qualification into supplemental coverage implementation and dependent exact-anchor corpus freeze. Keep the failed full repository gate open. Copy the prepared planning baseline exactly."
  Verify Steps: |-
    PLANNER fallback scaffold for "Add compatibility adapters and replay migration". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Add compatibility adapters and replay migration". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-08-30T04:58:08.850Z — VERIFY — ok

    By: SUPERVISOR

    Note: Verified: CLI-owned checks passed before independent EVALUATOR review.
    Attempts: 0

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:14f2d1aa148850434712b287721a7e1a35d4528d09687a0f0ef6b8915e5a7bb6, input_digest=sha256:5ac6fe8bf7c86d938b098c8a84ee6834c83953f983eeec5f2f783128fa6cecaa

    Details:

    Check: affected_unit_integration
    Command: bun run arch:check
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check affected_unit_integration (1/8)

    Check: affected_unit_integration
    Command: bun run lifecycle:invariants
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check affected_unit_integration (2/8)

    Check: affected_unit_integration
    Command: bun run test:fast
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check affected_unit_integration (3/8)

    Check: affected_unit_integration
    Command: bun run typecheck
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check affected_unit_integration (4/8)

    Check: affected_unit_integration
    Command: git diff --check
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-5
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check affected_unit_integration (5/8)

    Check: affected_unit_integration
    Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-6
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check affected_unit_integration (6/8)

    Check: affected_unit_integration
    Command: agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-7
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check affected_unit_integration (7/8)

    Check: affected_unit_integration
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-8
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check affected_unit_integration (8/8)

    Check: critical_paths
    Command: bun run arch:check
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check critical_paths (1/8)

    Check: critical_paths
    Command: bun run lifecycle:invariants
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check critical_paths (2/8)

    Check: critical_paths
    Command: bun run test:fast
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check critical_paths (3/8)

    Check: critical_paths
    Command: bun run typecheck
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check critical_paths (4/8)

    Check: critical_paths
    Command: git diff --check
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-5
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check critical_paths (5/8)

    Check: critical_paths
    Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-6
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check critical_paths (6/8)

    Check: critical_paths
    Command: agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-7
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check critical_paths (7/8)

    Check: critical_paths
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-8
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check critical_paths (8/8)

    Check: docs_contract
    Command: bun run arch:check
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check docs_contract (1/8)

    Check: docs_contract
    Command: bun run lifecycle:invariants
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check docs_contract (2/8)

    Check: docs_contract
    Command: bun run test:fast
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check docs_contract (3/8)

    Check: docs_contract
    Command: bun run typecheck
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check docs_contract (4/8)

    Check: docs_contract
    Command: git diff --check
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-5
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check docs_contract (5/8)

    Check: docs_contract
    Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-6
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check docs_contract (6/8)

    Check: docs_contract
    Command: agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-7
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check docs_contract (7/8)

    Check: docs_contract
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-8
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check docs_contract (8/8)

    Check: full_regression
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-8
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check full_regression

    Check: task_outcome
    Command: bun run arch:check
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check task_outcome (1/8)

    Check: task_outcome
    Command: bun run lifecycle:invariants
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check task_outcome (2/8)

    Check: task_outcome
    Command: bun run test:fast
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check task_outcome (3/8)

    Check: task_outcome
    Command: bun run typecheck
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check task_outcome (4/8)

    Check: task_outcome
    Command: git diff --check
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-5
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check task_outcome (5/8)

    Check: task_outcome
    Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-6
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check task_outcome (6/8)

    Check: task_outcome
    Command: agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-7
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check task_outcome (7/8)

    Check: task_outcome
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-8
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check task_outcome (8/8)

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608291006-2A6BJC-add-compatibility-adapters-and-replay-migration/.agentplane/tasks/202608291006-2A6BJC/blueprint/resolved-snapshot.json
    - old_digest: de01a169a7c1ba12da99c26a1e9c03024b28e8ea88f99c10758e30b1a931abc9
    - current_digest: de01a169a7c1ba12da99c26a1e9c03024b28e8ea88f99c10758e30b1a931abc9
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608291006-2A6BJC

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

    ### 2026-08-30T05:56:44.233Z — VERIFY — needs_rework

    By: SUPERVISOR

    Note: Rework: Declared check failed: bun run ci:local:full
    Attempts: 1

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:14f2d1aa148850434712b287721a7e1a35d4528d09687a0f0ef6b8915e5a7bb6, input_digest=sha256:04388fb46decff956f378aa208ddef3888d308e0492bd7fa9894d53655604e80

    Details:

    Command: bun run arch:check
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608291006-2A6BJC declared verification

    Command: bun run lifecycle:invariants
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608291006-2A6BJC declared verification

    Command: bun run test:fast
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202608291006-2A6BJC declared verification

    Command: bun run typecheck
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202608291006-2A6BJC declared verification

    Command: git diff --check
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-5
    Scope: branch_pr task 202608291006-2A6BJC declared verification

    Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-6
    Scope: branch_pr task 202608291006-2A6BJC declared verification

    Command: agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-7
    Scope: branch_pr task 202608291006-2A6BJC declared verification

    Command: bun run ci:local:full
    Result: fail
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-8
    Scope: branch_pr task 202608291006-2A6BJC declared verification

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608291006-2A6BJC-add-compatibility-adapters-and-replay-migration/.agentplane/tasks/202608291006-2A6BJC/blueprint/resolved-snapshot.json
    - old_digest: de01a169a7c1ba12da99c26a1e9c03024b28e8ea88f99c10758e30b1a931abc9
    - current_digest: de01a169a7c1ba12da99c26a1e9c03024b28e8ea88f99c10758e30b1a931abc9
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608291006-2A6BJC

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

    ### 2026-08-30T07:21:50.527Z — VERIFY — needs_rework

    By: SUPERVISOR

    Note: Rework: Declared check failed: bun run ci:local:full
    Attempts: 1

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:14f2d1aa148850434712b287721a7e1a35d4528d09687a0f0ef6b8915e5a7bb6, input_digest=sha256:285418f098288ea7113e3dde4549eea781849af7eeeb192b0a79c58fe44c0dac

    Details:

    Command: bun run arch:check
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608291006-2A6BJC declared verification

    Command: bun run lifecycle:invariants
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608291006-2A6BJC declared verification

    Command: bun run test:fast
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202608291006-2A6BJC declared verification

    Command: bun run typecheck
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202608291006-2A6BJC declared verification

    Command: git diff --check
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-5
    Scope: branch_pr task 202608291006-2A6BJC declared verification

    Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-6
    Scope: branch_pr task 202608291006-2A6BJC declared verification

    Command: agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-7
    Scope: branch_pr task 202608291006-2A6BJC declared verification

    Command: bun run ci:local:full
    Result: fail
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-8
    Scope: branch_pr task 202608291006-2A6BJC declared verification

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608291006-2A6BJC-add-compatibility-adapters-and-replay-migration/.agentplane/tasks/202608291006-2A6BJC/blueprint/resolved-snapshot.json
    - old_digest: de01a169a7c1ba12da99c26a1e9c03024b28e8ea88f99c10758e30b1a931abc9
    - current_digest: de01a169a7c1ba12da99c26a1e9c03024b28e8ea88f99c10758e30b1a931abc9
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608291006-2A6BJC

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

    ### 2026-08-30T07:36:28.040Z — VERIFY — needs_rework

    By: ORCHESTRATOR

    Note: Recover the failed no-change refinement return. Request a fresh bounded implementation episode to qualify adapter capability refusal and return the missing compatibility artifact scope refinement. Preserve prior implementation.
    Attempts: 2

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:14f2d1aa148850434712b287721a7e1a35d4528d09687a0f0ef6b8915e5a7bb6, input_digest=sha256:f1e3781e9b8bf6b06b304e0471060469b0d473abf872f129994dff5c3a11c882

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608291006-2A6BJC-add-compatibility-adapters-and-replay-migration/.agentplane/tasks/202608291006-2A6BJC/blueprint/resolved-snapshot.json
    - old_digest: de01a169a7c1ba12da99c26a1e9c03024b28e8ea88f99c10758e30b1a931abc9
    - current_digest: de01a169a7c1ba12da99c26a1e9c03024b28e8ea88f99c10758e30b1a931abc9
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608291006-2A6BJC

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

    ### 2026-08-30T07:51:16.632Z — VERIFY — needs_rework

    By: SUPERVISOR

    Note: Rework: Declared check failed: bun run ci:local:full
    Attempts: 3

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:14f2d1aa148850434712b287721a7e1a35d4528d09687a0f0ef6b8915e5a7bb6, input_digest=sha256:ea3185aa07b20baac8750bb224fe4746f6e741eabf6fbf2cc63cba345f16539f

    Details:

    Command: bun run arch:check
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608291006-2A6BJC declared verification

    Command: bun run lifecycle:invariants
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608291006-2A6BJC declared verification

    Command: bun run test:fast
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202608291006-2A6BJC declared verification

    Command: bun run typecheck
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202608291006-2A6BJC declared verification

    Command: git diff --check
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-5
    Scope: branch_pr task 202608291006-2A6BJC declared verification

    Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-6
    Scope: branch_pr task 202608291006-2A6BJC declared verification

    Command: agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-7
    Scope: branch_pr task 202608291006-2A6BJC declared verification

    Command: bun run ci:local:full
    Result: fail
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-8
    Scope: branch_pr task 202608291006-2A6BJC declared verification

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608291006-2A6BJC-add-compatibility-adapters-and-replay-migration/.agentplane/tasks/202608291006-2A6BJC/blueprint/resolved-snapshot.json
    - old_digest: de01a169a7c1ba12da99c26a1e9c03024b28e8ea88f99c10758e30b1a931abc9
    - current_digest: de01a169a7c1ba12da99c26a1e9c03024b28e8ea88f99c10758e30b1a931abc9
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608291006-2A6BJC

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

    ### 2026-08-30T08:07:29.919Z — VERIFY — blocked_external

    By: SUPERVISOR

    Note: Rework: Declared check failed: bun run test:fast
    Attempts: 4

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:14f2d1aa148850434712b287721a7e1a35d4528d09687a0f0ef6b8915e5a7bb6, input_digest=sha256:cfbbb1bde996bbadfc266a8b7a55291d2de9c9278becaec8b34cc09168c12fbf

    Details:

    Command: bun run arch:check
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608291006-2A6BJC declared verification

    Command: bun run lifecycle:invariants
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608291006-2A6BJC declared verification

    Command: bun run test:fast
    Result: fail
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202608291006-2A6BJC declared verification

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608291006-2A6BJC-add-compatibility-adapters-and-replay-migration/.agentplane/tasks/202608291006-2A6BJC/blueprint/resolved-snapshot.json
    - old_digest: de01a169a7c1ba12da99c26a1e9c03024b28e8ea88f99c10758e30b1a931abc9
    - current_digest: de01a169a7c1ba12da99c26a1e9c03024b28e8ea88f99c10758e30b1a931abc9
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608291006-2A6BJC

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

    ### 2026-08-30T08:32:18.484Z — VERIFY — ok

    By: SUPERVISOR

    Note: Verified: CLI-owned checks passed before independent EVALUATOR review.
    Attempts: 0

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:14f2d1aa148850434712b287721a7e1a35d4528d09687a0f0ef6b8915e5a7bb6, input_digest=sha256:d0f48cb317f1e142ed470d09850b37dbf2a8202ef017d4bdb19f6a306313271b

    Details:

    Check: affected_unit_integration
    Command: bun run arch:check
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check affected_unit_integration (1/8)

    Check: affected_unit_integration
    Command: bun run lifecycle:invariants
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check affected_unit_integration (2/8)

    Check: affected_unit_integration
    Command: bun run test:fast
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check affected_unit_integration (3/8)

    Check: affected_unit_integration
    Command: bun run typecheck
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check affected_unit_integration (4/8)

    Check: affected_unit_integration
    Command: git diff --check
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-5
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check affected_unit_integration (5/8)

    Check: affected_unit_integration
    Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-6
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check affected_unit_integration (6/8)

    Check: affected_unit_integration
    Command: agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-7
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check affected_unit_integration (7/8)

    Check: affected_unit_integration
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-8
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check affected_unit_integration (8/8)

    Check: critical_paths
    Command: bun run arch:check
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check critical_paths (1/8)

    Check: critical_paths
    Command: bun run lifecycle:invariants
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check critical_paths (2/8)

    Check: critical_paths
    Command: bun run test:fast
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check critical_paths (3/8)

    Check: critical_paths
    Command: bun run typecheck
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check critical_paths (4/8)

    Check: critical_paths
    Command: git diff --check
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-5
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check critical_paths (5/8)

    Check: critical_paths
    Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-6
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check critical_paths (6/8)

    Check: critical_paths
    Command: agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-7
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check critical_paths (7/8)

    Check: critical_paths
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-8
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check critical_paths (8/8)

    Check: docs_contract
    Command: bun run arch:check
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check docs_contract (1/8)

    Check: docs_contract
    Command: bun run lifecycle:invariants
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check docs_contract (2/8)

    Check: docs_contract
    Command: bun run test:fast
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check docs_contract (3/8)

    Check: docs_contract
    Command: bun run typecheck
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check docs_contract (4/8)

    Check: docs_contract
    Command: git diff --check
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-5
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check docs_contract (5/8)

    Check: docs_contract
    Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-6
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check docs_contract (6/8)

    Check: docs_contract
    Command: agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-7
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check docs_contract (7/8)

    Check: docs_contract
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-8
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check docs_contract (8/8)

    Check: full_regression
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-8
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check full_regression

    Check: task_outcome
    Command: bun run arch:check
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check task_outcome (1/8)

    Check: task_outcome
    Command: bun run lifecycle:invariants
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check task_outcome (2/8)

    Check: task_outcome
    Command: bun run test:fast
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check task_outcome (3/8)

    Check: task_outcome
    Command: bun run typecheck
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check task_outcome (4/8)

    Check: task_outcome
    Command: git diff --check
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-5
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check task_outcome (5/8)

    Check: task_outcome
    Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-6
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check task_outcome (6/8)

    Check: task_outcome
    Command: agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-7
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check task_outcome (7/8)

    Check: task_outcome
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-8
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check task_outcome (8/8)

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608291006-2A6BJC-add-compatibility-adapters-and-replay-migration/.agentplane/tasks/202608291006-2A6BJC/blueprint/resolved-snapshot.json
    - old_digest: de01a169a7c1ba12da99c26a1e9c03024b28e8ea88f99c10758e30b1a931abc9
    - current_digest: de01a169a7c1ba12da99c26a1e9c03024b28e8ea88f99c10758e30b1a931abc9
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608291006-2A6BJC

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

    ### 2026-08-30T08:50:20.011Z — VERIFY — ok

    By: SUPERVISOR

    Note: Verified: CLI-owned checks passed before independent EVALUATOR review.
    Attempts: 0

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:14f2d1aa148850434712b287721a7e1a35d4528d09687a0f0ef6b8915e5a7bb6, input_digest=sha256:d80d15cbeba708c060b9e9eb50fa8f32d933890389361d6e612a37f23257314a

    Details:

    Check: affected_unit_integration
    Command: bun run arch:check
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check affected_unit_integration (1/8)

    Check: affected_unit_integration
    Command: bun run lifecycle:invariants
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check affected_unit_integration (2/8)

    Check: affected_unit_integration
    Command: bun run test:fast
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check affected_unit_integration (3/8)

    Check: affected_unit_integration
    Command: bun run typecheck
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check affected_unit_integration (4/8)

    Check: affected_unit_integration
    Command: git diff --check
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-5
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check affected_unit_integration (5/8)

    Check: affected_unit_integration
    Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-6
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check affected_unit_integration (6/8)

    Check: affected_unit_integration
    Command: agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-7
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check affected_unit_integration (7/8)

    Check: affected_unit_integration
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-8
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check affected_unit_integration (8/8)

    Check: critical_paths
    Command: bun run arch:check
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check critical_paths (1/8)

    Check: critical_paths
    Command: bun run lifecycle:invariants
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check critical_paths (2/8)

    Check: critical_paths
    Command: bun run test:fast
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check critical_paths (3/8)

    Check: critical_paths
    Command: bun run typecheck
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check critical_paths (4/8)

    Check: critical_paths
    Command: git diff --check
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-5
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check critical_paths (5/8)

    Check: critical_paths
    Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-6
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check critical_paths (6/8)

    Check: critical_paths
    Command: agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-7
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check critical_paths (7/8)

    Check: critical_paths
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-8
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check critical_paths (8/8)

    Check: docs_contract
    Command: bun run arch:check
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check docs_contract (1/8)

    Check: docs_contract
    Command: bun run lifecycle:invariants
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check docs_contract (2/8)

    Check: docs_contract
    Command: bun run test:fast
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check docs_contract (3/8)

    Check: docs_contract
    Command: bun run typecheck
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check docs_contract (4/8)

    Check: docs_contract
    Command: git diff --check
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-5
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check docs_contract (5/8)

    Check: docs_contract
    Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-6
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check docs_contract (6/8)

    Check: docs_contract
    Command: agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-7
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check docs_contract (7/8)

    Check: docs_contract
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-8
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check docs_contract (8/8)

    Check: full_regression
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-8
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check full_regression

    Check: task_outcome
    Command: bun run arch:check
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check task_outcome (1/8)

    Check: task_outcome
    Command: bun run lifecycle:invariants
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check task_outcome (2/8)

    Check: task_outcome
    Command: bun run test:fast
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check task_outcome (3/8)

    Check: task_outcome
    Command: bun run typecheck
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check task_outcome (4/8)

    Check: task_outcome
    Command: git diff --check
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-5
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check task_outcome (5/8)

    Check: task_outcome
    Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-6
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check task_outcome (6/8)

    Check: task_outcome
    Command: agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-7
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check task_outcome (7/8)

    Check: task_outcome
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-8
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check task_outcome (8/8)

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608291006-2A6BJC-add-compatibility-adapters-and-replay-migration/.agentplane/tasks/202608291006-2A6BJC/blueprint/resolved-snapshot.json
    - old_digest: de01a169a7c1ba12da99c26a1e9c03024b28e8ea88f99c10758e30b1a931abc9
    - current_digest: de01a169a7c1ba12da99c26a1e9c03024b28e8ea88f99c10758e30b1a931abc9
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608291006-2A6BJC

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

    ### 2026-08-30T09:17:19.687Z — VERIFY — ok

    By: SUPERVISOR

    Note: Verified: CLI-owned checks passed before independent EVALUATOR review.
    Attempts: 0

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:14f2d1aa148850434712b287721a7e1a35d4528d09687a0f0ef6b8915e5a7bb6, input_digest=sha256:f67a8ec1a9a9bdfd4ea33a68c20869bc5a214a3e4cc464d819a556f54a87b962

    Details:

    Check: affected_unit_integration
    Command: bun run arch:check
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check affected_unit_integration (1/8)

    Check: affected_unit_integration
    Command: bun run lifecycle:invariants
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check affected_unit_integration (2/8)

    Check: affected_unit_integration
    Command: bun run test:fast
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check affected_unit_integration (3/8)

    Check: affected_unit_integration
    Command: bun run typecheck
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check affected_unit_integration (4/8)

    Check: affected_unit_integration
    Command: git diff --check
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-5
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check affected_unit_integration (5/8)

    Check: affected_unit_integration
    Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-6
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check affected_unit_integration (6/8)

    Check: affected_unit_integration
    Command: agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-7
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check affected_unit_integration (7/8)

    Check: affected_unit_integration
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-8
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check affected_unit_integration (8/8)

    Check: critical_paths
    Command: bun run arch:check
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check critical_paths (1/8)

    Check: critical_paths
    Command: bun run lifecycle:invariants
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check critical_paths (2/8)

    Check: critical_paths
    Command: bun run test:fast
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check critical_paths (3/8)

    Check: critical_paths
    Command: bun run typecheck
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check critical_paths (4/8)

    Check: critical_paths
    Command: git diff --check
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-5
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check critical_paths (5/8)

    Check: critical_paths
    Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-6
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check critical_paths (6/8)

    Check: critical_paths
    Command: agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-7
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check critical_paths (7/8)

    Check: critical_paths
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-8
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check critical_paths (8/8)

    Check: docs_contract
    Command: bun run arch:check
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check docs_contract (1/8)

    Check: docs_contract
    Command: bun run lifecycle:invariants
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check docs_contract (2/8)

    Check: docs_contract
    Command: bun run test:fast
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check docs_contract (3/8)

    Check: docs_contract
    Command: bun run typecheck
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check docs_contract (4/8)

    Check: docs_contract
    Command: git diff --check
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-5
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check docs_contract (5/8)

    Check: docs_contract
    Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-6
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check docs_contract (6/8)

    Check: docs_contract
    Command: agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-7
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check docs_contract (7/8)

    Check: docs_contract
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-8
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check docs_contract (8/8)

    Check: full_regression
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-8
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check full_regression

    Check: task_outcome
    Command: bun run arch:check
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check task_outcome (1/8)

    Check: task_outcome
    Command: bun run lifecycle:invariants
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check task_outcome (2/8)

    Check: task_outcome
    Command: bun run test:fast
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check task_outcome (3/8)

    Check: task_outcome
    Command: bun run typecheck
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check task_outcome (4/8)

    Check: task_outcome
    Command: git diff --check
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-5
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check task_outcome (5/8)

    Check: task_outcome
    Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-6
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check task_outcome (6/8)

    Check: task_outcome
    Command: agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-7
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check task_outcome (7/8)

    Check: task_outcome
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-8
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check task_outcome (8/8)

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608291006-2A6BJC-add-compatibility-adapters-and-replay-migration/.agentplane/tasks/202608291006-2A6BJC/blueprint/resolved-snapshot.json
    - old_digest: de01a169a7c1ba12da99c26a1e9c03024b28e8ea88f99c10758e30b1a931abc9
    - current_digest: de01a169a7c1ba12da99c26a1e9c03024b28e8ea88f99c10758e30b1a931abc9
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608291006-2A6BJC

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

    ### 2026-08-30T10:16:19.892Z — VERIFY — needs_rework

    By: SUPERVISOR

    Note: Rework: Declared check failed: bun run test:fast
    Attempts: 1

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:14f2d1aa148850434712b287721a7e1a35d4528d09687a0f0ef6b8915e5a7bb6, input_digest=sha256:828bba967a98ce750d220c0af94244aa4e26540e01dfc90be6b9faff5e82860f

    Details:

    Command: bun run arch:check
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608291006-2A6BJC declared verification

    Command: bun run lifecycle:invariants
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608291006-2A6BJC declared verification

    Command: bun run test:fast
    Result: fail
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202608291006-2A6BJC declared verification

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608291006-2A6BJC-add-compatibility-adapters-and-replay-migration/.agentplane/tasks/202608291006-2A6BJC/blueprint/resolved-snapshot.json
    - old_digest: de01a169a7c1ba12da99c26a1e9c03024b28e8ea88f99c10758e30b1a931abc9
    - current_digest: de01a169a7c1ba12da99c26a1e9c03024b28e8ea88f99c10758e30b1a931abc9
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608291006-2A6BJC

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

    ### 2026-08-30T10:59:46.329Z — VERIFY — needs_rework

    By: SUPERVISOR

    Note: Rework: Declared check failed: bun run test:fast
    Attempts: 2

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:14f2d1aa148850434712b287721a7e1a35d4528d09687a0f0ef6b8915e5a7bb6, input_digest=sha256:799862af38f6d79cf2a6199d638a051e5fc0a8394a84be67a098bdfd5e083d1c

    Details:

    Command: bun run arch:check
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608291006-2A6BJC declared verification

    Command: bun run lifecycle:invariants
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608291006-2A6BJC declared verification

    Command: bun run test:fast
    Result: fail
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202608291006-2A6BJC declared verification

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608291006-2A6BJC-add-compatibility-adapters-and-replay-migration/.agentplane/tasks/202608291006-2A6BJC/blueprint/resolved-snapshot.json
    - old_digest: de01a169a7c1ba12da99c26a1e9c03024b28e8ea88f99c10758e30b1a931abc9
    - current_digest: de01a169a7c1ba12da99c26a1e9c03024b28e8ea88f99c10758e30b1a931abc9
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608291006-2A6BJC

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

    ### 2026-08-30T11:33:08.691Z — VERIFY — needs_rework

    By: SUPERVISOR

    Note: Rework: Declared check failed: bun run ci:local:full
    Attempts: 1

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:14f2d1aa148850434712b287721a7e1a35d4528d09687a0f0ef6b8915e5a7bb6, input_digest=sha256:81b8cc5dbdd6b106e8de6e7ed2b6752d70969e82c88110319aab82dc27b9f657

    Details:

    Command: bun run arch:check
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608291006-2A6BJC declared verification

    Command: bun run lifecycle:invariants
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608291006-2A6BJC declared verification

    Command: bun run test:fast
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202608291006-2A6BJC declared verification

    Command: bun run typecheck
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202608291006-2A6BJC declared verification

    Command: git diff --check
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-5
    Scope: branch_pr task 202608291006-2A6BJC declared verification

    Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-6
    Scope: branch_pr task 202608291006-2A6BJC declared verification

    Command: agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-7
    Scope: branch_pr task 202608291006-2A6BJC declared verification

    Command: bun run ci:local:full
    Result: fail
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-8
    Scope: branch_pr task 202608291006-2A6BJC declared verification

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608291006-2A6BJC-add-compatibility-adapters-and-replay-migration/.agentplane/tasks/202608291006-2A6BJC/blueprint/resolved-snapshot.json
    - old_digest: de01a169a7c1ba12da99c26a1e9c03024b28e8ea88f99c10758e30b1a931abc9
    - current_digest: de01a169a7c1ba12da99c26a1e9c03024b28e8ea88f99c10758e30b1a931abc9
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608291006-2A6BJC

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

    ### 2026-08-30T12:04:23.497Z — VERIFY — ok

    By: SUPERVISOR

    Note: Verified: CLI-owned checks passed before independent EVALUATOR review.
    Attempts: 0

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:14f2d1aa148850434712b287721a7e1a35d4528d09687a0f0ef6b8915e5a7bb6, input_digest=sha256:8f4ec763c7c3a5e4f8f29dac9f65dd955b455989a0f731506926eb4cec130779

    Details:

    Check: affected_unit_integration
    Command: bun run arch:check
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check affected_unit_integration (1/8)

    Check: affected_unit_integration
    Command: bun run lifecycle:invariants
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check affected_unit_integration (2/8)

    Check: affected_unit_integration
    Command: bun run test:fast
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check affected_unit_integration (3/8)

    Check: affected_unit_integration
    Command: bun run typecheck
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check affected_unit_integration (4/8)

    Check: affected_unit_integration
    Command: git diff --check
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-5
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check affected_unit_integration (5/8)

    Check: affected_unit_integration
    Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-6
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check affected_unit_integration (6/8)

    Check: affected_unit_integration
    Command: agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-7
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check affected_unit_integration (7/8)

    Check: affected_unit_integration
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-8
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check affected_unit_integration (8/8)

    Check: critical_paths
    Command: bun run arch:check
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check critical_paths (1/8)

    Check: critical_paths
    Command: bun run lifecycle:invariants
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check critical_paths (2/8)

    Check: critical_paths
    Command: bun run test:fast
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check critical_paths (3/8)

    Check: critical_paths
    Command: bun run typecheck
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check critical_paths (4/8)

    Check: critical_paths
    Command: git diff --check
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-5
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check critical_paths (5/8)

    Check: critical_paths
    Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-6
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check critical_paths (6/8)

    Check: critical_paths
    Command: agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-7
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check critical_paths (7/8)

    Check: critical_paths
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-8
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check critical_paths (8/8)

    Check: docs_contract
    Command: bun run arch:check
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check docs_contract (1/8)

    Check: docs_contract
    Command: bun run lifecycle:invariants
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check docs_contract (2/8)

    Check: docs_contract
    Command: bun run test:fast
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check docs_contract (3/8)

    Check: docs_contract
    Command: bun run typecheck
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check docs_contract (4/8)

    Check: docs_contract
    Command: git diff --check
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-5
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check docs_contract (5/8)

    Check: docs_contract
    Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-6
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check docs_contract (6/8)

    Check: docs_contract
    Command: agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-7
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check docs_contract (7/8)

    Check: docs_contract
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-8
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check docs_contract (8/8)

    Check: full_regression
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-8
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check full_regression

    Check: task_outcome
    Command: bun run arch:check
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check task_outcome (1/8)

    Check: task_outcome
    Command: bun run lifecycle:invariants
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check task_outcome (2/8)

    Check: task_outcome
    Command: bun run test:fast
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check task_outcome (3/8)

    Check: task_outcome
    Command: bun run typecheck
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check task_outcome (4/8)

    Check: task_outcome
    Command: git diff --check
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-5
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check task_outcome (5/8)

    Check: task_outcome
    Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-6
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check task_outcome (6/8)

    Check: task_outcome
    Command: agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-7
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check task_outcome (7/8)

    Check: task_outcome
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-8
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check task_outcome (8/8)

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608291006-2A6BJC-add-compatibility-adapters-and-replay-migration/.agentplane/tasks/202608291006-2A6BJC/blueprint/resolved-snapshot.json
    - old_digest: de01a169a7c1ba12da99c26a1e9c03024b28e8ea88f99c10758e30b1a931abc9
    - current_digest: de01a169a7c1ba12da99c26a1e9c03024b28e8ea88f99c10758e30b1a931abc9
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608291006-2A6BJC

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

    ### 2026-08-30T12:30:03.566Z — VERIFY — ok

    By: SUPERVISOR

    Note: Verified: CLI-owned checks passed before independent EVALUATOR review.
    Attempts: 0

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:14f2d1aa148850434712b287721a7e1a35d4528d09687a0f0ef6b8915e5a7bb6, input_digest=sha256:c6cb9ddfebaf4e708e2542bc6bad20540ab9cd3fd10719da7e86fac7ed292c72

    Details:

    Check: affected_unit_integration
    Command: bun run arch:check
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check affected_unit_integration (1/8)

    Check: affected_unit_integration
    Command: bun run lifecycle:invariants
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check affected_unit_integration (2/8)

    Check: affected_unit_integration
    Command: bun run test:fast
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check affected_unit_integration (3/8)

    Check: affected_unit_integration
    Command: bun run typecheck
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check affected_unit_integration (4/8)

    Check: affected_unit_integration
    Command: git diff --check
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-5
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check affected_unit_integration (5/8)

    Check: affected_unit_integration
    Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-6
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check affected_unit_integration (6/8)

    Check: affected_unit_integration
    Command: agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-7
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check affected_unit_integration (7/8)

    Check: affected_unit_integration
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-8
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check affected_unit_integration (8/8)

    Check: critical_paths
    Command: bun run arch:check
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check critical_paths (1/8)

    Check: critical_paths
    Command: bun run lifecycle:invariants
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check critical_paths (2/8)

    Check: critical_paths
    Command: bun run test:fast
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check critical_paths (3/8)

    Check: critical_paths
    Command: bun run typecheck
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check critical_paths (4/8)

    Check: critical_paths
    Command: git diff --check
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-5
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check critical_paths (5/8)

    Check: critical_paths
    Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-6
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check critical_paths (6/8)

    Check: critical_paths
    Command: agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-7
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check critical_paths (7/8)

    Check: critical_paths
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-8
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check critical_paths (8/8)

    Check: docs_contract
    Command: bun run arch:check
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check docs_contract (1/8)

    Check: docs_contract
    Command: bun run lifecycle:invariants
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check docs_contract (2/8)

    Check: docs_contract
    Command: bun run test:fast
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check docs_contract (3/8)

    Check: docs_contract
    Command: bun run typecheck
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check docs_contract (4/8)

    Check: docs_contract
    Command: git diff --check
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-5
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check docs_contract (5/8)

    Check: docs_contract
    Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-6
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check docs_contract (6/8)

    Check: docs_contract
    Command: agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-7
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check docs_contract (7/8)

    Check: docs_contract
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-8
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check docs_contract (8/8)

    Check: full_regression
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-8
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check full_regression

    Check: task_outcome
    Command: bun run arch:check
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check task_outcome (1/8)

    Check: task_outcome
    Command: bun run lifecycle:invariants
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check task_outcome (2/8)

    Check: task_outcome
    Command: bun run test:fast
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check task_outcome (3/8)

    Check: task_outcome
    Command: bun run typecheck
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check task_outcome (4/8)

    Check: task_outcome
    Command: git diff --check
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-5
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check task_outcome (5/8)

    Check: task_outcome
    Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-6
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check task_outcome (6/8)

    Check: task_outcome
    Command: agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-7
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check task_outcome (7/8)

    Check: task_outcome
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-8
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check task_outcome (8/8)

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608291006-2A6BJC-add-compatibility-adapters-and-replay-migration/.agentplane/tasks/202608291006-2A6BJC/blueprint/resolved-snapshot.json
    - old_digest: de01a169a7c1ba12da99c26a1e9c03024b28e8ea88f99c10758e30b1a931abc9
    - current_digest: de01a169a7c1ba12da99c26a1e9c03024b28e8ea88f99c10758e30b1a931abc9
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608291006-2A6BJC

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

    ### 2026-08-30T13:45:01.039Z — VERIFY — needs_rework

    By: SUPERVISOR

    Note: Rework: Declared check failed: bun run ci:local:full
    Attempts: 1

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:14f2d1aa148850434712b287721a7e1a35d4528d09687a0f0ef6b8915e5a7bb6, input_digest=sha256:a70c66206e09cd5793b00edd9ec789ab413aa407a1a05806d68c8252cbbba817

    Details:

    Command: bun run arch:check
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608291006-2A6BJC declared verification

    Command: bun run lifecycle:invariants
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608291006-2A6BJC declared verification

    Command: bun run test:fast
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202608291006-2A6BJC declared verification

    Command: bun run typecheck
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202608291006-2A6BJC declared verification

    Command: git diff --check
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-5
    Scope: branch_pr task 202608291006-2A6BJC declared verification

    Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-6
    Scope: branch_pr task 202608291006-2A6BJC declared verification

    Command: agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-7
    Scope: branch_pr task 202608291006-2A6BJC declared verification

    Command: bun run ci:local:full
    Result: fail
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-8
    Scope: branch_pr task 202608291006-2A6BJC declared verification

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608291006-2A6BJC-add-compatibility-adapters-and-replay-migration/.agentplane/tasks/202608291006-2A6BJC/blueprint/resolved-snapshot.json
    - old_digest: de01a169a7c1ba12da99c26a1e9c03024b28e8ea88f99c10758e30b1a931abc9
    - current_digest: de01a169a7c1ba12da99c26a1e9c03024b28e8ea88f99c10758e30b1a931abc9
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608291006-2A6BJC

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

    ### 2026-08-30T14:13:35.067Z — VERIFY — ok

    By: SUPERVISOR

    Note: Verified: CLI-owned checks passed before independent EVALUATOR review.
    Attempts: 0

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:14f2d1aa148850434712b287721a7e1a35d4528d09687a0f0ef6b8915e5a7bb6, input_digest=sha256:1432676033e9647cd629be883fb2fcf4fa3ef05cbd096d0b436cc60cb1332217

    Details:

    Check: affected_unit_integration
    Command: bun run arch:check
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check affected_unit_integration (1/8)

    Check: affected_unit_integration
    Command: bun run lifecycle:invariants
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check affected_unit_integration (2/8)

    Check: affected_unit_integration
    Command: bun run test:fast
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check affected_unit_integration (3/8)

    Check: affected_unit_integration
    Command: bun run typecheck
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check affected_unit_integration (4/8)

    Check: affected_unit_integration
    Command: git diff --check
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-5
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check affected_unit_integration (5/8)

    Check: affected_unit_integration
    Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-6
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check affected_unit_integration (6/8)

    Check: affected_unit_integration
    Command: agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-7
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check affected_unit_integration (7/8)

    Check: affected_unit_integration
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-8
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check affected_unit_integration (8/8)

    Check: critical_paths
    Command: bun run arch:check
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check critical_paths (1/8)

    Check: critical_paths
    Command: bun run lifecycle:invariants
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check critical_paths (2/8)

    Check: critical_paths
    Command: bun run test:fast
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check critical_paths (3/8)

    Check: critical_paths
    Command: bun run typecheck
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check critical_paths (4/8)

    Check: critical_paths
    Command: git diff --check
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-5
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check critical_paths (5/8)

    Check: critical_paths
    Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-6
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check critical_paths (6/8)

    Check: critical_paths
    Command: agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-7
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check critical_paths (7/8)

    Check: critical_paths
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-8
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check critical_paths (8/8)

    Check: docs_contract
    Command: bun run arch:check
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check docs_contract (1/8)

    Check: docs_contract
    Command: bun run lifecycle:invariants
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check docs_contract (2/8)

    Check: docs_contract
    Command: bun run test:fast
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check docs_contract (3/8)

    Check: docs_contract
    Command: bun run typecheck
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check docs_contract (4/8)

    Check: docs_contract
    Command: git diff --check
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-5
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check docs_contract (5/8)

    Check: docs_contract
    Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-6
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check docs_contract (6/8)

    Check: docs_contract
    Command: agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-7
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check docs_contract (7/8)

    Check: docs_contract
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-8
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check docs_contract (8/8)

    Check: full_regression
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-8
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check full_regression

    Check: task_outcome
    Command: bun run arch:check
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check task_outcome (1/8)

    Check: task_outcome
    Command: bun run lifecycle:invariants
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check task_outcome (2/8)

    Check: task_outcome
    Command: bun run test:fast
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check task_outcome (3/8)

    Check: task_outcome
    Command: bun run typecheck
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check task_outcome (4/8)

    Check: task_outcome
    Command: git diff --check
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-5
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check task_outcome (5/8)

    Check: task_outcome
    Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-6
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check task_outcome (6/8)

    Check: task_outcome
    Command: agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-7
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check task_outcome (7/8)

    Check: task_outcome
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-8
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check task_outcome (8/8)

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608291006-2A6BJC-add-compatibility-adapters-and-replay-migration/.agentplane/tasks/202608291006-2A6BJC/blueprint/resolved-snapshot.json
    - old_digest: de01a169a7c1ba12da99c26a1e9c03024b28e8ea88f99c10758e30b1a931abc9
    - current_digest: de01a169a7c1ba12da99c26a1e9c03024b28e8ea88f99c10758e30b1a931abc9
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608291006-2A6BJC

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

    ### 2026-08-30T15:39:56.664Z — VERIFY — ok

    By: SUPERVISOR

    Note: Verified: CLI-owned checks passed before independent EVALUATOR review.
    Attempts: 0

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:14f2d1aa148850434712b287721a7e1a35d4528d09687a0f0ef6b8915e5a7bb6, input_digest=sha256:b5098ed4b063e911e45134753965e79aa1565b4518530c0d6a72e3f6c40a9470

    Details:

    Check: affected_unit_integration
    Command: bun run arch:check
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check affected_unit_integration (1/7)

    Check: affected_unit_integration
    Command: bun run lifecycle:invariants
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check affected_unit_integration (2/7)

    Check: affected_unit_integration
    Command: bun run test:fast
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check affected_unit_integration (3/7)

    Check: affected_unit_integration
    Command: bun run typecheck
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check affected_unit_integration (4/7)

    Check: affected_unit_integration
    Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-5
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check affected_unit_integration (5/7)

    Check: affected_unit_integration
    Command: agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-6
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check affected_unit_integration (6/7)

    Check: affected_unit_integration
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-7
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check affected_unit_integration (7/7)

    Check: critical_paths
    Command: bun run arch:check
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check critical_paths (1/7)

    Check: critical_paths
    Command: bun run lifecycle:invariants
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check critical_paths (2/7)

    Check: critical_paths
    Command: bun run test:fast
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check critical_paths (3/7)

    Check: critical_paths
    Command: bun run typecheck
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check critical_paths (4/7)

    Check: critical_paths
    Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-5
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check critical_paths (5/7)

    Check: critical_paths
    Command: agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-6
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check critical_paths (6/7)

    Check: critical_paths
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-7
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check critical_paths (7/7)

    Check: docs_contract
    Command: bun run arch:check
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check docs_contract (1/7)

    Check: docs_contract
    Command: bun run lifecycle:invariants
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check docs_contract (2/7)

    Check: docs_contract
    Command: bun run test:fast
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check docs_contract (3/7)

    Check: docs_contract
    Command: bun run typecheck
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check docs_contract (4/7)

    Check: docs_contract
    Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-5
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check docs_contract (5/7)

    Check: docs_contract
    Command: agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-6
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check docs_contract (6/7)

    Check: docs_contract
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-7
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check docs_contract (7/7)

    Check: full_regression
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-7
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check full_regression

    Check: task_outcome
    Command: bun run arch:check
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check task_outcome (1/7)

    Check: task_outcome
    Command: bun run lifecycle:invariants
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check task_outcome (2/7)

    Check: task_outcome
    Command: bun run test:fast
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check task_outcome (3/7)

    Check: task_outcome
    Command: bun run typecheck
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check task_outcome (4/7)

    Check: task_outcome
    Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-5
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check task_outcome (5/7)

    Check: task_outcome
    Command: agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-6
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check task_outcome (6/7)

    Check: task_outcome
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-7
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check task_outcome (7/7)

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608291006-2A6BJC-add-compatibility-adapters-and-replay-migration/.agentplane/tasks/202608291006-2A6BJC/blueprint/resolved-snapshot.json
    - old_digest: de01a169a7c1ba12da99c26a1e9c03024b28e8ea88f99c10758e30b1a931abc9
    - current_digest: de01a169a7c1ba12da99c26a1e9c03024b28e8ea88f99c10758e30b1a931abc9
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608291006-2A6BJC

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202608291006-2A6BJC
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
    completion_contract_digest: "sha256:497631335b4334bcdc13151f2e670eb39084eba3a7889d2290f97df69271f6b7"
    digest: "sha256:aa2749263c113d64b15398cf5d4b1f94b78ffda858d9819530ed375cb7e99e4d"
    grant_id: "a8bd867a-50b1-41ff-9416-5935d8c34af9"
    issued_at: "2026-08-30T10:24:20.488Z"
    kind: "agentplane.execution_grant"
    plan_digest: "sha256:6c1cfd88e2a1c1e5d9d2a6924667c6b284d668295c87bea1146344959c2e0469"
    plan_revision: 54
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    scope_digest: "sha256:e258ddeedc305dcd7b5973bb80268af1359486e241b54d90daf4722c0b34d586"
    status: "active"
    task_id: "202608291006-2A6BJC"
  agentplane.task_centric:
    current_plan:
      approval:
        approved_at: "2026-08-30T10:24:20.488Z"
        approved_by: "USER"
        approved_digest: "sha256:8e32060f888533284a0d0235807cc97a6cad53aa4e1f9d48d24ec527928ae634"
        policy_facts:
          - "manual_operator"
        state: "approved"
      created_at: "2026-08-30T10:23:19.724Z"
      digest: "sha256:8e32060f888533284a0d0235807cc97a6cad53aa4e1f9d48d24ec527928ae634"
      proposal:
        assumptions:
          - "Use M0 specification and M1 kernel as contracts. Preserve kernel purity and typed rejection semantics."
          - "Reuse existing task README transaction and cloud CAS owners. Do not add an independently mutable duplicate canonical store."
          - "All destructive migration qualification uses isolated fixtures. User repository migration and production cutover remain explicit M3 gates. Preserve unrelated task records, worktrees, user data and separate 0.7.8 release lane."
          - "Preserve completed predecessor definitions, results and output manifests. Checkpoint 8e92d66b8671d083b9928ef04b15a49dfece4292 passed 640 targeted tests and a clean exact-anchor capture passed 641 tests with 15 fixtures and 246 normalized read observations. Full test:fast failed 12 of 5185 tests across seven suites; a serial unchanged Node 24 control passed all 104 tests in those suites. Do not treat that control as a full gate pass. Do not increase timeouts or weaken checks without a reproduced cause."
          - "Predecessor qualification may update the reviewed compatibility candidate, its exact CLI descriptor and source-provenance allowlist, and the existing critical composition test. Add only the migration command delta. Preserve the immutable 0.6.24 baseline and strict rejection of unlisted changes."
          - "The original m2-replay-qualification requirement remains a Task-level mandatory criterion. Its remaining work is divided between coverage implementation and m2-corpus-freeze. No M0 acceptance criterion is removed or reduced."
          - "The current checkpoint is already committed. Do not create an extra no-change implementation episode to acknowledge it. The coverage WorkItem produces real supplemental harness changes; the final dependent WorkItem freezes the resulting exact-anchor corpus and report."
          - "Keep Task dependencies, production cutover boundary, external authority and all M3 self-hosting/release gates unchanged. No user repository migration or publication is performed in M2."
        planning_baseline:
          captured_at: "2026-08-30T10:16:36.141Z"
          config_digest: null
          context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
          digest: "sha256:7cbde15b23d6481ac6967502787a62df5e9896be051b005ce8512c7a9de50666"
          dirty_paths:
            - ".agentplane/tasks/202608291006-2A6BJC/README.md"
            - ".agentplane/tasks/202608291006-2A6BJC/pr/github-body.md"
            - ".agentplane/tasks/202608291006-2A6BJC/pr/meta.json"
            - ".agentplane/tasks/202608291006-2A6BJC/pr/review.md"
            - ".agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json"
            - ".agentplane/tasks/202608291006-2A6BJC/supervision/implementation-evidence.json"
            - ".agentplane/tasks/202608291006-2A6BJC/verification/20260830101619892-7739ec0ad7c72a78.json"
          git:
            kind: "commit"
            ref: null
            sha: "8e92d66b8671d083b9928ef04b15a49dfece4292"
          policy_digest: null
          schema_version: 1
          task_history_cursor: "task-revision:53"
        schema_version: 1
        task_id: "202608291006-2A6BJC"
        top_level_validation:
          checks:
            -
              capability: "task.verify"
              command: "bun run arch:check"
              id: "m2-architecture"
              kind: "deterministic"
              required: true
            -
              capability: "task.verify"
              command: "bun run lifecycle:invariants"
              id: "m2-invariants"
              kind: "deterministic"
              required: true
            -
              capability: "task.verify"
              command: "bun run test:fast"
              id: "m2-tests"
              kind: "deterministic"
              required: true
            -
              capability: "task.verify"
              command: "bun run typecheck"
              id: "m2-types"
              kind: "deterministic"
              required: true
            -
              capability: "task.verify"
              command: "git diff --check"
              id: "m2-diff"
              kind: "deterministic"
              required: true
          criteria:
            -
              check_ids:
                - "m2-architecture"
                - "m2-invariants"
                - "m2-tests"
                - "m2-types"
                - "m2-diff"
              description: "Connect M1 taskKernel to explicit persistence and application adapters. Canonical reads never synthesize aggregates from legacy data. Typed canonical, legacy_unmigrated, malformed and archived results fail closed. Persist aggregate, events, plans and mutation receipts atomically with CAS or proven serialization, validate capabilities, reject changed-command idempotency reuse, and compare independent readback before exposing receipts. CLI/document/status, validation/evaluator, Git/workspace and provider adapters observe or project only; canonical kernel owns transitions. New canonical creation is explicit; existing legacy production remains authoritative only in declared M2 comparison mode until M3 cutover."
              id: "m2-boundaries"
              required: true
            -
              check_ids:
                - "m2-architecture"
                - "m2-invariants"
                - "m2-tests"
                - "m2-types"
                - "m2-diff"
              description: "Implement dry-run, canary-first apply, idempotent repeat and receipt-scoped rollback through supported adapter/CLI surfaces. Preserve exact source bytes before writes. Record source/backend/repository/schema identity and all required digests/CAS/readback. TODO, DOING and BLOCKED migrate to PLANNING without invented plan, WorkItems, authority or evidence; DONE becomes read-only archive. Split required_inputs only with unambiguous typed evidence, quarantine unknown, ambiguous and malformed data. Atomically persist migration receipt and output. Rollback restores exact bytes only when output revision/digest and backup digest still match; otherwise return stable state_changed_after_migration or backup_mismatch without writes."
              id: "m2-migration"
              required: true
            -
              check_ids:
                - "m2-architecture"
                - "m2-invariants"
                - "m2-tests"
                - "m2-types"
                - "m2-diff"
              description: "Qualify the committed replay engine checkpoint at 447e42b16e053477a6e8ec77ac590269ee2e43e2. Preserve frozen kernel, migration and evidence vectors. Prove resource-claim rejection, local and cloud CAS persistence, interrupted write readback, exact-byte migration and rollback. Repair exact-anchor dependency isolation and expose suite-level failures. Update only the reviewed compatibility candidate for the added migration CLI; keep the immutable baseline unchanged. The final twelve-family qualification remains mandatory in m2-replay-qualification."
              id: "m2-replay"
              required: true
            -
              check_ids:
                - "m2-architecture"
                - "m2-invariants"
                - "m2-tests"
                - "m2-types"
                - "m2-diff"
              description: "Freeze complete twelve-family corpus from the integrated M0 specification with source bytes/digests, exact implementation anchor, commands, expected events, aggregate/projection digests, effect state and next-route codes. Exercise real local storage, serialized capability mode and cloud fake, interruption, all task classes and listed crash boundaries. Compare legacy and canonical normalized read paths without effects or canonical writes. Report first mismatch and reproducible command. Require zero unexplained mismatch, canary migration, repeated migration without byte changes, exact-byte rollback and full gate checks on one implementation identity. Do not claim M3 production deletion, twenty self-hosting tasks or release drills during M2. Produce an explicit coverage and qualification report. Reject zero-test runs, suite import failures, live workspace source leakage and unanchored transitive harness code. Preserve all M0 gates and report actual normalized legacy/canonical read comparison and actual next-action reason codes."
              id: "m2-replay-qualification"
              required: true
            -
              check_ids:
                - "m2-architecture"
                - "m2-invariants"
                - "m2-tests"
                - "m2-types"
                - "m2-diff"
              description: "Complete the M0 twelve-family qualification harness after checkpoint 8e92d66b8671d083b9928ef04b15a49dfece4292. Preserve the existing reviewed corpora and the new persistence capture proof. Add missing plan rejection and stale-approval cases; WorkItem dependency chains, fan-out, optional and blocked scheduling, missing upstream outputs, rework and duplicate/stale result cases; missing-executable evidence; operational versus semantic review drift; base and frozen-worktree document identity; and timeout-before/after-effect readback and reconciliation. Reproduce suspected scheduling and effect-dispatch gaps before fixing them. Reuse canonical transition guards and existing storage, process, workspace and provider observation owners. Every fixture must expose deterministic source bytes, command sequence and expected events, receipts, aggregate/projection digests, effect state and actual next-action code. Preserve exact-anchor isolation, fail on empty runs, and keep legacy production authoritative. Investigate the failed full test:fast run without weakening timeouts or assertions. The seven failed suites passed a serial Node 24 control run with 104 tests and unchanged code. The full recorded gate still must pass. Commit this harness through the supervisor before final corpus capture in m2-corpus-freeze. This WorkItem does not complete the final M2 gate."
              id: "m2-corpus-coverage"
              required: true
          evidence_fingerprint: "sha256:344821b13199ff01a77ca94c446cae2229eb2dfc5ab3b50005ba5c4af4a9d567"
          schema_version: 1
        unresolved_questions: []
        work_items:
          schema_version: 1
          work_items:
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "m2-architecture"
                    - "m2-invariants"
                    - "m2-tests"
                    - "m2-types"
                    - "m2-diff"
                  description: "Connect M1 taskKernel to explicit persistence and application adapters. Canonical reads never synthesize aggregates from legacy data. Typed canonical, legacy_unmigrated, malformed and archived results fail closed. Persist aggregate, events, plans and mutation receipts atomically with CAS or proven serialization, validate capabilities, reject changed-command idempotency reuse, and compare independent readback before exposing receipts. CLI/document/status, validation/evaluator, Git/workspace and provider adapters observe or project only; canonical kernel owns transitions. New canonical creation is explicit; existing legacy production remains authoritative only in declared M2 comparison mode until M3 cutover."
                  id: "m2-boundaries"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 96000
                optional_sources: []
                required_sources:
                  - "repository"
                  - "task-document"
                symbol_hints:
                  - "reduceTaskCommand"
                  - "TaskCentricBackendAdapter"
                  - "withTaskReadmeTransaction"
              depends_on: []
              expected_outputs:
                - "m2-boundaries-implementation"
              id: "m2-boundaries"
              objective: "Connect M1 taskKernel to explicit persistence and application adapters. Canonical reads never synthesize aggregates from legacy data. Typed canonical, legacy_unmigrated, malformed and archived results fail closed. Persist aggregate, events, plans and mutation receipts atomically with CAS or proven serialization, validate capabilities, reject changed-command idempotency reuse, and compare independent readback before exposing receipts. CLI/document/status, validation/evaluator, Git/workspace and provider adapters observe or project only; canonical kernel owns transitions. New canonical creation is explicit; existing legacy production remains authoritative only in declared M2 comparison mode until M3 cutover."
              optional: false
              priority: 0
              required_inputs: []
              resource_claims:
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/adapters/task-backend"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/backends/task-backend"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/ports"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/task"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli/run-cli"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/runner"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/core/src/tasks/task-kernel"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/core/src/tasks/index.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/testkit/src"
                -
                  kind: "path"
                  mode: "write"
                  resource: "scripts/bench"
                -
                  kind: "path"
                  mode: "write"
                  resource: "docs/developer"
                -
                  kind: "path"
                  mode: "write"
                  resource: "docs/reference/clean-task-core-rebuild-spec.mdx"
                -
                  kind: "path"
                  mode: "write"
                  resource: "scripts/baselines/v0.7-compatibility-candidate.json"
                -
                  kind: "path"
                  mode: "write"
                  resource: "scripts/checks/check-compatibility-contract-baseline.mjs"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli/run-cli.critical.agent-efficiency-baseline.test.ts"
              risk: "high"
              scope_roots:
                - "packages/agentplane/src/adapters/task-backend"
                - "packages/agentplane/src/backends/task-backend"
                - "packages/agentplane/src/ports"
                - "packages/agentplane/src/commands/task"
                - "packages/agentplane/src/cli/run-cli"
                - "packages/agentplane/src/runner"
                - "packages/core/src/tasks/task-kernel"
                - "packages/core/src/tasks/index.ts"
                - "packages/testkit/src"
                - "scripts/bench"
                - "docs/developer"
                - "docs/reference/clean-task-core-rebuild-spec.mdx"
                - "scripts/baselines/v0.7-compatibility-candidate.json"
                - "scripts/checks/check-compatibility-contract-baseline.mjs"
                - "packages/agentplane/src/cli/run-cli.critical.agent-efficiency-baseline.test.ts"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bun run arch:check"
                    id: "m2-architecture"
                    kind: "deterministic"
                    required: true
                  -
                    capability: "task.verify"
                    command: "bun run lifecycle:invariants"
                    id: "m2-invariants"
                    kind: "deterministic"
                    required: true
                  -
                    capability: "task.verify"
                    command: "bun run test:fast"
                    id: "m2-tests"
                    kind: "deterministic"
                    required: true
                  -
                    capability: "task.verify"
                    command: "bun run typecheck"
                    id: "m2-types"
                    kind: "deterministic"
                    required: true
                  -
                    capability: "task.verify"
                    command: "git diff --check"
                    id: "m2-diff"
                    kind: "deterministic"
                    required: true
                criteria:
                  -
                    check_ids:
                      - "m2-architecture"
                      - "m2-invariants"
                      - "m2-tests"
                      - "m2-types"
                      - "m2-diff"
                    description: "Connect M1 taskKernel to explicit persistence and application adapters. Canonical reads never synthesize aggregates from legacy data. Typed canonical, legacy_unmigrated, malformed and archived results fail closed. Persist aggregate, events, plans and mutation receipts atomically with CAS or proven serialization, validate capabilities, reject changed-command idempotency reuse, and compare independent readback before exposing receipts. CLI/document/status, validation/evaluator, Git/workspace and provider adapters observe or project only; canonical kernel owns transitions. New canonical creation is explicit; existing legacy production remains authoritative only in declared M2 comparison mode until M3 cutover."
                    id: "m2-boundaries"
                    required: true
                evidence_fingerprint: "sha256:1634af8127ebf4a1ba7154f01fe0157f9261858c5f79b06bdb71de73b2fe3512"
                schema_version: 1
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "m2-architecture"
                    - "m2-invariants"
                    - "m2-tests"
                    - "m2-types"
                    - "m2-diff"
                  description: "Implement dry-run, canary-first apply, idempotent repeat and receipt-scoped rollback through supported adapter/CLI surfaces. Preserve exact source bytes before writes. Record source/backend/repository/schema identity and all required digests/CAS/readback. TODO, DOING and BLOCKED migrate to PLANNING without invented plan, WorkItems, authority or evidence; DONE becomes read-only archive. Split required_inputs only with unambiguous typed evidence, quarantine unknown, ambiguous and malformed data. Atomically persist migration receipt and output. Rollback restores exact bytes only when output revision/digest and backup digest still match; otherwise return stable state_changed_after_migration or backup_mismatch without writes."
                  id: "m2-migration"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 96000
                optional_sources: []
                required_sources:
                  - "repository"
                  - "task-document"
                symbol_hints:
                  - "reduceTaskCommand"
                  - "TaskCentricBackendAdapter"
                  - "withTaskReadmeTransaction"
              depends_on:
                - "m2-boundaries"
              expected_outputs:
                - "m2-migration-implementation"
              id: "m2-migration"
              objective: "Implement dry-run, canary-first apply, idempotent repeat and receipt-scoped rollback through supported adapter/CLI surfaces. Preserve exact source bytes before writes. Record source/backend/repository/schema identity and all required digests/CAS/readback. TODO, DOING and BLOCKED migrate to PLANNING without invented plan, WorkItems, authority or evidence; DONE becomes read-only archive. Split required_inputs only with unambiguous typed evidence, quarantine unknown, ambiguous and malformed data. Atomically persist migration receipt and output. Rollback restores exact bytes only when output revision/digest and backup digest still match; otherwise return stable state_changed_after_migration or backup_mismatch without writes."
              optional: false
              priority: 1
              required_inputs:
                - "m2-boundaries-implementation"
              resource_claims:
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/adapters/task-backend"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/backends/task-backend"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/ports"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/task"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli/run-cli"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/runner"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/core/src/tasks/task-kernel"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/core/src/tasks/index.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/testkit/src"
                -
                  kind: "path"
                  mode: "write"
                  resource: "scripts/bench"
                -
                  kind: "path"
                  mode: "write"
                  resource: "docs/developer"
                -
                  kind: "path"
                  mode: "write"
                  resource: "docs/reference/clean-task-core-rebuild-spec.mdx"
                -
                  kind: "path"
                  mode: "write"
                  resource: "scripts/baselines/v0.7-compatibility-candidate.json"
                -
                  kind: "path"
                  mode: "write"
                  resource: "scripts/checks/check-compatibility-contract-baseline.mjs"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli/run-cli.critical.agent-efficiency-baseline.test.ts"
              risk: "high"
              scope_roots:
                - "packages/agentplane/src/adapters/task-backend"
                - "packages/agentplane/src/backends/task-backend"
                - "packages/agentplane/src/ports"
                - "packages/agentplane/src/commands/task"
                - "packages/agentplane/src/cli/run-cli"
                - "packages/agentplane/src/runner"
                - "packages/core/src/tasks/task-kernel"
                - "packages/core/src/tasks/index.ts"
                - "packages/testkit/src"
                - "scripts/bench"
                - "docs/developer"
                - "docs/reference/clean-task-core-rebuild-spec.mdx"
                - "scripts/baselines/v0.7-compatibility-candidate.json"
                - "scripts/checks/check-compatibility-contract-baseline.mjs"
                - "packages/agentplane/src/cli/run-cli.critical.agent-efficiency-baseline.test.ts"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bun run arch:check"
                    id: "m2-architecture"
                    kind: "deterministic"
                    required: true
                  -
                    capability: "task.verify"
                    command: "bun run lifecycle:invariants"
                    id: "m2-invariants"
                    kind: "deterministic"
                    required: true
                  -
                    capability: "task.verify"
                    command: "bun run test:fast"
                    id: "m2-tests"
                    kind: "deterministic"
                    required: true
                  -
                    capability: "task.verify"
                    command: "bun run typecheck"
                    id: "m2-types"
                    kind: "deterministic"
                    required: true
                  -
                    capability: "task.verify"
                    command: "git diff --check"
                    id: "m2-diff"
                    kind: "deterministic"
                    required: true
                criteria:
                  -
                    check_ids:
                      - "m2-architecture"
                      - "m2-invariants"
                      - "m2-tests"
                      - "m2-types"
                      - "m2-diff"
                    description: "Implement dry-run, canary-first apply, idempotent repeat and receipt-scoped rollback through supported adapter/CLI surfaces. Preserve exact source bytes before writes. Record source/backend/repository/schema identity and all required digests/CAS/readback. TODO, DOING and BLOCKED migrate to PLANNING without invented plan, WorkItems, authority or evidence; DONE becomes read-only archive. Split required_inputs only with unambiguous typed evidence, quarantine unknown, ambiguous and malformed data. Atomically persist migration receipt and output. Rollback restores exact bytes only when output revision/digest and backup digest still match; otherwise return stable state_changed_after_migration or backup_mismatch without writes."
                    id: "m2-migration"
                    required: true
                evidence_fingerprint: "sha256:ec442424abe95444c0aafb75e5b4f8a7daa7b24feb12268b0294e967bb9a4af1"
                schema_version: 1
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "m2-architecture"
                    - "m2-invariants"
                    - "m2-tests"
                    - "m2-types"
                    - "m2-diff"
                  description: "Qualify the committed replay engine checkpoint at 447e42b16e053477a6e8ec77ac590269ee2e43e2. Preserve frozen kernel, migration and evidence vectors. Prove resource-claim rejection, local and cloud CAS persistence, interrupted write readback, exact-byte migration and rollback. Repair exact-anchor dependency isolation and expose suite-level failures. Update only the reviewed compatibility candidate for the added migration CLI; keep the immutable baseline unchanged. The final twelve-family qualification remains mandatory in m2-replay-qualification."
                  id: "m2-replay"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 96000
                optional_sources: []
                required_sources:
                  - "repository"
                  - "task-document"
                symbol_hints:
                  - "reduceTaskCommand"
                  - "TaskCentricBackendAdapter"
                  - "withTaskReadmeTransaction"
              depends_on:
                - "m2-migration"
              expected_outputs:
                - "m2-replay-implementation"
              id: "m2-replay"
              objective: "Qualify the committed replay engine checkpoint at 447e42b16e053477a6e8ec77ac590269ee2e43e2. Preserve frozen kernel, migration and evidence vectors. Prove resource-claim rejection, local and cloud CAS persistence, interrupted write readback, exact-byte migration and rollback. Repair exact-anchor dependency isolation and expose suite-level failures. Update only the reviewed compatibility candidate for the added migration CLI; keep the immutable baseline unchanged. The final twelve-family qualification remains mandatory in m2-replay-qualification."
              optional: false
              priority: 2
              required_inputs:
                - "m2-migration-implementation"
              resource_claims:
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/adapters/task-backend"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/backends/task-backend"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/ports"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/task"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli/run-cli"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/runner"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/core/src/tasks/task-kernel"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/core/src/tasks/index.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/testkit/src"
                -
                  kind: "path"
                  mode: "write"
                  resource: "scripts/bench"
                -
                  kind: "path"
                  mode: "write"
                  resource: "docs/developer"
                -
                  kind: "path"
                  mode: "write"
                  resource: "docs/reference/clean-task-core-rebuild-spec.mdx"
                -
                  kind: "path"
                  mode: "write"
                  resource: "scripts/baselines/v0.7-compatibility-candidate.json"
                -
                  kind: "path"
                  mode: "write"
                  resource: "scripts/checks/check-compatibility-contract-baseline.mjs"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli/run-cli.critical.agent-efficiency-baseline.test.ts"
              risk: "high"
              scope_roots:
                - "packages/agentplane/src/adapters/task-backend"
                - "packages/agentplane/src/backends/task-backend"
                - "packages/agentplane/src/ports"
                - "packages/agentplane/src/commands/task"
                - "packages/agentplane/src/cli/run-cli"
                - "packages/agentplane/src/runner"
                - "packages/core/src/tasks/task-kernel"
                - "packages/core/src/tasks/index.ts"
                - "packages/testkit/src"
                - "scripts/bench"
                - "docs/developer"
                - "docs/reference/clean-task-core-rebuild-spec.mdx"
                - "scripts/baselines/v0.7-compatibility-candidate.json"
                - "scripts/checks/check-compatibility-contract-baseline.mjs"
                - "packages/agentplane/src/cli/run-cli.critical.agent-efficiency-baseline.test.ts"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bun run arch:check"
                    id: "m2-architecture"
                    kind: "deterministic"
                    required: true
                  -
                    capability: "task.verify"
                    command: "bun run lifecycle:invariants"
                    id: "m2-invariants"
                    kind: "deterministic"
                    required: true
                  -
                    capability: "task.verify"
                    command: "bun run test:fast"
                    id: "m2-tests"
                    kind: "deterministic"
                    required: true
                  -
                    capability: "task.verify"
                    command: "bun run typecheck"
                    id: "m2-types"
                    kind: "deterministic"
                    required: true
                  -
                    capability: "task.verify"
                    command: "git diff --check"
                    id: "m2-diff"
                    kind: "deterministic"
                    required: true
                criteria:
                  -
                    check_ids:
                      - "m2-architecture"
                      - "m2-invariants"
                      - "m2-tests"
                      - "m2-types"
                      - "m2-diff"
                    description: "Qualify the committed replay engine checkpoint at 447e42b16e053477a6e8ec77ac590269ee2e43e2. Preserve frozen kernel, migration and evidence vectors. Prove resource-claim rejection, local and cloud CAS persistence, interrupted write readback, exact-byte migration and rollback. Repair exact-anchor dependency isolation and expose suite-level failures. Update only the reviewed compatibility candidate for the added migration CLI; keep the immutable baseline unchanged. The final twelve-family qualification remains mandatory in m2-replay-qualification."
                    id: "m2-replay"
                    required: true
                evidence_fingerprint: "sha256:1d1658d2ac8757b0867c97b12229d8145a6915b4103a2b239d67dc6f8a7b5d80"
                schema_version: 1
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "m2-architecture"
                    - "m2-invariants"
                    - "m2-tests"
                    - "m2-types"
                    - "m2-diff"
                  description: "Complete the M0 twelve-family qualification harness after checkpoint 8e92d66b8671d083b9928ef04b15a49dfece4292. Preserve the existing reviewed corpora and the new persistence capture proof. Add missing plan rejection and stale-approval cases; WorkItem dependency chains, fan-out, optional and blocked scheduling, missing upstream outputs, rework and duplicate/stale result cases; missing-executable evidence; operational versus semantic review drift; base and frozen-worktree document identity; and timeout-before/after-effect readback and reconciliation. Reproduce suspected scheduling and effect-dispatch gaps before fixing them. Reuse canonical transition guards and existing storage, process, workspace and provider observation owners. Every fixture must expose deterministic source bytes, command sequence and expected events, receipts, aggregate/projection digests, effect state and actual next-action code. Preserve exact-anchor isolation, fail on empty runs, and keep legacy production authoritative. Investigate the failed full test:fast run without weakening timeouts or assertions. The seven failed suites passed a serial Node 24 control run with 104 tests and unchanged code. The full recorded gate still must pass. Commit this harness through the supervisor before final corpus capture in m2-corpus-freeze. This WorkItem does not complete the final M2 gate."
                  id: "m2-corpus-coverage"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 96000
                optional_sources: []
                required_sources:
                  - "repository"
                  - "task-document"
                symbol_hints:
                  - "reduceTaskCommand"
                  - "TaskCentricBackendAdapter"
                  - "withTaskReadmeTransaction"
              depends_on:
                - "m2-replay"
              expected_outputs:
                - "m2-coverage-implementation"
              id: "m2-replay-qualification"
              objective: "Complete the M0 twelve-family qualification harness after checkpoint 8e92d66b8671d083b9928ef04b15a49dfece4292. Preserve the existing reviewed corpora and the new persistence capture proof. Add missing plan rejection and stale-approval cases; WorkItem dependency chains, fan-out, optional and blocked scheduling, missing upstream outputs, rework and duplicate/stale result cases; missing-executable evidence; operational versus semantic review drift; base and frozen-worktree document identity; and timeout-before/after-effect readback and reconciliation. Reproduce suspected scheduling and effect-dispatch gaps before fixing them. Reuse canonical transition guards and existing storage, process, workspace and provider observation owners. Every fixture must expose deterministic source bytes, command sequence and expected events, receipts, aggregate/projection digests, effect state and actual next-action code. Preserve exact-anchor isolation, fail on empty runs, and keep legacy production authoritative. Investigate the failed full test:fast run without weakening timeouts or assertions. The seven failed suites passed a serial Node 24 control run with 104 tests and unchanged code. The full recorded gate still must pass. Commit this harness through the supervisor before final corpus capture in m2-corpus-freeze. This WorkItem does not complete the final M2 gate."
              optional: false
              priority: 3
              required_inputs:
                - "m2-replay-implementation"
              resource_claims:
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/adapters/task-backend"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/backends/task-backend"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/ports"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/task"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli/run-cli"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/runner"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/core/src/tasks/task-kernel"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/core/src/tasks/index.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/testkit/src"
                -
                  kind: "path"
                  mode: "write"
                  resource: "scripts/bench"
                -
                  kind: "path"
                  mode: "write"
                  resource: "docs/developer"
                -
                  kind: "path"
                  mode: "write"
                  resource: "docs/reference/clean-task-core-rebuild-spec.mdx"
                -
                  kind: "path"
                  mode: "write"
                  resource: "scripts/baselines/v0.7-compatibility-candidate.json"
                -
                  kind: "path"
                  mode: "write"
                  resource: "scripts/checks/check-compatibility-contract-baseline.mjs"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli/run-cli.critical.agent-efficiency-baseline.test.ts"
              risk: "high"
              scope_roots:
                - "packages/agentplane/src/adapters/task-backend"
                - "packages/agentplane/src/backends/task-backend"
                - "packages/agentplane/src/ports"
                - "packages/agentplane/src/commands/task"
                - "packages/agentplane/src/cli/run-cli"
                - "packages/agentplane/src/runner"
                - "packages/core/src/tasks/task-kernel"
                - "packages/core/src/tasks/index.ts"
                - "packages/testkit/src"
                - "scripts/bench"
                - "docs/developer"
                - "docs/reference/clean-task-core-rebuild-spec.mdx"
                - "scripts/baselines/v0.7-compatibility-candidate.json"
                - "scripts/checks/check-compatibility-contract-baseline.mjs"
                - "packages/agentplane/src/cli/run-cli.critical.agent-efficiency-baseline.test.ts"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bun run arch:check"
                    id: "m2-architecture"
                    kind: "deterministic"
                    required: true
                  -
                    capability: "task.verify"
                    command: "bun run lifecycle:invariants"
                    id: "m2-invariants"
                    kind: "deterministic"
                    required: true
                  -
                    capability: "task.verify"
                    command: "bun run test:fast"
                    id: "m2-tests"
                    kind: "deterministic"
                    required: true
                  -
                    capability: "task.verify"
                    command: "bun run typecheck"
                    id: "m2-types"
                    kind: "deterministic"
                    required: true
                  -
                    capability: "task.verify"
                    command: "git diff --check"
                    id: "m2-diff"
                    kind: "deterministic"
                    required: true
                criteria:
                  -
                    check_ids:
                      - "m2-architecture"
                      - "m2-invariants"
                      - "m2-tests"
                      - "m2-types"
                      - "m2-diff"
                    description: "Complete the M0 twelve-family qualification harness after checkpoint 8e92d66b8671d083b9928ef04b15a49dfece4292. Preserve the existing reviewed corpora and the new persistence capture proof. Add missing plan rejection and stale-approval cases; WorkItem dependency chains, fan-out, optional and blocked scheduling, missing upstream outputs, rework and duplicate/stale result cases; missing-executable evidence; operational versus semantic review drift; base and frozen-worktree document identity; and timeout-before/after-effect readback and reconciliation. Reproduce suspected scheduling and effect-dispatch gaps before fixing them. Reuse canonical transition guards and existing storage, process, workspace and provider observation owners. Every fixture must expose deterministic source bytes, command sequence and expected events, receipts, aggregate/projection digests, effect state and actual next-action code. Preserve exact-anchor isolation, fail on empty runs, and keep legacy production authoritative. Investigate the failed full test:fast run without weakening timeouts or assertions. The seven failed suites passed a serial Node 24 control run with 104 tests and unchanged code. The full recorded gate still must pass. Commit this harness through the supervisor before final corpus capture in m2-corpus-freeze. This WorkItem does not complete the final M2 gate."
                    id: "m2-corpus-coverage"
                    required: true
                evidence_fingerprint: "sha256:46119f05c36cf533a63c144eb5a5697c88956f9decce4ea8807cc16f4a398a86"
                schema_version: 1
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "m2-architecture"
                    - "m2-invariants"
                    - "m2-tests"
                    - "m2-types"
                    - "m2-diff"
                  description: "Freeze complete twelve-family corpus from the integrated M0 specification with source bytes/digests, exact implementation anchor, commands, expected events, aggregate/projection digests, effect state and next-route codes. Exercise real local storage, serialized capability mode and cloud fake, interruption, all task classes and listed crash boundaries. Compare legacy and canonical normalized read paths without effects or canonical writes. Report first mismatch and reproducible command. Require zero unexplained mismatch, canary migration, repeated migration without byte changes, exact-byte rollback and full gate checks on one implementation identity. Do not claim M3 production deletion, twenty self-hosting tasks or release drills during M2. Produce an explicit coverage and qualification report. Reject zero-test runs, suite import failures, live workspace source leakage and unanchored transitive harness code. Preserve all M0 gates and report actual normalized legacy/canonical read comparison and actual next-action reason codes. Capture only from the committed supplemental harness. Preserve reviewed old vectors. Add a complete coverage manifest and explicit reproduction commands. Replay all frozen inputs rather than regenerating expectations. Confirm local CAS, serialized direct and cloud fake equivalence; all required effect and crash cases; zero unexplained normalized dual-read mismatch; canary, repeat and exact-byte rollback. Include the current full repository checks and supervised hosted delivery in the final report. A control rerun of selected failed suites is not full-suite evidence."
                  id: "m2-replay-qualification"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 96000
                optional_sources: []
                required_sources:
                  - "repository"
                  - "task-document"
                symbol_hints:
                  - "reduceTaskCommand"
                  - "TaskCentricBackendAdapter"
                  - "withTaskReadmeTransaction"
              depends_on:
                - "m2-replay-qualification"
              expected_outputs:
                - "m2-frozen-qualification-corpus"
                - "m2-replay-qualification-report"
              id: "m2-corpus-freeze"
              objective: "Freeze complete twelve-family corpus from the integrated M0 specification with source bytes/digests, exact implementation anchor, commands, expected events, aggregate/projection digests, effect state and next-route codes. Exercise real local storage, serialized capability mode and cloud fake, interruption, all task classes and listed crash boundaries. Compare legacy and canonical normalized read paths without effects or canonical writes. Report first mismatch and reproducible command. Require zero unexplained mismatch, canary migration, repeated migration without byte changes, exact-byte rollback and full gate checks on one implementation identity. Do not claim M3 production deletion, twenty self-hosting tasks or release drills during M2. Produce an explicit coverage and qualification report. Reject zero-test runs, suite import failures, live workspace source leakage and unanchored transitive harness code. Preserve all M0 gates and report actual normalized legacy/canonical read comparison and actual next-action reason codes. Capture only from the committed supplemental harness. Preserve reviewed old vectors. Add a complete coverage manifest and explicit reproduction commands. Replay all frozen inputs rather than regenerating expectations. Confirm local CAS, serialized direct and cloud fake equivalence; all required effect and crash cases; zero unexplained normalized dual-read mismatch; canary, repeat and exact-byte rollback. Include the current full repository checks and supervised hosted delivery in the final report. A control rerun of selected failed suites is not full-suite evidence."
              optional: false
              priority: 4
              required_inputs:
                - "m2-coverage-implementation"
              resource_claims:
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/adapters/task-backend"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/backends/task-backend"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/ports"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/task"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli/run-cli"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/runner"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/core/src/tasks/task-kernel"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/core/src/tasks/index.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/testkit/src"
                -
                  kind: "path"
                  mode: "write"
                  resource: "scripts/bench"
                -
                  kind: "path"
                  mode: "write"
                  resource: "docs/developer"
                -
                  kind: "path"
                  mode: "write"
                  resource: "docs/reference/clean-task-core-rebuild-spec.mdx"
                -
                  kind: "path"
                  mode: "write"
                  resource: "scripts/baselines/v0.7-compatibility-candidate.json"
                -
                  kind: "path"
                  mode: "write"
                  resource: "scripts/checks/check-compatibility-contract-baseline.mjs"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli/run-cli.critical.agent-efficiency-baseline.test.ts"
              risk: "high"
              scope_roots:
                - "packages/agentplane/src/adapters/task-backend"
                - "packages/agentplane/src/backends/task-backend"
                - "packages/agentplane/src/ports"
                - "packages/agentplane/src/commands/task"
                - "packages/agentplane/src/cli/run-cli"
                - "packages/agentplane/src/runner"
                - "packages/core/src/tasks/task-kernel"
                - "packages/core/src/tasks/index.ts"
                - "packages/testkit/src"
                - "scripts/bench"
                - "docs/developer"
                - "docs/reference/clean-task-core-rebuild-spec.mdx"
                - "scripts/baselines/v0.7-compatibility-candidate.json"
                - "scripts/checks/check-compatibility-contract-baseline.mjs"
                - "packages/agentplane/src/cli/run-cli.critical.agent-efficiency-baseline.test.ts"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bun run arch:check"
                    id: "m2-architecture"
                    kind: "deterministic"
                    required: true
                  -
                    capability: "task.verify"
                    command: "bun run lifecycle:invariants"
                    id: "m2-invariants"
                    kind: "deterministic"
                    required: true
                  -
                    capability: "task.verify"
                    command: "bun run test:fast"
                    id: "m2-tests"
                    kind: "deterministic"
                    required: true
                  -
                    capability: "task.verify"
                    command: "bun run typecheck"
                    id: "m2-types"
                    kind: "deterministic"
                    required: true
                  -
                    capability: "task.verify"
                    command: "git diff --check"
                    id: "m2-diff"
                    kind: "deterministic"
                    required: true
                criteria:
                  -
                    check_ids:
                      - "m2-architecture"
                      - "m2-invariants"
                      - "m2-tests"
                      - "m2-types"
                      - "m2-diff"
                    description: "Freeze complete twelve-family corpus from the integrated M0 specification with source bytes/digests, exact implementation anchor, commands, expected events, aggregate/projection digests, effect state and next-route codes. Exercise real local storage, serialized capability mode and cloud fake, interruption, all task classes and listed crash boundaries. Compare legacy and canonical normalized read paths without effects or canonical writes. Report first mismatch and reproducible command. Require zero unexplained mismatch, canary migration, repeated migration without byte changes, exact-byte rollback and full gate checks on one implementation identity. Do not claim M3 production deletion, twenty self-hosting tasks or release drills during M2. Produce an explicit coverage and qualification report. Reject zero-test runs, suite import failures, live workspace source leakage and unanchored transitive harness code. Preserve all M0 gates and report actual normalized legacy/canonical read comparison and actual next-action reason codes. Capture only from the committed supplemental harness. Preserve reviewed old vectors. Add a complete coverage manifest and explicit reproduction commands. Replay all frozen inputs rather than regenerating expectations. Confirm local CAS, serialized direct and cloud fake equivalence; all required effect and crash cases; zero unexplained normalized dual-read mismatch; canary, repeat and exact-byte rollback. Include the current full repository checks and supervised hosted delivery in the final report. A control rerun of selected failed suites is not full-suite evidence."
                    id: "m2-replay-qualification"
                    required: true
                evidence_fingerprint: "sha256:98ce085b4d533f53460c75425ce61f5a7cf65d8bdac10f350aa2c61b4d5d17b3"
                schema_version: 1
      revision: 4
      schema_version: 1
      task_id: "202608291006-2A6BJC"
    event_cursor: 0
    final_validation:
      evidence:
        -
          artifact_refs:
            - "task-verification:202608291006-2A6BJC"
            - "git:2d298871cf8d20ca5b35c3d0a311cdd3be5f83c5"
          check_id: "m2-architecture"
          command_identity: "bun run arch:check"
          detail: "Verified: CLI-owned checks passed before independent EVALUATOR review."
          exit_code: 0
          observed_at: "2026-08-30T14:13:35.067Z"
          repository_snapshot_digest: "sha256:842b4ed4d4811036f9b9b29a80cbb15f086695d9b8ca2d7f563c31461cfc6c7b"
          status: "passed"
        -
          artifact_refs:
            - "task-verification:202608291006-2A6BJC"
            - "git:2d298871cf8d20ca5b35c3d0a311cdd3be5f83c5"
          check_id: "m2-invariants"
          command_identity: "bun run lifecycle:invariants"
          detail: "Verified: CLI-owned checks passed before independent EVALUATOR review."
          exit_code: 0
          observed_at: "2026-08-30T14:13:35.067Z"
          repository_snapshot_digest: "sha256:842b4ed4d4811036f9b9b29a80cbb15f086695d9b8ca2d7f563c31461cfc6c7b"
          status: "passed"
        -
          artifact_refs:
            - "task-verification:202608291006-2A6BJC"
            - "git:2d298871cf8d20ca5b35c3d0a311cdd3be5f83c5"
          check_id: "m2-tests"
          command_identity: "bun run test:fast"
          detail: "Verified: CLI-owned checks passed before independent EVALUATOR review."
          exit_code: 0
          observed_at: "2026-08-30T14:13:35.067Z"
          repository_snapshot_digest: "sha256:842b4ed4d4811036f9b9b29a80cbb15f086695d9b8ca2d7f563c31461cfc6c7b"
          status: "passed"
        -
          artifact_refs:
            - "task-verification:202608291006-2A6BJC"
            - "git:2d298871cf8d20ca5b35c3d0a311cdd3be5f83c5"
          check_id: "m2-types"
          command_identity: "bun run typecheck"
          detail: "Verified: CLI-owned checks passed before independent EVALUATOR review."
          exit_code: 0
          observed_at: "2026-08-30T14:13:35.067Z"
          repository_snapshot_digest: "sha256:842b4ed4d4811036f9b9b29a80cbb15f086695d9b8ca2d7f563c31461cfc6c7b"
          status: "passed"
        -
          artifact_refs:
            - "task-verification:202608291006-2A6BJC"
            - "git:2d298871cf8d20ca5b35c3d0a311cdd3be5f83c5"
          check_id: "m2-diff"
          command_identity: "git diff --check"
          detail: "Verified: CLI-owned checks passed before independent EVALUATOR review."
          exit_code: 0
          observed_at: "2026-08-30T14:13:35.067Z"
          repository_snapshot_digest: "sha256:842b4ed4d4811036f9b9b29a80cbb15f086695d9b8ca2d7f563c31461cfc6c7b"
          status: "passed"
      schema_version: 1
      stale_evidence: []
      status: "passed"
      unsatisfied_criteria: []
    id: "202608291006-2A6BJC"
    intent:
      acceptance_criteria:
        -
          check_ids: []
          description: "bun run arch:check"
          id: "legacy-1"
          required: true
        -
          check_ids: []
          description: "bun run lifecycle:invariants"
          id: "legacy-2"
          required: true
        -
          check_ids: []
          description: "bun run test:fast"
          id: "legacy-3"
          required: true
        -
          check_ids: []
          description: "bun run typecheck"
          id: "legacy-4"
          required: true
      captured_at: "2026-08-29T10:06:15.754Z"
      constraints: []
      request: |-
        Add compatibility adapters and replay migration

        Connect legacy CLI and repository surfaces to the canonical Task kernel through explicit adapters. Add one-time migration, dual-read or shadow execution where needed, exact replay fixtures, state equivalence checks, rollback receipts, and fail-closed handling for unknown legacy layouts.
      task_id: "202608291006-2A6BJC"
    lifecycle: "COMPLETED"
    plan_amendments: []
    plan_history:
      -
        approval:
          approved_at: "2026-08-30T04:03:02.075Z"
          approved_by: "USER"
          approved_digest: "sha256:cd5589c341f5305f8682578a76303b1f830d55f1c2fd93a5b4a0614d304fc2a0"
          policy_facts:
            - "manual_operator"
          state: "approved"
        created_at: "2026-08-30T04:02:39.666Z"
        digest: "sha256:cd5589c341f5305f8682578a76303b1f830d55f1c2fd93a5b4a0614d304fc2a0"
        proposal:
          assumptions:
            - "Use M0 specification and M1 kernel as contracts. Preserve kernel purity and typed rejection semantics."
            - "Reuse existing task README transaction and cloud CAS owners. Do not add an independently mutable duplicate canonical store."
            - "All destructive migration qualification uses isolated fixtures. User repository migration and production cutover remain explicit M3 gates. Preserve unrelated task records, worktrees, user data and separate 0.7.8 release lane."
          planning_baseline:
            captured_at: "2026-08-30T03:46:07.431Z"
            config_digest: null
            context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
            digest: "sha256:80ce56f4d8c3464cc1c68b48bab1221743c35996e574eefdcde94604b1200d12"
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
              sha: "cbc5d79d1510293de3b4c30b61679cdef85d0fdb"
            policy_digest: null
            schema_version: 1
            task_history_cursor: "task-revision:3"
          schema_version: 1
          task_id: "202608291006-2A6BJC"
          top_level_validation:
            checks:
              -
                capability: "task.verify"
                command: "bun run arch:check"
                id: "m2-architecture"
                kind: "deterministic"
                required: true
              -
                capability: "task.verify"
                command: "bun run lifecycle:invariants"
                id: "m2-invariants"
                kind: "deterministic"
                required: true
              -
                capability: "task.verify"
                command: "bun run test:fast"
                id: "m2-tests"
                kind: "deterministic"
                required: true
              -
                capability: "task.verify"
                command: "bun run typecheck"
                id: "m2-types"
                kind: "deterministic"
                required: true
              -
                capability: "task.verify"
                command: "git diff --check"
                id: "m2-diff"
                kind: "deterministic"
                required: true
            criteria:
              -
                check_ids:
                  - "m2-architecture"
                  - "m2-invariants"
                  - "m2-tests"
                  - "m2-types"
                  - "m2-diff"
                description: "Connect M1 taskKernel to explicit persistence and application adapters. Canonical reads never synthesize aggregates from legacy data. Typed canonical, legacy_unmigrated, malformed and archived results fail closed. Persist aggregate, events, plans and mutation receipts atomically with CAS or proven serialization, validate capabilities, reject changed-command idempotency reuse, and compare independent readback before exposing receipts. CLI/document/status, validation/evaluator, Git/workspace and provider adapters observe or project only; canonical kernel owns transitions. New canonical creation is explicit; existing legacy production remains authoritative only in declared M2 comparison mode until M3 cutover."
                id: "m2-boundaries"
                required: true
              -
                check_ids:
                  - "m2-architecture"
                  - "m2-invariants"
                  - "m2-tests"
                  - "m2-types"
                  - "m2-diff"
                description: "Implement dry-run, canary-first apply, idempotent repeat and receipt-scoped rollback through supported adapter/CLI surfaces. Preserve exact source bytes before writes. Record source/backend/repository/schema identity and all required digests/CAS/readback. TODO, DOING and BLOCKED migrate to PLANNING without invented plan, WorkItems, authority or evidence; DONE becomes read-only archive. Split required_inputs only with unambiguous typed evidence, quarantine unknown, ambiguous and malformed data. Atomically persist migration receipt and output. Rollback restores exact bytes only when output revision/digest and backup digest still match; otherwise return stable state_changed_after_migration or backup_mismatch without writes."
                id: "m2-migration"
                required: true
              -
                check_ids:
                  - "m2-architecture"
                  - "m2-invariants"
                  - "m2-tests"
                  - "m2-types"
                  - "m2-diff"
                description: "Freeze complete twelve-family corpus from the integrated M0 specification with source bytes/digests, exact implementation anchor, commands, expected events, aggregate/projection digests, effect state and next-route codes. Exercise real local storage, serialized capability mode and cloud fake, interruption, all task classes and listed crash boundaries. Compare legacy and canonical normalized read paths without effects or canonical writes. Report first mismatch and reproducible command. Require zero unexplained mismatch, canary migration, repeated migration without byte changes, exact-byte rollback and full gate checks on one implementation identity. Do not claim M3 production deletion, twenty self-hosting tasks or release drills during M2."
                id: "m2-replay"
                required: true
            evidence_fingerprint: "sha256:1a8107c0bd0bd527e216d9591d1a109811c9e2251dc643b789e6985bb965de79"
            schema_version: 1
          unresolved_questions: []
          work_items:
            schema_version: 1
            work_items:
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "m2-architecture"
                      - "m2-invariants"
                      - "m2-tests"
                      - "m2-types"
                      - "m2-diff"
                    description: "Connect M1 taskKernel to explicit persistence and application adapters. Canonical reads never synthesize aggregates from legacy data. Typed canonical, legacy_unmigrated, malformed and archived results fail closed. Persist aggregate, events, plans and mutation receipts atomically with CAS or proven serialization, validate capabilities, reject changed-command idempotency reuse, and compare independent readback before exposing receipts. CLI/document/status, validation/evaluator, Git/workspace and provider adapters observe or project only; canonical kernel owns transitions. New canonical creation is explicit; existing legacy production remains authoritative only in declared M2 comparison mode until M3 cutover."
                    id: "m2-boundaries"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 96000
                  optional_sources: []
                  required_sources:
                    - "repository"
                    - "task-document"
                  symbol_hints:
                    - "reduceTaskCommand"
                    - "TaskCentricBackendAdapter"
                    - "withTaskReadmeTransaction"
                depends_on: []
                expected_outputs:
                  - "m2-boundaries-implementation"
                id: "m2-boundaries"
                objective: "Connect M1 taskKernel to explicit persistence and application adapters. Canonical reads never synthesize aggregates from legacy data. Typed canonical, legacy_unmigrated, malformed and archived results fail closed. Persist aggregate, events, plans and mutation receipts atomically with CAS or proven serialization, validate capabilities, reject changed-command idempotency reuse, and compare independent readback before exposing receipts. CLI/document/status, validation/evaluator, Git/workspace and provider adapters observe or project only; canonical kernel owns transitions. New canonical creation is explicit; existing legacy production remains authoritative only in declared M2 comparison mode until M3 cutover."
                optional: false
                priority: 0
                required_inputs: []
                resource_claims:
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/adapters/task-backend"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/backends/task-backend"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/ports"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands/task"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli/run-cli"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/runner"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/tasks/task-kernel"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/tasks/index.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/testkit/src"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "scripts/bench"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "docs/developer"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "docs/reference/clean-task-core-rebuild-spec.mdx"
                risk: "high"
                scope_roots:
                  - "packages/agentplane/src/adapters/task-backend"
                  - "packages/agentplane/src/backends/task-backend"
                  - "packages/agentplane/src/ports"
                  - "packages/agentplane/src/commands/task"
                  - "packages/agentplane/src/cli/run-cli"
                  - "packages/agentplane/src/runner"
                  - "packages/core/src/tasks/task-kernel"
                  - "packages/core/src/tasks/index.ts"
                  - "packages/testkit/src"
                  - "scripts/bench"
                  - "docs/developer"
                  - "docs/reference/clean-task-core-rebuild-spec.mdx"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run arch:check"
                      id: "m2-architecture"
                      kind: "deterministic"
                      required: true
                    -
                      capability: "task.verify"
                      command: "bun run lifecycle:invariants"
                      id: "m2-invariants"
                      kind: "deterministic"
                      required: true
                    -
                      capability: "task.verify"
                      command: "bun run test:fast"
                      id: "m2-tests"
                      kind: "deterministic"
                      required: true
                    -
                      capability: "task.verify"
                      command: "bun run typecheck"
                      id: "m2-types"
                      kind: "deterministic"
                      required: true
                    -
                      capability: "task.verify"
                      command: "git diff --check"
                      id: "m2-diff"
                      kind: "deterministic"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "m2-architecture"
                        - "m2-invariants"
                        - "m2-tests"
                        - "m2-types"
                        - "m2-diff"
                      description: "Connect M1 taskKernel to explicit persistence and application adapters. Canonical reads never synthesize aggregates from legacy data. Typed canonical, legacy_unmigrated, malformed and archived results fail closed. Persist aggregate, events, plans and mutation receipts atomically with CAS or proven serialization, validate capabilities, reject changed-command idempotency reuse, and compare independent readback before exposing receipts. CLI/document/status, validation/evaluator, Git/workspace and provider adapters observe or project only; canonical kernel owns transitions. New canonical creation is explicit; existing legacy production remains authoritative only in declared M2 comparison mode until M3 cutover."
                      id: "m2-boundaries"
                      required: true
                  evidence_fingerprint: "sha256:1634af8127ebf4a1ba7154f01fe0157f9261858c5f79b06bdb71de73b2fe3512"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "m2-architecture"
                      - "m2-invariants"
                      - "m2-tests"
                      - "m2-types"
                      - "m2-diff"
                    description: "Implement dry-run, canary-first apply, idempotent repeat and receipt-scoped rollback through supported adapter/CLI surfaces. Preserve exact source bytes before writes. Record source/backend/repository/schema identity and all required digests/CAS/readback. TODO, DOING and BLOCKED migrate to PLANNING without invented plan, WorkItems, authority or evidence; DONE becomes read-only archive. Split required_inputs only with unambiguous typed evidence, quarantine unknown, ambiguous and malformed data. Atomically persist migration receipt and output. Rollback restores exact bytes only when output revision/digest and backup digest still match; otherwise return stable state_changed_after_migration or backup_mismatch without writes."
                    id: "m2-migration"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 96000
                  optional_sources: []
                  required_sources:
                    - "repository"
                    - "task-document"
                  symbol_hints:
                    - "reduceTaskCommand"
                    - "TaskCentricBackendAdapter"
                    - "withTaskReadmeTransaction"
                depends_on:
                  - "m2-boundaries"
                expected_outputs:
                  - "m2-migration-implementation"
                id: "m2-migration"
                objective: "Implement dry-run, canary-first apply, idempotent repeat and receipt-scoped rollback through supported adapter/CLI surfaces. Preserve exact source bytes before writes. Record source/backend/repository/schema identity and all required digests/CAS/readback. TODO, DOING and BLOCKED migrate to PLANNING without invented plan, WorkItems, authority or evidence; DONE becomes read-only archive. Split required_inputs only with unambiguous typed evidence, quarantine unknown, ambiguous and malformed data. Atomically persist migration receipt and output. Rollback restores exact bytes only when output revision/digest and backup digest still match; otherwise return stable state_changed_after_migration or backup_mismatch without writes."
                optional: false
                priority: 1
                required_inputs:
                  - "m2-boundaries-implementation"
                resource_claims:
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/adapters/task-backend"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/backends/task-backend"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/ports"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands/task"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli/run-cli"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/runner"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/tasks/task-kernel"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/tasks/index.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/testkit/src"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "scripts/bench"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "docs/developer"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "docs/reference/clean-task-core-rebuild-spec.mdx"
                risk: "high"
                scope_roots:
                  - "packages/agentplane/src/adapters/task-backend"
                  - "packages/agentplane/src/backends/task-backend"
                  - "packages/agentplane/src/ports"
                  - "packages/agentplane/src/commands/task"
                  - "packages/agentplane/src/cli/run-cli"
                  - "packages/agentplane/src/runner"
                  - "packages/core/src/tasks/task-kernel"
                  - "packages/core/src/tasks/index.ts"
                  - "packages/testkit/src"
                  - "scripts/bench"
                  - "docs/developer"
                  - "docs/reference/clean-task-core-rebuild-spec.mdx"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run arch:check"
                      id: "m2-architecture"
                      kind: "deterministic"
                      required: true
                    -
                      capability: "task.verify"
                      command: "bun run lifecycle:invariants"
                      id: "m2-invariants"
                      kind: "deterministic"
                      required: true
                    -
                      capability: "task.verify"
                      command: "bun run test:fast"
                      id: "m2-tests"
                      kind: "deterministic"
                      required: true
                    -
                      capability: "task.verify"
                      command: "bun run typecheck"
                      id: "m2-types"
                      kind: "deterministic"
                      required: true
                    -
                      capability: "task.verify"
                      command: "git diff --check"
                      id: "m2-diff"
                      kind: "deterministic"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "m2-architecture"
                        - "m2-invariants"
                        - "m2-tests"
                        - "m2-types"
                        - "m2-diff"
                      description: "Implement dry-run, canary-first apply, idempotent repeat and receipt-scoped rollback through supported adapter/CLI surfaces. Preserve exact source bytes before writes. Record source/backend/repository/schema identity and all required digests/CAS/readback. TODO, DOING and BLOCKED migrate to PLANNING without invented plan, WorkItems, authority or evidence; DONE becomes read-only archive. Split required_inputs only with unambiguous typed evidence, quarantine unknown, ambiguous and malformed data. Atomically persist migration receipt and output. Rollback restores exact bytes only when output revision/digest and backup digest still match; otherwise return stable state_changed_after_migration or backup_mismatch without writes."
                      id: "m2-migration"
                      required: true
                  evidence_fingerprint: "sha256:ec442424abe95444c0aafb75e5b4f8a7daa7b24feb12268b0294e967bb9a4af1"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "m2-architecture"
                      - "m2-invariants"
                      - "m2-tests"
                      - "m2-types"
                      - "m2-diff"
                    description: "Freeze complete twelve-family corpus from the integrated M0 specification with source bytes/digests, exact implementation anchor, commands, expected events, aggregate/projection digests, effect state and next-route codes. Exercise real local storage, serialized capability mode and cloud fake, interruption, all task classes and listed crash boundaries. Compare legacy and canonical normalized read paths without effects or canonical writes. Report first mismatch and reproducible command. Require zero unexplained mismatch, canary migration, repeated migration without byte changes, exact-byte rollback and full gate checks on one implementation identity. Do not claim M3 production deletion, twenty self-hosting tasks or release drills during M2."
                    id: "m2-replay"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 96000
                  optional_sources: []
                  required_sources:
                    - "repository"
                    - "task-document"
                  symbol_hints:
                    - "reduceTaskCommand"
                    - "TaskCentricBackendAdapter"
                    - "withTaskReadmeTransaction"
                depends_on:
                  - "m2-migration"
                expected_outputs:
                  - "m2-replay-implementation"
                id: "m2-replay"
                objective: "Freeze complete twelve-family corpus from the integrated M0 specification with source bytes/digests, exact implementation anchor, commands, expected events, aggregate/projection digests, effect state and next-route codes. Exercise real local storage, serialized capability mode and cloud fake, interruption, all task classes and listed crash boundaries. Compare legacy and canonical normalized read paths without effects or canonical writes. Report first mismatch and reproducible command. Require zero unexplained mismatch, canary migration, repeated migration without byte changes, exact-byte rollback and full gate checks on one implementation identity. Do not claim M3 production deletion, twenty self-hosting tasks or release drills during M2."
                optional: false
                priority: 2
                required_inputs:
                  - "m2-migration-implementation"
                resource_claims:
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/adapters/task-backend"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/backends/task-backend"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/ports"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands/task"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli/run-cli"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/runner"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/tasks/task-kernel"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/tasks/index.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/testkit/src"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "scripts/bench"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "docs/developer"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "docs/reference/clean-task-core-rebuild-spec.mdx"
                risk: "high"
                scope_roots:
                  - "packages/agentplane/src/adapters/task-backend"
                  - "packages/agentplane/src/backends/task-backend"
                  - "packages/agentplane/src/ports"
                  - "packages/agentplane/src/commands/task"
                  - "packages/agentplane/src/cli/run-cli"
                  - "packages/agentplane/src/runner"
                  - "packages/core/src/tasks/task-kernel"
                  - "packages/core/src/tasks/index.ts"
                  - "packages/testkit/src"
                  - "scripts/bench"
                  - "docs/developer"
                  - "docs/reference/clean-task-core-rebuild-spec.mdx"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run arch:check"
                      id: "m2-architecture"
                      kind: "deterministic"
                      required: true
                    -
                      capability: "task.verify"
                      command: "bun run lifecycle:invariants"
                      id: "m2-invariants"
                      kind: "deterministic"
                      required: true
                    -
                      capability: "task.verify"
                      command: "bun run test:fast"
                      id: "m2-tests"
                      kind: "deterministic"
                      required: true
                    -
                      capability: "task.verify"
                      command: "bun run typecheck"
                      id: "m2-types"
                      kind: "deterministic"
                      required: true
                    -
                      capability: "task.verify"
                      command: "git diff --check"
                      id: "m2-diff"
                      kind: "deterministic"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "m2-architecture"
                        - "m2-invariants"
                        - "m2-tests"
                        - "m2-types"
                        - "m2-diff"
                      description: "Freeze complete twelve-family corpus from the integrated M0 specification with source bytes/digests, exact implementation anchor, commands, expected events, aggregate/projection digests, effect state and next-route codes. Exercise real local storage, serialized capability mode and cloud fake, interruption, all task classes and listed crash boundaries. Compare legacy and canonical normalized read paths without effects or canonical writes. Report first mismatch and reproducible command. Require zero unexplained mismatch, canary migration, repeated migration without byte changes, exact-byte rollback and full gate checks on one implementation identity. Do not claim M3 production deletion, twenty self-hosting tasks or release drills during M2."
                      id: "m2-replay"
                      required: true
                  evidence_fingerprint: "sha256:7d4f3aaaf4541496cee38a9111c105ed610f3c228f3fe8f8ca0bff29a232ce07"
                  schema_version: 1
        revision: 1
        schema_version: 1
        task_id: "202608291006-2A6BJC"
      -
        approval:
          approved_at: "2026-08-30T07:30:14.840Z"
          approved_by: "USER"
          approved_digest: "sha256:450ced12ab0522ad11fbabab73b03974a1bc1cfcf6b29f5559e930904eaefa67"
          policy_facts:
            - "manual_operator"
          state: "approved"
        created_at: "2026-08-30T07:29:50.004Z"
        digest: "sha256:450ced12ab0522ad11fbabab73b03974a1bc1cfcf6b29f5559e930904eaefa67"
        proposal:
          assumptions:
            - "Use M0 specification and M1 kernel as contracts. Preserve kernel purity and typed rejection semantics."
            - "Reuse existing task README transaction and cloud CAS owners. Do not add an independently mutable duplicate canonical store."
            - "All destructive migration qualification uses isolated fixtures. User repository migration and production cutover remain explicit M3 gates. Preserve unrelated task records, worktrees, user data and separate 0.7.8 release lane."
            - "Preserve completed m2-boundaries and m2-migration results and output manifests. The replay checkpoint is not final M2 acceptance. Full CI currently fails compatibility candidate freshness and must pass before completion."
          planning_baseline:
            captured_at: "2026-08-30T07:21:57.495Z"
            config_digest: null
            context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
            digest: "sha256:52c46734bf23cb1b37258b50f17305df290065f412e3297a2aa23a6620f86ad1"
            dirty_paths:
              - ".agentplane/tasks/202608291006-2A6BJC/README.md"
              - ".agentplane/tasks/202608291006-2A6BJC/pr/github-body.md"
              - ".agentplane/tasks/202608291006-2A6BJC/pr/meta.json"
              - ".agentplane/tasks/202608291006-2A6BJC/pr/review.md"
              - ".agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json"
              - ".agentplane/tasks/202608291006-2A6BJC/supervision/implementation-evidence.json"
              - ".agentplane/tasks/202608291006-2A6BJC/verification/20260830072150527-ced68b498928174b.json"
            git:
              kind: "commit"
              ref: null
              sha: "447e42b16e053477a6e8ec77ac590269ee2e43e2"
            policy_digest: null
            schema_version: 1
            task_history_cursor: "task-revision:18"
          schema_version: 1
          task_id: "202608291006-2A6BJC"
          top_level_validation:
            checks:
              -
                capability: "task.verify"
                command: "bun run arch:check"
                id: "m2-architecture"
                kind: "deterministic"
                required: true
              -
                capability: "task.verify"
                command: "bun run lifecycle:invariants"
                id: "m2-invariants"
                kind: "deterministic"
                required: true
              -
                capability: "task.verify"
                command: "bun run test:fast"
                id: "m2-tests"
                kind: "deterministic"
                required: true
              -
                capability: "task.verify"
                command: "bun run typecheck"
                id: "m2-types"
                kind: "deterministic"
                required: true
              -
                capability: "task.verify"
                command: "git diff --check"
                id: "m2-diff"
                kind: "deterministic"
                required: true
            criteria:
              -
                check_ids:
                  - "m2-architecture"
                  - "m2-invariants"
                  - "m2-tests"
                  - "m2-types"
                  - "m2-diff"
                description: "Connect M1 taskKernel to explicit persistence and application adapters. Canonical reads never synthesize aggregates from legacy data. Typed canonical, legacy_unmigrated, malformed and archived results fail closed. Persist aggregate, events, plans and mutation receipts atomically with CAS or proven serialization, validate capabilities, reject changed-command idempotency reuse, and compare independent readback before exposing receipts. CLI/document/status, validation/evaluator, Git/workspace and provider adapters observe or project only; canonical kernel owns transitions. New canonical creation is explicit; existing legacy production remains authoritative only in declared M2 comparison mode until M3 cutover."
                id: "m2-boundaries"
                required: true
              -
                check_ids:
                  - "m2-architecture"
                  - "m2-invariants"
                  - "m2-tests"
                  - "m2-types"
                  - "m2-diff"
                description: "Implement dry-run, canary-first apply, idempotent repeat and receipt-scoped rollback through supported adapter/CLI surfaces. Preserve exact source bytes before writes. Record source/backend/repository/schema identity and all required digests/CAS/readback. TODO, DOING and BLOCKED migrate to PLANNING without invented plan, WorkItems, authority or evidence; DONE becomes read-only archive. Split required_inputs only with unambiguous typed evidence, quarantine unknown, ambiguous and malformed data. Atomically persist migration receipt and output. Rollback restores exact bytes only when output revision/digest and backup digest still match; otherwise return stable state_changed_after_migration or backup_mismatch without writes."
                id: "m2-migration"
                required: true
              -
                check_ids:
                  - "m2-architecture"
                  - "m2-invariants"
                  - "m2-tests"
                  - "m2-types"
                  - "m2-diff"
                description: "Qualify the committed replay engine checkpoint at 447e42b16e053477a6e8ec77ac590269ee2e43e2. Preserve frozen kernel, migration and evidence vectors. Prove resource-claim rejection, local and cloud CAS persistence, interrupted write readback, exact-byte migration and rollback. Repair exact-anchor dependency isolation and expose suite-level failures. Update only the reviewed compatibility candidate for the added migration CLI; keep the immutable baseline unchanged. The final twelve-family qualification remains mandatory in m2-replay-qualification."
                id: "m2-replay"
                required: true
              -
                check_ids:
                  - "m2-architecture"
                  - "m2-invariants"
                  - "m2-tests"
                  - "m2-types"
                  - "m2-diff"
                description: "Freeze complete twelve-family corpus from the integrated M0 specification with source bytes/digests, exact implementation anchor, commands, expected events, aggregate/projection digests, effect state and next-route codes. Exercise real local storage, serialized capability mode and cloud fake, interruption, all task classes and listed crash boundaries. Compare legacy and canonical normalized read paths without effects or canonical writes. Report first mismatch and reproducible command. Require zero unexplained mismatch, canary migration, repeated migration without byte changes, exact-byte rollback and full gate checks on one implementation identity. Do not claim M3 production deletion, twenty self-hosting tasks or release drills during M2. Produce an explicit coverage and qualification report. Reject zero-test runs, suite import failures, live workspace source leakage and unanchored transitive harness code. Preserve all M0 gates and report actual normalized legacy/canonical read comparison and actual next-action reason codes."
                id: "m2-replay-qualification"
                required: true
            evidence_fingerprint: "sha256:65a5519f36313e84db86d915c9be805f090d7c0c4fbe1a243e66a05ab9a3ca68"
            schema_version: 1
          unresolved_questions: []
          work_items:
            schema_version: 1
            work_items:
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "m2-architecture"
                      - "m2-invariants"
                      - "m2-tests"
                      - "m2-types"
                      - "m2-diff"
                    description: "Connect M1 taskKernel to explicit persistence and application adapters. Canonical reads never synthesize aggregates from legacy data. Typed canonical, legacy_unmigrated, malformed and archived results fail closed. Persist aggregate, events, plans and mutation receipts atomically with CAS or proven serialization, validate capabilities, reject changed-command idempotency reuse, and compare independent readback before exposing receipts. CLI/document/status, validation/evaluator, Git/workspace and provider adapters observe or project only; canonical kernel owns transitions. New canonical creation is explicit; existing legacy production remains authoritative only in declared M2 comparison mode until M3 cutover."
                    id: "m2-boundaries"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 96000
                  optional_sources: []
                  required_sources:
                    - "repository"
                    - "task-document"
                  symbol_hints:
                    - "reduceTaskCommand"
                    - "TaskCentricBackendAdapter"
                    - "withTaskReadmeTransaction"
                depends_on: []
                expected_outputs:
                  - "m2-boundaries-implementation"
                id: "m2-boundaries"
                objective: "Connect M1 taskKernel to explicit persistence and application adapters. Canonical reads never synthesize aggregates from legacy data. Typed canonical, legacy_unmigrated, malformed and archived results fail closed. Persist aggregate, events, plans and mutation receipts atomically with CAS or proven serialization, validate capabilities, reject changed-command idempotency reuse, and compare independent readback before exposing receipts. CLI/document/status, validation/evaluator, Git/workspace and provider adapters observe or project only; canonical kernel owns transitions. New canonical creation is explicit; existing legacy production remains authoritative only in declared M2 comparison mode until M3 cutover."
                optional: false
                priority: 0
                required_inputs: []
                resource_claims:
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/adapters/task-backend"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/backends/task-backend"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/ports"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands/task"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli/run-cli"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/runner"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/tasks/task-kernel"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/tasks/index.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/testkit/src"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "scripts/bench"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "docs/developer"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "docs/reference/clean-task-core-rebuild-spec.mdx"
                risk: "high"
                scope_roots:
                  - "packages/agentplane/src/adapters/task-backend"
                  - "packages/agentplane/src/backends/task-backend"
                  - "packages/agentplane/src/ports"
                  - "packages/agentplane/src/commands/task"
                  - "packages/agentplane/src/cli/run-cli"
                  - "packages/agentplane/src/runner"
                  - "packages/core/src/tasks/task-kernel"
                  - "packages/core/src/tasks/index.ts"
                  - "packages/testkit/src"
                  - "scripts/bench"
                  - "docs/developer"
                  - "docs/reference/clean-task-core-rebuild-spec.mdx"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run arch:check"
                      id: "m2-architecture"
                      kind: "deterministic"
                      required: true
                    -
                      capability: "task.verify"
                      command: "bun run lifecycle:invariants"
                      id: "m2-invariants"
                      kind: "deterministic"
                      required: true
                    -
                      capability: "task.verify"
                      command: "bun run test:fast"
                      id: "m2-tests"
                      kind: "deterministic"
                      required: true
                    -
                      capability: "task.verify"
                      command: "bun run typecheck"
                      id: "m2-types"
                      kind: "deterministic"
                      required: true
                    -
                      capability: "task.verify"
                      command: "git diff --check"
                      id: "m2-diff"
                      kind: "deterministic"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "m2-architecture"
                        - "m2-invariants"
                        - "m2-tests"
                        - "m2-types"
                        - "m2-diff"
                      description: "Connect M1 taskKernel to explicit persistence and application adapters. Canonical reads never synthesize aggregates from legacy data. Typed canonical, legacy_unmigrated, malformed and archived results fail closed. Persist aggregate, events, plans and mutation receipts atomically with CAS or proven serialization, validate capabilities, reject changed-command idempotency reuse, and compare independent readback before exposing receipts. CLI/document/status, validation/evaluator, Git/workspace and provider adapters observe or project only; canonical kernel owns transitions. New canonical creation is explicit; existing legacy production remains authoritative only in declared M2 comparison mode until M3 cutover."
                      id: "m2-boundaries"
                      required: true
                  evidence_fingerprint: "sha256:1634af8127ebf4a1ba7154f01fe0157f9261858c5f79b06bdb71de73b2fe3512"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "m2-architecture"
                      - "m2-invariants"
                      - "m2-tests"
                      - "m2-types"
                      - "m2-diff"
                    description: "Implement dry-run, canary-first apply, idempotent repeat and receipt-scoped rollback through supported adapter/CLI surfaces. Preserve exact source bytes before writes. Record source/backend/repository/schema identity and all required digests/CAS/readback. TODO, DOING and BLOCKED migrate to PLANNING without invented plan, WorkItems, authority or evidence; DONE becomes read-only archive. Split required_inputs only with unambiguous typed evidence, quarantine unknown, ambiguous and malformed data. Atomically persist migration receipt and output. Rollback restores exact bytes only when output revision/digest and backup digest still match; otherwise return stable state_changed_after_migration or backup_mismatch without writes."
                    id: "m2-migration"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 96000
                  optional_sources: []
                  required_sources:
                    - "repository"
                    - "task-document"
                  symbol_hints:
                    - "reduceTaskCommand"
                    - "TaskCentricBackendAdapter"
                    - "withTaskReadmeTransaction"
                depends_on:
                  - "m2-boundaries"
                expected_outputs:
                  - "m2-migration-implementation"
                id: "m2-migration"
                objective: "Implement dry-run, canary-first apply, idempotent repeat and receipt-scoped rollback through supported adapter/CLI surfaces. Preserve exact source bytes before writes. Record source/backend/repository/schema identity and all required digests/CAS/readback. TODO, DOING and BLOCKED migrate to PLANNING without invented plan, WorkItems, authority or evidence; DONE becomes read-only archive. Split required_inputs only with unambiguous typed evidence, quarantine unknown, ambiguous and malformed data. Atomically persist migration receipt and output. Rollback restores exact bytes only when output revision/digest and backup digest still match; otherwise return stable state_changed_after_migration or backup_mismatch without writes."
                optional: false
                priority: 1
                required_inputs:
                  - "m2-boundaries-implementation"
                resource_claims:
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/adapters/task-backend"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/backends/task-backend"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/ports"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands/task"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli/run-cli"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/runner"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/tasks/task-kernel"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/tasks/index.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/testkit/src"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "scripts/bench"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "docs/developer"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "docs/reference/clean-task-core-rebuild-spec.mdx"
                risk: "high"
                scope_roots:
                  - "packages/agentplane/src/adapters/task-backend"
                  - "packages/agentplane/src/backends/task-backend"
                  - "packages/agentplane/src/ports"
                  - "packages/agentplane/src/commands/task"
                  - "packages/agentplane/src/cli/run-cli"
                  - "packages/agentplane/src/runner"
                  - "packages/core/src/tasks/task-kernel"
                  - "packages/core/src/tasks/index.ts"
                  - "packages/testkit/src"
                  - "scripts/bench"
                  - "docs/developer"
                  - "docs/reference/clean-task-core-rebuild-spec.mdx"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run arch:check"
                      id: "m2-architecture"
                      kind: "deterministic"
                      required: true
                    -
                      capability: "task.verify"
                      command: "bun run lifecycle:invariants"
                      id: "m2-invariants"
                      kind: "deterministic"
                      required: true
                    -
                      capability: "task.verify"
                      command: "bun run test:fast"
                      id: "m2-tests"
                      kind: "deterministic"
                      required: true
                    -
                      capability: "task.verify"
                      command: "bun run typecheck"
                      id: "m2-types"
                      kind: "deterministic"
                      required: true
                    -
                      capability: "task.verify"
                      command: "git diff --check"
                      id: "m2-diff"
                      kind: "deterministic"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "m2-architecture"
                        - "m2-invariants"
                        - "m2-tests"
                        - "m2-types"
                        - "m2-diff"
                      description: "Implement dry-run, canary-first apply, idempotent repeat and receipt-scoped rollback through supported adapter/CLI surfaces. Preserve exact source bytes before writes. Record source/backend/repository/schema identity and all required digests/CAS/readback. TODO, DOING and BLOCKED migrate to PLANNING without invented plan, WorkItems, authority or evidence; DONE becomes read-only archive. Split required_inputs only with unambiguous typed evidence, quarantine unknown, ambiguous and malformed data. Atomically persist migration receipt and output. Rollback restores exact bytes only when output revision/digest and backup digest still match; otherwise return stable state_changed_after_migration or backup_mismatch without writes."
                      id: "m2-migration"
                      required: true
                  evidence_fingerprint: "sha256:ec442424abe95444c0aafb75e5b4f8a7daa7b24feb12268b0294e967bb9a4af1"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "m2-architecture"
                      - "m2-invariants"
                      - "m2-tests"
                      - "m2-types"
                      - "m2-diff"
                    description: "Qualify the committed replay engine checkpoint at 447e42b16e053477a6e8ec77ac590269ee2e43e2. Preserve frozen kernel, migration and evidence vectors. Prove resource-claim rejection, local and cloud CAS persistence, interrupted write readback, exact-byte migration and rollback. Repair exact-anchor dependency isolation and expose suite-level failures. Update only the reviewed compatibility candidate for the added migration CLI; keep the immutable baseline unchanged. The final twelve-family qualification remains mandatory in m2-replay-qualification."
                    id: "m2-replay"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 96000
                  optional_sources: []
                  required_sources:
                    - "repository"
                    - "task-document"
                  symbol_hints:
                    - "reduceTaskCommand"
                    - "TaskCentricBackendAdapter"
                    - "withTaskReadmeTransaction"
                depends_on:
                  - "m2-migration"
                expected_outputs:
                  - "m2-replay-implementation"
                id: "m2-replay"
                objective: "Qualify the committed replay engine checkpoint at 447e42b16e053477a6e8ec77ac590269ee2e43e2. Preserve frozen kernel, migration and evidence vectors. Prove resource-claim rejection, local and cloud CAS persistence, interrupted write readback, exact-byte migration and rollback. Repair exact-anchor dependency isolation and expose suite-level failures. Update only the reviewed compatibility candidate for the added migration CLI; keep the immutable baseline unchanged. The final twelve-family qualification remains mandatory in m2-replay-qualification."
                optional: false
                priority: 2
                required_inputs:
                  - "m2-migration-implementation"
                resource_claims:
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/adapters/task-backend"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/backends/task-backend"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/ports"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands/task"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli/run-cli"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/runner"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/tasks/task-kernel"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/tasks/index.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/testkit/src"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "scripts/bench"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "docs/developer"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "docs/reference/clean-task-core-rebuild-spec.mdx"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "scripts/baselines/v0.7-compatibility-candidate.json"
                risk: "high"
                scope_roots:
                  - "packages/agentplane/src/adapters/task-backend"
                  - "packages/agentplane/src/backends/task-backend"
                  - "packages/agentplane/src/ports"
                  - "packages/agentplane/src/commands/task"
                  - "packages/agentplane/src/cli/run-cli"
                  - "packages/agentplane/src/runner"
                  - "packages/core/src/tasks/task-kernel"
                  - "packages/core/src/tasks/index.ts"
                  - "packages/testkit/src"
                  - "scripts/bench"
                  - "docs/developer"
                  - "docs/reference/clean-task-core-rebuild-spec.mdx"
                  - "scripts/baselines/v0.7-compatibility-candidate.json"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run arch:check"
                      id: "m2-architecture"
                      kind: "deterministic"
                      required: true
                    -
                      capability: "task.verify"
                      command: "bun run lifecycle:invariants"
                      id: "m2-invariants"
                      kind: "deterministic"
                      required: true
                    -
                      capability: "task.verify"
                      command: "bun run test:fast"
                      id: "m2-tests"
                      kind: "deterministic"
                      required: true
                    -
                      capability: "task.verify"
                      command: "bun run typecheck"
                      id: "m2-types"
                      kind: "deterministic"
                      required: true
                    -
                      capability: "task.verify"
                      command: "git diff --check"
                      id: "m2-diff"
                      kind: "deterministic"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "m2-architecture"
                        - "m2-invariants"
                        - "m2-tests"
                        - "m2-types"
                        - "m2-diff"
                      description: "Qualify the committed replay engine checkpoint at 447e42b16e053477a6e8ec77ac590269ee2e43e2. Preserve frozen kernel, migration and evidence vectors. Prove resource-claim rejection, local and cloud CAS persistence, interrupted write readback, exact-byte migration and rollback. Repair exact-anchor dependency isolation and expose suite-level failures. Update only the reviewed compatibility candidate for the added migration CLI; keep the immutable baseline unchanged. The final twelve-family qualification remains mandatory in m2-replay-qualification."
                      id: "m2-replay"
                      required: true
                  evidence_fingerprint: "sha256:1d1658d2ac8757b0867c97b12229d8145a6915b4103a2b239d67dc6f8a7b5d80"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "m2-architecture"
                      - "m2-invariants"
                      - "m2-tests"
                      - "m2-types"
                      - "m2-diff"
                    description: "Freeze complete twelve-family corpus from the integrated M0 specification with source bytes/digests, exact implementation anchor, commands, expected events, aggregate/projection digests, effect state and next-route codes. Exercise real local storage, serialized capability mode and cloud fake, interruption, all task classes and listed crash boundaries. Compare legacy and canonical normalized read paths without effects or canonical writes. Report first mismatch and reproducible command. Require zero unexplained mismatch, canary migration, repeated migration without byte changes, exact-byte rollback and full gate checks on one implementation identity. Do not claim M3 production deletion, twenty self-hosting tasks or release drills during M2. Produce an explicit coverage and qualification report. Reject zero-test runs, suite import failures, live workspace source leakage and unanchored transitive harness code. Preserve all M0 gates and report actual normalized legacy/canonical read comparison and actual next-action reason codes."
                    id: "m2-replay-qualification"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 96000
                  optional_sources: []
                  required_sources:
                    - "repository"
                    - "task-document"
                  symbol_hints:
                    - "reduceTaskCommand"
                    - "TaskCentricBackendAdapter"
                    - "withTaskReadmeTransaction"
                depends_on:
                  - "m2-replay"
                expected_outputs:
                  - "m2-replay-qualification-report"
                id: "m2-replay-qualification"
                objective: "Freeze complete twelve-family corpus from the integrated M0 specification with source bytes/digests, exact implementation anchor, commands, expected events, aggregate/projection digests, effect state and next-route codes. Exercise real local storage, serialized capability mode and cloud fake, interruption, all task classes and listed crash boundaries. Compare legacy and canonical normalized read paths without effects or canonical writes. Report first mismatch and reproducible command. Require zero unexplained mismatch, canary migration, repeated migration without byte changes, exact-byte rollback and full gate checks on one implementation identity. Do not claim M3 production deletion, twenty self-hosting tasks or release drills during M2. Produce an explicit coverage and qualification report. Reject zero-test runs, suite import failures, live workspace source leakage and unanchored transitive harness code. Preserve all M0 gates and report actual normalized legacy/canonical read comparison and actual next-action reason codes."
                optional: false
                priority: 3
                required_inputs:
                  - "m2-replay-implementation"
                resource_claims:
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/adapters/task-backend"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/backends/task-backend"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/ports"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands/task"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli/run-cli"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/runner"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/tasks/task-kernel"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/tasks/index.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/testkit/src"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "scripts/bench"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "docs/developer"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "docs/reference/clean-task-core-rebuild-spec.mdx"
                risk: "high"
                scope_roots:
                  - "packages/agentplane/src/adapters/task-backend"
                  - "packages/agentplane/src/backends/task-backend"
                  - "packages/agentplane/src/ports"
                  - "packages/agentplane/src/commands/task"
                  - "packages/agentplane/src/cli/run-cli"
                  - "packages/agentplane/src/runner"
                  - "packages/core/src/tasks/task-kernel"
                  - "packages/core/src/tasks/index.ts"
                  - "packages/testkit/src"
                  - "scripts/bench"
                  - "docs/developer"
                  - "docs/reference/clean-task-core-rebuild-spec.mdx"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run arch:check"
                      id: "m2-architecture"
                      kind: "deterministic"
                      required: true
                    -
                      capability: "task.verify"
                      command: "bun run lifecycle:invariants"
                      id: "m2-invariants"
                      kind: "deterministic"
                      required: true
                    -
                      capability: "task.verify"
                      command: "bun run test:fast"
                      id: "m2-tests"
                      kind: "deterministic"
                      required: true
                    -
                      capability: "task.verify"
                      command: "bun run typecheck"
                      id: "m2-types"
                      kind: "deterministic"
                      required: true
                    -
                      capability: "task.verify"
                      command: "git diff --check"
                      id: "m2-diff"
                      kind: "deterministic"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "m2-architecture"
                        - "m2-invariants"
                        - "m2-tests"
                        - "m2-types"
                        - "m2-diff"
                      description: "Freeze complete twelve-family corpus from the integrated M0 specification with source bytes/digests, exact implementation anchor, commands, expected events, aggregate/projection digests, effect state and next-route codes. Exercise real local storage, serialized capability mode and cloud fake, interruption, all task classes and listed crash boundaries. Compare legacy and canonical normalized read paths without effects or canonical writes. Report first mismatch and reproducible command. Require zero unexplained mismatch, canary migration, repeated migration without byte changes, exact-byte rollback and full gate checks on one implementation identity. Do not claim M3 production deletion, twenty self-hosting tasks or release drills during M2. Produce an explicit coverage and qualification report. Reject zero-test runs, suite import failures, live workspace source leakage and unanchored transitive harness code. Preserve all M0 gates and report actual normalized legacy/canonical read comparison and actual next-action reason codes."
                      id: "m2-replay-qualification"
                      required: true
                  evidence_fingerprint: "sha256:d7b566c238c13b69663d76489aa64bb4fff4d40ac33c147524b56696d743f273"
                  schema_version: 1
        revision: 2
        schema_version: 1
        task_id: "202608291006-2A6BJC"
      -
        approval:
          approved_at: "2026-08-30T07:52:14.256Z"
          approved_by: "USER"
          approved_digest: "sha256:b44896158ad36a135b4f26fab0d6ad30abf78efcf952d61fc6aaf5a12c44e954"
          policy_facts:
            - "manual_operator"
          state: "approved"
        created_at: "2026-08-30T07:52:00.070Z"
        digest: "sha256:b44896158ad36a135b4f26fab0d6ad30abf78efcf952d61fc6aaf5a12c44e954"
        proposal:
          assumptions:
            - "Use M0 specification and M1 kernel as contracts. Preserve kernel purity and typed rejection semantics."
            - "Reuse existing task README transaction and cloud CAS owners. Do not add an independently mutable duplicate canonical store."
            - "All destructive migration qualification uses isolated fixtures. User repository migration and production cutover remain explicit M3 gates. Preserve unrelated task records, worktrees, user data and separate 0.7.8 release lane."
            - "Preserve completed m2-boundaries and m2-migration results and output manifests. The replay checkpoint is not final M2 acceptance. Full CI currently fails compatibility candidate freshness and must pass before completion."
            - "Predecessor qualification may update the reviewed compatibility candidate, its exact CLI descriptor and source-provenance allowlist, and the existing critical composition test. Add only the migration command delta. Preserve the immutable 0.6.24 baseline and strict rejection of unlisted changes."
          planning_baseline:
            captured_at: "2026-08-30T07:51:22.917Z"
            config_digest: null
            context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
            digest: "sha256:5d5f25330ad5053a6dd459bc52616cc50680d1dcccaae247efd6ca657ab0f2a2"
            dirty_paths:
              - ".agentplane/tasks/202608291006-2A6BJC/README.md"
              - ".agentplane/tasks/202608291006-2A6BJC/pr/github-body.md"
              - ".agentplane/tasks/202608291006-2A6BJC/pr/meta.json"
              - ".agentplane/tasks/202608291006-2A6BJC/pr/review.md"
              - ".agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json"
              - ".agentplane/tasks/202608291006-2A6BJC/supervision/implementation-evidence.json"
              - ".agentplane/tasks/202608291006-2A6BJC/verification/20260830075116632-19aedf754eb84cd1.json"
            git:
              kind: "commit"
              ref: null
              sha: "2b964f7cbfc47b64d8ba8345211d806c59b6337c"
            policy_digest: null
            schema_version: 1
            task_history_cursor: "task-revision:30"
          schema_version: 1
          task_id: "202608291006-2A6BJC"
          top_level_validation:
            checks:
              -
                capability: "task.verify"
                command: "bun run arch:check"
                id: "m2-architecture"
                kind: "deterministic"
                required: true
              -
                capability: "task.verify"
                command: "bun run lifecycle:invariants"
                id: "m2-invariants"
                kind: "deterministic"
                required: true
              -
                capability: "task.verify"
                command: "bun run test:fast"
                id: "m2-tests"
                kind: "deterministic"
                required: true
              -
                capability: "task.verify"
                command: "bun run typecheck"
                id: "m2-types"
                kind: "deterministic"
                required: true
              -
                capability: "task.verify"
                command: "git diff --check"
                id: "m2-diff"
                kind: "deterministic"
                required: true
            criteria:
              -
                check_ids:
                  - "m2-architecture"
                  - "m2-invariants"
                  - "m2-tests"
                  - "m2-types"
                  - "m2-diff"
                description: "Connect M1 taskKernel to explicit persistence and application adapters. Canonical reads never synthesize aggregates from legacy data. Typed canonical, legacy_unmigrated, malformed and archived results fail closed. Persist aggregate, events, plans and mutation receipts atomically with CAS or proven serialization, validate capabilities, reject changed-command idempotency reuse, and compare independent readback before exposing receipts. CLI/document/status, validation/evaluator, Git/workspace and provider adapters observe or project only; canonical kernel owns transitions. New canonical creation is explicit; existing legacy production remains authoritative only in declared M2 comparison mode until M3 cutover."
                id: "m2-boundaries"
                required: true
              -
                check_ids:
                  - "m2-architecture"
                  - "m2-invariants"
                  - "m2-tests"
                  - "m2-types"
                  - "m2-diff"
                description: "Implement dry-run, canary-first apply, idempotent repeat and receipt-scoped rollback through supported adapter/CLI surfaces. Preserve exact source bytes before writes. Record source/backend/repository/schema identity and all required digests/CAS/readback. TODO, DOING and BLOCKED migrate to PLANNING without invented plan, WorkItems, authority or evidence; DONE becomes read-only archive. Split required_inputs only with unambiguous typed evidence, quarantine unknown, ambiguous and malformed data. Atomically persist migration receipt and output. Rollback restores exact bytes only when output revision/digest and backup digest still match; otherwise return stable state_changed_after_migration or backup_mismatch without writes."
                id: "m2-migration"
                required: true
              -
                check_ids:
                  - "m2-architecture"
                  - "m2-invariants"
                  - "m2-tests"
                  - "m2-types"
                  - "m2-diff"
                description: "Qualify the committed replay engine checkpoint at 447e42b16e053477a6e8ec77ac590269ee2e43e2. Preserve frozen kernel, migration and evidence vectors. Prove resource-claim rejection, local and cloud CAS persistence, interrupted write readback, exact-byte migration and rollback. Repair exact-anchor dependency isolation and expose suite-level failures. Update only the reviewed compatibility candidate for the added migration CLI; keep the immutable baseline unchanged. The final twelve-family qualification remains mandatory in m2-replay-qualification."
                id: "m2-replay"
                required: true
              -
                check_ids:
                  - "m2-architecture"
                  - "m2-invariants"
                  - "m2-tests"
                  - "m2-types"
                  - "m2-diff"
                description: "Freeze complete twelve-family corpus from the integrated M0 specification with source bytes/digests, exact implementation anchor, commands, expected events, aggregate/projection digests, effect state and next-route codes. Exercise real local storage, serialized capability mode and cloud fake, interruption, all task classes and listed crash boundaries. Compare legacy and canonical normalized read paths without effects or canonical writes. Report first mismatch and reproducible command. Require zero unexplained mismatch, canary migration, repeated migration without byte changes, exact-byte rollback and full gate checks on one implementation identity. Do not claim M3 production deletion, twenty self-hosting tasks or release drills during M2. Produce an explicit coverage and qualification report. Reject zero-test runs, suite import failures, live workspace source leakage and unanchored transitive harness code. Preserve all M0 gates and report actual normalized legacy/canonical read comparison and actual next-action reason codes."
                id: "m2-replay-qualification"
                required: true
            evidence_fingerprint: "sha256:65a5519f36313e84db86d915c9be805f090d7c0c4fbe1a243e66a05ab9a3ca68"
            schema_version: 1
          unresolved_questions: []
          work_items:
            schema_version: 1
            work_items:
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "m2-architecture"
                      - "m2-invariants"
                      - "m2-tests"
                      - "m2-types"
                      - "m2-diff"
                    description: "Connect M1 taskKernel to explicit persistence and application adapters. Canonical reads never synthesize aggregates from legacy data. Typed canonical, legacy_unmigrated, malformed and archived results fail closed. Persist aggregate, events, plans and mutation receipts atomically with CAS or proven serialization, validate capabilities, reject changed-command idempotency reuse, and compare independent readback before exposing receipts. CLI/document/status, validation/evaluator, Git/workspace and provider adapters observe or project only; canonical kernel owns transitions. New canonical creation is explicit; existing legacy production remains authoritative only in declared M2 comparison mode until M3 cutover."
                    id: "m2-boundaries"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 96000
                  optional_sources: []
                  required_sources:
                    - "repository"
                    - "task-document"
                  symbol_hints:
                    - "reduceTaskCommand"
                    - "TaskCentricBackendAdapter"
                    - "withTaskReadmeTransaction"
                depends_on: []
                expected_outputs:
                  - "m2-boundaries-implementation"
                id: "m2-boundaries"
                objective: "Connect M1 taskKernel to explicit persistence and application adapters. Canonical reads never synthesize aggregates from legacy data. Typed canonical, legacy_unmigrated, malformed and archived results fail closed. Persist aggregate, events, plans and mutation receipts atomically with CAS or proven serialization, validate capabilities, reject changed-command idempotency reuse, and compare independent readback before exposing receipts. CLI/document/status, validation/evaluator, Git/workspace and provider adapters observe or project only; canonical kernel owns transitions. New canonical creation is explicit; existing legacy production remains authoritative only in declared M2 comparison mode until M3 cutover."
                optional: false
                priority: 0
                required_inputs: []
                resource_claims:
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/adapters/task-backend"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/backends/task-backend"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/ports"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands/task"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli/run-cli"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/runner"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/tasks/task-kernel"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/tasks/index.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/testkit/src"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "scripts/bench"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "docs/developer"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "docs/reference/clean-task-core-rebuild-spec.mdx"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "scripts/baselines/v0.7-compatibility-candidate.json"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "scripts/checks/check-compatibility-contract-baseline.mjs"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli/run-cli.critical.agent-efficiency-baseline.test.ts"
                risk: "high"
                scope_roots:
                  - "packages/agentplane/src/adapters/task-backend"
                  - "packages/agentplane/src/backends/task-backend"
                  - "packages/agentplane/src/ports"
                  - "packages/agentplane/src/commands/task"
                  - "packages/agentplane/src/cli/run-cli"
                  - "packages/agentplane/src/runner"
                  - "packages/core/src/tasks/task-kernel"
                  - "packages/core/src/tasks/index.ts"
                  - "packages/testkit/src"
                  - "scripts/bench"
                  - "docs/developer"
                  - "docs/reference/clean-task-core-rebuild-spec.mdx"
                  - "scripts/baselines/v0.7-compatibility-candidate.json"
                  - "scripts/checks/check-compatibility-contract-baseline.mjs"
                  - "packages/agentplane/src/cli/run-cli.critical.agent-efficiency-baseline.test.ts"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run arch:check"
                      id: "m2-architecture"
                      kind: "deterministic"
                      required: true
                    -
                      capability: "task.verify"
                      command: "bun run lifecycle:invariants"
                      id: "m2-invariants"
                      kind: "deterministic"
                      required: true
                    -
                      capability: "task.verify"
                      command: "bun run test:fast"
                      id: "m2-tests"
                      kind: "deterministic"
                      required: true
                    -
                      capability: "task.verify"
                      command: "bun run typecheck"
                      id: "m2-types"
                      kind: "deterministic"
                      required: true
                    -
                      capability: "task.verify"
                      command: "git diff --check"
                      id: "m2-diff"
                      kind: "deterministic"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "m2-architecture"
                        - "m2-invariants"
                        - "m2-tests"
                        - "m2-types"
                        - "m2-diff"
                      description: "Connect M1 taskKernel to explicit persistence and application adapters. Canonical reads never synthesize aggregates from legacy data. Typed canonical, legacy_unmigrated, malformed and archived results fail closed. Persist aggregate, events, plans and mutation receipts atomically with CAS or proven serialization, validate capabilities, reject changed-command idempotency reuse, and compare independent readback before exposing receipts. CLI/document/status, validation/evaluator, Git/workspace and provider adapters observe or project only; canonical kernel owns transitions. New canonical creation is explicit; existing legacy production remains authoritative only in declared M2 comparison mode until M3 cutover."
                      id: "m2-boundaries"
                      required: true
                  evidence_fingerprint: "sha256:1634af8127ebf4a1ba7154f01fe0157f9261858c5f79b06bdb71de73b2fe3512"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "m2-architecture"
                      - "m2-invariants"
                      - "m2-tests"
                      - "m2-types"
                      - "m2-diff"
                    description: "Implement dry-run, canary-first apply, idempotent repeat and receipt-scoped rollback through supported adapter/CLI surfaces. Preserve exact source bytes before writes. Record source/backend/repository/schema identity and all required digests/CAS/readback. TODO, DOING and BLOCKED migrate to PLANNING without invented plan, WorkItems, authority or evidence; DONE becomes read-only archive. Split required_inputs only with unambiguous typed evidence, quarantine unknown, ambiguous and malformed data. Atomically persist migration receipt and output. Rollback restores exact bytes only when output revision/digest and backup digest still match; otherwise return stable state_changed_after_migration or backup_mismatch without writes."
                    id: "m2-migration"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 96000
                  optional_sources: []
                  required_sources:
                    - "repository"
                    - "task-document"
                  symbol_hints:
                    - "reduceTaskCommand"
                    - "TaskCentricBackendAdapter"
                    - "withTaskReadmeTransaction"
                depends_on:
                  - "m2-boundaries"
                expected_outputs:
                  - "m2-migration-implementation"
                id: "m2-migration"
                objective: "Implement dry-run, canary-first apply, idempotent repeat and receipt-scoped rollback through supported adapter/CLI surfaces. Preserve exact source bytes before writes. Record source/backend/repository/schema identity and all required digests/CAS/readback. TODO, DOING and BLOCKED migrate to PLANNING without invented plan, WorkItems, authority or evidence; DONE becomes read-only archive. Split required_inputs only with unambiguous typed evidence, quarantine unknown, ambiguous and malformed data. Atomically persist migration receipt and output. Rollback restores exact bytes only when output revision/digest and backup digest still match; otherwise return stable state_changed_after_migration or backup_mismatch without writes."
                optional: false
                priority: 1
                required_inputs:
                  - "m2-boundaries-implementation"
                resource_claims:
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/adapters/task-backend"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/backends/task-backend"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/ports"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands/task"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli/run-cli"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/runner"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/tasks/task-kernel"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/tasks/index.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/testkit/src"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "scripts/bench"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "docs/developer"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "docs/reference/clean-task-core-rebuild-spec.mdx"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "scripts/baselines/v0.7-compatibility-candidate.json"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "scripts/checks/check-compatibility-contract-baseline.mjs"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli/run-cli.critical.agent-efficiency-baseline.test.ts"
                risk: "high"
                scope_roots:
                  - "packages/agentplane/src/adapters/task-backend"
                  - "packages/agentplane/src/backends/task-backend"
                  - "packages/agentplane/src/ports"
                  - "packages/agentplane/src/commands/task"
                  - "packages/agentplane/src/cli/run-cli"
                  - "packages/agentplane/src/runner"
                  - "packages/core/src/tasks/task-kernel"
                  - "packages/core/src/tasks/index.ts"
                  - "packages/testkit/src"
                  - "scripts/bench"
                  - "docs/developer"
                  - "docs/reference/clean-task-core-rebuild-spec.mdx"
                  - "scripts/baselines/v0.7-compatibility-candidate.json"
                  - "scripts/checks/check-compatibility-contract-baseline.mjs"
                  - "packages/agentplane/src/cli/run-cli.critical.agent-efficiency-baseline.test.ts"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run arch:check"
                      id: "m2-architecture"
                      kind: "deterministic"
                      required: true
                    -
                      capability: "task.verify"
                      command: "bun run lifecycle:invariants"
                      id: "m2-invariants"
                      kind: "deterministic"
                      required: true
                    -
                      capability: "task.verify"
                      command: "bun run test:fast"
                      id: "m2-tests"
                      kind: "deterministic"
                      required: true
                    -
                      capability: "task.verify"
                      command: "bun run typecheck"
                      id: "m2-types"
                      kind: "deterministic"
                      required: true
                    -
                      capability: "task.verify"
                      command: "git diff --check"
                      id: "m2-diff"
                      kind: "deterministic"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "m2-architecture"
                        - "m2-invariants"
                        - "m2-tests"
                        - "m2-types"
                        - "m2-diff"
                      description: "Implement dry-run, canary-first apply, idempotent repeat and receipt-scoped rollback through supported adapter/CLI surfaces. Preserve exact source bytes before writes. Record source/backend/repository/schema identity and all required digests/CAS/readback. TODO, DOING and BLOCKED migrate to PLANNING without invented plan, WorkItems, authority or evidence; DONE becomes read-only archive. Split required_inputs only with unambiguous typed evidence, quarantine unknown, ambiguous and malformed data. Atomically persist migration receipt and output. Rollback restores exact bytes only when output revision/digest and backup digest still match; otherwise return stable state_changed_after_migration or backup_mismatch without writes."
                      id: "m2-migration"
                      required: true
                  evidence_fingerprint: "sha256:ec442424abe95444c0aafb75e5b4f8a7daa7b24feb12268b0294e967bb9a4af1"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "m2-architecture"
                      - "m2-invariants"
                      - "m2-tests"
                      - "m2-types"
                      - "m2-diff"
                    description: "Qualify the committed replay engine checkpoint at 447e42b16e053477a6e8ec77ac590269ee2e43e2. Preserve frozen kernel, migration and evidence vectors. Prove resource-claim rejection, local and cloud CAS persistence, interrupted write readback, exact-byte migration and rollback. Repair exact-anchor dependency isolation and expose suite-level failures. Update only the reviewed compatibility candidate for the added migration CLI; keep the immutable baseline unchanged. The final twelve-family qualification remains mandatory in m2-replay-qualification."
                    id: "m2-replay"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 96000
                  optional_sources: []
                  required_sources:
                    - "repository"
                    - "task-document"
                  symbol_hints:
                    - "reduceTaskCommand"
                    - "TaskCentricBackendAdapter"
                    - "withTaskReadmeTransaction"
                depends_on:
                  - "m2-migration"
                expected_outputs:
                  - "m2-replay-implementation"
                id: "m2-replay"
                objective: "Qualify the committed replay engine checkpoint at 447e42b16e053477a6e8ec77ac590269ee2e43e2. Preserve frozen kernel, migration and evidence vectors. Prove resource-claim rejection, local and cloud CAS persistence, interrupted write readback, exact-byte migration and rollback. Repair exact-anchor dependency isolation and expose suite-level failures. Update only the reviewed compatibility candidate for the added migration CLI; keep the immutable baseline unchanged. The final twelve-family qualification remains mandatory in m2-replay-qualification."
                optional: false
                priority: 2
                required_inputs:
                  - "m2-migration-implementation"
                resource_claims:
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/adapters/task-backend"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/backends/task-backend"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/ports"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands/task"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli/run-cli"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/runner"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/tasks/task-kernel"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/tasks/index.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/testkit/src"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "scripts/bench"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "docs/developer"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "docs/reference/clean-task-core-rebuild-spec.mdx"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "scripts/baselines/v0.7-compatibility-candidate.json"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "scripts/checks/check-compatibility-contract-baseline.mjs"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli/run-cli.critical.agent-efficiency-baseline.test.ts"
                risk: "high"
                scope_roots:
                  - "packages/agentplane/src/adapters/task-backend"
                  - "packages/agentplane/src/backends/task-backend"
                  - "packages/agentplane/src/ports"
                  - "packages/agentplane/src/commands/task"
                  - "packages/agentplane/src/cli/run-cli"
                  - "packages/agentplane/src/runner"
                  - "packages/core/src/tasks/task-kernel"
                  - "packages/core/src/tasks/index.ts"
                  - "packages/testkit/src"
                  - "scripts/bench"
                  - "docs/developer"
                  - "docs/reference/clean-task-core-rebuild-spec.mdx"
                  - "scripts/baselines/v0.7-compatibility-candidate.json"
                  - "scripts/checks/check-compatibility-contract-baseline.mjs"
                  - "packages/agentplane/src/cli/run-cli.critical.agent-efficiency-baseline.test.ts"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run arch:check"
                      id: "m2-architecture"
                      kind: "deterministic"
                      required: true
                    -
                      capability: "task.verify"
                      command: "bun run lifecycle:invariants"
                      id: "m2-invariants"
                      kind: "deterministic"
                      required: true
                    -
                      capability: "task.verify"
                      command: "bun run test:fast"
                      id: "m2-tests"
                      kind: "deterministic"
                      required: true
                    -
                      capability: "task.verify"
                      command: "bun run typecheck"
                      id: "m2-types"
                      kind: "deterministic"
                      required: true
                    -
                      capability: "task.verify"
                      command: "git diff --check"
                      id: "m2-diff"
                      kind: "deterministic"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "m2-architecture"
                        - "m2-invariants"
                        - "m2-tests"
                        - "m2-types"
                        - "m2-diff"
                      description: "Qualify the committed replay engine checkpoint at 447e42b16e053477a6e8ec77ac590269ee2e43e2. Preserve frozen kernel, migration and evidence vectors. Prove resource-claim rejection, local and cloud CAS persistence, interrupted write readback, exact-byte migration and rollback. Repair exact-anchor dependency isolation and expose suite-level failures. Update only the reviewed compatibility candidate for the added migration CLI; keep the immutable baseline unchanged. The final twelve-family qualification remains mandatory in m2-replay-qualification."
                      id: "m2-replay"
                      required: true
                  evidence_fingerprint: "sha256:1d1658d2ac8757b0867c97b12229d8145a6915b4103a2b239d67dc6f8a7b5d80"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "m2-architecture"
                      - "m2-invariants"
                      - "m2-tests"
                      - "m2-types"
                      - "m2-diff"
                    description: "Freeze complete twelve-family corpus from the integrated M0 specification with source bytes/digests, exact implementation anchor, commands, expected events, aggregate/projection digests, effect state and next-route codes. Exercise real local storage, serialized capability mode and cloud fake, interruption, all task classes and listed crash boundaries. Compare legacy and canonical normalized read paths without effects or canonical writes. Report first mismatch and reproducible command. Require zero unexplained mismatch, canary migration, repeated migration without byte changes, exact-byte rollback and full gate checks on one implementation identity. Do not claim M3 production deletion, twenty self-hosting tasks or release drills during M2. Produce an explicit coverage and qualification report. Reject zero-test runs, suite import failures, live workspace source leakage and unanchored transitive harness code. Preserve all M0 gates and report actual normalized legacy/canonical read comparison and actual next-action reason codes."
                    id: "m2-replay-qualification"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 96000
                  optional_sources: []
                  required_sources:
                    - "repository"
                    - "task-document"
                  symbol_hints:
                    - "reduceTaskCommand"
                    - "TaskCentricBackendAdapter"
                    - "withTaskReadmeTransaction"
                depends_on:
                  - "m2-replay"
                expected_outputs:
                  - "m2-replay-qualification-report"
                id: "m2-replay-qualification"
                objective: "Freeze complete twelve-family corpus from the integrated M0 specification with source bytes/digests, exact implementation anchor, commands, expected events, aggregate/projection digests, effect state and next-route codes. Exercise real local storage, serialized capability mode and cloud fake, interruption, all task classes and listed crash boundaries. Compare legacy and canonical normalized read paths without effects or canonical writes. Report first mismatch and reproducible command. Require zero unexplained mismatch, canary migration, repeated migration without byte changes, exact-byte rollback and full gate checks on one implementation identity. Do not claim M3 production deletion, twenty self-hosting tasks or release drills during M2. Produce an explicit coverage and qualification report. Reject zero-test runs, suite import failures, live workspace source leakage and unanchored transitive harness code. Preserve all M0 gates and report actual normalized legacy/canonical read comparison and actual next-action reason codes."
                optional: false
                priority: 3
                required_inputs:
                  - "m2-replay-implementation"
                resource_claims:
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/adapters/task-backend"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/backends/task-backend"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/ports"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands/task"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli/run-cli"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/runner"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/tasks/task-kernel"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/tasks/index.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/testkit/src"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "scripts/bench"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "docs/developer"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "docs/reference/clean-task-core-rebuild-spec.mdx"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "scripts/baselines/v0.7-compatibility-candidate.json"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "scripts/checks/check-compatibility-contract-baseline.mjs"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli/run-cli.critical.agent-efficiency-baseline.test.ts"
                risk: "high"
                scope_roots:
                  - "packages/agentplane/src/adapters/task-backend"
                  - "packages/agentplane/src/backends/task-backend"
                  - "packages/agentplane/src/ports"
                  - "packages/agentplane/src/commands/task"
                  - "packages/agentplane/src/cli/run-cli"
                  - "packages/agentplane/src/runner"
                  - "packages/core/src/tasks/task-kernel"
                  - "packages/core/src/tasks/index.ts"
                  - "packages/testkit/src"
                  - "scripts/bench"
                  - "docs/developer"
                  - "docs/reference/clean-task-core-rebuild-spec.mdx"
                  - "scripts/baselines/v0.7-compatibility-candidate.json"
                  - "scripts/checks/check-compatibility-contract-baseline.mjs"
                  - "packages/agentplane/src/cli/run-cli.critical.agent-efficiency-baseline.test.ts"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run arch:check"
                      id: "m2-architecture"
                      kind: "deterministic"
                      required: true
                    -
                      capability: "task.verify"
                      command: "bun run lifecycle:invariants"
                      id: "m2-invariants"
                      kind: "deterministic"
                      required: true
                    -
                      capability: "task.verify"
                      command: "bun run test:fast"
                      id: "m2-tests"
                      kind: "deterministic"
                      required: true
                    -
                      capability: "task.verify"
                      command: "bun run typecheck"
                      id: "m2-types"
                      kind: "deterministic"
                      required: true
                    -
                      capability: "task.verify"
                      command: "git diff --check"
                      id: "m2-diff"
                      kind: "deterministic"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "m2-architecture"
                        - "m2-invariants"
                        - "m2-tests"
                        - "m2-types"
                        - "m2-diff"
                      description: "Freeze complete twelve-family corpus from the integrated M0 specification with source bytes/digests, exact implementation anchor, commands, expected events, aggregate/projection digests, effect state and next-route codes. Exercise real local storage, serialized capability mode and cloud fake, interruption, all task classes and listed crash boundaries. Compare legacy and canonical normalized read paths without effects or canonical writes. Report first mismatch and reproducible command. Require zero unexplained mismatch, canary migration, repeated migration without byte changes, exact-byte rollback and full gate checks on one implementation identity. Do not claim M3 production deletion, twenty self-hosting tasks or release drills during M2. Produce an explicit coverage and qualification report. Reject zero-test runs, suite import failures, live workspace source leakage and unanchored transitive harness code. Preserve all M0 gates and report actual normalized legacy/canonical read comparison and actual next-action reason codes."
                      id: "m2-replay-qualification"
                      required: true
                  evidence_fingerprint: "sha256:d7b566c238c13b69663d76489aa64bb4fff4d40ac33c147524b56696d743f273"
                  schema_version: 1
        revision: 3
        schema_version: 1
        task_id: "202608291006-2A6BJC"
    revision: 83
    schema_version: 1
    updated_at: "2026-08-30T15:17:11.548Z"
    work_items:
      m2-boundaries:
        attempt: 2
        claim_id: null
        id: "m2-boundaries"
        last_failure: null
        output_manifests:
          -
            digest: "sha256:7b90ba238cf1b1c4eacf8b5a398478c9fed3ebf264a5f75aef1cbcaa90986faf"
            id: "m2-boundaries-implementation"
            kind: "semantic_output"
            producer:
              attempt: 2
              plan_revision: 4
              task_id: "202608291006-2A6BJC"
              work_item_id: "m2-boundaries"
            provenance:
              - "sha256:643c0a545ed9034870e7bd9f91a21b35f468dafd66ca29af760b4f953803a913"
              - ".agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json"
            repository_snapshot_digest: "sha256:9cab61d4eb577e2db98dfccb1a3511195c245b7982e3b15736fbdff428ca9da1"
            schema: "agentplane.semantic-output.v1"
            schema_version: 1
        revision: 3
        state: "COMPLETED"
        validation_result:
          evidence:
            -
              artifact_refs:
                - ".agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json"
              check_id: "m2-architecture"
              command_identity: "bun run arch:check"
              detail: "Declared check failed: bun run ci:local:full"
              exit_code: 0
              observed_at: "2026-08-30T11:33:12.431Z"
              repository_snapshot_digest: "sha256:9cab61d4eb577e2db98dfccb1a3511195c245b7982e3b15736fbdff428ca9da1"
              status: "passed"
            -
              artifact_refs:
                - ".agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json"
              check_id: "m2-invariants"
              command_identity: "bun run lifecycle:invariants"
              detail: "Declared check failed: bun run ci:local:full"
              exit_code: 0
              observed_at: "2026-08-30T11:33:12.431Z"
              repository_snapshot_digest: "sha256:9cab61d4eb577e2db98dfccb1a3511195c245b7982e3b15736fbdff428ca9da1"
              status: "passed"
            -
              artifact_refs:
                - ".agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json"
              check_id: "m2-tests"
              command_identity: "bun run test:fast"
              detail: "Declared check failed: bun run ci:local:full"
              exit_code: 0
              observed_at: "2026-08-30T11:33:12.431Z"
              repository_snapshot_digest: "sha256:9cab61d4eb577e2db98dfccb1a3511195c245b7982e3b15736fbdff428ca9da1"
              status: "passed"
            -
              artifact_refs:
                - ".agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json"
              check_id: "m2-types"
              command_identity: "bun run typecheck"
              detail: "Declared check failed: bun run ci:local:full"
              exit_code: 0
              observed_at: "2026-08-30T11:33:12.431Z"
              repository_snapshot_digest: "sha256:9cab61d4eb577e2db98dfccb1a3511195c245b7982e3b15736fbdff428ca9da1"
              status: "passed"
            -
              artifact_refs:
                - ".agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json"
              check_id: "m2-diff"
              command_identity: "git diff --check"
              detail: "Declared check failed: bun run ci:local:full"
              exit_code: 0
              observed_at: "2026-08-30T11:33:12.431Z"
              repository_snapshot_digest: "sha256:9cab61d4eb577e2db98dfccb1a3511195c245b7982e3b15736fbdff428ca9da1"
              status: "passed"
          schema_version: 1
          stale_evidence: []
          status: "passed"
          unsatisfied_criteria: []
      m2-corpus-freeze:
        attempt: 1
        claim_id: null
        id: "m2-corpus-freeze"
        last_failure: null
        output_manifests:
          -
            digest: "sha256:9c3cec45f420dd308d48fa94306f718a561a0353aa5952f69c2ae37ed1b4ec7f"
            id: "m2-frozen-qualification-corpus"
            kind: "semantic_output"
            producer:
              attempt: 1
              plan_revision: 4
              task_id: "202608291006-2A6BJC"
              work_item_id: "m2-corpus-freeze"
            provenance:
              - "sha256:a26d278c3198f0869fd843f5983d9b739702e80ba08d0b440b70e6b8507896a7"
              - ".agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json"
            repository_snapshot_digest: "sha256:dec96cb39d26d30d08320c191be1b467301c3a3ceb4e432b91f55dd0b4f9bb6a"
            schema: "agentplane.semantic-output.v1"
            schema_version: 1
          -
            digest: "sha256:d13e24189307c66f18646bf9d3bffe4978919df0a6b6270b524b6e68ab65bb7e"
            id: "m2-replay-qualification-report"
            kind: "semantic_output"
            producer:
              attempt: 1
              plan_revision: 4
              task_id: "202608291006-2A6BJC"
              work_item_id: "m2-corpus-freeze"
            provenance:
              - "sha256:a26d278c3198f0869fd843f5983d9b739702e80ba08d0b440b70e6b8507896a7"
              - ".agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json"
            repository_snapshot_digest: "sha256:dec96cb39d26d30d08320c191be1b467301c3a3ceb4e432b91f55dd0b4f9bb6a"
            schema: "agentplane.semantic-output.v1"
            schema_version: 1
        revision: 2
        state: "COMPLETED"
        validation_result:
          evidence:
            -
              artifact_refs:
                - ".agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json"
              check_id: "m2-architecture"
              command_identity: "bun run arch:check"
              detail: "Observed by bun run arch:check."
              exit_code: 0
              observed_at: "2026-08-30T14:13:39.309Z"
              repository_snapshot_digest: "sha256:dec96cb39d26d30d08320c191be1b467301c3a3ceb4e432b91f55dd0b4f9bb6a"
              status: "passed"
            -
              artifact_refs:
                - ".agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json"
              check_id: "m2-invariants"
              command_identity: "bun run lifecycle:invariants"
              detail: "Observed by bun run lifecycle:invariants."
              exit_code: 0
              observed_at: "2026-08-30T14:13:39.309Z"
              repository_snapshot_digest: "sha256:dec96cb39d26d30d08320c191be1b467301c3a3ceb4e432b91f55dd0b4f9bb6a"
              status: "passed"
            -
              artifact_refs:
                - ".agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json"
              check_id: "m2-tests"
              command_identity: "bun run test:fast"
              detail: "Observed by bun run test:fast."
              exit_code: 0
              observed_at: "2026-08-30T14:13:39.309Z"
              repository_snapshot_digest: "sha256:dec96cb39d26d30d08320c191be1b467301c3a3ceb4e432b91f55dd0b4f9bb6a"
              status: "passed"
            -
              artifact_refs:
                - ".agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json"
              check_id: "m2-types"
              command_identity: "bun run typecheck"
              detail: "Observed by bun run typecheck."
              exit_code: 0
              observed_at: "2026-08-30T14:13:39.309Z"
              repository_snapshot_digest: "sha256:dec96cb39d26d30d08320c191be1b467301c3a3ceb4e432b91f55dd0b4f9bb6a"
              status: "passed"
            -
              artifact_refs:
                - ".agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json"
              check_id: "m2-diff"
              command_identity: "git diff --check"
              detail: "Observed by git diff --check."
              exit_code: 0
              observed_at: "2026-08-30T14:13:39.309Z"
              repository_snapshot_digest: "sha256:dec96cb39d26d30d08320c191be1b467301c3a3ceb4e432b91f55dd0b4f9bb6a"
              status: "passed"
          schema_version: 1
          stale_evidence: []
          status: "passed"
          unsatisfied_criteria: []
      m2-migration:
        attempt: 1
        claim_id: null
        id: "m2-migration"
        last_failure: null
        output_manifests:
          -
            digest: "sha256:f6ab8be1d6bb829dd1e387441eef5123251212a2ed35efb9b6a77293a52aae3e"
            id: "m2-migration-implementation"
            kind: "semantic_output"
            producer:
              attempt: 1
              plan_revision: 4
              task_id: "202608291006-2A6BJC"
              work_item_id: "m2-migration"
            provenance:
              - "sha256:ce990e12e91c8e98e17d20b3252ec42788bd3d736caca8bf09f04b077d1c9757"
              - ".agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json"
            repository_snapshot_digest: "sha256:41b3425b7ce999a4923921eee73928a1c5542e722475c5ae04450e83a27eefc5"
            schema: "agentplane.semantic-output.v1"
            schema_version: 1
        revision: 2
        state: "COMPLETED"
        validation_result:
          evidence:
            -
              artifact_refs:
                - ".agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json"
              check_id: "m2-architecture"
              command_identity: "bun run arch:check"
              detail: "Observed by bun run arch:check."
              exit_code: 0
              observed_at: "2026-08-30T12:04:27.486Z"
              repository_snapshot_digest: "sha256:41b3425b7ce999a4923921eee73928a1c5542e722475c5ae04450e83a27eefc5"
              status: "passed"
            -
              artifact_refs:
                - ".agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json"
              check_id: "m2-invariants"
              command_identity: "bun run lifecycle:invariants"
              detail: "Observed by bun run lifecycle:invariants."
              exit_code: 0
              observed_at: "2026-08-30T12:04:27.486Z"
              repository_snapshot_digest: "sha256:41b3425b7ce999a4923921eee73928a1c5542e722475c5ae04450e83a27eefc5"
              status: "passed"
            -
              artifact_refs:
                - ".agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json"
              check_id: "m2-tests"
              command_identity: "bun run test:fast"
              detail: "Observed by bun run test:fast."
              exit_code: 0
              observed_at: "2026-08-30T12:04:27.486Z"
              repository_snapshot_digest: "sha256:41b3425b7ce999a4923921eee73928a1c5542e722475c5ae04450e83a27eefc5"
              status: "passed"
            -
              artifact_refs:
                - ".agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json"
              check_id: "m2-types"
              command_identity: "bun run typecheck"
              detail: "Observed by bun run typecheck."
              exit_code: 0
              observed_at: "2026-08-30T12:04:27.486Z"
              repository_snapshot_digest: "sha256:41b3425b7ce999a4923921eee73928a1c5542e722475c5ae04450e83a27eefc5"
              status: "passed"
            -
              artifact_refs:
                - ".agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json"
              check_id: "m2-diff"
              command_identity: "git diff --check"
              detail: "Observed by git diff --check."
              exit_code: 0
              observed_at: "2026-08-30T12:04:27.486Z"
              repository_snapshot_digest: "sha256:41b3425b7ce999a4923921eee73928a1c5542e722475c5ae04450e83a27eefc5"
              status: "passed"
          schema_version: 1
          stale_evidence: []
          status: "passed"
          unsatisfied_criteria: []
      m2-replay:
        attempt: 1
        claim_id: null
        id: "m2-replay"
        last_failure: null
        output_manifests:
          -
            digest: "sha256:2dc3c6efcc5d5afff7125a7a942c598185e5a0016c55a93b65a8a3dd068c6765"
            id: "m2-replay-implementation"
            kind: "semantic_output"
            producer:
              attempt: 1
              plan_revision: 4
              task_id: "202608291006-2A6BJC"
              work_item_id: "m2-replay"
            provenance:
              - "sha256:8aad603d2fdd4768582d58e14a89e3854b9f42b0ed0ffb4cbba500a8a8ac28ef"
              - ".agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json"
            repository_snapshot_digest: "sha256:f05e05ae1b87d14adf690e274545696b0758c0e651b81de61b062eb86d5ed82f"
            schema: "agentplane.semantic-output.v1"
            schema_version: 1
        revision: 2
        state: "COMPLETED"
        validation_result:
          evidence:
            -
              artifact_refs:
                - ".agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json"
              check_id: "m2-architecture"
              command_identity: "bun run arch:check"
              detail: "Observed by bun run arch:check."
              exit_code: 0
              observed_at: "2026-08-30T12:30:07.697Z"
              repository_snapshot_digest: "sha256:f05e05ae1b87d14adf690e274545696b0758c0e651b81de61b062eb86d5ed82f"
              status: "passed"
            -
              artifact_refs:
                - ".agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json"
              check_id: "m2-invariants"
              command_identity: "bun run lifecycle:invariants"
              detail: "Observed by bun run lifecycle:invariants."
              exit_code: 0
              observed_at: "2026-08-30T12:30:07.697Z"
              repository_snapshot_digest: "sha256:f05e05ae1b87d14adf690e274545696b0758c0e651b81de61b062eb86d5ed82f"
              status: "passed"
            -
              artifact_refs:
                - ".agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json"
              check_id: "m2-tests"
              command_identity: "bun run test:fast"
              detail: "Observed by bun run test:fast."
              exit_code: 0
              observed_at: "2026-08-30T12:30:07.697Z"
              repository_snapshot_digest: "sha256:f05e05ae1b87d14adf690e274545696b0758c0e651b81de61b062eb86d5ed82f"
              status: "passed"
            -
              artifact_refs:
                - ".agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json"
              check_id: "m2-types"
              command_identity: "bun run typecheck"
              detail: "Observed by bun run typecheck."
              exit_code: 0
              observed_at: "2026-08-30T12:30:07.697Z"
              repository_snapshot_digest: "sha256:f05e05ae1b87d14adf690e274545696b0758c0e651b81de61b062eb86d5ed82f"
              status: "passed"
            -
              artifact_refs:
                - ".agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json"
              check_id: "m2-diff"
              command_identity: "git diff --check"
              detail: "Observed by git diff --check."
              exit_code: 0
              observed_at: "2026-08-30T12:30:07.697Z"
              repository_snapshot_digest: "sha256:f05e05ae1b87d14adf690e274545696b0758c0e651b81de61b062eb86d5ed82f"
              status: "passed"
          schema_version: 1
          stale_evidence: []
          status: "passed"
          unsatisfied_criteria: []
      m2-replay-qualification:
        attempt: 1
        claim_id: null
        id: "m2-replay-qualification"
        last_failure: null
        output_manifests:
          -
            digest: "sha256:45b0742fbeab378536964750dcf2b5d1b7c7c93182250f809ffeb726870641da"
            id: "m2-coverage-implementation"
            kind: "semantic_output"
            producer:
              attempt: 1
              plan_revision: 4
              task_id: "202608291006-2A6BJC"
              work_item_id: "m2-replay-qualification"
            provenance:
              - "sha256:dda646ef5d3462647e944f394f3d4738b739152ecc6d652db6dd66d6beb7e735"
              - ".agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json"
            repository_snapshot_digest: "sha256:18e2b181552a135181fc072e4985879e3f1452bbebcc68b1cd12f73778058622"
            schema: "agentplane.semantic-output.v1"
            schema_version: 1
        revision: 2
        state: "COMPLETED"
        validation_result:
          evidence:
            -
              artifact_refs:
                - ".agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json"
              check_id: "m2-architecture"
              command_identity: "bun run arch:check"
              detail: "Declared check failed: bun run ci:local:full"
              exit_code: 0
              observed_at: "2026-08-30T13:45:05.596Z"
              repository_snapshot_digest: "sha256:18e2b181552a135181fc072e4985879e3f1452bbebcc68b1cd12f73778058622"
              status: "passed"
            -
              artifact_refs:
                - ".agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json"
              check_id: "m2-invariants"
              command_identity: "bun run lifecycle:invariants"
              detail: "Declared check failed: bun run ci:local:full"
              exit_code: 0
              observed_at: "2026-08-30T13:45:05.596Z"
              repository_snapshot_digest: "sha256:18e2b181552a135181fc072e4985879e3f1452bbebcc68b1cd12f73778058622"
              status: "passed"
            -
              artifact_refs:
                - ".agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json"
              check_id: "m2-tests"
              command_identity: "bun run test:fast"
              detail: "Declared check failed: bun run ci:local:full"
              exit_code: 0
              observed_at: "2026-08-30T13:45:05.596Z"
              repository_snapshot_digest: "sha256:18e2b181552a135181fc072e4985879e3f1452bbebcc68b1cd12f73778058622"
              status: "passed"
            -
              artifact_refs:
                - ".agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json"
              check_id: "m2-types"
              command_identity: "bun run typecheck"
              detail: "Declared check failed: bun run ci:local:full"
              exit_code: 0
              observed_at: "2026-08-30T13:45:05.596Z"
              repository_snapshot_digest: "sha256:18e2b181552a135181fc072e4985879e3f1452bbebcc68b1cd12f73778058622"
              status: "passed"
            -
              artifact_refs:
                - ".agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json"
              check_id: "m2-diff"
              command_identity: "git diff --check"
              detail: "Declared check failed: bun run ci:local:full"
              exit_code: 0
              observed_at: "2026-08-30T13:45:05.596Z"
              repository_snapshot_digest: "sha256:18e2b181552a135181fc072e4985879e3f1452bbebcc68b1cd12f73778058622"
              status: "passed"
          schema_version: 1
          stale_evidence: []
          status: "passed"
          unsatisfied_criteria: []
  agentplane.task_centric_runtime:
    checkpoints: []
    leases: []
    mutation_receipts:
      external-result:work-order-202608291006-2A6BJC-executor-0b3c2a87e61ce1b55ddcc814:
        aggregate_digest: "sha256:489cc882d8bcc7ebab02c988a86a5862af44f2132fd93b778150c2974a6dfb0c"
        event:
          actor_id: "agentplane"
          at: "2026-08-30T09:17:23.281Z"
          cause_refs: []
          entity: "work_item"
          from: "PLANNED"
          id: "event_6df22b0b30cb58fc58a2c69a"
          mutation_id: "external-result:work-order-202608291006-2A6BJC-executor-0b3c2a87e61ce1b55ddcc814"
          plan_digest: "sha256:b44896158ad36a135b4f26fab0d6ad30abf78efcf952d61fc6aaf5a12c44e954"
          plan_revision: 3
          repository_fingerprint: null
          schema_version: 1
          task_id: "202608291006-2A6BJC"
          task_revision: 48
          to: "COMPLETED"
          work_item_id: "m2-replay"
        mutation_id: "external-result:work-order-202608291006-2A6BJC-executor-0b3c2a87e61ce1b55ddcc814"
        next_revision: 49
        previous_revision: 48
        schema_version: 1
        task_id: "202608291006-2A6BJC"
      external-result:work-order-202608291006-2A6BJC-executor-373d0d6211b5686d65b3157f:
        aggregate_digest: "sha256:f37048fab984c14cac0681ac0d092e3f4d25ab24489d532e69bc2d0c3304aa6d"
        event:
          actor_id: "agentplane"
          at: "2026-08-30T11:33:12.460Z"
          cause_refs: []
          entity: "work_item"
          from: "REWORK_READY"
          id: "event_b6b8f8b9963db76e305bfa5b"
          mutation_id: "external-result:work-order-202608291006-2A6BJC-executor-373d0d6211b5686d65b3157f"
          plan_digest: "sha256:8e32060f888533284a0d0235807cc97a6cad53aa4e1f9d48d24ec527928ae634"
          plan_revision: 4
          repository_fingerprint: null
          schema_version: 1
          task_id: "202608291006-2A6BJC"
          task_revision: 63
          to: "COMPLETED"
          work_item_id: "m2-boundaries"
        mutation_id: "external-result:work-order-202608291006-2A6BJC-executor-373d0d6211b5686d65b3157f"
        next_revision: 64
        previous_revision: 63
        schema_version: 1
        task_id: "202608291006-2A6BJC"
      external-result:work-order-202608291006-2A6BJC-executor-38df13655b3b29256bf17685:
        aggregate_digest: "sha256:15b04c0198abe084c47b2edc6c0ef9cf0aeab41186687512b06926588796d3e0"
        event:
          actor_id: "agentplane"
          at: "2026-08-30T12:04:27.518Z"
          cause_refs: []
          entity: "work_item"
          from: "PLANNED"
          id: "event_6486c850a00662d05fbe2100"
          mutation_id: "external-result:work-order-202608291006-2A6BJC-executor-38df13655b3b29256bf17685"
          plan_digest: "sha256:8e32060f888533284a0d0235807cc97a6cad53aa4e1f9d48d24ec527928ae634"
          plan_revision: 4
          repository_fingerprint: null
          schema_version: 1
          task_id: "202608291006-2A6BJC"
          task_revision: 67
          to: "COMPLETED"
          work_item_id: "m2-migration"
        mutation_id: "external-result:work-order-202608291006-2A6BJC-executor-38df13655b3b29256bf17685"
        next_revision: 68
        previous_revision: 67
        schema_version: 1
        task_id: "202608291006-2A6BJC"
      external-result:work-order-202608291006-2A6BJC-executor-5040eebc48c80b699937e47b:
        aggregate_digest: "sha256:168b920d068b5809aa178d188ce43a4a9e57eb13f45964e2b6a5eb79a2d182e3"
        event:
          actor_id: "agentplane"
          at: "2026-08-30T10:59:50.019Z"
          cause_refs: []
          entity: "work_item"
          from: "READY"
          id: "event_9f7a1337172477e29ed91433"
          mutation_id: "external-result:work-order-202608291006-2A6BJC-executor-5040eebc48c80b699937e47b"
          plan_digest: "sha256:8e32060f888533284a0d0235807cc97a6cad53aa4e1f9d48d24ec527928ae634"
          plan_revision: 4
          repository_fingerprint: null
          schema_version: 1
          task_id: "202608291006-2A6BJC"
          task_revision: 59
          to: "REWORK_READY"
          work_item_id: "m2-boundaries"
        mutation_id: "external-result:work-order-202608291006-2A6BJC-executor-5040eebc48c80b699937e47b"
        next_revision: 60
        previous_revision: 59
        schema_version: 1
        task_id: "202608291006-2A6BJC"
      external-result:work-order-202608291006-2A6BJC-executor-513ad27ad0e5ffae19e61a05:
        aggregate_digest: "sha256:8e910daeaecd2808f51ae7522dd6d4c9374d1ec6af547244bc7270520b7ad3ee"
        event:
          actor_id: "agentplane"
          at: "2026-08-30T08:50:24.135Z"
          cause_refs: []
          entity: "work_item"
          from: "PLANNED"
          id: "event_3b924e3beb1b4921367e7336"
          mutation_id: "external-result:work-order-202608291006-2A6BJC-executor-513ad27ad0e5ffae19e61a05"
          plan_digest: "sha256:b44896158ad36a135b4f26fab0d6ad30abf78efcf952d61fc6aaf5a12c44e954"
          plan_revision: 3
          repository_fingerprint: null
          schema_version: 1
          task_id: "202608291006-2A6BJC"
          task_revision: 44
          to: "COMPLETED"
          work_item_id: "m2-migration"
        mutation_id: "external-result:work-order-202608291006-2A6BJC-executor-513ad27ad0e5ffae19e61a05"
        next_revision: 45
        previous_revision: 44
        schema_version: 1
        task_id: "202608291006-2A6BJC"
      external-result:work-order-202608291006-2A6BJC-executor-540dda36f2c3b826da0263ab:
        aggregate_digest: "sha256:17f0a7c9d80668ee1afba3caf7cbc08375ce08cea6b6a7f886707bc6de89be12"
        event:
          actor_id: "agentplane"
          at: "2026-08-30T12:30:07.727Z"
          cause_refs: []
          entity: "work_item"
          from: "PLANNED"
          id: "event_6af6fdd22228c39be8f98237"
          mutation_id: "external-result:work-order-202608291006-2A6BJC-executor-540dda36f2c3b826da0263ab"
          plan_digest: "sha256:8e32060f888533284a0d0235807cc97a6cad53aa4e1f9d48d24ec527928ae634"
          plan_revision: 4
          repository_fingerprint: null
          schema_version: 1
          task_id: "202608291006-2A6BJC"
          task_revision: 71
          to: "COMPLETED"
          work_item_id: "m2-replay"
        mutation_id: "external-result:work-order-202608291006-2A6BJC-executor-540dda36f2c3b826da0263ab"
        next_revision: 72
        previous_revision: 71
        schema_version: 1
        task_id: "202608291006-2A6BJC"
      external-result:work-order-202608291006-2A6BJC-executor-8996e1c67f753572801d9d3f:
        aggregate_digest: "sha256:de7ad335cffc816f3153665ebec1641e1d588cb0bd1e5723b946e0ea6481a4b8"
        event:
          actor_id: "agentplane"
          at: "2026-08-30T05:56:47.732Z"
          cause_refs: []
          entity: "work_item"
          from: "PLANNED"
          id: "event_d9bfda8968a849f2a57993be"
          mutation_id: "external-result:work-order-202608291006-2A6BJC-executor-8996e1c67f753572801d9d3f"
          plan_digest: "sha256:cd5589c341f5305f8682578a76303b1f830d55f1c2fd93a5b4a0614d304fc2a0"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202608291006-2A6BJC"
          task_revision: 13
          to: "COMPLETED"
          work_item_id: "m2-migration"
        mutation_id: "external-result:work-order-202608291006-2A6BJC-executor-8996e1c67f753572801d9d3f"
        next_revision: 14
        previous_revision: 13
        schema_version: 1
        task_id: "202608291006-2A6BJC"
      external-result:work-order-202608291006-2A6BJC-executor-91f10d2c758de42d34b376bb:
        aggregate_digest: "sha256:2ade2fec0f693949e85857462b651af96426c5c53a09c6dceb2723837faf3fd0"
        event:
          actor_id: "agentplane"
          at: "2026-08-30T14:13:39.340Z"
          cause_refs: []
          entity: "work_item"
          from: "PLANNED"
          id: "event_f3cdc6987dc964d3ee7b93c8"
          mutation_id: "external-result:work-order-202608291006-2A6BJC-executor-91f10d2c758de42d34b376bb"
          plan_digest: "sha256:8e32060f888533284a0d0235807cc97a6cad53aa4e1f9d48d24ec527928ae634"
          plan_revision: 4
          repository_fingerprint: null
          schema_version: 1
          task_id: "202608291006-2A6BJC"
          task_revision: 79
          to: "COMPLETED"
          work_item_id: "m2-corpus-freeze"
        mutation_id: "external-result:work-order-202608291006-2A6BJC-executor-91f10d2c758de42d34b376bb"
        next_revision: 80
        previous_revision: 79
        schema_version: 1
        task_id: "202608291006-2A6BJC"
      external-result:work-order-202608291006-2A6BJC-executor-b75d7a8db2d828d11ea57d22:
        aggregate_digest: "sha256:99f4f61c40c950ab6d2fdc4bd054835cc6a4969b2c8fb9128b0eae813954ac24"
        event:
          actor_id: "agentplane"
          at: "2026-08-30T13:45:05.627Z"
          cause_refs: []
          entity: "work_item"
          from: "PLANNED"
          id: "event_a1e86d9efb4e18cc0046552f"
          mutation_id: "external-result:work-order-202608291006-2A6BJC-executor-b75d7a8db2d828d11ea57d22"
          plan_digest: "sha256:8e32060f888533284a0d0235807cc97a6cad53aa4e1f9d48d24ec527928ae634"
          plan_revision: 4
          repository_fingerprint: null
          schema_version: 1
          task_id: "202608291006-2A6BJC"
          task_revision: 75
          to: "COMPLETED"
          work_item_id: "m2-replay-qualification"
        mutation_id: "external-result:work-order-202608291006-2A6BJC-executor-b75d7a8db2d828d11ea57d22"
        next_revision: 76
        previous_revision: 75
        schema_version: 1
        task_id: "202608291006-2A6BJC"
      external-result:work-order-202608291006-2A6BJC-executor-e3f42e6e5024316097195f50:
        aggregate_digest: "sha256:ca31485b8336cff4a1cad738cc1a31c927ef130e686b3775834af1d5c1c87804"
        event:
          actor_id: "agentplane"
          at: "2026-08-30T04:58:13.594Z"
          cause_refs: []
          entity: "work_item"
          from: "READY"
          id: "event_4b52d039dc7cdb96061930d6"
          mutation_id: "external-result:work-order-202608291006-2A6BJC-executor-e3f42e6e5024316097195f50"
          plan_digest: "sha256:cd5589c341f5305f8682578a76303b1f830d55f1c2fd93a5b4a0614d304fc2a0"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202608291006-2A6BJC"
          task_revision: 9
          to: "COMPLETED"
          work_item_id: "m2-boundaries"
        mutation_id: "external-result:work-order-202608291006-2A6BJC-executor-e3f42e6e5024316097195f50"
        next_revision: 10
        previous_revision: 9
        schema_version: 1
        task_id: "202608291006-2A6BJC"
      external-result:work-order-202608291006-2A6BJC-executor-ecec07e816a64a1710a04512:
        aggregate_digest: "sha256:0a414e8f244771233a98a40a5a1e93be27e21c6cab4530d86f4c8aa24a1c63a1"
        event:
          actor_id: "agentplane"
          at: "2026-08-30T08:07:37.315Z"
          cause_refs: []
          entity: "work_item"
          from: "READY"
          id: "event_41a934a274a6f11420993576"
          mutation_id: "external-result:work-order-202608291006-2A6BJC-executor-ecec07e816a64a1710a04512"
          plan_digest: "sha256:b44896158ad36a135b4f26fab0d6ad30abf78efcf952d61fc6aaf5a12c44e954"
          plan_revision: 3
          repository_fingerprint: null
          schema_version: 1
          task_id: "202608291006-2A6BJC"
          task_revision: 36
          to: "REWORK_READY"
          work_item_id: "m2-boundaries"
        mutation_id: "external-result:work-order-202608291006-2A6BJC-executor-ecec07e816a64a1710a04512"
        next_revision: 37
        previous_revision: 36
        schema_version: 1
        task_id: "202608291006-2A6BJC"
      external-result:work-order-202608291006-2A6BJC-executor-f07c52d768cd6c958f305007:
        aggregate_digest: "sha256:fa0cc1a47ccd077ec5eb43c4103bef2eb8c09996084094230dbccd7c818625c7"
        event:
          actor_id: "agentplane"
          at: "2026-08-30T08:32:22.014Z"
          cause_refs: []
          entity: "work_item"
          from: "REWORK_READY"
          id: "event_dacf76a718798456580cca92"
          mutation_id: "external-result:work-order-202608291006-2A6BJC-executor-f07c52d768cd6c958f305007"
          plan_digest: "sha256:b44896158ad36a135b4f26fab0d6ad30abf78efcf952d61fc6aaf5a12c44e954"
          plan_revision: 3
          repository_fingerprint: null
          schema_version: 1
          task_id: "202608291006-2A6BJC"
          task_revision: 40
          to: "COMPLETED"
          work_item_id: "m2-boundaries"
        mutation_id: "external-result:work-order-202608291006-2A6BJC-executor-f07c52d768cd6c958f305007"
        next_revision: 41
        previous_revision: 40
        schema_version: 1
        task_id: "202608291006-2A6BJC"
      legacy-finish:202608291006-2A6BJC:2026-08-30T14:13:35.067Z:2d298871cf8d20ca5b35c3d0a311cdd3be5f83c5:
        aggregate_digest: "sha256:0dd7037238bb39cd729ec378cd15e00ffeab301ca887d463f99a70fc73484714"
        event:
          actor_id: "CODER"
          at: "2026-08-30T15:17:11.548Z"
          cause_refs:
            - "task-verification:202608291006-2A6BJC"
            - "git:2d298871cf8d20ca5b35c3d0a311cdd3be5f83c5"
          entity: "task"
          from: "ACTIVE"
          id: "event_2cb5e8c966f9f418457273a3"
          mutation_id: "legacy-finish:202608291006-2A6BJC:2026-08-30T14:13:35.067Z:2d298871cf8d20ca5b35c3d0a311cdd3be5f83c5"
          plan_digest: "sha256:8e32060f888533284a0d0235807cc97a6cad53aa4e1f9d48d24ec527928ae634"
          plan_revision: 4
          repository_fingerprint: "sha256:842b4ed4d4811036f9b9b29a80cbb15f086695d9b8ca2d7f563c31461cfc6c7b"
          schema_version: 1
          task_id: "202608291006-2A6BJC"
          task_revision: 80
          to: "COMPLETED"
          work_item_id: null
        mutation_id: "legacy-finish:202608291006-2A6BJC:2026-08-30T14:13:35.067Z:2d298871cf8d20ca5b35c3d0a311cdd3be5f83c5"
        next_revision: 83
        previous_revision: 82
        schema_version: 1
        task_id: "202608291006-2A6BJC"
      plan-refinement:work-order-202608291006-2A6BJC-executor-6bf30d85c336a125b18a0fd0:
        aggregate_digest: "sha256:4bc463339a8f02e34c3a520886a02ea7976e2ea1fafcb276f90e76d8bc3dfc5f"
        event:
          actor_id: "external:EXECUTOR"
          at: "2026-08-30T07:21:54.867Z"
          cause_refs:
            - "outputs_changed"
            - "acceptance_changed"
          entity: "task"
          from: "ACTIVE"
          id: "event_3faea0bc7849c8a053ae3464"
          mutation_id: "plan-refinement:work-order-202608291006-2A6BJC-executor-6bf30d85c336a125b18a0fd0"
          plan_digest: "sha256:cd5589c341f5305f8682578a76303b1f830d55f1c2fd93a5b4a0614d304fc2a0"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202608291006-2A6BJC"
          task_revision: 17
          to: "PLANNING"
          work_item_id: null
        mutation_id: "plan-refinement:work-order-202608291006-2A6BJC-executor-6bf30d85c336a125b18a0fd0"
        next_revision: 18
        previous_revision: 17
        schema_version: 1
        task_id: "202608291006-2A6BJC"
      plan-refinement:work-order-202608291006-2A6BJC-executor-cd8e87cb42603bc899077fee:
        aggregate_digest: "sha256:00f8674c248bac911e0bf2a1ed22f2925b4bea474d4d85a8001d0e229d6473b9"
        event:
          actor_id: "external:EXECUTOR"
          at: "2026-08-30T10:16:34.207Z"
          cause_refs:
            - "outputs_changed"
            - "dependencies_changed"
          entity: "task"
          from: "ACTIVE"
          id: "event_8dbd42e7d823db727bbe714a"
          mutation_id: "plan-refinement:work-order-202608291006-2A6BJC-executor-cd8e87cb42603bc899077fee"
          plan_digest: "sha256:b44896158ad36a135b4f26fab0d6ad30abf78efcf952d61fc6aaf5a12c44e954"
          plan_revision: 3
          repository_fingerprint: null
          schema_version: 1
          task_id: "202608291006-2A6BJC"
          task_revision: 52
          to: "PLANNING"
          work_item_id: null
        mutation_id: "plan-refinement:work-order-202608291006-2A6BJC-executor-cd8e87cb42603bc899077fee"
        next_revision: 53
        previous_revision: 52
        schema_version: 1
        task_id: "202608291006-2A6BJC"
      plan-refinement:work-order-202608291006-2A6BJC-executor-dd7a823f6f10f16bf971c2a7:
        aggregate_digest: "sha256:28433fcf1bed43d76f5d2e7c90dde2296291fe4594d8607e0fdf7fd06b43a7e9"
        event:
          actor_id: "external:EXECUTOR"
          at: "2026-08-30T07:51:21.019Z"
          cause_refs:
            - "scope_expanded"
          entity: "task"
          from: "ACTIVE"
          id: "event_5874f5b8b4ff1a089d25f305"
          mutation_id: "plan-refinement:work-order-202608291006-2A6BJC-executor-dd7a823f6f10f16bf971c2a7"
          plan_digest: "sha256:450ced12ab0522ad11fbabab73b03974a1bc1cfcf6b29f5559e930904eaefa67"
          plan_revision: 2
          repository_fingerprint: null
          schema_version: 1
          task_id: "202608291006-2A6BJC"
          task_revision: 29
          to: "PLANNING"
          work_item_id: null
        mutation_id: "plan-refinement:work-order-202608291006-2A6BJC-executor-dd7a823f6f10f16bf971c2a7"
        next_revision: 30
        previous_revision: 29
        schema_version: 1
        task_id: "202608291006-2A6BJC"
    pending_effects: []
    retry_budgets: []
    schema_version: 1
  implementation_commit:
    hash: "1e07dd534c782e6ca325623af332e1f0ded85651"
  task_execution_context:
    base_ref: "main"
    base_sha: "3bcce289091f5e6cbcb1dea87c2964c4f559259d"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
  workflow_route_baseline:
    start_head_sha: "cbc5d79d1510293de3b4c30b61679cdef85d0fdb"
    version: 1
id_source: "generated"
---
## Summary

Add compatibility adapters and replay migration

Connect legacy CLI and repository surfaces to the canonical Task kernel through explicit adapters. Add one-time migration, dual-read or shadow execution where needed, exact replay fixtures, state equivalence checks, rollback receipts, and fail-closed handling for unknown legacy layouts.

## Scope

- In scope: Connect legacy CLI and repository surfaces to the canonical Task kernel through explicit adapters. Add one-time migration, dual-read or shadow execution where needed, exact replay fixtures, state equivalence checks, rollback receipts, and fail-closed handling for unknown legacy layouts.
- Out of scope: unrelated refactors not required for "Add compatibility adapters and replay migration".

## Plan

Preserve all M0 acceptance and the first three WorkItem definitions. Split remaining qualification into supplemental coverage implementation and dependent exact-anchor corpus freeze. Keep the failed full repository gate open. Copy the prepared planning baseline exactly.

## Verify Steps

PLANNER fallback scaffold for "Add compatibility adapters and replay migration". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Add compatibility adapters and replay migration". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-08-30T04:58:08.850Z — VERIFY — ok

By: SUPERVISOR

Note: Verified: CLI-owned checks passed before independent EVALUATOR review.
Attempts: 0

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:14f2d1aa148850434712b287721a7e1a35d4528d09687a0f0ef6b8915e5a7bb6, input_digest=sha256:5ac6fe8bf7c86d938b098c8a84ee6834c83953f983eeec5f2f783128fa6cecaa

Details:

Check: affected_unit_integration
Command: bun run arch:check
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check affected_unit_integration (1/8)

Check: affected_unit_integration
Command: bun run lifecycle:invariants
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check affected_unit_integration (2/8)

Check: affected_unit_integration
Command: bun run test:fast
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-3
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check affected_unit_integration (3/8)

Check: affected_unit_integration
Command: bun run typecheck
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-4
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check affected_unit_integration (4/8)

Check: affected_unit_integration
Command: git diff --check
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-5
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check affected_unit_integration (5/8)

Check: affected_unit_integration
Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-6
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check affected_unit_integration (6/8)

Check: affected_unit_integration
Command: agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-7
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check affected_unit_integration (7/8)

Check: affected_unit_integration
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-8
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check affected_unit_integration (8/8)

Check: critical_paths
Command: bun run arch:check
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check critical_paths (1/8)

Check: critical_paths
Command: bun run lifecycle:invariants
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check critical_paths (2/8)

Check: critical_paths
Command: bun run test:fast
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-3
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check critical_paths (3/8)

Check: critical_paths
Command: bun run typecheck
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-4
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check critical_paths (4/8)

Check: critical_paths
Command: git diff --check
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-5
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check critical_paths (5/8)

Check: critical_paths
Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-6
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check critical_paths (6/8)

Check: critical_paths
Command: agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-7
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check critical_paths (7/8)

Check: critical_paths
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-8
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check critical_paths (8/8)

Check: docs_contract
Command: bun run arch:check
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check docs_contract (1/8)

Check: docs_contract
Command: bun run lifecycle:invariants
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check docs_contract (2/8)

Check: docs_contract
Command: bun run test:fast
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-3
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check docs_contract (3/8)

Check: docs_contract
Command: bun run typecheck
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-4
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check docs_contract (4/8)

Check: docs_contract
Command: git diff --check
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-5
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check docs_contract (5/8)

Check: docs_contract
Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-6
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check docs_contract (6/8)

Check: docs_contract
Command: agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-7
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check docs_contract (7/8)

Check: docs_contract
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-8
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check docs_contract (8/8)

Check: full_regression
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-8
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check full_regression

Check: task_outcome
Command: bun run arch:check
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check task_outcome (1/8)

Check: task_outcome
Command: bun run lifecycle:invariants
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check task_outcome (2/8)

Check: task_outcome
Command: bun run test:fast
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-3
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check task_outcome (3/8)

Check: task_outcome
Command: bun run typecheck
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-4
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check task_outcome (4/8)

Check: task_outcome
Command: git diff --check
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-5
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check task_outcome (5/8)

Check: task_outcome
Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-6
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check task_outcome (6/8)

Check: task_outcome
Command: agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-7
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check task_outcome (7/8)

Check: task_outcome
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-8
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check task_outcome (8/8)

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608291006-2A6BJC-add-compatibility-adapters-and-replay-migration/.agentplane/tasks/202608291006-2A6BJC/blueprint/resolved-snapshot.json
- old_digest: de01a169a7c1ba12da99c26a1e9c03024b28e8ea88f99c10758e30b1a931abc9
- current_digest: de01a169a7c1ba12da99c26a1e9c03024b28e8ea88f99c10758e30b1a931abc9
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608291006-2A6BJC

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

### 2026-08-30T05:56:44.233Z — VERIFY — needs_rework

By: SUPERVISOR

Note: Rework: Declared check failed: bun run ci:local:full
Attempts: 1

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:14f2d1aa148850434712b287721a7e1a35d4528d09687a0f0ef6b8915e5a7bb6, input_digest=sha256:04388fb46decff956f378aa208ddef3888d308e0492bd7fa9894d53655604e80

Details:

Command: bun run arch:check
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608291006-2A6BJC declared verification

Command: bun run lifecycle:invariants
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608291006-2A6BJC declared verification

Command: bun run test:fast
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-3
Scope: branch_pr task 202608291006-2A6BJC declared verification

Command: bun run typecheck
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-4
Scope: branch_pr task 202608291006-2A6BJC declared verification

Command: git diff --check
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-5
Scope: branch_pr task 202608291006-2A6BJC declared verification

Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-6
Scope: branch_pr task 202608291006-2A6BJC declared verification

Command: agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-7
Scope: branch_pr task 202608291006-2A6BJC declared verification

Command: bun run ci:local:full
Result: fail
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-8
Scope: branch_pr task 202608291006-2A6BJC declared verification

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608291006-2A6BJC-add-compatibility-adapters-and-replay-migration/.agentplane/tasks/202608291006-2A6BJC/blueprint/resolved-snapshot.json
- old_digest: de01a169a7c1ba12da99c26a1e9c03024b28e8ea88f99c10758e30b1a931abc9
- current_digest: de01a169a7c1ba12da99c26a1e9c03024b28e8ea88f99c10758e30b1a931abc9
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608291006-2A6BJC

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

### 2026-08-30T07:21:50.527Z — VERIFY — needs_rework

By: SUPERVISOR

Note: Rework: Declared check failed: bun run ci:local:full
Attempts: 1

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:14f2d1aa148850434712b287721a7e1a35d4528d09687a0f0ef6b8915e5a7bb6, input_digest=sha256:285418f098288ea7113e3dde4549eea781849af7eeeb192b0a79c58fe44c0dac

Details:

Command: bun run arch:check
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608291006-2A6BJC declared verification

Command: bun run lifecycle:invariants
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608291006-2A6BJC declared verification

Command: bun run test:fast
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-3
Scope: branch_pr task 202608291006-2A6BJC declared verification

Command: bun run typecheck
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-4
Scope: branch_pr task 202608291006-2A6BJC declared verification

Command: git diff --check
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-5
Scope: branch_pr task 202608291006-2A6BJC declared verification

Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-6
Scope: branch_pr task 202608291006-2A6BJC declared verification

Command: agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-7
Scope: branch_pr task 202608291006-2A6BJC declared verification

Command: bun run ci:local:full
Result: fail
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-8
Scope: branch_pr task 202608291006-2A6BJC declared verification

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608291006-2A6BJC-add-compatibility-adapters-and-replay-migration/.agentplane/tasks/202608291006-2A6BJC/blueprint/resolved-snapshot.json
- old_digest: de01a169a7c1ba12da99c26a1e9c03024b28e8ea88f99c10758e30b1a931abc9
- current_digest: de01a169a7c1ba12da99c26a1e9c03024b28e8ea88f99c10758e30b1a931abc9
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608291006-2A6BJC

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

### 2026-08-30T07:36:28.040Z — VERIFY — needs_rework

By: ORCHESTRATOR

Note: Recover the failed no-change refinement return. Request a fresh bounded implementation episode to qualify adapter capability refusal and return the missing compatibility artifact scope refinement. Preserve prior implementation.
Attempts: 2

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:14f2d1aa148850434712b287721a7e1a35d4528d09687a0f0ef6b8915e5a7bb6, input_digest=sha256:f1e3781e9b8bf6b06b304e0471060469b0d473abf872f129994dff5c3a11c882

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608291006-2A6BJC-add-compatibility-adapters-and-replay-migration/.agentplane/tasks/202608291006-2A6BJC/blueprint/resolved-snapshot.json
- old_digest: de01a169a7c1ba12da99c26a1e9c03024b28e8ea88f99c10758e30b1a931abc9
- current_digest: de01a169a7c1ba12da99c26a1e9c03024b28e8ea88f99c10758e30b1a931abc9
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608291006-2A6BJC

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

### 2026-08-30T07:51:16.632Z — VERIFY — needs_rework

By: SUPERVISOR

Note: Rework: Declared check failed: bun run ci:local:full
Attempts: 3

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:14f2d1aa148850434712b287721a7e1a35d4528d09687a0f0ef6b8915e5a7bb6, input_digest=sha256:ea3185aa07b20baac8750bb224fe4746f6e741eabf6fbf2cc63cba345f16539f

Details:

Command: bun run arch:check
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608291006-2A6BJC declared verification

Command: bun run lifecycle:invariants
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608291006-2A6BJC declared verification

Command: bun run test:fast
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-3
Scope: branch_pr task 202608291006-2A6BJC declared verification

Command: bun run typecheck
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-4
Scope: branch_pr task 202608291006-2A6BJC declared verification

Command: git diff --check
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-5
Scope: branch_pr task 202608291006-2A6BJC declared verification

Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-6
Scope: branch_pr task 202608291006-2A6BJC declared verification

Command: agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-7
Scope: branch_pr task 202608291006-2A6BJC declared verification

Command: bun run ci:local:full
Result: fail
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-8
Scope: branch_pr task 202608291006-2A6BJC declared verification

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608291006-2A6BJC-add-compatibility-adapters-and-replay-migration/.agentplane/tasks/202608291006-2A6BJC/blueprint/resolved-snapshot.json
- old_digest: de01a169a7c1ba12da99c26a1e9c03024b28e8ea88f99c10758e30b1a931abc9
- current_digest: de01a169a7c1ba12da99c26a1e9c03024b28e8ea88f99c10758e30b1a931abc9
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608291006-2A6BJC

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

### 2026-08-30T08:07:29.919Z — VERIFY — blocked_external

By: SUPERVISOR

Note: Rework: Declared check failed: bun run test:fast
Attempts: 4

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:14f2d1aa148850434712b287721a7e1a35d4528d09687a0f0ef6b8915e5a7bb6, input_digest=sha256:cfbbb1bde996bbadfc266a8b7a55291d2de9c9278becaec8b34cc09168c12fbf

Details:

Command: bun run arch:check
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608291006-2A6BJC declared verification

Command: bun run lifecycle:invariants
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608291006-2A6BJC declared verification

Command: bun run test:fast
Result: fail
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-3
Scope: branch_pr task 202608291006-2A6BJC declared verification

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608291006-2A6BJC-add-compatibility-adapters-and-replay-migration/.agentplane/tasks/202608291006-2A6BJC/blueprint/resolved-snapshot.json
- old_digest: de01a169a7c1ba12da99c26a1e9c03024b28e8ea88f99c10758e30b1a931abc9
- current_digest: de01a169a7c1ba12da99c26a1e9c03024b28e8ea88f99c10758e30b1a931abc9
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608291006-2A6BJC

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

### 2026-08-30T08:32:18.484Z — VERIFY — ok

By: SUPERVISOR

Note: Verified: CLI-owned checks passed before independent EVALUATOR review.
Attempts: 0

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:14f2d1aa148850434712b287721a7e1a35d4528d09687a0f0ef6b8915e5a7bb6, input_digest=sha256:d0f48cb317f1e142ed470d09850b37dbf2a8202ef017d4bdb19f6a306313271b

Details:

Check: affected_unit_integration
Command: bun run arch:check
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check affected_unit_integration (1/8)

Check: affected_unit_integration
Command: bun run lifecycle:invariants
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check affected_unit_integration (2/8)

Check: affected_unit_integration
Command: bun run test:fast
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-3
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check affected_unit_integration (3/8)

Check: affected_unit_integration
Command: bun run typecheck
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-4
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check affected_unit_integration (4/8)

Check: affected_unit_integration
Command: git diff --check
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-5
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check affected_unit_integration (5/8)

Check: affected_unit_integration
Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-6
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check affected_unit_integration (6/8)

Check: affected_unit_integration
Command: agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-7
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check affected_unit_integration (7/8)

Check: affected_unit_integration
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-8
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check affected_unit_integration (8/8)

Check: critical_paths
Command: bun run arch:check
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check critical_paths (1/8)

Check: critical_paths
Command: bun run lifecycle:invariants
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check critical_paths (2/8)

Check: critical_paths
Command: bun run test:fast
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-3
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check critical_paths (3/8)

Check: critical_paths
Command: bun run typecheck
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-4
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check critical_paths (4/8)

Check: critical_paths
Command: git diff --check
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-5
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check critical_paths (5/8)

Check: critical_paths
Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-6
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check critical_paths (6/8)

Check: critical_paths
Command: agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-7
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check critical_paths (7/8)

Check: critical_paths
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-8
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check critical_paths (8/8)

Check: docs_contract
Command: bun run arch:check
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check docs_contract (1/8)

Check: docs_contract
Command: bun run lifecycle:invariants
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check docs_contract (2/8)

Check: docs_contract
Command: bun run test:fast
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-3
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check docs_contract (3/8)

Check: docs_contract
Command: bun run typecheck
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-4
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check docs_contract (4/8)

Check: docs_contract
Command: git diff --check
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-5
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check docs_contract (5/8)

Check: docs_contract
Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-6
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check docs_contract (6/8)

Check: docs_contract
Command: agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-7
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check docs_contract (7/8)

Check: docs_contract
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-8
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check docs_contract (8/8)

Check: full_regression
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-8
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check full_regression

Check: task_outcome
Command: bun run arch:check
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check task_outcome (1/8)

Check: task_outcome
Command: bun run lifecycle:invariants
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check task_outcome (2/8)

Check: task_outcome
Command: bun run test:fast
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-3
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check task_outcome (3/8)

Check: task_outcome
Command: bun run typecheck
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-4
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check task_outcome (4/8)

Check: task_outcome
Command: git diff --check
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-5
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check task_outcome (5/8)

Check: task_outcome
Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-6
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check task_outcome (6/8)

Check: task_outcome
Command: agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-7
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check task_outcome (7/8)

Check: task_outcome
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-8
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check task_outcome (8/8)

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608291006-2A6BJC-add-compatibility-adapters-and-replay-migration/.agentplane/tasks/202608291006-2A6BJC/blueprint/resolved-snapshot.json
- old_digest: de01a169a7c1ba12da99c26a1e9c03024b28e8ea88f99c10758e30b1a931abc9
- current_digest: de01a169a7c1ba12da99c26a1e9c03024b28e8ea88f99c10758e30b1a931abc9
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608291006-2A6BJC

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

### 2026-08-30T08:50:20.011Z — VERIFY — ok

By: SUPERVISOR

Note: Verified: CLI-owned checks passed before independent EVALUATOR review.
Attempts: 0

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:14f2d1aa148850434712b287721a7e1a35d4528d09687a0f0ef6b8915e5a7bb6, input_digest=sha256:d80d15cbeba708c060b9e9eb50fa8f32d933890389361d6e612a37f23257314a

Details:

Check: affected_unit_integration
Command: bun run arch:check
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check affected_unit_integration (1/8)

Check: affected_unit_integration
Command: bun run lifecycle:invariants
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check affected_unit_integration (2/8)

Check: affected_unit_integration
Command: bun run test:fast
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-3
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check affected_unit_integration (3/8)

Check: affected_unit_integration
Command: bun run typecheck
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-4
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check affected_unit_integration (4/8)

Check: affected_unit_integration
Command: git diff --check
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-5
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check affected_unit_integration (5/8)

Check: affected_unit_integration
Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-6
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check affected_unit_integration (6/8)

Check: affected_unit_integration
Command: agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-7
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check affected_unit_integration (7/8)

Check: affected_unit_integration
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-8
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check affected_unit_integration (8/8)

Check: critical_paths
Command: bun run arch:check
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check critical_paths (1/8)

Check: critical_paths
Command: bun run lifecycle:invariants
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check critical_paths (2/8)

Check: critical_paths
Command: bun run test:fast
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-3
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check critical_paths (3/8)

Check: critical_paths
Command: bun run typecheck
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-4
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check critical_paths (4/8)

Check: critical_paths
Command: git diff --check
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-5
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check critical_paths (5/8)

Check: critical_paths
Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-6
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check critical_paths (6/8)

Check: critical_paths
Command: agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-7
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check critical_paths (7/8)

Check: critical_paths
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-8
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check critical_paths (8/8)

Check: docs_contract
Command: bun run arch:check
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check docs_contract (1/8)

Check: docs_contract
Command: bun run lifecycle:invariants
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check docs_contract (2/8)

Check: docs_contract
Command: bun run test:fast
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-3
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check docs_contract (3/8)

Check: docs_contract
Command: bun run typecheck
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-4
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check docs_contract (4/8)

Check: docs_contract
Command: git diff --check
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-5
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check docs_contract (5/8)

Check: docs_contract
Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-6
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check docs_contract (6/8)

Check: docs_contract
Command: agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-7
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check docs_contract (7/8)

Check: docs_contract
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-8
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check docs_contract (8/8)

Check: full_regression
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-8
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check full_regression

Check: task_outcome
Command: bun run arch:check
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check task_outcome (1/8)

Check: task_outcome
Command: bun run lifecycle:invariants
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check task_outcome (2/8)

Check: task_outcome
Command: bun run test:fast
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-3
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check task_outcome (3/8)

Check: task_outcome
Command: bun run typecheck
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-4
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check task_outcome (4/8)

Check: task_outcome
Command: git diff --check
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-5
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check task_outcome (5/8)

Check: task_outcome
Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-6
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check task_outcome (6/8)

Check: task_outcome
Command: agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-7
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check task_outcome (7/8)

Check: task_outcome
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-8
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check task_outcome (8/8)

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608291006-2A6BJC-add-compatibility-adapters-and-replay-migration/.agentplane/tasks/202608291006-2A6BJC/blueprint/resolved-snapshot.json
- old_digest: de01a169a7c1ba12da99c26a1e9c03024b28e8ea88f99c10758e30b1a931abc9
- current_digest: de01a169a7c1ba12da99c26a1e9c03024b28e8ea88f99c10758e30b1a931abc9
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608291006-2A6BJC

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

### 2026-08-30T09:17:19.687Z — VERIFY — ok

By: SUPERVISOR

Note: Verified: CLI-owned checks passed before independent EVALUATOR review.
Attempts: 0

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:14f2d1aa148850434712b287721a7e1a35d4528d09687a0f0ef6b8915e5a7bb6, input_digest=sha256:f67a8ec1a9a9bdfd4ea33a68c20869bc5a214a3e4cc464d819a556f54a87b962

Details:

Check: affected_unit_integration
Command: bun run arch:check
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check affected_unit_integration (1/8)

Check: affected_unit_integration
Command: bun run lifecycle:invariants
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check affected_unit_integration (2/8)

Check: affected_unit_integration
Command: bun run test:fast
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-3
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check affected_unit_integration (3/8)

Check: affected_unit_integration
Command: bun run typecheck
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-4
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check affected_unit_integration (4/8)

Check: affected_unit_integration
Command: git diff --check
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-5
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check affected_unit_integration (5/8)

Check: affected_unit_integration
Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-6
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check affected_unit_integration (6/8)

Check: affected_unit_integration
Command: agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-7
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check affected_unit_integration (7/8)

Check: affected_unit_integration
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-8
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check affected_unit_integration (8/8)

Check: critical_paths
Command: bun run arch:check
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check critical_paths (1/8)

Check: critical_paths
Command: bun run lifecycle:invariants
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check critical_paths (2/8)

Check: critical_paths
Command: bun run test:fast
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-3
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check critical_paths (3/8)

Check: critical_paths
Command: bun run typecheck
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-4
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check critical_paths (4/8)

Check: critical_paths
Command: git diff --check
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-5
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check critical_paths (5/8)

Check: critical_paths
Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-6
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check critical_paths (6/8)

Check: critical_paths
Command: agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-7
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check critical_paths (7/8)

Check: critical_paths
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-8
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check critical_paths (8/8)

Check: docs_contract
Command: bun run arch:check
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check docs_contract (1/8)

Check: docs_contract
Command: bun run lifecycle:invariants
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check docs_contract (2/8)

Check: docs_contract
Command: bun run test:fast
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-3
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check docs_contract (3/8)

Check: docs_contract
Command: bun run typecheck
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-4
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check docs_contract (4/8)

Check: docs_contract
Command: git diff --check
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-5
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check docs_contract (5/8)

Check: docs_contract
Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-6
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check docs_contract (6/8)

Check: docs_contract
Command: agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-7
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check docs_contract (7/8)

Check: docs_contract
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-8
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check docs_contract (8/8)

Check: full_regression
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-8
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check full_regression

Check: task_outcome
Command: bun run arch:check
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check task_outcome (1/8)

Check: task_outcome
Command: bun run lifecycle:invariants
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check task_outcome (2/8)

Check: task_outcome
Command: bun run test:fast
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-3
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check task_outcome (3/8)

Check: task_outcome
Command: bun run typecheck
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-4
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check task_outcome (4/8)

Check: task_outcome
Command: git diff --check
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-5
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check task_outcome (5/8)

Check: task_outcome
Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-6
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check task_outcome (6/8)

Check: task_outcome
Command: agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-7
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check task_outcome (7/8)

Check: task_outcome
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-8
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check task_outcome (8/8)

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608291006-2A6BJC-add-compatibility-adapters-and-replay-migration/.agentplane/tasks/202608291006-2A6BJC/blueprint/resolved-snapshot.json
- old_digest: de01a169a7c1ba12da99c26a1e9c03024b28e8ea88f99c10758e30b1a931abc9
- current_digest: de01a169a7c1ba12da99c26a1e9c03024b28e8ea88f99c10758e30b1a931abc9
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608291006-2A6BJC

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

### 2026-08-30T10:16:19.892Z — VERIFY — needs_rework

By: SUPERVISOR

Note: Rework: Declared check failed: bun run test:fast
Attempts: 1

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:14f2d1aa148850434712b287721a7e1a35d4528d09687a0f0ef6b8915e5a7bb6, input_digest=sha256:828bba967a98ce750d220c0af94244aa4e26540e01dfc90be6b9faff5e82860f

Details:

Command: bun run arch:check
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608291006-2A6BJC declared verification

Command: bun run lifecycle:invariants
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608291006-2A6BJC declared verification

Command: bun run test:fast
Result: fail
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-3
Scope: branch_pr task 202608291006-2A6BJC declared verification

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608291006-2A6BJC-add-compatibility-adapters-and-replay-migration/.agentplane/tasks/202608291006-2A6BJC/blueprint/resolved-snapshot.json
- old_digest: de01a169a7c1ba12da99c26a1e9c03024b28e8ea88f99c10758e30b1a931abc9
- current_digest: de01a169a7c1ba12da99c26a1e9c03024b28e8ea88f99c10758e30b1a931abc9
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608291006-2A6BJC

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

### 2026-08-30T10:59:46.329Z — VERIFY — needs_rework

By: SUPERVISOR

Note: Rework: Declared check failed: bun run test:fast
Attempts: 2

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:14f2d1aa148850434712b287721a7e1a35d4528d09687a0f0ef6b8915e5a7bb6, input_digest=sha256:799862af38f6d79cf2a6199d638a051e5fc0a8394a84be67a098bdfd5e083d1c

Details:

Command: bun run arch:check
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608291006-2A6BJC declared verification

Command: bun run lifecycle:invariants
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608291006-2A6BJC declared verification

Command: bun run test:fast
Result: fail
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-3
Scope: branch_pr task 202608291006-2A6BJC declared verification

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608291006-2A6BJC-add-compatibility-adapters-and-replay-migration/.agentplane/tasks/202608291006-2A6BJC/blueprint/resolved-snapshot.json
- old_digest: de01a169a7c1ba12da99c26a1e9c03024b28e8ea88f99c10758e30b1a931abc9
- current_digest: de01a169a7c1ba12da99c26a1e9c03024b28e8ea88f99c10758e30b1a931abc9
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608291006-2A6BJC

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

### 2026-08-30T11:33:08.691Z — VERIFY — needs_rework

By: SUPERVISOR

Note: Rework: Declared check failed: bun run ci:local:full
Attempts: 1

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:14f2d1aa148850434712b287721a7e1a35d4528d09687a0f0ef6b8915e5a7bb6, input_digest=sha256:81b8cc5dbdd6b106e8de6e7ed2b6752d70969e82c88110319aab82dc27b9f657

Details:

Command: bun run arch:check
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608291006-2A6BJC declared verification

Command: bun run lifecycle:invariants
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608291006-2A6BJC declared verification

Command: bun run test:fast
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-3
Scope: branch_pr task 202608291006-2A6BJC declared verification

Command: bun run typecheck
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-4
Scope: branch_pr task 202608291006-2A6BJC declared verification

Command: git diff --check
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-5
Scope: branch_pr task 202608291006-2A6BJC declared verification

Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-6
Scope: branch_pr task 202608291006-2A6BJC declared verification

Command: agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-7
Scope: branch_pr task 202608291006-2A6BJC declared verification

Command: bun run ci:local:full
Result: fail
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-8
Scope: branch_pr task 202608291006-2A6BJC declared verification

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608291006-2A6BJC-add-compatibility-adapters-and-replay-migration/.agentplane/tasks/202608291006-2A6BJC/blueprint/resolved-snapshot.json
- old_digest: de01a169a7c1ba12da99c26a1e9c03024b28e8ea88f99c10758e30b1a931abc9
- current_digest: de01a169a7c1ba12da99c26a1e9c03024b28e8ea88f99c10758e30b1a931abc9
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608291006-2A6BJC

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

### 2026-08-30T12:04:23.497Z — VERIFY — ok

By: SUPERVISOR

Note: Verified: CLI-owned checks passed before independent EVALUATOR review.
Attempts: 0

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:14f2d1aa148850434712b287721a7e1a35d4528d09687a0f0ef6b8915e5a7bb6, input_digest=sha256:8f4ec763c7c3a5e4f8f29dac9f65dd955b455989a0f731506926eb4cec130779

Details:

Check: affected_unit_integration
Command: bun run arch:check
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check affected_unit_integration (1/8)

Check: affected_unit_integration
Command: bun run lifecycle:invariants
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check affected_unit_integration (2/8)

Check: affected_unit_integration
Command: bun run test:fast
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-3
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check affected_unit_integration (3/8)

Check: affected_unit_integration
Command: bun run typecheck
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-4
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check affected_unit_integration (4/8)

Check: affected_unit_integration
Command: git diff --check
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-5
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check affected_unit_integration (5/8)

Check: affected_unit_integration
Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-6
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check affected_unit_integration (6/8)

Check: affected_unit_integration
Command: agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-7
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check affected_unit_integration (7/8)

Check: affected_unit_integration
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-8
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check affected_unit_integration (8/8)

Check: critical_paths
Command: bun run arch:check
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check critical_paths (1/8)

Check: critical_paths
Command: bun run lifecycle:invariants
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check critical_paths (2/8)

Check: critical_paths
Command: bun run test:fast
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-3
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check critical_paths (3/8)

Check: critical_paths
Command: bun run typecheck
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-4
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check critical_paths (4/8)

Check: critical_paths
Command: git diff --check
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-5
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check critical_paths (5/8)

Check: critical_paths
Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-6
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check critical_paths (6/8)

Check: critical_paths
Command: agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-7
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check critical_paths (7/8)

Check: critical_paths
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-8
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check critical_paths (8/8)

Check: docs_contract
Command: bun run arch:check
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check docs_contract (1/8)

Check: docs_contract
Command: bun run lifecycle:invariants
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check docs_contract (2/8)

Check: docs_contract
Command: bun run test:fast
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-3
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check docs_contract (3/8)

Check: docs_contract
Command: bun run typecheck
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-4
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check docs_contract (4/8)

Check: docs_contract
Command: git diff --check
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-5
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check docs_contract (5/8)

Check: docs_contract
Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-6
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check docs_contract (6/8)

Check: docs_contract
Command: agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-7
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check docs_contract (7/8)

Check: docs_contract
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-8
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check docs_contract (8/8)

Check: full_regression
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-8
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check full_regression

Check: task_outcome
Command: bun run arch:check
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check task_outcome (1/8)

Check: task_outcome
Command: bun run lifecycle:invariants
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check task_outcome (2/8)

Check: task_outcome
Command: bun run test:fast
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-3
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check task_outcome (3/8)

Check: task_outcome
Command: bun run typecheck
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-4
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check task_outcome (4/8)

Check: task_outcome
Command: git diff --check
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-5
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check task_outcome (5/8)

Check: task_outcome
Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-6
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check task_outcome (6/8)

Check: task_outcome
Command: agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-7
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check task_outcome (7/8)

Check: task_outcome
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-8
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check task_outcome (8/8)

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608291006-2A6BJC-add-compatibility-adapters-and-replay-migration/.agentplane/tasks/202608291006-2A6BJC/blueprint/resolved-snapshot.json
- old_digest: de01a169a7c1ba12da99c26a1e9c03024b28e8ea88f99c10758e30b1a931abc9
- current_digest: de01a169a7c1ba12da99c26a1e9c03024b28e8ea88f99c10758e30b1a931abc9
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608291006-2A6BJC

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

### 2026-08-30T12:30:03.566Z — VERIFY — ok

By: SUPERVISOR

Note: Verified: CLI-owned checks passed before independent EVALUATOR review.
Attempts: 0

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:14f2d1aa148850434712b287721a7e1a35d4528d09687a0f0ef6b8915e5a7bb6, input_digest=sha256:c6cb9ddfebaf4e708e2542bc6bad20540ab9cd3fd10719da7e86fac7ed292c72

Details:

Check: affected_unit_integration
Command: bun run arch:check
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check affected_unit_integration (1/8)

Check: affected_unit_integration
Command: bun run lifecycle:invariants
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check affected_unit_integration (2/8)

Check: affected_unit_integration
Command: bun run test:fast
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-3
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check affected_unit_integration (3/8)

Check: affected_unit_integration
Command: bun run typecheck
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-4
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check affected_unit_integration (4/8)

Check: affected_unit_integration
Command: git diff --check
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-5
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check affected_unit_integration (5/8)

Check: affected_unit_integration
Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-6
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check affected_unit_integration (6/8)

Check: affected_unit_integration
Command: agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-7
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check affected_unit_integration (7/8)

Check: affected_unit_integration
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-8
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check affected_unit_integration (8/8)

Check: critical_paths
Command: bun run arch:check
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check critical_paths (1/8)

Check: critical_paths
Command: bun run lifecycle:invariants
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check critical_paths (2/8)

Check: critical_paths
Command: bun run test:fast
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-3
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check critical_paths (3/8)

Check: critical_paths
Command: bun run typecheck
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-4
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check critical_paths (4/8)

Check: critical_paths
Command: git diff --check
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-5
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check critical_paths (5/8)

Check: critical_paths
Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-6
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check critical_paths (6/8)

Check: critical_paths
Command: agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-7
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check critical_paths (7/8)

Check: critical_paths
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-8
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check critical_paths (8/8)

Check: docs_contract
Command: bun run arch:check
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check docs_contract (1/8)

Check: docs_contract
Command: bun run lifecycle:invariants
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check docs_contract (2/8)

Check: docs_contract
Command: bun run test:fast
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-3
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check docs_contract (3/8)

Check: docs_contract
Command: bun run typecheck
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-4
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check docs_contract (4/8)

Check: docs_contract
Command: git diff --check
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-5
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check docs_contract (5/8)

Check: docs_contract
Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-6
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check docs_contract (6/8)

Check: docs_contract
Command: agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-7
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check docs_contract (7/8)

Check: docs_contract
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-8
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check docs_contract (8/8)

Check: full_regression
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-8
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check full_regression

Check: task_outcome
Command: bun run arch:check
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check task_outcome (1/8)

Check: task_outcome
Command: bun run lifecycle:invariants
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check task_outcome (2/8)

Check: task_outcome
Command: bun run test:fast
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-3
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check task_outcome (3/8)

Check: task_outcome
Command: bun run typecheck
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-4
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check task_outcome (4/8)

Check: task_outcome
Command: git diff --check
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-5
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check task_outcome (5/8)

Check: task_outcome
Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-6
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check task_outcome (6/8)

Check: task_outcome
Command: agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-7
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check task_outcome (7/8)

Check: task_outcome
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-8
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check task_outcome (8/8)

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608291006-2A6BJC-add-compatibility-adapters-and-replay-migration/.agentplane/tasks/202608291006-2A6BJC/blueprint/resolved-snapshot.json
- old_digest: de01a169a7c1ba12da99c26a1e9c03024b28e8ea88f99c10758e30b1a931abc9
- current_digest: de01a169a7c1ba12da99c26a1e9c03024b28e8ea88f99c10758e30b1a931abc9
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608291006-2A6BJC

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

### 2026-08-30T13:45:01.039Z — VERIFY — needs_rework

By: SUPERVISOR

Note: Rework: Declared check failed: bun run ci:local:full
Attempts: 1

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:14f2d1aa148850434712b287721a7e1a35d4528d09687a0f0ef6b8915e5a7bb6, input_digest=sha256:a70c66206e09cd5793b00edd9ec789ab413aa407a1a05806d68c8252cbbba817

Details:

Command: bun run arch:check
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608291006-2A6BJC declared verification

Command: bun run lifecycle:invariants
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608291006-2A6BJC declared verification

Command: bun run test:fast
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-3
Scope: branch_pr task 202608291006-2A6BJC declared verification

Command: bun run typecheck
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-4
Scope: branch_pr task 202608291006-2A6BJC declared verification

Command: git diff --check
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-5
Scope: branch_pr task 202608291006-2A6BJC declared verification

Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-6
Scope: branch_pr task 202608291006-2A6BJC declared verification

Command: agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-7
Scope: branch_pr task 202608291006-2A6BJC declared verification

Command: bun run ci:local:full
Result: fail
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-8
Scope: branch_pr task 202608291006-2A6BJC declared verification

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608291006-2A6BJC-add-compatibility-adapters-and-replay-migration/.agentplane/tasks/202608291006-2A6BJC/blueprint/resolved-snapshot.json
- old_digest: de01a169a7c1ba12da99c26a1e9c03024b28e8ea88f99c10758e30b1a931abc9
- current_digest: de01a169a7c1ba12da99c26a1e9c03024b28e8ea88f99c10758e30b1a931abc9
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608291006-2A6BJC

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

### 2026-08-30T14:13:35.067Z — VERIFY — ok

By: SUPERVISOR

Note: Verified: CLI-owned checks passed before independent EVALUATOR review.
Attempts: 0

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:14f2d1aa148850434712b287721a7e1a35d4528d09687a0f0ef6b8915e5a7bb6, input_digest=sha256:1432676033e9647cd629be883fb2fcf4fa3ef05cbd096d0b436cc60cb1332217

Details:

Check: affected_unit_integration
Command: bun run arch:check
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check affected_unit_integration (1/8)

Check: affected_unit_integration
Command: bun run lifecycle:invariants
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check affected_unit_integration (2/8)

Check: affected_unit_integration
Command: bun run test:fast
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-3
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check affected_unit_integration (3/8)

Check: affected_unit_integration
Command: bun run typecheck
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-4
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check affected_unit_integration (4/8)

Check: affected_unit_integration
Command: git diff --check
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-5
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check affected_unit_integration (5/8)

Check: affected_unit_integration
Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-6
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check affected_unit_integration (6/8)

Check: affected_unit_integration
Command: agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-7
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check affected_unit_integration (7/8)

Check: affected_unit_integration
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-8
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check affected_unit_integration (8/8)

Check: critical_paths
Command: bun run arch:check
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check critical_paths (1/8)

Check: critical_paths
Command: bun run lifecycle:invariants
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check critical_paths (2/8)

Check: critical_paths
Command: bun run test:fast
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-3
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check critical_paths (3/8)

Check: critical_paths
Command: bun run typecheck
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-4
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check critical_paths (4/8)

Check: critical_paths
Command: git diff --check
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-5
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check critical_paths (5/8)

Check: critical_paths
Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-6
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check critical_paths (6/8)

Check: critical_paths
Command: agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-7
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check critical_paths (7/8)

Check: critical_paths
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-8
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check critical_paths (8/8)

Check: docs_contract
Command: bun run arch:check
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check docs_contract (1/8)

Check: docs_contract
Command: bun run lifecycle:invariants
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check docs_contract (2/8)

Check: docs_contract
Command: bun run test:fast
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-3
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check docs_contract (3/8)

Check: docs_contract
Command: bun run typecheck
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-4
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check docs_contract (4/8)

Check: docs_contract
Command: git diff --check
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-5
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check docs_contract (5/8)

Check: docs_contract
Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-6
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check docs_contract (6/8)

Check: docs_contract
Command: agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-7
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check docs_contract (7/8)

Check: docs_contract
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-8
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check docs_contract (8/8)

Check: full_regression
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-8
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check full_regression

Check: task_outcome
Command: bun run arch:check
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check task_outcome (1/8)

Check: task_outcome
Command: bun run lifecycle:invariants
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check task_outcome (2/8)

Check: task_outcome
Command: bun run test:fast
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-3
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check task_outcome (3/8)

Check: task_outcome
Command: bun run typecheck
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-4
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check task_outcome (4/8)

Check: task_outcome
Command: git diff --check
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-5
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check task_outcome (5/8)

Check: task_outcome
Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-6
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check task_outcome (6/8)

Check: task_outcome
Command: agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-7
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check task_outcome (7/8)

Check: task_outcome
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-8
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check task_outcome (8/8)

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608291006-2A6BJC-add-compatibility-adapters-and-replay-migration/.agentplane/tasks/202608291006-2A6BJC/blueprint/resolved-snapshot.json
- old_digest: de01a169a7c1ba12da99c26a1e9c03024b28e8ea88f99c10758e30b1a931abc9
- current_digest: de01a169a7c1ba12da99c26a1e9c03024b28e8ea88f99c10758e30b1a931abc9
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608291006-2A6BJC

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

### 2026-08-30T15:39:56.664Z — VERIFY — ok

By: SUPERVISOR

Note: Verified: CLI-owned checks passed before independent EVALUATOR review.
Attempts: 0

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:14f2d1aa148850434712b287721a7e1a35d4528d09687a0f0ef6b8915e5a7bb6, input_digest=sha256:b5098ed4b063e911e45134753965e79aa1565b4518530c0d6a72e3f6c40a9470

Details:

Check: affected_unit_integration
Command: bun run arch:check
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check affected_unit_integration (1/7)

Check: affected_unit_integration
Command: bun run lifecycle:invariants
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check affected_unit_integration (2/7)

Check: affected_unit_integration
Command: bun run test:fast
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-3
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check affected_unit_integration (3/7)

Check: affected_unit_integration
Command: bun run typecheck
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-4
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check affected_unit_integration (4/7)

Check: affected_unit_integration
Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-5
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check affected_unit_integration (5/7)

Check: affected_unit_integration
Command: agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-6
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check affected_unit_integration (6/7)

Check: affected_unit_integration
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-7
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check affected_unit_integration (7/7)

Check: critical_paths
Command: bun run arch:check
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check critical_paths (1/7)

Check: critical_paths
Command: bun run lifecycle:invariants
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check critical_paths (2/7)

Check: critical_paths
Command: bun run test:fast
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-3
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check critical_paths (3/7)

Check: critical_paths
Command: bun run typecheck
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-4
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check critical_paths (4/7)

Check: critical_paths
Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-5
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check critical_paths (5/7)

Check: critical_paths
Command: agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-6
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check critical_paths (6/7)

Check: critical_paths
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-7
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check critical_paths (7/7)

Check: docs_contract
Command: bun run arch:check
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check docs_contract (1/7)

Check: docs_contract
Command: bun run lifecycle:invariants
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check docs_contract (2/7)

Check: docs_contract
Command: bun run test:fast
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-3
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check docs_contract (3/7)

Check: docs_contract
Command: bun run typecheck
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-4
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check docs_contract (4/7)

Check: docs_contract
Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-5
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check docs_contract (5/7)

Check: docs_contract
Command: agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-6
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check docs_contract (6/7)

Check: docs_contract
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-7
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check docs_contract (7/7)

Check: full_regression
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-7
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check full_regression

Check: task_outcome
Command: bun run arch:check
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check task_outcome (1/7)

Check: task_outcome
Command: bun run lifecycle:invariants
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check task_outcome (2/7)

Check: task_outcome
Command: bun run test:fast
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-3
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check task_outcome (3/7)

Check: task_outcome
Command: bun run typecheck
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-4
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check task_outcome (4/7)

Check: task_outcome
Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-5
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check task_outcome (5/7)

Check: task_outcome
Command: agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-6
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check task_outcome (6/7)

Check: task_outcome
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-7
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check task_outcome (7/7)

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608291006-2A6BJC-add-compatibility-adapters-and-replay-migration/.agentplane/tasks/202608291006-2A6BJC/blueprint/resolved-snapshot.json
- old_digest: de01a169a7c1ba12da99c26a1e9c03024b28e8ea88f99c10758e30b1a931abc9
- current_digest: de01a169a7c1ba12da99c26a1e9c03024b28e8ea88f99c10758e30b1a931abc9
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608291006-2A6BJC

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202608291006-2A6BJC
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

## Token Usage

- State: `unavailable`
- Completeness: `0/24` agent runs
- Input tokens: `unavailable`
- Output tokens: `unavailable`
- Reasoning tokens: `unavailable`
- Total tokens: `unavailable`
- Provenance: `supervisor_journal/agentplane`
- Journal digest: `sha256:279230bcd5ba79c4c78f4ebe21ebbf6f3c95e10f3c24ffc68da1be3a8b636de0`
- Unavailable reason: `provider_token_telemetry_unavailable`
- Updated at: `2026-08-30T15:17:11.548Z`

---
aliases:
  - "Task history version pre-extraction packets"
tags:
  - agentplane/context
  - agentplane/task-history
  - agentplane/task-history-version
cssclasses:
  - agentplane-context
agentplane_context:
  schema_version: 1
  artifact_type: wiki_page
  canonical_id: "report.task_history_version_packets"
  title: "Task history version pre-extraction packets"
  modality: observation
  epistemic_status: sourced_claim
  visibility: project
  source_refs:
    - ".agentplane/tasks/202601041253-00001/README.md#lines=1-80"
    - ".agentplane/tasks/202606011811-JSY2B9/README.md#lines=1-80"
    - ".agentplane/context/agentplane.context.yaml#lines=1-90"
  claims: []
  graph_refs:
    entities:
      - entity.task_history_version_assimilation
      - entity.task_history_preextract_packet
    edges:
      - edge.task_history_version_assimilation.uses_preextract_packets
  conflicts: []
  updated_by: CURATOR
---

# Task history version pre-extraction packets

These packets compress task history into release/version windows before semantic extraction. They preserve task-level coverage through derived coverage rows while exposing only high-signal version and theme summaries to future agents. See [[Task history version assimilation report]] and [[Task history pre-extraction topology]].

## pre-v0.1.1

- Range: 202601041253-00001 -> 202602021612-T4YZTM
- Tasks: 377
- Importance counts: 1=8, 2=30, 3=245, 4=55, 5=39
- Top topics: prompts_agents(322), docs_site(125), blueprints_recipes(62), cloud_sync(47), tests_quality(27), runner(25), policy_hooks(22), branch_pr(17)
- Top tags: docs(114), workflow(101), nodejs(69), recipes(59), agents(50), tasks(48), roadmap(46), agentctl(45)
- Deep-extract candidates: 94; collapsed low-importance tasks: 38
- Important tasks:
  - 202601041253-0000H: Update agent prompts for tool-less Codex context [score=5; topics=context,runner,prompts_agents]
  - 202601041253-0001E: Enhance sync_tasks.py to integrate ProjectV2 status updates and project number [score=5; topics=branch_pr,prompts_agents,cloud_sync]
  - 202601041253-00023: Align agentctl with branch_pr spec (worktrees, PR checks, integrate) [score=5; topics=branch_pr,prompts_agents]
  - 202601041253-00029: Reduce integrate noise: auto-sync PR meta head_sha [score=5; topics=branch_pr,prompts_agents,cloud_sync]
  - 202601041253-0002E: agentctl: pr check validates README completeness [score=5; topics=branch_pr,prompts_agents,docs_site,tests_quality]
  - 202601041253-0002G: agentctl: integrate auto-updates PR diffstat + README auto-summary [score=5; topics=branch_pr,prompts_agents,docs_site]

## v0.1.1

- Range: 202602030608-F1Q8AB -> 202602031552-28XPQ3
- Tasks: 29
- Importance counts: 1=0, 2=0, 3=13, 4=3, 5=13
- Top topics: prompts_agents(29), docs_site(13), release(9), branch_pr(3), context(2), tests_quality(2), cloud_sync(2), policy_hooks(1)
- Top tags: docs(7), tasks(6), release(6), cli(4), cli/ux(2), cli/errors(2), init(2), git(2)
- Deep-extract candidates: 16; collapsed low-importance tasks: 0
- Important tasks:
  - 202602030608-F1Q8AB: Refactor CLI messages for agent context [score=5; topics=context,prompts_agents]
  - 202602030653-EEFK09: Improve path errors and contextual hints [score=5; topics=context,prompts_agents]
  - 202602030911-K6D6MA: Release 0.1.2 via GitHub Actions [score=5; topics=release,prompts_agents,cloud_sync]
  - 202602030920-EGKTVZ: Fix npm publish auth in GitHub Actions [score=5; topics=release,prompts_agents,cloud_sync]
  - 202602030930-49FW1H: Fix npm publish trusted publishing auth [score=5; topics=release,prompts_agents]
  - 202602030957-6B5C51: Document npm version requirement for trusted publishing [score=5; topics=release,prompts_agents,docs_site]

## v0.1.2

- Range: 202602031631-6M1YXR -> 202602031854-7HXRJK
- Tasks: 5
- Importance counts: 1=0, 2=0, 3=4, 4=1, 5=0
- Top topics: prompts_agents(5), docs_site(3), policy_hooks(1)
- Top tags: docs(2), git(2), tasks(1)
- Deep-extract candidates: 1; collapsed low-importance tasks: 0
- Important tasks:
  - 202602031631-6M1YXR: Use local agentplane.js in AGENTS.md [score=4; topics=policy_hooks,prompts_agents,docs_site]

## v0.1.4

- Range: 202602040547-Q5MHE6 -> 202602051821-DD9BY6
- Tasks: 79
- Importance counts: 1=1, 2=12, 3=36, 4=12, 5=18
- Top topics: prompts_agents(54), docs_site(25), tests_quality(14), release(13), cloud_sync(10), policy_hooks(7), context(5), branch_pr(3)
- Top tags: roadmap(38), docs(22), cli(15), testing(10), release(10), tasks(8), epic(7), security(6)
- Deep-extract candidates: 30; collapsed low-importance tasks: 13
- Important tasks:
  - 202602050554-49X946: AP-010c: Integrate update-check with CLI [score=5; topics=branch_pr,prompts_agents]
  - 202602050609-MT8GF4: AP-020b: Safe extract integration [score=5; topics=branch_pr,policy_hooks,prompts_agents]
  - 202602050746-B15AVK: Raise coverage and fix run-cli test warnings [score=5; topics=context,prompts_agents,tests_quality]
  - 202602050837-5HTSEG: Fix run-cli/task-backend test warnings and raise coverage to 80% [score=5; topics=context,prompts_agents,cloud_sync,tests_quality]
  - 202602050956-XCF4WB: Commit coverage test artifacts [score=5; topics=context,tests_quality]
  - 202602051050-FQ5AYW: Verify coverage >= 75% and close coverage task [score=5; topics=context,tests_quality]

## v0.1.6

- Range: 202602060332-0SZTB3 -> 202602061103-48CPAH
- Tasks: 27
- Importance counts: 1=0, 2=0, 3=20, 4=3, 5=4
- Top topics: prompts_agents(27), docs_site(8), tests_quality(2), release(2), branch_pr(2), policy_hooks(1)
- Top tags: roadmap(14), tasks(12), cli(9), approvals(6), workflow(4), docs(4), verification(4), guard(3)
- Deep-extract candidates: 7; collapsed low-importance tasks: 0
- Important tasks:
  - 202602060612-BQ8HRK: Release v0.1.7 [score=5; topics=release,prompts_agents,docs_site]
  - 202602060850-P2VNYW: C4: Enforce require_plan by blocking start/work/integrate until approved [score=5; topics=branch_pr,prompts_agents]
  - 202602060939-8MHP8F: D4: Enforce require_verify by blocking finish/integrate without ok [score=5; topics=branch_pr,prompts_agents]
  - 202602061055-3YT8H7: Release v0.1.8 [score=5; topics=release,prompts_agents]
  - 202602060427-AFQFMQ: P2: Split commands/workflow.ts by domains + split run-cli core tests [score=4; topics=policy_hooks,prompts_agents,tests_quality]
  - 202602060857-KN1ZRG: D2: Add frontmatter.verification machine-state (pending|ok|needs_rework) [score=4; topics=prompts_agents]

## v0.1.7

- Range: 202602061731-VBCGFW -> 202602061739-G8712J
- Tasks: 10
- Importance counts: 1=0, 2=0, 3=2, 4=7, 5=1
- Top topics: prompts_agents(9), policy_hooks(5), branch_pr(1), docs_site(1)
- Top tags: workflow(10), git(9), cli(6), guard(5), hooks(2), tasks(1), branching(1), docs(1)
- Deep-extract candidates: 8; collapsed low-importance tasks: 0
- Important tasks:
  - 202602061732-QQVMHA: P1.3: branch_pr base branch must be pinned [score=5; topics=branch_pr,prompts_agents]
  - 202602061731-VBCGFW: FIX.md: P0/P1 guardrails + hooks alignment [score=4; topics=policy_hooks,prompts_agents]
  - 202602061732-F17C02: P1.1: Harden commit subject policy (case-insensitive + anti-generic) [score=4; topics=policy_hooks,prompts_agents]
  - 202602061732-KTZK7K: P0.1: Fix commitFromComment allow-base env [score=4; topics=prompts_agents]
  - 202602061732-MTEEWA: P0.3: Unify allow prefix normalization [score=4; topics=prompts_agents]
  - 202602061732-NG820E: P1.4: Protected paths policy in guard commit [score=4; topics=policy_hooks,prompts_agents]

## v0.1.8

- Range: 202602061915-D3QVVY -> 202602071040-KBKDVP
- Tasks: 24
- Importance counts: 1=0, 2=0, 3=12, 4=5, 5=7
- Top topics: prompts_agents(22), context(6), policy_hooks(6), cloud_sync(4), docs_site(3), tests_quality(2), blueprints_recipes(2), release(1)
- Top tags: cli(9), code(8), perf(7), workflow(6), git(5), refactor(4), docs(3), tasks(3)
- Deep-extract candidates: 12; collapsed low-importance tasks: 0
- Important tasks:
  - 202602061915-D3QVVY: Tests: cover CommandContext and CommitPolicy [score=5; topics=context,policy_hooks,tests_quality]
  - 202602061915-RNTNEP: P0: CommandContext for CLI commands [score=5; topics=context,prompts_agents]
  - 202602061915-XCPF92: FIX2.md: command context, policy, commits, split monoliths [score=5; topics=context,policy_hooks,prompts_agents]
  - 202602070515-FWH57M: Close outstanding tasks, run full verify, release 0.1.9 [score=5; topics=release,prompts_agents]
  - 202602070855-96MNE3: Tests: GitContext -z parsing + TaskStore mtime guard + writeIfChanged [score=5; topics=context,tests_quality]
  - 202602070855-JBHZSB: GitContext: memoized facade + guard/commit migration [score=5; topics=context,prompts_agents]

## v0.1.9

- Range: 202602071328-812ZA9 -> 202602091524-N6S63Y
- Tasks: 167
- Importance counts: 1=7, 2=2, 3=120, 4=21, 5=17
- Top topics: prompts_agents(149), tests_quality(27), docs_site(22), policy_hooks(16), cloud_sync(14), blueprints_recipes(14), release(8), branch_pr(8)
- Top tags: cli(78), code(59), refactor(46), cli code(38), docs(19), roadmap(17), testing(17), tasks(15)
- Deep-extract candidates: 38; collapsed low-importance tasks: 9
- Important tasks:
  - 202602071328-812ZA9: AP-MOD-01: Explicit contexts and no direct env/fs access in domains [score=5; topics=context,policy_hooks,prompts_agents]
  - 202602071329-PYB8DV: AP-UX-01: Improve help banner (version + release date) [score=5; topics=release,prompts_agents]
  - 202602071915-X9V8KN: CLI2: integrate into run-cli + migrate task new/work start/recipes install [score=5; topics=branch_pr,blueprints_recipes,prompts_agents]
  - 202602071928-FWTFRR: CLI2-065: Migrate integrate to cli2 [score=5; topics=branch_pr,prompts_agents]
  - 202602081238-GEAQGN: Decompose commands/pr/integrate.ts [score=5; topics=branch_pr,prompts_agents]
  - 202602081344-7KD2TP: Further decompose integrate command core [score=5; topics=branch_pr,prompts_agents]

## v0.2.0

- Range: 202602091643-0N5GD0 -> 202602091644-TXYQAY
- Tasks: 8
- Importance counts: 1=1, 2=0, 3=4, 4=2, 5=1
- Top topics: prompts_agents(7), tests_quality(3), cloud_sync(2), context(1), policy_hooks(1)
- Top tags: architecture(6), code(6), cli(2), quality(2), backend(1), perf(1), upgrade(1), policy(1)
- Deep-extract candidates: 3; collapsed low-importance tasks: 1
- Important tasks:
  - 202602091644-2JKX4T: Usecases: resolveContext single entrypoint [score=5; topics=context,prompts_agents]
  - 202602091644-JS84Q6: PolicyEngine: central policy evaluation [score=4; topics=policy_hooks,prompts_agents]
  - 202602091644-PNW35M: Doctor: structural invariants and safe fixes [score=4; topics=prompts_agents,tests_quality]

## v0.2.2

- Range: 202602091725-3382DF -> 202602091733-TF2HXV
- Tasks: 2
- Importance counts: 1=1, 2=0, 3=0, 4=0, 5=1
- Top topics: tests_quality(1), release(1), branch_pr(1), cloud_sync(1)
- Top tags: testing(1), cli(1), help(1), release(1), npm(1), github(1)
- Deep-extract candidates: 1; collapsed low-importance tasks: 1
- Important tasks:
  - 202602091733-TF2HXV: Release v0.2.4 [score=5; topics=release,branch_pr,cloud_sync]

## v0.2.3

- Range: 202602091805-QSE6X1 -> 202602091805-QSE6X1
- Tasks: 1
- Importance counts: 1=0, 2=0, 3=1, 4=0, 5=0
- Top topics: prompts_agents(1)
- Top tags: cli(1), workflow(1)
- Deep-extract candidates: 0; collapsed low-importance tasks: 0

## v0.2.5

- Range: 202602101257-ABPXVA -> 202602101614-R4QYX0
- Tasks: 23
- Importance counts: 1=0, 2=0, 3=11, 4=7, 5=5
- Top topics: prompts_agents(21), docs_site(7), policy_hooks(6), release(3), context(2), tests_quality(2), runner(1)
- Top tags: cli(14), code(13), docs(7), upgrade(5), policy(5), perf(4), agents(4), refactor(4)
- Deep-extract candidates: 12; collapsed low-importance tasks: 0
- Important tasks:
  - 202602101258-3GF4FT: T12: Cache .agentplane/agents reads in CommandContext.memo [score=5; topics=context,prompts_agents]
  - 202602101529-95KJE8: CI: fix coverage timeouts in slow tests [score=5; topics=context,runner,prompts_agents,tests_quality]
  - 202602101552-4271QV: Release: apply version bump + tag from agent-written notes [score=5; topics=release,prompts_agents]
  - 202602101552-DKG152: Release: agent-assisted notes plan + patch-only auto bump [score=5; topics=release,prompts_agents]
  - 202602101614-R4QYX0: Release: ignore .agentplane/.release artifacts [score=5; topics=release,prompts_agents]
  - 202602101258-7YSJCE: T15: Docs + regression tests for new behavior [score=4; topics=docs_site,tests_quality]

## v0.2.6

- Range: 202602101653-VPS4TH -> 202602101843-RDDKEE
- Tasks: 18
- Importance counts: 1=1, 2=8, 3=6, 4=1, 5=2
- Top topics: docs_site(11), prompts_agents(8), tests_quality(5), release(2), cloud_sync(1), policy_hooks(1)
- Top tags: docs(10), cli(7), code(4), bugfix(3), testing(2), quality(2), release(1), workflow(1)
- Deep-extract candidates: 3; collapsed low-importance tasks: 9
- Important tasks:
  - 202602101653-VPS4TH: Release apply: update bun.lock for frozen-lockfile publish [score=5; topics=release,prompts_agents]
  - 202602101802-N7MWWX: Docs developer: release and publishing (agent-assisted) [score=5; topics=release,prompts_agents,docs_site]
  - 202602101813-QGVNSN: Policy/UX: make '1 task = 1 commit' ergonomic with finish/commit flow [score=4; topics=policy_hooks,prompts_agents]

## v0.2.12

- Range: 202602110502-0FRESX -> 202602111229-QJAPM7
- Tasks: 44
- Importance counts: 1=1, 2=3, 3=17, 4=14, 5=9
- Top topics: prompts_agents(33), tests_quality(14), policy_hooks(11), release(9), cloud_sync(6), docs_site(6), branch_pr(4)
- Top tags: cli(31), code(20), release(9), init(9), quality(8), docs(6), testing(5), security(5)
- Deep-extract candidates: 23; collapsed low-importance tasks: 4
- Important tasks:
  - 202602110755-5GCCKQ: Release: enforce local preflight equal to GitHub CI [score=5; topics=release,prompts_agents,cloud_sync]
  - 202602110759-8479KY: Release v0.2.13 [score=5; topics=release,branch_pr]
  - 202602111036-1WABSX: Apply and publish patch release [score=5; topics=release,branch_pr]
  - 202602111036-4B6KCD: Release v0.2.14 patch [score=5; topics=release,prompts_agents]
  - 202602111036-WTAN7Z: Release preflight and notes [score=5; topics=release,branch_pr,tests_quality]
  - 202602111144-75E3QJ: Fix lint failure in redmine env template builder [score=5; topics=release,prompts_agents,tests_quality]

## v0.2.13

- Range: 202602111518-ND69E2 -> 202602111736-85Z1NA
- Tasks: 39
- Importance counts: 1=0, 2=0, 3=7, 4=12, 5=20
- Top topics: prompts_agents(27), tests_quality(25), context(16), policy_hooks(13), cloud_sync(4), release(4), docs_site(1), branch_pr(1)
- Top tags: cli(28), testing(22), coverage(12), code(10), epic(7), policy(7), backend(3), redmine(3)
- Deep-extract candidates: 32; collapsed low-importance tasks: 0
- Important tasks:
  - 202602111631-9N6WVJ: T4: Enforce cleanup of .agentplane/.release and .agentplane/.upgrade in tests [score=5; topics=release,prompts_agents,tests_quality]
  - 202602111631-V8XQ1F: T5: Raise branch coverage for commands/pr and commands/guard critical paths [score=5; topics=context,tests_quality]
  - 202602111653-QRQWRQ: T2: Cover guard/impl/allow branch paths [score=5; topics=context,tests_quality]
  - 202602111653-X32XPT: T1: Cover pr/internal branch paths [score=5; topics=context,tests_quality]
  - 202602111653-X3QFDG: Coverage uplift: pr/internal and guard allow branches [score=5; topics=context,prompts_agents,tests_quality]
  - 202602111704-147FCR: Coverage uplift: prepare/finalize and guard flow branches [score=5; topics=context,prompts_agents,tests_quality]

## v0.2.14

- Range: 202602111802-1H9W0F -> 202602111841-YT01ZG
- Tasks: 4
- Importance counts: 1=0, 2=0, 3=0, 4=0, 5=4
- Top topics: release(4), branch_pr(3), cloud_sync(3), prompts_agents(1), tests_quality(1)
- Top tags: release(4), npm(4), ci(4), quality(1)
- Deep-extract candidates: 4; collapsed low-importance tasks: 0
- Important tasks:
  - 202602111802-1H9W0F: Release next patch version [score=5; topics=release,branch_pr]
  - 202602111827-Q5R4D8: Harden GitHub npm publish idempotency [score=5; topics=release,branch_pr,cloud_sync]
  - 202602111841-XAE2BE: Release v0.2.19 via GitHub provenance pipeline [score=5; topics=release,branch_pr,cloud_sync]
  - 202602111841-YT01ZG: Release hardening: GitHub-only provenance publish [score=5; topics=release,prompts_agents,cloud_sync,tests_quality]

## v0.2.17

- Range: 202602112051-0VZMVY -> 202602112104-XCJ7RC
- Tasks: 10
- Importance counts: 1=1, 2=0, 3=2, 4=1, 5=6
- Top topics: prompts_agents(8), tests_quality(7), release(6), cloud_sync(2), runner(1), policy_hooks(1)
- Top tags: ci(7), code(6), quality(6), release(5), epic(2), testing(2), npm(1), performance(1)
- Deep-extract candidates: 7; collapsed low-importance tasks: 1
- Important tasks:
  - 202602112051-A9ANGA: Enforce release-time dependency parity (agentplane/core) [score=5; topics=release,prompts_agents,tests_quality]
  - 202602112051-AGP0RF: Add schemas/agents sync checks to publish workflow [score=5; topics=release,prompts_agents,cloud_sync]
  - 202602112051-JCN7DZ: P0 hardening: dependency parity and CI release gates [score=5; topics=release,prompts_agents,tests_quality]
  - 202602112051-V77CPV: Align agentplane dependency on @agentplaneorg/core release version [score=5; topics=release,prompts_agents]
  - 202602112051-XEQJNE: Run full verification for P0 hardening [score=5; topics=release,tests_quality]
  - 202602112104-V79E54: Optimize CI/publish workflows: cache, concurrency, pinned runners [score=5; topics=release,runner,prompts_agents]

## v0.2.19

- Range: 202602120410-E9RESE -> 202602121142-W83TH9
- Tasks: 53
- Importance counts: 1=0, 2=12, 3=23, 4=11, 5=7
- Top topics: prompts_agents(36), docs_site(23), policy_hooks(9), tests_quality(9), release(6), cloud_sync(2), blueprints_recipes(1), context(1)
- Top tags: code(26), docs(19), meta(7), policy(4), workflow(3), epic(2), config(1), testing(1)
- Deep-extract candidates: 18; collapsed low-importance tasks: 12
- Important tasks:
  - 202602120734-8X4SZ3: Docs Developer: contributing and release pipeline [score=5; topics=release,docs_site]
  - 202602120818-C1VM03: Fix release prepublish test regressions [score=5; topics=release,prompts_agents,tests_quality]
  - 202602120925-A6HZ65: P2: cross-command resolved-context cache [score=5; topics=context,prompts_agents]
  - 202602120951-5EWEMV: P0: centralized release version sync and strict parity gates [score=5; topics=release,prompts_agents,cloud_sync]
  - 202602121056-JSW7PA: Release: add post-publish npm smoke verification [score=5; topics=release,prompts_agents]
  - 202602121122-BYNKSW: Release v0.2.21 patch [score=5; topics=release,prompts_agents]

## v0.2.21

- Range: 202602131109-JE84GB -> 202602131110-XTS02M
- Tasks: 11
- Importance counts: 1=0, 2=1, 3=7, 4=2, 5=1
- Top topics: prompts_agents(7), tests_quality(3), cloud_sync(1), docs_site(1), context(1)
- Top tags: code(9), meta(1), docs(1)
- Deep-extract candidates: 3; collapsed low-importance tasks: 1
- Important tasks:
  - 202602131110-TY30AK: P0: regression coverage for upgrade no-op and bootstrap changes [score=5; topics=context,tests_quality]
  - 202602131110-09TJ85: P2: large-taskset performance and regression verification [score=4; topics=tests_quality]
  - 202602131110-8Q0885: P1: lifecycle/preflight/parser regression suite refresh [score=4; topics=tests_quality]

## v0.2.23

- Range: 202602181049-NHXMQ6 -> 202602181258-TGNF32
- Tasks: 22
- Importance counts: 1=1, 2=5, 3=13, 4=0, 5=3
- Top topics: prompts_agents(15), docs_site(13), tests_quality(3), release(2), branch_pr(2), policy_hooks(1), cloud_sync(1)
- Top tags: code(14), docs(5), frontend(2), planning(1)
- Deep-extract candidates: 3; collapsed low-importance tasks: 6
- Important tasks:
  - 202602181049-NHXMQ6: Align local pre-push with CI, run full verify, prep patch release [score=5; topics=release,policy_hooks,prompts_agents]
  - 202602181258-HCEX4B: Finalize publication quality gate and release website [score=5; topics=release,branch_pr,docs_site,tests_quality]
  - 202602181258-SA5WDF: Integrate GTM and analytics instrumentation [score=5; topics=branch_pr,prompts_agents]

## v0.2.25

- Range: 202603050635-S65NNK -> 202603051536-FPAJ6D
- Tasks: 17
- Importance counts: 1=0, 2=0, 3=8, 4=8, 5=1
- Top topics: prompts_agents(16), policy_hooks(5), cloud_sync(3), blueprints_recipes(1), tests_quality(1), release(1), context(1), docs_site(1)
- Top tags: code(16), meta(1)
- Deep-extract candidates: 9; collapsed low-importance tasks: 0
- Important tasks:
  - 202603051425-T8CFT8: Improve release notes detail and coverage [score=5; topics=release,context,prompts_agents]
  - 202603051024-669MR4: P0: Surface local task parse/read failures (no silent drops) [score=4; topics=prompts_agents]
  - 202603051024-JCP6DK: P1: Replace recursive stale-dist scan with manifest-based quick check [score=4; topics=prompts_agents]
  - 202603051025-5QFBAG: Verification: regression/perf guard for task listing path [score=4; topics=tests_quality]
  - 202603051138-HAXWZV: Relocate WORKFLOW.md into .agentplane [score=4; topics=policy_hooks,prompts_agents]
  - 202603051455-JBFXVG: Refactor AGENTS gateway and modular policy docs [score=4; topics=policy_hooks,prompts_agents,docs_site]

## v0.2.26

- Range: 202603060752-FC736K -> 202603061621-C0K1PM
- Tasks: 14
- Importance counts: 1=0, 2=0, 3=8, 4=0, 5=6
- Top topics: prompts_agents(14), docs_site(10), release(6), cloud_sync(2), policy_hooks(1), tests_quality(1)
- Top tags: website(8), code(3), docs(2), release(2)
- Deep-extract candidates: 6; collapsed low-importance tasks: 0
- Important tasks:
  - 202603061401-6CAKBY: Allow batched task-doc planning updates and publish site [score=5; topics=release,prompts_agents]
  - 202603061410-XHB9JA: Sync policy mirrors and publish site [score=5; topics=release,policy_hooks,prompts_agents,docs_site]
  - 202603061414-F0B4QD: Refresh CLI reference and publish site [score=5; topics=release,prompts_agents,docs_site]
  - 202603061433-KWPVV9: Release agentplane 0.3.1 [score=5; topics=release,prompts_agents]
  - 202603061532-9Y41NM: Fix release apply push hang [score=5; topics=release,prompts_agents]
  - 202603061621-C0K1PM: Fix release apply test branch assumption in CI [score=5; topics=release,prompts_agents,tests_quality]

## v0.3.1

- Range: 202603070958-FBM32H -> 202603072133-TBN594
- Tasks: 51
- Importance counts: 1=1, 2=7, 3=23, 4=14, 5=6
- Top topics: prompts_agents(32), docs_site(25), tests_quality(7), release(6), policy_hooks(5), blueprints_recipes(2), runner(2)
- Top tags: code(25), docs(19), release(4), tasks(2), frontend(1)
- Deep-extract candidates: 20; collapsed low-importance tasks: 8
- Important tasks:
  - 202603071440-V49Q20: Publish a single copy-paste bootstrap command block [score=5; topics=release,docs_site]
  - 202603071710-31BQ6E: Add publish recovery tooling [score=5; topics=release,prompts_agents]
  - 202603071710-PQVS2V: Harden release preflight against burned versions [score=5; topics=release,prompts_agents]
  - 202603071715-P3T5FT: Release agentplane 0.3.2 [score=5; topics=release,prompts_agents]
  - 202603071745-NWCE8B: Publish blog posts for 0.3.0 to 0.3.2 [score=5; topics=release,docs_site]
  - 202603071745-T3QE04: Fix generated docs drift in release flow [score=5; topics=release,prompts_agents,docs_site]

## v0.3.2

- Range: 202603080523-AP717H -> 202603081837-13XXXX
- Tasks: 80
- Importance counts: 1=0, 2=6, 3=37, 4=18, 5=19
- Top topics: prompts_agents(60), docs_site(35), release(20), tests_quality(13), policy_hooks(10), cloud_sync(8), runner(8), context(2)
- Top tags: code(52), docs(20), release(10), tasks(5), agents(2), upgrade(2), install(1)
- Deep-extract candidates: 37; collapsed low-importance tasks: 6
- Important tasks:
  - 202603080540-RH0T06: P0: refactor release apply into explicit state machine helpers [score=5; topics=release,prompts_agents]
  - 202603081315-X7JEE2: Restore chronological release ordering in blog surfaces [score=5; topics=release,docs_site]
  - 202603081421-EJW1BT: Plan patch-prep fixes for task doc set, legacy migration timeout, init approvals, and blog release surface [score=5; topics=release,runner,prompts_agents]
  - 202603081422-MYT5TP: Raise legacy README migration integration test timeout budget [score=5; topics=branch_pr,runner,prompts_agents,docs_site]
  - 202603081422-QMHF8T: Refocus blog release surface on the 0.3.x line [score=5; topics=release,docs_site]
  - 202603081453-V46YFN: Extract workflow coverage suites into shared scripts [score=5; topics=context,prompts_agents]

## v0.3.4

- Range: 202603090628-HVWXME -> 202603091715-8HK0Y3
- Tasks: 45
- Importance counts: 1=0, 2=8, 3=19, 4=4, 5=14
- Top topics: prompts_agents(32), docs_site(23), release(12), cloud_sync(9), runner(3), branch_pr(1), tests_quality(1), context(1)
- Top tags: code(18), docs(16), release(10), readme(9), frontend(9), backend(8), package(4), positioning(2)
- Deep-extract candidates: 18; collapsed low-importance tasks: 8
- Important tasks:
  - 202603090846-5JWQ88: Publish 0.3.4 blog post and refine navbar chrome [score=5; topics=release,docs_site]
  - 202603090923-7VYWJH: Decompose patch-critical integration test contour [score=5; topics=branch_pr,prompts_agents,tests_quality]
  - 202603091039-8M94Y4: Draft release notes for v0.3.5 [score=5; topics=release,docs_site]
  - 202603091039-9H9V71: Plan 0.3.5 release execution [score=5; topics=release,prompts_agents]
  - 202603091039-NRWCGC: Apply and publish release v0.3.5 [score=5; topics=release,prompts_agents]
  - 202603091054-V2X1QB: Repair Docusaurus theme type errors blocking v0.3.5 release [score=5; topics=release,prompts_agents]

## v0.3.5

- Range: 202603100659-2N9623 -> 202603121629-FGTXD6
- Tasks: 59
- Importance counts: 1=0, 2=0, 3=35, 4=13, 5=11
- Top topics: prompts_agents(58), docs_site(10), blueprints_recipes(7), tests_quality(7), branch_pr(7), cloud_sync(5), release(4), policy_hooks(2)
- Top tags: code(52), cli(34), recipes(6), tasks(6), frontend(5), docs(4), release(2), storage(1)
- Deep-extract candidates: 24; collapsed low-importance tasks: 0
- Important tasks:
  - 202603120731-FSKR13: Patch stabilization: improve release recovery ergonomics [score=5; topics=release,prompts_agents]
  - 202603120833-7Z9X0K: Fix allow-tasks coverage for active task artifacts [score=5; topics=context,prompts_agents]
  - 202603120929-158DXD: Split lifecycle CLI integration suite [score=5; topics=branch_pr,prompts_agents]
  - 202603120929-M5AFRC: Split guard CLI integration suite [score=5; topics=branch_pr,prompts_agents]
  - 202603121125-RZ4HDW: Patch stabilization: split task CLI integration bucket [score=5; topics=branch_pr,prompts_agents]
  - 202603121302-MBHBGG: Cleanup phase: split PR flow CLI integration suite [score=5; topics=branch_pr,prompts_agents]

## v0.3.6

- Range: 202603130527-23J8VB -> 202603141719-X2XSQC
- Tasks: 74
- Importance counts: 1=0, 2=0, 3=25, 4=6, 5=43
- Top topics: prompts_agents(73), release(43), runner(18), cloud_sync(12), docs_site(7), branch_pr(3), context(2), tests_quality(2)
- Top tags: code(60), release(42), backend(10), tasks(9), redmine(9), ci(5), task-doc(4), docs(3)
- Deep-extract candidates: 49; collapsed low-importance tasks: 0
- Important tasks:
  - 202603130527-23J8VB: Block auto-publish when Core CI is red on release SHA [score=5; topics=release,prompts_agents]
  - 202603130527-3MJSDK: Add GitHub-aware release recovery status diagnostics [score=5; topics=release,prompts_agents,cloud_sync]
  - 202603130527-NJQPEF: Align release prepublish gate with Core CI coverage guards [score=5; topics=release,context,prompts_agents]
  - 202603130558-T6CQV4: Teach release recovery to read release-ready artifacts [score=5; topics=release,prompts_agents]
  - 202603130558-T9ZWV0: Emit release-ready manifest from successful Core CI [score=5; topics=release,prompts_agents]
  - 202603130558-VQWTGD: Switch auto-publish to workflow_run manifest-driven flow [score=5; topics=release,prompts_agents]

## v0.3.7

- Range: 202603181342-8EC40V -> 202604021851-W4RW7J
- Tasks: 241
- Importance counts: 1=0, 2=2, 3=86, 4=104, 5=49
- Top topics: prompts_agents(227), docs_site(117), runner(99), tests_quality(84), cloud_sync(60), blueprints_recipes(41), policy_hooks(31), branch_pr(29)
- Top tags: code(198), runner(84), refactor(79), cli(62), workflow(47), docs(26), backend(25), recipes(24)
- Deep-extract candidates: 153; collapsed low-importance tasks: 2
- Important tasks:
  - 202603231310-E9DEDP: R11: Assemble recipe context and materialize tasks [score=5; topics=context,runner,blueprints_recipes,prompts_agents]
  - 202603231310-NK646A: R5: Assemble canonical task runner context [score=5; topics=context,runner,prompts_agents,cloud_sync]
  - 202603240901-KT3C1C: Add regression coverage for trace completeness and language isolation [score=5; topics=context,runner,prompts_agents,tests_quality]
  - 202603241541-HV0T82: Add task runner context budget and compaction [score=5; topics=context,runner,prompts_agents]
  - 202603241918-5MD12X: Runner tests: add regression coverage for TERM cancellation metadata semantics [score=5; topics=context,runner,prompts_agents,tests_quality]
  - 202603241918-762TM7: Workflow: switch repository default mode from direct to branch_pr [score=5; topics=branch_pr,prompts_agents]

## v0.3.9

- Range: 202604030423-BRRQ94 -> 202604032235-G375FB
- Tasks: 16
- Importance counts: 1=0, 2=0, 3=1, 4=1, 5=14
- Top topics: prompts_agents(16), docs_site(15), cloud_sync(15), tests_quality(14), context(9), runner(9), blueprints_recipes(9), policy_hooks(5)
- Top tags: code(14), framework(11), workflow(4), policy(3), runtime(1), capabilities(1), approvals(1), explain(1)
- Deep-extract candidates: 15; collapsed low-importance tasks: 0
- Important tasks:
  - 202604030441-AQRVW4: F-001 Introduce ResolvedHarnessContract [score=5; topics=context,runner,prompts_agents,docs_site]
  - 202604030442-9CJTSA: F-003 Introduce capability registry [score=5; topics=context,runner,blueprints_recipes,prompts_agents]
  - 202604030442-C0JQDY: F-006 Introduce approval runtime [score=5; topics=release,context,blueprints_recipes,prompts_agents]
  - 202604030442-C3HR7C: F-005 Expand policy taxonomy [score=5; topics=release,runner,policy_hooks,blueprints_recipes]
  - 202604030442-E8H05E: F-009 Introduce explain hooks [score=5; topics=context,runner,policy_hooks,blueprints_recipes]
  - 202604030442-NBBE36: F-008 Introduce task intake contracts [score=5; topics=context,runner,blueprints_recipes,prompts_agents]

## v0.3.10

- Range: 202604050745-18JJ5E -> 202604101009-36KKA9
- Tasks: 128
- Importance counts: 1=0, 2=0, 3=27, 4=39, 5=62
- Top topics: prompts_agents(118), cloud_sync(93), docs_site(90), tests_quality(85), branch_pr(59), policy_hooks(22), release(4), blueprints_recipes(4)
- Top tags: workflow(107), code(81), github(22), incidents(21), ux(10), tasks(5), git(5), hooks(4)
- Deep-extract candidates: 101; collapsed low-importance tasks: 0
- Important tasks:
  - 202604050745-18JJ5E: Fix branch_pr shipped-task reconciliation and diagnostics [score=5; topics=branch_pr,prompts_agents,docs_site,cloud_sync]
  - 202604061916-2860KH: Promote incidents during branch_pr integrate and hosted-close [score=5; topics=branch_pr,prompts_agents,docs_site,cloud_sync]
  - 202604061916-40FZNK: Detect stale open PR drift for DONE tasks [score=5; topics=branch_pr,prompts_agents,docs_site,cloud_sync]
  - 202604062024-33MZPB: Emit post-integrate bootstrap guidance for stale framework runtime [score=5; topics=branch_pr,prompts_agents,docs_site,cloud_sync]
  - 202604062024-AEVV0A: Infer task context for commit-msg hook from task branch [score=5; topics=context,policy_hooks,prompts_agents,docs_site]
  - 202604062101-7WG8WG: Report explicit incident promotion outcome in lifecycle commands [score=5; topics=branch_pr,prompts_agents,docs_site,tests_quality]

## v0.3.11

- Range: 202604130750-E2J835 -> 202604151838-Z2KC6V
- Tasks: 36
- Importance counts: 1=0, 2=0, 3=0, 4=3, 5=33
- Top topics: prompts_agents(35), docs_site(29), tests_quality(29), release(26), cloud_sync(21), branch_pr(14), policy_hooks(6), runner(3)
- Top tags: release(20), workflow(14), code(9), git(1), hooks(1), docs(1), branch_pr(1)
- Deep-extract candidates: 36; collapsed low-importance tasks: 0
- Important tasks:
  - 202604130750-E2J835: Make release apply branch_pr-aware for protected-main publish [score=5; topics=release,branch_pr,runner,policy_hooks]
  - 202604130818-7SRWEX: Harden branch_pr publish friction around PR artifacts and bootstrap [score=5; topics=release,branch_pr,runner,prompts_agents]
  - 202604131045-RRD2AC: Reconcile local integrate PR artifacts to MERGED on base [score=5; topics=branch_pr,prompts_agents,docs_site,cloud_sync]
  - 202604131109-M4MN2S: Suppress non-actionable DONE branch_pr PR artifact warnings [score=5; topics=branch_pr,prompts_agents,docs_site,cloud_sync]
  - 202604131120-S42Z30: Format release hardening files blocked by pre-push [score=5; topics=release,policy_hooks,prompts_agents,docs_site]
  - 202604131304-7TWKB1: Publish April 13 release-hardening wave to protected main and close superseded PRs [score=5; topics=release,branch_pr]

## v0.3.12

- Range: 202604151904-BZQE85 -> 202604171522-TZMHEY
- Tasks: 60
- Importance counts: 1=0, 2=0, 3=24, 4=7, 5=29
- Top topics: prompts_agents(58), blueprints_recipes(35), tests_quality(30), docs_site(19), runner(17), cloud_sync(14), branch_pr(14), context(11)
- Top tags: workflow(40), code(38), recipes(27), refactor(4), cli(4), release(3), docs(2), scripts(2)
- Deep-extract candidates: 36; collapsed low-importance tasks: 0
- Important tasks:
  - 202604151921-DQ7DB6: Commit task README with branch_pr PR packet artifacts [score=5; topics=branch_pr,prompts_agents,docs_site,cloud_sync]
  - 202604151942-K2CDHC: Record protected-main integrate handoff [score=5; topics=branch_pr,runner,prompts_agents,tests_quality]
  - 202604151957-ZB7XP1: Make protected-main integrate a first-class handoff route [score=5; topics=branch_pr,runner,prompts_agents]
  - 202604160652-Q0JPW0: Make protected-base integrate use explicit handoff result [score=5; topics=branch_pr,runner,prompts_agents,tests_quality]
  - 202604160713-2MVFXY: Clarify integrate route when run from a task worktree [score=5; topics=branch_pr,prompts_agents,tests_quality]
  - 202604160827-448YM9: Make first pr open publish the final packet head [score=5; topics=release,prompts_agents,tests_quality]

## v0.3.13

- Range: 202604171910-FN9AQ6 -> 202604181840-K8PDGY
- Tasks: 24
- Importance counts: 1=0, 2=0, 3=6, 4=5, 5=13
- Top topics: prompts_agents(24), tests_quality(13), release(10), docs_site(8), cloud_sync(7), policy_hooks(6), blueprints_recipes(6), branch_pr(4)
- Top tags: code(14), refactor(12), release(5), workflow(5), architecture(3), backend(3), schemas(2), cli(2)
- Deep-extract candidates: 18; collapsed low-importance tasks: 0
- Important tasks:
  - 202604171910-FN9AQ6: Unblock refactor pushes by formatting global pre-push offenders [score=5; topics=release,context,runner,policy_hooks]
  - 202604172036-V15617: Decompose release apply command into explicit phases [score=5; topics=release,prompts_agents]
  - 202604180617-8RSXN9: Migrate task command paths onto backend capability facade [score=5; topics=branch_pr,prompts_agents,cloud_sync]
  - 202604180617-SWBDDT: Adopt CommandResult for release and task commands [score=5; topics=release,prompts_agents,tests_quality]
  - 202604180701-Z8WS24: Reduce branch_pr lifecycle redundancy and document the optimized route [score=5; topics=branch_pr,policy_hooks,prompts_agents,docs_site]
  - 202604180703-66ZTF1: Auto-publish unpublished task branches during pr open [score=5; topics=release,prompts_agents,tests_quality]

## v0.3.14

- Range: 202604191130-JWBEB7 -> 202604191832-4F4P7G
- Tasks: 85
- Importance counts: 1=0, 2=0, 3=58, 4=13, 5=14
- Top topics: prompts_agents(85), tests_quality(31), docs_site(13), cloud_sync(11), release(8), runner(7), branch_pr(4), blueprints_recipes(4)
- Top tags: code(61), refactor(42), testkit(13), tooling(12), docs(11), cli(9), schemas(7), tests(6)
- Deep-extract candidates: 27; collapsed low-importance tasks: 0
- Important tasks:
  - 202604191130-JWBEB7: Prepare and ship patch release v0.3.15 [score=5; topics=release,prompts_agents,docs_site,tests_quality]
  - 202604191200-507P6G: Upgrade release workflows off deprecated Node 20 actions [score=5; topics=release,branch_pr,prompts_agents,docs_site]
  - 202604191200-G7YHZY: Avoid redundant manual close tails after hosted closure [score=5; topics=branch_pr,prompts_agents,tests_quality]
  - 202604191200-J57Q9H: Split release prepublish into fast and heavy phases [score=5; topics=release,prompts_agents,tests_quality]
  - 202604191200-MA7MQ4: Add fail-fast preflight for release candidate route [score=5; topics=release,prompts_agents,tests_quality]
  - 202604191200-WGK57W: Record hosted publish evidence in release task closure [score=5; topics=release,prompts_agents,cloud_sync,tests_quality]

## v0.3.15

- Range: 202604191958-284451 -> 202604201827-GZKGE3
- Tasks: 32
- Importance counts: 1=0, 2=0, 3=15, 4=13, 5=4
- Top topics: prompts_agents(32), policy_hooks(5), cloud_sync(4), docs_site(4), tests_quality(4), runner(4), release(3), branch_pr(1)
- Top tags: code(13), refactor(13), scripts(8), maintenance(4), docs(4), skills(4), runner(3), git(2)
- Deep-extract candidates: 17; collapsed low-importance tasks: 0
- Important tasks:
  - 202604192127-PDHAXC: Integrate remote branch divergence for epic-e push [score=5; topics=branch_pr,prompts_agents,cloud_sync]
  - 202604200949-N5N1V4: Migrate release utility scripts to script-runtime DSL [score=5; topics=release,prompts_agents]
  - 202604201745-RD18WW: Publish next patch release [score=5; topics=release,prompts_agents]
  - 202604201827-GZKGE3: Add release and packaging operator skill [score=5; topics=release,prompts_agents,docs_site]
  - 202604191958-284451: Fix task artifact refresh commit subject inheritance [score=4; topics=prompts_agents]
  - 202604192107-0K6Z7D: Resolve pre-push formatting drift on epic branch [score=4; topics=policy_hooks,prompts_agents]

## v0.3.16

- Range: 202604210856-0J4XZH -> 202604211316-X068RW
- Tasks: 63
- Importance counts: 1=0, 2=0, 3=48, 4=10, 5=5
- Top topics: prompts_agents(63), tests_quality(13), blueprints_recipes(6), policy_hooks(5), release(4), docs_site(4), runner(2), context(1)
- Top tags: code(51), cli(16), architecture(13), refactor(11), ci(8), tooling(8), testing(7), init(7)
- Deep-extract candidates: 15; collapsed low-importance tasks: 0
- Important tasks:
  - 202604210856-0J4XZH: Fix testkit workspace dependency drift [score=5; topics=release,prompts_agents,tests_quality]
  - 202604210858-4CBZRT: Pin Vitest and coverage provider exactly [score=5; topics=context,prompts_agents,tests_quality]
  - 202604210859-HCJQP0: Split hosted-close PR command pipeline [score=5; topics=branch_pr,prompts_agents]
  - 202604210900-FZWAPD: Prepare next patch release readiness gate [score=5; topics=release,prompts_agents]
  - 202604210900-RP5GA0: Decide legacy bridge removal policy for patch release [score=5; topics=release,policy_hooks,prompts_agents]
  - 202604210858-3JVPBT: Harden HTTP fetch timeout and retry behavior [score=4; topics=runner,prompts_agents]

## v0.3.17

- Range: 202604220254-53MF69 -> 202604221802-G29G0R
- Tasks: 65
- Importance counts: 1=0, 2=0, 3=42, 4=8, 5=15
- Top topics: prompts_agents(65), blueprints_recipes(19), tests_quality(14), docs_site(10), release(9), context(5), runner(3), cloud_sync(3)
- Top tags: prompt-assembly(31), v0.4(31), code(24), architecture(17), recipes(16), cli(13), testing(12), init(10)
- Deep-extract candidates: 23; collapsed low-importance tasks: 0
- Important tasks:
  - 202604220257-2VH414: Run final optimization verification and baseline refresh [score=5; topics=release,prompts_agents]
  - 202604220947-0B2X4Z: Integrate current local branches into main [score=5; topics=release,branch_pr,prompts_agents]
  - 202604221009-0432YA: Publish next patch release [score=5; topics=release,prompts_agents]
  - 202604221538-7G1S0Z: Epic D: Recipe prompt module integration [score=5; topics=branch_pr,blueprints_recipes,prompts_agents,docs_site]
  - 202604221538-CZH46Z: Epic B: Prompt graph compiler core [score=5; topics=context,prompts_agents,docs_site]
  - 202604221538-FSYGA6: Implement prompt graph resolver [score=5; topics=context,prompts_agents]

## v0.3.18

- Range: 202604221918-25GXRR -> 202604221918-TJ7SRW
- Tasks: 5
- Importance counts: 1=0, 2=0, 3=5, 4=0, 5=0
- Top topics: prompts_agents(5), tests_quality(5)
- Top tags: code(5), test(5)
- Deep-extract candidates: 0; collapsed low-importance tasks: 0

## v0.3.21

- Range: 202604230636-H2PK48 -> 202604231752-A45A6M
- Tasks: 28
- Importance counts: 1=0, 2=0, 3=11, 4=6, 5=11
- Top topics: prompts_agents(27), release(9), policy_hooks(6), tests_quality(6), branch_pr(2), blueprints_recipes(1), docs_site(1)
- Top tags: code(24), cli(6), hooks(5), release(4), testing(4), init(3), foundation(3), release-readiness(3)
- Deep-extract candidates: 17; collapsed low-importance tasks: 0
- Important tasks:
  - 202604230821-FBPNBM: Harden branch_pr worktree hook shim [score=5; topics=branch_pr,policy_hooks,prompts_agents]
  - 202604230838-CP7EZT: Add installed runtime smoke release gate [score=5; topics=release,prompts_agents,tests_quality]
  - 202604231014-P2GAAE: Publish next patch release after hardening merge [score=5; topics=release,prompts_agents]
  - 202604231144-JG06C2: Integrate v0.4 prompt branch [score=5; topics=branch_pr,prompts_agents]
  - 202604231315-2026C1: Audit CLI user flows and ship next patch release [score=5; topics=release,prompts_agents]
  - 202604231321-4GAFQ3: Publish v0.3.23 patch release [score=5; topics=release,prompts_agents]

## v0.3.22

- Range: 202604231823-3425P4 -> 202604231823-3425P4
- Tasks: 1
- Importance counts: 1=0, 2=0, 3=0, 4=0, 5=1
- Top topics: release(1), prompts_agents(1)
- Top tags: ci(1), release(1), v0.3(1)
- Deep-extract candidates: 1; collapsed low-importance tasks: 0
- Important tasks:
  - 202604231823-3425P4: Publish v0.3.24 patch release [score=5; topics=release,prompts_agents]

## v0.3.24

- Range: 202604240848-5S9FND -> 202604241538-EGVKSE
- Tasks: 28
- Importance counts: 1=0, 2=3, 3=10, 4=4, 5=11
- Top topics: prompts_agents(24), release(10), tests_quality(6), docs_site(5), blueprints_recipes(4), branch_pr(2)
- Top tags: v0.3(22), release(9), init(7), cli(6), docs(5), code(5), build(4), cleanup(4)
- Deep-extract candidates: 15; collapsed low-importance tasks: 3
- Important tasks:
  - 202604240906-GTSXAH: Publish init cached recipe crash hotfix [score=5; topics=release,blueprints_recipes,prompts_agents]
  - 202604240910-X6TQ4J: Refresh knip baseline for release prepublish [score=5; topics=release,prompts_agents,tests_quality]
  - 202604240923-QKP3HS: Format root audit markdown for release gate [score=5; topics=release,prompts_agents,docs_site]
  - 202604241136-CKSK2S: v0.3 freeze A2: remove prepare from package publish scripts [score=5; topics=release,prompts_agents]
  - 202604241136-F3ZYZJ: v0.3 freeze A1: prune agentplane package JS before bundling [score=5; topics=release,prompts_agents]
  - 202604241136-H753HG: v0.3 freeze A3: whitelist agentplane package files [score=5; topics=release,prompts_agents]

## v0.3.25

- Range: 202604241914-FRBSYS -> 202604241914-FRBSYS
- Tasks: 1
- Importance counts: 1=0, 2=0, 3=0, 4=0, 5=1
- Top topics: release(1), prompts_agents(1), docs_site(1)
- Top tags: code(1)
- Deep-extract candidates: 1; collapsed low-importance tasks: 0
- Important tasks:
  - 202604241914-FRBSYS: Harden release hygiene docs workflow scope and artifact gates [score=5; topics=release,prompts_agents,docs_site]

## v0.3.26

- Range: 202604250806-56MG2S -> 202604250806-56MG2S
- Tasks: 1
- Importance counts: 1=0, 2=0, 3=0, 4=0, 5=1
- Top topics: release(1), prompts_agents(1)
- Top tags: code(1), release(1), v0.3(1)
- Deep-extract candidates: 1; collapsed low-importance tasks: 0
- Important tasks:
  - 202604250806-56MG2S: Publish v0.3.27 patch release [score=5; topics=release,prompts_agents]

## v0.3.27

- Range: 202604251607-M3QMNP -> 202604261758-CE166W
- Tasks: 36
- Importance counts: 1=0, 2=1, 3=24, 4=7, 5=4
- Top topics: prompts_agents(35), tests_quality(6), runner(4), cloud_sync(2), blueprints_recipes(2), release(2), context(1), branch_pr(1)
- Top tags: refactor(30), code(29), knip(9), tooling(2), baseline(2), tests(2), testing(1), architecture(1)
- Deep-extract candidates: 11; collapsed low-importance tasks: 1
- Important tasks:
  - 202604251626-FQBWH9: Refactor command task-backend context [score=5; topics=context,prompts_agents,cloud_sync]
  - 202604251729-1F9PPF: Refactor PR check snapshot helpers [score=5; topics=branch_pr,prompts_agents]
  - 202604261629-FCG14T: Remove release preflight barrel [score=5; topics=release,prompts_agents]
  - 202604261758-CE166W: Publish next v0.3 patch release [score=5; topics=release,prompts_agents]
  - 202604251738-6DMWEY: Refactor runner task state helpers [score=4; topics=runner,prompts_agents]
  - 202604260631-WQHS79: Refactor process supervision helpers [score=4; topics=runner,prompts_agents]

## v0.3.28

- Range: 202604270744-R33QS8 -> 202604281616-WG87DQ
- Tasks: 13
- Importance counts: 1=0, 2=0, 3=2, 4=1, 5=10
- Top topics: prompts_agents(13), branch_pr(9), tests_quality(6), cloud_sync(5), docs_site(5), context(3), policy_hooks(3), release(2)
- Top tags: code(11), workflow(8), branch-pr(7), tooling(2), runner(1), cli(1), testing(1), docs(1)
- Deep-extract candidates: 11; collapsed low-importance tasks: 0
- Important tasks:
  - 202604270744-R33QS8: Switch workflow to branch_pr and audit task lifecycle [score=5; topics=branch_pr,prompts_agents]
  - 202604270852-3FX0AN: Type branch_pr PR artifact state [score=5; topics=branch_pr,prompts_agents,cloud_sync,tests_quality]
  - 202604270852-PR9VMK: Introduce branch_pr lifecycle context resolver [score=5; topics=branch_pr,context,policy_hooks,prompts_agents]
  - 202604270853-8D0EH8: Make branch_pr pr open transactional [score=5; topics=branch_pr,prompts_agents,cloud_sync,tests_quality]
  - 202604270854-ECZV49: Normalize remaining direct stdio output surfaces [score=5; topics=context,prompts_agents]
  - 202604270854-N1QDXW: Extract branch_pr testkit fixture builders [score=5; topics=branch_pr,prompts_agents,tests_quality]

## v0.3.29

- Range: 202604291531-1GHEJZ -> 202604301956-E94KR6
- Tasks: 37
- Importance counts: 1=0, 2=0, 3=13, 4=4, 5=20
- Top topics: prompts_agents(37), tests_quality(29), docs_site(21), release(11), policy_hooks(10), context(9), blueprints_recipes(9), runner(6)
- Top tags: prompt-assembly(23), code(22), release(9), docs(6), recipes(5), agents(4), policy(4), testing(4)
- Deep-extract candidates: 24; collapsed low-importance tasks: 0
- Important tasks:
  - 202604291531-864BKX: Add prompt graph diagnostics and drift checks [score=5; topics=context,prompts_agents,tests_quality]
  - 202604291531-N0H28A: Apply recipe prompt mutations to compiled graph [score=5; topics=release,context,blueprints_recipes,prompts_agents]
  - 202604291531-NXHDEH: Adopt runner prompt module bridge [score=5; topics=context,runner,blueprints_recipes,prompts_agents]
  - 202604291532-BV5NQT: Document and harden modular prompt migration [score=5; topics=context,runner,blueprints_recipes,prompts_agents]
  - 202604292006-D5KFK0: Harden incident findings and release evidence diagnostics [score=5; topics=release,policy_hooks,prompts_agents,docs_site]
  - 202604292023-0BQZMA: Migrate agent profiles to addressable prompt fragments [score=5; topics=branch_pr,prompts_agents,docs_site,tests_quality]

## v0.4.0

- Range: 202605010546-168YR1 -> 202605011918-JW3M0Z
- Tasks: 47
- Importance counts: 1=0, 2=0, 3=23, 4=6, 5=18
- Top topics: prompts_agents(45), docs_site(30), tests_quality(26), release(15), cloud_sync(10), blueprints_recipes(6), policy_hooks(5), branch_pr(4)
- Top tags: code(30), docs(14), release(10), frontend(3), ci(2), workflow(1)
- Deep-extract candidates: 24; collapsed low-importance tasks: 0
- Important tasks:
  - 202605010546-168YR1: Refresh launch landing and acquisition docs [score=5; topics=branch_pr,runner,policy_hooks,blueprints_recipes]
  - 202605010644-0B48D4: AP-02: Guard recipes runtime version parity [score=5; topics=release,blueprints_recipes,prompts_agents,tests_quality]
  - 202605010644-48TFEB: AP-03: Normalize prompt compiler context [score=5; topics=context,prompts_agents,tests_quality]
  - 202605010645-3W3EXR: AP-17: Run final refactor wave verification [score=5; topics=branch_pr,prompts_agents,tests_quality]
  - 202605010645-5H9FJ5: AP-15: Factor CI contract and release extras [score=5; topics=release,prompts_agents,docs_site,tests_quality]
  - 202605010645-JGXD12: AP-10: Split release apply tests [score=5; topics=release,prompts_agents,tests_quality]

## v0.4.1

- Range: 202605012054-HS993A -> 202605031524-SDCTFM
- Tasks: 68
- Importance counts: 1=1, 2=3, 3=15, 4=6, 5=43
- Top topics: prompts_agents(60), release(35), tests_quality(32), docs_site(27), cloud_sync(13), blueprints_recipes(12), branch_pr(9), policy_hooks(7)
- Top tags: code(42), release(31), workflow(17), docs(12), distribution(11), bun(10), recipes(7), ci(6)
- Deep-extract candidates: 49; collapsed low-importance tasks: 4
- Important tasks:
  - 202605012054-HS993A: Fix publish evidence GH auth [score=5; topics=release,prompts_agents,cloud_sync,tests_quality]
  - 202605012059-GWA2MF: Implement CLI performance benchmark framework [score=5; topics=branch_pr,runner,prompts_agents,docs_site]
  - 202605012125-PXYEPC: Automate external distribution repo publishing [score=5; topics=release,prompts_agents,cloud_sync,tests_quality]
  - 202605012143-NEK3E8: Fix Homebrew formula npm install [score=5; topics=release,prompts_agents,tests_quality]
  - 202605021412-1TG306: Document standalone release channel operations [score=5; topics=release,docs_site]
  - 202605021412-3KA8WV: Extend release distribution manifest with standalone assets [score=5; topics=release,prompts_agents,tests_quality]

## v0.4.2

- Range: 202605031535-633VCY -> 202605032112-19AZ8M
- Tasks: 58
- Importance counts: 1=0, 2=19, 3=21, 4=6, 5=12
- Top topics: docs_site(38), prompts_agents(34), release(10), tests_quality(9), cloud_sync(9), policy_hooks(6), branch_pr(3), context(2)
- Top tags: docs(26), code(19), cli(7), readme(7), website(5), infra(5), github(4), git(3)
- Deep-extract candidates: 18; collapsed low-importance tasks: 19
- Important tasks:
  - 202605031624-H1PV7F: ACR v0.1 task graph and base synchronization [score=5; topics=context,prompts_agents,cloud_sync]
  - 202605031626-QPTPBD: ACR docs examples and release gates [score=5; topics=release,docs_site]
  - 202605031737-9A4FWX: Make DCO multi-author safe and optionalize tasks export snapshot [score=5; topics=branch_pr,policy_hooks,prompts_agents,docs_site]
  - 202605031856-V5KXGG: ACR docs and release checks refresh [score=5; topics=release,docs_site]
  - 202605031908-5E28XJ: T15: Prepare docs-only 0.4.3 patch publish [score=5; topics=release,prompts_agents,docs_site]
  - 202605031908-5MH36B: T14: Backfill 0.4.1 release blog companion [score=5; topics=release,docs_site]

## v0.4.3

- Range: 202605040755-KF1EWC -> 202605050639-SK2B26
- Tasks: 32
- Importance counts: 1=0, 2=4, 3=5, 4=11, 5=12
- Top topics: prompts_agents(27), docs_site(23), tests_quality(15), cloud_sync(11), branch_pr(10), policy_hooks(8), blueprints_recipes(6), release(4)
- Top tags: code(18), docs(11), workflow(5), doctor(4), performance(4), cli(3), release(2), assets(2)
- Deep-extract candidates: 23; collapsed low-importance tasks: 4
- Important tasks:
  - 202605040756-SV9YYN: Align ACR example version with release [score=5; topics=release,prompts_agents]
  - 202605041618-E011A7: Improve doctor performance and progress [score=5; topics=branch_pr,prompts_agents,cloud_sync,tests_quality]
  - 202605041805-1SY9WX: Add experimental ap agent mode [score=5; topics=branch_pr,runner,policy_hooks,prompts_agents]
  - 202605041828-1XBD16: Batch branch_pr doctor git checks [score=5; topics=branch_pr,prompts_agents]
  - 202605042000-Y8B7V1: Generate per-doc social images [score=5; topics=release,branch_pr,runner,policy_hooks]
  - 202605042118-7F28YM: Release v0.4.4 with Bun binaries [score=5; topics=release,prompts_agents]

## v0.4.4

- Range: 202605050754-QFTZAD -> 202605121718-Q4N03A
- Tasks: 173
- Importance counts: 1=0, 2=1, 3=80, 4=26, 5=66
- Top topics: prompts_agents(149), blueprints_recipes(129), tests_quality(89), docs_site(62), branch_pr(46), cloud_sync(42), policy_hooks(23), runner(20)
- Top tags: code(116), blueprints(61), v05(27), docs(20), workflow(20), cli(18), recipes(14), backend(11)
- Deep-extract candidates: 92; collapsed low-importance tasks: 1
- Important tasks:
  - 202605050754-QFTZAD: Generate Obsidian task navigation [score=5; topics=release,policy_hooks,blueprints_recipes,prompts_agents]
  - 202605051359-R5XAZG: Require incident cleanup before release tasks [score=5; topics=release,policy_hooks,prompts_agents,docs_site]
  - 202605051529-S59Z44: Commit automatic ACR artifacts on finish [score=5; topics=branch_pr,prompts_agents,tests_quality]
  - 202605051735-RATKYP: Document cloud backend model [score=5; topics=branch_pr,docs_site,cloud_sync]
  - 202605051806-BW1M39: Document cloud backend integration contract [score=5; topics=branch_pr,docs_site,cloud_sync]
  - 202605051806-RZ8SA1: Add cloud backend init contract [score=5; topics=branch_pr,blueprints_recipes,prompts_agents,docs_site]

## v0.5.0

- Range: 202605130159-JBY9JS -> 202605141942-R7ZZE0
- Tasks: 80
- Importance counts: 1=0, 2=0, 3=23, 4=7, 5=50
- Top topics: prompts_agents(80), tests_quality(59), blueprints_recipes(52), docs_site(41), cloud_sync(32), context(28), policy_hooks(18), branch_pr(18)
- Top tags: code(61), cli(14), context(13), backend(9), release(8), docs(8), workflow(7), bug(7)
- Deep-extract candidates: 57; collapsed low-importance tasks: 0
- Important tasks:
  - 202605130159-JBY9JS: Implement local context contract [score=5; topics=context,prompts_agents]
  - 202605130501-4B49ZZ: Prepare v0.6 context release readiness [score=5; topics=release,context,policy_hooks,blueprints_recipes]
  - 202605130758-4FB61V: Fix release notes template leakage [score=5; topics=release,blueprints_recipes,prompts_agents,docs_site]
  - 202605130823-5SM92P: Improve Agentplane PR merge messages with structured human-readable summaries [score=5; topics=branch_pr,context,policy_hooks,blueprints_recipes]
  - 202605130823-WSWNSC: Persist GitHub PR identity for open branch_pr artifacts [score=5; topics=branch_pr,policy_hooks,blueprints_recipes,prompts_agents]
  - 202605130947-V6846F: Optimize CLI read-heavy startup paths [score=5; topics=context,blueprints_recipes,prompts_agents,docs_site]

## v0.6.0

- Range: 202605141954-8DZF9S -> 202605150704-5TCB66
- Tasks: 11
- Importance counts: 1=0, 2=0, 3=2, 4=3, 5=6
- Top topics: prompts_agents(11), docs_site(9), blueprints_recipes(7), context(4), tests_quality(2), release(2), policy_hooks(2), runner(1)
- Top tags: frontend(6), docs(4), code(4), bug(2), release(2), workflow(1), website(1), quality(1)
- Deep-extract candidates: 9; collapsed low-importance tasks: 0
- Important tasks:
  - 202605141954-8DZF9S: Polish OSS website trust surface [score=5; topics=context,blueprints_recipes,prompts_agents,docs_site]
  - 202605142055-F5M77X: Release AgentPlane v0.6.1 [score=5; topics=release,branch_pr,policy_hooks,blueprints_recipes]
  - 202605142104-T42JAK: Clean up blog typography [score=5; topics=context,blueprints_recipes,prompts_agents,docs_site]
  - 202605142118-GZ5WWK: Clarify wiki glossary and cross-link guidance [score=5; topics=context,blueprints_recipes,prompts_agents,docs_site]
  - 202605150000-GNXMCA: Fix v0.6.1 publish payload drift [score=5; topics=release,prompts_agents]
  - 202605150704-5TCB66: Geist typography and website/blog layout refresh [score=5; topics=context,prompts_agents,docs_site]

## v0.6.1

- Range: 202605151620-CTX0 -> 202605181255-29XQ07
- Tasks: 51
- Importance counts: 1=0, 2=1, 3=1, 4=10, 5=39
- Top topics: prompts_agents(50), blueprints_recipes(27), tests_quality(24), docs_site(23), context(19), branch_pr(18), release(18), policy_hooks(16)
- Top tags: code(43), context(14), workflow(13), bug(8), cli(7), security(7), release(7), init(4)
- Deep-extract candidates: 49; collapsed low-importance tasks: 1
- Important tasks:
  - 202605151620-CTX0: Fix context init: decouple minimal profile from universal wiki hierarchy [score=5; topics=context,prompts_agents]
  - 202605170657-EDT46B: Harden Claude branch_pr merge guidance [score=5; topics=branch_pr,prompts_agents]
  - 202605170721-BTF484: Add llm-wiki page metadata and helper commands [score=5; topics=branch_pr,context,prompts_agents]
  - 202605170721-BY03BX: Make context init guide adaptive wiki setup [score=5; topics=branch_pr,context,prompts_agents]
  - 202605170721-ESJ0SW: Add portable context assimilation prompts [score=5; topics=branch_pr,context,prompts_agents]
  - 202605170722-YP81RG: Document and test adaptive context curation flow [score=5; topics=branch_pr,context,prompts_agents,tests_quality]

## v0.6.2

- Range: 202605181809-QSASEA -> 202605191451-TFBJEG
- Tasks: 18
- Importance counts: 1=0, 2=0, 3=1, 4=2, 5=15
- Top topics: prompts_agents(18), blueprints_recipes(14), docs_site(13), release(12), tests_quality(11), context(8), cloud_sync(5), runner(4)
- Top tags: code(14), context(6), workflow(6), release(5), docs(4), frontend(2), website(2), bug(2)
- Deep-extract candidates: 17; collapsed low-importance tasks: 0
- Important tasks:
  - 202605181809-QSASEA: Reframe docs around agent-first usage [score=5; topics=release,runner,blueprints_recipes,prompts_agents]
  - 202605181816-3W350X: Add maximum context assimilation mode [score=5; topics=release,context,policy_hooks,blueprints_recipes]
  - 202605181851-NJQR4S: Implement Agentplane website redesign backlog [score=5; topics=release,branch_pr,context,runner]
  - 202605181904-RC91FT: Fix v0.6 follow-up GitHub issues [score=5; topics=context,runner,blueprints_recipes,prompts_agents]
  - 202605190630-SK1MR7: Reconcile stale DOING task registry [score=5; topics=release,prompts_agents,docs_site]
  - 202605190828-MDXT5W: Repair website star gateway and docs IA [score=5; topics=release,blueprints_recipes,prompts_agents,docs_site]

## v0.6.3

- Range: 202605191535-WB10QC -> 202605201800-3CCXD9
- Tasks: 24
- Importance counts: 1=0, 2=0, 3=4, 4=1, 5=19
- Top topics: prompts_agents(23), blueprints_recipes(19), tests_quality(16), docs_site(13), release(10), branch_pr(9), context(8), cloud_sync(5)
- Top tags: code(20), workflow(9), context(7), docs(4), release(4), ci(3), evidence(3), github(3)
- Deep-extract candidates: 20; collapsed low-importance tasks: 0
- Important tasks:
  - 202605191535-WB10QC: Make local test routing more flexible and observable [score=5; topics=release,blueprints_recipes,prompts_agents,docs_site]
  - 202605191618-YJFGND: Refresh evidence bundle during hosted close [score=5; topics=branch_pr,runner,blueprints_recipes,prompts_agents]
  - 202605191703-PYJMMV: Make maximum assimilation source-shaped and Obsidian-compatible [score=5; topics=release,branch_pr,context,blueprints_recipes]
  - 202605191825-3PV3QF: Split GitHub PR verification into routed parallel gates [score=5; topics=release,blueprints_recipes,prompts_agents,cloud_sync]
  - 202605200626-Q0VM6Y: Add source-shaped topology gate [score=5; topics=release,context,blueprints_recipes,prompts_agents]
  - 202605200640-7AXZRX: Add observations issue triage dev script [score=5; topics=context,prompts_agents,cloud_sync]

## v0.6.4

- Range: 202605210633-3ZGMA1 -> 202605211431-A5GBYT
- Tasks: 8
- Importance counts: 1=0, 2=0, 3=1, 4=1, 5=6
- Top topics: blueprints_recipes(8), prompts_agents(7), docs_site(5), release(5), context(5), tests_quality(5), cloud_sync(4), policy_hooks(2)
- Top tags: code(6), context(3), docs(2), frontend(1), website(1), init(1), wiki(1), ci(1)
- Deep-extract candidates: 7; collapsed low-importance tasks: 0
- Important tasks:
  - 202605210655-CF0BDW: Align website design source and docs routing [score=5; topics=release,blueprints_recipes,prompts_agents,docs_site]
  - 202605210819-HMKXDR: Default context init to maximum assimilation [score=5; topics=context,blueprints_recipes,prompts_agents,docs_site]
  - 202605210858-VEZQYS: Harden Obsidian context wiki links and source notes [score=5; topics=release,context,policy_hooks,blueprints_recipes]
  - 202605211025-P8N5XR: Harden recent issue candidates [score=5; topics=release,context,blueprints_recipes,prompts_agents]
  - 202605211039-QZXN8Q: Fix open context GitHub issues [score=5; topics=release,context,blueprints_recipes,prompts_agents]
  - 202605211431-A5GBYT: Release AgentPlane v0.6.5 [score=5; topics=release,branch_pr,context,policy_hooks]

## v0.6.5

- Range: 202605220959-6R6Y21 -> 202605222302-CC7XZ9
- Tasks: 40
- Importance counts: 1=0, 2=0, 3=11, 4=5, 5=24
- Top topics: prompts_agents(40), tests_quality(23), branch_pr(13), release(11), cloud_sync(10), docs_site(9), blueprints_recipes(6), policy_hooks(5)
- Top tags: code(37), workflow(33), cli(10), release(9), ci(7), github(5), git(4), tasks(4)
- Deep-extract candidates: 29; collapsed low-importance tasks: 0
- Important tasks:
  - 202605221046-C2M96D: Amend refreshed task artifacts after commit [score=5; topics=branch_pr,blueprints_recipes,prompts_agents,cloud_sync]
  - 202605221340-G8VYEJ: Release AgentPlane v0.6.6 [score=5; topics=release,branch_pr,runner,blueprints_recipes]
  - 202605221715-2Z8PE2: Automate release publish recovery after transient main CI failure [score=5; topics=release,prompts_agents]
  - 202605221715-424TFE: Cache release prepublish proof by tree digest [score=5; topics=release,policy_hooks,prompts_agents,docs_site]
  - 202605221715-A443Q7: Harden release fetch against stale local tags [score=5; topics=release,prompts_agents]
  - 202605221715-E6HQJ1: Print release-ready resolver diagnostics in publish workflow [score=5; topics=release,prompts_agents]

## v0.6.6

- Range: 202605222339-RZVQJ9 -> 202605231100-W8XDSA
- Tasks: 16
- Importance counts: 1=0, 2=0, 3=4, 4=0, 5=12
- Top topics: prompts_agents(14), tests_quality(13), release(9), branch_pr(5), docs_site(5), cloud_sync(5), policy_hooks(3), blueprints_recipes(3)
- Top tags: code(10), release(9), workflow(7), docs(4), quality(3), performance(1), cli(1), tasks(1)
- Deep-extract candidates: 12; collapsed low-importance tasks: 0
- Important tasks:
  - 202605230049-AFT9YW: Narrow hosted close PR local CI route [score=5; topics=branch_pr,prompts_agents,tests_quality]
  - 202605230332-RYW28Y: Route agent context guidance through task brief [score=5; topics=context,policy_hooks,blueprints_recipes,prompts_agents]
  - 202605230451-N5F0HY: Release v0.6.7 [score=5; topics=release,branch_pr,docs_site]
  - 202605230546-RS539J: Release v0.6.7 [score=5; topics=release,branch_pr,policy_hooks,blueprints_recipes]
  - 202605230709-SKBRHW: Refresh docs social image assets for release check [score=5; topics=release,docs_site]
  - 202605230831-AFG753: Strict release task registry hidden artifact scan [score=5; topics=release,prompts_agents,tests_quality]

## v0.6.7

- Range: 202605231457-ARR2RR -> 202605231744-WJT2KR
- Tasks: 5
- Importance counts: 1=0, 2=0, 3=1, 4=0, 5=4
- Top topics: prompts_agents(5), docs_site(4), tests_quality(3), release(2), blueprints_recipes(2), branch_pr(2), cloud_sync(2), context(1)
- Top tags: docs(3), context(1), website(1), ci(1), frontend(1), code(1), workflow(1)
- Deep-extract candidates: 4; collapsed low-importance tasks: 0
- Important tasks:
  - 202605231457-ARR2RR: Refactor public docs IA and harden docs site navigation checks [score=5; topics=release,context,blueprints_recipes,prompts_agents]
  - 202605231550-PAPWWJ: Improve docs usability and agent-agnostic workflow guides [score=5; topics=branch_pr,runner,policy_hooks,blueprints_recipes]
  - 202605231607-GG23PT: Optimize GitHub CI routing and docs deploy efficiency [score=5; topics=release,prompts_agents,docs_site,cloud_sync]
  - 202605231744-WJT2KR: Avoid extra branch_pr artifact commit on PR open [score=5; topics=branch_pr,prompts_agents,tests_quality]

## v0.6.8

- Range: 202605231749-X9B9NE -> 202605241224-TPWJQZ
- Tasks: 12
- Importance counts: 1=0, 2=0, 3=2, 4=2, 5=8
- Top topics: prompts_agents(12), docs_site(8), tests_quality(8), branch_pr(5), context(5), cloud_sync(5), policy_hooks(5), blueprints_recipes(4)
- Top tags: code(7), frontend(3), cli(3), workflow(3), context(2), github(2), cognitive-load(1), prompt(1)
- Deep-extract candidates: 10; collapsed low-importance tasks: 0
- Important tasks:
  - 202605231803-M9TK2M: Fix agent context cognitive-load regressions [score=5; topics=branch_pr,context,prompts_agents,cloud_sync]
  - 202605231849-TRN34K: Fix maximum assimilation process rough edges [score=5; topics=release,context,blueprints_recipes,prompts_agents]
  - 202605231953-7EJ5GX: Sync agent prompt guidance with compact context commands [score=5; topics=branch_pr,context,runner,policy_hooks]
  - 202605232007-BSW9VX: Use linear PR merges and clean hosted-close messages [score=5; topics=branch_pr,policy_hooks,prompts_agents,docs_site]
  - 202605232011-MAW1PK: Implement executable evaluator quality review [score=5; topics=branch_pr,blueprints_recipes,prompts_agents,docs_site]
  - 202605240708-K9R164: Fix recent branch_pr issue candidates [score=5; topics=release,branch_pr,context,runner]

## v0.6.9

- Range: 202605250929-N9FJB1 -> 202605260907-2F52BD
- Tasks: 11
- Importance counts: 1=0, 2=0, 3=1, 4=3, 5=7
- Top topics: prompts_agents(11), tests_quality(10), policy_hooks(5), release(3), cloud_sync(3), branch_pr(3), context(2), blueprints_recipes(2)
- Top tags: code(10), branch_pr(3), refactor(2), git(2), hooks(2), upgrade(1), cli(1), performance(1)
- Deep-extract candidates: 10; collapsed low-importance tasks: 0
- Important tasks:
  - 202605251818-28Z5H1: Reduce redundancy in AgentPlane code [score=5; topics=release,context,policy_hooks,blueprints_recipes]
  - 202605251929-JZ4VPD: Optimize branch_pr pr check artifact fallback [score=5; topics=branch_pr,prompts_agents,cloud_sync,tests_quality]
  - 202605251936-1HC32Z: Fix active task selector projection fallback [score=5; topics=branch_pr,prompts_agents,cloud_sync,tests_quality]
  - 202605251945-BGE4V3: Normalize stale branch_pr integration queue entries [score=5; topics=branch_pr,prompts_agents,tests_quality]
  - 202605251947-63FTP6: Reduce low-risk duplicate implementation paths [score=5; topics=release,prompts_agents]
  - 202605252058-3Q9G73: Expand commit subject naming coverage [score=5; topics=context,policy_hooks,prompts_agents,tests_quality]

## v0.6.10

- Range: 202605270820-6AM6AH -> 202605280932-HJC244
- Tasks: 12
- Importance counts: 1=0, 2=0, 3=2, 4=4, 5=6
- Top topics: prompts_agents(12), tests_quality(11), docs_site(6), blueprints_recipes(6), runner(5), policy_hooks(4), branch_pr(4), release(2)
- Top tags: code(9), workflow(4), runner(2), docs(1), codex(1), branch_pr(1), git(1), ops(1)
- Deep-extract candidates: 10; collapsed low-importance tasks: 0
- Important tasks:
  - 202605271730-QSZ1R3: Harden patch-release workflow ergonomics [score=5; topics=release,branch_pr,blueprints_recipes,prompts_agents]
  - 202605271737-1K3J53: Strengthen task route oracle [score=5; topics=branch_pr,prompts_agents,tests_quality]
  - 202605271932-22VJM6: Teach agent prompts route oracle fields [score=5; topics=branch_pr,runner,blueprints_recipes,prompts_agents]
  - 202605280743-P4J3DQ: Gate context policy during upgrade [score=5; topics=context,policy_hooks,prompts_agents,tests_quality]
  - 202605280849-V3BV1D: Prepare next patch release [score=5; topics=release,branch_pr,policy_hooks,blueprints_recipes]
  - 202605280932-HJC244: Fix pre-push historical commit policy upgrade mismatch [score=5; topics=context,policy_hooks,prompts_agents,tests_quality]

## v0.6.11

- Range: 202605281326-GQ43NN -> 202605290732-0XREE3
- Tasks: 65
- Importance counts: 1=0, 2=0, 3=32, 4=8, 5=25
- Top topics: prompts_agents(65), tests_quality(13), context(12), blueprints_recipes(12), branch_pr(11), runner(10), docs_site(7), policy_hooks(6)
- Top tags: hotspot(47), code(43), refactor(39), agent-efficiency(6), context(4), runner(3), evaluator(3), release(3)
- Deep-extract candidates: 33; collapsed low-importance tasks: 0
- Important tasks:
  - 202605281326-GQ43NN: Handle context verify-task non-context skip [score=5; topics=context,prompts_agents,tests_quality]
  - 202605281632-XW33V9: Remove runtime tasks.json dependencies [score=5; topics=release,branch_pr,prompts_agents,docs_site]
  - 202605281707-51DD0G: Route packet v2 for agent next-action surfaces [score=5; topics=branch_pr,runner,blueprints_recipes,prompts_agents]
  - 202605281707-VP74QA: Provider lane hardening for PR and release tails [score=5; topics=release,branch_pr,prompts_agents]
  - 202605281713-EW6N63: Optimize prompt policy surfaces [score=5; topics=branch_pr,runner,policy_hooks,blueprints_recipes]
  - 202605281714-VX8QQ2: Decouple prompt assembly from optional local context [score=5; topics=context,runner,prompts_agents,docs_site]

## v0.6.12

- Range: 202605291005-SH2QS1 -> 202605311941-K4FCKS
- Tasks: 11
- Importance counts: 1=0, 2=0, 3=1, 4=5, 5=5
- Top topics: prompts_agents(11), tests_quality(9), policy_hooks(6), docs_site(6), branch_pr(5), cloud_sync(5), blueprints_recipes(4), release(2)
- Top tags: code(10), bug(3), frontend(1), website(1), feedback(1), hooks(1), git(1), lifecycle(1)
- Deep-extract candidates: 10; collapsed low-importance tasks: 0
- Important tasks:
  - 202605291005-SH2QS1: Fix social preview subtitle slogan [score=5; topics=release,branch_pr,context,runner]
  - 202605291916-5Q6T1E: Add provider-neutral task sync envelope [score=5; topics=branch_pr,policy_hooks,blueprints_recipes,prompts_agents]
  - 202605291949-5NBC1A: Remove direct Redmine task backend [score=5; topics=branch_pr,context,prompts_agents,docs_site]
  - 202605311805-PWSTQ5: Release AgentPlane v0.6.13 [score=5; topics=release,branch_pr,policy_hooks,blueprints_recipes]
  - 202605311941-K4FCKS: Design and scaffold Hermes adapter [score=5; topics=branch_pr,blueprints_recipes,prompts_agents,docs_site]
  - 202605291916-YGJASQ: Add remote task import policy for cloud backend [score=4; topics=policy_hooks,prompts_agents,cloud_sync]

## v0.6.13

- Range: 202606010508-88AVPY -> 202606011811-JSY2B9
- Tasks: 10
- Importance counts: 1=0, 2=0, 3=1, 4=3, 5=6
- Top topics: prompts_agents(8), docs_site(7), tests_quality(5), release(5), blueprints_recipes(3), context(3), cloud_sync(2), runner(2)
- Top tags: code(4), docs(3), release(3), assimilation(3), context(3), hermes(2), runner(2), task-history(2)
- Deep-extract candidates: 9; collapsed low-importance tasks: 0
- Important tasks:
  - 202606010746-089WQK: Refresh Hermes docs social images for patch release [score=5; topics=release,blueprints_recipes,prompts_agents,docs_site]
  - 202606010945-5ZHGFA: Prepare v0.6.14 patch release documentation [score=5; topics=release,docs_site]
  - 202606010958-KRTN4Z: Refresh v0.6.14 release social assets [score=5; topics=release,docs_site]
  - 202606011717-C22C3X: Initialize maximum assimilation context layer [score=5; topics=context,policy_hooks,prompts_agents,docs_site]
  - 202606011809-VCQPP7: Assimilate task history by version summaries [score=5; topics=release,context,prompts_agents]
  - 202606011811-JSY2B9: Assimilate task history by version summaries [score=5; topics=release,context,prompts_agents]

## Sources

1. [.agentplane/tasks](../../.agentplane/tasks)
2. [.agentplane/context/agentplane.context.yaml](../../.agentplane/context/agentplane.context.yaml)

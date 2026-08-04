# External audit assessment for v0.7.1

Source reviewed: the user-supplied audit comparing the published `v0.7.0` surface with the intended CLI-authoritative, semantically bounded AgentPlane model.

## Release-blocking findings

No new release-blocking product defect was confirmed against the current `v0.7.1` candidate. The audit's P0 recommendations are already enforced by `scripts/qualification/check-v0.7.1-product-contract.mjs` and the frozen provider qualification.

| Audit finding | Current candidate evidence | Decision |
| --- | --- | --- |
| Managed supervision is hidden | `task run` is publicly executable and is one of 11 canonical help operations. | Resolved in 0.7.1 |
| External agents still perform lifecycle choreography | `task advance --agent-json` executes bounded deterministic transitions and returns one compact semantic or authority boundary. The packet is capped at 2,048 bytes and rejects Git/PR/verify/finish/integrate/cleanup choreography. | Resolved in 0.7.1 |
| `task begin` invents and approves a semantic plan | New tasks contain an unapprovable planning placeholder and stop at `agent.planning` with `semantic_input_required`; `task begin` is compatibility-only. | Resolved in 0.7.1 |
| `task complete` can turn an executor claim into verification | Normal completion requires prior verification, independent review, and an observed runner receipt. Missing observed evidence is available only through an explicit unsafe, confirmation-gated compatibility override. | Resolved in 0.7.1 |
| README and quickstart teach the old lifecycle | README presents `task new` -> `task advance --agent-json` -> `task run`; compatibility shortcuts are absent from the default flow. | Resolved in 0.7.1 |
| Default command surface is too large | Canonical `help --json` exposes 11 operations; compatibility, repair, release, and maintainer commands remain available on demand. | Resolved in 0.7.1 |
| CLI package retains a large unused-code baseline | The current Knip gate reports zero unused files/exports/types for the CLI package. The remaining 21 findings are explicitly bounded core compatibility exports/types. | Resolved in 0.7.1 |
| Compatibility adapters have no retirement inventory | `doctor legacy --json` reports 12 adapters from a validated manifest with owner, introduction/deprecation/removal state, migration command, and usage probe. | Resolved in 0.7.1 |
| Repeated evidence grows without compaction | Evaluator immutable inputs use a task-local content-addressed store; duplicate raw qualification logs were removed while compact `output_tail`, reports, receipts, and hashes remain authoritative. | Patch scope resolved; broader retention backends remain future work |
| Public release notes duplicate the full qualification ledger | User-facing notes are concise and the complete 287-commit ledger is collapsed below the normal reading surface. | Resolved in 0.7.1 |

## Efficiency check

- Frozen provider gate: 50 replay runs / 55 provider episodes, 0 blockers.
- Total tokens: 9,070,337 -> 6,356,376 (`29.921280763879005%` reduction).
- Verified success: 5 -> 20; rework: 36 -> 25; scope violations: 20 -> 5; golden mismatches: 46 -> 10.
- Harness setup mean: 7,432.88 ms -> 6,709.04 ms (`9.74%` faster).
- Time to first scoped mutation mean: 46,666.43 ms -> 29,363.33 ms (`37.08%` faster).
- Time to verified result mean: 62,945.40 ms -> 59,457.85 ms (`5.54%` faster).
- Matched CLI latency and both supervisor frontends pass their median and p95 gates. The absolute wall-time probe still reports advisory misses for `task next` and `preflight quick`; it is not a functional failure or a regression against the matched baseline, and the release notes make no unsupported absolute-latency claim.

## Deferred architecture work

- Splitting maintainer tooling into another package remains a possible 0.8 simplification, but the current default help already hides that surface. A package split is not justified as a patch-release blocker without package-size, startup, or compatibility evidence.
- Replacing line-count hotspot gates with composite complexity/cohesion metrics is a maintainer-quality follow-up, not a demonstrated v0.7.1 runtime defect.
- Repository-wide evidence retention and optional external object storage remain bounded follow-up work; the release already deduplicates the highest-cost immutable evaluator evidence and rejects volatile tracked logs.

## Gate regression found while assessing the candidate

The release-ci suite exposed a stale direct-supervision fixture that created a task without a semantic plan but expected the approval boundary. The current contract correctly returned `semantic_input_required`. The fixture now records a task-specific unapproved plan before asserting `approval_required`; no runtime code changed and the targeted test passes.

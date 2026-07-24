# AgentPlane 0.7.0-alpha.1 qualification evidence

Reviewed SHA: `35e4925a7d8797f349775a5cfc76f94c63d3070d`

## Dependency fan-in

Every declared dependency is `DONE`, has `verification=ok`, has an evaluator-supplied
`quality_review=pass`, carries a `closed_before_merge` pre-merge closure, and is represented by a
merged PR whose `PR verification` and `Task Hosted Close` checks completed successfully. Every merge
commit below is an ancestor of the reviewed SHA.

| Task | PR | Merge commit |
| --- | ---: | --- |
| `202607221846-4CE7EG` | #4604 | `103214d38e75441a978e3bdd9f268ab729af6507` |
| `202607221846-4VB97J` | #4599 | `3f75a8a1ec4c99ab528ad047303a5fb18b68ef7f` |
| `202607221846-9XC1H0` | #4607 | `4a69a44a25b7c9c6ef801ad584a18930d03955fe` |
| `202607221846-C2XADX` | #4606 | `a351c1793ba77b16d4345ae326ae3e04b28d4de9` |
| `202607221846-SXJ75T` | #4597 | `5e4f067fd5d1d3ef9238540231ce9306133b4161` |
| `202607221846-Y89CFB` | #4605 | `a4a5a8ade3166ed142c1075fa8dad0878b061440` |
| `202607221846-YGWMA2` | #4600 | `7747672d891c524ffa7bdb22d0a85b5e1348b01e` |
| `202607221846-ZAENM6` | #4598 | `0e2d4b1c6523ce05df2532a2eadd6e79911a79e9` |
| `202607222129-1ZQHJD` | #4602 | `b2f6272f5410c97dcd235d691ac64b77e8759048` |
| `202607230554-YFYT83` | #4601 | `d7a29cb4d82a1dec87f35cb539364826b25d358e` |

The merged RF-03 head also passed the complete `main` Core CI push workflow on
`4a69a44a25b7c9c6ef801ad584a18930d03955fe`, including contract, static, unit, critical CLI,
workflow, coverage, Windows, release-ready, and aggregate PR verification jobs.

## Deterministic gates

| Command | Result | Evidence |
| --- | --- | --- |
| `bun run test:critical` | pass | 11/11 critical CLI chunks; 71 tests passed |
| `bun run schemas:check` | pass | `schemas OK` |
| `bun run guards:check` | pass | shared guards OK; trust-boundary ratchet OK |
| `bun run ci:contract` | pass | format, schemas, spec examples, release parity, compatibility, baselines, lifecycle, guards, lint, architecture, clones, knip, and coverage thresholds passed |
| `bun run bench:agent-efficiency:replay:check` | pass | 50/50 runs, 70/70 outcomes, 27/27 provider-token cells, and 170/170 scalar cells |

No provider episode was invoked during this gate. The RF-04 replay was rebuilt from the immutable
stored evidence only.

## Metric comparison

- The frozen pre-0.7 structural baseline remains exact: 10 scenarios, 10 measured cost metrics, and
  structural digest
  `sha256:a9b855c5887f697c21690d7386c627c555f8d46d7b083cab8c54636411e47351`.
- The replay structural digest remains
  `sha256:006ddc6d2b8e8c350a879edeb7140d36dbbd31c0c745b96f57792871b9099ee4`; the diagnostic digest
  remains `sha256:01c7b81828826b44d18d0b6a26288ac62b031cf4e30242a421f77ec37b2ca44e`.
- The frozen replay records 300 golden matches and 50 known mismatches across 350 outcome cells.
  The mismatches are confined to the pre-0.7 `direct`, `branch_pr`, `evaluator_rework`, and
  `hermes_one_step` controls. They are baseline deficits, not a new alpha.1 regression.
- Alpha.1 makes no token, latency, or verified-success improvement claim. Timing remains
  diagnostic-only because only one historical direct sample is comparable. Therefore no safety or
  success regression is hidden behind a claimed cost improvement.
- Compatibility remains cumulative and explicit:
  `agentplane.compatibility.v0.7.cumulative` is approved, published 0.6.24 truth is frozen, and the
  contract check reports the known `agent_facing_context_contracts` delta rather than silently
  accepting it.

## Residual risks

1. Persisted RF-03 execution receipts remain diagnostic-only; authenticated supervisor observation
   handoff is still required before the beta.1 gate.
2. The frozen provider replay describes pre-0.7 behavior and cannot by itself prove improved
   end-to-end success for alpha.1.
3. Timing comparison is intentionally unavailable until later waves produce repeated comparable
   samples.
4. The immutable RF-04 v1 capture remains sensitive to a Git auto-maintenance race on Linux. The
   offline replay is deterministic; changing the production harness requires a versioned v2 capture
   rather than rewriting stored provenance.
5. Nineteen reviewed trust-boundary violations remain ratcheted. They are assigned to later RF-05,
   RF-24, RF-25, and RF-27 work and may not increase.

## Decision

**Qualification: pass.**

All alpha.1 dependencies and mandatory gates are complete on one reviewed SHA, with no unreviewed
contract, safety, or quality regression.

**Publication: do not publish `0.7.0-alpha.1`.**

This milestone establishes the trust and compatibility foundation but does not yet expose the typed
work-order and shared-supervisor surfaces needed for useful external integration testing.
Qualification alone opens the alpha.2 wave without creating a low-value prerelease artifact.

# Agent efficiency comparison: VN1FN4

The implementation provides selective context loading, safe service-artifact commit coalescing, shared canonical result schemas and native final lifecycle transitions. Provider-token savings are **not established**. Generated schema parity is synchronized and verified; the report does not establish provider-token savings.

## Source and measurement boundary

The before and after repository snapshots both measure committed source `92efd467a7b045e7e784597168ac21bd41a975a1` with identical selection and measurement code. Their complete JSON values match. The comparison JSON separately records current source files relative to the historical snapshot by SHA-256, including committed and uncommitted changes. The committed snapshot cannot measure those candidate changes.

| Historical metric                                       |             Before |              After |
| ------------------------------------------------------- | -----------------: | -----------------: |
| Sampled task records                                    |                150 |                150 |
| Committed task artifact files                           |             23,405 |             23,405 |
| Artifact bytes                                          |        311,912,258 |        311,912,258 |
| Duplicate paths / bytes                                 | 2,329 / 23,267,340 | 2,329 / 23,267,340 |
| Service-only commits in last 200 nonmerge commits       |                146 |                146 |
| Usage states: observed / partial / unavailable / absent |  16 / 11 / 118 / 5 |  16 / 11 / 118 / 5 |
| Input tokens, available in 27 task records              |         25,188,295 |         25,188,295 |
| Output tokens, available in 16 task records             |            159,480 |            159,480 |
| Cached input tokens                                     |        unavailable |        unavailable |

These counts do not imply that all historical service commits or duplicated evidence are removable. Historic migration and history rewriting are excluded. Old projections do not support reliable WorkItem/role attribution or delivered/model-read context measurements. Missing telemetry is never zero.

## Matched local evidence

**Context.** The existing scenario contains 500 input references, of which the last is required. With the same input and compact JSON byte definition, all block payloads total 68,874 bytes; selected required payloads total 4,723 bytes. Explicit retention in the same process requires zero additional block payload bytes; a restart reloads all 4,723 required bytes. Referenced file contents and transport framing are excluded.

The complete discovery manifest is 125,783 bytes. Reading that manifest plus the selected payload costs 130,506 bytes, versus the full WorkOrder's 69,750 bytes. Therefore this scenario establishes selective payload loading and lossless recovery, **not an overall context saving**. Consumer access patterns matter. No matched paid-provider workload was run.

**Service commits.** The existing evidence-rework integration scenario verifies that passed declared checks are included in the evaluator-result commit. Deferral is conditional on durable recovery evidence and a supported unmanaged route. Unit checks preserve other commit boundaries. There is no matched provider workload commit-count reduction to report; the historical count is unchanged. Implementation identity, evaluator decisions and recovery evidence remain required.

**Artifacts.** A live canonical result schema is 149,956 bytes; its exchange descriptor is 373 bytes. The existing two-exchange test verifies one shared object, replay after descriptor publication interruption, distinct objects for distinct content, historical-copy preservation and tamper rejection. For two equal schemas, storage arithmetic changes from two payload copies (299,912 bytes) to one payload plus two descriptors (150,702 bytes). This is a schema-specific comparison, not a measurement of total task storage or all new files. The comparison JSON binds the observed descriptor and payload digests. Historical and adapter-specific schema copies remain.

**Lifecycle.** Existing managed canonical transport tests finish with three mocked semantic dispatches for the local scenario and five for cloud rework. Final validation, completion and terminal replay add zero model dispatches. The previous route stopped before completion, so there is no comparable completed-baseline model count and no derived savings percentage. Source drift, no-progress, crash after persisted final validation and restarted checks are covered. Native final checks still run and retain immutable evidence.

## Verification and remaining boundaries

The comparison contract checks passed: `bun run bench:agent-efficiency:check` (10 RF-04 scenarios), `bun run bench:agent-efficiency:replay:check` (50 historical runs; 70/70 outcomes) and `bun run typecheck`. These RF-04 checks protect the existing historical evidence; they are not a new provider replay of this candidate. Earlier WorkItems have native verification receipts for their focused context, commit, evidence-store, recovery and lifecycle suites.

The separately USER-approved `Q6MEAH` repair synchronized ten generated mirrors: four files under `schemas/` and three each under `packages/core/schemas/` and `packages/spec/schemas/`. Both executor and independent evaluator runs of `bun run schemas:check` pass. The refreshed machine evidence includes the generated mirrors and the authority-recovery sources that changed after the first comparison.

Full repository CI, integration and publication are not claimed.

The separate legacy bootstrap task ending in `QCBB76` still has its malformed scope-extension contract. Its lifecycle and integration remain unresolved independently of the schema issue.

## Reproduction

Run from the repository root:

```sh
node scripts/bench/measure-agent-efficiency.mjs --repository-snapshot --revision 92efd467a7b045e7e784597168ac21bd41a975a1 --out scripts/baselines/agent-efficiency-VN1FN4-after.json
bun scripts/bench/compare-agent-efficiency-vn1-fn4.mjs
```

The script reruns the context probe and checks snapshot equality. It refreshes candidate source hashes. Artifact sizes and transport counts are explicitly recorded observations from the bound live evidence and existing tests; the script does not represent them as fresh provider measurements.

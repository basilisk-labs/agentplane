# M05 subscription broker qualification

Task: `202610100514-CT33WV`. Base: `54512a1e74e4586ee2692ae7ce42076cb02237b0`.
Broker implementation: `4cecf9ba6`. Independent corpus/report changes:
`91556b18a3da754dccc927ca1c37028e15723442` and
`93a15ced7b5feccc3e9acd4b975782c1e872bcb1`, composed by ordinary merge `2c9f4f5f6`.

## Qualified boundary

The trusted Codex app-server owns subscription authentication and provider transport.
Model-directed commands run in separate Landlock/seccomp workers. Workers receive only
native task read/write grants, a minimal environment, no authentication or oracle grants,
and network denial. Provider network authority never broadens native tool authority.
Workers have finite time/output limits and cancellation kills their process group.

The harness runs from the managed runtime outside worker grants. Unknown ambient
configuration fails before startup. An operator must review configuration semantics
before approving its exact digest. A digest alone is not semantic approval. Effective
configuration is checked after initialization and before each thread/turn; this later
check cannot undo startup effects of an incorrectly approved executable configuration.
Explicit plugin disable overrides require effective disabled state. Empty MCP tables
are not assumed to clear inherited configuration.

## Retained evidence and limits

- The actual installed Codex 0.157.1 ran against a local mock provider. Tests checked
  offered tools, worker credential/network denial, approved configuration mutation,
  and task-side configuration poisoning before a second thread.
- Actual child/grandchild probes covered hidden files, traversal/symlinks, hardlinks,
  preopened descriptors, proc descriptors, host Unix sockets, and positive allowed writes.
- Real native CLI tests passed 2/2 and exercised native work-order authority validation.
  They use an offline planning double and stop at the real approval boundary. They are
  not a completed live native campaign.
- Before corpus composition, focused broker/host/worker/isolation/report tests passed
  27/27; scoped ESLint and formatting passed. Earlier failed MCP, tool-inventory,
  hardlink-errno, and lint checks were corrected, not relabeled as passes.
- Native CT33 intake accepted its planning result, then worktree preparation returned
  `E_INTERNAL`. User-authorized operator recovery prepared this isolated checkout.
  No EXECUTOR/EVALUATOR receipts were fabricated.

No provider turn or 75-assignment pilot is authorized by this artifact. Launch requires
reviewed actual configuration/runtime pins, subscription/model/quota preflight,
prospectively measured setup accounting, and the frozen intended product/policy/corpus.
Historical recipe setup usage remains unknown. Subscription monetary cost remains
unknown/not attributable; token and elapsed-time observations do not imply zero dollars.

## Composed qualification and runtime preflight

After composition, oracle/host/report tests passed 30/30. The new plugin override
canary initially failed because quoted dotted CLI keys did not disable the plugin.
The supported explicit TOML table override then passed the actual app-server tool
inventory check (1/1). No validation assertion was weakened. Scoped formatting and
ESLint passed after the correction.

Read-only preflight on 2026-10-10 observed ChatGPT Pro authentication, model
`gpt-6-astra` with `medium` supported, and 45 percent weekly quota usage. This is
a point-in-time observation, not a future quota guarantee. The harness used the
existing subscription without reading/copying credential contents or modifying
global configuration. Provider turns: zero.

- Codex 0.157.1 binary SHA-256: `3e2584f3f3829a43a0495011a1cecb2facbe64a2403e2b682351fd9c2983f970`.
- Reviewed configuration SHA-256: `906f031ea2ee7d2b633219265ad2ece7303057005d1e31a11029559dd3391c9f`.
- Required override: `plugins={"visualize@openai-bundled"={enabled=false}}`.
- Passive marketplace and project trust metadata do not grant tool execution.
- This qualification covers the one configured plugin; multiple-plugin table
  composition is not a qualified launch path.

## Measured setup status and integration scope (2026-10-10)

The zero-provider-turn observation above describes the earlier preflight only. Subsequent
prospectively bounded subscription setup attempts 01–08 failed to establish a qualified
strategy. Their observed costs remain included. Attempt 09 was superseded without a
provider launch. Attempt 10 completed measured setup with an independent EVALUATOR pass.
Its 389,259 observed tokens bring cumulative observed setup usage to 2,445,103 tokens,
including 2,055,844 tokens from preceding attempts. These are setup observations, not
coding-treatment outcomes or measured savings. Attributable orchestration and historical
setup costs remain unknown, not zero. Physical authoring cost must not be double-counted
when reporting counterfactual arm allocations.

Attempt 10 is bound to packet SHA-256
`14a8fb8e118e54f5aeb3e24761521c6e219d266842180140e6ee4185bc12e171`,
result SHA-256 `89d40bf3432f393658514dd4533f66cb2ec3014e2f907a12be0202397ae16ef2`,
and ledger SHA-256 `9e45452932aab3c58b80ac42c5d7ff7cdba1c2d2655a6b29045511cbdc5ffe5d`.
The manifest, scenario and agent document hashes are respectively
`fb06eb325c8895dc1d0c053583d21200b76f039b5915e65cc81d8f406c6781bc`,
`1fef1074c82b1666011f547b325e0a50ac4e47af0b4624534a63d0970e8d9322`, and
`b276c5e8002b24990cd100ec70b63809dfccd99fc9c51c662a86b9808321342c`.
The retained operator evidence contains the detailed receipts; this source integration
copies no untracked provider receipts or strategy outputs.

Public product parsing and compilation passed for the setup output. A bounded direct-case
probe subsequently reached actual native approval after install, retention and plan
admission; its preceding resource-contract failure remains retained. Separate no-match
and near-match probes returned ordinary PLANNER routing. These partial probes do not
qualify every native entry, branch, recovery or specialization path and do not establish
an independently verified coding result. Complete native routing qualification, the
registered pilot, independent confirmation and economic analysis remain pending.
M05 efficacy remains `NOT_ESTABLISHED`; neither this source PR nor setup success grants
release approval or proves token savings.

The source integration preserves ordinary ancestry of frozen CT33 commit
`7cf7a3b15a21dc703cd5ac8a0f6f447fe14d51f4` and main
`d0836ee3fe99b92295631b0ac272e4c1bfd77ab2` under task `202610011624-MP3J6N`.
The active experiment checkout is unchanged. Historical NDWDC5 and 21WCFZ task artifacts
remain historical evidence and are not new native verification receipts.

Clean integration builds exposed a benchmark import of an internal semantic-schema file
that is not retained by the normal core bundle. Integration re-exports the existing
`buildAgentSemanticPayloadSchema` through the core and schemas public barrels and uses
the built public entrypoint. The validator implementation and acceptance rules are
unchanged; this is an additive public API export, not a new validation authority.

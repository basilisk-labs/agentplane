# Semantic quality review: rework

Provenance: evaluator_supplied

EVALUATOR returned rework with 11 typed finding(s).

## Findings
- The new recipes dependency on @agentplaneorg/core 0.7.12 requires Node >=20.5.0, but recipes still advertises >=20 and its hosted minimum-runtime job selects 20.0.0. Align the declared minimum, hosted matrix and generated documentation; qualify the actual packed installation on the supported minimum.
- The new M05 product and offline test statically import packages/core/dist/tasks/index.js; the product also imports packages/recipes/dist/index.js. These generated files are absent in a clean checkout before the lint phase, so local validation after builds does not establish clean-checkout lint correctness. Use the established source-bundle/runtime-loading owners and test the real bundle.
- The added exact recipes-to-core 0.7.12 dependency is absent from both scripts/release/version-surfaces.json and the native release apply mutation owner. A version bump updates recipes itself but leaves this runtime edge on 0.7.12, violating the existing strict workspace dependency parity gate. Update both writers and cover present and legacy-absent dependency cases without weakening parity or introducing absent optional keys.
- The frozen compatibility candidate/checker still restricts the pre-release package delta to its earlier enumerated paths, which exclude the newly added recipes runtime dependencies. The capture owner also normalizes only the CLI core/recipes edges, omitting recipes-to-core. The new package surface therefore requires an exact reviewed candidate/checker update and consistent version normalization; recapturing arbitrary drift is insufficient. Preserve the immutable baseline and require unexpected-path rejection.
- scripts/release/check-package-node-runtime.mjs:145 installs only the selected tarball. The exact recipes-to-core dependency therefore resolves through npm instead of the locally packed candidate; an unpublished version cannot be qualified. CI packs core only for core selection. Add explicit paired local-core transport with installed identity/version/resolution checks and core packing for recipes selection. Preserve strict engines and standalone behavior.
- packages/agentplane/src/commands/task/kernel-terminal-artifacts.ts:26–35,46,77 includes PR projections in generic completion persistence. PR-only refresh dirt can create another completion commit and change publication HEAD. Exclude PR-owned projections from this owner; cover PR-only no-op and genuine terminal metadata persistence.
- pr/internal/sync-update-step.ts:51 passes frozen common.baseBranch into metadata; shared/pr-meta/builders.ts:102–114 changes updated_at when it differs from recorded provider main, then sync-update-step.ts:76 restores main. Identical sync repeats this churn. Separate provider metadata base from frozen diffstat basis and test byte idempotence plus genuine provider changes.
- commands/task/advance.command.ts:122–150 routes provider-conflict and existing external results through the ordinary owner but not completed canonical implementation_rework issuance. Managed execution rejects DONE. Reuse authenticated external implementation_rework/quality_review exchanges while preserving completed kernel and standalone native verification.
- commands/task/external-agent-blocked-result.ts:266–274 calls legacy cmdTaskSetStatus(BLOCKED) for completed canonical rework, which rejects canonical lifecycle mutation. Use guarded exact blocker/request projection and idempotent retained-result recovery across projection/commit interruptions. Preserve original evidence and a durable operator boundary.
- runtime/task-obligations/resolve.ts:51–60 selects ops for security risk; catalog.ts:33 permits only ops task kind; resolve.ts:130–136 emits incompatibility for this code task. Retain code DoD and operational approval/rollback evidence while resolving this contradiction and preserving controlled-risk behavior. The frozen task comment records this actual blocker.
- runner/usecases/agent-work-order-build.ts:255–256,505 unconditionally protects CI paths even with authenticated ci effect and writable .github, contradicting required workflow repair and existing scoped implementationCommitAllowsCi admission. Project only the authenticated effect/scope intersection; preserve sibling/custom/policy/config protection and stale/malformed rejection.

## Evidence
- .agentplane/tasks/202610041748-K43XFE/quality/objects/sha256/aa80d9856cd5c49d128937031c30745f3adce79ad7fdbaf2df16d6799361100c.patch
- .agentplane/tasks/202610041748-K43XFE/quality/objects/sha256/d86c9eb64908ce9686a79a6b14fbccc29291a8495e9e5a663b86d77b77ec822a.json
- .agentplane/tasks/202610041748-K43XFE/README.md

## Missing Tests
- Actual packed recipes installation on its declared supported minimum Node version.
- Clean-checkout M05 lint and real source bundle/runtime URL coverage.
- Both version writers advancing the recipes-to-core edge, legacy absent-edge preservation, and strict rejection of unexpected compatibility recapture.
- Offline paired unpublished candidate installation, strict engines and installed dependency resolution.
- PR-only terminal artifact no-op and repeated frozen-base sync byte idempotence.
- Canonical-only completed rework success/BLOCKED retry across interruptions, exact evidence and immutable kernel, stale/dirty rejection and fresh operator boundary.
- Security-code obligation preservation and real CI authority builder/admission coverage for scoped positive, siblings, custom protection and malformed/stale negatives.

## Hidden Assumptions
- Native full verification remains passing on Node 24; this review does not relabel those executions or claim a hosted rerun.
- Additional source owners were independently checked byte-identical to evaluated commit 3a9b33197fea56ebc7f4510eadb5e95e5e28bbc9. Evidence references use only issued paths; source locations are stated in findings.
- Runtime-assisted operator recovery recorded in the current task does not fix C source. Auxiliary patches and reviews are not blanket composition approval.
- Evaluator timeout/file-access failures are infrastructure, not source defects. Offline M05 does not establish live economic savings; measurement disposition remains separate.

## Residual Risks
- Rework is required for the listed qualification and recovery defects at frozen source 3a9b33197fea56ebc7f4510eadb5e95e5e28bbc9. Preserve completed history, passing verification, immutable compatibility anchors and M05 pins. Obtain fresh bounded native authority for necessary source and regression changes. This result grants no blanket auxiliary composition, task metadata import, lifecycle or publication authority.

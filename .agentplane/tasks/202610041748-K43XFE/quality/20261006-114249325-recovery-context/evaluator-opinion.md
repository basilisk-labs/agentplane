# Semantic quality review: rework

Provenance: evaluator_supplied

EVALUATOR returned rework with 4 typed finding(s).

## Findings
- The new recipes dependency on @agentplaneorg/core 0.7.12 requires Node >=20.5.0, but recipes still advertises >=20 and its hosted minimum-runtime job selects 20.0.0. Align the declared minimum, hosted matrix and generated documentation; qualify the actual packed installation on the supported minimum.
- The new M05 product and offline test statically import packages/core/dist/tasks/index.js; the product also imports packages/recipes/dist/index.js. These generated files are absent in a clean checkout before the lint phase, so local validation after builds does not establish clean-checkout lint correctness. Use the established source-bundle/runtime-loading owners and test the real bundle.
- The added exact recipes-to-core 0.7.12 dependency is absent from both scripts/release/version-surfaces.json and the native release apply mutation owner. A version bump updates recipes itself but leaves this runtime edge on 0.7.12, violating the existing strict workspace dependency parity gate. Update both writers and cover present and legacy-absent dependency cases without weakening parity or introducing absent optional keys.
- The frozen compatibility candidate/checker still restricts the pre-release package delta to its earlier enumerated paths, which exclude the newly added recipes runtime dependencies. The capture owner also normalizes only the CLI core/recipes edges, omitting recipes-to-core. The new package surface therefore requires an exact reviewed candidate/checker update and consistent version normalization; recapturing arbitrary drift is insufficient. Preserve the immutable baseline and require unexpected-path rejection.

## Evidence
- .agentplane/tasks/202610041748-K43XFE/quality/objects/sha256/aa80d9856cd5c49d128937031c30745f3adce79ad7fdbaf2df16d6799361100c.patch

## Missing Tests
- Actual packed recipes installation on its declared supported minimum Node version.
- Clean-checkout M05 lint and real source bundle/runtime URL coverage.
- Both version writers advancing the recipes-to-core edge, legacy absent-edge preservation, and strict rejection of unexpected compatibility recapture.

## Hidden Assumptions
- The retained native verification record reports all six commands passed, including ci:local:full, on Node 24. This review does not relabel those results as failed or claim to have rerun hosted CI.
- The earlier timeout and replacement managed runner file-access failure provide no implementation assessment. This independent review uses the freshly verified 20261006-114249325 frozen packet; it does not adopt the placeholder managed finding. Offline M05 results do not establish live economic savings; an explicit measurement disposition remains separate.
- No additional terminal PR ownership or frozen-base synchronization finding is asserted from this bounded frozen evidence set. Their separately reviewed repairs and the unapplied Plan15 draft are not approval or proof for this result.

## Residual Risks
- Implementation rework is required for the four source-backed release qualification defects above at evaluated SHA 3a9b33197fea56ebc7f4510eadb5e95e5e28bbc9. Preserve completed work and native passing evidence. Use a fresh approved bounded implementation episode, retain immutable compatibility anchors and M05 pins, and rerun the relevant native and hosted qualifications. This result grants no lifecycle or publication authority.

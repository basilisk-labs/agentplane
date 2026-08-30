# Semantic quality review: rework

Provenance: evaluator_supplied

EVALUATOR returned rework with 4 typed finding(s).

## Findings
- At evaluated SHA bf870e63a2cdbdb52fda9bb60176ddeab3a924f7, a read-only Bun fixture probe with different executable Node candidates in explicit PATH and inherited NVM_BIN returns node_override_wins=false. resolvePreferredNodeExecutable checks NVM_BIN/VOLTA_HOME before PATH, contradicting the approved explicit override priority.
- A second fixture probe records localRuntimeEvidence for an unchanged runner, replaces the selected Node executable bytes under the same PATH, and returns runtime_identity_changes_with_node=false. Shell-based verification likewise hashes the shell, not the Node/Bun toolchain. Prepared invocation snapshots therefore remain reusable after this toolchain change.
- The previous Bun-as-Node and PATH/outer-binary freshness findings are fixed and tested. Formatting, full local CI, exact frozen evidence integrity and implementation identity are confirmed. These results do not establish hosted integration.
- Residual risk: Preserve merged M1 verification dotenv isolation when updating this older runtime branch before integration.

## Evidence
- .agentplane/tasks/202608251706-V287W1/quality/objects/sha256/e3b16efe0d529b7ee241f16c1c0df3ca0a8289fbec15ea52de0052e01564b33a.patch

## Missing Tests
- Explicit normalized profile PATH must select its Node before inherited NVM_BIN or VOLTA_HOME. Test competing valid executables.
- Prepare a shell or script runner, replace selected Node/Bun bytes without changing PATH or runner bytes, and require runtime identity change and stale prepared-input rejection.

## Hidden Assumptions
- Hashing only the outer runner or shell does not identify the Node/Bun runtime used by that script.

## Residual Risks
- Keep the shared resolver and prepared snapshot design. Make Node resolution honor the same explicit PATH-first semantics as normalization. Bind selected supported runtime toolchain executables to the evidence digest, including Node/Bun used behind a shell or script, without storing secrets. Extend existing tests with both reproduced cases. Run focused tests, formatting, typecheck and full CI. Do not change authority or release behavior.

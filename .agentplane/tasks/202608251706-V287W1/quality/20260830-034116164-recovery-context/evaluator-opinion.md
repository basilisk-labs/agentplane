# Semantic quality review: rework

Provenance: evaluator_supplied

EVALUATOR returned rework with 4 typed finding(s).

## Findings
- Read-only Bun probe reproduces selected_running_bun_as_node=true when resolvePreferredNodeExecutable receives an empty PATH and an absent fixture HOME. Its unconditional process.execPath fallback returns Bun as Node. Do not substitute runtimes when Node is absent.
- Read-only probe shows changed_profile_path_has_identical_prepared_snapshot=true. createRunnerInvocationSnapshot records environment key names only, and readValidatedPreparedRunnerStdin validates only that snapshot digest. Changing a profile PATH value or replacing the selected binary therefore leaves prepared input reusable. Bind runtime selection and executable identity to the prepared snapshot or the corresponding freshness guard.
- Runtime normalization, executable permission checks, numeric NVM selection, real subprocess launch, typed unavailable verification evidence, receipt recording and documentation consolidation otherwise satisfy the reviewed bounded scope. All full local CI and docs-site checks pass.
- Residual risk: The runtime branch predates merged M1. Preserve M1 verification dotenv isolation when the branch is updated before integration.

## Evidence
- .agentplane/tasks/202608251706-V287W1/quality/objects/sha256/84b34e43a9175513d2ac3cad4912251e034226b23fbd494ec15f867284bb6995.patch

## Missing Tests
- Run the Node resolver under actual Bun with absent Node candidates; require a typed absence result rather than the running Bun binary.
- Prepare an invocation, change inherited/profile PATH or replace executable content, and require prepared-input rejection before launch while unchanged runtime remains accepted.

## Hidden Assumptions
- Persisting a runtime digest after execution is not sufficient to reject stale prepared input before reuse.

## Residual Risks
- Keep the implemented shared resolver and evidence contracts. Fix the Bun-as-Node fallback and add runtime/environment identity to the existing prepared invocation freshness comparison. Use the existing runtime and prepared-input tests, including a real subprocess negative case, and retain explicit overrides. Run focused tests, typecheck and full local CI again. Do not change authority rules, release behavior or manually edit task/receipt journals.

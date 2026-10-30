# Semantic quality review: rework

Provenance: evaluator_supplied

EVALUATOR returned rework with 5 typed finding(s).

## Findings
- The cold completed-scope reader requires every historical verification result to survive unchanged. The native verification writer intentionally replaces verification-record and recorded-check-N projections while retaining durable records. A legitimate subsequent verification therefore writes Task metadata and then becomes unreadable. Preserve immutable proof history and all durable observations, but use the same explicit projection classification at the native writer and cold reader.
- The public Node command receives a native context from another built catalog. Its LocalBackend constructor identity differs from the controller catalog, so the leading instanceof check rejects a genuine local owner. Reload through the controller native loader and retain native owner and source-root checks. Add a built Node CLI regression.
- The authentication controller is imported by cold branch readers and imports high-level backend, scope-request, and finalization controllers. This creates dependency cycles across the Task backend boundary. Move pure request/projection/source-authentication responsibilities to existing lower layers while keeping permits object-bound and proof minting authenticated.
- The added public reconcile-request option is absent from the exact reviewed CLI compatibility candidate and its provenance. Admit only this precise option delta and keep all unknown-drift rejection checks.
- Residual risk: The real VPB partial Task must remain untouched until this MRJ correction passes canonical native verification, evaluation, hosted checks, and merge.

## Evidence
- .agentplane/tasks/202610300522-MRJ9WH/quality/objects/sha256/2205875568eb14227149d785a2df7c978fb4fd89b25b89241a5acf9e4114763f.patch

## Missing Tests
- Exercise fresh public Node scope admission on a genuine completed Task with retained native BLOCKED evidence.
- Refresh generated verification rows after admission and cold-read the Task; independently reject removal of a durable non-projection observation.

## Hidden Assumptions
- none recorded

## Residual Risks
- The failed native verification operation remains failed. Its real checks and immutable artifacts were preserved by native commit 38a89cb73762b8fccf3d8a57a399359fc8349f75 without changing Kernel or frozen base. A tested private 17-file proposal exists, but no proposal source has been applied to this owner. The next EXECUTOR must use the current admitted 28 writable roots and preserve all guards.

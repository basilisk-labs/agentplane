# Semantic quality review: rework

Provenance: evaluator_supplied

EVALUATOR returned rework with 5 typed finding(s).

## Findings
- `hasOnlyValidQualityObjects` correctly validates the exact directory hierarchy, regular-file requirement, filename shape, non-empty object set, and content digest.
- The main loop adds every directory name to `seen` before the README-less object-only case continues.
- A later task whose `depends_on` references the object-only directory ID can therefore pass dependency validation even though the directory was classified as non-task storage.
- The recorded verification is otherwise strong: all four declared commands passed, including `bun run ci:local:full`, and the implementation identity is d511f8b8fa9caa06b86a715e8e3f09500cf6086e.
- Residual risk: Without rework, immutable object storage can mask a missing task dependency and weaken task graph integrity.

## Evidence
- .agentplane/tasks/202609132330-RP315R/quality/objects/sha256/8c87ef14fe9c10fb7cc3dd0ab299a5488f57c3a9213ab528e58cae727cd21ce6.patch

## Missing Tests
- Add a task whose `depends_on` references a valid object-only directory ID and assert that validation reports the dependency as missing.

## Hidden Assumptions
- The implementation assumes skipping README validation is equivalent to excluding the directory from the task registry, but `seen` preserves its task identity.

## Residual Risks
- Filter valid quality-object-only directories out before task IDs are added to `seen`, or otherwise ensure they cannot satisfy dependency lookup. Preserve all existing fail-closed cases and add the dependency regression.

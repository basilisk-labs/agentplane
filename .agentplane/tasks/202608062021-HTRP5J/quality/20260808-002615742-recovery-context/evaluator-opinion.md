# Semantic quality review: rework

Provenance: evaluator_supplied

EVALUATOR returned rework with 1 typed finding(s).

## Findings
- The doctor legacy text report no longer exposes each adapter's remaining removal blocker. For adapters without remove_in, it prints a derived policy label such as after_2_zero_usage_releases or after_archive_conversion, while removal_blocker is omitted. The JSON report retains the field, so JSON and text do not both satisfy the explicit reporting contract.

## Evidence
- .agentplane/tasks/202608062021-HTRP5J/README.md
- .agentplane/tasks/202608062021-HTRP5J/quality/objects/sha256/7bd3c2f2006db736ba0bc87db10dacb3e7bfcd93841d1db219ce672c63579650.patch

## Missing Tests
- Add a doctor legacy text-output assertion proving that a classified adapter with a non-null removal_blocker prints that blocker alongside its retirement policy and scope.

## Hidden Assumptions
- A derived retirement label is assumed to be an adequate substitute for the manifest's explanatory removal_blocker, despite the acceptance criterion naming the blocker separately.

## Residual Risks
- Update the doctor legacy human-readable output to include non-null removal_blocker values alongside policy classification, then add a negative-path assertion and rerun the declared verification steps.

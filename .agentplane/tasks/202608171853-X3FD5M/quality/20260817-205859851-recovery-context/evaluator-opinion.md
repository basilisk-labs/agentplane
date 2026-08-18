# Semantic quality review: rework

Provenance: evaluator_supplied

EVALUATOR returned rework with 3 typed finding(s).

## Findings
- The clean packaged run failed at the explicit fail-closed guard because WORKFLOW.md already contains authority from defaultConfig/saveConfig.
- The narrow correction is to replace the canonical default approval_receipts mapping with the fixture issuer, preserving manual authority mode and every unrelated workflow field.
- The replacement should require an exact single default marker and fail closed on any unexpected generated shape.

## Evidence
- .agentplane/tasks/202608171853-X3FD5M/quality/objects/sha256/9ab760b9d00bb7a19aaa595660364bd22c7cc5d410997297a2c90aab7c1849a3.patch

## Missing Tests
- Clean packaged-mixed-scope-lifecycle must pass with the default authority block updated in place.

## Hidden Assumptions
- The previous correction assumed current init omitted authority when it only omitted legacy config.json.

## Residual Risks
- Rework required. Current init already persists the default authority section, so the fixture must replace its empty approval_receipts trust list rather than reject or duplicate authority.

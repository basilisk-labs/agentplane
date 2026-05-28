<!-- ap:fragment id="policy.dod.docs.body.dod.docs.policy" slot="body" mutability="replaceable" -->

# DoD: docs/policy

Apply when task changes docs or policy files only.

<!-- /ap:fragment -->
<!-- ap:fragment id="policy.dod.docs.check.minimum.checks" slot="check" mutability="append_only" -->

## Minimum checks

- `node .agentplane/policy/check-routing.mjs`
- `agentplane doctor`
- Targeted lint/tests if docs generation or scripts were changed.

<!-- /ap:fragment -->
<!-- ap:fragment id="policy.dod.docs.check.verification.evidence.contract" slot="check" mutability="append_only" -->

## Verification evidence contract

Record docs/policy verification via `agentplane verify ...`: exact command, pass/fail result, short evidence, covered changed paths, and updated canonical links/examples. For skipped checks, record skipped command, concrete blocker, risk, and approval.

<!-- /ap:fragment -->
<!-- ap:fragment id="policy.dod.docs.check.evidence.checklist" slot="check" mutability="append_only" -->

## Evidence checklist

- Confirm canonical links are valid.
- Confirm no duplicate/conflicting rule text remains.
- Confirm routing/load-rule examples match actual module paths and commands.
<!-- /ap:fragment -->

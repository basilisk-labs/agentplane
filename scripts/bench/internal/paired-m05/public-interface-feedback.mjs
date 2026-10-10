import assert from "node:assert/strict";
import { resolveScenarioParameters } from "../../../../packages/recipes/dist/index.js";

const bounded = (items) => ({
  total: items.length,
  truncated:
    items.length > 20 || items.slice(0, 20).some((item) => JSON.stringify(item).length > 1024),
  items: items.slice(0, 20).map((item) => JSON.stringify(item).slice(0, 1024)),
});

export function publicInterfaceFeedback(scenario, bindings, manifest, contract) {
  assert.equal(contract.schema_version, 1);
  assert.ok(
    Array.isArray(contract.observed_value_keys) &&
      Array.isArray(contract.conditional_observed_value_keys) &&
      Array.isArray(contract.validation_capabilities),
  );
  const resolved = resolveScenarioParameters(scenario, bindings);
  const predicates = [...resolved.applicability.required, ...resolved.applicability.excluded];
  const supportedKeys = new Set([
    ...contract.observed_value_keys,
    ...contract.conditional_observed_value_keys,
  ]);
  const plan = resolved.plan_template;
  const checks = [
    ...plan.checks,
    ...plan.work_items.flatMap((item) => item.validation?.checks ?? []),
  ];
  const commands = new Set(
    (manifest.dependency_closure?.commands ?? []).map((item) => item.command),
  );
  const findings = [];
  for (const predicate of predicates)
    if (predicate.kind === "observed_value_equals" && !supportedKeys.has(predicate.key))
      findings.push({ code: "unsupported_observer_key", key: predicate.key });
  for (const check of checks) {
    if (!contract.validation_capabilities.includes(check.capability))
      findings.push({
        code: "unsupported_supplied_check_capability",
        check: check.id,
        capability: check.capability,
      });
    if (check.kind === "provider" || (check.kind !== "semantic" && !check.command))
      findings.push({ code: "unsupported_supplied_check_contract", check: check.id });
    if (check.command && !commands.has(check.command))
      findings.push({
        code: "command_closure_declaration_missing",
        check: check.id,
        command: check.command,
      });
  }
  if (plan.unresolved_questions.length > 0)
    findings.push({
      code: "unconditional_specialization_required",
      count: plan.unresolved_questions.length,
    });
  return {
    scope:
      "Static public interface compatibility only; not native eligibility, resolved closure, authority or admission.",
    task_capability_authority: "unknown_without_trusted_task",
    task_declared_checks: "unknown_without_trusted_task",
    findings: bounded(findings),
    resolved_predicates: bounded(predicates),
    resolved_checks: bounded(
      checks.map(({ id, kind, capability, command }) => ({ id, kind, capability, command })),
    ),
    resolved_work_items: bounded(
      plan.work_items.map(({ id, scope_roots, resource_claims, capabilities }) => ({
        id,
        scope_roots,
        resource_claims,
        capabilities,
      })),
    ),
    unresolved_questions: bounded(plan.unresolved_questions),
  };
}

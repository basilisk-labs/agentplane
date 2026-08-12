export function percentile(values, fraction) {
  const ordered = [...values].toSorted((left, right) => left - right);
  return ordered[Math.min(ordered.length - 1, Math.ceil(ordered.length * fraction) - 1)] ?? 0;
}

export function evaluateVerificationBenchmarkQualification(report) {
  const mandatoryVerificationExecuted = report.execution_mode === "execute";
  const checks = {
    mandatory_verification_executed: mandatoryVerificationExecuted,
    every_sample_passed:
      mandatoryVerificationExecuted &&
      report.sample_results.length === report.samples &&
      report.sample_results.every((sample) => sample.ok === true),
    p50_within_threshold: report.p50_ms <= report.thresholds.p50_ms,
    p95_within_threshold: report.p95_ms <= report.thresholds.p95_ms,
    lifecycle_commands_within_threshold:
      report.lifecycle_control_commands <= report.thresholds.lifecycle_control_commands,
    observed_lifecycle_provenance:
      report.sample_results.length === report.samples &&
      report.sample_results.every(
        (sample) => sample.lifecycle_control?.provenance === "observed_command_events",
      ),
    localized_group_budget: report.selected_groups <= 5,
    single_build_invocation: report.duplicate_build_invocations === 1,
    historical_group_reduction: report.comparison.selected_group_reduction > 0,
    historical_build_reduction: report.comparison.duplicate_build_reduction > 0,
    no_local_full_cli_regression: report.full_cli_regression_selected === false,
  };
  return {
    schema_version: 1,
    kind: "verification_contract_benchmark_qualification",
    mandatory_verification_executed: mandatoryVerificationExecuted,
    checks,
    ok: Object.values(checks).every(Boolean),
  };
}

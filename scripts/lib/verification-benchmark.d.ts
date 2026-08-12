export function percentile(values: number[], fraction: number): number;
export function evaluateVerificationBenchmarkQualification(report: {
  execution_mode: "plan" | "execute";
  samples: number;
  sample_results: Array<{
    ok: boolean;
    lifecycle_control?: { provenance?: string };
  }>;
  p50_ms: number;
  p95_ms: number;
  lifecycle_control_commands: number;
  selected_groups: number;
  duplicate_build_invocations: number;
  full_cli_regression_selected: boolean;
  thresholds: {
    p50_ms: number;
    p95_ms: number;
    lifecycle_control_commands: number;
  };
  comparison: {
    selected_group_reduction: number;
    duplicate_build_reduction: number;
  };
}): {
  schema_version: 1;
  kind: "verification_contract_benchmark_qualification";
  mandatory_verification_executed: boolean;
  checks: Record<string, boolean>;
  ok: boolean;
};

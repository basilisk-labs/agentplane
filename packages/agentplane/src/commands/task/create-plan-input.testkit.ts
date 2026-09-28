export function compactPlanInput() {
  return {
    schema_version: 2,
    criteria: [
      {
        id: "c",
        description: "The report answers the question",
        required: true,
        check_ids: ["review"],
      },
    ],
    checks: [{ id: "review", kind: "semantic", required: true, capability: "task.verify" }],
    work_items: [
      {
        id: "report",
        objective: "Produce the report",
        depends_on: [],
        required_inputs: [],
        expected_outputs: ["report"],
        scope_roots: [] as string[],
        context: { required_sources: [], optional_sources: [], symbol_hints: [], max_bytes: 4096 },
        risk: "low",
        capabilities: [],
        resource_claims: [],
        optional: false,
        priority: 0,
      },
    ],
    assumptions: [],
    unresolved_questions: [],
  };
}

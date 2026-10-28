import path from "node:path";
import { kernelPlanProposalSchema, type taskKernel as k } from "@agentplaneorg/core/tasks";
import type { KernelRecord } from "../../adapters/task-backend/kernel-record.js";
import { writeKernelArtifact } from "./kernel-exchange.js";

export async function writeCorrectivePlan(
  directory: string,
  record: KernelRecord,
  commands: string[],
  evidenceDigest: string,
  missingCommands = false,
) {
  const plan = record.aggregate.current_plan!;
  const items = plan.work_items.map(({ contract_digest, ...definition }) => {
    const contract = record.documents!.contracts[String(contract_digest)];
    if (!contract) throw new Error("Corrective Plan requires every retained contract");
    return { ...definition, contract };
  });
  const union = (key: keyof k.ExecutionRequirements) =>
    [...new Set(plan.work_items.flatMap((item) => item.execution_requirements[key]))].toSorted();
  const id = `final-correction-${evidenceDigest.slice(7, 19)}`;
  const proposal = {
    work_items: [
      ...items,
      {
        id,
        depends_on: plan.work_items
          .filter((item) => record.aggregate.work_items[item.id]?.state === "COMPLETED")
          .map((item) => item.id),
        required_inputs: [],
        expected_outputs: [id + "-evidence"],
        optional: false,
        execution_requirements: {
          scope_roots: union("scope_roots"),
          repository_effects: union("repository_effects"),
          external_effects: [],
          capabilities: union("capabilities"),
          resources: union("resources"),
        },
        contract: {
          objective: missingCommands
            ? `Add executable final verification for the approved implementation evidenced by ${evidenceDigest}. Read ${path.join(directory, "final-validation.json")} before edits.`
            : `Repair the failed final validation evidenced by ${evidenceDigest}. Read ${path.join(directory, "final-validation.json")} before edits.`,
          acceptance_criteria: [
            missingCommands
              ? "Select and run an executable local verification command for the existing approved code. Preserve completed work and all prior evidence."
              : "Correct the reproduced regression within the existing approved scope. Preserve completed work and all prior evidence.",
            missingCommands
              ? "Record the selected executable command in this WorkItem contract before Plan submission. Return concrete results for independent native review."
              : "Run the unchanged required validation commands. Return implementation evidence for independent native review.",
            "Do not bypass checks, expand authority, discard effects or claim that infrastructure failures are code defects.",
          ],
          verification_commands: commands,
          role: "EXECUTOR",
        },
      },
    ],
  };
  const filename = missingCommands ? "corrective-plan.template.json" : "corrective-plan.json";
  await writeKernelArtifact(directory, filename, kernelPlanProposalSchema.parse(proposal));
  return path.join(directory, filename);
}

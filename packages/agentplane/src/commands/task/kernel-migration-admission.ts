import { validateSupervisorExecutionEpisodeJournal } from "@agentplaneorg/core/schemas";

export type KernelMigrationAdmission =
  | { admitted: true }
  | {
      admitted: false;
      reason: "supervisor_journal_invalid" | "supervisor_operation_intent" | "effect_in_doubt";
      detail: string;
    };

export function inspectKernelMigrationAdmission(input: unknown): KernelMigrationAdmission {
  if (input === null) return { admitted: true };
  let journal;
  try {
    journal = validateSupervisorExecutionEpisodeJournal(input);
  } catch (error) {
    return {
      admitted: false,
      reason: "supervisor_journal_invalid",
      detail: error instanceof Error ? error.message : "Supervisor journal is invalid.",
    };
  }
  if (journal.operations.some((operation) => operation.status === "intent")) {
    return {
      admitted: false,
      reason: "supervisor_operation_intent",
      detail: "A supervisor operation has an admitted effect intent.",
    };
  }
  if (journal.stop?.reason === "effect_in_doubt") {
    return {
      admitted: false,
      reason: "effect_in_doubt",
      detail: "The supervisor stopped with an effect whose outcome is unknown.",
    };
  }
  return { admitted: true };
}

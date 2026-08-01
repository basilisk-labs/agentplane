import type { CommandResult } from "../../cli/output.js";
import type { ReleasePlanResult } from "./plan.command.js";

export function renderReleasePlanResult(result: ReleasePlanResult): CommandResult[] {
  return [
    { kind: "line", text: `Release plan written: ${result.plan_dir}` },
    { kind: "line", text: `Next tag: ${result.next_tag}` },
    {
      kind: "line",
      text: `Hint: Create a DOCS task to write docs/releases/${result.next_tag}.md based on this plan.`,
    },
  ];
}

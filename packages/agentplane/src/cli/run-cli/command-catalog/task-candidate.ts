import {
  taskCandidatePrepareSpec,
  taskCandidateApproveSpec,
  taskCandidatePublishSpec,
  taskCandidateRevokeSpec,
} from "../../../commands/task/candidate-publication.command.js";
import { loadTaskCandidateReadSpec, loadTaskCandidateWriteSpec } from "../command-loaders/task.js";
import { declareSessionCommand, type CommandEntry } from "./kernel.js";
import { TASK_READ_REQUIREMENTS, TASK_WRITE_REQUIREMENTS } from "./task-capability-profiles.js";
export const TASK_CANDIDATE_COMMANDS = [
  declareSessionCommand(taskCandidatePrepareSpec, {
    load: loadTaskCandidateReadSpec,
    requirements: TASK_READ_REQUIREMENTS,
    surface: "advanced",
    helpGroup: "Advanced",
  }),
  ...[taskCandidateApproveSpec, taskCandidatePublishSpec, taskCandidateRevokeSpec].map((spec) =>
    declareSessionCommand(spec, {
      load: loadTaskCandidateWriteSpec,
      requirements: TASK_WRITE_REQUIREMENTS,
      surface: "advanced",
      helpGroup: "Advanced",
    }),
  ),
] as const satisfies readonly CommandEntry[];

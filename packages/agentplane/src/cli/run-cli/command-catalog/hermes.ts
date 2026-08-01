import {
  hermesDoctorSpec,
  hermesEnqueueSpec,
  hermesLifecycleSpec,
  hermesReconcileSpec,
  hermesSpec,
  hermesSuperviseSpec,
} from "../../../commands/hermes/hermes.command.js";
import {
  loadHermesDoctorSpec,
  loadHermesEnqueueSpec,
  loadHermesLifecycleSpec,
  loadHermesReconcileSpec,
  loadHermesSpec,
  loadHermesSuperviseLocalExecutionSpec,
  loadHermesSuperviseLocalPreparationSpec,
  loadHermesSuperviseRemoteExecutionSpec,
  loadHermesSuperviseRemotePreparationSpec,
} from "../command-loaders/project.js";
import {
  declareMultiSessionCommand,
  declareSessionCommand,
  defineCommandSessionSelection,
  type CommandEntry,
} from "./kernel.js";
import {
  NO_CONTEXT_REQUIREMENTS,
  PROJECT_CONFIG_REQUIREMENTS,
} from "./project-capability-profiles.js";
import {
  HERMES_LOCAL_EXECUTION_REQUIREMENTS,
  HERMES_PROJECTION_REQUIREMENTS,
  HERMES_REMOTE_EXECUTION_REQUIREMENTS,
  HERMES_REMOTE_PREPARATION_REQUIREMENTS,
} from "./runner-hermes-capability-profiles.js";

const HERMES_SUPERVISE_LOCAL_PREPARATION = defineCommandSessionSelection({
  load: loadHermesSuperviseLocalPreparationSpec,
  requirements: HERMES_PROJECTION_REQUIREMENTS,
});
const HERMES_SUPERVISE_REMOTE_PREPARATION = defineCommandSessionSelection({
  load: loadHermesSuperviseRemotePreparationSpec,
  requirements: HERMES_REMOTE_PREPARATION_REQUIREMENTS,
});
const HERMES_SUPERVISE_LOCAL_EXECUTION = defineCommandSessionSelection({
  load: loadHermesSuperviseLocalExecutionSpec,
  requirements: HERMES_LOCAL_EXECUTION_REQUIREMENTS,
});
const HERMES_SUPERVISE_REMOTE_EXECUTION = defineCommandSessionSelection({
  load: loadHermesSuperviseRemoteExecutionSpec,
  requirements: HERMES_REMOTE_EXECUTION_REQUIREMENTS,
});

export const HERMES_COMMANDS = [
  declareSessionCommand(hermesSpec, {
    load: loadHermesSpec,
    requirements: NO_CONTEXT_REQUIREMENTS,
  }),
  declareSessionCommand(hermesEnqueueSpec, {
    load: loadHermesEnqueueSpec,
    requirements: HERMES_PROJECTION_REQUIREMENTS,
  }),
  declareMultiSessionCommand(hermesSuperviseSpec, {
    default: HERMES_SUPERVISE_LOCAL_PREPARATION,
    variants: [
      {
        when: (parsed) => parsed.executeStep && !parsed.dryRun && parsed.remote,
        selection: HERMES_SUPERVISE_REMOTE_EXECUTION,
      },
      {
        when: (parsed) => parsed.executeStep && !parsed.dryRun,
        selection: HERMES_SUPERVISE_LOCAL_EXECUTION,
      },
      {
        when: (parsed) => parsed.remote,
        selection: HERMES_SUPERVISE_REMOTE_PREPARATION,
      },
    ],
  }),
  declareSessionCommand(hermesReconcileSpec, {
    load: loadHermesReconcileSpec,
    requirements: HERMES_PROJECTION_REQUIREMENTS,
  }),
  declareSessionCommand(hermesLifecycleSpec, {
    load: loadHermesLifecycleSpec,
    requirements: NO_CONTEXT_REQUIREMENTS,
  }),
  declareSessionCommand(hermesDoctorSpec, {
    load: loadHermesDoctorSpec,
    requirements: PROJECT_CONFIG_REQUIREMENTS,
  }),
] as const satisfies readonly CommandEntry[];

import {
  integrateQueueAdoptLegacyProtectedConflictSpec,
  integrateQueueClaimSpec,
  integrateQueueDoctorSpec,
  integrateQueueEnqueueSpec,
  integrateQueueListSpec,
  integrateQueueReleaseSpec,
  integrateQueueRunNextSpec,
  integrateQueueSpec,
} from "../../../commands/integrate-queue.spec.js";
import {
  loadIntegrateQueueAdoptLegacyProtectedConflictSpec,
  loadIntegrateQueueClaimSpec,
  loadIntegrateQueueDoctorSpec,
  loadIntegrateQueueEnqueueSpec,
  loadIntegrateQueueListSpec,
  loadIntegrateQueueReleaseLocalSpec,
  loadIntegrateQueueReleaseProviderSpec,
  loadIntegrateQueueRunNextPreparationSpec,
  loadIntegrateQueueRunNextSpec,
  loadIntegrateQueueSpec,
} from "../command-loaders/project.js";
import { NO_CONTEXT_REQUIREMENTS } from "./project-capability-profiles.js";
import {
  INTEGRATION_QUEUE_EXECUTION_REQUIREMENTS,
  INTEGRATION_QUEUE_LIST_REQUIREMENTS,
  INTEGRATION_QUEUE_PROVIDER_READ_REQUIREMENTS,
  INTEGRATION_QUEUE_TASK_PROVIDER_READ_REQUIREMENTS,
} from "./provider-ops-capability-profiles.js";
import {
  declareConditionalSessionCommand,
  declareSessionCommand,
  type CommandEntry,
} from "./kernel.js";

export const INTEGRATION_QUEUE_COMMANDS = [
  declareSessionCommand(integrateQueueSpec, {
    load: loadIntegrateQueueSpec,
    requirements: NO_CONTEXT_REQUIREMENTS,
  }),
  declareSessionCommand(integrateQueueEnqueueSpec, {
    load: loadIntegrateQueueEnqueueSpec,
    requirements: INTEGRATION_QUEUE_TASK_PROVIDER_READ_REQUIREMENTS,
  }),
  declareSessionCommand(integrateQueueListSpec, {
    load: loadIntegrateQueueListSpec,
    requirements: INTEGRATION_QUEUE_LIST_REQUIREMENTS,
  }),
  declareSessionCommand(integrateQueueDoctorSpec, {
    load: loadIntegrateQueueDoctorSpec,
    requirements: INTEGRATION_QUEUE_TASK_PROVIDER_READ_REQUIREMENTS,
  }),
  declareSessionCommand(integrateQueueClaimSpec, {
    load: loadIntegrateQueueClaimSpec,
    requirements: INTEGRATION_QUEUE_PROVIDER_READ_REQUIREMENTS,
  }),
  declareConditionalSessionCommand(integrateQueueReleaseSpec, {
    default: {
      load: loadIntegrateQueueReleaseLocalSpec,
      requirements: INTEGRATION_QUEUE_LIST_REQUIREMENTS,
    },
    selected: {
      when: (parsed) => parsed.status === "superseded",
      load: loadIntegrateQueueReleaseProviderSpec,
      requirements: INTEGRATION_QUEUE_TASK_PROVIDER_READ_REQUIREMENTS,
    },
  }),
  declareSessionCommand(integrateQueueAdoptLegacyProtectedConflictSpec, {
    load: loadIntegrateQueueAdoptLegacyProtectedConflictSpec,
    requirements: INTEGRATION_QUEUE_TASK_PROVIDER_READ_REQUIREMENTS,
  }),
  declareConditionalSessionCommand(integrateQueueRunNextSpec, {
    default: {
      load: loadIntegrateQueueRunNextPreparationSpec,
      requirements: INTEGRATION_QUEUE_TASK_PROVIDER_READ_REQUIREMENTS,
    },
    selected: {
      when: (parsed) => !parsed.dryRun,
      load: loadIntegrateQueueRunNextSpec,
      requirements: INTEGRATION_QUEUE_EXECUTION_REQUIREMENTS,
    },
  }),
] as const satisfies readonly CommandEntry[];

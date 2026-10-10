// Node 24 is the repository runtime. Import the dependency-free source module so
// repository scripts and the published CLI share one redaction/storage contract.
export {
  createVerificationObservation,
  verificationRedactor,
  observationDigest,
} from "../../packages/agentplane/src/commands/task/verification-observation.ts";
